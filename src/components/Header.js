import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = ({ scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-dark-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="text-xl font-bold gradient-text">Siddhanta</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="nav-link"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className="nav-link"
            >
              Achievements
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="nav-link"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="nav-link"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-link"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 