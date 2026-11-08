import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { viewResume } from '../utils/resume';
import { projects, experiences } from '../data';
import { skillCategories } from './Skills';
import Kicker from './Kicker';

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
    {block.output && <div className="text-fg/85 whitespace-pre-line">{block.output}</div>}
    {block.groups && (
      <div className="mt-1">
        {block.groups.map((group) => (
          <div key={group.label} className="flex gap-3">
            <span className="text-accent2 shrink-0 w-24">{group.label}</span>
            <span className="text-fg/85">{group.items}</span>
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
              className="group w-full flex items-baseline gap-3 text-left rounded px-2 py-1 -mx-2 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <span className="text-accent shrink-0 w-[var(--label-w)] group-hover:underline">{item.label}</span>
              <span className="truncate text-muted">{item.detail}</span>
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
              className="text-accent hover:underline"
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
      className="w-full rounded-2xl border border-line bg-panel shadow-2xl overflow-hidden font-mono text-[15px] leading-relaxed"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-fg/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-fg/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-fg/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-fg/20" />
        <span className="ml-2 text-xs text-muted">siddhanta@portfolio — try it, it's interactive</span>
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
            <div className="text-accent">
              <span className="text-muted">$</span> {block.prompt}
            </div>
            <TerminalBody block={block} onOpenItem={onOpenItem} />
          </motion.div>
        ))}

        {lines.map((block, index) => (
          <div key={index}>
            <div className="text-accent">
              <span className="text-muted">$</span> {block.prompt}
            </div>
            <TerminalBody block={block} onOpenItem={onOpenItem} />
          </div>
        ))}

        {booted ? (
          <div className="flex items-center gap-2">
            <span className="text-muted">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input — try 'help'"
              placeholder="try 'help'"
              className="flex-1 min-w-0 bg-transparent outline-none text-fg placeholder:text-muted caret-accent"
            />
          </div>
        ) : (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-accent align-middle"
          />
        )}
      </div>

      {booted && (
        <div className="flex flex-wrap items-center gap-1.5 px-5 py-3.5 border-t border-line bg-fg/[0.03]">
          <span className="text-xs text-muted mr-0.5">run:</span>
          {CHIPS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => { submit(cmd); inputRef.current?.focus(); }}
              className="px-3 min-h-[40px] rounded-md border border-line bg-bg text-xs text-accent hover:border-accent hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};


const Terminal = ({ onOpenItem }) => (
  <section id="terminal" className="relative py-28 md:py-36 border-t border-line">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="mb-12 md:mb-16"
      >
        <Kicker n="05" label="Playground" />
        <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.92] text-fg">
          Still <span className="italic text-accent">curious?</span>
        </h2>
        <p className="mt-6 max-w-xl text-muted">Type a command or click one. Everything here opens the real thing.</p>
      </motion.div>
      <TerminalCard onOpenItem={onOpenItem} />
    </div>
  </section>
);

export default Terminal;
