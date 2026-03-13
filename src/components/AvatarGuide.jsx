// ─────────────────────────────────────────────────────────────────────────────
// AvatarGuide.jsx  —  Floating guide card: avatar + real UI mockup per section
// Card extends LEFT so it never covers page content. Avatar floats bottom-right.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Sparkles } from 'lucide-react';

// ─── Section data ─────────────────────────────────────────────────────────────
const SECTIONS = {
  hero:     { label: 'Welcome',        color: '#c4912a', text: "Hi! I'm Aria — your personal Zigguratss guide. I'll walk you through every step of joining as an artist. Just scroll down!" },
  timeline: { label: 'Overview',       color: '#c47a3a', text: "4 simple steps total: Register → Build Profile → Upload Art → Go Live. I'll guide you through each one clearly!" },
  register: { label: 'Step 1 · Register', color: '#c4912a', text: "Click 'My Account' → 'Login / Register'. Fill in your name, email and password, pick 'I am an artist', accept T&Cs and verify your email." },
  setup:    { label: 'Step 2 · Profile',  color: '#9a7a30', text: "Go to 'My Profile'. Add your photo, bio, country and portfolio link. Then enter your bank details so you can receive payments." },
  upload:   { label: 'Step 3 · Upload',   color: '#c4912a', text: "In 'My Artwork' click Add New. Choose art type, fill in size, medium and price, upload 5+ photos, set shipping options and submit!" },
  manage:   { label: 'Step 4 · Manage',   color: '#c47a3a', text: "Watch your dashboard — once our team activates your listing it's live! Respond to buyers fast, join contests, and keep your portfolio fresh." },
  benefits: { label: 'Your Benefits',     color: '#9a7a30', text: "You keep 85% of every sale, get secure payments, reach collectors in 120+ countries, 24/7 support, and weekly art contests." },
  cta:      { label: 'Get Started!',      color: '#c4912a', text: "You're all set! Hit 'Start Selling Free' — it takes 2 minutes and connects you with art collectors worldwide. Let's go!" },
};


// ─── Mini UI Mockups ──────────────────────────────────────────────────────────

function MockupLogin() {
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#fdf8ed" />
      <rect width="200" height="18" rx="8" fill="#e8d8a0" />
      <circle cx="12" cy="9" r="3.5" fill="#e07060" /><circle cx="22" cy="9" r="3.5" fill="#e0a040" /><circle cx="32" cy="9" r="3.5" fill="#60b060" />
      <rect x="44" y="4" width="112" height="10" rx="5" fill="white" opacity="0.6" />
      <text x="52" y="12" fontSize="5.5" fill="#8a7040" fontFamily="sans-serif">zigguratss.com/register</text>
      <rect x="30" y="24" width="140" height="100" rx="8" fill="white" stroke="#e8d090" strokeWidth="1" />
      <text x="58" y="40" fontSize="8" fontWeight="bold" fill="#1a1405" fontFamily="sans-serif">Join Zigguratss</text>
      <rect x="44" y="46" width="112" height="10" rx="4" fill="#fdf6e0" stroke="#c4912a" strokeWidth="1.2" />
      <text x="48" y="53.5" fontSize="5.5" fill="#8a6020" fontFamily="sans-serif">Full Name</text>
      <rect x="44" y="60" width="112" height="10" rx="4" fill="#fdf6e0" stroke="#d4b060" strokeWidth="0.8" />
      <text x="48" y="67.5" fontSize="5.5" fill="#aaa" fontFamily="sans-serif">Email Address</text>
      <rect x="44" y="74" width="112" height="10" rx="4" fill="#fdf6e0" stroke="#d4b060" strokeWidth="0.8" />
      <text x="48" y="81.5" fontSize="5.5" fill="#aaa" fontFamily="sans-serif">Password  ••••••••</text>
      <rect x="44" y="88" width="7" height="7" rx="2" fill="#c4912a" />
      <text x="53" y="94" fontSize="5" fill="#555" fontFamily="sans-serif">✓  I am an Artist</text>
      <rect x="44" y="100" width="112" height="13" rx="5" fill="#c4912a" />
      <text x="68" y="109.5" fontSize="6.5" fill="white" fontWeight="bold" fontFamily="sans-serif">JOIN US →</text>
    </svg>
  );
}

