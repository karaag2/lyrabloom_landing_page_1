import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const artworks = [
  {
    id: 1,
    title: "piece1",
    size: "120x80",
    image: "/images/composites/composite_1.png",
    classes: "col-span-2 row-span-2 aspect-[3/2] md:aspect-auto",
    speed: -0.1
  },
  {
    id: 2,
    title: "piece2",
    size: "90x90",
    image: "/images/composites/composite_2.png",
    classes: "col-span-1 row-span-1 aspect-[3/2]",
    speed: 0.15
  },
  {
    id: 3,
    title: "piece3",
    size: "100x140",
    image: "/images/composites/composite_3.png",
    classes: "col-span-1 row-span-2 aspect-[3/2]",
    speed: -0.05
  },
  {
    id: 4,
    title: "piece4",
    size: "150x50",
    image: "/images/composites/composite_4.png",
    classes: "col-span-2 row-span-1 aspect-[3/2]",
    speed: 0.08
  },
  {
    id: 5,
    title: "piece5",
    size: "80x100",
    image: "/images/composites/composite_5.png",
    classes: "col-span-1 row-span-1 aspect-[3/2]",
    speed: -0.12
  }
];

export function Gallery() {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="gallery" ref={targetRef} className="py-32 md:py-48 bg-brand-light px-6 md:px-20">
      
      <div className="flex flex-col items-center text-center mb-20 md:mb-32">
        <h2 className="font-serif text-6xl md:text-8xl tracking-tighter mb-6 relative">
          <span className="relative z-10">{t('gallery.title')}</span>
          <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 z-0 opacity-40 text-brand-terracotta" viewBox="0 0 200 40">
            <path d="M10,20 Q100,0 190,20" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M10,25 Q100,5 190,25" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </h2>
        <p className="font-sans text-sm tracking-[0.2em] uppercase text-brand-dark/50">{t('gallery.subtitle')}</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 md:gap-10 auto-rows-min">
          {artworks.map((art) => {
            const y = useTransform(scrollYProgress, [0, 1], ["0%", `${art.speed * 200}%`]);
            
            return (
              <motion.div 
                key={art.id} 
                className={`relative group rounded-[2rem] overflow-hidden ${art.classes}`}
                style={{ y }}
              >
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={art.image} 
                  alt={t(`gallery.artworks.${art.title}`)} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="font-serif text-2xl md:text-3xl mb-1">{t(`gallery.artworks.${art.title}`)}</h3>
                  <p className="font-sans text-xs md:text-sm text-white/80 mb-4 line-clamp-2">{t(`gallery.artworks.desc_${art.title}`)}</p>
                  <div className="flex justify-between items-center font-sans border-t border-white/20 pt-3 mt-auto">
                    <span className="text-[10px] md:text-xs tracking-widest uppercase opacity-80">{t('gallery.category')}</span>
                    <span className="text-xs md:text-sm font-semibold">{t('gallery.dimensions')} : {art.size} cm</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-32 flex justify-center">
        <Link href="/galerie" className="relative px-12 py-5 border border-brand-dark rounded-full overflow-hidden group">
          <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
          <span className="relative z-10 font-sans text-xs tracking-[0.2em] uppercase font-bold text-brand-dark group-hover:text-brand-light transition-colors duration-500">
            {t('gallery.cta')}
          </span>
        </Link>
      </div>

    </section>
  );
}
