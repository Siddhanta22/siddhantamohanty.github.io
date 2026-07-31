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
      skills: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
    },
    {
      id: 2,
      title: "Applied AI / ML",
      icon: Brain,
      skills: ["RAG", "LangChain", "FAISS", "Pinecone", "LLMs", "MCP", "PyTorch", "NumPy", "pandas"],
    },
    {
      id: 3,
      title: "Backend & Systems",
      icon: Server,
      skills: ["Flask", "FastAPI", "Django", "Next.js", "Node.js", "REST APIs", "SQLAlchemy", "Docker", "React"],
    },
    {
      id: 4,
      title: "Perception & Robotics",
      icon: Cpu,
      skills: ["ROS2", "Roboflow", "Computer Vision"],
    },
    {
      id: 5,
      title: "Databases",
      icon: Database,
      skills: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    {
      id: 6,
      title: "Tooling",
      icon: Settings,
      skills: ["Git", "GitHub", "Prisma", "Postman", "AWS", "GCP", "VS Code"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
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
    <section id="skills" className="py-24 bg-white dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-72 h-72 bg-accent-400/10 dark:bg-accent-600/10 rounded-full blur-3xl" />
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tools I use across backend systems, applied AI, and perception work
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={categoryVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white dark:bg-dark-700 rounded-2xl border border-gray-200 dark:border-dark-600 p-6 shadow-md hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <category.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.05 * index }}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium border border-gray-200 dark:border-dark-500 group-hover:border-gray-300 dark:group-hover:border-dark-400 transition-colors duration-200"
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
