import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '../data/photos';

interface Props { onNext: () => void; }

export default function Chapter4Gallery({ onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '2rem 0' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ textAlign: 'center', padding: '3rem 2rem 2rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-elegant)', fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
          color: 'var(--color-gold)', letterSpacing: '0.35em', textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          Capítulo 04
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500, color: 'var(--color-rose-light)', marginBottom: '0.75rem',
        }}>
          Galeria dos Momentos
        </h2>
        <p style={{
          fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
          color: 'var(--color-text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
        }}>
          Clique em cada foto para reviver o momento
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="gold-divider"
          style={{ marginTop: '1.25rem' }}
        />
      </motion.div>

      {/* Masonry grid */}
      <div style={{
        maxWidth: '1100px', margin: '1.5rem auto',
        padding: '0 1.5rem',
        columns: 'min(270px, 44vw) auto',
        columnGap: '1rem',
      }}>
        {galleryPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
            style={{
              breakInside: 'avoid',
              marginBottom: '1rem',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              border: '1px solid rgba(242,167,192,0.08)',
            }}
            onClick={() => setSelected(i)}
          >
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <img
                src={photo.src}
                alt={photo.caption}
                style={{
                  width: '100%', display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
            {/* Caption overlay */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,5,7,0.75) 0%, transparent 55%)',
                opacity: 0, transition: 'opacity 0.4s ease',
                display: 'flex', alignItems: 'flex-end', padding: '1rem',
                borderRadius: '12px',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
            >
              <p style={{
                fontFamily: 'var(--font-elegant)',
                color: 'var(--color-champagne)',
                fontSize: '0.85rem', fontStyle: 'italic',
                lineHeight: 1.4,
              }}>
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(4,2,4,0.96)',
              backdropFilter: 'blur(24px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24, filter: 'blur(12px)' }}
              animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.88, y: 24, filter: 'blur(12px)' }}
              transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '800px', width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(242,167,192,0.15)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 50px 120px rgba(0,0,0,0.9)',
              }}
            >
              <img
                src={galleryPhotos[selected].src}
                alt={galleryPhotos[selected].caption}
                style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem 2rem' }}>
                <p style={{
                  fontFamily: 'var(--font-elegant)', color: 'var(--color-gold)',
                  fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  {galleryPhotos[selected].date}
                </p>
                <p style={{
                  fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                  color: 'var(--color-champagne)', fontSize: '1.05rem', lineHeight: 1.6,
                }}>
                  {galleryPhotos[selected].caption}
                </p>
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '44px', height: '44px',
                color: 'rgba(255,255,255,0.7)', fontSize: '1.3rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              ×
            </button>

            {/* Prev/Next */}
            {selected > 0 && (
              <button
                onClick={e => { e.stopPropagation(); setSelected(selected - 1); }}
                style={{
                  position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)',
                  borderRadius: '50%', width: '48px', height: '48px',
                  color: '#c9a96e', fontSize: '1.5rem', cursor: 'pointer',
                  transition: 'all 0.3s ease', backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,169,110,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                ‹
              </button>
            )}
            {selected < galleryPhotos.length - 1 && (
              <button
                onClick={e => { e.stopPropagation(); setSelected(selected + 1); }}
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,169,110,0.25)',
                  borderRadius: '50%', width: '48px', height: '48px',
                  color: '#c9a96e', fontSize: '1.5rem', cursor: 'pointer',
                  transition: 'all 0.3s ease', backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,169,110,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next */}
      <div style={{ textAlign: 'center', padding: '1.5rem 0 4rem' }}>
        <motion.button
          id="ch4-next-btn"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onClick={onNext}
          style={{
            background: 'transparent', border: '1px solid rgba(242,167,192,0.3)',
            borderRadius: '50px', padding: '0.85rem 2.2rem',
            color: 'var(--color-rose)', fontFamily: 'var(--font-elegant)',
            fontSize: '1rem', cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.4s ease',
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(242,167,192,0.7)' }}
          whileTap={{ scale: 0.97 }}
        >
          O Que Você Significa Para Mim
        </motion.button>
      </div>
    </div>
  );
}
