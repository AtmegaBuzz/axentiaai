'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    ArrowRight,
    MessageCircle,
    Building2,
    Award,
    Globe2,
    Users,
    Compass,
} from 'lucide-react';
import { Leaders } from '@/components/sections/Leaders';

const ease = [0.16, 1, 0.3, 1] as const;

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

/* TypewriterText — rAF-based char-by-char reveal */
function TypewriterText({
    text,
    delay = 0.6,
    speed = 18,
}: {
    text: string;
    delay?: number;
    speed?: number;
}) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay * 1000);
        return () => clearTimeout(t);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) return;
        const t = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(t);
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

/* ─── Hero — dark full-bleed, matching GCC/Enterprise pattern ─── */
function AboutHero() {
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
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
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
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative max-w-screen-2xl mx-auto w-full px-6 md:px-12 pt-36 md:pt-40 pb-24"
            >
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            About Axentia AI
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1.04]"
                        style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)' }}
                    >
                        <span className="text-white">Built to bridge the gap between </span>
                        <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                            AI ambition
                        </span>
                        <span className="text-white"> and enterprise execution</span>
                    </motion.h1>

                    {/* Typewriter subtext */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-8 text-sm md:text-base text-white/65 max-w-2xl leading-relaxed min-h-[5rem]"
                    >
                        <TypewriterText
                            text="The next wave of enterprise performance will not come from collecting more AI ideas. It will come from choosing the right opportunities, building capability in the right roles, and executing with clarity."
                            delay={1.1}
                            speed={14}
                        />
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                        className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full max-w-sm mt-10 mb-8"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
                    >
                        <a
                            href="/solutions/ai-strategy-sprint"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200 rounded-full"
                        >
                            Book an AI Strategy Sprint
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="#enquiry"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                        >
                            Contact us
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

/* ─── What we believe — centered heading + split quotes + carousel ─── */
const beliefs = [
    {
        title: 'Not a technology vendor',
        desc: 'We lead with business problems, prioritisation frameworks, and structured execution paths — not tools.',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Not a generic training institute',
        desc: 'Every Axentia programme is tied to enterprise context, workflow reality, and business outcomes.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Distinctly enterprise-oriented',
        desc: 'Our design frame is SAP-led and workflow-intensive organisations — where AI creates the most compressible value.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Partnership, not dependency',
        desc: 'Every engagement builds internal capability. Our goal is organisations that sustain AI adoption without ongoing external reliance.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
];

function WhatWeBelieve() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [active, setActive] = useState(0);
    const userInteracted = useRef(false);
    const total = beliefs.length;

    // Auto-advance every 4s after section in view
    useEffect(() => {
        if (!isInView) return;
        const t = setTimeout(() => {
            const i = setInterval(() => {
                if (userInteracted.current) return;
                setActive((v) => (v + 1) % total);
            }, 4000);
            return () => clearInterval(i);
        }, 2000);
        return () => clearTimeout(t);
    }, [isInView, total]);

    const prev = () => {
        userInteracted.current = true;
        setActive((v) => (v - 1 + total) % total);
    };
    const next = () => {
        userInteracted.current = true;
        setActive((v) => (v + 1) % total);
    };

    return (
        <section ref={ref} className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                {/* Eyebrow centered */}
                <div className="max-w-3xl mx-auto text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            What we believe
                        </span>
                    </motion.div>
                </div>

                {/* Two-column quote split — moved ABOVE pillars */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x md:divide-slate-200 mb-12"
                >
                    <div className="md:pr-10 lg:pr-14">
                        <span
                            aria-hidden
                            className="block font-[family-name:var(--font-playfair)] text-brand-600 text-5xl leading-[0.6] mb-2"
                            style={{ height: '0.4em' }}
                        >
                            &ldquo;
                        </span>
                        <p className="font-[family-name:var(--font-playfair)] italic text-lg md:text-xl text-slate-800 leading-[1.55]">
                            Most AI engagements fail not because the technology is wrong, but because the prioritisation
                            is absent, capability is not built alongside deployment, and the implementation path is
                            never clearly owned.
                        </p>
                    </div>
                    <div className="md:pl-10 lg:pl-14">
                        <span
                            aria-hidden
                            className="block font-[family-name:var(--font-playfair)] text-accent-500 text-5xl leading-[0.6] mb-2"
                            style={{ height: '0.4em' }}
                        >
                            &ldquo;
                        </span>
                        <p className="font-[family-name:var(--font-playfair)] italic text-lg md:text-xl text-slate-800 leading-[1.55]">
                            Axentia AI was designed to address all three. We bring together strategic thinking,
                            practical enablement, and workflow-centred implementation so organisations can move with
                            more confidence and less noise.
                        </p>
                    </div>
                </motion.div>

                {/* Pillars diagram */}
                <Pillars />

                {/* Belief carousel */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between mb-6">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500"
                        >
                            Principles · {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                        </motion.span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous"
                                className="w-10 h-10 rounded-full border border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors flex items-center justify-center"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next"
                                className="w-10 h-10 rounded-full border border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors flex items-center justify-center"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${active * 100}%` }}
                            transition={{ type: 'spring', stiffness: 220, damping: 32, mass: 0.8 }}
                        >
                            {beliefs.map((b, i) => (
                                <article
                                    key={b.title}
                                    className="shrink-0 w-full grid grid-cols-1 md:grid-cols-2 bg-white"
                                >
                                    <div className="relative h-56 md:h-auto md:min-h-[320px]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={b.image}
                                            alt={b.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading={i === 0 ? 'eager' : 'lazy'}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1628]/40 via-transparent to-brand-900/25" />
                                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600 shadow-sm">
                                            Principle {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                                        <div className="font-[family-name:var(--font-playfair)] italic text-3xl md:text-4xl text-brand-600/20 leading-none mb-4">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                                            {b.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                                            {b.desc}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </motion.div>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {beliefs.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to principle ${i + 1}`}
                                onClick={() => {
                                    userInteracted.current = true;
                                    setActive(i);
                                }}
                                className={`h-1.5 rounded-full transition-all ${
                                    i === active ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Pillars — three editorial belief cards ─── */
function Pillars() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const cards = [
        {
            num: '01',
            word: 'Business-first',
            tagline: 'Decisions before tools',
            desc: 'Every engagement leads with the business question — not the technology stack.',
            Icon: Compass,
            accent: 'brand',
        },
        {
            num: '02',
            word: 'Enterprise-aware',
            tagline: 'Workflow-intensive context',
            desc: 'Designed for SAP-led organisations where process complexity is the operating reality.',
            Icon: Building2,
            accent: 'slate',
        },
        {
            num: '03',
            word: 'Built for movement',
            tagline: 'Capability, not dependency',
            desc: 'Engagements end with internal teams who can run, extend, and scale on their own.',
            Icon: ArrowRight,
            accent: 'gold',
        },
    ];

    const accentClass = (a: string) => {
        if (a === 'brand') return 'text-brand-600 bg-brand-600/10 border-brand-600/20';
        if (a === 'gold') return 'text-amber-700 bg-accent-300/20 border-accent-300/40';
        return 'text-slate-700 bg-slate-100 border-slate-200';
    };
    const ruleClass = (a: string) => {
        if (a === 'brand') return 'bg-brand-600';
        if (a === 'gold') return 'bg-accent-500';
        return 'bg-slate-700';
    };

    return (
        <div ref={ref} className="max-w-6xl mx-auto mb-16 md:mb-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {cards.map((c, i) => (
                <motion.article
                    key={c.word}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12, ease }}
                    className="group relative bg-white border border-slate-200 rounded-2xl p-7 md:p-8 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col"
                >
                    {/* Top: number + icon */}
                    <div className="flex items-start justify-between mb-6">
                        <span className="font-[family-name:var(--font-playfair)] italic text-slate-300 text-3xl leading-none">
                            {c.num}
                        </span>
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${accentClass(c.accent)}`}>
                            <c.Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                    </div>

                    {/* Word — main belief */}
                    <h3
                        className={`text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2 ${
                            c.accent === 'gold' ? 'font-[family-name:var(--font-playfair)] italic font-normal text-slate-900' : 'text-slate-900'
                        }`}
                    >
                        {c.word}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
                        {c.tagline}
                    </p>

                    {/* Hairline */}
                    <div className={`h-px w-10 ${ruleClass(c.accent)} mb-5 group-hover:w-16 transition-all duration-500`} />

                    {/* Supporting copy */}
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{c.desc}</p>
                </motion.article>
            ))}
        </div>
    );
}

