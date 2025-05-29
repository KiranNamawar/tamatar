import { Lightbulb, Users, Zap, Rocket, Target, Coffee, Gem, Flame } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

const floatingItems = [
	{
		className: "top-16 left-12 rotate-12",
		icon: <Target className="w-6 h-6 text-emerald-500" />,
		delay: "0s",
		key: "float-target-why",
	},
	{
		className: "top-24 right-20 -rotate-12",
		icon: <Coffee className="w-6 h-6 text-amber-600" />,
		delay: "1s",
		key: "float-coffee-why",
	},
	{
		className: "bottom-16 left-20 rotate-6",
		icon: <Gem className="w-6 h-6 text-cyan-500" />,
		delay: "2s",
		key: "float-gem-why",
	},
	{
		className: "bottom-24 right-12 -rotate-6",
		icon: <Flame className="w-6 h-6 text-orange-500" />,
		delay: "1.5s",
		key: "float-flame-why",
	},
];

const features = [
  {
    icon: <Lightbulb className="w-8 h-8 text-orange-400" />,
    title: "Build in Public",
    desc: "Share your journey, inspire others, and get noticed for your work."
  },
  {
    icon: <Zap className="w-8 h-8 text-pink-500" />,
    title: "Celebrate Every Win",
    desc: "Log daily progress, celebrate small wins, and keep your motivation high."
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Grow Your Network",
    desc: "Connect with fellow devs, find collaborators, and get feedback."
  },
  {
    icon: <Rocket className="w-8 h-8 text-green-500" />,
    title: "AI-powered Insights",
    desc: "Let AI summarize your progress and suggest what to learn next."
  }
];

export default function WhyDevLogSection() {
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
            <Card className="glass-effect hidden md:block dark:glass-effect-dark p-3 hover:scale-110 transition-transform duration-300 opacity-50">
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
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x"
        >
          Why DevLog?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
        >
          The developer playground for building, sharing, and growing—together.
        </motion.p>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 * i }}
            className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl backdrop-blur-md p-6 md:p-8 flex flex-col items-center hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4">{f.icon}</div>
            <div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100 text-center">{f.title}</div>
            <div className="text-gray-600 dark:text-gray-300 text-base text-center leading-relaxed">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
