import { format } from "date-fns";
import { z } from "zod";

export const generateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  contractorCompanyName: z
    .string()
    .min(1, "Contractor company name is required"),
  certNo: z
    .string()
    .min(1, "Certificate number is required")
    .transform(
      (data) =>
        `0004/${new Date().toLocaleString("en-US", {
          month: "short",
        })}/${data}/${new Date().getFullYear()}`,
    ),
  periodicalCheck: z.boolean(),
  prolongedMedicalCheck: z.boolean(),
  fitForAssignedTask: z.boolean(),
  // workUnit: z.boolean(),
  DOB: z
    .string()
    .min(1, "Date of birth is required")
    .transform((val) => format(new Date(val), "do MMMM, yyyy")),
  position: z.string(),
  sig: z.string(),
  location: z.string(),
  fitWithRestrictions: z.string(),
  forx: z.string(),
  unfit: z.string(),
}).transform((data) => ({
  ...data,
  unFitToWork: data.unfit.length > 0,
}));

export type GenerateSchema = z.infer<typeof generateSchema>;
