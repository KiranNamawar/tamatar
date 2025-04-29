import AuthLayout from '../components/auth-layout';
import SignupForm from './form';

export default async function SignUpPage({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath?: string }>;
}) {
    const { redirectPath = '/dashboard' } = await searchParams;
    return (
        <AuthLayout
            title="Signup"
            description="Please create an account to access your dashboard."
        >
            <SignupForm redirectPath={redirectPath} />
        </AuthLayout>
    );
}
