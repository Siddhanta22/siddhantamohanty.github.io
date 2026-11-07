import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { paletteShortcut } from '../utils/platform';
import { viewResume } from '../utils/resume';
import { projects, experiences } from '../data';
import { skillCategories } from './Skills';

const STACK_GROUPS = [
  { label: 'backend/', items: 'Python, FastAPI, Flask, Node.js' },
  { label: 'ai-ml/', items: 'LangChain, RAG, PyTorch' },
  { label: 'frontend/', items: 'React, TypeScript' },
  { label: 'data/', items: 'PostgreSQL, MySQL, MongoDB' },
];

const BOOT_LINES = [
  { prompt: 'whoami', output: 'Siddhanta Mohanty, software engineer' },
  { prompt: 'cat focus.txt', output: 'Backend systems, applied AI/ML,\nand developer tools' },
  { prompt: 'ls stack/', groups: STACK_GROUPS },
  { prompt: 'status', output: 'Open to new opportunities' },
];

const SKILL_LABELS = ['languages/', 'ai-ml/', 'backend/', 'vision/', 'databases/', 'tooling/'];

const COMMANDS = {
  help: () => ({ output: "Commands: whoami, about, stack, projects, experience, skills, contact, resume, clear. Or click one below." }),
  whoami: () => ({ output: 'Siddhanta Mohanty — software engineer building backend systems and applied AI/ML tools.' }),
  about: () => ({ output: "CS grad from Penn State ('26). I like taking ideas from concept to production — APIs, services, AI tooling, research." }),
  stack: () => ({ groups: STACK_GROUPS }),
  projects: () => ({
    output: `${projects.length} projects. Click one to open it:`,
    items: projects.map((p) => ({ label: p.title, detail: p.teaser, section: 'projects', id: p.id })),
  }),
  experience: () => ({
    output: 'Click a role to open it:',
    items: experiences.map((e) => ({ label: e.company, detail: e.role, section: 'experience', id: e.id })),
  }),
  skills: () => ({
    groups: skillCategories.map((c, i) => ({ label: SKILL_LABELS[i] || `${c.title}/`, items: c.skills.map((s) => s.name).join(', ') })),
  }),
  contact: () => ({
    links: [
      { label: 'siddhantamohanty22@gmail.com', href: 'mailto:siddhantamohanty22@gmail.com' },
      { label: 'linkedin.com/in/siddhanta-mohanty-13aa92222', href: 'https://linkedin.com/in/siddhanta-mohanty-13aa92222' },
      { label: 'github.com/Siddhanta22', href: 'https://github.com/Siddhanta22' },
    ],
  }),
  resume: () => {
    viewResume();
    return { output: 'Opening résumé in a new tab...' };
  },
  sudo: () => ({ output: 'Nice try. Permission denied.' }),
};

// Shown as clickable chips under the prompt so visitors don't have to guess what to type.
const CHIPS = ['projects', 'experience', 'stack', 'skills', 'contact', 'resume', 'help'];

