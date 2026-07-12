import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { Theme, NavItem } from '../types';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#process' },
  { label: 'Featured Work', href: '#featured-work' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme, activeSection, scrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    scrollToSection(targetId);
    
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-in-out ${
        scrolled
          ? 'py-3.5 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-lg shadow-zinc-100/30 dark:shadow-black/20'
          : 'py-5.5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          id="logo-brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group cursor-pointer"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Nav Items */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <li key={item.label} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = item.href.replace('#', '');
                      document.getElementById(id)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                    className={`font-sans text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1.5 py-0.5 outline-none ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div id="nav-actions-desktop" className="hidden md:flex items-center gap-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile controls */}
        <div id="nav-actions-mobile" className="flex md:hidden items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <nav id="mobile-nav-list-wrapper">
                <ul id="mobile-nav-list" className="flex flex-col gap-4">
                  {navItems.map((item) => {
                    const targetId = item.href.replace('#', '');
                    const isActive = activeSection === targetId;
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            const id = item.href.replace('#', '');
                            document.getElementById(id)?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }}
                          className={`font-sans text-base font-semibold py-2.5 border-b border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 outline-none ${
                            isActive
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
