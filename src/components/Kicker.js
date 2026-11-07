import React from 'react';

// Chapter marker above each section title: "02 ———— Selected work"
const Kicker = ({ n, label }) => (
  <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em]">
    <span className="text-accent">{n}</span>
    <span className="h-px flex-1 bg-line" aria-hidden="true" />
    <span className="text-muted">{label}</span>
  </div>
);

export default Kicker;
