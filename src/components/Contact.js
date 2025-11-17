import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Code } from 'lucide-react';

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
    <section id="contact" className="py-24 bg-white dark:bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Contact
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            I enjoy collaborating with engineers, building real-world systems, and exploring new opportunities in AI, software engineering, and autonomous systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 mb-12"
          >
            {contactLinks.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-center space-x-3 text-gray-700 dark:text-gray-300"
              >
                <contact.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {contact.url !== '#' ? (
                  <a
                    href={contact.url}
                    target={contact.url.startsWith('http') ? '_blank' : undefined}
                    rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {contact.label}
                  </a>
                ) : (
                  <span>{contact.label}</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Let's build something impactful together.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;