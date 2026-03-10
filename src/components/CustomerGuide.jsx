import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserCircle, Search, ShoppingCart, CreditCard, Package, Star,
  ArrowLeft, CheckCircle2, HeartHandshake, Truck, RefreshCw, MessageCircle,
} from 'lucide-react';
import ScrollProgress from './ScrollProgress';
import Navbar from './Navbar';
import Footer from './Footer';
import RevealOnScroll from './RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 'register',
    number: '01',
    icon: UserCircle,
    label: 'Step 1 — Account',
    title: 'Create Your Buyer Account',
    subtitle: 'Join the Zigguratss community in minutes. Your account gives you access to thousands of unique artworks from artists worldwide.',
    accentColor: '#c9a84c',
    steps: [
      'Visit zigguratss.com and click "My Account" in the top right corner.',
      'Select "Login / Register" to open the registration form.',
      'Fill in the JOIN US form with your Full Name, Email, Mobile Number, and Password.',
      'Select "I am a Buyer / Customer" from the options.',
      'Accept the Zigguratss Terms & Conditions.',
      'Click "JOIN US" to submit your registration.',
      'Check your inbox for a verification email from Zigguratss.',
      'Click "Link to Verify" in the email to activate your account.',
      'You are now ready to browse and purchase artwork!',
    ],
  },
  {
    id: 'browse',
    number: '02',
    icon: Search,
    label: 'Step 2 — Discover',
    title: 'Browse & Discover Artwork',
    subtitle: 'Explore a vast curated collection of original artworks. Use powerful filters to find exactly the piece that speaks to you.',
    accentColor: '#7c6baa',
    steps: [
      'Go to the "Artwork" section from the top navigation bar.',
      'Use the search bar to look for artworks by name, artist, or keyword.',
      'Filter artworks by category — paintings, sculptures, photography, and more.',
      'Filter by medium, technique, style, size, or price range.',
      'Browse by featured artists or trending artworks of the week.',
      'Click on any artwork to view its full details, dimensions, and artist bio.',
      'Add artworks to your Wishlist using the heart icon to save for later.',
      'Check the artist\'s profile to view more of their portfolio.',
    ],
  },
  {
    id: 'purchase',
    number: '03',
    icon: ShoppingCart,
    label: 'Step 3 — Purchase',
    title: 'Buy Your Favourite Artwork',
    subtitle: 'Purchasing on Zigguratss is safe, simple, and transparent. Know exactly what you are getting before you pay.',
    accentColor: '#c26b6b',
    steps: [
      'Open the artwork you want to buy and review its details carefully.',
      'Check the artwork dimensions, medium, technique, and condition.',
      'Click "Add to Cart" to add it to your shopping cart.',
      'Continue shopping or click the Cart icon to proceed to checkout.',
      'Review your cart items and confirm quantities.',
      'Enter your shipping address and delivery preferences.',
      'Choose your preferred payment method — PayPal, Visa, or bank transfer.',
      'Review the full order summary including shipping costs.',
      'Click "Place Order" to confirm your purchase.',
      'You will receive an order confirmation email with your order details.',
    ],
  },
  {
    id: 'delivery',
    number: '04',
    icon: Truck,
    label: 'Step 4 — Delivery',
    title: 'Shipping & Receiving Your Art',
    subtitle: 'We ensure your artwork arrives safely and in perfect condition. Track your order every step of the way.',
    accentColor: '#4bc9a8',
    steps: [
      'After your order is placed, the artist is notified to prepare the artwork.',
      'Artwork is carefully packaged to ensure it arrives undamaged.',
      'You will receive a shipping confirmation email with a tracking number.',
      'Use the tracking number to monitor your delivery status.',
      'Deliveries are made to your specified address via our courier partners.',
      'Inspect the artwork upon arrival for any damage before signing.',
      'If the artwork arrives damaged, photograph it immediately.',
      'Contact our support team within 48 hours of delivery for any issues.',
      'Leave a review for the artist to help the community grow!',
    ],
  },
];

