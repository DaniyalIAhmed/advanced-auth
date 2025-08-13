import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Email is required!"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.email("Email is required!"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
