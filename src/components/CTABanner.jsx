// ─────────────────────────────────────────────────────────────────────────────
// CTABanner.jsx  —  "Ready to Share Your Artwork" call-to-action section
// Professional two-column layout: left = headline+CTAs, right = feature cards
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import {
  ArrowUpRight, Upload, DollarSign,
  Globe, Shield, Star, TrendingUp,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Upload,
    title: 'Easy Upload',
    desc: 'List your artwork in minutes with our guided upload flow.',
    color: '#c9a84c',
  },
  {
    icon: DollarSign,
    title: 'Keep 85% Revenue',
    desc: 'Industry-best artist share — you earn more, always.',
    color: '#6ee7b7',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'Sell to collectors in 120+ countries from day one.',
    color: '#818cf8',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'Stripe-powered escrow means you get paid on every sale.',
    color: '#f472b6',
  },
];

const STATS = [
  { value: '10K+', label: 'Active Artists' },
  { value: '50K+', label: 'Works Listed' },
  { value: '120+', label: 'Countries' },
  { value: '85%',  label: 'Artist Share' },
];

export default function CTABanner() {
  const ref     = useRef(null);
  const glowRef = useRef(null);
  const inView  = useInView(ref, { once: false, margin: '-80px' });

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      scale: 1.35, opacity: 0.55,
      duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  }, []);

  return (
    <section ref={ref} style={{
      padding: 'clamp(6rem, 10vw, 9rem) 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(170deg, #fdf8ed 0%, #fffdf7 45%, #faf5e8 100%)',
    }}>

      {/* Radial background washes */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'radial-gradient(ellipse 900px 600px at 15% 50%, rgba(201,168,76,0.09) 0%, transparent 70%)',
          'radial-gradient(ellipse 700px 700px at 85% 30%, rgba(124,107,170,0.07) 0%, transparent 70%)',
          'radial-gradient(ellipse 600px 400px at 60% 90%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        ].join(','),
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(184,148,62,0.2) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px', opacity: 0.45,
      }} />

      {/* Diagonal sketch lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(184,148,62,0.05) 0px, rgba(184,148,62,0.05) 1px, transparent 1px, transparent 52px)',
      }} />

      {/* Top hairline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
      }} />

      {/* Bottom hairline */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
      }} />

      {/* Large faint "Zigguratss" watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', zIndex: 0,
        transform: 'translate(-50%, -50%) rotate(-8deg)',
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(5rem, 14vw, 13rem)',
        fontWeight: 900, whiteSpace: 'nowrap',
        color: 'rgba(184,148,62,0.05)',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '0.04em',
      }}>Zigguratss</div>

      {/* Top-left corner bracket */}
      <svg style={{ position: 'absolute', top: 24, left: 24, pointerEvents: 'none', opacity: 0.3 }} width="70" height="70" viewBox="0 0 70 70" fill="none">
        <path d="M4 66 L4 4 L66 4" stroke="#b8943e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="4" cy="4" r="3.5" fill="#b8943e" opacity="0.8"/>
      </svg>

      {/* Top-right corner bracket */}
      <svg style={{ position: 'absolute', top: 24, right: 24, pointerEvents: 'none', opacity: 0.3 }} width="70" height="70" viewBox="0 0 70 70" fill="none">
        <path d="M66 66 L66 4 L4 4" stroke="#b8943e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="66" cy="4" r="3.5" fill="#b8943e" opacity="0.8"/>
      </svg>

      {/* Bottom-left corner bracket */}
      <svg style={{ position: 'absolute', bottom: 24, left: 24, pointerEvents: 'none', opacity: 0.3 }} width="70" height="70" viewBox="0 0 70 70" fill="none">
        <path d="M4 4 L4 66 L66 66" stroke="#b8943e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="4" cy="66" r="3.5" fill="#b8943e" opacity="0.8"/>
      </svg>

      {/* Bottom-right corner bracket */}
      <svg style={{ position: 'absolute', bottom: 24, right: 24, pointerEvents: 'none', opacity: 0.3 }} width="70" height="70" viewBox="0 0 70 70" fill="none">
        <path d="M66 4 L66 66 L4 66" stroke="#b8943e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="66" cy="66" r="3.5" fill="#b8943e" opacity="0.8"/>
      </svg>

      {/* Floating art-circle ornament left */}
      <motion.svg
        animate={{ rotate: [0, 8, -4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', left: '-3rem', top: '18%', pointerEvents: 'none', opacity: 0.18 }}
        width="200" height="200" viewBox="0 0 200 200" fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="#b8943e" strokeWidth="1.5" strokeDasharray="8 6"/>
        <circle cx="100" cy="100" r="65" stroke="#b8943e" strokeWidth="1" strokeDasharray="4 8"/>
        <circle cx="100" cy="100" r="40" stroke="#d4aa55" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="8" fill="#b8943e" opacity="0.5"/>
      </motion.svg>

      {/* Floating art-circle ornament right */}
      <motion.svg
        animate={{ rotate: [0, -10, 5, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', right: '-2rem', bottom: '12%', pointerEvents: 'none', opacity: 0.15 }}
        width="160" height="160" viewBox="0 0 160 160" fill="none"
      >
        <circle cx="80" cy="80" r="72" stroke="#b8943e" strokeWidth="1.5" strokeDasharray="6 5"/>
        <circle cx="80" cy="80" r="50" stroke="#d4aa55" strokeWidth="1" strokeDasharray="3 7"/>
        <circle cx="80" cy="80" r="28" stroke="#b8943e" strokeWidth="1.5"/>
        <circle cx="80" cy="80" r="6" fill="#d4aa55" opacity="0.5"/>
      </motion.svg>

      {/* Scattered diamond accents */}
      {[
        { x: '5%',  y: '20%', s: 8 },
        { x: '95%', y: '35%', s: 6 },
        { x: '8%',  y: '80%', s: 7 },
        { x: '92%', y: '72%', s: 9 },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: d.x, top: d.y, pointerEvents: 'none',
          width: d.s, height: d.s,
          background: 'rgba(184,148,62,0.3)',
          transform: 'rotate(45deg)',
        }} />
      ))}

      {/* Central pulsing glow */}
      <div ref={glowRef} style={{
        position: 'absolute', top: '50%', left: '20%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main layout */}
      <div style={{
        maxWidth: '1240px', margin: '0 auto',
        padding: '0 clamp(1.5rem, 4vw, 3rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(3rem, 6vw, 5rem)',
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* LEFT — headline & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 18px', borderRadius: '50px',
            border: '1px solid rgba(201,168,76,0.35)',
            background: 'rgba(201,168,76,0.08)', marginBottom: '2rem',
          }}>
            <Star size={11} fill="rgba(201,168,76,0.9)" color="rgba(201,168,76,0.9)" />
            <span style={{
              fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.95)',
            }}>
              Trusted by 10,000+ Artists
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800, lineHeight: 1.12, marginBottom: '1.4rem',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #1a1508 0%, #3d2e0e 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Ready to Share
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8d47a 50%, #c9a84c 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Your Artwork
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #1a1508 0%, #3d2e0e 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              with the World?
            </span>
          </h2>

          {/* Subtitle */}
          <p style={{
            color: 'rgba(80,65,35,0.85)', fontSize: '1.05rem',
            lineHeight: 1.85, maxWidth: '480px', marginBottom: '2.5rem',
          }}>
            Join a thriving global community on Zigguratss. Create your free account today
            and start turning your passion into sustainable income — your gallery awaits.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '2rem',
            marginBottom: '2.8rem', padding: '1.5rem',
            borderRadius: '16px',
            background: 'rgba(184,148,62,0.06)',
            border: '1px solid rgba(184,148,62,0.25)',
          }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontSize: '1.6rem', fontWeight: 800,
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #c9a84c, #e8d47a)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  lineHeight: 1,
                }}>{value}</div>
                <div style={{
                  fontSize: '0.7rem', color: 'rgba(100,80,40,0.7)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px',
                }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.a
              href="https://zigguratss.com/signup"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(201,168,76,0.55)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #c9a84c, #a87c28)',
                color: '#080808', fontWeight: 700,
                fontSize: '0.95rem', letterSpacing: '0.05em',
                textDecoration: 'none',
                boxShadow: '0 4px 28px rgba(201,168,76,0.3)',
              }}
            >
              Start Selling Free <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="https://zigguratss.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, background: 'rgba(184,148,62,0.12)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '10px',
                border: '1px solid rgba(201,168,76,0.25)',
                color: 'rgba(70,55,25,0.9)',
                fontWeight: 500, fontSize: '0.95rem',
                textDecoration: 'none',
                background: 'rgba(184,148,62,0.07)',
              }}
            >
              Explore Gallery
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT — feature cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
        >
          {FEATURES.map((f, i) => {
            const IconComp = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6, boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${f.color}22` }}
                style={{
                  padding: '1.5rem', borderRadius: '16px',
                  background: 'rgba(255,252,242,0.92)',
                  border: `1px solid ${f.color}30`,
                  backdropFilter: 'blur(20px)',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '10px',
                  background: `${f.color}18`, border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: `0 0 20px ${f.color}18`,
                }}>
                  <IconComp size={20} color={f.color} strokeWidth={2} />
                </div>
                <div style={{
                  fontSize: '0.9rem', fontWeight: 700,
                  color: '#1a1508', marginBottom: '0.5rem',
                }}>
                  {f.title}
                </div>
                <div style={{
                  fontSize: '0.78rem', color: 'rgba(90,72,38,0.8)', lineHeight: 1.6,
                }}>
                  {f.desc}
                </div>
                <div style={{
                  marginTop: '1rem', height: '2px', borderRadius: '1px',
                  background: `linear-gradient(90deg, ${f.color}55, transparent)`,
                }} />
              </motion.div>
            );
          })}

          {/* Trending ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.7, ease: 'easeOut' }}
            style={{
              gridColumn: '1 / -1',
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))',
              border: '1px solid rgba(201,168,76,0.22)',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '10px',
              background: 'rgba(201,168,76,0.15)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={20} color="#c9a84c" />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a1508', marginBottom: '2px' }}>
                Growing Fast
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(90,72,38,0.75)', lineHeight: 1.5 }}>
                +2,400 new artists joined last month. Your next buyer is already here.
              </div>
            </div>
            <div style={{
              marginLeft: 'auto', flexShrink: 0,
              background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
              padding: '6px 14px', borderRadius: '50px',
              fontSize: '0.7rem', fontWeight: 700,
              color: 'rgba(201,168,76,0.9)', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Join Now
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
