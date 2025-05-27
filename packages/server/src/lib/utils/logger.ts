// Logger Utility
// Provides a Pino-based logger configured for production and development environments.

import pino from "pino";

/**
 * The logger instance is configured differently for production and development:
 *
 * - In production, logs are sent to Datadog using the pino-datadog-transport.
 * - In development, logs are pretty-printed to the console with color and time translation.
 * - Sensitive fields (like data.password) are redacted from logs.
 *
 * Usage:
 *   import logger from './logger';
 *   logger.info('message');
 */
const logger =
	process.env.NODE_ENV === "production"
		? pino({
				level: "warn",
				transport: {
					target: "pino-datadog-transport",
					options: {
						ddClientConf: {
							authMethods: {
								apiKeyAuth: process.env.DATADOG_API_KEY,
							},
						},
						ddServerConf: {
							site: "us5.datadoghq.com",
						},
						ddtags: "domain:graphql.tamatar.store",
					},
				},
			})
		: pino({
				level: "debug",
				transport: {
					target: "pino-pretty",
					options: {
						colorize: true,
						translateTime: "SYS:standard",
						ignore: "pid,hostname",
					},
				},
				redact: {
					paths: ["data.password"],
				},
			});

export default logger;
