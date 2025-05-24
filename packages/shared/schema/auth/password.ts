import z from "zod";

export const PASSWORD_SCHEMA = z
.string()
.trim()
.min(8, "Password must be at least 8 characters")
.refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
})
.refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
})
.refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
})
.refine((val) => /[\W_]/.test(val), {
    message: "Password must contain at least one symbol",
});