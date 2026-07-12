import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowUpRight, ArrowUp } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      try {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } catch (err) {
        const headerOffset = window.innerWidth < 768 ? 72 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo(0, offsetPosition);
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com' },
  ];

  const quickLinks = [
    { label: 'Home', target: 'home' },
    { label: 'Why Choose Us', target: 'why-choose-us' },
    { label: 'Services', target: 'services' },
    { label: 'How We Work', target: 'process' },
    { label: 'Featured Work', target: 'featured-work' },
    { label: 'FAQ', target: 'faq' },
    { label: 'Contact', target: 'contact' },
  ];

  const servicesLinks = [
    { label: 'Website Design', target: 'services' },
    { label: 'Branding', target: 'services' },
    { label: 'Graphic Design', target: 'services' },
    { label: 'UI/UX Design', target: 'services' },
    { label: 'Virtual Assistance', target: 'services' },
    { label: 'Research & Academic Support', target: 'services' },
  ];

  return (
    <footer 
      id="main-footer"
      className="relative bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900/80 transition-colors duration-300"
    >
      {/* Decorative ambient background blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-10 w-60 h-60 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-20">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-900">
          
          {/* COLUMN 1: Brand & Description */}
          <div className="flex flex-col space-y-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('home');
              }}
              className="group cursor-pointer w-fit focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-xl p-1"
              aria-label="MarcVerse Digital Solutions - Home"
            >
              <Logo size="md" />
            </a>
            
            <p className="font-sans text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Helping businesses grow through professional website design, branding, graphic design and customized digital solutions.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 hover:bg-emerald-50/10 dark:hover:bg-emerald-500/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    aria-label={`Visit our ${social.label}`}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-sans font-semibold text-[13px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScrollTo(link.target)}
                    className="group inline-flex items-center gap-1.5 font-sans text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded px-1.5 py-0.5 -ml-1.5"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-emerald-500 dark:text-emerald-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Our Services */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-sans font-semibold text-[13px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Services
            </h3>
            <ul className="space-y-3.5">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScrollTo(link.target)}
                    className="group inline-flex items-center gap-1.5 font-sans text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded px-1.5 py-0.5 -ml-1.5"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact Info */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-sans font-semibold text-[13px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Contact
            </h3>
            <ul className="space-y-4">
              {/* Email */}
              <li className="flex items-start gap-3 group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-50/10 dark:group-hover:bg-emerald-500/5 transition-all duration-300 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-none mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:imacdigitas@outlook.com"
                    className="font-sans text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 outline-none focus:underline break-all"
                  >
                    imacdigitas@outlook.com
                  </a>
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex items-start gap-3 group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-50/10 dark:group-hover:bg-emerald-500/5 transition-all duration-300 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-none mb-1">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/2348136056864"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="font-sans text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 outline-none focus:underline"
                  >
                    08136056864
                  </a>
                </div>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500 leading-none mb-1">
                    Location
                  </span>
                  <span className="font-sans text-sm text-zinc-600 dark:text-zinc-300">
                    Ikorodu, Lagos, Nigeria
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom / Copyright & Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="font-sans text-xs text-zinc-450 dark:text-zinc-500 text-center sm:text-left leading-relaxed">
            &copy; {currentYear} MarcVerse Digital Solutions. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 select-none opacity-45 hover:opacity-100 transition-opacity duration-300">
              <Logo variant="icon" size="sm" iconClassName="!w-5 !h-5 !rounded-md" />
              <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-400">
                Innovative Media &amp; Tech
              </span>
            </div>

            {/* Back to Top integrated anchor button */}
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-450 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/20 dark:hover:border-emerald-400/20 hover:bg-emerald-50/10 dark:hover:bg-emerald-500/5 transition-all duration-300 font-sans text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
