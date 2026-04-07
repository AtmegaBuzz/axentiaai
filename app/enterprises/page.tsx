'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const deliverables = [
    'AI outputs appear directly in existing workflows',
    'Use cases move into steady, repeatable use across operations',
    '20–40% reduction in manual effort across targeted processes',
    'Faster decision cycles with fewer handoffs and escalations',
    'Internal capability established to run and extend use cases independently',
    'Each initiative reduces time and cost for the next, creating compounding returns',
];

const areas = [
    {
        title: 'Customer Service',
        desc: 'Assistants that handle high-volume queries and route complex cases appropriately.',
        bullets: ['Customer support', 'Internal helpdesk', 'HR self-service'],
        image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80',
    },
    {
        title: 'Process Automation',
        desc: 'Workflows that read, interpret, and act — reducing manual handling across processes.',
        bullets: ['Invoice and PO processing', 'Contract extraction', 'Approval flows'],
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    },
    {
        title: 'Computer Vision',
        desc: 'Image-based models used in operations, production, and field environments.',
        bullets: ['Defect detection', 'Inventory tracking', 'Safety checks'],
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
    },
    {
        title: 'Forecasting & Planning',
        desc: 'Forward-looking signals embedded into planning and decision-making.',
        bullets: ['Demand and inventory', 'Risk and churn', 'Financial projections'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
        title: 'Workforce & HR',
        desc: 'Operational support and insights across workforce processes.',
        bullets: ['Talent matching', 'Attrition signals', 'Onboarding workflows'],
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    },
    {
        title: 'Data & Integration',
        desc: 'Connecting models to enterprise data and processes so outputs can be used directly.',
        bullets: ['Data pipelines', 'Real-time APIs', 'Monitoring and governance'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    },
];

function WhatWeBuildSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const totalAreas = areas.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        // Map scroll progress to area index
        const idx = Math.min(Math.floor(v * totalAreas), totalAreas - 1);
        setActiveIdx(idx);
    });

    return (
        <section ref={containerRef} style={{ height: `${totalAreas * 100}vh` }} className="relative">
            {/* Sticky viewport */}
            <div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{
                    background:
                        'linear-gradient(135deg, #1e0735 0%, #2a0845 30%, #58179B 70%, #6B1D8E 100%)',
                }}
            >
                {/* Section heading — top */}
                <div className="absolute top-0 left-0 right-0 z-30 pt-24 pb-6 text-center pointer-events-none">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
                        What We Build
                    </h2>
                    <p className="text-base md:text-lg text-white/60">
                        Six areas where work can move forward in a measurable way
                    </p>
                </div>

                {/* Main content grid */}
                <div className="h-full grid lg:grid-cols-2">
                    {/* Left — Text */}
                    <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.45, ease: 'easeOut' }}
                            >
                                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight">
                                    {areas[activeIdx].title}
                                </h3>
                                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                                    {areas[activeIdx].desc}
                                </p>
                                <ul className="space-y-4">
                                    {areas[activeIdx].bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-300 flex-shrink-0" />
                                            <span className="text-white text-base md:text-lg">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right — Image (slides up) */}
                    <div className="relative hidden lg:block overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: '100%' }}
                                animate={{ opacity: 1, y: '0%' }}
                                exit={{ opacity: 0, y: '-30%' }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={areas[activeIdx].image}
                                    alt={areas[activeIdx].title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Left fade into purple */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, #2a0845 0%, transparent 50%)',
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Tab bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="flex overflow-x-auto no-scrollbar">
                        {areas.map((area, idx) => (
                            <span
                                key={area.title}
                                className={`flex-1 min-w-[140px] px-4 py-4 text-xs md:text-sm font-semibold tracking-wide uppercase whitespace-nowrap text-center transition-all duration-300 ${
                                    idx === activeIdx
                                        ? 'text-white bg-white/10 border-t-2 border-white'
                                        : 'text-white/40 border-t-2 border-transparent'
                                }`}
                            >
                                {area.title}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scroll progress indicator */}
                <motion.div
                    className="absolute bottom-[52px] left-0 h-[2px] bg-brand-300 z-30"
                    style={{
                        width: `${((activeIdx + 1) / totalAreas) * 100}%`,
                        transition: 'width 0.4s ease',
                    }}
                />
            </div>
        </section>
    );
}

export default function EnterprisesPage() {

    return (
        <main>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(135deg, #1e0735 0%, #2a0845 30%, #58179B 60%, #8929AC 80%, #C010DA 100%)',
                    }}
                />
                {/* Radial glow overlays */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse at 30% 70%, rgba(228,115,186,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(192,16,218,0.12) 0%, transparent 50%)',
                    }}
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-32 pb-24 md:pt-40 md:pb-32">
                    {/* Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-semibold tracking-wide mb-10">
                            Enterprise &middot; AI Transformation
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-8 max-w-5xl mx-auto uppercase"
                    >
                        WHERE CHANGE{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic text-[0.75em] font-normal lowercase text-white/80">
                            settles
                        </span>{' '}
                        INTO EVERYDAY WORK
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto"
                    >
                        Work only shifts when it becomes part of daily operations inside workflows and decisions already in place. Axentia works with your organisation to bring this into motion and carry it forward across your needs.
                    </motion.p>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* What a transformation engagement delivers */}
            <section className="py-20 md:py-32 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left — Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
                                What a transformation engagement delivers
                            </h2>
                            <ul className="space-y-5">
                                {deliverables.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.08 * idx, duration: 0.4 }}
                                        className="flex items-start gap-4"
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700 text-base md:text-lg leading-relaxed">
                                            {item}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Right — Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative w-80 aspect-[3/5] rounded-full overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                                    alt="AI Transformation"
                                    fill
                                    className="object-cover"
                                />
                                {/* Gradient overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            'linear-gradient(180deg, transparent 60%, rgba(88,23,155,0.3) 100%)',
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* What We Build — scroll-driven full page */}
            <WhatWeBuildSection />
        </main>
    );
}
