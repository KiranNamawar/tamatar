import { GraphQLError } from "graphql";
import type { ErrorCode } from "@shared/constant";

export class AppError extends GraphQLError {
	constructor(
		message: string,
		{
			code,
			metadata,
			...extensions
		}: {
			code: ErrorCode;
			metadata?: Record<string, unknown>;
			[key: string]: unknown;
		},
	) {
		super(message, {
			extensions: {
				code,
				metadata,
				...extensions,
			},
		});
		this.name = "AppError";
	}
}
