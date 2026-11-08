import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Server, Cpu, Settings, Database } from 'lucide-react';
import {
  SiPython, SiCsharp, SiCplusplus, SiJavascript, SiTypescript, SiHtml5, SiCss3,
  SiPytorch, SiNumpy, SiPandas, SiOpenai,
  SiFlask, SiDotnet, SiFastapi, SiDjango, SiNextdotjs, SiNodedotjs, SiDocker, SiReact, SiPydantic,
  SiRos,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiGithub, SiGithubactions, SiPlaywright, SiPrisma, SiPostman, SiTableau, SiAmazonaws, SiGooglecloud, SiVisualstudiocode,
} from 'react-icons/si';
import { projects, experiences } from '../data';
import Kicker from './Kicker';

// Verified against the installed react-icons/si (Simple Icons) package — only
// technologies with a real, published brand mark get a logo tile. Anything
// without one (protocols, concepts, or libraries with no Simple Icons entry)
// is shown as a plain text pill instead of an invented logo.
const logo = (Icon, color) => ({ icon: Icon, color });
const concept = { icon: null, color: null };

export const skillCategories = [
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
export const evidenceFor = (skillName) => {
  const names = [skillName, ...(ALIASES[skillName] || [])].map(norm);
  const uses = (item) => item.technologies.some((t) => names.includes(norm(t)));
  return [
    ...experiences.filter(uses).map((e) => ({ section: 'experience', id: e.id, label: e.company, kind: 'Experience' })),
    ...projects.filter(uses).map((p) => ({ section: 'projects', id: p.id, label: p.title, kind: 'Project' })),
  ];
};

const CATEGORY_DOTS = ['#ff6a3d', '#8b9cff', '#34d399', '#f5c542', '#f472b6', '#22d3ee'];

const SkillChip = ({ skill, dot, dimmed, onHot, onOpenItem }) => {
  const evidence = evidenceFor(skill.name);
  const linked = evidence.length > 0;
  const base = 'inline-flex items-center gap-2.5 h-11 rounded-full border border-line bg-panel text-sm font-medium text-fg';
  const pad = skill.icon ? 'pl-1.5 pr-4' : 'px-4';
  const content = (
    <>
      {skill.icon ? (
        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
          <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
        </span>
      ) : (
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} aria-hidden="true" />
      )}
      {skill.name}
      {linked && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent" />}
    </>
  );

  const fade = `transition-opacity duration-300 ${dimmed ? 'opacity-20' : ''}`;

  if (!linked) return <span className={`${base} ${pad} ${fade}`}>{content}</span>;

  return (
    <span
      className={`relative group inline-block ${fade}`}
      onMouseEnter={() => onHot(skill.name)}
      onMouseLeave={() => onHot(null)}
      onFocus={() => onHot(skill.name)}
      onBlur={() => onHot(null)}
    >
      <button
        type="button"
        aria-haspopup="true"
        className={`${base} ${pad} cursor-default group-hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70`}
      >
        {content}
      </button>
      {/* pt-2 (not a margin) keeps the pointer inside the group while it moves onto the list */}
      <div className="hidden group-hover:block group-focus-within:block absolute left-0 top-full z-30 pt-2">
        <div className="min-w-[14rem] rounded-2xl border border-line bg-panel shadow-2xl p-2">
          <p className="px-2 pt-1 pb-1.5 font-mono text-[11px] uppercase tracking-wide text-muted">{skill.name} · used in</p>
          {evidence.map((item) => (
            <button
              key={`${item.section}-${item.id}`}
              type="button"
              onClick={() => onOpenItem(item.section, item.id)}
              className="w-full flex items-center justify-between gap-4 px-2 py-1.5 rounded-lg text-left text-sm text-fg hover:bg-fg/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <span>{item.label}</span>
              <span className="font-mono text-[11px] text-muted">{item.kind}</span>
            </button>
          ))}
        </div>
      </div>
    </span>
  );
};

const Skills = ({ onOpenItem }) => {
  const [filter, setFilter] = useState('all');
  const [hot, setHot] = useState(null);
  const categories = skillCategories.map((c, i) => ({ ...c, dot: CATEGORY_DOTS[i % CATEGORY_DOTS.length] }));
  // Which projects/roles each skill appears in, so hovering one can light up its neighbours
  const keys = useMemo(
    () => Object.fromEntries(skillCategories.flatMap((c) => c.skills).map((s) => [s.name, evidenceFor(s.name).map((e) => `${e.section}-${e.id}`)])),
    [],
  );
  const related = (name) => hot === null || name === hot || keys[name].some((key) => keys[hot].includes(key));
  const shown = filter === 'all' ? categories : categories.filter((c) => String(c.id) === filter);
  const tab = (active) =>
    `px-4 min-h-[44px] rounded-full text-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
      active ? 'bg-fg text-bg border-fg' : 'border-line text-muted hover:text-fg hover:border-fg/40'
    }`;

  return (
    <section id="skills" className="relative py-28 md:py-36 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <Kicker n="04" label="Skills" />
          <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.92] text-fg">
            Tools I <span className="italic text-accent">reach for</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted">
            Filter by area, or hover a skill to light up the ones I used it alongside. Chips with an <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" aria-hidden="true" /> dot link to where I used them.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter skills by area">
          <button type="button" onClick={() => setFilter('all')} aria-pressed={filter === 'all'} className={tab(filter === 'all')}>All</button>
          {categories.map((c) => (
            <button key={c.id} type="button" onClick={() => setFilter(String(c.id))} aria-pressed={filter === String(c.id)} className={tab(filter === String(c.id))}>
              {c.title}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-[15rem_1fr] gap-x-10 gap-y-4"
              >
                <div className="flex items-center gap-3 md:h-11">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: category.dot }} aria-hidden="true" />
                  <h3 className="font-display text-3xl leading-none text-fg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} dot={category.dot} dimmed={!related(skill.name)} onHot={setHot} onOpenItem={onOpenItem} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
