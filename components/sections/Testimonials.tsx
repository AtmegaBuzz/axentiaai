'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';

interface Testimonial {
    name: string;
    program: string;
    quote: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Charu Tyagi',
        program: 'SAP SF Consultant',
        quote: 'DCAP offers the best classroom experience with experienced teachers from the SAP industry. This is exactly what I needed to enhance my skills and transition into a consulting career.',
        image: '/images/testimonials/charu-tyagi.jpeg',
    },
    {
        name: 'Anjali Kaushik',
        program: 'SAP ABAP Consultant',
        quote: 'As a CS graduate, I wanted to stand out from the crowd. Without a doubt, joining Axentia.AI was the right choice. I went from a fresher to a billable consultant in under a year.',
        image: '/images/testimonials/anjali-kaushik.jpeg',
    },
    {
        name: 'Madhav Jhawar',
        program: 'SAP MM Consultant',
        quote: 'After AI emerged, every company wants employees trained in AI. Axentia.AI has been my supportive hand. The best thing is you get paid for the projects you complete.',
        image: '/images/testimonials/madhav-jhawar.jpeg',
    },
    {
        name: 'Sakshi Patodi',
        program: 'SAP FICO & ABAP Consultant',
        quote: 'I am not only trained in FICO now, but I also have exposure to every sector in SAP. DCAP is closing the real gap in the market — it is a truly recommended program.',
        image: '/images/testimonials/sakshi-patodi.jpeg',
    },
    {
        name: 'Deeksha',
        program: 'SAP Trainee',
        quote: "Six weeks in, I'm thinking differently about enterprise problems — especially after understanding how AI fits into SAP workflows. I know I'm making real progress.",
        image: '/images/testimonials/deeksha.jpeg',
    },
];

function Stars() {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const goTo = useCallback((idx: number) => {
        setDirection(idx > current ? 1 : -1);
        setCurrent(idx);
    }, [current]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent(i => (i === 0 ? testimonials.length - 1 : i - 1));
    }, []);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent(i => (i === testimonials.length - 1 ? 0 : i + 1));
    }, []);

    /* Auto-advance every 5s */
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const t = testimonials[current];

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <section className="bg-slate-900 py-20 md:py-28 overflow-hidden relative">
            {/* Subtle grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">

                    {/* Left: heading + stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/20 bg-accent-300/8 mb-5">
                            Testimonials
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
                            What our students say about us
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed mb-10 max-w-md">
                            Real stories from real people who transformed their careers with Axentia.AI
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="bg-white/[0.04] border border-white/[0.08] p-5">
                                <p className="text-3xl font-black text-white tracking-tight">95%</p>
                                <p className="text-xs text-slate-400 mt-1">Placement success rate</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/[0.08] p-5">
                                <p className="text-3xl font-black text-white tracking-tight">4.9</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-400">avg rating</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/outcomes"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-bold py-3 px-6 hover:bg-slate-100 transition-colors"
                        >
                            View all testimonials
                        </Link>
                    </motion.div>

                    {/* Right: featured testimonial card */}
                    <div className="relative">
                        {/* Quote icon */}
                        <Quote className="absolute -top-3 -left-2 w-12 h-12 text-brand-500/20 z-0" strokeWidth={1} />

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="relative bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm p-8 md:p-10"
                            >
                                <Stars />

                                <p className="text-lg md:text-xl text-white/90 leading-relaxed mt-5 mb-8 font-light">
                                    &ldquo;{t.quote}&rdquo;
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-white">{t.name}</p>
                                        <p className="text-xs text-brand-400 font-medium">{t.program}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6">
                            {/* Dots */}
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        className="w-2 h-2 transition-all duration-300"
                                        style={{
                                            backgroundColor: i === current ? 'var(--color-brand-500, #C010DA)' : 'rgba(255,255,255,0.15)',
                                            width: i === current ? '24px' : '8px',
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Arrows */}
                            <div className="flex gap-2">
                                <button
                                    onClick={prev}
                                    className="w-10 h-10 border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-10 h-10 border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
