import { useState, useEffect, useRef } from 'react';
import { Theme } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Trust from './components/Trust';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import NotFound from './components/NotFound';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Read from localStorage or system preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('marcverse-theme') as Theme;
      if (storedTheme) return storedTheme;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) return 'dark';
    }
    return 'light';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [is404, setIs404] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path !== '/' && path !== '/index.html';
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300); // Between 1 and 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setIs404(path !== '/' && path !== '/index.html');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleReturnHome = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      setIs404(false);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  // Sync theme with document class list
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('marcverse-theme', theme);
  }, [theme]);

  // Handle section visibility changes on scroll using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'why-choose-us', 'services', 'process', 'featured-work', 'about', 'testimonials', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the sweet spot of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isProgrammaticScrollRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToSection = (targetId: string) => {
    isProgrammaticScrollRef.current = true;
    setActiveSection(targetId);
    
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = window.innerWidth < 768 ? 72 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      // Perform a robust, custom smooth scroll using requestAnimationFrame
      const start = window.scrollY;
      const change = offsetPosition - start;
      const duration = 600; // ms
      let startTime: number | null = null;
      
      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // EaseInOutQuad easing function
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress;
          
        window.scrollTo(0, start + change * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          isProgrammaticScrollRef.current = false;
        }
      };
      
      requestAnimationFrame(animateScroll);

      // Automatically close mobile menu drawer if open
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) {
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        if (toggleBtn) {
          (toggleBtn as HTMLButtonElement).click();
        }
      }
    } else {
      isProgrammaticScrollRef.current = false;
    }
  };

  const scrollToSectionRef = useRef(scrollToSection);
  useEffect(() => {
    scrollToSectionRef.current = scrollToSection;
  });

  // Override Element.prototype.scrollIntoView to intercept inline scrollIntoView calls in Navbar/Footer
  // and redirect them to our custom smooth, offset-aware scrollToSection function
  useEffect(() => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    Element.prototype.scrollIntoView = function (options?: boolean | ScrollIntoViewOptions) {
      const elementId = this.id;
      const sections = ['home', 'why-choose-us', 'services', 'process', 'featured-work', 'faq', 'contact'];
      
      if (sections.includes(elementId)) {
        scrollToSectionRef.current(elementId);
      } else {
        originalScrollIntoView.call(this, options);
      }
    };

    return () => {
      Element.prototype.scrollIntoView = originalScrollIntoView;
    };
  }, []);

  if (is404) {
    return (
      <>
        <LoadingScreen isLoading={isLoading} />
        <NotFound
          theme={theme}
          toggleTheme={toggleTheme}
          onReturnHome={handleReturnHome}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <LoadingScreen isLoading={isLoading} />
      {/* Scroll Progress Bar at the very top */}
      <ScrollProgress />

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Main Layout containing Hero (Phase 1) */}
      <main>
        <Hero onCtaClick={scrollToSection} />
        
        <WhyChooseUs />
        
        <Services />
        
        <Process />
        
        <Portfolio />

        <Trust />

        <Testimonials />

        <FAQ />

        <Contact />
      </main>
      
      {/* Footer Section */}
      <Footer />
      
      {/* Floating Utilities */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
