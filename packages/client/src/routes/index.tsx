import { Button } from "@/components/ui/moving-border";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			Home Page
			<Link to="/auth/login">
				<Button className="cursor-pointer">Login</Button>
			</Link>
		</div>
	);
}
