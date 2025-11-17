import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Briefcase, Calendar } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Award,
      label: "Dean's List",
      value: "2 Semesters",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      icon: Briefcase,
      label: "GenAI Intern",
      value: "HCL Technologies",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: GraduationCap,
      label: "AV Team Member",
      value: "Perception Systems",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Calendar,
      label: "Years Experience",
      value: "3+ Years",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
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
              <p className="text-xl font-medium text-gray-900 dark:text-white">
                From India to Pennsylvania, building the future of intelligent systems.
              </p>
              <p>
                I'm a senior Computer Science major at Penn State University, passionate about AI, robotics, and full-stack development. My journey from India to the U.S. taught me that real growth happens when you step outside your comfort zone—a principle I apply to every project I build.
              </p>
              <p>
                I specialize in creating systems that solve real-world problems. Whether it's developing perception algorithms for autonomous vehicles, architecting agentic RAG pipelines for enterprise workflows, or building production-ready web applications, I bridge the gap between intelligence, data, and engineering.
              </p>
              <p>
                When I'm not coding, I'm exploring new technologies, tinkering with side projects, and staying curious about how things work under the hood. I believe in building with purpose, learning continuously, and pushing the boundaries of what's possible.
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${stat.bgColor} rounded-xl p-6 text-center border border-gray-200 dark:border-dark-700 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${stat.color} mx-auto mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
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