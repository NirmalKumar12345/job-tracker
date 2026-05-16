import { z } from "zod";

export const JobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z
    .string()
    .nonempty("Role is required")
    .min(5, "Role must be at least 5 characters"),
  description: z.string().min(1, "Description is required").min(10, "Minimum 10 characters"),
  skill: z.string().min(1,"Skills is Required"),
  location: z.string().min(1, "Location is required"),
  jobType: z
    .string()
    .nonempty("Job Type is required")
    .refine((val) => ["full-time", "part-time", "internship", "contract"].includes(val), {
      message: "Job Type must be one of full-time, part-time, internship, or contract",
    }),
  experience: z.string().min(1, "Experience is required"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .refine((val) => {
      const date = new Date(val);
      return date > new Date();
    }, {
      message: "Expiry must be a future date",
    }),
  vacancy: z
  .union([z.string(), z.number()])
  .optional()
  .refine((val) => {
    if (val === undefined || val === "") return true;
    return Number.isInteger(Number(val));
  }, {
    message: "Vacancy must be an integer",
  })
  .refine((val) => {
    if (val === undefined || val === "") return true;
    return Number(val) >= 1;
  }, {
    message: "Vacancy must be at least 1",
  }),
});