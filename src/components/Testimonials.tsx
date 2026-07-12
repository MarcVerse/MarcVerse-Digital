import { motion } from 'motion/react';
import { Quote, GraduationCap, Building2 } from 'lucide-react';
import Section from './Section';

interface Testimonial {
  organization: string;
  representative: string;
  role: string;
  text: string;
  type: 'business' | 'student';
  initials: string;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  {
    organization: 'Suna Atlantic Fire Limited',
    representative: 'Shedrach Akan',
    role: 'Chief Executive Officer (CEO)',
    text: 'For over three years, MarcVerse Digital Solutions has been a trusted digital partner to our company. From professional quotations and invoices to proposals, marketing flyers and social media content, every project has been delivered with professionalism, accuracy and creativity. Their consistency and dedication make them highly recommended.',
    type: 'business',
    initials: 'SA',
    avatarBg: 'from-emerald-500 to-teal-500 text-white',
  },
  {
    organization: 'Society of Nigerian Artists (SNA)',
    representative: 'Prince Olojo K.K.K.',
    role: 'Chairman',
    text: 'MarcVerse Digital Solutions has provided valuable creative and administrative support to the Society of Nigerian Artists. From certificate design and artwork authentication documents to creative writing, every deliverable has reflected professionalism, creativity and attention to detail. We appreciate their commitment to quality.',
    type: 'business',
    initials: 'PK',
    avatarBg: 'from-teal-500 to-cyan-500 text-white',
  },
  {
    organization: 'Lagos State University of Science and Technology (LASUSTECH)',
    representative: 'Olamide Rukayat',
    role: 'Final Year Project Research & Academic Support',
    text: 'Working with MarcVerse Digital Solutions made my final year project much easier. Their research support, academic writing guidance and professionalism throughout the process gave me confidence and helped me produce a well structured project. I truly appreciate their dedication and timely delivery.',
    type: 'student',
    initials: 'OR',
    avatarBg: 'from-emerald-600 to-emerald-400 text-white',
  },
  {
    organization: 'University of Lagos (UNILAG)',
    representative: 'Mr. Oyediran Amos',
    role: 'Thesis Research & Academic Support',
    text: 'MarcVerse Digital Solutions provided excellent support throughout my thesis. Their attention to detail, quality research assistance and commitment to delivering a polished academic document exceeded my expectations. I highly recommend their services to anyone seeking professional academic support.',
    type: 'student',
    initials: 'OA',
    avatarBg: 'from-teal-600 to-teal-400 text-white',
  },
];

export default function Testimonials() {
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
      id="testimonials"
      className="bg-white dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800/60"
      backgrounds={
        <>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.03] blur-[100px] pointer-events-none" />
        </>
      }
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-4">
        {/* Optional Trust Element */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/20 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wide uppercase"
        >
          <Building2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
          Trusted by businesses, organizations and students across Nigeria
        </div>

        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">Clients Say</span>
        </h2>

        <p
          className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
        >
          We're proud to have built lasting relationships with businesses, organizations and students by delivering reliable, high quality digital solutions.
        </p>
      </div>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {testimonials.map((item, idx) => {
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col justify-between rounded-2xl p-8 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/60 transition-colors duration-300 hover:bg-white dark:hover:bg-zinc-900 hover:border-emerald-500/20 dark:hover:border-emerald-400/20 hover:shadow-xl hover:shadow-emerald-500/[0.02]"
            >
              {/* Accent top gradient line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Quotation Icon wrapper */}
              <div className="absolute top-6 right-8 opacity-[0.08] dark:opacity-[0.05] group-hover:opacity-[0.15] dark:group-hover:opacity-[0.1] transition-opacity duration-300">
                <Quote className="h-16 w-16 text-emerald-600 dark:text-emerald-400 transform scale-x-[-1]" />
              </div>

              {/* Testimonial text */}
              <div className="relative z-10 mb-8">
                <p className="font-sans text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="relative z-10 flex items-center gap-4 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6">
                {/* Initial-based avatar placeholder */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${item.avatarBg} font-display text-sm font-bold shadow-sm flex-shrink-0`}>
                  {item.initials}
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-sm sm:text-base font-bold text-zinc-950 dark:text-white truncate">
                      {item.representative}
                    </h4>
                    {item.type === 'student' ? (
                      <GraduationCap className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Building2 className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate">
                    {item.role}
                  </p>
                  <p className="font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                    {item.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
