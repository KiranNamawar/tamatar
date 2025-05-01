'use client';

import { useState } from 'react';
import AuthFormContainer from '../../components/auth-form-container';
import LoginForm from './form';
import OtpForm from '../../components/otp/form';

export default function LoginWrapper({
    redirectPath,
}: {
    redirectPath: string;
}) {
    const [context, setContext] = useState<string | undefined>(undefined);
    const [step, setStep] = useState<'login' | 'verify'>('login');
    return (
        <AuthFormContainer>
            {step === 'login' ? (
                <LoginForm
                    redirectPath={redirectPath}
                    onSuccess={(context) => {
                        setContext(context);
                        setStep('verify');
                    }}
                />
            ) : context ? (
                <OtpForm context={context} redirectPath={redirectPath} />
            ) : (
                'Try Again'
            )}
        </AuthFormContainer>
    );
}
