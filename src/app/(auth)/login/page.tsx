import AuthLayout from '../components/auth-layout';
import LoginForm from './form';

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath?: string }>;
}) {
    const { redirectPath = '/dashboard' } = await searchParams;
    return (
        <AuthLayout
            title="Login"
            description="Please login to access your account."
        >
            <LoginForm redirectPath={redirectPath} />
        </AuthLayout>
    );
}
