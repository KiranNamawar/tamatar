import { OtpPurpose, Role } from "@/generated/prisma";
import builder from "../lib/graphql/pothos";

builder.enumType(Role, {
	name: "Role",
});

builder.prismaObject("User", {
	fields: (t) => ({
		id: t.exposeID("id"),
		firstName: t.exposeString("firstName"),
		lastName: t.exposeString("lastName", { nullable: true }),
		email: t.exposeString("email"),
		username: t.exposeString("username"),
		picture: t.exposeString("picture", { nullable: true }),
		role: t.expose("role", { type: Role }),
		createdAt: t.expose("createdAt", { type: "DateTime" }),
		updatedAt: t.expose("updatedAt", { type: "DateTime" }),
		sessions: t.relation("sessions"),
		otps: t.relation("otps"),
	}),
});

builder.prismaObject("Session", {
    fields: (t) => ({
        id: t.exposeID("id"),
        userId: t.exposeString("userId"),
        user: t.relation("user"),
        isValid: t.exposeBoolean("isValid"),
        userAgent: t.exposeString("userAgent", { nullable: true }),
        expiresAt: t.expose("expiresAt", { type: "DateTime" }),
        createdAt: t.expose("createdAt", { type: "DateTime" }),
        updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    }),
});

builder.enumType(OtpPurpose, {
	name: "OtpPurpose",
});

builder.prismaObject("Otp", {
    fields: (t) => ({
        id: t.exposeID("id"),
        userId: t.exposeString("userId"),
        user: t.relation("user"),
        code: t.exposeString("code"),
        purpose: t.expose("purpose", { type: OtpPurpose }),
        mailId: t.exposeString("mailId", { nullable: true }),
        expiresAt: t.expose("expiresAt", { type: "DateTime" }),
        createdAt: t.expose("createdAt", { type: "DateTime" }),
        updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    }),
});