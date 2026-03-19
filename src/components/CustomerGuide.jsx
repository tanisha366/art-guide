import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserCircle, ShoppingCart, RefreshCw,
  HeartHandshake, CreditCard, Truck, Star, MessageCircle,
  ArrowRight, Search, Package, Sparkles, Zap
} from 'lucide-react';

import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import SectionBlock from './SectionBlock';
import BenefitsSection from './BenefitsSection';

gsap.registerPlugin(ScrollTrigger);

// Custom hook for media query
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}

// Particle generator (flakes and orbs)
function generateParticles(width) {
  const isMobile = width < 768;
  const count = isMobile ? 25 : 60;
  const earthyColors = ['#b85e3a', '#8b5a2b', '#b78c5a', '#c9a34b', '#9e7b56', '#6d5f9a', '#8a7bb5', '#b68b5c'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: isMobile ? 30 + Math.random() * 80 : 60 + Math.random() * 200,
    delay: Math.random() * 12,
    duration: isMobile ? 12 + Math.random() * 18 : 18 + Math.random() * 28,
    color: earthyColors[i % earthyColors.length],
    rotation: Math.random() * 360,
    isOrb: Math.random() > 0.7,
  }));
}

// Customer steps
const discoverSteps = [
  'Create a free account or log in.',
  'Browse artworks by category, artist, or style.',
  'Use filters (price, size, medium) to narrow down.',
  'Click on any artwork to see full details and high-res images.',
  'Save favourites to your wishlist for later.',
  'Read artist bios and check their portfolio.',
];

const purchaseSteps = [
  'Add your chosen artwork to the cart.',
  'Review your order and proceed to checkout.',
  'Enter shipping address and select delivery option.',
  'Pay securely via card, UPI, or net banking.',
  'Receive order confirmation via email.',
  'Track your shipment from the dashboard.',
  'Inspect the artwork upon delivery and confirm receipt.',
  'Leave a review and share your new acquisition!',
];

const perks = [
  { icon: ShoppingCart, title: 'Easy Checkout', description: 'Fast, secure, and multiple payment options.' },
  { icon: RefreshCw, title: 'Free Returns', description: 'Not satisfied? Return within 7 days.' },
  { icon: HeartHandshake, title: 'Authenticity Guaranteed', description: 'Every artwork is verified by our experts.' },
  { icon: CreditCard, title: 'Secure Payments', description: 'Your data is encrypted and safe.' },
  { icon: Truck, title: 'Global Shipping', description: 'Tracked delivery worldwide.' },
  { icon: MessageCircle, title: '24/7 Support', description: 'We’re here to help, anytime.' },
];

