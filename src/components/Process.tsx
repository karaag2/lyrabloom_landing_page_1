import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title: t('process.step1.title'),
      desc: t('process.step1.desc'),
      img: "/images/composites/composite_1.png"
    },
    {
      num: "02",
      title: t('process.step2.title'),
      desc: t('process.step2.desc'),
      img: "/images/composites/composite_2.png"
    },
    {
      num: "03",
      title: t('process.step3.title'),
      desc: t('process.step3.desc'),
      img: "/images/composites/composite_3.png"
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Tighter scroll for better flow
        pin: true,
        scrub: 0.5, // Faster response
        anticipatePin: 1,
      }
    });

    // Initial state for all but the first
    gsap.set(".process-step:not(:first-child)", { opacity: 0, y: 30 });
    gsap.set(".process-image:not(:first-child)", { opacity: 0, scale: 1.05 });
    
    // Constant subtle motion for the active image
    steps.forEach((_, i) => {
      // Each step gets its own phase in the timeline
      const label = `step-${i}`;
      
      // 1. Active Phase: Progress bar fills and image subtly drifts
      tl.to(`.progress-bar-${i}`, { width: "100%", duration: 1, ease: "none" }, label)
        .to(`.process-image-${i}`, { scale: 1.05, duration: 1, ease: "none" }, label);

      if (i < steps.length - 1) {
        // 2. Transition OUT of current / IN to next
        // We overlap these heavily to ensure constant motion
        tl.to(`.process-step-${i}`, { opacity: 0, y: -30, duration: 0.5 }, `${label}+=0.8`)
          .to(`.process-image-${i}`, { opacity: 0, scale: 1.1, duration: 0.5 }, `${label}+=0.8`)
          
          .fromTo(`.process-step-${i + 1}`, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.5 }, 
            `${label}+=0.9` // Starts almost immediately after out begins
          )
          .fromTo(`.process-image-${i + 1}`, 
            { opacity: 0, scale: 1.05 }, 
            { opacity: 1, scale: 1, duration: 0.5 }, 
            `${label}+=0.9`
          );
      }
    });

  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="relative bg-brand-light overflow-hidden">
      <div className="h-screen w-full flex flex-col md:flex-row pt-20 md:pt-[100px] pb-8">
        
        {/* Left Column - Images */}
        <div ref={leftColumnRef} className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden bg-brand-dark">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 process-image process-image-${i}`}
            >
              <img 
                src={step.img} 
                alt={step.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
            </div>
          ))}
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)] pointer-events-none"></div>
        </div>

        {/* Right Column - Content */}
        <div ref={rightColumnRef} className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center p-8 md:p-24 relative bg-brand-light">
          <div className="w-full relative h-[400px]">
            {steps.map((step, i) => (
              <div 
                key={i}
                className={`absolute inset-0 flex flex-col justify-center process-step process-step-${i}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-brand-ochre"></div>
                  <span className="font-sans text-brand-ochre text-sm font-bold tracking-[0.3em] uppercase">{step.num}</span>
                </div>
                <h3 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1] text-brand-dark">{step.title}</h3>
                <p className="font-sans text-lg md:text-xl text-brand-dark/70 leading-relaxed max-w-lg">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute left-8 md:left-24 bottom-12 flex gap-3">
            {steps.map((_, i) => (
              <div key={i} className="h-1 w-8 bg-brand-dark/10 rounded-full overflow-hidden">
                <div className={`h-full bg-brand-ochre w-0 progress-bar-${i}`}></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
