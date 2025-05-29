// Google OAuth Button Component
// Handles Google login/signup using react-oauth and GraphQL backend.

import { Button } from "@/components/ui/button";
import { graphql, graphqlRequest } from "@/graphql";
import { useGoogleLogin } from "@react-oauth/google";
import { type LinkProps, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { setAuthCookie } from "../utils/cookies";

// --- GraphQL Mutation ---
/**
 * Mutation for Google OAuth login/signup.
 * Accepts Google access token, returns access and refresh tokens.
 */
const googleQuery = graphql(`
	mutation Google ($token : String!) {
		google(token: $token) {
			accessToken
			refreshToken
		}
	}
`);

// --- Server Function ---
/**
 * Server function to handle Google OAuth login/signup.
 * Sets auth cookie on success.
 */
const google = createServerFn({
	method: "POST",
})
	.validator((token: string) => {
		return { token };
	})
	.handler(async ({ data }) => {
		const response = await graphqlRequest({
			query: googleQuery,
			variables: { token: data.token },
			clientOptions: {
				isAuthenticated: false,
			},
		});
		if (response.success) {
			setAuthCookie(response.data.google?.refreshToken ?? "");
			return {
				success: true,
				data: response.data.google?.accessToken ?? null,
			};
		}
		return response;
	});

/**
 * GoogleButton Props
 *   - setAccessToken: (token: string | null) => void
 *   - rdt: LinkProps["to"] (redirect target after login/signup)
 *   - route: "login" | "signup" (button label context)
 */
function GoogleButton({
	setAccessToken,
	rdt,
	route,
}: {
	setAccessToken: (token: string | null) => void;
	rdt: LinkProps["to"];
	route: "login" | "signup";
}) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const login = useGoogleLogin({
		onSuccess: async ({ access_token }) => {
			setLoading(true);
			const res = await google({ data: access_token });
			if (res.success) {
				setAccessToken(res.data ?? null);
				setLoading(false);
				return navigate({
					to: rdt,
					replace: true,
				});
			}
			if ("error" in res && res.error) {
				toast.error(res.error.message);
			}
			setLoading(false);
		},
		onError: (err) => {
			toast.error(err.error_description);
			setLoading(false);
		},
	});
	return (		<Button
			variant="outline"
			type="button"
			className="w-full bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 border-2 border-red-200 hover:border-orange-300 text-gray-700 dark:text-gray-200 dark:from-gray-800 dark:to-gray-900 dark:border-red-600 dark:hover:border-orange-500 shadow-lg hover:shadow-xl transition-all duration-300"
			onClick={() => login()}
			pending={loading}
		>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="100"
					height="100"
					viewBox="0 0 48 48"
				>
					<title>Google logo</title>
					<path
						fill="#FFC107"
						d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
					/>
					<path
						fill="#FF3D00"
						d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
					/>
					<path
						fill="#4CAF50"
						d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
					/>
					<path
						fill="#1976D2"
						d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
					/>
				</svg>
			</span>
			{route === "login" ? "Log in with Google" : "Sign up with Google"}
		</Button>
	);
}

export default GoogleButton;
