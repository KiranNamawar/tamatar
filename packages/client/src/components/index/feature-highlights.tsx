import SectionWrapper from "@/components/layout/SectionWrapper";
import FloatingBackground from "@/components/ui/FloatingBackground";
import { GlassCard } from "@/components/ui/glass-card";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	Calendar,
	Code,
	FileText,
	GitBranch,
	Heart,
	Link2,
	Share2,
	Sparkles,
	Star,
	TrendingUp,
	Trophy,
	Users,
	Zap,
} from "lucide-react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-20 left-10 rotate-12",
		icon: <Code className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-code-feat",
	},
	{
		className: "top-32 right-16 -rotate-12",
		icon: <Zap className="w-6 h-6 text-yellow-500" />,
		delay: "1.5s",
		key: "float-zap-feat",
	},
	{
		className: "bottom-20 left-16 rotate-6",
		icon: <Heart className="w-6 h-6 text-red-500" />,
		delay: "2s",
		key: "float-heart-feat",
	},
	{
		className: "bottom-32 right-10 -rotate-6",
		icon: <Star className="w-6 h-6 text-purple-500" />,
		delay: "0.5s",
		key: "float-star-feat",
	},
];

const features = [
	{
		icon: <Calendar className="w-7 h-7 text-blue-500" />,
		title: "Daily Developer Logs",
		desc: "Document your coding journey with rich text, images, and code snippets.",
	},
	{
		icon: <GitBranch className="w-7 h-7 text-green-500" />,
		title: "GitHub Integration",
		desc: "Automatically sync your commits and showcase your coding activity.",
	},
	{
		icon: <Trophy className="w-7 h-7 text-yellow-500" />,
		title: "Streaks & Achievements",
		desc: "Stay motivated with coding streaks, badges, and milestone celebrations.",
	},
	{
		icon: <Users className="w-7 h-7 text-purple-500" />,
		title: "Developer Community",
		desc: "Connect with fellow developers, give feedback, and collaborate on projects.",
	},
	{
		icon: <TrendingUp className="w-7 h-7 text-indigo-500" />,
		title: "Progress Analytics",
		desc: "Visualize your growth with detailed charts and learning insights.",
	},
	{
		icon: <FileText className="w-7 h-7 text-teal-500" />,
		title: "Project Portfolios",
		desc: "Build stunning portfolios that showcase your projects and skills.",
	},
	{
		icon: <Link2 className="w-7 h-7 text-orange-500" />,
		title: "Resource Library",
		desc: "Access curated documentation, tutorials, and tools. Search, filter, and discover resources to accelerate your development.",
	},
	{
		icon: <Sparkles className="w-7 h-7 text-pink-500" />,
		title: "AI-Powered Insights",
		desc: "Get personalized recommendations and smart summaries of your progress.",
	},
	{
		icon: <Share2 className="w-7 h-7 text-cyan-500" />,
		title: "Social Features",
		desc: "Follow developers, like posts, comment, and build your developer network.",
	},
];

export default function FeatureHighlightsSection() {
	return (
		<SectionWrapper animated={false} className="py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />
			<div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
					Everything You Need to Grow
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
					A complete platform designed for developers to track progress, share
					knowledge, and build amazing portfolios.
				</p>
			</div>
			<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{features.map((f) => (
					<div key={f.title}>
						{" "}
						<GlassCard
							variant="subtle"
							className="p-8 flex flex-col items-center h-full"
						>
							<div className="mb-3">{f.icon}</div>
							<div className="font-bold text-lg mb-1 text-gray-800 dark:text-gray-100">
								{f.title}
							</div>
							<div className="text-gray-600 dark:text-gray-300 text-base text-center">
								{f.desc}
							</div>
						</GlassCard>
					</div>
				))}
			</div>
		</SectionWrapper>
	);
}
