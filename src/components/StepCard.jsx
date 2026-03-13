// ─────────────────────────────────────────────────────────────────────────────
// StepCard.jsx  —  Single numbered step row inside a SectionBlock card
//
// Props:
//   number  {number}  Step number (displayed as zero-padded label)
//   text    {string}  Step description text
//   delay   {number}  Animation stagger delay in seconds  (default 0)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// ─── Styles ─────────────────────────────────────────────────────────────── //

const getRowStyle = (hovered) => ({
  display:       'flex',
  alignItems:    'flex-start',
  gap:           '18px',
  padding:       '18px 24px',
  borderRadius:  '16px',
  border:        `1.5px solid ${hovered ? 'var(--gold)' : 'var(--border)'}`,
  background:    hovered ? 'rgba(184,138,26,0.07)' : 'var(--card-bg)',
  boxShadow:     hovered ? '0 4px 24px 0 rgba(184,138,26,0.10)' : '0 1.5px 8px 0 rgba(60,40,10,0.03)',
  cursor:        'default',
  position:      'relative',
  overflow:      'hidden',
  transition:    'background 0.3s, border-color 0.3s, box-shadow 0.3s',
});

// ─── Component ───────────────────────────────────────────────────────────── //

export default function StepCard({ number, text, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  const ref      = useRef(null);
  const controls = useAnimationControls();
  const inView   = useInView(ref, { once: false, margin: '-30px', amount: 0.3 });

  // Reveal / hide on scroll
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1, x: 0, filter: 'blur(0px)',
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.set({ opacity: 0, x: -40, filter: 'blur(6px)' });
    }
  }, [inView]); // eslint-disable-line

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
      animate={controls}
      whileHover={{ x: 8, scale: 1.01 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      style={getRowStyle(hovered)}
    >
      {/* Shimmer sweep on hover */}
      {hovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top: 0, left: 0,
            width:      '50%',
            height:     '100%',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Animated check icon */}
      <motion.div
        initial={{ scale: 0, rotate: -120 }}
        animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -120 }}
        transition={{
          duration:  inView ? 0.5 : 0,
          delay:     inView ? delay + 0.15 : 0,
          type:      'spring',
          stiffness: 260,
          damping:   18,
        }}
        whileHover={{ rotate: 15, scale: 1.2 }}
        style={{ flexShrink: 0, marginTop: '2px' }}
      >
        <CheckCircle2
          size={20}
          color={hovered ? '#a07428' : 'rgba(100, 72, 15, 0.55)'}
          style={{ transition: 'color 0.3s' }}
        />
      </motion.div>

      {/* Step number + text */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flex: 1 }}>

        <motion.span
          animate={{ color: hovered ? 'var(--gold-dark)' : 'rgba(90, 65, 15, 0.38)' }}
          style={{
            fontSize:      '0.72rem',
            fontWeight:    800,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            flexShrink:    0,
            fontFamily:    'Inter, Arial, sans-serif',
          }}
        >
          {String(number).padStart(2, '0')}
        </motion.span>

        <p style={{
          fontSize:   '1.13rem',
          color:      hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
          lineHeight: 1.7,
          fontWeight: 500,
          letterSpacing: '0.01em',
          transition: 'color 0.3s',
          fontFamily: 'Inter, Arial, sans-serif',
        }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}