const perks = [
  { icon: HeartHandshake, title: 'Original Artwork Only', desc: 'Every piece is 100% authentic and created by verified artists.', color: '#c9a84c' },
  { icon: CreditCard, title: 'Secure Checkout', desc: 'Multiple safe payment options including PayPal, Visa, and bank transfer.', color: '#7c6baa' },
  { icon: Truck, title: 'Worldwide Shipping', desc: 'We deliver artwork to your doorstep anywhere in the world.', color: '#c26b6b' },
  { icon: RefreshCw, title: 'Hassle-free Returns', desc: 'Not satisfied? Contact us within 48 hours for return assistance.', color: '#4bc9a8' },
  { icon: Star, title: 'Curated Collections', desc: 'Discover weekly featured artists and contest-winning artworks.', color: '#c9a84c' },
  { icon: MessageCircle, title: '24/7 Support', desc: 'Our dedicated support team is always ready to help you.', color: '#7c6baa' },
];

function StepItem({ text, index }) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: false, margin: '-30px', amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] } });
    } else {
      controls.set({ opacity: 0, x: -40, filter: 'blur(5px)' });
    }
  }, [inView]); // eslint-disable-line

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40, filter: 'blur(5px)' }}
      animate={controls}
      whileHover={{ x: 8, background: 'rgba(201,168,76,0.07)', borderColor: 'rgba(201,168,76,0.3)' }}
      style={{
        display: 'flex', gap: '14px', alignItems: 'flex-start',
        padding: '13px 16px', borderRadius: '12px',
        border: '1px solid transparent', cursor: 'default',
        transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -120 }}
        initial={{ scale: 0, rotate: -120 }}
        transition={{ duration: inView ? 0.45 : 0, delay: inView ? index * 0.06 + 0.1 : 0, type: 'spring', stiffness: 260 }}
        whileHover={{ rotate: 15, scale: 1.2 }}
      >
        <CheckCircle2 size={19} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
      </motion.div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', flex: 1 }}>
        <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--gold-dark)', letterSpacing: '0.08em', flexShrink: 0 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{text}</p>
      </div>
    </motion.div>
  );
}

