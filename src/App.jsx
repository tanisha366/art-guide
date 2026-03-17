import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserPlus, Settings, ImagePlus, Palette } from 'lucide-react';

import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Timeline        from './components/Timeline';
import SectionBlock    from './components/SectionBlock';
import BenefitsSection from './components/BenefitsSection';
import CTABanner       from './components/CTABanner';
import ScrollProgress  from './components/ScrollProgress';
import CustomerGuide   from './components/CustomerGuide';
import ParticleCanvas  from './components/ParticleCanvas';
import AvatarGuide     from './components/AvatarGuide';

// ─── Step data (artist) ─────────────────────────────────────────────────────
const registerSteps = [
  'Go to My Account on the top right corner.',
  'Click on Login / Register.',
  'Fill JOIN US form: Full Name, Email, Mobile, Password, select "I am an artist".',
  'Choose your profession (painter, sculptor, etc.).',
  'Accept Terms & Conditions.',
  'Click JOIN US.',
  'A verification link will be sent to your email.',
  'Click "Link to Verify" in the email.',
  'Your account is verified and ready!',
];

const setupSteps = [
  'Login to your account.',
  'Go to "My Profile" and complete basic details (Name, Country, Address, Bio).',
  'Add payment details for transactions.',
  'Enter Bank Details to receive payments.',
  'Add your Portfolio link.',
  'Double-check all info.',
  'Click Submit.',
  'Go back to profile and click "Add Other Information".',
  'Fill in Awards, Recognition, Prizes, Exhibition history.',
  'Click Continue to save.',
];

const uploadSteps = [
  'Navigate to My Artwork in your dashboard.',
  'Select Type of Artwork.',
  'Click Submit.',
  'Fill details: medium, technique, style, size.',
  'Select primary image.',
  'Indicate if available for Commission Work.',
  'Choose Shipping Options.',
  'Accept Terms & Conditions.',
  'Click Continue.',
  'Add at least 5 high-quality images.',
  'Click Submit — artwork sent for activation.',
];

const manageSteps = [
  'Monitor artwork status in My Artwork dashboard.',
  'Once activated, artwork is live and visible.',
  'Update pricing, descriptions, or availability.',
  'Respond quickly to buyer inquiries.',
  'Participate in weekly Contests for visibility.',
  'Share artwork pages on social media.',
  'Track earnings and payment history.',
  'Update portfolio regularly.',
];

// ─── Page transitions ───────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

// ─── Particle background generator (same as CustomerGuide) ──────────────────
const earthyColors = [
  '#b85e3a', '#c47e5a', '#a5673f', '#8b5a2b', '#b78c5a', '#d9a066',
  '#e3b37c', '#c9a34b', '#d4af37', '#bf8f3f', '#9e7b56', '#7d6b4b',
];

const flameParticles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 120 + Math.random() * 280,
  delay: Math.random() * 6,
  duration: 12 + Math.random() * 12,
  color: earthyColors[i % earthyColors.length],
}));

export default function App() {
  const [page, setPage] = useState('artist');

  const switchToCustomer = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setPage('customer'), 200);
  };

  const switchToArtist = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setPage('artist'), 200);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {page === 'artist' ? (
          <motion.div
            key="artist"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'relative',
              background: '#f9f6f2',
              width: '100%',
              overflowX: 'hidden',
            }}
          >
            {/* Particle background */}
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
                  position: 'fixed',
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Additional floating shapes */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15], rotate: [0, 15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'fixed',
                top: '10%',
                left: '5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(201,163,75,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], rotate: [0, -15, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{
                position: 'fixed',
                bottom: '10%',
                right: '5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(139,90,43,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <ScrollProgress />
            <Navbar onSwitchPage={switchToCustomer} sticky />

            {/* AI Avatar */}
            <div style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              zIndex: 1000,
              pointerEvents: 'none',
            }}>
              <ParticleCanvas />
              <div style={{ pointerEvents: 'auto' }}>
                <AvatarGuide />
              </div>
            </div>

            <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>
              {/* Hero – ensure heading is black (modify Hero component or pass style) */}
              <Hero />

              <Timeline />

              <SectionBlock
                id="register"
                number="A"
                label="Step 1"
                title="Getting yourself registered"
                subtitle="It only takes a few minutes. Fill in your details, verify your email, and you're in — no complicated forms, nothing to pay upfront."
                steps={registerSteps}
                icon={UserPlus}
                accentColor="#b68b5c"
                tiltEffect
                // Assuming SectionBlock accepts titleColor prop; if not, we can override in component
              />

              <SectionBlock
                id="setup"
                number="B"
                label="Step 2"
                title="Making your profile work for you"
                subtitle="Think of your profile as your digital studio. Add a photo, write about yourself, and link your bank so you're ready to get paid."
                steps={setupSteps}
                icon={Settings}
                accentColor="#8a7bb5"
                tiltEffect
              />

              <SectionBlock
                id="upload"
                number="C"
                label="Step 3"
                title="Putting your work out there"
                subtitle="Upload at least 5 clear photos of each piece, add the details collectors actually care about — size, medium, price — and hit submit."
                steps={uploadSteps}
                icon={ImagePlus}
                accentColor="#b68b5c"
                tiltEffect
              />

              <SectionBlock
                id="manage"
                number="D"
                label="Step 4"
                title="Staying on top of things"
                subtitle="Once you're live, it's about keeping things fresh — update listings, respond to buyers, and watch your presence grow."
                steps={manageSteps}
                icon={Palette}
                accentColor="#8a7bb5"
                tiltEffect
              />

              <BenefitsSection />
              <CTABanner />
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="customer"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CustomerGuide onBack={switchToArtist} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}