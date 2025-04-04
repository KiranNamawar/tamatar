import GoogleLoginButton from '@/components/auth/google-login-button';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="w-11/12 md:w-1/2 lg:w-1/3">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="mb-4 text-sm text-gray-500">
                Welcome back! Please login to your account.
            </p>
            <LoginForm />
            <p className="m-2 text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="link">
                    Signup
                </Link>
            </p>
            <p className="divider mb-4 text-sm text-gray-500">or</p>
            <GoogleLoginButton />
        </main>
    );
}