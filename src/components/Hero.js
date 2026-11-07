import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowDown, Sparkles } from 'lucide-react';
import FloatingOrbs from './FloatingOrbs';
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

const Hero = ({ onOpenItem }) => {
  const [currentTagline, setCurrentTagline] = useState(0);

  const taglines = [
    "Support RAG that halved resolution time",
    "Agents that replay tasks 32x faster",
    "Incident response that explains itself",
    "AI newsletters from 50+ sources"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center bg-gradient-to-br from-gray-50/90 via-white/90 to-gray-50/90 dark:from-dark-900/90 dark:via-dark-800/90 dark:to-dark-900/90 pt-28 pb-24 md:pt-36 md:pb-28">
      <FloatingOrbs />

      {/* Fades the hero into the next section so there is no hard edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white/90 dark:to-dark-900/90 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7 text-center lg:text-left"
          >
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                <span className="gradient-text">Siddhanta Mohanty</span>
              </motion.h1>

              {/* Rotating Tagline */}
              <div className="min-h-[4.5rem] md:min-h-[3.5rem] lg:min-h-[4.5rem] xl:min-h-[3.5rem] flex items-center justify-center lg:justify-start px-2 lg:px-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTagline}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-semibold text-gray-700 dark:text-gray-300 text-center lg:text-left leading-snug text-balance"
                  >
                    {taglines[currentTagline]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 sm:gap-x-3 text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
                <span>Software Engineer</span>
                <Sparkles className="hidden sm:block w-4 h-4 text-primary-500" />
                <span>Applied AI</span>
                <Sparkles className="hidden sm:block w-4 h-4 text-accent-500" />
                <span>Backend Systems</span>
              </div>

            </motion.div>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              I build backend and applied-AI systems that hold up in production. At HCLTech that meant a <span className="font-semibold text-gray-900 dark:text-white">RAG support system that halved resolution time</span>; at Penn State, research on <span className="font-semibold text-gray-900 dark:text-white">self-correcting LLM code verification</span>; and in personal projects like <span className="whitespace-nowrap">Self-Heal</span> and Rewind, I take the whole thing <span className="font-semibold text-gray-900 dark:text-white">end to end</span>, from the API to the model to the interface.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center pt-2 sm:pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToProjects}
                className="px-8 py-3.5 sm:py-4 border-2 border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>View Projects</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={viewResume}
                className="px-8 py-3.5 sm:py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>View Résumé</span>
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="hidden lg:block">
            <TerminalCard onOpenItem={onOpenItem} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
