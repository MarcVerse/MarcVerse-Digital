import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home, Compass, Terminal, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NotFoundProps {
  onReturnHome: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function NotFound({ onReturnHome, theme, toggleTheme }: NotFoundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-300">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-zinc-400/10 dark:bg-zinc-800/10 blur-[120px]" />
        {/* Subtle grid pattern for MarcVerse digital style */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 px-6 md:px-12 py-6 border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md bg-white/30 dark:bg-zinc-950/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); onReturnHome(); }} className="focus:outline-none">
            <Logo variant="horizontal" size="md" />
          </a>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-2 hidden sm:flex">
              <Terminal className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>ERROR_CODE_404</span>
            </span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: Copy and Actions */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-start text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-200/50 dark:border-emerald-800/50">
            <ShieldAlert className="w-4.5 h-4.5 text-emerald-500" />
            <span>System Notice</span>
          </div>

          {/* Heading 404 */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-display font-extrabold tracking-tighter text-zinc-900 dark:text-white leading-none">
              404
            </h1>
            {/* Glowing Accent Circle under 404 text */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full blur-xl" />
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold mt-4 mb-3 text-zinc-800 dark:text-zinc-100 leading-tight">
            The page you're looking for doesn't exist.
          </h2>
          
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mb-8 leading-relaxed">
            It looks like this destination got disconnected from the MarcVerse grid or moved into hyperspace. Let's redirect you back to safety.
          </p>

          {/* Interactive Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onReturnHome}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-sans font-semibold shadow-lg shadow-emerald-500/20 dark:shadow-emerald-950/40 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Home className="w-4.5 h-4.5" />
              <span>Return Home</span>
            </button>

            <button
              onClick={onReturnHome}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-sans font-semibold transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Brand Promise footer note */}
          <div className="mt-12 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              MarcVerse Hypergrid Status: Active & Secured
            </span>
          </div>
        </motion.div>

        {/* Right Side: High-End Custom Illustration */}
        <motion.div 
          className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center">
            
            {/* Outer Rotating/Floating Rings (MarcVerse design theme) */}
            <motion.div 
              className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-zinc-300/40 dark:border-zinc-800/40 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            />
            
            <motion.div 
              className="absolute w-[80%] h-[80%] rounded-full border border-zinc-200 dark:border-zinc-800 pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            />

            {/* Glowing Space Orbs */}
            <div className="absolute top-[25%] right-[20%] w-3 h-3 rounded-full bg-emerald-500/50 animate-ping" />
            <div className="absolute bottom-[20%] left-[15%] w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="absolute top-[15%] left-[30%] w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />

            {/* Float wrapper for the center block */}
            <motion.div
              className="relative w-[70%] h-[70%] flex items-center justify-center"
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 1.5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
            >
              {/* Complex SVG Illustration */}
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                <defs>
                  {/* Glowing core gradient */}
                  <radialGradient id="portal-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Metallic navy blue gradient */}
                  <linearGradient id="metal-navy" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0B1C33" />
                    <stop offset="50%" stopColor="#11294A" />
                    <stop offset="100%" stopColor="#1E3E62" />
                  </linearGradient>

                  {/* Vibrant emerald gradient */}
                  <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* 1. Portal Glow Base */}
                <circle cx="100" cy="100" r="75" fill="url(#portal-glow)" />

                {/* 2. Abstract Geometric Connection Lines (The MarcVerse Web/Grid) */}
                <path d="M 40 100 L 160 100" stroke="url(#emerald-grad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <path d="M 100 40 L 100 160" stroke="url(#emerald-grad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="100" cy="100" r="45" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

                {/* 3. Disintegrating Pixels (matching logo brand aesthetic) */}
                {/* Floating cubes to suggest broken connection */}
                <g opacity="0.85">
                  {/* Cube 1 */}
                  <path d="M 100 65 L 115 57 L 130 65 L 115 73 Z" fill="url(#emerald-grad)" />
                  <path d="M 100 65 L 115 73 V 90 L 100 82 Z" fill="#059669" />
                  <path d="M 115 73 L 130 65 V 82 L 115 90 Z" fill="#047857" />
                  
                  {/* Disconnected floating block 1 */}
                  <rect x="75" y="60" width="8" height="8" rx="1.5" fill="url(#emerald-grad)" />
                  <rect x="60" y="80" width="6" height="6" rx="1" fill="#10B981" />
                  
                  {/* Metallic Navy Gateway Shape */}
                  <path d="M 50 145 L 80 130 L 120 130 L 150 145 Z" fill="url(#metal-navy)" opacity="0.9" />
                  
                  {/* Floating Block 2 (disintegrating) */}
                  <rect x="135" y="115" width="8" height="8" rx="1.5" fill="#11294A" />
                  <rect x="148" y="105" width="5" height="5" rx="1" fill="#10B981" />
                  <rect x="125" y="145" width="6" height="6" rx="1" fill="#059669" />
                </g>

                {/* 4. Center Compass / Portal Eye */}
                <circle cx="100" cy="100" r="18" fill="url(#metal-navy)" stroke="#10B981" strokeWidth="2" />
                
                {/* Abstract "V" segment floating in center (V for Verse) */}
                <path d="M 94 96 L 100 106 L 108 92" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Concentric orbital rings on sides */}
                <path d="M 35 120 C 50 135 70 145 100 145 C 130 145 150 135 165 120" stroke="#10B981" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M 35 80 C 50 65 70 55 100 55 C 130 55 150 65 165 80" stroke="url(#metal-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 py-6 text-center border-t border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100/30 dark:bg-zinc-950/20">
        <p className="text-xs text-zinc-500 dark:text-zinc-600">
          &copy; {new Date().getFullYear()} MarcVerse Digital Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
