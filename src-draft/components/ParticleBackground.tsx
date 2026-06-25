import { useEffect, useRef } from 'react';

interface Props { chapter: string; }

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  color: string; life: number; maxLife: number;
}

export default function ParticleBackground({ chapter }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#f2a7c0', '#c9a96e', '#f0d9a8', '#fde8f0', '#e8c97a'];
    const isFinale = chapter === 'finale';

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * (isFinale ? 3 : 0.8),
      vy: -(Math.random() * (isFinale ? 4 : 1.5) + (isFinale ? 1 : 0.3)),
      size: Math.random() * (isFinale ? 6 : 3) + 1,
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 150,
    });

    const maxParticles = isFinale ? 80 : 25;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles
      if (particlesRef.current.length < maxParticles && Math.random() < (isFinale ? 0.4 : 0.15)) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife && p.y > -50);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (lifeRatio < 0.2 ? lifeRatio / 0.2 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        if (isFinale && p.size > 4) {
          // Draw heart
          const s = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + s * 0.3);
          ctx.bezierCurveTo(p.x, p.y, p.x - s, p.y, p.x - s, p.y + s * 0.4);
          ctx.bezierCurveTo(p.x - s, p.y + s * 0.8, p.x, p.y + s * 1.1, p.x, p.y + s * 1.4);
          ctx.bezierCurveTo(p.x, p.y + s * 1.1, p.x + s, p.y + s * 0.8, p.x + s, p.y + s * 0.4);
          ctx.bezierCurveTo(p.x + s, p.y, p.x, p.y, p.x, p.y + s * 0.3);
          ctx.fill();
        } else {
          // Sparkle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          if (p.size > 2) {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
          }
        }
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
      particlesRef.current = [];
    };
  }, [chapter]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