function MockupProfile() {
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#fdf8ed" />
      <rect width="50" height="130" fill="#e8d090" />
      <circle cx="25" cy="28" r="14" fill="#c4912a" opacity="0.45" />
      <ellipse cx="25" cy="26" rx="7" ry="8" fill="#d4a574" />
      <ellipse cx="25" cy="40" rx="12" ry="6" fill="#7a5520" />
      <text x="7" y="55" fontSize="5" fontWeight="bold" fill="#5a4010" fontFamily="sans-serif">My Profile</text>
      <text x="9" y="68" fontSize="4" fill="#7a6030" fontFamily="sans-serif">Dashboard</text>
      <text x="9" y="79" fontSize="4" fill="#7a6030" fontFamily="sans-serif">My Artwork</text>
      <text x="9" y="90" fontSize="4" fill="#7a6030" fontFamily="sans-serif">Earnings</text>
      <text x="9" y="101" fontSize="4" fill="#7a6030" fontFamily="sans-serif">Settings</text>
      <text x="58" y="22" fontSize="7.5" fontWeight="bold" fill="#1a1405" fontFamily="sans-serif">My Profile</text>
      <text x="58" y="36" fontSize="4.5" fill="#8a6020" fontFamily="sans-serif">Artist Bio</text>
      <rect x="58" y="39" width="130" height="18" rx="4" fill="white" stroke="#c4912a" strokeWidth="1" />
      <text x="63" y="50" fontSize="4" fill="#bbb" fontFamily="sans-serif">Tell collectors about yourself...</text>
      <text x="58" y="68" fontSize="4.5" fill="#8a6020" fontFamily="sans-serif">Bank Account</text>
      <rect x="58" y="71" width="130" height="10" rx="4" fill="white" stroke="#d4b060" strokeWidth="0.8" />
      <text x="63" y="78" fontSize="4" fill="#c4912a" fontFamily="sans-serif">XXXX-XXXX-XXXX</text>
      <text x="58" y="92" fontSize="4.5" fill="#8a6020" fontFamily="sans-serif">Portfolio Link</text>
      <rect x="58" y="95" width="92" height="10" rx="4" fill="white" stroke="#d4b060" strokeWidth="0.8" />
      <text x="63" y="102" fontSize="4" fill="#bbb" fontFamily="sans-serif">https://myart.com</text>
      <rect x="154" y="95" width="34" height="10" rx="4" fill="#c4912a" />
      <text x="161" y="102" fontSize="4.5" fill="white" fontWeight="bold" fontFamily="sans-serif">Save</text>
    </svg>
  );
}

