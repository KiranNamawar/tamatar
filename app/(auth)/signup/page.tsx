import GoogleSignupButton from '@/components/auth/google-signup-button';
import SignUpForm from '@/components/auth/signup-form';
import Link from 'next/link';

export default function SignupPage() {
    return (
        <main className="w-11/12 md:w-1/2 lg:w-1/3">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-500 mb-4">Create an account to get started.</p>
            <SignUpForm />
            <p className="divider text-sm text-gray-500 mb-4">Already have an account?</p>
            <p className="text-sm text-gray-500 mb-4">Login to your account.</p>
            <Link href="/login" className="btn btn-secondary mb-4">Login</Link>
            <p className="divider text-sm text-gray-500 mb-4">or</p>
            <GoogleSignupButton />
        </main>
    );
}