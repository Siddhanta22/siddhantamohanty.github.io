import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Server, Cpu, Settings, Database } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      id: 1,
      title: "Languages",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      skills: ["Python", "C++", "JavaScript"]
    },
    {
      id: 2,
      title: "Applied AI / ML",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      skills: ["RAG", "LangChain", "FAISS", "OpenCV", "YOLOv8"]
    },
    {
      id: 3,
      title: "Backend & Systems",
      icon: Server,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      skills: ["REST APIs", "Flask", "Node.js", "Docker", "Git"]
    },
    {
      id: 4,
      title: "Perception & Robotics",
      icon: Cpu,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      skills: ["ROS2", "LiDAR–Camera Fusion", "Calibration", "Perception Pipelines"]
    },
    {
      id: 5,
      title: "Databases",
      icon: Database,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      skills: ["PostgreSQL", "MySQL"]
    },
    {
      id: 6,
      title: "Tooling",
      icon: Settings,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      skills: ["Model Context Protocol (MCP)", "Linux", "VS Code"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2">
            Technologies and tools I use to build production-ready systems
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Backend & systems, applied AI/ML, and perception & robotics
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={categoryVariants}
              className="bg-white dark:bg-dark-700 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${category.bgColor} mr-4`}>
                  <category.icon className={`w-7 h-7 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-dark-500 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;