function MockupUpload() {
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#fdf8ed" />
      <text x="12" y="18" fontSize="7.5" fontWeight="bold" fill="#1a1405" fontFamily="sans-serif">Upload Artwork</text>
      <rect x="12" y="24" width="88" height="60" rx="6" fill="white" stroke="#c4912a" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="35" y="52" fontSize="20" fill="#c4912a" fontFamily="sans-serif">🖼</text>
      <text x="16" y="70" fontSize="4.5" fill="#8a6020" fontFamily="sans-serif">Drop 5+ images here</text>
      <text x="20" y="78" fontSize="4" fill="#aaa" fontFamily="sans-serif">or click to browse</text>
      <rect x="106" y="24" width="22" height="22" rx="4" fill="#e8d090" stroke="#c4912a" strokeWidth="1" />
      <rect x="132" y="24" width="22" height="22" rx="4" fill="#e0c880" stroke="#d4b060" strokeWidth="0.8" />
      <rect x="158" y="24" width="30" height="22" rx="4" fill="#eedfb0" stroke="#d4b060" strokeWidth="0.8" />
      <text x="111" y="38" fontSize="11" fontFamily="sans-serif">🎨</text>
      <text x="137" y="38" fontSize="11" fontFamily="sans-serif">🖌</text>
      <text x="168" y="38" fontSize="12" fill="#c4912a" fontFamily="sans-serif">+</text>
      <text x="106" y="60" fontSize="4.5" fill="#8a6020" fontFamily="sans-serif">Medium / Style</text>
      <rect x="106" y="63" width="82" height="9" rx="3" fill="white" stroke="#d4b060" strokeWidth="0.8" />
      <text x="110" y="69.5" fontSize="4" fill="#c4912a" fontFamily="sans-serif">Oil on Canvas</text>
      <text x="106" y="80" fontSize="4.5" fill="#8a6020" fontFamily="sans-serif">Price (₹)</text>
      <rect x="106" y="83" width="82" height="9" rx="3" fill="white" stroke="#d4b060" strokeWidth="0.8" />
      <text x="110" y="89.5" fontSize="4" fill="#bbb" fontFamily="sans-serif">Enter price...</text>
      <rect x="12" y="100" width="176" height="18" rx="6" fill="#c4912a" />
      <text x="56" y="112" fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif">Submit for Review →</text>
    </svg>
  );
}

function MockupDashboard() {
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#fdf8ed" />
      <text x="12" y="18" fontSize="7" fontWeight="bold" fill="#1a1405" fontFamily="sans-serif">My Dashboard</text>
      <rect x="12" y="24" width="50" height="30" rx="5" fill="white" stroke="#e8d090" strokeWidth="1" />
      <text x="18" y="37" fontSize="11" fontWeight="bold" fill="#c4912a" fontFamily="sans-serif">3</text>
      <text x="18" y="47" fontSize="4" fill="#7a6030" fontFamily="sans-serif">Artworks Live</text>
      <rect x="68" y="24" width="50" height="30" rx="5" fill="white" stroke="#e8d090" strokeWidth="1" />
      <text x="74" y="37" fontSize="11" fontWeight="bold" fill="#c4912a" fontFamily="sans-serif">12</text>
      <text x="74" y="47" fontSize="4" fill="#7a6030" fontFamily="sans-serif">Inquiries</text>
      <rect x="124" y="24" width="64" height="30" rx="5" fill="white" stroke="#e8d090" strokeWidth="1" />
      <text x="128" y="37" fontSize="9" fontWeight="bold" fill="#c4912a" fontFamily="sans-serif">₹ 4,800</text>
      <text x="130" y="47" fontSize="4" fill="#7a6030" fontFamily="sans-serif">Earnings</text>
      <rect x="12" y="62" width="176" height="62" rx="6" fill="white" stroke="#e8d090" strokeWidth="1" />
      <text x="18" y="75" fontSize="5" fontWeight="bold" fill="#3a2a08" fontFamily="sans-serif">Artwork</text>
      <text x="100" y="75" fontSize="5" fontWeight="bold" fill="#3a2a08" fontFamily="sans-serif">Status</text>
      <text x="158" y="75" fontSize="5" fontWeight="bold" fill="#3a2a08" fontFamily="sans-serif">Views</text>
      <line x1="12" y1="78" x2="188" y2="78" stroke="#e8d090" strokeWidth="0.8" />
      <text x="18" y="90" fontSize="4.5" fill="#555" fontFamily="sans-serif">Sunset in Blue</text>
      <rect x="96" y="84" width="34" height="8" rx="4" fill="#c2f0c2" />
      <text x="100" y="90" fontSize="4" fill="#2a6a2a" fontFamily="sans-serif">● Active</text>
      <text x="162" y="90" fontSize="4.5" fill="#555" fontFamily="sans-serif">248</text>
      <text x="18" y="104" fontSize="4.5" fill="#555" fontFamily="sans-serif">Forest Morning</text>
      <rect x="96" y="98" width="40" height="8" rx="4" fill="#fff0c0" />
      <text x="100" y="104" fontSize="4" fill="#a07000" fontFamily="sans-serif">● Pending</text>
      <text x="162" y="104" fontSize="4.5" fill="#aaa" fontFamily="sans-serif">—</text>
      <text x="18" y="118" fontSize="4.5" fill="#555" fontFamily="sans-serif">Abstract Flow</text>
      <rect x="96" y="112" width="34" height="8" rx="4" fill="#c2f0c2" />
      <text x="100" y="118" fontSize="4" fill="#2a6a2a" fontFamily="sans-serif">● Active</text>
      <text x="162" y="118" fontSize="4.5" fill="#555" fontFamily="sans-serif">91</text>
    </svg>
  );
}

