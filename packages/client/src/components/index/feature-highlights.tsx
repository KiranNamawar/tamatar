import { 
	Trophy, 
	GitBranch, 
	Sparkles, 
	Link2, 
	TrendingUp,
	Users,
	Calendar,
	FileText,
	Share2,
	Code,
	Zap,
	Heart,
	Star
} from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

const floatingItems = [
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
    desc: "Document your coding journey with rich text, images, and code snippets."
  },
  {
    icon: <GitBranch className="w-7 h-7 text-green-500" />,
    title: "GitHub Integration",
    desc: "Automatically sync your commits and showcase your coding activity."
  },
  {
    icon: <Trophy className="w-7 h-7 text-yellow-500" />,
    title: "Streaks & Achievements",
    desc: "Stay motivated with coding streaks, badges, and milestone celebrations."
  },
  {
    icon: <Users className="w-7 h-7 text-purple-500" />,
    title: "Developer Community",
    desc: "Connect with fellow developers, give feedback, and collaborate on projects."
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-indigo-500" />,
    title: "Progress Analytics",
    desc: "Visualize your growth with detailed charts and learning insights."
  },
  {
    icon: <FileText className="w-7 h-7 text-teal-500" />,
    title: "Project Portfolios",
    desc: "Build stunning portfolios that showcase your projects and skills."
  },
  {
    icon: <Link2 className="w-7 h-7 text-orange-500" />,
    title: "Resource Library",
    desc: "Save and share tutorials, articles, and learning resources with the community."
  },
  {
    icon: <Sparkles className="w-7 h-7 text-pink-500" />,
    title: "AI-Powered Insights",
    desc: "Get personalized recommendations and smart summaries of your progress."
  },
  {
    icon: <Share2 className="w-7 h-7 text-cyan-500" />,
    title: "Social Features",
    desc: "Follow developers, like posts, comment, and build your developer network."
  }
];

export default function FeatureHighlightsSection() {
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
            <Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-40">
              {item.icon}
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x"
        >
          Everything You Need to Grow
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto"
        >
          A complete platform designed for developers to track progress, share knowledge, and build amazing portfolios.
        </motion.p>
      </div>
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 * i }}
            className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-8 flex flex-col items-center"
          >
            <div className="mb-3">{f.icon}</div>
            <div className="font-bold text-lg mb-1 text-gray-800 dark:text-gray-100">{f.title}</div>
            <div className="text-gray-600 dark:text-gray-300 text-base text-center">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
