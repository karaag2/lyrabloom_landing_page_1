import { useState, useEffect, useRef, useMemo, useCallback, PointerEvent as ReactPointerEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ModeToggle } from '../components/ModeToggle';
import { useTheme } from '../components/theme-provider';
import { useTranslation } from 'react-i18next';

const BASE_IMAGES = [
  "/images/composites/composite_1.png",
  "/images/composites/composite_2.png",
  "/images/composites/composite_3.png",
  "/images/composites/composite_4.png",
  "/images/composites/composite_5.png",
  "/images/composites/composite_6.png",
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

const CAT_KEYS = ['portrait', 'abstract', 'landscape', 'mixed'];

const SharedLightbox = ({
  lightboxIdx,
  setLightboxIdx,
  t,
}: {
  lightboxIdx: number | null;
  setLightboxIdx: (idx: number | null) => void;
  t: any;
}) => {
  if (lightboxIdx === null) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-xl cursor-default p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setLightboxIdx(null)}
      >
        <motion.div
          className="relative max-w-full max-h-full md:max-w-[85vw] md:max-h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col justify-end"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={IMAGES[lightboxIdx]} alt="" className="max-w-full max-h-[85vh] object-contain mx-auto" decoding="async" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
            <h3 className="font-serif text-white text-2xl md:text-3xl mb-2 md:mb-3 drop-shadow-md">{t('gallery.piece_no')}{lightboxIdx + 1} - {t(`gallery.artworks.piece${(lightboxIdx % 5) + 1}`)}</h3>
            <p className="font-sans text-xs md:text-base text-white/90 mb-4 md:mb-6 max-w-3xl leading-relaxed drop-shadow-sm line-clamp-4 md:line-clamp-none overflow-y-auto max-h-[100px] md:max-h-none pointer-events-auto">
              {t(`gallery.artworks.desc_piece${(lightboxIdx % 5) + 1}`)}
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 border-t border-white/20 pt-3 md:pt-5">
              <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/50">{t('gallery.studio_location')}</span>
              <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block" />
              <span className="font-sans text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-brand-terracotta/70">
                {t(`gallery.filter_${CAT_KEYS[lightboxIdx % CAT_KEYS.length]}`)}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block" />
              <span className="font-sans text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-white/70 mt-1 md:mt-0 w-full md:w-auto">
                {t('gallery.dimensions')} : {["120x80", "90x90", "100x140", "150x50", "80x100"][lightboxIdx % 5]} cm
              </span>
            </div>
          </div>
        </motion.div>

        <button
          className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white z-[61]"
          onClick={() => setLightboxIdx(null)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <button
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white text-xl z-[61]"
          onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + IMAGES.length) % IMAGES.length); }}
        >‹</button>
        <button
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white text-xl z-[61]"
          onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % IMAGES.length); }}
        >›</button>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── MODE 1: Marquee Scroll ─────────────────────────────────────────── */
const marqueeRows = [
  { imgs: IMAGES.slice(0, 12),  dir: 1,  speed: 50, size: 'h-[22vh] md:h-[28vh]', aspect: 'aspect-[3/4]' },
  { imgs: IMAGES.slice(12, 26), dir: -1, speed: 40, size: 'h-[18vh] md:h-[24vh]', aspect: 'aspect-[4/3]' },
  { imgs: IMAGES.slice(26, 40), dir: 1,  speed: 55, size: 'h-[25vh] md:h-[32vh]', aspect: 'aspect-[4/5]' },
  { imgs: IMAGES.slice(40, 54), dir: -1, speed: 45, size: 'h-[16vh] md:h-[22vh]', aspect: 'aspect-square' },
  { imgs: IMAGES.slice(54, 68), dir: 1,  speed: 48, size: 'h-[20vh] md:h-[26vh]', aspect: 'aspect-[3/4]' },
];

