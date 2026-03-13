// ─────────────────────────────────────────────────────────────────────────────
// Hero.jsx  —  Full-viewport hero section with canvas particle animation
//
// Animations:
//   • Canvas: floating colored particles + soft radial paint splashes
//   • GSAP: title slide-up + subtitle fade-in on mount
//   • Framer Motion: letter-by-letter title spring, scroll indicator bounce
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { motion }            from 'framer-motion';
import { gsap }              from 'gsap';
import { ArrowDown, Brush, Sparkles } from 'lucide-react';

// ─── Canvas particle colours (warm palette) ──────────────────────────────── //
const PARTICLE_COLORS = ['#c4912a', '#daa840', '#b8943e', '#6d5f9a', '#9a6060', '#d4b896'];
const SPLASH_COLORS   = [
  'rgba(196,145,42,',
  'rgba(184,148,62,',
  'rgba(109,95,154,',
  'rgba(154,96,96,',
];

// ─── Stat badges ─────────────────────────────────────────────────────────── //
const STATS = [
  { value: '10K+',  label: 'Artists' },
  { value: '50K+',  label: 'Artworks' },
  { value: '120+',  label: 'Countries' },
];

// ─── Component ───────────────────────────────────────────────────────────── //
export default function Hero() {
  const canvasRef   = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);

  // ── Canvas: particles + paint splashes ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    // ── Floating dot particles ──────────────────────────────────────────
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x        = Math.random() * W;
        this.y        = Math.random() * H;
        this.r        = Math.random() * 3 + 1;
        this.alpha    = Math.random() * 0.55 + 0.15;
        this.color    = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        this.vx       = (Math.random() - 0.5) * 0.4;
        this.vy       = -(Math.random() * 0.5 + 0.15);
        this.life     = 0;
        this.maxLife  = Math.random() * 300 + 180;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        const p = this.life / this.maxLife;
        this.currentAlpha = this.alpha * Math.sin(p * Math.PI);
        if (this.life >= this.maxLife) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.currentAlpha);
        ctx.fillStyle   = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = this.r * 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Soft radial paint-splash orbs ───────────────────────────────────
    class Splash {
      constructor() { this.reset(); }
      reset() {
        this.x       = Math.random() * W;
        this.y       = Math.random() * H;
        this.r       = Math.random() * 180 + 60;
        this.alpha   = Math.random() * 0.035 + 0.008;
        this.color   = SPLASH_COLORS[Math.floor(Math.random() * SPLASH_COLORS.length)];
        this.vx      = (Math.random() - 0.5) * 0.08;
        this.vy      = (Math.random() - 0.5) * 0.08;
        this.life    = 0;
        this.maxLife = Math.random() * 800 + 400;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life >= this.maxLife) this.reset();
      }
      draw() {
        ctx.save();
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, this.color + this.alpha + ')');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 90 }, () => new Particle());
    const splashes  = Array.from({ length: 7  }, () => new Splash());
    let raf;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      splashes.forEach(s  => { s.update(); s.draw(); });
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ── GSAP entrance animations ─────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 1 }
      );
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0,  duration: 0.8 },
        '-=0.4'
      );
    }
    return () => tl.kill();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position:       'relative',
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
        padding:        'clamp(7rem, 12vh, 10rem) clamp(2rem, 6vw, 7rem) clamp(5rem, 8vh, 7rem)',
        background:     'linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 60%, var(--dark-3) 100%)',
        textAlign:      'center',
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Warm ambient glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:      'absolute',
          top:           '35%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          width:         '700px',
          height:        '700px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(196,145,42,0.14) 0%, rgba(109,95,154,0.08) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex:        1,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.10, 0.20, 0.10], x: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          position:      'absolute',
          right:         '-8%',
          top:           '15%',
          width:         '480px',
          height:        '480px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(196,145,42,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex:        1,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.18, 0.08], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position:      'absolute',
          left:          '-8%',
          bottom:        '10%',
          width:         '500px',
          height:        '500px',
          borderRadius:  '50%',
          background:    'radial-gradient(circle, rgba(109,95,154,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex:        1,
        }}
      />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px' }}>

        {/* Label pill */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '10px',
            fontSize:       '0.78rem',
            letterSpacing:  '0.22em',
            textTransform:  'uppercase',
            fontWeight:     700,
            color:          'var(--gold)',
            marginBottom:   '1.8rem',
            padding:        '6px 18px',
            borderRadius:   '50px',
            border:         '1px solid rgba(196,145,42,0.30)',
            background:     'rgba(196,145,42,0.08)',
          }}
        >
          <Brush size={13} strokeWidth={2.5} />
          Zigguratss · Artist Guide
          <Brush size={13} strokeWidth={2.5} />
        </motion.p>

        {/* Title block */}
        <div ref={titleRef} style={{ opacity: 0 }}>
          {/* Italic "Artist" */}
          <div
            style={{
              fontSize:       'clamp(2.8rem, 7vw, 5.5rem)',
              fontFamily:     "'Playfair Display', serif",
              fontWeight:     400,
              fontStyle:      'italic',
              lineHeight:     1,
              letterSpacing:  '0.03em',
              color:          'var(--gold)',
              marginBottom:   '0.05em',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '1rem',
            }}
          >
            Artist
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <rect x="7" y="0.5" width="9" height="9" rx="0.5" transform="rotate(45 7 0.5)" fill="rgba(196,145,42,0.7)" />
            </svg>
          </div>

          {/* Big "Guide" */}
          <div
            style={{
              fontSize:             'clamp(5rem, 16vw, 12rem)',
              fontFamily:           "'Playfair Display', serif",
              fontWeight:           900,
              lineHeight:           0.88,
              letterSpacing:        '-0.03em',
              background:           'linear-gradient(135deg, var(--text-primary) 0%, var(--gold) 50%, var(--gold-dark) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            Guide
          </div>

          {/* Underline bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width:           'clamp(100px, 24vw, 320px)',
              height:          '3px',
              background:      'linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)',
              borderRadius:    '2px',
              margin:          '1.2rem auto 0',
              transformOrigin: 'center',
              boxShadow:       '0 0 12px rgba(196,145,42,0.45)',
            }}
          />
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} style={{ opacity: 0, marginTop: '2rem' }}>
          <p
            style={{
              fontSize:   'clamp(1rem, 2.2vw, 1.15rem)',
              color:      'var(--text-secondary)',
              lineHeight: 1.85,
              fontWeight: 400,
              maxWidth:   '560px',
              margin:     '0 auto',
            }}
          >
            We&rsquo;ve put together everything a new artist needs to get set up on Zigguratss &mdash;
            no confusion, no guesswork. Just follow along and you&rsquo;ll be up and selling in no time.
          </p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.4rem' }}
        >
          <motion.a
            href="https://zigguratss.com/signup"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(196,145,42,0.40), 0 8px 24px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '14px 36px',
              borderRadius:   '10px',
              background:     'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              color:          '#fff8ee',
              fontWeight:     700,
              fontSize:       '0.95rem',
              textDecoration: 'none',
              letterSpacing:  '0.04em',
              boxShadow:      '0 4px 20px rgba(196,145,42,0.28)',
            }}
          >
            Start Selling Free
          </motion.a>
          <motion.a
            href="#timeline"
            whileHover={{ scale: 1.05, borderColor: 'var(--gold)', background: 'rgba(196,145,42,0.10)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '14px 32px',
              borderRadius:   '10px',
              border:         '1px solid rgba(196,145,42,0.35)',
              color:          'var(--gold)',
              fontWeight:     600,
              fontSize:       '0.95rem',
              textDecoration: 'none',
              background:     'rgba(196,145,42,0.06)',
            }}
          >
            See How It Works
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          style={{
            display:        'flex',
            justifyContent: 'center',
            marginTop:      '3rem',
            background:     'rgba(196,145,42,0.06)',
            borderRadius:   '16px',
            border:         '1px solid rgba(196,145,42,0.18)',
            backdropFilter: 'blur(16px)',
            overflow:       'hidden',
            maxWidth:       '420px',
            margin:         '3rem auto 0',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                flex:        1,
                padding:     '1.2rem 1rem',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(196,145,42,0.14)' : 'none',
              }}
            >
              <div style={{
                fontSize:   '1.6rem',
                fontWeight: 800,
                fontFamily: "'Playfair Display', serif",
                color:      'var(--gold)',
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize:      '0.72rem',
                color:         'var(--text-secondary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop:     '4px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position:       'absolute',
          bottom:         '2rem',
          left:           '50%',
          transform:      'translateX(-50%)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '6px',
          zIndex:         10,
        }}
      >
        <span style={{
          fontSize:      '0.58rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(196,145,42,0.55)',
          fontWeight:    700,
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} color="rgba(196,145,42,0.50)" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Floating sparkles */}
      {[
        { top: '18%', left: '8%',  size: 18, delay: 0 },
        { top: '28%', right: '7%', size: 14, delay: 0.6 },
        { top: '70%', left: '6%',  size: 12, delay: 1.2 },
        { top: '65%', right: '9%', size: 16, delay: 0.3 },
      ].map((sp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5], rotate: [0, 180, 360] }}
          transition={{ delay: sp.delay + 1, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', ...sp, zIndex: 2, pointerEvents: 'none' }}
        >
          <Sparkles size={sp.size} color="rgba(196,145,42,0.65)" />
        </motion.div>
      ))}
    </section>
  );
}
