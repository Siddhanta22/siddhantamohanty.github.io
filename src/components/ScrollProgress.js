import React, { useEffect, useRef } from 'react';

// A hairline in the accent color that fills as you read. Written straight to the DOM so
// scrolling never triggers a React render.
const ScrollProgress = () => {
  const bar = useRef(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none" aria-hidden="true">
      <div ref={bar} className="h-full w-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
};

export default ScrollProgress;
