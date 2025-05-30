import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	ArrowRight,
	CheckCircle,
	ExternalLink,
	Github,
	Globe,
	Link2,
	PenTool,
	Slack,
	Sparkles,
	Terminal,
	Zap,
} from "lucide-react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Link2 className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-link-integration",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Github className="w-6 h-6 text-gray-900 dark:text-white" />,
		delay: "1s",
		key: "float-github-integration",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Globe className="w-6 h-6 text-green-500" />,
		delay: "2s",
		key: "float-globe-integration",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Terminal className="w-6 h-6 text-purple-500" />,
		delay: "1.5s",
		key: "float-terminal-integration",
	},
];

const integrations = [
	{
		name: "GitHub",
		description:
			"Automatically sync your repositories, commits, and project activity",
		icon: <Github className="w-8 h-8 text-gray-900 dark:text-white" />,
		status: "Live",
		category: "Version Control",
		features: [
			"Auto commit sync",
			"Repository linking",
			"Activity tracking",
			"Branch visualization",
		],
		users: "45K+",
		color: "gray",
		premium: false,
	},
	{
		name: "VS Code",
		description:
			"Track coding time and activity directly from your favorite editor",
		icon: <PenTool className="w-8 h-8 text-blue-500" />,
		status: "Live",
		category: "Code Editor",
		features: [
			"Time tracking",
			"Language stats",
			"File changes",
			"Extension integration",
		],
		users: "32K+",
		color: "blue",
		premium: false,
	},
	{
		name: "Discord",
		description:
			"Share your progress and connect with other developers in real-time",
		icon: <Slack className="w-8 h-8 text-indigo-500" />,
		status: "Beta",
		category: "Communication",
		features: [
			"Progress sharing",
			"Developer community",
			"Real-time updates",
			"Achievement notifications",
		],
		users: "18K+",
		color: "indigo",
		premium: false,
	},
	{
		name: "Linear",
		description:
			"Connect your issues and track project management with development progress",
		icon: <ArrowRight className="w-8 h-8 text-purple-500" />,
		status: "Coming Soon",
		category: "Project Management",
		features: [
			"Issue tracking",
			"Sprint integration",
			"Progress correlation",
			"Team collaboration",
		],
		users: "Soon",
		color: "purple",
		premium: true,
	},
	{
		name: "Figma",
		description:
			"Link your design work to development progress and showcase complete workflows",
		icon: <Globe className="w-8 h-8 text-pink-500" />,
		status: "Coming Soon",
		category: "Design",
		features: [
			"Design linking",
			"Workflow tracking",
			"Asset integration",
			"Design-to-code flow",
		],
		users: "Soon",
		color: "pink",
		premium: true,
	},
	{
		name: "Notion",
		description:
			"Sync your notes, documentation, and planning with your development journey",
		icon: <PenTool className="w-8 h-8 text-orange-500" />,
		status: "Planned",
		category: "Documentation",
		features: [
			"Note sync",
			"Documentation linking",
			"Planning integration",
			"Knowledge base",
		],
		users: "Soon",
		color: "orange",
		premium: true,
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Live":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		case "Beta":
			return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
		case "Coming Soon":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
		case "Planned":
			return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

export default function IntegrationHubSection() {
	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 border border-blue-500/30 mb-6">
						<Link2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
						<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
							Connect Your Tools
						</span>
					</div>

					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
						Integration Hub
					</h2>
					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
						Connect Tamatar with your favorite development tools and services.
						Streamline your workflow and get a complete picture of your coding
						journey.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{integrations.map((integration) => (
						<div key={integration.name}>
							<GlassCard
								variant="subtle"
								className="p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
							>
								{integration.premium && (
									<div className="absolute top-4 right-4 z-20">
										<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
											<Sparkles className="w-3 h-3 mr-1" />
											Pro
										</Badge>
									</div>
								)}

								{/* Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
											{integration.icon}
										</div>
										<div>
											<Badge
												className={getStatusColor(integration.status)}
												variant="secondary"
											>
												{integration.status}
											</Badge>
										</div>
									</div>
									<div className="text-right">
										<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
											{integration.users} users
										</div>
									</div>
								</div>

								{/* Title & Category */}
								<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
									{integration.name}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">
									{integration.category}
								</p>

								{/* Description */}
								<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
									{integration.description}
								</p>

								{/* Features */}
								<div className="mb-6">
									<h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
										Key Features:
									</h4>
									<div className="space-y-2">
										{integration.features.slice(0, 3).map((feature) => (
											<div key={feature} className="flex items-center gap-2">
												<CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
												<span className="text-sm text-gray-700 dark:text-gray-300">
													{feature}
												</span>
											</div>
										))}
										{integration.features.length > 3 && (
											<div className="flex items-center gap-2">
												<CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
												<span className="text-sm text-gray-700 dark:text-gray-300">
													+{integration.features.length - 3} more features
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Action Button */}
								<div className="mt-auto">
									{integration.status === "Live" ? (
										<button
											type="button"
											className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
											aria-label={`Connect ${integration.name} integration`}
										>
											<span className="flex items-center gap-2 justify-center">
												<Link2 className="w-4 h-4" />
												Connect Now
											</span>
										</button>
									) : integration.status === "Beta" ? (
										<button
											type="button"
											className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
											aria-label={`Join ${integration.name} beta`}
										>
											<span className="flex items-center gap-2 justify-center">
												<Zap className="w-4 h-4" />
												Join Beta
											</span>
										</button>
									) : (
										<button
											type="button"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
											aria-label={`Get notified when ${integration.name} integration is available`}
										>
											<span className="flex items-center gap-2 justify-center">
												<Globe className="w-4 h-4" />
												Coming Soon
											</span>
										</button>
									)}
								</div>
							</GlassCard>
						</div>
					))}
				</div>

				{/* Call to Action */}
				<div className="text-center mt-16">
					<GlassCard className="p-6 md:p-8 max-w-4xl mx-auto border border-gray-200/50 dark:border-gray-700/50">
						<div className="mb-6">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
								Build Your Perfect Workflow
							</h3>
							<p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
								Connect all your favorite tools and services to create a
								seamless development experience. More integrations coming soon!
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								type="button"
								className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								aria-label="View all available integrations"
							>
								<span className="flex items-center gap-2 justify-center">
									<Terminal className="w-5 h-5" />
									View All Integrations
								</span>
							</button>
							<button
								type="button"
								className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								aria-label="Request a new integration"
							>
								<span className="flex items-center gap-2 justify-center">
									<ExternalLink className="w-5 h-5" />
									Request Integration
								</span>
							</button>
						</div>
					</GlassCard>
				</div>
			</div>
		</div>
	);
}
