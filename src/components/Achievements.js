import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Microscope, Brain, Car } from 'lucide-react';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      icon: Trophy,
      title: "Dean's List",
      tag: "Academic",
      description: "Recognized for strong academic performance across multiple semesters.",
      period: "Fall 2023 · Spring 2024 · Fall 2025",
      accent: "from-amber-500 to-orange-500",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
      borderHover: "hover:border-amber-400/50 dark:hover:border-amber-500/40",
    },
    {
      icon: Microscope,
      title: "Research Assistant",
      tag: "Research",
      description: "Explored reinforcement learning strategies to improve multi-stage LLM code verification pipelines.",
      period: "Penn State University",
      accent: "from-sky-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-sky-500 to-cyan-600",
      borderHover: "hover:border-sky-400/50 dark:hover:border-sky-500/40",
    },
    {
      icon: Brain,
      title: "GenAI Intern",
      tag: "Industry",
      description: "Built enterprise AI systems and self-healing reliability workflows used by engineering teams.",
      period: "HCLTech · Redmond, WA",
      accent: "from-emerald-500 to-teal-500",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      borderHover: "hover:border-emerald-400/50 dark:hover:border-emerald-500/40",
    },
    {
      icon: Car,
      title: "AV Team Member",
      tag: "Engineering",
      description: "Contributed to autonomous perception and real-time LiDAR and camera sensor fusion systems.",
      period: "Penn State Advanced Vehicle Team",
      accent: "from-indigo-500 to-blue-600",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
      borderHover: "hover:border-indigo-400/50 dark:hover:border-indigo-500/40",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="achievements"
      className="py-24 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-dark-800 dark:to-dark-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Impact & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Highlights from school, internships, research, and hands-on engineering work
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-600 p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${achievement.borderHover}`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${achievement.accent} opacity-80`}
              />

              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.iconBg} shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300`}
                >
                  <achievement.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-500">
                      {achievement.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.period}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
