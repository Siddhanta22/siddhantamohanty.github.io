import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const WORDS = ['Backend', 'Applied AI', 'RAG', 'LLM Systems', 'APIs', 'Python', 'TypeScript', 'Agents', 'Developer Tools'];
const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };

// A ticker of outlined display type that drifts on its own, then speeds up, slows down
// or reverses with how fast (and which way) you scroll.
const Marquee = () => {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = dir.current * -2.2 * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    move += dir.current * move * b;
    baseX.set(baseX.get() + move);
  });

  const row = WORDS.flatMap((w) => [w, '✦']);
  return (
    <div className="relative py-10 border-y border-line overflow-hidden select-none" aria-hidden="true">
      <motion.div data-marquee className="flex w-max" style={{ x }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
            {row.map((w, i) => (
              <span key={`${copy}-${i}`} className={`font-display text-6xl md:text-8xl leading-none whitespace-nowrap ${w === '✦' ? 'text-accent text-4xl md:text-5xl' : 'text-outline'}`}>
                {w}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
