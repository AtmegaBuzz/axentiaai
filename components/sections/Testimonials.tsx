'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

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
        quote: 'DCAP offers the best classroom experience with experienced teachers from the SAP industry. This is exactly what I needed to enhance my skills and transition into a consulting career.',
        videoId: 'tTpmml4ndWM',
    },
    {
        name: 'Anjali Kaushik',
        role: 'SAP ABAP Consultant',
        company: 'Orane Consulting',
        quote: 'As a CS graduate, I wanted to stand out from the crowd. Without a doubt, joining Axentia.AI was the right choice. I went from a fresher to a billable consultant in under a year.',
        videoId: 'XX-Qx3yx3ZE',
    },
    {
        name: 'Madhav Jhawar',
        role: 'SAP MM Consultant',
        company: 'Orane Consulting',
        quote: 'After AI emerged, every company wants employees trained in AI. Axentia.AI has been my supportive hand. The best thing is you get paid for the projects you complete.',
        videoId: 'vM23wbWFL4E',
    },
    {
        name: 'Sakshi Patodi',
        role: 'SAP FICO & ABAP Consultant',
        company: 'Orane Consulting',
        quote: 'I am not only trained in FICO now, but I also have exposure to every sector in SAP. DCAP is closing the real gap in the market — it is a truly recommended program.',
        videoId: 'JbsyTIxOh6I',
    },
    {
        name: 'Deeksha',
        role: 'SAP Trainee',
        company: 'Axentia.AI',
        quote: "Six weeks in, I'm thinking differently about enterprise problems — especially after understanding how AI fits into SAP workflows. I know I'm making real progress.",
        videoId: 'bffdXIDsR3U',
    },
];

/* ── individual card ─────────────────────────────────────────────── */
function TestimonialCard({
    t,
    index,
    total,
    scrollYProgress,
}: {
    t: Testimonial;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
}) {
    const isLast = index === total - 1;
    const rangeStart = index / (total - 1);
    const rangeEnd = (index + 1) / (total - 1);

    /* Card shrinks and dims as the next one slides in */
    const scale = useTransform(
        scrollYProgress,
        [rangeStart, rangeEnd],
        [1, isLast ? 1 : 0.88],
    );

    const opacity = useTransform(
        scrollYProgress,
        [rangeStart, rangeEnd],
        [1, isLast ? 1 : 0.45],
    );

    return (
        /*
         * Sticky WRAPPER — full width, section bg (#f0edf8).
         * This is what stacks. The section bg shows on the 10% side gaps,
         * making the 80% white card visually "float" inside the section.
         */
        <div
            className="sticky top-0 h-screen flex justify-center overflow-hidden"
            style={{ zIndex: index + 1, background: '#f0edf8', paddingTop: '3rem' }}
        >
            {/*
             * Inner card — 80% wide, white bg, sharp edges.
             * Scale animation applies here so only the card shrinks,
             * not the section bg strips on the sides.
             */}
            <motion.div
                className="w-[80%] flex flex-col overflow-hidden bg-white"
                style={{
                    scale,
                    opacity,
                    transformOrigin: 'top center',
                    height: 'calc(100vh - 3rem)',
                }}
            >
                {/* ── top: counter + eyebrow ── */}
                <div className="flex items-center justify-between px-10 pt-8 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Testimonials
                    </span>
                    <span className="text-xs font-medium text-slate-400 tabular-nums">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </div>

                {/* ── "In session with" ── */}
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 text-center mb-1">
                    In session with
                </p>

                {/* ── Big role ── */}
                <h2
                    className="font-black text-slate-900 tracking-tight leading-none text-center px-8 uppercase"
                    style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}
                >
                    {t.role}
                </h2>

                {/* ── content: text 30% | video 70% ── */}
                <div className="grid min-h-0 mt-8" style={{ gridTemplateColumns: '30% 70%', flex: '1 1 0', maxHeight: 'calc(100% - 2rem)' }}>

                    {/* Left: tag + role + quote + button */}
                    <div className="flex flex-col px-10 pb-8 pt-4">
                        <span
                            className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 w-fit"
                            style={{ background: '#8A29AC', color: '#fff' }}
                        >
                            {t.company}
                        </span>
                        <p className="font-black text-slate-900 text-sm md:text-base uppercase leading-snug mb-4">
                            {t.name}
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            &ldquo;{t.quote}&rdquo;
                        </p>
                        <a
                            href={`https://www.youtube.com/watch?v=${t.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 font-bold text-sm text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-200 w-fit"
                        >
                            View Video
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Right: large video — natural 16:9 aspect ratio */}
                    <div className="relative h-full overflow-hidden flex items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://img.youtube.com/vi/${t.videoId}/maxresdefault.jpg`}
                            alt={`${t.name} video`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        {/* Square play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-16 h-16 flex items-center justify-center"
                                style={{ background: '#F7C87A' }}
                            >
                                <Play className="w-6 h-6 fill-slate-900 text-slate-900 ml-1" />
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

/* ── main component ───────────────────────────────────────────────── */
export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const total = testimonials.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section>
            <div ref={containerRef} style={{ height: `${total * 100}vh` }}>
                {testimonials.map((t, i) => (
                    <TestimonialCard
                        key={t.name}
                        t={t}
                        index={i}
                        total={total}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
}
