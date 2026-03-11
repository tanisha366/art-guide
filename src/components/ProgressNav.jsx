// ─────────────────────────────────────────────────────────────────────────────
// ProgressNav.jsx  —  Vertical dot navigation fixed to the right edge
//
// Highlights the active step as user scrolls through sections.
// Hidden on mobile via CSS class (.progress-nav-hidden-mobile).
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Settings, ImagePlus, Megaphone } from 'lucide-react';
import { gsap } from 'gsap';

// ─── Data ───────────────────────────────────────────────────────────────── //

const STEPS = [
  { num: 1, label: 'Register',      icon: UserPlus,  href: '#register' },
  { num: 2, label: 'Setup Profile', icon: Settings,  href: '#setup'    },
  { num: 3, label: 'Upload Art',    icon: ImagePlus, href: '#upload'   },
  { num: 4, label: 'Promote',       icon: Megaphone, href: '#manage'   },
];

const SECTION_IDS = STEPS.map((s) => s.href.slice(1));

// ─── Styles ─────────────────────────────────────────────────────────────── //

const getDotStyle = (isActive) => ({
  width:          isActive ? 38 : 28,
  height:         isActive ? 38 : 28,
  borderRadius:   '50%',
  border:         isActive ? '2px solid var(--gold)' : '1px solid rgba(201,168,76,0.3)',
  background:     isActive
    ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))'
    : 'rgba(10,10,15,0.8)',
  backdropFilter: 'blur(10px)',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  cursor:         'pointer',
  textDecoration: 'none',
  boxShadow:      isActive ? '0 0 20px rgba(201,168,76,0.5)' : 'none',
  transition:     'all 0.3s ease',
});

const getConnectorStyle = (isComplete) => ({
  width:      1,
  height:     36,
  background: isComplete
    ? 'linear-gradient(180deg, var(--gold), var(--gold-dark))'
    : 'rgba(201,168,76,0.15)',
  transition: 'background 0.4s ease',
});

// ─── Component ───────────────────────────────────────────────────────────── //

export default function ProgressNav() {
  const [active, setActive]  = useState(0);
  const dotRefs              = useRef([]);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = SECTION_IDS.indexOf(entry.target.id);
          if (idx === -1) return;

          setActive(idx);
          gsap.to(dotRefs.current[idx], {
            scale: 1.3, duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1,
          });
        });
      },
      { threshold: 0.4 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="progress-nav"
      style={{
        position:       'fixed',
        right:          '2rem',
        top:            '50%',
        transform:      'translateY(-50%)',
        zIndex:         900,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            0,
      }}
    >
      {STEPS.map((step, i) => (
        <div
          key={step.num}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Dot link */}
          <motion.a
            href={step.href}
            ref={(el) => (dotRefs.current[i] = el)}
            whileHover={{ scale: 1.2 }}
            title={step.label}
            style={getDotStyle(active === i)}
          >
            <step.icon
              size={active === i ? 16 : 12}
              color={active === i ? '#0a0a0f' : 'var(--gold-dark)'}
            />
          </motion.a>

          {/* Connector line (not after last dot) */}
          {i < STEPS.length - 1 && (
            <div style={getConnectorStyle(i < active)} />
          )}
        </div>
      ))}

      {/* Hidden on mobile via CSS — see index.css #7 Navbar & #8 ProgressNav */}
      <style>{`@media (max-width: 900px) { .progress-nav { display: none !important; } }`}</style>
    </motion.div>
  );
}
