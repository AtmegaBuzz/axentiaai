'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ── Audience section ─────────────────────────────────────────────── */
export function AudienceSection() {
    return (
        <section className="bg-white py-20 md:py-28 border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 md:mb-16"
                >
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-5">
                        Individual Paths
                    </span>
                    <h2
                        className="font-black text-slate-900 tracking-tight leading-[0.95]"
                        style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
                    >
                        Who this is{' '}
                        <span style={{ WebkitTextStroke: '1.5px #8A29AC', color: 'transparent' }}>
                            for
                        </span>
                    </h2>
                </motion.div>

                {/* Two audience cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200">

                    {/* Card 1 — Students & Early Career */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-slate-900 flex flex-col px-10 py-12 lg:border-r border-slate-700 relative overflow-hidden"
                    >
                        {/* Ghosted number */}
                        <span
                            aria-hidden
                            className="absolute -bottom-4 -right-2 font-black leading-none text-white/[0.04] select-none pointer-events-none"
                            style={{ fontSize: '10rem' }}
                        >
                            01
                        </span>

                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-5">
                            01 — Students &amp; Early Career
                        </p>

                        <h3
                            className="font-black text-white tracking-tight leading-tight mb-5"
                            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}
                        >
                            Students &amp; Early Career
                        </h3>

                        <div
                            className="mb-6 shrink-0"
                            style={{ width: 32, height: '2px', background: 'linear-gradient(to right, #8A29AC, transparent)' }}
                        />

                        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                            The gap between certification and employability is where most programmes fail.
                            Axentia.AI closes it. You learn inside real enterprise contexts, develop the SAP
                            and AI skills enterprises actually hire for, and enter the job market through a
                            network that is already placing people.
                        </p>

                        <ul className="space-y-3 mt-auto">
                            {[
                                'Exposure to real use cases',
                                'Tracks across SAP and AI',
                                'Entry into live environments',
                            ].map((pt) => (
                                <li key={pt} className="flex items-start gap-3">
                                    <span className="w-1 h-1 rounded-full bg-[#8A29AC] shrink-0 mt-2" />
                                    <span className="text-slate-300 text-sm leading-snug">{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Card 2 — Working Professionals */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white flex flex-col px-10 py-12 relative overflow-hidden border-t lg:border-t-0 border-slate-200"
                    >
                        {/* Ghosted number */}
                        <span
                            aria-hidden
                            className="absolute -bottom-4 -right-2 font-black leading-none text-slate-900/[0.04] select-none pointer-events-none"
                            style={{ fontSize: '10rem' }}
                        >
                            02
                        </span>

                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-5">
                            02 — Working Professionals
                        </p>

                        <h3
                            className="font-black text-slate-900 tracking-tight leading-tight mb-5"
                            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}
                        >
                            Working Professionals
                        </h3>

                        <div
                            className="mb-6 shrink-0"
                            style={{ width: 32, height: '2px', background: 'linear-gradient(to right, #8A29AC, transparent)' }}
                        />

                        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
                            Build on what you already know and move into roles that sit closer to enterprise
                            systems and workflows.
                        </p>

                        <ul className="space-y-3 mt-auto">
                            {[
                                'Flexible progression paths',
                                'Industry-aligned tracks',
                                'Hands-on project exposure',
                            ].map((pt) => (
                                <li key={pt} className="flex items-start gap-3">
                                    <span className="w-1 h-1 rounded-full bg-[#8A29AC] shrink-0 mt-2" />
                                    <span className="text-slate-700 text-sm leading-snug">{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

/* ── Start Now CTA section ────────────────────────────────────────── */
const steps = [
    {
        number: '01',
        title: 'Book AI Discovery Workshop',
        meta: '2 hrs',
        points: ['Identify use cases', 'Define a clear starting point'],
        href: '#',
    },
    {
        number: '02',
        title: 'Launch Your First AI Pilot',
        meta: '4–8 weeks',
        points: ['Put a use case into motion', 'Within your workflows'],
        href: '#',
    },
    {
        number: '03',
        title: 'Join a Talent Academy',
        meta: 'Open enrollment',
        points: ['Build capability across AI, SAP', 'And industry tracks'],
        href: '#',
    },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function StartNowSection() {
    return (
        <section className="bg-slate-50 py-20 md:py-28 border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">

                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-5">
                            Get Started
                        </span>
                        <h2
                            className="font-black text-slate-900 tracking-tight leading-[0.95]"
                            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
                        >
                            Start{' '}
                            <motion.span
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    display: 'inline-block',
                                    WebkitTextStroke: '1.5px #8A29AC',
                                    color: 'transparent',
                                }}
                            >
                                Now
                            </motion.span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
                        className="text-slate-500 text-sm leading-relaxed max-w-xs lg:pb-3 lg:text-right"
                    >
                        A simple way to begin — understand where this fits,
                        see it in action, and take it forward at your pace.
                    </motion.p>
                </div>

                {/* 3-step cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 border border-slate-200"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {steps.map((s, i) => (
                        <motion.a
                            key={s.number}
                            href={s.href}
                            variants={cardVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                            className={[
                                'group flex flex-col bg-white px-8 py-10 relative overflow-hidden',
                                'transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/80',
                                i < 2 ? 'md:border-r border-slate-200' : '',
                                i < 2 ? 'border-b md:border-b-0 border-slate-200' : '',
                            ].join(' ')}
                        >
                            {/* Ghosted number backdrop */}
                            <span
                                aria-hidden
                                className="absolute -bottom-4 -right-2 font-black leading-none text-slate-900/[0.04] select-none pointer-events-none"
                                style={{ fontSize: '8rem' }}
                            >
                                {s.number}
                            </span>

                            {/* Step number */}
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-5">
                                {s.number}
                            </p>

                            {/* Meta (duration) */}
                            <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full mb-5 w-fit">
                                {s.meta}
                            </span>

                            {/* Title */}
                            <h3
                                className="font-black text-slate-900 tracking-tight leading-tight mb-5"
                                style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}
                            >
                                {s.title}
                            </h3>

                            {/* Accent line */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: 32 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: 'easeOut' }}
                                className="mb-5 shrink-0"
                                style={{ height: '2px', background: 'linear-gradient(to right, #8A29AC, transparent)' }}
                            />

                            {/* Points */}
                            <ul className="space-y-2 mb-8">
                                {s.points.map((pt) => (
                                    <li key={pt} className="flex items-start gap-3">
                                        <span className="w-1 h-1 rounded-full bg-[#8A29AC] shrink-0 mt-2" />
                                        <span className="text-slate-500 text-sm leading-snug">{pt}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Arrow CTA */}
                            <div className="mt-auto flex items-center gap-2 text-[#8A29AC] text-sm font-bold group-hover:gap-3 transition-all duration-200">
                                Learn more
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
