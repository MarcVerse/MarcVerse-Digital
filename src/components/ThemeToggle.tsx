import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-gray-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors duration-200 cursor-pointer overflow-hidden group shadow-sm hover:shadow-md"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 1 : 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {theme === 'light' ? (
          <Moon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
        ) : (
          <Sun className="h-[18px] w-[18px] transition-transform group-hover:scale-110 text-amber-400" />
        )}
      </motion.div>
    </button>
  );
}
