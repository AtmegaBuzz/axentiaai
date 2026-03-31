'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const MacBookViewer = dynamic(
    () => import('./MacBookViewer').then(m => ({ default: m.MacBookViewer })),
    { ssr: false, loading: () => <div style={{ height: '460px' }} /> }
);

const leftCards = [
    {
        label: 'SAP Integration',
        status: 'Native',
        statusDot: 'bg-blue-400',
        title: 'Deep inside SAP',
        desc: 'S/4HANA · Joule · BTP · SuccessFactors · Analytics Cloud · PM / PS',
        delay: 0.2,
    },
    {
        label: 'In Practice',
        status: 'Live',
        statusDot: 'bg-emerald-400',
        title: 'Woven into daily work',
        desc: 'AI shapes decisions as they happen, drawing on existing data and processes inside your systems.',
        delay: 0.35,
    },
];

const rightCards = [
    {
        label: 'Capabilities',
        status: 'Enterprise',
        statusDot: 'bg-[#C010DA]',
        title: 'Real operational AI',
        desc: 'Demand forecasting, invoice processing, HR copilot, maintenance planning, workflow execution.',
        delay: 0.25,
    },
    {
        label: 'Track Record',
        status: 'Global',
        statusDot: 'bg-amber-400',
        title: '50+ Enterprises',
        desc: '16+ years of SAP delivery. 300+ certified professionals across industries.',
        delay: 0.4,
    },
];


export function SAPAISection() {
    return (
        <section
            className="relative overflow-hidden border-b border-white/5"
            style={{ background: 'linear-gradient(160deg, #2a0845 0%, #3b1068 35%, #1e2a50 65%, #2a0845 100%)' }}
        >
            {/* Background arc SVG */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] opacity-[0.07]" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice">
                    {[200, 320, 440, 560, 680].map((r, i) => (
                        <ellipse key={i} cx="600" cy="600" rx={r} ry={r * 0.55} stroke="white" strokeWidth="1" />
                    ))}
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #8A29AC 0%, transparent 70%)' }} />
                <div className="absolute left-1/4 top-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl bg-blue-500" />
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 pt-20 md:pt-32 pb-0">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-5"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/25 bg-white/12 text-slate-200 text-xs font-bold uppercase tracking-widest">
                            Integration at the core
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-blue-400 to-[#C010DA] bg-clip-text text-transparent">SAP + AI</span>
                        {', '}working within your business
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        We bring AI into SAP environments so it becomes part of how work is done across teams — from planning and operations to people and finance.
                    </motion.p>
                </div>

                {/* Desktop: floating cards + 3D laptop */}
                <div className="hidden md:grid grid-cols-[260px_1fr_260px] lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[300px_1fr_300px] gap-6 items-center">

                    {/* Left cards */}
                    <div className="flex flex-col gap-5">
                        {leftCards.map((card) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: card.delay }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-slate-400 font-medium">{card.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${card.statusDot}`} />
                                        <span className="text-xs text-slate-400 font-medium">{card.status}</span>
                                    </div>
                                </div>
                                <p className="text-base font-bold text-white mb-2 leading-snug">{card.title}</p>
                                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* 3D Laptop */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-end justify-center pb-4"
                    >
                        <MacBookViewer />
                    </motion.div>

                    {/* Right cards */}
                    <div className="flex flex-col gap-5">
                        {rightCards.map((card) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: card.delay }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-slate-400 font-medium">{card.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${card.statusDot}`} />
                                        <span className="text-xs text-slate-400 font-medium">{card.status}</span>
                                    </div>
                                </div>
                                <p className="text-base font-bold text-white mb-2 leading-snug">{card.title}</p>
                                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden flex flex-col gap-4 pb-12">
                    <div className="grid grid-cols-1 gap-4">
                        {[...leftCards, ...rightCards].map((card) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-slate-400 font-medium">{card.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${card.statusDot}`} />
                                        <span className="text-xs text-slate-400 font-medium">{card.status}</span>
                                    </div>
                                </div>
                                <p className="text-base font-bold text-white mb-2">{card.title}</p>
                                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center pt-4 pb-8">
                        <MacBookViewer />
                    </div>
                </div>
            </div>

            {/* Certified Capability panel */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-16 md:py-20">
                <div className="max-w-5xl mx-auto border border-white/20 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, #8A29AC, transparent)' }} />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-15" style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3"
                        >
                            Certified Capability
                        </motion.p>
                        <motion.h3
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4"
                        >
                            Trained for{' '}
                            <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                real outcomes
                            </span>
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.14 }}
                            className="text-base md:text-lg text-slate-400 leading-relaxed"
                        >
                            Every academy is built around how decisions actually get made, how workflows actually run, and how delivery actually happens inside organisations.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10 flex flex-col gap-3 shrink-0"
                    >
                        {[
                            'You learn by doing the real thing',
                            'Inside live SAP environments',
                            'Guided by certified practitioners',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span className="text-white/90 font-medium text-sm">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
