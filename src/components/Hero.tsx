import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGES = [
  "/images/WhatsApp Image 2026-06-03 at 13.24.47 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.47 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.47.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.48.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.49 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.49 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.49 (3).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.49.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.50.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.51 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.51 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.51.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.52 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.52 (2) (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.52 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.52.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.53.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.54 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.54 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.54.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.55 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.55.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.56.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.57 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.57.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.58 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.58 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.58.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.59 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.59 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.24.59.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.25.00 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.25.00.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.25.01.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.13 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.13 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.13 (3).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.13.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.14 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.14 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.14.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.15 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.15 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.15.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.16 (1) (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.16 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.16 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.16.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.17 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.17 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.17.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.18 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.18 (2).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.18 (3).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.18.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.19 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.19.jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.20 (1).jpeg",
  "/images/WhatsApp Image 2026-06-03 at 13.27.20.jpeg"
];

const IMAGES = Array.from({ length: 80 }, (_, i) => BASE_IMAGES[i % BASE_IMAGES.length]);

const HERO_THEMES = [
  { name: 'Terracotta', accent: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  { name: 'Oasis', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Indigo', accent: '#818cf8', glow: 'rgba(129, 140, 248, 0.4)' },
  { name: 'Ochre', accent: '#d97706', glow: 'rgba(217, 119, 6, 0.4)' },
];

const marqueeRows = [
  { imgs: IMAGES.slice(0, 15),  dir: 1,  speed: 80, size: 'h-[25vh]', aspect: 'aspect-[3/4]' },
  { imgs: IMAGES.slice(15, 30), dir: -1, speed: 70, size: 'h-[22vh]', aspect: 'aspect-[4/3]' },
  { imgs: IMAGES.slice(30, 45), dir: 1,  speed: 90, size: 'h-[28vh]', aspect: 'aspect-[4/5]' },
  { imgs: IMAGES.slice(45, 60), dir: -1, speed: 75, size: 'h-[20vh]', aspect: 'aspect-square' },
];

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState(0);

  // Cycle themes every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % HERO_THEMES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // 1. Infinite Looping Marquees
    const rows = gsap.utils.toArray<HTMLElement>('.marquee-row');
    rows.forEach((row, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const speed = 40 + (i * 10);
      
      gsap.to(row, {
        x: dir === 1 ? "-50%" : "0%",
        duration: speed,
        repeat: -1,
        ease: "none",
        force3D: true,
      }).progress(Math.random());
    });

    // 2. Scroll Trigger: Parallax and Fade
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.to(marqueeRef.current, { y: 200, opacity: 0.2, scale: 1.1, ease: "none" }, 0);
    tl.to(contentRef.current, { y: -100, opacity: 0, scale: 0.9, ease: "none" }, 0);

  }, { scope: containerRef });

  // Animate theme colors
  useGSAP(() => {
    const theme = HERO_THEMES[currentTheme];
    gsap.to(containerRef.current, {
      '--hero-accent': theme.accent,
      '--hero-glow': theme.glow,
      duration: 3,
      ease: 'power2.inOut',
    });
  }, [currentTheme]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-brand-light flex items-center justify-center transition-colors duration-500"
      style={{ 
        '--hero-accent': HERO_THEMES[0].accent, 
        '--hero-glow': HERO_THEMES[0].glow,
      } as any}
    >
      
      {/* Top Scrim - Fixes Header Visibility */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-light/90 to-transparent z-[30] pointer-events-none" />

      {/* Background Marquee Gallery - Fully bright to appreciate artworks */}
      <div 
        ref={marqueeRef} 
        className="absolute inset-0 flex flex-col justify-center gap-4 transition-all duration-[3s]"
      >
        {marqueeRows.map((row, ri) => (
          <div 
            key={ri} 
            className="marquee-row-wrapper overflow-hidden whitespace-nowrap flex w-full"
          >
            <div className={`marquee-row flex gap-4 pr-4 ${row.dir === -1 ? '-translate-x-1/2' : ''}`}>
              {[...row.imgs, ...row.imgs].map((src, i) => (
                <div 
                  key={i} 
                  className={`${row.size} ${row.aspect} flex-shrink-0 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xl bg-brand-muted/20`}
                >
                  <img 
                    src={src} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105" 
                    loading={ri < 2 ? "eager" : "lazy"} 
                    fetchPriority={ri < 2 ? "high" : "low"}
                    decoding={ri < 2 ? "sync" : "async"}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subtle edge fading so it doesn't look abruptly cut off */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none opacity-50" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-light to-transparent z-10 pointer-events-none opacity-70" />

      {/* Center Content Overlay - Double Bezel Glass Card */}
      <div ref={contentRef} className="relative z-20 mx-4 sm:mx-6 max-w-3xl w-full">
        {/* Dynamic Glow behind the glass card */}
        <div className="absolute -inset-6 bg-[var(--hero-glow)] blur-3xl rounded-full opacity-50 transition-colors duration-[3s] pointer-events-none" />
        
        {/* Outer Shell (Double-Bezel) */}
        <div className="p-1.5 sm:p-2 bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl">
          
          {/* Inner Core */}
          <div className="relative px-6 py-8 md:px-12 md:py-10 rounded-[calc(2.5rem-0.5rem)] bg-brand-light/65 dark:bg-brand-dark/65 flex flex-col items-center border border-brand-light/20 dark:border-brand-dark/20">
            
            {/* Location Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[var(--hero-accent)] transition-colors duration-[3s]"></div>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--hero-accent)] font-bold transition-colors duration-[3s]">
                {t('hero.location')}
              </span>
              <div className="h-[1px] w-8 bg-[var(--hero-accent)] transition-colors duration-[3s]"></div>
            </div>

            {/* Title (Compact & Premium sizing) */}
            <h1 
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.0] text-brand-dark tracking-tighter mb-4 text-center drop-shadow-sm"
              dangerouslySetInnerHTML={{ __html: t('hero.title').replace('À ', 'À<br/>') }}
            />

            {/* Description (More readable sizing & width) */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-brand-dark/80 max-w-xl leading-relaxed tracking-wide text-center balance-text">
              {t('hero.description')}
            </p>

            {/* Island Button CTA with hover physics */}
            <div className="mt-6 md:mt-8">
              <a 
                href="#gallery" 
                className="group flex items-center gap-3 bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark pl-6 pr-2 py-2 rounded-full hover:bg-[var(--hero-accent)] dark:hover:bg-[var(--hero-accent)] dark:hover:text-white transition-all duration-300 active:scale-[0.97] shadow-lg"
              >
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-current">
                  {t('hero.cta')}
                </span>
                <div className="w-7 h-7 rounded-full bg-brand-light/10 dark:bg-brand-dark/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <ArrowUpRight size={12} className="text-current" />
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* External elegant scroll-down indicator at viewport bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2">
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-brand-dark/40 dark:text-brand-light/40">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-brand-dark/40 dark:from-brand-light/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[var(--hero-accent)]"
          />
        </div>
      </div>
    </div>
  );
}
