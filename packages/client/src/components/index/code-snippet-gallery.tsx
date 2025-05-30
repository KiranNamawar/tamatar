import FloatingBackground from "@/components/ui/FloatingBackground";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "@/hooks/useAnimations";
import type { FloatingItem } from "@/lib/ui-patterns";
import {
	Code,
	Copy,
	ExternalLink,
	Eye,
	GitBranch,
	Heart,
	Play,
	Sparkles,
	Terminal,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems: FloatingItem[] = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Code className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-code-gallery",
	},
	{
		className: "top-24 right-16 -rotate-12",
		icon: <Terminal className="w-6 h-6 text-green-500" />,
		delay: "1s",
		key: "float-terminal-gallery",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <GitBranch className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-git-gallery",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
		delay: "1.5s",
		key: "float-sparkles-gallery",
	},
];

const codeSnippets = [
	{
		title: "React Hook for API Calls",
		author: "Sarah Chen",
		language: "TypeScript",
		category: "React Hooks",
		likes: 147,
		views: "2.3K",
		description:
			"Custom hook for handling API calls with loading states and error handling",
		code: `function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`,
		tags: ["React", "TypeScript", "Hooks", "API"],
		featured: true,
	},
	{
		title: "Python Data Visualization",
		author: "Marcus Rodriguez",
		language: "Python",
		category: "Data Science",
		likes: 89,
		views: "1.8K",
		description:
			"Beautiful matplotlib chart with custom styling and animations",
		code: `import matplotlib.pyplot as plt
import numpy as np

# Create sample data
x = np.linspace(0, 10, 100)
y = np.sin(x) * np.exp(-x/5)

# Setup the plot
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y, linewidth=2.5, color='#6366f1')
ax.fill_between(x, y, alpha=0.3, color='#6366f1')

# Styling
ax.set_title('Damped Sine Wave', fontsize=16, fontweight='bold')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
		tags: ["Python", "Matplotlib", "Data Science", "Visualization"],
		featured: false,
	},
	{
		title: "CSS Grid Layout Magic",
		author: "Alex Johnson",
		language: "CSS",
		category: "Frontend",
		likes: 203,
		views: "3.1K",
		description:
			"Responsive grid layout that adapts beautifully to any screen size",
		code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
}`,
		tags: ["CSS", "Grid", "Responsive", "Animation"],
		featured: false,
	},
];

const getLanguageColor = (language: string) => {
	const colors = {
		TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
		JavaScript:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
		Python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
		CSS: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
		HTML: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
	};
	return (
		colors[language as keyof typeof colors] ||
		"bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
	);
};

