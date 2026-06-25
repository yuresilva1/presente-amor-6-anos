import { motion } from 'framer-motion';
import type { Chapter } from '../App';

interface Props {
  currentChapter: Chapter;
  goTo: (c: Chapter) => void;
}

const chapters: { id: Chapter; label: string }[] = [
  { id: 'intro', label: 'Início' },
  { id: 'chapter1', label: 'Lembranças' },
  { id: 'chapter3', label: 'Carta' },
  { id: 'chapter4', label: 'Galeria' },
  { id: 'chapter5', label: 'Mural' },
  { id: 'chapter6', label: 'Filme' },
  { id: 'finale', label: 'O Fim' },
];

export default function Navigation({ currentChapter, goTo }: Props) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,5,7,0.88)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(201,169,110,0.08)',
        padding: '0 1rem',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
        gap: '0.5rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ display: 'flex', gap: '0.8rem', margin: '0 auto', padding: '0 1rem' }}>
        {chapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => goTo(ch.id)}
            title={ch.label}
            style={{
              background: currentChapter === ch.id
                ? 'rgba(201,169,110,0.15)'
                : 'transparent',
              border: currentChapter === ch.id
                ? '1px solid rgba(201,169,110,0.4)'
                : '1px solid transparent',
              borderRadius: '20px',
              padding: '0.6rem 1.2rem',
              color: currentChapter === ch.id ? 'var(--color-gold)' : 'var(--color-text-muted)',
              fontFamily: 'var(--font-elegant)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              if (currentChapter !== ch.id) {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-rose-light)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(242,167,192,0.2)';
              }
            }}
            onMouseLeave={e => {
              if (currentChapter !== ch.id) {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
              }
            }}
          >
            {ch.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
