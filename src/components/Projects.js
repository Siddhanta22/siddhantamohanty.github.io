import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Brain, Film, Zap, Calendar, Code, Mail, Mic, ChevronDown, Rewind, Compass, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import FloatingOrbs from './FloatingOrbs';

const Lightbox = ({ title, shots, index, onClose, onNav, getImagePath }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
      else if (e.key === 'Tab') {
        // Keep keyboard focus inside the dialog while it is open
        const items = [...dialogRef.current.querySelectorAll('button')];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onNav]);

  const many = shots.length > 1;
  const navButton = 'absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors';

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close screenshot viewer"
        className="absolute top-4 right-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-center max-w-6xl w-full">
        <img
          src={getImagePath(shots[index])}
          alt={`${title} screenshot ${index + 1} of ${shots.length}`}
          className="max-h-[80vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
        />
        <p className="mt-4 text-sm text-gray-300 font-mono">
          {title}{many ? ` · ${index + 1} / ${shots.length}` : ''}
        </p>
        {many && (
          <>
            <button type="button" onClick={() => onNav(-1)} aria-label="Previous screenshot" className={`${navButton} left-2 sm:-left-14`}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button type="button" onClick={() => onNav(1)} aria-label="Next screenshot" className={`${navButton} right-2 sm:-right-14`}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getImagePath = (filename) => {
    return `${process.env.PUBLIC_URL || ''}${filename}`;
  };

  const [lightbox, setLightbox] = useState(null);
  const lastFocus = useRef(null);

  const openLightbox = (project, index) => {
    lastFocus.current = document.activeElement;
    setLightbox({ title: project.title, shots: project.screenshots, index });
  };
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    lastFocus.current?.focus?.();
  }, []);
  const navLightbox = useCallback((delta) => {
    setLightbox((l) => (l ? { ...l, index: (l.index + delta + l.shots.length) % l.shots.length } : l));
  }, []);

  const projects = [
    {
      id: 1,
      title: "Self-Heal System",
      role: "Personal Project",
      teaser: "Matches errors to past incidents, then explains and recommends a fix.",
      summary: "A prototype incident-response system for PostgreSQL errors. Captures database exceptions, embeds runtime error logs into FAISS, and retrieves similar past incidents via semantic search, using a calibrated similarity threshold so irrelevant history isn't forced into the answer, to generate context-aware explanations and recommended fixes.",
      technologies: ["Flask", "LangChain", "FAISS", "PostgreSQL", "OpenAI", "Slack"],
      impact: "Includes severity-based Slack alerts, LLM-generated diagnostics, and a chatbot with read-only (SELECT-only) SQL access to recent error logs and database stats.",
      github: "https://github.com/Siddhanta22/Self-Healing-System",
      live: null,
      icon: Brain,
      screenshots: ["/self-healing-workflow.jpg", "/self-healing-dashboard.jpg", "/self-healing-errors.jpg"]
    },
    {
      id: 10,
      title: "Rewind",
      role: "Personal Project",
      teaser: "Replays agent workflows with zero LLM calls, 32x faster on the demo.",
      summary: "An LLM-driven browser agent built on Claude tool-calling and Playwright that completes multi-step workflows on a demo banking app from accessibility-tree snapshots, then compiles successful runs into typed, versioned replay artifacts.",
      technologies: ["Python", "Playwright", "Pydantic", "Claude API", "MCP"],
      impact: "The deterministic replay engine reruns recorded workflows with zero LLM calls — 0.41s versus 13.1s with an LLM in the loop, a 32x speedup — and is exposed to AI agents through an MCP server with action allowlisting, approval gating, and secret redaction.",
      github: "https://github.com/Siddhanta22/Rewind",
      live: null,
      icon: Rewind,
    },
    {
      id: 11,
      title: "Scout",
      role: "Personal Project",
      teaser: "Finds and ranks nonprofits for student consulting clubs from public IRS 990 data.",
      summary: "A prospecting tool for student consulting groups: search the public IRS Form 990 dataset through ProPublica's Nonprofit Explorer API, shortlist organizations, and track outreach status and notes. Each prospect gets a transparent 0–100 fit score built from revenue band, cause area, and revenue trend, with the reasons shown.",
      technologies: ["TypeScript", "Express", "Prisma", "SQLite", "Vitest"],
      impact: "Caches filings with a TTL and serves stale data if the upstream API fails, throttles and retries requests to ProPublica, and ships with 49 tests covering the cache, the API client, and the endpoints.",
      github: "https://github.com/Siddhanta22/Scout",
      live: null,
      icon: Compass,
    },
    {
      id: 6,
      title: "Prompt Tracer",
      role: "Personal Project",
      teaser: "Scores your prompt as you type it, inside ChatGPT, Claude, Grok, and Gemini.",
      summary: "A Chrome extension that grades prompts in real time against five plain-language checks (detail, clear action, specifics, audience, structure) and shows live feedback in a floating panel on ChatGPT, Claude, Grok, and Gemini.",
      technologies: ["JavaScript", "Chrome Extension API", "Manifest V3"],
      impact: "A privacy-first optimizer appends only what a prompt is missing, rule-based by default with optional OpenAI rewriting, and a dashboard charts score trends and platform usage. Everything runs in the browser.",
      github: "https://github.com/Siddhanta22/prompt_tracer",
      live: null,
      icon: Zap,
      screenshots: ["/prompt-tracer-1.jpg", "/prompt-tracer-2.jpg"]
    },
    {
      id: 2,
      title: "yourAIbrief",
      role: "Personal Project",
      teaser: "A personalized AI newsletter platform with magic-link auth and 50+ sources.",
      summary: "A full-stack AI newsletter platform with magic-link authentication and personalized topic preferences. Aggregates content from 50+ trusted sources and delivers structured briefs on a per-user schedule.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Resend", "Vercel"],
      impact: "Tracks per-issue email open and click analytics to measure real engagement, not just delivery.",
      github: "https://github.com/Siddhanta22/yourAIbrief",
      live: "https://your-a-ibrief.vercel.app",
      icon: Mail,
    },
    {
      id: 9,
      title: "Swipeflix",
      role: "Personal Project",
      teaser: "Swipe-based movie discovery with a custom weighted-scoring algorithm.",
      summary: "A swipe-based movie and TV discovery app. Recommendations are driven by a weighted scoring algorithm — genre match, popularity, recency, and format — tuned by a 5-question onboarding quiz and live TMDB API data.",
      technologies: ["React", "Vite", "Tailwind CSS", "TMDB API", "Vercel"],
      impact: "Built custom gesture-driven swipe interactions with hand-rolled CSS transforms (no animation libraries), plus session recaps that surface swipe stats and inferred viewing preferences.",
      github: "https://github.com/Siddhanta22/swipeflix",
      live: "https://swipeflix-alpha.vercel.app",
      icon: Film,
      screenshots: ["/swipeflix-1.jpg", "/swipeflix-2.jpg", "/swipeflix-3.jpg"]
    },
    {
      id: 4,
      title: "Broad-Phase Collision Detector",
      role: "Personal Project",
      teaser: "A 2D broad-phase collision library that runs ~98% fewer checks than brute force.",
      summary: "A TypeScript library implementing grid-based spatial partitioning for 2D collision detection, following Andrew Petersen's broad-phase article, with a brute-force baseline and built-in test counters for benchmarking.",
      technologies: ["TypeScript", "Spatial Partitioning", "AABB"],
      impact: "Cuts AABB tests by about 98% versus brute force, roughly 50x fewer checks at 500–1,000 entities.",
      github: "https://github.com/Siddhanta22/collision_detector",
      live: null,
      icon: Code,
      screenshots: ["/collision-detector-1.jpg"]
    },
    {
      id: 3,
      title: "AI Transcript",
      role: "Personal Project",
      teaser: "Records or uploads audio, transcribes it, and strips the filler words.",
      summary: "Record audio or upload a file, transcribe it with OpenAI Whisper, then clean the transcript with an LLM that removes filler words. A FastAPI backend serves a lightweight browser front end.",
      technologies: ["FastAPI", "OpenAI Whisper", "GPT-4o mini", "JavaScript"],
      impact: "Both models are configurable; the defaults are whisper-1 for transcription and gpt-4o-mini for cleanup.",
      github: "https://github.com/Siddhanta22/AI_transcript",
      live: "https://www.loom.com/share/da220be0a60640dbbbe3ffa6c4182a31",
      icon: Mic,
    },
    {
      id: 8,
      title: "CourseScheduler",
      role: "HackPSU Project",
      teaser: "Builds conflict-free graduation paths from natural-language course data.",
      summary: "An NLP academic planner that helps students build conflict-free graduation paths from natural-language course data.",
      technologies: ["React", "Node.js", "MongoDB", "Python"],
      github: null,
      live: null,
      icon: Calendar,
    },
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
    <section id="projects" className="py-24 bg-gray-50/90 dark:bg-dark-800/90 relative overflow-hidden">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A few projects I loved building, from AI systems to real-time engines
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
            {projects.map((project) => {
              const isActive = activeId === project.id;
              const toggle = () => setActiveId(isActive ? null : project.id);

              return (
                <motion.div key={project.id} variants={rowVariants} className="relative">
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
                      onClick={toggle}
                      className="w-full flex items-center gap-5 p-6 text-left cursor-pointer select-none"
                    >
                      {/* The real toggle is a button (keyboard + screen readers); the row's own
                          onClick just keeps the whole row clickable for mouse users. The
                          GitHub/demo links sit beside it, never inside it. */}
                      <h3 className="flex-1 min-w-0">
                        <button
                          type="button"
                          aria-expanded={isActive}
                          className="flex w-full min-w-0 items-center gap-5 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-dark-700"
                        >
                          <span className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 shrink-0">
                            <project.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-lg font-bold text-gray-900 dark:text-white truncate">
                              {project.title}
                            </span>
                            <span className="block text-sm font-normal text-gray-500 dark:text-gray-300 truncate">
                              {project.teaser}
                            </span>
                          </span>
                        </button>
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Open ${project.title} source code`}
                            title="Source Code"
                            className="p-2.5 bg-gray-100 dark:bg-dark-600 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        ) : (
                          <span className="hidden sm:block w-9 h-9" aria-hidden="true" />
                        )}
                        {project.live ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Open ${project.title} demo`}
                            title="Live Demo"
                            className="p-2.5 bg-gray-100 dark:bg-dark-600 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <span className="hidden sm:block w-9 h-9" aria-hidden="true" />
                        )}
                        <ChevronDown
                          aria-hidden="true"
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
                            <span className="text-xs font-mono uppercase tracking-wide text-gray-600 dark:text-gray-300">
                              {project.role}
                            </span>
                            {project.screenshots && project.screenshots.length > 0 && (
                              <div className={`grid gap-2 mt-4 mb-4 ${project.screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                                {project.screenshots.map((screenshot, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => openLightbox(project, i)}
                                    aria-label={`Enlarge ${project.title} screenshot ${i + 1}`}
                                    className="group relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-100 dark:border-dark-600 dark:bg-dark-900 cursor-zoom-in focus-visible:ring-2 focus-visible:ring-primary-500"
                                  >
                                    <img
                                      src={getImagePath(screenshot)}
                                      alt={`${project.title} screenshot ${i + 1}`}
                                      loading="lazy"
                                      decoding="async"
                                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                    <span className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/55 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                                      <ZoomIn className="w-4 h-4" />
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}

                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mt-3 mb-4">
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

                            {project.impact && (
                              <p className="pt-4 border-t border-gray-100 dark:border-dark-600 text-sm font-medium text-gray-800 dark:text-gray-200">
                                {project.impact}
                              </p>
                            )}
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

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            title={lightbox.title}
            shots={lightbox.shots}
            index={lightbox.index}
            onClose={closeLightbox}
            onNav={navLightbox}
            getImagePath={getImagePath}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
