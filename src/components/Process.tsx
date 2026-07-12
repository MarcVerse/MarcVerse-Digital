import { motion, useReducedMotion } from 'motion/react';
import { Compass, Map, Code, Rocket } from 'lucide-react';
import Section from './Section';

const steps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We learn about your business, goals and project requirements.',
    icon: Compass,
    gradient: 'from-emerald-500 to-emerald-600',
    glow: 'bg-emerald-500/10'
  },
  {
    step: '02',
    title: 'Planning',
    description: 'We define the strategy, timeline and best solution for your project.',
    icon: Map,
    gradient: 'from-emerald-600 to-teal-500',
    glow: 'bg-emerald-600/10'
  },
  {
    step: '03',
    title: 'Design & Development',
    description: 'We create modern, responsive and user friendly digital experiences.',
    icon: Code,
    gradient: 'from-teal-500 to-teal-600',
    glow: 'bg-teal-500/10'
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'After testing and launch, we continue to provide support whenever needed.',
    icon: Rocket,
    gradient: 'from-teal-600 to-emerald-500',
    glow: 'bg-teal-600/10'
  }
];

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Section
      id="process"
      className="bg-slate-50 dark:bg-zinc-950/20"
      backgrounds={
        <>
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
        </>
      }
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 flex flex-col items-center gap-4">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase"
        >
          Our Process
        </div>
        
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">Work</span>
        </h2>
        
        <p
          className="font-sans text-base text-zinc-650 dark:text-zinc-400 leading-relaxed"
        >
          Our simple and transparent process ensures every project is delivered with quality, clarity and attention to detail.
        </p>
      </div>

      {/* Process Steps Cards Grid */}
      <div className="relative">
        {/* Subtle timeline connection line (Desktop only) */}
        <div 
          className="hidden lg:block absolute top-[68px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-200/40 via-teal-200/40 to-emerald-200/40 dark:from-zinc-800/50 dark:via-zinc-800/80 dark:to-zinc-800/50" 
          aria-hidden="true"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
        >
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-8 bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/80 hover:border-emerald-500/20 dark:hover:border-emerald-450/20 hover:shadow-xl hover:shadow-emerald-500/[0.01]"
              >
                {/* Accent line on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Step indicator top right */}
                <span 
                  className="font-display text-4xl font-extrabold text-zinc-100 dark:text-zinc-800/20 absolute top-6 right-6 select-none pointer-events-none transition-colors duration-300 group-hover:text-emerald-500/10"
                  aria-hidden="true"
                >
                  {item.step}
                </span>

                {/* Icon wrapper */}
                <div className="mb-6 relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 shadow-sm border border-zinc-100 dark:border-zinc-700/50 group-hover:border-emerald-500/20 group-hover:shadow-md group-hover:shadow-emerald-500/5 transition-all duration-300">
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm ${item.glow}`} />
                  <Icon className="h-6 w-6 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300 relative z-10" aria-hidden="true" />
                </div>

                {/* Step Label for screen readers */}
                <span className="sr-only">Step {item.step}:</span>

                {/* Card Title */}
                <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
