'use client';

import { useState } from 'react';
import AuthFormContainer from '../../components/auth-form-container';
import OtpForm from '../../components/otp/form';
import ForgotPasswordForm from './form';
import ResetPasswordForm from '../../components/reset-password/form';

export default function ForgotPasswordWrapper({
    redirectPath,
}: {
    redirectPath: string;
}) {
    const [context, setContext] = useState<string | undefined>(undefined);
    const [step, setStep] = useState<'forgot' | 'verify' | 'reset'>('forgot');

    return (
        <AuthFormContainer>
            {step === 'forgot' && (
                <ForgotPasswordForm
                    onSuccess={(context) => {
                        setContext(context);
                        setStep('verify');
                    }}
                />
            )}
            {context &&
                (step === 'verify' ? (
                    <OtpForm
                        context={context}
                        redirectPath={redirectPath}
                        onSuccess={(next) => {
                            if (next === 'reset') {
                                setStep(next);
                            }
                        }}
                    />
                ) : (
                    <ResetPasswordForm
                        redirectPath={redirectPath}
                        context={context}
                    />
                ))}
        </AuthFormContainer>
    );
}
