import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, MapPin, Copy, Check } from 'lucide-react';
import FloatingOrbs from './FloatingOrbs';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const EMAIL = 'siddhantamohanty22@gmail.com';
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (older browser / insecure context): fall back to opening a mail draft
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const contactLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:siddhantamohanty22@gmail.com",
      label: "siddhantamohanty22@gmail.com"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/siddhanta-mohanty-13aa92222",
      label: "linkedin.com/in/siddhanta-mohanty-\u200b13aa92222"   // zero-width space: lets the long ID wrap cleanly
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Siddhanta22",
      label: "github.com/Siddhanta22"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50/90 via-white/90 to-gray-50/90 dark:from-dark-900/90 dark:via-dark-800/90 dark:to-dark-900/90 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            I enjoy collaborating with engineers, building real-world systems, and exploring new opportunities in AI and software engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-5 mb-12 max-w-5xl mx-auto"
          >
            {contactLinks.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.url}
                target={contact.url.startsWith('http') ? '_blank' : undefined}
                rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-6 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{contact.name}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center break-words">{contact.label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-8"
          >
            <MapPin className="w-5 h-5" />
            <span>State College, PA, USA</span>
          </motion.div>

          <motion.button
            type="button"
            onClick={copyEmail}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-primary-700 dark:hover:bg-primary-400 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-900"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'Copied!' : 'Copy email address'}</span>
            <span className="sr-only" role="status" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;