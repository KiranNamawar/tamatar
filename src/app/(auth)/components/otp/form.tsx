'use client';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';
import {
    useActionState,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from 'react';
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
import { useTimer } from 'react-timer-hook';

/**
 * OtpForm Component
 *
 * Renders the OTP verification form UI, manages form state, handles validation and submission logic,
 * and integrates with the server-side verifyOtpAction for OTP verification.
 *
 * Props:
 * - context: The token or context required for OTP verification.
 * - redirectPath: The path to redirect to after successful OTP verification.
 *
 * Features:
 * - Uses react-hook-form and zod for validation.
 * - Handles server-side and client-side errors.
 * - Supports OTP resend logic.
 * - Uses useActionState for server actions and pending state.
 *
 * @param context - Token/context required for OTP verification
 * @param redirectPath - Where to redirect after successful OTP verification
 */
export default function OtpForm({
    context,
    redirectPath,
    onSuccess,
}: {
    context: string;
    redirectPath: string;
    onSuccess?: (next: string) => void;
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
            if (formState.metadata?.next) {
                toast.success('Otp verified successfully');
                onSuccess?.(formState.metadata.next);
            } else {
                router.replace(redirectPath);
            }
        }
    }, [formState, onSuccess, redirectPath, router]);

    // Resend OTP logic: Handles the resend action and timer for OTP requests.
    const [isResendDisabled, setIsResendDisabled] = useState(true); // Initially disabled
    const [isResending, startResendTransition] = useTransition();

    const { seconds, restart } = useTimer({
        expiryTimestamp: new Date(new Date().getTime() + 30000), // 30 seconds countdown
        onExpire: () => setIsResendDisabled(false),
    });

    const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        startResendTransition(async () => {
            const response = await resendOtpAction(context);
            if (response.success) {
                toast.success('OTP resent successfully');
                setIsResendDisabled(true);
                restart(new Date(new Date().getTime() + 30000)); // Restart timer
            } else {
                toast.error(response.error || 'Failed to resend OTP');
            }
        });
    };

    return (
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
                                    Enter the OTP sent to your email address.
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
                            variant="secondary"
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isResendDisabled}
                            pending={isResending}
                        >
                            {isResendDisabled
                                ? `Resend in ${seconds}s` // Use seconds from useTimer
                                : 'Resend OTP'}
                        </Button>
                        <Button
                            pending={form.formState.isSubmitting || pending}
                            type='submit'
                        >
                            Verify OTP
                        </Button>
                    </div>
                </>
            )}
        </FormWrapper>
    );
}
