import type { ErrorCode } from "@shared/constant";

export type Return<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: {
				message: string;
				code: ErrorCode;
			};
	  };
