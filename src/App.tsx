import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import ScrollBackground from './components/ScrollBackground';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioIndexPage from './pages/PortfolioIndexPage';
import NotFound from './components/NotFound';

const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const FeaturedWork = lazy(() => import('./components/FeaturedWork'));
const About = lazy(() => import('./components/About'));
const Trust = lazy(() => import('./components/Trust'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp'));
const BackToTop = lazy(() => import('./components/BackToTop'));

function SectionFallback() {
  return (
    <div className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="h-6 w-48 rounded bg-zinc-800/60 mb-4" />
        <div className="h-4 w-full rounded bg-zinc-800/40 mb-2" />
        <div className="h-4 w-5/6 rounded bg-zinc-800/40" />
      </div>
    </div>
  );
}

function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const isProgrammaticScrollRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sections = ['home', 'why-choose-us', 'services', 'process', 'featured-work', 'about', 'testimonials', 'faq', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isProgrammaticScrollRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (targetId: string) => {
    isProgrammaticScrollRef.current = true;
    setActiveSection(targetId);

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = window.innerWidth < 768 ? 72 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      const start = window.scrollY;
      const change = offsetPosition - start;
      const duration = 600;
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        window.scrollTo(0, start + change * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          isProgrammaticScrollRef.current = false;
        }
      };

      requestAnimationFrame(animateScroll);

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

  useEffect(() => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options?: boolean | ScrollIntoViewOptions) {
      const elementId = this.id;
      const sections = ['home', 'why-choose-us', 'services', 'process', 'featured-work', 'about', 'faq', 'contact'];
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

  const handleCtaClick = (target: string) => {
    if (target === 'portfolio') {
      navigate('/portfolio');
    } else {
      scrollToSection(target);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100">
      <ScrollBackground />
      <ScrollProgress />
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <Hero onCtaClick={handleCtaClick} />
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <WhyChooseUs />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <Services />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <Process />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <FeaturedWork />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <Trust />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
        </div>
        <div className="content-auto">
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </div>
      </main>
      <div className="content-auto">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
      <div className="content-auto">
        <Suspense fallback={null}>
          <FloatingWhatsApp />
        </Suspense>
      </div>
      <div className="content-auto">
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioIndexPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
