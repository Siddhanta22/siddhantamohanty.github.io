import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, Film, Zap, Calendar, Code, Mail, Mic, ChevronDown } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const [activeId, setActiveId] = useState(projects[0].id);

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="space-y-3"
        >
          {projects.map((project, index) => {
            const isActive = activeId === project.id;
            const toggle = () => setActiveId(isActive ? null : project.id);

            return (
              <motion.div
                key={project.id}
                variants={rowVariants}
                className={`rounded-xl border bg-white dark:bg-dark-700 overflow-hidden transition-colors duration-300 ${
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
                  className="w-full flex items-center gap-4 p-5 text-left cursor-pointer select-none"
                >
                  <span className="hidden sm:block font-mono text-sm text-gray-300 dark:text-dark-500 w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 shrink-0">
                    <project.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {project.role} · {project.technologies.slice(0, 3).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${project.title} demo`}
                        title="Live Demo"
                        className="p-2 bg-gray-100 dark:bg-dark-600 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
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
                      <div className="px-5 pb-6 pt-1 border-t border-gray-100 dark:border-dark-600 sm:pl-[4.75rem]">
                        {project.screenshots && project.screenshots.length > 0 && (
                          <div className={`grid gap-2 mt-4 mb-4 ${project.screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                            {project.screenshots.map((screenshot, i) => (
                              <div
                                key={i}
                                className="rounded-lg overflow-hidden border border-gray-200 dark:border-dark-600"
                              >
                                <img
                                  src={getImagePath(screenshot)}
                                  alt={`${project.title} screenshot ${i + 1}`}
                                  className="w-full h-auto object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <p className={`text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4 ${!project.screenshots ? 'mt-4' : ''}`}>
                          {project.summary}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <p className="pt-4 border-t border-gray-100 dark:border-dark-600 text-sm font-medium text-gray-800 dark:text-gray-200">
                          {project.impact}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
