import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";
import { LorenzCanvas } from "./lorenz-canvas";

/**
 * Each featured project gets a different ambient hero visualisation.
 * - "lorenz": full Lorenz attractor (Parametric CFO)
 * - "phase": multi-trajectory N-body-like phase plot (Neural Surrogates)
 * - "burgers": 1D Burgers shock + viscosity wave (Tesseract PINN)
 * - "embedding": semantic embedding cloud (arXiv search)
 */
export function ProjectHero({ kind }: { kind: string }) {
  if (kind === "lorenz") {
    return (
      <LorenzCanvas
        className="absolute inset-0 w-full h-full"
        density={32}
        speed={1.2}
      />
    );
  }
  if (kind === "phase") return <PhaseCanvas />;
  if (kind === "burgers") return <BurgersCanvas />;
  if (kind === "embedding") return <EmbeddingCanvas />;
  return null;
}

// ----------- Phase plot — orbiting two-body-ish trajectories -----------
function PhaseCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type Body = { x: number; y: number; vx: number; vy: number; m: number };
    const bodies: Body[] = [];
    const N = 6;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 0.25 + (i % 3) * 0.08;
      bodies.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        vx: -Math.sin(a) * 0.4,
        vy: Math.cos(a) * 0.4,
        m: 0.6 + Math.random() * 0.4,
      });
    }

    const trail: { x: number; y: number; bi: number; t: number }[] = [];
    const TRAIL_MAX = 1500;

    let t = 0;
    const step = () => {
      const dt = 0.004;
      // gravity to center + soft inter-body
      for (const b of bodies) {
        const r2 = b.x * b.x + b.y * b.y + 0.02;
        const r = Math.sqrt(r2);
        const ax = (-b.x / (r2 * r)) * 0.4;
        const ay = (-b.y / (r2 * r)) * 0.4;
        b.vx += ax * dt;
        b.vy += ay * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
      bodies.forEach((b, i) => trail.push({ x: b.x, y: b.y, bi: i, t }));
      while (trail.length > TRAIL_MAX) trail.shift();
      t += dt;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      for (let i = 0; i < 6; i++) step();
      ctx.fillStyle =
        theme === "dark" ? "rgba(11,14,18,0.18)" : "rgba(248,245,240,0.18)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.42;
      const palette = [174, 200, 145, 27, 280, 55];
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        if (a.bi !== b.bi) continue;
        const age = (t - b.t) / 4;
        const alpha = Math.max(0, 0.6 - age * 1.2);
        const hue = palette[b.bi];
        const lite = theme === "dark" ? 60 : 36;
        ctx.strokeStyle = `hsla(${hue},65%,${lite}%,${alpha})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(cx + a.x * scale, cy + a.y * scale);
        ctx.lineTo(cx + b.x * scale, cy + b.y * scale);
        ctx.stroke();
      }
      // bodies
      bodies.forEach((b, i) => {
        const hue = palette[i];
        ctx.fillStyle = `hsl(${hue},70%,55%)`;
        ctx.beginPath();
        ctx.arc(cx + b.x * scale, cy + b.y * scale, 2 + b.m * 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      data-testid="phase-canvas"
      aria-hidden="true"
    />
  );
}

// ----------- Burgers — 1D travelling shock -----------
function BurgersCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 200;
    let u = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const x = i / N;
      u[i] = Math.sin(2 * Math.PI * x) * 0.8;
    }
    const dx = 1 / N;
    const dt = 0.0015;
    const nu = 0.005;

    let raf = 0;
    let frame = 0;

    const integrate = () => {
      const next = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const im = (i - 1 + N) % N;
        const ip = (i + 1) % N;
        const adv = (u[i] * (u[ip] - u[im])) / (2 * dx);
        const dif = (u[ip] - 2 * u[i] + u[im]) / (dx * dx);
        next[i] = u[i] - dt * adv + dt * nu * dif;
      }
      u = next;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      for (let i = 0; i < 4; i++) integrate();
      ctx.fillStyle = theme === "dark" ? "rgba(11,14,18,0.7)" : "rgba(248,245,240,0.7)";
      ctx.fillRect(0, 0, w, h);
      // axes
      ctx.strokeStyle =
        theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      for (let g = 0; g < 6; g++) {
        const y = (h * g) / 5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // wave
      const lite = theme === "dark" ? 55 : 32;
      ctx.strokeStyle = `hsl(174,72%,${lite}%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const x = (i / N) * w;
        const y = h / 2 - u[i] * (h / 2.6);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // sample points (the sparse measurements PINNs use)
      ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
      const samples = [12, 38, 65, 92, 130, 168];
      for (const s of samples) {
        const x = (s / N) * w;
        const y = h / 2 - u[s] * (h / 2.6) + Math.sin(frame * 0.05 + s) * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      frame++;
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      data-testid="burgers-canvas"
      aria-hidden="true"
    />
  );
}

// ----------- Embedding cloud -----------
function EmbeddingCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type Pt = {
      x: number;
      y: number;
      cluster: number;
      r: number;
      pulse: number;
      vx: number;
      vy: number;
    };
    const clusters = 5;
    const centers = Array.from({ length: clusters }, (_, i) => {
      const a = (i / clusters) * Math.PI * 2 + 0.4;
      return { cx: Math.cos(a) * 0.35, cy: Math.sin(a) * 0.35 };
    });

    const points: Pt[] = [];
    for (let i = 0; i < 220; i++) {
      const c = i % clusters;
      const center = centers[c];
      const r = Math.sqrt(Math.random()) * 0.18;
      const a = Math.random() * Math.PI * 2;
      points.push({
        x: center.cx + Math.cos(a) * r,
        y: center.cy + Math.sin(a) * r,
        cluster: c,
        r: 0.8 + Math.random() * 1.6,
        pulse: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
      });
    }

    let raf = 0;
    let q = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.fillStyle =
        theme === "dark" ? "rgba(11,14,18,0.55)" : "rgba(248,245,240,0.55)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.85;
      q += 0.005;

      // query "wave" — show a query embedding searching across clusters
      const queryX = Math.cos(q) * 0.18;
      const queryY = Math.sin(q * 1.3) * 0.18;

      // connection lines to nearest cluster
      const palette = [174, 200, 27, 280, 145];
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        const dx = p.x - queryX;
        const dy = p.y - queryY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const close = dist < 0.18;
        const hue = palette[p.cluster];
        const lite = theme === "dark" ? 55 : 36;
        const alpha = close ? 0.9 : 0.45 + Math.sin(p.pulse) * 0.1;
        ctx.fillStyle = `hsla(${hue},65%,${lite}%,${alpha})`;
        ctx.beginPath();
        ctx.arc(
          cx + p.x * scale,
          cy + p.y * scale,
          p.r + (close ? 1.2 : 0),
          0,
          Math.PI * 2,
        );
        ctx.fill();
        if (close) {
          ctx.strokeStyle = `hsla(${hue},65%,${lite}%,0.18)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(cx + queryX * scale, cy + queryY * scale);
          ctx.lineTo(cx + p.x * scale, cy + p.y * scale);
          ctx.stroke();
        }
      }

      // query point
      ctx.fillStyle = theme === "dark" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)";
      ctx.beginPath();
      ctx.arc(cx + queryX * scale, cy + queryY * scale, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle =
        theme === "dark" ? "rgba(94,234,212,0.6)" : "rgba(20,150,140,0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + queryX * scale, cy + queryY * scale, 14, 0, Math.PI * 2);
      ctx.stroke();
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      data-testid="embedding-canvas"
      aria-hidden="true"
    />
  );
}
