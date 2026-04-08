'use client';

import { useRef, useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useInView,
} from 'framer-motion';
import {
    CheckCircle2,
    Headphones,
    Cog,
    Eye,
    BarChart3,
    Users,
    Database,
} from 'lucide-react';
import Image from 'next/image';

/* ─── Data ─── */

const deliverables = [
    'AI outputs embedded directly into existing workflows — not sitting in a separate tool',
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
        icon: Headphones,
    },
    {
        title: 'Process Automation',
        desc: 'Workflows that read, interpret, and act — reducing manual handling across processes.',
        bullets: ['Invoice and PO processing', 'Contract extraction', 'Approval flows'],
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
        icon: Cog,
    },
    {
        title: 'Computer Vision',
        desc: 'Image-based models used in operations, production, and field environments.',
        bullets: ['Defect detection', 'Inventory tracking', 'Safety checks'],
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
        icon: Eye,
    },
    {
        title: 'Forecasting & Planning',
        desc: 'Forward-looking signals embedded into planning and decision-making.',
        bullets: ['Demand and inventory', 'Risk and churn', 'Financial projections'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        icon: BarChart3,
    },
    {
        title: 'Workforce & HR',
        desc: 'Operational support and insights across workforce processes.',
        bullets: ['Talent matching', 'Attrition signals', 'Onboarding workflows'],
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
        icon: Users,
    },
    {
        title: 'Data & Integration',
        desc: 'Connecting models to enterprise data and processes so outputs can be used directly.',
        bullets: ['Data pipelines', 'Real-time APIs', 'Monitoring and governance'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        icon: Database,
    },
];

const engagementSteps = [
    {
        title: 'Discovery',
        description:
            'We assess how work currently moves, identify the right starting points, and define scope with clear success metrics. A focused plan is established so the first step is well-defined and grounded.',
    },
    {
        title: 'Pilot',
        description:
            'The first use case is built and integrated into existing workflows, with outcomes measured from the start. What is delivered is usable in live operations, not held back as a prototype.',
    },
    {
        title: 'Scale',
        description:
            'The work extends into adjacent areas, with each use case building on the last. Capability develops alongside delivery, allowing the organisation to move forward with increasing speed and clarity.',
    },
];

const sapHighlights = [
    'Demand planning within IBP',
    'HR queries and actions within SuccessFactors',
    'Maintenance tasks created within SAP PM',
    'Financial workflows handled within SAP FI',
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── TiltCard Component — 3D perspective tilt on hover ─── */

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
    const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -20;
        const tiltY = (x - 0.5) * 20;
        setTilt({ rotateX: tiltX, rotateY: tiltY, scale: 1.02 });
        setShine({ x: x * 100, y: y * 100, opacity: 0.15 });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
        setShine({ x: 50, y: 50, opacity: 0 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                scale: tilt.scale,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            style={{ perspective: 800, transformStyle: 'preserve-3d' }}
            className={`relative ${className}`}
        >
            {children}
            {/* Shine overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl z-10"
                animate={{ opacity: shine.opacity }}
                transition={{ duration: 0.2 }}
                style={{
                    background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.5) 0%, transparent 60%)`,
                }}
            />
        </motion.div>
    );
}

/* ─── ShinyText Component ─── */

function ShinyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(100deg, #F7C87A 0%, #F7C87A 40%, #ffffff 50%, #F7C87A 60%, #F7C87A 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
            {children}
        </motion.span>
    );
}

/* ─── TypewriterText Component ─── */

function TypewriterText({ text, delay = 0.8, speed = 30 }: { text: string; delay?: number; speed?: number }) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setStarted(true), delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) return;
        const timer = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(timer);
    }, [started, displayed, text, speed]);

    return (
        <span>
            {displayed}
            {displayed.length < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[2px] h-[1em] bg-white/50 ml-0.5 align-middle"
                />
            )}
        </span>
    );
}

