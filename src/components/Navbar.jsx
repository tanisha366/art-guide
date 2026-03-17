// ─────────────────────────────────────────────────────────────────────────────
// Navbar.jsx  —  Fixed top navigation bar
//
// Props:
//   onSwitchPage  {fn}   Switch to Customer Guide page
//   isCustomerPage{bool} True when Customer Guide is active
//   onBack        {fn}   Return to Artist Guide (Customer page only)
//
// Responsive:
//   ≥ 900px  — desktop links visible
//   < 900px  — burger menu with slide-in drawer
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Menu, X, Users, Brush } from 'lucide-react';

// ─── Nav link data

const artistLinks = [
  { label: 'Register',       href: '#register' },
  { label: 'Get Started',    href: '#setup'    },
  { label: 'Upload Artwork', href: '#upload'   },
  { label: 'Manage',         href: '#manage'   },
];

const customerLinks = [
  { label: 'Account',  href: '#register' },
  { label: 'Browse',   href: '#browse'   },
  { label: 'Purchase', href: '#purchase' },
  { label: 'Delivery', href: '#delivery' },
];

export default function Navbar({ onSwitchPage, isCustomerPage, onBack }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 clamp(1rem, 4vw, 2.5rem)', height: 'clamp(60px, 8vw, 68px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(245, 234, 208, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(196,145,42,0.30)' : 'none',
          boxShadow: scrolled ? '0 2px 40px rgba(180,140,50,0.15)' : 'none',
          transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
        }}
      >
        {/* Logo */}
        <motion.a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} whileHover={{ scale: 1.04 }}>
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg, var(--gold), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Palette size={20} color="#0a0a0f" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.04em' }}>Zigguratss</span>
        </motion.a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }} className="nav-desktop">
          {isCustomerPage ? customerLinks.map((l, i) => (
            <motion.a key={l.label} href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              whileHover={{ color: 'var(--gold)', y: -2 }}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.87rem', fontWeight: 500, letterSpacing: '0.04em', transition: 'color 0.25s ease' }}
            >
              {l.label}
            </motion.a>
          )) : artistLinks.map((l, i) => (
            <motion.a key={l.label} href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              whileHover={{ color: 'var(--gold)', y: -2 }}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.87rem', fontWeight: 500, letterSpacing: '0.04em', transition: 'color 0.25s ease' }}
            >
              {l.label}
            </motion.a>
          ))}

          {/* Switch page button */}
          <motion.button
            onClick={onSwitchPage || onBack}
            whileHover={{ scale: 1.05, boxShadow: isCustomerPage ? '0 0 20px rgba(124,107,170,0.4)' : '0 0 20px rgba(201,168,76,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '8px 18px', borderRadius: '50px',
              background: isCustomerPage
                ? 'linear-gradient(135deg, var(--accent), #5a4d8a)'
                : 'rgba(201,168,76,0.12)',
              border: isCustomerPage ? 'none' : '1px solid rgba(201,168,76,0.3)',
              color: isCustomerPage ? '#fff' : 'var(--gold)',
              fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
              letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {isCustomerPage ? <Brush size={13} /> : <Users size={13} />}
            {isCustomerPage ? 'Artist Guide' : 'Customer Guide'}
          </motion.button>

          <motion.a href="https://zigguratss.com" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{ padding: '8px 20px', borderRadius: '50px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#0a0a0f', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
            Visit Site
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="nav-mobile"
          style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', padding: '8px' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 70, right: 0, bottom: 0, width: '75%', background: 'rgba(245, 234, 208, 0.98)', backdropFilter: 'blur(30px)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '1px solid var(--border)' }}
            >
              {(isCustomerPage ? customerLinks : artistLinks).map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontFamily: "'Playfair Display', serif", padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  {l.label}
                </a>
              ))}
              <button onClick={() => { setOpen(false); (onSwitchPage || onBack)?.(); }}
                style={{ padding: '12px', borderRadius: '50px', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}>
                {isCustomerPage ? 'Artist Guide' : 'Customer Guide'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <style>{`
        @media (max-width: 900px) { .nav-desktop { display: none !important; } }
        @media (min-width: 901px) { .nav-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
