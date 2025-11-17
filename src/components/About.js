import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Briefcase } from 'lucide-react';

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
            I build AI systems that solve real problems and learn something new with every project.
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
                Over the past year, I've gone from theory to practice. During my 3-month internship at HCL, I built production AI systems from the ground up: a self-healing backend that cut support resolution time by 50%, agentic workflows using Model Context Protocol, and RAG pipelines for enterprise documentation. I learned how to ship AI that works in real environments with real users, not just in controlled demos.
              </p>
              <p>
                Beyond HCL, I've continued pushing my boundaries. I went from computer vision coursework to debugging real-time perception pipelines for autonomous vehicles. From experimenting with LLMs to researching how reinforcement learning can improve code generation. Each project teaches me something new about taking AI concepts and making them reliable at scale.
              </p>
              <p>
                AI moves fast, and I move with it. I'm most energized when I'm tackling problems I haven't fully figured out yet, whether that's optimizing vector retrieval, architecting agentic workflows, or making models work reliably outside controlled environments. I focus on the practical side: taking emerging AI techniques and turning them into systems that actually ship.
              </p>
              <p>
                My technical foundation spans RAG architectures, LLMs, autonomous perception, and full-stack development. But what I'm really good at is figuring things out quickly and building solutions that work, even when the docs are sparse and the Stack Overflow threads are empty.
              </p>
              <p>
                Graduating May 2026. Looking for teams where shipping AI products means constantly learning new approaches. If that sounds like your team, let's connect.
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
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