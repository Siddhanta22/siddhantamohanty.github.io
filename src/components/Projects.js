import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '../data';
import TechConstellation from './TechConstellation';
import Kicker from './Kicker';

const imagePath = (filename) => `${process.env.PUBLIC_URL || ''}${filename}`;
const pad = (n) => String(n).padStart(2, '0');

const Lightbox = ({ title, shots, index, onClose, onNav }) => {
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
  const nav = 'absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-accent transition-colors';

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
    >
      <button type="button" onClick={onClose} aria-label="Close screenshots" className="absolute top-5 right-5 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent">
        <X className="w-6 h-6" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-center max-w-6xl w-full">
        <img
          src={imagePath(shots[index])}
          alt={`${title} screenshot ${index + 1} of ${shots.length}`}
          className="max-h-[80vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
        />
        <p className="mt-4 text-sm text-gray-300 font-mono">
          {title}{many ? ` · ${index + 1} / ${shots.length}` : ''}
        </p>
        {many && (
          <>
            <button type="button" onClick={() => onNav(-1)} aria-label="Previous screenshot" className={`${nav} left-2 sm:-left-14`}><ChevronLeft className="w-6 h-6" /></button>
            <button type="button" onClick={() => onNav(1)} aria-label="Next screenshot" className={`${nav} right-2 sm:-right-14`}><ChevronRight className="w-6 h-6" /></button>
          </>
        )}
      </div>
    </motion.div>
  );
};

const linkClass =
  'inline-flex items-center gap-2 px-4 min-h-[44px] rounded-full border border-line text-sm text-fg hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70';

const Projects = ({ openRequest }) => {
  const [activeId, setActiveId] = useState(projects[0].id);
  const [lightbox, setLightbox] = useState(null);
  const lastFocus = useRef(null);

  // Highlight the index entry for whichever project is crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(Number(entry.target.dataset.id));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('[data-project]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // A skill, the terminal or the palette asked for one of these projects
  useEffect(() => {
    if (!openRequest) return;
    setActiveId(openRequest.id);
    document.getElementById(`project-${openRequest.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [openRequest]);

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

  return (
    <section id="projects" className="relative py-28 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <Kicker n="02" label="Selected work" />
          <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.92] text-fg">
            Things I've <span className="italic text-accent">built</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[17rem_1fr] gap-12 xl:gap-20">
          <nav aria-label="Projects index" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1">
              {projects.map((p, i) => {
                const on = activeId === p.id;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => document.getElementById(`project-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      aria-current={on ? 'true' : undefined}
                      className={`group flex w-full items-baseline gap-3 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded ${on ? 'text-fg' : 'text-muted hover:text-fg'}`}
                    >
                      <span className={`font-mono text-xs transition-colors ${on ? 'text-accent' : ''}`}>{pad(i + 1)}</span>
                      <span className={`font-display text-2xl leading-tight transition-all ${on ? 'translate-x-1' : ''}`}>{p.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div>
            {projects.map((project, i) => {
              const shots = project.screenshots || [];
              return (
                <article
                  key={project.id}
                  id={`project-${project.id}`}
                  data-project
                  data-id={project.id}
                  className="scroll-mt-24 py-14 md:py-20 border-t border-line first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    <span><span className="text-accent">{pad(i + 1)}</span> / {pad(projects.length)}</span>
                    <span>{project.role}</span>
                  </div>

                  <h3 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-fg">{project.title}</h3>
                  <p className="mt-5 text-xl md:text-2xl text-muted max-w-2xl leading-snug">{project.teaser}</p>

                  {shots.length === 0 && (
                    <div className="mt-10">
                      <TechConstellation title={project.title} tech={project.technologies} />
                    </div>
                  )}

                  {shots.length > 0 && (
                    <div className="mt-10 grid grid-cols-2 gap-3">
                      {shots.map((shot, s) => (
                        <button
                          key={shot}
                          type="button"
                          onClick={() => openLightbox(project, s)}
                          aria-label={`Enlarge ${project.title} screenshot ${s + 1}`}
                          className={`group relative overflow-hidden rounded-2xl border border-line bg-panel cursor-zoom-in aspect-video focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                            shots.length !== 2 && s === 0 ? 'col-span-2' : ''
                          }`}
                        >
                          <img
                            src={imagePath(shot)}
                            alt={`${project.title} screenshot ${s + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">What it is</p>
                  <p className="mt-2 text-lg text-fg/85 leading-relaxed max-w-2xl">{project.summary}</p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="px-3 py-1 rounded-full border border-line font-mono text-xs text-muted">{tech}</li>
                    ))}
                  </ul>

                  {project.impact && (
                    <div className="mt-8 border-l-2 border-accent pl-5 max-w-2xl">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Under the hood</p>
                      <p className="mt-2 text-fg/90 leading-relaxed">{project.impact}</p>
                    </div>
                  )}

                  {(project.github || project.live) && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} source code`} className={linkClass}>
                          <Github className="w-4 h-4" /> Source
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo`} className={linkClass}>
                          <ExternalLink className="w-4 h-4" /> Live demo
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}

            <div className="pt-10 border-t border-line">
              <a href="https://github.com/Siddhanta22" target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Github className="w-4 h-4" /> View more on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox title={lightbox.title} shots={lightbox.shots} index={lightbox.index} onClose={closeLightbox} onNav={navLightbox} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
