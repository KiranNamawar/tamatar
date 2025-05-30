import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import { motion } from "motion/react";

const inspirations = [
	{
		quote:
			"Building in public changed my career. Tamatar makes it effortless to share my journey and connect with amazing developers.",
		author: "Alex Chen | Senior Engineer @ Stripe",
	},
	{
		quote:
			"My GitHub commits tell part of the story, but Tamatar shows the complete picture of my growth as a developer.",
		author: "Maria Santos | Full Stack Developer",
	},
	{
		quote:
			"The community on Tamatar helped me debug complex problems and land my first tech job. It's more than logging - it's networking.",
		author: "Jordan Kim | Software Engineer @ Microsoft",
	},
];

export default function InspirationSection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const inspirationsAnimation = useStaggeredAnimation(
		"fadeInUp",
		"medium",
		0.2,
	);

	return (
		<div className="relative">
			{" "}
			<div className="max-w-3xl mx-auto text-center mb-12">
				<motion.h2
					{...titleAnimation.animationProps}
					className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-orange-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x"
				>
					Success Stories from Developers
				</motion.h2>
				<motion.p
					{...titleAnimation.animationProps}
					className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
				>
					Real developers, real growth stories. See how Tamatar is transforming
					careers worldwide.
				</motion.p>
			</div>
			<motion.div
				{...inspirationsAnimation.containerProps}
				className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto"
			>
				{inspirations.map((item) => (
					<motion.div key={item.author} {...inspirationsAnimation.itemProps}>
						<GlassCard
							variant="subtle"
							className="p-8 flex flex-col items-center hover:scale-[1.02] transition-transform h-full"
						>
							<blockquote className="italic text-xl text-gray-800 dark:text-gray-100 mb-4 text-center">
								"{item.quote}"
							</blockquote>
							<div className="text-sm text-orange-500 font-semibold text-center">
								{item.author}
							</div>
						</GlassCard>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
