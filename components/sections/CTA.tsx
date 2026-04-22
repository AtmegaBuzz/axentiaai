'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ContactModal } from '@/components/ContactModal';

export function CTA() {
    const ref = useRef(null);
    const [contactOpen, setContactOpen] = useState(false);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 40%'] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

    return (
        <section id="cta" ref={ref} className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <motion.div
                    style={{ scale }}
                    className="relative w-full rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 overflow-hidden shadow-xl xl:h-[320px] flex flex-col xl:flex-row items-center"
                >
                    {/* Watermark letter */}
                    <div className="absolute -top-10 right-0 xl:right-[15%] text-[16rem] md:text-[24rem] font-[family-name:var(--font-playfair)] italic font-bold text-white/10 leading-none pointer-events-none select-none">
                        A
                    </div>

                    {/* Image — Mobile */}
                    <div className="xl:hidden pt-6 pb-2 w-40 h-40 sm:w-56 sm:h-56 rounded-full border-[6px] border-white shadow-2xl overflow-hidden z-20 relative self-center shrink-0">
                        <Image
                            src="/images/cta/cta.webp"
                            alt="Axentia.AI Student"
                            fill
                            sizes="320px"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-10 xl:py-8 xl:px-12 xl:w-3/5 flex flex-col items-start justify-center h-full">
                        <h2 className="text-xl md:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
                            Ready to identify where AI can create{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic text-accent-300 text-[1.1em]">
                                real value
                            </span>{' '}
                            in your organisation?
                        </h2>
                        <p className="text-sm md:text-base text-brand-100 mb-5 md:mb-6 font-medium leading-relaxed">
                            Whether you need an execution roadmap, a leadership capability, or are developing
                            enterprise consultants — Axentia has the right starting point.
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="/solutions/ai-strategy-sprint"
                                className="rounded-xl bg-white text-slate-900 border-2 border-white font-bold py-2.5 px-5 text-xs hover:bg-brand-50 transition-colors"
                            >
                                Book an AI Strategy Sprint
                            </a>
                            <a
                                href="https://wa.me/919999999999?text=I%20want%20to%20discuss%20AI%20for%20my%20organisation"
                                target="_blank"
                                rel="noopener"
                                className="rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/30 font-bold py-2.5 px-5 text-xs hover:bg-white/25 transition-colors"
                            >
                                💬 WhatsApp us
                            </a>
                            <button
                                type="button"
                                onClick={() => setContactOpen(true)}
                                className="rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/30 font-bold py-2.5 px-5 text-xs cursor-pointer hover:bg-white/25 transition-colors"
                            >
                                Request a conversation
                            </button>
                        </div>
                    </div>

                    {/* Image — Desktop */}
                    <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 right-0 w-[320px] h-[320px] rounded-full border-[6px] border-white shadow-2xl overflow-hidden z-20">
                        <Image
                            src="/images/cta/cta.webp"
                            alt="Axentia.AI Student"
                            fill
                            sizes="320px"
                            className="object-cover object-center"
                        />
                    </div>
                </motion.div>
            </div>
            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </section>
    );
}
