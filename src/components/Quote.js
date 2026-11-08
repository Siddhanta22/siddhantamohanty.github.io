import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// [word, isAccent]
const WORDS = [
  ['I', 0], ['like', 0], ['problems', 1], ['I', 1], ['don’t', 1], ['know', 1], ['how', 1], ['to', 1], ['solve', 1], ['yet.', 1],
];

const Word = ({ children, accent, progress, range, reduced }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={reduced ? undefined : { opacity }} className={accent ? 'italic text-accent' : ''}>
      {children}{' '}
    </motion.span>
  );
};

// The line writes itself as you scroll: each word brightens in turn.
const Quote = () => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'center 0.5'] });

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden" aria-label="A line I live by">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(60% 70% at 50% 50%, rgb(var(--accent) / 0.14), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="font-display text-6xl md:text-8xl xl:text-9xl leading-[0.95] text-fg text-balance">
          {WORDS.map(([w, accent], i) => (
            <Word key={`${w}-${i}`} accent={!!accent} progress={scrollYProgress} reduced={reduced} range={[(i / WORDS.length) * 0.85, (i / WORDS.length) * 0.85 + 0.18]}>
              {w}
            </Word>
          ))}
        </blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-10 text-lg md:text-xl text-muted max-w-2xl mx-auto text-balance"
        >
          Because figuring them out is usually where the interesting work begins.
        </motion.p>
      </div>
    </section>
  );
};

export default Quote;
