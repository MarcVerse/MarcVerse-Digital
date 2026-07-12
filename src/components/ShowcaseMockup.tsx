import React from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, 
  Sparkles, 
  Layers, 
  Palette, 
  UserCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  Smartphone,
  MousePointerClick,
  Monitor
} from 'lucide-react';

export default function ShowcaseMockup() {
  // Define floating badges with icons and offset trajectories for animations
  const badges = [
    {
      id: 'web-design',
      label: 'Website Design',
      icon: Laptop,
      color: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800/40',
      initialPos: { top: '8%', left: '-6%' },
      floatRange: [-8, 8],
      duration: 5,
    },
    {
      id: 'branding',
      label: 'Branding',
      icon: Sparkles,
      color: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800/40',
      initialPos: { top: '15%', right: '-8%' },
      floatRange: [6, -10],
      duration: 6,
    },
    {
      id: 'ui-ux',
      label: 'UI/UX Design',
      icon: Layers,
      color: 'from-purple-500/10 to-fuchsia-500/10 dark:from-purple-500/20 dark:to-fuchsia-500/20',
      textColor: 'text-purple-700 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-800/40',
      initialPos: { bottom: '40%', left: '-10%' },
      floatRange: [-12, 12],
      duration: 5.5,
    },
    {
      id: 'graphic-design',
      label: 'Graphic Design',
      icon: Palette,
      color: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-800/40',
      initialPos: { bottom: '15%', right: '-12%' },
      floatRange: [10, -10],
      duration: 7,
    },
    {
      id: 'virtual-assistant',
      label: 'Virtual Assistant',
      icon: UserCheck,
      color: 'from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20',
      textColor: 'text-teal-700 dark:text-teal-400',
      borderColor: 'border-teal-200 dark:border-teal-800/40',
      initialPos: { bottom: '4%', left: '10%' },
      floatRange: [-6, 6],
      duration: 4.5,
    }
  ];

  return (
    <div id="mockup-showcase-container" className="relative w-full max-w-5xl mx-auto my-16 px-4 py-8">
      
      {/* Decorative backdrop gradients for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Floating Service Badges (Rendered absolutely, hidden on very small screens to maintain layout integrity) */}
      {badges.map((badge) => {
        const IconComponent = badge.icon;
        return (
          <motion.div
            key={badge.id}
            id={`badge-${badge.id}`}
            style={{
              position: 'absolute',
              ...badge.initialPos
            }}
            animate={{
              y: badge.floatRange,
            }}
            transition={{
              duration: badge.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.05, y: 0 }}
            className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border ${badge.borderColor} bg-gradient-to-r ${badge.color} backdrop-blur-md shadow-lg shadow-zinc-950/[0.03] z-30 transition-shadow duration-300 hover:shadow-xl cursor-default`}
          >
            <IconComponent className={`w-4 h-4 ${badge.textColor}`} />
            <span className={`font-sans text-xs font-bold tracking-wide ${badge.textColor}`}>
              {badge.label}
            </span>
          </motion.div>
        );
      })}

      {/* Main Mockup Devices Wrapper */}
      <div className="relative w-full max-w-[800px] mx-auto flex items-center justify-center">
        
        {/* 1. LAPTOP MOCKUP (MacBook Style) */}
        <div id="showcase-laptop" className="w-full relative transition-all duration-500">
          
          {/* Laptop Screen Bezel */}
          <div className="relative rounded-2xl border-[10px] sm:border-[12px] md:border-[14px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden shadow-zinc-950/40">
            
            {/* Camera / Notch notch indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-3 sm:h-4 bg-zinc-900 rounded-b-lg z-40 flex items-center justify-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Laptop Screen Content - High-Fidelity Website Preview */}
            <div className="relative aspect-[16/10] bg-zinc-50 dark:bg-zinc-950 overflow-hidden select-none">
              
              {/* Simulated Browser UI */}
              <div className="w-full h-8 sm:h-10 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-400" />
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="w-1/2 sm:w-2/5 h-4 sm:h-5 bg-white dark:bg-zinc-800 rounded-md border border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-center px-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-zinc-400 dark:text-zinc-500 truncate">
                    marcversedigital.com
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
                  <div className="w-2 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
                </div>
              </div>

              {/* Website Body Layout */}
              <div className="absolute inset-x-0 bottom-0 top-8 sm:top-10 p-3 sm:p-5 md:p-6 overflow-y-auto overflow-x-hidden flex flex-col gap-4 sm:gap-6">
                
                {/* Website Header */}
                <div className="flex justify-between items-center pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-bold text-[10px] sm:text-xs text-zinc-900 dark:text-white">
                      MarcVerse
                    </span>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <span className="w-8 sm:w-10 h-1.5 sm:h-2 bg-emerald-500 rounded-full" />
                    <span className="w-8 sm:w-10 h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                    <span className="w-8 sm:w-10 h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  </div>
                </div>

                {/* Hero / Pitch Block */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-8 flex flex-col gap-1.5 sm:gap-2 text-left">
                    <span className="inline-flex max-w-fit px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[8px] font-bold uppercase tracking-wider">
                      Live Project Launch
                    </span>
                    <h4 className="font-sans font-extrabold text-xs sm:text-base md:text-lg text-zinc-950 dark:text-white leading-tight">
                      Crafting Next-Gen <span className="text-emerald-500">Digital Solutions</span>
                    </h4>
                    <p className="font-sans text-[8px] sm:text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                      We engineer high-performance custom websites, pixel-perfect brand ecosystems, and robust virtual support architectures.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <span className="w-14 sm:w-20 h-5 sm:h-6.5 rounded-md bg-zinc-950 dark:bg-emerald-600 flex items-center justify-center text-white font-sans font-bold text-[7px] sm:text-[9px] shadow-sm">
                        View Live Website
                      </span>
                      <span className="w-12 sm:w-16 h-5 sm:h-6.5 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-sans font-medium text-[7px] sm:text-[9px]">
                        Our Story
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Metrics Panel Graphic */}
                  <div className="col-span-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-2 sm:p-3 shadow-md flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[7px] sm:text-[9px] font-bold text-zinc-500 dark:text-zinc-400">
                        Monthly Growth
                      </span>
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                    </div>
                    <div className="text-xs sm:text-base font-sans font-black text-zinc-900 dark:text-white leading-none">
                      +42.8%
                    </div>
                    
                    {/* Simulated vector chart */}
                    <svg viewBox="0 0 100 30" className="w-full h-6 sm:h-8" fill="none">
                      <path
                        d="M 0 25 C 20 18, 40 22, 60 10 C 80 2, 90 8, 100 2"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 0 25 C 20 18, 40 22, 60 10 C 80 2, 90 8, 100 2 L 100 30 L 0 30 Z"
                        fill="url(#mockup-gradient-emerald)"
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="mockup-gradient-emerald" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Grid of Concept Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-1 sm:pt-2">
                  
                  {/* Card 1 */}
                  <div className="rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/60 p-2 sm:p-3 flex flex-col gap-1.5 text-left hover:border-emerald-500/20 transition-all duration-300">
                    <div className="w-5 sm:w-7 h-5 sm:h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Laptop className="w-3 sm:w-4.5 h-3 sm:h-4.5" />
                    </div>
                    <span className="font-sans font-bold text-[8px] sm:text-[10px] text-zinc-900 dark:text-white leading-tight">
                      Web Engineering
                    </span>
                    <span className="font-sans text-[7px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-2">
                      Clean architecture, high-speed optimization and responsiveness.
                    </span>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/60 p-2 sm:p-3 flex flex-col gap-1.5 text-left hover:border-emerald-500/20 transition-all duration-300">
                    <div className="w-5 sm:w-7 h-5 sm:h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Layers className="w-3 sm:w-4.5 h-3 sm:h-4.5" />
                    </div>
                    <span className="font-sans font-bold text-[8px] sm:text-[10px] text-zinc-900 dark:text-white leading-tight">
                      Bespoke UI/UX
                    </span>
                    <span className="font-sans text-[7px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-2">
                      Modern prototypes focused entirely on user journey and conversion.
                    </span>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/60 p-2 sm:p-3 flex flex-col gap-1.5 text-left hover:border-emerald-500/20 transition-all duration-300">
                    <div className="w-5 sm:w-7 h-5 sm:h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Palette className="w-3 sm:w-4.5 h-3 sm:h-4.5" />
                    </div>
                    <span className="font-sans font-bold text-[8px] sm:text-[10px] text-zinc-900 dark:text-white leading-tight">
                      Corporate Identity
                    </span>
                    <span className="font-sans text-[7px] sm:text-[9px] text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-2">
                      High-contrast typography, premium guidelines and digital assets.
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Laptop Base Keyboard Deck */}
          <div className="relative mx-auto w-[108%] -left-[4%] h-2.5 sm:h-4 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded-b-xl sm:rounded-b-2xl shadow-2xl border-t border-zinc-600 flex items-center justify-center">
            {/* Center Indent notch */}
            <div className="absolute top-0 w-20 sm:w-32 h-1.5 bg-zinc-950 rounded-b-md" />
          </div>

        </div>

        {/* 2. MOBILE DEVICE MOCKUP (Overlapping Screen) */}
        <div 
          id="showcase-mobile" 
          className="absolute -bottom-6 sm:-bottom-10 right-0 w-[110px] sm:w-[155px] md:w-[195px] z-20 shadow-2xl hover:translate-y-[-4px] transition-all duration-300 pointer-events-auto"
        >
          {/* Mobile Outer Bezel */}
          <div className="relative rounded-[24px] sm:rounded-[32px] border-[5px] sm:border-[6px] md:border-[7px] border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/19]">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-2.5 sm:h-3.5 bg-zinc-950 rounded-full z-40 flex items-center justify-center">
              <div className="absolute right-2.5 w-1 h-1 rounded-full bg-zinc-800" />
            </div>

            {/* Mobile Screen Contents */}
            <div className="relative w-full h-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex flex-col justify-between select-none">
              
              {/* Phone Status Header */}
              <div className="w-full h-6 sm:h-7 bg-zinc-100 dark:bg-zinc-850 flex items-center px-4 justify-between border-b border-zinc-200/50 dark:border-zinc-800/50">
                <span className="font-sans text-[6px] sm:text-[8px] font-black text-zinc-900 dark:text-zinc-200">
                  9:41
                </span>
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-zinc-900 dark:bg-zinc-200 rounded-full scale-75" />
                  <span className="w-3.5 sm:w-4.5 h-1.5 sm:h-2 bg-zinc-900 dark:bg-zinc-200 rounded-sm scale-75" />
                </div>
              </div>

              {/* Scrollable Mobile Body */}
              <div className="absolute top-6 sm:top-7 bottom-0 inset-x-0 p-2 sm:p-3.5 overflow-y-auto flex flex-col gap-3">
                
                {/* Brand Navigation */}
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200/50 dark:border-zinc-800/50">
                  <span className="font-sans font-black text-[7px] sm:text-[9px] text-zinc-950 dark:text-white">
                    MarcVerse
                  </span>
                  <div className="w-4 h-2.5 bg-emerald-500/10 text-emerald-600 rounded flex flex-col gap-0.5 items-center justify-center p-0.5">
                    <span className="w-2.5 h-0.5 bg-emerald-500 rounded-full" />
                    <span className="w-2.5 h-0.5 bg-emerald-500 rounded-full" />
                  </div>
                </div>

                {/* Mobile Hero Block */}
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-2 sm:p-3 text-left flex flex-col gap-1 shadow-sm">
                  <span className="text-[5px] sm:text-[7px] font-bold text-white/90 uppercase tracking-widest">
                    Your Digital Hub
                  </span>
                  <h5 className="font-sans font-black text-[8px] sm:text-xs text-white leading-tight">
                    Scale Your Operations Today
                  </h5>
                  <p className="font-sans text-[6px] sm:text-[8px] text-emerald-50 leading-normal">
                    Professional, custom solutions configured to work flawlessly on any viewport size.
                  </p>
                  <span className="mt-1 max-w-fit px-2 py-0.5 rounded bg-white text-emerald-600 font-sans font-bold text-[5px] sm:text-[7px]">
                    Consult Today
                  </span>
                </div>

                {/* Client Success Widget */}
                <div className="rounded-lg bg-white dark:bg-zinc-800/90 border border-zinc-100 dark:border-zinc-800/80 p-2 flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-2 sm:w-3 h-2 sm:h-3 text-emerald-500" />
                    <span className="font-sans text-[6px] sm:text-[8px] font-bold text-zinc-950 dark:text-white">
                      Top-Tier Solutions
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[95%] rounded-full" />
                  </div>
                  <div className="flex justify-between text-[5px] sm:text-[7px] text-zinc-400">
                    <span>Performance Score</span>
                    <span className="font-bold text-emerald-500">99%</span>
                  </div>
                </div>

                {/* Virtual Assistant Showcase Panel */}
                <div className="rounded-lg bg-zinc-900 text-white p-2 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <UserCheck className="w-2.5 h-2.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-sans text-[6px] sm:text-[8px] font-bold leading-none">
                        VA Operations
                      </span>
                      <span className="font-sans text-[5px] sm:text-[6.5px] text-zinc-400 mt-0.5">
                        Tasks, Support & Calendars
                      </span>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[5px] font-bold">
                    ACTIVE
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Floating device indicators shown under devices for visual completeness */}
      <div className="flex items-center justify-center gap-6 mt-8 sm:mt-12 text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop Viewport</span>
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-850" />
        <span className="flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Viewport</span>
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-850" />
        <span className="flex items-center gap-1.5">
          <MousePointerClick className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
          <span>Pixel Perfect Design</span>
        </span>
      </div>

    </div>
  );
}
