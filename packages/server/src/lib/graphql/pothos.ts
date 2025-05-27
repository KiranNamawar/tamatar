// Pothos GraphQL Schema Builder Utility
// Configures and exports a Pothos schema builder with Zod and Prisma plugins, custom scalars, and error handling.

import SchemaBuilder from "@pothos/core";
import ZodPlugin from "@pothos/plugin-zod";
import PrismaPlugin from "@pothos/plugin-prisma";
import prisma from "../db/prisma";
import type PrismaTypes from "@/generated/pothos-types";
import { DateTimeResolver } from "graphql-scalars";
import { AppError } from "../utils/error";
import { ErrorCode } from "@shared/constant";

/**
 * The Pothos schema builder is configured with:
 * - Zod plugin for input validation (returns AppError on validation failure)
 * - Prisma plugin for database integration
 * - Custom DateTime scalar
 *
 * Usage:
 *   import builder from './pothos';
 *   // Use builder to define GraphQL types, queries, and mutations
 */
const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Scalars: {
		DateTime: {
			Input: Date;
			Output: Date;
		};
	};
}>({
	plugins: [ZodPlugin, PrismaPlugin],
	zod: {
		validationError: (zodError, args, context, info) =>
			new AppError("Input validation failed", {
				code: ErrorCode.INVALID_INPUT,
				metadata: zodError.flatten().fieldErrors,
			}),
	},
	prisma: {
		client: prisma,
		onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
	},
});

builder.addScalarType("DateTime", DateTimeResolver);

export default builder;
