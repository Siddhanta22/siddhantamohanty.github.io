import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, ChevronDown } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import FloatingOrbs from './FloatingOrbs';

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
      teaser: "Applied reinforcement learning to make LLM-based code verification self-correcting.",
      achievements: [
        "Built an RL feedback layer that uses secondary LLM reports to improve prompts for a primary LLM in a multi-stage code verification pipeline",
        "Integrated compilers and static analysis tools (Klee, CodeQL) to validate LLM outputs before RL refinement",
        "Researched reinforcement learning approaches and studied academic papers to apply RL to LLM-based code verification systems"
      ],
      technologies: ["Reinforcement Learning", "LLMs", "Python", "Klee", "CodeQL", "Compilers"],
      logo: "PSU"
    },
    {
      id: 2,
      company: "HCLTech",
      role: "GenAI Intern — LLM Systems",
      location: "Redmond, WA, USA",
      dates: "May 2025 – Aug 2025",
      teaser: "Built a RAG-based support system that cut resolution time in half.",
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
      dates: "Feb 2025 – Dec 2025",
      teaser: "Curated and validated perception datasets for a competition-grade autonomous vehicle.",
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
      dates: "Jun 2024 – Aug 2024",
      teaser: "Cleaned and analyzed structured customer datasets to surface behavioral trends.",
      achievements: [
        "Cleaned, transformed, and analyzed structured customer datasets using SQL and Python (pandas, NumPy)"
      ],
      technologies: ["SQL", "Python", "pandas", "NumPy"],
      logo: "EL"
    }
  ];

  const [activeId, setActiveId] = useState(experiences[0].id);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://siddhanta22.github.io/siddhantamohanty.github.io/Resume_main.pdf';
    link.download = 'Siddhanta_Mohanty_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  return (
    <section id="experience" className="py-24 bg-gray-50/90 dark:bg-dark-800/90 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I build software that ships, scales, and solves real engineering problems
          </p>
        </motion.div>

        <div className="relative">
          {/* Branch line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            className="hidden sm:block absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-dark-600"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-5"
          >
            {experiences.map((experience) => {
              const isActive = activeId === experience.id;
              const toggle = () => setActiveId(isActive ? null : experience.id);

              return (
                <motion.div key={experience.id} variants={rowVariants} className="relative">
                  {/* Branch node */}
                  <span className="hidden sm:flex absolute left-0 top-8 w-8 items-center justify-center z-10">
                    <motion.span
                      animate={
                        isActive
                          ? { boxShadow: ['0 0 0 0 rgba(6,182,212,0.45)', '0 0 0 8px rgba(6,182,212,0)', '0 0 0 0 rgba(6,182,212,0)'] }
                          : {}
                      }
                      transition={isActive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                      className={`w-3 h-3 rounded-full ring-4 ring-gray-50 dark:ring-dark-800 transition-colors duration-300 ${
                        isActive ? 'bg-primary-500' : 'bg-gray-300 dark:bg-dark-500'
                      }`}
                    />
                  </span>

                  <SpotlightCard
                    className={`relative sm:ml-10 rounded-xl border bg-white dark:bg-dark-700 overflow-hidden transition-colors duration-300 ${
                      isActive
                        ? 'border-primary-300 dark:border-primary-600 shadow-lg'
                        : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isActive}
                      onClick={toggle}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggle();
                        }
                      }}
                      className="w-full flex items-center gap-5 p-6 text-left cursor-pointer select-none"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary-600 dark:bg-primary-500 text-white font-bold text-xs shrink-0">
                        {experience.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                          {experience.role}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {experience.teaser}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:block text-xs font-mono text-gray-400 dark:text-gray-500 whitespace-nowrap">
                          {experience.dates}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-7 pt-4 border-t border-gray-100 dark:border-dark-600">
                            <span className="text-xs font-mono uppercase tracking-wide text-gray-400 dark:text-gray-500">
                              {experience.company} · {experience.location}
                              <span className="sm:hidden"> · {experience.dates}</span>
                            </span>

                            <ul className="space-y-3 mt-4 mb-4">
                              {experience.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 shrink-0"></div>
                                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-1.5">
                              {experience.technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2.5 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

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
