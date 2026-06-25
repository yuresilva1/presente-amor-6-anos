import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onNext: () => void; }

const meanings = [
  {
    id: 'esposa',
    title: 'Minha Mulher',
    desc: 'O amor da minha vida',
    fullText: 'Você é tudo o que eu sempre sonhei e muito mais. Minha parceira, minha amiga e meu amor. Você é a razão pela qual acordo todos os dias querendo ser melhor. Sua presença transforma qualquer dia comum em algo especial. O que nós construímos juntos é a coisa mais preciosa que eu tenho, e eu jamais serei capaz de te agradecer o suficiente por me escolher.',
    delay: 0,
    color: '#f2a7c0'
  },
  {
    id: 'mae',
    title: 'Mãe do Davi',
    desc: 'Uma mãe espetacular',
    fullText: 'Para o Davi, você é o mundo. O seu amor de mãe é a força mais linda que eu já vi. Ver você cuidar, ensinar e amar o Davi com tanta paciência e dedicação me faz te admirar mil vezes mais. Ele tem muita sorte de ter você como mãe, e eu tenho ainda mais sorte de dividir essa jornada incrível da paternidade ao seu lado. Você é espetacular.',
    delay: 0.5,
    color: '#c9a96e'
  },
  {
    id: 'familia',
    title: 'Nosso Alicerce',
    desc: 'A força da nossa casa',
    fullText: 'Nós três somos um só, graças a você. Você é o pilar que sustenta o nosso lar. Mesmo nos dias difíceis, você encontra uma maneira de nos guiar. Você é a cabeça e o coração da nossa família. É por você e pelo Davi que eu luto todos os dias. Você não é apenas parte da nossa família — você é a força vital que nos mantém unidos.',
    delay: 1,
    color: '#e6b8c9'
  },
  {
    id: 'amiga',
    title: 'Melhor Amiga',
    desc: 'Minha confidente',
    fullText: 'Você sabe ser engraçada o mesmo tanto que sabe ser chata, sabe ser interessante no mesmo nível que consegue ver tanta coisa idiota. Eu amo cada detalhe disso. É com você que eu quero dar risada, é com você que eu quero desabafar. Nossa cumplicidade é o que torna tudo tão leve e divertido. Você é meu porto seguro.',
    delay: 0.8,
    color: '#d4af37'
  },
  {
    id: 'futuro',
    title: 'Meu Futuro',
    desc: 'Para sempre nós',
    fullText: 'Quero ainda poder te proporcionar tudo que você sonha ou sonhou. Eu penso nisso sempre a todo momento, seja com uma festa de casamento, viagem, uma casa com uma ilha, entre tantas outras coisas que você me diz. Foram 6 anos incríveis, mas eu sei que é só o começo. Eu escolho você hoje, amanhã e para o resto da minha vida.',
    delay: 1.5,
    color: '#ffcdd2'
  }
];

