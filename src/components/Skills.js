import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code, Brain, Server, Cpu, Settings, Database,
  Sparkles, Boxes, Layers, Network, Bot, Wrench, MessageSquare,
} from 'lucide-react';
import {
  SiPython, SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss3,
  SiPytorch, SiNumpy, SiPandas, SiOpenai,
  SiFlask, SiFastapi, SiDjango, SiNextdotjs, SiNodedotjs, SiSqlalchemy, SiDocker, SiReact, SiPydantic,
  SiRos,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiGithub, SiGithubactions, SiPlaywright, SiPrisma, SiPostman, SiTableau, SiAmazonaws, SiGooglecloud, SiVisualstudiocode,
} from 'react-icons/si';
import SpotlightCard from './SpotlightCard';
import FloatingOrbs from './FloatingOrbs';

// Verified against the installed react-icons/si (Simple Icons) package — only
// technologies with a real, published brand mark get a logo. Anything without
// one (protocols, concepts, or libraries with no Simple Icons entry) falls
// back to a plain, unbranded glyph instead of an invented logo.
const logo = (Icon, color) => ({ icon: Icon, color });
const fallback = (Icon) => ({ icon: Icon, color: null });

const skillCategories = [
  {
    id: 1,
    title: "Languages",
    icon: Code,
    skills: [
      { name: "Python", ...logo(SiPython, "#3776AB") },
      { name: "C++", ...logo(SiCplusplus, "#00599C") },
      { name: "JavaScript", ...logo(SiJavascript, "#F7DF1E") },
      { name: "TypeScript", ...logo(SiTypescript, "#3178C6") },
      { name: "SQL", ...fallback(Database) },
      { name: "HTML5", ...logo(SiHtml5, "#E34C26") },
      { name: "CSS3", ...logo(SiCss3, "#1572B6") },
    ],
  },
  {
    id: 2,
    title: "Applied AI / ML",
    icon: Brain,
    skills: [
      { name: "RAG", ...fallback(Network) },
      { name: "LangChain", ...fallback(Boxes) },
      { name: "FAISS", ...fallback(Layers) },
      { name: "Pinecone", ...fallback(Database) },
      { name: "LLMs", ...fallback(Sparkles) },
      { name: "AI Agents", ...fallback(Bot) },
      { name: "Tool Calling", ...fallback(Wrench) },
      { name: "MCP", ...fallback(Network) },
      { name: "Claude API", ...fallback(MessageSquare) },
      { name: "OpenAI API", ...logo(SiOpenai, "#412991") },
      { name: "PyTorch", ...logo(SiPytorch, "#EE4C2C") },
      { name: "NumPy", ...logo(SiNumpy, "#013243") },
      { name: "pandas", ...logo(SiPandas, "#150458") },
    ],
  },
  {
    id: 3,
    title: "Backend & Systems",
    icon: Server,
    skills: [
      { name: "Flask", ...logo(SiFlask, "#000000") },
      { name: "FastAPI", ...logo(SiFastapi, "#009688") },
      { name: "Django", ...logo(SiDjango, "#092E20") },
      { name: "Next.js", ...logo(SiNextdotjs, "#000000") },
      { name: "Node.js", ...logo(SiNodedotjs, "#339933") },
      { name: "REST APIs", ...fallback(Network) },
      { name: "SQLAlchemy", ...logo(SiSqlalchemy, "#371C1C") },
      { name: "Pydantic", ...logo(SiPydantic, "#E92063") },
      { name: "Docker", ...logo(SiDocker, "#2496ED") },
      { name: "React", ...logo(SiReact, "#61DAFB") },
    ],
  },
  {
    id: 4,
    title: "Perception & Robotics",
    icon: Cpu,
    skills: [
      { name: "ROS2", ...logo(SiRos, "#22314E") },
      { name: "Roboflow", ...fallback(Boxes) },
      { name: "Computer Vision", ...fallback(Cpu) },
    ],
  },
  {
    id: 5,
    title: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", ...logo(SiPostgresql, "#336791") },
      { name: "MySQL", ...logo(SiMysql, "#00758F") },
      { name: "MongoDB", ...logo(SiMongodb, "#13AA52") },
    ],
  },
  {
    id: 6,
    title: "Tooling",
    icon: Settings,
    skills: [
      { name: "Git", ...logo(SiGit, "#F1502F") },
      { name: "GitHub", ...logo(SiGithub, "#181717") },
      { name: "GitHub Actions", ...logo(SiGithubactions, "#2088FF") },
      { name: "Playwright", ...logo(SiPlaywright, "#2EAD33") },
      { name: "Prisma", ...logo(SiPrisma, "#0C344B") },
      { name: "Postman", ...logo(SiPostman, "#FF6C37") },
      { name: "Tableau", ...logo(SiTableau, "#E97627") },
      { name: "AWS", ...logo(SiAmazonaws, "#FF9900") },
      { name: "GCP", ...logo(SiGooglecloud, "#4285F4") },
      { name: "VS Code", ...logo(SiVisualstudiocode, "#007ACC") },
    ],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-24 bg-white/90 dark:bg-dark-900/90 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={categoryVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <SpotlightCard className="group relative h-full bg-white dark:bg-dark-700 rounded-2xl border border-gray-200 dark:border-dark-600 p-6 shadow-md hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <category.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.04 * index }}
                      whileHover={{ y: -2 }}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0">
                        {skill.color ? (
                          <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                        ) : (
                          <skill.icon className="w-4 h-4 text-gray-400" strokeWidth={2} />
                        )}
                      </div>
                      <span className="text-xs leading-tight font-medium text-gray-600 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
