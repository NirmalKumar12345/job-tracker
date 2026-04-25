import { z } from "zod";

// LOGIN
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid Email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8,"Password must be atleast 8 characters long")
});


// SIGNUP
export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    mobile: z
      .string()
      .min(1,"Mobile number is required")
      .regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),

    role: z
      .string()
      .min(1, "Role is required")
      .refine((val) => ["admin", "user"].includes(val), {
        message: "Invalid role"
      })
  });