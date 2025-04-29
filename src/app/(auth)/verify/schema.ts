import { z } from 'zod';

export const otpSchema = z.object({
    code: z
        .string()
        .length(6, 'Code must be 6 digits long')
        .regex(/^\d+$/, 'Code must be numeric'),
    token: z.string().min(1, 'Token is required'),
    userAgent: z.string().optional(),
});
