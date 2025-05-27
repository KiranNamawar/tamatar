// Auth GraphQL Object Types and Payloads
// Defines GraphQL types for User, Session, Otp, and AuthPayload for authentication flows.

import { OtpPurpose, Role } from "@/generated/prisma";
import builder from "../lib/graphql/pothos";

// --- Enum Types ---
builder.enumType(Role, {
	name: "Role",
});

// --- User Object ---
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

// --- Session Object ---
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

// --- Otp Object ---
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

// --- AuthPayload Object ---
/**
 * AuthPayload: Returned by login/signup/Google mutations.
 * Contains access and refresh tokens.
 */
interface AuthPayload {
	accessToken: string | null;
	refreshToken: string | null;
}

const authPayloadRef = builder.objectRef<AuthPayload>("AuthPayload");

authPayloadRef.implement({
	fields: (t) => ({
		accessToken: t.exposeString("accessToken", {
			nullable: true,
		}),
		refreshToken: t.exposeString("refreshToken", {
			nullable: true,
		}),
	}),
});

export const AuthPayload = authPayloadRef; // Export the reference for use in other parts of the code
