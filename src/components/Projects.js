import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, Camera, Film, Zap, Calendar, Code } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      id: 1,
      title: "Model Context Protocol (MCP) System",
      role: "GenAI Intern",
      timeline: "May 2025 - August 2025",
      problem: "Organizations struggle with complex, multi-step workflows that require coordination across APIs, file systems, and databases. Manual execution is error-prone and time-consuming.",
      solution: "Designed and deployed a Model Context Protocol (MCP) system enabling LLMs to autonomously execute dynamic, multi-step workflows using structured context prompts and LangChain agents. Integrated Confluence ingestion pipeline for RAG-based contextual search across organizational documentation.",
      technologies: ["LangChain", "MCP", "Python", "RAG", "Vector Databases", "APIs"],
      impact: "Automated complex workflows, reducing manual intervention and improving developer efficiency through intelligent context-aware execution.",
      github: null,
      live: null,
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      title: "Self-Healing Error Intelligence System",
      role: "Personal Project",
      timeline: "June 2025 - Present",
      problem: "System errors require extensive manual debugging, consuming developer time and delaying issue resolution. Raw error logs lack context and actionable insights.",
      solution: "Built an AI-driven error-handling pipeline that intercepts system errors, converts them into FAISS embeddings, and retrieves fixes using GPT-4o. Engineered an agentic RAG pipeline with dual vector databases—one for historical error embeddings and one for internal documentation (Confluence). Integrated an interactive troubleshooting chatbot for querying past errors and tracking recurring issues.",
      technologies: ["GPT-4o", "FAISS", "Vector Search", "LangChain", "Python", "RAG", "Agentic RAG"],
      impact: "Reduced manual debugging effort by 40% and support resolution time by 50% through intelligent error classification and automated fix suggestions.",
      github: "https://github.com/Siddhanta22/Self-Healing-System",
      live: null,
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      screenshots: ["/self-healing-1.jpg", "/self-healing-2.jpg", "/self-healing-3.jpg"]
    },
    {
      id: 3,
      title: "Photobot - RAG DSLR Assistant",
      role: "GenAI Intern",
      timeline: "May 2025 - Present",
      problem: "Photographers struggle to find optimal camera settings for different scenarios. Manual PDF reference is time-consuming and context-specific knowledge is hard to retrieve.",
      solution: "Created an AI-powered camera assistant using RAG + LangChain to process PDF camera manuals and provide DSLR/mirrorless settings tailored to context (astrophotography, sports, concerts). Implemented semantic search across multiple camera models with environment-specific recommendations.",
      technologies: ["LangChain", "FAISS", "GPT-4", "React", "Python", "PDF Processing", "RAG"],
      impact: "Cut configuration decision time by 60% through semantic retrieval from PDF manuals, enabling photographers to capture perfect shots faster.",
      github: null,
      live: null,
      icon: Camera,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 4,
      title: "PromptTracer Browser Extension",
      role: "Personal Project",
      timeline: "July 2025 - Present",
      problem: "Users struggle to optimize AI prompts across different platforms (ChatGPT, Claude, Grok, Gemini). There's no unified tool for analyzing prompt effectiveness and improving interactions.",
      solution: "Designed a browser extension to optimize AI prompts with real-time scoring and recommendations. Implemented privacy-first architecture with local processing and cross-platform integration. Built an interactive analytics dashboard for progress tracking across multiple AI platforms.",
      technologies: ["JavaScript", "Chrome Extension", "Prompt Engineering", "Privacy", "Analytics", "Cross-Platform"],
      impact: "Helps users write better prompts with real-time feedback, improving AI interaction quality across platforms while maintaining privacy.",
      github: "https://github.com/Siddhanta22/prompt_tracer",
      live: null,
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      screenshots: ["/prompt-tracer-1.jpg"]
    },
    {
      id: 5,
      title: "AVT Autonomous Perception Pipeline",
      role: "Perception Team Member",
      timeline: "February 2025 - Present",
      problem: "Autonomous vehicles require accurate perception of traffic lights, signs, road markings, and obstacles. Multi-sensor fusion is critical for reliable navigation, especially under degraded GPS conditions.",
      solution: "Developed ROS2-based algorithms detecting and tracking traffic lights, signs, road markings, parking spaces, and static/dynamic obstacles with >90% accuracy. Built multi-sensor fusion and localization systems combining LiDAR, radar, camera, and IMU. Contributed to competition-ready frameworks including CAN message integration and perception pipelines aligned with SAE Year 4/5 challenge requirements.",
      technologies: ["Python", "C++", "OpenCV", "ROS2", "PCL", "LiDAR", "Computer Vision", "Multi-Sensor Fusion"],
      impact: "Achieved >90% accuracy in object detection and tracking, enabling reliable autonomous navigation under various environmental conditions.",
      github: null,
      live: null,
      icon: Code,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      id: 6,
      title: "CourseScheduler - NLP Academic Planner",
      role: "HackPSU Project",
      timeline: "October 2024",
      problem: "Students with multiple majors/minors struggle to plan course schedules that avoid conflicts while meeting degree requirements. Manual planning is error-prone and time-consuming.",
      solution: "Developed an NLP-powered academic planner with Node.js + MongoDB backend and React/Tailwind CSS frontend. Implemented intelligent course conflict detection, personalized graduation planning, and degree requirement tracking with an intuitive drag-and-drop interface.",
      technologies: ["Node.js", "MongoDB", "React", "Tailwind CSS", "NLP", "Python"],
      impact: "Simplified academic planning for students, reducing scheduling errors and helping optimize graduation timelines.",
      github: "https://github.com/Siddhanta22/course-scheduler",
      live: null,
      icon: Calendar,
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      id: 7,
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Production-ready systems showcasing technical depth, architecture, and real-world impact
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
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 p-8 hover:shadow-2xl transition-all duration-300"
            >
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
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Problem Statement */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Problem
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution / Architecture */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  What I Built
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-dark-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="pt-6 border-t border-gray-200 dark:border-dark-600">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Impact
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {project.impact}
                </p>
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