import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Backend engineering, AI systems, and applied research.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <p>
                I'm a Computer Science graduate from Penn State, building backend systems, AI/ML tooling, and autonomous perception software. I like taking ideas from concept to implementation — designing APIs, shipping production services, or testing a research idea against real code and real sensors.
              </p>
              <p>
                What keeps me engaged is the failure mode, not the demo: why a system breaks under load, why a model's output can't be trusted blindly, why a detector drops a frame at the wrong moment. That's shown up in agentic AI tooling at HCLTech, reinforcement-learning research at Penn State, and perception work with the Advanced Vehicle Team.
              </p>
              <p>
                Outside of that, I'm usually reading about new AI systems, tinkering with a side project, or planning the next trip.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-gray-500 dark:text-gray-400">
              <span>B.S. Computer Science, Penn State</span>
              <span className="text-gray-300 dark:text-dark-600">·</span>
              <span>Class of 2026</span>
              <span className="text-gray-300 dark:text-dark-600">·</span>
              <span>Dean's List ×4</span>
            </div>
          </motion.div>

          {/* Headshot Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square max-w-md mx-auto bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl p-1 shadow-2xl"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img 
                  src={`${process.env.PUBLIC_URL}/headshot.jpg`}
                  alt="Siddhanta Mohanty" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;