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

  // MarcVerse Logo Image
  const LogoIcon = () => (
    <div className={`relative flex items-center justify-center rounded-xl bg-transparent transition-all duration-300 ${iconClasses}`}>
      <img
        src="/images/MarcVerse logo.png"
        alt="MarcVerse Digital Solutions Logo"
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );

  if (variant === 'icon' || variant === 'favicon') {
    return <LogoIcon />;
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

