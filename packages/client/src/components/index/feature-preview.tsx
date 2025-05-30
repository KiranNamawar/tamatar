import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	BarChart3,
	Calendar,
	Code,
	FileText,
	GitBranch,
	Globe,
	MessageSquare,
	Palette,
	Sparkles,
	Trophy,
	Users,
	Zap,
} from "lucide-react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Sparkles className="w-6 h-6 text-purple-500" />,
		delay: "0s",
		key: "float-sparkles-preview",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Trophy className="w-6 h-6 text-yellow-500" />,
		delay: "1s",
		key: "float-trophy-preview",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Globe className="w-6 h-6 text-blue-500" />,
		delay: "2s",
		key: "float-globe-preview",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Code className="w-6 h-6 text-green-500" />,
		delay: "1.5s",
		key: "float-code-preview",
	},
];

const previewFeatures = [
	{
		title: "Smart Daily Logs",
		description:
			"Beautiful, intuitive logging interface with rich text, code snippets, and media support.",
		icon: <FileText className="w-8 h-8 text-blue-500" />,
		preview: "📝 Daily Progress Tracking",
		status: "Core Feature",
		color: "blue",
	},
	{
		title: "GitHub Integration",
		description:
			"Seamlessly sync your commits and repositories to build a complete development timeline.",
		icon: <GitBranch className="w-8 h-8 text-green-500" />,
		preview: "🔗 Automatic Sync",
		status: "Integration",
		color: "green",
	},
	{
		title: "Developer Portfolio",
		description:
			"Showcase your journey with automatically generated, beautiful portfolio websites.",
		icon: <Globe className="w-8 h-8 text-purple-500" />,
		preview: "🌐 Live Portfolio",
		status: "Portfolio",
		color: "purple",
	},
	{
		title: "Community Features",
		description:
			"Connect with other developers, share experiences, and grow together.",
		icon: <Users className="w-8 h-8 text-orange-500" />,
		preview: "👥 Developer Network",
		status: "Social",
		color: "orange",
	},
	{
		title: "Progress Analytics",
		description:
			"Visualize your growth with detailed charts and insights about your development journey.",
		icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
		preview: "📊 Growth Insights",
		status: "Analytics",
		color: "cyan",
	},
	{
		title: "Custom Themes",
		description:
			"Personalize your portfolio and logs with beautiful themes and custom styling options.",
		icon: <Palette className="w-8 h-8 text-pink-500" />,
		preview: "🎨 Beautiful Themes",
		status: "Design",
		color: "pink",
	},
];

const getColorClasses = (color: string) => {
	const colors = {
		blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
		green: "from-green-500/20 to-green-600/20 border-green-500/30",
		purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
		orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
		cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
		pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
	};
	return colors[color as keyof typeof colors] || colors.blue;
};

export default function FeaturePreviewSection() {
	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
						<Sparkles className="w-4 h-4 text-purple-400" />
						<span className="text-sm font-medium text-purple-400">
							Feature Preview
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
						What You'll Experience
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
						Get a sneak peek at the powerful features we're building to
						revolutionize how developers document and share their journey.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{previewFeatures.map((feature) => (
						<div key={feature.title}>
							<GlassCard
								variant="subtle"
								className="p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/30 dark:border-gray-700/30 group"
							>
								{/* Header */}
								<div className="flex items-center justify-between mb-4">
									<div
										className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getColorClasses(feature.color)} flex items-center justify-center group-hover:scale-110 transition-transform`}
									>
										{feature.icon}
									</div>
									<Badge className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
										{feature.status}
									</Badge>
								</div>

								{/* Preview Badge */}
								<div className="mb-4">
									<span className="text-2xl">{feature.preview}</span>
								</div>

								{/* Content */}
								<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
									{feature.title}
								</h3>

								<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
									{feature.description}
								</p>

								{/* Interactive Element */}
								<div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
									<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
										<Calendar className="w-4 h-4" />
										<span>Coming Soon</span>
									</div>
								</div>
							</GlassCard>
						</div>
					))}
				</div>

				{/* Interactive Demo Section */}
				<div className="mt-20 text-center">
					<GlassCard className="p-8 max-w-4xl mx-auto border border-gray-200/30 dark:border-gray-700/30">
						<div className="mb-6">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
								Experience Tamatar in Action
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Want to see these features in action? Join our beta program for
								early access.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								type="button"
								className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
							>
								<span className="flex items-center gap-2">
									<Zap className="w-5 h-5" />
									Join Beta Program
								</span>
							</button>
							<button
								type="button"
								className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
							>
								<span className="flex items-center gap-2">
									<MessageSquare className="w-5 h-5" />
									Request Demo
								</span>
							</button>
						</div>
					</GlassCard>
				</div>
			</div>
		</div>
	);
}
