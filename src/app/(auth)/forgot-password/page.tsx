/**
 * ForgotPassword Page
 *
 * Server component for the forgot password route. Renders the AuthLayout and ForgotPasswordForm,
 * passing the redirectPath from searchParams.
 *
 * - Integrates with the forgot password form and handles post-submission redirection.
 * - Uses server-side rendering for SEO and performance.
 *
 * @param searchParams - Promise resolving to an object with redirectPath
 */
import AuthLayout from '../components/auth-layout';
import ForgotPasswordForm from './form';

export default async function ForgotPassword({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath: string }>;
}) {
    // Destructure redirectPath from searchParams
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
