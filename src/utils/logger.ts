import pino from 'pino';

/**
 * Main application logger instance (Pino-based).
 *
 * This logger is configured to log messages at the 'warn' level in production
 * environments and at the 'debug' level in non-production environments.
 *
 * In production environments, logs are transported to Datadog using the
 * pino-datadog-transport target.
 */
const logger =
    process.env.NODE_ENV === 'production'
        ? pino({
              level: 'info',
              transport: {
                  target: 'pino-datadog-transport',
                  options: {
                      ddClientConf: {
                          authMethods: {
                              apiKeyAuth: process.env.DATADOG_API_KEY,
                          },
                      },
                      ddServerConf: {
                          site: 'us5.datadoghq.com',
                      },
                      ddtags: 'site:tamatar.store,env:production',
                      ddsource: 'nextjs',
                  },
              },
          })
        : pino({
              level: 'debug',
          });

/**
 * Creates a child logger with additional context (e.g., file/module).
 * @param bindings - Context bindings for the child logger
 * @returns Child logger instance
 */
export default logger;
