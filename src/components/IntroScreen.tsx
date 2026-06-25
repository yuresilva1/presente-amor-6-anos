import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onStart: () => void; }

const lines = [
  { text: 'Uma pequena viagem por nossa história...', delay: 0.8, font: 'elegant', size: 'clamp(1.1rem, 2.5vw, 1.6rem)' },
  { text: '6 anos de amor', delay: 2.8, font: 'script', size: 'clamp(2.8rem, 9vw, 5.5rem)' },
  { text: 'Preparada para reviver nossos momentos?', delay: 5.0, font: 'elegant', size: 'clamp(0.95rem, 2vw, 1.3rem)' },
];

export default function IntroScreen({ onStart }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);
  const starsRef = useRef(
    Array.from({ length: 80 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      gold: Math.random() > 0.6,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
  );

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay * 1000)
    );
    const btnTimer = setTimeout(() => setShowButton(true), 6800);
    return () => { timers.forEach(clearTimeout); clearTimeout(btnTimer); };
  }, []);

  const handleStart = () => {
    setExiting(true);
    setTimeout(onStart, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 40%, #1e0d18 0%, #0a0507 65%)',
        position: 'relative', overflow: 'hidden', padding: '2rem',
      }}
    >
      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(212,96,122,0.07) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%', width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)',
      }} />

      {/* Stars */}
      {starsRef.current.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${s.top}%`, left: `${s.left}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          background: s.gold ? '#c9a96e' : '#f2a7c0',
          borderRadius: '50%',
          animation: `twinkle ${s.duration}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      {/* Decorative rings */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          width: 'min(520px, 92vw)', height: 'min(520px, 92vw)',
          border: '1px solid #c9a96e', borderRadius: '50%',
        }}
      />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 3, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
        style={{
          position: 'absolute',
          width: 'min(700px, 98vw)', height: 'min(700px, 98vw)',
          border: '1px solid #f2a7c0', borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px' }}>

        {/* Monogram / symbol */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.3, 0.64, 1] }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{
            width: '56px', height: '56px',
            margin: '0 auto',
            border: '1px solid rgba(201,169,110,0.5)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(circle, rgba(201,169,110,0.12), transparent)',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="rgba(201,169,110,0.6)" />
            </svg>
          </div>
        </motion.div>

        <AnimatePresence>
          {lines.map((line, i) => (
            visibleLines.includes(i) && (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ marginBottom: i === 1 ? '1.8rem' : '1.2rem' }}
              >
                <p style={{
                  fontFamily: line.font === 'script' ? 'var(--font-script)' : 'var(--font-elegant)',
                  fontSize: line.size,
                  fontWeight: line.font === 'elegant' ? 300 : 400,
                  color: line.font === 'script' ? 'var(--color-gold-light)' : 'var(--color-rose-light)',
                  letterSpacing: line.font === 'elegant' ? '0.06em' : '0.02em',
                  lineHeight: 1.2,
                  textShadow: line.font === 'script'
                    ? '0 0 50px rgba(201,169,110,0.45)'
                    : '0 0 30px rgba(242,167,192,0.25)',
                }}>
                  {line.text}
                </p>
                {i === 0 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="gold-divider"
                    style={{ marginTop: '1.5rem' }}
                  />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* CTA Button */}
        <AnimatePresence>
          {showButton && !exiting && (
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{ marginTop: '3rem' }}
            >
              <button
                id="start-journey-btn"
                onClick={handleStart}
                style={{
                  background: 'linear-gradient(135deg, rgba(212,96,122,0.15) 0%, rgba(201,169,110,0.15) 100%)',
                  border: '1px solid rgba(201,169,110,0.45)',
                  borderRadius: '50px',
                  padding: '1.1rem 3rem',
                  color: 'var(--color-gold-light)',
                  fontFamily: 'var(--font-elegant)',
                  fontSize: '1.05rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                  backdropFilter: 'blur(16px)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'linear-gradient(135deg, rgba(212,96,122,0.28) 0%, rgba(201,169,110,0.28) 100%)';
                  el.style.boxShadow = '0 0 50px rgba(201,169,110,0.35), 0 0 100px rgba(212,96,122,0.15)';
                  el.style.transform = 'translateY(-2px) scale(1.04)';
                  el.style.borderColor = 'rgba(201,169,110,0.7)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'linear-gradient(135deg, rgba(212,96,122,0.15) 0%, rgba(201,169,110,0.15) 100%)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0) scale(1)';
                  el.style.borderColor = 'rgba(201,169,110,0.45)';
                }}
              >
                Começar Nossa Jornada
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
