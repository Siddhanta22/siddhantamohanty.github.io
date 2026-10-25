import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Copy, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { projects, experiences } from '../data';
import { NAV_ITEMS } from './Header';
import { skillCategories, evidenceFor } from './Skills';
import { viewResume } from '../utils/resume';

const EMAIL = 'siddhantamohanty22@gmail.com';
const GROUP_ORDER = ['Go to', 'Experience', 'Projects', 'Skills', 'Actions'];
const MAX_RESULTS = 30;

const openExternal = (url) => window.open(url, '_blank', 'noopener,noreferrer');

// Every token of the query must appear somewhere in the item; items whose label starts
// with the query rank first.
const filterItems = (items, query) => {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return items.filter((item) => item.group !== 'Skills');
  const q = query.trim().toLowerCase();
  return items
    .filter((item) => {
      const hay = `${item.label} ${item.detail || ''}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    })
    .sort((a, b) => Number(b.label.toLowerCase().startsWith(q)) - Number(a.label.toLowerCase().startsWith(q)))
    .slice(0, MAX_RESULTS);
};

const CommandPalette = ({ open, setOpen, darkMode, toggleDarkMode, scrollToSection, onOpenItem }) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const lastFocus = useRef(null);

  const close = () => setOpen(false);

  // Run after the palette has started closing so the page scroll isn't fighting the scroll lock.
  const runLater = (fn) => setTimeout(fn, 120);

  const items = useMemo(() => {
    const go = NAV_ITEMS.map((s) => ({
      id: `go-${s.id}`, group: 'Go to', label: s.label, detail: 'Section',
      run: () => scrollToSection(s.id),
    }));
    const roles = experiences.map((e) => ({
      id: `exp-${e.id}`, group: 'Experience', label: e.company, detail: e.role,
      run: () => onOpenItem('experience', e.id),
    }));
    const projs = projects.map((p) => ({
      id: `proj-${p.id}`, group: 'Projects', label: p.title, detail: p.teaser,
      run: () => onOpenItem('projects', p.id),
    }));
    // One entry per (skill, place it was used); skills with no evidence jump to the Skills section.
    const skills = skillCategories.flatMap((c) => c.skills.flatMap((s) => {
      const evidence = evidenceFor(s.name);
      if (evidence.length === 0) {
        return [{ id: `skill-${s.name}`, group: 'Skills', label: s.name, detail: c.title, run: () => scrollToSection('skills') }];
      }
      return evidence.map((ev) => ({
        id: `skill-${s.name}-${ev.section}-${ev.id}`, group: 'Skills', label: s.name, detail: `used in ${ev.label}`,
        run: () => onOpenItem(ev.section, ev.id),
      }));
    }));
    const actions = [
      { id: 'act-resume', label: 'Open résumé', detail: 'PDF in a new tab', icon: FileText, run: viewResume },
      {
        id: 'act-copy', label: 'Copy email address', detail: EMAIL, icon: Copy, keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setStatus('Email address copied');
          } catch {
            window.location.href = `mailto:${EMAIL}`;
          }
        },
      },
      { id: 'act-mail', label: 'Send an email', detail: EMAIL, icon: Mail, run: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: 'act-theme', label: darkMode ? 'Switch to light mode' : 'Switch to dark mode', detail: 'Theme', icon: darkMode ? Sun : Moon, run: toggleDarkMode },
      { id: 'act-github', label: 'Open GitHub', detail: 'github.com/Siddhanta22', icon: Github, run: () => openExternal('https://github.com/Siddhanta22') },
      { id: 'act-linkedin', label: 'Open LinkedIn', detail: 'linkedin.com/in/siddhanta-mohanty-13aa92222', icon: Linkedin, run: () => openExternal('https://linkedin.com/in/siddhanta-mohanty-13aa92222') },
    ].map((a) => ({ ...a, group: 'Actions' }));
    return [...go, ...roles, ...projs, ...skills, ...actions];
  }, [darkMode, toggleDarkMode, scrollToSection, onOpenItem]);

  const results = useMemo(() => {
    const found = filterItems(items, query);
    return GROUP_ORDER.flatMap((g) => found.filter((item) => item.group === g));
  }, [items, query]);

  // Global shortcuts: Ctrl/⌘ + K toggles; "/" opens when the visitor isn't typing somewhere.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '/' && !open && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target;
        const typing = t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName));
        if (!typing) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  // Lock page scroll while open and hand focus back afterwards.
  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setQuery('');
    setActive(0);
    setStatus('');
    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  const choose = (item) => {
    if (!item) return;
    if (item.keepOpen) {
      item.run();
      setTimeout(close, 900);
      return;
    }
    close();
    runLater(item.run);
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // the input is the only stop; keeps focus inside the dialog
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center px-4 pt-[16vh]"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            onAnimationStart={() => inputRef.current?.focus()}
            className="w-full max-w-xl rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-dark-600">
              <Search className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-label="Search sections, projects, skills and actions"
                placeholder="Search projects, skills, or run a command…"
                spellCheck={false}
                autoComplete="off"
                className="flex-1 min-w-0 py-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <kbd className="text-[11px] font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-dark-500 rounded px-1.5 py-0.5">esc</kbd>
            </div>

            <ul id="palette-list" role="listbox" ref={listRef} className="max-h-[22rem] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No matches for “{query}”.
                </li>
              )}
              {results.map((item, index) => {
                const showHeading = item.group !== lastGroup;
                lastGroup = item.group;
                const isActive = index === active;
                const Icon = item.icon;
                return (
                  <React.Fragment key={item.id}>
                    {showHeading && (
                      <li role="presentation" className="px-3 pt-3 pb-1 text-[11px] font-mono uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {item.group}
                      </li>
                    )}
                    <li
                      id={`palette-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseMove={() => setActive(index)}
                      onClick={() => choose(item)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${
                        isActive ? 'bg-primary-50 dark:bg-primary-900/30 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4 shrink-0 text-primary-600 dark:text-primary-400" aria-hidden="true" />}
                      <span className="font-medium shrink-0">{item.label}</span>
                      {item.detail && <span className="truncate text-gray-500 dark:text-gray-400">{item.detail}</span>}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-gray-200 dark:border-dark-600 text-[11px] font-mono text-gray-500 dark:text-gray-400">
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span role="status" aria-live="polite" className="text-primary-600 dark:text-primary-400">{status}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
