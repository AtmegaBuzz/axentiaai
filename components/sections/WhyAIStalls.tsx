'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { X, Check } from 'lucide-react';

const problems = [
    'Pilots that never connect to a business case.',
    'Tools invested in before capability is built to use them.',
    'Strategy conversations without implementation ownership.',
    'AI enthusiasm high, prioritisation frameworks absent.',
    'No clear path from use case to live workflow.',
];

const approach = [
    'Business-first thinking — decisions anchored to workflow and value.',
    'Structured capability building — confidence in the right roles.',
    'Implementation orientation — every engagement ends with a clear next step.',
    'Enterprise process context — we understand SAP-led organisations.',
    'A practical path from strategy to pilot — decisions, not decks.',
];

const ease = [0.16, 1, 0.3, 1] as const;

export function WhyAIStalls() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#1a0d2e] text-white">
            {/* Brand-purple ambient glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-700/30 blur-[140px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-500/15 blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* The problem — dark inverted */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease }}
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/20 bg-white/5 mb-5">
                            The problem
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white mb-4">
                            Why AI efforts{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300">
                                stall
                            </span>{' '}
                            in most organisations
                        </h2>
                        <p className="text-sm md:text-base text-white/55 mb-8">
                            It is rarely a technology problem.
                        </p>
                        <ul className="space-y-4">
                            {problems.map((p, i) => (
                                <motion.li
                                    key={p}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/15 border border-red-400/30 flex items-center justify-center mt-0.5">
                                        <X className="w-3 h-3 text-red-300" strokeWidth={2.5} />
                                    </span>
                                    <span className="text-sm md:text-base text-white/80 leading-relaxed">{p}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The Axentia approach — light card on dark bg */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.12, ease }}
                        className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 md:p-10 lg:p-12"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/30 bg-accent-300/10 mb-5">
                            The Axentia approach
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white mb-4">
                            Structure.{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300">
                                Context.
                            </span>{' '}
                            Movement.
                        </h2>
                        <p className="text-sm md:text-base text-white/55 mb-8">
                            Three things most AI engagements lack.
                        </p>
                        <ul className="space-y-4">
                            {approach.map((a, i) => (
                                <motion.li
                                    key={a}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mt-0.5">
                                        <Check className="w-3 h-3 text-emerald-300" strokeWidth={2.5} />
                                    </span>
                                    <span className="text-sm md:text-base text-white/85 leading-relaxed">{a}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
