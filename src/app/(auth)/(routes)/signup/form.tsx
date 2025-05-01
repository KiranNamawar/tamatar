'use client';

/**
 * SignupForm Component
 *
 * Renders the signup form UI, manages form state, handles validation and submission logic,
 * and integrates with the server-side signupAction for user registration.
 *
 * Props:
 * - redirectPath: The path to redirect to after successful signup and verification.
 *
 * Features:
 * - Uses react-hook-form and zod for validation.
 * - Handles server-side and client-side errors.
 * - Provides password strength feedback and integrates with Google signup.
 * - Uses useActionState for server actions and pending state.
 *
 * @param redirectPath - The path to redirect to after successful signup
 */
import { useActionState, useEffect, useMemo, useState } from 'react';
import { signupAction } from './action';
import { FormAlert, FormFieldWrapper, FormWrapper } from '@/components/form';
import { signupSchema } from './schema';
import { calculatePasswordStrength } from '../../utils/password-strength';
import PasswordStrength from '../../components/password-strength';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { Separator } from '@/components/ui/separator';
import GoogleButton from '../../components/google/button';
import { ErrorObject } from '@/utils/error';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { AtSign, User } from 'lucide-react';
import AuthFormContainer from '../../components/auth-form-container';

/**
 * SignupForm handles user registration, form validation, and submission logic.
 *
 * @param redirectPath - Where to redirect after successful signup
 */
export default function SignupForm({
    redirectPath,
    onSuccess,
}: {
    redirectPath: string;
    onSuccess: (context: string) => void;
}) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(signupAction, null);
    // Local state for tracking form-level errors (server or validation errors)
    const [formError, setFormError] = useState<ErrorObject | undefined>(
        undefined,
    );
    /**
     * State for tracking password strength (used for password feedback UI).
     */
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    /**
     * Memoized default form values.
     * Includes user agent for analytics/security and preserves entered fields on failed attempts.
     */
    const defaultValues = useMemo(
        () => ({
            name: formState?.fields?.name || '',
            email: formState?.fields?.email || '',
            password: '',
            confirmPassword: '',
            userAgent: navigator.userAgent,
        }),
        [formState?.fields],
    );

    /**
     * useEffect:
     * - Shows a toast and redirects to verification after successful signup.
     * - Updates form-level error state when formState changes.
     */
    useEffect(() => {
        if (formState?.success) {
            toast.success('Please check your email to verify your account.');
            onSuccess(formState?.metadata?.context || '');
        }
        setFormError(formState?.formError || undefined);
    }, [formState, onSuccess]);
    // Render the signup form UI.
    return (
        <FormWrapper
            action={formAction}
            schema={signupSchema}
            defaultValues={defaultValues}
            serverErrors={formState?.errors}
            className="space-y-4"
        >
            {(form) => (
                <>
                    {/* First and last name fields side by side */}
                    <FormFieldWrapper
                        control={form.control}
                        name="name"
                        label="Name"
                    >
                        {(field) => (
                            <Input
                                type="text"
                                placeholder="Name"
                                icon={<User size={16} />}
                                {...field}
                            />
                        )}
                    </FormFieldWrapper>
                    {/* Email input field */}
                    <FormFieldWrapper
                        control={form.control}
                        name="email"
                        label="Email"
                    >
                        {(field) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                icon={<AtSign size={16} />}
                                {...field}
                            />
                        )}
                    </FormFieldWrapper>
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
                                placeholder="Password"
                                {...field}
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
                                placeholder="Confirm Password"
                                {...field}
                            />
                        )}
                    </FormFieldWrapper>
                    <input
                        type="hidden"
                        name="userAgent"
                        value={navigator.userAgent}
                    />
                    {/* Submit button triggers the signup action */}
                    <SubmitButton
                        pending={form.formState.isSubmitting || pending}
                        title={'Sign Up'}
                        className="w-full"
                    />
                    {/* Separator and Google signup option */}
                    <Separator />
                    <GoogleButton redirectPath={redirectPath} route="signup" />
                    {/* Display form-level errors if present */}
                    {formError && (
                        <FormAlert
                            id={formError.id}
                            message={formError.message}
                        />
                    )}
                    {/* Link to login page for users who already have an account */}
                    <p className="text-muted-foreground text-center text-sm">
                        Already have an account?{' '}
                        <Link
                            href={`/login?redirectPath=${redirectPath}`}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </>
            )}
        </FormWrapper>
    );
}
