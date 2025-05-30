import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	Bot,
	Calendar,
	Code2,
	Database,
	GitBranch,
	Globe,
	Lightbulb,
	MessageSquare,
	Palette,
	Rocket,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Rocket className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-rocket-roadmap",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Sparkles className="w-6 h-6 text-purple-500" />,
		delay: "1s",
		key: "float-sparkles-roadmap",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
		delay: "2s",
		key: "float-bulb-roadmap",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Zap className="w-6 h-6 text-green-500" />,
		delay: "1.5s",
		key: "float-zap-roadmap",
	},
];

const roadmapFeatures = [
	{
		icon: <Calendar className="w-8 h-8 text-blue-500" />,
		title: "Smart Daily Logs",
		description:
			"AI-powered logging that learns from your patterns and suggests meaningful entries.",
		status: "In Development",
		timeline: "Q2 2025",
		category: "Core",
	},
	{
		icon: <GitBranch className="w-8 h-8 text-green-500" />,
		title: "Advanced Git Integration",
		description:
			"Deep GitHub/GitLab sync with commit analysis and automated project insights.",
		status: "Planning",
		timeline: "Q3 2025",
		category: "Integration",
	},
	{
		icon: <Bot className="w-8 h-8 text-purple-500" />,
		title: "AI Code Review",
		description:
			"Get intelligent feedback on your code snippets and learn best practices.",
		status: "Research",
		timeline: "Q4 2025",
		category: "AI",
	},
	{
		icon: <Users className="w-8 h-8 text-orange-500" />,
		title: "Developer Teams",
		description:
			"Collaborate with your team, share progress, and build together.",
		status: "Planning",
		timeline: "Q3 2025",
		category: "Social",
	},
	{
		icon: <Database className="w-8 h-8 text-cyan-500" />,
		title: "Portfolio Analytics",
		description:
			"Deep insights into your coding patterns, skills growth, and career progression.",
		status: "Planning",
		timeline: "Q4 2025",
		category: "Analytics",
	},
	{
		icon: <MessageSquare className="w-8 h-8 text-pink-500" />,
		title: "Real-time Collaboration",
		description:
			"Live coding sessions, pair programming support, and instant feedback.",
		status: "Research",
		timeline: "2026",
		category: "Collaboration",
	},
	{
		icon: <Globe className="w-8 h-8 text-indigo-500" />,
		title: "Custom Domains",
		description:
			"Host your developer portfolio on your own domain with advanced customization.",
		status: "Planning",
		timeline: "Q3 2025",
		category: "Portfolio",
	},
	{
		icon: <Palette className="w-8 h-8 text-red-500" />,
		title: "Advanced Theming",
		description:
			"Build stunning portfolios with custom themes, animations, and layouts.",
		status: "In Development",
		timeline: "Q2 2025",
		category: "Design",
	},
	{
		icon: <Code2 className="w-8 h-8 text-teal-500" />,
		title: "Live Code Playground",
		description:
			"Interactive code editor for prototyping and sharing code snippets directly in your logs.",
		status: "Research",
		timeline: "Q4 2025",
		category: "Tools",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "In Development":
			return "bg-green-500/20 text-green-400 border-green-500/30";
		case "Planning":
			return "bg-blue-500/20 text-blue-400 border-blue-500/30";
		case "Research":
			return "bg-purple-500/20 text-purple-400 border-purple-500/30";
		default:
			return "bg-gray-500/20 text-gray-400 border-gray-500/30";
	}
};

export default function FeatureRoadmapSection() {
	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />
			<div className="relative z-10 max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 mb-6">
						<Rocket className="w-4 h-4 text-blue-400" />
						<span className="text-sm font-medium text-blue-400">
							Coming Soon
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
						Feature Roadmap
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
						Discover the exciting features we're building to make Tamatar the
						ultimate platform for developer growth and collaboration.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
					{roadmapFeatures.map((feature) => (
						<div key={feature.title}>
							<GlassCard
								variant="subtle"
								className="p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/30 dark:border-gray-700/30"
							>
								<div className="flex items-start justify-between mb-4">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
										{feature.icon}
									</div>
									<Badge
										className={`text-xs px-2 py-1 ${getStatusColor(feature.status)}`}
									>
										{feature.status}
									</Badge>
								</div>

								<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
									{feature.title}
								</h3>

								<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
									{feature.description}
								</p>

								<div className="flex items-center justify-between text-xs">
									<span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
										{feature.category}
									</span>
									<span className="text-gray-500 dark:text-gray-500 font-medium">
										{feature.timeline}
									</span>
								</div>
							</GlassCard>
						</div>
					))}
				</div>
				<div className="text-center mt-16">
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Have ideas for features you'd love to see? We'd love to hear from
						you!
					</p>
					<button
						type="button"
						className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
					>
						<span className="flex items-center gap-2">
							<MessageSquare className="w-5 h-5" />
							Share Your Ideas
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
