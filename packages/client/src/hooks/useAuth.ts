import { type LinkProps, useNavigate } from "@tanstack/react-router";
import { useStore } from "./useStore";



export function useAuth({ from }: { from: LinkProps["from"] }) {
	const navigate = useNavigate();
	const accessToken = useStore((state) => state.auth.accessToken);
	if (!accessToken) {
		return navigate({ to: "/auth/login", search: { rdt: from } });
	}
	return true
}
