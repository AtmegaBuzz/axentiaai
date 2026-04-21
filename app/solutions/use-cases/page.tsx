'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    MessageCircle,
    ClipboardCheck,
    FileText,
    Users,
    Brain,
    BarChart3,
    Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

/* Hero — full-bleed dark bg, single-line accent */
function UseCasesHero() {
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
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80"
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
                            Applied AI in practice
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1.02]"
                        style={{ fontSize: 'clamp(2rem, 4.8vw, 4rem)' }}
                    >
                        <span className="block text-white">Where AI creates value in</span>
                        <span className="block mt-2">
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                                enterprise workflows
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-2xl leading-relaxed"
                    >
                        The best AI use cases sit closest to an important workflow, a recurring decision, or a costly
                        delay. Every use case below starts with the business problem — not the technology.
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
                            href="#use-cases"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                        >
                            Explore use cases
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

type UseCase = {
    icon: LucideIcon;
    category: string;
    title: string;
    problem: string;
    outcome: string;
};

const useCases: UseCase[] = [
    {
        icon: ClipboardCheck,
        category: 'Operations · Finance',
        title: 'Vendor onboarding & compliance automation',
        problem:
            'Slow onboarding timelines, fragmented document checks, and inconsistent policy enforcement across teams.',
        outcome:
            'Faster onboarding, cleaner compliance flow, reduced manual back-and-forth, and a single audit trail per vendor.',
    },
    {
        icon: FileText,
        category: 'Finance · Legal · Procurement',
        title: 'Document & invoice intelligence',
        problem:
            'Teams spending too much time reading, sorting, validating, and routing high-volume business documents.',
        outcome:
            'Accurate extraction, faster turnaround, reduced manual effort, and consistent review quality at scale.',
    },
    {
        icon: Users,
        category: 'HR · Shared Services',
        title: 'HR & employee service assistant',
        problem:
            'Employees and HR teams spending significant time on repetitive policy queries, leave calculations, and onboarding guidance.',
        outcome:
            'Higher self-service rates, consistent policy responses, reduced HR team burden, and better employee experience.',
    },
    {
        icon: Brain,
        category: 'Operations · Customer Support',
        title: 'Enterprise knowledge copilot',
        problem:
            'Support and operations teams unable to quickly find correct answers across scattered SOPs, wikis, and product docs.',
        outcome:
            'Quicker, more consistent retrieval — lower friction in support interactions, reduced expert dependency.',
    },
    {
        icon: BarChart3,
        category: 'Finance · Operations · Strategy',
        title: 'Analytics support for finance & operations',
        problem:
            'Leaders have reports but struggle to interpret changes, identify root causes, and communicate decisions efficiently.',
        outcome:
            'Faster narrative support, AI-surfaced follow-up questions, and improved decision rhythm for leadership.',
    },
    {
        icon: Settings,
        category: 'SAP · Enterprise IT',
        title: 'SAP & enterprise application support',
        problem:
            'Application users depending on a small group of SAP experts for repeated process guidance, triage, and workarounds.',
        outcome:
            'Higher self-service, smoother issue triage, reduced expert dependency, and better enablement across the SAP user base.',
    },
];

function UseCaseCard({ uc, index }: { uc: UseCase; index: number }) {
    const Icon = uc.icon;
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease }}
            className="group relative rounded-2xl bg-white border border-slate-200 p-6 md:p-7 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 flex flex-col"
        >
            <div className="grid grid-cols-[auto_1fr] gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1.5">
                        {uc.category}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                        {uc.title}
                    </h3>
                </div>
            </div>

            <div className="mb-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1.5">
                    The problem
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{uc.problem}</p>
            </div>

            <div className="mt-auto p-4 rounded-lg bg-emerald-50/60 border border-emerald-200/50">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 mb-1.5">
                    Outcome direction
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{uc.outcome}</p>
            </div>
        </motion.article>
    );
}

export default function UseCasesPage() {
    return (
        <main className="bg-slate-50">
            <UseCasesHero />

            {/* Use cases grid */}
            <section id="use-cases" className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {useCases.map((uc, i) => (
                            <UseCaseCard key={uc.title} uc={uc} index={i} />
                        ))}
                    </div>

                    {/* Inline CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-16 md:mt-20"
                    >
                        <p className="text-base md:text-lg text-slate-600 mb-6">
                            Want to explore a specific use case for your organisation?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                            <a
                                href="/solutions/ai-strategy-sprint"
                                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-7 text-sm transition-colors rounded-full shadow-lg shadow-brand-600/25"
                            >
                                Book an AI Strategy Sprint
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="https://wa.me/919999999999?text=I%20want%20to%20discuss%20an%20AI%20use%20case"
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 font-semibold py-3 px-7 text-sm transition-colors rounded-full"
                            >
                                <MessageCircle className="w-4 h-4 text-emerald-500" />
                                WhatsApp to discuss
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bottom CTA band matching Sprint page */}
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
                        Start from the{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300 text-[1.1em]">
                            workflow
                        </span>
                        , not the technology
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        An AI Strategy Sprint prioritises which of these use cases to sequence first for your
                        organisation — grounded in your actual operations and governance posture.
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
                            href="https://wa.me/919999999999?text=I%20want%20to%20discuss%20an%20AI%20use%20case"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors rounded-full"
                        >
                            WhatsApp to discuss
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
