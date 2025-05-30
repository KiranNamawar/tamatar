import SectionWrapper from "@/components/layout/SectionWrapper";
import FloatingBackground from "@/components/ui/FloatingBackground";
import { GlassCard } from "@/components/ui/glass-card";
import type { FloatingItem } from "@/lib/ui-patterns";
import { Network, PenTool, Trophy, UserPlus } from "lucide-react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <UserPlus className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-user-how",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <PenTool className="w-6 h-6 text-green-500" />,
		delay: "1s",
		key: "float-pen-how",
	},
	{
		className: "bottom-16 left-16 rotate-6",
		icon: <Network className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-network-how",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Trophy className="w-6 h-6 text-yellow-500" />,
		delay: "1.5s",
		key: "float-trophy-how",
	},
];

const steps = [
	{
		title: "Create Your Profile",
		desc: "Sign up and set up your developer profile with your tech stack and goals.",
		icon: "👤",
	},
	{
		title: "Log Daily Progress",
		desc: "Share what you built, learned, or achieved today. Add code snippets, screenshots, and link to helpful resources.",
		icon: "📝",
	},
	{
		title: "Connect & Grow",
		desc: "Follow other developers, get feedback on your work, and build your professional network.",
		icon: "🌱",
	},
	{
		title: "Build Your Portfolio",
		desc: "Your daily logs automatically create a stunning portfolio showcasing your journey and skills.",
		icon: "🏆",
	},
];

export default function HowItWorksSection() {
	return (
		<SectionWrapper animated={false} className="py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />
			<div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
					How Tamatar Works
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
					Start your developer journey in four simple steps and watch your
					progress come to life.
				</p>
			</div>
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
				{steps.map((step) => (
					<div key={step.title}>
						{" "}
						<GlassCard
							variant="subtle"
							className="p-8 flex flex-col items-center hover:scale-[1.02] transition-transform h-full"
						>
							<div className="text-4xl mb-4">{step.icon}</div>
							<div className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">
								{step.title}
							</div>
							<div className="text-gray-600 dark:text-gray-300 text-base text-center">
								{step.desc}
							</div>
						</GlassCard>
					</div>
				))}
			</div>
		</SectionWrapper>
	);
}
