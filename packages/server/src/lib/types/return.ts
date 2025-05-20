import type { ErrorCode } from "../utils/error";

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
