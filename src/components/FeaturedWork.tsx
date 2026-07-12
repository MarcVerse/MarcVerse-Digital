import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

import showcaseImage from '../assets/images/agency_hero_real_1783876064400.jpg';
import portfolioWebImg from '../assets/images/business_website_real_1783873901878.jpg';
import portfolioBrandImg from '../assets/images/portfolio_brand_1783873510702.jpg';
import portfolioSocialImg from '../assets/images/portfolio_social_1783873523745.jpg';

interface Project {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

const projectsList: Project[] = [
  {
    title: 'Modern Business Website',
    category: 'Concept Website',
    description: 'A clean, responsive business website designed to help companies build credibility and generate leads.',
    imageUrl: portfolioWebImg,
  },
  {
    title: 'Brand Identity Package',
    category: 'Concept Branding',
    description: 'A complete branding concept including logo, business card, letterhead and brand identity.',
    imageUrl: portfolioBrandImg,
  },
  {
    title: 'Social Media Campaign',
    category: 'Concept Design',
    description: 'A collection of promotional social media creatives designed to increase engagement and brand awareness.',
    imageUrl: portfolioSocialImg,
  },
];

interface PortfolioCardProps {
  project: Project;
  variants: any;
  shouldReduceMotion: boolean;
  key?: React.Key;
}

function PortfolioCard({ project, variants, shouldReduceMotion }: PortfolioCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden bg-white/60 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.03)] dark:hover:shadow-[0_25px_50px_rgba(16,185,129,0.04)] transition-all duration-500 ease-out flex flex-col h-full"
    >
      {/* Subtle dynamic mouse spotlight border highlight */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
        style={{
          padding: '1px',
          background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.2), transparent 80%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Subtle dynamic mouse spotlight content background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.05), transparent 80%)`,
        }}
      />

      {/* Visual Image Showcase */}
      <div className="relative overflow-hidden z-10">
        <OptimizedImage
          src={project.imageUrl}
          alt={project.title}
          aspectRatioClass="aspect-video"
          imageClassName="transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent pointer-events-none z-10" />
        
        {/* Category Badge over image */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-zinc-900/90 text-emerald-600 dark:text-emerald-400 backdrop-blur-sm shadow-sm border border-zinc-100/30 dark:border-zinc-800/30">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content & Action details */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow z-10 relative">
        <div>
          <h4 className="font-display text-base font-bold text-zinc-950 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </h4>
          <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/40">
          <button
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 cursor-pointer focus:outline-none"
            aria-label={`View details of project ${project.title}`}
          >
            <span>View Project</span>
            <ArrowUpRight className="h-4.5 w-4.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="featured-work" className="scroll-mt-[72px] md:scroll-mt-[80px]">
      <section
        className="relative py-16 sm:py-20 md:py-24 overflow-hidden transition-colors duration-300 bg-white dark:bg-zinc-900/40"
      >
        {/* Dynamic Background Gradients */}
        <>
          <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-slate-50 to-transparent dark:from-zinc-950/10 dark:to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-[45%] h-[45%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        </>

        <motion.div
          className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-sans text-xs font-semibold tracking-wider uppercase"
            >
              Featured Work
            </div>
            
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
            >
              Premium Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 font-bold">Showcase</span>
            </h2>
            
            <p
              className="font-sans text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              Take a look at how MarcVerse Digital Solutions implements custom-coded, ultra-responsive digital products. We bridge high-end UI/UX design with professional branding, graphic assets, and dedicated virtual assistance.
            </p>
          </div>

          {/* HIGH FIDELITY PREMIUM DEVICE SHOWCASE */}
          <div className="relative mx-auto max-w-4xl w-full flex flex-col items-center justify-center py-4 md:py-8 mb-16 md:mb-24">
            
            {/* Ambient Background Glowing Orb */}
            <div className="absolute -inset-10 rounded-full bg-radial-gradient from-emerald-500/15 via-emerald-500/5 to-transparent opacity-80 dark:opacity-50 blur-3xl pointer-events-none" />

            {/* Image Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.005, transition: { duration: 0.4 } }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/12] md:aspect-[1.28/1] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-950 flex items-center justify-center group"
            >
              {/* Showcase Image */}
              <OptimizedImage
                src={showcaseImage}
                alt="MarcVerse Digital Solutions Showcase Mockup"
                aspectRatioClass="w-full h-full"
                imageClassName="transition-transform duration-1000 ease-out hover:scale-[1.01]"
              />

              {/* Subtle Gradient Overlay (5% to 10% opacity) matching visual style */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/5 via-transparent to-zinc-950/5 pointer-events-none mix-blend-multiply" />
              <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none mix-blend-color-burn" />
              <div className="absolute inset-0 bg-black/[0.02] dark:bg-transparent pointer-events-none" />
              
            </motion.div>
          </div>

          {/* Section Sub-heading for the concept projects list */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white mb-3">
              Case Study <span className="text-emerald-600 dark:text-emerald-400 font-bold">Concepts</span>
            </h3>
            <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400">
              Explore concrete examples of design drafts representing our creative methodologies in web, print, and strategic business identity.
            </p>
          </div>

          {/* Portfolio Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projectsList.map((project, idx) => {
              return (
                <PortfolioCard
                  key={idx}
                  project={project}
                  variants={itemVariants}
                  shouldReduceMotion={shouldReduceMotion}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
}
