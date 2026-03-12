// ─────────────────────────────────────────────────────────────────────────────
// AvatarGuide.jsx  —  Floating guide card: avatar + real UI mockup per section
// Card extends LEFT so it never covers page content. Avatar floats bottom-right.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Sparkles } from 'lucide-react';

// ─── Section data ─────────────────────────────────────────────────────────────
const SECTIONS = {
  hero:     { label: 'Welcome',        color: '#c4912a', text: "Hi! I'm Aria — your personal Zigguratss guide. I'll walk you through every step of joining as an artist. Just scroll down!" },
  timeline: { label: 'Overview',       color: '#b8943e', text: "4 simple steps total: Register → Build Profile → Upload Art → Go Live. I'll guide you through each one clearly!" },
  register: { label: 'Step 1 · Register', color: '#c4912a', text: "Click 'My Account' → 'Login / Register'. Fill in your name, email and password, pick 'I am an artist', accept T&Cs and verify your email." },
  setup:    { label: 'Step 2 · Profile',  color: '#9a7a30', text: "Go to 'My Profile'. Add your photo, bio, country and portfolio link. Then enter your bank details so you can receive payments." },
  upload:   { label: 'Step 3 · Upload',   color: '#c4912a', text: "In 'My Artwork' click Add New. Choose art type, fill in size, medium and price, upload 5+ photos, set shipping options and submit!" },
  manage:   { label: 'Step 4 · Manage',   color: '#b8943e', text: "Watch your dashboard — once our team activates your listing it's live! Respond to buyers fast, join contests, and keep your portfolio fresh." },
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
    <svg viewBox="0 0 64 64" width="58" height="58" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="ag-face" cx="42%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#fad4a0" />
          <stop offset="55%"  stopColor="#e8b078" />
          <stop offset="100%" stopColor="#c88848" />
        </radialGradient>
        <radialGradient id="ag-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e06858" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e06858" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ag-hair" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="#3d2008" />
          <stop offset="40%"  stopColor="#1e0e04" />
          <stop offset="100%" stopColor="#2e1508" />
        </linearGradient>
        <radialGradient id="ag-iris" cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#6b4020" />
          <stop offset="55%"  stopColor="#3a1e08" />
          <stop offset="100%" stopColor="#0e0804" />
        </radialGradient>
        <linearGradient id="ag-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4a3580" />
          <stop offset="100%" stopColor="#2a1e50" />
        </linearGradient>
        <filter id="ag-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#8a5020" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Neck */}
      <rect x="23" y="51" width="18" height="14" rx="5" fill="#d4a068" />
      <rect x="26" y="54" width="12" height="8" rx="3" fill="#c09050" opacity="0.4" />

      {/* Shirt / collar */}
      <ellipse cx="32" cy="66" rx="28" ry="12" fill="url(#ag-shirt)" />
      <path d="M26 61 Q32 66 38 61 Q36 64 32 64 Q28 64 26 61Z" fill="#fff" opacity="0.18" />

      {/* ── Face ── */}
      <ellipse cx="32" cy="33" rx="23" ry="26" fill="url(#ag-face)" filter="url(#ag-shadow)" />

      {/* Ears */}
      <ellipse cx="9"  cy="34" rx="4.5" ry="6.5" fill="#e0a870" />
      <ellipse cx="9"  cy="34" rx="2.5" ry="4"   fill="#c88848" opacity="0.5" />
      <ellipse cx="55" cy="34" rx="4.5" ry="6.5" fill="#e0a870" />
      <ellipse cx="55" cy="34" rx="2.5" ry="4"   fill="#c88848" opacity="0.5" />

      {/* ── Hair ── */}
      <ellipse cx="32" cy="14" rx="23" ry="16" fill="url(#ag-hair)" />
      <path d="M9 22 Q7 10 16 5 Q32 0 48 5 Q57 10 55 22" fill="url(#ag-hair)" />
      {/* Hair side strands */}
      <path d="M9 24 Q6 34 10 42" stroke="#2e1508" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M55 24 Q58 34 54 42" stroke="#2e1508" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Hair highlight */}
      <path d="M18 9 Q28 4 40 8" stroke="#5a3010" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M22 6 Q32 2 42 6" stroke="#7a4820" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* Forehead depth */}
      <ellipse cx="32" cy="25" rx="16" ry="5" fill="#c88848" opacity="0.08" />

      {/* ── Eyebrows ── */}
      <path d="M15 27 Q20 23.5 25.5 25.5" stroke="#1e0e04" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M38.5 25.5 Q44 23.5 49 27" stroke="#1e0e04" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Brow highlight */}
      <path d="M15.5 26 Q20 22.5 25 24.5" stroke="#5a3010" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M39 24.5 Q44 22.5 48.5 26" stroke="#5a3010" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* ── Eyes ── */}
      {/* Eye socket shadow */}
      <ellipse cx="20.5" cy="34" rx="6.5" ry={blink ? 1 : 5.2} fill="#c88040" opacity="0.18" />
      <ellipse cx="43.5" cy="34" rx="6.5" ry={blink ? 1 : 5.2} fill="#c88040" opacity="0.18" />
      {/* Whites */}
      <ellipse cx="20.5" cy="34" rx="5.8" ry={blink ? 0.8 : 4.5} fill="white" />
      <ellipse cx="43.5" cy="34" rx="5.8" ry={blink ? 0.8 : 4.5} fill="white" />
      {/* Upper eyelid fold */}
      {!blink && (
        <>
          <ellipse cx="20.5" cy="30.5" rx="5.8" ry="2.5" fill="#d49060" opacity="0.22" />
          <ellipse cx="43.5" cy="30.5" rx="5.8" ry="2.5" fill="#d49060" opacity="0.22" />
        </>
      )}
      {/* Iris */}
      <ellipse cx="20.5" cy="34" rx="3.8" ry={blink ? 0.6 : 3.6} fill="url(#ag-iris)" />
      <ellipse cx="43.5" cy="34" rx="3.8" ry={blink ? 0.6 : 3.6} fill="url(#ag-iris)" />
      {/* Pupil */}
      <ellipse cx="20.5" cy="34.3" rx="2" ry={blink ? 0.4 : 2.1} fill="#060402" />
      <ellipse cx="43.5" cy="34.3" rx="2" ry={blink ? 0.4 : 2.1} fill="#060402" />
      {/* Iris ring */}
      <ellipse cx="20.5" cy="34" rx="3.8" ry={blink ? 0.6 : 3.6} fill="none" stroke="#7a4820" strokeWidth="0.5" opacity={blink ? 0 : 0.45} />
      <ellipse cx="43.5" cy="34" rx="3.8" ry={blink ? 0.6 : 3.6} fill="none" stroke="#7a4820" strokeWidth="0.5" opacity={blink ? 0 : 0.45} />
      {/* Eye shine — main */}
      <circle cx="22.2" cy="32.2" r="1.3" fill="white" opacity={blink ? 0 : 0.92} />
      <circle cx="44.8" cy="32.2" r="1.3" fill="white" opacity={blink ? 0 : 0.92} />
      {/* Eye shine — small secondary */}
      <circle cx="23.8" cy="35.5" r="0.6" fill="white" opacity={blink ? 0 : 0.5} />
      <circle cx="46.4" cy="35.5" r="0.6" fill="white" opacity={blink ? 0 : 0.5} />
      {/* Upper eyelid line */}
      <path d="M14.5 31.5 Q20.5 29.5 26.5 31.5" stroke="#2e1508" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity={blink ? 0 : 0.55} />
      <path d="M37.5 31.5 Q43.5 29.5 49.5 31.5" stroke="#2e1508" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity={blink ? 0 : 0.55} />
      {/* Closed-eye arc (visible only when blinking) */}
      <path d="M14.5 34 Q20.5 37.5 26.5 34" stroke="#3d2008" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={blink ? 1 : 0} />
      <path d="M37.5 34 Q43.5 37.5 49.5 34" stroke="#3d2008" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={blink ? 1 : 0} />

      {/* ── Nose ── */}
      <path d="M30 40 Q28 45 26.5 47 Q32 49.5 37.5 47 Q36 45 34 40" stroke="#b07038" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <ellipse cx="27.5" cy="47.2" rx="2.2" ry="1.4" fill="#b07038" opacity="0.28" />
      <ellipse cx="36.5" cy="47.2" rx="2.2" ry="1.4" fill="#b07038" opacity="0.28" />

      {/* ── Blush ── */}
      <ellipse cx="12" cy="42" rx="7.5" ry="4.5" fill="url(#ag-blush)" />
      <ellipse cx="52" cy="42" rx="7.5" ry="4.5" fill="url(#ag-blush)" />

      {/* ── Mouth ── */}
      {/* Upper lip */}
      <path d="M23 53 Q27 50.5 32 51 Q37 50.5 41 53" stroke="#a05c30" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Philtrum dip */}
      <path d="M30 50.5 Q32 52 34 50.5" stroke="#b07038" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Smile */}
      <path d="M23 53 Q32 60 41 53" stroke="#8a4c24" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* Lip fill */}
      <path d="M23 53 Q32 60 41 53 Q37.5 55.5 32 55.5 Q26.5 55.5 23 53Z" fill="#c07858" opacity="0.38" />
      {/* Lip highlight */}
      <path d="M28 54 Q32 56 36 54" stroke="#e8a088" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.45" />
    </svg>
  );
}

