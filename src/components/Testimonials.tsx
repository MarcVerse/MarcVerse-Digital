import { useRef, useState, useEffect, useCallback } from 'react';
import type React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from './Section';

interface Testimonial {
  representative: string;
  company: string;
  role: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    representative: 'Shedrach Akan',
    company: 'Suna Atlantic Fire Limited',
    role: 'Chief Executive Officer (CEO)',
    text: 'MarcVerse has been our go-to partner for over three years. Every deliverable, from proposals to social media content, is handled with real professionalism and creativity. We genuinely enjoy working with them.',
    avatar: '/images/testimonial_shedrach.jpg',
  },
  {
    representative: 'Prince Olojo K.K.K.',
    company: 'Society of Nigerian Artists (SNA)',
    role: 'Chairman',
    text: 'From certificate design to creative writing, every piece of work feels thoughtful and well-crafted. MarcVerse doesn\'t just deliver—they care about the quality of what they put out.',
    avatar: '/images/testimonial_prince_olojo.jpg',
  },
  {
    representative: 'Olamide Rukayat',
    company: 'Lagos State University of Science and Technology (LASUSTECH)',
    role: 'Final Year Project Research & Academic Support',
    text: 'My final year project felt overwhelming until I worked with MarcVerse. Their research support and writing guidance made the whole process smoother, and I was genuinely proud of what I submitted.',
    avatar: '/images/testimonial_olamide.jpg',
  },
  {
    representative: 'Mr. Oyediran Amos',
    company: 'University of Lagos (UNILAG)',
    role: 'Thesis Research & Academic Support',
    text: 'Thesis support from MarcVerse was a real relief. They were thorough, responsive, and the final document looked polished. I felt confident submitting work I knew was in good hands.',
    avatar: '/images/testimonial_oyediran.jpg',
  },
];

const DURATION = 5500;
const SLIDE_OFFSET = 60;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -SLIDE_OFFSET : SLIDE_OFFSET,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const cardContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const startRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const touchStartX = useRef(0);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    startRef.current = Date.now();
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startRef.current = Date.now();
    setProgress(0);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
    startRef.current = Date.now();
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerRef.current);
      return;
    }
    startRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        next();
        startRef.current = Date.now();
      }
      timerRef.current = setTimeout(tick, 100);
    };

    timerRef.current = setTimeout(tick, 100);
    return () => clearTimeout(timerRef.current);
  }, [isPaused, next]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const current = testimonials[activeIndex];

  return (
    <Section
      id="testimonials"
      className="bg-zinc-950 border-y border-zinc-800/60 text-white"
      backgrounds={
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-teal-900/15 to-zinc-950" />

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[280px] md:w-[500px] md:h-[320px] rounded-full bg-emerald-500/[0.1] blur-[80px]"
            style={{ animation: 'pulseGlow 6s ease-in-out infinite', willChange: 'transform, opacity' }}
          />

          <div
            className="absolute top-[20%] left-[-10%] w-56 h-56 md:w-72 md:h-72 rounded-full bg-teal-500/[0.1] blur-[60px]"
            style={{ animation: 'floatBlob1 12s ease-in-out infinite', willChange: 'transform' }}
          />
          <div
            className="absolute bottom-[10%] right-[-5%] w-64 h-64 md:w-80 md:h-80 rounded-full bg-emerald-400/[0.08] blur-[70px]"
            style={{ animation: 'floatBlob2 15s ease-in-out infinite', willChange: 'transform' }}
          />
          <div
            className="absolute top-[60%] left-[40%] w-44 h-44 md:w-56 md:h-56 rounded-full bg-cyan-500/[0.06] blur-[50px]"
            style={{ animation: 'floatBlob1 10s ease-in-out infinite', animationDelay: '2s', willChange: 'transform' }}
          />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              animation: 'gridShift 20s linear infinite',
            }}
          />

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-300/40"
              style={{
                width: `${2 + (i % 3) * 1.5}px`,
                height: `${2 + (i % 3) * 1.5}px`,
                top: `${10 + (i * 12) % 80}%`,
                left: `${10 + (i * 17) % 80}%`,
                animation: `floatParticle ${8 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />

          <BackgroundKeyframes />
        </>
      }
    >
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-800/30 bg-emerald-500/10 text-emerald-400 font-sans text-[11px] font-semibold tracking-wide uppercase mb-3">
          <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
          Trusted by businesses and students across Nigeria
        </div>

        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          What Our{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 font-bold">
            Clients Say
          </span>
        </h2>

        <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          We&apos;re proud to have built lasting relationships by delivering reliable, high-quality digital solutions.
        </p>
      </div>

      <div
        className="relative w-full max-w-2xl mx-auto select-none outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
          }
        }}
        tabIndex={0}
        role="region"
        aria-label="Client testimonials carousel"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          type="button"
          aria-label="Previous testimonial"
           className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full bg-white/15 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-emerald-500/10 hover:border-emerald-400/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          type="button"
          aria-label="Next testimonial"
           className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full bg-white/15 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-emerald-500/10 hover:border-emerald-400/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="relative h-[260px] md:h-[240px] flex items-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-x-0 flex items-center justify-center px-4 md:px-10"
            >
              <motion.div
                variants={cardContainerVariants}
                initial="hidden"
                animate="show"
                className="relative w-full max-w-2xl rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/40 dark:border-zinc-700/40 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.4)] overflow-hidden px-5 py-6 md:px-8 md:py-6"
              >
                <motion.div variants={itemVariants} className="absolute top-5 left-6 pointer-events-none select-none md:top-6 md:left-8">
                  <Quote size={80} className="text-emerald-500/[0.06] dark:text-emerald-400/[0.06] rotate-180 md:hidden" />
                  <Quote size={100} className="text-emerald-500/[0.06] dark:text-emerald-400/[0.06] rotate-180 hidden md:block" />
                </motion.div>

                <motion.div variants={itemVariants} className="relative z-10 flex items-center gap-4 mb-5">
                  <div className="relative flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-emerald-500/20 shadow-[0_0_24px_-10px_rgba(16,185,129,0.5)]">
                    <img
                      src={current.avatar}
                      alt={current.representative}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base md:text-lg font-bold text-zinc-900 dark:text-white truncate">
                      {current.representative}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {current.role}
                    </p>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                      {current.company}
                    </p>
                    <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 italic relative z-10"
                >
                  &ldquo;{current.text}&rdquo;
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="w-full max-w-xs h-[3px] rounded-full bg-zinc-800/70 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer focus:outline-none ${
                  idx === activeIndex
                    ? 'w-6 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function BackgroundKeyframes() {
  return (
    <style>{`
      @keyframes pulseGlow {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      }
      @keyframes floatBlob1 {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(30px, -40px); }
        66% { transform: translate(-20px, 20px); }
      }
      @keyframes floatBlob2 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-40px, -30px); }
      }
      @keyframes floatParticle {
        0%, 100% { transform: translateY(0); opacity: 0.3; }
        50% { transform: translateY(-20px); opacity: 0.7; }
      }
      @keyframes gridShift {
        0% { background-position: 0 0; }
        100% { background-position: 60px 60px; }
      }
    `}</style>
  );
}
