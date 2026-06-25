import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onNext: () => void; }

// A carta completa — baseada na mensagem pessoal
// Cada parágrafo separado por linha em branco para respiração natural
const letterText = `O começo de nossa história todos já conhecem, mas hoje é comemorado algo muito mais especial: nosso casamento.

Há exatos 6 anos atrás, decidimos através de loucura e um pouco de pressão nos unir, mas desde sempre sabia que era a coisa certa. Loucura talvez, mas não tinha dúvidas que era para ser.

A nossa conexão foi tão forte desde o primeiro encontro que sabia que tinha que te ter pro resto da minha vida.

Essa é uma simples homenagem que estou fazendo para mostrar o quanto te amo.

Temos passado momentos difíceis, complicados, decisões que nos fazem crescer como casal e família. Tudo tem se tornado mais complexo, mas o desejo de fazer as coisas acontecerem só aumenta: corrigir as falhas, melhorar como pai, marido, melhorar como família.

Você sempre sabe o que me dizer, mesmo estando perdida em alguns momentos. Você é a cabeça dessa família e você sabe disso.

Ultimamente tenho orado bastante justamente para ver com seus olhos, ter as atitudes conforme o jeito que você pensa, pois você é o alicerce da nossa casa. Eu poderia simplesmente fazer sempre as coisas do meu jeito, mas eu sei que simplesmente não daria certo.

Eu sei que tanto eu quanto você temos potencial infinito para alcançar coisas grandiosas. Sei que tenho sido teimoso ao longo desse tempo, nesse meu complexo de herói, tenho falhado em diversas áreas, mas sei que você luta comigo o tempo todo.

Que essa homenagem seja o recomeço de muita coisa que foi perdida e a melhora dos próximos dias, anos e décadas que viveremos juntos.

Você é uma das pessoas mais resilientes, carinhosas, inteligentes. Você é um espetáculo em vários sentidos. Você é brilhante em muitos aspectos.

Você sabe ser engraçada o mesmo tanto que sabe ser chata, sabe ser interessante no mesmo nível que consegue ver tanta coisa idiota, mas você é uma mulher que nasceu para ser muito amada e eu quero e sou esse cara que precisa fazer isso.

Não quero ser a pessoa que você não quer ter ao lado e por isso tenho que melhorar por mim, por você e pela nossa família. Afinal, são 6 anos.

Quero ainda poder te proporcionar tudo que você sonha ou sonhou. Eu penso nisso sempre a todo momento, seja com uma festa de casamento, viagem, uma casa com uma ilha, entre tantas outras coisas que você me diz.

Tudo que digo aqui é de coração. Queria poder fazer mais e mais, só que foi assim que achei um meio de te demonstrar todo meu carinho nesse dia especial.

Parabéns pra nós e para nosso amor.`;

