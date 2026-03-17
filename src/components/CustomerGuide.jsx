import { useEffect, useState } from 'react';
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

// Custom hook for media query
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

const customerSections = [ /* ... same as before ... */ ];
const perks = [ /* ... same as before ... */ ];

export default function CustomerGuide({ onBack }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  const { scrollYProgress } = useScroll();
  // On mobile, reduce parallax movement to zero
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -80]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  const earthyColors = ['#b85e3a', '#8b5a2b', '#b78c5a', '#c9a34b', '#9e7b56'];

  // Particle counts – drastically reduced on mobile
  const flameCount = isMobile ? 4 : 12;
  const bubbleCount = isMobile ? 2 : 6;

  const flameParticles = Array.from({ length: flameCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: isMobile ? 60 + Math.random() * 80 : 80 + Math.random() * 150,
    delay: Math.random() * 5,
    duration: isMobile ? 8 + Math.random() * 8 : 10 + Math.random() * 10,
    color: earthyColors[i % earthyColors.length],
  }));

  const bubbleParticles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i + 100,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: isMobile ? 100 + Math.random() * 100 : 150 + Math.random() * 200,
    delay: Math.random() * 6,
    duration: isMobile ? 10 + Math.random() * 10 : 15 + Math.random() * 15,
    color: earthyColors[(i + 2) % earthyColors.length],
  }));

  // Disable particle animations on mobile for performance
  const particleAnimation = isMobile
    ? { opacity: 0.1 } // static
    : {
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.25, 0.1],
      };

  const bubbleAnimation = isMobile
    ? { opacity: 0.05 }
    : {
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.12, 0.05],
      };

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

        {/* Parallax overlay – disabled on mobile */}
        {!isMobile && (
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
        )}

        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            minHeight: isMobile ? 'auto' : '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '100%',
            padding: isMobile ? '6rem 1rem 4rem' : '0 5vw',
          }}
        >
          {/* Particles – static on mobile */}
          {flameParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={particleAnimation}
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
                willChange: isMobile ? 'auto' : 'transform, opacity',
              }}
            />
          ))}

          {bubbleParticles.map((particle) => (
            <motion.div
              key={particle.id}
              animate={bubbleAnimation}
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
                willChange: isMobile ? 'auto' : 'transform, opacity',
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
                fontSize: isMobile ? 'clamp(2.5rem, 15vw, 3.5rem)' : 'clamp(3.5rem, 10vw, 7rem)',
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
                width: isMobile ? '80px' : '120px',
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
                fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 2.2vw, 1.3rem)',
                color: '#4a3f38',
                maxWidth: '700px',
                margin: '0 auto 2rem',
                lineHeight: 1.6,
                padding: isMobile ? '0 1rem' : 0,
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
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: isMobile ? '0.6rem 1.5rem' : '0.8rem 2rem',
                  borderRadius: '40px',
                  background: '#000000',
                  color: '#ffffff',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Browse Artworks <ArrowRight size={isMobile ? 16 : 18} />
              </motion.a>
              <motion.a
                href="https://zigguratss.com/signup"
                target="_blank"
                rel="noreferrer"
                whileHover={isMobile ? {} : { scale: 1.05, borderColor: '#000000' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: isMobile ? '0.6rem 1.5rem' : '0.8rem 2rem',
                  borderRadius: '40px',
                  border: '1px solid #00000080',
                  color: '#000000',
                  fontSize: isMobile ? '0.9rem' : '1rem',
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
                gap: isMobile ? '1rem' : 'clamp(1.5rem, 5vw, 3rem)',
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
                  <stat.icon size={isMobile ? 24 : 28} color="#000" style={{ marginBottom: '0.3rem' }} />
                  <div style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 700, color: '#000' }}>{stat.value}</div>
                  <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Step sections – ensure SectionBlock also has mobile optimizations */}
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
            isMobile={isMobile} // pass down to SectionBlock if it accepts this prop
          />
        ))}

        <BenefitsSection perks={perks} fullWidth />

        {/* Final CTA */}
        <section
          style={{
            width: '100%',
            padding: isMobile ? '3rem 1rem' : '4rem 5vw',
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
              fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 5vw, 3rem)',
              fontFamily: "'Playfair Display', serif",
              color: '#000',
              marginBottom: '1rem',
            }}>
              Ready to find your perfect piece?
            </h2>
            <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', color: '#4a4a4a', marginBottom: '2rem' }}>
              Explore thousands of original artworks.
            </p>
            <motion.a
              href="https://zigguratss.com/artworks"
              target="_blank"
              rel="noreferrer"
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                padding: isMobile ? '0.6rem 2rem' : '0.8rem 2.5rem',
                borderRadius: '40px',
                background: '#000',
                color: '#fff',
                fontSize: isMobile ? '0.9rem' : '1rem',
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