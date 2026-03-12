// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  —  Root component: page routing between Artist Guide & Customer Guide
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserPlus, Settings, ImagePlus, Palette } from 'lucide-react';

import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Timeline        from './components/Timeline';
import SectionBlock    from './components/SectionBlock';
import BenefitsSection from './components/BenefitsSection';
import CTABanner       from './components/CTABanner';
import Footer          from './components/Footer';
import ScrollProgress  from './components/ScrollProgress';
import CustomerGuide   from './components/CustomerGuide';
import ParticleCanvas  from './components/ParticleCanvas';
import AvatarGuide     from './components/AvatarGuide';

// ─── Step content data ───────────────────────────────────────────────────────

const registerSteps = [
  'Go to My Account on the top right corner of the website.',
  'Click on Login / Register.',
  'Fill in the JOIN US form — your Full Name, Email, Mobile Number, Password, and select "I am an artist".',
  'Select your profession: e.g. painter, sculptor, photographer, etc.',
  'Accept Zigguratss Terms & Conditions.',
  'Click on JOIN US to submit.',
  'A verification link will be sent to your email address.',
  'Click the "Link to Verify" button in your inbox.',
  'Your account is now verified and ready to use!',
];

const setupSteps = [
  'Login to your account with your email and password.',
  'Navigate to "My Profile" and complete your basic details — Name, Country, Address, and your Artist Bio.',
  'Add your payment details for payment gateway transactions.',
  'Enter your Bank Details (so you receive payments after artwork is sold).',
  'Add your Portfolio link to showcase your work.',
  'Double-check all information before submitting.',
  'Click the "Submit" button when ready.',
  'Go back to your profile and click "Add Other Information".',
  'Fill in your Awards & Recognition, Prizes Won, and Exhibition history.',
  'Click "Continue" to save your information.',
];

const uploadSteps = [
  'Navigate to the My Artwork section in your dashboard.',
  'Select the Type of Artwork you want to upload.',
  'Click "Submit" to proceed.',
  'Fill in all artwork details — medium, technique, style, and size.',
  'Select the primary image of your artwork.',
  'Choose whether you are available for Commission Work.',
  'Select your preferred Shipping Options.',
  'Accept Zigguratss Terms & Conditions for artwork.',
  'Click "Continue" to proceed.',
  'Add at least 5 high-quality images in the "Add More Images" section.',
  'Click "Submit" — your artwork is sent to our team for activation!',
];

const manageSteps = [
  'Monitor your artwork status from the My Artwork dashboard.',
  'Once activated by the Zigguratss team, your artwork is live and visible to buyers.',
  'Use your profile to update pricing, descriptions, or availability.',
  'Respond quickly to buyer inquiries to improve your conversion rate.',
  'Participate in weekly Zigguratss Contests to gain more visibility.',
  'Share your artwork pages on social media to drive traffic.',
  'Track earnings and payment history from your account dashboard.',
  'Update your portfolio regularly with new artworks.',
];

// ─── Page transition variants ────────────────────────────────────────────────

const pageVariants = {
  initial : { opacity: 0, y: 30,  filter: 'blur(8px)' },
  animate : { opacity: 1, y: 0,   filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit    : { opacity: 0, y: -20, filter: 'blur(8px)', transition: { duration: 0.4, ease: 'easeIn' } },
};

// ─── Component ───────────────────────────────────────────────────────────────

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
    <ParticleCanvas />
    <AvatarGuide />
    <AnimatePresence mode="wait">

      {page === 'artist' ? (
        <motion.div key="artist" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <ScrollProgress />
          <Navbar onSwitchPage={switchToCustomer} />

          <main>
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
              accentColor="#b8943e"
            />

            <SectionBlock
              id="setup"
              number="B"
              label="Step 2"
              title="Making your profile work for you"
              subtitle="Think of your profile as your digital studio. Add a photo, write something about yourself, and link your bank so you're ready to get paid."
              steps={setupSteps}
              icon={Settings}
              accentColor="#6d5f9a"
            />

            <SectionBlock
              id="upload"
              number="C"
              label="Step 3"
              title="Putting your work out there"
              subtitle="Upload at least 5 clear photos of each piece, add the details collectors actually care about — size, medium, price — and hit submit."
              steps={uploadSteps}
              icon={ImagePlus}
              accentColor="#b8943e"
            />

            <SectionBlock
              id="manage"
              number="D"
              label="Step 4"
              title="Staying on top of things"
              subtitle="Once you're live, it's about keeping things fresh — update your listings, respond to buyers and watch your presence on the platform grow."
              steps={manageSteps}
              icon={Palette}
              accentColor="#6d5f9a"
            />

            <BenefitsSection />
            <CTABanner />
          </main>

          <Footer onSwitchPage={switchToCustomer} />
        </motion.div>

      ) : (
        <motion.div key="customer" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <CustomerGuide onBack={switchToArtist} />
        </motion.div>
      )}

    </AnimatePresence>
    </>
  );
}
