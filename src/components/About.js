import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Briefcase, Calendar } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Award,
      label: "Dean's List",
      value: "2 Semesters",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Briefcase,
      label: "GenAI Intern",
      value: "HCL Technologies",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: GraduationCap,
      label: "AV Team Member",
      value: "Perception Systems",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Calendar,
      label: "Years Experience",
      value: "3+ Years",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <p>
                I'm a Computer Science senior at Penn State, specializing in <span className="font-semibold text-gray-900 dark:text-white">AI/ML, robotics, autonomous systems, and full-stack development</span>. My journey began in India, where I first discovered my passion for technology and problem-solving.
              </p>
              
              <p>
                Moving to the United States to pursue my degree was a leap of faith—one that taught me the value of taking risks and embracing a growth mindset. This experience shaped my approach to building systems that are not just technically sound, but also resilient and adaptable.
              </p>
              
              <p>
                Today, I focus on creating <span className="font-semibold text-gray-900 dark:text-white">production-ready RAG pipelines, GenAI systems, and autonomous vehicle perception algorithms</span>. Whether I'm engineering agentic RAG systems that reduce debugging time by 50% or developing multi-sensor fusion systems for autonomous vehicles, I'm driven by the challenge of making complex technology work reliably in real-world scenarios.
              </p>
              
              <p>
                My work spans from backend architecture to AI research, always with a focus on <span className="font-semibold text-gray-900 dark:text-white">measurable impact and technical excellence</span>. I believe the best solutions are those that solve genuine problems while maintaining clarity and maintainability.
              </p>
            </div>
          </motion.div>

          {/* Headshot Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl p-1 shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img 
                  src="/headshot.jpg" 
                  alt="Siddhanta Mohanty" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${stat.bgColor} rounded-xl p-6 text-center border border-gray-200 dark:border-dark-700 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${stat.color} mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;