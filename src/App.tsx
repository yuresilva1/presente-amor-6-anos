import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Chapter1Carousel from './components/Chapter1Carousel';
import Chapter2Timeline from './components/Chapter2Timeline';
import SpecialCards from './components/SpecialCards';
import Chapter3LoveLetter from './components/Chapter3LoveLetter';
import Chapter4Gallery from './components/Chapter4Gallery';
import Chapter5WordOrbit from './components/Chapter5WordOrbit';
import GrandFinale from './components/GrandFinale';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import './index.css';

export type Chapter = 'intro' | 'chapter1' | 'chapter2' | 'special' | 'chapter3' | 'chapter4' | 'chapter5' | 'finale';

const chapterOrder: Chapter[] = ['intro','chapter1','chapter2','special','chapter3','chapter4','chapter5','finale'];

function App() {
  const [currentChapter, setCurrentChapter] = useState<Chapter>('intro');
  const [started, setStarted] = useState(false);

  const goToNext = () => {
    const idx = chapterOrder.indexOf(currentChapter);
    if (idx < chapterOrder.length - 1) {
      setCurrentChapter(chapterOrder[idx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goTo = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (started) setCurrentChapter('chapter1');
  }, [started]);

  return (
    <div className="app-root" style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <ParticleBackground chapter={currentChapter} />

      {currentChapter !== 'intro' && (
        <Navigation currentChapter={currentChapter} goTo={goTo} />
      )}

      <AnimatePresence mode="wait">
        {currentChapter === 'intro' && (
          <motion.div key="intro"
            initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}>
            <IntroScreen onStart={() => setStarted(true)} />
          </motion.div>
        )}
        {currentChapter === 'chapter1' && (
          <motion.div key="chapter1" style={{ paddingTop: '56px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}>
            <Chapter1Carousel onNext={goToNext} />
          </motion.div>
        )}
        {currentChapter === 'chapter2' && (
          <motion.div key="chapter2" style={{ paddingTop: '56px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Chapter2Timeline onNext={goToNext} />
          </motion.div>
        )}
        {currentChapter === 'special' && (
          <motion.div key="special" style={{ paddingTop: '56px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <SpecialCards onNext={goToNext} />
          </motion.div>
        )}
        {currentChapter === 'chapter3' && (
          <motion.div key="chapter3" style={{ paddingTop: '56px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Chapter3LoveLetter onNext={goToNext} />
          </motion.div>
        )}
        {currentChapter === 'chapter4' && (
          <motion.div key="chapter4" style={{ paddingTop: '56px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Chapter4Gallery onNext={goToNext} />
          </motion.div>
        )}
        {currentChapter === 'chapter5' && (
          <motion.div key="chapter5" style={{ paddingTop: '56px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Chapter5WordOrbit onNext={goToNext} />
          </motion.div>
        )}

        {currentChapter === 'finale' && (
          <motion.div key="finale"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}>
            <GrandFinale />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
