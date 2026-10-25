import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Server, Cpu, Settings, Database } from 'lucide-react';
import {
  SiPython, SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss3,
  SiPytorch, SiNumpy, SiPandas, SiOpenai,
  SiFlask, SiFastapi, SiDjango, SiNextdotjs, SiNodedotjs, SiDocker, SiReact, SiPydantic,
  SiRos,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiGithub, SiGithubactions, SiPlaywright, SiPrisma, SiPostman, SiTableau, SiAmazonaws, SiGooglecloud, SiVisualstudiocode,
} from 'react-icons/si';
import SpotlightCard from './SpotlightCard';
import FloatingOrbs from './FloatingOrbs';

// Verified against the installed react-icons/si (Simple Icons) package — only
// technologies with a real, published brand mark get a logo tile. Anything
// without one (protocols, concepts, or libraries with no Simple Icons entry)
// is shown as a plain text pill instead of an invented logo.
const logo = (Icon, color) => ({ icon: Icon, color });
const concept = { icon: null, color: null };

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
      { name: "SQL", ...concept },
      { name: "HTML5", ...logo(SiHtml5, "#E34C26") },
      { name: "CSS3", ...logo(SiCss3, "#1572B6") },
    ],
  },
  {
    id: 2,
    title: "Applied AI / ML",
    icon: Brain,
    skills: [
      { name: "RAG", ...concept },
      { name: "LangChain", ...concept },
      { name: "FAISS", ...concept },
      { name: "Pinecone", ...concept },
      { name: "LLMs", ...concept },
      { name: "AI Agents", ...concept },
      { name: "Tool Calling", ...concept },
      { name: "MCP", ...concept },
      { name: "Claude API", ...concept },
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
      { name: "REST APIs", ...concept },
      { name: "SQLAlchemy", ...concept },
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
      { name: "Roboflow", ...concept },
      { name: "Computer Vision", ...concept },
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

  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const chipClass = 'inline-flex items-center gap-2 h-9 rounded-lg border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-800 text-sm font-medium text-gray-700 dark:text-gray-200';

  return (
    <section id="skills" className="py-24 bg-white/90 dark:bg-dark-900/90 relative overflow-hidden">
      <FloatingOrbs variant="subtle" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        <SpotlightCard className="rounded-2xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 shadow-md overflow-hidden">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.08 }}
            className="divide-y divide-gray-100 dark:divide-dark-600"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={rowVariants}
                className="grid md:grid-cols-[13rem_1fr] gap-x-8 gap-y-3 px-6 py-5 md:px-8"
              >
                <div className="flex items-center gap-3 md:h-9">
                  <category.icon className="w-5 h-5 shrink-0 text-primary-600 dark:text-primary-400" strokeWidth={2} />
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{category.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className={`${chipClass} ${skill.icon ? 'pl-1.5 pr-3' : 'px-3'}`}>
                      {skill.icon && (
                        <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0">
                          <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
                        </span>
                      )}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Skills;
