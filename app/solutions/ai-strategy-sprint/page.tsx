'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Workflow,
    Wrench,
    Route,
    ShieldCheck,
    Building2,
    Gauge,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
} from 'lucide-react';
import Image from 'next/image';
import {
    SolutionHero,
    StatsRow,
    DarkFeatureBand,
    SolutionForm,
    ease,
} from '@/components/solutions/shared';

const deliverables = [
    {
        icon: Workflow,
        title: 'Data Readiness Audit',
        desc: 'Comprehensive evaluation of your data pipelines, lakes, and governance to identify adoption blockers.',
        bullets: ['Infrastructure mapping', 'Security & governance review', 'Data lineage assessment'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    },
    {
        icon: Wrench,
        title: 'Technical Architecture',
        desc: 'Detailed schematics for integrating foundational models and custom ML workflows into your existing stack.',
        bullets: ['API integration specs', 'Compute forecasting', 'Reference architectures'],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    },
    {
        icon: Route,
        title: 'Implementation Roadmap',
        desc: 'A phased 90-day plan prioritising quick wins while structuring long-term transformations.',
        bullets: ['90-day sprint plans', 'Resource allocation matrices', 'Milestone gating'],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    },
    {
        icon: ShieldCheck,
        title: 'Governance Framework',
        desc: 'Ethical and operational guardrails for enterprise AI — compliance ready, risk-minimised.',
        bullets: ['Bias mitigation strategies', 'Audit trail protocols', 'Model risk controls'],
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
    },
];

/* Deliverables — IndustryUseCases pattern: full-bleed slider, auto-advance, prev/next */
function StackingDeliverables() {
    const [current, setCurrent] = useState(0);
    const maxIdx = deliverables.length - 1;
    const userInteracted = useRef(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const wheelAccum = useRef(0);
    const [isVisible, setIsVisible] = useState(false);

    const prev = () => {
        userInteracted.current = true;
        setCurrent((i) => Math.max(0, i - 1));
    };
    const next = () => {
        userInteracted.current = true;
        setCurrent((i) => Math.min(maxIdx, i + 1));
    };

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (userInteracted.current) return;
                setCurrent((i) => (i >= maxIdx ? 0 : i + 1));
            }, 3000);
            return () => clearInterval(interval);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [isVisible, maxIdx]);

    const onWheel = useCallback(
        (e: React.WheelEvent) => {
            const dx =
                Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
            if (dx === 0) return;
            e.preventDefault();
            userInteracted.current = true;
            wheelAccum.current += dx;
            const threshold = 80;
            if (wheelAccum.current > threshold) {
                setCurrent((i) => Math.min(maxIdx, i + 1));
                wheelAccum.current = 0;
            } else if (wheelAccum.current < -threshold) {
                setCurrent((i) => Math.max(0, i - 1));
                wheelAccum.current = 0;
            }
        },
        [maxIdx],
    );

    return (
        <section ref={sectionRef} className="bg-white overflow-hidden relative">
            {/* Separator */}
            <div className="relative h-px w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8A29AC]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C010DA]/20 to-transparent blur-sm" />
            </div>

            {/* Header */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pt-20 md:pt-28 pb-12 md:pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4"
                >
                    <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                        Structured Deliverables
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5"
                >
                    What you receive at{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        sprint close
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
                        Four decision-grade artifacts. Ready for engineering, governance, and leadership — not whitepapers.
                    </motion.p>

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

            {/* Horizontal slider */}
            <div ref={sliderRef} className="overflow-hidden pb-20 md:pb-28" onWheel={onWheel}>
                <motion.div
                    className="flex gap-5"
                    animate={{ x: `calc(-${current} * (60vw + 20px) )` }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
                    style={{
                        paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 3rem))',
                        paddingRight: '10vw',
                    }}
                >
                    {deliverables.map((d, i) => {
                        const Icon = d.icon;
                        return (
                            <div
                                key={d.title}
                                className="relative rounded-2xl overflow-hidden shrink-0"
                                style={{ width: '60vw', height: 'clamp(420px, 52vh, 600px)' }}
                            >
                                <Image
                                    src={d.image}
                                    alt={d.title}
                                    fill
                                    sizes="60vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                    className="absolute bottom-6 left-6 md:max-w-[380px] rounded-2xl bg-white p-6 shadow-xl border border-slate-100"
                                >
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#8A29AC] mb-1">
                                        {String(i + 1).padStart(2, '0')} / {String(deliverables.length).padStart(2, '0')}
                                    </p>
                                    <p className="text-xs text-slate-400 font-medium mb-3 inline-flex items-center gap-1.5">
                                        <Icon className="w-3.5 h-3.5 text-[#8A29AC]" />
                                        Sprint artifact
                                    </p>

                                    <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">
                                        {d.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                        {d.desc}
                                    </p>

                                    <div className="pt-3 border-t border-slate-100 mb-4 space-y-2">
                                        {d.bullets.map((b) => (
                                            <div key={b} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#8A29AC] shrink-0" />
                                                <span className="text-xs text-slate-600 font-medium">{b}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="#request"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-2 decoration-[#8A29AC] hover:text-[#8A29AC] transition-colors duration-200"
                                    >
                                        Initiate sprint
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* Timeline of sprint weeks — scroll-driven line fill, alternating image/text rows */
function SprintTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 70%', 'end 30%'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const weeks = [
        {
            label: 'Week 01',
            title: 'Audit',
            desc: 'Current state mapping — data, systems, teams, governance posture. Surface the constraints that will shape the target architecture.',
            outputs: ['Data readiness scorecard', 'System inventory', 'Capability heatmap'],
            image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80',
        },
        {
            label: 'Week 02',
            title: 'Architect',
            desc: 'Design target state. Identify integration points, model candidates, and the seams where AI lands without breaking existing flows.',
            outputs: ['Reference architecture', 'Model selection brief', 'Integration map'],
            image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1400&q=80',
        },
        {
            label: 'Week 03',
            title: 'Align',
            desc: 'Stakeholder workshops. Prioritise use cases against ROI, readiness, and risk. Lock the sequencing — what ships first and why.',
            outputs: ['Use case matrix', 'ROI projections', 'Sequencing plan'],
            image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80',
        },
        {
            label: 'Week 04',
            title: 'Activate',
            desc: 'Deliver the activated package — roadmap, governance blueprint, and pilot scope. Engineering can begin Monday morning.',
            outputs: ['90-day roadmap', 'Governance framework', 'Pilot scope document'],
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
        },
    ];

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-slate-100/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-white mb-5"
                    >
                        Four Weeks · End-to-End
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
                    >
                        From audit to{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-brand-600">
                            activated roadmap.
                        </span>
                    </motion.h2>
                </div>

                {/* Timeline track + rows */}
                <div className="relative">
                    {/* Static rail */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200/80 md:-translate-x-1/2 rounded-full" />
                    {/* Scroll-driven progress fill */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-4 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 rounded-full bg-gradient-to-b from-brand-500 via-brand-600 to-brand-800 shadow-[0_0_20px_rgba(162,14,191,0.45)]"
                    />

                    <div className="space-y-20 md:space-y-28">
                        {weeks.map((w, i) => (
                            <TimelineRow
                                key={w.label}
                                week={w}
                                index={i}
                                total={weeks.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineRow({
    week,
    index,
    total,
    scrollYProgress,
}: {
    week: { label: string; title: string; desc: string; outputs: string[]; image: string };
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    const rowRef = useRef(null);
    const isInView = useInView(rowRef, { once: true, margin: '-30%' });
    const isRight = index % 2 === 1;

    // Active when scroll progress passes this row's anchor
    const anchor = (index + 0.5) / total;
    const dotScale = useTransform(scrollYProgress, [anchor - 0.05, anchor], [0.8, 1.15]);
    const dotGlow = useTransform(scrollYProgress, [anchor - 0.1, anchor], [0, 1]);

    return (
        <div ref={rowRef} className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Dot on rail */}
            <motion.div
                style={{ scale: dotScale }}
                className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 top-6 md:top-1/2 md:-translate-y-1/2"
            >
                <div className="relative">
                    <motion.div
                        style={{ opacity: dotGlow }}
                        className="absolute inset-0 -m-3 rounded-full bg-brand-500/40 blur-xl"
                    />
                    <div className="relative w-5 h-5 rounded-full bg-white border-[3px] border-brand-600 shadow-md" />
                </div>
            </motion.div>

            {/* Text block */}
            <motion.div
                initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease }}
                className={`pl-12 md:pl-0 ${isRight ? 'md:order-2 md:pl-12' : 'md:pr-12 md:text-right'}`}
            >
                <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-brand-600 mb-3">
                    {week.label}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
                    {week.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">{week.desc}</p>
                <div className={`flex flex-wrap gap-2 ${isRight ? 'justify-start' : 'md:justify-end'}`}>
                    {week.outputs.map((o) => (
                        <span
                            key={o}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600"
                        >
                            <span className="w-1 h-1 rounded-full bg-brand-600" />
                            {o}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Image block */}
            <motion.div
                initial={{ opacity: 0, scale: 0.94, x: isRight ? -40 : 40 }}
                animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className={`pl-12 md:pl-0 ${isRight ? 'md:order-1 md:pr-12' : 'md:pl-12'}`}
            >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                    <Image
                        src={week.image}
                        alt={week.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1c30]/50 via-transparent to-brand-600/15" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AIStrategySprintPage() {
    return (
        <main className="bg-slate-50">
            <SolutionHero
                eyebrow="Strategic Deployment"
                headingLead="Architecting the"
                headingAccent="Intelligent Enterprise."
                subtext="The AI Strategy Sprint provides the technical depth and operational blueprint required to transition from fragmented pilots to core strategic integration."
                ctaText="Initiate Sprint"
                ctaHref="#request"
                secondaryCtaText="Download brief"
                secondaryCtaHref="#request"
                image="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80"
            />
            <StatsRow
                items={[
                    { value: '04', title: 'Weeks to Blueprint', desc: 'A compressed, high-intensity engagement designed to audit, architect, and align your AI strategy.' },
                    { value: '10x', title: 'Projected ROI', desc: 'Focused strictly on use cases that demonstrably reduce operational drag or create new revenue vectors.' },
                    { value: '100%', title: 'Actionable Output', desc: 'Technical specifications and decision documents. Ready for your engineering teams — not whitepapers.' },
                ]}
            />
            <StackingDeliverables />
            <SprintTimeline />
            <DarkFeatureBand
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
                heading="Designed for the"
                headingAccent="Vanguard"
                description="This sprint is not an introductory seminar. It is engineered for technology leaders, CIOs, and Heads of Innovation who understand AI's potential but lack the precise technical roadmap to execute securely at scale."
                points={[
                    { icon: <Building2 className="w-5 h-5" />, title: 'Enterprise Scale', desc: 'Organisations with significant data volume and complex legacy estates.' },
                    { icon: <Gauge className="w-5 h-5" />, title: 'Execution Oriented', desc: 'Teams ready to allocate engineering resources against sprint outcomes.' },
                ]}
            />
            <SolutionForm
                heading="Request a"
                headingAccent="Briefing"
                subtext="Submit your details to schedule an initial scoping conversation with our senior architects."
                defaultObjective="AI Strategy Sprint"
                objectives={[
                    'AI Strategy Sprint',
                    'Data Architecture Overhaul',
                    'LLM Integration Strategy',
                    'Predictive Analytics Implementation',
                    'Capability Programme',
                    'Workflow Execution',
                ]}
            />
        </main>
    );
}
