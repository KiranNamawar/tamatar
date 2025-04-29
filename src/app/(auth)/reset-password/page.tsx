/**
 * ResetPassword Page
 *
 * Server component for the reset password route. Renders the AuthLayout and ResetPasswordForm,
 * passing the reset token (context) and redirectPath from searchParams.
 *
 * - Integrates with the reset password form and handles post-submission redirection.
 * - Uses server-side rendering for SEO and performance.
 * - Handles missing or invalid reset token by showing a 404 page.
 *
 * @param searchParams - Promise resolving to an object with redirectPath and context (reset token)
 */
import { notFound } from 'next/navigation';
import ResetPasswordForm from './form';
import { verifyToken } from '@/utils/jwt';
import AuthLayout from '../components/auth-layout';

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: Promise<{ redirectPath: string; context: string }>;
}) {
    // Destructure redirectPath and context (reset token) from searchParams
    const { redirectPath = '/dashboard', context } = await searchParams;
    if (!context) {
        notFound();
    }

    return (
        <AuthLayout
            title="Reset Password"
            description="Enter your New Password"
        >
            <ResetPasswordForm token={context} redirectPath={redirectPath} />
        </AuthLayout>
    );
}
