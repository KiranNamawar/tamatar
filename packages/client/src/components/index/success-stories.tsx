import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	Calendar,
	GitCommit,
	Globe,
	Heart,
	Quote,
	Sparkles,
	Star,
	Trophy,
	Users,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Star className="w-6 h-6 text-yellow-500" />,
		delay: "0s",
		key: "float-star-testimonials",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Trophy className="w-6 h-6 text-orange-500" />,
		delay: "1s",
		key: "float-trophy-testimonials",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Heart className="w-6 h-6 text-red-500" />,
		delay: "2s",
		key: "float-heart-testimonials",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Sparkles className="w-6 h-6 text-purple-500" />,
		delay: "1.5s",
		key: "float-sparkles-testimonials",
	},
];

const testimonials = [
	{
		name: "Sarah Chen",
		role: "Frontend Developer",
		company: "TechCorp",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		quote:
			"Tamatar transformed how I document my learning journey. The automatic portfolio generation got me my dream job at a top tech company!",
		achievement: "Landed Dream Job",
		timeUsing: "8 months",
		streakDays: 156,
		projectsCompleted: 12,
		badgeColor: "bg-blue-500",
		featured: true,
	},
	{
		name: "Marcus Rodriguez",
		role: "Full Stack Engineer",
		company: "StartupXYZ",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		quote:
			"The community aspect is incredible. I've connected with so many talented developers and received valuable feedback on my projects.",
		achievement: "Community Leader",
		timeUsing: "1 year",
		streakDays: 287,
		projectsCompleted: 18,
		badgeColor: "bg-green-500",
		featured: true,
	},
	{
		name: "Emily Johnson",
		role: "Software Engineer",
		company: "InnovateLabs",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
		quote:
			"I love how Tamatar makes coding feel like an adventure. The challenges and badges keep me motivated to push my limits every day.",
		achievement: "Challenge Master",
		timeUsing: "6 months",
		streakDays: 98,
		projectsCompleted: 8,
		badgeColor: "bg-purple-500",
		featured: false,
	},
	{
		name: "David Kim",
		role: "Backend Developer",
		company: "DataFlow Inc",
		avatar: "https://randomuser.me/api/portraits/men/51.jpg",
		quote:
			"The GitHub integration is seamless. My commits automatically sync and create a beautiful timeline of my development progress.",
		achievement: "Git Master",
		timeUsing: "4 months",
		streakDays: 67,
		projectsCompleted: 6,
		badgeColor: "bg-orange-500",
		featured: false,
	},
	{
		name: "Alex Thompson",
		role: "Mobile Developer",
		company: "AppVentures",
		avatar: "https://randomuser.me/api/portraits/men/18.jpg",
		quote:
			"From zero to published app in 3 months! Tamatar helped me track every step of my learning journey and showcase my growth to employers.",
		achievement: "App Publisher",
		timeUsing: "3 months",
		streakDays: 89,
		projectsCompleted: 4,
		badgeColor: "bg-pink-500",
		featured: false,
	},
	{
		name: "Lisa Wang",
		role: "DevOps Engineer",
		company: "CloudTech",
		avatar: "https://randomuser.me/api/portraits/women/28.jpg",
		quote:
			"The learning paths guided me through complex DevOps concepts. Now I'm confident with Kubernetes, Docker, and cloud deployments!",
		achievement: "DevOps Expert",
		timeUsing: "7 months",
		streakDays: 134,
		projectsCompleted: 11,
		badgeColor: "bg-cyan-500",
		featured: false,
	},
];

