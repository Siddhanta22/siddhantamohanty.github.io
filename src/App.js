import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Quote from './components/Quote';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import MouseParticles from './components/MouseParticles';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved dark mode preference or default to dark mode
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      // Default to dark mode instead of system preference
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
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
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 relative">
      <ScrollProgress />
      <ParticleBackground />
      <MouseParticles />

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
  );
}

export default App;
