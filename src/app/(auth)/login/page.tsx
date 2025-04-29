/**
 * LoginPage
 *
 * Server component for the login route. Renders the AuthLayout and LoginForm,
 * passing the redirectPath (defaults to /dashboard) from searchParams.
 *
 * - Integrates with the login form and handles post-login redirection.
 * - Uses server-side rendering for SEO and performance.
 *
 * @param searchParams - Promise resolving to an object with optional redirectPath
 */
import AuthLayout from '../components/auth-layout';
import LoginForm from './form';

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath?: string }>;
}) {
    // Destructure redirectPath with default to '/dashboard' if not provided
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
