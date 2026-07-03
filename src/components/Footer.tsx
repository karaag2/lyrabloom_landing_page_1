import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-light text-brand-dark pt-32 pb-10 px-6 md:px-20 relative overflow-hidden flex flex-col items-center">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-20 md:mb-40 z-10 gap-12">
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="Lyrabloom Logo" className="h-12 md:h-14 w-auto object-contain drop-shadow-sm" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-dark/50 mt-[2px]">{t('footer.contact_orders')}</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none">
            {t('footer.sublime')}<br/>
            <span className="italic text-brand-terracotta">{t('footer.your_walls')}</span>
          </h2>
        </div>
        
        <div className="flex flex-col gap-8 w-full md:w-auto">
          <p className="font-sans text-lg max-w-xs leading-relaxed text-brand-dark/80">
            {t('footer.delivery_info')}
          </p>
          <a href="mailto:contact@lyrabloom.com" className="flex items-center justify-between w-full md:w-auto gap-12 bg-brand-dark text-brand-light px-8 py-5 rounded-full hover:bg-brand-terracotta transition-colors group">
            <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold pt-1">{t('footer.write_us')}</span>
            <div className="w-8 h-8 rounded-full bg-brand-sand/10 flex items-center justify-center group-hover:bg-brand-sand/20 transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </a>
        </div>
      </div>

      {/* Huge Background Text */}
      <div className="w-full text-center relative z-0 mb-10">
        <h2 className="font-serif text-[18vw] leading-[0.75] whitespace-nowrap text-brand-ochre opacity-20">
          LYRABLOOM
        </h2>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-brand-dark/10 pt-10">
        <div className="font-sans text-xs tracking-widest uppercase text-brand-dark/50 flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-8 w-auto object-contain opacity-80" />
          <span>&copy; {new Date().getFullYear()} Lyrabloom Niger. {t('footer.rights_reserved')}</span>
        </div>
        
        <div className="flex gap-8 font-sans text-xs tracking-widest uppercase text-brand-dark/80 font-bold">
          <a href="#" className="hover:text-brand-terracotta transition-colors">{t('footer.instagram')}</a>
          <a href="#" className="hover:text-brand-terracotta transition-colors">{t('footer.facebook')}</a>
          <a href="#" className="hover:text-brand-terracotta transition-colors">{t('footer.linkedin')}</a>
        </div>

        <div className="flex gap-8 font-sans text-xs tracking-widest uppercase text-brand-dark/50">
          <a href="#" className="hover:text-brand-dark transition-colors">{t('footer.legal_mentions')}</a>
          <a href="#" className="hover:text-brand-dark transition-colors">{t('footer.privacy')}</a>
        </div>
      </div>
    </footer>
  );
}
