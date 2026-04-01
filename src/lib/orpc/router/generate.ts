import { format } from "date-fns";
import { os } from "@orpc/server";
import { generateCertificate } from "@/lib/converter";
import { generateSchema } from "@/types/schema";
import { todoSchema } from "../schema";

export const createTodo = os.input(todoSchema).handler(() => {
  return [];
});

export const generateCert = os
  .route({
    method: "POST",
    path: "/generate",
  })
  .input(generateSchema)
  .handler(async ({ input }) => {
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
      sig,
      location,
      fitWithRestrictions,
      forx,
      unfit,
      unFitToWork,
    } = input;
    const data = await generateCertificate({
      firstName,
      contractorCompanyName,
      unFitToWork,
      currentDate: format(new Date(), "do MMMM, yyyy"),
      periodicalCheck,
      prolongedMedicalCheck,
      fitForAssignedTask,
      certNo,
      DOB,
      position,
      sig,
      location,
      fitWithRestrictions,
      forx,
      surname,
      unfit,
    });
    return { message: "Certificate generated succeffully", data };
  });
