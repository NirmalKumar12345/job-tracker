import { z } from "zod";

const baseFields = {
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email"),
  mobile: z
    .string()
    .nonempty("Mobile is required")
    .regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
};

const adminSchema = z.object({
  ...baseFields,
  role: z.literal("admin"),
});

const userSchema = z.object({
  ...baseFields,
  role: z.literal("user"),
  location: z.string().optional().or(z.literal("")),
  experience: z.string().optional().or(z.literal("")),
  education: z.array(z.string()).optional(),
  currentCompany: z.string().optional().or(z.literal("")),
  currentCTC: z.string().optional().or(z.literal("")),
  expectedCTC: z.string().optional().or(z.literal("")),
  noticePeriod: z.string().optional().or(z.literal("")),
  skills: z.string().optional().or(z.literal("")),
  language: z.string().optional().or(z.literal("")),
});

export const ProfileSchema = z.discriminatedUnion("role", [
  adminSchema,
  userSchema,
]);
