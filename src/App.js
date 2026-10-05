import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Quote from './components/Quote';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NetworkBackground from './components/NetworkBackground';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

// Read the saved preference synchronously so the first render already matches it
// (public/index.html applies the same class before React loads, so there is no flash).
const getInitialDarkMode = () => {
  try {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === null ? true : savedMode === 'true';
  } catch {
    return true;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('darkMode', darkMode);
    } catch {
      /* storage unavailable (private mode); the toggle still works for this visit */
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 relative">
      <ScrollProgress />
      <NetworkBackground />

      {/* Main Content */}
      <Header scrollToSection={scrollToSection} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Quote />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
    </MotionConfig>
  );
}

export default App;
