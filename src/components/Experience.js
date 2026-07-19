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
      dates: "Sep 2025 – Dec 2025",
      achievements: [
        "Built an RL feedback layer that uses secondary LLM reports to improve prompts for a primary LLM in a multi-stage code verification pipeline",
        "Integrated compilers and static analysis tools (Klee, CodeQL) to validate LLM outputs before RL refinement",
        "Researched reinforcement learning approaches and studied academic papers to apply RL to LLM-based code verification systems",
        "Contributed to perception and CAN integration frameworks for SAE autonomous challenge systems"
      ],
      technologies: ["Reinforcement Learning", "LLMs", "Python", "Klee", "CodeQL", "Compilers"],
      logo: "PSU"
    },
    {
      id: 2,
      company: "HCLTech",
      role: "GenAI Intern — LLM Systems",
      location: "Redmond, WA, USA",
      dates: "May 2025 - August 2025",
      achievements: [
        "Built a RAG-based support automation pipeline that turns production error logs into remediation recommendations and automated Slack alerts, cutting support resolution time 50%",
        "Indexed internal documentation and historical incidents into FAISS with structured metadata, sharpening the relevance of retrieved recommendations",
        "Orchestrated multi-agent workflows across APIs, file systems, databases, and Confluence using MCP and LangChain to automate knowledge retrieval and routine actions"
      ],
      technologies: ["LLMs", "RAG", "Flask", "FAISS", "MCP", "Python", "LangChain"],
      logo: "HCL"
    },
    {
      id: 3,
      company: "Penn State Advanced Vehicle Team",
      role: "Perception Team Member",
      location: "State College, PA, USA",
      dates: "February 2025 - December 2025",
      achievements: [
        "Curated and labeled perception datasets in Roboflow to support object-detection model training for vehicle and traffic scenarios",
        "Ran ROS2 perception pipelines against recorded rosbag sessions to evaluate detection output and catch dataset issues before training",
        "Worked alongside the perception team to turn raw sensor recordings into training-ready data for a competition-grade autonomous vehicle"
      ],
      technologies: ["Python", "ROS2", "Roboflow", "Computer Vision"],
      logo: "AVT"
    },
    {
      id: 4,
      company: "Elevatoz Loyalty",
      role: "Data Analytics Intern",
      location: "Bengaluru, KA, India",
      dates: "June 2024 - August 2024",
      achievements: [
        "Analyzed customer datasets with SQL and Python (pandas, NumPy) to surface behavioral trends for the loyalty platform",
        "Automated recurring ETL workflows, cutting data-processing time by 40%"
      ],
      technologies: ["SQL", "Python", "pandas", "NumPy"],
      logo: "EL"
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2">
            I build software that ships, scales, and solves real engineering problems
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Internships, research, and team projects focused on reliability and measurable impact
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-accent-200 to-primary-200 dark:from-primary-800 dark:via-accent-800 dark:to-primary-800"></div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8 relative"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={cardVariants}
                whileHover={{ y: -5, x: 5 }}
                className="relative bg-white dark:bg-dark-700 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-600 p-8 hover:shadow-2xl transition-all duration-300 lg:ml-16"
              >
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute -left-20 top-8 w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-dark-800 shadow-lg"></div>
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary-600 dark:bg-primary-500 text-white font-bold text-lg shadow-lg shrink-0">
                    {experience.logo}
                  </div>
                  <div>
                    {experience.id === 1 ? (
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          Research Assistant, Penn State University
                        </h3>
                        <div className="text-sm text-gray-500/70 dark:text-gray-400/70 whitespace-nowrap mt-1">
                          {experience.dates}
                        </div>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {experience.id === 4 ? "Experience" : (experience.id === 1 || experience.id === 2 || experience.id === 3 ? "Impact" : "Key Achievements:")}
                </h4>
                <ul className={experience.id === 1 || experience.id === 2 || experience.id === 3 ? "space-y-4" : "space-y-3"}>
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
                {experience.id === 1 || experience.id === 2 || experience.id === 3 ? null : (
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                )}
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
        </div>

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