'use server'; // Indicates that this file contains server-side actions

import { Return } from '@/types/return'; // Importing the Return type for consistent return structure
import {
    deleteAuthCookies,
    getAuthCookies,
    setAuthCookies,
} from '../utils/auth/cookies'; // Utility functions for handling authentication cookies
import {
    createUserSession,
    invalidateSessionByRefreshToken,
} from '../utils/auth/session'; // Function to invalidate a session using the refresh token
import { ActionReturn } from '@/types/actionReturn';
import * as v from 'valibot'; // Importing validation library
import { loginFormSchema, signupFormSchema } from '@/types/auth';
import { createUser, getUserByEmail } from '@/utils/auth/user';
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing
import { getUserAgent, parseUserAgent } from '@/utils/uaparser';
import { generateAccessToken } from '@/utils/auth/jwt';
import { redirect } from 'next/navigation';

/**
 * Logs out the user by invalidating their session and deleting authentication cookies.
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export default async function logoutAction(): Promise<Return<void>> {
    console.log('Starting logoutAction...');

    // Retrieve authentication cookies
    const authCookies = await getAuthCookies();
    if (!authCookies.ok) {
        console.error(
            'Failed to retrieve authentication cookies:',
            authCookies.message,
        );
        return {
            ok: false,
            error: authCookies.error,
            message: authCookies.message, // Return error if cookies are not found or invalid
        };
    }
    console.log('Authentication cookies retrieved successfully.');

    const { refreshToken } = authCookies.data; // Extract the refresh token from cookies
    console.log('Refresh token:', refreshToken.value);

    // Invalidate the session associated with the refresh token
    const session = await invalidateSessionByRefreshToken(refreshToken.value);
    if (!session.ok) {
        console.error('Failed to invalidate session:', session.message);
        return { ok: false, error: session.error, message: session.message }; // Return error if session invalidation fails
    }
    console.log('Session invalidated successfully.');

    // Delete authentication cookies
    const deleteCookies = await deleteAuthCookies();
    if (!deleteCookies.ok) {
        console.error(
            'Failed to delete authentication cookies:',
            deleteCookies.message,
        );
        return {
            ok: false,
            error: deleteCookies.error,
            message: deleteCookies.message, // Return error if cookie deletion fails
        };
    }
    console.log('Authentication cookies deleted successfully.');

    // Return success if all steps are completed
    console.log('Logout action completed successfully.');
    return { ok: true, data: undefined };
}

/**
 * Clears authentication cookies without invalidating the session.
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export async function clearAuthCookiesAction(): Promise<Return<void>> {
    console.log('Starting clearAuthCookiesAction...');

    // Delete authentication cookies
    const deleteCookies = await deleteAuthCookies();
    if (!deleteCookies.ok) {
        console.error(
            'Failed to delete authentication cookies:',
            deleteCookies.message,
        );
        return {
            ok: false,
            error: deleteCookies.error,
            message: deleteCookies.message, // Return error if cookie deletion fails
        };
    }
    console.log('Authentication cookies deleted successfully.');

    // Return success if cookies are deleted
    console.log('clearAuthCookiesAction completed successfully.');
    return { ok: true, data: undefined };
}

export async function signUpAction(
    prev: any,
    formData: FormData,
): Promise<ActionReturn<void>> {
    console.log('Starting signUpAction...');

    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    };

    const validationResult = v.safeParse(signupFormSchema, rawFormData);

    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.issues);
        return {
            status: 'error',
            error: validationResult.issues.map((issue) => issue.message),
        }; // Return error if validation fails
    }
    console.log('Validation succeeded:', validationResult.output);

    const { name, email, password } = validationResult.output; // Destructure validated data
    console.log('Validated data:', { name, email, password });

    const existingUser = await getUserByEmail(email); // Check if the user already exists
    if (existingUser.ok) {
        redirect('/login'); // Redirect to login if the user already exists
    }
    console.log('User does not exist, proceeding with signup.');

    const user = await createUser({
        name,
        email,
        password: await bcrypt.hash(password, 10), // Hash the password before storing it
    });

    if (!user.ok) {
        console.error('User creation failed:', user.message);
        return {
            status: 'error',
            error: user.message,
        }; // Return error if user creation fails
    }
    console.log('User created successfully:', user.data);

    const userAgent = parseUserAgent(formData.get('user-agent') as string);
    console.log('Parsed user agent:', userAgent);

    const session = await createUserSession(userAgent, user.data.id); // Create a session for the user
    if (!session.ok) {
        console.error('Session creation failed:', session.message);
        return {
            status: 'error',
            error: session.message,
        }; // Return error if session creation fails
    }
    console.log('Session created successfully:', session.data);

    const accessToken = await generateAccessToken(
        user.data.id,
        user.data.profile?.id || '',
    ); // Generate an access token for the user

    if (!accessToken.ok) {
        console.error('Access token generation failed:', accessToken.message);
        return {
            status: 'error',
            error: accessToken.message,
        }; // Return error if access token generation fails
    }
    console.log('Access token generated successfully:', accessToken.data);

    // Set authentication cookies with the access token and refresh token
    const authCookies = await setAuthCookies(
        accessToken.data,
        session.data.refreshToken,
    );
    if (!authCookies.ok) {
        console.error(
            'Failed to set authentication cookies:',
            authCookies.message,
        );
        return {
            status: 'error',
            error: authCookies.message,
        }; // Return error if cookie setting fails
    }
    console.log('Authentication cookies set successfully:', authCookies.data);
    return {
        status: 'success',
        data: undefined,
    };
}

export async function loginAction(
    prev: any,
    formData: FormData,
): Promise<ActionReturn<void>> {
    console.log('Starting loginAction...');

    const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const validationResult = v.safeParse(loginFormSchema, rawFormData);
    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.issues);
        return {
            status: 'error',
            error: validationResult.issues.map((issue) => issue.message),
        }; // Return error if validation fails
    }
    console.log('Validation succeeded:', validationResult.output);

    const { email, password } = validationResult.output; // Destructure validated data
    console.log('Validated data:', { email, password });

    const user = await getUserByEmail(email); // Check if the user exists
    if (!user.ok) {
        console.error('User not found:', user.message);
        return {
            status: 'error',
            error: user.message,
        }; // Return error if user not found
    }
    console.log('User found:', user.data);

    if (!user.data.password) {
        console.error('Password not found for user:', user.data.email);
        return {
            status: 'error',
            error: 'Password not found for user',
        }; // Return error if password is not found
    }
    console.log('Password found for user:', user.data.email);
    const isPasswordValid = await bcrypt.compare(
        password,
        user.data.password, // Compare the provided password with the stored hashed password
    );
    if (!isPasswordValid) {
        console.error('Invalid password for user:', user.data.email);
        return {
            status: 'error',
            error: 'Invalid password',
        }; // Return error if password is invalid
    }
    console.log('Password is valid for user:', user.data.email);

    const userAgent = parseUserAgent(formData.get('user-agent') as string);
    console.log('Parsed user agent:', userAgent);
    const session = await createUserSession(userAgent, user.data.id); // Create a session for the user
    if (!session.ok) {
        console.error('Session creation failed:', session.message);
        return {
            status: 'error',
            error: session.message,
        }; // Return error if session creation fails
    }
    console.log('Session created successfully:', session.data);
    
    const accessToken = await generateAccessToken(
        user.data.id,
        user.data.profile?.id || '',
    ); // Generate an access token for the user
    if (!accessToken.ok) {
        console.error('Access token generation failed:', accessToken.message);
        return {
            status: 'error',
            error: accessToken.message,
        }; // Return error if access token generation fails
    }
    console.log('Access token generated successfully:', accessToken.data);

    // Set authentication cookies with the access token and refresh token
    const authCookies = await setAuthCookies(
        accessToken.data,
        session.data.refreshToken,
    );
    if (!authCookies.ok) {
        console.error(
            'Failed to set authentication cookies:',
            authCookies.message,
        );
        return {
            status: 'error',
            error: authCookies.message,
        }; // Return error if cookie setting fails
    }
    console.log('Authentication cookies set successfully:', authCookies.data);

    return {
        status: 'success',
        data: undefined,
    };
}
