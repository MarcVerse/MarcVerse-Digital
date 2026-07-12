import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Star, Sparkles, MoveRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import heroShowcaseImage from '../assets/images/agency_hero_real_1783876064400.jpg';

interface HeroProps {
  onCtaClick: (target: string) => void;
}

const serviceBadges = [
  'Graphic Design',
  'Website Design',
  'Branding',
  'UI/UX Design',
  'Academic Support',
  'Virtual Assistant',
  'Business Docs',
  'Digital Solutions'
];

export default function Hero({ onCtaClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Scroll Parallax values
  const { scrollY } = useScroll();
  const yParallaxImage = useTransform(scrollY, [0, 800], [0, 45]);
  const yParallaxBadge = useTransform(scrollY, [0, 800], [0, -25]);

  const imageY = shouldReduceMotion ? 0 : yParallaxImage;
  const badgeY = shouldReduceMotion ? 0 : yParallaxBadge;

  // Refined staggered cubic-bezier entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 scroll-mt-[72px] md:scroll-mt-[80px]"
    >
      {/* Subtle Animated Mesh Gradient & Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-emerald-100/10 via-emerald-50/2 to-transparent dark:from-emerald-950/10 dark:via-transparent dark:to-transparent" />
        
        {/* Left drifting mesh light orb */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, 30, -15, 0],
            y: [0, -25, 25, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={shouldReduceMotion ? {} : {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-emerald-400/8 dark:bg-emerald-500/4 blur-[130px]"
        />

        {/* Right drifting mesh light orb */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={shouldReduceMotion ? {} : {
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[5%] -right-[10%] w-[65%] h-[65%] rounded-full bg-teal-400/8 dark:bg-teal-600/4 blur-[160px]"
        />

        {/* Center soft backdrop support glow directly behind the content */}
        <div className="absolute top-1/4 left-1/4 right-1/4 h-1/2 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Content & Action Controls */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>Premium Digital Agency</span>
          </motion.div>

          {/* Premium Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.1]"
          >
            We Build Websites, Brands <br className="hidden sm:inline" /> and {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">
              Digital Experiences
            </span>{" "}
            That Drive Results.
          </motion.h1>

          {/* Business Core Value Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            MarcVerse Digital Solutions delivers premium Website Design, Branding, UI/UX, Graphic Design, and Virtual Assistant Services. We help businesses build an elegant digital presence and accelerate performance.
          </motion.p>

          {/* Elegant Staggered Bullet Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 py-3 max-w-xl"
          >
            {serviceBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {badge}
              </span>
            ))}
          </motion.div>

          {/* High-Impact CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
          >
            <button
              onClick={() => onCtaClick('contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans text-sm font-semibold tracking-wide text-white bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-[0_6px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Start Your Project
              <ArrowUpRight className="h-4.5 w-4.5" />
            </button>

            <button
              onClick={() => onCtaClick('featured-work')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200 bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 border-2 border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              View Our Work
              <MoveRight className="h-4.5 w-4.5" />
            </button>
          </motion.div>

          {/* Social Proof & Trust Metric Accents */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-8 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-8 mt-4 w-full"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-sans text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Helping Businesses Build a Strong Digital Presence
              </span>
            </div>

            <div className="flex gap-6 sm:ml-auto">
              <div>
                <p className="font-sans text-xl font-bold text-zinc-900 dark:text-white leading-none">99%</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-1">Satisfaction</p>
              </div>
              <div className="border-l border-zinc-200 dark:border-zinc-800 pl-6">
                <p className="font-sans text-xl font-bold text-zinc-900 dark:text-white leading-none">5+ Yrs</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-1">Experience</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Elegant Floating Art Showcase with Generated Image */}
        <motion.div
          className="lg:col-span-5 relative"
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20 dark:opacity-30 blur-2xl pointer-events-none" />
          
          <div className="relative rounded-3xl overflow-hidden border border-white/60 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-slate-100 dark:bg-zinc-900">
            {/* Aspect ratio frame containing generated image */}
            <div className="overflow-hidden relative">
              <OptimizedImage
                src={heroShowcaseImage}
                alt="MarcVerse Digital Solutions abstract creative asset"
                aspectRatioClass="aspect-[4/3] sm:aspect-video lg:aspect-[4/5]"
                imageClassName="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none z-10" />
            </div>

            {/* Glassmorphic Overlay Card */}
            <motion.div 
              animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
              transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/40 dark:border-zinc-800/60 shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                    MarcVerse Digital Hub
                  </h3>
                  <p className="font-sans text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Innovative Digital Agency
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
                Live Preview
              </span>
            </motion.div>
          </div>

          {/* Mini-floating accents */}
          <motion.div
            style={{ y: badgeY }}
            className="absolute -top-6 -right-4 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center gap-2 pointer-events-none z-20"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              Active VA & Design Desk
            </span>
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}
