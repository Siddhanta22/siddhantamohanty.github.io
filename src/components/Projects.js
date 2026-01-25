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
      problem: "Built an error intelligence platform that ingests application + database failures and returns actionable triage for engineers.",
      solution: "Flask/PostgreSQL service with structured log capture, FAISS similarity search over embeddings, and LLM reasoning for root-cause summaries; Slack bot posts analyses and suggested fixes in real time.",
      technologies: ["Python", "Flask", "PostgreSQL", "FAISS", "LangChain", "Slack API"],
      impact: "Cut investigation time ~40% and reduced support resolution time ~50% by clustering incidents and pushing high-signal explanations directly into Slack.",
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
      problem: "Built a real-time collision detection engine and Canvas visualizer for large swarms of moving bodies.",
      solution: "Broad-phase via spatial hashing + AABB culling; modular strategy interface for plug-and-play collision algorithms; benchmarking harness with HUD, starfield, and collision highlighting.",
      technologies: ["TypeScript", "Canvas API", "Spatial Hashing", "AABB Culling", "Physics Engine"],
      impact: "Reduced candidate checks ~98% vs brute force and sustained 50–60× throughput gains on 1000 moving objects while preserving correctness.",
      github: "https://github.com/Siddhanta22/collision_detector",
      live: null,
      icon: Code,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      screenshots: ["/collision-detector-1.png"]
    },
    {
      id: 3,
      title: "Photobot — RAG-Based DSLR Assistant",
      role: "GenAI Intern",
      problem: "Built a retrieval-augmented assistant over DSLR manuals that answers settings questions with grounded responses.",
      solution: "PDF ingestion → chunking/embeddings → FAISS retrieval → response generation with prompt templates tuned for concise, actionable guidance (aperture/shutter/ISO).",
      technologies: ["Python", "LangChain", "FAISS", "RAG"],
      impact: "Reduced lookup time ~60% by converting long-form documentation into low-latency semantic search + summarized instructions.",
      github: null,
      live: null,
      icon: Camera,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 4,
      title: "PromptTracer — Prompt Observability Tool",
      role: "Personal Project",
      problem: "Built a prompt observability tool that versions prompts and captures model outputs + evaluation signals per run.",
      solution: "Chrome extension logs executions; React UI supports prompt diffs and run timelines; backend workflow stores metadata for side-by-side comparisons across variants and models.",
      technologies: ["JavaScript", "React", "Chrome Extension APIs"],
      impact: "Made prompt iteration repeatable with traceability across changes, reducing regression risk when shipping model-backed features.",
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
      problem: "Shipped perception modules for an autonomous vehicle stack, focusing on robust detection and sensor fusion under real-time constraints.",
      solution: "ROS2/CarROS integration, LiDAR-camera fusion, YOLOv8 tuning + confidence filtering, calibration and depth-fusion improvements; repeatable testing workflows for consistent runs.",
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
      id: 7,
      title: "Swipeflix - Movie Discovery Platform",
      role: "Personal Project",
      problem: "Built a swipe-first movie discovery app with real-time preference modeling and fast filtering.",
      solution: "React/Tailwind UI with gesture-driven flows; quiz-based cold start + TensorFlow.js learning loop from swipe feedback; API-backed catalog with language/age/genre filters.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "TensorFlow.js", "Movie API", "UI/UX"],
      impact: "Increased session engagement by tightening the feedback loop and improving recommendation quality as users swipe.",
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

              {/* Problem Statement */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {project.problem}
                </p>
              </div>

              {/* Solution / Architecture */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {project.solution}
                </p>
              </div>

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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
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