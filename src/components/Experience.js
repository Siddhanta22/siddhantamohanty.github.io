import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, MapPin, Calendar, Download } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      id: 1,
      company: "Penn State University",
      role: "Research Assistant",
      location: "University Park, PA, USA",
      dates: "September 2025 - Present",
      achievements: [
        "Designed RL layer leveraging secondary LLM reports to generate improved prompts and feedback signals for primary LLM in multi-stage code verification system",
        "Built pipeline integrating compilers and static analysis tools (Compiler, Klee, CodeQL) to analyze LLM outputs before RL refinement",
        "Contributed to competition-ready frameworks including CAN message integration and perception pipelines aligned with SAE Year 4/5 challenge requirements",
        "Developed advanced RL algorithms for multi-stage LLM optimization, improving code verification accuracy and system reliability"
      ],
      technologies: ["Reinforcement Learning", "LLMs", "Python", "Compiler", "Klee", "CodeQL"],
      logo: "PSU",
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      company: "HCL Technologies",
      role: "GenAI Intern",
      location: "Redmond, WA, USA",
      dates: "May 2025 - August 2025",
      achievements: [
        "Reduced support resolution time by 50% by engineering agentic RAG pipeline with dual vector databases for historical error embeddings and internal documentation",
        "Automated complex, multi-step workflows across APIs, file systems, and databases via Model Context Protocol (MCP) system using LangChain agents",
        "Designed Confluence ingestion pipeline integrated with MCP and LangChain, enabling RAG-based contextual search across organizational documentation",
        "Created Photobot, an AI-powered camera assistant using RAG + LangChain, cutting configuration decision time by 60% through semantic retrieval from PDF manuals"
      ],
      technologies: ["LLMs", "LangChain", "RAG", "Vector Databases", "MCP", "Python", "APIs"],
      logo: "HCL",
      color: "from-indigo-600 to-purple-800"
    },
    {
      id: 3,
      company: "Penn State Advanced Vehicle Team",
      role: "Member - Perception Team",
      location: "State College, PA, USA",
      dates: "February 2025 - Present",
      achievements: [
        "Developed ROS2-based algorithms detecting and tracking traffic lights, signs, road markings, parking spaces, and static/dynamic obstacles with >90% accuracy",
        "Built multi-sensor fusion and localization systems combining LiDAR, radar, camera, and IMU to ensure accurate navigation under degraded GPS conditions",
        "Contributed to competition-ready frameworks including CAN message integration and perception pipelines aligned with SAE Year 4/5 challenge requirements",
        "Optimized perception algorithms using Python, C++, and OpenCV to enhance autonomous vehicle decision-making in real-time scenarios"
      ],
      technologies: ["Python", "C++", "OpenCV", "ROS2", "PCL", "LiDAR", "Computer Vision", "Docker"],
      logo: "AVT",
      color: "from-green-600 to-emerald-800"
    },
    {
      id: 4,
      company: "Elevatoz Loyalty",
      role: "Intern",
      location: "Bengaluru, KA, India",
      dates: "June 2024 - August 2024",
      achievements: [
        "Applied SQL and Python (pandas, NumPy) to extract, manipulate, and analyze large datasets for business intelligence and customer insights",
        "Built and deployed machine learning models using scikit-learn for predictive analytics on customer behavior data",
        "Gained practical experience in data science workflows and model deployment for customer retention strategies"
      ],
      technologies: ["SQL", "Python", "scikit-learn", "Pandas", "NumPy", "Machine Learning"],
      logo: "EL",
      color: "from-orange-600 to-red-800"
    }
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://siddhanta22.github.io/siddhantamohanty.github.io/Resume_main.pdf';
    link.download = 'Siddhanta_Mohanty_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building production systems and advancing AI research across diverse domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-dark-700 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8 hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r ${experience.color} text-white font-bold text-lg shadow-lg`}>
                    {experience.logo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {experience.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {experience.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {experience.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {experience.dates}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Achievements:</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-6 border-t border-gray-200 dark:border-dark-600">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-dark-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadResume}
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Résumé PDF
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;