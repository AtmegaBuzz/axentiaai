'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
    {
        name: 'Charu Tyagi',
        role: 'SAP SF Consultant — Orane Consulting',
        quote: 'From HR roles to SAP consulting — Daksha helped me restart my career with confidence and real project skills.',
        videoId: 'tTpmml4ndWM',
    },
    {
        name: 'Anjali Kaushik',
        role: 'SAP ABAP Consultant — Orane Consulting',
        quote: 'As a CS grad, I wanted a career with impact. Daksha made me industry-ready and fast-tracked my entry into SAP consulting.',
        videoId: 'XX-Qx3yx3ZE',
    },
    {
        name: 'Madhav Jhawar',
        role: 'SAP MM Consultant — Orane Consulting',
        quote: 'From learning fundamentals to optimizing business operations — Daksha helped me transform curiosity into consulting skills.',
        videoId: 'vM23wbWFL4E',
    },
    {
        name: 'Sakshi Patodi',
        role: 'SAP ABAP Consultant — Orane Consulting',
        quote: 'Daksha didn\'t just teach me ABAP — it turned me into a professional who can build real solutions for enterprise clients.',
        videoId: 'JbsyTIxOh6I',
    },
    {
        name: 'Deeksha',
        role: 'Trainee — Daksha Career Accelerator',
        quote: 'Every week, I see myself becoming more confident, more skilled, and more future-ready. Daksha is shaping my tomorrow.',
        videoId: 'bffdXIDsR3U',
    },
];

function VideoThumbnail({ videoId, name }: { videoId: string; name: string }) {
    const [playing, setPlaying] = useState(false);

    if (playing) {
        return (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={`${name} testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
            </div>
        );
    }

    return (
        <button
            onClick={() => setPlaying(true)}
            className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer"
        >
            {/* YouTube thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={`${name} testimonial`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-500/90 flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-brand-500/30">
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
            </div>
        </button>
    );
}

export function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((c) => (c + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    const t = testimonials[current];

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
    };

    return (
        <section className="py-24 md:py-32 bg-[#0a0118] relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-400 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Testimonials
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
                    >
                        What Our Learners Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/50 max-w-2xl mx-auto"
                    >
                        We measure our success by the success of our consultants in the field.
                    </motion.p>
                </div>

                {/* Card with video + quote */}
                <div className="relative max-w-5xl mx-auto">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Video side */}
                                <div className="p-4 md:p-6">
                                    <VideoThumbnail videoId={t.videoId} name={t.name} />
                                </div>

                                {/* Quote side */}
                                <div className="p-6 md:p-10 flex flex-col justify-center">
                                    {/* Accent line */}
                                    <div className="w-10 h-1 bg-brand-500 rounded-full mb-6" />

                                    {/* Quote */}
                                    <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic mb-8">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>

                                    {/* Person */}
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{t.name}</h4>
                                        <p className="text-sm text-white/40 mt-1">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav arrows */}
                    <div className="flex justify-center gap-3 mt-10">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-500/50 hover:bg-white/5 transition-all duration-200"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-white/60" />
                        </button>
                        {/* Dots */}
                        <div className="flex items-center gap-2 mx-4">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-500 w-6' : 'bg-white/20 hover:bg-white/40'}`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-500/50 hover:bg-white/5 transition-all duration-200"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-white/60" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
