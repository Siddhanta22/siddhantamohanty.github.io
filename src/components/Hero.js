import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowDown, Sparkles } from 'lucide-react';
import FloatingOrbs from './FloatingOrbs';
import { viewResume } from '../utils/resume';

const STACK_GROUPS = [
  { label: 'backend/', items: 'Python, FastAPI, Flask, Node.js' },
  { label: 'ai-ml/', items: 'LangChain, RAG, PyTorch' },
  { label: 'frontend/', items: 'React, TypeScript' },
  { label: 'robotics/', items: 'ROS2, Computer Vision' },
];

const BOOT_LINES = [
  { prompt: 'whoami', output: 'Siddhanta Mohanty, software engineer' },
  { prompt: 'cat focus.txt', output: 'Backend systems, applied AI/ML,\nautonomous perception' },
  { prompt: 'ls stack/', groups: STACK_GROUPS },
  { prompt: 'status', output: 'Open to new opportunities' },
];

const COMMANDS = {
  help: () => ({ output: "Commands: whoami, about, stack, projects, experience, skills, contact, resume, clear" }),
  whoami: () => ({ output: 'Siddhanta Mohanty — software engineer building backend systems, applied AI/ML, and autonomous perception software.' }),
  about: () => ({ output: "CS grad from Penn State ('26). I like taking ideas from concept to production — APIs, services, AI tooling, research." }),
  stack: () => ({ groups: STACK_GROUPS }),
  projects: () => ({ output: 'Self-Heal System, Rewind, Scout, and more. Scrolling you there.', scrollTo: 'projects' }),
  experience: () => ({ output: 'Penn State Research · HCLTech · Advanced Vehicle Team · Elevatoz Loyalty. Scrolling you there.', scrollTo: 'experience' }),
  skills: () => ({ output: 'Python, TypeScript, React, FastAPI, LangChain, RAG, ROS2, and more. Scrolling you there.', scrollTo: 'skills' }),
  contact: () => ({ output: 'siddhantamohanty22@gmail.com · linkedin.com/in/siddhanta-mohanty-13aa92222. Scrolling you there.', scrollTo: 'contact' }),
  resume: () => {
    viewResume();
    return { output: 'Opening résumé in a new tab...' };
  },
  sudo: () => ({ output: 'Nice try. Permission denied.' }),
};

const TerminalBody = ({ block }) => {
  if (block.groups) {
    return (
      <div className="mt-1">
        {block.groups.map((group) => (
          <div key={group.label} className="flex gap-3">
            <span className="text-accent-600 dark:text-accent-400 shrink-0 w-20">{group.label}</span>
            <span className="text-gray-700 dark:text-gray-300">{group.items}</span>
          </div>
        ))}
      </div>
    );
  }
  return <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{block.output}</div>;
};

const TerminalCard = () => {
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
    if (result.scrollTo) {
      setTimeout(() => {
        document.getElementById(result.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
      if (input.trim()) setCmdHistory((prev) => [...prev, input.trim()]);
      setHistoryIndex(-1);
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
      className="w-full max-w-md mx-auto lg:mx-0 rounded-xl border border-gray-200 dark:border-dark-700 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm shadow-xl overflow-hidden font-mono text-sm"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900/60">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-dark-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-dark-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-dark-600" />
        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">siddhanta@portfolio</span>
      </div>
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="p-5 space-y-4 max-h-[26rem] overflow-y-auto cursor-text"
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
            <TerminalBody block={block} />
          </motion.div>
        ))}

        {lines.map((block, index) => (
          <div key={index}>
            <div className="text-primary-600 dark:text-primary-400">
              <span className="text-gray-400 dark:text-gray-500">$</span> {block.prompt}
            </div>
            <TerminalBody block={block} />
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
    </motion.div>
  );
};

const Hero = () => {
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
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-bold leading-tight"
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
            <TerminalCard />
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
