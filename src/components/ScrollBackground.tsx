import { useEffect, useState, useRef } from 'react';

/**
 * ScrollBackground
 * A fixed full-screen background layer that fades between
 * section-specific visuals as the user scrolls down the page.
 * Uses CSS gradients for performance — GPU-accelerated, no heavy libraries.
 */

interface SectionBg {
  id: string;
  gradient: string;
  image?: string;
  opacity: number;
}

const sectionBackgrounds: SectionBg[] = [
  {
    id: 'home',
    gradient: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168,85,247,0.12) 0%, transparent 60%), linear-gradient(135deg, #09090b 0%, #09090b 100%)',
    image: '/images/bg_hero.jpg',
    opacity: 0.18,
  },
  {
    id: 'why-choose-us',
    gradient: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(20,184,166,0.16) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 75% 60%, rgba(99,102,241,0.10) 0%, transparent 60%), linear-gradient(160deg, #09090b 0%, #0d1117 100%)',
    opacity: 0,
  },
  {
    id: 'services',
    gradient: 'radial-gradient(ellipse 75% 55% at 70% 30%, rgba(168,85,247,0.18) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 20% 70%, rgba(16,185,129,0.10) 0%, transparent 60%), linear-gradient(135deg, #09090b 0%, #0c0910 100%)',
    image: '/images/bg_services.jpg',
    opacity: 0.14,
  },
  {
    id: 'process',
    gradient: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(6,182,212,0.15) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 50% 80%, rgba(16,185,129,0.10) 0%, transparent 60%), linear-gradient(170deg, #09090b 0%, #060d0b 100%)',
    opacity: 0,
  },
  {
    id: 'featured-work',
    gradient: 'radial-gradient(ellipse 70% 55% at 80% 30%, rgba(16,185,129,0.20) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 70%, rgba(20,184,166,0.12) 0%, transparent 60%), linear-gradient(145deg, #09090b 0%, #070d0b 100%)',
    opacity: 0,
  },
  {
    id: 'about',
    gradient: 'radial-gradient(ellipse 65% 55% at 25% 35%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(168,85,247,0.12) 0%, transparent 60%), linear-gradient(150deg, #09090b 0%, #0a090f 100%)',
    opacity: 0,
  },
  {
    id: 'testimonials',
    gradient: 'radial-gradient(ellipse 75% 55% at 40% 40%, rgba(20,184,166,0.14) 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 70% 70%, rgba(16,185,129,0.10) 0%, transparent 60%), linear-gradient(140deg, #09090b 0%, #060d0b 100%)',
    opacity: 0,
  },
  {
    id: 'faq',
    gradient: 'radial-gradient(ellipse 70% 55% at 60% 30%, rgba(168,85,247,0.14) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 30% 65%, rgba(99,102,241,0.10) 0%, transparent 60%), linear-gradient(155deg, #09090b 0%, #0a090f 100%)',
    opacity: 0,
  },
  {
    id: 'contact',
    gradient: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 20%, rgba(6,182,212,0.12) 0%, transparent 60%), linear-gradient(145deg, #09090b 0%, #060d0b 100%)',
    opacity: 0,
  },
];

export default function ScrollBackground() {
  const activeIdRef = useRef<string>('home');
  const transitioningRef = useRef(false);

  useEffect(() => {
    const sectionIds = sectionBackgrounds.map((s) => s.id);
    const prevLayer = document.createElement('div');
    prevLayer.setAttribute('aria-hidden', 'true');
    prevLayer.className = 'absolute inset-0 transition-opacity duration-[900ms] ease-in-out';
    prevLayer.style.opacity = '0';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newId = entry.target.id;
            if (activeIdRef.current !== newId) {
              const prevId = activeIdRef.current;
              const prevBg = sectionBackgrounds.find((s) => s.id === prevId);
              const nextBg = sectionBackgrounds.find((s) => s.id === newId);

              if (prevBg && nextBg) {
                prevLayer.style.background = prevBg.gradient;
                prevLayer.style.opacity = '0';
                document.body.appendChild(prevLayer);

                requestAnimationFrame(() => {
                  prevLayer.style.opacity = '1';
                });

                setTimeout(() => {
                  prevLayer.style.opacity = '0';
                  setTimeout(() => {
                    if (prevLayer.parentNode) {
                      prevLayer.parentNode.removeChild(prevLayer);
                    }
                  }, 900);
                }, 50);
              }

              activeIdRef.current = newId;
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (prevLayer.parentNode) {
        prevLayer.parentNode.removeChild(prevLayer);
      }
    };
  }, []);

  const activeBg = sectionBackgrounds.find((s) => s.id === activeIdRef.current);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ isolation: 'isolate' }}
    >
      <div className="absolute inset-0 bg-zinc-950" />
      {activeBg?.image && (
        <div
          key={`img-${activeBg.id}`}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{
            backgroundImage: `url(${activeBg.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: activeBg.opacity,
          }}
        />
      )}
      {activeBg && (
        <div
          key={`grad-${activeBg.id}`}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{
            background: activeBg.gradient,
            opacity: 1,
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 50%, rgba(9,9,11,0.55) 100%)',
        }}
      />
    </div>
  );
}
