import AuthLayout from '../components/auth-layout';
import ForgotPasswordForm from './form';

export default async function ForgotPassword({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath: string }>;
}) {
    const { redirectPath } = await searchParams;
    return (
        <AuthLayout
            title="Forgot Password"
            description="Enter your email address to reset your password."
        >
            <ForgotPasswordForm redirectPath={redirectPath} />
        </AuthLayout>
    );
}
