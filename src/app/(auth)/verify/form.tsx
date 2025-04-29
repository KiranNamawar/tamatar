'use client';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { SubmitButton } from '@/components/ui/submit-button';
import { FormWrapper } from '@/components/form';
import { resendOtpAction, verifyOtpAction } from './action';
import { otpSchema } from './schema';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// OtpForm handles OTP verification, including form validation, submission, and resend logic.
export default function OtpForm({
    context,
    redirectPath,
}: {
    context: string;
    redirectPath: string;
}) {
    // useActionState manages form state, handles submission, and tracks pending status.
    const [formState, formAction, pending] = useActionState(
        verifyOtpAction,
        null,
    );
    // Memoized default form values, including context token and user agent.
    const defaultValues = useMemo(
        () => ({
            code: '',
            token: context,
            userAgent: navigator.userAgent,
        }),
        [context],
    );

    const router = useRouter();

    useEffect(() => {
        if (formState?.success) {
            toast.success('OTP verified successfully');
            if (formState.metadata) {
                router.replace(
                    `${formState.metadata.redirect}?context=${formState.metadata.context}&redirectPath=${redirectPath}`,
                );
            } else {
                router.replace(redirectPath);
            }
        }
    }, [formState, redirectPath, router]);

    // Resend OTP logic: Handles the resend action and timer for OTP requests.
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(30); // 30 seconds countdown

    const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const response = await resendOtpAction(context);
        if (response.success) {
            toast.success('OTP resent successfully');
            setIsResendDisabled(true);
            setResendTimer(30); // Reset timer to 30 seconds
        } else {
            toast.error(response.error || 'Failed to resend OTP');
        }
    };

    // Countdown logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isResendDisabled) {
            timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isResendDisabled]);

    return (
        <div className="mb-4 w-full space-y-4 rounded-lg border-2 p-4 shadow-md">
            <FormWrapper
                action={formAction}
                schema={otpSchema}
                defaultValues={defaultValues}
                serverErrors={formState?.errors}
            >
                {(form) => (
                    <>
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="mb-4 flex w-full flex-col items-center">
                                    <FormLabel>Enter OTP</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            autoFocus
                                            maxLength={6}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            {...field}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Enter the OTP sent to your email
                                        address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <input type="hidden" name="token" value={context} />
                        <input
                            type="hidden"
                            name="userAgent"
                            value={navigator.userAgent}
                        />
                        <div className="flex items-center justify-between">
                            <Button
                                variant="link"
                                type="button"
                                className="text-blue-500"
                                onClick={handleResendOtp}
                                disabled={isResendDisabled}
                            >
                                {isResendDisabled
                                    ? `Resend in ${resendTimer}s`
                                    : 'Resend OTP'}
                            </Button>
                            <SubmitButton
                                title="Verify OTP"
                                pending={form.formState.isSubmitting || pending}
                            />
                        </div>
                    </>
                )}
            </FormWrapper>
        </div>
    );
}
