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
      'DCAP offers the best classroom experience with experienced teachers from the SAP industry. This is exactly what I needed to enhance my skills and transition into a consulting career.',
    videoId: 'tTpmml4ndWM',
  },
  {
    name: 'Anjali Kaushik',
    role: 'SAP ABAP Consultant',
    company: 'Orane Consulting',
    quote:
      'As a CS graduate, I wanted to stand out from the crowd. Without a doubt, joining Axentia.AI was the right choice. The exposure and environment here are amazing — I went from a fresher to a billable consultant in under a year.',
    videoId: 'XX-Qx3yx3ZE',
  },
  {
    name: 'Madhav Jhawar',
    role: 'SAP MM Consultant',
    company: 'Orane Consulting',
    quote:
      'I have been working for seven years, but after AI emerged, every company wants employees trained in AI. Axentia has been my supportive hand. The best thing is you get paid for the projects you complete.',
    videoId: 'vM23wbWFL4E',
  },
  {
    name: 'Sakshi Patodi',
    role: 'SAP FICO & ABAP Consultant',
    company: 'Orane Consulting',
    quote:
      'I am not only trained in FICO now, but I also have exposure to and knowledge of every sector in SAP. DCAP is closing the real gap in the market. It is a truly recommended program.',
    videoId: 'JbsyTIxOh6I',
  },
  {
    name: 'Deeksha',
    role: 'SAP Trainee',
    company: 'Daksha Career Accelerator',
    quote:
      "Six weeks in, I'm thinking differently about enterprise problems — especially after understanding how AI fits into SAP workflows. I'm not where I want to be yet, but I know I'm making real progress.",
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
    <section className="relative py-16 md:pt-24 md:pb-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #faf5ff 100%)' }}>
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(137,41,172,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(192,16,218,0.05) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">

        {/* ── header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="text-sm font-semibold uppercase tracking-widest mb-3"
            >
              <span className="inline-block px-2 py-0.5 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>
                Testimonials
              </span>
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.05 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
            >
              Real people, real{' '}
              <span className="font-cursive italic text-brand-600 text-[1.1em]">careers</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
              className="text-base text-slate-500"
            >
              From fresh graduates to career changers — hear how professionals
              are building enterprise consulting careers with Axentia.AI.
            </motion.p>
          </div>
          <div className="shrink-0">
            <a
              href="/student-life#alumni"
              className="inline-flex items-center justify-center px-6 py-3 border border-brand-200 rounded-full text-brand-700 font-semibold text-sm hover:bg-brand-50 hover:border-brand-300 transition-all duration-200"
            >
              See all success stories
            </a>
          </div>
        </div>

        {/* ── content card ── */}
        <div className="relative rounded-3xl p-6 sm:p-8 md:p-12 border border-white shadow-xl backdrop-blur-sm bg-white/60">
          {/* Quote watermark */}
          <Quote className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 md:w-16 md:h-16 text-brand-100 pointer-events-none" strokeWidth={1} />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-[420px] md:h-[380px]">
            {/* Left: Text content — absolutely positioned to prevent height shifts */}
            <div className="order-2 lg:order-1 relative h-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-semibold tracking-wide uppercase border border-brand-100">
                      {t.company}
                    </span>
                  </div>

                  <p className="text-lg sm:text-xl md:text-[22px] leading-relaxed font-medium text-slate-800 mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-700 font-semibold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-semibold text-sm">{t.name}</h4>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Video — full 16:9 aspect ratio */}
            <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl aspect-video bg-black shadow-lg">
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
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-brand-600 transition-all duration-300 text-brand-600 group-hover:text-white">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-current" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls + indicators */}
          <div className="flex items-center justify-between mt-8">
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
                  className={`h-2 rounded-full transition-all duration-300 ${i === active
                    ? 'w-7 bg-brand-500'
                    : 'w-2 bg-brand-200 hover:bg-brand-300'
                    }`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-brand-300 hover:bg-brand-50 shadow-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-brand-300 hover:bg-brand-50 shadow-sm transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
