import { Sun, Moon, Palette, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function ModeToggle({ variant = 'default' }: { variant?: 'default' | 'overlay' }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: "light", icon: Sun, label: "Clair" },
    { id: "dark", icon: Moon, label: "Sombre" },
    { id: "sahel", icon: Palette, label: "Sahel" },
    { id: "system", icon: Monitor, label: "Système" },
  ] as const;

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  const isOverlay = variant === 'overlay';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 rounded-full px-4 py-2 transition-all duration-300 border ${
          isOverlay
            ? 'border-white/20 text-white/60 hover:bg-white/10 hover:text-white'
            : 'border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-brand-light'
        }`}
      >
        <currentTheme.icon size={16} />
        <span className="font-sans text-[10px] tracking-[0.2em] font-bold uppercase mt-[1px] hidden md:inline">
          {currentTheme.label}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute right-0 mt-4 w-48 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden border ${
                isOverlay
                  ? 'bg-black/90 backdrop-blur-xl border-white/10'
                  : 'bg-brand-light border-brand-dark/10'
              }`}
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl text-xs font-sans tracking-widest uppercase transition-colors ${
                    theme === t.id
                      ? "bg-brand-primary text-white"
                      : isOverlay
                        ? "text-white/60 hover:bg-white/10 hover:text-white"
                        : "text-brand-dark hover:bg-brand-dark/5"
                  }`}
                >
                  <t.icon size={14} />
                  <span>{t.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
