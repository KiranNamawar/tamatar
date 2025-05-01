'use client';

import { useState } from 'react';
import AuthFormContainer from '../../components/auth-form-container';
import SignupForm from './form';
import OtpForm from '../../components/otp/form';

export default function SignupWrapper({
    redirectPath,
}: {
    redirectPath: string;
}) {
    const [context, setContext] = useState<string | undefined>(undefined);
    const [step, setStep] = useState<'signup' | 'verify'>('signup');
    return (
        <AuthFormContainer>
            {step === 'signup' ? (
                <SignupForm
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
