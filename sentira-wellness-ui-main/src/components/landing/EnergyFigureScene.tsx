"use client";
/**
 * EnergyFigureScene.tsx
 * Replicates: glowing golden energy human figure with spiraling light streams,
 * floating particles on a dark cinematic background — all CSS/Canvas, no video needed.
 */

import React, { useEffect, useRef } from "react";

interface Props {
  isActive: boolean;
}

export default function EnergyFigureScene({ isActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Orbit particles
    const NUM_ORBS = 55;
    const orbs = Array.from({ length: NUM_ORBS }, (_, i) => ({
      angle:    (i / NUM_ORBS) * Math.PI * 2,
      orbit:    140 + Math.random() * 120,   // radius
      speed:    0.004 + Math.random() * 0.006,
      size:     1 + Math.random() * 2.5,
      alpha:    0.3 + Math.random() * 0.7,
      tilt:     Math.random() * 0.5,         // vertical squash
      phase:    Math.random() * Math.PI * 2,
    }));

    // ── Floor particles
    const FLOOR_PTS = 30;
    const floor = Array.from({ length: FLOOR_PTS }, () => ({
      x:     Math.random(),
      y:     0.85 + Math.random() * 0.12,
      alpha: 0.2 + Math.random() * 0.6,
      size:  0.8 + Math.random() * 1.8,
      speed: 0.001 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── Light streams (the curving golden lines from the video)
    const NUM_STREAMS = 6;
    const streams = Array.from({ length: NUM_STREAMS }, (_, i) => ({
      angleOffset: (i / NUM_STREAMS) * Math.PI * 2,
      speed:       0.003 + i * 0.001,
      radius:      90 + i * 18,
      tilt:        0.3 + i * 0.08,
      alpha:       0.35 + Math.random() * 0.3,
    }));

    const draw = (ts: number) => {
      tRef.current = ts * 0.001;
      const t  = tRef.current;
      const W  = canvas.width;
      const H  = canvas.height;
      const cx = W / 2;
      const cy = H * 0.46;

      ctx.clearRect(0, 0, W, H);

      // ── Dark background gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, H * 0.8);
      bgGrad.addColorStop(0,   "rgba(12,28,22,1)");
      bgGrad.addColorStop(0.5, "rgba(6,16,12,1)");
      bgGrad.addColorStop(1,   "rgba(2,8,6,1)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Ground glow pool
      const poolGrad = ctx.createRadialGradient(cx, H * 0.82, 0, cx, H * 0.82, W * 0.45);
      poolGrad.addColorStop(0,   "rgba(201,168,76,0.18)");
      poolGrad.addColorStop(0.5, "rgba(10,140,122,0.08)");
      poolGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = poolGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Core body glow (the figure outline)
      const figGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, H * 0.38);
      figGrad.addColorStop(0,    "rgba(255,230,120,0.55)");
      figGrad.addColorStop(0.18, "rgba(201,168,76,0.28)");
      figGrad.addColorStop(0.45, "rgba(10,140,122,0.10)");
      figGrad.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = figGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Human figure silhouette (stylized)
      const scale = H / 600;
      ctx.save();
      ctx.translate(cx, cy);

      // Figure glow filter sim (layered draws)
      for (let layer = 3; layer >= 0; layer--) {
        const spread = layer * 8 * scale;
        const alpha  = 0.08 + (3 - layer) * 0.12;

        ctx.beginPath();
        // Head
        ctx.ellipse(0, -155 * scale, (18 + spread) * scale, (22 + spread) * scale, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,120,${alpha})`;
        ctx.fill();

        // Neck + torso
        ctx.beginPath();
        ctx.moveTo((-10 - spread) * scale, -130 * scale);
        ctx.bezierCurveTo((-28 - spread) * scale, -80 * scale, (-35 - spread) * scale, 0, (-22 - spread) * scale, 80 * scale);
        ctx.bezierCurveTo((-14 - spread) * scale, 120 * scale, (14 + spread) * scale, 120 * scale, (22 + spread) * scale, 80 * scale);
        ctx.bezierCurveTo((35 + spread) * scale, 0, (28 + spread) * scale, -80 * scale, (10 + spread) * scale, -130 * scale);
        ctx.closePath();
        ctx.fillStyle = `rgba(201,168,76,${alpha * 0.8})`;
        ctx.fill();

        // Legs
        ctx.beginPath();
        ctx.moveTo((-8 - spread * 0.5) * scale, 80 * scale);
        ctx.bezierCurveTo((-16 - spread) * scale, 130 * scale, (-14 - spread) * scale, 175 * scale, (-10 - spread) * scale, 210 * scale);
        ctx.lineTo((10 + spread) * scale, 210 * scale);
        ctx.bezierCurveTo((14 + spread) * scale, 175 * scale, (16 + spread) * scale, 130 * scale, (8 + spread * 0.5) * scale, 80 * scale);
        ctx.closePath();
        ctx.fillStyle = `rgba(201,150,60,${alpha * 0.6})`;
        ctx.fill();
      }
      ctx.restore();

      // ── Vertical spine light streak
      const spineGrad = ctx.createLinearGradient(cx, cy - 160 * scale, cx, cy + 215 * scale);
      spineGrad.addColorStop(0,   "rgba(255,240,180,0.6)");
      spineGrad.addColorStop(0.3, "rgba(201,168,76,0.4)");
      spineGrad.addColorStop(0.7, "rgba(10,140,122,0.25)");
      spineGrad.addColorStop(1,   "rgba(201,168,76,0.5)");
      ctx.strokeStyle = spineGrad;
      ctx.lineWidth   = 2 * scale;
      ctx.shadowColor = "rgba(255,230,120,0.8)";
      ctx.shadowBlur  = 12;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 160 * scale);
      ctx.lineTo(cx, cy + 215 * scale);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Spiraling light streams (the golden arcing lines)
      streams.forEach(s => {
        const pts = 80;
        ctx.beginPath();
        for (let p = 0; p <= pts; p++) {
          const frac  = p / pts;
          const angle = s.angleOffset + t * s.speed * Math.PI * 2 + frac * Math.PI * 3;
          const r     = s.radius * scale * (0.6 + frac * 0.8);
          const x     = cx + Math.cos(angle) * r;
          const y     = (cy - 60 * scale) + Math.sin(angle) * r * s.tilt + frac * 220 * scale;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const streamGrad = ctx.createLinearGradient(cx - s.radius * scale, 0, cx + s.radius * scale, H);
        streamGrad.addColorStop(0, `rgba(255,220,100,0)`);
        streamGrad.addColorStop(0.3, `rgba(201,168,76,${s.alpha})`);
        streamGrad.addColorStop(0.7, `rgba(255,200,80,${s.alpha * 0.6})`);
        streamGrad.addColorStop(1, `rgba(201,168,76,0)`);
        ctx.strokeStyle = streamGrad;
        ctx.lineWidth   = (1 + Math.sin(t * 2 + s.angleOffset) * 0.5) * scale;
        ctx.shadowColor = "rgba(201,168,76,0.5)";
        ctx.shadowBlur  = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // ── Orbiting particles
      orbs.forEach(o => {
        o.angle += o.speed;
        const x   = cx + Math.cos(o.angle + o.phase) * o.orbit * scale;
        const y   = (cy - 30 * scale) + Math.sin(o.angle + o.phase) * o.orbit * o.tilt * scale;
        const flk = (Math.sin(t * 3 + o.phase) + 1) * 0.5;

        ctx.beginPath();
        ctx.arc(x, y, o.size * scale * (0.7 + flk * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,80,${o.alpha * (0.5 + flk * 0.5)})`;
        ctx.shadowColor = "rgba(255,215,80,0.8)";
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── Floor sparkle particles
      floor.forEach(f => {
        const x    = f.x * W;
        const y    = f.y * H + Math.sin(t * f.speed * 60 + f.phase) * 4;
        const flk  = (Math.sin(t * 2 + f.phase) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, f.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,80,${f.alpha * flk})`;
        ctx.shadowColor = "rgba(255,215,80,0.6)";
        ctx.shadowBlur  = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── Head halo
      const haloGrad = ctx.createRadialGradient(cx, cy - 155 * scale, 0, cx, cy - 155 * scale, 60 * scale);
      haloGrad.addColorStop(0,   "rgba(255,240,160,0.7)");
      haloGrad.addColorStop(0.3, "rgba(201,168,76,0.3)");
      haloGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - 155 * scale, 60 * scale, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        opacity: isActive ? 1 : 0,
        transition: "opacity 1.4s ease",
      }}
    />
  );
}
