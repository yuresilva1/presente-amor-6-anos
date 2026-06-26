import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messageLines = [
  { text: 'E agora...', style: 'intro' },
  { text: 'Chegamos ao fim', style: 'main' },
  { text: 'Ou melhor,', style: 'intro' },
  { text: 'Ao começo de mais um ano', style: 'main' },
  { text: 'De infinitos anos ao seu lado.', style: 'intro' },
];

export default function GrandFinale() {
  const [phase, setPhase] = useState<'message' | 'question' | 'final'>('message');
  
  const [vaultCode, setVaultCode] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultErrorMsg, setVaultErrorMsg] = useState('Descubra a senha para desbloquear seu presente.');
  const [isShaking, setIsShaking] = useState(false);
  
  const errorMessages = [
    "Humm, não é essa... Tente de novo!",
    "Vish, esqueceu a data? 😂",
    "Senha incorreta! Pense nos nossos momentos importantes.",
    "Passou longe amor, concentra!",
    "Acesso negado! O presente vai sumir em 3, 2...",
    "Quase lá... mentira, tá frio! 🥶",
    "Será que a gente casou nesse dia mesmo? 🤔",
  ];

  const handleVaultChange = (index: number, val: string) => {
    val = val.replace(/[^0-9]/g, '');
    const newCode = vaultCode.split('');
    newCode[index] = val;
    const finalCode = newCode.join('');
    setVaultCode(finalCode);
    
    // Auto focus next
    if (val && index < 3) {
      document.getElementById(`vault-input-${index + 1}`)?.focus();
    }
    
    // Check if fully typed
    if (finalCode.length === 4) {
      if (finalCode === '2706') {
        setVaultErrorMsg('Acesso concedido! 💖');
        setTimeout(() => setVaultUnlocked(true), 500);
      } else {
        // Wrong code!
        setIsShaking(true);
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        setVaultErrorMsg(randomError);
        setTimeout(() => {
          setIsShaking(false);
          setVaultCode('');
          document.getElementById('vault-input-0')?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !vaultCode[index] && index > 0) {
      document.getElementById(`vault-input-${index - 1}`)?.focus();
    }
  };

  const starsRef = useRef(
    Array.from({ length: 160 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
      gold: Math.random() > 0.6,
    }))
  );

  useEffect(() => {
    const keyframes = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Stars Background */}
      {phase !== 'final' && starsRef.current.map((s, i) => (
        <div key={i} style={{
          position: 'fixed', left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}px`, height: `${s.size}px`,
          background: s.gold ? 'var(--color-gold-light)' : 'var(--color-rose-light)',
          borderRadius: '50%', opacity: 0.6, zIndex: 0,
          animation: `twinkle ${s.duration}s ease-in-out infinite`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      {/* Main Flow */}
      {phase !== 'final' && (
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          
          {/* Animated Message Sequence */}
          <AnimatePresence mode="wait">
            {phase === 'message' && messageLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                transition={{ duration: 1.5, delay: i * 0.85, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  fontFamily: line.style === 'main' || line.style === 'word' 
                    ? 'var(--font-display)' : 'var(--font-elegant)',
                  fontSize: line.style === 'main' 
                    ? 'clamp(1.6rem, 4vw, 2.6rem)' 
                    : line.style === 'word' 
                      ? 'clamp(1.3rem, 3.2vw, 2rem)' 
                      : 'clamp(1rem, 2.5vw, 1.4rem)',
                  color: line.style === 'main' 
                    ? 'var(--color-gold-light)' 
                    : line.style === 'word' 
                      ? 'var(--color-rose-light)' 
                      : 'var(--color-text-secondary)',
                  fontWeight: line.style === 'main' ? 600 : 400,
                  fontStyle: line.style === 'intro' || line.style === 'closing' ? 'italic' : 'normal',
                  lineHeight: 1.35,
                  marginBottom: line.style === 'main' ? '0.8rem' : '0.35rem',
                  textShadow: line.style === 'main' 
                    ? '0 0 50px rgba(201,169,110,0.45)' 
                    : undefined,
                }}
              >
                {line.text}
              </motion.p>
            ))}
          </AnimatePresence>

          {/* Question + button */}
          {phase === 'question' && (
            <motion.div
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ marginTop: '3.5rem' }}
            >
              <p style={{
                fontFamily: 'var(--font-elegant)', color: 'var(--color-champagne)',
                fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', fontStyle: 'italic',
                marginBottom: '2.5rem', lineHeight: 1.7,
              }}>
                "Quer continuar escrevendo essa história comigo?"
              </p>
              <motion.button
                id="finale-yes-btn"
                onClick={() => setPhase('final')}
                style={{
                  background: 'linear-gradient(135deg, rgba(212,96,122,0.22), rgba(201,169,110,0.22))',
                  border: '1px solid rgba(242,167,192,0.45)',
                  borderRadius: '50px',
                  padding: 'clamp(1.5rem, 4vw, 2rem) clamp(2.5rem, 8vw, 4rem)',
                  color: 'var(--color-rose-light)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                  width: '90%',
                  maxWidth: '400px'
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 0 80px rgba(242,167,192,0.35), 0 0 40px rgba(201,169,110,0.2)',
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(242,167,192,0.15)',
                    '0 0 50px rgba(242,167,192,0.35)',
                    '0 0 20px rgba(242,167,192,0.15)',
                  ],
                }}
                transition={{ boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
              >
                Sim, para sempre
              </motion.button>
            </motion.div>
          )}

          {phase === 'message' && (
            <AutoAdvance delay={messageLines.length * 850 + 1800} onDone={() => setPhase('question')} />
          )}
        </div>
      )}

      {/* Final Screen */}
      <AnimatePresence>
        {phase === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute', inset: 0, zIndex: 50,
              background: 'radial-gradient(ellipse at center, #1a0812 0%, #0a0507 100%)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'flex-start',
              padding: '2rem 1rem', textAlign: 'center',
              overflowY: 'auto'
            }}
          >
            <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', paddingTop: '10vh' }}>
              {/* Stars on final screen */}
              {starsRef.current.slice(0, 100).map((s, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: `${s.x}%`, top: `${s.y}%`,
                  width: `${s.size}px`, height: `${s.size}px`,
                  background: s.gold ? '#c9a96e' : '#f2a7c0',
                  borderRadius: '50%',
                  animation: `twinkle ${s.duration}s ease-in-out infinite`,
                  animationDelay: `${s.delay}s`,
                }} />
              ))}

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  width: '60px', height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
                  margin: '0 auto 2.5rem',
                }}
              />

              {[
                { text: 'Obrigado por esses 6 anos incríveis.', delay: 0.8, style: 'elegant', color: 'var(--color-champagne)', size: 'clamp(1rem, 2.2vw, 1.25rem)' },
                { text: 'Você é o maior presente que Deus colocou na minha vida.', delay: 1.6, style: 'elegant', color: 'var(--color-rose-light)', size: 'clamp(1rem, 2.2vw, 1.25rem)' },
                { text: 'Eu te amo infinitamente.', delay: 2.5, style: 'display', color: 'var(--color-gold-light)', size: 'clamp(1.6rem, 4vw, 2.6rem)' },
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, delay: line.delay, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    fontFamily: line.style === 'display' ? 'var(--font-display)' : 'var(--font-elegant)',
                    fontSize: line.size,
                    color: line.color,
                    fontStyle: line.style === 'elegant' ? 'italic' : 'normal',
                    fontWeight: line.style === 'display' ? 600 : 300,
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                    textShadow: line.style === 'display' ? '0 0 50px rgba(201,169,110,0.45)' : undefined,
                    position: 'relative', zIndex: 1,
                  }}
                >
                  {line.text}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 4, ease: [0.4, 0, 0.2, 1] }}
                style={{ marginTop: '3rem', position: 'relative', zIndex: 1 }}
              >
                <div style={{
                  width: '50px', height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
                  margin: '0 auto 1.8rem',
                }} />
                <p style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  color: 'var(--color-gold-light)',
                  textShadow: '0 0 35px rgba(201,169,110,0.4)',
                  marginBottom: '0.4rem',
                }}>
                  Com todo meu amor,
                </p>
                <p style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                  color: 'var(--color-rose)',
                  textShadow: '0 0 35px rgba(242,167,192,0.45)',
                }}>
                  Yure
                </p>
              </motion.div>

              {/* SECRET VAULT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 6, ease: [0.4, 0, 0.2, 1] }}
                style={{ marginTop: '5rem', marginBottom: '4rem', position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                {!vaultUnlocked ? (
                  <motion.div 
                    animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: isShaking ? '1px solid rgba(255,0,0,0.5)' : '1px solid rgba(201,169,110,0.3)',
                      borderRadius: '24px',
                      padding: '2rem',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      transition: 'border 0.3s',
                      width: '100%'
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', color: 'var(--color-gold-light)',
                      fontSize: '1.4rem', marginBottom: '0.5rem',
                    }}>
                      Cofre Secreto
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-elegant)', 
                      color: isShaking ? 'var(--color-rose)' : 'var(--color-text-muted)',
                      fontSize: '0.9rem', marginBottom: '2rem', fontStyle: 'italic',
                      transition: 'color 0.3s'
                    }}>
                      {vaultErrorMsg}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          id={`vault-input-${index}`}
                          type="tel"
                          maxLength={1}
                          value={vaultCode[index] || ''}
                          onChange={(e) => handleVaultChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          style={{
                            width: 'clamp(50px, 15vw, 70px)', height: 'clamp(60px, 18vw, 85px)',
                            background: 'rgba(0,0,0,0.3)',
                            border: isShaking ? '1px solid rgba(255,0,0,0.4)' : '1px solid rgba(242,167,192,0.3)',
                            borderRadius: '12px',
                            color: 'var(--color-rose-light)',
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 6vw, 3rem)', textAlign: 'center',
                            outline: 'none', transition: 'all 0.2s'
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(242,167,192,0.3)'}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: 'linear-gradient(145deg, rgba(201,169,110,0.15), rgba(242,167,192,0.15))',
                      border: '1px solid rgba(201,169,110,0.6)',
                      borderRadius: '24px',
                      padding: '2.5rem 2rem',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 0 60px rgba(201,169,110,0.2)',
                      width: '100%'
                    }}
                  >
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎁</div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', color: 'var(--color-gold)',
                      fontSize: '1.8rem', marginBottom: '1.5rem',
                    }}>
                      Cofre Aberto!
                    </h3>
                    <div style={{
                      background: 'rgba(0,0,0,0.4)', border: '1px dashed var(--color-rose)',
                      padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem'
                    }}>
                      <span style={{
                        fontFamily: 'monospace', color: '#fff',
                        fontSize: '1.8rem', letterSpacing: '0.2em', fontWeight: 'bold'
                      }}>
                        YURELINDAO
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-elegant)', color: 'var(--color-champagne)',
                      fontSize: '1.1rem', lineHeight: 1.6,
                    }}>
                      Envie esse código para o seu marido que você vai receber um presente dentro de 3 horas.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AutoAdvance({ delay, onDone }: { delay: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, delay);
    return () => clearTimeout(t);
  }, [delay, onDone]);
  return null;
}
