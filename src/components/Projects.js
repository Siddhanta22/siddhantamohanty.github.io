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
      title: "Self-Healing Error Intelligence Platform",
      role: "Personal Project",
      timeline: "June 2025 - Present",
      problem: "System and database errors require extensive manual debugging, consuming developer time and delaying issue resolution. Raw error logs lack context and actionable insights.",
      solution: "A production-inspired system that detects, logs, and interprets system and database errors using vector search and GPT-based reasoning. Built with a Flask + PostgreSQL backend, FAISS embeddings for error similarity, and Slack integration for real-time explanations. This project demonstrates the full pipeline: capturing raw errors, embedding them, retrieving similar cases, and generating human-readable root-cause analysis.",
      technologies: ["Python", "Flask", "PostgreSQL", "FAISS", "LangChain", "Slack API"],
      impact: "Reduced manual debugging effort by 40% and support resolution time by 50% through intelligent error classification and automated fix suggestions with real-time Slack notifications.",
      github: "https://github.com/Siddhanta22/Self-Healing-System",
      live: null,
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      screenshots: ["/self-healing-1.jpg", "/self-healing-2.jpg", "/self-healing-3.jpg"]
    },
    {
      id: 2,
      title: "Photobot — RAG-Based DSLR Assistant",
      role: "GenAI Intern",
      timeline: "May 2025 - Present",
      problem: "Photographers struggle to find optimal camera settings for different scenarios. Manual PDF reference is time-consuming and context-specific knowledge is hard to retrieve.",
      solution: "A retrieval-augmented assistant trained on DSLR manuals, allowing users to ask natural-language questions about aperture, shutter speed, ISO, and more. Photobot extracts relevant documentation and generates simple, actionable photography instructions.",
      technologies: ["Python", "LangChain", "FAISS", "RAG"],
      impact: "Cut configuration decision time by 60% through semantic retrieval from PDF manuals, enabling photographers to capture perfect shots faster.",
      github: null,
      live: null,
      icon: Camera,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 3,
      title: "PromptTracer — Prompt Observability Tool",
      role: "Personal Project",
      timeline: "July 2025 - Present",
      problem: "Developers struggle to understand how prompt changes affect LLM outputs. There's no unified tool for tracking prompt versions, model responses, and evaluation metrics.",
      solution: "A browser extension and backend workflow that tracks prompt versions, model responses, and evaluation metrics. Helps developers understand how prompt changes affect LLM outputs.",
      technologies: ["JavaScript", "React", "Chrome Extension APIs"],
      impact: "Enables developers to track and optimize prompts systematically, improving AI interaction quality through data-driven prompt engineering.",
      github: "https://github.com/Siddhanta22/prompt_tracer",
      live: null,
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      screenshots: ["/prompt-tracer-1.jpg"]
    },
    {
      id: 4,
      title: "Autonomous Vehicle Team — Perception Algorithms",
      role: "Perception Team Member - Penn State AVT",
      timeline: "February 2025 - Present",
      problem: "Autonomous vehicles require accurate perception of traffic lights, signs, road markings, and obstacles. Multi-sensor fusion is critical for reliable navigation, especially under degraded GPS conditions.",
      solution: "Working on the Perceptions Team, contributing to LiDAR-camera fusion, YOLOv8-based object detection, bounding box confidence filtering (≥0.7), and depth estimation using ROS2. Also work within the CarROS stack, tuning launch files, calibrating sensors, and improving detection consistency within a 20m range.",
      technologies: ["Python", "C++", "ROS2", "OpenCV", "YOLOv8"],
      impact: "Achieved >90% accuracy in object detection and tracking with confidence filtering, enabling reliable autonomous navigation under various environmental conditions within a 20m range.",
      github: null,
      live: null,
      icon: Code,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      id: 5,
      title: "CourseScheduler — NLP Academic Planner",
      role: "HackPSU Project",
      timeline: "October 2024",
      problem: "Students with multiple majors/minors struggle to plan course schedules that avoid conflicts while meeting degree requirements. Manual planning is error-prone and time-consuming.",
      solution: "An academic planning tool that uses NLP to analyze course descriptions and build conflict-free graduation paths. Contributed to the frontend and pitched the project during HackPSU.",
      technologies: ["React", "Node.js", "MongoDB", "Python"],
      impact: "Simplified academic planning for students, reducing scheduling errors and helping optimize graduation timelines through intelligent NLP-based course analysis.",
      github: "https://github.com/Siddhanta22/course-scheduler",
      live: null,
      icon: Calendar,
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      id: 6,
      title: "Swipeflix - Movie Discovery Platform",
      role: "Personal Project",
      timeline: "January 2025 - Present",
      problem: "Finding the next movie to watch is overwhelming with thousands of options. Traditional recommendation systems lack engagement and personalization.",
      solution: "Built a personalized movie/TV recommender using quiz-based profiling and real-time swipe feedback, improving recommendation accuracy over time with TensorFlow.js. Developed a responsive React frontend with smart filters for language, age rating, and genre. Implemented cinematic UI with swipe gestures for intuitive movie selection.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "TensorFlow.js", "Movie API", "UI/UX"],
      impact: "Created an engaging movie discovery experience that makes finding your next watch as fun as social media, with personalized recommendations that improve over time.",
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
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.timeline}
                      </div>
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

              {/* Problem Statement */}
              <div className="mb-6 bg-red-50/50 dark:bg-red-900/10 border-l-4 border-red-400 dark:border-red-600 pl-4 py-3 rounded-r-lg">
                <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  Problem Statement
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution / Architecture */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  Architecture & Implementation
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {project.solution}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6 bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-400 dark:border-blue-600 pl-4 py-3 rounded-r-lg">
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Tech Stack
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
              <div className="pt-6 border-t-2 border-gray-300 dark:border-dark-600 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:from-primary-900/10 dark:to-accent-900/10 -mx-8 px-8 py-6 rounded-b-2xl">
                <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Impact & Results
                </h4>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-semibold text-lg">
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