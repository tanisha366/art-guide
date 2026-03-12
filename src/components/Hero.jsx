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

  const titleLines = ['Artist', 'Guide'];

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
        padding: 'clamp(7rem, 12vh, 10rem) clamp(2rem, 6vw, 7rem) clamp(6rem, 10vh, 8rem)',
        background: 'linear-gradient(160deg, #fdfaf4 0%, #f5ead0 60%, #eedd9a 100%)',
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Warm glow centre */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(184,148,62,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', zIndex: 1,
        background: 'linear-gradient(transparent, #f5ead0)',

        pointerEvents: 'none',
      }} />

      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          position: 'relative', zIndex: 10,
          fontSize: '0.78rem', letterSpacing: '0.22em',
          textTransform: 'uppercase', fontWeight: 700,
          color: 'rgba(150, 100, 10, 0.85)',
          marginBottom: '2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        }}
      >
        <span style={{ display: 'inline-block', width: '32px', height: '1.5px', background: 'rgba(196,145,42,0.7)' }} />
        Zigguratss · Artist Guide
        <span style={{ display: 'inline-block', width: '32px', height: '1.5px', background: 'rgba(196,145,42,0.7)' }} />
      </motion.p>

      {/* Main title */}
      <div ref={titleRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>

        {/* Line 1 — thin italic "Artist" */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1,
            letterSpacing: '0.04em',
            color: '#8a5e10',
            marginBottom: '0.1em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem',
          }}
        >
          Artist
          {/* small decorative diamond */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: '0.1em', flexShrink: 0 }}>
            <rect x="7" y="0.5" width="9" height="9" rx="0.5" transform="rotate(45 7 0.5)" fill="rgba(196,145,42,0.6)" />
          </svg>
        </motion.div>

        {/* Line 2 — massive bold "Guide" */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(5.5rem, 16vw, 13rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #1a1408 0%, #7a5010 45%, #c4912a 80%, #e8b830 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Guide
        </motion.div>

        {/* Accent underline bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '1.2rem',
            width: 'clamp(120px, 28vw, 380px)',
            background: 'linear-gradient(90deg, rgba(196,145,42,0.2), #c4912a, #e8b830, #c4912a, rgba(196,145,42,0.2))',
            borderRadius: '2px',
            height: '4px',
            transformOrigin: 'center',
            margin: '1.2rem auto 0',
          }}
        />
      </div>

      {/* Subtitle — feels like a real person wrote it */}
      <div
        ref={subtitleRef}
        style={{
          position: 'relative', zIndex: 10, textAlign: 'center',
          maxWidth: '600px', padding: '0', marginTop: '1.6rem',
        }}
      >
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
          color: 'rgba(50, 38, 8, 0.82)',
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
          justifyContent: 'center', marginTop: '2.4rem',
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
            color: '#1a1405',
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
            border: '1px solid rgba(150,100,10,0.40)',
            color: '#3d2a08',
            fontWeight: 600,
            fontSize: '0.93rem',
            textDecoration: 'none',
            background: 'rgba(196,145,42,0.12)',
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
          justifyContent: 'center', marginTop: '3.5rem',
          border: '1px solid rgba(150,100,10,0.22)',
          position: 'relative', zIndex: 10,
          background: 'rgba(196,145,42,0.12)',
          borderRadius: '12px', overflow: 'hidden',
          border: '1px solid rgba(150,100,10,0.25)',
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
              borderRight: i < 2 ? '1px solid rgba(150,100,10,0.18)' : 'none',
              minWidth: '150px',
            }}
          >
            <div style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              color: '#8a5e10',
              lineHeight: 1, marginBottom: '0.5rem',
            }}>{s.val}</div>
            <div style={{
              fontSize: '0.72rem', color: 'rgba(60, 45, 10, 0.72)',
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
          color: 'rgba(80, 60, 10, 0.65)', fontSize: '0.6rem', letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        <span>scroll</span>
        <ArrowDown size={14} color="rgba(120,85,10,0.7)" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
