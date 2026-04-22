'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const useCases = [
    {
        id: 'vendor-onboarding',
        industry: 'Operations · Finance',
        modules: '',
        title: 'Vendor onboarding & compliance automation',
        description:
            'Reduce manual back-and-forth, enforce policy consistently, and cut onboarding timelines dramatically.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
        stat1Label: '',
        stat1Value: '',
        stat2Label: '',
        stat2Value: '',
    },
    {
        id: 'document-intelligence',
        industry: 'Finance · Legal · Procurement',
        modules: '',
        title: 'Document & invoice intelligence',
        description:
            'Intelligent extraction, sorting and routing — eliminating high-volume manual document work at scale.',
        image: 'https://images.unsplash.com/photo-1554224154-26032cdc0c5f?auto=format&fit=crop&w=1600&q=80',
        stat1Label: '',
        stat1Value: '',
        stat2Label: '',
        stat2Value: '',
    },
    {
        id: 'hr-assistant',
        industry: 'HR · Shared Services',
        modules: '',
        title: 'HR & employee service assistant',
        description:
            'AI-powered policy responses and service support that scales without scaling headcount.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',
        stat1Label: '',
        stat1Value: '',
        stat2Label: '',
        stat2Value: '',
    },
    {
        id: 'knowledge-copilot',
        industry: 'Operations · Support',
        modules: '',
        title: 'Enterprise knowledge copilot',
        description:
            'Surface the right answers across scattered knowledge sources — consistently, at speed.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
        stat1Label: '',
        stat1Value: '',
        stat2Label: '',
        stat2Value: '',
    },
    {
        id: 'analytics-finance',
        industry: 'Finance · Operations',
        modules: '',
        title: 'Analytics support for finance',
        description:
            'Faster interpretation of reports, better follow-up questions, improved leadership decision rhythm.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
        stat1Label: '',
        stat1Value: '',
        stat2Label: '',
        stat2Value: '',
    },
    {
        id: 'sap-support',
        industry: 'SAP · Enterprise IT',
        modules: '',
        title: 'SAP & enterprise application support',
        description:
            'Higher self-service and smoother triage — reducing dependency on a few internal SAP experts.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
        stat1Label: '',
        stat1Value: '',
        stat2Label: '',
        stat2Value: '',
    },
];

export function IndustryUseCases() {
    const [current, setCurrent] = useState(0);
    const maxIdx = useCases.length - 1;
    const sliderRef = useRef<HTMLDivElement>(null);
    const wheelAccum = useRef(0);

    const userInteracted = useRef(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const prev = () => { userInteracted.current = true; setCurrent(i => Math.max(0, i - 1)); };
    const next = () => { userInteracted.current = true; setCurrent(i => Math.min(maxIdx, i + 1)); };

    /* Detect when section enters viewport */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.3 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    /* Auto-scroll every 3s, only after section is visible + 2s delay */
    useEffect(() => {
        if (!isVisible) return;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (userInteracted.current) return;
                setCurrent(i => (i >= maxIdx ? 0 : i + 1));
            }, 3000);
            return () => clearInterval(interval);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [isVisible, maxIdx]);

    /* Horizontal scroll / shift+scroll / trackpad swipe */
    const onWheel = useCallback((e: React.WheelEvent) => {
        const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
        if (dx === 0) return;
        e.preventDefault();
        userInteracted.current = true;
        wheelAccum.current += dx;
        const threshold = 80;
        if (wheelAccum.current > threshold) { setCurrent(i => Math.min(maxIdx, i + 1)); wheelAccum.current = 0; }
        else if (wheelAccum.current < -threshold) { setCurrent(i => Math.max(0, i - 1)); wheelAccum.current = 0; }
    }, [maxIdx]);

    return (
        <section ref={sectionRef} className="bg-white overflow-hidden relative">
            {/* ── Separator ── */}
            <div className="relative h-px w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8A29AC]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C010DA]/20 to-transparent blur-sm" />
            </div>

            {/* ── Header ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4"
                >
                    <span
                        className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8"
                    >
                        Practical starting points
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5"
                >
                    Where AI creates value in{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        enterprise workflows
                    </span>
                </motion.h2>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl"
                    >
                        The best AI use cases sit closest to an important workflow, a recurring decision, or a costly delay.
                    </motion.p>

                    {/* Prev / Next */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className="flex items-center gap-2 rounded-xl px-5 py-2.5 border border-slate-300 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Prev
                        </button>
                        <button
                            onClick={next}
                            disabled={current >= maxIdx}
                            className="flex items-center gap-2 rounded-xl px-5 py-2.5 border border-slate-300 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Horizontal slider — 1 card at a time, left-aligned with heading ── */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div ref={sliderRef} className="overflow-hidden pb-20 md:pb-28" onWheel={onWheel}>
                <motion.div
                    className="flex gap-5"
                    animate={{ x: `calc(-${current} * (60vw + 20px) )` }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
                    style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 3rem))', paddingRight: '10vw' }}
                >
                    {useCases.map((uc, i) => (
                        <div
                            key={uc.id}
                            className="relative rounded-2xl overflow-hidden shrink-0"
                            style={{ width: '60vw', height: 'clamp(420px, 52vh, 600px)' }}
                        >
                            {/* Full-bleed photo */}
                            <Image
                                src={uc.image}
                                alt={uc.title}
                                fill
                                sizes="60vw"
                                className="object-cover"
                            />
                            {/* Dark gradient for legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                            {/* White info panel */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="absolute bottom-6 left-6 md:max-w-[360px] rounded-2xl bg-white p-6 shadow-xl border border-slate-100"
                            >
                                {/* Industry + modules */}
                                <p className="text-xs font-bold uppercase tracking-widest text-[#8A29AC] mb-1">
                                    {uc.industry}
                                </p>
                                {uc.modules && (
                                    <p className="text-xs text-slate-400 font-medium mb-3">
                                        {uc.modules}
                                    </p>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2 mt-3">
                                    {uc.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    {uc.description}
                                </p>

                                {/* Stats — only when populated */}
                                {(uc.stat1Value || uc.stat2Value) && (
                                    <div className="flex gap-8 mb-4 pt-3 border-t border-slate-100">
                                        {uc.stat1Value && (
                                            <div>
                                                <p className="text-xs text-slate-400 leading-tight">{uc.stat1Label}</p>
                                                <p className="text-base font-black text-slate-900">{uc.stat1Value}</p>
                                            </div>
                                        )}
                                        {uc.stat2Value && (
                                            <div>
                                                <p className="text-xs text-slate-400 leading-tight">{uc.stat2Label}</p>
                                                <p className="text-base font-black text-slate-900">{uc.stat2Value}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* CTA */}
                                <a
                                    href="/solutions/use-cases"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-2 decoration-[#8A29AC] hover:text-[#8A29AC] transition-colors duration-200 mt-2"
                                >
                                    Explore use case
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Explore all use cases CTA */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-20 md:pb-24 text-center">
                <motion.a
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    href="/solutions/use-cases"
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-7 text-sm transition-colors rounded-full"
                >
                    Explore all use cases
                    <ArrowRight className="w-4 h-4" />
                </motion.a>
            </div>
        </section>
    );
}