const HorizontalMarquee = () => {
  const { t } = useTranslation();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-center w-full h-full bg-[#0c0c0a] overflow-hidden relative gap-3 md:gap-5">
      {/* Ambient gradient edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0c0a] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0c0c0a] to-transparent z-20 pointer-events-none" />

      {/* Center floating title */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <div className="text-center flex flex-col items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Lyrabloom Logo" 
            className="h-32 md:h-44 w-auto object-contain mb-8 drop-shadow-md transition-transform duration-500 hover:scale-105" 
          />
          <div className="mix-blend-difference flex flex-col items-center justify-center">
            <h2 className="font-serif text-[12vw] md:text-[8vw] leading-[0.85] text-white/90 tracking-tighter">
              Lyra<em className="text-brand-terracotta/80">bloom</em>
            </h2>
            <p className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/30 mt-4">
              {t('gallery.works_count', { count: IMAGES.length })}
            </p>
          </div>
        </div>
      </motion.div>

      {marqueeRows.map((row, ri) => {
        const isPaused = hoveredRow === ri;
        const startX = row.dir === 1 ? '0%' : '-50%';
        const endX = row.dir === 1 ? '-50%' : '0%';

        return (
          <div
            key={ri}
            className="flex w-max"
            onMouseEnter={() => setHoveredRow(ri)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <motion.div
              className="flex gap-3 md:gap-5"
              animate={{ x: [startX, endX] }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: row.speed,
              }}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {[...row.imgs, ...row.imgs].map((src, i) => (
                <div
                  key={i}
                  className={`${row.size} ${row.aspect} shrink-0 overflow-hidden rounded-md relative group cursor-pointer`}
                  onClick={() => setLightboxIdx(IMAGES.indexOf(src))}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Hover reveal overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/70">
                        {t('gallery.piece_no')}{IMAGES.indexOf(src) + 1}
                      </span>
                    </div>
                  </div>
                  {/* Subtle border on hover */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/15 rounded-md transition-all duration-500 pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        );
      })}

      {/* Lightbox */}
      <SharedLightbox lightboxIdx={lightboxIdx} setLightboxIdx={setLightboxIdx} t={t} />
    </div>
  );
};

/* ─── MODE 2: Infinite Canvas ────────────────────────────────────────── */

// Canvas world dimensions
const CANVAS_W = 6000;
const CANVAS_H = 5000;

// Seeded random for deterministic layout
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// Generate clustered, organic image placements with depth layers
const canvasItems = (() => {
  const items: {
    x: number; y: number; w: number; h: number;
    depth: number; rotate: number; idx: number;
  }[] = [];

  const clusters = [
    { cx: 1200, cy: 800, r: 600, count: 12 },
    { cx: 3200, cy: 600, r: 500, count: 10 },
    { cx: 5000, cy: 900, r: 450, count: 8 },
    { cx: 800,  cy: 2400, r: 550, count: 10 },
    { cx: 2600, cy: 2200, r: 650, count: 14 },
    { cx: 4400, cy: 2500, r: 500, count: 10 },
    { cx: 1500, cy: 3800, r: 500, count: 9 },
    { cx: 3600, cy: 4000, r: 600, count: 12 },
  ];

  let imgIdx = 0;
  clusters.forEach((cl) => {
    for (let j = 0; j < cl.count && imgIdx < IMAGES.length; j++) {
      const angle = (j / cl.count) * Math.PI * 2 + (imgIdx * 0.7);
      const dist = cl.r * (0.3 + seededRandom(imgIdx + 42) * 0.7);
      const depth = imgIdx % 3;
      const baseSize = depth === 0 ? 140 : depth === 1 ? 220 : 320;
      const w = baseSize + (imgIdx % 5) * 30;
      const ratio = imgIdx % 3 === 0 ? 4/5 : imgIdx % 3 === 1 ? 5/4 : 1;
      const h = w / ratio;

      items.push({
        x: cl.cx + Math.cos(angle) * dist - w / 2,
        y: cl.cy + Math.sin(angle) * dist - h / 2,
        w, h, depth,
        rotate: ((imgIdx * 13) % 12) - 6,
        idx: imgIdx,
      });
      imgIdx++;
    }
  });
  return items;
})();

const InfiniteCanvas = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const minimapVpRef = useRef<HTMLDivElement>(null);
  const zoomLabelRef = useRef<HTMLSpanElement>(null);

  // Refs for 60fps direct DOM updates (no React re-renders)
  const camRef = useRef({ x: CANVAS_W / 2 - 700, y: CANVAS_H / 2 - 400 });
  const zoomRef = useRef(typeof window !== 'undefined' && window.innerWidth < 768 ? 0.3 : 0.55);
  const velocityRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0, camX: 0, camY: 0 });
  const lastDragRef = useRef({ x: 0, y: 0, t: 0 });
  const animFrameRef = useRef<number>(0);

  // Touch / pinch
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchRef = useRef<number | null>(null);

  // React state only for UI that truly needs re-render
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [hintVisible, setHintVisible] = useState(true);

  // ── Direct DOM update (runs every frame, no setState) ──
  const updateDOM = useCallback(() => {
    const { x, y } = camRef.current;
    const z = zoomRef.current;
    if (worldRef.current) {
      worldRef.current.style.transform = `scale(${z}) translate3d(${-x}px, ${-y}px, 0)`;
    }
    if (zoomLabelRef.current) {
      zoomLabelRef.current.textContent = `${Math.round(z * 100)}%`;
    }
    if (minimapVpRef.current && containerRef.current) {
      const ms = 120 / CANVAS_W;
      const vw = containerRef.current.clientWidth / z;
      const vh = containerRef.current.clientHeight / z;
      minimapVpRef.current.style.left = `${x * ms}px`;
      minimapVpRef.current.style.top = `${y * ms}px`;
      minimapVpRef.current.style.width = `${vw * ms}px`;
      minimapVpRef.current.style.height = `${vh * ms}px`;
    }
  }, []);

  // ── Momentum loop ──
  useEffect(() => {
    let active = true;
    const tick = () => {
      if (!isDragging && pointersRef.current.size === 0) {
        const { x: vx, y: vy } = velocityRef.current;
        if (Math.abs(vx) > 0.08 || Math.abs(vy) > 0.08) {
          camRef.current.x -= vx;
          camRef.current.y -= vy;
          velocityRef.current = { x: vx * 0.955, y: vy * 0.955 };
          updateDOM();
        }
      }
      if (active) animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    updateDOM();
    return () => { active = false; cancelAnimationFrame(animFrameRef.current); };
  }, [isDragging, updateDOM]);

  // ── Pointer handlers ──
  const onPointerDown = useCallback((e: ReactPointerEvent) => {
    if (lightboxIdx !== null) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      setIsDragging(true);
      setHintVisible(false);
      dragStartRef.current = { x: e.clientX, y: e.clientY, camX: camRef.current.x, camY: camRef.current.y };
      lastDragRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      velocityRef.current = { x: 0, y: 0 };
    } else if (pointersRef.current.size === 2) {
      setIsDragging(false);
      const pts = Array.from(pointersRef.current.values()) as { x: number; y: number }[];
      lastPinchRef.current = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [lightboxIdx]);

  const onPointerMove = useCallback((e: ReactPointerEvent) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1 && isDragging) {
      const dx = (e.clientX - dragStartRef.current.x) / zoomRef.current;
      const dy = (e.clientY - dragStartRef.current.y) / zoomRef.current;
      camRef.current = { x: dragStartRef.current.camX - dx, y: dragStartRef.current.camY - dy };

      const now = Date.now();
      const dt = Math.max(1, now - lastDragRef.current.t);
      velocityRef.current = {
        x: (e.clientX - lastDragRef.current.x) / dt * 16 / zoomRef.current,
        y: (e.clientY - lastDragRef.current.y) / dt * 16 / zoomRef.current,
      };
      lastDragRef.current = { x: e.clientX, y: e.clientY, t: now };
      updateDOM();
    } else if (pointersRef.current.size === 2 && containerRef.current) {
      const pts = Array.from(pointersRef.current.values()) as { x: number; y: number }[];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (lastPinchRef.current !== null) {
        const factor = dist / lastPinchRef.current;
        const rect = containerRef.current.getBoundingClientRect();
        const cx = (pts[0].x + pts[1].x) / 2;
        const cy = (pts[0].y + pts[1].y) / 2;
        const mx = (cx - rect.left) / zoomRef.current + camRef.current.x;
        const my = (cy - rect.top) / zoomRef.current + camRef.current.y;
        const nz = Math.min(3, Math.max(0.12, zoomRef.current * factor));
        camRef.current.x = mx - (cx - rect.left) / nz;
        camRef.current.y = my - (cy - rect.top) / nz;
        zoomRef.current = nz;
        updateDOM();
      }
      lastPinchRef.current = dist;
    }
  }, [isDragging, updateDOM]);

  const onPointerUp = useCallback((e: ReactPointerEvent) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) lastPinchRef.current = null;
    if (pointersRef.current.size === 0) setIsDragging(false);
  }, []);

  // ── Scroll-wheel zoom ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / zoomRef.current + camRef.current.x;
      const my = (e.clientY - rect.top) / zoomRef.current + camRef.current.y;
      const factor = e.deltaY > 0 ? 0.92 : 1.08;
      const nz = Math.min(3, Math.max(0.12, zoomRef.current * factor));
      camRef.current.x = mx - (e.clientX - rect.left) / nz;
      camRef.current.y = my - (e.clientY - rect.top) / nz;
      zoomRef.current = nz;
      updateDOM();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [updateDOM]);

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = 100 / zoomRef.current;
      if (e.key === 'ArrowLeft')  camRef.current.x -= s;
      if (e.key === 'ArrowRight') camRef.current.x += s;
      if (e.key === 'ArrowUp')    camRef.current.y -= s;
      if (e.key === 'ArrowDown')  camRef.current.y += s;
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === '+' || e.key === '=') zoomRef.current = Math.min(3, zoomRef.current * 1.15);
      if (e.key === '-') zoomRef.current = Math.max(0.12, zoomRef.current * 0.85);
      updateDOM();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [updateDOM]);

  // ── Smooth animated camera pan ──
  const animateTo = useCallback((targetX: number, targetY: number, targetZ: number, duration = 600, onDone?: () => void) => {
    const sx = camRef.current.x, sy = camRef.current.y, sz = zoomRef.current;
    const t0 = performance.now();
    velocityRef.current = { x: 0, y: 0 };
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      camRef.current.x = sx + (targetX - sx) * ease;
      camRef.current.y = sy + (targetY - sy) * ease;
      zoomRef.current = sz + (targetZ - sz) * ease;
      updateDOM();
      if (p < 1) requestAnimationFrame(step);
      else onDone?.();
    };
    requestAnimationFrame(step);
  }, [updateDOM]);

  const focusImage = useCallback((idx: number) => {
    const item = canvasItems[idx];
    if (!item || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const tz = window.innerWidth < 768 ? 0.7 : 1.2;
    const tx = item.x + item.w / 2 - rect.width / 2 / tz;
    const ty = item.y + item.h / 2 - rect.height / 2 / tz;
    animateTo(tx, ty, tz, 600, () => setLightboxIdx(idx));
  }, [animateTo]);

  const resetView = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const tz = window.innerWidth < 768 ? 0.3 : 0.55;
    const tx = CANVAS_W / 2 - rect.width / 2 / tz;
    const ty = CANVAS_H / 2 - rect.height / 2 / tz;
    animateTo(tx, ty, tz, 700);
  }, [animateTo]);

  // Minimap scale
  const minimapScale = 120 / CANVAS_W;

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#0a0a09] overflow-hidden relative select-none touch-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      tabIndex={0}
    >
      {/* Ambient grain */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[2]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)' }}
      />

      {/* ── 60fps Ref-Driven World Layer ── */}
      <div
        ref={worldRef}
        className="absolute origin-top-left will-change-transform"
        style={{ width: CANVAS_W, height: CANVAS_H }}
      >
        {/* Depth 0 (Far) */}
        {canvasItems.filter(it => it.depth === 0).map((item) => (
          <div
            key={item.idx}
            className="absolute overflow-hidden rounded-sm opacity-40 hover:opacity-70 transition-opacity duration-500 cursor-pointer"
            style={{
              left: item.x, top: item.y, width: item.w, height: item.h,
              transform: `rotate(${item.rotate}deg)`,
              filter: 'blur(1px) saturate(0.4)',
            }}
            onClick={(e) => { e.stopPropagation(); focusImage(item.idx); }}
          >
            <img src={IMAGES[item.idx]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
        ))}

        {/* Depth 1 (Mid) */}
        {canvasItems.filter(it => it.depth === 1).map((item) => (
          <div
            key={item.idx}
            className="absolute overflow-hidden rounded-sm opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer group"
            style={{
              left: item.x, top: item.y, width: item.w, height: item.h,
              transform: `rotate(${item.rotate}deg)`,
              filter: 'saturate(0.7)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => { e.stopPropagation(); focusImage(item.idx); }}
          >
            <img src={IMAGES[item.idx]} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
              <span className="text-white/80 font-sans text-[9px] tracking-[0.2em] uppercase">n°{item.idx + 1}</span>
            </div>
          </div>
        ))}

        {/* Depth 2 (Near) */}
        {canvasItems.filter(it => it.depth === 2).map((item) => (
          <div
            key={item.idx}
            className="absolute overflow-hidden rounded-md cursor-pointer group"
            style={{
              left: item.x, top: item.y, width: item.w, height: item.h,
              transform: `rotate(${item.rotate}deg)`,
              boxShadow: '0 16px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
            onClick={(e) => { e.stopPropagation(); focusImage(item.idx); }}
          >
            <img src={IMAGES[item.idx]} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
              <div>
                <h4 className="text-white font-serif text-sm md:text-lg mb-0.5 md:mb-1">{t('gallery.piece_no')}{item.idx + 1}</h4>
                <p className="text-white/50 font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase">{t('gallery.studio_location')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Focused Image Lightbox ── */}
      <SharedLightbox lightboxIdx={lightboxIdx} setLightboxIdx={setLightboxIdx} t={t} />

      {/* ── Minimap ── */}
      <div className="absolute bottom-24 left-6 md:bottom-8 z-40 pointer-events-none hidden md:block">
        <div
          className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden relative shadow-2xl"
          style={{ width: 140, height: 140 * (CANVAS_H / CANVAS_W) }}
        >
          {canvasItems.map((item) => (
            <div
              key={item.idx}
              className="absolute rounded-[1px]"
              style={{
                left: item.x * minimapScale * (140 / 120),
                top: item.y * minimapScale * (140 / 120),
                width: Math.max(1.5, item.w * minimapScale * (140 / 120)),
                height: Math.max(1.5, item.h * minimapScale * (140 / 120)),
                backgroundColor: item.depth === 2 ? 'rgba(255,255,255,0.7)' : item.depth === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
          <div
            ref={minimapVpRef}
            className="absolute border border-brand-terracotta/90 bg-brand-terracotta/10 rounded-[2px]"
          />
        </div>
      </div>

      {/* ── Zoom Controls & Reset ── */}
      <div className="absolute bottom-6 md:bottom-8 right-6 z-40 flex flex-col md:flex-row items-center gap-2 md:gap-4 pointer-events-auto">
        <button
          className="h-10 px-4 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all font-sans text-xs tracking-[0.15em] uppercase"
          onClick={resetView}
        >
          {t('gallery.reset_view')}
        </button>
        
        <div className="flex bg-black/60 backdrop-blur-md border border-white/10 rounded-full overflow-hidden">
          <button
            className="w-10 h-10 text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center font-sans"
            onClick={() => {
              zoomRef.current = Math.max(0.12, zoomRef.current * 0.75);
              updateDOM();
            }}
          >−</button>
          <div className="w-14 flex items-center justify-center border-x border-white/10 text-white/60 font-sans text-[10px]">
            <span ref={zoomLabelRef}>100%</span>
          </div>
          <button
            className="w-10 h-10 text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center font-sans"
            onClick={() => {
              zoomRef.current = Math.min(3, zoomRef.current * 1.25);
              updateDOM();
            }}
          >+</button>
        </div>
      </div>

      {/* ── Hint ── */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            className="absolute top-24 md:top-auto md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-white/70 font-sans text-[10px] tracking-[0.2em] uppercase bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M2 12h20M12 2v20"/></svg>
              <span>{t('gallery.hint_drag')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── MODE 3: Trail Gallery ──────────────────────────────────────────── */

// Editorial layout definitions for the trail gallery
const editorialLayouts = [
  // Type A: Full-width cinematic
  { type: 'full', widthClass: 'w-full', aspectClass: 'aspect-[21/9]', align: 'center' },
  // Type B: Side-by-side pair
  { type: 'pair' },
  // Type C: Large left + small right stacked
  { type: 'asymmetric', dir: 'left' },
  // Type D: Full-width cinematic reversed
  { type: 'full', widthClass: 'w-[90vw] md:w-[70vw]', aspectClass: 'aspect-[16/10]', align: 'right' },
  // Type E: Centered portrait
  { type: 'centered-portrait' },
  // Type F: Large right + small left stacked
  { type: 'asymmetric', dir: 'right' },
  // Type G: Triptych
  { type: 'triptych' },
  // Type H: Full bleed landscape
  { type: 'full', widthClass: 'w-[95vw] md:w-[80vw]', aspectClass: 'aspect-video', align: 'left' },
] as const;

const TrailGallery = () => {
  const { t } = useTranslation();
  // Trail state
  const [trail, setTrail] = useState<{
    x: number; y: number; id: number; img: string;
    rotate: number; size: number;
  }[]>([]);
  // Custom cursor — use refs + RAF for zero re-renders
  const cursorRef = useRef({ x: -100, y: -100, active: false });
  const cursorElRef = useRef<HTMLDivElement>(null);
  // Lightbox
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const countRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0, t: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState<'top' | 'middle' | 'bottom'>('top');
  const rafCursorRef = useRef<number>(0);

  // Cursor animation loop — bypasses React render cycle entirely
  useEffect(() => {
    let running = true;
    const tick = () => {
      const el = cursorElRef.current;
      if (el) {
        const { x, y, active } = cursorRef.current;
        el.style.transform = `translate(${x - 28}px, ${y - 28}px) scale(${active ? 1 : 0})`;
      }
      if (running) rafCursorRef.current = requestAnimationFrame(tick);
    };
    rafCursorRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafCursorRef.current); };
  }, []);

  // Scroll position tracking for nav buttons
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop < 400) setScrollPos('top');
      else if (scrollTop + clientHeight >= scrollHeight - 200) setScrollPos('bottom');
      else setScrollPos('middle');
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Pointer trail logic with velocity awareness
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      // Update cursor ref (no re-render)
      cursorRef.current = { x: e.clientX, y: e.clientY, active: true };

      const now = Date.now();
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(1, now - lastPosRef.current.t);
      const velocity = dist / dt; // px/ms

      // Adaptive threshold: faster = more frequent, but floored higher to avoid spam
      const threshold = Math.max(55, 110 - velocity * 25);

      if (dist > threshold) {
        lastPosRef.current = { x: e.clientX, y: e.clientY, t: now };
        const id = countRef.current++;
        const img = IMAGES[id % IMAGES.length];

        // Size varies with velocity (faster = larger trail images)
        const size = 180 + Math.min(velocity * 60, 100);
        // Rotation follows movement direction + some randomness
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const rotate = angle * 0.12 + ((id % 5) - 2) * 3;

        setTrail(prev => [
          ...prev.slice(-16),
          { x: e.clientX, y: e.clientY, id, img, rotate, size }
        ]);

        // Visible for ~2.5–3.5s
        const lifetime = 2500 + (1 - Math.min(velocity, 1)) * 1000;
        setTimeout(() => {
          setTrail(prev => prev.filter(p => p.id !== id));
        }, lifetime);
      }
    };

    const handlePointerLeave = () => { cursorRef.current.active = false; };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Build editorial sections from images
  let imgCursor = 0;
  const sections: { layout: typeof editorialLayouts[number]; images: string[] }[] = [];
  while (imgCursor < IMAGES.length) {
    const layout = editorialLayouts[sections.length % editorialLayouts.length];
    const count = layout.type === 'pair' ? 2 : layout.type === 'triptych' ? 3 : layout.type === 'asymmetric' ? 3 : 1;
    const imgs = IMAGES.slice(imgCursor, imgCursor + count);
    if (imgs.length > 0) sections.push({ layout, images: imgs });
    imgCursor += count;
  }

  const renderSection = (section: typeof sections[number], si: number) => {
    const { layout, images } = section;
    const delay = 0.15;

    if (layout.type === 'full') {
      const align = 'align' in layout ? layout.align : 'center';
      return (
        <motion.div
          key={si}
          className={`flex ${align === 'right' ? 'justify-end' : align === 'left' ? 'justify-start' : 'justify-center'}`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`${'widthClass' in layout ? layout.widthClass : 'w-full'} ${'aspectClass' in layout ? layout.aspectClass : 'aspect-video'} overflow-hidden pointer-events-auto cursor-pointer relative group`}
            onClick={() => setLightboxIdx(IMAGES.indexOf(images[0]))}
          >
            <img
              src={images[0]} alt=""
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-6 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/70 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                {t('gallery.piece_no')}{IMAGES.indexOf(images[0]) + 1}
              </span>
            </div>
          </div>
        </motion.div>
      );
    }

    if (layout.type === 'pair') {
      return (
        <div key={si} className="flex flex-col md:flex-row gap-6 md:gap-8">
          {images.map((img, ii) => (
            <motion.div
              key={ii}
              className="flex-1 aspect-[4/5] overflow-hidden pointer-events-auto cursor-pointer relative group"
              initial={{ opacity: 0, y: 60, x: ii === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: ii * delay, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightboxIdx(IMAGES.indexOf(img))}
            >
              <img
                src={img} alt=""
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      );
    }

    if (layout.type === 'centered-portrait') {
      return (
        <motion.div
          key={si}
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-[60vw] md:w-[30vw] aspect-[3/4] overflow-hidden pointer-events-auto cursor-pointer relative group shadow-2xl"
            onClick={() => setLightboxIdx(IMAGES.indexOf(images[0]))}
          >
            <img
              src={images[0]} alt=""
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 border border-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-brand-terracotta/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700" />
          </div>
        </motion.div>
      );
    }

    if (layout.type === 'asymmetric') {
      const dir = 'dir' in layout ? layout.dir : 'left';
      const large = images[0];
      const smalls = images.slice(1);
      return (
        <div key={si} className={`flex flex-col md:flex-row gap-6 md:gap-8 ${dir === 'right' ? 'md:flex-row-reverse' : ''}`}>
          <motion.div
            className="md:w-3/5 aspect-[4/5] overflow-hidden pointer-events-auto cursor-pointer relative group"
            initial={{ opacity: 0, x: dir === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxIdx(IMAGES.indexOf(large))}
          >
            <img src={large} alt="" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          <div className="md:w-2/5 flex flex-col gap-6 md:gap-8">
            {smalls.map((img, ii) => (
              <motion.div
                key={ii}
                className="flex-1 overflow-hidden pointer-events-auto cursor-pointer relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: (ii + 1) * delay, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightboxIdx(IMAGES.indexOf(img))}
              >
                <img src={img} alt="" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" decoding="async" />
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    if (layout.type === 'triptych') {
      return (
        <div key={si} className="flex flex-col md:flex-row gap-4 md:gap-6 items-end">
          {images.map((img, ii) => (
            <motion.div
              key={ii}
              className={`overflow-hidden pointer-events-auto cursor-pointer relative group ${ii === 1 ? 'md:w-2/5 aspect-[3/4]' : 'md:w-[30%] aspect-square'}`}
              initial={{ opacity: 0, y: 50 + ii * 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: ii * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightboxIdx(IMAGES.indexOf(img))}
            >
              <img src={img} alt="" className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-brand-sand overflow-y-auto relative"
      style={{ scrollbarWidth: 'none', cursor: 'none' }}
    >
      {/* Custom cursor ring — driven by RAF, no React re-renders */}
      <div
        ref={cursorElRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        style={{ willChange: 'transform', transition: 'transform 0.08s ease-out' }}
      >
        <div className="w-14 h-14 rounded-full border border-brand-dark/40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta" />
        </div>
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 pointer-events-none pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-12 h-[1px] bg-brand-terracotta" />
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-brand-dark/40">
              {t('gallery.hint_move')}
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-[15vw] md:text-[10vw] leading-[0.85] tracking-tighter text-brand-dark"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('gallery.works')}
            <br />
            <span className="italic text-brand-terracotta">{t('gallery.selected')}</span>
          </motion.h1>

          <motion.p
            className="mt-8 font-sans text-sm md:text-base text-brand-dark/50 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('gallery.description')}
          </motion.p>
        </div>
      </div>

      {/* ── Editorial Sections ── */}
      <div className="relative z-10 pointer-events-none px-6 md:px-20 pb-40">
        <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-40">
          {sections.map((section, si) => (
            <div key={si}>
              {/* Section separator */}
              {si > 0 && si % 3 === 0 && (
                <motion.div
                  className="flex items-center gap-6 mb-16 md:mb-24"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex-1 h-[1px] bg-brand-dark/8" />
                  <span className="font-serif text-brand-dark/15 text-sm italic">
                    {t('gallery.collection_number', { number: Math.floor(si / 3) + 1 })}
                  </span>
                  <div className="flex-1 h-[1px] bg-brand-dark/8" />
                </motion.div>
              )}
              {renderSection(section, si)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Trail Layer ── GPU-optimized, no 3D perspective overhead */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <AnimatePresence mode="popLayout">
          {trail.map((point) => {
            const aspectVariant = point.id % 3;
            const w = point.size;
            const h = aspectVariant === 0 ? w * 1.35 : aspectVariant === 1 ? w * 0.75 : w;

            return (
              <motion.div
                key={point.id}
                layout={false}
                initial={{
                  opacity: 0.92,
                  scale: 0.5,
                  rotate: point.rotate,
                }}
                animate={{
                  opacity: 0,
                  scale: 1.02,
                  rotate: point.rotate * 0.2,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.8, ease: [0.25, 0.8, 0.25, 1] }}
                className="absolute pointer-events-none"
                style={{
                  left: point.x,
                  top: point.y,
                  width: w,
                  height: h,
                  x: '-50%',
                  y: '-50%',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Polaroid frame — theme-aware with refined shadow */}
                <div className="w-full h-full bg-brand-light p-[5px] pb-[20px] shadow-xl rounded-[3px] relative">
                  <img
                    src={point.img}
                    className="w-full h-[calc(100%-2px)] object-cover"
                    alt=""
                    draggable={false}
                    decoding="async"
                  />
                  <span className="absolute bottom-[4px] left-1/2 -translate-x-1/2 font-serif text-[7px] text-brand-dark/25 tracking-wider">
                    {t('gallery.piece_prefix')}{(point.id % IMAGES.length) + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Scroll Navigation Buttons ── */}
      <div className="fixed bottom-8 right-8 z-[55] flex flex-col gap-2 pointer-events-auto">
        <AnimatePresence>
          {scrollPos !== 'top' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="w-11 h-11 rounded-full bg-brand-dark/70 backdrop-blur-md border border-brand-dark/10 text-brand-sand/60 hover:text-brand-sand hover:bg-brand-dark flex items-center justify-center transition-colors shadow-lg"
              onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              title={t('gallery.top')}
              style={{ cursor: 'pointer' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scrollPos !== 'bottom' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="w-11 h-11 rounded-full bg-brand-dark/70 backdrop-blur-md border border-brand-dark/10 text-brand-sand/60 hover:text-brand-sand hover:bg-brand-dark flex items-center justify-center transition-colors shadow-lg"
              onClick={() => containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })}
              title={t('gallery.bottom')}
              style={{ cursor: 'pointer' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <SharedLightbox lightboxIdx={lightboxIdx} setLightboxIdx={setLightboxIdx} t={t} />
    </div>
  );
};

/* ─── MODE 4: Grid Catalogue ─────────────────────────────────────────── */
const GridCatalogue = () => {
  const { t } = useTranslation();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Decorative categories
  const categories = [
    { id: 'all', label: t('gallery.filter_all') },
    { id: 'portrait', label: t('gallery.filter_portrait') },
    { id: 'abstract', label: t('gallery.filter_abstract') },
    { id: 'landscape', label: t('gallery.filter_landscape') },
    { id: 'mixed', label: t('gallery.filter_mixed') },
  ];

  // Assign decorative categories deterministically
  const catKeys = ['portrait', 'abstract', 'landscape', 'mixed'];
  const getCategory = (i: number) => catKeys[i % catKeys.length];

  const filteredImages = activeFilter === 'all'
    ? IMAGES
    : IMAGES.filter((_, i) => getCategory(i) === activeFilter);

  // Featured items (every 7th) get special treatment
  const isFeatured = (i: number) => i % 7 === 0;

  // Scroll-to-top visibility
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setShowScrollTop(el.scrollTop > 600);
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full bg-brand-sand overflow-y-auto relative"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* ── Header ── */}
      <div className="pt-32 pb-8 md:pt-44 md:pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="w-10 h-[1px] bg-brand-terracotta" />
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-brand-dark/35">
              {t('gallery.catalogue_view')}
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              className="font-serif text-6xl md:text-8xl tracking-tight text-brand-dark leading-[0.9]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('gallery.collection_title')}
              <span className="block text-brand-terracotta/70 italic text-[0.5em] mt-1">{t('gallery.complete')}</span>
            </motion.h2>

            {/* Animated counter */}
            <motion.div
              className="flex items-baseline gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="font-serif text-5xl md:text-6xl text-brand-dark/10">{filteredImages.length}</span>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-brand-dark/30">{t('gallery.pieces')}</span>
            </motion.div>
          </div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-2 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                  activeFilter === cat.id
                    ? 'bg-brand-dark text-brand-light border-brand-dark'
                    : 'bg-transparent text-brand-dark/50 border-brand-dark/12 hover:border-brand-dark/30 hover:text-brand-dark/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[260px]">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((src, i) => {
                const globalIdx = IMAGES.indexOf(src);
                const featured = isFeatured(i);
                const tall = i % 5 === 2;

                return (
                  <motion.div
                    key={src}
                    layout
                    className={`group cursor-pointer relative overflow-hidden rounded-lg ${
                      featured ? 'col-span-2 row-span-2' : tall ? 'row-span-2' : ''
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxIdx(globalIdx)}
                    whileHover={{ y: -4 }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Info on hover */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-serif text-white text-lg mb-1 leading-tight">
                            {t('gallery.piece_no')}{globalIdx + 1}
                          </h3>
                          <div className="flex flex-col gap-1">
                            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-brand-terracotta/90">
                              {t(`gallery.filter_${catKeys[globalIdx % catKeys.length]}`)}
                            </span>
                            <span className="font-sans text-[9px] tracking-[0.1em] text-white/70">
                              {t('gallery.dimensions')} : {["120x80", "90x90", "100x140", "150x50", "80x100"][globalIdx % 5]} cm
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Featured badge */}
                    {featured && (
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-white/80 bg-brand-terracotta/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          {t('gallery.featured')}
                        </span>
                      </div>
                    )}

                    {/* Subtle inner border */}
                    <div className="absolute inset-0 border border-black/5 group-hover:border-white/10 rounded-lg transition-colors duration-500 pointer-events-none" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-brand-dark flex items-center justify-center transition-colors shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <SharedLightbox lightboxIdx={lightboxIdx} setLightboxIdx={setLightboxIdx} t={t} />
    </div>
  );
};

export function GalleryPage() {
  const { t } = useTranslation();
  const [activeMode, setActiveMode] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const modes = [
    { id: 1, name: t('gallery.mode_marquee'), icon: "◫" },
    { id: 2, name: t('gallery.mode_canvas'), icon: "◈" },
    { id: 3, name: t('gallery.mode_trail'), icon: "✦" },
    { id: 4, name: t('gallery.mode_grid'), icon: "▦" },
  ];

  const { theme } = useTheme();

  // Resolve actual dark-ness: in dark mode (or system-dark), ALL modes have dark bg.
  // In light/sahel, only modes 1 (Marquee) and 2 (Canvas) have always-dark backgrounds.
  const isThemeDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isDarkBg = isThemeDark || activeMode === 1 || activeMode === 2;

  // SEO and body scroll lock
  useEffect(() => {
    document.title = `${t('gallery.the_gallery')} | Lyrabloom`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('seo.description'));

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, t]);

  return (
    <div className="h-[100dvh] w-full relative flex flex-col overflow-hidden bg-brand-dark">
      {/* ── Top Navigation Bar ── */}
      <div className="absolute top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-10 pt-4 md:py-5 pointer-events-none">
        <div className="flex justify-between items-center">

          {/* Back Link */}
          <Link href="/"
            className="pointer-events-auto flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isDarkBg
                ? 'border-white/20 group-hover:border-white/60 group-hover:bg-white/10'
                : 'border-brand-dark/20 group-hover:border-brand-dark/5 group-hover:bg-brand-dark/5'
            }`}>
              <svg
                className={`w-3.5 h-3.5 transition-colors ${
                  isDarkBg
                    ? 'text-white/60 group-hover:text-white'
                    : 'text-brand-dark/50 group-hover:text-brand-dark'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <img 
              src="/logo.png" 
              alt="Lyrabloom Logo" 
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md" 
            />
            <span className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-colors hidden sm:inline ${
              isDarkBg
                ? 'text-white/60 group-hover:text-white'
                : 'text-brand-dark/50 group-hover:text-brand-dark'
            }`}>
              Lyrabloom
            </span>
          </Link>

          {/* Center: Title + Theme Toggle */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <h1 className={`hidden lg:block font-serif text-sm tracking-[0.15em] pointer-events-none ${
              isDarkBg ? 'text-white/40' : 'text-brand-dark/30'
            }`}>
              {t('gallery.the_gallery')}
            </h1>
            <div className="hidden sm:block">
              <ModeToggle variant={isDarkBg ? 'overlay' : 'default'} />
            </div>
          </div>

          {/* Right: Mode Switcher (desktop) + Menu button (mobile) */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Desktop Mode Switcher */}
            <div className={`hidden md:flex gap-0.5 sm:gap-1 backdrop-blur-xl p-1 rounded-full border ${
              isDarkBg
                ? 'bg-black/50 border-white/8'
                : 'bg-white/60 border-brand-dark/8'
            }`}>
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`relative px-4 lg:px-5 py-2 rounded-full text-[10px] lg:text-xs font-sans tracking-[0.08em] uppercase transition-all duration-300 flex items-center gap-1.5 ${
                    activeMode === mode.id
                      ? 'bg-brand-primary text-white font-bold shadow-lg'
                      : isDarkBg
                        ? 'text-white/50 hover:bg-white/8 hover:text-white/80'
                        : 'text-brand-dark/40 hover:bg-brand-dark/5 hover:text-brand-dark/80'
                  }`}
                >
                  <span className="text-xs">{mode.icon}</span>
                  {mode.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden flex items-center gap-2 border rounded-full px-3 py-2 transition-all duration-300 min-h-[44px] ${
                isDarkBg
                  ? 'border-white/20 text-white/60 hover:bg-white/10 hover:text-white'
                  : 'border-brand-dark/20 text-brand-dark/50 hover:bg-brand-dark/5 hover:text-brand-dark'
              }`}
              aria-label="Menu"
            >
              <span className={`text-xs font-sans tracking-[0.1em] uppercase ${
                isDarkBg ? 'text-white/60' : 'text-brand-dark/50'
              }`}>
                {modes.find(m => m.id === activeMode)?.icon}
              </span>
              {menuOpen
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Slide-in Panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[340px] z-[61] bg-brand-dark text-brand-sand flex flex-col md:hidden"
            >
              {/* Panel header */}
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-brand-sand/8">
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-brand-sand/30">
                  {t('gallery.view_mode')}
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-brand-sand/10 flex items-center justify-center hover:bg-brand-sand/5 transition-colors"
                >
                  <svg className="w-4 h-4 text-brand-sand/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mode cards */}
              <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-2">
                {modes.map((mode, i) => (
                  <motion.button
                    key={mode.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { setActiveMode(mode.id); setMenuOpen(false); }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 text-left ${
                      activeMode === mode.id
                        ? 'bg-brand-primary/15 border-brand-primary/30 text-brand-sand'
                        : 'bg-brand-sand/3 border-brand-sand/5 text-brand-sand/50 hover:bg-brand-sand/6 hover:text-brand-sand/80'
                    }`}
                  >
                    <span className={`text-xl w-8 text-center ${
                      activeMode === mode.id ? 'text-brand-primary' : ''
                    }`}>{mode.icon}</span>
                    <div className="flex-1">
                      <span className={`block font-sans text-sm font-medium tracking-wide ${
                        activeMode === mode.id ? 'text-brand-sand' : ''
                      }`}>{mode.name}</span>
                      <span className="block font-sans text-[10px] text-brand-sand/25 mt-0.5">
                        {mode.id === 1 && 'Défilement horizontal continu'}
                        {mode.id === 2 && 'Navigation libre infinie'}
                        {mode.id === 3 && 'Traînée de curseur immersive'}
                        {mode.id === 4 && 'Catalogue en grille'}
                      </span>
                    </div>
                    {activeMode === mode.id && (
                      <div className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Panel footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="px-6 py-5 border-t border-brand-sand/8 flex flex-col gap-4"
              >
                {/* Theme toggle */}
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-sand/25">
                    Apparence
                  </span>
                  <ModeToggle variant="overlay" />
                </div>

                {/* Back to home */}
                <Link href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-sans text-xs tracking-[0.1em] text-brand-sand/40 hover:text-brand-terracotta transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour à l'accueil
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Active Mode Renderer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          className="flex-1 w-full h-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeMode === 1 && <HorizontalMarquee />}
          {activeMode === 2 && <InfiniteCanvas />}
          {activeMode === 3 && <TrailGallery />}
          {activeMode === 4 && <GridCatalogue />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

