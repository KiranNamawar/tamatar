import { useStore } from "@/hooks/useStore";
import { createMiddleware } from "@tanstack/react-start";

export const authHeader = createMiddleware().client(({ next }) => {
	return next({
		headers: {
			Authorization: `Bearer ${useStore.getState().auth.accessToken}`,
		},
	});
});
