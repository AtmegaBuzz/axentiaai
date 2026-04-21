'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle2, Plus, Minus, MessageCircle } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

/* Detect mobile viewport — disables heavy scroll-driven animations */
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, [breakpoint]);
    return isMobile;
}

/* Hero — full-bleed background image, single-line heading */
function SprintHero() {
    const ref = useRef<HTMLElement>(null);
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);
    const bgScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '-12%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.85], isMobile ? [1, 1] : [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen overflow-hidden bg-[#0a1628] text-white flex items-center"
        >
            {/* Full-bleed background image with parallax */}
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Tonal overlays for legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-transparent to-[#0a1628]" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '72px 72px',
                        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                    }}
                />
            </motion.div>
            {/* Brand glow orbs */}
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

            {/* Content */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative max-w-screen-2xl mx-auto w-full px-6 md:px-12 pt-36 md:pt-40 pb-24"
            >
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Strategic AI Advisory
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1]"
                        style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.75rem)' }}
                    >
                        <span className="whitespace-nowrap">
                            <span className="text-white">AI Strategy </span>
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                                Sprint
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-xl leading-relaxed"
                    >
                        A focused 3–5 day engagement to identify priority AI opportunities, assess organisational
                        readiness, map risk, and produce a 90-day execution roadmap. For leadership teams that want to
                        make confident decisions on where to act first.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                        className="h-px bg-gradient-to-r from-white/25 to-transparent max-w-md mt-8 mb-8 origin-left"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3"
                    >
                        <a
                            href="#request"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200 rounded-full"
                        >
                            Request a Strategy Session
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="https://wa.me/919999999999"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                        >
                            Talk on WhatsApp
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

