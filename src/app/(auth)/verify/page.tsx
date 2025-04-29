import { notFound } from 'next/navigation';
import OtpForm from './form';
import AuthLayout from '../components/auth-layout';

export default async function VerifyPage({
    searchParams,
}: {
    searchParams: Promise<{
        redirectPath?: string;
        context?: string;
    }>;
}) {
    const { redirectPath = '/dashboard', context } = await searchParams;
    if (!context) {
        notFound();
    }

    return (
        <AuthLayout
            title="Verify"
            description="Verify your email address to continue"
        >
            {context && (
                <OtpForm context={context} redirectPath={redirectPath} />
            )}
        </AuthLayout>
    );
}
