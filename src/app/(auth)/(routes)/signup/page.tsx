/**
 * SignUpPage
 *
 * Server component for the signup route. Renders the AuthLayout and SignupForm,
 * passing the redirectPath (defaults to /dashboard) from searchParams.
 *
 * - Integrates with the signup form and handles post-signup redirection.
 * - Uses server-side rendering for SEO and performance.
 *
 * @param searchParams - Promise resolving to an object with optional redirectPath
 */
import AuthLayout from '../../components/auth-layout';
import SignupForm from './form';
import SignupWrapper from './wrapper';

export default async function SignUpPage({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath?: string }>;
}) {
    // Destructure redirectPath with default to '/dashboard' if not provided
    const { redirectPath = '/dashboard' } = await searchParams;
    return (
        <AuthLayout
            title="Signup"
            description="Please create an account to access your dashboard."
        >
            <SignupWrapper redirectPath={redirectPath} />
        </AuthLayout>
    );
}