function GuideSection({ s, idx }) {
  const isEven = idx % 2 !== 0;
  return (
    <section id={s.id} style={{
      padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 4vw, 1.5rem)',
      position: 'relative', overflow: 'hidden',
      background: isEven
        ? 'linear-gradient(160deg, #0e0e18 0%, #12121f 50%, #0a0a12 100%)'
        : 'linear-gradient(160deg, #09090e 0%, #0d0d16 50%, #111119 100%)',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2 }}
        style={{
          position: 'absolute',
          width: '500px', height: '500px', borderRadius: '50%',
          background: `radial-gradient(circle, ${s.accentColor} 0%, transparent 70%)`,
          left: isEven ? 'auto' : '-200px', right: isEven ? '-200px' : 'auto',
          top: '20%', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Text */}
          <div style={{ order: isEven ? 2 : 1 }}>
            <RevealOnScroll x={-20} y={0} delay={0} duration={0.6}>
              <div
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '6px 16px', borderRadius: '50px',
                  border: `1px solid ${s.accentColor}44`, background: `${s.accentColor}10`,
                  marginBottom: '1.5rem',
                }}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
                  style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${s.accentColor}, ${s.accentColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={14} color="#0a0a0f" strokeWidth={2.5} />
                </motion.div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.accentColor }}>{s.label}</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll y={0} scale={0.4} delay={0.07} duration={1.2}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, color: s.accentColor, lineHeight: 0.8, marginBottom: '-0.3em', userSelect: 'none', opacity: 0.07 }}>
                {s.number}
              </div>
            </RevealOnScroll>

            <RevealOnScroll y={40} delay={0.1} duration={0.8}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontFamily: "'Playfair Display', serif", fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '1rem' }}>
                {s.title}
                <span style={{ display: 'block', height: '3px', width: '60px', background: `linear-gradient(90deg, ${s.accentColor}, transparent)`, marginTop: '14px' }} />
              </h2>
            </RevealOnScroll>
            <RevealOnScroll y={20} delay={0.2} duration={0.7}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '480px' }}>
                {s.subtitle}
              </p>
            </RevealOnScroll>
          </div>

          {/* Steps card */}
          <RevealOnScroll y={60} delay={0.05} duration={0.9} style={{ order: isEven ? 1 : 2 }}>
            <motion.div
              whileHover={{ boxShadow: `0 30px 80px ${s.accentColor}22` }}
              style={{ background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border)', backdropFilter: 'blur(20px)', padding: '2rem', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.4s' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${s.accentColor}88, transparent)` }} />
              <motion.div
                animate={{ opacity: [0.08, 0.14, 0.08] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', background: `radial-gradient(circle, ${s.accentColor} 0%, transparent 70%)`, borderRadius: '50%', transform: 'translate(50px,-50px)', pointerEvents: 'none' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {s.steps.map((step, i) => <StepItem key={i} text={step} index={i} />)}
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

export default function CustomerGuide({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar onBack={onBack} isCustomerPage />

      {/* Hero */}
      <section style={{
        minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
        position: 'relative', overflow: 'hidden', padding: '8rem 1.5rem 4rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(124,107,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,107,170,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,107,170,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ x: -4, color: 'var(--gold)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', padding: '8px 18px',
              borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem',
              marginBottom: '2rem', backdropFilter: 'blur(10px)',
              transition: 'color 0.3s',
            }}
          >
            <ArrowLeft size={15} />
            Artist Guide
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px', borderRadius: '50px',
              border: '1px solid rgba(124,107,170,0.3)',
              background: 'rgba(124,107,170,0.08)',
              fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--accent)', fontWeight: 600, marginBottom: '2rem',
            }}
          >
            <Star size={12} fill="currentColor" />
            Complete Buyer Guide
            <Star size={12} fill="currentColor" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, skewY: 2 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, lineHeight: 1,
              background: 'linear-gradient(135deg, #f0ece2 30%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: '1.5rem',
            }}
          >
            Customer Guide
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ height: '3px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', width: '50%', margin: '0 auto 1.5rem', transformOrigin: 'center' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 2.5rem' }}
          >
            Everything you need to discover, purchase, and receive your perfect piece of art from <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Zigguratss</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.a href="#register" whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124,107,170,0.4)' }} whileTap={{ scale: 0.97 }}
              style={{ padding: '13px 32px', borderRadius: '50px', background: 'linear-gradient(135deg, var(--accent), #5a4d8a)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
              Start Here
            </motion.a>
            <motion.a href="https://zigguratss.com/artworks" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '13px 32px', borderRadius: '50px', border: '1px solid var(--border)', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
              Browse Artworks
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Guide Sections */}
      <main>
        {sections.map((s, i) => <GuideSection key={s.id} s={s} idx={i} />)}

        {/* Perks grid */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 4vw, 1.5rem)',
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(160deg, #0a0a0f 0%, #0d0d16 50%, #0f0f1c 100%)',
        }}>
          {/* Dot grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(124,107,170,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px', opacity: 0.4,
          }} />
          {/* Top hairline */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,107,170,0.3), transparent)' }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <RevealOnScroll y={40} duration={0.7} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>Why Buy With Us</span>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginTop: '0.8rem', color: 'var(--text-primary)' }}>
                  Your Art Buying Experience, Elevated
                </h2>
              </div>
            </RevealOnScroll>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {perks.map((p, i) => (
                <RevealOnScroll key={p.title} y={50} delay={i * 0.09} duration={0.6} margin='-40px'>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: `0 20px 60px ${p.color}22`, borderColor: `${p.color}44` }}
                    style={{ background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--border)', padding: '2rem', backdropFilter: 'blur(20px)', cursor: 'default', transition: 'all 0.3s ease' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      style={{ width: 50, height: 50, borderRadius: '14px', background: `linear-gradient(135deg, ${p.color}28, ${p.color}08)`, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}
                    >
                      <p.icon size={22} color={p.color} />
                    </motion.div>
                    <h3 style={{ fontSize: '1.05rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p.desc}</p>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 4vw, 1.5rem)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(160deg, #09090e 0%, #0d0c18 50%, #0a0a12 100%)',
        }}>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 70%)', pointerEvents: 'none' }}
          />
          <RevealOnScroll y={60} duration={0.9} style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ background: 'var(--card-bg)', borderRadius: '32px', border: '1px solid var(--border)', padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', backdropFilter: 'blur(20px)' }}>
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #5a4d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 40px rgba(124,107,170,0.4)' }}
              >
                <Package size={30} color="#fff" />
              </motion.div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: "'Playfair Display', serif", fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Ready to Find Your Perfect Piece?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                Thousands of original artworks are waiting to be discovered. Start your collection today.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.a href="https://zigguratss.com/artworks" target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(124,107,170,0.5)' }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '13px 34px', borderRadius: '50px', background: 'linear-gradient(135deg, var(--accent), #5a4d8a)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
                  Browse Artworks
                </motion.a>
                <motion.a href="https://zigguratss.com/signup" target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '13px 34px', borderRadius: '50px', border: '1px solid var(--border)', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
                  Create Account
                </motion.a>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </main>

      <Footer />
    </>
  );
}
