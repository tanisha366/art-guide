// CTABanner.jsx – fully responsive
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowUpRight, Upload, DollarSign, Globe, Shield, Star, TrendingUp } from 'lucide-react';

// Custom hook for media query
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

const FEATURES = [
  { icon: Upload, title: 'Easy Upload', desc: 'List your artwork in minutes with our guided upload flow.', color: '#c9a84c' },
  { icon: DollarSign, title: 'Keep 85% Revenue', desc: 'Industry-best artist share — you earn more, always.', color: '#6ee7b7' },
  { icon: Globe, title: 'Global Reach', desc: 'Sell to collectors in 120+ countries from day one.', color: '#818cf8' },
  { icon: Shield, title: 'Secure Payments', desc: 'Stripe-powered escrow means you get paid on every sale.', color: '#f472b6' },
];

const STATS = [
  { value: '10K+', label: 'Active Artists' },
  { value: '50K+', label: 'Works Listed' },
  { value: '120+', label: 'Countries' },
  { value: '85%',  label: 'Artist Share' },
];

export default function CTABanner() {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  useEffect(() => {
    if (!glowRef.current || isMobile) return; // disable glow animation on mobile
    gsap.to(glowRef.current, {
      scale: 1.35, opacity: 0.55,
      duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  }, [isMobile]);

  return (
    <section id="cta" ref={ref} style={{
      padding: isMobile
        ? '4rem 1.5rem'
        : 'clamp(6rem, 10vw, 9rem) clamp(2rem, 5vw, 4rem)',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(170deg, #e8d0a0 0%, #f5ead0 45%, #eedfc0 100%)',
    }}>

      {/* Background effects – simplified on mobile */}
      {!isMobile && (
        <>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: [
              'radial-gradient(ellipse 900px 600px at 15% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
              'radial-gradient(ellipse 700px 700px at 85% 30%, rgba(124,107,170,0.06) 0%, transparent 70%)',
              'radial-gradient(ellipse 600px 400px at 60% 90%, rgba(110,231,183,0.04) 0%, transparent 70%)',
            ].join(','),
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)',
            backgroundSize: '36px 36px', opacity: 0.35,
          }} />
        </>
      )}

      {/* ❌ Removed top and bottom hairlines */}

      {/* Central pulsing glow – hidden on mobile */}
      {!isMobile && (
        <div ref={glowRef} style={{
          position: 'absolute', top: '50%', left: '20%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Main layout – stacks on mobile */}
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : '1fr 1.1fr'),
        gap: isMobile ? '2.5rem' : 'clamp(3rem, 6vw, 5rem)',
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* LEFT – headline & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : -40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '7px 18px', borderRadius: '50px',
            border: '1px solid rgba(201,168,76,0.35)',
            background: 'rgba(201,168,76,0.08)', marginBottom: '1.5rem',
          }}>
            <Star size={11} fill="rgba(201,168,76,0.9)" color="rgba(201,168,76,0.9)" />
            <span style={{
              fontSize: '0.82rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.95)',
            }}>
              Trusted by 10,000+ Artists
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: isMobile ? '2.2rem' : 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800, lineHeight: 1.12, marginBottom: '1.4rem',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #2d1e04 0%, #4a3008 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Ready to Share
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #8a5e10 0%, #c08020 50%, #8a5e10 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Your Artwork
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #2d1e04 0%, #4a3008 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              with the World?
            </span>
          </h2>

          {/* Subtitle */}
          <p style={{
            color: 'rgba(50, 38, 8, 0.82)',
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: 1.8, marginBottom: '2rem',
          }}>
            Join a thriving global community on Zigguratss. Create your free account today
            and start turning your passion into sustainable income — your gallery awaits.
          </p>

          {/* Stats row – wraps on mobile */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: isMobile ? '1rem' : '2rem',
            marginBottom: '2.5rem', padding: isMobile ? '1rem' : '1.5rem',
            borderRadius: '16px',
            background: 'rgba(196,145,42,0.12)',
            border: '1px solid rgba(150,100,10,0.25)',
          }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ minWidth: isMobile ? 'calc(50% - 0.5rem)' : 'auto' }}>
                <div style={{
                  fontSize: isMobile ? '1.4rem' : '1.65rem', fontWeight: 800,
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #c9a84c, #e8d47a)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  lineHeight: 1,
                }}>{value}</div>
                <div style={{
                  fontSize: '0.75rem', color: 'rgba(60, 45, 10, 0.70)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px',
                }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons – stack on mobile */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
            <motion.a
              href="https://zigguratss.com/signup"
              target="_blank"
              rel="noreferrer"
              whileHover={!isMobile && { scale: 1.05, boxShadow: '0 0 50px rgba(201,168,76,0.55)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: isMobile ? '12px 24px' : '14px 36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #c9a84c, #a87c28)',
                color: '#080808', fontWeight: 700,
                fontSize: '0.95rem', letterSpacing: '0.05em',
                textDecoration: 'none',
                boxShadow: '0 4px 28px rgba(201,168,76,0.3)',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Start Selling Free <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="https://zigguratss.com"
              target="_blank"
              rel="noreferrer"
              whileHover={!isMobile && { scale: 1.04, background: 'rgba(255,255,255,0.07)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: isMobile ? '12px 24px' : '14px 32px', borderRadius: '10px',
                color: '#3d2a08',
                fontWeight: 600, fontSize: '0.95rem',
                textDecoration: 'none',
                background: 'rgba(196,145,42,0.15)',
                border: '1px solid rgba(150,100,10,0.35)',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Explore Gallery
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT – feature cards */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : '1fr 1fr'),
            gap: isMobile ? '0.8rem' : '1rem',
          }}
        >
          {FEATURES.map((f, i) => {
            const IconComp = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                whileHover={!isMobile && { y: -6, boxShadow: `0 20px 50px ${f.color}28, 0 0 0 1px ${f.color}30` }}
                style={{
                  padding: isMobile ? '1.2rem' : '1.8rem 1.6rem',
                  borderRadius: '18px',
                  background: 'rgba(255, 248, 225, 0.95)',
                  border: `1.5px solid ${f.color}40`,
                  backdropFilter: 'blur(12px)',
                  cursor: 'default',
                  boxShadow: `0 4px 20px rgba(180, 140, 40, 0.10)`,
                }}
              >
                <div style={{
                  width: isMobile ? 40 : 50, height: isMobile ? 40 : 50,
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${f.color}28, ${f.color}10)`,
                  border: `1.5px solid ${f.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: `0 4px 16px ${f.color}25`,
                }}>
                  <IconComp size={isMobile ? 18 : 20} color={f.color} strokeWidth={2} />
                </div>
                <div style={{
                  fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: 700,
                  color: '#1a1405', marginBottom: '0.4rem',
                }}>
                  {f.title}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.8rem' : '0.875rem',
                  color: 'rgba(50, 38, 8, 0.72)', lineHeight: 1.65,
                }}>
                  {f.desc}
                </div>
                <div style={{
                  marginTop: '0.8rem', height: '2px', borderRadius: '1px',
                  background: `linear-gradient(90deg, ${f.color}55, transparent)`,
                }} />
              </motion.div>
            );
          })}

          {/* Trending ribbon – full width, with clickable button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.7, ease: 'easeOut' }}
            style={{
              gridColumn: '1 / -1',
              padding: isMobile ? '1rem' : '1.25rem 1.5rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))',
              border: '1px solid rgba(201,168,76,0.22)',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
            }}
          >
            <div style={{
              width: isMobile ? 32 : 40, height: isMobile ? 32 : 40,
              borderRadius: '10px',
              background: 'rgba(201,168,76,0.15)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={isMobile ? 16 : 20} color="#c9a84c" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 700, color: '#1a1405' }}>
                Growing Fast
              </div>
              <div style={{ fontSize: isMobile ? '0.8rem' : '0.88rem', color: 'rgba(60, 45, 10, 0.70)' }}>
                +2,400 new artists joined last month. Your next buyer is already here.
              </div>
            </div>
            {/* Join Now button – clickable link */}
            <motion.a
              href="https://zigguratss.com/signup"
              target="_blank"
              rel="noreferrer"
              whileHover={!isMobile && { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                padding: isMobile ? '4px 10px' : '6px 14px',
                borderRadius: '50px',
                fontSize: isMobile ? '0.7rem' : '0.82rem',
                fontWeight: 700,
                color: 'rgba(201,168,76,0.9)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Join Now
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}