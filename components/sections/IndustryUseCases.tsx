'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const useCases = [
    {
        id: 'predictive-maintenance',
        industry: 'Manufacturing',
        modules: 'SAP PM · BTP · IoT',
        title: 'Predictive Maintenance',
        description:
            'Anticipate equipment failures using sensor data and maintenance history, helping reduce unplanned downtime and improve asset reliability.',
        image: '/images/new_images/industry-use-cases/predictive-maintenance/factory-workers-hardhats.jpg',
        stat1Label: 'Downtime reduction',
        stat1Value: '~40%',
        stat2Label: 'Maintenance saving',
        stat2Value: '~25%',
    },
    {
        id: 'demand-forecasting',
        industry: 'Retail & FMCG',
        modules: 'SAP IBP · Analytics Cloud',
        title: 'Demand Forecasting',
        description:
            'Improve planning accuracy across supply chains, reducing stock imbalances and enabling more responsive inventory decisions.',
        image: '/images/new_images/industry-use-cases/demand-forecasting/modern-store-interior.jpg',
        stat1Label: 'Forecast accuracy',
        stat1Value: '~98%',
        stat2Label: 'Overstock reduction',
        stat2Value: '~30%',
    },
    {
        id: 'invoice-processing',
        industry: 'Banking & Financial Services',
        modules: 'SAP FI · BTP · Document AI',
        title: 'Invoice & Document Processing',
        description:
            'Automate document handling across finance workflows, including extraction, validation, approvals, and exception handling.',
        image: '/images/new_images/industry-use-cases/invoice-processing/business-financial-analysis.jpg',
        stat1Label: 'Processing time saved',
        stat1Value: '~60%',
        stat2Label: 'Error rate reduction',
        stat2Value: '~80%',
    },
    {
        id: 'quality-control',
        industry: 'Manufacturing',
        modules: 'SAP QM · Vision AI · BTP',
        title: 'Quality Control (Vision-Based)',
        description:
            'Detect defects in real time on production lines, improving consistency and reducing manual inspection effort.',
        image: '/images/new_images/industry-use-cases/quality-control/auto-assembly-line.jpg',
        stat1Label: 'Defect detection rate',
        stat1Value: '~99%',
        stat2Label: 'Inspection time saved',
        stat2Value: '~50%',
    },
    {
        id: 'asset-performance',
        industry: 'Energy & Utilities',
        modules: 'SAP PM · IS-Utilities · IoT',
        title: 'Asset Performance Optimisation',
        description:
            'Monitor asset health and plan maintenance more effectively using operational and sensor data across distributed systems.',
        image: '/images/new_images/industry-use-cases/asset-performance/wind-turbines-sunset.jpg',
        stat1Label: 'Asset availability',
        stat1Value: '+15%',
        stat2Label: 'Maintenance efficiency',
        stat2Value: '~35%',
    },
    {
        id: 'hr-copilot',
        industry: 'HR / SuccessFactors',
        modules: 'SuccessFactors · SAP Joule',
        title: 'HR Copilot',
        description:
            'Support HR teams with policy queries, approvals, and talent insights within existing workflows.',
        image: '/images/new_images/industry-use-cases/hr-copilot/woman-white-blazer-desk.jpg',
        stat1Label: 'Query resolution',
        stat1Value: '70% faster',
        stat2Label: 'HR capacity freed',
        stat2Value: '~40%',
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
        <section ref={sectionRef} className="bg-white overflow-hidden">
            {/* ── Header ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4"
                >
                    <span
                        className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8"
                    >
                        Industry Use Cases
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 }}
                    className="text-2xl md:text-3xl lg:text-[2.6rem] font-bold text-slate-900 tracking-tighter leading-tight mb-5 whitespace-nowrap"
                >
                    Where AI creates{' '}
                    <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        measurable impact
                    </span>{' '}
                    inside your industry
                </motion.h2>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl"
                    >
                        Every use case runs inside your existing SAP environment shaping how work is carried out across operations, finance, supply chains, and workforce management.
                    </motion.p>

                    {/* Prev / Next */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Prev
                        </button>
                        <button
                            onClick={next}
                            disabled={current >= maxIdx}
                            className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-sm font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
                            className="relative overflow-hidden shrink-0"
                            style={{ width: '60vw', height: 'clamp(420px, 52vh, 600px)' }}
                        >
                            {/* Full-bleed photo */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={uc.image}
                                alt={uc.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* Dark gradient for legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                            {/* White info panel */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="absolute bottom-6 left-6 md:max-w-[360px] bg-white p-6 shadow-xl border border-slate-100"
                            >
                                {/* Industry + modules */}
                                <p className="text-xs font-bold uppercase tracking-widest text-[#8A29AC] mb-1">
                                    {uc.industry}
                                </p>
                                <p className="text-xs text-slate-400 font-medium mb-3">
                                    {uc.modules}
                                </p>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">
                                    {uc.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    {uc.description}
                                </p>

                                {/* Stats */}
                                <div className="flex gap-8 mb-4 pt-3 border-t border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-400 leading-tight">{uc.stat1Label}</p>
                                        <p className="text-base font-black text-slate-900">{uc.stat1Value}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 leading-tight">{uc.stat2Label}</p>
                                        <p className="text-base font-black text-slate-900">{uc.stat2Value}</p>
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-2 decoration-[#8A29AC] hover:text-[#8A29AC] transition-colors duration-200"
                                >
                                    Explore use case
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