function MockupOverview() {
  const steps = [
    { n: '01', label: 'Register',  y: 28,  active: true  },
    { n: '02', label: 'Profile',   y: 58,  active: false },
    { n: '03', label: 'Upload',    y: 88,  active: false },
    { n: '04', label: 'Go Live',   y: 118, active: false },
  ];
  return (
    <svg viewBox="0 0 200 135" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="135" rx="8" fill="#fdf8ed" />
      {steps.map(({ n, label, y, active }) => (
        <g key={n}>
          <circle cx="28" cy={y} r="11" fill={active ? '#c4912a' : 'white'} stroke="#c4912a" strokeWidth="1.5" />
          <text x="28" y={y + 3.5} fontSize="6" fontWeight="bold" fill={active ? 'white' : '#c4912a'} textAnchor="middle" fontFamily="sans-serif">{n}</text>
          {y < 118 && <line x1="28" y1={y + 11} x2="28" y2={y + 19} stroke="#d4b060" strokeWidth="1.5" strokeDasharray="3 2" />}
          <rect x="46" y={y - 12} width="142" height="24" rx="5" fill="white" stroke="#e8d090" strokeWidth="1" />
          <text x="56" y={y + 4} fontSize="6.5" fontWeight="bold" fill="#2a1a04" fontFamily="sans-serif">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function MockupBenefits() {
  const items = [
    { icon: '💰', text: 'Keep 85% Revenue', col: 0 },
    { icon: '🌍', text: '120+ Countries',   col: 1 },
    { icon: '🔒', text: 'Secure Payments',  col: 0 },
    { icon: '🏆', text: 'Weekly Contests',  col: 1 },
    { icon: '📈', text: 'Brand Growth',     col: 0 },
    { icon: '🎧', text: '24/7 Support',     col: 1 },
  ];
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#fdf8ed" />
      <text x="50" y="16" fontSize="8" fontWeight="bold" fill="#1a1405" fontFamily="sans-serif">Why Zigguratss?</text>
      {items.map(({ icon, text, col }, i) => {
        const row = Math.floor(i / 2);
        const x = col === 0 ? 10 : 105;
        const y = 22 + row * 34;
        return (
          <g key={text}>
            <rect x={x} y={y} width="90" height="28" rx="6" fill="white" stroke="#e8d090" strokeWidth="1" />
            <text x={x + 7} y={y + 18} fontSize="13" fontFamily="sans-serif">{icon}</text>
            <text x={x + 27} y={y + 12} fontSize="5" fontWeight="bold" fill="#2a1a04" fontFamily="sans-serif">{text}</text>
            <text x={x + 27} y={y + 21} fontSize="3.8" fill="#8a7030" fontFamily="sans-serif">Artist benefit</text>
          </g>
        );
      })}
    </svg>
  );
}

function MockupCTA() {
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#fdf8ed" />
      <ellipse cx="100" cy="55" rx="50" ry="42" fill="#e8d090" opacity="0.4" />
      <text x="72" y="65" fontSize="36" fontFamily="sans-serif">🎨</text>
      <text x="22" y="100" fontSize="7.5" fontWeight="bold" fill="#1a1405" fontFamily="sans-serif">Ready to sell your art?</text>
      <text x="22" y="112" fontSize="5" fill="#7a6030" fontFamily="sans-serif">Join 10,000+ artists on Zigguratss today</text>
      <rect x="22" y="116" width="156" height="12" rx="5" fill="#c4912a" />
      <text x="54" y="125" fontSize="6" fill="white" fontWeight="bold" fontFamily="sans-serif">Start Selling Free →</text>
    </svg>
  );
}

function MockupWelcome() {
  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ borderRadius: 8, display: 'block' }}>
      <rect width="200" height="130" rx="8" fill="#f5ead0" />
      <rect width="200" height="16" fill="#e8d090" rx="8" />
      <circle cx="11" cy="8" r="3" fill="#e07060" /><circle cx="20" cy="8" r="3" fill="#e0a040" /><circle cx="29" cy="8" r="3" fill="#60b060" />
      <rect x="38" y="3" width="124" height="10" rx="5" fill="white" opacity="0.5" />
      <text x="46" y="11" fontSize="5" fill="#8a7040" fontFamily="sans-serif">zigguratss.com · Artist Guide</text>
      <text x="38" y="46" fontSize="9" fontStyle="italic" fill="#8a5e10" fontFamily="serif">Artist</text>
      <text x="22" y="78" fontSize="26" fontWeight="900" fill="#1a1405" fontFamily="serif">Guide</text>
      <rect x="28" y="83" width="70" height="3" rx="1.5" fill="#c4912a" />
      <rect x="25" y="95" width="72" height="14" rx="5" fill="#c4912a" />
      <text x="34" y="105" fontSize="5.5" fill="white" fontWeight="bold" fontFamily="sans-serif">Get Started →</text>
      {[[152,38],[164,60],[142,75],[172,52],[156,92],[148,110]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={3 + i % 3} fill="#c4912a" opacity={0.18 + i * 0.07} />
      ))}
    </svg>
  );
}

