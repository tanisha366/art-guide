// ─────────────────────────────────────────────────────────────────────────────
// RevealOnScroll.jsx  —  Reusable scroll-reveal wrapper
//
// Behaviour:
//   • Animates IN (smooth) when element enters the viewport
//   • Snaps INSTANTLY back to hidden when element leaves  (no slow exit)
//   • Re-plays the animation every time the element enters again
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';

export default function RevealOnScroll({
  children,
  x        = 0,
  y        = 48,
  scale    = 1,
  delay    = 0,
  duration = 0.65,
  ease     = [0.22, 1, 0.36, 1],
  margin   = '-60px',
  amount   = 0.12,
  style    = {},
  className,
}) {
  const ref      = useRef(null);
  const controls = useAnimationControls();
  const inView   = useInView(ref, { once: false, margin, amount });

  // Hidden initial state (shared between set & initial)
  const hiddenState = {
    opacity: 0,
    x,
    y,
    scale:  scale !== 1 ? scale * 0.85 : 1,
    filter: 'blur(4px)',
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)',
        transition: { duration, delay, ease },
      });
    } else {
      controls.set(hiddenState); // instant reset — no exit animation
    }
  }, [inView]); // eslint-disable-line

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={controls}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
