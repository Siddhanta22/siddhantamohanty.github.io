import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// The photo, rebuilt as a few thousand glowing dots. They fly in from scatter when it
// scrolls into view, shy away from the cursor, and spring back home.
const ParticlePortrait = ({ src, alt }) => {
  const reduced = useReducedMotion();
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const box = boxRef.current;
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const mouse = { x: -999, y: -999 };
    let raf;
    let visible = false;
    let W = 0;
    let H = 0;
    let n = 0;
    let step = 6;
    let hx; let hy; let x; let y; let vx; let vy; let col;
    let imgData; let buf32;
    const img = new Image();

    const build = () => {
      W = Math.max(1, Math.round(box.clientWidth));
      H = Math.max(1, Math.round(box.clientHeight));
      cv.width = W;
      cv.height = H;
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const o = off.getContext('2d', { willReadFrequently: true });
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight); // cover-fit
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      o.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      const data = o.getImageData(0, 0, W, H).data;
      step = Math.max(4, Math.round(W / 105));
      const cols = Math.floor(W / step);
      const rows = Math.floor(H / step);
      n = cols * rows;
      hx = new Float32Array(n); hy = new Float32Array(n);
      x = new Float32Array(n); y = new Float32Array(n);
      vx = new Float32Array(n); vy = new Float32Array(n);
      col = new Uint32Array(n);
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const i = r * cols + c;
          const px = Math.floor(c * step + step / 2);
          const py = Math.floor(r * step + step / 2);
          const k = (py * W + px) * 4;
          hx[i] = px; hy[i] = py;
          x[i] = Math.random() * W; y[i] = Math.random() * H; // start scattered
          // little-endian ABGR, fully opaque
          col[i] = (255 << 24) | (data[k + 2] << 16) | (data[k + 1] << 8) | data[k];
        }
      }
      imgData = ctx.createImageData(W, H);
      buf32 = new Uint32Array(imgData.data.buffer);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || !buf32) return;
      buf32.fill(0);
      const bs = Math.max(2, Math.round(step * 0.72));
      for (let i = 0; i < n; i += 1) {
        const dx = x[i] - mouse.x;
        const dy = y[i] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 6400 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (1 - d / 80) * 4.5;
          vx[i] += (dx / d) * push;
          vy[i] += (dy / d) * push;
        }
        vx[i] = (vx[i] + (hx[i] - x[i]) * 0.055) * 0.86;
        vy[i] = (vy[i] + (hy[i] - y[i]) * 0.055) * 0.86;
        x[i] += vx[i];
        y[i] += vy[i];
        const ix = Math.round(x[i]);
        const iy = Math.round(y[i]);
        if (ix < 0 || iy < 0 || ix + bs >= W || iy + bs >= H) continue;
        for (let yy = 0; yy < bs; yy += 1) {
          const row = (iy + yy) * W + ix;
          for (let xx = 0; xx < bs; xx += 1) buf32[row + xx] = col[i];
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };

    img.onload = () => { build(); raf = requestAnimationFrame(frame); };
    img.src = src;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(box);
    const onMove = (e) => { const r = box.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    box.addEventListener('pointermove', onMove);
    box.addEventListener('pointerleave', onLeave);
    let timer;
    const ro = new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(() => { if (img.complete && img.naturalWidth) build(); }, 200); });
    ro.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io.disconnect();
      ro.disconnect();
      box.removeEventListener('pointermove', onMove);
      box.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, src]);

  if (reduced) return <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />;

  return (
    <div ref={boxRef} className="absolute inset-0">
      <img src={src} alt={alt} className="sr-only" />
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full block" />
    </div>
  );
};

export default ParticlePortrait;
