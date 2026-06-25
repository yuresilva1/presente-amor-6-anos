import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props { onNext: () => void; }

// Qualidades extraídas diretamente da carta
const qualities = [
  { front: 'Resiliente', back: 'Você é uma das pessoas mais resilientes que conheço. Nunca deixa de lutar.', color: '#f2a7c0' },
  { front: 'Alicerce', back: 'Você é o alicerce da nossa casa. Mesmo quando está perdida, encontra o caminho.', color: '#c9a96e' },
  { front: 'Inteligente', back: 'Sua inteligência me encanta. Você vê o que eu não consigo ver.', color: '#d4607a' },
  { front: 'Carinhosa', back: 'Seu carinho transforma tudo ao redor. É impossível não sentir.', color: '#f0d9a8' },
  { front: 'Engraçada', back: 'Você sabe ser engraçada no mesmo nível que sabe ser chata — e eu amo os dois.', color: '#c9a96e' },
  { front: 'Brilhante', back: 'Você é brilhante em muitos aspectos. Um espetáculo em vários sentidos.', color: '#f2a7c0' },
  { front: 'Parceira', back: 'Você luta comigo o tempo todo. Mesmo quando eu erro, você está lá.', color: '#d4607a' },
  { front: 'Amada', back: 'Você nasceu para ser muito amada. E eu quero ser — e sou — esse cara.', color: '#f0d9a8' },
  { front: 'Família', back: 'Você é a cabeça dessa família. Você sabe disso, e eu sei disso.', color: '#f2a7c0' },
];

export default function SpecialCards({ onNext }: Props) {
  const [started, setStarted] = useState(false);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);

  const handleCardClick = (i: number) => {
    if (!started || flipped.includes(i)) return;
    setFlipped(prev => [...prev, i]);
    setTimeout(() => setRevealed(prev => [...prev, i]), 420);
  };

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
          Interação Especial
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 500, color: 'var(--color-rose-light)', marginBottom: '0.5rem',
        }}>
          Descubra o Quanto Você é Especial
        </h2>
        <p style={{
          fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
          color: 'var(--color-text-muted)', fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
        }}>
          "Você é um espetáculo em vários sentidos."
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="gold-divider"
          style={{ marginTop: '1.25rem' }}
        />
      </motion.div>

      {!started ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: 'center', padding: '4rem 2rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
            color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 2.5rem',
          }}>
            Nove cartas. Nove verdades que você precisa ler.
          </p>
          <button
            id="reveal-cards-btn"
            onClick={() => setStarted(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(212,96,122,0.18), rgba(201,169,110,0.18))',
              border: '1px solid rgba(201,169,110,0.45)',
              borderRadius: '50px', padding: '1.1rem 3rem',
              color: 'var(--color-gold-light)', fontFamily: 'var(--font-elegant)',
              fontSize: '1.05rem', cursor: 'pointer', letterSpacing: '0.1em',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(-2px) scale(1.04)';
              el.style.boxShadow = '0 0 40px rgba(201,169,110,0.35)';
              el.style.borderColor = 'rgba(201,169,110,0.7)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(0) scale(1)';
              el.style.boxShadow = 'none';
              el.style.borderColor = 'rgba(201,169,110,0.45)';
            }}
          >
            Revelar
          </button>
        </motion.div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem', maxWidth: '900px', margin: '1.5rem auto', padding: '0 1.5rem',
          }}>
            {qualities.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  perspective: '1000px', aspectRatio: '5/6',
                  cursor: flipped.includes(i) ? 'default' : 'pointer',
                }}
                onClick={() => handleCardClick(i)}
              >
                <motion.div
                  animate={{ rotateY: flipped.includes(i) ? 180 : 0 }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      backfaceVisibility: 'hidden',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(242,167,192,0.15)',
                      borderRadius: '16px',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                      transition: 'border-color 0.3s ease',
                      padding: '1.5rem',
                      textAlign: 'center',
                    }}
                    onMouseEnter={e => !flipped.includes(i) && ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(242,167,192,0.35)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(242,167,192,0.15)')}
                  >
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      color: 'rgba(242,167,192,0.7)',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                      fontWeight: 500,
                      marginBottom: '1rem',
                      letterSpacing: '0.03em',
                    }}>
                      {q.front}
                    </p>
                    <div style={{
                      width: '30px', height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
                      margin: '0 auto 1rem',
                    }} />
                    <p style={{
                      fontFamily: 'var(--font-elegant)',
                      color: 'rgba(242,167,192,0.35)',
                      fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    }}>
                      Toque para revelar
                    </p>
                  </div>

                  {/* Back */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(145deg, ${q.color}18, ${q.color}0a)`,
                    border: `1px solid ${q.color}44`,
                    borderRadius: '16px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem', backdropFilter: 'blur(20px)',
                    boxShadow: `0 8px 32px ${q.color}18`,
                    textAlign: 'center',
                  }}>
                    <div style={{
                      width: '32px', height: '1px',
                      background: `linear-gradient(90deg, transparent, ${q.color}, transparent)`,
                      marginBottom: '1.2rem',
                    }} />
                    <p style={{
                      fontFamily: 'var(--font-elegant)', color: q.color,
                      fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
                      fontStyle: 'italic', lineHeight: 1.6,
                    }}>
                      {q.back}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {revealed.length === qualities.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{ textAlign: 'center', padding: '2rem', marginTop: '0.5rem' }}
            >
              <p style={{
                fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                color: 'var(--color-text-secondary)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.8,
                maxWidth: '560px', margin: '0 auto',
              }}>
                "Você é uma mulher que nasceu para ser muito amada."
              </p>
            </motion.div>
          )}
        </>
      )}

      <div style={{ textAlign: 'center', padding: '1.5rem 0 4rem' }}>
        <motion.button
          id="special-next-btn"
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
          Tenho Uma Carta Para Você
        </motion.button>
      </div>
    </div>
  );
}
