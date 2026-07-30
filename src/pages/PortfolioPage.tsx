import { useState, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import { getProjectBySlug, getRelatedProjects, type Project } from '../data/portfolio';

const GALLERY_MAX_HEIGHT = 'max-h-[55vh]';

export default function PortfolioPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;
  const related = getRelatedProjects(slug, 3);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    window.scrollTo({ top: 0 });
  }, [slug]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? (project?.gallery.length ?? 1) - 1 : prev - 1
    );
  }, [project?.gallery.length]);
  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === (project?.gallery.length ?? 1) - 1 ? 0 : prev + 1
    );
  }, [project?.gallery.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goToPrevious();
      if (event.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-3">Project Not Found</h1>
          <p className="text-zinc-400 leading-relaxed mb-8">
            The case study you are looking for does not exist or has not been published yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-700 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-[0_10px_25px_rgba(16,185,129,0.18)] focus:outline-none dark:text-emerald-300"
          >
            <span>Explore Projects</span>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const lightboxImage = project.gallery[lightboxIndex];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="min-h-screen bg-zinc-950 text-zinc-100"
      >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <nav className="py-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <li>
              <Link to="/" className="transition hover:text-emerald-400">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/portfolio" className="transition hover:text-emerald-400">Portfolio</Link>
            </li>
            <li>/</li>
            <li className="text-zinc-200">{project.title}</li>
          </ol>
        </nav>

        <div className="mb-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={hasMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="inline-flex max-w-fit rounded-full border border-emerald-200/70 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300 mb-4">
                {project.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
                {project.title}
              </h1>
              <p className="font-sans text-base leading-7 text-zinc-300 max-w-2xl">
                {project.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={hasMounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60"
            >
              <div className="flex items-center justify-center bg-zinc-800/40 p-4">
                <OptimizedImage
                  src={project.thumbnail}
                  alt={`${project.title} featured`}
                  className="max-h-[60vh]"
                  imageClassName="object-contain"
                />
              </div>
            </motion.div>

            <section className="mt-10 md:mt-14">
              <h2 className="font-display text-2xl font-semibold text-white mb-4">Project Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: 'Client Challenge', value: project.overview.challenge },
                  { label: 'Objective', value: project.overview.objective },
                  { label: 'Design Strategy', value: project.overview.strategy },
                  { label: 'Creative Process', value: project.overview.process },
                  { label: 'Final Solution', value: project.overview.solution },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400 mb-2">{item.label}</p>
                    <p className="font-sans text-sm leading-7 text-zinc-300">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 md:mt-14">
              <h2 className="font-display text-2xl font-semibold text-white mb-4">Deliverables</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {project.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-center">
                    <span className="font-sans text-sm font-medium text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 md:mt-14">
              <h2 className="font-display text-2xl font-semibold text-white mb-6">Premium Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.gallery.map((item, index) => (
                  <motion.button
                    key={item.title}
                    onClick={() => openLightbox(index)}
                    className="text-left rounded-3xl border border-white/10 bg-zinc-900/50 overflow-hidden transition hover:border-emerald-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <div className="flex items-center justify-center bg-zinc-800/40 p-4">
                      <OptimizedImage
                        src={item.imageUrl}
                        alt={item.title}
                        className={GALLERY_MAX_HEIGHT}
                        imageClassName="object-contain"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-400">
                        {index + 1}. {item.title}
                      </p>
                      <p className="mt-2 font-sans text-sm leading-7 text-zinc-300">{item.caption}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {project.results && project.results.length > 0 && (
              <section className="mt-10 md:mt-14">
                <h2 className="font-display text-2xl font-semibold text-white mb-4">Project Outcome</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.results.map((item) => (
                    <div key={item} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                      <p className="font-sans text-sm leading-7 text-zinc-200">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10 md:mt-14">
              <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 md:p-10 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">
                  Ready to build something exceptional?
                </h2>
                <p className="font-sans text-base leading-7 text-zinc-300 max-w-2xl mx-auto mb-6">
                  Whether you need a powerful website, a memorable brand identity, or creative design solutions, MarcVerse is ready to help bring your vision to life.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3 font-sans text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                  >
                    Contact MarcVerse
                  </Link>
                </div>
              </div>
            </section>

            <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Link>
              </div>
              <ProjectNavigation currentSlug={slug} related={related} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ProjectSidebar project={project} related={related} />
            </div>
          </aside>
        </div>
      </div>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="font-sans text-sm font-medium text-zinc-200">
                  {lightboxIndex + 1} / {project.gallery.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevious}
                    className="rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="rounded-full border border-zinc-700 bg-zinc-900 p-2 text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
                    aria-label="Close lightbox"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center bg-zinc-900/80 rounded-3xl border border-white/10 p-4">
                <OptimizedImage
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.title}
                  className={GALLERY_MAX_HEIGHT}
                  imageClassName="object-contain"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                <p className="font-sans text-sm font-semibold text-emerald-300">{lightboxImage.title}</p>
                <p className="mt-2 font-sans text-sm leading-7 text-zinc-300">{lightboxImage.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectSidebar({ project, related }: { project: Project; related: Project[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-white">Project Details</h3>
        <button className="rounded-full border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300">
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <SidebarItem label="Client" value={project.client} />
        <SidebarItem label="Industry" value={project.industry} />
        <SidebarItem label="Category" value={project.category} />
        <SidebarItem label="Year" value={project.year} />
        <SidebarItem label="Status" value={project.status} />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-1">Services</p>
          <ul className="space-y-1">
            {project.services.map((service) => (
              <li key={service} className="font-sans text-sm text-zinc-300">{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-1">Deliverables</p>
          <ul className="space-y-1">
            {project.deliverables.map((item) => (
              <li key={item} className="font-sans text-sm text-zinc-300">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300 transition hover:bg-emerald-600 hover:text-white hover:shadow-[0_10px_25px_rgba(16,185,129,0.18)]"
        >
          Visit Website
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      <div className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-3">Related Projects</p>
        <ul className="space-y-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/portfolio/${item.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 p-3 transition hover:border-emerald-500/30"
              >
                <div className="h-12 w-16 overflow-hidden rounded-xl bg-zinc-800">
                  <OptimizedImage
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full"
                    imageClassName="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-white truncate">{item.title}</p>
                  <p className="font-sans text-xs text-zinc-400 truncate">{item.category}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-1">{label}</p>
      <p className="font-sans text-sm text-zinc-200">{value ?? '—'}</p>
    </div>
  );
}

function ProjectNavigation({ currentSlug, related }: { currentSlug: string; related: Project[] }) {
  const currentIndex = related.findIndex((item) => item.slug === currentSlug);
  const previous = currentIndex > 0 ? related[currentIndex - 1] : null;
  const next = currentIndex < related.length - 1 ? related[currentIndex + 1] : null;

  return (
    <div className="flex items-center gap-3">
      {previous ? (
        <Link
          to={`/portfolio/${previous.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
        >
          <ChevronLeft className="h-4 w-4" />
          {previous.title}
        </Link>
      ) : null}
      {next ? (
        <Link
          to={`/portfolio/${next.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300"
        >
          {next.title}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
