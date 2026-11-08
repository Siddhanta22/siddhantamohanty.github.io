import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, FileText, Check } from 'lucide-react';
import Magnetic from './Magnetic';
import { viewResume } from '../utils/resume';
import Kicker from './Kicker';

const EMAIL = 'siddhantamohanty22@gmail.com';

const LINKS = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/siddhanta-mohanty-13aa92222', label: 'linkedin.com/in/siddhanta-mohanty-​13aa92222' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/Siddhanta22', label: 'github.com/Siddhanta22' },
  { name: 'Email', icon: Mail, href: `mailto:${EMAIL}`, label: 'Open in mail app' },
];

const pill =
  'inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line text-fg hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const glow = useRef(null);

  // A soft light that follows the cursor across the section
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (glow.current) glow.current.style.background = `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgb(var(--accent) / 0.16), transparent 70%)`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable (older browser / insecure context): fall back to a mail draft
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" onMouseMove={onMove} className="relative overflow-hidden py-32 md:py-44 border-t border-line">
      <div ref={glow} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      {/* First light: the page ends at dawn */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(70% 60% at 50% 110%, rgb(var(--accent) / 0.38), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <Kicker n="06" label="Contact" />
          <h2 className="mt-4 font-display text-7xl md:text-[9rem] leading-[0.9] text-fg">
            Let's <span className="italic text-accent">connect.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-xl text-muted leading-relaxed">
            I enjoy collaborating with engineers, building real-world systems, and exploring new opportunities in AI and software engineering.
          </p>
        </motion.div>

        <Magnetic strength={0.12} className="mt-14 md:mt-20 inline-block max-w-full">
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy email address ${EMAIL}`}
            className="group relative text-left font-display text-[clamp(1.4rem,7vw,2.6rem)] sm:text-5xl md:text-7xl leading-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_2px] bg-left-bottom group-hover:bg-[length:100%_2px] transition-[background-size] duration-500 [overflow-wrap:anywhere]">
              {[...EMAIL].map((ch, i) => (
                <span key={i} className="inline-block transition-transform duration-300 group-hover:-translate-y-1.5" style={{ transitionDelay: `${i * 16}ms` }}>
                  {ch}
                </span>
              ))}
            </span>
            <span className="mt-3 sm:mt-0 sm:ml-4 flex sm:inline-flex items-center gap-1.5 align-middle font-mono text-xs uppercase tracking-wide text-accent">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : 'Click to copy'}
            </span>
          </button>
          <span className="sr-only" role="status" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
        </Magnetic>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          {LINKS.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={pill}
            >
              <Icon className="w-4 h-4" /> {name}
            </a>
          ))}
          <button type="button" onClick={viewResume} className={pill}>
            <FileText className="w-4 h-4" /> Résumé
          </button>
        </div>

        <p className="mt-10 inline-flex items-center gap-2 text-muted">
          <MapPin className="w-4 h-4" /> State College, PA, USA
        </p>
      </div>
    </section>
  );
};

export default Contact;
