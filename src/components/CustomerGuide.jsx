import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserCircle, ShoppingCart, RefreshCw,
  HeartHandshake, CreditCard, Truck, Star, MessageCircle,
  ArrowRight
} from 'lucide-react';

import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import SectionBlock from './SectionBlock';
import BenefitsSection from './BenefitsSection';

gsap.registerPlugin(ScrollTrigger);

// ─── Customer journey steps ─────────────────────────────────────────────────
const customerSections = [
  {
    id: 'register',
    number: '01',
    icon: UserCircle,
    label: 'Step 1 — Account',
    title: 'Create Your Buyer Account',
    subtitle: 'Join Zigguratss in minutes. Verify your email and start exploring thousands of original artworks.',
    accentColor: '#9b7b5e',
    steps: [
      'Go to "My Account" on the top right corner.',
      'Click on "Login / Register".',
      'Fill JOIN US: Full Name, Email, Mobile, Password.',
      'Select "I am an art lover, a collector".',
      'Accept Terms & Conditions.',
      'Click JOIN US.',
      'Verification link sent to your email.',
      'Click "Link to Verify" in email.',
      'Account verified – start browsing!',
    ],
  },
  {
    id: 'buy',
    number: '02',
    icon: ShoppingCart,
    label: 'Step 2 — Purchase',
    title: 'How to Buy Artwork',
    subtitle: 'Simple steps to add art to your collection. Secure checkout and email confirmation.',
    accentColor: '#8f877a',
    steps: [
      'Log in to your account.',
      'Go to "Artwork" page and browse.',
      'Select artwork and click "Add to Cart".',
      'Proceed to checkout.',
      'Fill delivery info: Country, Address, City, GST (if applicable).',
      'Choose payment method and complete payment.',
      'Order confirmation email sent.',
      'View purchased art in "My Orders".',
    ],
  },
  {
    id: 'returns',
    number: '03',
    icon: RefreshCw,
    label: 'Step 3 — Returns & Refunds',
    title: 'Return or Refund Process',
    subtitle: 'Hassle‑free returns only for items damaged during delivery.',
    accentColor: '#7f9c95',
    steps: [
      'Go to Order History in dashboard.',
      'Click "Action" for the artwork.',
      'Select reason for return.',
      'Add clear images of artwork and packaging (if damaged).',
      'Submit request.',
      'Note: Commissioned artworks not eligible for return unless cancelled before shipping.',
      'For commissioned pieces: you’ll receive a photo for final confirmation. Cancel then for full refund.',
      'Once shipped, cannot be returned/refunded.',
      'Upon delivery, inspect immediately. If damaged, take photos before opening and contact support within 48h.',
    ],
  },
];

const perks = [
  { icon: HeartHandshake, title: 'Original Artwork Only', desc: 'Every piece 100% authentic, created by verified artists.', color: '#9b7b5e' },
  { icon: CreditCard, title: 'Secure Checkout', desc: 'Multiple safe payment options: PayPal, Visa, bank transfer.', color: '#8f877a' },
  { icon: Truck, title: 'Worldwide Shipping', desc: 'We deliver artwork to your doorstep anywhere.', color: '#7f9c95' },
  { icon: RefreshCw, title: 'Hassle‑free Returns', desc: 'Only for damaged items – we guide you every step.', color: '#9b7b5e' },
  { icon: Star, title: 'Curated Collections', desc: 'Discover weekly featured artists and contest winners.', color: '#8f877a' },
  { icon: MessageCircle, title: '24/7 Support', desc: 'Our dedicated team is always ready to help.', color: '#7f9c95' },
];

