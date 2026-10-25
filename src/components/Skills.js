import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Server, Cpu, Settings, Database } from 'lucide-react';
import {
  SiPython, SiCsharp, SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss3,
  SiPytorch, SiNumpy, SiPandas, SiOpenai,
  SiFlask, SiDotnet, SiFastapi, SiDjango, SiNextdotjs, SiNodedotjs, SiDocker, SiReact, SiPydantic,
  SiRos,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiGithub, SiGithubactions, SiPlaywright, SiPrisma, SiPostman, SiTableau, SiAmazonaws, SiGooglecloud, SiVisualstudiocode,
} from 'react-icons/si';
import SpotlightCard from './SpotlightCard';
import FloatingOrbs from './FloatingOrbs';
import { projects, experiences } from '../data';

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
      { name: "C#", ...logo(SiCsharp, "#512BD4") },
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
      { name: ".NET", ...logo(SiDotnet, "#512BD4") },
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

// Chip label -> names it can appear under in the Projects/Experience tech lists.
const ALIASES = { 'OpenAI API': ['OpenAI'] };
const norm = (name) => name.toLowerCase();

// Where each skill was actually used, derived from the Projects and Experience data
// so there is no second list to keep in sync. Experience comes first: work counts for more.
const evidenceFor = (skillName) => {
  const names = [skillName, ...(ALIASES[skillName] || [])].map(norm);
  const uses = (item) => item.technologies.some((t) => names.includes(norm(t)));
  return [
    ...experiences.filter(uses).map((e) => ({ section: 'experience', id: e.id, label: e.company, kind: 'Experience' })),
    ...projects.filter(uses).map((p) => ({ section: 'projects', id: p.id, label: p.title, kind: 'Project' })),
  ];
};

const SkillChip = ({ skill, onOpenItem }) => {
  const evidence = evidenceFor(skill.name);
  const linked = evidence.length > 0;
  const base = 'inline-flex items-center gap-2 h-9 rounded-lg border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-800 text-sm font-medium text-gray-700 dark:text-gray-200';
  const content = (
    <>
      {skill.icon && (
        <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0">
          <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
        </span>
      )}
      {skill.name}
      {linked && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
    </>
  );
  const pad = skill.icon ? 'pl-1.5 pr-3' : 'px-3';

  if (!linked) return <li className={`${base} ${pad}`}>{content}</li>;

  return (
    <li className="relative group">
      <button
        type="button"
        aria-haspopup="true"
        className={`${base} ${pad} cursor-default group-hover:border-primary-400 dark:group-hover:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 transition-colors`}
      >
        {content}
      </button>
      {/* pt-2 (not a margin) keeps the pointer inside the group while it moves onto the list */}
      <div className="hidden group-hover:block group-focus-within:block absolute left-0 top-full z-30 pt-2">
        <div className="min-w-[14rem] rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-800 shadow-xl p-2">
          <p className="px-2 pt-1 pb-1.5 text-[11px] font-mono uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {skill.name} · used in
          </p>
          {evidence.map((item) => (
            <button
              key={`${item.section}-${item.id}`}
              type="button"
              onClick={() => onOpenItem(item.section, item.id)}
              className="w-full flex items-center justify-between gap-4 px-2 py-1.5 rounded-md text-left text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
            >
              <span>{item.label}</span>
              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">{item.kind}</span>
            </button>
          ))}
        </div>
      </div>
    </li>
  );
};

const Skills = ({ onOpenItem }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };


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

        <SpotlightCard className="rounded-2xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 shadow-md">
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
                    <SkillChip key={skill.name} skill={skill} onOpenItem={onOpenItem} />
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
