import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "../providers/theme-provider";
import { GradientText } from "./aurora";
import { GlassNav } from "./glass";
import { MotionDiv } from "./motion";

export default function Header() {
	return (
		<MotionDiv animation="fadeInUp" className="sticky top-0 z-50 w-full">
			<GlassNav className="flex items-center justify-between px-6 py-4">
				<nav className="flex items-center space-x-6">
					<Link
						to="/"
						className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
					>
						<GradientText className="text-2xl font-bold">Tamatar</GradientText>
					</Link>

					<div className="hidden md:flex items-center space-x-4">
						<Link
							to="/"
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							Home
						</Link>
					</div>
				</nav>

				<div className="flex items-center space-x-4">
					<ThemeToggle />
				</div>
			</GlassNav>
		</MotionDiv>
	);
}