// ─── Full-body avatar SVG ─────────────────────────────────────────────────────
function AvatarBody({ blink, wave }) {
  return (
    <svg viewBox="0 0 96 230" width="96" height="230" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="ab-face" cx="42%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#fad4a0" />
          <stop offset="55%"  stopColor="#e8b078" />
          <stop offset="100%" stopColor="#c88848" />
        </radialGradient>
        <radialGradient id="ab-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e06858" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e06858" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ab-hair" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="#3d2008" />
          <stop offset="40%"  stopColor="#1e0e04" />
          <stop offset="100%" stopColor="#2e1508" />
        </linearGradient>
        <radialGradient id="ab-iris" cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#6b4020" />
          <stop offset="60%"  stopColor="#3a1e08" />
          <stop offset="100%" stopColor="#0e0804" />
        </radialGradient>
        <linearGradient id="ab-shirt" x1="0%" y1="0%" x2="10%" y2="100%">
          <stop offset="0%"   stopColor="#5a40a0" />
          <stop offset="100%" stopColor="#2e1e60" />
        </linearGradient>
        <linearGradient id="ab-pants" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2a2e42" />
          <stop offset="100%" stopColor="#16192a" />
        </linearGradient>
        <linearGradient id="ab-shoe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#3a2208" />
          <stop offset="100%" stopColor="#1a0e04" />
        </linearGradient>
        <filter id="ab-glow">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#c4912a" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* ── Shadow on ground ── */}
      <ellipse cx="48" cy="228" rx="28" ry="5" fill="rgba(80,50,10,0.12)" />

      {/* ── Shoes ── */}
      <ellipse cx="36" cy="220" rx="14" ry="7"  fill="url(#ab-shoe)" />
      <ellipse cx="60" cy="220" rx="14" ry="7"  fill="url(#ab-shoe)" />
      <ellipse cx="36" cy="219" rx="12" ry="4"  fill="#5a3a18" opacity="0.5" />
      <ellipse cx="60" cy="219" rx="12" ry="4"  fill="#5a3a18" opacity="0.5" />

      {/* ── Legs / pants ── */}
      {/* Left leg */}
      <path d="M33 162 Q30 185 34 215 Q36 220 38 220 Q40 220 40 215 Q38 185 40 162Z"
        fill="url(#ab-pants)" />
      {/* Right leg */}
      <path d="M55 162 Q56 185 56 215 Q58 220 60 220 Q62 220 62 215 Q60 185 63 162Z"
        fill="url(#ab-pants)" />
      {/* Pant crease highlight */}
      <path d="M36 165 Q35 190 36 212" stroke="#3a3e55" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M60 165 Q61 190 60 212" stroke="#3a3e55" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* ── Belt ── */}
      <rect x="29" y="156" width="38" height="8" rx="3" fill="#3a2808" />
      <rect x="44" y="157" width="8" height="6" rx="1.5" fill="#c4912a" opacity="0.9" />

      {/* ── Torso / shirt ── */}
      <path d="M22 100 Q20 88 30 84 Q38 80 48 80 Q58 80 66 84 Q76 88 74 100 L74 158 Q62 164 48 164 Q34 164 22 158Z"
        fill="url(#ab-shirt)" filter="url(#ab-glow)" />
      {/* Shirt collar V */}
      <path d="M40 84 Q48 95 56 84" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Shirt highlight */}
      <path d="M34 90 Q40 86 48 85" stroke="#8870cc" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Shirt seam */}
      <path d="M48 95 L48 158" stroke="#4a3080" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Shirt pocket */}
      <rect x="55" y="110" width="13" height="11" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* ── Left arm (relaxed) ── */}
      <path d="M22 100 Q14 112 12 136 Q11 148 16 152 Q22 155 25 143 Q26 130 28 106Z"
        fill="url(#ab-shirt)" />
      {/* Left hand */}
      <ellipse cx="16" cy="154" rx="7" ry="9" fill="#e8b078" />
      <path d="M10 150 Q8 158 10 163" stroke="#d49060" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M14 148 Q11 157 12 164" stroke="#d49060" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* ── Right arm (waving) ── */}
      <motion.g
        animate={wave ? { rotate: [0, -24, 8, -18, 4, 0] } : { rotate: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
        style={{ originX: '74px', originY: '100px' }}
      >
        <path d="M74 100 Q82 110 86 128 Q88 142 84 148 Q78 154 74 143 Q70 130 68 106Z"
          fill="url(#ab-shirt)" />
        {/* Right hand */}
        <ellipse cx="84" cy="150" rx="7" ry="9" fill="#e8b078" />
        {/* Wave fingers */}
        <path d="M88 144 Q92 140 90 135" stroke="#e8b078" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M90 148 Q95 145 94 140" stroke="#d49060" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M89 153 Q94 152 94 147" stroke="#d49060" strokeWidth="3" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* ── Neck ── */}
      <rect x="41" y="70" width="14" height="16" rx="5" fill="#d4a068" />
      <rect x="44" y="73" width="8"  height="10" rx="3" fill="#c09050" opacity="0.4" />

      {/* ── Head ── */}
      <ellipse cx="48" cy="46" rx="26" ry="28" fill="url(#ab-face)" />

      {/* Ears */}
      <ellipse cx="22" cy="48" rx="5"   ry="7"  fill="#e0a870" />
      <ellipse cx="22" cy="48" rx="2.8" ry="4.5" fill="#c88848" opacity="0.45" />
      <ellipse cx="74" cy="48" rx="5"   ry="7"  fill="#e0a870" />
      <ellipse cx="74" cy="48" rx="2.8" ry="4.5" fill="#c88848" opacity="0.45" />

      {/* Hair */}
      <ellipse cx="48" cy="26" rx="26" ry="18" fill="url(#ab-hair)" />
      <path d="M22 35 Q20 18 28 10 Q48 2 68 10 Q76 18 74 35" fill="url(#ab-hair)" />
      <path d="M22 38 Q18 50 20 60" stroke="#2e1508" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M74 38 Q78 50 76 60" stroke="#2e1508" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M28 16 Q40 10 56 14" stroke="#5a3010" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Eyebrows */}
      <path d="M28 37 Q34 33 40 35" stroke="#1e0e04" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M56 35 Q62 33 68 37" stroke="#1e0e04" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <ellipse cx="34" cy="46" rx="6" ry={blink ? 0.8 : 5} fill="white" />
      <ellipse cx="62" cy="46" rx="6" ry={blink ? 0.8 : 5} fill="white" />
      {!blink && (
        <>
          <ellipse cx="34" cy="43" rx="6" ry="2.5" fill="#d49060" opacity="0.18" />
          <ellipse cx="62" cy="43" rx="6" ry="2.5" fill="#d49060" opacity="0.18" />
        </>
      )}
      <ellipse cx="34" cy="46" rx="4" ry={blink ? 0.6 : 3.8} fill="url(#ab-iris)" />
      <ellipse cx="62" cy="46" rx="4" ry={blink ? 0.6 : 3.8} fill="url(#ab-iris)" />
      <ellipse cx="34" cy="46.4" rx="2.1" ry={blink ? 0.4 : 2.2} fill="#060402" />
      <ellipse cx="62" cy="46.4" rx="2.1" ry={blink ? 0.4 : 2.2} fill="#060402" />
      <circle cx="35.8" cy="44.2" r="1.4" fill="white" opacity={blink ? 0 : 0.92} />
      <circle cx="63.8" cy="44.2" r="1.4" fill="white" opacity={blink ? 0 : 0.92} />
      <circle cx="37"   cy="48"   r="0.6" fill="white" opacity={blink ? 0 : 0.5} />
      <circle cx="65"   cy="48"   r="0.6" fill="white" opacity={blink ? 0 : 0.5} />
      <path d="M27.5 43 Q34 41 40.5 43" stroke="#2e1508" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={blink ? 0 : 0.5} />
      <path d="M55.5 43 Q62 41 68.5 43" stroke="#2e1508" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={blink ? 0 : 0.5} />
      <path d="M27.5 46 Q34 49.5 40.5 46" stroke="#3d2008" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity={blink ? 1 : 0} />
      <path d="M55.5 46 Q62 49.5 68.5 46" stroke="#3d2008" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity={blink ? 1 : 0} />

      {/* Nose */}
      <path d="M44 55 Q42 61 40 63 Q48 66 56 63 Q54 61 52 55" stroke="#b07038" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="41" cy="63.5" rx="2.3" ry="1.5" fill="#b07038" opacity="0.25" />
      <ellipse cx="55" cy="63.5" rx="2.3" ry="1.5" fill="#b07038" opacity="0.25" />

      {/* Blush */}
      <ellipse cx="24" cy="56" rx="8" ry="5" fill="url(#ab-blush)" />
      <ellipse cx="72" cy="56" rx="8" ry="5" fill="url(#ab-blush)" />

      {/* Smile */}
      <path d="M36 68 Q48 76 60 68" stroke="#8a4c24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M36 68 Q48 76 60 68 Q55 71 48 71 Q41 71 36 68Z" fill="#c07858" opacity="0.35" />
      <path d="M42 70 Q48 73 54 70" stroke="#e8a088" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function AvatarGuide() {
  const [minimized, setMinimized]     = useState(false);
  const [dismissed, setDismissed]     = useState(false);
  const [section, setSection]         = useState('hero');
  const [blink, setBlink]             = useState(false);
  const [wave, setWave]               = useState(false);
  const [cardVisible, setCardVisible] = useState(true);

  const data   = SECTIONS[section]  || SECTIONS.hero;
  const Mockup = MOCKUPS[section]   || MockupWelcome;

  // Section detection
  useEffect(() => {
    const ids = ['hero','timeline','register','setup','upload','manage','benefits','cta'];
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardVisible(false);
            setWave(true);
            setTimeout(() => setWave(false), 1800);
            setTimeout(() => { setSection(id); setCardVisible(true); }, 220);
          }
        },
        { threshold: 0.28 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  // Blink
  useEffect(() => {
    let t;
    const tick = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 110);
      t = setTimeout(tick, 2800 + Math.random() * 2600);
    };
    t = setTimeout(tick, 2000);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:      'fixed',
        bottom:        0,
        right:         '20px',
        zIndex:        9000,
        display:       'flex',
        flexDirection: 'row',
        alignItems:    'flex-end',
        gap:           '12px',
        pointerEvents: 'none',
      }}
    >
      {/* ── Guide card — glass, transparent, grows LEFT ── */}
      <AnimatePresence mode="wait">
        {!minimized && cardVisible && (
          <motion.div
            key={section}
            initial={{ opacity: 0, x: 24, scale: 0.94 }}
            animate={{ opacity: 1, x: 0,  scale: 1 }}
            exit={{   opacity: 0, x: 16,  scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              pointerEvents:    'auto',
              width:            '272px',
              marginBottom:     '60px',
              background:       'rgba(253,248,225,0.72)',
              border:           '1.5px solid rgba(196,145,42,0.28)',
              borderRadius:     '16px',
              boxShadow:        '0 8px 40px rgba(50,35,5,0.15), 0 2px 8px rgba(196,145,42,0.08)',
              backdropFilter:   'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              overflow:         'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '9px 12px',
              background:     `linear-gradient(90deg, ${data.color}18, transparent)`,
              borderBottom:   `1px solid ${data.color}22`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Sparkles size={12} color={data.color} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: data.color }}>
                  {data.label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[
                  { action: () => setMinimized(true), icon: <ChevronDown size={9} />, title: 'Minimise' },
                  { action: () => setDismissed(true),  icon: <X size={9} />,          title: 'Close' },
                ].map(({ action, icon, title }, i) => (
                  <button key={i} onClick={action} title={title} style={{
                    background: 'rgba(196,145,42,0.1)', border: '1px solid rgba(196,145,42,0.22)',
                    borderRadius: '50%', width: 20, height: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(80,55,10,0.65)', padding: 0,
                  }}>{icon}</button>
                ))}
              </div>
            </div>

            {/* UI Mockup */}
            <div style={{
              margin:       '10px 12px 0',
              borderRadius: '10px',
              overflow:     'hidden',
              border:       '1px solid rgba(196,145,42,0.15)',
              background:   'rgba(255,255,255,0.55)',
            }}>
              <Mockup />
            </div>

            {/* Guide text */}
            <div style={{ padding: '10px 12px 12px' }}>
              <p style={{ fontSize: '0.82rem', color: '#2d1e04', lineHeight: 1.65, margin: 0 }}>
                {data.text}
              </p>
              {/* Progress dots */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '9px', alignItems: 'center' }}>
                {Object.keys(SECTIONS).map((id) => (
                  <div key={id} style={{
                    width:        id === section ? 18 : 6,
                    height:       5,
                    borderRadius: '3px',
                    background:   id === section ? `linear-gradient(90deg, ${data.color}, #e8c060)` : 'rgba(196,145,42,0.16)',
                    transition:   'all 0.4s ease',
                  }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Avatar column ── */}
      <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          {minimized ? (
            /* ── MINIMISED: just the face circle ── */
            <motion.div
              key="head"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{   scale: 0.7,  opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginBottom: '14px' }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => setMinimized(false)}
                style={{
                  background:     'rgba(253,248,230,0.96)',
                  border:         '2.5px solid rgba(196,145,42,0.5)',
                  borderRadius:   '50%',
                  width:          72,
                  height:         72,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  boxShadow:      '0 8px 28px rgba(50,35,5,0.22), 0 0 0 4px rgba(196,145,42,0.1)',
                  cursor:         'pointer',
                  position:       'relative',
                  overflow:       'hidden',
                }}
              >
                <AvatarFace blink={blink} />
                <div style={{
                  position: 'absolute', bottom: 5, right: 5,
                  width: 11, height: 11, borderRadius: '50%',
                  background: '#4ade80', border: '2px solid white',
                  boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                }} />
              </motion.div>
              <div style={{
                background:    `linear-gradient(90deg, ${data.color}, #e0b040)`,
                color:         '#1a0e02', fontSize: '0.58rem', fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding:       '2px 9px', borderRadius: '10px', whiteSpace: 'nowrap',
              }}>Aria · Guide</div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ fontSize: '0.58rem', color: 'rgba(100,72,15,0.7)', fontWeight: 600 }}
              >Tap to open</motion.div>
            </motion.div>
          ) : (
            /* ── EXPANDED: full body ── */
            <motion.div
              key="body"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{   scale: 0.85,  opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* Name badge above head */}
              <div style={{
                background:    `linear-gradient(90deg, ${data.color}, #e0b040)`,
                color:         '#1a0e02', fontSize: '0.6rem', fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding:       '3px 11px', borderRadius: '12px', whiteSpace: 'nowrap',
                marginBottom:  '6px', boxShadow: '0 2px 8px rgba(196,145,42,0.3)',
              }}>✦ Aria · Guide</div>

              {/* Online dot */}
              <div style={{ position: 'relative' }}>
                <motion.g />
                <AvatarBody blink={blink} wave={wave} />
                <div style={{
                  position: 'absolute', top: 28, right: 4,
                  width: 11, height: 11, borderRadius: '50%',
                  background: '#4ade80', border: '2px solid white',
                  boxShadow: '0 0 7px rgba(74,222,128,0.7)',
                }} />
                {/* Minimise button on chest */}
                <button
                  onClick={() => setMinimized(true)}
                  title="Minimise"
                  style={{
                    position:    'absolute',
                    top:         108,
                    left:        '50%',
                    transform:   'translateX(-50%)',
                    background:  'rgba(255,255,255,0.18)',
                    border:      '1px solid rgba(255,255,255,0.28)',
                    borderRadius: '10px',
                    padding:     '2px 10px',
                    cursor:      'pointer',
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '3px',
                    color:       'rgba(255,255,255,0.85)',
                    fontSize:    '0.55rem',
                    fontWeight:  700,
                    letterSpacing: '0.06em',
                    whiteSpace:  'nowrap',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <ChevronDown size={8} /> hide
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
