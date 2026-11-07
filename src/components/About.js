import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Kicker from './Kicker';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay },
});

const tile = 'rounded-3xl border border-line bg-panel p-8';
const label = 'font-mono text-xs uppercase tracking-[0.18em] text-accent';

const About = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  };

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal()} className="mb-14 md:mb-20">
          <Kicker n="01" label="Hello" />
          <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.92] text-fg">
            About <span className="italic text-accent">me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-5">
          <motion.div {...reveal(0.05)} className={`${tile} lg:col-span-7 lg:row-span-2 p-8 md:p-12 flex flex-col gap-7`}>
            <p className="font-display text-3xl md:text-4xl leading-[1.15] text-fg">
              I'm a Computer Science graduate from Penn State who enjoys figuring out how things work, building things from scratch, and getting into problems I don't fully know how to solve yet.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Some of my best experiences have come from unfamiliar territory. At HCLTech, I had a week to learn RAG from scratch, and that learning eventually helped me come up with and build Self-Heal. At Penn State, I stepped into reinforcement learning with little prior experience and worked my way toward proposing an approach for improving LLM code verification.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Across internships, research, team projects, and things I've built on my own, I've learned that I enjoy taking ownership, learning quickly, and turning ideas into something meaningful with a real use case and impact.
            </p>
          </motion.div>

          <motion.div {...reveal(0.12)} className="lg:col-span-5 lg:row-span-2 relative" style={{ perspective: 1000 }}>
            <motion.div
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="h-full min-h-[22rem] rounded-3xl overflow-hidden border border-line bg-panel"
            >
              <img
                src={`${process.env.PUBLIC_URL}/headshot-retouched.jpg`}
                alt="Siddhanta Mohanty"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>
          </motion.div>

          <motion.div {...reveal(0.05)} className={`${tile} lg:col-span-4`}>
            <p className={label}>Education</p>
            <p className="mt-4 font-display text-3xl text-fg leading-tight">B.S. Computer Science</p>
            <p className="mt-2 text-muted">Penn State · Class of 2026</p>
            <p className="text-muted">Dean's List ×4</p>
          </motion.div>

          <motion.div {...reveal(0.1)} className={`${tile} lg:col-span-4`}>
            <p className={label}>Outside of tech</p>
            <p className="mt-4 font-display text-3xl text-fg leading-tight">Traveling and exploring new places.</p>
          </motion.div>

          <motion.div {...reveal(0.15)} className={`${tile} lg:col-span-4`}>
            <p className={label}>Now</p>
            <p className="mt-4 font-display text-3xl text-fg leading-tight">Building Promise Path, a learning platform for kids in NYC shelters.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
