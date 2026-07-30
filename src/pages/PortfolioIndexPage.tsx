import { useState, useMemo, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowUpRight, ArrowLeft, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import { projects, isBrandProject, isWebsiteProject, type Project } from '../data/portfolio';

const categories = ['All', 'Website Design & Development', 'Brand Identity'] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const getPreviewLabel = (project: Project) => {
  if (isWebsiteProject(project)) return 'Live Website';
  if (project.services.some(s => ['Logo Design', 'Brand Identity'].includes(s))) return 'Brand Identity';
  if (project.services.some(s => ['UI/UX Design'].includes(s))) return 'UI/UX Design';
  return 'Brand Identity';
};

export default function PortfolioIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = sessionStorage.getItem('portfolio-scroll-position');
    if (saved) {
      const y = parseInt(saved, 10);
      if (!Number.isNaN(y)) {
        requestAnimationFrame(() => window.scrollTo(0, y));
      }
      sessionStorage.removeItem('portfolio-scroll-position');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('portfolio-scroll-position', String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    if (activeCategory === 'Brand Identity') return projects.filter(isBrandProject);
    if (activeCategory === 'Website Design & Development')
      return projects.filter((p) => p.categories.includes('Website Design & Development'));
    return projects;
  }, [activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen bg-zinc-950 text-zinc-100 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-500/5 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-500/5 dark:text-emerald-400">
              Portfolio
            </div>
            <h1 className="font-display font-bold tracking-tight text-zinc-950 dark:text-white" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.15 }}>
              A curated selection of websites and brand identities.
            </h1>
            <p className="font-sans text-base leading-7 text-zinc-400 max-w-2xl">
              Explore our work across digital platforms and brand identity. Every project is a collaboration between strategy, design, and execution.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    relative rounded-full px-5 py-2 font-sans text-sm font-medium transition-all duration-300
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

        <motion.div
          layout
          className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={itemVariants}
              className="group/card relative h-full"
            >
              <div className="absolute -inset-0.5 rounded-[24px] bg-linear-to-br from-emerald-500/0 via-transparent to-teal-500/0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
              <Link
                to={`/portfolio/${project.slug}`}
                className="relative block h-full overflow-hidden rounded-[20px] bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_24px_64px_rgba(16,185,129,0.18)]"
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              >
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
                    whileHover={{ opacity: 1 }}
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
