import pino from "pino";

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