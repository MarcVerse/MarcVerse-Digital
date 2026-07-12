import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'favicon';
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
}

export default function Logo({
  variant = 'full',
  className = '',
  iconClassName = '',
  size = 'md',
}: LogoProps) {
  // Sizing maps
  const iconSizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    auto: 'w-full h-full',
  };

  const textSizeMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
    auto: 'text-lg md:text-xl',
  };

  const iconClasses = `${iconSizeMap[size]} ${iconClassName}`;

  // High-fidelity vector recreation of the user's uploaded MarcVerse logo
  const LogoIcon = () => (
    <div className={`relative flex items-center justify-center rounded-xl bg-transparent transition-all duration-300 ${iconClasses}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Metallic Navy Blue/Black Gradients */}
          <linearGradient id="mv-navy-primary" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#020813" />
            <stop offset="50%" stopColor="#0B1C33" />
            <stop offset="100%" stopColor="#11294A" />
          </linearGradient>
          
          <linearGradient id="mv-navy-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3E62" />
            <stop offset="60%" stopColor="#0B1C33" />
            <stop offset="100%" stopColor="#020813" />
          </linearGradient>

          {/* Vibrant Emerald to Lime Green Gradients */}
          <linearGradient id="mv-green-primary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#013A1A" />
            <stop offset="35%" stopColor="#007F39" />
            <stop offset="70%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          <linearGradient id="mv-green-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Premium Soft Shadow Filter */}
          <filter id="mv-soft-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#020813" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Group with soft shadow */}
        <g filter="url(#mv-soft-shadow)">
          {/* 1. DISINTEGRATING DIGITAL PIXELS (Left Side) */}
          <rect x="18.5" y="36.5" width="3.2" height="3.2" rx="0.5" fill="#10B981" />
          <rect x="13.5" y="40.5" width="3.2" height="3.2" rx="0.5" fill="#059669" />
          
          <rect x="20.5" y="32.5" width="3.2" height="3.2" rx="0.5" fill="#020813" />
          <rect x="22.5" y="38.5" width="3.2" height="3.2" rx="0.5" fill="#0B1C33" />
          <rect x="22.5" y="42.5" width="3.2" height="3.2" rx="0.5" fill="#020813" />
          <rect x="24.5" y="38.5" width="3.2" height="3.2" rx="0.5" fill="#11294A" />
          <rect x="19.5" y="45.5" width="3.8" height="3.8" rx="0.5" fill="#0B1C33" />
          <rect x="15.5" y="45.5" width="3.2" height="3.2" rx="0.5" fill="#020813" />
          <rect x="12.8" y="49.8" width="2.8" height="2.8" rx="0.5" fill="#020813" />
          <rect x="14.5" y="53.8" width="2.8" height="2.8" rx="0.5" fill="#020813" />
          <rect x="18.2" y="50.2" width="4.2" height="4.2" rx="0.5" fill="#020813" />
          <rect x="21.2" y="46.2" width="4.8" height="4.8" rx="0.5" fill="#020813" />
          <rect x="21.2" y="54.2" width="3.8" height="3.8" rx="0.5" fill="#0B1C33" />
          <rect x="25.2" y="43.2" width="4.8" height="4.8" rx="0.5" fill="#020813" />
          <rect x="25.2" y="50.2" width="4.2" height="4.2" rx="0.5" fill="#11294A" />
          <rect x="29.2" y="44.2" width="4.2" height="4.2" rx="0.5" fill="#020813" />
          <rect x="29.2" y="49.2" width="3.8" height="3.8" rx="0.5" fill="#020813" />
          <rect x="17.2" y="53.2" width="2.8" height="2.8" rx="0.5" fill="#11294A" />

          {/* 2. CIRCULAR OUTER RINGS (Crescents) */}
          <path
            d="M 52.5 18.5 C 38.5 18.5 28.5 28.5 28.5 35 C 28.5 31.5 35.5 24 52.5 24 Z"
            fill="url(#mv-navy-highlight)"
          />
          <path
            d="M 36.5 67.5 C 36.5 73.5 45.5 78.5 54.5 78.5 C 47.5 76 39.5 72.5 36.5 67.5 Z"
            fill="url(#mv-navy-primary)"
          />
          <path
            d="M 54.5 18.5 C 68.5 18.5 77.5 28.5 77.5 35 C 73.5 31.5 65.5 24 54.5 24 Z"
            fill="url(#mv-green-primary)"
          />
          <path
            d="M 64.5 78.5 C 73.5 73.5 79.5 60.5 79.5 50.5 C 76.5 56.5 71.5 71.5 64.5 78.5 Z"
            fill="url(#mv-green-accent)"
          />

          {/* 3. CORE ABSTRACT "M" (Navy Blue) */}
          <path
            d="M 26.5 31.5 C 26.5 31.5 26.5 72.5 26.5 72.5 H 34.5 V 45.5 L 48.5 59.5 L 64.5 44.5 V 32.5 H 56.5 L 48.5 41.5 L 41.5 31.5 Z"
            fill="url(#mv-navy-primary)"
          />

          {/* 4. CORE ABSTRACT "V" / CHECKMARK (Vibrant Green) */}
          <path
            d="M 52.5 54.5 L 64.5 76.5 L 85.5 31.5 H 76.5 L 64.5 59.5 L 57.5 50.5 Z"
            fill="url(#mv-green-primary)"
          />
        </g>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'favicon') {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="100" height="100" rx="24" fill="#020813" />
        <path
          d="M 52.5 18.5 C 38.5 18.5 28.5 28.5 28.5 35 C 28.5 31.5 35.5 24 52.5 24 Z"
          fill="#11294A"
        />
        <path
          d="M 54.5 18.5 C 68.5 18.5 77.5 28.5 77.5 35 C 73.5 31.5 65.5 24 54.5 24 Z"
          fill="#10B981"
        />
        <path
          d="M 26.5 31.5 C 26.5 31.5 26.5 72.5 26.5 72.5 H 34.5 V 45.5 L 48.5 59.5 L 64.5 44.5 V 32.5 H 56.5 L 48.5 41.5 L 41.5 31.5 Z"
          fill="#0B1C33"
        />
        <path
          d="M 52.5 54.5 L 64.5 76.5 L 85.5 31.5 H 76.5 L 64.5 59.5 L 57.5 50.5 Z"
          fill="#10B981"
        />
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <LogoIcon />
        <div className="flex items-center gap-2">
          <span className="font-sans font-extrabold tracking-tight text-xl text-zinc-950 dark:text-white">
            MarcVerse
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-sans font-semibold tracking-wider text-[11px] uppercase text-emerald-600 dark:text-emerald-400">
            Digital Solutions
          </span>
        </div>
      </div>
    );
  }

  // Full Logo (Default)
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <span className={`font-sans font-extrabold tracking-tight text-zinc-950 dark:text-white leading-none ${textSizeMap[size]}`}>
          MarcVerse
        </span>
        <span className="font-sans font-semibold tracking-wider text-[9px] uppercase text-emerald-600 dark:text-emerald-400 leading-none mt-1.5">
          Digital Solutions
        </span>
      </div>
    </div>
  );
}
