'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, BookOpen, Rocket } from 'lucide-react';

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

/* Hero — full-bleed dark image, single-line accent */
function SolutionsHero() {
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
            className="relative min-h-screen overflow-hidden bg-black text-white flex items-center"
        >
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
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
                            How Axentia AI works
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1.02]"
                        style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)' }}
                    >
                        <span className="block text-white">Three integrated pillars</span>
                        <span className="block mt-2">
                            <span className="text-white">One practical path </span>
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                                forward
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-xl leading-relaxed"
                    >
                        Each pillar stands on its own. Together they create the strongest path from clarity to execution.
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
                            href="/solutions/ai-strategy-sprint"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200 rounded-full"
                        >
                            Book an AI Strategy Sprint
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="#pillars"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                        >
                            Explore the pillars
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

const pillars = [
    {
        tag: 'Advisory',
        tagClass: 'bg-brand-600 text-white',
        iconClass: 'bg-white text-brand-600',
        Icon: Compass,
        title: 'Strategic AI Advisory',
        body: 'Clarify where AI creates business value, what to prioritise first, and how to build an execution path instead of running more experiments. Business-first thinking, enterprise process understanding.',
        footerLabel: 'Outcome',
        footerText: 'A prioritised AI roadmap with clear ownership, sequencing, and 90-day action steps.',
        cta: 'Book an AI Strategy Sprint',
        href: '/solutions/ai-strategy-sprint',
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80',
    },
    {
        tag: 'Capability',
        tagClass: 'bg-emerald-600 text-white',
        iconClass: 'bg-white text-emerald-600',
        Icon: BookOpen,
        title: 'AI Capability Academy',
        body: 'Build AI confidence and applied capability across leadership teams, business functions, and enterprise application environments. Every programme is tied to business context and practical use.',
        footerLabel: 'Programmes',
        footerText: 'Leadership Workshop · AI for Managers · ECAP · GCC Upskilling Cohorts',
        cta: 'Explore programmes',
        href: '/training/academy',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    },
    {
        tag: 'Execution',
        tagClass: 'bg-accent-600 text-white',
        iconClass: 'bg-white text-accent-600',
        Icon: Rocket,
        title: 'Applied Workflow Solutions',
        body: 'Deploy targeted AI accelerators around vendor onboarding, document intelligence, knowledge management, analytics support, and SAP workflows. Built around your processes, not generic templates.',
        footerLabel: 'Outcome',
        footerText: 'Live workflow automation. Measurable ROI within 90 days.',
        cta: 'Discuss a use case',
        href: '/solutions/use-cases',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    },
];

const entryPoints = [
    { entry: 'AI Strategy Sprint', expansion: 'Workflow deployment · Capability programme' },
    { entry: 'Leadership Workshop', expansion: 'Manager series · Organisation rollout' },
    { entry: 'ECAP', expansion: 'GCC talent pipeline · University partnerships' },
    { entry: 'GCC discovery', expansion: '6-month upskilling cohort · Custom programme' },
];

export default function SolutionsPage() {
    return (
        <main className="bg-slate-50">
            <SolutionsHero />

            {/* Pillars */}
            <section id="pillars" className="pt-20 md:pt-28 pb-0 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {pillars.map((p, i) => (
                            <motion.article
                                key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-44 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
                                    {/* Solid tag — top-left, fully opaque for legibility */}
                                    <span
                                        className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] shadow-md ${p.tagClass}`}
                                    >
                                        <span className="w-1 h-1 rounded-full bg-white/80" />
                                        {p.tag}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-7 flex flex-col flex-1">
                                    <div className="flex items-start gap-4 mb-5">
                                        <div
                                            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm ${p.iconClass.replace(
                                                'bg-white',
                                                'bg-slate-50',
                                            )}`}
                                        >
                                            <p.Icon className="w-5 h-5" strokeWidth={1.75} />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight pt-1">
                                            {p.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-5 flex-1">
                                        {p.body}
                                    </p>
                                    <div className="pt-5 border-t border-slate-100 mb-5">
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                                            {p.footerLabel}
                                        </div>
                                        <div className="text-sm text-slate-700 leading-relaxed">{p.footerText}</div>
                                    </div>
                                    <a
                                        href={p.href}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:gap-3 transition-all"
                                    >
                                        {p.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commercial logic — Entry → Expansion → Depth */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl bg-gradient-to-br from-brand-50 via-white to-slate-50 border border-brand-200/40 p-8 md:p-12 lg:p-14"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="block w-8 h-px bg-brand-600" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-600">
                                        Commercial logic
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                                    Entry →{' '}
                                    <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                        Expansion → Depth
                                    </span>
                                </h2>
                                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-lg">
                                    The most effective engagement starts with clarity. An AI Strategy Sprint or a
                                    Leadership Workshop gives leadership teams the prioritisation framework to decide
                                    where to invest. Capability programmes and workflow deployments follow from that
                                    decision — not before it.
                                </p>
                            </div>

                            <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                                <div className="grid grid-cols-[1fr_1.4fr] bg-slate-50 border-b border-slate-200 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    <div>Entry point</div>
                                    <div>Natural expansion</div>
                                </div>
                                {entryPoints.map((row, i) => (
                                    <motion.div
                                        key={row.entry}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                                        className="grid grid-cols-[1fr_1.4fr] px-5 py-4 border-b border-slate-100 last:border-0 text-sm"
                                    >
                                        <div className="font-semibold text-slate-900">{row.entry}</div>
                                        <div className="text-slate-600">{row.expansion}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA band */}
            <section className="relative overflow-hidden bg-[#0a1628] text-white py-20 md:py-28">
                <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/25 blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-5 max-w-3xl mx-auto"
                    >
                        Not sure which pillar fits{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300 text-[1.1em]">
                            first
                        </span>
                        ?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        An AI Strategy Sprint maps your priorities and determines the right sequence. That is the
                        logical starting point for most organisations.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                        <a
                            href="/solutions/ai-strategy-sprint"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors rounded-full"
                        >
                            Book an AI Strategy Sprint
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="https://wa.me/919999999999?text=I%20need%20help%20choosing%20the%20right%20Axentia%20AI%20solution"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors rounded-full"
                        >
                            WhatsApp us
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
