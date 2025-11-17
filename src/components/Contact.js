import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Code, MapPin, Send } from 'lucide-react';

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
    },
    {
      name: "GitLab",
      icon: Code,
      url: "#",
      label: "GitLab (coming soon)"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-200/10 dark:bg-primary-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-200/10 dark:bg-accent-800/10 rounded-full blur-3xl"></div>
      </div>

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
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {contactLinks.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.url !== '#' ? contact.url : undefined}
                target={contact.url.startsWith('http') ? '_blank' : undefined}
                rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-6 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300 ${
                  contact.url === '#' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                }`}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            <span>Let's build something impactful together</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;