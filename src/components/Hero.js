import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Sparkles } from 'lucide-react';

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

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = 'https://siddhanta22.github.io/siddhantamohanty.github.io/Resume_main.pdf';
  link.download = 'Siddhanta_Mohanty_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const COMMANDS = {
  help: () => ({ output: "Commands: whoami, about, stack, projects, experience, skills, contact, resume, clear" }),
  whoami: () => ({ output: 'Siddhanta Mohanty — software engineer building backend systems, applied AI/ML, and autonomous perception software.' }),
  about: () => ({ output: "CS grad from Penn State ('26). I like taking ideas from concept to production — APIs, services, AI tooling, research." }),
  stack: () => ({ groups: STACK_GROUPS }),
  projects: () => ({ output: 'Self-Heal System, yourAIbrief, AI Transcript, and more. Scrolling you there.', scrollTo: 'projects' }),
  experience: () => ({ output: 'HCLTech · Penn State Research · Advanced Vehicle Team · Elevatoz Loyalty. Scrolling you there.', scrollTo: 'experience' }),
  skills: () => ({ output: 'Python, TypeScript, React, FastAPI, LangChain, RAG, ROS2, and more. Scrolling you there.', scrollTo: 'skills' }),
  contact: () => ({ output: 'siddhantamohanty22@gmail.com · linkedin.com/in/siddhanta-mohanty-13aa92222. Scrolling you there.', scrollTo: 'contact' }),
  resume: () => {
    downloadResume();
    return { output: 'Downloading résumé...' };
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, booted]);

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
        className="p-5 space-y-4 max-h-[22rem] overflow-y-auto cursor-text"
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
              autoFocus
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
    "Building backend-first products people use",
    "Shipping reliable, scalable software",
    "Turning ML ideas into production features",
    "Creating practical tools for engineers"
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
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 pt-36 pb-28">
      {/* Subtle Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200/20 dark:bg-accent-800/20 rounded-full blur-3xl"></div>
      </div>

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
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="gradient-text">Siddhanta Mohanty</span>
              </motion.h1>

              {/* Rotating Tagline */}
              <div className="min-h-[4.5rem] md:min-h-[3.5rem] flex items-center justify-center lg:justify-start px-2 lg:px-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTagline}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl xl:text-4xl font-semibold text-gray-700 dark:text-gray-300 text-center lg:text-left leading-snug"
                  >
                    {taglines[currentTagline]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-lg md:text-xl text-gray-600 dark:text-gray-400">
                <span>Software Engineer</span>
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span>AI and Robotics</span>
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span>Full-Stack Developer</span>
              </div>

            </motion.div>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              I build <span className="font-semibold text-gray-900 dark:text-white">production-ready software</span> across <span className="font-semibold text-gray-900 dark:text-white">backend</span>, <span className="font-semibold text-gray-900 dark:text-white">systems</span>, and <span className="font-semibold text-gray-900 dark:text-white">applied ML</span>, from services and internal tooling to real-time pipelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToProjects}
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadResume}
                className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Résumé</span>
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
