import { z } from 'zod';
import { FormActionReturn } from '@/types/return';
import logger from '@/utils/logger';

// Create a child logger for form utilities
const log = logger.child({ file: 'src/utils/form.ts' });

/**
 * Type definition for form validation results.
 *
 * @template T - The type of the validated data
 *
 * This type represents either:
 * - A successful validation with the parsed data
 * - A failed validation with field values and error messages
 */
type ValidationResult<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          fields: Record<string, string>;
          errors: Record<string, string[]>;
      };

/**
 * Type guard to check if the provided data is a FormData instance.
 *
 * @param data - The data to check
 * @returns True if data is FormData, false otherwise
 */
function isFormData(data: unknown): data is FormData {
    log.debug('Checking if data is FormData');
    return typeof FormData !== 'undefined' && data instanceof FormData;
}

/**
 * Normalizes form data into a consistent Record format.
 *
 * @param formData - The form data to normalize (either FormData or Record)
 * @returns A normalized Record object with form values
 */
function normalizeFormData(
    formData: FormData | Record<string, unknown>,
): Record<string, unknown> {
    log.debug('Normalizing form data');
    const result = isFormData(formData)
        ? Object.fromEntries(formData.entries())
        : formData;
    log.debug({ formDataKeys: Object.keys(result) }, 'Form data normalized');
    return result;
}

/**
 * Converts all form values to strings.
 *
 * @param formValues - The form values to convert
 * @returns A Record with all values converted to strings
 *
 * Note: Null or undefined values are converted to empty strings.
 */
function convertToStringFields(
    formValues: Record<string, unknown>,
): Record<string, string> {
    log.debug('Converting form values to strings');
    return Object.fromEntries(
        Object.entries(formValues).map(([key, value]) => [
            key,
            String(value ?? ''),
        ]),
    );
}

/**
 * Normalizes Zod validation errors into a consistent format.
 *
 * @param error - The Zod validation error
 * @returns A Record mapping field names to arrays of error messages
 */
function normalizeValidationErrors<TSchema extends z.ZodTypeAny>(
    error: z.ZodError<z.infer<TSchema>>,
): Record<string, string[]> {
    log.debug({ error: error.message }, 'Normalizing validation errors');
    const normalizedErrors = Object.fromEntries(
        Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value ?? [],
        ]),
    ) as Record<string, string[]>;

    log.debug(
        {
            errorFields: Object.keys(normalizedErrors),
            errorCount: Object.values(normalizedErrors).flat().length,
        },
        'Validation errors normalized',
    );

    return normalizedErrors;
}

/**
 * Validates form data against a Zod schema (synchronous version).
 *
 * @template TSchema - The Zod schema type
 * @param formData - The form data to validate (either FormData or Record)
 * @param schema - The Zod schema to validate against
 * @returns A ValidationResult containing either the validated data or validation errors
 *
 * This function handles both FormData objects and plain JavaScript objects,
 * normalizing them before validation.
 */
export function validateForm<TSchema extends z.ZodTypeAny>(
    formData: FormData | Record<string, unknown>,
    schema: TSchema,
): ValidationResult<z.infer<TSchema>> {
    log.debug(
        { schemaName: schema.description || 'unnamed schema' },
        'Starting form validation',
    );

    const formValues = normalizeFormData(formData);
    const parsedResult = schema.safeParse(formValues);

    if (parsedResult.success) {
        log.debug('Form validation successful');
        return {
            success: true,
            data: parsedResult.data,
        };
    }

    log.debug(
        {
            errorCount: parsedResult.error.errors.length,
            firstError: parsedResult.error.errors[0]?.message,
        },
        'Form validation failed',
    );

    return {
        success: false,
        fields: convertToStringFields(formValues),
        errors: normalizeValidationErrors(parsedResult.error),
    };
}

/**
 * Validates form data against a Zod schema asynchronously.
 *
 * @template TSchema - The Zod schema type
 * @param formData - The form data to validate (either FormData or Record)
 * @param schema - The Zod schema to validate against
 * @returns A Promise resolving to a FormActionReturn with a validation result
 *
 * This function is useful when the schema contains async validation rules.
 * It handles both FormData objects and plain JavaScript objects.
 */
export async function validateFormAsync<TSchema extends z.ZodTypeAny>(
    formData: FormData | Record<string, unknown>,
    schema: TSchema,
): Promise<FormActionReturn<undefined> & { data?: z.infer<TSchema> }> {
    log.debug(
        { schemaName: schema.description || 'unnamed schema' },
        'Starting async form validation',
    );

    const formValues = normalizeFormData(formData);
    const parsed = await schema.safeParseAsync(formValues);

    if (!parsed.success) {
        log.debug(
            {
                errorCount: parsed.error.errors.length,
                firstError: parsed.error.errors[0]?.message,
            },
            'Async form validation failed',
        );

        return {
            success: false,
            fields: convertToStringFields(formValues),
            errors: normalizeValidationErrors(parsed.error),
        };
    }

    log.debug('Async form validation successful');
    return {
        success: true,
        data: parsed.data,
    };
}
