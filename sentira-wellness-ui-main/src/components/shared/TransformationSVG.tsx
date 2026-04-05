// TransformationSVG.tsx
// Inspired by the uploaded hero image:
// Bottom half: deep violet/night, hunched figure with glowing orb
// Middle:       explosive lavender colour burst spiralling upward
// Top half:     bright lavender/ivory meadow, figure with arms open

import React from "react";
import styles from "@/components/landing/HeroSection.module.scss";

const TransformationSVG: React.FC = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
  >
    <defs>
      {/* Lavender gradient — the colour burst trail */}
      <linearGradient id="rainbowTrail" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%"   stopColor="#5b3d8a" stopOpacity="0.9" />   {/* Violet Mid */}
        <stop offset="16%"  stopColor="#9b7fd4" stopOpacity="0.85" />  {/* Lavender */}
        <stop offset="33%"  stopColor="#c4b0e8" stopOpacity="0.9" />   {/* Lilac */}
        <stop offset="50%"  stopColor="#d4a0c0" stopOpacity="0.85" />  {/* Mauve */}
        <stop offset="66%"  stopColor="#9b7fd4" stopOpacity="0.9" />
        <stop offset="83%"  stopColor="#c4b0e8" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#f7f4ff" stopOpacity="0.8" />   {/* Warm Ivory */}
      </linearGradient>

      {/* Central orb radial */}
      <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="30%"  stopColor="#c4b0e8" stopOpacity="0.8" />
        <stop offset="70%"  stopColor="#5b3d8a" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#1A1626" stopOpacity="0" />
      </radialGradient>

      {/* Deep Violet Night gradient for bottom */}
      <linearGradient id="stormGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#2c2438" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#1A1626" stopOpacity="0.8" />
      </linearGradient>

      {/* Bright Lavender top gradient */}
      <linearGradient id="brightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#9b7fd4" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#f7f4ff" stopOpacity="0.15" />
      </linearGradient>

      {/* Glow filter */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Strong glow */}
      <filter id="strongGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Clip for top/bottom halves */}
      <clipPath id="topHalf">
        <rect x="0" y="0" width="400" height="190" />
      </clipPath>
      <clipPath id="bottomHalf">
        <rect x="0" y="210" width="400" height="190" />
      </clipPath>
    </defs>

    {/* ── BACKGROUND SPLIT ──────────────────────────────────────────────── */}

    {/* Top: lavender bright zone */}
    <rect x="0" y="0" width="400" height="190" fill="url(#brightGrad)" rx="16" />

    {/* Bottom: deep violet night zone */}
    <rect x="0" y="210" width="400" height="190" fill="url(#stormGrad)" rx="16" />

    {/* ── TOP HALF — Sunny meadow & open-arms figure ─────────────────────── */}

    {/* Subdued Sun/Light source */}
    <circle cx="200" cy="42" r="22" fill="rgba(155, 127, 212, 0.25)" />
    <circle cx="200" cy="42" r="14" fill="rgba(155, 127, 212, 0.45)" />
    <circle cx="200" cy="42" r="8"  fill="rgba(247, 244, 255, 0.9)" filter="url(#glow)" />

    {/* Rays */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
      <line
        key={i}
        x1={200 + Math.cos((angle) * Math.PI/180) * 19}
        y1={42  + Math.sin((angle) * Math.PI/180) * 19}
        x2={200 + Math.cos((angle) * Math.PI/180) * 29}
        y2={42  + Math.sin((angle) * Math.PI/180) * 29}
        stroke="rgba(155, 127, 212, 0.6)"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={styles.spiralRing}
        style={{ transformOrigin: "200px 42px" }}
      />
    ))}

    {/* Soft Lavender rolling hills */}
    <path d="M0,160 Q60,120 120,135 Q180,150 200,125 Q220,100 280,130 Q340,160 400,145 L400,190 L0,190 Z"
      fill="rgba(155, 127, 212, 0.15)" />
    <path d="M0,170 Q80,145 160,158 Q240,172 320,155 Q360,148 400,160 L400,190 L0,190 Z"
      fill="rgba(212, 160, 192, 0.18)" />

    {/* Flowers (dots) — Keeping some color variety but softer */}
    {[
      {x:60,  y:172, c:"rgba(212, 160, 192, 0.7)", r:3}, // Mauve
      {x:85,  y:165, c:"rgba(196, 176, 232, 0.7)", r:2}, // Lilac
      {x:310, y:165, c:"rgba(212, 160, 192, 0.7)", r:3},
      {x:335, y:172, c:"rgba(155, 127, 212, 0.8)", r:2}, // Lavender
      {x:155, y:175, c:"rgba(155, 127, 212, 0.7)", r:2},
      {x:245, y:168, c:"rgba(196, 176, 232, 0.7)", r:2.5},
    ].map((f, i) => (
      <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.c} />
    ))}

    {/* Open-arms figure at top */}
    <g transform="translate(200, 130)">
      {/* Head */}
      <circle cx="0" cy="-26" r="8" fill="rgba(255,255,255,0.9)" />
      {/* Body */}
      <line x1="0" y1="-18" x2="0" y2="8"
        stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms spread open (triumphant pose) */}
      <path d="M0,-10 Q-22,-18 -38,-10"
        stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M0,-10 Q22,-18 38,-10"
        stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <line x1="0" y1="8" x2="-10" y2="28"
        stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="8" x2="10" y2="28"
        stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Light beams from figure */}
    {[-45,-20,0,20,45].map((angle, i) => (
      <line
        key={i}
        x1={200 + Math.cos((angle - 90) * Math.PI/180) * 14}
        y1={104 + Math.sin((angle - 90) * Math.PI/180) * 14}
        x2={200 + Math.cos((angle - 90) * Math.PI/180) * 55}
        y2={104 + Math.sin((angle - 90) * Math.PI/180) * 55}
        stroke="rgba(196, 176, 232, 0.35)"
        strokeWidth={i === 2 ? 4 : 2}
        strokeLinecap="round"
        className={styles.floatParticle}
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}

    {/* ── CENTRAL COLOUR BURST ───────────────────────────────────────────── */}

    {/* The main lavender spiral trail */}
    <path
      d="M200,195 C195,185 175,175 160,165 C140,152 125,160 130,175
         C135,188 155,188 160,178 C165,168 155,158 148,162
         C138,168 140,183 150,188 C162,194 176,188 180,178"
      stroke="url(#rainbowTrail)"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      className={styles.pathTrail}
      style={{ strokeDasharray: 400 }}
    />

    <path
      d="M200,205 C205,215 225,225 240,235 C260,248 275,240 270,225
         C265,212 245,212 240,222 C235,232 245,242 252,238
         C262,232 260,217 250,212 C238,206 224,212 220,222"
      stroke="url(#rainbowTrail)"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      className={styles.pathTrail}
      style={{ strokeDasharray: 400, animationDelay: "0.3s" }}
    />

    {/* Central glowing orb */}
    <g className={styles.orbCenter}>
      <circle cx="200" cy="200" r="32" fill="url(#orbGrad)" filter="url(#strongGlow)" />
      <circle cx="200" cy="200" r="20" fill="rgba(255,255,255,0.15)" />
      <circle cx="200" cy="200" r="10" fill="rgba(255,255,255,0.5)" />

      {/* Rotating ring */}
      <circle
        cx="200" cy="200" r="40"
        stroke="rgba(196, 176, 232, 0.4)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        fill="none"
        className={styles.spiralRing}
        style={{ transformOrigin: "200px 200px" }}
      />
      <circle
        cx="200" cy="200" r="50"
        stroke="rgba(155, 127, 212, 0.25)"
        strokeWidth="1"
        strokeDasharray="4 8"
        fill="none"
        className={styles.spiralRing}
        style={{ transformOrigin: "200px 200px", animationDirection: "reverse", animationDuration: "8s" }}
      />
    </g>

    {/* Radiating lavender dots from the orb */}
    {[
      {x:165, y:178, c:"#9b7fd4", delay:"0s"},
      {x:235, y:178, c:"#c4b0e8", delay:"0.3s"},
      {x:165, y:222, c:"#d4a0c0", delay:"0.6s"},
      {x:235, y:222, c:"#9b7fd4", delay:"0.9s"},
      {x:200, y:162, c:"#c4b0e8", delay:"0.15s"},
      {x:200, y:238, c:"#d4a0c0", delay:"0.45s"},
    ].map((p, i) => (
      <circle
        key={i} cx={p.x} cy={p.y} r="5"
        fill={p.c}
        filter="url(#glow)"
        className={styles.floatParticle}
        style={{ animationDelay: p.delay }}
      />
    ))}

    {/* ── BOTTOM HALF — deep violet night & hunched figure ─────────────────────── */}

    <g clipPath="url(#bottomHalf)">
      {/* Soft violet mist at bottom */}
      <circle cx="90" cy="240" r="24" fill="rgba(44, 36, 56, 0.55)" />
      <circle cx="112" cy="228" r="30" fill="rgba(26, 22, 38, 0.55)" />
      <circle cx="136" cy="237" r="22" fill="rgba(44, 36, 56, 0.55)" />

      <circle cx="260" cy="243" r="22" fill="rgba(26, 22, 38, 0.45)" />
      <circle cx="282" cy="232" r="28" fill="rgba(44, 36, 56, 0.45)" />
      <circle cx="305" cy="241" r="20" fill="rgba(26, 22, 38, 0.45)" />

      {/* Subtle violet spark */}
      <path
        d="M115,258 L109,274 L117,274 L111,290"
        stroke="rgba(196, 176, 232, 0.4)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={styles.floatParticle}
        style={{ animationDelay: "1s" }}
      />

      {/* Silhouettes — Deep Violet */}
      <rect x="50"  y="310" width="25" height="80" fill="rgba(26, 22, 38, 0.8)" rx="2" />
      <rect x="65"  y="295" width="18" height="95" fill="rgba(44, 36, 56, 0.8)" rx="2" />
      <rect x="82"  y="318" width="20" height="72" fill="rgba(26, 22, 38, 0.6)" rx="2" />
      <rect x="295" y="308" width="22" height="82" fill="rgba(26, 22, 38, 0.8)" rx="2" />
      <rect x="316" y="292" width="20" height="98" fill="rgba(44, 36, 56, 0.8)" rx="2" />
      <rect x="335" y="315" width="18" height="75" fill="rgba(26, 22, 38, 0.6)" rx="2" />

      {/* Building windows (lilac glow) */}
      {[
        {x:55,y:320},{x:55,y:330},{x:60,y:320},{x:60,y:330},
        {x:70,y:303},{x:70,y:313},{x:70,y:323},
        {x:300,y:315},{x:300,y:325},{x:306,y:315},
        {x:320,y:300},{x:320,y:310},{x:320,y:320},
      ].map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="3" height="3"
          fill="rgba(196, 176, 232, 0.3)" rx="0.5" />
      ))}

      {/* Bench */}
      <rect x="165" y="348" width="70" height="5"  fill="rgba(44, 36, 56, 0.7)" rx="2" />
      <rect x="172" y="353" width="5"  height="15" fill="rgba(44, 36, 56, 0.7)" rx="1" />
      <rect x="223" y="353" width="5"  height="15" fill="rgba(44, 36, 56, 0.7)" rx="1" />

      {/* Hunched figure on bench */}
      <g transform="translate(200, 340)">
        {/* Head bowed down */}
        <circle cx="0" cy="-12" r="7" fill="rgba(155, 127, 212, 0.4)" />
        {/* Body hunched */}
        <path d="M0,-5 Q-8,5 -12,15" stroke="rgba(155, 127, 212, 0.3)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M0,-5 Q8,5 12,15"   stroke="rgba(155, 127, 212, 0.3)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Arms folded down */}
        <path d="M-8,2 Q0,6 8,2" stroke="rgba(155, 127, 212, 0.3)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Legs */}
        <line x1="-8" y1="15" x2="-8" y2="30" stroke="rgba(155, 127, 212, 0.3)" strokeWidth="3" strokeLinecap="round" />
        <line x1=" 8" y1="15" x2=" 8" y2="30" stroke="rgba(155, 127, 212, 0.3)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Scattered papers on ground */}
      {[{x:155,y:372,r:-15},{x:235,y:375,r:10},{x:148,y:380,r:5}].map((p,i) => (
        <rect key={i} x={p.x} y={p.y} width="12" height="8"
          fill="rgba(196, 176, 232, 0.1)" rx="1"
          style={{ transform: `rotate(${p.r}deg)`, transformOrigin: `${p.x+6}px ${p.y+4}px` }} />
      ))}
    </g>

    {/* Down arrow */}
    <g className={styles.floatParticle} style={{ animationDelay: "0.5s", animationDuration: "2s" }}>
      <line x1="140" y1="300" x2="140" y2="330"
        stroke="rgba(155, 127, 212, 0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M134,323 L140,335 L146,323"
        stroke="rgba(155, 127, 212, 0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Up arrow */}
    <g className={styles.arrowUp}>
      <line x1="260" y1="100" x2="260" y2="70"
        stroke="rgba(196, 176, 232, 0.7)" strokeWidth="2" strokeLinecap="round" />
      <path d="M254,77 L260,65 L266,77"
        stroke="rgba(196, 176, 232, 0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Dividing line */}
    <line x1="30" y1="200" x2="370" y2="200"
      stroke="rgba(196, 176, 232, 0.15)"
      strokeWidth="1"
      strokeDasharray="6 6"
      className={styles.dashTrail}
    />

    <style>{`
      @keyframes floatUp {
        0%,100% { transform: translateY(0) scale(1); opacity: 0.6; }
        50% { transform: translateY(-14px) scale(1.08); opacity: 1; }
      }
      @keyframes arrowRise {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes spiralSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pathRise {
        0% { stroke-dashoffset: 400; opacity: 0; }
        20% { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes orbBurst {
        0% { transform: scale(0.3); opacity: 0; filter: blur(20px); }
        60% { filter: blur(4px); }
        100% { transform: scale(1); opacity: 1; filter: blur(0); }
      }
      @keyframes dashFlow {
        from { stroke-dashoffset: 0; }
        to { stroke-dashoffset: -24; }
      }
    `}</style>
  </svg>
);

export default TransformationSVG;
