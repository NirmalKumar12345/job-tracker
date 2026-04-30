import { z } from "zod";

export const JobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().min(10, "Minimum 10 characters"),
  location: z.string().min(1, "Location is required"),
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
});