import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FloatingOrbs from './FloatingOrbs';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePhotoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -12, y: px * 12 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" className="py-24 bg-white/90 dark:bg-dark-900/90 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <p>
                I'm a Computer Science graduate from Penn State who enjoys figuring out how things work, building things from scratch, and getting into problems I don't fully know how to solve yet.
              </p>
              <p>
                Some of my best experiences have come from unfamiliar territory. At HCLTech, I had a week to learn RAG from scratch, and that learning eventually helped me come up with and build Self-Heal. At Penn State, I stepped into reinforcement learning with little prior experience and worked my way toward proposing an approach for improving LLM code verification.
              </p>
              <p>
                Across internships, research, team projects, and things I've built on my own, I've learned that I enjoy taking ownership, learning quickly, and turning ideas into something meaningful with a real use case and impact.
              </p>
              <p>
                Outside of tech, I enjoy traveling, exploring new places, and following sports.
              </p>
            </div>

            {/* Stacked below xl, where the single row no longer fits without wrapping mid-item */}
            <div className="pt-2 flex flex-col xl:flex-row xl:items-center gap-x-3 gap-y-1 text-sm font-mono text-gray-500 dark:text-gray-400">
              <span>B.S. Computer Science, Penn State</span>
              <span className="hidden xl:inline text-gray-300 dark:text-dark-600">·</span>
              <span>Class of 2026</span>
              <span className="hidden xl:inline text-gray-300 dark:text-dark-600">·</span>
              <span>Dean's List ×4</span>
            </div>
          </motion.div>

          {/* Headshot Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-first lg:order-last"
            style={{ perspective: 1000 }}
          >
            <motion.div
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={resetTilt}
              animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: tilt.x || tilt.y ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="aspect-square max-w-[13rem] sm:max-w-xs lg:max-w-md mx-auto bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl p-1 shadow-2xl"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img 
                  src={`${process.env.PUBLIC_URL}/headshot-square.jpg`}
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