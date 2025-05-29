import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Cpu,
	Database,
	GitCommit,
	Globe,
	Heart,
	Smartphone,
} from "lucide-react";
import { motion } from "motion/react";

const floatingItems = [
	{
		className: "top-12 left-8 rotate-12",
		icon: <Smartphone className="w-6 h-6 text-blue-500" />,
		delay: "0s",
		key: "float-mobile-demo",
	},
	{
		className: "top-20 right-12 -rotate-12",
		icon: <Globe className="w-6 h-6 text-green-500" />,
		delay: "1s",
		key: "float-globe-demo",
	},
	{
		className: "bottom-12 left-12 rotate-6",
		icon: <Database className="w-6 h-6 text-purple-500" />,
		delay: "2s",
		key: "float-database-demo",
	},
	{
		className: "bottom-20 right-8 -rotate-6",
		icon: <Cpu className="w-6 h-6 text-orange-500" />,
		delay: "1.5s",
		key: "float-cpu-demo",
	},
];

const demos = [
	{
		user: "@sarah_codes",
		log: "Built a full-stack e-commerce app with Next.js and Stripe integration! 🛒",
		badge: "🔥 15 Day Streak",
		project: "ShopFlow",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
		tags: ["Next.js", "TypeScript", "Stripe"],
		commits: 12,
		likes: 45,
	},
	{
		user: "@alex_dev",
		log: "Finally mastered Docker containers and deployed my first microservice architecture! 🐳",
		badge: "🏆 Architecture Master",
		project: "MicroServ Hub",
		avatar: "https://randomuser.me/api/portraits/men/75.jpg",
		tags: ["Docker", "Kubernetes", "Go"],
		commits: 8,
		likes: 32,
	},
	{
		user: "@maya_ml",
		log: "Published my machine learning model for image classification with 94% accuracy! 🤖",
		badge: "🧠 AI Explorer",
		project: "ImageClassify AI",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
		tags: ["Python", "TensorFlow", "OpenCV"],
		commits: 18,
		likes: 67,
	},
	{
		user: "@ryan_mobile",
		log: "Launched my React Native app on both iOS and Android stores! 📱",
		badge: "🚀 Mobile Pro",
		project: "FitTracker Pro",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		tags: ["React Native", "Firebase", "Redux"],
		commits: 25,
		likes: 89,
	},
	{
		user: "@zoe_web3",
		log: "Deployed my first smart contract on Ethereum mainnet! Gas fees were worth it 💎",
		badge: "⛓️ Blockchain Pioneer",
		project: "CryptoVault",
		avatar: "https://randomuser.me/api/portraits/women/42.jpg",
		tags: ["Solidity", "Web3.js", "Hardhat"],
		commits: 15,
		likes: 78,
	},
	{
		user: "@jamie_backend",
		log: "Built a high-performance API that handles 10k+ requests per second! ⚡",
		badge: "⚡ Performance Guru",
		project: "SpeedAPI",
		avatar: "https://randomuser.me/api/portraits/men/77.jpg",
		tags: ["Rust", "PostgreSQL", "Redis"],
		commits: 22,
		likes: 56,
	},
];

export default function DemoGallerySection() {
	return (
		<section className="relative w-full py-20 px-4 overflow-hidden">
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
						<Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-30">
							{item.icon}
						</Card>
					</motion.div>
				))}
			</div>

			<div className="relative z-10 max-w-5xl mx-auto text-center mb-12">
				<motion.h2
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x"
				>
					See Tamatar in Action
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.1 }}
					className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
				>
					Real developers sharing their journey, building amazing projects, and
					growing together.
				</motion.p>
			</div>
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				{demos.map((d) => (
					<motion.div
						key={d.user + d.project}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-6 hover:scale-105 transition-all duration-300"
					>
						<div className="flex items-center gap-3 mb-4">
							<img
								src={d.avatar}
								alt={d.user}
								className="w-12 h-12 rounded-full border-2 border-blue-200 dark:border-blue-800 object-cover"
							/>
							<div className="flex-1">
								<div className="font-bold text-base text-gray-800 dark:text-gray-100">
									{d.user}
								</div>
								<div className="text-xs text-purple-600 dark:text-purple-400">
									{d.project}
								</div>
							</div>
							<Badge className="text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white hidden sm:inline-block">
								{d.badge}
							</Badge>
						</div>

						<p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
							{d.log}
						</p>

						<div className="flex flex-wrap gap-1 mb-4">
							{d.tags.map((tag) => (
								<Badge key={tag} variant="secondary" className="text-xs">
									{tag}
								</Badge>
							))}
						</div>

						<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
							<div className="flex items-center gap-4">
								<span className="flex items-center gap-1">
									<Heart className="w-4 h-4 text-red-500" />
									{d.likes}
								</span>
								<span className="flex items-center gap-1">
									<GitCommit className="w-4 h-4 text-green-500" />
									{d.commits}
								</span>
							</div>
							<span className="text-xs">2 hours ago</span>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
