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
  const yParallaxImage = useTransform(scrollY, [0, 800], [0, 40]);
  const yParallaxBadge = useTransform(scrollY, [0, 800], [0, -35]);

  const imageY = shouldReduceMotion ? 0 : yParallaxImage;
  const badgeY = shouldReduceMotion ? 0 : yParallaxBadge;

  // Cinematic 2D Mouse-Move Interactive Parallax (Desktop pointer-fine only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft springs for latency-free, fluid momentum
  const springConfig = { damping: 30, stiffness: 85, mass: 0.85 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Map to extremely subtle spatial offsets to preserve clear visual grid alignment
  const textTranslateX = useTransform(mouseXSpring, [-400, 400], [-6, 6]);
  const textTranslateY = useTransform(mouseYSpring, [-400, 400], [-6, 6]);

  const imageTranslateX = useTransform(mouseXSpring, [-400, 400], [10, -10]);
  const imageTranslateY = useTransform(mouseYSpring, [-400, 400], [10, -10]);

  // 3D Card Tilt Rotations
  const rotateX = useTransform(mouseYSpring, [-400, 400], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-400, 400], [-6, 6]);

  // Double Contrast Glow movements
  const glowX = useTransform(mouseXSpring, [-400, 400], [-70, 70]);
  const glowY = useTransform(mouseYSpring, [-400, 400], [-70, 70]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-24 md:pb-32 overflow-hidden bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 scroll-mt-18 md:scroll-mt-20"
    >
      {/* Cinematic Grid blueprints & Ambient Contrast Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft radial overlay gradient */}
        <div className="absolute top-0 left-0 right-0 h-150 bg-linear-to-b from-emerald-100/15 via-emerald-50/2 to-transparent dark:from-emerald-950/15 dark:via-transparent dark:to-transparent" />
        
        {/* Architectural Blueprint Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.04)_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(rgba(16,185,129,0.06)_1px,transparent_1px)] opacity-80" />
        
        {/* Fine grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] [background-size:96px_96px] dark:bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] opacity-60" />

        {/* Static left mesh light orb */}
        <div className="absolute top-[-25%] left-[-20%] w-[80%] h-[80%] rounded-full bg-emerald-400/6 dark:bg-emerald-500/3 blur-[140px]" />

        {/* Static right mesh light orb */}
        <div className="absolute bottom-[-20%] right-[-15%] w-[90%] h-[90%] rounded-full bg-teal-400/6 dark:bg-teal-600/3 blur-[160px]" />

        {/* Cinematic mouse-following glow (primary light source) */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : glowX,
            y: shouldReduceMotion ? 0 : glowY,
          }}
          className="absolute top-[15%] left-[8%] w-[65%] h-[55%] bg-emerald-500/2.5 dark:bg-emerald-500/1.5 rounded-full blur-[145px]"
        />

        {/* Secondary counter-interactive glow (secondary contrast lighting) */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : useTransform(mouseXSpring, [-400, 400], [50, -50]),
            y: shouldReduceMotion ? 0 : useTransform(mouseYSpring, [-400, 400], [50, -50]),
          }}
          className="absolute right-[5%] bottom-[10%] w-[50%] h-[45%] bg-teal-500/4 dark:bg-teal-500/2 rounded-full blur-[130px]"
        />

        {/* Central soft backdrop support glow */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            opacity: [0.35, 0.45, 0.35],
          }}
          transition={shouldReduceMotion ? {} : {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 w-87.5 h-87.5 bg-emerald-500/3 dark:bg-emerald-400/2.5 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left: Text Content & Action Controls */}
        <div className="lg:col-span-7 relative">
          <motion.div
            className="flex flex-col items-start gap-8 text-left w-full max-w-3xl"
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
                  animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                  transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-emerald-200/60 dark:border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-display text-[11px] font-bold tracking-widest uppercase shadow-[0_4px_16px_rgba(16,185,129,0.06)] dark:shadow-[0_4px_24px_rgba(16,185,129,0.04)] backdrop-blur-md relative group/badge overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover/badge:animate-[shimmer_2s_infinite]" />
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  <span>Premium Digital Agency</span>
                </motion.div>
              </motion.div>

              {/* Premium Headline (Space Grotesk Font) */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] md:leading-[1.03] lg:leading-[1.02]"
              >
                We Build Websites, Brands <br className="hidden sm:inline" /> and{" "}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 font-bold drop-shadow-[0_2px_8px_rgba(16,185,129,0.1)]">
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

              {/* Elegant Staggered Bullet Badges (Glassmorphic upgrade) */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-2.5 py-4 max-w-2xl"
              >
                {serviceBadges.map((badge, idx) => (
                  <motion.span
                    key={badge}
                    inherit={false}
                    initial={{ opacity: 0, scale: 0.92, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={shouldReduceMotion ? { duration: 0.1 } : { 
                      opacity: { duration: 0.4, delay: 0.2 + idx * 0.03 },
                      scale: { duration: 0.2 },
                      y: { duration: 0.2 }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white/40 dark:bg-zinc-900/35 border border-zinc-200/50 dark:border-zinc-800/60 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_-6px_rgba(16,185,129,0.08)] hover:bg-white dark:hover:bg-zinc-900 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 transition-all duration-300 backdrop-blur-md cursor-default select-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 dark:bg-emerald-400" />
                    {badge}
                  </motion.span>
                ))}
              </motion.div>

              {/* High-Impact CTA Buttons with Premium Hover Effects */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto pt-4 z-10"
              >
                <div className="relative group w-full sm:w-auto">
                  {/* Soft visual glow expansion layer behind primary CTA button */}
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 opacity-25 dark:opacity-40 blur-lg group-hover:opacity-75 group-hover:blur-xl transition duration-500 pointer-events-none" />
                  <motion.button
                    onClick={() => onCtaClick('contact')}
                    whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4.5 rounded-2xl font-display text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-[0_12px_40px_-12px_rgba(16,185,129,0.4)] overflow-hidden transition-colors duration-300 cursor-pointer"
                  >
                    {/* Shimmer sweep effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    Start Your Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => onCtaClick('featured-work')}
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center justify-center gap-2 px-9 py-4.5 rounded-2xl font-display text-xs font-bold tracking-widest uppercase text-zinc-800 dark:text-zinc-200 bg-white/30 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer backdrop-blur-md"
                >
                  View Our Work
                  <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>

              {/* Social Proof & Trust Metric Accents */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-10 border-t border-zinc-200/70 dark:border-zinc-800/70 pt-8 mt-6 w-full"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.35)] animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                  <span className="font-sans text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Helping Businesses Build a Strong Digital Presence
                  </span>
                </div>

                <div className="flex gap-8 sm:ml-auto border-l border-zinc-200/60 dark:border-zinc-800/60 pl-8">
                  <div>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 leading-none">99%</p>
                    <p className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mt-2.5">Satisfaction</p>
                  </div>
                  <div className="border-l border-zinc-200/50 dark:border-zinc-800/50 pl-8">
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 leading-none">5+ Yrs</p>
                    <p className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mt-2.5">Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Elegant Floating Art Showcase with 3D Parallax & Depth */}
        <motion.div
          className="lg:col-span-5 relative group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : imageTranslateX,
              y: shouldReduceMotion ? imageY : imageYCombined,
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative transition-transform duration-200 ease-out"
          >
            {/* Decorative glowing backdrops */}
            <div 
              style={{ transform: "translateZ(-30px)" }}
              className="absolute -inset-1.5 rounded-3xl bg-linear-to-r from-emerald-500 to-teal-400 opacity-15 dark:opacity-25 blur-3xl pointer-events-none" 
            />
            
            <div 
              style={{ transformStyle: "preserve-3d" }}
              className="relative rounded-3xl overflow-hidden border border-white/85 dark:border-zinc-800/80 shadow-[0_32px_80px_-24px_rgba(15,23,42,0.18)] dark:shadow-[0_32px_85px_-24px_rgba(0,0,0,0.52)] bg-slate-50 dark:bg-zinc-900 ring-1 ring-white/80 dark:ring-white/10"
            >
              {/* Aspect ratio frame containing generated image */}
              <div 
                style={{ transformStyle: "preserve-3d" }}
                className="overflow-hidden relative"
              >
                <OptimizedImage
                  src={heroShowcaseImage}
                  alt="MarcVerse Digital Solutions abstract creative asset"
                  aspectRatioClass="aspect-4/3 sm:aspect-video lg:aspect-[4/5]"
                  imageClassName="transition-transform duration-1000 ease-out group-hover:scale-104"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Glare Reflection overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-40 transition-all duration-300 mix-blend-color-dodge"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)`,
                    transform: useTransform(mouseXSpring, [-400, 400], ["translate(-10%, -10%) rotate(-5deg)", "translate(10%, 10%) rotate(5deg)"]),
                  }}
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none z-10" />
              </div>

              {/* Glassmorphic Overlay Card with 3D translation depth */}
              <motion.div 
                inherit={false}
                animate={shouldReduceMotion ? {} : { y: [0, 2, 0] }}
                transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 1.5 }}
                style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/85 dark:bg-black/80 backdrop-blur-xl border border-white/50 dark:border-zinc-800/70 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)] flex items-center justify-between z-10"
              >
                <div className="flex items-center gap-3" style={{ transform: "translateZ(10px)" }}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-bold text-zinc-950 dark:text-white leading-tight">
                      MarcVerse Digital Hub
                    </h3>
                    <p className="font-sans text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Innovative Digital Agency
                    </p>
                  </div>
                </div>
                <span 
                  style={{ transform: "translateZ(15px)" }}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm"
                >
                  Live Preview
                </span>
              </motion.div>
            </div>

            {/* Mini-floating accent badge with 3D translation depth */}
            <motion.div
              style={{ y: badgeY, transform: "translateZ(60px)" }}
              className="absolute -top-6 -right-4 z-20 pointer-events-none"
            >
              <motion.div
                inherit={false}
                animate={shouldReduceMotion ? {} : { y: [0, -2, 0] }}
                transition={shouldReduceMotion ? {} : { repeat: Infinity, duration: 11, ease: 'easeInOut' }}
                className="px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-ping" />
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
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">Scroll Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-800 flex justify-center p-1.5">
            <motion.div
              inherit={false}
              animate={shouldReduceMotion ? {} : {
                y: [0, 6, 0],
              }}
              transition={shouldReduceMotion ? {} : {
                duration: 3.5,
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
