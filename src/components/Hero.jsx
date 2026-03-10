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
import { ArrowDown, Star, Brush } from 'lucide-react';

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

    const COLORS = ['#c9a84c', '#e8c97a', '#7c6baa', '#c26b6b', '#ffffff'];

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

  // GSAP title animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    );
  }, []);

  const wordVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1, y: 0, rotateX: 0,
      transition: { type: 'spring', damping: 14, stiffness: 100 },
    },
  };

  const titleWords = 'Artist Guide'.split('');

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
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 60%, #12121a 100%)',
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,107,170,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', zIndex: 1,
        background: 'linear-gradient(transparent, var(--dark))',
        pointerEvents: 'none',
      }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: 'relative', zIndex: 10,
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 20px', borderRadius: '50px',
          border: '1px solid var(--border)',
          background: 'rgba(201,168,76,0.08)',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          fontWeight: 600,
        }}
      >
        <Star size={12} fill="currentColor" />
        Complete Step-by-Step Guide
        <Star size={12} fill="currentColor" />
      </motion.div>

      {/* Main title */}
      <div ref={titleRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', opacity: 0 }}>
        <motion.div
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 1,
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '0.2em',
          }}
        >
          {titleWords.map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{
                display: 'inline-block',
                background: char === ' ' ? 'none' : 'linear-gradient(135deg, #f0ece2 30%, var(--gold) 100%)',
                WebkitBackgroundClip: char === ' ' ? 'none' : 'text',
                WebkitTextFillColor: char === ' ' ? 'transparent' : 'transparent',
                backgroundClip: char === ' ' ? 'none' : 'text',
                width: char === ' ' ? '0.4em' : 'auto',
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            margin: '0 auto',
            width: '60%',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        style={{
          position: 'relative', zIndex: 10, textAlign: 'center',
          opacity: 0, maxWidth: '600px', padding: '0 2rem', marginTop: '1.5rem',
        }}
      >
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.18rem)',
          color: 'rgba(180,172,200,0.85)',
          lineHeight: 1.8,
          fontWeight: 400,
          letterSpacing: '0.01em',
        }}>
          Everything you need to start selling your artwork on
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}> Zigguratss</span> —
          from registration to your very first sale, we guide you every step of the way.
        </p>
      </div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          justifyContent: 'center', marginTop: '2.5rem',
          position: 'relative', zIndex: 10,
        }}
      >
        <motion.a
          href="#register"
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.4)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '14px 36px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
            color: '#0a0a0f',
            fontWeight: 700,
            fontSize: '0.95rem',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <Brush size={16} />
          Start Your Journey
        </motion.a>
        <motion.a
          href="#upload"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '14px 36px',
            borderRadius: '50px',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontWeight: 500,
            fontSize: '0.95rem',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
          }}
        >
          Upload Artwork
        </motion.a>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="hero-stats"
        style={{
          display: 'flex', gap: '3rem', flexWrap: 'wrap',
          justifyContent: 'center', marginTop: '4rem',
          position: 'relative', zIndex: 10,
        }}
      >
        {[
          { val: '3', unit: 'Simple Steps', desc: 'To get started' },
          { val: '100%', unit: 'Free', desc: 'Registration' },
          { val: '24/7', unit: 'Support', desc: 'Always here' },
        ].map((s) => (
          <div key={s.unit} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{s.val}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{s.unit}</strong>
              {s.desc}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          color: 'rgba(160,152,128,0.7)', fontSize: '0.62rem', letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ marginBottom: '2px' }}>Scroll</span>
        <ArrowDown size={16} color="rgba(201,168,76,0.7)" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
