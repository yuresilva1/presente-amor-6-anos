import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onNext: () => void; }

const videos = [
  { src: '/videos/video1.mp4', title: 'O Lado Engraçado', caption: 'Porque a gente também sabe ser palhaço.' },
  { src: '/videos/video2.mp4', title: 'Loucuras Juntos', caption: 'Sempre rindo de tudo.' },
  { src: '/videos/video3.mp4', title: 'Zero Maturidade', caption: 'E eu não mudaria nada.' },
  { src: '/videos/video4.mp4', title: 'Nosso Jeito', caption: 'A melhor parte do meu dia é rir com você.' },
  { src: '/videos/video5.mp4', title: 'Momentos Únicos', caption: 'Colecionando sorrisos.' },
  { src: '/videos/video6.mp4', title: 'E as Piadas', caption: 'Sempre rindo até doer a barriga.' },
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
                padding: 'clamp(1.2rem, 3vw, 1.5rem) clamp(3rem, 6vw, 4rem)', color: 'var(--color-gold-light)',
                fontFamily: 'var(--font-elegant)', fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', cursor: 'pointer',
                letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '10px'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
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
            style={{ textAlign: 'center', padding: '2rem 1rem' }}
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
                  padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)', color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-elegant)', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', cursor: 'pointer',
                  flex: '1 1 auto', minWidth: '200px'
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
                  padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)', color: 'var(--color-gold-light)',
                  fontFamily: 'var(--font-elegant)', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', cursor: 'pointer',
                  fontWeight: 'bold', letterSpacing: '0.05em',
                  flex: '1 1 auto', minWidth: '200px'
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
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: '#000',
            }}
          >
            {/* Video fullscreen */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <video
                  ref={videoRef}
                  src={videos[currentIndex].src}
                  playsInline
                  autoPlay
                  onEnded={nextVideo}
                  muted={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'saturate(1.8) contrast(1.25) brightness(1.05) sepia(0.1)',
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
              pointerEvents: 'none',
              zIndex: 10,
            }} />

            {/* Click to pause overlay */}
            <div
              onClick={togglePlay}
              style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 20 }}
            />

            {/* Play/Pause icon (when paused) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90px', height: '90px',
                    background: 'rgba(10,5,7,0.65)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201,169,110,0.5)',
                    pointerEvents: 'none',
                    zIndex: 30,
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-gold-light)" style={{ marginLeft: '4px' }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom HUD: title + caption + controls */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)',
              zIndex: 30,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem',
            }}>
              {/* Title & caption */}
              <motion.div
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-gold-light)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
                  marginBottom: '0.4rem',
                  textShadow: '0 2px 15px rgba(0,0,0,0.9)',
                }}>
                  {videos[currentIndex].title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-elegant)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                  letterSpacing: '0.04em',
                }}>
                  {videos[currentIndex].caption}
                </p>

                {/* Dot indicators */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  {videos.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === currentIndex ? '28px' : '7px', height: '7px',
                        borderRadius: '4px',
                        background: i === currentIndex ? 'var(--color-gold)' : 'rgba(255,255,255,0.35)',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Navigation arrows + skip button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '0.7rem' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevVideo(); }}
                    style={{
                      width: '50px', height: '50px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(201,169,110,0.4)',
                      color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 40,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextVideo(); }}
                    style={{
                      width: '50px', height: '50px', borderRadius: '50%',
                      background: 'rgba(201,169,110,0.25)',
                      border: '1px solid rgba(201,169,110,0.5)',
                      color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 40,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <motion.button
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(242,167,192,0.4)',
                    borderRadius: '50px',
                    padding: '0.6rem 1.4rem',
                    color: 'var(--color-rose-light)',
                    fontFamily: 'var(--font-elegant)',
                    fontSize: '0.9rem', cursor: 'pointer',
                    letterSpacing: '0.08em',
                    backdropFilter: 'blur(8px)',
                    zIndex: 40,
                  }}
                >
                  Pular →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
