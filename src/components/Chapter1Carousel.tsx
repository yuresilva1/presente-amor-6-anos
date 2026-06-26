import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props { onNext: () => void; }

function getTimeTogether() {
  // A pedido: Exatos 6 anos (2190 dias)
  return { totalDays: 2190 };
}

export default function Chapter1Start({ onNext }: Props) {
  const [currentDays, setCurrentDays] = useState(0);
  const timeInfo = getTimeTogether();

  useEffect(() => {
    let start = performance.now();
    const duration = 2500; // 2.5 seconds (super speed)
    const target = timeInfo.totalDays;
    let rafId: number;

    const animate = (time: number) => {
      let progress = (time - start) / duration;
      if (progress > 1) progress = 1;
      
      const current = Math.floor(target * progress);
      setCurrentDays(current);
      
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [timeInfo.totalDays]);

  const years = Math.floor(currentDays / 365);
  const months = Math.floor((currentDays % 365) / 30);
  const days = currentDays % 30;


  // Formata os números com 2 dígitos
  const yStr = String(years).padStart(2, '0');
  const mStr = String(months).padStart(2, '0');
  const dStr = String(days).padStart(2, '0');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(242,167,192,0.03) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ textAlign: 'center', zIndex: 1, marginBottom: '4rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-elegant)', fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
          color: 'var(--color-gold)', letterSpacing: '0.35em', textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Nossa História
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 500, color: 'var(--color-rose-light)', marginBottom: '0.5rem',
        }}>
          Onde Tudo Começou
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="gold-divider"
          style={{ margin: '1.5rem auto' }}
        />
      </motion.div>

      {/* Contador */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: 1, width: '100%', maxWidth: '700px', marginBottom: '5rem' }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(242,167,192,0.08)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          textAlign: 'center',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        }}>
          <p style={{
            fontFamily: 'var(--font-elegant)', color: 'var(--color-rose)',
            fontSize: '0.85rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}>
            Casados desde 27 de Junho de 2020
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
            {[
              { value: yStr, label: 'Anos' },
              { value: mStr, label: 'Meses' },
              { value: dStr, label: 'Dias' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + idx * 0.15 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontVariantNumeric: 'tabular-nums', // Mantém a largura fixa dos números
                  minWidth: '2.5ch', // Largura mínima para 2 dígitos para evitar que a tela trema
                  display: 'inline-block',
                  fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #c9a96e 0%, #f0d9a8 60%, #c9a96e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  textShadow: '0 10px 30px rgba(201,169,110,0.15)',
                }}>
                  {item.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-elegant)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.9rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginTop: '0.75rem',
                }}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            style={{
              marginTop: '3rem', fontFamily: 'var(--font-elegant)',
              color: 'var(--color-text-muted)', fontSize: '0.95rem', fontStyle: 'italic',
            }}
          >
            {currentDays.toLocaleString('pt-BR')} dias de amor, cumplicidade e crescimento juntos
          </motion.p>
        </div>
      </motion.div>

      {/* Play Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <p style={{
          fontFamily: 'var(--font-elegant)', color: 'var(--color-champagne)',
          fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '1.5rem', opacity: 0.7
        }}>
          Reviver Nossas Memórias
        </p>
        
        <motion.button
          onClick={onNext}
          style={{
            width: '80px', height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(242,167,192,0.15) 100%)',
            border: '1px solid rgba(201,169,110,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(201,169,110,0.2), inset 0 0 20px rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 60px rgba(201,169,110,0.35), inset 0 0 20px rgba(255,255,255,0.1)',
            borderColor: 'rgba(201,169,110,0.8)' 
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Play Icon (SVG) */}
          <svg 
            width="28" height="28" viewBox="0 0 24 24" 
            fill="none" stroke="var(--color-gold-light)" 
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: 'translateX(2px)' }} // Visually center the triangle
          >
            <polygon points="5 3 19 12 5 21 5 3" fill="var(--color-gold-light)" opacity="0.9" />
          </svg>

          {/* Pulse ring animation */}
          <motion.div
            animate={{ scale: [1, 1.4, 1.6], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: -1, borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.5)',
              pointerEvents: 'none'
            }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
