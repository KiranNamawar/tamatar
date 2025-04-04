import GoogleLoginButton from '@/components/auth/google-login-button';
import LoginForm from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="w-11/12 md:w-1/2 lg:w-1/3">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-sm text-gray-500 mb-4">Welcome back! Please login to your account.</p>
            <LoginForm />
            <p className="divider text-sm text-gray-500 mb-4">Don't have an account?</p>
            <p className="text-sm text-gray-500 mb-4">Create an account to get started.</p>
            <Link href="/signup" className="btn btn-secondary mb-4">Sign Up</Link>
            <p className="divider text-sm text-gray-500 mb-4">or</p>
            <GoogleLoginButton />
        </main>
    );
}