const MOCKUPS = {
  hero:     MockupWelcome,
  timeline: MockupOverview,
  register: MockupLogin,
  setup:    MockupProfile,
  upload:   MockupUpload,
  manage:   MockupDashboard,
  benefits: MockupBenefits,
  cta:      MockupCTA,
};

// ─── Small avatar face ────────────────────────────────────────────────────────
function AvatarFace({ blink }) {
  return (
    <svg viewBox="0 0 56 56" width="56" height="56" style={{ display: 'block' }}>
      <circle cx="28" cy="28" r="27" fill="none" stroke="#c4912a" strokeWidth="1.5" opacity="0.45" />
      <circle cx="28" cy="28" r="24" fill="#d4a574" />
      <ellipse cx="28" cy="12" rx="16" ry="10" fill="#3d2008" />
      <path d="M12 18 Q10 10 18 6 Q28 2 38 6 Q46 10 44 18" fill="#3d2008" />
      <path d="M16 13 Q22 8 28 9" stroke="#6b3a12" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="5" cy="29" rx="3.5" ry="5" fill="#c89060" />
      <ellipse cx="51" cy="29" rx="3.5" ry="5" fill="#c89060" />
      <path d="M17 22 Q21 20 24 21" stroke="#3d2008" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M32 21 Q35 20 39 22" stroke="#3d2008" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <ellipse cx="21" cy="28" rx="4" ry={blink ? 0.6 : 3.8} fill="white" />
      <ellipse cx="21" cy="28" rx="2.5" ry={blink ? 0.4 : 2.5} fill="#3d2008" />
      <circle cx="22" cy="27" r="0.9" fill="white" opacity={blink ? 0 : 1} />
      <ellipse cx="35" cy="28" rx="4" ry={blink ? 0.6 : 3.8} fill="white" />
      <ellipse cx="35" cy="28" rx="2.5" ry={blink ? 0.4 : 2.5} fill="#3d2008" />
      <circle cx="36" cy="27" r="0.9" fill="white" opacity={blink ? 0 : 1} />
      <path d="M26 32 Q24 37 23 39 Q28 41 33 39 Q32 37 30 32" stroke="#c08050" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M22 43 Q28 47 34 43" stroke="#8a5020" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="14" cy="36" rx="5" ry="3" fill="#e07060" opacity="0.14" />
      <ellipse cx="42" cy="36" rx="5" ry="3" fill="#e07060" opacity="0.14" />
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function AvatarGuide() {
  const [minimized, setMinimized]     = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));
  const [dismissed, setDismissed]     = useState(false);
  const [section, setSection]         = useState('hero');
  const [blink, setBlink]             = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  // Each history entry is { id: sectionId, uniq: number }
  const [history, setHistory]         = useState([{ id: 'hero', uniq: 0 }]);
  const uniqRef = useRef(1);
  const [isMobile, setIsMobile]       = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));

  const textScrollRef = useRef(null);

  const data   = SECTIONS[section]  || SECTIONS.hero;
  const Mockup = MOCKUPS[section]   || MockupWelcome;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Section detection via IntersectionObserver
  useEffect(() => {
    const ids = ['hero','timeline','register','setup','upload','manage','benefits','cta'];
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardVisible(false);
            setTimeout(() => {
              setSection((prev) => (prev === id ? prev : id));
              setHistory((prev) => {
                if (prev.length && prev[prev.length - 1].id === id) return prev;
                const next = [...prev, { id, uniq: uniqRef.current++ }];
                // Remove earlier duplicate ids to avoid multiple of same section
                const seen = new Set();
                const deduped = [];
                for (let i = next.length - 1; i >= 0; i--) {
                  if (!seen.has(next[i].id)) {
                    deduped.unshift(next[i]);
                    seen.add(next[i].id);
                  }
                }
                return deduped.slice(-6);
              });
              setCardVisible(true);
            }, 200);
          }
        },
        { threshold: 0.28 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  // Realistic blink timing
  useEffect(() => {
    let t;
    const tick = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 100);
      t = setTimeout(tick, 2800 + Math.random() * 2600);
    };
    t = setTimeout(tick, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = textScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [section, history, minimized]);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:      'fixed',
        bottom:        isMobile ? 'max(10px, env(safe-area-inset-bottom))' : '24px',
        right:         isMobile ? '10px' : '24px',
        left:          'auto',
        zIndex:        9000,
        display:       'flex',
        flexDirection: 'row',
        alignItems:    'flex-end',
        gap:           isMobile ? '8px' : '10px',
        width:         'auto',
        pointerEvents: 'none',
      }}
    >
      {/* ── Guide card — grows to the LEFT, never overlaps page content ── */}
      <AnimatePresence mode="wait">
        {!minimized && cardVisible && (
          <motion.div
            key={section}
            initial={{ opacity: 0, x: 28, scale: 0.94 }}
            animate={{ opacity: 1, x: 0,  scale: 1 }}
            exit={{   opacity: 0, x: 18,  scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              pointerEvents:  'auto',
              width:          isMobile ? 'min(78vw, 290px)' : '300px',
              maxWidth:       isMobile ? '78vw' : '300px',
              maxHeight:      isMobile ? 'min(52vh, 420px)' : 'min(70vh, 560px)',
              background:     'rgba(255,251,243,0.96)',
              border:         '1.5px solid rgba(196,145,42,0.3)',
              borderRadius:   '16px',
              boxShadow:      '0 12px 50px rgba(50,35,5,0.2), 0 2px 10px rgba(196,145,42,0.1)',
              backdropFilter: 'blur(16px)',
              display:        'flex',
              flexDirection:  'column',
              overflow:       'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '9px 12px',
              background:     `linear-gradient(90deg, ${data.color}22, ${data.color}08)`,
              borderBottom:   `1px solid ${data.color}28`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Sparkles size={12} color={data.color} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: data.color }}>
                  {data.label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[
                  { action: () => setMinimized(true), icon: <ChevronDown size={9} /> },
                  { action: () => setDismissed(true),  icon: <X size={9} /> },
                ].map(({ action, icon }, i) => (
                  <button key={i} onClick={action} style={{
                    background: 'rgba(196,145,42,0.1)', border: '1px solid rgba(196,145,42,0.22)',
                    borderRadius: '50%', width: 20, height: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(80,55,10,0.6)', padding: 0,
                  }}>{icon}</button>
                ))}
              </div>
            </div>

            {/* UI Mockup — shows real interface for this step */}
            <div style={{
              margin:       '10px 12px 0',
              borderRadius: '10px',
              overflow:     'hidden',
              maxHeight:    isMobile ? '92px' : 'none',
              flexShrink:   0,
              border:       '1px solid rgba(196,145,42,0.18)',
              boxShadow:    '0 2px 10px rgba(50,35,5,0.08)',
            }}>
              <Mockup />
            </div>

            {/* Guide text */}
            <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div
                ref={textScrollRef}
                style={{
                  display:      'flex',
                  flexDirection:'column',
                  gap:          '8px',
                  maxHeight:    isMobile ? '110px' : '160px',
                  overflowY:    'auto',
                  paddingRight: '2px',
                }}
              >
                {history.map(({ id, uniq }, idx) => {
                  const item = SECTIONS[id];
                  if (!item) return null;
                  const isActive = id === section;
                  return (
                    <motion.div
                      key={uniq}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        border:       isActive ? `1px solid ${item.color}44` : '1px solid rgba(196,145,42,0.20)',
                        background:   isActive ? `${item.color}14` : 'rgba(196,145,42,0.06)',
                        borderRadius: '10px',
                        padding:      '7px 9px',
                        boxShadow:    isActive ? '0 2px 12px rgba(196,145,42,0.10)' : 'none',
                        transition:   'box-shadow 0.3s',
                      }}
                    >
                      <div
                        style={{
                          fontSize:      '0.62rem',
                          color:         item.color,
                          fontWeight:    700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom:  '3px',
                        }}
                      >
                        {item.label}
                      </div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + idx * 0.07 }}
                        style={{ fontSize: '0.8rem', color: '#2d1e04', lineHeight: 1.55, margin: 0 }}
                      >
                        {item.text}
                      </motion.p>
                    </motion.div>
                  );
                })}
              </div>
              {/* Progress bar dots */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '9px', alignItems: 'center', flexWrap: 'wrap' }}>
                {Object.keys(SECTIONS).map((id) => (
                  <div key={id} style={{
                    width:        id === section ? 18 : 6,
                    height:       5,
                    borderRadius: '3px',
                    background:   id === section ? `linear-gradient(90deg, ${data.color}, #e8c060)` : 'rgba(196,145,42,0.18)',
                    transition:   'all 0.4s ease',
                  }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Avatar column — stays fixed bottom-right ── */}
      <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          onClick={minimized ? () => setMinimized(false) : undefined}
          style={{
            background:     'rgba(255,251,243,0.96)',
            border:         '2px solid rgba(196,145,42,0.4)',
            borderRadius:   '50%',
            width:          isMobile ? 60 : 68,
            height:         isMobile ? 60 : 68,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      '0 8px 28px rgba(50,35,5,0.2), 0 0 0 3px rgba(196,145,42,0.1)',
            cursor:         minimized ? 'pointer' : 'default',
            position:       'relative',
          }}
        >
          <AvatarFace blink={blink} />
          {/* Online green dot */}
          <div style={{
            position: 'absolute', bottom: 4, right: 4,
            width: 12, height: 12, borderRadius: '50%',
            background: '#4ade80', border: '2px solid white',
            boxShadow: '0 0 6px rgba(74,222,128,0.6)',
          }} />
        </motion.div>

        {!isMobile && (
          <div style={{
            background:    `linear-gradient(90deg, ${data.color}, #e0b040)`,
            color:         '#1a0e02',
            fontSize:      '0.6rem',
            fontWeight:    800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding:       '2px 10px',
            borderRadius:  '12px',
            whiteSpace:    'nowrap',
            boxShadow:     '0 2px 8px rgba(196,145,42,0.28)',
          }}>
            Aria · Guide
          </div>
        )}

        {minimized && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ fontSize: '0.6rem', color: 'rgba(100,72,15,0.7)', fontWeight: 600 }}
          >
            Tap to open
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
