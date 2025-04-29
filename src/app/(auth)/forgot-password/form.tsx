'use client';

import { FormFieldWrapper, FormWrapper } from '@/components/form';
import React, { useActionState, useEffect } from 'react';
import { forgotPasswordAction } from './action';
import { forgotPasswordSchema } from './schema';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ForgotPasswordForm({
    redirectPath,
}: {
    redirectPath: string;
}) {
    const [formState, formAction, pending] = useActionState(
        forgotPasswordAction,
        null,
    );

    const router = useRouter();

    useEffect(() => {
        if (formState?.success) {
            toast.success('OTP sent successfully');
            router.replace('/verify?context=' + formState?.metadata?.context);
        }
    }, [formState, redirectPath, router]);

    return (
        <div className="w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            <FormWrapper
                action={formAction}
                defaultValues={{ email: '' }}
                schema={forgotPasswordSchema}
                serverErrors={formState?.errors}
                className="space-y-4"
            >
                {(form) => (
                    <>
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
                        <SubmitButton title="Send OTP" pending={pending} className='w-full' />
                    </>
                )}
            </FormWrapper>
        </div>
    );
}
