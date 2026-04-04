import { os } from "@orpc/server";
import { count, desc, eq } from "drizzle-orm";
import { generateCertificate } from "@/lib/converter";
import { db } from "@/lib/database";
import { certificate } from "@/repo/schema/schema";
import { generateSchema } from "@/types/schema";
import { todoSchema } from "../schema";

export const createTodo = os.input(todoSchema).handler(() => {
  return [];
});

export const getStats = os
  .route({
    method: "GET",
    path: "/stats",
  })
  .handler(async ({ context }) => {
    const session = (context as Record<string, unknown>).session as {
      user: { id: string };
    } | null;
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const [totalRes] = await db.select({ value: count() }).from(certificate);
    const [userRes] = await db
      .select({ value: count() })
      .from(certificate)
      .where(eq(certificate.userId, session.user.id));

    return {
      total: totalRes?.value ?? 0,
      userTotal: userRes?.value ?? 0,
    };
  });

export const listHistory = os
  .route({
    method: "GET",
    path: "/history",
  })
  .handler(async ({ context }) => {
    const session = (context as Record<string, unknown>).session as {
      user: { id: string };
    } | null;
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const history = await db.query.certificate.findMany({
      where: eq(certificate.userId, session.user.id),
      orderBy: [desc(certificate.generatedAt)],
    });

    return history;
  });

export const generateCert = os
  .route({
    method: "POST",
    path: "/generate",
  })
  .input(generateSchema)
  .handler(async ({ input, context }) => {
    try {
      const session = (context as Record<string, unknown>).session as {
        user: { id: string };
      } | null;
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const {
        firstName,
        contractorCompanyName,
        periodicalCheck,
        prolongedMedicalCheck,
        fitForAssignedTask,
        surname,
        certNo,
        DOB,
        position,
        sigKey,
        location,
        fitWithRestrictions,
        forx,
        unfit,
        unFitToWork,
        currentDate,
      } = input;

      const data = await generateCertificate({
        firstName,
        contractorCompanyName,
        unFitToWork,
        currentDate,
        periodicalCheck,
        prolongedMedicalCheck,
        fitForAssignedTask,
        certNo,
        DOB,
        position,
        sigKey,
        location,
        fitWithRestrictions,
        forx,
        surname,
        unfit,
      });

      db.insert(certificate).values({
        userId: session.user.id,
        certNo,
        firstName,
        surname,
        contractorCompanyName,
        position,
        location,
      });

      return { message: "Certificate generated succeffully", data };
    } catch (error) {
      console.log("from generate", error);
    }
  });
