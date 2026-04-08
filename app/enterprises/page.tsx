'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';
import Image from 'next/image';
import { ContactModal } from '@/components/ContactModal';

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

const partnerLogos = [
    { src: '/certifications/cmmi-logo.png', alt: 'CMMI' },
    { src: '/certifications/nasscom-logo.gif', alt: 'NASSCOM' },
    { src: '/certifications/iso-9001-logo.png', alt: 'ISO 9001' },
    { src: '/certifications/iso-27001-logo.png', alt: 'ISO 27001' },
    { src: '/certifications/ISO-2018.svg', alt: 'ISO 2018' },
    { src: '/certifications/ISO_9001-2015.png', alt: 'ISO 9001:2015' },
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
        const idx = Math.min(Math.floor(v * totalAreas), totalAreas - 1);
        setActiveIdx(idx);
    });

    return (
        <section ref={containerRef} style={{ height: `${totalAreas * 100}vh` }} className="relative">
            <div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{
                    background:
                        'linear-gradient(135deg, #1e0735 0%, #2a0845 30%, #58179B 70%, #6B1D8E 100%)',
                }}
            >
                <div className="absolute top-0 left-0 right-0 z-30 pt-24 pb-6 text-center pointer-events-none">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
                        What We Build
                    </h2>
                    <p className="text-base md:text-lg text-white/60">
                        Six areas where work can move forward in a measurable way
                    </p>
                </div>

                <div className="h-full grid lg:grid-cols-2">
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
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <main>
            {/* Hero Section — lavender/purple gradient */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background: soft lavender-to-white gradient with dark navy blob on right */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(135deg, #f5f0ff 0%, #ede4ff 20%, #e8dbff 35%, #ddd0fa 50%, #c9b8f0 65%, #8b7abf 80%, #1e1245 100%)',
                    }}
                />
                {/* Radial purple mesh glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse at 20% 50%, rgba(200, 170, 255, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 40%, rgba(30, 18, 69, 0.7) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(140, 100, 240, 0.15) 0%, transparent 50%)',
                    }}
                />
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

                <div className="relative z-10 text-center px-4 md:px-6 pt-32 pb-24 md:pt-40 md:pb-32 max-w-4xl mx-auto">
                    {/* Pill badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-brand-600/25">
                            <Zap className="w-4 h-4" />
                            Trusted by Industry Leaders
                        </span>
                    </motion.div>

                    {/* Large serif headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-[family-name:var(--font-playfair)] tracking-tight leading-[1.1] mb-6"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                    >
                        <span className="text-[#0f0a2e]">
                            Enterprise AI Solutions
                        </span>
                        <br />
                        <span className="text-[#0f0a2e]">for </span>
                        <span className="italic text-brand-600">
                            Every Organisation
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10"
                    >
                        Work only shifts when it becomes part of daily operations — inside workflows
                        <br className="hidden md:block" />
                        and decisions already in place. We bring this into motion across your enterprise.
                    </motion.p>

                    {/* Two CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <button
                            type="button"
                            onClick={() => setContactOpen(true)}
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-600/30 cursor-pointer"
                        >
                            Get Started
                        </button>
                        <button
                            type="button"
                            onClick={() => setContactOpen(true)}
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-base transition-all duration-200 bg-white/50 backdrop-blur-sm cursor-pointer"
                        >
                            Book a Demo
                        </button>
                    </motion.div>

                    {/* Logo strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex items-center justify-center gap-8 md:gap-12 flex-wrap"
                    >
                        {partnerLogos.map((logo) => (
                            <div key={logo.alt} className="relative h-8 w-20 md:h-10 md:w-24 grayscale opacity-50 hover:opacity-80 transition-opacity duration-200">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom fade into next section */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* What a transformation engagement delivers */}
            <section className="py-20 md:py-32 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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

            <WhatWeBuildSection />

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </main>
    );
}
