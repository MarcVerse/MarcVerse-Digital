import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, ArrowUpRight } from 'lucide-react';
import Section from './Section';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How long does it take to complete a website?',
    answer: 'The timeline depends on the project size. Most business websites are completed within one to three weeks after all required information has been provided.',
  },
  {
    question: 'Do you redesign existing websites?',
    answer: 'Yes. We can modernize outdated websites, improve user experience, increase performance and make them mobile responsive.',
  },
  {
    question: 'Can I request changes after delivery?',
    answer: 'Yes. Every project includes a revision process to ensure the final result meets your expectations.',
  },
  {
    question: 'Do you build mobile friendly websites?',
    answer: 'Absolutely. Every website is designed to work seamlessly across desktops, tablets and smartphones.',
  },
  {
    question: 'Can you help with branding and graphic design?',
    answer: 'Yes. We provide branding, logo design, marketing materials and digital graphics alongside website development.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply contact us through the contact form or WhatsApp and we will discuss your project requirements and provide the best solution.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      size="narrow"
      className="bg-white dark:bg-zinc-900/40"
      backgrounds={
        <>
          {/* Decorative ambient lights */}
          <div className="absolute top-1/2 left-0 w-[25%] h-[25%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-10 right-0 w-[25%] h-[25%] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
        </>
      }
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase"
          >
            Frequently Asked Questions
          </div>
          
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">Questions</span>
          </h2>
          
          <p
            className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            Find quick answers to the most common questions about our services, process and project delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-emerald-500/30 dark:border-emerald-400/20 bg-white dark:bg-zinc-900/40 shadow-lg shadow-emerald-500/[0.02]' 
                    : 'border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left p-6 sm:p-8 font-sans focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className={`font-display text-base sm:text-lg font-semibold transition-colors duration-200 pr-4 ${
                    isOpen 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`relative flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : 'border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${index}`}
                      aria-labelledby={`faq-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1]
                          },
                          opacity: { duration: 0.25, ease: 'easeInOut' }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1]
                          },
                          opacity: { duration: 0.2, ease: 'easeInOut' }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-zinc-100/10 dark:border-zinc-800/20">
                        <p className="font-sans text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed pt-6">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 md:mt-20 p-8 md:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 text-center relative overflow-hidden"
        >
          {/* Subtle background glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-950 dark:text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="font-sans text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
            We're happy to discuss your ideas and recommend the best solution for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans text-sm font-semibold text-white bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-whatsapp-modal'));
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              Chat on WhatsApp
            </button>
          </div>
        </motion.div>

    </Section>
  );
}
