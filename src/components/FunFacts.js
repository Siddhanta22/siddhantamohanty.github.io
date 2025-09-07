import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coffee, Code, Bug, Rocket, Brain, Zap } from 'lucide-react';

const FunFacts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counters, setCounters] = useState({
    coffee: 0,
    code: 0,
    bugs: 0,
    projects: 0,
    ideas: 0,
    hours: 0
  });

  const funFacts = [
    {
      icon: Coffee,
      label: "Cups of Coffee",
      value: 847,
      suffix: "+",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: Code,
      label: "Lines of Code",
      value: 12500,
      suffix: "+",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Bug,
      label: "Bugs Fixed",
      value: 156,
      suffix: "+",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      icon: Rocket,
      label: "Projects Launched",
      value: 6,
      suffix: "",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Brain,
      label: "AI Models Trained",
      value: 12,
      suffix: "+",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Zap,
      label: "Hours Coding",
      value: 2847,
      suffix: "+",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    }
  ];

  useEffect(() => {
    if (inView) {
      const animateCounters = () => {
        funFacts.forEach((fact, index) => {
          const duration = 2000;
          const steps = 60;
          const increment = fact.value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= fact.value) {
              current = fact.value;
              clearInterval(timer);
            }

            setCounters(prev => ({
              ...prev,
              [Object.keys(prev)[index]]: Math.floor(current)
            }));
          }, duration / steps);
        });
      };

      animateCounters();
    }
  }, [inView]);

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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-accent-50 dark:from-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Fun <span className="gradient-text">Facts</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The numbers behind the passion—because every developer has their own story to tell
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {funFacts.map((fact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6 text-center transition-all duration-300 hover:shadow-2xl"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${fact.bgColor} mx-auto mb-4`}>
                <fact.icon className={`w-6 h-6 bg-gradient-to-r ${fact.color} bg-clip-text text-transparent`} />
              </div>
              
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {counters[Object.keys(counters)[index]]?.toLocaleString() || 0}{fact.suffix}
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {fact.label}
              </div>
              
              <div className="mt-4 h-1 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full bg-gradient-to-r ${fact.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 p-8">
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-4">
              "The best code is like a good joke—it makes you smile, it's clever, and it works perfectly the first time."
            </blockquote>
            <cite className="text-primary-600 dark:text-primary-400 font-semibold">
              — Siddhanta's Development Philosophy
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FunFacts;
