import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Create a spring physics configuration for butter-smooth progress updating without lag
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div 
      id="marcverse-scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[3.5px] w-full bg-transparent z-[100] pointer-events-none"
    >
      <motion.div
        id="marcverse-scroll-progress-bar"
        className="h-full w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-400 origin-left shadow-[0_1px_6px_rgba(16,185,129,0.25)] dark:shadow-[0_1px_8px_rgba(52,211,153,0.3)] transition-colors duration-300"
        style={{ scaleX }}
      />
    </div>
  );
}
