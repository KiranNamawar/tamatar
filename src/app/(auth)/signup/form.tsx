'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { signupAction } from './action';
import { FormAlert, FormFieldWrapper, FormWrapper } from '@/components/form';
import { signupSchema } from './schema';
import { calculatePasswordStrength } from '../utils/password-strength';
import PasswordStrength from '../components/password-strength';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SubmitButton } from '@/components/ui/submit-button';
import { Separator } from '@/components/ui/separator';
import GoogleButton from '../google/button';
import { ErrorObject } from '@/utils/error';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SignupForm({ redirectPath }: { redirectPath: string }) {
    const [formState, formAction, pending] = useActionState(signupAction, null);
    const [formError, setFormError] = useState<ErrorObject | undefined>(
        undefined,
    );
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const defaultValues = useMemo(
        () => ({
            firstName: formState?.fields?.firstName || '',
            lastName: formState?.fields?.lastName || '',
            email: formState?.fields?.email || '',
            password: '',
            confirmPassword: '',
            userAgent: navigator.userAgent,
        }),
        [formState?.fields],
    );

    const router = useRouter();
    useEffect(() => {
        if (formState?.success) {
            toast.success('Please check your email to verify your account.');
            router.replace(
                `/verify?redirectPath=${redirectPath}&context=${formState?.metadata?.context}`,
            );
        }

        setFormError(formState?.formError || undefined);
    }, [formState, redirectPath, router]);
    return (
        <div className="w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            <FormWrapper
                action={formAction}
                schema={signupSchema}
                defaultValues={defaultValues}
                serverErrors={formState?.errors}
                className="space-y-4"
            >
                {(form) => (
                    <>
                        <div className='flex items-center justify-between'>
                            <FormFieldWrapper
                                control={form.control}
                                name="firstName"
                                label="First Name"
                            >
                                {(field) => (
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        {...field}
                                    />
                                )}
                            </FormFieldWrapper>

                            <FormFieldWrapper
                                control={form.control}
                                name="lastName"
                                label="Last Name"
                            >
                                {(field) => (
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        {...field}
                                    />
                                )}
                            </FormFieldWrapper>
                        </div>
                        <FormFieldWrapper
                            control={form.control}
                            name="email"
                            label="Email"
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
                                passwordStrength > 0 ? (
                                    <PasswordStrength
                                        strength={passwordStrength}
                                    />
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
                        <SubmitButton
                            pending={form.formState.isSubmitting || pending}
                            title={'Sign Up'}
                            className="w-full"
                        />
                        <Separator />
                        <GoogleButton
                            redirectPath={redirectPath}
                            route="signup"
                        />
                        {formError && (
                            <FormAlert
                                id={formError.id}
                                message={formError.message}
                            />
                        )}
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
        </div>
    );
}
