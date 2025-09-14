import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Brain, Globe, Settings } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      id: 1,
      title: "Languages & Web",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      skills: [
        { name: "Python", level: 90 },
        { name: "C++", level: 85 },
        { name: "HTML/CSS", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "JavaScript", level: 80 }
      ]
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      skills: [
        { name: "RAG", level: 80 },
        { name: "Agentic RAG", level: 75 },
        { name: "Vector Databases (Pinecone, FAISS)", level: 75 },
        { name: "LLMs (GPT-4, OpenAI API)", level: 90 },
        { name: "MCP (Model Context Protocol)", level: 80 },
        { name: "TensorFlow", level: 75 },
        { name: "NumPy", level: 85 }
      ]
    },
    {
      id: 3,
      title: "Backend & Frameworks",
      icon: Globe,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      skills: [
        { name: "Flask", level: 80 },
        { name: "REST APIs", level: 80 },
        { name: "Node.js", level: 75 }
      ]
    },
    {
      id: 4,
      title: "Development Tools",
      icon: Settings,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 75 },
        { name: "VS Code", level: 90 },
        { name: "Postman", level: 80 },
        { name: "Streamlit", level: 70 },
        { name: "GitHub", level: 85 },
        { name: "Google Cloud Platform", level: 70 },
        { name: "GDB", level: 65 },
        { name: "Cursor IDE", level: 80 }
      ]
    },
    {
      id: 5,
      title: "Databases",
      icon: Database,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      skills: [
        { name: "MySQL", level: 75 },
        { name: "PostgreSQL", level: 70 }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        delay: 0.5
      }
    })
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The tools and technologies I use to turn ideas into reality
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
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.bgColor} mr-4`}>
                  <category.icon className={`w-6 h-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                      <motion.div
                        custom={skill.level}
                        variants={skillBarVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Skills & Certifications
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Continuous learning and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Certifications */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Certifications
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-dark-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">AI For Everyone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">DeepLearning.AI via Coursera</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">May 2024</span>
                    <a
                      href="https://siddhanta22.github.io/siddhantamohanty.github.io/Coursera%20.pdf"
                      download="AI_For_Everyone_Certificate.pdf"
                      className="mt-2 inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition"
                    >
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-200 dark:border-accent-800">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Problem Solving", "Critical Thinking", "Collaboration", 
                  "Communication", "Adaptability", "Creativity", "Leadership",
                  "Time Management", "Attention to Detail"
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-dark-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 