// ─────────────────────────────────────────────────────────────────────────────
// Footer.jsx  —  Site footer with links, socials and legal bar
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { Facebook, Linkedin, Instagram, Pin, Palette } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

// ─── Data

const guideLinks = [
  { label: 'Register',      href: '#register' },
  { label: 'Setup Profile', href: '#setup'    },
  { label: 'Upload Artwork',href: '#upload'   },
  { label: 'Manage & Sell', href: '#manage'   },
];

const siteLinks = [
  { label: 'Home',    href: 'https://zigguratss.com/'                           },
  { label: 'Artworks',href: 'https://zigguratss.com/artworks'                  },
  { label: 'About Us',href: 'https://zigguratss.com/about'                     },
  { label: 'Blog',    href: 'https://zigguratss.com/blog'                      },
  { label: 'Contest', href: 'https://zigguratss.com/contest/artwork/week'      },
  { label: 'FAQs',    href: 'https://zigguratss.com/faq'                       },
  { label: 'Contact', href: 'https://zigguratss.com/contact'                   },
];

const socials = [
  { Icon: Facebook,  href: 'https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166', label: 'Facebook'  },
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/zigguratssartwork/about/',              label: 'LinkedIn'  },
  { Icon: Instagram, href: 'https://www.instagram.com/zigguratss/',                                  label: 'Instagram' },
  { Icon: Pin,       href: 'https://in.pinterest.com/zigguratss/',                                   label: 'Pinterest' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark-2)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), var(--accent), var(--gold), transparent)' }} />

      <div style={{ maxWidth: '1520px', margin: '0 auto', width: '100%', padding: '5rem clamp(2.5rem, 5vw, 6rem) 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem',
        }}>
          {/* Brand */}
          <RevealOnScroll y={24} duration={0.7}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--gold), var(--accent))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(196,122,58,0.25)',
                }}>
                  <Palette size={20} color="#0a0a0f" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' }}>Zigguratss</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(160,152,128,0.8)', lineHeight: 1.8, maxWidth: '240px' }}>
                A premier online marketplace for artists to showcase, sell, and grow their presence — connecting talent with collectors worldwide.
              </p>
              {/* Socials */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    className="social-icon"
                    style={{
                      width: 38, height: 38, borderRadius: '50%',
                      border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Guide links */}
          <RevealOnScroll y={24} delay={0.08} duration={0.7}>
            <div>
              <h4 style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '1.4rem' }}>
                Artist Guide
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {guideLinks.map((l) => (
                  <a key={l.label} href={l.href} className="footer-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Site links */}
          <RevealOnScroll y={24} delay={0.14} duration={0.7}>
            <div>
              <h4 style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '1.4rem' }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {siteLinks.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="footer-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Contact / CTA */}
          <RevealOnScroll y={24} delay={0.2} duration={0.7}>
            <div>
              <h4 style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '1.4rem' }}>
                Get In Touch
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.4rem' }}>
                Questions about selling your artwork? We&apos;re here to help.
              </p>
              <motion.a
                href="https://api.whatsapp.com/send?phone=917838535496"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(196,122,58,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 22px', borderRadius: '50px',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                  color: '#0a0a0f', fontWeight: 700, fontSize: '0.85rem',
                  textDecoration: 'none', letterSpacing: '0.06em',
                }}
              >
                WhatsApp Us
              </motion.a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(140,132,112,0.7)', letterSpacing: '0.02em' }}>
            © 2026 Zigguratss Artwork LLP · All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Terms', href: 'https://zigguratss.com/cms/terms-and-conditions' },
              { label: 'Customer Guide', href: 'https://zigguratss.com/cms/customer-guide' },
              { label: 'Contest Rules', href: 'https://zigguratss.com/cms/contest-rules' },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="footer-bottom-link">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
