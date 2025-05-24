import z from "zod";
import { PASSWORD_SCHEMA } from "./password";

export const signupForm = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required")
            .max(50, "Name is too long"),
        email: z.string().trim().email("Invalid email format"),
        password: PASSWORD_SCHEMA,
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
