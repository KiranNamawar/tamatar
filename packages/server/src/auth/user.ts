import prisma from "@/lib/db/prisma";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { verifyToken } from "@/lib/utils/jwt";
import { ErrorCode } from "@shared/constant";
import { getUserId } from "./utils";

builder.queryField("user", (t) =>
	t.prismaField({
		type: "User",
		resolve: async (query, _, __, ctx) => {
			const id = await getUserId(ctx);

			return prisma.user.findUnique({
				...query,
				where: { id },
			});
		},
	}),
);
