import { SignJWT, jwtVerify } from 'jose'; // Library for signing and verifying JWTs
import { ErrorType, Return } from '../../types/return'; // Types for consistent return structure

// Secret key for signing and verifying JWTs
const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
const alg = 'HS256'; // Algorithm used for signing the JWT

/**
 * Generates an access token containing the user ID and profile ID.
 * @param {string} userId - The user ID to include in the token.
 * @param {string} profileId - The profile ID to include in the token.
 * @returns {Promise<Return<string>>} - A promise that resolves to the generated access token or an error.
 */
export async function generateAccessToken(
    userId: string,
    profileId: string,
): Promise<Return<string>> {
    console.log('Starting generateAccessToken...');
    if (!profileId) {
        console.error('Profile ID is required to generate access token');
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Profile ID is required to generate access token',
        };
    }

    try {
        // Create and sign the JWT
        const accessToken = await new SignJWT({ userId, profileId })
            .setExpirationTime('15m') // Token expires in 15 minutes
            .setProtectedHeader({ alg }) // Set the algorithm in the header
            .sign(secret);

        console.log('Access token generated successfully.');
        return { ok: true, data: accessToken };
    } catch (error) {
        console.error('Error generating access token:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to generate access token',
        };
    }
}

/**
 * Verifies an access token and extracts the payload.
 * @param {string} accessToken - The access token to verify.
 * @returns {Promise<Return<{ userId: string, profileId: string }>>} - A promise that resolves to the payload or an error.
 */
export async function verifyAccessToken(
    accessToken: string,
): Promise<Return<{ userId: string; profileId: string }>> {
    console.log('Starting verifyAccessToken...');
    try {
        // Verify the JWT and extract the payload
        const { payload } = await jwtVerify(accessToken, secret);
        const { userId, profileId } = payload as {
            userId: string;
            profileId: string;
        };

        console.log('Access token verified successfully. Payload:', {
            userId,
            profileId,
        });
        return { ok: true, data: { userId, profileId } };
    } catch (error) {
        console.error('Error verifying access token:', error);
        return {
            ok: false,
            error: ErrorType.authentication,
            message: 'Failed to verify access token',
        };
    }
}
