import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';
import FloatingOrbs from './FloatingOrbs';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      label: "linkedin.com/in/siddhanta-mohanty-13aa92222"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            I enjoy collaborating with engineers, building real-world systems, and exploring new opportunities in AI, software engineering, and autonomous systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto"
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
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center">{contact.label}</span>
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

          <motion.a
            href="mailto:siddhantamohanty22@gmail.com"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-primary-700 dark:hover:bg-primary-400 transition-all duration-300 cursor-pointer"
          >
            <Send className="w-5 h-5" />
            <span>Say hello</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;