import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Impact() {
  const { t } = useTranslation();
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bgCirclesRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  useGSAP(() => {
    // 1. Gentle background parallax
    gsap.to(bgCirclesRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Premium Unmasking Reveal for the image
    gsap.fromTo(imageWrapperRef.current, 
      { clipPath: "inset(100% 0% 0% 0% round 24px)" },
      { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.5, ease: "power3.inOut", scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
      }}
    );

    // 3. Gentle container parallax (prevents inner image cropping)
    gsap.fromTo(imageWrapperRef.current,
      { y: 40 },
      { y: -40, ease: "none", scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
      }}
    );

    // 4. Floating Glass Badge entrance
    gsap.fromTo(badgeRef.current,
      { y: 40, opacity: 0, rotate: 5 },
      { y: 0, opacity: 1, rotate: 0, duration: 1.2, delay: 0.6, ease: "back.out(1.5)", scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
      }}
    );
  }, { scope: container });

  // 3D Magnetic Hover Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageWrapperRef.current || !imageRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = imageWrapperRef.current.getBoundingClientRect();
    
    // Normalized coordinates from -0.5 to 0.5
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(imageWrapperRef.current, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.8,
      ease: "power2.out",
      transformPerspective: 1200,
    });
    
    gsap.to(imageRef.current, {
      x: -x * 30,
      y: -y * 30,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(badgeRef.current, {
      x: x * 40,
      y: y * 40,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to([imageWrapperRef.current, imageRef.current, badgeRef.current], {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section id="impact" ref={container} className="py-32 md:py-48 bg-brand-dark text-brand-sand px-6 md:px-20 overflow-hidden relative">
      
      {/* Background Graphic */}
      <div ref={bgCirclesRef} className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center">
         <motion.div 
           className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border-[1px] border-brand-sand rounded-full absolute"
           animate={{ rotate: 360 }}
           transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
         />
         <motion.div 
           className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] border-[1px] border-brand-sand rounded-full absolute"
           animate={{ rotate: -360 }}
           transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
         />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2" ref={textRef}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-8 rounded-full border border-brand-terracotta flex items-center justify-center font-serif text-brand-terracotta text-sm">L</span>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-sand/60">{t('impact.badge')}</span>
            </div>
            
            <h2 
              className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8" 
              dangerouslySetInnerHTML={{ 
                __html: t('impact.title')
                  .replace('au cœur de', '<br/> <span className="italic text-brand-terracotta">au cœur de</span> <br/>')
                  .replace('a heart for', '<br/> <span className="italic text-brand-terracotta">a heart for</span> <br/>') 
              }} 
            />
            
            <p className="font-sans text-lg text-brand-sand/70 max-w-md leading-relaxed mb-12">
              {t('impact.desc')}
            </p>

            <a href="mailto:contact@lyrabloom.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-brand-sand flex items-center justify-center group-hover:bg-brand-sand group-hover:text-brand-dark transition-colors duration-300">
                <svg className="w-4 h-4 translate-x-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-brand-sand">{t('impact.cta')}</span>
            </a>
          </motion.div>
        </div>

        {/* Interactive Image Presentation */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative perspective-1000">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-ochre/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div 
            className="relative w-full max-w-[500px] aspect-[4/5] cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={imageWrapperRef}
              className="w-full h-full overflow-hidden shadow-2xl relative bg-brand-dark/50"
              style={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
            >
              <img 
                ref={imageRef}
                src="/images/composites/composite_6.png" 
                alt={t('impact.alt_interior')} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px]"></div>
            </div>

            {/* Floating Glassmorphism Badge */}
            <div 
              ref={badgeRef}
              className="absolute -bottom-6 -right-6 md:-right-12 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-4 z-10"
            >
              <div className="w-10 h-10 rounded-full bg-brand-ochre/20 flex items-center justify-center border border-brand-ochre/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.99989 10C4.99989 6.13401 8.1339 3 11.9999 3C15.8659 3 18.9999 6.13401 18.9999 10C18.9999 14 14.4999 19.5 11.9999 21.5C9.49989 19.5 4.99989 14 4.99989 10Z" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/50 mb-1">Impact</p>
                <p className="font-serif text-white/90 text-sm">Soutien Local</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
