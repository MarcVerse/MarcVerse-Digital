import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  className?: string;
  containerClassName?: string;
  size?: 'default' | 'narrow';
  backgrounds?: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({
  id,
  className = '',
  containerClassName = '',
  size = 'default',
  backgrounds,
  children,
  ...props
}: SectionProps) {
  // Unified vertical spacing: 
  // Desktop: 80px (py-20), Tablet: 64px (sm:py-16), Mobile: 48px (py-12)
  const spacingClasses = 'py-12 sm:py-16 md:py-20';
  
  // Standardized container widths
  const widthClasses = size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';
  
  // Accessibility check for reduced motion preferences
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <section
      id={id}
      className={`relative ${spacingClasses} overflow-hidden transition-colors duration-300 scroll-mt-[72px] md:scroll-mt-[80px] ${className}`}
      {...props}
    >
      {backgrounds}
      <motion.div 
        className={`${widthClasses} mx-auto px-6 md:px-12 relative z-10 ${containerClassName}`}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

