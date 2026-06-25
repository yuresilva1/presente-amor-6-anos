import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { filmSlides } from '../data/photos';

interface Props { onNext: () => void; }

export default function Chapter6Film({ onNext }: Props) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (current >= filmSlides.length - 1) {
        setAutoPlay(false);
        return;
      }
      setDirection(1);
      setCurrent(prev => prev + 1);
    }, 4500);
    return () => clearTimeout(timer);
  }, [current, autoPlay]);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
    setAutoPlay(false);
  };

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: dir > 0 ? 1.04 : 0.97,
      filter: 'blur(10px)',
    }),
    center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (dir: number) => ({
      opacity: 0,
      scale: dir > 0 ? 0.97 : 1.04,
      filter: 'blur(10px)',
    }),
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Cinematic top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '72px',
        background: 'rgba(0,0,0,0.92)', zIndex: 10,
        borderBottom: '1px solid rgba(201,169,110,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(12px)',
      }}>
        <p style={{
          fontFamily: 'var(--font-elegant)', fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
          color: 'var(--color-gold)', letterSpacing: '0.35em', textTransform: 'uppercase',
        }}>
          Capítulo 06 — Nosso Filme
        </p>
      </div>

      {/* Cinematic bottom bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '72px',
        background: 'rgba(0,0,0,0.92)', zIndex: 10,
        borderTop: '1px solid rgba(201,169,110,0.08)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
      }}>
        {filmSlides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            animate={{
              width: i === current ? '28px' : '6px',
              background: i === current ? '#c9a96e' : 'rgba(201,169,110,0.28)',
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '6px', borderRadius: '3px',
              border: 'none', cursor: 'pointer', padding: 0,
            }}
          />
        ))}
      </div>

      {/* Fullscreen slide */}
      <div style={{ height: '100vh', position: 'relative' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={filmSlides[current].src}
              alt={filmSlides[current].message}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.75) 100%)',
            }} />

            {/* Cinematic message */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute', bottom: '100px', left: 0, right: 0,
                textAlign: 'center', padding: '0 2rem',
              }}
            >
              {filmSlides[current].date && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  style={{
                    fontFamily: 'var(--font-elegant)',
                    color: 'rgba(201,169,110,0.75)',
                    fontSize: '0.82rem', letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  {filmSlides[current].date}
                </motion.p>
              )}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 4vw, 2.2rem)',
                fontWeight: 400, fontStyle: 'italic',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 2px 40px rgba(0,0,0,0.9)',
                lineHeight: 1.4,
                maxWidth: '680px', margin: '0 auto',
              }}>
                {filmSlides[current].message}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: '72px', left: 0, right: 0, height: '2px',
        background: 'rgba(201,169,110,0.1)', zIndex: 10,
      }}>
        <motion.div
          animate={{ width: `${((current + 1) / filmSlides.length) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #c9a96e, #f0d9a8)' }}
        />
      </div>

      {/* Arrows */}
      {current > 0 && (
        <button
          onClick={() => goTo(current - 1, -1)}
          style={{
            position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%', width: '48px', height: '48px',
            color: 'rgba(255,255,255,0.7)', fontSize: '1.5rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20, backdropFilter: 'blur(12px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          ‹
        </button>
      )}

      {current < filmSlides.length - 1 ? (
        <button
          onClick={() => goTo(current + 1, 1)}
          style={{
            position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%', width: '48px', height: '48px',
            color: 'rgba(255,255,255,0.7)', fontSize: '1.5rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20, backdropFilter: 'blur(12px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          ›
        </button>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.3, 0.64, 1] }}
          onClick={onNext}
          id="ch6-next-btn"
          style={{
            position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.45)',
            borderRadius: '50px', padding: '0.85rem 1.6rem',
            color: 'var(--color-gold-light)', fontFamily: 'var(--font-elegant)',
            fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.1em',
            zIndex: 20, backdropFilter: 'blur(12px)', transition: 'all 0.4s ease',
          }}
          whileHover={{ scale: 1.06, background: 'rgba(201,169,110,0.25)' }}
        >
          Grand Finale
        </motion.button>
      )}
    </div>
  );
}
