import { zValidator } from "@hono/zod-validator";
import { generateCertificate } from "@/lib/converter";
import { authMiddleware, factory } from "@/routes/factory";
import { generateSchema } from "@/types/schema";

export const generate = factory
  .createApp()
  .basePath("/generate")
  .use("*", authMiddleware)
  .post("/", zValidator("json", generateSchema), async (ctx) => {
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
      currentDate,
      unFitToWork,
    } = ctx.req.valid("json");
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
    return ctx.json({ message: "Certificate generated succeffully", data });
  });
