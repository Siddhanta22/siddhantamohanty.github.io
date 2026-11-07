import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { viewResume } from '../utils/resume';
import { paletteShortcut } from '../utils/platform';

const SCENES = [
  {
    id: 'name',
    kicker: 'Software Engineer / Applied AI / Backend Systems',
    headline: 'I like figuring out how things work.',
    body: 'Penn State computer science grad building backend and applied-AI systems.',
  },
  {
    id: 'self-heal',
    kicker: '01 — Self-Heal',
    headline: 'Then I build them.',
    body: 'Self-Heal matches a database error to past incidents, explains it, and recommends a fix, delivered straight to Slack.',
    action: { label: 'Open the project', section: 'projects', id: 1 },
  },
  {
    id: 'rewind',
    kicker: '02 — Rewind',
    headline: 'I like making slow things fast.',
    body: 'Rewind replays a recorded agent workflow with zero LLM calls: 0.41 seconds instead of 13.1 on the demo.',
    action: { label: 'Open the project', section: 'projects', id: 10 },
  },
  {
    id: 'promise',
    kicker: '03 — Now',
    headline: 'And things that matter.',
    body: 'I’m volunteering as a backend developer on Promise Path, a learning platform for children living in NYC shelters.',
    action: { label: 'Read about the role', section: 'experience', id: 5 },
  },
  {
    id: 'rest',
    kicker: 'The rest',
    headline: 'Here’s everything else.',
    body: `Projects, experience, skills, and a terminal-style palette: press ${paletteShortcut()} to jump anywhere.`,
  },
];

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Siddhanta22', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/siddhanta-mohanty-13aa92222', icon: Linkedin },
  { label: 'Email', href: 'mailto:siddhantamohanty22@gmail.com', icon: Mail },
];

const SCENE_HEIGHT_VH = 90; // scroll distance per scene
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (t) => t * t * (3 - 2 * t);

// ---- Target shapes -------------------------------------------------------------------
// Each scene is drawn white-on-transparent to an offscreen canvas; the lit pixels become
// the points the particles fly to.

const SANS = 'Inter, system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

const usableWidth = (W) => Math.min(W * 0.82, 1100);

const drawBigText = (text) => (ctx, W, H) => {
  let size = 200;
  ctx.font = `700 ${size}px ${SANS}`;
  const maxW = usableWidth(W);
  size = Math.min(size, Math.floor((size * maxW) / ctx.measureText(text).width));
  ctx.font = `700 ${size}px ${SANS}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, H * 0.3);
};

const roundedRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
};

const drawPipeline = (ctx, W, H) => {
  const labels = ['error log', 'FAISS', 'LLM', 'Slack'];
  const usable = usableWidth(W);
  const boxW = Math.min(usable * 0.21, 250);
  const boxH = Math.min(132, H * 0.15);
  const gap = (usable - boxW * labels.length) / (labels.length - 1);
  const startX = (W - usable) / 2;
  const cy = H * 0.3;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `800 ${Math.round(boxH * 0.3)}px ${MONO}`;
  labels.forEach((label, i) => {
    const x = startX + i * (boxW + gap);
    roundedRect(ctx, x, cy - boxH / 2, boxW, boxH, 18);
    ctx.stroke();
    ctx.fillText(label, x + boxW / 2, cy);
    if (i < labels.length - 1) {
      const ax = x + boxW + 14;
      const bx = x + boxW + gap - 14;
      ctx.beginPath();
      ctx.moveTo(ax, cy);
      ctx.lineTo(bx, cy);
      ctx.moveTo(bx - 14, cy - 12);
      ctx.lineTo(bx, cy);
      ctx.lineTo(bx - 14, cy + 12);
      ctx.stroke();
    }
  });
};

const drawBars = (ctx, W, H) => {
  const usable = usableWidth(W);
  const x = (W - usable) / 2;
  const barH = Math.min(64, H * 0.075);
  ctx.lineWidth = 5;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 ${Math.round(barH * 0.5)}px ${MONO}`;
  // The long bar is an outline so it doesn't swallow every particle; the short one is solid.
  ctx.fillText('13.1 s   with an LLM in the loop', x, H * 0.19);
  roundedRect(ctx, x, H * 0.21, usable, barH, 10);
  ctx.stroke();
  ctx.fillText('0.41 s   replay', x, H * 0.36);
  roundedRect(ctx, x, H * 0.38, Math.max(usable * (0.41 / 13.1), 28), barH, 10);
  ctx.fill();
};

const SHAPES = [
  drawBigText('Siddhanta Mohanty'),
  drawPipeline,
  drawBars,
  drawBigText('Promise Path'),
  null, // scattered field
];

const sampleTargets = (draw, W, H, count) => {
  const out = new Float32Array(count * 2);
  if (!draw) {
    for (let k = 0; k < count; k += 1) {
      out[k * 2] = Math.random() * W;
      out[k * 2 + 1] = Math.random() * H;
    }
    return out;
  }
  const off = document.createElement('canvas');
  off.width = W;
  off.height = H;
  const ctx = off.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  draw(ctx, W, H);
  const { data } = ctx.getImageData(0, 0, W, H);
  const pts = [];
  const stride = 2;
  for (let y = 0; y < H; y += stride) {
    for (let x = 0; x < W; x += stride) {
      if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
    }
  }
  const n = pts.length / 2;
  if (n === 0) return sampleTargets(null, W, H, count);
  // Shuffle so particles spread evenly over the shape
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (let k = 0; k < count; k += 1) {
    const p = order[k % n];
    out[k * 2] = pts[p * 2] + (Math.random() - 0.5) * 1.2;
    out[k * 2 + 1] = pts[p * 2 + 1] + (Math.random() - 0.5) * 1.2;
  }
  return out;
};

