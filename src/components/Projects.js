import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Zap, Brain, Camera, Film, Calendar, Star } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Self-Healing Backend System",
      description: "An intelligent error-handling pipeline that transforms raw system errors into human-readable insights using GPT-4o and vector search—reducing debugging time by 40%.",
      longDescription: "Production-grade system that automatically intercepts, analyzes, and resolves system errors in real-time. Features include: intelligent error classification, automated fix suggestions, chatbot integration for troubleshooting, persistent issue tracking, and seamless integration with existing backend systems. Designed for enterprise-scale deployment with robust error handling and monitoring.",
      technologies: ["GPT-4o", "FAISS", "Vector Search", "LangChain", "Python", "RAG", "Chatbot", "Production"],
      icon: Brain,
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      date: "June 2025 - Present",
      github: "https://github.com/Siddhanta22/Self-Healing-System",
      live: null,
      featured: true,
      production: true,
      highlights: ["AI-Powered Debugging", "40% Time Reduction", "Enterprise Ready", "Real-time Processing"]
    },
    {
      id: 2,
      title: "Photobot",
      description: "An AI-powered camera assistant that reads camera manuals and provides intelligent setting recommendations for any photography scenario.",
      longDescription: "Production-ready AI assistant that processes PDF camera manuals and provides contextual recommendations. Features include: semantic search across multiple camera models, environment-specific suggestions (astrophotography, sports, concerts), detailed configuration tips, and an intuitive chat interface. Built with scalability in mind to support hundreds of camera models and thousands of users.",
      technologies: ["LangChain", "FAISS", "GPT-4", "React", "Python", "PDF Processing", "RAG", "Production"],
      icon: Camera,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      date: "May 2025 - Present",
      github: null,
      live: null,
      featured: true,
      production: true,
      highlights: ["Multi-Camera Support", "Context-Aware AI", "PDF Processing", "Scalable Architecture"]
    },
    {
      id: 3,
      title: "Swipeflix",
      description: "A production-ready movie discovery app with a swipe-based interface that makes finding your next watch as fun as dating apps make finding love. Features cinematic UI, personalized recommendations, and seamless user experience.",
      longDescription: "Built with a focus on user experience and production quality. Features include: cinematic movie cards with hover effects, swipe gestures for movie selection, personalized recommendation algorithm, mood-based filtering, watchlist management, and responsive design that works flawlessly on all devices. The app uses modern React patterns, optimized performance, and intuitive UX that keeps users engaged.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Local Storage", "Movie API", "UI/UX", "Production Ready"],
      icon: Film,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      date: "January 2025 - Present",
      github: "https://github.com/Siddhanta22/swipeflix",
      live: "https://swipeflix-alpha.vercel.app",
      featured: true,
      production: true,
      highlights: ["Cinematic UI Design", "Swipe Gestures", "Personalized Recommendations", "Production Deployed"]
    },
    {
      id: 4,
      title: "Prompt Tracer",
      description: "Browser extension for analyzing and optimizing AI prompts across ChatGPT, Claude, Grok, and Gemini with real-time scoring and privacy-first design.",
      longDescription: "A sophisticated Chrome extension that transforms AI interactions through intelligent prompt analysis and optimization. Features real-time scoring, privacy-first local processing, cross-platform support, and an interactive analytics dashboard for progress tracking.",
      technologies: ["JavaScript", "Chrome Extension", "Prompt Engineering", "Privacy", "Analytics", "AI", "Cross-Platform"],
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      date: "July 2025 - Present",
      github: "https://github.com/Siddhanta22/prompt_tracer",
      live: null,
      featured: true,
      production: true,
      highlights: ["Real-time Prompt Analysis", "Privacy-First", "Cross-Platform", "Interactive Analytics"]
    },
    {
      id: 5,
      title: "CourseScheduler",
      description: "A smart academic planning tool that helps students navigate complex degree requirements and optimize their course schedules using NLP.",
      longDescription: "Production application that simplifies academic planning for students with multiple majors/minors. Features include: intelligent course conflict detection, personalized graduation planning, degree requirement tracking, and an intuitive drag-and-drop interface. Built with modern web technologies and designed for university-scale deployment.",
      technologies: ["Node.js", "MongoDB", "React", "Tailwind CSS", "NLP", "Python", "Production"],
      icon: Calendar,
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      date: "October 2024",
      github: "https://github.com/Siddhanta22/course-scheduler",
      live: null,
      featured: true,
      production: true,
      highlights: ["NLP-Powered Planning", "Conflict Detection", "Multi-Major Support", "University Ready"]
    },
    {
      id: 6,
      title: "yourAIbrief",
      description: "A comprehensive AI newsletter platform delivering curated, up-to-date artificial intelligence news with superior coverage and personalization.",
      longDescription: "Built to help users stay ahead in the fast-moving world of AI. Features include: personalized content curation, automated news aggregation, intelligent content filtering, responsive design, and seamless user experience. The platform provides daily insights into the latest AI developments, research breakthroughs, and industry trends.",
      technologies: ["TypeScript", "React", "Node.js", "AI News", "Newsletter", "Content Curation", "Production"],
      icon: Brain,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      date: "December 2024 - Present",
      github: "https://github.com/Siddhanta22/yourAIbrief",
      live: null,
      featured: true,
      production: true,
      highlights: ["AI News Curation", "Personalized Content", "Daily Updates", "Industry Insights"]
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
    <section id="projects" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Cool <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Production-ready applications that showcase creativity, technical depth, and real-world impact
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`project-card ${project.featured ? 'md:col-span-2' : ''}`}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${project.bgColor}`}>
                    <project.icon className={`w-6 h-6 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
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
                      className="p-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
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
                      className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              {project.featured && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>
              )}

              {/* Project Highlights */}
              {project.highlights && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-800 dark:text-primary-300 text-xs font-medium rounded-md border border-primary-200 dark:border-primary-800"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`skill-tag ${tech === 'Production Ready' || tech === 'Production' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700' : ''}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>


              <div className="mt-4 flex items-center justify-between">
                {project.featured && (
                  <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
                    <Star className="w-4 h-4 mr-2" />
                    Featured Project
                  </div>
                )}
                {project.production && (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Production Ready
                  </div>
                )}
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