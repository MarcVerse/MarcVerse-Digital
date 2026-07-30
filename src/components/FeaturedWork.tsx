import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import type { KeyboardEvent, MouseEvent, WheelEvent, TouchEvent } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { projects, isBrandProject, isWebsiteProject, type Project } from '../data/portfolio';

const categories = ['All', 'Website Design & Development', 'Brand Identity'] as const;

const CARD_WIDTH = 400;
const CARD_HEIGHT = 500;
const CARD_GAP = 24;

const cardOuterClass = `shrink-0 snap-start`;

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastPos = useRef(0);
  const lastTime = useRef(0);
  const momentumRef = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    if (activeCategory === 'Brand Identity') return projects.filter(isBrandProject);
    if (activeCategory === 'Website Design & Development')
      return projects.filter((p) => p.categories.includes('Website Design & Development'));
    return projects;
  }, [activeCategory]);

  useEffect(() => {
    setActiveIndex(0);
    const el = carouselRef.current;
    if (el) el.scrollLeft = 0;
  }, [activeCategory]);

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);

    const cardWidth = CARD_WIDTH + CARD_GAP;
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), filtered.length - 1));
  }, [filtered.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, [filtered.length, updateScrollButtons]);

  const stopMomentum = useCallback(() => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
      momentumRef.current = null;
    }
  }, []);

  const smoothScrollTo = useCallback((target: number, duration = 500) => {
    const el = carouselRef.current;
    if (!el) return;
    stopMomentum();
    const start = el.scrollLeft;
    const change = target - start;
    if (Math.abs(change) < 0.5) return;
    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + change * easeInOutCubic(progress);
      if (progress < 1) {
        momentumRef.current = requestAnimationFrame(animate);
      } else {
        momentumRef.current = null;
        updateScrollButtons();
      }
    };
    momentumRef.current = requestAnimationFrame(animate);
  }, [stopMomentum, updateScrollButtons]);

  const scrollToIndex = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = CARD_WIDTH + CARD_GAP;
    smoothScrollTo(index * cardWidth);
  }, [smoothScrollTo]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    stopMomentum();
    const newIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(filtered.length - 1, activeIndex + 1);
    scrollToIndex(newIndex);
  }, [activeIndex, filtered.length, scrollToIndex, stopMomentum]);

  const handleCategoryChange = useCallback((category: string) => {
    stopMomentum();
    setActiveCategory(category);
  }, [stopMomentum]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollCarousel('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollCarousel('right');
    }
  }, [scrollCarousel]);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: i * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const formatCounter = (current: number, total: number) => {
    return `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  };

  const getPreviewLabel = (project: Project) => {
    if (isWebsiteProject(project)) return 'Live Website';
    if (project.services.some(s => ['Logo Design', 'Brand Identity'].includes(s))) return 'Brand Identity';
    if (project.services.some(s => ['UI/UX Design'].includes(s))) return 'UI/UX Design';
    return 'Brand Identity';
  };

  return (
    <section id="featured-work" className="scroll-mt-18 md:scroll-mt-20">
      <div className="bg-white transition-colors duration-300 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-500/5 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-500/5 dark:text-emerald-400">
                Featured Work
              </div>
              <h2 className="font-display font-bold tracking-tight text-zinc-950 dark:text-white" style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.15 }}>
                Crafting premium websites and memorable brand identities for ambitious businesses.
              </h2>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`
                      relative rounded-full px-4 py-1.5 font-sans text-sm font-medium transition-all duration-300
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950
                      ${isActive ? 'text-white shadow-[0_8px_24px_rgba(16,185,129,0.35)]' : 'bg-white/60 dark:bg-zinc-900/30 border border-zinc-200/60 text-zinc-700 hover:bg-white/80 dark:hover:bg-zinc-900/50 dark:text-zinc-300'}
                    `}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-full bg-emerald-500"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-30 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-30 disabled:pointer-events-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm text-zinc-500 dark:text-zinc-400"
            >
              {formatCounter(activeIndex, filtered.length)}
            </motion.div>
          </div>

          <div
            className="relative mt-5"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Project carousel"
          >
            <div
              ref={carouselRef}
              onMouseDown={(e: MouseEvent) => {
                const el = carouselRef.current;
                if (!el) return;
                stopMomentum();
                isDragging.current = true;
                startPos.current = e.pageX;
                scrollStart.current = el.scrollLeft;
                lastPos.current = e.pageX;
                lastTime.current = performance.now();
                velocity.current = 0;
                el.style.cursor = 'grabbing';
              }}
              onMouseMove={(e: MouseEvent) => {
                if (!isDragging.current) return;
                const el = carouselRef.current;
                if (!el) return;
                e.preventDefault();
                const x = e.pageX;
                const walk = startPos.current - x;
                el.scrollLeft = scrollStart.current + walk;
                const now = performance.now();
                const dt = now - lastTime.current;
                if (dt > 0) velocity.current = (lastPos.current - x) / dt;
                lastPos.current = x;
                lastTime.current = now;
              }}
              onMouseUp={() => {
                isDragging.current = false;
                const el = carouselRef.current;
                if (el) el.style.cursor = 'grab';
                const speed = Math.abs(velocity.current);
                if (speed > 0.08) {
                  const deceleration = 0.93;
                  let currentVelocity = velocity.current;
                  const decay = () => {
                    if (Math.abs(currentVelocity) < 0.008) {
                      momentumRef.current = null;
                      updateScrollButtons();
                      return;
                    }
                    currentVelocity *= deceleration;
                    const el = carouselRef.current;
                    if (el) el.scrollLeft += currentVelocity * 16;
                    momentumRef.current = requestAnimationFrame(decay);
                  };
                  momentumRef.current = requestAnimationFrame(decay);
                } else {
                  updateScrollButtons();
                }
              }}
              onMouseLeave={() => {
                if (isDragging.current) {
                  isDragging.current = false;
                  const el = carouselRef.current;
                  if (el) el.style.cursor = 'grab';
                  updateScrollButtons();
                }
              }}
              onWheel={(e: WheelEvent) => {
                const el = carouselRef.current;
                if (!el) return;
                e.preventDefault();
                stopMomentum();
                const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                el.scrollLeft += delta;
              }}
              onTouchStart={(e: TouchEvent) => {
                const el = carouselRef.current;
                if (!el) return;
                stopMomentum();
                isDragging.current = true;
                startPos.current = e.touches[0].pageX;
                scrollStart.current = el.scrollLeft;
                lastPos.current = e.touches[0].pageX;
                lastTime.current = performance.now();
                velocity.current = 0;
              }}
              onTouchMove={(e: TouchEvent) => {
                if (!isDragging.current) return;
                const el = carouselRef.current;
                if (!el) return;
                const x = e.touches[0].pageX;
                const walk = startPos.current - x;
                el.scrollLeft = scrollStart.current + walk;
                const now = performance.now();
                const dt = now - lastTime.current;
                if (dt > 0) velocity.current = (lastPos.current - x) / dt;
                lastPos.current = x;
                lastTime.current = now;
              }}
              onTouchEnd={() => {
                isDragging.current = false;
                const speed = Math.abs(velocity.current);
                if (speed > 0.08) {
                  const deceleration = 0.93;
                  let currentVelocity = velocity.current;
                  const decay = () => {
                    if (Math.abs(currentVelocity) < 0.008) {
                      momentumRef.current = null;
                      updateScrollButtons();
                      return;
                    }
                    currentVelocity *= deceleration;
                    const el = carouselRef.current;
                    if (el) el.scrollLeft += currentVelocity * 16;
                    momentumRef.current = requestAnimationFrame(decay);
                  };
                  momentumRef.current = requestAnimationFrame(decay);
                } else {
                  updateScrollButtons();
                }
              }}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mb-2"
              style={{ cursor: 'grab' }}
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={project.slug}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={itemVariants}
                  className={cardOuterClass}
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                >
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="group/card relative block h-full"
                    onMouseEnter={() => setHoveredProject(project.slug)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="absolute -inset-0.5 rounded-[22px] bg-linear-to-br from-emerald-500/0 via-transparent to-teal-500/0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                    <div className="relative h-full overflow-hidden rounded-[18px] bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_24px_64px_rgba(16,185,129,0.18)]">
                      <div className="relative h-[58%] overflow-hidden bg-zinc-100 dark:bg-zinc-800/50">
                        <OptimizedImage
                          src={project.thumbnail}
                          alt={`${project.client} project preview`}
                          aspectRatioClass="w-full h-full"
                          imageClassName="object-cover transition-transform duration-[800ms] ease-out group-hover/card:scale-[1.04]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/30 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute left-3.5 top-3.5">
                          <span className="inline-flex items-center rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-900/80 dark:text-zinc-200">
                            {getPreviewLabel(project)}
                          </span>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProject === project.slug ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center"
                        >
                          <div className="text-center text-white">
                            <MousePointer2 className="h-7 w-7 mx-auto mb-1.5 animate-pulse" />
                            <span className="text-sm font-medium">View Project</span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex h-[42%] flex-col justify-between p-5">
                        <div>
                          <span className="inline-flex max-w-fit rounded-full border border-emerald-200/70 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-500/10 dark:text-emerald-400 mb-2.5">
                            {project.categories[0]}
                          </span>
                          <h3 className="font-display text-lg font-bold text-zinc-950 transition-colors duration-300 group-hover/card:text-emerald-600 dark:text-white dark:group-hover/card:text-emerald-400">
                            {project.title}
                          </h3>
                          <p className="mt-1 font-sans text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-1">
                            {project.client} · {project.industry || project.category}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <span className="text-sm font-medium">Explore Project</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
