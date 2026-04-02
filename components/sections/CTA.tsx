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

    return (
        <section id="cta" ref={ref} className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <motion.div
                    style={{ scale, borderRadius: 0 }}
                    className="relative w-full bg-gradient-to-r from-brand-700 to-brand-500 overflow-hidden shadow-xl xl:h-[320px] flex flex-col xl:flex-row items-center"
                >
                    {/* Watermark letter */}
                    <div className="absolute -top-10 right-0 xl:right-[15%] text-[16rem] md:text-[24rem] font-[family-name:var(--font-playfair)] italic font-bold text-white/10 leading-none pointer-events-none select-none">
                        A
                    </div>

                    {/* Image — Mobile */}
                    <div className="xl:hidden pt-6 pb-2 w-40 h-40 sm:w-56 sm:h-56 rounded-full border-[6px] border-white shadow-2xl overflow-hidden z-20 relative self-center shrink-0">
                        <Image
                            src="/images/cta.webp"
                            alt="Axentia.AI Student"
                            fill
                            sizes="320px"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-10 xl:py-8 xl:px-12 xl:w-3/5 flex flex-col items-start justify-center h-full">
                        <h2 className="text-xl md:text-3xl xl:text-4xl font-bold text-white tracking-tight mb-3">
                            Let&apos;s get you to the <span className="font-[family-name:var(--font-playfair)] italic text-accent-300 text-[1.1em]">right place.</span>
                        </h2>
                        <p className="text-sm md:text-base text-brand-100 mb-5 md:mb-6 font-medium leading-relaxed">
                            Tell us where you are in your career and what you&apos;re trying to figure out. We&apos;ll tell you honestly whether Axentia.AI is the right fit, and if it&apos;s not, we&apos;ll say that too.
                        </p>

                        <div className="flex flex-nowrap items-center gap-3">
                            <Link
                                href="/programs#apply"
                                className="bg-white text-slate-900 border-2 border-white font-bold py-2.5 px-5 hover:bg-brand-50 transition-colors text-xs"
                            >
                                Book AI Discovery Workshop
                            </Link>
                            <Link
                                href="/programs?tab=transformation"
                                className="bg-white/15 backdrop-blur-sm text-white border border-white/30 font-bold py-2.5 px-5 hover:bg-white/25 transition-colors text-xs"
                            >
                                Launch Your First AI Pilot
                            </Link>
                            <Link
                                href="/programs?tab=academies"
                                className="bg-white/15 backdrop-blur-sm text-white border border-white/30 font-bold py-2.5 px-5 hover:bg-white/25 transition-colors text-xs"
                            >
                                Join a Talent Academy
                            </Link>
                        </div>
                    </div>

                    {/* Image — Desktop */}
                    <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 right-0 w-[320px] h-[320px] rounded-full border-[6px] border-white shadow-2xl overflow-hidden z-20">
                        <Image
                            src="/images/cta.webp"
                            alt="Axentia.AI Student"
                            fill
                            sizes="320px"
                            className="object-cover object-center"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
