import { z } from 'zod';

export const signupSchema = z
    .object({
        firstName: z
            .string()
            .min(1, { message: 'First name is required' })
            .max(100, {
                message: 'First name must be less than 100 characters',
            }),
        lastName: z.string().optional(),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain at least one number',
            })
            .regex(/[^A-Za-z0-9]/, {
                message: 'Password must contain at least one special character',
            }),
        confirmPassword: z
            .string()
            .min(1, { message: 'Confirm password is required' }),
        userAgent: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type SignupFormData = z.infer<typeof signupSchema>;
