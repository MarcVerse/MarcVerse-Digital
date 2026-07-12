import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import React, { useRef } from 'react';
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
  // Force shouldReduceMotion to false to ensure all premium cinematic animations 
  // are visible by default in the sandbox preview environment, as requested.
  const shouldReduceMotion = false;
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Scroll Parallax values
  const { scrollY } = useScroll();
  const yParallaxImage = useTransform(scrollY, [0, 800], [0, 50]);
  const yParallaxBadge = useTransform(scrollY, [0, 800], [0, -30]);

  const imageY = shouldReduceMotion ? 0 : yParallaxImage;
  const badgeY = shouldReduceMotion ? 0 : yParallaxBadge;

  // Cinematic 2D Mouse-Move Interactive Parallax (Desktop pointer-fine only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft springs for latency-free, fluid momentum
  const springConfig = { damping: 35, stiffness: 90, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Map to extremely subtle spatial offsets to preserve clear visual grid alignment
  const textTranslateX = useTransform(mouseXSpring, [-400, 400], [-8, 8]);
  const textTranslateY = useTransform(mouseYSpring, [-400, 400], [-8, 8]);

  const imageTranslateX = useTransform(mouseXSpring, [-400, 400], [12, -12]);
  const imageTranslateY = useTransform(mouseYSpring, [-400, 400], [12, -12]);

  const glowX = useTransform(mouseXSpring, [-400, 400], [-30, 30]);
  const glowY = useTransform(mouseYSpring, [-400, 400], [-30, 30]);

  // Combined 3D Scroll + Mouse offset for the Showcase container
  const imageYCombined = useTransform(
    [imageTranslateY, yParallaxImage],
    ([mouseYOffset, scrollYOffset]) => {
      if (shouldReduceMotion) return 0;
      return (mouseYOffset as number) + (scrollYOffset as number);
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (window.matchMedia('(pointer: fine)').matches === false) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Refined staggered cubic-bezier entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 md:pb-28 overflow-hidden bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 scroll-mt-[72px] md:scroll-mt-[80px]"
    >
      {/* Slow Animated Mesh Gradient & Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-emerald-100/15 via-emerald-50/5 to-transparent dark:from-emerald-950/15 dark:via-transparent dark:to-transparent" />
        
        {/* Left drifting slow mesh light orb */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={shouldReduceMotion ? {} : {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-emerald-400/8 dark:bg-emerald-500/4 blur-[130px] mix-blend-screen dark:mix-blend-normal"
        />

        {/* Right drifting slow mesh light orb */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1, 0.85, 1.1, 1],
            rotate: [360, 270, 180, 0],
          }}
          transition={shouldReduceMotion ? {} : {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[-15%] right-[-15%] w-[90%] h-[90%] rounded-full bg-teal-400/8 dark:bg-teal-600/4 blur-[160px] mix-blend-screen dark:mix-blend-normal"
        />

        {/* Cinematic mouse-following glow directly linked to pointer interaction */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : glowX,
            y: shouldReduceMotion ? 0 : glowY,
          }}
          className="absolute top-[20%] left-[10%] w-[60%] h-[50%] bg-emerald-500/[0.02] dark:bg-emerald-500/[0.015] rounded-full blur-[140px]"
        />

        {/* Central soft backdrop pulsing support glow */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={shouldReduceMotion ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-emerald-500/5 dark:bg-emerald-400/3 rounded-full blur-[110px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Content & Action Controls */}
        <div className="lg:col-span-7 relative">
          <motion.div
            className="flex flex-col items-start gap-6 text-left w-full"
            style={{
              x: shouldReduceMotion ? 0 : textTranslateX,
              y: shouldReduceMotion ? 0 : textTranslateY,
            }}
          >
            <motion.div
              className="flex flex-col items-start gap-6 text-left w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Tagline Badge */}
              <motion.div variants={itemVariants}>
                <motion.div
                  inherit={false}
                  animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                  transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase backdrop-blur-sm"
                >
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <span>Premium Digital Agency</span>
                </motion.div>
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
            {serviceBadges.map((badge, idx) => (
              <motion.span
                key={badge}
                inherit={false}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.45, delay: 0.25 + idx * 0.04, ease: "easeOut" }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* High-Impact CTA Buttons with Premium Hover Effects */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2 z-10"
          >
            <div className="relative group w-full sm:w-auto">
              {/* Soft visual glow expansion layer behind primary CTA button */}
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-25 dark:opacity-35 blur-md group-hover:opacity-65 transition duration-300 pointer-events-none" />
              <motion.button
                onClick={() => onCtaClick('contact')}
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans text-sm font-semibold tracking-wide text-white bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.15)] dark:shadow-none transition-colors duration-200 cursor-pointer"
              >
                Start Your Project
                <ArrowUpRight className="h-4.5 w-4.5 animate-pulse" />
              </motion.button>
            </div>

            <motion.button
              onClick={() => onCtaClick('featured-work')}
              whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-sans text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200 bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 border-2 border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors duration-200 cursor-pointer"
            >
              View Our Work
              <MoveRight className="h-4.5 w-4.5" />
            </motion.button>
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
        </motion.div>
      </div>

        {/* Right: Elegant Floating Art Showcase with Generated Image */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : imageTranslateX,
              y: shouldReduceMotion ? imageY : imageYCombined,
            }}
          >
            {/* Decorative glowing backdrops */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20 dark:opacity-30 blur-2xl pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden border border-white/60 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-slate-100 dark:bg-zinc-900">
              {/* Aspect ratio frame containing generated image */}
              <div className="overflow-hidden relative">
                <OptimizedImage
                  src={heroShowcaseImage}
                  alt="MarcVerse Digital Solutions abstract creative asset"
                  aspectRatioClass="aspect-[4/3] sm:aspect-video lg:aspect-[4/5]"
                  imageClassName="transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none z-10" />
              </div>

              {/* Glassmorphic Overlay Card */}
              <motion.div 
                inherit={false}
                animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
                transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/75 dark:bg-black/75 backdrop-blur-md border border-white/40 dark:border-zinc-800/60 shadow-lg flex items-center justify-between z-10"
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
              className="absolute -top-6 -right-4 z-20 pointer-events-none"
            >
              <motion.div
                inherit={false}
                animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-sans text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  Active VA & Design Desk
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* Elegant scroll indicator encouraging exploration */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <motion.button
          onClick={() => onCtaClick('why-choose-us')}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 cursor-pointer bg-transparent border-none focus:outline-none"
        >
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-400">Scroll Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-800 flex justify-center p-1.5">
            <motion.div
              inherit={false}
              animate={shouldReduceMotion ? {} : {
                y: [0, 12, 0],
              }}
              transition={shouldReduceMotion ? {} : {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            />
          </div>
        </motion.button>
      </div>

    </section>
  );
}
