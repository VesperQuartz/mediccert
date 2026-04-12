import { format } from "date-fns";
import { z } from "zod";

export const generateSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    surname: z.string().min(1, "Last name is required"),
    contractorCompanyName: z
      .string()
      .min(1, "Contractor company name is required"),
    certNo: z.string().min(1, "Certificate number is required"),
    periodicalCheck: z.boolean(),
    prolongedMedicalCheck: z.boolean(),
    fitForAssignedTask: z.boolean(),
    unfitForAssignedTask: z.boolean(),
    // workUnit: z.boolean(),
    DOB: z
      .string()
      .min(1, "Date of birth is required")
      .transform((val) => format(new Date(val), "do MMMM, yyyy")),
    position: z.string(),
    sigKey: z.string(),
    location: z.string(),
    fitWithRestrictions: z.string(),
    forx: z.string(),
    unfit: z.string(),
    currentDate: z.string().min(1, "Date is required"),
  })
  .transform((data) => {
    const dateObj = new Date(data.currentDate);
    return {
      ...data,
      certNo: `0004/${dateObj.toLocaleString("en-US", {
        month: "short",
      })}/${data.certNo}/${dateObj.getFullYear()}`,
      currentDate: format(dateObj, "do MMMM, yyyy"),
      unFitToWork: data.unfit.length > 0,
    };
  });

export type GenerateSchema = z.infer<typeof generateSchema>;
