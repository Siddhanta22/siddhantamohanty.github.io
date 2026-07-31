import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches;
    const isSmallScreen = window.innerWidth < 768;
    if (prefersReducedMotion || isCoarsePointer || isSmallScreen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };
    const CONNECT_DIST = 130;
    const MOUSE_RADIUS = 180;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.6 + 1.2,
    });

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 13000);
      particles = Array.from({ length: count }, createParticle);
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        // Gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // Push away from cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.6;
          p.x += (dx / (dist || 1)) * force;
          p.y += (dy / (dist || 1)) * force;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.16 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Web converging on the cursor
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - dist / MOUSE_RADIUS)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Particles
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boosted = dist < MOUSE_RADIUS;
        ctx.beginPath();
        ctx.arc(p.x, p.y, boosted ? p.size * 1.6 : p.size, 0, Math.PI * 2);
        ctx.fillStyle = boosted ? 'rgba(34, 211, 238, 0.85)' : 'rgba(6, 182, 212, 0.55)';
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default NetworkBackground;
