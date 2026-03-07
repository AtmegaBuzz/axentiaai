'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Charu Tyagi', role: 'SAP SF Consultant — Orane Consulting', quote: 'From HR roles to SAP consulting — Daksha helped me restart my career with confidence and real project skills.', videoId: 'tTpmml4ndWM', category: 'Career Transition' },
  { name: 'Anjali Kaushik', role: 'SAP ABAP Consultant — Orane Consulting', quote: 'As a CS grad, I wanted a career with impact. Daksha made me industry-ready and fast-tracked my entry into SAP consulting.', videoId: 'XX-Qx3yx3ZE', category: 'Campus to Career' },
  { name: 'Madhav Jhawar', role: 'SAP MM Consultant — Orane Consulting', quote: 'From learning fundamentals to optimizing business operations — Daksha helped me transform curiosity into consulting skills.', videoId: 'vM23wbWFL4E', category: 'Skill Building' },
  { name: 'Sakshi Patodi', role: 'SAP ABAP Consultant — Orane Consulting', quote: "Daksha didn't just teach me ABAP — it turned me into a professional who can build real solutions for enterprise clients.", videoId: 'JbsyTIxOh6I', category: 'Enterprise Ready' },
  { name: 'Deeksha', role: 'Trainee — Daksha Career Accelerator', quote: 'Every week, I see myself becoming more confident, more skilled, and more future-ready. Daksha is shaping my tomorrow.', videoId: 'bffdXIDsR3U', category: 'Personal Growth' },
];

function getThumbUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/** Wrap index into [0, len) */
function wrap(i: number, len: number) {
  return ((i % len) + len) % len;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const len = testimonials.length;

  const next = useCallback(() => setActive((a) => wrap(a + 1, len)), [len]);
  const prev = useCallback(() => setActive((a) => wrap(a - 1, len)), [len]);

  // Auto-rotation (pause when video modal is open)
  useEffect(() => {
    if (activeVideo) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, activeVideo]);

  // Positions: show 5 cards centered around `active`
  // offsets: -2, -1, 0, +1, +2
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0a0118' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            What Our Learners Say
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Real stories from professionals who transformed their careers with Daksha.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center" style={{ height: 520 }}>
        {/* Nav arrows */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-4 md:left-8 lg:left-[calc(50%-420px)] z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-4 md:right-8 lg:right-[calc(50%-420px)] z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div className="relative w-full flex items-center justify-center" style={{ height: 500 }}>
          {offsets.map((offset) => {
            const idx = wrap(active + offset, len);
            const t = testimonials[idx];
            const isCenter = offset === 0;
            const absOff = Math.abs(offset);

            // Positioning
            const translateX = offset * 300; // px spacing between cards
            const scale = isCenter ? 1 : offset === 1 || offset === -1 ? 0.88 : 0.76;
            const zIndex = 10 - absOff;
            const blur = isCenter ? 0 : absOff === 1 ? 4 : 8;
            const opacity = isCenter ? 1 : absOff === 1 ? 0.7 : 0.4;

            return (
              <motion.div
                key={`${idx}-${offset}`}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute"
                style={{
                  width: 280,
                  zIndex,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <div
                  className={`relative w-full rounded-2xl overflow-hidden ${isCenter ? 'cursor-pointer group' : 'pointer-events-none'}`}
                  style={{ aspectRatio: '9/16' }}
                  onClick={() => isCenter && setActiveVideo(t.videoId)}
                >
                  {/* Thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getThumbUrl(t.videoId)}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Category pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/15 backdrop-blur-md text-white border border-white/10">
                      {t.category}
                    </span>
                  </div>

                  {/* Play button (center card only) */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <p className="text-white/90 text-sm leading-relaxed line-clamp-3 mb-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? 'w-7 bg-brand-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
