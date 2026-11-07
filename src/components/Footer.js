import React from 'react';

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-line">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
      <p>© {new Date().getFullYear()} Siddhanta Mohanty</p>
      <p className="italic">Built with curiosity, rigor, and clean engineering.</p>
    </div>
    <p className="mt-6 -mb-[0.18em] text-center font-display text-[12.5vw] leading-none whitespace-nowrap text-outline select-none" aria-hidden="true">
      Siddhanta Mohanty
    </p>
  </footer>
);

export default Footer;
