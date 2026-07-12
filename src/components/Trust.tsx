import { motion } from 'motion/react';
import { ShieldCheck, MessageSquare, Clock, HeartHandshake } from 'lucide-react';
import Section from './Section';

interface Commitment {
  title: string;
  description: string;
  icon: typeof ShieldCheck;
}

const commitments: Commitment[] = [
  {
    title: 'Quality First',
    description: 'Every project is completed with a focus on quality, usability and attention to detail.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparent Communication',
    description: 'Clients stay informed throughout every stage of the project.',
    icon: MessageSquare,
  },
  {
    title: 'On Time Delivery',
    description: 'We respect deadlines and keep projects moving efficiently.',
    icon: Clock,
  },
  {
    title: 'Continuous Support',
    description: 'We provide guidance and support even after project completion.',
    icon: HeartHandshake,
  },
];

export default function Trust() {
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
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Section
      id="about"
      className="bg-zinc-50 dark:bg-zinc-900/20"
      backgrounds={
        <>
          {/* Decorative Blur Backgrounds */}
          <div className="absolute top-0 right-0 w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        </>
      }
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase"
          >
            Our Commitment
          </div>
          
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
          >
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">Trust</span>
          </h2>
          
          <p
            className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            We may be a growing agency, but we are committed to delivering professional digital solutions with attention to detail, clear communication and quality execution.
          </p>
        </div>

        {/* Commitment Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {commitments.map((commitment, idx) => {
            const Icon = commitment.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-8 bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 transition-colors duration-300 hover:bg-white dark:hover:bg-zinc-900 hover:border-emerald-500/20 dark:hover:border-emerald-400/20 hover:shadow-xl hover:shadow-emerald-500/[0.02]"
              >
                {/* Top decorative gradient border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon wrapper */}
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 shadow-sm border border-zinc-100 dark:border-zinc-700/50 group-hover:border-emerald-500/20 group-hover:shadow-md group-hover:shadow-emerald-500/5 transition-all duration-300">
                  <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>

                {/* Commitment Title */}
                <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {commitment.title}
                </h3>

                {/* Commitment Description */}
                <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {commitment.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

    </Section>
  );
}
