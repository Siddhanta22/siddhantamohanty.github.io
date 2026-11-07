import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { experiences } from '../data';
import { viewResume } from '../utils/resume';
import Kicker from './Kicker';

const Experience = ({ openRequest }) => {
  const [flashId, setFlashId] = useState(null);

  // A skill, the terminal or the palette asked for one of these roles: scroll to it and
  // let it glow for a moment so the eye finds it.
  useEffect(() => {
    if (!openRequest) return undefined;
    document.getElementById(`experience-${openRequest.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setFlashId(openRequest.id);
    const timer = setTimeout(() => setFlashId(null), 2200);
    return () => clearTimeout(timer);
  }, [openRequest]);

  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <Kicker n="03" label="Experience" />
          <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.92] text-fg">
            Where I've <span className="italic text-accent">worked</span>
          </h2>
        </motion.div>

        <div>
          {experiences.map((exp) => (
            <motion.article
              key={exp.id}
              id={`experience-${exp.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className={`scroll-mt-24 grid md:grid-cols-[16rem_1fr] gap-x-14 gap-y-5 py-12 border-t border-line transition-colors duration-700 ${
                flashId === exp.id ? 'bg-accent/10' : ''
              }`}
            >
              <div>
                <div className="md:sticky md:top-28">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{exp.dates}</p>
                  <h3 className="mt-3 font-display text-4xl leading-none text-fg">{exp.company}</h3>
                  <p className="mt-2 text-sm text-muted">{exp.location}</p>
                </div>
              </div>

              <div className="max-w-3xl">
                <p className="text-2xl font-semibold text-fg tracking-tight">{exp.role}</p>
                <p className="mt-3 text-xl text-muted leading-snug">{exp.teaser}</p>

                <ul className="mt-7 space-y-4">
                  {exp.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-4 text-fg/85 leading-relaxed">
                      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" aria-hidden="true" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                  {exp.technologies.map((tech) => (
                    <li key={tech} className="px-3 py-1 rounded-full border border-line font-mono text-xs text-muted">{tech}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="pt-12 border-t border-line">
          <button
            type="button"
            onClick={viewResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fg text-bg font-semibold hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <FileText className="w-5 h-5" /> View Résumé
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
