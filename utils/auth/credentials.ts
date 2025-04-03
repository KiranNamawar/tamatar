import { Return } from '@/types/return';
import { getAccessToken } from './cookies';
import { verifyAccessToken } from './jwt';

/**
 * Retrieves the profile ID of the currently authenticated user.
 * @returns A promise containing the result of the profile ID retrieval.
 */
export async function getProfileId(): Promise<Return<string>> {
    console.log('Starting getProfileId...');

    // Step 1: Retrieve the access token from cookies
    const accessToken = await getAccessToken();
    if (!accessToken.ok) {
        console.error('Failed to retrieve access token:', {
            error: accessToken.error,
            message: accessToken.message,
        });
        return {
            ok: false,
            error: accessToken.error,
            message: accessToken.message,
        };
    }
    console.log('Access token retrieved successfully:', accessToken.data.value);

    // Step 2: Verify the access token to extract the payload
    const payload = await verifyAccessToken(accessToken.data.value);
    if (!payload.ok) {
        console.error('Failed to verify access token:', {
            error: payload.error,
            message: payload.message,
        });
        return {
            ok: false,
            error: payload.error,
            message: payload.message,
        };
    }
    console.log('Access token verified successfully. Payload:', payload.data);

    // Step 3: Return the profile ID from the payload
    console.log('Profile ID retrieved successfully:', payload.data.profileId);
    return {
        ok: true,
        data: payload.data.profileId,
    };
}
