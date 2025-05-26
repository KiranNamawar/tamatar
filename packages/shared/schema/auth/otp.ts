import { z } from "zod";
import { OtpPurpose } from "../../constant"

export const otpForm = z.object({
	email: z.string().trim().email("Invalid email format"),
	code: z
		.string()
		.min(6, "Code must be at least 6 digits")
		.max(6, "Code must be at most 6 digits")
		.regex(/^[0-9]+$/, "Code must be a 6-digit number"),
    purpose: z.nativeEnum(OtpPurpose)
});
