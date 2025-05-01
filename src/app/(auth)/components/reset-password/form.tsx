'use client';

/**
 * ResetPasswordForm Component
 *
 * Renders the reset password form UI, manages form state, handles validation and submission logic,
 * and integrates with the server-side resetPasswordAction for password reset.
 *
 * Props:
 * - redirectPath: The path to redirect to after successful password reset.
 * - token: The reset token for verifying the password reset request.
 *
 * Features:
 * - Uses react-hook-form and zod for validation.
 * - Handles server-side and client-side errors.
 * - Provides password strength feedback.
 * - Uses useActionState for server actions and pending state.
 *
 * @param redirectPath - The path to redirect to after successful password reset
 * @param token - The reset token for verifying the password reset request
 */
import { useActionState, useEffect, useState } from 'react';
import { resetPasswordAction } from './action';
import { FormAlert, FormFieldWrapper, FormWrapper } from '@/components/form';
import { resetPasswordSchema } from './schema';
import { PasswordInput } from '@/components/ui/password-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { ErrorObject } from '@/utils/error';
import PasswordStrength from '../password-strength';
import { calculatePasswordStrength } from '../../utils/password-strength';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import AuthFormContainer from '../auth-form-container';

/**
 * ResetPasswordForm handles the password reset process, including validation and submission.
 *
 * @param redirectPath - Where to redirect after successful password reset
 * @param token - The reset token for verifying the password reset request
 */
export default function ResetPasswordForm({
    redirectPath,
    context,
}: {
    redirectPath: string;
    context: string;
}) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(
        resetPasswordAction,
        null,
    );
    const router = useRouter();
    /**
     * Local state for tracking form-level errors.
     */
    const [formError, setFormError] = useState<ErrorObject | null>(null);
    /**
     * State for tracking password strength (used for password feedback UI).
     */
    const [passwordStrength, setPasswordStrength] = useState<number>(0);

    /**
     * useEffect:
     * - Shows a toast and redirects to login after successful password reset.
     * - Updates form-level error state when formState changes.
     */
    useEffect(() => {
        if (formState?.success) {
            toast.success('Password Reset successfully, Login..');
            router.replace(`/login?redirectPath=${redirectPath}`);
        }
        setFormError(formState?.formError || null);
    }, [formState, redirectPath, router]);
    // Render the reset password form UI.
    return (
        <FormWrapper
            action={formAction}
            schema={resetPasswordSchema}
            defaultValues={{
                password: '',
                confirmPassword: '',
                token: context,
            }}
            serverErrors={formState?.errors}
            className="space-y-4"
        >
            {(form) => (
                <>
                    {/* Password input field with password strength indicator */}
                    <FormFieldWrapper
                        control={form.control}
                        name="password"
                        label="Password"
                        extraLabel={
                            passwordStrength > 0 ? (
                                <PasswordStrength strength={passwordStrength} />
                            ) : undefined
                        }
                    >
                        {(field) => (
                            <PasswordInput
                                {...field}
                                placeholder="Enter new Password"
                                onChange={(e) => {
                                    setPasswordStrength(
                                        calculatePasswordStrength(
                                            e.target.value,
                                        ),
                                    );
                                    field.onChange(e);
                                }}
                            />
                        )}
                    </FormFieldWrapper>
                    {/* Confirm password input field */}
                    <FormFieldWrapper
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                    >
                        {(field) => (
                            <PasswordInput
                                {...field}
                                placeholder="Confirm your Password"
                            />
                        )}
                    </FormFieldWrapper>
                    <input type="hidden" name="token" value={context} />
                    {/* Submit button triggers the reset password action */}
                    <SubmitButton
                        title="Reset Password"
                        pending={pending}
                        className="w-full"
                    />
                    {formError && (
                        <FormAlert
                            id={formError.id}
                            message={formError.message}
                        />
                    )}
                </>
            )}
        </FormWrapper>
    );
}
