'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
            {/* Background Video */}
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
                    <source src="/videos/hero-section-2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-end">
                <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 md:pb-28">
                    <div className="max-w-5xl">
                        <motion.h1
                            id="hero-heading"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-left"
                        >
                            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-black leading-[0.9] tracking-tight">
                                <span className="text-white">Ecosystem for</span>
                                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-yellow-300 to-accent-400 bg-clip-text text-transparent pl-[10px]">AI Era</span>
                            </div>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 max-w-3xl"
                        >
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-snug tracking-wide">
                                AI that scales, because your enterprise is built for it.
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-light"
                        >
                            An enterprise transformation platform that builds the talent to sustain growth, as per your enterprise needs.
                        </motion.p>


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10"
                        >
                            <Link
                                href="/programs#apply"
                                className="gradient-border-btn inline-flex items-center justify-center w-full sm:w-auto backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-shadow duration-300 text-base shadow-[0_0_24px_rgba(138,41,172,0.35)] hover:shadow-[0_0_36px_rgba(138,41,172,0.55)]"
                            >
                                Book AI Discovery Workshop
                            </Link>
                            <Link
                                href="#what-we-deliver"
                                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 hover:border-white/30 font-semibold py-4 px-8 rounded-full shadow-xl transition-all duration-200 text-base"
                            >
                                See What We Deliver
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    );
}
