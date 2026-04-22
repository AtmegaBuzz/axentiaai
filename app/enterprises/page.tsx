'use client';

import { useRef, useState, useEffect, FormEvent } from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useInView,
} from 'framer-motion';
import {
    ArrowRight,
    Quote,
    Clock,
    Layers,
    UserPlus,
    MessageCircle,
    ChevronDown,
    CheckCircle2,
    Brain,
    Headphones,
    Cog,
    Eye,
    BarChart3,
    Users,
    Database,
} from 'lucide-react';
import Image from 'next/image';

/* ─── Data ─── */

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

const threeWays = [
    {
        badge: '6-MONTH COHORT',
        title: 'AI Upskilling Cohorts',
        desc: 'Structured AI capability programme for GCC middle layers. AI foundations → domain application → build and deploy. Role-persona-aligned journeys across technical, operations, and business functions.',
        meta: '6 months · October 2026 cohort open',
        Icon: Clock,
        accent: 'brand',
    },
    {
        badge: 'BESPOKE DESIGN',
        title: 'Custom Talent Development',
        desc: "AI upskilling designed around the client's internal role taxonomy. Scoped through a discovery and design phase before delivery. Axentia-branded, client-hosted. 3–6 months per programme.",
        meta: '3–6 months · Bespoke scope',
        Icon: Layers,
        accent: 'brand',
    },
    {
        badge: 'POST JULY 2026',
        title: 'ECAP Talent Pipeline',
        desc: 'Pre-validated SAP + AI consultant graduates available as preferred-access hires for GCC talent pipelines. Candidates have live project experience from ECAP Phase 2.',
        meta: 'Placement integration',
        Icon: UserPlus,
        accent: 'gold',
    },
];

const whyNowStats = [
    {
        value: '55%',
        title: 'Displacement Pressure',
        desc: 'Over half of current GCC portfolio tasks are highly susceptible to automation within the next product cycle.',
        source: 'Zinnov, March 2026',
        tone: 'red',
    },
    {
        value: null,
        Icon: Brain,
        title: "The Domain 'Grey-Hair' Gap",
        desc: 'Deep institutional knowledge is retiring while incoming talent lacks the contextual understanding to effectively prompt AI systems.',
        source: 'Zinnov, March 2026',
        tone: 'gold',
    },
    {
        value: '70+',
        title: 'Retail / CPG GCCs',
        desc: '85K+ professionals across these GCCs — most AI upskilling is still ad-hoc and disconnected from role taxonomy.',
        source: 'NASSCOM / ANSR, April 2025',
        tone: 'purple',
    },
];

const ease = [0.16, 1, 0.3, 1] as const;

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

/* ─── Hero — current bg + animation, reference copy + structure ─── */

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
        <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden bg-black">
            {/* Static BG Image — slow parallax (UNCHANGED) */}
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

            {/* Reference glow orbs */}
            <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-brand-600/15 blur-[140px] pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none z-0" />

            {/* Content — fast parallax */}
            <motion.div
                className="relative z-10 flex flex-col h-full min-h-screen max-w-7xl mx-auto w-full px-6 md:px-12 xl:px-20 will-change-transform pt-28 pb-20"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="flex flex-col items-center justify-center flex-1 text-center">
                    {/* Eyebrow badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-10"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-300" />
                        <span className="text-xs font-bold tracking-[0.18em] text-white/85 uppercase">
                            GCC &amp; Global Service Integrators
                        </span>
                    </motion.div>

                    {/* Heading — kept ShinyText animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease }}
                        className="font-bold tracking-tight text-white leading-[1.05] mb-8 max-w-4xl"
                        style={{ fontSize: 'clamp(2.8rem, 6vw, 4.75rem)' }}
                    >
                        AI upskilling for GCCs and<br />
                        <ShinyText className="font-[family-name:var(--font-playfair)] italic font-normal">
                            global service integrators.
                        </ShinyText>
                    </motion.h1>

                    {/* Typewriter subtext */}
                    <div className="text-lg md:text-xl text-white/75 font-light leading-relaxed max-w-3xl mb-12 min-h-[5rem]">
                        <TypewriterText
                            text="More than half the GCC work portfolio in India today is under direct threat of AI displacement. The window to build AI-ready talent is now — not in another product cycle."
                            delay={1.2}
                            speed={20}
                        />
                    </div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a
                            href="#enquiry"
                            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all shadow-lg shadow-brand-600/30 inline-flex items-center gap-2"
                        >
                            Start a GCC conversation
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                            href="#three-ways"
                            className="px-8 py-4 rounded-lg font-semibold text-base text-white border border-white/25 hover:bg-white/5 transition-all"
                        >
                            How we work
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

/* ─── Opening Quote ─── */

function OpeningQuoteSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-slate-50 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <Quote className="w-14 h-14 mx-auto text-brand-600/25 mb-6" strokeWidth={1.5} />
                </motion.div>
                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] italic text-slate-900 leading-[1.35] mb-10 font-normal"
                >
                    &ldquo;55% of GCC portfolios are under displacement pressure. AI is compressing the journey from
                    expertise to automation into a single product cycle. We do not have another decade to adapt.&rdquo;
                </motion.blockquote>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase"
                >
                    Zinnov × Indiaspora — GCC AI Opportunity Report, March 2026
                </motion.p>
            </div>
        </section>
    );
}

