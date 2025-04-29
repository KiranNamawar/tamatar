import { throwAppError } from './error';
import logger from './logger';
import { UtilityReturn } from '@/types/return';

const log = logger.child({ file: 'src/utils/env.ts' });

/**
 * Retrieves an environment variable and throws an error if it's not set.
 *
 * @param variable - The name of the environment variable to retrieve
 * @returns The value of the environment variable
 * @throws AppError if the environment variable is not set
 */
export const getEnvironmentVariable = (
    variable: string,
): UtilityReturn<string> => {
    log.debug({ variable }, 'Accessing environment variable');
    const value = process.env[variable];
    if (!value) {
        throwAppError(
            'getEnvironmentVariable',
            `${variable} is not set in environment variables`,
            log,
        );
    }
    return value;
};

/**
 * Retrieves an environment variable with a fallback value if not set.
 *
 * @param variable - The name of the environment variable to retrieve
 * @param defaultValue - The default value to use if the environment variable is not set
 * @param sensitive - Whether the value is sensitive and should be masked in logs
 * @returns The value of the environment variable or the default value
 */
export const getEnvironmentVariableWithDefault = (
    variable: string,
    defaultValue: string,
    sensitive = false,
): UtilityReturn<string> => {
    const value = process.env[variable];
    const result = value || defaultValue;

    if (value) {
        log.debug(
            {
                variable,
                value: sensitive ? '******' : result.substring(0, 3) + '...',
            },
            'Retrieved environment variable',
        );
    } else {
        log.debug({ variable }, 'Using default value for environment variable');
    }

    return result;
};
