import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote as QuoteIcon } from 'lucide-react';
import FloatingOrbs from './FloatingOrbs';

const Quote = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white/90 dark:bg-dark-900/90 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-dark-800 rounded-3xl shadow-lg border border-gray-200 dark:border-dark-700 p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-6"
              >
                <QuoteIcon className="w-12 h-12 text-primary-500 dark:text-primary-400 mx-auto" />
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight text-balance"
              >
                I like <span className="gradient-text">problems I don’t know how to solve yet.</span>
              </motion.blockquote>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance"
          >
            Because figuring them out is usually where the interesting work begins.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
