'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 40%'] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const borderRadius = 32; // Fixed to rounded-3xl for consistency

    return (
        <section id="cta" ref={ref} className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <motion.div
                    style={{ scale, borderRadius }}
                    className="relative w-full bg-gradient-to-r from-brand-700 to-brand-500 overflow-hidden shadow-xl xl:h-[320px] flex flex-col xl:flex-row items-center"
                >
                    {/* Watermark letter */}
                    <div className="absolute -top-10 right-0 xl:right-[15%] text-[16rem] md:text-[24rem] font-[family-name:var(--font-playfair)] italic font-bold text-white/10 leading-none pointer-events-none select-none">
                        A
                    </div>

                    {/* Left Content */}
                    <div className="relative z-10 p-10 md:p-16 xl:w-3/5 flex flex-col items-start justify-center h-full">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Let&apos;s get you to the <span className="font-cursive italic text-accent-300 text-[1.1em]">right place.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-brand-100 mb-8 font-medium">
                            No pressure. Just a conversation about your goals, where you are now, and whether Daksha might be the right next step.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <Link
                                href="#"
                                className="bg-white text-slate-900 border-2 border-white font-bold py-3 px-8 rounded-full hover:bg-brand-50 transition-colors"
                            >
                                Schedule a Consultation
                            </Link>
                            <Link
                                href="/programs"
                                className="text-white font-semibold flex items-center gap-2 hover:text-brand-100 transition-colors group"
                            >
                                Explore Programs
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image — Desktop */}
                    <div className="hidden xl:block absolute -top-12 -right-6 w-64 h-64 lg:w-80 lg:h-80 rounded-full border-[6px] border-white shadow-2xl overflow-hidden z-20">
                        <Image
                            src="/images/cta-woman.png"
                            alt="Daksha Student"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                    {/* Right Image — Mobile */}
                    <div className="xl:hidden mt-8 mb-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-[6px] border-white shadow-2xl overflow-hidden z-20 relative self-center">
                        <Image
                            src="/images/cta-woman.png"
                            alt="Daksha Student"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
