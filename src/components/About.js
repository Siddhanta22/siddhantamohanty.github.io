import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Briefcase, GraduationCap, Layers } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Layers,
      label: "Projects Shipped",
      value: "9+",
    },
    {
      icon: Briefcase,
      label: "Internships & Research Roles",
      value: "4",
    },
    {
      icon: Trophy,
      label: "Dean's List",
      value: "4x",
    },
    {
      icon: GraduationCap,
      label: "B.S. Computer Science, Penn State",
      value: "Class of 2026",
    }
  ];

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

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
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

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-5 text-center border border-gray-200 dark:border-dark-700 shadow-md hover:shadow-lg transition-all duration-300 h-full"
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 mx-auto mb-4">
                <stat.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2} />
              </div>
              <div className="text-2xl lg:text-xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm lg:text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;