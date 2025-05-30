import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	BookOpen,
	Calendar,
	Code,
	Cpu,
	Database,
	ExternalLink,
	Eye,
	GitCommit,
	Globe,
	Heart,
	MessageCircle,
	Share2,
	Smartphone,
	Star,
	TrendingUp,
	Users,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-12 left-8 rotate-12",
		icon: <Code className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-code-demo",
	},
	{
		className: "top-20 right-12 -rotate-12",
		icon: <Calendar className="w-6 h-6 text-green-500" />,
		delay: "1s",
		key: "float-calendar-demo",
	},
	{
		className: "bottom-12 left-12 rotate-6",
		icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-trending-demo",
	},
	{
		className: "bottom-20 right-8 -rotate-6",
		icon: <BookOpen className="w-6 h-6 text-orange-500" />,
		delay: "1.5s",
		key: "float-journal-demo",
	},
];

const demos = [
	{
		user: "@sarah_codes",
		log: "Day 15: Finally cracked the authentication system! Spent hours debugging JWT tokens but learned so much about security best practices. Attached my notes and the Stack Overflow post that saved me 📚",
		badge: "🔥 15 Day Streak",
		project: "Personal Journal",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
		tags: ["JWT", "Authentication", "Security"],
		commits: 3,
		likes: 45,
		journalEntries: 15,
		resources: 8,
	},
	{
		user: "@alex_dev",
		log: "Docker breakthrough! After 3 days of container hell, I finally understand volumes and networking. Documenting everything step-by-step so future me doesn't suffer 🐳",
		badge: "🏆 Learning Streak",
		project: "DevOps Journey",
		avatar: "https://randomuser.me/api/portraits/men/75.jpg",
		tags: ["Docker", "DevOps", "Learning"],
		commits: 8,
		likes: 32,
		journalEntries: 22,
		resources: 12,
	},
	{
		user: "@maya_ml",
		log: "ML model hit 94% accuracy! 🤖 Sharing my hyperparameter tuning process and the research papers that guided me. This took weeks but the learning was incredible!",
		badge: "🧠 AI Explorer",
		project: "ML Learning Path",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
		tags: ["Machine Learning", "Research", "Python"],
		commits: 18,
		likes: 67,
		journalEntries: 31,
		resources: 25,
	},
	{
		user: "@ryan_mobile",
		log: "App store approval! 📱 From idea to deployment in 60 days. Documenting the entire journey with screenshots, code snippets, and lessons learned. What a ride!",
		badge: "🚀 Shipped It",
		project: "App Development Story",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		tags: ["React Native", "App Store", "Milestone"],
		commits: 25,
		likes: 89,
		journalEntries: 45,
		resources: 18,
	},
	{
		user: "@zoe_web3",
		log: "First smart contract deployed! 💎 Gas fees hurt but the learning was priceless. Sharing my Solidity journey, mistakes made, and resources that helped me understand blockchain",
		badge: "⛓️ Blockchain Pioneer",
		project: "Web3 Adventure",
		avatar: "https://randomuser.me/api/portraits/women/42.jpg",
		tags: ["Solidity", "Blockchain", "Web3"],
		commits: 15,
		likes: 78,
		journalEntries: 28,
		resources: 22,
	},
	{
		user: "@jamie_backend",
		log: "Performance optimization success! ⚡ API now handles 10k+ req/sec. Sharing my profiling process, bottleneck discoveries, and the tools that made the difference",
		badge: "⚡ Performance Guru",
		project: "Backend Mastery",
		avatar: "https://randomuser.me/api/portraits/men/77.jpg",
		tags: ["Performance", "API", "Optimization"],
		commits: 22,
		likes: 56,
		journalEntries: 19,
		resources: 15,
	},
];

export default function DemoGallerySection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const demosAnimation = useStaggeredAnimation("fadeInUp", "medium", 0.1);

	return (
		<div className="relative">
			<FloatingBackground items={floatingItems} />{" "}
			<div className="relative z-10 max-w-5xl mx-auto text-center mb-12">
				{" "}
				<motion.h2
					{...titleAnimation.animationProps}
					className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient-x"
				>
					Developer Journeys in Action
				</motion.h2>
				<motion.p
					{...titleAnimation.animationProps}
					className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
				>
					Real developers documenting their learning journey, sharing
					breakthroughs, and building in public. Every struggle, every victory,
					every lesson learned.
				</motion.p>
			</div>
			<motion.div
				{...demosAnimation.containerProps}
				className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
			>
				{demos.map((demo) => (
					<motion.div
						key={demo.user + demo.project}
						{...demosAnimation.itemProps}
					>
						{" "}
						<GlassCard
							variant="subtle"
							className="p-6 hover:scale-[1.02] transition-transform h-full bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50"
						>
							{" "}
							<div className="flex items-center gap-3 mb-4">
								<img
									src={demo.avatar}
									alt={demo.user}
									className="w-12 h-12 rounded-full border-2 border-blue-200 dark:border-blue-800 object-cover"
								/>
								<div className="flex-1">
									<div className="font-bold text-base text-gray-800 dark:text-gray-100">
										{demo.user}
									</div>
									<div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
										<BookOpen className="w-3 h-3" />
										{demo.project}
									</div>
								</div>
							</div>
							<p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
								{demo.log}
							</p>
							<div className="flex flex-wrap gap-1 mb-4">
								{demo.tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
									>
										{tag}
									</Badge>
								))}
							</div>
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center gap-4">
									<span className="flex items-center gap-1 text-red-500">
										<Heart className="w-4 h-4" />
										{demo.likes}
									</span>
									<span className="flex items-center gap-1 text-green-500">
										<GitCommit className="w-4 h-4" />
										{demo.commits}
									</span>
									<span className="flex items-center gap-1 text-blue-500">
										<BookOpen className="w-4 h-4" />
										{demo.journalEntries}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Badge
										variant="outline"
										className="text-xs text-gray-500 dark:text-gray-400"
									>
										{demo.resources} resources
									</Badge>
								</div>
							</div>
						</GlassCard>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