/* ─── Hero — Dark, authoritative, static BG ─── */

function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden bg-black">
            {/* Static BG Image — slow parallax */}
            <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y: bgY }}>
                <Image
                    src="/images/enterprise/enterprise-hero.jpg"
                    alt="Enterprise AI transformation"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </motion.div>

            {/* Content — fast parallax */}
            <motion.div
                className="relative z-10 flex flex-col h-full max-w-7xl mx-auto w-full px-6 md:px-12 xl:px-20 will-change-transform"
                style={{ y: textY, opacity: textOpacity }}
            >
                {/* Center hero content */}
                <div className="flex flex-col items-center justify-center flex-1 text-center">
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-white/50 text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-6"
                    >
                        Enterprise AI Transformation
                    </motion.p>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease }}
                        className="font-medium tracking-tighter"
                        style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)', lineHeight: 0.85 }}
                    >
                        <span className="text-white block mb-2">Where Change</span>
                        <ShinyText className="font-[family-name:var(--font-playfair)] italic">
                            Settles In.
                        </ShinyText>
                    </motion.h1>

                    {/* Typewriter description */}
                    <div className="mt-10 md:mt-14 h-8">
                        <p className="text-sm md:text-base text-white/45 max-w-xl mx-auto leading-relaxed">
                            <TypewriterText
                                text="We work with organisations to embed AI into the workflows and decisions that already run the business."
                                delay={1.2}
                                speed={28}
                            />
                        </p>
                    </div>
                </div>

                {/* Bottom spacer */}
                <div className="pb-12 md:pb-16" />
            </motion.div>
        </section>
    );
}



/* ─── Section: Deliverables ─── */

