import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const rgb = (v) => `rgb(${v.trim().split(/\s+/).join(',')})`;

// A project's real tech stack as a small orbiting system: the project at the centre,
// each technology on its own orbit, pulses of "data" travelling along the links.
// Nodes shy away from the cursor. Purely decorative; the stack is also listed as text.
const TechConstellation = ({ title, tech }) => {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const mouse = { x: -999, y: -999 };
    let W = 0;
    let H = 0;
    let raf;
    let visible = false;
    const nodes = tech.map((label, i) => ({
      label,
      // even spacing, one shared orbit speed, alternating radii: labels can never pile up
      a: (i / tech.length) * Math.PI * 2 - Math.PI / 2,
      r: i % 2 ? 0.98 : 0.66,
      speed: 0.00016,
      px: 0, py: 0, vx: 0, vy: 0, phase: i / tech.length,
    }));

    const size = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach((nd) => { nd.px = W / 2; nd.py = H / 2; });
    };
    size();

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const cs = getComputedStyle(document.documentElement);
      const accent = rgb(cs.getPropertyValue('--accent'));
      const fg = rgb(cs.getPropertyValue('--fg'));
      const muted = rgb(cs.getPropertyValue('--muted'));
      const cx = W / 2;
      const cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      ctx.font = '12px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';

      nodes.forEach((nd) => {
        const ang = nd.a + t * nd.speed;
        const tx = cx + Math.cos(ang) * W * 0.36 * nd.r;
        const ty = cy + Math.sin(ang) * H * 0.4 * nd.r;
        const dx = nd.px - mouse.x;
        const dy = nd.py - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9025 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          nd.vx += (dx / d) * (1 - d / 95) * 2.2;
          nd.vy += (dy / d) * (1 - d / 95) * 2.2;
        }
        nd.vx = (nd.vx + (tx - nd.px) * 0.05) * 0.84;
        nd.vy = (nd.vy + (ty - nd.py) * 0.05) * 0.84;
        nd.px += nd.vx;
        nd.py += nd.vy;

        // link + a pulse travelling from the project out to the technology
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.22;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nd.px, nd.py);
        ctx.stroke();
        const f = (t * 0.00035 + nd.phase) % 1;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(cx + (nd.px - cx) * f, cy + (nd.py - cy) * f, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(nd.px, nd.py, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = fg;
        ctx.textAlign = nd.px > cx ? 'left' : 'right';
        ctx.fillText(nd.label, nd.px + (nd.px > cx ? 12 : -12), nd.py);
      });

      // the project itself
      const pulse = 1 + Math.sin(t * 0.003) * 0.12;
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.18;
      ctx.beginPath(); ctx.arc(cx, cy, 16 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = muted;
      ctx.textAlign = 'center';
      ctx.fillText(title, cx, cy + 28);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(wrap);
    const onMove = (e) => { const r = wrap.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    const ro = new ResizeObserver(size);
    ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, tech, title]);

  if (reduced) return null;

  return (
    <div ref={wrapRef} className="relative h-80 rounded-2xl border border-line bg-panel overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default TechConstellation;
