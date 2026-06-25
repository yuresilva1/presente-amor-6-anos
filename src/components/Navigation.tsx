import { motion } from 'framer-motion';
import type { Chapter } from '../App';

interface Props {
  currentChapter: Chapter;
  goTo: (c: Chapter) => void;
}

const chapters: Array<{ id: Chapter; label: string }> = [
  { id: 'chapter1', label: 'Início' },
  { id: 'chapter2', label: 'Memórias' },
  { id: 'special', label: 'Especial' },
  { id: 'chapter3', label: 'Carta' },
  { id: 'chapter4', label: 'Galeria' },
  { id: 'chapter5', label: 'Significado' },
  { id: 'chapter6', label: 'Filme' },
  { id: 'finale', label: 'Final' },
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
        height: '48px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.2rem',
        overflowX: 'auto',
      }}
    >
      {chapters.map(ch => (
        <button
          key={ch.id}
          onClick={() => goTo(ch.id)}
          title={ch.label}
          style={{
            background: currentChapter === ch.id
              ? 'rgba(201,169,110,0.12)'
              : 'transparent',
            border: currentChapter === ch.id
              ? '1px solid rgba(201,169,110,0.35)'
              : '1px solid transparent',
            borderRadius: '6px',
            padding: '0.35rem 0.75rem',
            color: currentChapter === ch.id ? 'var(--color-gold)' : 'var(--color-text-muted)',
            fontFamily: 'var(--font-elegant)',
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'all 0.35s ease',
            whiteSpace: 'nowrap',
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
    </motion.nav>
  );
}