export default function CustomerGuide({ onBack }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Generate particles (responsive)
  const [particles, setParticles] = useState(() => generateParticles(isMobile ? 300 : 1200));
  useEffect(() => {
    const handleResize = () => setParticles(generateParticles(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar onBack={onBack} isCustomerPage />

      <div style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: '#faf7f2',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, #c9a84c15 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, #8a7bb515 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, #b85e3a15 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, #c9a84c15 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -2,
          }}
        />

        {/* Floating particles and orbs */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={
              p.isOrb
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.12, 0.25, 0.12],
                    x: [0, Math.sin(p.id) * (isMobile ? 40 : 100), 0],
                    y: [0, isMobile ? -40 : -80, 0],
                  }
                : {
                    scale: [1, 1.3, 0.8, 1.2, 1],
                    opacity: [0.06, 0.15, 0.1, 0.12, 0.06],
                    x: [0, Math.sin(p.id) * (isMobile ? 25 : 60), 0],
                    y: [0, isMobile ? -25 : -50, 0],
                    rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
            style={{
              position: isMobile ? 'absolute' : 'fixed',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: p.isOrb ? 'blur(70px)' : 'blur(35px)',
              zIndex: 0,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
            }}
          />
        ))}

        {/* Large floating geometric shapes */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 60, 0], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: isMobile ? 'absolute' : 'fixed',
            top: '10%',
            right: '5%',
            width: isMobile ? 150 : 450,
            height: isMobile ? 150 : 450,
            background: 'radial-gradient(circle, rgba(201,163,75,0.12) 0%, transparent 70%)',
            borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
            filter: 'blur(70px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.35, 1], rotate: [0, -45, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: isMobile ? 'absolute' : 'fixed',
            bottom: '15%',
            left: '5%',
            width: isMobile ? 180 : 500,
            height: isMobile ? 180 : 500,
            background: 'radial-gradient(circle, rgba(139,90,43,0.1) 0%, transparent 70%)',
            borderRadius: '60% 40% 40% 60% / 60% 40% 60% 40%',
            filter: 'blur(80px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Parallax overlay (desktop) */}
        {!isMobile && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,240,210,0.15) 0%, transparent 60%)',
              y: y1,
              opacity,
              zIndex: -1,
            }}
          />
        )}

        {/* Hero Section */}
        <section
          ref={heroRef}
          id="hero"
          style={{
            position: 'relative',
            minHeight: isMobile ? 'auto' : '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '6rem 1.5rem 4rem' : '0 5vw',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block', marginBottom: '1rem' }}
            >
              <Sparkles size={isMobile ? 32 : 48} color="#b68b5c" />
            </motion.div>

            <h1 style={{
              fontSize: isMobile ? 'clamp(2.5rem, 12vw, 3.5rem)' : 'clamp(3.5rem, 8vw, 6rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#2c2c2c',
              marginBottom: '0.5rem',
            }}>
              Customer Guide
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                width: isMobile ? '80px' : '120px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #b68b5c, #8a7bb5, #b68b5c, transparent)',
                margin: '1rem auto 2rem',
              }}
            />

            <p style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#4a4a4a',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
              padding: '0 1rem',
            }}>
              Simple steps to discover, buy, and enjoy original artwork.
              Your collection starts here.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.a
                href="https://zigguratss.com/artworks"
                target="_blank"
                rel="noreferrer"
                whileHover={!isMobile && { scale: 1.05, boxShadow: '0 0 30px rgba(182,139,92,0.3)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: isMobile ? '0.6rem 1.5rem' : '0.8rem 2rem',
                  borderRadius: '40px',
                  background: '#b68b5c',
                  color: '#ffffff',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                }}
              >
                Browse Artworks <ArrowRight size={isMobile ? 16 : 18} />
              </motion.a>
              <motion.a
                href="https://zigguratss.com/signup"
                target="_blank"
                rel="noreferrer"
                whileHover={!isMobile && { scale: 1.05, borderColor: '#b68b5c', background: 'rgba(182,139,92,0.05)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: isMobile ? '0.6rem 1.5rem' : '0.8rem 2rem',
                  borderRadius: '40px',
                  border: '2px solid #b68b5c',
                  color: '#2c2c2c',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                Create Account
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0 }}
              animate={statsInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '1.5rem' : '3rem',
                flexWrap: 'wrap',
                marginTop: '3rem',
                padding: '1.5rem 0',
                borderTop: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              {[
                { icon: UserCircle, label: 'Collectors', value: '10K+' },
                { icon: ShoppingCart, label: 'Artworks', value: '25K+' },
                { icon: Star, label: 'Rating', value: '4.9' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={!isMobile && { y: -5 }}
                  style={{ textAlign: 'center', cursor: 'default' }}
                >
                  <motion.div
                    animate={!isMobile ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <stat.icon size={isMobile ? 28 : 32} color="#b68b5c" style={{ marginBottom: '0.3rem' }} />
                  </motion.div>
                  <div style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 700, color: '#2c2c2c' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#666' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Acrylic style tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              style={{
                marginTop: '3rem',
                padding: '1.5rem 2rem',
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '60px',
                display: 'inline-block',
                border: '1px solid rgba(182,139,92,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
              }}
            >
              <span style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                background: 'linear-gradient(135deg, #b68b5c, #8a7bb5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '0.02em',
              }}>
                “Art is the only way to run away without leaving home”
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Step Sections with IDs for navbar */}
        <div id="discover">
          <SectionBlock
            id="discover"
            number="1"
            label="Step One"
            title="Discover & Select"
            subtitle="Find the artwork that speaks to you. Use our smart filters and save your favorites."
            steps={discoverSteps}
            icon={Search}
            accentColor="#b68b5c"
            fullWidth
            isMobile={isMobile}
          />
        </div>

        <div id="purchase">
          <SectionBlock
            id="purchase"
            number="2"
            label="Step Two"
            title="Purchase & Receive"
            subtitle="Secure checkout, safe delivery, and full support until the artwork is in your hands."
            steps={purchaseSteps}
            icon={Package}
            accentColor="#8a7bb5"
            fullWidth
            isMobile={isMobile}
          />
        </div>

        <div id="benefits">
          <BenefitsSection perks={perks} fullWidth />
        </div>

        {/* Final CTA – clean bottom, no extra margin */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            width: '100%',
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
            background: 'linear-gradient(135deg, #f0e7db 0%, #e8dccc 100%)',
            color: '#2c2c2c',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            // No bottom margin – just the natural padding
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: -100,
              left: -100,
              right: -100,
              bottom: -100,
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(182,139,92,0.1) 0%, transparent 30%)',
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}
          >
            <Zap size={48} color="#b68b5c" style={{ marginBottom: '1rem' }} />
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontFamily: "'Playfair Display', serif",
              marginBottom: '1rem',
              color: '#2c2c2c',
            }}>
              Ready to find your perfect piece?
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              marginBottom: '2rem',
              color: '#4a4a4a',
            }}>
              Join thousands of collectors who trust us for original, hand-picked artwork.
            </p>
            <motion.a
              href="https://zigguratss.com/artworks"
              target="_blank"
              rel="noreferrer"
              whileHover={!isMobile && { scale: 1.05, boxShadow: '0 0 40px rgba(182,139,92,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                padding: isMobile ? '0.8rem 2rem' : '1rem 3rem',
                borderRadius: '50px',
                background: '#b68b5c',
                color: '#ffffff',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid transparent',
                transition: 'all 0.2s',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            >
              Browse Artworks
            </motion.a>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}