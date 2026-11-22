import { useEffect, useRef } from 'react';

interface ScientificCanvasProps {
  theme: 'dark' | 'light';
}

interface LatticeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function ScientificCanvas({ theme }: ScientificCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let nodes: LatticeNode[] = [];

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodeCount = Math.min(36, Math.max(18, Math.floor((width * height) / 38000)));
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 1.3 + Math.random() * 1.4
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const gridColor = isDark ? 'rgba(148, 163, 184, 0.045)' : 'rgba(15, 23, 42, 0.035)';
      const nodeColor = isDark ? 'rgba(34, 211, 238, 0.35)' : 'rgba(2, 132, 199, 0.25)';
      const edgeRgb = isDark ? '56, 189, 248' : '37, 99, 235';
      const waveColor = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(37, 99, 235, 0.06)';

      // Subtle crystallographic coordinate grid
      const step = 64;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Subtle quantum wave interference curve
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 1.25;
      for (let harmonic = 0; harmonic < 2; harmonic++) {
        ctx.beginPath();
        const baseY = height * (0.35 + harmonic * 0.3);
        const phase = (prefersReducedMotion ? 0 : time * 0.0004) + harmonic * 1.6;
        for (let x = 0; x <= width; x += 12) {
          const y =
            baseY +
            Math.sin(x * 0.0065 + phase) * 28 * Math.cos(x * 0.002 - phase * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Update & draw lattice nodes + bonds
      const maxDist = 145;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!prefersReducedMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.14 : 0.09);
            ctx.strokeStyle = `rgba(${edgeRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    init();
    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      init();
      if (prefersReducedMotion) {
        draw(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full z-0"
    />
  );
}
