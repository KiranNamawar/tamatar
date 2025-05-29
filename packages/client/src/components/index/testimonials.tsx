import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Quote, Heart, MessageSquare, ThumbsUp } from "lucide-react";

const floatingItems = [
	{
		className: "top-12 left-8 rotate-12",
		icon: <Quote className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-quote-test",
	},
	{
		className: "top-20 right-12 -rotate-12",
		icon: <Heart className="w-6 h-6 text-red-500" />,
		delay: "1s",
		key: "float-heart-test",
	},
	{
		className: "bottom-12 left-12 rotate-6",
		icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-message-test",
	},
	{
		className: "bottom-20 right-8 -rotate-6",
		icon: <ThumbsUp className="w-6 h-6 text-green-500" />,
		delay: "1.5s",
		key: "float-thumbs-test",
	},
];

const testimonials = [
	{
		name: "Sarah Chen",
		avatar: "https://randomuser.me/api/portraits/women/45.jpg",
		quote:
			"Tamatar transformed how I approach learning. Seeing my daily progress visualized keeps me motivated, and the community feedback helped me land my dream job!",
		role: "Full Stack Developer at Google",
		streak: "127 days",
	},
	{
		name: "Marcus Rodriguez",
		avatar: "https://randomuser.me/api/portraits/men/68.jpg",
		quote:
			"The GitHub integration is seamless. My commits automatically populate my timeline, and I can add context about what I learned. It's like having a smart dev diary.",
		role: "Senior Backend Engineer",
		streak: "89 days",
	},
	{
		name: "Priya Patel",
		avatar: "https://randomuser.me/api/portraits/women/23.jpg",
		quote:
			"I love how my portfolio builds itself as I log my progress. Recruiters can see my actual journey, not just the final projects. It's authentic and powerful.",
		role: "Frontend Developer",
		streak: "156 days",
	},
];

export default function TestimonialsSection() {
	return (
		<section className="relative w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
			{/* Floating Elements */}
			<div className="absolute inset-0 w-full h-full pointer-events-none z-0">
				{floatingItems.map((item, i) => (
					<motion.div
						key={item.key}
						className={`absolute ${item.className} animate-float`}
						style={{ animationDelay: item.delay }}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 * i, duration: 0.8, type: "spring" }}
					>
						<Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-40">
							{item.icon}
						</Card>
					</motion.div>
				))}
			</div>

			<div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
					Loved by Developers Worldwide
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
					Join thousands of developers who are already building their careers
					with Tamatar.
				</p>
			</div>
			<div className="relative z-10 flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto">
				{testimonials.map((t, i) => (
					<motion.div
						key={t.name}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 * i, duration: 0.8 }}
						className="flex-1 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-8 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
					>
						<div className="relative mb-4">
							<img
								src={t.avatar}
								alt={t.name}
								className="w-16 h-16 rounded-full shadow-lg border-2 border-white"
							/>
							<Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1">
								🔥 {t.streak}
							</Badge>
						</div>
						<blockquote className="text-lg italic text-gray-700 dark:text-gray-200 mb-4">
							"{t.quote}"
						</blockquote>
						<div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
							{t.name}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							{t.role}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