export default function SuccessStoriesSection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const testimonialsAnimation = useStaggeredAnimation(
		"fadeInUp",
		"medium",
		0.15,
	);

	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 via-red-500/20 to-purple-500/20 border border-yellow-500/30 mb-6">
						<Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
						<span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
							Community Success Stories
						</span>
					</div>

					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
						Success Stories
					</h2>
					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
						Real developers sharing how Tamatar helped them level up their
						careers, land dream jobs, and build amazing projects.
					</p>
				</motion.div>

				{/* Testimonials Grid */}
				<motion.div
					{...testimonialsAnimation.containerProps}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16"
				>
					{testimonials
						.filter((t) => t.featured)
						.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								{...testimonialsAnimation.itemProps}
								style={{
									animationDelay: `${index * 0.1}s`,
								}}
							>
								<GlassCard
									variant="subtle"
									className="p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group relative overflow-hidden focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-yellow-500"
								>
									<div className="absolute top-4 right-4">
										<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
											<Star className="w-3 h-3 mr-1" />
											Featured
										</Badge>
									</div>

									{/* Quote */}
									<div className="relative mb-6">
										<Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-300 dark:text-gray-600 opacity-50" />
										<blockquote className="text-gray-800 dark:text-gray-200 text-base leading-relaxed pl-6 italic">
											"{testimonial.quote}"
										</blockquote>
									</div>

									{/* Profile */}
									<div className="flex items-center gap-4 mb-4">
										<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
											<img
												src={testimonial.avatar}
												alt={`${testimonial.name} profile`}
												className="w-full h-full object-cover"
												loading="lazy"
											/>
										</div>
										<div className="flex-1">
											<h4 className="font-semibold text-gray-900 dark:text-gray-100">
												{testimonial.name}
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{testimonial.role} at {testimonial.company}
											</p>
										</div>
									</div>

									{/* Achievement Badge */}
									<div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-yellow-50/80 to-orange-50/80 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg border border-yellow-200/50 dark:border-yellow-700/50">
										<Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
										<span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
											{testimonial.achievement}
										</span>
									</div>

									{/* Stats */}
									<div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
										<div className="text-center">
											<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
												{testimonial.streakDays}
											</div>
											<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
												Day Streak
											</div>
										</div>
										<div className="text-center">
											<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
												{testimonial.projectsCompleted}
											</div>
											<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
												Projects
											</div>
										</div>
										<div className="text-center">
											<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
												{testimonial.timeUsing}
											</div>
											<div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
												Using Tamatar
											</div>
										</div>
									</div>
								</GlassCard>
							</motion.div>
						))}
				</motion.div>

				{/* Community Stats */}
				<motion.div {...titleAnimation.animationProps} className="mb-16">
					<GlassCard className="p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
						<div className="text-center mb-8">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
								Join Our Growing Community
							</h3>
							<p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
								Thousands of developers are already building their careers with
								Tamatar
							</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							<div className="text-center">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 flex items-center justify-center mx-auto mb-3">
									<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
									50K+
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
									Active Developers
								</div>
							</div>

							<div className="text-center">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 flex items-center justify-center mx-auto mb-3">
									<GitCommit className="w-6 h-6 text-green-600 dark:text-green-400" />
								</div>
								<div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
									2.3M+
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
									Commits Tracked
								</div>
							</div>

							<div className="text-center">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 flex items-center justify-center mx-auto mb-3">
									<Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
								</div>
								<div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
									180K+
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
									Projects Created
								</div>
							</div>

							<div className="text-center">
								<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 flex items-center justify-center mx-auto mb-3">
									<Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
								</div>
								<div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
									8.5M+
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
									Days Logged
								</div>
							</div>
						</div>
					</GlassCard>
				</motion.div>

				{/* Call to Action */}
				<motion.div {...titleAnimation.animationProps} className="text-center">
					<GlassCard className="p-6 md:p-8 max-w-4xl mx-auto border border-gray-200/50 dark:border-gray-700/50">
						<div className="mb-6">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
								Ready to Write Your Success Story?
							</h3>
							<p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
								Join thousands of developers who have transformed their careers
								with Tamatar. Your journey starts today.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								type="button"
								className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
								aria-label="Start your development journey with Tamatar"
							>
								<span className="flex items-center gap-2 justify-center">
									<Zap className="w-5 h-5" />
									Start Your Journey
								</span>
							</button>
							<button
								type="button"
								className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:border-yellow-500 dark:hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
								aria-label="Read more developer testimonials"
							>
								<span className="flex items-center gap-2 justify-center">
									<Quote className="w-5 h-5" />
									Read More Stories
								</span>
							</button>
						</div>
					</GlassCard>
				</motion.div>
			</div>
		</div>
	);
}
