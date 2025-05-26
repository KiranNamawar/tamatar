import { Button } from "@/components/ui/button";

function GoogleButton({ route }: { route: "login" | "signup" }) {
	return (
		<Button variant="outline" className="w-full">
			{route === "login" ? "Log in with Google" : "Sign up with Google"}
		</Button>
	);
}

export default GoogleButton;