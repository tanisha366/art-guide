import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  // Simplified palette
  const earthyColors = ['#b85e3a', '#8b5a2b', '#b78c5a', '#c9a34b', '#9e7b56'];

  // Reduced particle count for performance
  const flameParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 80 + Math.random() * 150,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    color: earthyColors[i % earthyColors.length],
  }));

  const bubbleParticles = Array.from({ length: 6 }, (_, i) => ({
    id: i + 100,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 150 + Math.random() * 200,
    delay: Math.random() * 6,
    duration: 15 + Math.random() * 15,
    color: earthyColors[(i + 2) % earthyColors.length],
  }));

  return (
    <>
      <ScrollProgress />
      <Navbar onBack={onBack} isCustomerPage />

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Static gradient background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(145deg, #fcfaf8, #f5efe9)',
          zIndex: -2,
        }} />

        {/* Simple parallax overlay */}
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(201,163,75,0.05) 0%, transparent 50%)',
            y: y1,
            opacity: opacity1,
            zIndex: -1,
          }}
        />

        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '100%',
            padding: '0 5vw',
          }}
        >
          {/* Flame particles – only scale & opacity */}
          {flameParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.25, 0.1],
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
                willChange: 'transform, opacity',
              }}
            />
          ))}

          {/* Bubble particles – only scale & opacity */}
          {bubbleParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.12, 0.05],
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
                willChange: 'transform, opacity',
              }}
            />
          ))}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#000000',
                marginBottom: '0.5rem',
              }}
            >
              Customer Guide
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                width: '120px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #000000, #666666, #000000, transparent)',
                margin: '1rem auto 1.5rem',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                color: '#4a3f38',
                maxWidth: '700px',
                margin: '0 auto 2rem',
                lineHeight: 1.6,
              }}
            >
              Simple steps to discover, buy, and enjoy original artwork.
              Your collection starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.a
                href="https://zigguratss.com/artworks"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.8rem 2rem',
                  borderRadius: '40px',
                  background: '#000000',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Browse Artworks <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="https://zigguratss.com/signup"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, borderColor: '#000000' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.8rem 2rem',
                  borderRadius: '40px',
                  border: '1px solid #00000080',
                  color: '#000000',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: 'transparent',
                }}
              >
                Create Account
              </motion.a>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(1.5rem, 5vw, 3rem)',
                flexWrap: 'wrap',
                marginTop: '3rem',
                padding: '1.5rem 0',
                borderTop: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {[
                { icon: UserCircle, label: 'Collectors', value: '10K+' },
                { icon: ShoppingCart, label: 'Artworks', value: '25K+' },
                { icon: Star, label: 'Rating', value: '4.9' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <stat.icon size={28} color="#000" style={{ marginBottom: '0.3rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#000' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Step sections */}
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

        {/* Final CTA – clean, no particles */}
        <section
          style={{
            width: '100%',
            padding: '4rem 5vw',
            background: '#f0ebe5',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontFamily: "'Playfair Display', serif",
              color: '#000',
              marginBottom: '1rem',
            }}>
              Ready to find your perfect piece?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4a4a4a', marginBottom: '2rem' }}>
              Explore thousands of original artworks.
            </p>
            <motion.a
              href="https://zigguratss.com/artworks"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                padding: '0.8rem 2.5rem',
                borderRadius: '40px',
                background: '#000',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Browse Artworks
            </motion.a>
          </motion.div>
        </section>
      </div>
    </>
  );
}