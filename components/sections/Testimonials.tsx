'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
    { name: 'Charu Tyagi', role: 'SAP SF Consultant — Orane Consulting', quote: 'From HR roles to SAP consulting — Daksha helped me restart my career with confidence and real project skills.' },
    { name: 'Anjali Kaushik', role: 'SAP ABAP Consultant — Orane Consulting', quote: 'As a CS grad, I wanted a career with impact. Daksha made me industry-ready and fast-tracked my entry into SAP consulting.' },
    { name: 'Madhav Jhawar', role: 'SAP MM Consultant — Orane Consulting', quote: 'From learning fundamentals to optimizing business operations — Daksha helped me transform curiosity into consulting skills.' },
    { name: 'Sakshi Patodi', role: 'SAP ABAP Consultant — Orane Consulting', quote: 'Daksha didn\'t just teach me ABAP — it turned me into a professional who can build real solutions for enterprise clients.' },
];

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
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    // Get visible cards (3 on desktop, handled via CSS)
    const getVisible = () => {
        const items = [];
        for (let i = 0; i < 3; i++) {
            items.push({ ...testimonials[(current + i) % testimonials.length], idx: (current + i) % testimonials.length });
        }
        return items;
    };

    const visible = getVisible();

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
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
                        Don&apos;t just take our word for it
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

                {/* Cards */}
                <div className="relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                        >
                            {visible.map((t) => (
                                <div
                                    key={t.name}
                                    className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 md:p-10 flex flex-col hover:bg-white/[0.07] transition-colors duration-300 first:block md:first:block [&:nth-child(2)]:hidden md:[&:nth-child(2)]:block [&:nth-child(3)]:hidden md:[&:nth-child(3)]:block"
                                >
                                    {/* Accent line */}
                                    <div className="w-10 h-1 bg-brand-500 rounded-full mb-8" />

                                    {/* Quote */}
                                    <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic flex-grow mb-10">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>

                                    {/* Person */}
                                    <div className="mt-auto">
                                        <h4 className="font-bold text-white text-lg">{t.name}</h4>
                                        <p className="text-sm text-white/40 mt-1">{t.role}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav arrows */}
                    <div className="flex justify-center gap-3 mt-12">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-500/50 hover:bg-white/5 transition-all duration-200"
                            aria-label="Previous testimonials"
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
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-5 h-5 text-white/60" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
