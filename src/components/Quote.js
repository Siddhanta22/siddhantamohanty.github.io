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
                className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed"
              >
                Whether it's a system that heals itself, a pipeline serving real users, or software reading the road — the version I ship is the one that keeps working after I stop watching it.
              </motion.blockquote>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-lg text-gray-600 dark:text-gray-400"
          >
            A rule I hold myself to on every project.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