const whoFor = [
    {
        role: 'CEO & Founders',
        desc: 'Want AI direction before committing significant investment.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    },
    {
        role: 'CIOs',
        desc: 'Navigating operating model implications, governance, and pilot fragmentation.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    },
    {
        role: 'CHROs',
        desc: 'Building workforce capability responses and adoption plans.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
    {
        role: 'CFOs & COOs',
        desc: 'Need to evaluate AI investment cases with rigour.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    },
    {
        role: 'Transformation Leaders',
        desc: 'Need structure, not more presentations.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    },
];

const whatYouGet = [
    {
        title: 'Priority use cases',
        desc: 'Ranked by business value, feasibility, and execution readiness — specific to your workflows. We separate the signal from the speculation and attach weighting so leadership can act with conviction.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
        points: ['Business value × feasibility matrix', 'Workflow-specific scoring', 'Leadership-ready brief'],
    },
    {
        title: 'Readiness gap view',
        desc: 'Capability, data, governance, and process gaps that will block execution — and how to address them. No vague "improve data quality" — specific actions with owners and sequencing.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
        points: ['Capability + data + governance audit', 'Specific remediation actions', 'Owner + sequence mapping'],
    },
    {
        title: 'Risk & governance',
        desc: 'Data risk, vendor dependency, workforce implications — framed for leadership decisions. Written so a board can read it in ten minutes and make calls that stick.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
        points: ['Data residency + vendor lock-in', 'Workforce displacement view', 'Board-ready summary'],
    },
    {
        title: '90-day roadmap',
        desc: 'Ownership, sequence, and success signals. A decision document, not a slide deck. Engineering can begin Monday; measurement starts Tuesday.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
        points: ['Named owners per milestone', 'Measurable success signals', 'Monday-ready execution plan'],
    },
];

const faqs = [
    {
        q: 'What exactly is an AI Strategy Sprint?',
        a: 'A structured 3–5 day engagement that helps enterprise leadership teams identify their highest-priority AI opportunities, assess organisational readiness, map key risks, and produce a 90-day execution roadmap. It is facilitated — not presented. The output is a decision document.',
    },
    {
        q: 'How is this different from a generic consulting engagement?',
        a: 'An AI Strategy Sprint is faster (3–5 days versus months), more focused (two or three priorities versus a broad transformation study), and directly oriented toward business workflow decisions. It ends with a practical action plan.',
    },
    {
        q: 'Who should attend the sessions?',
        a: '4–8 participants from the senior leadership team — typically the CEO or MD, one or two function heads (CIO, CHRO, CFO), and a business transformation or operations lead. Technical depth is not required.',
    },
    {
        q: 'What happens after the sprint?',
        a: 'You leave with a prioritised use case list, a readiness gap view, a risk and governance summary, and a 90-day roadmap with clear ownership. Axentia can support the next phase — but the sprint output is yours regardless.',
    },
    {
        q: 'Can this be run virtually?',
        a: 'Yes. Available in-person and virtual formats. A pre-session briefing call is included in both to ensure facilitation is specific to your context.',
    },
];

/* Who this is for — vertical scroll maps to horizontal carousel translate */
function WhoForCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile(1024);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 38, mass: 0.5 });
    const x = useTransform(smooth, [0, 1], ['0%', '-72%']);
    const trackFill = useTransform(smooth, [0, 0.95], ['0%', '100%']);

    // Mobile: simple horizontal scroll with snap — no sticky, no transforms
    if (isMobile) {
        return (
            <div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
                        Who this is{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            for
                        </span>
                    </h2>
                    <p className="text-sm text-slate-500">
                        Leaders across functions with decision weight and execution responsibility.
                    </p>
                </div>
                <div className="relative -mx-4 md:-mx-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    <div className="flex gap-4 px-4 md:px-8 pb-2">
                        {whoFor.map((p, i) => (
                            <article
                                key={p.role}
                                className="snap-start shrink-0 w-[280px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={p.image}
                                        alt={p.role}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/10 to-transparent" />
                                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow-sm">
                                        <CheckCircle2 className="w-3 h-3" />
                                        {String(i + 1).padStart(2, '0')} · Audience
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                                        {p.role}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-3">
                    Swipe to explore →
                </p>
            </div>
        );
    }

    return (
        <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen">
            <div ref={containerRef} style={{ height: '180vh' }} className="relative">
                <div className="sticky top-0 h-screen w-screen overflow-hidden bg-white flex flex-col">
                    {/* Header */}
                    <div className="pt-16 md:pt-20 pb-6 px-6 md:px-12 xl:px-20">
                        <div className="max-w-7xl mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3"
                            >
                                Who this is{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                    for
                                </span>
                            </motion.h2>
                            <p className="text-sm md:text-base text-slate-500 max-w-2xl">
                                Leaders across functions with decision weight and execution responsibility.
                            </p>
                        </div>
                    </div>

                    {/* Track progress bar */}
                    <div className="px-6 md:px-12 xl:px-20 mb-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="h-px bg-slate-200 relative overflow-hidden">
                                <motion.div
                                    style={{ width: trackFill }}
                                    className="absolute left-0 top-0 h-full bg-brand-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Horizontal cards */}
                    <div className="flex-1 flex items-center overflow-hidden">
                        <motion.div
                            style={{ x }}
                            className="flex gap-5 md:gap-6 will-change-transform pl-6 md:pl-12 xl:pl-20"
                        >
                            {whoFor.map((p, i) => (
                                <article
                                    key={p.role}
                                    className="group shrink-0 w-[320px] md:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative h-56 md:h-64 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={p.image}
                                            alt={p.role}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/10 to-transparent" />
                                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow-sm">
                                            <CheckCircle2 className="w-3 h-3" />
                                            {String(i + 1).padStart(2, '0')} · Audience
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-7">
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mb-2">
                                            {p.role}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                                    </div>
                                </article>
                            ))}
                            {/* Trailing spacer so last card doesn't jam the edge */}
                            <div className="shrink-0 w-12" aria-hidden />
                        </motion.div>
                    </div>

                    {/* Bottom hint */}
                    <div className="pb-8 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            Scroll to explore
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Stacking cards — full-bleed, smoothed scroll, snap in one scroll */
function WhatYouGetStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile(1024);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 260,
        damping: 38,
        mass: 0.5,
    });
    const total = whatYouGet.length;

    // Mobile: simple vertical stack of cards — no sticky, no transforms
    if (isMobile) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                    What you{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        get
                    </span>
                </h2>
                <div className="space-y-6">
                    {whatYouGet.map((card, i) => (
                        <article
                            key={card.title}
                            className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
                        >
                            <div className="relative h-48">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/50 via-transparent to-brand-900/40" />
                                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 text-[10px] font-bold uppercase tracking-widest text-brand-600">
                                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600 mb-3">
                                    Deliverable {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-5">{card.desc}</p>
                                <ul className="space-y-2">
                                    {card.points.map((p) => (
                                        <li key={p} className="flex items-center gap-2.5 text-sm text-slate-700">
                                            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                                            <span className="font-medium">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen">
            {/* Scroll region — heading lives inside each card */}
            <div
                ref={containerRef}
                className="relative"
                style={{ height: `${(total - 1) * 70 + 100}vh` }}
            >
                <div className="sticky top-0 h-screen w-screen overflow-hidden">
                    {whatYouGet.map((card, i) => (
                        <StackCard
                            key={card.title}
                            card={card}
                            index={i}
                            total={total}
                            scrollYProgress={smoothProgress}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StackCard({
    card,
    index,
    total,
    scrollYProgress,
}: {
    card: (typeof whatYouGet)[number];
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    // Distribute transitions evenly across scroll
    // Each incoming card's snap occupies its own window; tight window = fast snap
    const N = total;
    const transitions = N - 1;
    // Window for card `index > 0`: centered around (index-1 + 0.5) / transitions of progress
    // Use a TIGHT window so a single scroll gesture moves it fully
    const windowSize = 1 / transitions;
    const center = index === 0 ? 0 : (index - 0.5) / transitions;
    const snapStart = Math.max(0, center - windowSize * 0.15);
    const snapEnd = Math.min(1, center + windowSize * 0.15);

    const y = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0.001] : [snapStart, snapEnd],
        index === 0 ? ['0%', '0%'] : ['100%', '0%'],
    );

    return (
        <motion.article
            className="absolute inset-0 will-change-transform"
            style={{
                y,
                zIndex: index + 1,
                boxShadow: index > 0 ? '0 -40px 100px rgba(11,28,48,0.35)' : 'none',
            }}
        >
            <div className="h-full w-full bg-white grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[280px] md:min-h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/55 via-transparent to-brand-900/40" />
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow-sm">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 md:px-14 lg:px-20 py-10 md:py-14 flex flex-col justify-center max-w-[720px]">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-8 pb-6 border-b border-slate-200">
                        What you{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            get
                        </span>
                    </h2>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600 mb-4">
                        Deliverable {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-5">
                        {card.title}
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
                        {card.desc}
                    </p>
                    <ul className="space-y-3">
                        {card.points.map((p) => (
                            <li key={p} className="flex items-center gap-3 text-sm md:text-base text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                                <span className="font-medium">{p}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.article>
    );
}

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-200">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 text-left"
            >
                <span className="text-base md:text-lg font-semibold text-slate-900 pr-6">{q}</span>
                <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-colors ${
                        open ? 'bg-brand-600 text-white border-brand-600' : 'text-slate-500'
                    }`}
                >
                    {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
            >
                <p className="pb-5 text-slate-600 leading-relaxed text-sm md:text-base">{a}</p>
            </motion.div>
        </div>
    );
}

/* Bottom section — full-height split: form left, image right */
function SprintFormSection() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [area, setArea] = useState('');
    const [context, setContext] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const message = [
                role && `Role: ${role}`,
                mobile && `Mobile: ${mobile}`,
                area && `Area: ${area}`,
                context && `Context: ${context}`,
            ]
                .filter(Boolean)
                .join('\n');
            const res = await fetch('/api/enterprise-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, company, message: message || 'AI Strategy Sprint enquiry' }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Something went wrong.');
            setStatus('success');
            setName('');
            setCompany('');
            setRole('');
            setEmail('');
            setMobile('');
            setArea('');
            setContext('');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    return (
        <section id="request" className="relative lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
            {/* Left: form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 flex items-center px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-24"
            >
                <div className="w-full max-w-xl mx-auto lg:mx-0">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                        Request a{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            Strategy Session
                        </span>
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mb-10">
                        Complete the form and we will respond within one business day.
                    </p>

                    <form onSubmit={onSubmit} className="space-y-5" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Full name" required>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Company" required>
                                <input
                                    required
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Organisation"
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Role" required>
                                <input
                                    required
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Your title"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Mobile">
                                <input
                                    type="tel"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="+91 00000 00000"
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                        <Field label="Work email" required>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className={inputCls}
                            />
                        </Field>
                        <Field label="What are you exploring?" required>
                            <select
                                required
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className={`${inputCls} text-slate-700`}
                            >
                                <option value="">Select an area</option>
                                <option>AI strategy prioritisation</option>
                                <option>Capability building</option>
                                <option>Workflow automation</option>
                                <option>Enterprise knowledge</option>
                                <option>Other</option>
                            </select>
                        </Field>
                        <Field label="What prompted this now?">
                            <textarea
                                rows={3}
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                placeholder="Brief context…"
                                className={`${inputCls} resize-none`}
                            />
                        </Field>
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-lg font-bold text-base transition-colors disabled:opacity-60 shadow-lg shadow-brand-600/25 inline-flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? 'Submitting…' : 'Request a Strategy Session'}
                                {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                            </button>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <a
                                    href="https://wa.me/919999999999?text=I%20want%20to%20book%20an%20AI%20Strategy%20Sprint"
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition font-medium"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Or chat on WhatsApp
                                </a>
                            </div>
                        </div>
                        {status === 'success' && (
                            <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg text-sm">
                                <div className="flex items-center gap-2 text-brand-700 font-semibold">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Thanks — we&apos;ll respond within one business day.
                                </div>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                {errorMsg}
                            </div>
                        )}
                    </form>
                </div>
            </motion.div>

            {/* Right: full-height image */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative min-h-[320px] lg:min-h-screen"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/75 via-[#0a1628]/45 to-brand-900/60" />
                <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between text-white">
                    <div className="flex items-center gap-3">
                        <span className="block w-8 h-px bg-accent-300" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-300">
                            Senior architects
                        </span>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-white mb-5 max-w-lg">
                            Every briefing starts with a real conversation not a form letter.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Response within one business day
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

const inputCls =
    'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition';

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold tracking-wide text-slate-700 mb-2">
                {label} {required && <span className="text-brand-600">*</span>}
            </label>
            {children}
        </div>
    );
}

export default function AIStrategySprintPage() {
    return (
        <main className="bg-slate-50">
            <SprintHero />

            {/* Main content section — home-style container */}
            <section className="pt-20 md:pt-28 pb-0 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <div className="space-y-20 md:space-y-24">
                        {/* Definitional quote — testimonial-card style */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-12 max-w-3xl mx-auto"
                            >
                                A structured engagement,{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                    not a seminar
                                </span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, ease }}
                                className="relative grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-center bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-25px_rgba(11,28,48,0.18)] p-8 md:p-12 lg:p-14 gap-10 md:gap-14 overflow-hidden"
                            >
                                {/* Left — quote */}
                                <div className="relative">
                                    <span
                                        aria-hidden
                                        className="block font-[family-name:var(--font-playfair)] text-brand-600 text-5xl md:text-6xl leading-[0.6] mb-0 select-none"
                                        style={{ height: '0.4em' }}
                                    >
                                        &ldquo;
                                    </span>
                                    <p className="text-slate-700 text-base md:text-lg leading-[1.7] mb-8 max-w-xl">
                                        An AI Strategy Sprint is a structured 3–5 day engagement that helps enterprise
                                        leadership teams identify priority AI opportunities, assess organisational
                                        readiness, and produce a 90-day execution roadmap.
                                    </p>
                                    <div className="pt-5 border-t border-slate-100">
                                        <div className="font-[family-name:var(--font-playfair)] italic text-lg text-slate-900 mb-1">
                                            Axentia AI
                                        </div>
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <span className="text-brand-600">●</span>
                                            Definitional anchor
                                            <span className="text-slate-300">|</span>
                                            AEO / search
                                        </div>
                                    </div>
                                </div>

                                {/* Right — brand blob mark */}
                                <div className="relative flex items-center justify-center min-h-[220px] md:min-h-[280px]">
                                    {/* Organic blob */}
                                    <svg
                                        viewBox="0 0 400 400"
                                        className="absolute inset-0 w-full h-full"
                                        aria-hidden
                                    >
                                        <defs>
                                            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#C010DA" />
                                                <stop offset="50%" stopColor="#8A29AC" />
                                                <stop offset="100%" stopColor="#6B1D8E" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            fill="url(#blobGrad)"
                                            d="M315 90c30 38 42 92 25 140s-63 88-115 98-108-5-138-45S53 183 75 137s75-78 128-84 82-1 112 37z"
                                            opacity="0.95"
                                        />
                                    </svg>
                                    {/* Small orbiting accent blob */}
                                    <svg
                                        viewBox="0 0 200 200"
                                        className="absolute -top-6 -right-4 w-24 h-24 md:w-32 md:h-32"
                                        aria-hidden
                                    >
                                        <path
                                            fill="#F7C87A"
                                            d="M150 45c18 20 20 55 5 80s-50 40-80 30-45-40-35-70 40-55 70-50 25 5 40 10z"
                                            opacity="0.85"
                                        />
                                    </svg>
                                    {/* Centered brand mark */}
                                    <div className="relative z-10 flex flex-col items-center text-white">
                                        <span className="font-[family-name:var(--font-playfair)] italic text-7xl md:text-8xl leading-none font-bold">
                                            A
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 mt-3">
                                            3–5 days
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-300 mt-1">
                                            90-day roadmap
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Who this is for — scroll-linked horizontal carousel */}
                        <WhoForCarousel />

                        {/* What you get — scroll-driven stacking cards */}
                        <WhatYouGetStack />

                        {/* FAQ */}
                    </div>
                </div>
            </section>

            <SprintFormSection />

            {/* FAQ — below form */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12 max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-10 text-center"
                    >
                        Frequently asked{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            questions
                        </span>
                    </motion.h2>
                    <div className="border-t border-slate-200">
                        {faqs.map((faq) => (
                            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