export default function Chapter5Meaning({ onNext }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeMeaning = meanings.find(m => m.id === activeId);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '2rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glowing orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(242,167,192,0.03) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ textAlign: 'center', padding: '3rem 2rem 1rem', position: 'relative', zIndex: 10 }}
      >
        <p style={{
          fontFamily: 'var(--font-elegant)', fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
          color: 'var(--color-gold)', letterSpacing: '0.35em', textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          Capítulo 05
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500, color: 'var(--color-rose-light)', marginBottom: '0.75rem',
        }}>
          O Que Você Significa
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="gold-divider"
          style={{ marginTop: '0.5rem' }}
        />
        <p style={{
          fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
          color: 'var(--color-text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          marginTop: '1.5rem', letterSpacing: '0.05em'
        }}>
          Toque nos corações flutuantes para ler
        </p>
      </motion.div>

      {/* Floating Buttons */}
      <div style={{
        position: 'relative', maxWidth: '800px', margin: '3rem auto',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '0 1rem',
        zIndex: 5, minHeight: '300px', alignItems: 'center'
      }}>
        {meanings.map((item) => {
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -15, 0] // Floating animation
              }}
              transition={{
                opacity: { duration: 1, delay: item.delay },
                scale: { duration: 1, delay: item.delay, type: 'spring' },
                y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: item.delay }
              }}
              whileHover={{ scale: 1.1, boxShadow: `0 0 40px ${item.color}40` }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '140px', height: '140px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${item.color}50`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 10px 30px ${item.color}15, inset 0 0 20px rgba(255,255,255,0.02)`,
                padding: '1rem', textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Inner glowing ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-2px', borderRadius: '50%',
                  border: `1px dashed ${item.color}30`, pointerEvents: 'none'
                }}
              />
              <span style={{
                fontFamily: 'var(--font-display)', color: item.color,
                fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em',
                marginBottom: '0.5rem', lineHeight: 1.2
              }}>
                {item.title}
              </span>
              <span style={{
                fontFamily: 'var(--font-elegant)', color: 'var(--color-text-muted)',
                fontSize: '0.75rem', fontStyle: 'italic', lineHeight: 1.3
              }}>
                {item.desc}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Modal / Expanded Text */}
      <AnimatePresence>
        {activeId && activeMeaning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(10,5,7,0.85)', backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, rgba(30,15,20,0.95), rgba(20,10,14,0.95))',
                border: `1px solid ${activeMeaning.color}40`,
                borderRadius: '24px',
                padding: '3rem 2rem',
                maxWidth: '500px', width: '100%',
                textAlign: 'center',
                boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 80px ${activeMeaning.color}20`,
                position: 'relative', overflow: 'hidden'
              }}
            >
              {/* Decorative corners */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: `2px solid ${activeMeaning.color}`, borderLeft: `2px solid ${activeMeaning.color}`, opacity: 0.3, borderTopLeftRadius: '24px' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: `2px solid ${activeMeaning.color}`, borderRight: `2px solid ${activeMeaning.color}`, opacity: 0.3, borderBottomRightRadius: '24px' }} />

              <h3 style={{
                fontFamily: 'var(--font-script)', color: activeMeaning.color,
                fontSize: '2.5rem', marginBottom: '1.5rem',
                textShadow: `0 0 20px ${activeMeaning.color}40`
              }}>
                {activeMeaning.title}
              </h3>
              
              <div style={{
                width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${activeMeaning.color}, transparent)`,
                margin: '0 auto 2rem'
              }} />

              <p style={{
                fontFamily: 'var(--font-elegant)', color: 'var(--color-champagne)',
                fontSize: '1.05rem', lineHeight: 1.9, letterSpacing: '0.03em'
              }}>
                {activeMeaning.fullText}
              </p>

              <button
                onClick={() => setActiveId(null)}
                style={{
                  marginTop: '3rem', background: 'transparent',
                  border: `1px solid ${activeMeaning.color}60`,
                  borderRadius: '50px', padding: '0.6rem 2rem',
                  color: activeMeaning.color, fontFamily: 'var(--font-elegant)',
                  fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s ease',
                  letterSpacing: '0.1em'
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${activeMeaning.color}15`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next */}
      <div style={{ textAlign: 'center', padding: '3rem 0 4rem', position: 'relative', zIndex: 10 }}>
        <motion.button
          id="ch5-next-btn"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={onNext}
          style={{
            background: 'transparent',
            border: '1px solid rgba(242,167,192,0.3)',
            borderRadius: '50px',
            padding: '0.85rem 2.2rem',
            color: 'var(--color-rose)',
            fontFamily: 'var(--font-elegant)',
            fontSize: '1rem',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            transition: 'all 0.4s ease',
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(242,167,192,0.7)' }}
          whileTap={{ scale: 0.97 }}
        >
          Para Sempre Nós
        </motion.button>
      </div>
    </div>
  );
}
