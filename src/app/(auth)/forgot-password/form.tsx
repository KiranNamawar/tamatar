'use client';

import { FormFieldWrapper, FormWrapper } from '@/components/form';
import React, { useActionState, useEffect } from 'react';
import { forgotPasswordAction } from './action';
import { forgotPasswordSchema } from './schema';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// ForgotPasswordForm handles the forgot password process, including form validation and submission.
export default function ForgotPasswordForm({
    redirectPath,
}: {
    redirectPath: string;
}) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(
        forgotPasswordAction,
        null,
    );

    const router = useRouter();

    // useEffect listens for successful OTP submission and redirects the user to the verification page.
    useEffect(() => {
        if (formState?.success) {
            toast.success('OTP sent successfully');
            router.replace('/verify?context=' + formState?.metadata?.context);
        }
    }, [formState, redirectPath, router]);

    // Render the forgot password form UI.
    return (
        <div className="w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            {/* FormWrapper handles form context, validation, and error display */}
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
                                    {...field}
                                    autoFocus
                                />
                            )}
                        </FormFieldWrapper>
                        {/* Submit button triggers the forgot password action */}
                        <SubmitButton title="Send OTP" pending={pending} className='w-full' />
                    </>
                )}
            </FormWrapper>
        </div>
    );
}
