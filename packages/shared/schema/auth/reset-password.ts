import { z } from 'zod';
import { PASSWORD_SCHEMA } from './password';

export const resetPasswordForm = z
.object({
    password: PASSWORD_SCHEMA,
    confirmPassword: z.string().trim(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})