/* ─── Photo Mosaic ─── */

function PhotoMosaicSection() {
    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="md:col-span-3 relative h-[260px] md:h-[440px] overflow-hidden"
                >
                    <Image
                        src="/images/enterprise/modern-office-collaboration.jpg"
                        alt="GCC tech park"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-[#0b1c30]/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                        <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-accent-300/95 mb-2">
                            Hinjewadi · Electronic City · HITEC City · Gurugram
                        </div>
                        <p className="text-white text-xl md:text-2xl font-[family-name:var(--font-playfair)] italic leading-[1.2]">
                            Where the next decade of GCC work gets decided.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="md:col-span-2 relative h-[260px] md:h-[440px] overflow-hidden"
                >
                    <Image
                        src="/images/enterprise/team-working-together.jpg"
                        alt="GCC teams at work"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-700/85 via-brand-700/35 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                        <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/85 mb-2">
                            Role-calibrated cohorts
                        </div>
                        <p className="text-white text-xl md:text-2xl font-[family-name:var(--font-playfair)] italic leading-[1.2]">
                            Fluency — not just training.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── Three Ways ─── */

function ThreeWaysSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <section id="three-ways" ref={ref} className="py-28 md:py-32 px-6 md:px-16 bg-white relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 md:mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-bold tracking-[0.18em] text-brand-600 uppercase mb-5 flex items-center justify-center gap-3"
                    >
                        <span className="w-8 h-px bg-brand-600" />
                        THREE WAYS AXENTIA WORKS WITH GCCS
                        <span className="w-8 h-px bg-brand-600" />
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
                    >
                        A structured capability partner.<br />
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-brand-600">
                            Not a training vendor.
                        </span>
                    </motion.h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {threeWays.map((card, i) => {
                        const isGold = card.accent === 'gold';
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                                className="bg-slate-50 p-10 rounded-xl shadow-sm hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-slate-200/60 group relative overflow-hidden"
                            >
                                <div
                                    className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-0 group-hover:scale-110 transition-transform ${
                                        isGold ? 'bg-accent-300/15' : 'bg-brand-600/5'
                                    }`}
                                />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-6">
                                        <span
                                            className={`inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${
                                                isGold
                                                    ? 'bg-accent-300 text-amber-900'
                                                    : 'bg-slate-200 text-brand-600'
                                            }`}
                                        >
                                            {card.badge}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h4>
                                    <p className="text-slate-600 leading-relaxed mb-4 flex-grow text-[15px]">
                                        {card.desc}
                                    </p>
                                    <div className="pt-6 border-t border-slate-200 flex items-center gap-3 text-sm text-slate-600 font-medium">
                                        <card.Icon className="w-5 h-5 text-brand-600" />
                                        {card.meta}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─── Scroll-driven image layer (KEPT — unchanged) ─── */

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

/* ─── What We Build (KEPT — unchanged scroll-driven stacking) ─── */

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
                <div className="h-full grid lg:grid-cols-2">
                    <div className="flex flex-col h-full px-8 md:px-14 lg:px-20 relative z-10 pt-24 bg-slate-50 border-r border-slate-200 overflow-hidden">
                        {/* Subtle brand ambient */}
                        <div className="absolute top-0 -left-20 w-[400px] h-[400px] rounded-full bg-brand-300/15 blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-accent-300/10 blur-[100px] pointer-events-none" />

                        <span className="self-start inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            What We Build
                        </span>

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
                                    <span className="font-[family-name:var(--font-playfair)] italic text-brand-600 text-3xl mb-4 block leading-none">
                                        {String(activeIdx + 1).padStart(2, '0')}
                                        <span className="text-slate-300"> / {String(totalAreas).padStart(2, '0')}</span>
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                                        {areas[activeIdx].title}
                                    </h2>
                                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
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
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" />
                                                <span className="text-slate-700 text-base font-medium">{b}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>

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
                                            idx === activeIdx ? 'text-slate-900' : 'text-slate-300'
                                        }`}
                                    >
                                        {area.title}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

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

/* ─── Why Now ─── */

function WhyNowSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <section ref={ref} className="py-28 md:py-32 px-6 md:px-16 bg-[#1a0d2e] text-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-700/30 rounded-full blur-[140px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-600/10 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-start">
                <div className="flex flex-col justify-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-bold tracking-[0.18em] text-brand-300 uppercase mb-6 flex items-center gap-3"
                    >
                        <span className="w-8 h-px bg-brand-300" />WHY NOW
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold leading-[1.1] mb-8"
                    >
                        GCCs that build AI-ready talent now will be the ones that{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300">
                            matter in 2028.
                        </span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-white/75 leading-relaxed mb-10 font-light max-w-xl"
                    >
                        The Zinnov data is clear: 55% displacement pressure, a domain grey-hair gap, and T-shaped
                        talent shortages. Axentia&apos;s programmes address all three.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="#enquiry"
                            className="bg-accent-300 hover:bg-accent-400 text-amber-900 px-7 py-3.5 rounded-lg font-semibold text-base transition-all flex items-center gap-2"
                        >
                            Start a GCC conversation
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="https://wa.me/919999999999"
                            target="_blank"
                            rel="noopener"
                            className="border border-brand-300/30 text-brand-300 px-7 py-3.5 rounded-lg font-semibold text-base hover:bg-brand-300/10 transition-all flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp us
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    {whyNowStats.map((stat, i) => {
                        const toneRing =
                            stat.tone === 'red'
                                ? 'bg-red-500/15 border-red-400/30 text-red-300'
                                : stat.tone === 'gold'
                                    ? 'bg-accent-300/20 border-accent-300/30 text-accent-300'
                                    : 'bg-brand-600/20 border-brand-300/30 text-brand-300';
                        return (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                                className="bg-white/[0.06] backdrop-blur-xl border border-white/15 p-7 rounded-xl flex items-start gap-6 hover:bg-white/10 transition-colors"
                            >
                                <div
                                    className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center border ${toneRing}`}
                                >
                                    {stat.value ? (
                                        <span className="text-xl font-bold">{stat.value}</span>
                                    ) : stat.Icon ? (
                                        <stat.Icon className="w-6 h-6" />
                                    ) : null}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2 text-white">{stat.title}</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">{stat.desc}</p>
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-accent-300 mt-3">
                                        {stat.source}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─── Enquiry Form ─── */

function EnquirySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [exploring, setExploring] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const composedMessage = [
                role && `Role: ${role}`,
                exploring && `Exploring: ${exploring}`,
                message && `\n${message}`,
            ]
                .filter(Boolean)
                .join('\n');

            const res = await fetch('/api/enterprise-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    company,
                    message: composedMessage || 'GCC enquiry',
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Something went wrong.');
            setStatus('success');
            setName('');
            setCompany('');
            setEmail('');
            setRole('');
            setExploring('');
            setMessage('');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    return (
        <section
            id="enquiry"
            ref={ref}
            className="relative lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50"
        >
            {/* Left: form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 flex items-center px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-24"
            >
                <div className="w-full max-w-xl mx-auto lg:mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            Ready to start the conversation
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3"
                    >
                        Pilot proposals open for{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            October 2026
                        </span>{' '}
                        cohorts
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="text-slate-600 text-sm md:text-base mb-10"
                    >
                        Tell us about your GCC, team size, and what you&apos;re trying to build. We&apos;ll respond
                        within 48 hours.
                    </motion.p>

                    <form onSubmit={onSubmit} className="space-y-6" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Name" required>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full name"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Company" required>
                                <input
                                    required
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="GCC / organisation name"
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            <Field label="Role" optional>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="e.g. Head of L&D"
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                        <Field label="What are you exploring?">
                            <div className="relative">
                                <select
                                    value={exploring}
                                    onChange={(e) => setExploring(e.target.value)}
                                    className={`${inputCls} appearance-none pr-10`}
                                >
                                    <option value="">Select an option</option>
                                    <option>6-month AI upskilling cohort</option>
                                    <option>Custom talent programme</option>
                                    <option>ECAP hire pipeline</option>
                                    <option>General discussion</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </Field>
                        <Field label="Message" optional>
                            <textarea
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us about your GCC, team size, and what you're trying to build…"
                                className={`${inputCls} resize-none`}
                            />
                        </Field>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white py-4 rounded-lg font-bold text-base transition-colors shadow-lg shadow-brand-600/25 inline-flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? 'Sending…' : 'Start a GCC conversation'}
                                {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                            </button>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <a
                                    href="https://wa.me/919999999999"
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
                                    Thanks — we&apos;ll be in touch within 48 hours.
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
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative min-h-[320px] lg:min-h-screen"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/75 via-[#0a1628]/45 to-brand-900/60" />
                <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between text-white">
                    <div className="flex items-center gap-3">
                        <span className="block w-8 h-px bg-accent-300" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-300">
                            GCC engagement
                        </span>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-white mb-5 max-w-lg">
                            Build AI-ready talent before the next product cycle makes it urgent.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Response within 48 hours
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

const inputCls =
    'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition';

function Field({
    label,
    required,
    optional,
    children,
}: {
    label: string;
    required?: boolean;
    optional?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="block text-[11px] font-bold tracking-wider uppercase text-slate-700 mb-2">
                {label}{' '}
                {required && <span className="text-brand-600">*</span>}
                {optional && (
                    <span className="font-normal text-slate-400 normal-case tracking-normal">optional</span>
                )}
            </span>
            {children}
        </label>
    );
}

/* ─── Page ─── */

export default function EnterprisesPage() {
    return (
        <main>
            <HeroSection />
            <OpeningQuoteSection />
            <PhotoMosaicSection />
            <ThreeWaysSection />
            <WhatWeBuildSection />
            <WhyNowSection />
            <EnquirySection />
        </main>
    );
}