function DeliverablesSection() {
    return (
        <section className="py-24 md:py-36 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-50 mb-5">
                            Engagement Outcomes
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
                            What a transformation{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                engagement delivers
                            </span>
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed mb-10 max-w-lg">
                            Every engagement is structured to leave your organisation with working systems, not just recommendations.
                        </p>
                        <ul className="space-y-5">
                            {deliverables.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.06 * idx, duration: 0.4 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600 text-sm md:text-base leading-relaxed">
                                        {item}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="hidden lg:flex justify-end"
                    >
                        <TiltCard className="w-full max-w-md cursor-pointer">
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                                    alt="Enterprise AI workshop"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Scroll-driven image layer (GPU-composited, no React re-renders) ─── */

function StackingImage({
    src,
    alt,
    index,
    totalAreas,
    scrollYProgress,
}: {
    src: string;
    alt: string;
    index: number;
    totalAreas: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    // Each image occupies a segment: [index/total .. (index+1)/total]
    // Image i=0 starts at y=0 (already in place)
    // Image i>0 starts at y=100% and slides to y=0 during the PREVIOUS segment's second half
    const segmentSize = 1 / totalAreas;
    const slideStart = index === 0 ? 0 : (index - 1) * segmentSize + segmentSize * 0.45;
    const slideEnd = index === 0 ? 0 : index * segmentSize;

    const y = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0.001] : [slideStart, slideEnd],
        index === 0 ? ['0%', '0%'] : ['100%', '0%'],
    );

    return (
        <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
                y,
                zIndex: index,
                boxShadow: index > 0 ? '0 -30px 80px rgba(0,0,0,0.6)' : 'none',
            }}
        >
            <Image src={src} alt={alt} fill className="object-cover grayscale" />
        </motion.div>
    );
}

/* ─── Section: What We Build (scroll-driven stacking cards) ─── */

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
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Two-column layout: left content (50%), right image only (50%) */}
                <div className="h-full grid lg:grid-cols-2">
                    {/* Left: all text content + nav — dark bg only here */}
                    <div className="flex flex-col h-full px-8 md:px-14 lg:px-20 relative z-10 pt-24 bg-[#0a0a14]">
                        {/* Static "WHAT WE BUILD" — visible, matching heading color */}
                        <span className="self-start rounded-md px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: '#F7C87A', color: '#232322' }}>
                            What We Build
                        </span>

                        {/* Active area title + desc + bullets */}
                        <div className="flex-1 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -25 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="max-w-md"
                                >
                                    <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-4 block">
                                        {String(activeIdx + 1).padStart(2, '0')} / {String(totalAreas).padStart(2, '0')}
                                    </span>

                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
                                        {areas[activeIdx].title}
                                    </h2>

                                    <p className="text-white/45 text-base md:text-lg leading-relaxed mb-8">
                                        {areas[activeIdx].desc}
                                    </p>
                                    <ul className="space-y-3">
                                        {areas[activeIdx].bullets.map((b, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.07 }}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                                                <span className="text-white/70 text-base font-medium">{b}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Horizontal nav strip — scroll-driven, overflow hidden both sides */}
                        <div className="pb-6 overflow-hidden">
                            <motion.div
                                className="flex gap-1 whitespace-nowrap will-change-transform"
                                style={{
                                    x: useTransform(
                                        scrollYProgress,
                                        [0, 1],
                                        ['0%', `-${((totalAreas - 1) / totalAreas) * 100}%`],
                                    ),
                                }}
                            >
                                {areas.map((area, idx) => (
                                    <span
                                        key={area.title}
                                        className={`flex-shrink-0 px-4 py-2 text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                                            idx === activeIdx
                                                ? 'text-white'
                                                : 'text-white/20'
                                        }`}
                                    >
                                        {area.title}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: full-height B&W stacking images — fully scroll-driven, GPU composited */}
                    <div className="relative hidden lg:block overflow-hidden">
                        {areas.map((area, i) => (
                            <StackingImage
                                key={area.title}
                                src={area.image}
                                alt={area.title}
                                index={i}
                                totalAreas={totalAreas}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Section: How We Engage (horizontal scroll timeline) ─── */

function HowWeEngageSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-white overflow-hidden">
            <div className="px-6 md:px-12 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-14">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4 }}
                            className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-50 mb-4"
                        >
                            How We Engage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight"
                        >
                            A structured path from first discussion to{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                scaled use
                            </span>
                        </motion.h2>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {engagementSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + i * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="group border border-slate-200 rounded-xl p-6 md:p-8 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-300"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">
                                    Step {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Section: Our SAP Depth ─── */

function SAPDepthSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="py-24 md:py-36 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4 }}
                        className="inline-block rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-5"
                        style={{ background: '#F7C87A', color: '#232322' }}
                    >
                        SAP Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-8 leading-tight"
                    >
                        Our SAP{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            Depth
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base md:text-lg text-slate-500 leading-relaxed"
                    >
                        If your organisation runs SAP, where this work sits matters in a very practical way.
                        SAP reflects how the business actually operates — how teams are structured, how
                        processes move, how decisions get recorded. When this work runs within that
                        environment, it connects directly to that context. Outputs appear in the same places
                        people are already working, and actions follow naturally from there.
                    </motion.p>
                </div>

                {/* Two-column cards */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8">
                            <h3 className="text-base font-bold text-slate-900 mb-5 tracking-tight uppercase">
                                Where This Shows Up
                            </h3>
                            <ul className="space-y-4">
                                {sapHighlights.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + idx * 0.07, duration: 0.4 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-slate-100 overflow-hidden relative min-h-[280px]">
                            <Image
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                                alt="SAP Enterprise Integration"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/70 to-[#0a0a14]/10" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    Deeply embedded within SAP&apos;s ecosystem — S/4HANA, BTP, SuccessFactors, IBP, PM, and FI.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


/* ─── Page ─── */

export default function EnterprisesPage() {
    return (
        <main>
            <HeroSection />
            <DeliverablesSection />
            <WhatWeBuildSection />
            <HowWeEngageSection />
            <SAPDepthSection />
        </main>
    );
}
