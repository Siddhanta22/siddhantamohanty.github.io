import React from 'react';

const WORDS = ['Backend', 'Applied AI', 'RAG', 'LLM Systems', 'APIs', 'Python', 'TypeScript', 'Agents', 'Developer Tools'];

// A slow ticker of outlined display type: a rhythm break between the dense sections.
const Marquee = () => {
  const row = WORDS.flatMap((w) => [w, '✦']);
  return (
    <div className="relative py-10 border-y border-line overflow-hidden select-none" aria-hidden="true">
      <div className="flex w-max animate-[marquee_45s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
            {row.map((w, i) => (
              <span key={`${copy}-${i}`} className={`font-display text-6xl md:text-8xl leading-none whitespace-nowrap ${w === '✦' ? 'text-accent text-4xl md:text-5xl' : 'text-outline'}`}>
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
