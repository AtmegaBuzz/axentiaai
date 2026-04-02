'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const metrics = [
    { value: '50+', label: 'Enterprises' },
    { value: '300+', label: 'Certified Professionals' },
    { value: '4+', label: 'Countries' },
];

export function Hero() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ['start start', 'end end'],
    });

    const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-80%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <div ref={wrapperRef} style={{ height: '200vh' }} className="relative">
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Video background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/videos/hero-poster.jpg"
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/hero-latest.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                </div>

                {/* Hero content */}
                <motion.div
                    className="absolute inset-0 z-10 flex items-end"
                    style={{ y: contentY, opacity: contentOpacity }}
                >
                    <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-16 md:pb-24">
                        <div className="max-w-4xl">

                            {/* Eyebrow */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Enterprise AI Platform
                                </span>
                            </motion.div>

                            {/* Heading — exact original text */}
                            <motion.h1
                                id="hero-heading"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="font-black tracking-tight leading-[0.95]"
                                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                            >
                                <span className="text-white">Ecosystem for </span>
                                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                                    AI Era
                                </span>
                            </motion.h1>

                            {/* Subtext — exact original text */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="mt-6 text-sm md:text-base text-white/65 max-w-xl leading-relaxed"
                            >
                                An enterprise transformation platform that builds the talent to sustain growth, as per your enterprise needs.
                            </motion.p>

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                                className="h-px bg-gradient-to-r from-white/25 to-transparent max-w-md mt-8 mb-8 origin-left"
                            />

                            {/* CTAs — exact original text */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row flex-wrap gap-3 mb-12"
                            >
                                <Link
                                    href="/programs#apply"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200"
                                >
                                    Book AI Discovery Workshop
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#what-we-deliver"
                                    className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/8 transition-colors duration-200"
                                >
                                    See What We Deliver
                                </Link>
                            </motion.div>

                            {/* Trust metrics strip — above-fold social proof */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.65 }}
                                className="flex items-center gap-8 md:gap-12"
                            >
                                {metrics.map((m, i) => (
                                    <div key={m.label} className="flex items-center gap-3">
                                        {i > 0 && <div className="w-px h-8 bg-white/15 -ml-4 md:-ml-6 mr-1" />}
                                        <div>
                                            <p className="text-lg md:text-xl font-black text-white tracking-tight">{m.value}</p>
                                            <p className="text-[10px] md:text-[11px] font-medium text-white/45 uppercase tracking-wider">{m.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                        </div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
                >
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-4 h-4 text-white/30" />
                    </motion.div>
                </motion.div>

            </div>
        </div>
    );
}
