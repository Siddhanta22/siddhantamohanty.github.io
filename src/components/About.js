import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = {
    institution: "Pennsylvania State University - University Park",
    degree: "Bachelor's in Computer Science",
    minor: "Mathematics",
    dates: "August 2022 - May 2026",
    location: "State College, PA, USA",
    relevantCourses: [
      "CMPSC 465: Data Structures and Algorithms",
      "CMPSC 464: Introduction to the Theory of Computation", 
      "CMPEN 331: Computer Organization And Design",
      "CMPSC 442: Artificial Intelligence",
      "CMPSC 473: Operating Systems Design & Construction"
    ]
  };

  const honors = [
    "Dean's List Fall 2023",
    "Dean's List Spring 2024"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From curious student to AI engineer—building the future, one intelligent system at a time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Hey there! 👋
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I'm Siddhanta, a Computer Science senior at Penn State who's absolutely <span className="font-semibold text-primary-600 dark:text-primary-400">obsessed</span> 
                with turning complex problems into elegant solutions. Think of me as that friend who gets genuinely excited about 
                debugging at 2 AM and considers a successful deployment the best kind of dopamine hit! 🚀
              </p>
              
              <p>
                My superpower? Making AI systems that actually <span className="font-semibold text-accent-600 dark:text-accent-400">work in the real world</span>. 
                I've built everything from self-healing backends that fix themselves (because who has time for manual debugging?) 
                to AI camera assistants that help photographers nail that perfect shot. Oh, and I created Swipeflix—because 
                finding your next movie should be as fun as swiping right! 🎬
              </p>
              
              <p>
                What gets me out of bed every morning? The thrill of <span className="font-semibold text-primary-600 dark:text-primary-400">solving puzzles</span> 
                that matter. Whether I'm teaching cars to see the world through computer vision or building systems that 
                learn from their mistakes, I'm always chasing that "aha!" moment when everything clicks into place.
              </p>
              
              <p>
                When I'm not deep in code, you'll find me geeking out over the latest AI research papers, 
                contributing to open-source projects, or probably explaining to my friends why 
                <span className="font-semibold text-accent-600 dark:text-accent-400"> "it's not a bug, it's a feature"</span> 
                is actually a valid philosophy. I believe the best technology feels like magic—complex under the hood, 
                but beautifully simple for the people who use it.
              </p>
              
              <p>
                Ready to build something amazing together? Let's turn your wildest tech dreams into reality! ✨
              </p>
              

            </div>
          </motion.div>

          {/* Education & Honors */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Education Card */}
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Penn State University</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                  {education.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                  {education.dates}
                </div>
                <div className="pt-2">
                  <p className="font-medium text-gray-900 dark:text-white">{education.degree}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Minor in {education.minor}</p>
                </div>
              </div>
            </div>

            {/* Honors Card */}
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Honors & Awards</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Academic Excellence</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {honors.map((honor, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                    {honor}
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Coursework */}
            <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-dark-600">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Relevant Coursework</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {education.relevantCourses.map((course, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-dark-600 rounded-lg p-3">
                    {course}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 