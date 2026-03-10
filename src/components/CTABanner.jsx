// ─────────────────────────────────────────────────────────────────────────────
// CTABanner.jsx  —  "Ready to Share Your Artwork" call-to-action section
//
// Features:
//   • 8 floating fake art frames (gradient-painted canvases) on left & right
//   • GSAP float animation on each frame
//   • Twinkling star particles across the background
//   • Central card with badge, stats row, and two CTA buttons
//   • Art frames hidden on mobile (≤900px) via .art-frame-side class
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles, ArrowUpRight, Star } from 'lucide-react';

// ─── Fake artwork data (gradient-painted canvas frames)
const fakeArtworks = [
  { id: 1, gradient: 'linear-gradient(135deg,#c9a84c 0%,#8b5e1a 40%,#3d1f0a 100%)', rotate: -12, top: '8%', left: '2%', w: 130, h: 170, label: 'Golden Dusk' },
  { id: 2, gradient: 'linear-gradient(160deg,#1a1a6e 0%,#6b3fa0 50%,#c9a84c 100%)', rotate: 8, top: '55%', left: '0%', w: 115, h: 145, label: 'Cosmos' },
  { id: 3, gradient: 'linear-gradient(120deg,#0d4f3c 0%,#1a8f6e 50%,#a8d5a2 100%)', rotate: -6, top: '20%', left: '7%', w: 105, h: 130, label: 'Forest Mist' },
  { id: 4, gradient: 'linear-gradient(145deg,#7b1a1a 0%,#c44b4b 45%,#f5a623 100%)', rotate: 14, top: '70%', left: '5%', w: 120, h: 155, label: 'Ember' },
  { id: 5, gradient: 'linear-gradient(135deg,#1a3a6b 0%,#4a90d9 50%,#a8d4f5 100%)', rotate: -10, top: '5%', right: '3%', w: 140, h: 175, label: 'Ocean Dream' },
  { id: 6, gradient: 'linear-gradient(150deg,#3d0a47 0%,#9b3dbd 50%,#e8a0f0 100%)', rotate: 9, top: '52%', right: '0%', w: 118, h: 148, label: 'Violet Hour' },
  { id: 7, gradient: 'linear-gradient(125deg,#1a1a1a 0%,#c9a84c 30%,#ffffff 70%,#c9a84c 100%)', rotate: -7, top: '22%', right: '6%', w: 108, h: 138, label: 'Monochrome' },
  { id: 8, gradient: 'linear-gradient(140deg,#0a2a1a 0%,#2d6a4f 40%,#74c69d 80%,#b7e4c7 100%)', rotate: 11, top: '72%', right: '4%', w: 125, h: 158, label: 'Spring Bloom' },
];

