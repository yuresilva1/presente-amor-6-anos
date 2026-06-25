import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onNext: () => void; }

const videos = [
  { src: '/videos/video1.mp4', title: 'O Lado Engraçado', caption: 'Porque a gente também sabe ser palhaço.' },
  { src: '/videos/video2.mp4', title: 'Loucuras Juntos', caption: 'Sempre rindo de tudo.' },
  { src: '/videos/video3.mp4', title: 'Zero Maturidade', caption: 'E eu não mudaria nada.' },
  { src: '/videos/video4.mp4', title: 'Nosso Jeito', caption: 'A melhor parte do meu dia é rir com você.' },
];

export default function Chapter6Film({ onNext }: Props) {
  const [step, setStep] = useState<'intro' | 'confirm' | 'volume_alert' | 'playing'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play / Pause logic for video
  useEffect(() => {
    if (step === 'playing' && videoRef.current) {
      videoRef.current.muted = true; // Ensure video is always muted programmatically
      if (isPlaying) videoRef.current.play().catch(() => setIsPlaying(false));
      else videoRef.current.pause();
    }
  }, [currentIndex, isPlaying, step]);

  // Handle Audio playback
  useEffect(() => {
    if (step === 'playing' && audioRef.current) {
      // Start audio playing and loop it automatically
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.play().catch(console.error);
    }
  }, [step]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextVideo = () => {
    // Loop de volta para o primeiro vídeo para continuar tocando até a música acabar!
    setCurrentIndex(prev => (prev + 1) % videos.length);
    setIsPlaying(true);
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(true);
    } else {
      setCurrentIndex(videos.length - 1);
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0507', padding: '2rem 0', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Audio (Hidden) - Quando a música acaba, pula pro final! */}
      <audio ref={audioRef} src="/audio/musica.mp3" onEnded={onNext} />

      <AnimatePresence mode="wait">
        
        {/* STEP 1: INTRO */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '2rem' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-gold)', marginBottom: '1.5rem',
            }}>
              Atenção
            </h2>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-rose-light)', marginBottom: '3rem',
            }}>
              Preparei algo um pouco diferente agora.<br/>
              Está preparada?
            </p>
            <motion.button
              onClick={() => setStep('confirm')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,110,0.2) 0%, rgba(242,167,192,0.2) 100%)',
                border: '1px solid rgba(201,169,110,0.4)', borderRadius: '50px',
                padding: '1rem 3rem', color: 'var(--color-gold-light)',
                fontFamily: 'var(--font-elegant)', fontSize: '1.1rem', cursor: 'pointer',
                letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '10px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              PLAY
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2: CONFIRM */}
        {step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '2rem' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-rose)', marginBottom: '3rem',
            }}>
              Tem certeza absoluta?
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                onClick={() => setStep('intro')}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px',
                  padding: '1rem 2rem', color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-elegant)', fontSize: '1rem', cursor: 'pointer',
                }}
              >
                Não, fiquei com medo
              </motion.button>
              
              <motion.button
                onClick={() => setStep('volume_alert')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(242,167,192,0.3) 0%, rgba(201,169,110,0.3) 100%)',
                  border: '1px solid rgba(201,169,110,0.6)', borderRadius: '50px',
                  padding: '1rem 2rem', color: 'var(--color-gold-light)',
                  fontFamily: 'var(--font-elegant)', fontSize: '1rem', cursor: 'pointer',
                  fontWeight: 'bold', letterSpacing: '0.05em'
                }}
              >
                Sim, estou preparada
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: VOLUME ALERT */}
        {step === 'volume_alert' && (
          <motion.div
            key="volume_alert"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '2rem' }}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [10, -10, 10, -10, 0] }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ fontSize: '4rem', marginBottom: '1rem' }}
            >
              🔊
            </motion.div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-gold-light)', marginBottom: '1rem',
            }}>
              Aumente o som!
            </h2>
            <p style={{
              fontFamily: 'var(--font-elegant)', fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-rose-light)', marginBottom: '3rem',
            }}>
              Para a experiência completa...
            </p>
            <motion.button
              onClick={() => setStep('playing')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, rgba(201,169,110,0.3) 0%, rgba(242,167,192,0.3) 100%)',
                border: '1px solid rgba(201,169,110,0.5)', borderRadius: '50px',
                padding: '1rem 3rem', color: '#fff',
                fontFamily: 'var(--font-elegant)', fontSize: '1.1rem', cursor: 'pointer',
                letterSpacing: '0.1em'
              }}
            >
              Pronto, aumentei!
            </motion.button>
          </motion.div>
        )}

        {/* STEP 4: PLAYING */}
        {step === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 1rem', position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.2)'
            }}>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <video
                    ref={videoRef}
                    src={videos[currentIndex].src}
                    playsInline
                    autoPlay
                    onEnded={nextVideo}
                    // O volume do vídeo original fica mudo para ouvirmos a música!
                    muted={true}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      // Cartoon/Cinematic Filter Style
                      filter: 'saturate(1.8) contrast(1.25) brightness(1.1) sepia(0.15)',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Video Overlay (Controls & Text) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(10,5,7,0.9) 0%, rgba(10,5,7,0.4) 40%, transparent 100%)',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
              }}>
                <motion.div
                  key={`text-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-gold-light)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                  }}>
                    {videos[currentIndex].title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-elegant)',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                    letterSpacing: '0.05em',
                    textShadow: '0 1px 5px rgba(0,0,0,0.8)'
                  }}>
                    {videos[currentIndex].caption}
                  </p>
                </motion.div>
              </div>

              {/* Interactive Play/Pause Area */}
              <div 
                onClick={togglePlay}
                style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 10 }}
              />

              {/* Play Icon Overlay (when paused) */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '80px', height: '80px',
                      background: 'rgba(10,5,7,0.6)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(201,169,110,0.4)',
                      pointerEvents: 'none',
                      zIndex: 20
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-gold-light)" style={{ marginLeft: '4px' }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              <div style={{
                position: 'absolute', bottom: '2rem', right: '2rem',
                display: 'flex', gap: '1rem', zIndex: 20, pointerEvents: 'auto'
              }}>
                <button
                  onClick={(e) => { e.stopPropagation(); prevVideo(); }}
                  disabled={currentIndex === 0}
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: currentIndex === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(201,169,110,0.2)',
                    border: '1px solid rgba(201,169,110,0.3)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: currentIndex === 0 ? 'default' : 'pointer',
                    backdropFilter: 'blur(8px)', transition: 'all 0.3s ease'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextVideo(); }}
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'rgba(201,169,110,0.2)', border: '1px solid rgba(201,169,110,0.3)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {videos.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentIndex ? '30px' : '8px', height: '8px',
                    borderRadius: '4px', background: i === currentIndex ? 'var(--color-gold)' : 'rgba(201,169,110,0.2)',
                    transition: 'all 0.4s ease'
                  }}
                />
              ))}
            </div>

            {/* Next Chapter Button */}
            <div style={{ textAlign: 'center', padding: '3rem 0 4rem' }}>
              <motion.button
                onClick={onNext}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  background: 'transparent', border: '1px solid rgba(242,167,192,0.3)',
                  borderRadius: '50px', padding: '0.85rem 2.2rem',
                  color: 'var(--color-rose)', fontFamily: 'var(--font-elegant)',
                  fontSize: '1rem', cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.4s ease',
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(242,167,192,0.7)' }}
                whileTap={{ scale: 0.97 }}
              >
                Ir Para o Final
              </motion.button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