export default function CodeSnippetGallerySection() {
	const titleAnimation = useScrollAnimation("fadeInUp");
	const snippetsAnimation = useStaggeredAnimation("fadeInUp", "medium", 0.15);

	return (
		<div className="relative py-20 px-4 overflow-hidden">
			<FloatingBackground items={floatingItems} />

			<div className="relative z-10 max-w-6xl mx-auto">
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-green-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
						<Code className="w-4 h-4 text-blue-500 dark:text-blue-400" />
						<span className="text-sm font-medium text-blue-600 dark:text-blue-400">
							Community Code Sharing
						</span>
					</div>

					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 bg-clip-text text-transparent">
						Code Snippet Gallery
					</h2>
					<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
						Discover, share, and learn from high-quality code snippets created
						by the community. Find solutions, get inspired, and contribute your
						own code.
					</p>
				</motion.div>

				<motion.div
					{...snippetsAnimation.containerProps}
					className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
				>
					{codeSnippets.map((snippet, index) => (
						<motion.div
							key={snippet.title}
							{...snippetsAnimation.itemProps}
							style={{
								animationDelay: `${index * 0.1}s`,
							}}
						>
							<GlassCard
								variant="subtle"
								className={`p-6 h-full hover:scale-[1.02] transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
									snippet.featured ? "ring-2 ring-blue-500/50" : ""
								}`}
							>
								{snippet.featured && (
									<div className="absolute top-4 right-4 z-20">
										<Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
											<Sparkles className="w-3 h-3 mr-1" />
											Featured
										</Badge>
									</div>
								)}

								{/* Header */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
											<Code className="w-5 h-5 text-blue-500" />
										</div>
										<div>
											<Badge
												className={getLanguageColor(snippet.language)}
												variant="secondary"
											>
												{snippet.language}
											</Badge>
										</div>
									</div>
									<div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
										<div className="flex items-center gap-1">
											<Heart className="w-4 h-4" />
											<span className="font-medium">{snippet.likes}</span>
										</div>
										<div className="flex items-center gap-1">
											<Eye className="w-4 h-4" />
											<span className="font-medium">{snippet.views}</span>
										</div>
									</div>
								</div>

								{/* Title & Author */}
								<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
									{snippet.title}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
									by{" "}
									<span className="font-medium text-gray-800 dark:text-gray-200">
										{snippet.author}
									</span>
								</p>

								{/* Description */}
								<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
									{snippet.description}
								</p>

								{/* Code Preview */}
								<div className="relative mb-4 group/code">
									<div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
										<div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
											<div className="flex items-center gap-2">
												<div className="flex gap-1">
													<div className="w-3 h-3 rounded-full bg-red-500" />
													<div className="w-3 h-3 rounded-full bg-yellow-500" />
													<div className="w-3 h-3 rounded-full bg-green-500" />
												</div>
												<span className="text-xs text-gray-400 font-mono">
													{snippet.language.toLowerCase()}.
													{snippet.language === "TypeScript"
														? "ts"
														: snippet.language === "JavaScript"
															? "js"
															: "py"}
												</span>
											</div>
											<button
												type="button"
												className="p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover/code:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
												aria-label={`Copy ${snippet.title} code snippet`}
											>
												<Copy className="w-4 h-4" />
											</button>
										</div>
										<div className="p-4 overflow-hidden">
											<pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto max-h-32">
												<code>{snippet.code}</code>
											</pre>
										</div>
									</div>
								</div>

								{/* Category & Tags */}
								<div className="mb-4">
									<div className="flex items-center gap-2 mb-3">
										<Badge
											variant="outline"
											className="text-xs px-2 py-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
										>
											{snippet.category}
										</Badge>
									</div>
									<div className="flex flex-wrap gap-1">
										{snippet.tags.slice(0, 3).map((tag) => (
											<Badge
												key={tag}
												variant="secondary"
												className="text-xs px-2 py-0.5 bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300"
											>
												{tag}
											</Badge>
										))}
										{snippet.tags.length > 3 && (
											<Badge
												variant="secondary"
												className="text-xs px-2 py-0.5 bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300"
											>
												+{snippet.tags.length - 3}
											</Badge>
										)}
									</div>
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row gap-2 mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
									<button
										type="button"
										className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
										aria-label={`View full ${snippet.title} code snippet`}
									>
										<span className="flex items-center gap-2 justify-center">
											<Play className="w-4 h-4" />
											View Full Code
										</span>
									</button>
									<button
										type="button"
										className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
										aria-label={`Try ${snippet.title} in editor`}
									>
										<ExternalLink className="w-4 h-4" />
									</button>
								</div>
							</GlassCard>
						</motion.div>
					))}
				</motion.div>

				{/* Call to Action */}
				<motion.div
					{...titleAnimation.animationProps}
					className="text-center mt-16"
				>
					<GlassCard className="p-6 md:p-8 max-w-4xl mx-auto border border-gray-200/50 dark:border-gray-700/50">
						<div className="mb-6">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
								Share Your Code with the Community
							</h3>
							<p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
								Help fellow developers learn by sharing your best code snippets.
								Get feedback, earn recognition, and build your reputation.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button
								type="button"
								className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								aria-label="Browse all code snippets"
							>
								<span className="flex items-center gap-2 justify-center">
									<Terminal className="w-5 h-5" />
									Browse All Snippets
								</span>
							</button>
							<button
								type="button"
								className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								aria-label="Share your code snippet"
							>
								<span className="flex items-center gap-2 justify-center">
									<Zap className="w-5 h-5" />
									Share Your Code
								</span>
							</button>
						</div>
					</GlassCard>
				</motion.div>
			</div>
		</div>
	);
}
