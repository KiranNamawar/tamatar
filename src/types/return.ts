// This file defines various return types used in server actions and utility functions.

import { ErrorObject } from "@/utils/error";

/**
 * Generic return type for server actions
 *
 * This type is used to standardize the return values of server actions,
 * providing a consistent structure for success and error handling.
 *
 * @property success - Indicates whether the operation was successful
 * @property error - Contains an error message if the operation failed
 * @property data - Contains the result data if the operation was successful
 *
 * @example
 * ```TypeScript
 * export async function fetchData(): Promise<Return<DataType>> {
 *   try {
 *     const data = await fetchSomeData();
 *     return { success: true, data };
 *   } catch (error) {
 *     return { success: false, error: 'Failed to fetch data' };
 *   }
 * }
 * ```
 */
export type Return<T> = {
    /**
     * Indicates the operation success status
     */
    success: boolean;

    /**
     * Contains the error message explaining what went wrong
     */
    error?: string;

    /**
     * Contains the operation result data
     */
    data?: T;
    /**
     * Metadata for additional context or information
     */
    metadata?: {
        [key: string]: never;
    };
};



/**
 * Specialized return type for form handling server actions
 *
 * This type provides a structure specifically designed for form submissions,
 * with support for field-level validation, form-wide errors, and preserving
 * field values for re-rendering the form with errors.
 *
 * @property success - Boolean indicating if the form submission was successful
 * @property fields - Field values to repopulate the form on error
 * @property errors - Validation errors for specific form fields
 * @property formErrors - General errors that apply to the entire form
 *
 * @example
 * ```TypeScript
 * export async function createUser(formData: FormData): Promise<FormActionReturn> {
 *   // Validate form data
 *   const email = formData.get('email') as string;
 *   const errors: Record<string, string[]> = {};
 *
 *   if (!isValidEmail(email)) {
 *     errors.email = ['Please enter a valid email address'];
 *   }
 *
 *   // If validation fails, return errors and fields
 *   if (Object.keys(errors).length > 0) {
 *     return {
 *       success: false,
 *       errors,
 *       fields: Object.fromEntries(formData),
 *       formErrors: ['Please correct the errors below']
 *     };
 *   }
 *
 *   try {
 *     // Process the form
 *     await db.users.create({ data: { email } });
 *     return { success: true };
 *   } catch (err) {
 *     return {
 *       success: false,
 *       fields: Object.fromEntries(formData),
 *       formErrors: ['An unexpected error occurred. Please try again.']
 *     };
 *   }
 * }
 * ```
 */
export type FormActionReturn<T> = {
    /**
     * Indicates whether the form submission was successful
     */
    success: boolean;

    /**
     * Contains the submitted field values for re-populating the form
     * when validation fails, preserving user input
     */
    fields?: Record<string, string>;

    /**
     * Contains validation errors for specific form fields
     * Keys correspond to input names, values are arrays of error messages
     */
    errors?: Record<string, string[]>;

    /**
     * Contains general form-level error messages
     * These are errors that don't apply to a specific field
     */
    formError?: ErrorObject;

    /**
     * Metadata for additional context or information
     */
    metadata?: T;
    /**
     * Additional metadata related to the form submission
     * This can include information like the submission context
     * or any other relevant data
     */
};

/**
 * Utility return type for generic utility functions
 *
 * This type is used to standardize the return values of utility functions,
 * providing a consistent structure for success and error handling.
 *
 * @property success - Indicates whether the operation was successful
 * @property data - Contains the result data if the operation was successful
 *
 * @example
 * ```TypeScript
 * export function calculateSum(a: number, b: number): UtilityReturn<number> {
 *   return a + b;
 * }
 * ```
 */
export type UtilityReturn<T> = T;

/**
 * Action return type for server actions
 *
 * This type is used to standardize the return values of server actions,
 * providing a consistent structure for success and error handling.
 *
 * @property success - Indicates whether the operation was successful
 * @property data - Contains the result data if the operation was successful
 * @property error - Contains an error message if the operation failed
 * @property metadata - Additional metadata related to the action
 *
 * @example
 * ```TypeScript
 * export async function fetchData(): Promise<ActionReturn<DataType>> {
 *   try {
 *     const data = await fetchSomeData();
 *     return { success: true, data };
 *   } catch (error) {
 *     return { success: false, error: { id: 'fetch_error', message: 'Failed to fetch data' } };
 *   }
 * }
 * ```
 */
export type ActionReturn<T> = {
    success: boolean;
    data?: T;
    error?: {
        id: string;
        message: string;
    };
    metadata?: {
        [key: string]: never;
    };
};
