'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Plus,
    Minus,
    MessageCircle,
    GraduationCap,
    Briefcase,
    Award,
} from 'lucide-react';

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

/* CountUp — rAF-driven number animation with prefix/suffix */
function CountUp({ value, start, duration = 1600 }: { value: string; start: boolean; duration?: number }) {
    const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return <>{value}</>;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const isFloat = numStr.includes('.');
    const decimals = isFloat ? numStr.split('.')[1].length : 0;
    const padLen = !isFloat && numStr.startsWith('0') && numStr.length > 1 ? numStr.length : 0;
    const [display, setDisplay] = useState<number>(0);

    useEffect(() => {
        if (!start) return;
        const startTime = performance.now();
        let raf = 0;
        const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(target * eased);
            if (t < 1) raf = requestAnimationFrame(tick);
            else setDisplay(target);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration]);

    const formatted = isFloat
        ? display.toFixed(decimals)
        : padLen
            ? Math.round(display).toString().padStart(padLen, '0')
            : Math.round(display).toString();

    return (
        <>
            {prefix}
            {formatted}
            {suffix}
        </>
    );
}

/* ─── Hero — full-bleed dark, single-line accent ─── */
function EcapHero() {
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
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2400&q=80"
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
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Career Programme · 30 seats · July 2026
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1.02]"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
                    >
                        <span className="block text-white">ECAP — Enterprise Career</span>
                        <span className="block mt-2">
                            <span className="text-white">Acceleration </span>
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                                Programme
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-2xl leading-relaxed"
                    >
                        A highly selective 14-month SAP Techno-Functional AI Consultant programme. 30 seats per batch.
                        Real project experience. A paid internship from Month 10. We are not looking for many. We are
                        looking for the right 30.
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
                            href="#apply"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200 rounded-full"
                        >
                            Apply for ECAP 2026
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="https://wa.me/919999999999?text=I%20want%20to%20apply%20for%20the%20ECAP%20programme"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                        >
                            WhatsApp to apply
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

/* ─── Stats Row — count-up numbers ─── */
const stats = [
    { value: '30', label: 'Seats per batch — highly selective' },
    { value: '14m', label: 'Programme duration across two phases' },
    { value: '₹20K', label: 'Per month stipend from Month 10' },
    { value: '4', label: 'Stage selection process' },
];

function StatsRow() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section ref={ref} className="bg-slate-100/50 py-20 md:py-24 border-y border-slate-200/60">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    {stats.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 25 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1, ease }}
                            className="flex flex-col"
                        >
                            <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl italic font-medium text-brand-600 mb-3 leading-none tabular-nums">
                                <CountUp value={item.value} start={isInView} duration={1500 + i * 150} />
                            </span>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── Phases — 3 stacking cards ─── */
const phases = [
    {
        Icon: GraduationCap,
        period: 'Phase 1 · Months 1–8',
        title: 'Training & Foundations',
        desc: "SAP core processes (P2P, O2C, R2R, H2R), Python for enterprise, applied AI fundamentals, and business process analysis. SAP functional module (FICO, SD, or MM) assigned at Month 8 based on Orane's live project pipeline.",
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
        points: ['SAP core processes', 'Python for enterprise', 'Applied AI fundamentals'],
    },
    {
        Icon: Briefcase,
        period: 'Phase 2 · Months 9–14 · Paid internship',
        title: 'Live Project Internship — The Crucible',
        desc: 'Paid internship on real Orane Consulting client projects. Up to ₹20,000/month from Month 10. Real deliverables, real clients, real consulting experience — not simulated case studies.',
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1600&q=80',
        points: ['Live client engagements', 'Up to ₹20K/month from M10', 'Real consulting deliverables'],
    },
    {
        Icon: Award,
        period: 'Post-programme',
        title: 'Placement & Career Track',
        desc: 'Graduates are pre-validated SAP + AI consultants with live project experience. Access to placement networks and preferred GCC hiring arrangements.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
        points: ['Pre-validated consultants', 'Placement network access', 'Preferred GCC hiring'],
    },
];

function PhasesStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile(1024);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 260, damping: 38, mass: 0.5 });
    const total = phases.length;

    if (isMobile) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                    Not a course.{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        A career launchpad
                    </span>
                </h2>
                <div className="space-y-6">
                    {phases.map((p, i) => (
                        <article
                            key={p.title}
                            className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
                        >
                            <div className="relative h-48">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/55 via-transparent to-brand-900/40" />
                                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 text-[10px] font-bold uppercase tracking-widest text-brand-600">
                                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600 mb-3">
                                    {p.period}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3">{p.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-5">{p.desc}</p>
                                <ul className="space-y-2">
                                    {p.points.map((pt) => (
                                        <li key={pt} className="flex items-center gap-2.5 text-sm text-slate-700">
                                            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                                            <span className="font-medium">{pt}</span>
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
            <div ref={containerRef} className="relative" style={{ height: `${(total - 1) * 70 + 100}vh` }}>
                <div className="sticky top-0 h-screen w-screen overflow-hidden">
                    {phases.map((p, i) => (
                        <PhaseStackCard
                            key={p.title}
                            phase={p}
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

function PhaseStackCard({
    phase,
    index,
    total,
    scrollYProgress,
}: {
    phase: (typeof phases)[number];
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
    const transitions = total - 1;
    const windowSize = 1 / transitions;
    const center = index === 0 ? 0 : (index - 0.5) / transitions;
    const snapStart = Math.max(0, center - windowSize * 0.15);
    const snapEnd = Math.min(1, center + windowSize * 0.15);

    const y = useTransform(
        scrollYProgress,
        index === 0 ? [0, 0.001] : [snapStart, snapEnd],
        index === 0 ? ['0%', '0%'] : ['100%', '0%'],
    );

    const Icon = phase.Icon;

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
                <div className="relative min-h-[280px] md:min-h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={phase.image} alt={phase.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/55 via-transparent to-brand-900/40" />
                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow-sm">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </div>
                </div>

                <div className="px-8 md:px-14 lg:px-20 py-10 md:py-14 flex flex-col justify-center max-w-[720px]">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-8 pb-6 border-b border-slate-200">
                        Not a course.{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            A career launchpad
                        </span>
                    </h2>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-600/10 flex items-center justify-center text-brand-600">
                            <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                            {phase.period}
                        </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-5">
                        {phase.title}
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-7 max-w-xl">{phase.desc}</p>
                    <ul className="space-y-3">
                        {phase.points.map((pt) => (
                            <li key={pt} className="flex items-center gap-3 text-sm md:text-base text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                                <span className="font-medium">{pt}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.article>
    );
}

/* ─── Selection Process — 4-step horizontal carousel ─── */
const selectionSteps = [
    {
        title: 'Application',
        desc: 'Academic background, Python fundamentals, motivation, and programme fit.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Aptitude assessment',
        desc: 'Quantitative reasoning, logical thinking, data interpretation.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Technical screening',
        desc: 'Python proficiency and analytical problem-solving under real conditions.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Personal interview',
        desc: 'Communication quality, business thinking, and alignment with programme expectations.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
];

function SelectionCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile(1024);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 38, mass: 0.5 });
    const x = useTransform(smooth, [0, 1], ['0%', '-72%']);
    const trackFill = useTransform(smooth, [0, 0.95], ['0%', '100%']);

    if (isMobile) {
        return (
            <div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
                        The four-step{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            selection process
                        </span>
                    </h2>
                    <p className="text-sm text-slate-500">Designed to find the right 30, not many.</p>
                </div>
                <div className="relative -mx-4 md:-mx-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    <div className="flex gap-4 px-4 md:px-8 pb-2">
                        {selectionSteps.map((s, i) => (
                            <article
                                key={s.title}
                                className="snap-start shrink-0 w-[280px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/10 to-transparent" />
                                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow-sm">
                                        Step {String(i + 1).padStart(2, '0')}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">{s.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen">
            <div ref={containerRef} style={{ height: '180vh' }} className="relative">
                <div className="sticky top-0 h-screen w-screen overflow-hidden bg-white flex flex-col">
                    <div className="pt-16 md:pt-20 pb-6 px-6 md:px-12 xl:px-20">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                                The four-step{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                    selection process
                                </span>
                            </h2>
                            <p className="text-sm md:text-base text-slate-500 max-w-2xl">
                                Designed to find the right 30, not many.
                            </p>
                        </div>
                    </div>
                    <div className="px-6 md:px-12 xl:px-20 mb-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="h-px bg-slate-200 relative overflow-hidden">
                                <motion.div style={{ width: trackFill }} className="absolute left-0 top-0 h-full bg-brand-600" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center overflow-hidden">
                        <motion.div style={{ x }} className="flex gap-5 md:gap-6 will-change-transform pl-6 md:pl-12 xl:pl-20">
                            {selectionSteps.map((s, i) => (
                                <article
                                    key={s.title}
                                    className="group shrink-0 w-[320px] md:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative h-56 md:h-64 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/10 to-transparent" />
                                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-600 shadow-sm">
                                            Step {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div className="p-6 md:p-7">
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mb-2">{s.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                                    </div>
                                </article>
                            ))}
                            <div className="shrink-0 w-12" aria-hidden />
                        </motion.div>
                    </div>
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

/* ─── Apply Form — full-height split ─── */
function ApplyFormSection() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [qualification, setQualification] = useState('');
    const [python, setPython] = useState('');
    const [motivation, setMotivation] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const message = [
                mobile && `Mobile: ${mobile}`,
                qualification && `Qualification: ${qualification}`,
                python && `Python: ${python}`,
                motivation && `\nMotivation: ${motivation}`,
            ]
                .filter(Boolean)
                .join('\n');
            const res = await fetch('/api/enterprise-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    company: 'ECAP applicant',
                    message: message || 'ECAP application',
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Something went wrong.');
            setStatus('success');
            setName('');
            setMobile('');
            setEmail('');
            setQualification('');
            setPython('');
            setMotivation('');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    return (
        <section id="apply" className="relative lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 flex items-center px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-24"
            >
                <div className="w-full max-w-xl mx-auto lg:mx-0">
                    <div className="mb-4">
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            Apply for ECAP 2026
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                        Batch 1 starts{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            1 July 2026
                        </span>
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mb-10">
                        30 seats. Selective admission.
                    </p>

                    <form onSubmit={onSubmit} className="space-y-5" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Full name" required>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your full name"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Mobile" required>
                                <input
                                    required
                                    type="tel"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="+91 00000 00000"
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                        <Field label="Email" required>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Current qualification" required>
                            <select
                                required
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                className={`${inputCls} text-slate-700`}
                            >
                                <option value="">Select</option>
                                <option>Final year B.Tech / BE</option>
                                <option>Final year BCA / BBA</option>
                                <option>MBA (pursuing or completed)</option>
                                <option>Working professional (0–2 years)</option>
                                <option>Other</option>
                            </select>
                        </Field>
                        <Field label="Python proficiency">
                            <select
                                value={python}
                                onChange={(e) => setPython(e.target.value)}
                                className={`${inputCls} text-slate-700`}
                            >
                                <option value="">Select level</option>
                                <option>Beginner — basic syntax</option>
                                <option>Intermediate — can write scripts</option>
                                <option>Advanced — data manipulation and APIs</option>
                            </select>
                        </Field>
                        <Field label="Why ECAP?" required>
                            <textarea
                                required
                                rows={4}
                                value={motivation}
                                onChange={(e) => setMotivation(e.target.value)}
                                placeholder="Tell us why you are applying and what drives you toward enterprise consulting…"
                                className={`${inputCls} resize-none`}
                            />
                        </Field>
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-lg font-bold text-base transition-colors disabled:opacity-60 shadow-lg shadow-brand-600/25 inline-flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? 'Submitting…' : 'Submit application'}
                                {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                            </button>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <a
                                    href="https://wa.me/919999999999?text=I%20want%20to%20apply%20for%20ECAP%20July%202026"
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition font-medium"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Or apply via WhatsApp
                                </a>
                            </div>
                        </div>
                        {status === 'success' && (
                            <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg text-sm">
                                <div className="flex items-center gap-2 text-brand-700 font-semibold">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Application received — we&apos;ll be in touch shortly.
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

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative min-h-[320px] lg:min-h-screen"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/75 via-[#0a1628]/45 to-brand-900/60" />
                <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between text-white">
                    <div className="flex items-center gap-3">
                        <span className="block w-8 h-px bg-accent-300" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-300">
                            ECAP · Batch 2026
                        </span>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-white mb-5 max-w-lg">
                            We are not looking for many. We are looking for the right 30.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Applications reviewed weekly
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

/* ─── FAQ ─── */
const faqs = [
    {
        q: 'What is the ECAP programme?',
        a: "ECAP (Enterprise Career Acceleration Programme) is a 14-month SAP Techno-Functional AI Consultant programme run by Axentia AI. It combines classroom training, applied AI curriculum, and a paid internship on live enterprise projects via Orane Consulting.",
    },
    {
        q: 'Which SAP module will I be trained in?',
        a: "SAP module assignment — FICO, SD, or MM — happens at Month 8 based on a structured assessment matched to Orane Consulting's live project pipeline. This ensures candidates are trained in modules where live project experience is immediately available.",
    },
    {
        q: 'Is Phase 2 really a paid internship?',
        a: 'Yes. Phase 2 (Months 9–14) is a paid internship on real Orane Consulting client engagements. Interns earn up to ₹20,000 per month from Month 10. This is not a simulation — it is live consulting work.',
    },
    {
        q: 'What is the fee structure?',
        a: 'Fees are paid in staged tranches — at enrollment, Month 3, Month 6, and Month 8. Phase 2 earnings offset a significant portion of the total investment. Full fee details are shared at the interview stage.',
    },
    {
        q: 'Who should apply?',
        a: 'Final-year engineering, BCA or BBA students with Python proficiency, MBA aspirants seeking a structured path into SAP consulting, and early professionals (0–2 years) wanting a transition into enterprise consulting.',
    },
];

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

export default function ECAPPage() {
    return (
        <main className="bg-slate-50">
            <EcapHero />

            <StatsRow />

            {/* Phases stacking */}
            <section className="pt-20 md:pt-28 pb-0 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <div className="space-y-20 md:space-y-24">
                        <PhasesStack />
                        <SelectionCarousel />
                    </div>
                </div>
            </section>

            <ApplyFormSection />

            {/* FAQ */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12 max-w-4xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-10 text-center">
                        Frequently asked{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            questions
                        </span>
                    </h2>
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
