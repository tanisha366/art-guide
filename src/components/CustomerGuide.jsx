import { useEffect, useRef } from 'react';
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
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Enhanced earthy palette
  const earthyColors = [
    '#b85e3a', '#c47e5a', '#a5673f', '#8b5a2b', '#b78c5a', '#d9a066',
    '#e3b37c', '#c9a34b', '#d4af37', '#bf8f3f', '#9e7b56', '#7d6b4b',
  ];

  // Flame particles (smaller, more numerous)
  const flameParticles = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 60 + Math.random() * 200,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 15,
    color: earthyColors[i % earthyColors.length],
    xDrift: (Math.random() - 0.5) * 150,
    yDrift: (Math.random() - 0.5) * 100,
  }));

  // Bubble particles (larger, slower, more transparent)
  const bubbleParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i + 100,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 150 + Math.random() * 350,
    delay: Math.random() * 10,
    duration: 25 + Math.random() * 20,
    color: earthyColors[(i + 4) % earthyColors.length],
  }));

  return (
    <>
      <ScrollProgress />
      <Navbar onBack={onBack} isCustomerPage />

      {/* Main container with animated gradient background */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Animated gradient background layers */}
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(145deg, #fcfaf8, #f5efe9, #f0e8e0)',
            backgroundSize: '400% 400%',
            zIndex: -2,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Animated overlay with parallax */}
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(201,163,75,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139,90,43,0.08) 0%, transparent 50%)',
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
          {/* Flame particles */}
          {flameParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.35, 0.1],
                x: [0, particle.xDrift, 0],
                y: [0, particle.yDrift, 0],
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

          {/* Bubble particles */}
          {bubbleParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.05, 0.15, 0.05],
                x: [0, Math.sin(particle.id) * 120, 0],
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

          {/* Large floating shapes with parallax */}
          <motion.div
            style={{
              position: 'absolute',
              top: '0%',
              left: '-5%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(201,163,75,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(100px)',
              zIndex: 0,
              y: y2,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '0%',
              right: '-5%',
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(139,90,43,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(120px)',
              zIndex: 0,
              y: y1,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, -20, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(4.2rem, 11vw, 8rem)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#000000',
                marginBottom: '0.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              Customer Guide
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{
                width: '150px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #000000, #666666, #000000, transparent)',
                margin: '1rem auto 1.5rem',
                borderRadius: '4px',
                boxShadow: '0 0 15px rgba(0,0,0,0.3)',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
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
              transition={{ delay: 1.2 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.a
                href="https://zigguratss.com/artworks"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  background: '#000000',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                }}
              >
                Browse Artworks <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="https://zigguratss.com/signup"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, borderColor: '#000000', background: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  border: '1px solid #00000080',
                  color: '#000000',
                  fontSize: '1.1rem',
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(2rem, 8vw, 4rem)',
                flexWrap: 'wrap',
                marginTop: '4rem',
                padding: '2rem 1rem',
                borderTop: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {[
                { icon: UserCircle, label: 'Happy Collectors', value: '10K+' },
                { icon: ShoppingCart, label: 'Artworks Sold', value: '25K+' },
                { icon: Star, label: '5-Star Reviews', value: '4.9' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <stat.icon size={36} color="#000000" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#000000' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{stat.label}</div>
                </motion.div>
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

        {/* Final CTA with its own particles */}
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
          {/* Particles for final section */}
          {flameParticles.slice(0, 20).map((p, i) => (
            <motion.div
              key={`cta-${i}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 50, 0],
              }}
              transition={{
                duration: 18 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
              style={{
                position: 'absolute',
                left: `${5 + i * 4}%`,
                top: `${10 + i * 4}%`,
                width: '120px',
                height: '120px',
                background: `radial-gradient(circle, ${earthyColors[i % earthyColors.length]} 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(50px)',
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
            style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: "'Playfair Display', serif",
              color: '#000000',
              marginBottom: '1rem',
            }}>
              Ready to find your perfect piece?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a4a4a',
              marginBottom: '2rem',
            }}>
              Explore thousands of original artworks from talented artists worldwide.
            </p>
            <motion.a
              href="https://zigguratss.com/artworks"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                padding: '1rem 3rem',
                borderRadius: '50px',
                background: '#000000',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
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