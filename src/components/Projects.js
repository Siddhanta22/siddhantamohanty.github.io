import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, Camera, Film, Zap, Calendar, Code } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Helper function to get image path
  const getImagePath = (filename) => {
    return `${process.env.PUBLIC_URL || ''}${filename}`;
  };

  const projects = [
    {
      id: 1,
      title: "Self-Heal System",
      role: "Personal Project",
      problem: "An AI self-healing pipeline that stores error context in PostgreSQL, generates embeddings with FAISS, and auto-generates fixes via LangChain + GPT.",
      solution: "Implemented severity-based Slack alerts and end-to-end pipeline from log capture to LLM-generated fixes, reducing MTTR by 35%.",
      technologies: ["Flask", "LangChain", "FAISS", "PostgreSQL", "GPT-3.5", "Slack"],
      impact: "Reduced mean time to resolution by 35% via automated triage and high-signal Slack alerts for engineers.",
      github: "https://github.com/Siddhanta22/Self-Healing-System",
      live: null,
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      screenshots: ["/self-healing-1.jpg", "/self-healing-2.jpg", "/self-healing-3.jpg"]
    },
    {
      id: 2,
      title: "Real-Time Collision Detection Engine",
      role: "Personal Project",
      problem: "A real-time collision detection engine with an interactive Canvas visualizer for large numbers of moving bodies.",
      solution: "Implemented spatial hashing eliminating 98% unnecessary collision checks, achieving 50× faster broad-phase performance.",
      technologies: ["JavaScript", "Canvas API", "Spatial Hashing"],
      impact: "Eliminated 98% of unnecessary collision checks vs brute force and achieved 50× faster broad-phase performance.",
      github: "https://github.com/Siddhanta22/collision_detector",
      live: null,
      icon: Code,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      screenshots: ["/collision-detector-1.png"]
    },
    {
      id: 3,
      title: "Photobot",
      role: "Personal Project",
      problem: "An RAG-based photography assistant for DSLR configuration that answers camera settings questions with grounded, actionable responses.",
      solution: "Built with LangChain, RAG, and OpenAI API — semantic search over documentation with summarized instructions for aperture, shutter, and ISO.",
      technologies: ["LangChain", "RAG", "Python", "OpenAI API"],
      impact: "Reduced decision time by 60% by converting long-form documentation into low-latency semantic search and summarized guidance.",
      github: null,
      live: null,
      icon: Camera,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 4,
      title: "Prompt Tracer",
      role: "Personal Project",
      problem: "A Chrome extension for real-time prompt optimization across multiple AI assistants.",
      solution: "Developed for ChatGPT, Claude, Grok, and Gemini with an analytics dashboard for comparing prompts and model outputs.",
      technologies: ["JavaScript", "Chrome Extension API", "Manifest V3"],
      impact: "Enables real-time prompt optimization and side-by-side analytics across ChatGPT, Claude, Grok, and Gemini.",
      github: "https://github.com/Siddhanta22/prompt_tracer",
      live: null,
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      screenshots: ["/prompt-tracer-1.png", "/prompt-tracer-2.png"]
    },
    {
      id: 5,
      title: "Autonomous Vehicle Team — Perception Algorithms",
      role: "Perception Team Member - Penn State AVT",
      problem: "Shipped perception modules for an autonomous vehicle stack focused on robust detection and sensor fusion under real-time constraints.",
      solution: "ROS2/CarROS integration, LiDAR–camera fusion, YOLOv8 tuning with confidence filtering, calibration and depth-fusion improvements, and repeatable testing workflows for consistent runs.",
      technologies: ["Python", "C++", "ROS2", "OpenCV", "YOLOv8"],
      impact: "Improved detection stability and real-time performance within a 20m operational envelope for competition-grade autonomy.",
      github: null,
      live: null,
      icon: Code,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      id: 6,
      title: "CourseScheduler — NLP Academic Planner",
      role: "HackPSU Project",
      problem: "",
      solution: "An NLP-based academic planning tool that analyzes course descriptions to generate conflict-free graduation paths. Built the frontend and pitched the project during HackPSU.",
      technologies: ["React", "Node.js", "MongoDB", "Python"],
      impact: "Simplified academic planning by reducing scheduling errors and helping optimize graduation timelines through NLP-based course analysis.",
      github: "https://github.com/Siddhanta22/course-scheduler",
      live: null,
      icon: Calendar,
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      id: 7,
      title: "Swipeflix",
      role: "Personal Project",
      problem: "A personalized movie recommender using swipe feedback and TensorFlow.js.",
      solution: "Built with React, Node.js, and MongoDB — gesture-driven discovery with a TensorFlow.js model trained on swipe feedback.",
      technologies: ["TensorFlow.js", "React", "Node.js", "MongoDB"],
      impact: "Achieved 75% recommendation accuracy through swipe feedback and personalized learning.",
      github: "https://github.com/Siddhanta22/swipeflix",
      live: "https://swipeflix-alpha.vercel.app",
      icon: Film,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      screenshots: ["/swipeflix-1.jpg", "/swipeflix-2.jpg", "/swipeflix-3.jpg"]
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
    <section id="projects" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2">
            Production-ready systems showcasing technical depth, architecture, and real-world impact
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            From AI-powered debugging tools to autonomous perception systems
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:to-accent-500/5 transition-all duration-500 pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${project.bgColor}`}>
                    <project.icon className={`w-7 h-7 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{project.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="mb-8">
                  <div className={`grid gap-4 ${
                    project.screenshots.length === 1 
                      ? 'grid-cols-1 max-w-2xl mx-auto' 
                      : 'grid-cols-1 md:grid-cols-3'
                  }`}>
                    {project.screenshots.map((screenshot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-lg overflow-hidden border border-gray-200 dark:border-dark-600 shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={getImagePath(screenshot)}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {typeof project.problem === 'string' && project.problem.trim().length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Solution / Architecture */}
              {typeof project.solution === 'string' && project.solution.trim().length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Built With
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Impact - More Prominent */}
              <div className="pt-6 border-t border-gray-200 dark:border-dark-600">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg font-medium">
                  {project.impact}
                </p>
              </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Siddhanta22"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300"
          >
            <Github className="w-5 h-5 mr-2" />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;