import { useState, useEffect, useRef, useCallback } from 'react';
import type React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, Target, Gem, Users } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface ValueItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const values: ValueItem[] = [
  { title: 'Modern Design', icon: Sparkles },
  { title: 'Strategic Branding', icon: Target },
  { title: 'Quality Driven', icon: Gem },
  { title: 'Client Focused', icon: Users },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleImageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = `translate(${mousePos.current.x * -6}px, ${mousePos.current.y * -6}px) scale(1.015)`;
        }
        rafRef.current = null;
      });
    }
  }, [shouldReduceMotion]);

  const handleImageMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  }, []);

  return (
    <section id="about" className="scroll-mt-18 md:scroll-mt-20">
      <section className="relative overflow-hidden bg-white transition-colors duration-300 py-10 sm:py-14 md:py-16 dark:bg-zinc-900/40">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent dark:from-zinc-950/10 dark:to-transparent" />
          <div className="absolute -top-[10%] left-[5%] w-[45%] rounded-full bg-emerald-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-[5%] w-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-6 md:px-12"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[460px] mx-auto lg:mx-0"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={shouldReduceMotion ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-[24px] p-[1px] bg-linear-to-br from-emerald-500/20 via-teal-400/10 to-transparent"
              >
                <div
                  ref={imageRef}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  className="relative overflow-hidden rounded-[23px] shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-transform duration-[600ms] ease-out will-change-transform"
                >
                  <OptimizedImage
                    src="/images/about-marcverse.jpg"
                    alt="MarcVerse founder working in a modern creative office"
                    aspectRatioClass="aspect-[3/4]"
                    imageClassName="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-radial-gradient from-emerald-500/10 via-teal-400/5 to-transparent blur-2xl -z-10" />
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-500/5 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-500/5 dark:text-emerald-400">
                  About MarcVerse
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white"
              >
                Helping Businesses Build Strong Digital Brands
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-base leading-7 text-zinc-600 dark:text-zinc-400"
              >
                MarcVerse Digital Solutions creates modern websites, memorable brand identities, and digital experiences that help businesses stand out. We combine thoughtful design with practical solutions to deliver work that is visually compelling, functional, and built for long term growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-sans text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-400 hover:shadow-[0_16px_40px_-8px_rgba(16,185,129,0.5)] active:scale-[0.98] cursor-pointer border border-emerald-400/20"
                >
                  <span>Let's Build Your Project</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm leading-6 text-zinc-500 dark:text-zinc-400"
              >
                Helping businesses across industries build modern digital experiences.
              </motion.p>

              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group flex items-center gap-3 rounded-[20px] border border-zinc-200/60 bg-white/70 p-3.5 transition-all duration-300 hover:border-emerald-400/30 hover:shadow-[0_16px_40px_rgba(16,185,129,0.1)] dark:border-zinc-800/60 dark:bg-zinc-900/40"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-200/70 bg-emerald-500/5 text-emerald-600 dark:border-emerald-800/40 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-bold text-zinc-950 dark:text-white">{value.title}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </section>
  );
}
