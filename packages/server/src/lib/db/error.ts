import { Prisma } from "@/generated/prisma";
import { AppError, ErrorCode } from "../utils/error";

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
