import { motion, useReducedMotion } from 'motion/react';
import React from 'react';
import { ArrowUpRight, MoveRight, Star, Monitor, Smartphone, Tablet, TrendingUp, Quote, Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick: (target: string) => void;
}

const services = [
  { title: 'Website Design', icon: Monitor },
  { title: 'Brand Identity', icon: Sparkles },
  { title: 'UI/UX Design', icon: TrendingUp },
  { title: 'Performance', icon: Smartphone },
];

const techStack = [
  { name: 'React', color: 'bg-cyan-400' },
  { name: 'Next.js', color: 'bg-white' },
  { name: 'TypeScript', color: 'bg-blue-500' },
  { name: 'Tailwind CSS', color: 'bg-teal-400' },
  { name: 'Node.js', color: 'bg-green-500' },
  { name: 'Google Cloud', color: 'bg-blue-400' },
  { name: 'Cloudflare', color: 'bg-orange-400' },
  { name: 'GitHub', color: 'bg-zinc-300' },
  { name: 'Vercel', color: 'bg-white' },
];

export default function Hero({ onCtaClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[75vh] flex items-center bg-zinc-950 text-white transition-colors duration-300 scroll-mt-18 md:scroll-mt-20 overflow-hidden"
      style={{ padding: '0 28px' }}
    >
      {/* Background - subtle ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.06)_0%,transparent_55%)]" />
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[100px]" />
        <div className="absolute top-[40%] -right-[5%] w-[400px] h-[400px] rounded-full bg-teal-500/[0.03] blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(16,185,129,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div
        className="relative z-10 w-full max-w-[1500px] mx-auto"
        style={{ padding: '96px 0 56px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[62%] flex flex-col items-start gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 h-9 px-[18px] rounded-full border border-emerald-500/25 bg-zinc-900/70 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans text-[13px] font-medium uppercase tracking-[0.15em] text-emerald-400">
              Premium Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.08]"
          >
            We build websites that help businesses grow.
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-zinc-400 max-w-[560px] leading-[1.75]"
          >
            Modern websites, memorable brand identities, and digital experiences designed for ambitious businesses that want to stand out and scale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onCtaClick('contact')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-400 text-white font-sans text-sm font-semibold shadow-[0_10px_35px_-8px_rgba(16,185,129,0.45)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_50px_-8px_rgba(16,185,129,0.55)] active:scale-[0.98]"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => onCtaClick('portfolio')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-zinc-700 text-zinc-200 font-sans text-sm font-semibold transition-all duration-200 hover:-translate-y-1 hover:bg-zinc-800/50 hover:border-emerald-400/50"
            >
              <span>View Our Portfolio</span>
              <MoveRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 pt-1"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-sans text-sm text-zinc-400">Trusted by Growing Businesses</span>
          </motion.div>

          {/* Services Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1"
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="group flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_12px_40px_-12px_rgba(16,185,129,0.2)]"
              >
                <div className="p-1.5 rounded-lg bg-zinc-800/70 text-emerald-400 border border-zinc-700/40 group-hover:border-emerald-500/30 transition-colors duration-300">
                  <service.icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-[11px] font-semibold text-zinc-300">{service.title}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Stack Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {techStack.map((tech) => (
              <span key={tech.name} className="flex items-center gap-1.5 font-sans text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-default">
                <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
