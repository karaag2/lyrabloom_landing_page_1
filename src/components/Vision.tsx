import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Vision() {
  const { t } = useTranslation();
  const container = useRef<HTMLElement>(null);
  
  // Refs for the 3D parallax elements (decoupled scroll wrappers vs mouse tilt elements)
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const bgImageWrapperRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  
  const floatingCanvas1ScrollRef = useRef<HTMLDivElement>(null);
  const floatingCanvas1Ref = useRef<HTMLDivElement>(null);
  
  const floatingCanvas2ScrollRef = useRef<HTMLDivElement>(null);
  const floatingCanvas2Ref = useRef<HTMLDivElement>(null);
  
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Refs for text layers
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phrase3Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Split calculations based on dynamic translation strings
  const visionText = t('vision.text');
  
  // Phrase 2 split (Part 1: normal, Part 2: italic terracotta highlight)
  const p2Parts = visionText.split(': ');
  const p2Normal = p2Parts[0] ? p2Parts[0].trim() : '';
  const p2Highlight = p2Parts[1] ? p2Parts[1].split('. ')[0].trim() : '';
  
  const p2NormalWords = p2Normal ? p2Normal.split(' ') : [];
  const p2HighlightWords = p2Highlight ? p2Highlight.split(' ') : [];
  
  // Phrase 3 split (remaining sentence)
  const p3Text = visionText.split('. ')[1] ? visionText.split('. ')[1].trim() : '';
  const p3Words = p3Text ? p3Text.split(' ') : [];

  // Brand letter split
  const brandName = "Lyrabloom";
  const brandChars = brandName.split("");

  useGSAP(() => {
    // 1. Decorative background text slow parallax
    gsap.fromTo(".bg-text-parallax", 
      { x: "-8%" }, 
      { x: "8%", ease: "none", scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }}
    );

    // 2. Pinned Scroll-Choreographed Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    // Initial setups (zero values/hidden/rotated)
    gsap.set(".brand-char", { y: "110%", rotate: 15, scale: 0.8 });
    gsap.set(".phrase2-word", { y: "110%", rotate: 6, skewY: 4 });
    gsap.set(".phrase3-word", { y: "110%", rotate: -6, skewY: -4 });
    
    gsap.set(phrase2Ref.current, { opacity: 0, scale: 0.95 });
    gsap.set(phrase3Ref.current, { opacity: 0, scale: 0.95 });
    gsap.set(bgImageWrapperRef.current, { scale: 0.9, rotate: -2 });
    gsap.set(floatingCanvas1ScrollRef.current, { xPercent: 130, opacity: 0, rotate: 12 });
    gsap.set(floatingCanvas2ScrollRef.current, { xPercent: -130, opacity: 0, rotate: -12 });
    gsap.set(statsRef.current, { opacity: 0, y: 30 });
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.8 });

    // 3. Entrance: Bounce-in letters of the brand name Lyrabloom initially
    gsap.to(".brand-char", {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.05,
      ease: "back.out(1.6)"
    });

    // 4. Choreographing the scroll timeline sequence
    // A. Letters fly away as background canvas slides into clean focus
    tl.to(".brand-char", { y: -80, opacity: 0, rotate: -10, scale: 0.9, stagger: 0.03, duration: 1 })
      .to(bgImageWrapperRef.current, { scale: 1, rotate: 0, duration: 1.2, ease: "power2.out" }, "<")
      
      // B. Reveal Phrase 2 (frosted plaque slides up, words roll out dynamically in a stagger wave)
      .to(phrase2Ref.current, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.3")
      .to(".phrase2-word", { y: 0, rotate: 0, skewY: 0, duration: 1.2, stagger: 0.03, ease: "power3.out" }, "<")
      .to(floatingCanvas1ScrollRef.current, { xPercent: 0, opacity: 1, rotate: -3, duration: 1.4, ease: "power3.out" }, "-=1.0")
      
      // C. Transition: Phrase 2 dims, Phrase 3 fades in (words roll in from opposite angle)
      .to(phrase2Ref.current, { opacity: 0.15, scale: 0.98, duration: 1 })
      .to(phrase3Ref.current, { opacity: 1, scale: 1, duration: 0.6 }, "<")
      .to(".phrase3-word", { y: 0, rotate: 0, skewY: 0, duration: 1.2, stagger: 0.025, ease: "power3.out" }, "<")
      .to(floatingCanvas2ScrollRef.current, { xPercent: 0, opacity: 1, rotate: 4, duration: 1.4, ease: "power3.out" }, "-=1.0")
      .to(bgImageWrapperRef.current, { scale: 1.05, x: -80, duration: 1.2 }, "<")
      
      // D. Reveal stats plaque & badge
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(badgeRef.current, { opacity: 1, scale: 1, duration: 0.8 }, "<");

  }, { scope: container });

  // Stereoscopic 3D Mouse Tilt (only manipulates the inner layers, completely separate from scroll properties)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!visualContainerRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = visualContainerRef.current.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // 1. Tilt the visual container base
    gsap.to(visualContainerRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.8,
      ease: "power2.out",
      transformPerspective: 1600,
      transformStyle: "preserve-3d"
    });
    
    // 2. Parallax background image shift
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        x: -x * 20,
        y: -y * 20,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // 3. Floating canvas 1 (top-right painting) lifts off canvas in 3D
    if (floatingCanvas1Ref.current) {
      gsap.to(floatingCanvas1Ref.current, {
        x: x * 45,
        y: y * 45,
        z: 70, // Lift off depth
        rotateZ: x * 4,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // 4. Floating canvas 2 (bottom-left painting) lifts off even closer
    if (floatingCanvas2Ref.current) {
      gsap.to(floatingCanvas2Ref.current, {
        x: x * 65,
        y: y * 65,
        z: 110, // Higher depth
        rotateZ: -x * 4,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // 5. Shift the floating glass badge
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: x * 40,
        y: y * 40,
        z: 90,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    // Reset all spring physics smoothly
    gsap.to(visualContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });
    
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
    }

    if (floatingCanvas1Ref.current) {
      gsap.to(floatingCanvas1Ref.current, {
        x: 0,
        y: 0,
        z: 0,
        rotateZ: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
    }

    if (floatingCanvas2Ref.current) {
      gsap.to(floatingCanvas2Ref.current, {
        x: 0,
        y: 0,
        z: 0,
        rotateZ: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
    }

    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
    }
  };

  return (
    <section 
      ref={container} 
      className="h-screen w-full relative overflow-hidden bg-[#0c0c0a] text-brand-sand select-none flex items-center justify-center"
    >
      {/* Huge background slow-parallax decorative typography */}
      <div className="absolute top-[12%] left-10 md:left-20 text-[24vw] font-serif leading-none opacity-[0.02] pointer-events-none select-none text-stroke-light whitespace-nowrap bg-text-parallax z-0">
        ROOTS
      </div>

      {/* Main stage wrapper */}
      <div className="relative w-full max-w-7xl h-full flex items-center justify-center px-6 md:px-20 z-10">
        
        {/* ==================== TYPOGRAPHY STAGE (Absolute layers, z-20) ==================== */}
        
        {/* Phrase 1: Display Brand Introduction (Letter Reveal) */}
        <div 
          ref={phrase1Ref}
          className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none text-left"
        >
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-brand-terracotta block mb-4">
            {t('vision.badge')}
          </span>
          <h2 className="font-serif text-[10vw] md:text-[6.5vw] leading-[0.9] italic text-brand-terracotta font-semibold flex overflow-hidden">
            {brandChars.map((char, i) => (
              <span key={i} className="inline-block overflow-hidden relative">
                <span className="inline-block brand-char">
                  {char}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Phrase 2: Core Statement in a high-contrast frosted glass card (Perfect Readability) */}
        <div 
          ref={phrase2Ref}
          className="absolute left-6 md:left-12 bottom-[26%] w-[90%] md:w-[48%] z-20 pointer-events-none text-left bg-[#0c0c0a]/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h3 className="font-serif text-3xl md:text-[2.5rem] leading-[1.2] text-white/95 font-medium flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1">
            {/* Render normal words */}
            {p2NormalWords.map((word, i) => (
              <span key={`n-${i}`} className="inline-block overflow-hidden pb-1">
                <span className="inline-block phrase2-word origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
            
            {/* Render colon */}
            <span className="inline-block overflow-hidden pb-1 text-white/95 mr-1">
              <span className="inline-block phrase2-word origin-bottom-left">
                :
              </span>
            </span>

            {/* Render highlighted words */}
            {p2HighlightWords.map((word, i) => (
              <span key={`h-${i}`} className="inline-block overflow-hidden pb-1">
                <span className="inline-block phrase2-word text-brand-terracotta italic font-semibold origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
            
            {/* Render period */}
            <span className="inline-block overflow-hidden pb-1 text-brand-terracotta italic font-semibold">
              <span className="inline-block phrase2-word origin-bottom-left">
                .
              </span>
            </span>
          </h3>
        </div>

        {/* Phrase 3: Elaborated Statement in a high-contrast frosted glass card */}
        <div 
          ref={phrase3Ref}
          className="absolute right-6 md:right-12 top-[24%] w-[85%] md:w-[40%] z-20 pointer-events-none text-left bg-[#0c0c0a]/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h3 className="font-serif text-2xl md:text-[1.85rem] leading-[1.35] text-white/85 font-normal italic flex flex-wrap gap-x-2 gap-y-1">
            {p3Words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1">
                <span className="inline-block phrase3-word origin-bottom-right">
                  {word}
                </span>
              </span>
            ))}
          </h3>
        </div>

        {/* Stats Plaque */}
        <div 
          ref={statsRef}
          className="absolute bottom-12 left-6 md:left-12 z-20 flex gap-12 md:gap-20 text-left border-t border-white/10 pt-8"
        >
          <div>
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/40 mb-2">
              {t('vision.foundation')}
            </p>
            <p className="font-serif text-base md:text-lg text-white/90 font-medium">
              {t('vision.location')}
            </p>
          </div>
          <div>
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/40 mb-2">
              {t('vision.essence')}
            </p>
            <p className="font-serif text-base md:text-lg text-white/90 font-medium">
              {t('vision.essence_text')}
            </p>
          </div>
        </div>

        {/* ==================== VISUAL EXHIBITION STAGE (Center, transform-style-3d) ==================== */}
        
        <div className="w-full max-w-[620px] aspect-[3/2] flex items-center justify-center relative perspective-[2000px] z-10 pointer-events-auto mt-20 md:mt-0">
          
          {/* Main Visual Tilt Box */}
          <div 
            ref={visualContainerRef}
            className="relative w-full h-full cursor-crosshair transform-style-3d shadow-[0_45px_120px_rgba(0,0,0,0.65)] bg-brand-dark/20 border border-white/5 overflow-visible"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* BACK LAYER: Studio Corner Backdrop (Scroll Scale & Shift wrapper) */}
            <div 
              ref={bgImageWrapperRef} 
              className="w-full h-full overflow-hidden rounded-[36px] relative transform-style-3d z-10"
            >
              <img 
                ref={bgImageRef}
                src="/images/composites/composite_4.png" 
                alt={t('vision.alt_interior')}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              {/* Gradient shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0c0c0a]/50 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[36px] pointer-events-none" />
            </div>

            {/* FOREGROUND LAYER 1: Top-Right Floating Canvas */}
            <div 
              ref={floatingCanvas1ScrollRef}
              className="absolute -top-14 -right-10 w-[30%] aspect-[3/4] z-20 pointer-events-none transform-style-3d"
            >
              <div 
                ref={floatingCanvas1Ref}
                className="w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] border-[4px] border-white transform-style-3d"
              >
                <img 
                  src="/images/WhatsApp Image 2026-06-03 at 13.24.47 (1).jpeg" 
                  alt="" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/15 pointer-events-none" />
              </div>
            </div>

            {/* FOREGROUND LAYER 2: Bottom-Left Floating Canvas */}
            <div 
              ref={floatingCanvas2ScrollRef}
              className="absolute -bottom-16 -left-12 w-[34%] aspect-[4/3] z-30 pointer-events-none transform-style-3d"
            >
              <div 
                ref={floatingCanvas2Ref}
                className="w-full h-full rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-[4px] border-white transform-style-3d"
              >
                <img 
                  src="/images/WhatsApp Image 2026-06-03 at 13.24.51 (1).jpeg" 
                  alt="" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/15 pointer-events-none" />
              </div>
            </div>

            {/* FOREGROUND LAYER 3: Glassmorphism Exhibition Badge */}
            <div 
              ref={badgeRef}
              className="absolute bottom-6 right-6 p-4 md:p-5 rounded-2xl bg-[#0c0c0a]/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-4 z-40 transform-style-3d pointer-events-none"
            >
              <div className="w-9 h-9 rounded-full bg-brand-terracotta/20 flex items-center justify-center border border-brand-terracotta/30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#f43f5e" strokeWidth="1.5"/>
                  <path d="M12 8V16M8 12H16" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/50 mb-0.5">
                  Atelier
                </p>
                <p className="font-serif text-white/95 text-xs font-semibold">
                  Exposition Unique
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
