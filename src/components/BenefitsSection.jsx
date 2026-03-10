// ─────────────────────────────────────────────────────────────────────────────
// BenefitsSection.jsx  —  6-card "Why Zigguratss" benefits grid
//
// Each card has:
//   • 3D tilt on mouse move
//   • Corner glow & bottom shimmer on hover
//   • Icon box with glow
//   • GSAP ScrollTrigger header entrance
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Globe, Shield, Award, Banknote, Headphones } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

// ─── Data
const FEATURES = [
  { icon: Globe, title: 'Global Reach', desc: 'Showcase your artwork to collectors and art lovers from across the globe.', color: '#c9a84c' },
  { icon: Shield, title: 'Secure Payments', desc: 'Multiple secure payment gateways including PayPal, Visa, and banking transfers.', color: '#7c6baa' },
  { icon: TrendingUp, title: 'Grow Your Brand', desc: 'Build your artist profile and grow a following of dedicated art enthusiasts.', color: '#c26b6b' },
  { icon: Award, title: 'Contests & Recognition', desc: 'Participate in weekly art contests and win recognition for your talent.', color: '#4bc9a8' },
  { icon: Banknote, title: 'Fair Earnings', desc: 'Transparent pricing with your earnings directly deposited to your bank.', color: '#c9a84c' },
  { icon: Headphones, title: 'Dedicated Support', desc: '24/7 support team ready to help you with any questions or issues.', color: '#7c6baa' },
];

function BenefitCard({ b, index }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 18,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 18,
    });
  };

  return (
    <RevealOnScroll y={60} scale={0.92} delay={index * 0.1} duration={0.65} margin='-50px' style={{ height: '100%' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
        animate={hovered ? { rotateX: -mousePos.y * 0.4, rotateY: mousePos.x * 0.4 } : { rotateX: 0, rotateY: 0 }}
        whileHover={{ y: -10, boxShadow: `0 24px 70px ${b.color}28`, borderColor: `${b.color}55` }}
        style={{
          background: 'var(--card-bg)', borderRadius: '20px',
          border: `1px solid ${hovered ? b.color + '44' : 'var(--border)'}`,
          padding: '2rem', backdropFilter: 'blur(20px)',
          cursor: 'default', position: 'relative', overflow: 'hidden',
          transformStyle: 'preserve-3d', willChange: 'transform',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          height: '100%', boxSizing: 'border-box',
        }}
      >
      {/* Corner glow */}
      <motion.div
        animate={{ opacity: hovered ? 0.18 : 0 }}
        style={{
          position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
          background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          borderRadius: '50%', transform: 'translate(40px,-40px)', pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      <motion.div
        whileHover={{ scale: 1.2, rotate: 8 }}
        style={{
          width: 52, height: 52, borderRadius: '14px',
          background: `linear-gradient(135deg, ${b.color}30, ${b.color}08)`,
          border: `1px solid ${b.color}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.2rem',
          boxShadow: hovered ? `0 0 24px ${b.color}44` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <b.icon size={22} color={b.color} />
      </motion.div>

      <h3 style={{ fontSize: '1.05rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
        {b.title}
      </h3>
      <p style={{ fontSize: '0.88rem', color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.7, transition: 'color 0.3s' }}>
        {b.desc}
      </p>

      {/* Bottom shimmer bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${b.color}, transparent)`,
          transformOrigin: 'center',
        }}
      />
      </motion.div>
    </RevealOnScroll>
  );
}

export default function BenefitsSection() {
  const ref = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'restart none none reset' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: '7rem 1.5rem', background: 'linear-gradient(180deg, var(--dark) 0%, var(--dark-2) 50%, var(--dark) 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '4rem', opacity: 0 }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700 }}>Why Zigguratss</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginTop: '0.8rem', color: 'var(--text-primary)' }}>
            Benefits of Selling With Us
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '1rem auto 0' }}>
            Join a community of passionate artists and discover why thousands choose Zigguratss.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', perspective: '1000px' }}>
          {benefits.map((b, i) => <BenefitCard key={b.title} b={b} index={i} />)}
        </div>
      </div>
    </section>
  );
}
