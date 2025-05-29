import { motion } from "motion/react";

const inspirations = [
	{
		quote: "Building in public changed my career. Tamatar makes it effortless to share my journey and connect with amazing developers.",
		author: "Alex Chen | Senior Engineer @ Stripe",
	},
	{
		quote: "My GitHub commits tell part of the story, but Tamatar shows the complete picture of my growth as a developer.",
		author: "Maria Santos | Full Stack Developer",
	},
	{
		quote: "The community on Tamatar helped me debug complex problems and land my first tech job. It's more than logging - it's networking.",
		author: "Jordan Kim | Software Engineer @ Microsoft",
	},
];

export default function InspirationSection() {
	return (
		<section className="relative w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
			<div className="max-w-3xl mx-auto text-center mb-12">				<h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-orange-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
					Success Stories from Developers
				</h2>
				<p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
					Real developers, real growth stories. See how Tamatar is transforming careers worldwide.
				</p>
			</div>
			<div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto">
				{inspirations.map((item, i) => (
					<motion.div
						key={item.author}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 * i, duration: 0.8 }}
						className="flex-1 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-8 flex flex-col items-center"
					>
						<blockquote className="italic text-xl text-gray-800 dark:text-gray-100 mb-4">
							“{item.quote}”
						</blockquote>
						<div className="text-sm text-orange-500 font-semibold">
							{item.author}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
