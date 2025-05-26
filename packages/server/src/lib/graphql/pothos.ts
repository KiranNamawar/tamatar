import SchemaBuilder from "@pothos/core";
import ZodPlugin from "@pothos/plugin-zod";
import PrismaPlugin from "@pothos/plugin-prisma";
import prisma from "../db/prisma";
import type PrismaTypes from "@/generated/pothos-types";
import { DateTimeResolver } from "graphql-scalars";
import { AppError } from "../utils/error";
import { ErrorCode } from "@shared/constant";

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
	}
});

builder.addScalarType("DateTime", DateTimeResolver);

export default builder;
