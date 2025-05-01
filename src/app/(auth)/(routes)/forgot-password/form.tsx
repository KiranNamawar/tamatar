'use client';

/**
 * ForgotPasswordForm Component
 *
 * Renders the forgot password form UI, manages form state, handles validation and submission logic,
 * and integrates with the server-side forgotPasswordAction for password reset initiation.
 *
 * Props:
 * - redirectPath: The path to redirect to after successful OTP submission.
 *
 * Features:
 * - Uses react-hook-form and zod for validation.
 * - Handles server-side and client-side errors.
 * - Uses useActionState for server actions and pending state.
 *
 * @param redirectPath - The path to redirect to after successful OTP submission
 */
import { FormFieldWrapper, FormWrapper } from '@/components/form';
import React, { useActionState, useEffect } from 'react';
import { forgotPasswordAction } from './action';
import { forgotPasswordSchema } from './schema';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { toast } from 'sonner';
import { AtSign } from 'lucide-react';

/**
 * ForgotPasswordForm handles the forgot password process, including form validation and submission.
 *
 * @param redirectPath - Where to redirect after successful OTP submission
 */
export default function ForgotPasswordForm({
    redirectPath,
    onSuccess,
}: {
        redirectPath: string;
        onSuccess: (context: string) => void;
}) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(
        forgotPasswordAction,
        null,
    );


    /**
     * useEffect:
     * - Shows a toast and redirects to verification after successful OTP submission.
     */
    useEffect(() => {
        if (formState?.success) {
            toast.success('OTP sent successfully');
            onSuccess(formState?.metadata?.context || '');
        }
    }, [formState, onSuccess]);

    // Render the forgot password form UI.
    return (
            <FormWrapper
                action={formAction}
                defaultValues={{ email: '' }}
                schema={forgotPasswordSchema}
                serverErrors={formState?.errors}
                className="space-y-4"
            >
                {(form) => (
                    <>
                        {/* Email field for user to enter their email address */}
                        <FormFieldWrapper
                            control={form.control}
                            name="email"
                            label="Email"
                        >
                            {(field) => (
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    icon={<AtSign size={16} />}
                                    {...field}
                                    autoFocus
                                />
                            )}
                        </FormFieldWrapper>
                        {/* Submit button triggers the forgot password action */}
                        <SubmitButton
                            title="Send OTP"
                            pending={pending}
                            className="w-full"
                        />
                    </>
                )}
            </FormWrapper>
    );
}
