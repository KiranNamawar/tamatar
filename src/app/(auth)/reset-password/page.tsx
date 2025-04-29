import { notFound } from 'next/navigation';
import ResetPasswordForm from './form';
import { verifyToken } from '@/utils/jwt';
import AuthLayout from '../components/auth-layout';

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath: string; context: string }>;
}) {
    const { redirectPath = '/dashboard', context } = await searchParams;
    if (!context) {
        notFound();
    }

    return (
        <AuthLayout
            title="Reset Password"
            description="Enter your New Password"
        >
            <ResetPasswordForm token={context} redirectPath={redirectPath} />
        </AuthLayout>
    );
}
