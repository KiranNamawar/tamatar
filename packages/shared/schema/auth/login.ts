import { z } from 'zod';

export const loginForm = z.object({
    email: z.string().trim().email("Invalid email format"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long"),
});
