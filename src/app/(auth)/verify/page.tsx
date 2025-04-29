/**
 * VerifyPage
 *
 * Server component for the OTP verification route. Renders the AuthLayout and OtpForm,
 * passing the context (token) and redirectPath from searchParams.
 *
 * - Integrates with the OTP form and handles post-verification redirection.
 * - Uses server-side rendering for SEO and performance.
 * - Handles missing or invalid context by showing a 404 page.
 *
 * @param searchParams - Promise resolving to an object with redirectPath and context (token)
 */
import { notFound } from 'next/navigation';
import OtpForm from './form';
import AuthLayout from '../components/auth-layout';

export default async function VerifyPage({
    searchParams,
}: {
    searchParams: Promise<{
        redirectPath?: string;
        context?: string;
    }>;
}) {
    // Destructure redirectPath and context (token) from searchParams
    const { redirectPath = '/dashboard', context } = await searchParams;
    if (!context) {
        notFound();
    }

    return (
        <AuthLayout
            title="Verify"
            description="Verify your email address to continue"
        >
            {context && (
                <OtpForm context={context} redirectPath={redirectPath} />
            )}
        </AuthLayout>
    );
}