export default function Chapter3LoveLetter({ onNext }: Props) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const openEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setLetterVisible(true), 1000);
  };

  useEffect(() => {
    if (!letterVisible) return;

    setTyping(true);
    indexRef.current = 0;

    // Velocidade lenta e cinematográfica: 30ms por caractere
    // Pausas maiores após pontuação para respiração dramática
    const tick = () => {
      const i = indexRef.current;
      if (i >= letterText.length) {
        setTyping(false);
        return;
      }

      setDisplayText(letterText.slice(0, i + 1));
      indexRef.current++;

      const char = letterText[i];
      let delay = 30; // velocidade base — lenta e cuidadosa

      // Pausas dramáticas após pontuação e quebras de linha
      if (char === '\n') delay = 180;
      else if (char === '.') delay = 200;
      else if (char === ',') delay = 100;
      else if (char === '—') delay = 120;
      else if (char === ':') delay = 150;

      intervalRef.current = setTimeout(tick, delay);
    };

    intervalRef.current = setTimeout(tick, 300);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [letterVisible]);

  const skipTyping = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    setDisplayText(letterText);
    setTyping(false);
  };

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
          Capítulo 03
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500, color: 'var(--color-rose-light)', marginBottom: '0.75rem',
        }}>
          Uma Carta Para Você
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="gold-divider"
          style={{ marginTop: '0.5rem' }}
        />
      </motion.div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Envelope */}
        <AnimatePresence>
          {!envelopeOpen && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.88, y: -40, filter: 'blur(12px)' }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{ textAlign: 'center', padding: '3rem 0' }}
            >
              <motion.div
                onClick={openEnvelope}
                id="open-envelope-btn"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  cursor: 'pointer', display: 'inline-block',
                  filter: 'drop-shadow(0 24px 60px rgba(201,169,110,0.25))',
                }}
              >
                <div style={{
                  width: 'min(300px, 76vw)', height: '190px',
                  position: 'relative', margin: '0 auto',
                }}>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '155px',
                    background: 'linear-gradient(180deg, #241018 0%, #180a10 100%)',
                    border: '1px solid rgba(201,169,110,0.35)',
                    borderRadius: '6px', overflow: 'hidden',
                  }}>
                    <svg style={{ position: 'absolute', bottom: 0, width: '100%', height: '80px' }} viewBox="0 0 300 80" preserveAspectRatio="none">
                      <polygon points="0,80 150,22 300,80" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.2)" strokeWidth="0.5" />
                    </svg>
                    <svg style={{ position: 'absolute', top: 0, width: '100%', height: '78px' }} viewBox="0 0 300 78" preserveAspectRatio="none">
                      <polygon points="0,0 150,58 300,0" fill="rgba(201,169,110,0.06)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
                    </svg>
                    {/* Wax seal */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '46px', height: '46px',
                      background: 'radial-gradient(circle at 40% 38%, #c0405a, #7a1030)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 24px rgba(192,64,90,0.45)',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,220,230,0.9)">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '78px',
                    background: 'linear-gradient(180deg, #1e0c14 0%, #180a10 100%)',
                    borderRadius: '6px 6px 0 0',
                    border: '1px solid rgba(201,169,110,0.35)', overflow: 'hidden',
                  }}>
                    <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 300 78" preserveAspectRatio="none">
                      <polygon points="0,0 150,68 300,0" fill="rgba(201,169,110,0.1)" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              <motion.p
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
                  color: 'var(--color-gold-light)', marginTop: '2.5rem', fontSize: '1rem',
                  letterSpacing: '0.06em',
                }}
              >
                Clique para abrir
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter */}
        <AnimatePresence>
          {letterVisible && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 60, scale: 0.96, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{
                background: 'linear-gradient(175deg, #f6f1e9 0%, #ede5d2 100%)',
                borderRadius: '16px',
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,169,110,0.25)',
                position: 'relative', marginBottom: '3rem', overflow: 'hidden',
              }}
            >
              {/* Paper lines */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} style={{
                  position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 4.2}%`,
                  height: '1px', background: 'rgba(201,169,110,0.07)',
                }} />
              ))}
              {/* Inner border */}
              <div style={{
                position: 'absolute', inset: '14px',
                border: '1px solid rgba(201,169,110,0.16)',
                borderRadius: '8px', pointerEvents: 'none',
              }} />

              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative' }}>
                <p style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  color: '#7a3550', marginBottom: '0.75rem',
                }}>
                  Para o Amor da Minha Vida
                </p>
                <div style={{
                  width: '60px', height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
                  margin: '0 auto',
                }} />
              </div>

              {/* Letter body */}
              <div style={{
                fontFamily: 'var(--font-elegant)',
                fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
                color: '#352030', lineHeight: 2,
                whiteSpace: 'pre-line', position: 'relative',
              }}>
                {displayText}
                {typing && (
                  <span style={{
                    display: 'inline-block', width: '2px', height: '1.1em',
                    background: '#7a3550', marginLeft: '1px',
                    verticalAlign: 'text-bottom',
                    animation: 'blink-cursor 0.9s step-end infinite',
                  }} />
                )}
              </div>

              {/* Skip button while typing */}
              {typing && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                  onClick={skipTyping}
                  style={{
                    position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                    background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '20px', padding: '0.4rem 1rem',
                    color: '#8a5540', fontFamily: 'var(--font-elegant)',
                    fontSize: '0.78rem', letterSpacing: '0.1em',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,169,110,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,169,110,0.15)')}
                >
                  Avançar carta
                </motion.button>
              )}

              {/* Signature */}
              {!typing && letterVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  style={{ marginTop: '2.5rem', textAlign: 'right' }}
                >
                  <div style={{
                    width: '40px', height: '1px',
                    background: 'linear-gradient(90deg, transparent, #c9a96e)',
                    marginLeft: 'auto', marginBottom: '1rem',
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#7a3550',
                  }}>
                    Yure
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next */}
      {!typing && letterVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', padding: '0 0 4rem' }}
        >
          <motion.button
            id="ch3-next-btn"
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
            Nossa Galeria de Momentos
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
