import { Prisma } from "@/generated/prisma";
import { AppError } from "../utils/error";
import { ErrorCode } from "@shared/constant";

export class DatabaseError extends AppError {
	constructor(error: any) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			super(`[${error.code}] ${error.message}`, {
				code: ErrorCode.DATABASE_ERROR,
                metadata: error.meta
			});
		} else {
			super(error.message, {
				code: ErrorCode.DATABASE_ERROR,
			});
		}
	}
}