const ArtFrame = ({ artwork, delay }) => {
  const frameRef = useRef(null);

  useEffect(() => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, {
      y: -14,
      duration: 3.5 + delay * 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay * 0.3,
    });
  }, [delay]);

  const posStyle = {
    position: 'absolute',
    top: artwork.top,
    left: artwork.left,
    right: artwork.right,
    width: artwork.w,
    zIndex: 0,
  };

  return (
    <div className="art-frame-side" ref={frameRef} style={posStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: artwork.rotate - 10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: artwork.rotate }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: artwork.h,
          borderRadius: '6px',
          background: artwork.gradient,
          border: '4px solid rgba(201,168,76,0.55)',
          boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.18), inset 0 0 30px rgba(0,0,0,0.3)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Canvas texture lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 9px)',
        }} />
        {/* Frame inner shadow */}
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          borderRadius: '2px',
        }} />
        {/* Label tag */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '4px',
          padding: '2px 8px',
          fontSize: '9px',
          color: 'rgba(201,168,76,0.9)',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          fontFamily: "'Playfair Display', serif",
        }}>
          {artwork.label}
        </div>
      </motion.div>
      {/* Hanging wire */}
      <div style={{
        position: 'absolute', top: -14, left: '50%',
        transform: 'translateX(-50%)',
        width: 2, height: 14,
        background: 'linear-gradient(to bottom, rgba(201,168,76,0.7), rgba(201,168,76,0.2))',
      }} />
      <div style={{
        position: 'absolute', top: -16, left: '50%',
        transform: 'translateX(-50%)',
        width: 8, height: 8,
        borderRadius: '50%',
        background: 'rgba(201,168,76,0.8)',
        boxShadow: '0 0 6px rgba(201,168,76,0.6)',
      }} />
    </div>
  );
};

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const glowRef = useRef(null);
  const cardControls = useAnimationControls();
  const iconControls = useAnimationControls();

  // Pulsing glow — always running
  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      scale: 1.4,
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  // Instant reset on leave, smooth animate on enter
  useEffect(() => {
    if (inView) {
      cardControls.start({ opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } });
      iconControls.start({ scale: 1, rotate: 0, transition: { duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 } });
    } else {
      cardControls.set({ opacity: 0, y: 60 });
      iconControls.set({ scale: 0, rotate: -30 });
    }
  }, [inView]); // eslint-disable-line

  return (
    <section ref={ref} style={{
      padding: '9rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--dark) 0%, #0d0b14 50%, var(--dark) 100%)',
      minHeight: '560px',
    }}>

      {/* ── Ambient floor light */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '70%', height: '3px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
        filter: 'blur(2px)',
      }} />

      {/* ── Star particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          style={{
            position: 'absolute',
            top: `${10 + (i * 37) % 80}%`,
            left: `${5 + (i * 53) % 90}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.6)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Floating art frames */}
      {fakeArtworks.map((art, i) => (
        <ArtFrame key={art.id} artwork={art} delay={i} />
      ))}

      {/* ── Central pulsing glow */}
      <div ref={glowRef} style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Main card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={cardControls}
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          background: 'rgba(10,10,20,0.72)',
          borderRadius: '32px',
          border: '1px solid rgba(201,168,76,0.35)',
          padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          backdropFilter: 'blur(28px)',
          boxShadow: '0 0 80px rgba(201,168,76,0.08), 0 30px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top gold shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)',
          filter: 'blur(0.5px)',
        }} />
        {/* Bottom faint line */}
        <div style={{
          position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
        }} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '50px',
            padding: '5px 16px',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            color: 'rgba(201,168,76,0.9)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          <Star size={10} fill="rgba(201,168,76,0.9)" color="rgba(201,168,76,0.9)" />
          Trusted by 10,000+ Artists
          <Star size={10} fill="rgba(201,168,76,0.9)" color="rgba(201,168,76,0.9)" />
        </motion.div>

        {/* Icon orb */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={iconControls}
          style={{
            width: 84, height: 84, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.8rem',
            boxShadow: '0 0 50px rgba(201,168,76,0.5), 0 0 100px rgba(201,168,76,0.2)',
          }}
        >
          <Sparkles size={34} color="#0a0a0f" />
        </motion.div>

        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffffff 0%, var(--gold) 60%, #fff8e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Ready to Share Your<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--gold), #e8c96a)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Artwork</span> with the World?
        </h2>

        <p style={{
          color: 'rgba(185,178,200,0.82)',
          fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
          lineHeight: 1.85,
          maxWidth: '480px',
          margin: '0 auto 2.2rem',
          letterSpacing: '0.01em',
        }}>
          Join a thriving community of artists on Zigguratss. Create your free account today
          and start turning your passion into profit — your gallery awaits.
        </p>

        {/* Social proof row */}
        <div style={{
          display: 'flex', gap: '2rem', justifyContent: 'center',
          marginBottom: '2.5rem', flexWrap: 'wrap',
        }}>
          {[['10K+', 'Artists'], ['50K+', 'Artworks'], ['120+', 'Countries']].map(([num, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.4rem', fontWeight: 800,
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, var(--gold), #e8c96a)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{num}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(180,170,200,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '2.5rem' }} />

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a
            href="https://zigguratss.com/signup"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.07, boxShadow: '0 0 60px rgba(201,168,76,0.55)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '15px 40px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              color: '#0a0a0f',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 24px rgba(201,168,76,0.35)',
            }}
          >
            Join as Artist <ArrowUpRight size={16} />
          </motion.a>
          <motion.a
            href="https://zigguratss.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, borderColor: 'rgba(201,168,76,0.6)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '15px 40px',
              borderRadius: '50px',
              border: '1px solid rgba(201,168,76,0.25)',
              color: 'rgba(220,215,230,0.9)',
              fontWeight: 500,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Explore Artworks
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
