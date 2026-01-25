import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Target, TrendingUp, Zap } from 'lucide-react';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      icon: Trophy,
      title: "Dean's List",
      description: "Academic Excellence",
      period: "Fall 2023 & Spring 2024 • Fall 2025",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Target,
      title: "Research Assistant",
      description: "Reinforcement Learning for Multi-Stage LLM Optimization",
      period: "Penn State University",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: TrendingUp,
      title: "GenAI Intern",
      description: "Enterprise AI Systems & Self-Healing Infrastructure",
      period: "HCLTech",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Zap,
      title: "AV Team Member",
      description: "Autonomous Perception & Sensor Fusion",
      period: "Penn State AVT",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Impact & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Key milestones and contributions across research, industry, and personal projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6 transition-all duration-300 hover:shadow-2xl h-full min-h-[180px] flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${achievement.bgColor} mr-4`}>
                  <achievement.icon className={`w-6 h-6 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-500/70 dark:text-gray-400/70">
                    {achievement.period}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-900/90 dark:text-white/90 text-base font-semibold mt-1">
                {achievement.description}
              </p>
              
              <div className="mt-4 h-1 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "60%" } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Achievements;
