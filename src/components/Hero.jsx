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

  const titleLines = ['Your Art,', 'Your Stage.'];

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
        background: 'linear-gradient(175deg, #0c0c14 0%, #0f0e18 55%, #0a0a10 100%)',
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
        background: 'linear-gradient(transparent, #0c0c14)',
        pointerEvents: 'none',
      }} />

      {/* Top label — feels handwritten/personal */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          position: 'relative', zIndex: 10,
          fontSize: '0.78rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', fontWeight: 600,
          color: 'rgba(184,148,62,0.75)',
          marginBottom: '1.4rem',
        }}
      >
        Zigguratss · Artist Guide
      </motion.p>

      {/* Main title — simple slide up, no letter-by-letter robot feel */}
      <div ref={titleRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {titleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(3.2rem, 9.5vw, 8.5rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              lineHeight: 1.05,
              background: i === 0
                ? 'linear-gradient(135deg, #f0ece2 20%, #d4c4a0 100%)'
                : 'linear-gradient(135deg, #b8943e 0%, #d4aa55 60%, #b8943e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {line}
          </motion.div>
        ))}

        {/* Warm underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(184,148,62,0.6), transparent)',
            margin: '1.2rem auto 0',
            width: '50%',
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
          color: 'rgba(195,188,210,0.78)',
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
            color: 'rgba(220,215,230,0.88)',
            fontWeight: 500,
            fontSize: '0.93rem',
            textDecoration: 'none',
            background: 'rgba(255,255,255,0.04)',
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
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
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
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
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
              fontSize: '0.72rem', color: 'rgba(160,155,185,0.7)',
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
          color: 'rgba(160,152,128,0.6)', fontSize: '0.6rem', letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        <span>scroll</span>
        <ArrowDown size={14} color="rgba(184,148,62,0.6)" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