const TerminalBody = ({ block, onOpenItem }) => (
  <>
    {block.output && <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{block.output}</div>}
    {block.groups && (
      <div className="mt-1">
        {block.groups.map((group) => (
          <div key={group.label} className="flex gap-3">
            <span className="text-accent-600 dark:text-accent-400 shrink-0 w-24">{group.label}</span>
            <span className="text-gray-700 dark:text-gray-300">{group.items}</span>
          </div>
        ))}
      </div>
    )}
    {block.items && (
      <ul className="mt-1.5 space-y-0.5" style={{ '--label-w': `${Math.max(...block.items.map((i) => i.label.length))}ch` }}>
        {block.items.map((item) => (
          <li key={`${item.section}-${item.id}`}>
            <button
              type="button"
              onClick={() => onOpenItem(item.section, item.id)}
              className="group w-full flex items-baseline gap-3 text-left rounded px-2 py-1 -mx-2 hover:bg-primary-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
            >
              <span className="text-primary-600 dark:text-primary-400 shrink-0 w-[var(--label-w)] group-hover:underline">{item.label}</span>
              <span className="truncate text-gray-500 dark:text-gray-400">{item.detail}</span>
            </button>
          </li>
        ))}
      </ul>
    )}
    {block.links && (
      <ul className="mt-1.5 space-y-0.5">
        {block.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    )}
  </>
);

const TerminalCard = ({ onOpenItem }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 900 + BOOT_LINES.length * 350 + 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Follow new output only after the visitor runs a command, so the
    // boot sequence never scrolls its own first line out of view.
    if (lines.length > 0 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    if (cmd.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    const handler = COMMANDS[cmd.toLowerCase()];
    const result = handler ? handler() : { output: `command not found: ${cmd}. Type 'help' for a list of commands.` };
    setLines((prev) => [...prev, { prompt: cmd, ...result }]);
  };

  const submit = (cmd) => {
    runCommand(cmd);
    if (cmd.trim()) setCmdHistory((prev) => [...prev, cmd.trim()]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto rounded-xl border border-gray-200 dark:border-dark-700 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm shadow-2xl overflow-hidden font-mono text-[15px] leading-relaxed"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900/60">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-dark-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-dark-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-dark-600" />
        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">siddhanta@portfolio — try it, it's interactive</span>
      </div>
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="p-6 space-y-4 h-[28rem] overflow-y-auto cursor-text"
      >
        {BOOT_LINES.map((block, index) => (
          <motion.div
            key={block.prompt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + index * 0.35 }}
          >
            <div className="text-primary-600 dark:text-primary-400">
              <span className="text-gray-400 dark:text-gray-500">$</span> {block.prompt}
            </div>
            <TerminalBody block={block} onOpenItem={onOpenItem} />
          </motion.div>
        ))}

        {lines.map((block, index) => (
          <div key={index}>
            <div className="text-primary-600 dark:text-primary-400">
              <span className="text-gray-400 dark:text-gray-500">$</span> {block.prompt}
            </div>
            <TerminalBody block={block} onOpenItem={onOpenItem} />
          </div>
        ))}

        {booted ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 dark:text-gray-500">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input — try 'help'"
              placeholder="try 'help'"
              className="flex-1 min-w-0 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 caret-primary-500"
            />
          </div>
        ) : (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-primary-500 align-middle"
          />
        )}
      </div>

      {booted && (
        <div className="flex flex-wrap items-center gap-1.5 px-5 py-3.5 border-t border-gray-200 dark:border-dark-700 bg-gray-50/70 dark:bg-dark-900/40">
          <span className="text-xs text-gray-400 dark:text-gray-500 mr-0.5">run:</span>
          {CHIPS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => { submit(cmd); inputRef.current?.focus(); }}
              className="px-2 py-1 rounded-md border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-xs text-primary-600 dark:text-primary-400 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Siddhanta22', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/siddhanta-mohanty-13aa92222', icon: Linkedin },
  { label: 'Email', href: 'mailto:siddhantamohanty22@gmail.com', icon: Mail },
];

const FACTS = [
  { label: 'now', value: 'building Promise Path with Mentor A Promise' },
  { label: 'looking for', value: 'backend and applied-AI engineering roles' },
];

const Keycaps = () => (
  <span className="inline-flex items-center gap-1 align-middle">
    {paletteShortcut().replace('⌘K', '⌘ K').split(' ').map((key) => (
      <kbd key={key} className="min-w-[1.6rem] px-1.5 py-0.5 text-center rounded-md border border-gray-300 dark:border-dark-500 border-b-2 bg-white dark:bg-dark-800 font-mono text-xs text-gray-700 dark:text-gray-200">
        {key}
      </kbd>
    ))}
  </span>
);

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const Hero = ({ onOpenItem }) => {
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center bg-gradient-to-br from-gray-50/90 via-white/90 to-gray-50/90 dark:from-dark-900/90 dark:via-dark-800/90 dark:to-dark-900/90 pt-28 pb-24 md:pt-36 md:pb-28">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.p {...rise(0)} className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-dark-600 bg-white/70 dark:bg-dark-800/70 px-3.5 py-1.5 font-mono text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new roles · State College, PA
            </motion.p>

            <motion.h1 {...rise(0.1)} className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Siddhanta Mohanty
            </motion.h1>

            <motion.p {...rise(0.18)} className="mt-4 font-mono text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Software Engineer <span className="text-primary-500">/</span> Applied AI <span className="text-primary-500">/</span> Backend Systems
            </motion.p>

            <motion.p {...rise(0.26)} className="mt-8 text-2xl md:text-3xl font-semibold leading-snug text-gray-800 dark:text-gray-100 text-balance">
              I like figuring out how things work, then building them.
            </motion.p>

            <motion.p {...rise(0.34)} className="mt-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Penn State computer science grad building backend and applied-AI systems, from the API to the model to the interface.
            </motion.p>

            <motion.dl {...rise(0.42)} className="mt-6 space-y-1.5 font-mono text-sm text-left max-w-xl mx-auto lg:mx-0">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-primary-600 dark:text-primary-400">{fact.label}</dt>
                  <dd className="text-gray-700 dark:text-gray-300">{fact.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div {...rise(0.5)} className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                View Projects
                <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={viewResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:-translate-y-0.5 transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                View Résumé
              </button>
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2.5 rounded-lg border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 dark:hover:border-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>

            <motion.p {...rise(0.58)} className="hidden md:block mt-6 text-sm text-gray-500 dark:text-gray-400">
              Press <Keycaps /> to jump anywhere on the site.
            </motion.p>
          </div>

          <div className="hidden lg:block">
            <TerminalCard onOpenItem={onOpenItem} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
