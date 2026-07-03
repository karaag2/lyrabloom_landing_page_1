"use client";

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: t('nav.home'), href: '/', isRoute: true },
    { label: t('nav.vision'), href: '#vision' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.gallery'), href: '/galerie', isRoute: true },
  ];

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  // Track scroll to add backdrop glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled && !isOpen
            ? 'bg-brand-light/80 backdrop-blur-xl shadow-sm border-b border-brand-dark/5 py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="px-4 sm:px-6 md:px-10 flex justify-between items-center max-w-[1800px] mx-auto">
          <Link
            href="/"
            className="flex items-center gap-3 md:gap-4 shrink-0 pointer-events-auto group"
          >
            <img 
              src="/logo.png" 
              alt="Lyrabloom Logo" 
              className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-500 origin-left group-hover:scale-105 drop-shadow-md" 
            />
            <span 
              className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-widest transition-colors duration-500 ${
                isOpen ? 'text-brand-sand' : 'text-brand-dark'
              }`}
            >
              LYRABLOOM
            </span>
          </Link>

          {/* Desktop Links — center */}
          <div className={`hidden lg:flex gap-8 xl:gap-12 items-center font-sans text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${
            isOpen ? 'text-brand-sand/70' : 'text-brand-dark/70 font-medium'
          }`}>
            {navLinks.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-brand-primary transition-colors duration-300 flex items-center gap-1 group relative"
                >
                  {link.label}
                  {link.href !== '/' && <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary group-hover:w-full transition-all duration-300`} />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-brand-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
          </div>

          {/* Right side: Language + Theme toggle + Menu button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`flex items-center gap-2 transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all duration-300 font-sans text-[9px] tracking-widest uppercase font-bold ${
                  isOpen 
                    ? 'border-white/20 text-white hover:bg-white hover:text-brand-dark' 
                    : 'border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-brand-light'
                }`}
              >
                <Languages size={12} />
                <span>{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
              </button>
              <ModeToggle />
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 sm:gap-3 border rounded-full px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-500 relative z-[101] group min-h-[40px] ${
                isOpen
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-brand-light'
              }`}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className={`font-sans text-[9px] tracking-[0.3em] font-bold uppercase mt-[1px] hidden sm:inline transition-colors`}>
                {isOpen ? t('nav.close') : t('nav.menu')}
              </span>
              <div className="relative w-4 h-4">
                <motion.div 
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -3 }}
                  className={`absolute inset-0 m-auto h-[1.5px] w-full bg-current transition-transform`}
                />
                <motion.div 
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 3 }}
                  className={`absolute inset-0 m-auto h-[1.5px] w-full bg-current transition-transform`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Fullscreen Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99] bg-brand-dark"
          >
            {/* Background decorative element */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.03 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full h-full font-serif text-[40vw] leading-none text-brand-sand flex items-center justify-center select-none">
                L
              </div>
            </motion.div>

            {/* Main content — split layout on desktop */}
            <div className="h-full flex flex-col lg:flex-row">
              {/* Left side — Navigation links */}
              <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-24 pt-24 lg:pt-0">
                {/* Section label */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center gap-4 mb-8 lg:mb-12"
                >
                  <div className="w-8 h-[1px] bg-brand-terracotta" />
                  <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-brand-sand/30">
                    {t('nav.navigation') || 'Navigation'}
                  </span>
                </motion.div>

                {/* Links */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {link.isRoute ? (
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-baseline gap-4 sm:gap-6 py-3 sm:py-4 border-b border-brand-sand/5 hover:border-brand-terracotta/30 transition-all duration-500"
                        >
                          <span className="font-sans text-[10px] tracking-[0.15em] text-brand-sand/20 group-hover:text-brand-terracotta transition-colors w-6">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-sand group-hover:text-brand-terracotta transition-colors duration-500 leading-tight">
                            {link.label}
                          </span>
                          <ArrowUpRight size={18} className="text-brand-sand/0 group-hover:text-brand-terracotta transition-all duration-500 -translate-x-2 group-hover:translate-x-0 mt-2" />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-baseline gap-4 sm:gap-6 py-3 sm:py-4 border-b border-brand-sand/5 hover:border-brand-terracotta/30 transition-all duration-500"
                        >
                          <span className="font-sans text-[10px] tracking-[0.15em] text-brand-sand/20 group-hover:text-brand-terracotta transition-colors w-6">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-sand group-hover:text-brand-terracotta transition-colors duration-500 leading-tight">
                            {link.label}
                          </span>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right side — Meta info (desktop only) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="lg:w-[35%] flex flex-col justify-between px-8 sm:px-12 md:px-20 lg:px-16 pb-8 lg:pb-16 pt-8 lg:pt-24"
              >
                {/* Language & Theme toggle */}
                <div className="flex flex-col gap-8 justify-start lg:items-end">
                  <div>
                    <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-brand-sand/25 mb-3 lg:text-right">
                      {t('nav.language') || 'Langue'}
                    </span>
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center gap-2 px-6 py-3 border border-brand-sand/20 rounded-full hover:bg-brand-sand hover:text-brand-dark transition-all duration-300 font-sans text-xs tracking-widest uppercase font-bold text-brand-sand"
                    >
                      <Languages size={16} />
                      <span>{i18n.language === 'fr' ? 'English' : 'Français'}</span>
                    </button>
                  </div>
                  <div>
                    <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-brand-sand/25 mb-3 lg:text-right">
                      {t('nav.appearance') || 'Apparence'}
                    </span>
                    <ModeToggle variant="overlay" />
                  </div>
                </div>

                {/* Contact / Info */}
                <div className="flex flex-row lg:flex-col gap-8 lg:gap-12 text-brand-sand/40 lg:items-end">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="lg:text-right"
                  >
                    <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-brand-sand/25 mb-2">
                      {t('nav.location_label') || 'Localisation'}
                    </span>
                    <p className="font-serif text-sm sm:text-base text-brand-sand/60">
                      {t('hero.location')}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="lg:text-right"
                  >
                    <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-brand-sand/25 mb-2">
                      {t('nav.studio') || 'Studio'}
                    </span>
                    <p className="font-serif text-sm sm:text-base text-brand-sand/60">
                      {t('gallery.studio')}
                    </p>
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="hidden lg:block lg:text-right"
                >
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-sand/20">
                    © 2026 Lyrabloom
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute bottom-6 left-0 w-full text-center lg:hidden px-4"
            >
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-sand/25">
                © 2026 Lyrabloom
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
