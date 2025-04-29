'use client';

import { useActionState, useEffect, useState } from 'react';
import { resetPasswordAction } from './action';
import { FormAlert, FormFieldWrapper, FormWrapper } from '@/components/form';
import { resetPasswordSchema } from './schema';
import { PasswordInput } from '@/components/ui/password-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { ErrorObject } from '@/utils/error';
import PasswordStrength from '../components/password-strength';
import { calculatePasswordStrength } from '../utils/password-strength';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// ResetPasswordForm handles the password reset process, including validation and submission.
export default function ResetPasswordForm({
    redirectPath,
    token,
}: {
    redirectPath: string;
    token: string;
}) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(
        resetPasswordAction,
        null,
    );
    const router = useRouter();
    // Local state for tracking form-level errors.
    const [formError, setFormError] = useState<ErrorObject | null>(null);
    // State for tracking password strength (used for password feedback UI).
    const [passwordStrength, setPasswordStrength] = useState<number>(0);

    // useEffect listens for successful password reset and handles redirection and error updates.
    useEffect(() => {
        if (formState?.success) {
            toast.success('Password Reset successfully, Login..');
            router.replace(`/login?redirectPath=${redirectPath}`);
        }
        setFormError(formState?.formError || null);
    }, [formState, redirectPath, router]);
    // Render the reset password form UI.
    return (
        <div className="w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            {/* FormWrapper handles form context, validation, and error display */}
            <FormWrapper
                action={formAction}
                schema={resetPasswordSchema}
                defaultValues={{
                    password: '',
                    confirmPassword: '',
                    token: token,
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
                                    <PasswordStrength
                                        strength={passwordStrength}
                                    />
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
                        <input type="hidden" name="token" value={token} />
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
        </div>
    );
}