export default function CustomerGuide({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  // Enhanced earthy palette
  const earthyColors = [
    '#b85e3a', '#c47e5a', '#a5673f', '#8b5a2b', '#b78c5a', '#d9a066',
    '#e3b37c', '#c9a34b', '#d4af37', '#bf8f3f', '#9e7b56', '#7d6b4b',
  ];

  // Flame particles (smaller, faster)
  const flameParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 80 + Math.random() * 200,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    color: earthyColors[i % earthyColors.length],
  }));

  // Bubble particles (larger, slower, more transparent)
  const bubbleParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i + 100,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 200 + Math.random() * 300,
    delay: Math.random() * 8,
    duration: 20 + Math.random() * 15,
    color: earthyColors[(i + 3) % earthyColors.length],
  }));

  return (
    <>
      <ScrollProgress />
      <Navbar onBack={onBack} isCustomerPage />

      {/* HERO SECTION with enhanced flame particles and bubbles */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          width: '100%',
          padding: 'clamp(7rem, 12vh, 10rem) 5vw clamp(5rem, 8vh, 7rem)',
          background: '#fcfaf8',
          textAlign: 'center',
        }}
      >
        {/* Rich flame particle background */}
        {flameParticles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, Math.sin(particle.id) * 70, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
            style={{
              position: 'absolute',
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(50px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Bubble particles – larger, slower, more transparent */}
        {bubbleParticles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, Math.cos(particle.id) * 100, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
            style={{
              position: 'absolute',
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${particle.color} 0%, transparent 80%)`,
              borderRadius: '50%',
              filter: 'blur(80px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Additional floating shapes for depth */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '5%',
            left: '2%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(201,163,75,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 1,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '2%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139,90,43,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1100px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(4.2rem, 11vw, 8rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#000000',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            Customer Guide
            <span style={{
              display: 'block',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#333333',
              fontWeight: 400,
              marginTop: '0.5rem',
              fontStyle: 'italic',
            }}>
              Your Journey to Owning Art
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'clamp(120px, 22vw, 320px)',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #000000, #666666, #000000, transparent)',
              borderRadius: '2px',
              margin: '1.5rem auto 0',
              transformOrigin: 'center',
              boxShadow: '0 0 8px rgba(0,0,0,0.25)',
            }}
          />

          <p style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
            color: '#4a3f38',
            lineHeight: 1.8,
            fontWeight: 400,
            maxWidth: '720px',
            margin: '2rem auto 2.5rem',
          }}>
            Simple steps to discover, buy, and enjoy original artwork. 
            Your collection starts here.
          </p>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.a
              href="https://zigguratss.com/artworks"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 42px',
                borderRadius: '40px',
                background: '#000000',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
              }}
            >
              Browse Artworks
            </motion.a>
            <motion.a
              href="https://zigguratss.com/signup"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, borderColor: '#000000', background: '#ffffff' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 38px',
                borderRadius: '40px',
                border: '1px solid #00000080',
                color: '#000000',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
            >
              Create Account
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Step sections – clean */}
      {customerSections.map((section) => (
        <SectionBlock
          key={section.id}
          id={section.id}
          number={section.number}
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
          steps={section.steps}
          icon={section.icon}
          accentColor={section.accentColor}
          fullWidth
        />
      ))}

      <BenefitsSection perks={perks} fullWidth />

      {/* FINAL BROWSE ARTWORKS SECTION with enhanced background */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          padding: '6rem 5vw',
          background: '#f0ebe5',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Flame particles for this section */}
        {flameParticles.slice(0, 15).map((particle, i) => (
          <motion.div
            key={`final-${i}`}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.1, 0.25, 0.1],
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 40, 0],
            }}
            transition={{
              duration: 14 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              left: `${5 + i * 6}%`,
              top: `${10 + i * 5}%`,
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#b85e3a' : i % 3 === 1 ? '#c9a34b' : '#8b5a2b'
              } 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Bubbles for final section */}
        {bubbleParticles.slice(0, 8).map((particle, i) => (
          <motion.div
            key={`bubble-final-${i}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
              y: [0, -40, 0],
              x: [0, Math.cos(i) * 50, 0],
            }}
            transition={{
              duration: 18 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6,
            }}
            style={{
              position: 'absolute',
              left: `${10 + i * 8}%`,
              top: `${15 + i * 6}%`,
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#9e7b56' : '#b78c5a'
              } 0%, transparent 80%)`,
              borderRadius: '50%',
              filter: 'blur(60px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#000000',
            marginBottom: '1rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.05)',
          }}>
            Ready to find your perfect piece?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a4a4a',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}>
            Explore thousands of original artworks from talented artists worldwide.
          </p>
          <motion.a
            href="https://zigguratss.com/artworks"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 30px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '1.2rem 3.5rem',
              borderRadius: '50px',
              background: '#000000',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            }}
          >
            Browse Artworks <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}