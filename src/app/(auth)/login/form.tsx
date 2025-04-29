'use client';

/**
 * LoginForm Component
 *
 * Renders the login form UI, manages form state, handles validation and submission logic,
 * and integrates with the server-side loginAction for authentication.
 *
 * Props:
 * - redirectPath: The path to redirect to after successful login.
 *
 * Features:
 * - Uses react-hook-form and zod for validation.
 * - Handles server-side and client-side errors.
 * - Integrates with Google login and provides navigation links to signup/forgot-password.
 * - Uses useActionState for server actions and pending state.
 *
 * @param redirectPath - The path to redirect to after successful login
 */
import { useActionState, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { FormAlert, FormFieldWrapper, FormWrapper } from '@/components/form';
import { ErrorObject } from '@/utils/error';
import { loginSchema } from './schema';
import { loginAction } from './action';
import { Separator } from '@/components/ui/separator';
import GoogleButton from '../google/button';
import Link from 'next/link';

/**
 * LoginForm handles user login, form validation, and submission logic.
 *
 * @param redirectPath - Where to redirect after successful login
 */
export default function LoginForm({ redirectPath }: { redirectPath: string }) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(loginAction, null);
    // Local state for tracking form-level errors (server or validation errors)
    const [formError, setFormError] = useState<ErrorObject | undefined>(
        undefined,
    );
    /**
     * Memoized default form values.
     * Includes user agent for analytics/security and preserves email on failed attempts.
     */
    const defaultValues = useMemo(
        () => ({
            email: formState?.fields?.email ?? '',
            password: '',
            userAgent: navigator.userAgent,
        }),
        [formState?.fields?.email],
    );
    const router = useRouter();
    /**
     * useEffect:
     * - Redirects to the desired path after successful login.
     * - Updates form-level error state when formState changes.
     */
    useEffect(() => {
        if (formState?.success) {
            router.replace(redirectPath);
        }
        setFormError(formState?.formError || undefined);
    }, [formState, redirectPath, router]);
    // Render the login form UI.
    return (
        <div className="w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            {/* FormWrapper handles form context, validation, and error display */}
            <FormWrapper
                action={formAction}
                schema={loginSchema}
                defaultValues={defaultValues}
                serverErrors={formState?.errors}
                className="space-y-4"
            >
                {(form) => (
                    <>
                        {/* Email input field */}
                        <FormFieldWrapper
                            control={form.control}
                            name="email"
                            label="Email"
                            className=""
                        >
                            {(field) => (
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                />
                            )}
                        </FormFieldWrapper>
                        {/* Password input field with a link to forgot password */}
                        <FormFieldWrapper
                            control={form.control}
                            name="password"
                            label="Password"
                            extraLabel={
                                <Link
                                    href={`/forgot-password?redirectPath=${redirectPath}`}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            }
                        >
                            {(field) => (
                                <PasswordInput
                                    placeholder="Password"
                                    {...field}
                                />
                            )}
                        </FormFieldWrapper>
                        <input
                            type="hidden"
                            name="userAgent"
                            value={navigator.userAgent}
                        />
                        {/* Submit button triggers the login action */}
                        <SubmitButton
                            pending={form.formState.isSubmitting || pending}
                            title={'Login'}
                            className="w-full"
                        />
                    </>
                )}
            </FormWrapper>
            {/* Separator and Google login option */}
            <Separator />
            <GoogleButton redirectPath={redirectPath} route="login" />
            {/* Display form-level errors if present */}
            {formError && (
                <FormAlert id={formError.id} message={formError.message} />
            )}

            {/* Link to signup page for new users */}
            <p className="text-muted-foreground text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link
                    href={`/signup?redirectPath=${redirectPath}`}
                    className="text-blue-500 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
