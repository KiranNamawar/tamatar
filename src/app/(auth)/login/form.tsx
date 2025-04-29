'use client';

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

export default function LoginForm({ redirectPath }: { redirectPath: string }) {
    const [formState, formAction, pending] = useActionState(loginAction, null);
    const [formError, setFormError] = useState<ErrorObject | undefined>(
        undefined,
    );
    const defaultValues = useMemo(
        () => ({
            email: formState?.fields?.email ?? '',
            password: '',
            userAgent: navigator.userAgent,
        }),
        [formState?.fields?.email],
    );
    const router = useRouter();
    useEffect(() => {
        if (formState?.success) {
            router.replace(redirectPath);
        }

        setFormError(formState?.formError || undefined);
    }, [formState, redirectPath, router]);
    return (
        <div className="w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            <FormWrapper
                action={formAction}
                schema={loginSchema}
                defaultValues={defaultValues}
                serverErrors={formState?.errors}
                className="space-y-4"
            >
                {(form) => (
                    <>
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
                        <SubmitButton
                            pending={form.formState.isSubmitting || pending}
                            title={'Login'}
                            className="w-full"
                        />
                    </>
                )}
            </FormWrapper>
            <Separator />
            <GoogleButton redirectPath={redirectPath} route="login" />
            {formError && (
                <FormAlert id={formError.id} message={formError.message} />
            )}

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
