import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, MapPin, Calendar, ExternalLink } from 'lucide-react';

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
      description: "Research Assistant on a project integrating Reinforcement Learning (RL) into a multi-stage large language model (LLM) system for code and content verification.",
      achievements: [
        "Designed the RL layer that leverages reports from a secondary LLM to generate improved prompts and feedback signals for the primary LLM.",
        "Worked within a pipeline where outputs from the main LLM are analyzed by compilers and static analysis tools (Compiler, Klee, CodeQL) before refinement through RL.",
        "Contributed to competition-ready frameworks including CAN message integration and perception pipelines aligned with SAE Year 4/5 challenge requirements.",
        "Developed advanced RL algorithms for multi-stage LLM optimization and code verification systems."
      ],
      technologies: ["Reinforcement Learning", "LLMs", "Python", "Compiler", "Klee", "CodeQL", "Research"],
      logo: "PSU",
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      company: "HCL Technologies",
      role: "GenAI Intern",
      location: "Remote",
      dates: "May 2025 - July 2025",
      description: "Built production-ready AI systems that transform how businesses handle complex problems—from error debugging to camera assistance.",
      achievements: [
        "Designed and deployed a Model Context Protocol (MCP) system enabling LLMs to autonomously execute dynamic, multi-step workflows across APIs, file systems, and databases using structured context prompts and LangChain agents.",
        "Engineered an agentic RAG (Retrieval Augmented Generation) pipeline utilizing dual vector databases (one for historical error embeddings, one for internal documentation like Confluence) to support contextual reasoning.",
        "Integrated a chatbot assistant with database access for interactive troubleshooting, incident exploration, and persistent issue escalation without manual error definitions.",
        "Created 'Photobot,' an AI-powered camera assistant chatbot using RAG and LangChain, capable of recommending DSLR settings based on user queries and parsed camera manuals."
      ],
      technologies: ["LLMs", "LangChain", "RAG", "Vector Databases", "MCP", "Python", "APIs"],
      logo: "HCL",
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 3,
      company: "Penn State Advanced Vehicle Team",
      role: "Member - Perception Team",
      location: "State College, PA, USA",
      dates: "February 2025 - Present",
      description: "Working on the future of transportation by developing perception systems that help cars see and understand the world around them.",
      achievements: [
        "Developed and optimized algorithms for object detection, road marking recognition, and localization using Python, C++, and OpenCV to enhance autonomous vehicle perception.",
        "Integrated data from cameras, radar, LiDAR, and GNSS with ROS (Robot Operating System) and PCL (Point Cloud Library) to improve perception accuracy.",
        "Processed real-time sensor data using NumPy, Pandas, and MATLAB for improved autonomous vehicle decision-making.",
        "Collaborated with a multidisciplinary team to refine perception pipelines and enhance system performance using Git and Docker for efficient development."
      ],
      technologies: ["Python", "C++", "OpenCV", "ROS", "PCL", "LiDAR", "Computer Vision", "Docker"],
      logo: "PSU",
      color: "from-blue-600 to-white"
    },
    {
      id: 4,
      company: "Elevatoz Loyalty",
      role: "Data Analytics Intern",
      location: "Bengaluru, KA, India",
      dates: "June 2024 - August 2024",
      description: "Applied data science and machine learning techniques to drive customer retention strategies and business insights.",
      achievements: [
        "Extracted and manipulated large datasets using SQL (basic functions) to generate actionable insights for business intelligence.",
        "Learned about company strategies for building models to help clients retain customers.",
        "Built and deployed machine learning models using Python libraries (e.g., scikit-learn, pandas, NumPy) for predictive analytics on customer behavior data from Kaggle datasets.",
        "Utilized Kaggle for hands-on machine learning projects and gained practical experience in data science workflows."
      ],
      technologies: ["SQL", "Python", "scikit-learn", "Pandas", "NumPy", "Machine Learning", "Kaggle"],
      logo: "EL",
      color: "from-green-600 to-green-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section id="experience" className="py-20 bg-gray-50 dark:bg-dark-800">
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
            From AI research to autonomous vehicles, exploring diverse applications of technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={cardVariants}
              className="experience-card"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r ${experience.color} text-white font-bold text-lg shadow-lg`}>
                    {experience.logo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {experience.role}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-2">
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
                    <p className="text-gray-600 dark:text-gray-300">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Achievements:</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="skill-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://linkedin.com/in/siddhanta-mohanty-13aa92222"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            View Full Profile on LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 