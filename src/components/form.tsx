'use client';

/**
 * Form components for handling form state, validation, and submission
 *
 * This module provides reusable form components that integrate with react-hook-form
 * and zod for validation, with support for server-side errors.
 *
 * Components:
 * - FormWrapper: Main wrapper for form state, validation, and submission.
 * - FormFieldWrapper: Wrapper for consistent field rendering and error display.
 * - FormAlert: Displays form-level error messages.
 */
import { useEffect, useRef, startTransition, ReactNode } from 'react';
import {
    Control,
    ControllerRenderProps,
    FieldPath,
    useForm,
    UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, z } from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

/**
 * Client-side logger for form-related events
 * Uses console methods with consistent formatting
 */
// Simple logger for debugging form events in development.
const logger = {
    debug: (context: Record<string, any>, message: string) => {
        console.debug(`[Form] ${message}`, context);
    },
    info: (context: Record<string, any>, message: string) => {
        console.info(`[Form] ${message}`, context);
    },
    warn: (context: Record<string, any>, message: string) => {
        console.warn(`[Form] ${message}`, context);
    },
    error: (context: Record<string, any>, message: string) => {
        console.error(`[Form] ${message}`, context);
    },
};

/**
 * Type definition for server-side validation errors
 */
type ServerErrors<T> = Partial<Record<keyof T, string[]>>;

/**
 * FormWrapper: Main wrapper component that handles form state, validation, and submission.
 * Integrates with react-hook-form and zod schema, and displays server-side errors.
 *
 * @param action - Server action to call on form submission
 * @param schema - Zod schema for form validation
 * @param defaultValues - Default values for form fields
 * @param serverErrors - Server-side validation errors
 * @param children - Render function for form content
 */
export function FormWrapper<TSchema extends ZodSchema>({
    action,
    schema,
    defaultValues,
    className,
    serverErrors,
    children,
}: {
    action: (formData: FormData) => void;
    schema: TSchema;
    defaultValues: z.infer<TSchema>;
    className?: string;
    serverErrors?: ServerErrors<z.infer<TSchema>>;
    children: (form: UseFormReturn<z.infer<TSchema>>) => ReactNode;
}) {
    // Initialize form with schema validation
    const form = useForm<z.infer<TSchema>>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onBlur',
    });

    const formRef = useRef<HTMLFormElement>(null);

    // Handle server-side errors
    useEffect(() => {
        if (serverErrors) {
            logger.debug({ serverErrors }, 'Received server-side errors');
            Object.entries(serverErrors).forEach(([key, value]) => {
                if (value?.length) {
                    form.setError(key as FieldPath<z.infer<TSchema>>, {
                        type: 'server',
                        message: value[0],
                    });
                    logger.info(
                        { field: key, error: value[0] },
                        'Setting field error from server',
                    );
                }
            });
        }
    }, [serverErrors, form]);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                className={className}
                onSubmit={form.handleSubmit(() => {
                    if (!formRef.current) {
                        logger.warn(
                            {},
                            'Form submission attempted but form ref is null',
                        );
                        return;
                    }

                    const formData = new FormData(formRef.current);
                    logger.info(
                        { formId: formRef.current.id || 'unknown' },
                        'Form submitted',
                    );

                    startTransition(() => {
                        action(formData);
                    });
                })}
            >
                <div aria-live="polite" className="sr-only">
                    {Object.values(form.formState.errors)
                        .map((error) => error!.message)
                        .join(', ')}
                </div>
                {children(form)}
            </form>
        </Form>
    );
}

/**
 * FormAlert: Alert component for displaying form-level errors
 *
 * @param id - Error identifier
 * @param message - Error message to display
 */
export function FormAlert({ id, message }: { id: string; message: string }) {
    // If no message is provided, return null
    if (!message) return null;

    // Log form-level errors when they're displayed
    logger.warn({ id, message }, 'Displaying form error alert');

    // Render the alert component with the provided message
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>{id}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

/**
 * FormFieldWrapper: Wrapper for individual form fields with consistent styling and error handling
 *
 * @param control - Form control from react-hook-form
 * @param name - Field name
 * @param label - Field label
 * @param children - Render function for the field input
 */
export function FormFieldWrapper<TFormValues extends Record<string, any>>({
    control,
    name,
    label,
    extraLabel,
    className,
    description,
    children,
}: {
    control: Control<TFormValues>;
    name: FieldPath<TFormValues>;
    label: string;
    extraLabel?: ReactNode;
    className?: string;
    description?: string;
    children: (field: ControllerRenderProps<TFormValues, any>) => ReactNode;
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <div className="flex items-center justify-between">
                        <FormLabel>{label}</FormLabel>
                        {extraLabel && (
                            <span className="text-sm text-gray-500">
                                {extraLabel}
                            </span>
                        )}
                    </div>
                    <FormControl>{children(field)}</FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
