import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  
  const taglines = [
    "Building intelligent systems",
    "Crafting AI solutions",
    "Engineering autonomous systems",
    "Creating production-ready software"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://siddhanta22.github.io/siddhantamohanty.github.io/Resume_main.pdf';
    link.download = 'Siddhanta_Mohanty_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Subtle Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200/20 dark:bg-accent-800/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Hi, I'm <span className="gradient-text">Siddhanta Mohanty</span>
            </motion.h1>
            
            {/* Rotating Tagline */}
            <div className="h-16 md:h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTagline}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 dark:text-gray-300"
                >
                  {taglines[currentTagline]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-lg md:text-xl text-gray-600 dark:text-gray-400">
              <span>Software Engineer</span>
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span>AI & Robotics</span>
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span>Full-Stack Developer</span>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            I build intelligent systems that blend <span className="font-semibold text-gray-900 dark:text-white">generative AI</span>, <span className="font-semibold text-gray-900 dark:text-white">autonomous perception</span>, and <span className="font-semibold text-gray-900 dark:text-white">full-stack development</span>. Senior Computer Science student at Penn State University, seeking full-time engineering roles starting 2025.
          </motion.p>
          
          {/* Quick Stats for Recruiters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">3+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">7+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">2x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Dean's List</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadResume}
              className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Résumé</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;