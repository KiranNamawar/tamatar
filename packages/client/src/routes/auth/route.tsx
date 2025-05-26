import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<Outlet />
			</GoogleOAuthProvider>
		</div>
	);
}
