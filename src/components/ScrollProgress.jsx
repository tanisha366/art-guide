// ─────────────────────────────────────────────────────────────────────────────
// ScrollProgress.jsx  —  Thin gold progress bar fixed at top of viewport
// ─────────────────────────────────────────────────────────────────────────────

import { useScroll, useSpring, motion } from 'framer-motion';

const BAR_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '3px',
  background: 'linear-gradient(90deg, var(--gold), var(--accent), var(--accent-2))',
  transformOrigin: 'left',
  zIndex: 9999,
};

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return <motion.div style={{ ...BAR_STYLE, scaleX }} />;
}