// ---- Component -----------------------------------------------------------------------

const Caption = ({ scene, onOpenItem, first }) => (
  <>
    <p className="font-mono text-xs sm:text-sm text-primary-600 dark:text-primary-400">{scene.kicker}</p>
    <h2 className="mt-3 text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900 dark:text-white text-balance">
      {scene.headline}
    </h2>
    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">{scene.body}</p>
    {scene.action && (
      <button
        type="button"
        onClick={() => onOpenItem(scene.action.section, scene.action.id)}
        className="mt-5 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 rounded"
      >
        {scene.action.label} <span aria-hidden="true">→</span>
      </button>
    )}
    {first && (
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:-translate-y-0.5 transition-transform"
        >
          View Projects <ArrowDown className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={viewResume}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
        >
          <FileText className="w-5 h-5" /> View Résumé
        </button>
        {SOCIALS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="p-2.5 rounded-lg border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    )}
  </>
);

const Story = ({ onOpenItem }) => {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const S = SCENES.length;
    const COUNT = window.innerWidth < 768 ? 1400 : 4200;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let W = 0;
    let H = 0;
    let targets = [];
    let raf;
    let lastScene = 0;
    const mouse = { x: -9999, y: -9999 };

    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const speed = new Float32Array(COUNT);
    const delay = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    const size = new Float32Array(COUNT);
    for (let k = 0; k < COUNT; k += 1) {
      speed[k] = 0.05 + Math.random() * 0.07;
      delay[k] = Math.random();
      phase[k] = Math.random() * Math.PI * 2;
      size[k] = 1.1 + Math.random() * 1.5;
    }
    const split = Math.floor(COUNT * 0.72); // first part cyan, rest neutral

    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      targets = SHAPES.map((draw) => sampleTargets(draw, W, H, COUNT));
    };

    let first = true;
    const start = () => {
      build();
      if (first) {
        for (let k = 0; k < COUNT; k += 1) {
          px[k] = Math.random() * W;
          py[k] = Math.random() * H;
        }
        first = false;
      }
    };
    const ready = document.fonts?.load ? Promise.all([document.fonts.load(`700 80px Inter`), document.fonts.load(`700 40px "JetBrains Mono"`)]) : Promise.resolve();
    let started = false;
    ready.catch(() => {}).then(() => { start(); started = true; });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { if (started) build(); }, 150);
    };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (!started) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > H) return;

      const total = rect.height - H;
      const prog = clamp(-rect.top / total) * (S - 1);
      const active = Math.round(prog);
      if (active !== lastScene) { lastScene = active; setScene(active); }

      const i = Math.min(Math.floor(prog), S - 2);
      const f = prog - i;
      const A = targets[i];
      const B = targets[i + 1];
      const dark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, W, H);
      for (let k = 0; k < COUNT; k += 1) {
        // each particle leaves a little later than its neighbours, so the shape swarms
        const e = smooth(clamp((f - 0.42 - delay[k] * 0.22) / 0.34));
        let tx = A[k * 2] + (B[k * 2] - A[k * 2]) * e;
        let ty = A[k * 2 + 1] + (B[k * 2 + 1] - A[k * 2 + 1]) * e;
        tx += Math.sin(t * 0.0011 + phase[k]) * 0.8;
        ty += Math.cos(t * 0.0009 + phase[k]) * 0.8;
        px[k] += (tx - px[k]) * speed[k];
        py[k] += (ty - py[k]) * speed[k];

        const dx = px[k] - mouse.x;
        const dy = py[k] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12100 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (1 - d / 110) * 7;
          px[k] += (dx / d) * push;
          py[k] += (dy / d) * push;
        }
      }
      ctx.fillStyle = dark ? 'rgba(34, 211, 238, 0.95)' : 'rgba(8, 145, 178, 0.95)';
      for (let k = 0; k < split; k += 1) ctx.fillRect(px[k], py[k], size[k], size[k]);
      ctx.fillStyle = dark ? 'rgba(226, 232, 240, 0.9)' : 'rgba(30, 41, 59, 0.85)';
      for (let k = split; k < COUNT; k += 1) ctx.fillRect(px[k], py[k], size[k], size[k]);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  const jumpTo = (index) => {
    const section = sectionRef.current;
    const total = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (index / (SCENES.length - 1)) * total + 2, behavior: 'smooth' });
  };

  // Reduced motion: the same story as plain, stacked content with no pinned canvas.
  if (reduced) {
    return (
      <section className="min-h-screen pt-32 pb-16 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-20">
          {SCENES.map((s, i) => (
            <div key={s.id}>
              <Caption scene={s} onOpenItem={onOpenItem} first={i === 0} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ height: `${(SCENES.length - 1) * SCENE_HEIGHT_VH + 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-white dark:bg-[#0a0a0c]">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0a0a0c] dark:via-[#0a0a0c]/80 pointer-events-none" />

        {/* The visible caption shows one scene at a time; screen readers get the others here. */}
        <div className="sr-only">
          {SCENES.filter((_, i) => i !== scene).map((s) => (
            <p key={s.id}>{s.headline} {s.body}</p>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 pb-12 sm:pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="max-w-3xl"
              >
                <Caption scene={SCENES[scene]} onOpenItem={onOpenItem} first={scene === 0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ol className="hidden md:flex flex-col gap-3 absolute right-6 lg:right-10 top-1/2 -translate-y-1/2" aria-label="Story progress">
          {SCENES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to: ${s.headline}`}
                aria-current={i === scene ? 'true' : undefined}
                className={`block w-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 ${
                  i === scene ? 'h-7 bg-primary-500' : 'h-2.5 bg-gray-300 dark:bg-dark-600 hover:bg-gray-400'
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Story;
