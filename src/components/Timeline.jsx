// ─────────────────────────────────────────────────────────────────────────────
// Timeline.jsx  —  4-step overview strip shown beneath the Hero
//
// Renders a horizontal row of milestone cards with:
//   • Animated connector line (scroll-driven scaleX)
//   • GSAP stagger card entrance
//   • Hover lift + bottom shimmer bar per card
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserPlus, Settings, ImagePlus, Megaphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────── //

const MILESTONES = [
  { icon: UserPlus,  label: 'Step 01', title: 'Create Account', color: '#c9a84c', desc: 'Register as an artist with your details and get verified instantly.'       },
  { icon: Settings,  label: 'Step 02', title: 'Setup Profile',  color: '#7c6baa', desc: 'Add your bio, portfolio link, bank details and exhibition history.'         },
  { icon: ImagePlus, label: 'Step 03', title: 'Upload Artwork', color: '#c26b6b', desc: 'Add your artwork with details, minimum 5 images, and submit for review.'   },
  { icon: Megaphone, label: 'Step 04', title: 'Start Selling',  color: '#4bc9a8', desc: 'Once approved by our team, your artwork goes live and starts selling.'     },
];

// ─── Component ───────────────────────────────────────────────────────────── //

export default function Timeline() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardsRef   = useRef([]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'restart none none reset' },
        },
      );

      // Cards stagger entrance
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80, scale: 0.9, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start:   'top 85%',
            toggleActions: 'restart none none reset',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ padding: '7rem 1.5rem', background: 'var(--dark-2)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle animated grid background */}
      <motion.div
        style={{
          position:        'absolute',
          inset:           0,
          pointerEvents:   'none',
          backgroundImage: [
            'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '60px 60px',
          opacity:        gridOpacity,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}>
          <span style={{
            display:       'block',
            fontSize:      '0.75rem',
            fontWeight:    700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color:         'var(--gold)',
            marginBottom:  '0.4rem',
          }}>
            Your Journey
          </span>
          <h2 style={{
            fontSize:               'clamp(2rem, 5vw, 3.2rem)',
            fontFamily:             "'Playfair Display', serif",
            fontWeight:             800,
            marginTop:              '0.8rem',
            background:             'linear-gradient(135deg, var(--text-primary), var(--gold))',
            WebkitBackgroundClip:   'text',
            WebkitTextFillColor:    'transparent',
            backgroundClip:         'text',
          }}>
            From Artist to Seller
          </h2>
          <p style={{
            color:     'var(--text-secondary)',
            fontSize:  '1rem',
            maxWidth:  '500px',
            margin:    '1rem auto 0',
          }}>
            A simple 4-step overview to get your art in front of thousands of collectors.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ position: 'relative' }}>

          {/* Animated horizontal connector line */}
          <motion.div
            style={{
              position:        'absolute',
              top:             '50px',
              left:            '12.5%',
              right:           '12.5%',
              height:          '2px',
              scaleX:          lineScaleX,
              transformOrigin: 'left',
              background:      'linear-gradient(90deg, var(--gold), var(--accent), var(--accent-2), #4bc9a8)',
              zIndex:          0,
            }}
            className="timeline-line"
          />

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap:                 '2rem',
            position:            'relative',
            zIndex:              1,
          }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                ref={(el) => (cardsRef.current[i] = el)}
                whileHover={{ y: -12, boxShadow: `0 24px 60px ${m.color}30`, borderColor: `${m.color}44` }}
                style={{
                  background:     'var(--card-bg)',
                  borderRadius:   '20px',
                  border:         `1px solid ${m.color}18`,
                  padding:        '2rem',
                  position:       'relative',
                  backdropFilter: 'blur(20px)',
                  cursor:         'default',
                  opacity:        0,
                  transition:     'box-shadow 0.4s ease, border-color 0.3s ease',
                }}
              >
                {/* Icon ring */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  style={{
                    width:          60,
                    height:         60,
                    borderRadius:   '50%',
                    background:     `linear-gradient(135deg, ${m.color}33, ${m.color}11)`,
                    border:         `2px solid ${m.color}44`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    marginBottom:   '1.5rem',
                    boxShadow:      `0 0 20px ${m.color}22`,
                    transition:     'box-shadow 0.3s',
                  }}
                >
                  <m.icon size={24} color={m.color} />
                </motion.div>

                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: m.color, fontWeight: 700 }}>
                  {m.label}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--text-primary)', margin: '0.5rem 0 0.8rem' }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {m.desc}
                </p>

                {/* Bottom shimmer on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{
                    position:        'absolute',
                    bottom:          0,
                    left:            '10%',
                    right:           '10%',
                    height:          '2px',
                    background:      `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
                    borderRadius:    '1px',
                    transformOrigin: 'center',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'restart none none reset' } }
      );
      // Cards stagger
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 80, scale: 0.9, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
          duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%', toggleActions: 'restart none none reset' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '7rem 1.5rem', background: 'var(--dark-2)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated grid bg */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}>
          <span
            style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.15em', display: 'block', marginBottom: '0.4rem' }}
          >
            Your Journey
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginTop: '0.8rem', background: 'linear-gradient(135deg, var(--text-primary), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            From Artist to Seller
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>
            A simple 4-step overview to get your art in front of thousands of collectors.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Animated connector line */}
          <motion.div
            style={{
              position: 'absolute', top: '50px', left: '12.5%', right: '12.5%',
              height: '2px', scaleX: lineScaleX, transformOrigin: 'left',
              background: 'linear-gradient(90deg, var(--gold), var(--accent), var(--accent-2), #4bc9a8)',
              zIndex: 0,
            }}
            className="timeline-line"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                ref={el => cardsRef.current[i] = el}
                whileHover={{ y: -12, boxShadow: `0 24px 60px ${m.color}30`, borderColor: `${m.color}44` }}
                style={{
                  background: 'var(--card-bg)', borderRadius: '20px',
                  border: `1px solid ${m.color}18`, padding: '2rem',
                  position: 'relative', backdropFilter: 'blur(20px)',
                  cursor: 'default', opacity: 0,
                  transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
                }}
              >
                {/* Animated icon ring */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.color}33, ${m.color}11)`,
                    border: `2px solid ${m.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: `0 0 20px ${m.color}22`,
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <m.icon size={24} color={m.color} />
                </motion.div>

                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: m.color, fontWeight: 700 }}>{m.label}</span>
                <h3 style={{ fontSize: '1.2rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--text-primary)', margin: '0.5rem 0 0.8rem' }}>{m.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.desc}</p>

                {/* Hover bottom bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{
                    position: 'absolute', bottom: 0, left: '10%', right: '10%',
                    height: '2px', background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
                    borderRadius: '1px', transformOrigin: 'center',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .timeline-line { display: none !important; } }`}</style>
    </section>
  );
}
