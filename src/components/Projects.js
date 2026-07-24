import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, Camera, Film, Zap, Calendar, Code, Mail, Mic } from 'lucide-react';

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
      summary: "An AI-powered self-healing backend for production incidents. Captures database exceptions, embeds runtime error logs into FAISS, and retrieves similar historical incidents via semantic search to generate context-aware root-cause explanations and fixes.",
      technologies: ["Flask", "LangChain", "FAISS", "PostgreSQL", "OpenAI", "Slack"],
      impact: "Ships as a Slack-integrated incident response system with severity-based alerts, LLM-generated diagnostics, and a chatbot with read-only (SELECT-only) SQL access to recent error logs and database stats.",
      github: "https://github.com/Siddhanta22/Self-Healing-System",
      live: null,
      icon: Brain,
      screenshots: ["/self-healing-1.jpg", "/self-healing-2.jpg", "/self-healing-3.jpg"]
    },
    {
      id: 2,
      title: "yourAIbrief",
      role: "Personal Project",
      summary: "A full-stack AI newsletter platform with magic-link authentication and personalized topic preferences. Aggregates content from 50+ trusted sources and delivers structured briefs on a per-user schedule.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Resend", "Vercel"],
      impact: "Tracks per-issue email open and click analytics to measure real engagement, not just delivery.",
      github: "https://github.com/Siddhanta22/yourAIbrief",
      live: "https://your-a-ibrief.vercel.app",
      icon: Mail,
    },
    {
      id: 3,
      title: "AI Transcript",
      role: "Personal Project",
      summary: "A speech pipeline that converts raw recordings into polished, publish-ready transcripts using FastAPI, Whisper transcription, and LLM-based rewriting.",
      technologies: ["FastAPI", "OpenAI Whisper", "LLMs"],
      impact: "Cuts manual editing by automating transcription and clean-up into publish-ready copy.",
      github: "https://github.com/Siddhanta22/AI_transcript",
      live: "https://www.loom.com/share/da220be0a60640dbbbe3ffa6c4182a31",
      icon: Mic,
    },
    {
      id: 4,
      title: "Real-Time Collision Detection Engine",
      role: "Personal Project",
      summary: "A real-time collision engine for dense 2D simulations with large numbers of moving entities. Implemented spatial hashing and broad-phase partitioning to aggressively prune candidate pairs before narrow-phase checks.",
      technologies: ["JavaScript", "Canvas API", "Spatial Hashing"],
      impact: "Eliminated 98% of unnecessary checks and achieved 50x faster broad-phase performance versus brute force.",
      github: "https://github.com/Siddhanta22/collision_detector",
      live: null,
      icon: Code,
      screenshots: ["/collision-detector-1.png"]
    },
    {
      id: 5,
      title: "Photobot",
      role: "Personal Project",
      summary: "A DSLR assistant that retrieves relevant camera guidance and returns practical setting recommendations via a RAG workflow over documentation.",
      technologies: ["LangChain", "RAG", "Python", "OpenAI API"],
      impact: "Cut camera-setting decision time by 60% through low-latency semantic retrieval.",
      github: null,
      live: null,
      icon: Camera,
    },
    {
      id: 6,
      title: "Prompt Tracer",
      role: "Personal Project",
      summary: "A prompt observability extension for tracking and improving prompts across major LLM tools. Built a Chrome extension with a real-time analytics dashboard for ChatGPT, Claude, Grok, and Gemini, comparing prompt variants and output quality to surface performance trends as they happen.",
      technologies: ["JavaScript", "Chrome Extension API", "Manifest V3"],
      impact: "Makes prompt iteration measurable and repeatable with side-by-side analytics across multiple model platforms.",
      github: "https://github.com/Siddhanta22/prompt_tracer",
      live: null,
      icon: Zap,
      screenshots: ["/prompt-tracer-1.png", "/prompt-tracer-2.png"]
    },
    {
      id: 8,
      title: "CourseScheduler",
      role: "HackPSU Project",
      summary: "An NLP academic planner that helps students build conflict-free graduation paths from natural-language course data.",
      technologies: ["React", "Node.js", "MongoDB", "Python"],
      impact: "Cut manual scheduling effort and planning errors via automated course-sequence recommendations.",
      github: "https://github.com/Siddhanta22/course-scheduler",
      live: null,
      icon: Calendar,
    },
    {
      id: 9,
      title: "Swipeflix",
      role: "Personal Project",
      summary: "A swipe-based movie and TV discovery app. Recommendations are driven by a weighted scoring algorithm — genre match, popularity, recency, and format — tuned by a 5-question onboarding quiz and live TMDB API data.",
      technologies: ["React", "Vite", "Tailwind CSS", "TMDB API", "Vercel"],
      impact: "Built custom gesture-driven swipe interactions with hand-rolled CSS transforms (no animation libraries), plus session recaps that surface swipe stats and inferred viewing preferences.",
      github: "https://github.com/Siddhanta22/swipeflix",
      live: "https://swipeflix-alpha.vercel.app",
      icon: Film,
      screenshots: ["/swipeflix-1.jpg", "/swipeflix-2.jpg", "/swipeflix-3.jpg"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-dark-800">
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A few projects I loved building, from AI systems to real-time engines
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="md:columns-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="project-card flex flex-col break-inside-avoid mb-6"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 shrink-0">
                    <project.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.role}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} source code`}
                      title="Source Code"
                      className="p-2 bg-gray-100 dark:bg-dark-600 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} demo`}
                      title="Live Demo"
                      className="p-2 bg-gray-100 dark:bg-dark-600 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {project.screenshots && project.screenshots.length > 0 && (
                <div className={`grid gap-2 mb-4 ${project.screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {project.screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden border border-gray-200 dark:border-dark-600"
                    >
                      <img
                        src={getImagePath(screenshot)}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="mt-auto pt-4 border-t border-gray-200 dark:border-dark-700 text-sm font-medium text-gray-800 dark:text-gray-200">
                {project.impact}
              </p>
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
