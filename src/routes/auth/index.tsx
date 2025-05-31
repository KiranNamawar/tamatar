import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
	beforeLoad: () => {
		// Redirect to login by default when visiting /auth
		throw redirect({
			to: "/auth/login",
		});
	},
});
