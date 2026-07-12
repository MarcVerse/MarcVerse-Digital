import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield } from 'lucide-react';
import Logo from './Logo';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  // Prevent scrolling on body while loading to avoid layout shifts or scrolling behind the loader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Ensure it is also set on html tag if needed
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="marcverse-loading-screen"
          className="fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 select-none pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.45, ease: "easeInOut" }
          }}
        >
          {/* Subtle Cyber Grid & Glowing Accents */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px]" />
          </div>

          {/* Loading Container */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 w-full text-center">
            
            {/* Logo Wrapper with elegant scale and fade entrance */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <Logo variant="full" size="xl" className="mx-auto" />
            </motion.div>

            {/* Tagline revealed slightly later */}
            <motion.div
              className="mb-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Architecting Digital Futures
              </span>
            </motion.div>

            {/* Premium Progress Bar Track */}
            <div className="relative w-48 sm:w-56 h-[3px] rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden mb-5">
              {/* Active glow filling bar */}
              <motion.div 
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                style={{ originX: 0 }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.15, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              />
            </div>

            {/* Interactive/Micro feedback details at bottom of loader */}
            <motion.div
              className="flex items-center justify-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-400 dark:text-zinc-600">
                Initializing core modules...
              </span>
            </motion.div>

          </div>

          {/* Secure Digital Environment notice in footer */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono text-zinc-400/60 dark:text-zinc-600/60 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Shield className="w-3 h-3 text-emerald-500/50" />
            <span>MarcVerse Web Security System</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
