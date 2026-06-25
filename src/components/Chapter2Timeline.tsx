import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timelineEvents } from '../data/photos';

interface Props { onNext: () => void; }

export default function Chapter2Timeline({ onNext }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '2rem 0' }}>
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
          Capítulo 02
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500, color: 'var(--color-rose-light)', marginBottom: '0.5rem',
        }}>
          Nossas Memórias
        </h2>
        <p style={{
          fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
          color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.1rem)',
        }}>
          Os momentos que escreveram nossa história
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="gold-divider"
          style={{ marginTop: '1.25rem' }}
        />
      </motion.div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        {timelineEvents.map((event, i) => (
          <TimelineCard key={event.id} event={event} index={i} isLeft={i % 2 === 0} />
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '1rem 0 4rem' }}>
        <motion.button
          id="ch2-next-btn"
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
          Descubra o Quanto Você é Especial
        </motion.button>
      </div>
    </div>
  );
}

interface CardProps {
  event: {
    id: number; date: string; title: string;
    description: string; quote?: string; src: string;
  };
  index: number;
  isLeft: boolean;
}

function TimelineCard({ event, index, isLeft }: CardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '3.5rem', gap: '1.5rem' }}>
      {/* Left slot */}
      <motion.div
        initial={{ opacity: 0, x: -48, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.9, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
        style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}
      >
        {isLeft && <EventCard event={event} />}
      </motion.div>

      {/* Center marker */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08 + 0.2, ease: [0.34, 1.3, 0.64, 1] }}
        style={{ flexShrink: 0, paddingTop: '1.2rem' }}
      >
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(212,96,122,0.2), rgba(201,169,110,0.2))',
          border: '1px solid rgba(201,169,110,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(201,169,110,0.2)',
        }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f2a7c0, #c9a96e)',
          }} />
        </div>
      </motion.div>

      {/* Right slot */}
      <motion.div
        initial={{ opacity: 0, x: 48, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.9, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
        style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}
      >
        {!isLeft && <EventCard event={event} />}
      </motion.div>
    </div>
  );
}

function EventCard({ event }: { event: CardProps['event'] }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(242,167,192,0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        maxWidth: '310px',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(242,167,192,0.35)';
        el.style.boxShadow = '0 16px 48px rgba(212,96,122,0.12)';
        el.style.transform = 'translateY(-5px)';
        el.style.background = 'rgba(255,255,255,0.055)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(242,167,192,0.1)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
        el.style.background = 'rgba(255,255,255,0.035)';
      }}
    >
      <div style={{
        width: '100%', aspectRatio: '4/3', borderRadius: '10px',
        overflow: 'hidden', marginBottom: '1.2rem',
      }}>
        <img
          src={event.src} alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
      <p style={{
        fontFamily: 'var(--font-elegant)', color: 'var(--color-gold)',
        fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase',
        marginBottom: '0.4rem',
      }}>
        {event.date}
      </p>
      <h3 style={{
        fontFamily: 'var(--font-display)', color: 'var(--color-rose-light)',
        fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.6rem',
      }}>
        {event.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-elegant)', color: 'var(--color-text-secondary)',
        fontSize: '0.92rem', fontStyle: 'italic', lineHeight: 1.65,
      }}>
        {event.description}
      </p>
      {event.quote && (
        <div style={{
          marginTop: '1rem',
          borderLeft: '2px solid rgba(201,169,110,0.4)',
          paddingLeft: '0.8rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-elegant)',
            color: 'var(--color-gold)',
            fontSize: '0.88rem',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}>
            {event.quote}
          </p>
        </div>
      )}
    </div>
  );
}
