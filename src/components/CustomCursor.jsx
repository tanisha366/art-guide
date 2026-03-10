import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' });
    };

    const tick = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      gsap.set(follower, { x: followerX, y: followerY });
      requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('mousemove', onMove);

    // Grow on hoverable elements
    const onEnter = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 2, borderColor: 'var(--gold)', duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, borderColor: 'rgba(201,168,76,0.5)', duration: 0.3 });
    };
    const onDown = () => gsap.to(cursor, { scale: 0.7, duration: 0.1 });
    const onUp = () => gsap.to(cursor, { scale: 1, duration: 0.1 });

    const hoverEls = document.querySelectorAll('a, button, [data-hover]');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Re-attach after DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: -6, left: -6,
          width: 12, height: 12,
          borderRadius: '50%',
          background: 'var(--gold)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: -20, left: -20,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(201,168,76,0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'border-color 0.3s',
        }}
      />
      <style>{`
        @media (pointer: coarse) { .custom-cursor-dot, .custom-cursor-ring { display: none !important; } }
      `}</style>
    </>
  );
}
