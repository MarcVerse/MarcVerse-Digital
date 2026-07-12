import { motion } from 'motion/react';
import { Globe, Layers, Award, Layout, BookOpen, Briefcase, ArrowRight, LucideIcon } from 'lucide-react';
import Section from './Section';

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: Globe,
    title: 'Website Design',
    description: 'Modern, responsive and high performing websites built for businesses and brands.',
  },
  {
    icon: Layers,
    title: 'Graphic Design',
    description: 'Professional flyers, logos, social media graphics, business cards and marketing materials.',
  },
  {
    icon: Award,
    title: 'Branding',
    description: 'Create memorable brand identities that build trust and recognition.',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'User centered interface and experience design for websites and applications.',
  },
  {
    icon: BookOpen,
    title: 'Research & Academic Support',
    description: 'Professional research assistance, formatting, editing and documentation support.',
  },
  {
    icon: Briefcase,
    title: 'Virtual Assistant Services',
    description: 'Administrative support, business organization, documentation and digital assistance.',
  },
];

export default function Services() {
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
      id="services"
      className="bg-slate-50 dark:bg-zinc-950"
      backgrounds={
        <>
          {/* Background gradients for visual continuity with Hero */}
          <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-white to-transparent dark:from-zinc-950/10 dark:to-transparent pointer-events-none" />
          <div className="absolute top-1/3 -right-[10%] w-[45%] h-[45%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-[5%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        </>
      }
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase"
          >
            Our Services
          </div>
          
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
          >
            Solutions Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">Growth</span>
          </h2>
          
          <p
            className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            We provide high quality digital solutions that help businesses grow, attract customers and build a strong online presence.
          </p>
        </div>

        {/* Premium Services Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-8 bg-white dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/60 transition-colors duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900 hover:border-emerald-500/20 dark:hover:border-emerald-400/20 hover:shadow-xl hover:shadow-emerald-500/[0.02] flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  {/* Icon wrapper */}
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700/50 group-hover:border-emerald-500/20 group-hover:shadow-md group-hover:shadow-emerald-500/5 transition-all duration-300">
                    <Icon className="h-6 w-6 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display text-lg font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Button */}
                <div className="pt-2">
                  <button
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group/btn transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 rounded-sm"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

    </Section>
  );
}
