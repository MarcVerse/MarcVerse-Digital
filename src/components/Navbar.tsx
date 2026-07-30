import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { NavItem } from '../types';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#process' },
  { label: 'Featured Work', href: '#featured-work' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
          ? 'py-3.5 bg-zinc-950/75 backdrop-blur-xl border-b border-zinc-800/50 shadow-lg shadow-black/20'
          : 'py-5.5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        {/* Logo */}
        <a
          id="logo-brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group cursor-pointer shrink-0"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Nav - centered */}
        <nav id="desktop-navigation" className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => {
              const targetId = item.href.replace('#', '');
              const isRoute = !item.href.startsWith('#');
              const isActive = isRoute ? false : activeSection === targetId;
              return (
                <li key={item.label} className="relative">
                  {isRoute ? (
                    <Link
                      to={item.href}
                      className={`font-sans text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1.5 py-0.5 outline-none ${
                        isActive
                          ? 'text-emerald-400'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
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
                          ? 'text-emerald-400'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div id="nav-actions-desktop" className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile controls */}
        <div id="nav-actions-mobile" className="flex md:hidden items-center gap-3">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-200 cursor-pointer"
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
            className="md:hidden overflow-hidden bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800/50"
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
                            handleNavClick(item.href);
                          }}
                          className={`font-sans text-base font-semibold py-2.5 border-b border-zinc-800/60 flex items-center justify-between focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 outline-none ${
                            isActive
                              ? 'text-emerald-400'
                              : 'text-zinc-400'
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
