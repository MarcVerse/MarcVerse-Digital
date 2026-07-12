import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const phoneNumber = '2348136056864';
  const message = `Hello MarcVerse,

I'm interested in your services and would like to make an enquiry.

Please let me know the next steps.

Thank you.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 sm:right-8 z-40 flex flex-col items-end">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 px-3 py-2 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xl border border-zinc-800 dark:border-zinc-700/50 whitespace-nowrap select-none pointer-events-none z-50"
            role="tooltip"
          >
            Chat with MarcVerse Digital Solutions
            <div className="absolute right-5 bottom-[-4px] w-2 h-2 bg-zinc-900 dark:bg-zinc-800 rotate-45 border-r border-b border-zinc-800 dark:border-zinc-700/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Container */}
      <div className="relative">
        {/* Subtle continuous pulsing ring for idle feedback */}
        {!shouldReduceMotion && (
          <span className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping opacity-75 pointer-events-none" />
        )}
        
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
          aria-label="Chat with MarcVerse Digital Solutions on WhatsApp"
          title="Chat with MarcVerse Digital Solutions"
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.04, 1],
          }}
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={shouldReduceMotion ? {} : {
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        </motion.a>
      </div>
    </div>
  );
}
