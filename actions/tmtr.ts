'use server';
import { ActionReturn } from '@/types/actionReturn';
import { createUrlFormSchema } from '@/types/tmtr';
import { getProfileId } from '@/utils/auth/credentials';
import { createUrl } from '@/utils/tmtr/url';
import { nanoid } from 'nanoid';
import * as v from 'valibot';

export async function shortenAction(
    prev: any,
    formData: FormData,
): Promise<ActionReturn<{ newUrl: string }>> {
    console.log('Starting shortenAction...');

    const rawOriginalUrl = formData.get('originalUrl') as string;
    console.log('Received Original URL:', rawOriginalUrl);

    // Validate the form data
    const validation = v.safeParse(
        createUrlFormSchema,
        { originalUrl: rawOriginalUrl },
        {
            abortEarly: true,
        },
    );
    if (!validation.success) {
        console.error('Validation failed:', validation.issues[0].message);
        return {
            status: 'error',
            error: validation.issues[0].message,
        };
    }
    console.log('Validation successful:', validation.output);

    const originalUrl = validation.output.originalUrl;
    console.log('Original URL:', originalUrl);

    // Generate a short code
    const shortCode = nanoid(6);
    console.log('Generated short code:', shortCode);

    // Get the profile ID from the session
    const profileId = await getProfileId();
    if (!profileId.ok) {
        console.error('Failed to get profile ID:', profileId.error);
        return {
            status: 'error',
            error: 'Failed to get profile ID',
        };
    }
    console.log('Profile ID:', profileId.data);

    // Save the short code to the database
    console.log('Saving short code to the database...');
    const url = await createUrl({
        originalUrl,
        shortCode,
        profileId: profileId.data,
    });
    if (!url.ok) {
        console.error('Failed to create URL:', url.error);
        return {
            status: 'error',
            error: 'Failed to create URL',
        };
    }
    console.log('URL created successfully:', url.data);

    const newUrl = `https://tmtr.xyz/${url.data.shortCode}`;
    console.log('Shortened URL created:', newUrl);

    return {
        status: 'success',
        data: {
            newUrl,
        },
    };
}
