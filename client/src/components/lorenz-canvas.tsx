import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

/**
 * Live Lorenz attractor — integrates a small ensemble of trajectories with RK4
 * and renders them as fading streaks on a canvas. Pauses when not visible
 * and respects prefers-reduced-motion.
 */
type Props = {
  className?: string;
  density?: number; // number of particles
  speed?: number; // dt scale
};

const SIGMA = 10;
const BETA = 8 / 3;
const RHO = 28;

function step(x: number, y: number, z: number, dt: number) {
  // RK4 for Lorenz
  const f = (X: number, Y: number, Z: number) => [
    SIGMA * (Y - X),
    X * (RHO - Z) - Y,
    X * Y - BETA * Z,
  ];
  const [k1x, k1y, k1z] = f(x, y, z);
  const [k2x, k2y, k2z] = f(x + 0.5 * dt * k1x, y + 0.5 * dt * k1y, z + 0.5 * dt * k1z);
  const [k3x, k3y, k3z] = f(x + 0.5 * dt * k2x, y + 0.5 * dt * k2y, z + 0.5 * dt * k2z);
  const [k4x, k4y, k4z] = f(x + dt * k3x, y + dt * k3y, z + dt * k3z);
  return [
    x + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x),
    y + (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y),
    z + (dt / 6) * (k1z + 2 * k2z + 2 * k3z + k4z),
  ];
}

export function LorenzCanvas({ className = "", density = 26, speed = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // initialise particles near a strange-attractor starting region
    type P = { x: number; y: number; z: number; hueShift: number };
    const particles: P[] = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: 0.1 + (Math.random() - 0.5) * 0.4,
        y: 0.0 + (Math.random() - 0.5) * 0.4,
        z: 1.05 + (Math.random() - 0.5) * 0.4,
        hueShift: Math.random() * 30 - 15,
      });
    }

    // project lorenz coords into screen with rotation
    let rotation = 0;
    const projection = (x: number, y: number, z: number) => {
      // centre attractor
      const cx = 0;
      const cy = 0;
      const cz = 25;
      const X = x - cx;
      const Y = y - cy;
      const Z = z - cz;
      // rotate around vertical axis
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const xr = X * cos - Y * sin;
      const yr = X * sin + Y * cos;
      // perspective + scale to canvas
      const scale = Math.min(w, h) * 0.018;
      // x, z primarily; y adds depth
      const screenX = w * 0.5 + xr * scale;
      const screenY = h * 0.5 - Z * scale * 1.05;
      const depth = (yr + 30) / 60; // 0..1ish
      return { screenX, screenY, depth };
    };

    const dt = 0.005 * speed;

    let raf = 0;
    let last = performance.now();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const now = performance.now();
      const elapsed = now - last;
      last = now;

      if (!visible) return;

      // fade existing trails (acts as motion blur)
      const fadeAlpha = theme === "dark" ? 0.1 : 0.12;
      ctx.fillStyle =
        theme === "dark"
          ? `rgba(11, 14, 18, ${fadeAlpha})`
          : `rgba(248, 245, 240, ${fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      const subSteps = reduced ? 1 : 4;

      for (const p of particles) {
        for (let s = 0; s < subSteps; s++) {
          const next = step(p.x, p.y, p.z, dt);
          const a = projection(p.x, p.y, p.z);
          const b = projection(next[0], next[1], next[2]);

          const alpha = 0.45 + 0.55 * a.depth;
          const w0 = 0.6 + a.depth * 1.6;

          // teal accent in dark, deeper teal in light
          const baseHue = 174;
          const sat = theme === "dark" ? 70 : 70;
          const lite = theme === "dark" ? 55 + a.depth * 10 : 32 + a.depth * 8;

          ctx.strokeStyle = `hsla(${baseHue + p.hueShift}, ${sat}%, ${lite}%, ${alpha})`;
          ctx.lineWidth = w0;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(a.screenX, a.screenY);
          ctx.lineTo(b.screenX, b.screenY);
          ctx.stroke();

          [p.x, p.y, p.z] = next;
        }
      }

      rotation += 0.0006 * (elapsed / 16);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [theme, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      data-testid="lorenz-canvas"
      aria-hidden="true"
    />
  );
}
