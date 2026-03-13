// ─────────────────────────────────────────────────────────────────────────────
// ParticleCanvas.jsx  —  Fixed full-page golden fire-flake particle layer
// Renders behind all sections as a single persistent canvas
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Space + gold palette for dark theme
    const COLORS = [
      '#ffffff', '#c47a3a', '#a5622a', '#c8b4ff',
      '#80c8ff', '#ff80b0', '#ffd45e', '#e8e8ff',
    ];

    // ── Fire flake particle ──────────────────────────────────
    class Flake {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x  = Math.random() * W;
        this.y  = initial ? Math.random() * H : H + 10;
        this.r  = Math.random() * 3 + 0.5;
        this.baseAlpha = Math.random() * 0.55 + 0.15;
        this.alpha = this.baseAlpha;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -(Math.random() * 0.8 + 0.25);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = (Math.random() - 0.5) * 0.04;
        this.life = 0;
        this.maxLife = Math.random() * 400 + 200;
        // some are diamond / cross shaped
        this.shape = Math.random() < 0.25 ? 'diamond' : 'circle';
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        // twinkle phase
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.06 + 0.02;
      }
      update() {
        this.wobble += this.wobbleSpeed;
        this.x += this.vx + Math.sin(this.wobble) * 0.35;
        this.y += this.vy;
        this.rotation += this.rotSpeed;
        this.twinkle += this.twinkleSpeed;
        this.life++;
        const progress = this.life / this.maxLife;
        // fade in quickly, hold, then fade out
        const fadeIn  = Math.min(1, this.life / 40);
        const fadeOut = 1 - Math.pow(Math.max(0, progress - 0.6) / 0.4, 2);
        this.alpha = this.baseAlpha * fadeIn * fadeOut * (0.75 + 0.25 * Math.sin(this.twinkle));

        if (this.life >= this.maxLife || this.y < -20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);

        if (this.shape === 'diamond') {
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          const s = this.r * 2.2;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.6, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = this.r > 2 ? 14 : 6;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // ── Soft ambient glow blob ───────────────────────────────
    class Glow {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : Math.random() * H;
        this.r = Math.random() * 120 + 50;
        this.alpha = Math.random() * 0.035 + 0.008;
        this.color = COLORS[Math.floor(Math.random() * 4)]; // warm golds only
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
        this.life = 0;
        this.maxLife = Math.random() * 600 + 400;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life >= this.maxLife) this.reset();
        if (this.x < -200 || this.x > W + 200) this.vx *= -1;
        if (this.y < -200 || this.y > H + 200) this.vy *= -1;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const flakes = Array.from({ length: 260 }, () => new Flake());
    const glows  = Array.from({ length: 14 },  () => new Glow());
    let raf;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      glows.forEach((g)  => { g.update(); g.draw(); });
      flakes.forEach((f) => { f.update(); f.draw(); });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
