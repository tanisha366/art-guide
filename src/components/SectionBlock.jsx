// ─────────────────────────────────────────────────────────────────────────────
// SectionBlock.jsx  —  Full-width two-column guide section
//
// Props:
//   id          {string}   Anchor id (for scroll targeting)
//   number      {string}   Large background letter (A / B / C / D)
//   label       {string}   Badge text  e.g. "Step 1 — Registration"
//   title       {string}   Section heading
//   subtitle    {string}   Paragraph beneath heading
//   steps       {string[]} List of step strings rendered as StepCards
//   icon        {Component}Lucide icon for the badge
//   accentColor {string}   CSS color used for glow, badge & line
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StepCard from './StepCard';

gsap.registerPlugin(ScrollTrigger);

// Random floating particle positions (consistent per render)
const PARTICLES = [
  { top: '10%', left:  '5%',  size: 4 },
  { top: '70%', left:  '8%',  size: 6 },
  { top: '30%', right: '4%',  size: 3 },
  { top: '60%', right: '7%',  size: 5 },
  { top: '85%', left: '15%',  size: 3 },
];

export default function SectionBlock({
  id,
  number,
  label,
  title,
  subtitle,
  steps,
  icon: Icon,
  accentColor = 'var(--gold)',
}) {
  // ─── Refs ——————————————————————————————————————————————————
  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const cardRef      = useRef(null);
  const numRef       = useRef(null);
  const lineRef      = useRef(null);
  const badgeRef     = useRef(null);
  const subtitleRef  = useRef(null);
  const particlesRef = useRef([]);

  // ─── Scroll-driven motion values
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const rawP      = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxY = useSpring(rawP, { stiffness: 50, damping: 18 });
  const glowScale   = useTransform(scrollYProgress, [0, 0.5, 1],       [0.5, 1.4, 0.7]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1],[0, 0.22, 0.22, 0]);
  const rotate3d    = useTransform(scrollYProgress, [0, 0.5, 1],       [-3, 0, 3]);

  // Layout: even-numbered blocks (B, D) mirror text/card sides
  const isEven = number === 'B' || number === 'D';

  // ─── GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger:      sectionRef.current,
        start:        'top 80%',
        end:          'top 20%',
        toggleActions: 'restart none none reset',
      };

      const tl = gsap.timeline({ scrollTrigger: trigger });

      tl
        .fromTo(badgeRef.current,
          { opacity: 0, x: -30, scale: 0.85 },
          { opacity: 1, x:   0, scale: 1,   duration: 0.6, ease: 'back.out(1.7)' }, 0)

        .fromTo(numRef.current,
          { opacity: 0, scale: 0.3, rotation: -20, y: 30 },
          { opacity: 0.07, scale: 1, rotation: 0,  y: 0, duration: 1, ease: 'elastic.out(1, 0.6)' }, 0.1)

        .fromTo(headingRef.current,
          { opacity: 0, y: 60, skewY: 3, filter: 'blur(6px)' },
          { opacity: 1, y:  0, skewY: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out' }, 0.15)

        .fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 0.6)

        .fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y:  0, duration: 0.7, ease: 'power3.out' }, 0.4)

        .fromTo(cardRef.current,
          { opacity: 0, y: 80, rotateX: 12, filter: 'blur(10px)', scale: 0.95 },
          { opacity: 1, y:  0, rotateX:  0, filter: 'blur(0px)',  scale: 1, duration: 1, ease: 'power3.out' }, 0.2);

      // Floating dot particles
      particlesRef.current.forEach((p, i) => {
        if (!p) return;
        gsap.fromTo(p,
          { opacity: 0, scale: 0, y: 0 },
          { opacity: 0.6, scale: 1, y: -30 - i * 15, duration: 1.5 + i * 0.3, ease: 'power2.out', repeat: -1, yoyo: true, delay: i * 0.2 },
        );
        gsap.to(p, {
          x: i % 2 === 0 ? 20 : -20, duration: 2 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── Render
  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        padding:  '7rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: isEven ? 'var(--dark-2)' : 'var(--dark)',
      }}
    >
      {/* Scroll-driven glow orb */}
      <motion.div
        style={{
          position:     'absolute',
          y:            parallaxY,
          scale:        glowScale,
          opacity:      glowOpacity,
          width:        '700px',
          height:       '700px',
          borderRadius: '50%',
          background:   `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          left:         isEven ? 'auto' : '-250px',
          right:        isEven ? '-250px' : 'auto',
          top:          '15%',
          pointerEvents: 'none',
          zIndex:       0,
        }}
      />

      {/* Floating ambient dots */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position:     'absolute',
            ...p,
            width:        p.size,
            height:       p.size,
            borderRadius: '50%',
            background:   accentColor,
            opacity:      0,
            pointerEvents: 'none',
            zIndex:       0,
            boxShadow:    `0 0 ${p.size * 3}px ${accentColor}`,
          }}
        />
      ))}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap:                 '4rem',
          alignItems:         'center',
        }}>

          {/* ─── Text side */}
          <div
            className="section-text-side"
            style={{ order: isEven ? 2 : 1 }}
          >
            {/* Step badge */}
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <div style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '10px',
                padding:      '6px 16px',
                borderRadius: '50px',
                border:       `1px solid ${accentColor}44`,
                background:   `${accentColor}10`,
                marginBottom: '1.5rem',
              }}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width:          28,
                    height:         28,
                    borderRadius:   '50%',
                    background:     `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexShrink:     0,
                  }}
                >
                  <Icon size={14} color="#0a0a0f" strokeWidth={2.5} />
                </motion.div>
                <span style={{
                  fontSize:      '0.75rem',
                  fontWeight:    700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         accentColor,
                  whiteSpace:    'nowrap',
                }}>
                  {label}
                </span>
              </div>
            </div>

            {/* Large background letter */}
            <div
              ref={numRef}
              style={{
                fontFamily:    "'Playfair Display', serif",
                fontSize:      'clamp(6rem, 15vw, 12rem)',
                fontWeight:    900,
                color:         accentColor,
                lineHeight:    0.8,
                marginBottom:  '-0.3em',
                userSelect:    'none',
                pointerEvents: 'none',
                opacity:       0,
              }}
            >
              {number}
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              style={{
                fontSize:   'clamp(1.8rem, 4vw, 2.6rem)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                color:      'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '1rem',
                opacity:    0,
              }}
            >
              {title}
              <span
                ref={lineRef}
                style={{
                  display:         'block',
                  height:          '3px',
                  width:           '60px',
                  background:      `linear-gradient(90deg, ${accentColor}, transparent)`,
                  marginTop:       '14px',
                  transformOrigin: 'left',
                  transform:       'scaleX(0)',
                }}
              />
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '480px', opacity: 0 }}
            >
              {subtitle}
            </p>
          </div>

          {/* ─── Card side */}
          <div
            ref={cardRef}
            className="section-card-side"
            style={{ order: isEven ? 1 : 2, opacity: 0 }}
          >
            <motion.div
              whileHover={{ boxShadow: `0 40px 100px ${accentColor}28` }}
              style={{
                background:     'var(--card-bg)',
                borderRadius:   '24px',
                border:         '1px solid var(--border)',
                backdropFilter: 'blur(20px)',
                padding:        '2rem',
                position:       'relative',
                overflow:       'hidden',
                transition:     'box-shadow 0.4s ease',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position:   'absolute',
                top: 0, left: 0, right: 0,
                height:     '1px',
                background: `linear-gradient(90deg, transparent, ${accentColor}88, transparent)`,
              }} />

              {/* Corner glow */}
              <motion.div
                animate={{ opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position:     'absolute',
                  top:          0,
                  right:        0,
                  width:        '180px',
                  height:       '180px',
                  background:   `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  transform:    'translate(50px, -50px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Step rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {steps.map((step, i) => (
                  <StepCard key={i} number={i + 1} text={step} delay={i * 0.06} />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const numRef = useRef(null);
  const lineRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const particlesRef = useRef([]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const rawP = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxY = useSpring(rawP, { stiffness: 50, damping: 18 });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.4, 0.7]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 0.22, 0.22, 0]);
  const rotate3d = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'restart none none reset',
        },
      });

      tl.fromTo(badgeRef.current,
        { opacity: 0, x: -30, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, 0
      )
      .fromTo(numRef.current,
        { opacity: 0, scale: 0.3, rotation: -20, y: 30 },
        { opacity: 0.07, scale: 1, rotation: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.6)' }, 0.1
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 60, skewY: 3, filter: 'blur(6px)' },
        { opacity: 1, y: 0, skewY: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out' }, 0.15
      )
      .fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 0.6
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.4
      )
      .fromTo(cardRef.current,
        { opacity: 0, y: 80, rotateX: 12, filter: 'blur(10px)', scale: 0.95 },
        { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', scale: 1, duration: 1, ease: 'power3.out' }, 0.2
      );

      // Floating particles
      particlesRef.current.forEach((p, i) => {
        if (!p) return;
        gsap.fromTo(p,
          { opacity: 0, scale: 0, y: 0 },
          {
            opacity: 0.6, scale: 1, y: -30 - i * 15,
            duration: 1.5 + i * 0.3, ease: 'power2.out',
            repeat: -1, yoyo: true, delay: i * 0.2,
          }
        );
        gsap.to(p, {
          x: (i % 2 === 0 ? 20 : -20), duration: 2 + i * 0.4,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3,
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const isEven = number === 'B' || number === 'D';

  // Random particle positions
  const particles = [
    { top: '10%', left: '5%', size: 4 },
    { top: '70%', left: '8%', size: 6 },
    { top: '30%', right: '4%', size: 3 },
    { top: '60%', right: '7%', size: 5 },
    { top: '85%', left: '15%', size: 3 },
  ];

  return (
    <section id={id} ref={sectionRef} style={{ padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden', background: isEven ? 'var(--dark-2)' : 'var(--dark)' }}>
      {/* Scroll-driven glow orb */}
      <motion.div style={{
        position: 'absolute', y: parallaxY, scale: glowScale, opacity: glowOpacity,
        width: '700px', height: '700px', borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        left: isEven ? 'auto' : '-250px', right: isEven ? '-250px' : 'auto',
        top: '15%', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Floating dots */}
      {particles.map((p, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute', ...p,
            width: p.size, height: p.size,
            borderRadius: '50%', background: accentColor,
            opacity: 0, pointerEvents: 'none', zIndex: 0,
            boxShadow: `0 0 ${p.size * 3}px ${accentColor}`,
          }}
        />
      ))}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          {/* Text side */}
          <div className="section-text-side" style={{ order: isEven ? 2 : 1 }}>
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '6px 16px', borderRadius: '50px',
                border: `1px solid ${accentColor}44`, background: `${accentColor}10`,
                marginBottom: '1.5rem',
              }}>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
                  style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color="#0a0a0f" strokeWidth={2.5} />
                </motion.div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentColor, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
            </div>

            <div ref={numRef} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, color: accentColor, lineHeight: 0.8, marginBottom: '-0.3em', userSelect: 'none', pointerEvents: 'none', opacity: 0 }}>
              {number}
            </div>

            <h2
              ref={headingRef}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontFamily: "'Playfair Display', serif", fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '1rem', opacity: 0 }}
            >
              {title}
              <span ref={lineRef} style={{ display: 'block', height: '3px', width: '60px', background: `linear-gradient(90deg, ${accentColor}, transparent)`, marginTop: '14px', transformOrigin: 'left', transform: 'scaleX(0)' }} />
            </h2>

            <p ref={subtitleRef} style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '480px', opacity: 0 }}>
              {subtitle}
            </p>
          </div>

          {/* Card side */}
          <div ref={cardRef} className="section-card-side" style={{ order: isEven ? 1 : 2, opacity: 0 }}>
            <motion.div
              whileHover={{ boxShadow: `0 40px 100px ${accentColor}28` }}
              style={{ background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border)', backdropFilter: 'blur(20px)', padding: '2rem', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.4s ease' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${accentColor}88, transparent)` }} />
              <motion.div animate={{ opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, borderRadius: '50%', transform: 'translate(50px,-50px)', pointerEvents: 'none' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {steps.map((step, i) => <StepCard key={i} number={i + 1} text={step} delay={i * 0.06} />)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
