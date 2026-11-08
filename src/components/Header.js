import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Search } from 'lucide-react';
import { paletteShortcut } from '../utils/platform';

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const iconButton =
  'grid place-items-center w-10 h-10 rounded-full border border-line text-fg hover:border-accent hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70';

const Header = ({ scrollToSection, darkMode, toggleDarkMode, onOpenPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const pos = window.scrollY + window.innerHeight * 0.4;
      let current = null;
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // An open menu covers the page, so the page behind it must not scroll
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('resize', close);
    };
  }, [open]);

  const go = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-bg/70 backdrop-blur-xl border-b border-line' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Siddhanta Mohanty — back to top"
            className="font-display text-2xl italic leading-none text-fg hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded px-1 -mx-1 py-3"
          >
            Siddhanta<span className="text-accent">.</span>
          </button>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-line bg-bg/50 backdrop-blur-md px-2 py-1.5" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative px-4 min-h-[40px] rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                  active === item.id ? 'text-bg' : 'text-muted hover:text-fg'
                }`}
              >
                {active === item.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="hidden md:inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-full border border-line text-sm text-muted hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <kbd className="font-mono text-[11px] border border-line rounded px-1.5 py-0.5">{paletteShortcut()}</kbd>
            </button>
            <button type="button" onClick={toggleDarkMode} aria-label="Toggle dark mode" className={iconButton}>
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Toggle mobile menu" className={`${iconButton} md:hidden`}>
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-bg/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => go(item.id)} className="font-display text-5xl text-fg hover:text-accent transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
