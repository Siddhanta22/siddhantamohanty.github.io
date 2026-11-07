import React from 'react';
import { motion } from 'framer-motion';

const Quote = () => (
  <section className="relative py-32 md:py-48 overflow-hidden" aria-label="A line I live by">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(60% 70% at 50% 50%, rgb(var(--accent) / 0.14), transparent 70%)' }}
      aria-hidden="true"
    />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.blockquote
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9 }}
        className="font-display text-6xl md:text-8xl xl:text-9xl leading-[0.95] text-fg text-balance"
      >
        I like <span className="italic text-accent">problems I don’t know how to solve yet.</span>
      </motion.blockquote>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-10 text-lg md:text-xl text-muted max-w-2xl mx-auto text-balance"
      >
        Because figuring them out is usually where the interesting work begins.
      </motion.p>
    </div>
  </section>
);

export default Quote;