/* ─── AxentiaReveal — scroll-driven letter-by-letter activation ─── */
function AxentiaReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const letters = ['A', 'X', 'E', 'N', 'T', 'I', 'A'];

    return (
        <section
            ref={containerRef}
            className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen bg-white"
            style={{ height: `${letters.length * 55}vh` }}
        >
            <div className="sticky top-0 h-screen w-screen flex items-center justify-center overflow-hidden">
                <div className="flex items-center justify-center gap-[1vw] md:gap-[1.5vw] px-4">
                    {letters.map((l, i) => (
                        <RevealLetter
                            key={i}
                            letter={l}
                            index={i}
                            total={letters.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function RevealLetter({
    letter,
    index,
    total,
    scrollYProgress,
}: {
    letter: string;
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    const segment = 1 / total;
    const start = index * segment;
    const mid = start + segment * 0.5;
    const end = start + segment;

    const scale = useTransform(scrollYProgress, [start, mid, end], [1, 1.35, 1]);
    const y = useTransform(scrollYProgress, [start, mid, end], ['0%', '-8%', '0%']);
    const color = useTransform(
        scrollYProgress,
        [start, mid, end],
        ['#eaeaf0', '#0a1628', '#eaeaf0'],
    );

    return (
        <motion.span
            style={{
                scale,
                y,
                color,
                display: 'inline-block',
                fontFamily: 'var(--font-inter)',
                fontWeight: 900,
                fontSize: 'clamp(4rem, 14vw, 14rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                willChange: 'transform, color',
                transformOrigin: 'center bottom',
            }}
        >
            {letter}
        </motion.span>
    );
}

/* ─── Partnership band — light, compact ─── */
function PartnershipBand() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section ref={ref} className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            Our partnership ecosystem
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto"
                    >
                        Built on{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            enterprise credentials
                        </span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-white border border-slate-200 rounded-2xl p-7 md:p-10 shadow-sm"
                >
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-7 max-w-3xl">
                        Axentia AI operates in strategic partnership with{' '}
                        <strong className="text-slate-900">Orane Consulting</strong> — a SAP Gold Partner practice. SAP
                        project experience in ECAP and GCC programmes is delivered via Orane Consulting.
                    </p>

                    <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 border-t border-slate-200">
                        {[
                            { Icon: Users, value: '500+', label: 'Consultants' },
                            { Icon: Building2, value: '120+', label: 'Enterprise clients' },
                            { Icon: Globe2, value: '10+', label: 'Countries' },
                        ].map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                                className="text-center md:text-left"
                            >
                                <div className="w-9 h-9 rounded-lg bg-brand-600/10 flex items-center justify-center text-brand-600 mb-3 mx-auto md:mx-0">
                                    <s.Icon className="w-4 h-4" />
                                </div>
                                <div className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl font-medium text-brand-600 mb-1 leading-none">
                                    {s.value}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-2">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex items-start gap-2.5 mt-6 pt-5 border-t border-slate-200">
                        <Award className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Axentia AI and Orane Consulting are distinct entities. Orane is a strategic partner — not a
                            parent company.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── Final CTA band — dark, matches /solutions page bottom ─── */
function FinalCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section
            id="enquiry"
            ref={ref}
            className="relative overflow-hidden bg-[#0a1628] text-white py-20 md:py-28"
        >
            <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/25 blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-5 max-w-3xl mx-auto"
                >
                    Ready to start the{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300 text-[1.1em]">
                        conversation
                    </span>
                    ?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    An AI Strategy Sprint is the logical starting point for most organisations — clarity before
                    investment.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
                >
                    <a
                        href="/solutions/ai-strategy-sprint"
                        className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors rounded-full"
                    >
                        Book an AI Strategy Sprint
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors rounded-full"
                    >
                        Contact us
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="https://wa.me/919999999999?text=Hi%20Axentia%20AI%2C%20I%20want%20to%20learn%20more"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors rounded-full"
                    >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <WhatWeBelieve />
            <AxentiaReveal />
            <PartnershipBand />
            <Leaders />
            <FinalCTA />
        </main>
    );
}
