'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react';

/* ── data ─────────────────────────────────────────────────────────── */
interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  videoId: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Charu Tyagi',
    role: 'SAP SF Consultant',
    company: 'Orane Consulting',
    quote:
      'From HR roles to SAP consulting — Daksha helped me restart my career with confidence and real project skills.',
    videoId: 'tTpmml4ndWM',
  },
  {
    name: 'Anjali Kaushik',
    role: 'SAP ABAP Consultant',
    company: 'Orane Consulting',
    quote:
      'As a CS grad, I wanted a career with impact. Daksha made me industry-ready and fast-tracked my entry into SAP consulting.',
    videoId: 'XX-Qx3yx3ZE',
  },
  {
    name: 'Madhav Jhawar',
    role: 'SAP MM Consultant',
    company: 'Orane Consulting',
    quote:
      'From learning fundamentals to optimizing business operations — Daksha helped me transform curiosity into consulting skills.',
    videoId: 'vM23wbWFL4E',
  },
  {
    name: 'Sakshi Patodi',
    role: 'SAP ABAP Consultant',
    company: 'Orane Consulting',
    quote:
      "Daksha didn't just teach me ABAP — it turned me into a professional who can build real solutions for enterprise clients.",
    videoId: 'JbsyTIxOh6I',
  },
  {
    name: 'Deeksha',
    role: 'Trainee',
    company: 'Daksha Career Accelerator',
    quote:
      'Every week, I see myself becoming more confident, more skilled, and more future-ready. Daksha is shaping my tomorrow.',
    videoId: 'bffdXIDsR3U',
  },
];

const len = testimonials.length;

function wrap(i: number) {
  return ((i % len) + len) % len;
}

/* ── main component ───────────────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoscroll, setAutoscroll] = useState(true);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIsPlaying(false);
      setAutoscroll(true);
      setActive((a) => wrap(a + dir));
    },
    []
  );

  const next = useCallback(() => navigate(1), [navigate]);
  const prev = useCallback(() => navigate(-1), [navigate]);

  /* autoplay — stops permanently once a video is played, resumes on arrow click */
  useEffect(() => {
    if (!autoscroll || isPlaying) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, autoscroll, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setAutoscroll(false);
  };

  const t = testimonials[active];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-brand-50/60 via-brand-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 xl:px-12">

        {/* ── header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
            >
              See how learners get career-ready with{' '}
              <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Daksha</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-slate-600"
            >
              From fresh graduates to career changers, see how professionals
              transform the way they build enterprise careers.
            </motion.p>
          </div>
          <div className="shrink-0">
            <a
              href="#stories"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-full text-slate-800 font-semibold text-sm hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              See all success stories
            </a>
          </div>
        </div>

        {/* ── content card ── */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-200 shadow-sm">
          {/* Quote watermark */}
          <Quote className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-16 md:w-20 md:h-20 text-brand-100 pointer-events-none" strokeWidth={1} />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[340px] md:min-h-[380px]">
            {/* Left: Text content — crossfade only */}
            <div className="order-2 lg:order-1 flex flex-col justify-center h-full relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold tracking-wide uppercase border border-brand-100">
                      {t.company}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-[32px] leading-snug font-semibold text-slate-900 mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-lg">{t.name}</h4>
                      <p className="text-slate-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Video — inline playback, no modal */}
            <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl aspect-video bg-black">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={`${active}-${isPlaying}`}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: isPlaying ? 0 : d > 0 ? 60 : -60 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: isPlaying ? 0 : d > 0 ? -60 : 60 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: isPlaying ? 0.2 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  {isPlaying ? (
                    /* Inline YouTube iframe */
                    <iframe
                      src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1&rel=0`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    /* Thumbnail with play button */
                    <div
                      className="absolute inset-0 cursor-pointer group"
                      onClick={handlePlay}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${t.videoId}/maxresdefault.jpg`}
                        alt={t.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-brand-600 transition-all duration-300 text-brand-600 group-hover:text-white">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1 fill-current" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls + indicators */}
          <div className="flex items-center justify-between mt-10">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1);
                    setIsPlaying(false);
                    setAutoscroll(true);
                    setActive(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 h-2.5 bg-brand-500'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-brand-600 hover:border-brand-200 hover:shadow-md transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-brand-600 hover:border-brand-200 hover:shadow-md transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
