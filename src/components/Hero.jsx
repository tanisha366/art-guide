// ─────────────────────────────────────────────────────────────────────────────
// Hero.jsx  —  Full-viewport hero section with canvas particle animation
//
// Animations:
//   • Canvas: floating colored particles + soft radial paint splashes
//   • GSAP: title slide-up + subtitle fade-in on mount
//   • Framer Motion: letter-by-letter title spring, scroll indicator bounce
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Brush } from 'lucide-react';

export default function Hero() {
  const canvasRef   = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);

  // GSAP canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const COLORS = ['#b8943e', '#d4aa55', '#c8bfa0', '#e8e0cc', '#ffffff'];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 2.5 + 0.4;
        this.alpha = Math.random() * 0.7 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.5 + 0.1);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life = 0;
        this.maxLife = Math.random() * 300 + 150;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        const progress = this.life / this.maxLife;
        this.currentAlpha = this.alpha * (1 - Math.pow(progress, 2));
        if (this.life >= this.maxLife) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.currentAlpha);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Paint splash shapes
    class Splash {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 80 + 20;
        this.alpha = Math.random() * 0.04 + 0.01;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life = 0;
        this.maxLife = Math.random() * 500 + 300;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life >= this.maxLife) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 180 }, () => new Particle());
    const splashes = Array.from({ length: 8 }, () => new Splash());
    let raf;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      splashes.forEach((s) => { s.update(); s.draw(); });
      particles.forEach((p) => { p.update(); p.draw(); });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // Title and subtitle are now animated by Framer Motion directly



  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(175deg, #fffdf7 0%, #fdf5e4 55%, #f7edd0 100%)',
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* ── BG Layer 1: dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(184,148,62,0.18) 1.5px, transparent 1.5px)',
        backgroundSize: '38px 38px',
        opacity: 0.55,
      }} />

      {/* ── BG Layer 2: diagonal ruled lines (like a sketchbook) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(184,148,62,0.07) 0px, rgba(184,148,62,0.07) 1px, transparent 1px, transparent 48px)',
      }} />

      {/* ── BG Layer 3: large faint "Z" watermark behind content ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', zIndex: 2,
        transform: 'translate(-50%, -52%)',
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(28rem, 60vw, 55rem)',
        fontWeight: 900,
        lineHeight: 1,
        color: 'rgba(184,148,62,0.045)',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.05em',
      }}>Z</div>

      {/* ── BG Layer 4: top-left decorative frame corner ── */}
      <svg style={{ position: 'absolute', top: 28, left: 28, zIndex: 2, pointerEvents: 'none', opacity: 0.35 }} width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M4 76 L4 4 L76 4" stroke="#b8943e" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 60 L4 4 L60 4" stroke="#b8943e" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <circle cx="4" cy="4" r="4" fill="#b8943e" opacity="0.7"/>
      </svg>

      {/* ── BG Layer 5: bottom-right decorative frame corner ── */}
      <svg style={{ position: 'absolute', bottom: 28, right: 28, zIndex: 2, pointerEvents: 'none', opacity: 0.35 }} width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M76 4 L76 76 L4 76" stroke="#b8943e" strokeWidth="2" strokeLinecap="round"/>
        <path d="M76 20 L76 76 L20 76" stroke="#b8943e" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <circle cx="76" cy="76" r="4" fill="#b8943e" opacity="0.7"/>
      </svg>

      {/* ── BG Layer 6: floating paint-palette icon left ── */}
      <motion.svg
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 1, rotate: -10 }}
        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', left: 'clamp(2rem, 7vw, 8rem)', top: '22%', zIndex: 2, pointerEvents: 'none' }}
        width="120" height="120" viewBox="0 0 120 120" fill="none"
      >
        <ellipse cx="60" cy="60" rx="52" ry="48" stroke="#b8943e" strokeWidth="1.2" strokeDasharray="6 5" opacity="0.25"/>
        <ellipse cx="60" cy="60" rx="38" ry="34" stroke="#b8943e" strokeWidth="0.8" opacity="0.15"/>
        <circle cx="40" cy="50" r="6" fill="#b8943e" opacity="0.18"/>
        <circle cx="60" cy="38" r="5" fill="#d4aa55" opacity="0.18"/>
        <circle cx="78" cy="50" r="6" fill="#b8943e" opacity="0.14"/>
        <circle cx="75" cy="70" r="5" fill="#d4aa55" opacity="0.16"/>
        <circle cx="45" cy="72" r="6" fill="#b8943e" opacity="0.18"/>
      </motion.svg>

      {/* ── BG Layer 7: floating brush-stroke right ── */}
      <motion.svg
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 1, rotate: 15 }}
        transition={{ delay: 1.0, duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'absolute', right: 'clamp(2rem, 7vw, 8rem)', top: '28%', zIndex: 2, pointerEvents: 'none' }}
        width="90" height="160" viewBox="0 0 90 160" fill="none"
      >
        <path d="M45 10 C20 30, 70 60, 45 90 C20 120, 70 145, 45 155" stroke="#b8943e" strokeWidth="3" strokeLinecap="round" opacity="0.2"/>
        <path d="M45 10 C30 30, 60 60, 45 90 C30 120, 60 145, 45 155" stroke="#d4aa55" strokeWidth="1" strokeLinecap="round" opacity="0.15"/>
        <ellipse cx="45" cy="12" rx="8" ry="5" fill="#b8943e" opacity="0.2" transform="rotate(-10 45 12)"/>
      </motion.svg>

      {/* ── BG Layer 8: small scattered art diamonds ── */}
      {[
        { x: '12%', y: '75%', s: 10, d: 0.6 },
        { x: '88%', y: '18%', s: 8,  d: 0.8 },
        { x: '6%',  y: '42%', s: 6,  d: 0.4 },
        { x: '92%', y: '65%', s: 9,  d: 0.7 },
        { x: '75%', y: '82%', s: 7,  d: 1.0 },
        { x: '22%', y: '15%', s: 8,  d: 0.5 },
      ].map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
          style={{
            position: 'absolute', left: d.x, top: d.y, zIndex: 2, pointerEvents: 'none',
            width: d.s, height: d.s,
            background: 'rgba(184,148,62,0.35)',
            transform: 'rotate(45deg)',
          }}
        />
      ))}

      {/* ── BG Layer 9: warm glow centre ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse 65% 50% at 50% 45%, rgba(255,252,240,0.6) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', zIndex: 3,
        background: 'linear-gradient(transparent, #fffdf7)',
        pointerEvents: 'none',
      }} />

      {/* Main heading — single responsive title */}
      <div ref={titleRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem' }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            background: 'linear-gradient(135deg, #b8943e 0%, #d4aa55 50%, #b8943e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}
        >
          Artist Guide
        </motion.h1>

        {/* Warm underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(184,148,62,0.6), transparent)',
            margin: '1rem auto 0',
            width: '60%',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Subtitle — feels like a real person wrote it */}
      <div
        ref={subtitleRef}
        style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
          maxWidth: '540px', padding: '0 1.5rem', marginTop: '1.8rem',
        }}
      >
        <p style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.12rem)',
          color: 'rgba(70,58,30,0.85)',
          lineHeight: 1.85,
          fontWeight: 400,
        }}>
          We've put together everything a new artist needs to get set up on Zigguratss —
          no confusion, no guesswork. Just follow along and you'll be up and selling in no time.
        </p>
      </div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          justifyContent: 'center', marginTop: '2.8rem',
          position: 'relative', zIndex: 10,
        }}
      >
        <motion.a
          href="#register"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 36px rgba(184,148,62,0.35)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '13px 34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #b8943e, #8a6e2a)',
            color: '#0c0c14',
            fontWeight: 700,
            fontSize: '0.93rem',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <Brush size={15} />
          Get Started
        </motion.a>
        <motion.a
          href="https://zigguratss.com"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04, borderColor: 'rgba(184,148,62,0.5)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '13px 30px',
            borderRadius: '8px',
            border: '1px solid rgba(184,148,62,0.25)',
            color: 'rgba(70,55,25,0.9)',
            fontWeight: 500,
            fontSize: '0.93rem',
            textDecoration: 'none',
            background: 'rgba(184,148,62,0.07)',
          }}
        >
          Visit Zigguratss
        </motion.a>
      </motion.div>

      {/* Stats — simple, honest, monochrome-ish */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="hero-stats"
        style={{
          display: 'flex', gap: '1px', flexWrap: 'wrap',
          justifyContent: 'center', marginTop: '4.5rem',
          position: 'relative', zIndex: 10,
          background: 'rgba(184,148,62,0.06)',
          borderRadius: '12px', overflow: 'hidden',
          border: '1px solid rgba(184,148,62,0.2)',
        }}
      >
        {[
          { val: '4 Steps',   desc: 'From signup to first sale' },
          { val: '100% Free', desc: 'Registration costs nothing' },
          { val: '24 / 7',    desc: 'Support whenever you need' },
        ].map((s, i) => (
          <motion.div
            key={s.val}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 + i * 0.12, duration: 0.6 }}
            style={{
              textAlign: 'center',
              padding: '1.5rem 2.5rem',
              borderRight: i < 2 ? '1px solid rgba(184,148,62,0.2)' : 'none',
              minWidth: '150px',
            }}
          >
            <div style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              color: '#d4aa55',
              lineHeight: 1, marginBottom: '0.5rem',
            }}>{s.val}</div>
            <div style={{
              fontSize: '0.72rem', color: 'rgba(90,72,38,0.75)',
              letterSpacing: '0.05em', lineHeight: 1.4,
            }}>{s.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          color: 'rgba(100,82,45,0.7)', fontSize: '0.6rem', letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        <span>scroll</span>
        <ArrowDown size={14} color="rgba(184,148,62,0.6)" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
