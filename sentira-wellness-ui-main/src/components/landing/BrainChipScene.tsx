"use client";
/**
 * BrainChipScene.tsx
 * Replicates: golden glowing brain sitting on a dark circuit-board chip,
 * with pulsing circuit traces, floating data particles — all Canvas, no video.
 */

import React, { useEffect, useRef } from "react";

interface Props {
  isActive: boolean;
}

export default function BrainChipScene({ isActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

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

    // ── Circuit trace lines radiating from centre chip
    const NUM_TRACES = 20;
    const traces = Array.from({ length: NUM_TRACES }, (_, i) => {
      const angle = (i / NUM_TRACES) * Math.PI * 2;
      const bends = Math.floor(Math.random() * 2) + 1;
      return {
        angle,
        bends,
        len: 0.18 + Math.random() * 0.22,    // fraction of W
        alpha: 0.25 + Math.random() * 0.45,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
        dotPos: Math.random(),                 // travelling dot position 0→1
        dotSpeed: 0.003 + Math.random() * 0.005,
      };
    });

    // ── Floating data particles above the chip
    const NUM_DATA = 40;
    const data = Array.from({ length: NUM_DATA }, () => ({
      x:     Math.random(),
      y:     0.05 + Math.random() * 0.5,
      vx:    (Math.random() - 0.5) * 0.0003,
      vy:   -(0.0001 + Math.random() * 0.0002),
      alpha: 0.2 + Math.random() * 0.6,
      size:  0.8 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── Brain folds (bezier paths, pre-computed relative coords)
    const BRAIN_FOLDS = [
      // left hemisphere folds
      { p: [[-0.06,-0.18],[- 0.14,-0.10],[-0.17, 0.02],[-0.12, 0.10]] },
      { p: [[-0.04,-0.08],[-0.12,-0.01],[-0.13, 0.08],[-0.08, 0.14]] },
      { p: [[-0.14,-0.04],[-0.19, 0.04],[-0.18, 0.12],[-0.12, 0.17]] },
      // right hemisphere folds
      { p: [[ 0.06,-0.18],[ 0.14,-0.10],[ 0.17, 0.02],[ 0.12, 0.10]] },
      { p: [[ 0.04,-0.08],[ 0.12,-0.01],[ 0.13, 0.08],[ 0.08, 0.14]] },
      { p: [[ 0.14,-0.04],[ 0.19, 0.04],[ 0.18, 0.12],[ 0.12, 0.17]] },
    ];

    let t = 0;

    const draw = () => {
      t += 0.012;
      const W  = canvas.width;
      const H  = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const sc = Math.min(W, H) / 600;

      ctx.clearRect(0, 0, W, H);

      // ── Dark background
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, H * 0.9);
      bgGrad.addColorStop(0,   "rgba(10,20,18,1)");
      bgGrad.addColorStop(0.6, "rgba(5,12,10,1)");
      bgGrad.addColorStop(1,   "rgba(2,6,5,1)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Chip body
      const chipW = 200 * sc;
      const chipH =  36 * sc;
      const chipY =  cy + 55 * sc;

      // Chip glow
      const chipGlow = ctx.createRadialGradient(cx, chipY, 0, cx, chipY, chipW * 0.7);
      chipGlow.addColorStop(0,   "rgba(201,168,76,0.28)");
      chipGlow.addColorStop(0.5, "rgba(10,140,122,0.12)");
      chipGlow.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = chipGlow;
      ctx.fillRect(0, 0, W, H);

      // Chip rectangle
      ctx.fillStyle = "rgba(16,36,28,0.95)";
      ctx.strokeStyle = "rgba(201,168,76,0.7)";
      ctx.lineWidth = 2 * sc;
      ctx.beginPath();
      ctx.roundRect(cx - chipW / 2, chipY - chipH / 2, chipW, chipH, 6 * sc);
      ctx.fill();
      ctx.stroke();

      // Chip label text
      ctx.font        = `${9 * sc}px 'Courier New', monospace`;
      ctx.fillStyle   = "rgba(201,168,76,0.55)";
      ctx.textAlign   = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SENTIRA · AI · v2.4 · WELLNESS", cx, chipY);

      // Chip corner markers
      const corners = [
        [cx - chipW / 2 + 8 * sc, chipY - chipH / 2 + 8 * sc],
        [cx + chipW / 2 - 8 * sc, chipY - chipH / 2 + 8 * sc],
        [cx - chipW / 2 + 8 * sc, chipY + chipH / 2 - 8 * sc],
        [cx + chipW / 2 - 8 * sc, chipY + chipH / 2 - 8 * sc],
      ];
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x!, y!, 3 * sc, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,168,76,0.8)";
        ctx.fill();
      });

      // ── Circuit traces
      traces.forEach(tr => {
        tr.dotPos = (tr.dotPos + tr.dotSpeed) % 1;
        const pulse  = (Math.sin(t * tr.speed + tr.pulse) + 1) * 0.5;
        const maxLen = tr.len * W;

        // Build path: L-shaped with 90-degree bends
        const startX = cx + Math.cos(tr.angle) * chipW * 0.48;
        const startY = chipY + Math.sin(tr.angle) * chipH * 0.48;
        const endX   = cx + Math.cos(tr.angle) * maxLen;
        const endY   = chipY + Math.sin(tr.angle) * (maxLen * 0.6);

        // Midpoint with right-angle bend
        const midX = Math.abs(tr.angle) < Math.PI * 0.5 || Math.abs(tr.angle) > Math.PI * 1.5
          ? endX : startX;
        const midY = Math.abs(tr.angle) < Math.PI * 0.5 || Math.abs(tr.angle) > Math.PI * 1.5
          ? startY : endY;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(midX,   midY);
        ctx.lineTo(endX,   endY);
        ctx.strokeStyle = `rgba(10,140,122,${tr.alpha * (0.4 + pulse * 0.6)})`;
        ctx.lineWidth   = 1.2 * sc;
        ctx.stroke();

        // Travelling energy dot
        const dotFrac   = tr.dotPos;
        const halfLen   = 0.5;
        let dotX: number, dotY: number;
        if (dotFrac < halfLen) {
          const f = dotFrac / halfLen;
          dotX = startX + (midX - startX) * f;
          dotY = startY + (midY - startY) * f;
        } else {
          const f = (dotFrac - halfLen) / halfLen;
          dotX = midX + (endX - midX) * f;
          dotY = midY + (endY - midY) * f;
        }

        ctx.beginPath();
        ctx.arc(dotX, dotY, 3 * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${0.6 + pulse * 0.4})`;
        ctx.shadowColor = "rgba(201,168,76,0.9)";
        ctx.shadowBlur  = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // End node dot
        ctx.beginPath();
        ctx.arc(endX, endY, 2.5 * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,140,122,${tr.alpha})`;
        ctx.fill();
      });

      // ── Brain body
      const brainCy = cy - 55 * sc;
      const brainRx = 100 * sc;
      const brainRy =  82 * sc;

      // Brain outer glow layers
      for (let g = 4; g >= 0; g--) {
        const spread = g * 14 * sc;
        const alpha  = 0.04 + (4 - g) * 0.06;
        const gGrad  = ctx.createRadialGradient(cx, brainCy, 0, cx, brainCy, brainRx + spread);
        gGrad.addColorStop(0,   `rgba(255,220,100,${alpha * 1.5})`);
        gGrad.addColorStop(0.5, `rgba(201,168,76,${alpha})`);
        gGrad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = gGrad;
        ctx.beginPath();
        ctx.ellipse(cx, brainCy, brainRx + spread, brainRy + spread, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Brain fill
      const brainFill = ctx.createRadialGradient(cx - 20 * sc, brainCy - 20 * sc, 0, cx, brainCy, brainRx);
      brainFill.addColorStop(0,   "rgba(255,230,130,0.85)");
      brainFill.addColorStop(0.35, "rgba(201,168,76,0.75)");
      brainFill.addColorStop(0.7, "rgba(150,110,40,0.6)");
      brainFill.addColorStop(1,   "rgba(80,55,15,0.4)");
      ctx.fillStyle = brainFill;
      ctx.beginPath();
      // Left hemisphere
      ctx.ellipse(cx - 5 * sc, brainCy, brainRx * 0.55, brainRy, 0.15, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fill();
      // Right hemisphere
      ctx.beginPath();
      ctx.ellipse(cx + 5 * sc, brainCy, brainRx * 0.55, brainRy, -0.15, Math.PI * 1.5, Math.PI * 0.5);
      ctx.fill();

      // Brain centre divider
      ctx.beginPath();
      ctx.moveTo(cx, brainCy - brainRy * 0.85);
      ctx.lineTo(cx, brainCy + brainRy * 0.85);
      ctx.strokeStyle = "rgba(80,50,10,0.5)";
      ctx.lineWidth   = 2 * sc;
      ctx.stroke();

      // Brain folds (bezier curves)
      BRAIN_FOLDS.forEach(fold => {
        const [p0, p1, p2, p3] = fold.p;
        ctx.beginPath();
        ctx.moveTo(cx + p0![0] * brainRx * 2, brainCy + p0![1] * brainRy * 2);
        ctx.bezierCurveTo(
          cx + p1![0] * brainRx * 2, brainCy + p1![1] * brainRy * 2,
          cx + p2![0] * brainRx * 2, brainCy + p2![1] * brainRy * 2,
          cx + p3![0] * brainRx * 2, brainCy + p3![1] * brainRy * 2,
        );
        ctx.strokeStyle = "rgba(80,50,10,0.55)";
        ctx.lineWidth   = 2.5 * sc;
        ctx.stroke();
        // Gold fold highlight
        ctx.strokeStyle = "rgba(255,210,80,0.25)";
        ctx.lineWidth   = 1 * sc;
        ctx.stroke();
      });

      // ── Stem connecting brain to chip
      const stemGrad = ctx.createLinearGradient(cx, brainCy + brainRy * 0.85, cx, chipY - chipH / 2);
      stemGrad.addColorStop(0,   "rgba(201,168,76,0.6)");
      stemGrad.addColorStop(0.5, "rgba(10,140,122,0.4)");
      stemGrad.addColorStop(1,   "rgba(201,168,76,0.7)");
      ctx.beginPath();
      ctx.moveTo(cx - 6 * sc, brainCy + brainRy * 0.82);
      ctx.lineTo(cx - 4 * sc, chipY - chipH * 0.45);
      ctx.lineTo(cx + 4 * sc, chipY - chipH * 0.45);
      ctx.lineTo(cx + 6 * sc, brainCy + brainRy * 0.82);
      ctx.closePath();
      ctx.fillStyle   = stemGrad;
      ctx.fill();
      // Stem glow pulse
      const stemPulse = (Math.sin(t * 2) + 1) * 0.5;
      ctx.shadowColor = `rgba(201,168,76,${0.4 + stemPulse * 0.5})`;
      ctx.shadowBlur  = 10;
      ctx.fill();
      ctx.shadowBlur  = 0;

      // ── Floating data particles
      data.forEach(d => {
        d.y += d.vy;
        d.x += d.vx;
        if (d.y < 0)  d.y = 0.55 + Math.random() * 0.1;
        if (d.x < 0)  d.x = 1;
        if (d.x > 1)  d.x = 0;

        const flk  = (Math.sin(t * 2 + d.phase) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.size * sc, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(201,168,76,${d.alpha * (0.4 + flk * 0.6)})`;
        ctx.shadowColor = "rgba(201,168,76,0.7)";
        ctx.shadowBlur  = 5;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // ── Brain top glow pulse
      const brainPulse = (Math.sin(t * 1.5) + 1) * 0.5;
      const topGlow    = ctx.createRadialGradient(cx, brainCy - brainRy, 0, cx, brainCy - brainRy, 55 * sc);
      topGlow.addColorStop(0,   `rgba(255,240,160,${0.4 + brainPulse * 0.3})`);
      topGlow.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, W, H);

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
