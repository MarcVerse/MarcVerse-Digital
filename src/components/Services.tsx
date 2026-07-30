import { motion, AnimatePresence } from 'motion/react';
import { Globe, Palette, Wand2, Megaphone, ArrowRight, X } from 'lucide-react';
import Section from './Section';
import { useState, useEffect, useRef, useCallback } from 'react';
import type React from 'react';
import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: Globe,
    title: 'Website Design & Development',
    description: 'Designing and developing fast, responsive, secure, and conversion focused websites that help businesses grow.',
  },
  {
    icon: Wand2,
    title: 'UI/UX Design',
    description: 'Designing intuitive digital experiences that are beautiful, user centred, and built for usability.',
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Building memorable and consistent brand identities that communicate professionalism and inspire trust.',
  },
  {
    icon: Megaphone,
    title: 'Graphic Design',
    description: 'Creating premium visual assets for print and digital marketing that elevate your brand.',
  },
];

const serviceDetails: Record<string, { title: string; description: string; includes: string[]; cta?: string }> = {
  'Website Design & Development': {
    title: 'Website Design & Development',
    description: 'We build fast, responsive, secure websites optimised for conversions. Every site is engineered for performance, SEO and growth from day one.',
    includes: [
      'Responsive Design',
      'Custom Development',
      'Performance Optimisation',
      'SEO Ready',
      'CMS Integration',
      'Website Maintenance',
    ],
    cta: 'Start Your Website Project',
  },
  'Brand Identity': {
    title: 'Brand Identity',
    description: 'We craft cohesive brand identities that communicate your values and attract your ideal audience through premium visual systems.',
    includes: [
      'Logo Design',
      'Colour Palette',
      'Typography',
      'Brand Guidelines',
      'Stationery Design',
      'Visual Identity System',
    ],
    cta: 'Build Your Brand',
  },
  'UI/UX Design': {
    title: 'UI/UX Design',
    description: 'We design intuitive, research driven digital experiences that delight users and maximise engagement across every touchpoint.',
    includes: [
      'User Research',
      'Wireframing',
      'Interactive Prototypes',
      'Interface Design',
      'Design Systems',
      'User Testing',
    ],
    cta: 'Explore UI/UX Services',
  },
  'Graphic Design': {
    title: 'Graphic Design',
    description: 'We produce premium visual assets and marketing collateral that make your brand stand out across print and digital channels.',
    includes: [
      'Social Media Graphics',
      'Flyers & Posters',
      'Brochures',
      'Presentation Design',
      'Marketing Materials',
      'Print Design',
    ],
    cta: 'Request a Design',
  },
};

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, placement: 'top' as 'top' | 'bottom' });
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const flyoutRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const updatePosition = useCallback((referenceEl: HTMLElement, floatingEl: HTMLElement) => {
    const viewportWidth = window.innerWidth;
    const mobile = viewportWidth < 640;
    setIsMobile(mobile);

    const middleware = [
      offset(mobile ? 16 : 14),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: { top: 12, bottom: 12, left: 12, right: 12 } }),
    ];

    let raf: number | null = null;
    const scheduleUpdate = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        computePosition(referenceEl, floatingEl, {
          placement: mobile ? 'bottom' : 'top',
          middleware,
        }).then(({ x, y, placement }) => {
          setCoords({ x, y, placement: placement as 'top' | 'bottom' });
          raf = null;
        });
      });
    };

    const cleanup = autoUpdate(referenceEl, floatingEl, scheduleUpdate);

    return () => {
      cleanup();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  const openService = useCallback((title: string) => {
    setActiveService((prev) => {
      if (prev === title) return null;

      if (prev && cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (title) {
        const referenceEl = cardRefs.current[title];
        const floatingEl = flyoutRef.current;
        if (referenceEl && floatingEl) {
          const cleanup = updatePosition(referenceEl, floatingEl);
          cleanupRef.current = cleanup;
        }
      }

      return title;
    });
  }, [updatePosition]);

  useEffect(() => {
    if (!activeService) {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      return;
    }

    const referenceEl = cardRefs.current[activeService];
    const floatingEl = flyoutRef.current;
    if (referenceEl && floatingEl) {
      const cleanup = updatePosition(referenceEl, floatingEl);
      cleanupRef.current = cleanup;
    }

    const handleResize = () => {
      if (activeService) {
        const refEl = cardRefs.current[activeService];
        const flyEl = flyoutRef.current;
        if (refEl && flyEl) {
          updatePosition(refEl, flyEl);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [activeService, updatePosition]);

  useEffect(() => {
    if (!activeService) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const flyout = flyoutRef.current;
      const activeCard = cardRefs.current[activeService];

      if (
        flyout &&
        !flyout.contains(target) &&
        (!activeCard || !activeCard.contains(target))
      ) {
        setActiveService(null);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [activeService]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const getFlyoutTransform = () => {
    if (coords.placement === 'bottom') return { y: 12, x: 0 };
    return { y: 8, x: 0 };
  };

  const current = activeService ? serviceDetails[activeService] : null;

  return (
    <Section
      id="services"
      className="bg-white/80 dark:bg-transparent backdrop-blur-sm"
      backgrounds={
        <>
          <div className="absolute top-0 left-0 right-0 h-100 bg-linear-to-b from-white to-transparent dark:from-zinc-950/10 dark:to-transparent pointer-events-none" />
          <div className="absolute top-1/3 -right-[10%] w-[45%] h-[45%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-[5%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        </>
      }
    >
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase">
          Our Services
        </div>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Solutions Engineered For <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">Growth</span>
        </h2>
        <p className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          We provide high quality digital solutions that help businesses grow, attract customers and build a strong online presence.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {servicesList.map((service, idx) => {
          const Icon = service.icon;
          const isActive = activeService === service.title;
          return (
            <motion.button
              key={idx}
              ref={(el) => {
                cardRefs.current[service.title] = el;
              }}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              className={`group relative w-full text-left rounded-[24px] p-6 md:p-7 border transition-all duration-300 ease-out flex flex-col justify-between min-h-[260px] md:min-h-[280px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                isActive
                  ? 'bg-white/80 dark:bg-zinc-900/70 border-emerald-400/40 shadow-[0_24px_64px_-16px_rgba(16,185,129,0.25),0_0_0_1px_rgba(16,185,129,0.2)] -translate-y-3'
                  : 'bg-white/60 dark:bg-zinc-900/30 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-900/50 hover:border-emerald-400/30 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.18)]'
              }`}
              onClick={() => openService(service.title)}
            >
              <div>
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/60 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:border-emerald-400/30 group-hover:shadow-[0_16px_32px_-12px_rgba(16,185,129,0.2)]">
                  <Icon className="h-7 w-7 text-emerald-500 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_8px_rgba(16,185,129,0.5))]" aria-hidden="true" />
                </div>

                <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-3 transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {service.title}
                </h3>

                <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5" aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {activeService && current && (
          <motion.div
            key={`flyout-${activeService}`}
            ref={flyoutRef as React.Ref<HTMLDivElement>}
            initial={{ opacity: 0, y: coords.placement === 'top' ? 12 : -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: coords.placement === 'top' ? 10 : -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-40 w-[calc(100%-32px)] max-w-sm sm:max-w-md rounded-[24px] bg-[#141414] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(16,185,129,0.12)] overflow-hidden ${isMobile ? 'bottom-4 left-4 mx-auto sm:mx-0' : ''}`}
            style={{
              left: coords.x,
              top: coords.y,
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-teal-500/[0.04]" />
            <div className="relative flex flex-col max-h-[85vh] md:max-h-[520px]">
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08]">
                <h3 className="font-display text-2xl font-bold text-white">{current.title}</h3>
                <button
                  onClick={() => setActiveService(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 transition-all hover:scale-110 hover:border-emerald-500/40 hover:text-emerald-400 active:scale-95 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto px-8 py-8 space-y-6 custom-scrollbar">
                <p className="font-sans text-base leading-relaxed text-zinc-300">
                  {current.description}
                </p>

                <div className="space-y-3">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Key Features</p>
                  <div className="flex flex-wrap gap-2">
                    {current.includes.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1.5 font-sans text-xs text-zinc-300"
                      >
                        <svg className="h-3 w-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {current.cta && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-full bg-emerald-500 px-6 py-3 font-sans text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-400 hover:shadow-[0_16px_40px_-8px_rgba(16,185,129,0.5)] active:scale-[0.98] cursor-pointer border border-emerald-400/20"
                  >
                    {current.cta}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
