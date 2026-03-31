'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const MacBookViewer = dynamic(
    () => import('./MacBookViewer').then(m => ({ default: m.MacBookViewer })),
    { ssr: false, loading: () => <div style={{ height: '480px' }} /> }
);

const leftCards = [
    {
        label: 'SAP Integration',
        status: 'Native',
        statusColor: 'bg-blue-500',
        title: 'Deep inside SAP',
        desc: 'S/4HANA · Joule · BTP · SuccessFactors · Analytics Cloud · PM / PS',
        delay: 0.2,
    },
    {
        label: 'In Practice',
        status: 'Live',
        statusColor: 'bg-emerald-500',
        title: 'Woven into daily work',
        desc: 'AI shapes decisions as they happen, drawing on existing data and processes inside your systems.',
        delay: 0.35,
    },
];

const rightCards = [
    {
        label: 'Capabilities',
        status: 'Enterprise',
        statusColor: 'bg-[#8A29AC]',
        title: 'Real operational AI',
        desc: 'Demand forecasting, invoice processing, HR copilot, maintenance planning, workflow execution.',
        delay: 0.25,
    },
    {
        label: 'Track Record',
        status: 'Global',
        statusColor: 'bg-amber-500',
        title: '50+ Enterprises',
        desc: '16+ years of SAP delivery. 300+ certified professionals across industries.',
        delay: 0.4,
    },
];

function InfoCard({ card, direction, tilted }: { card: typeof leftCards[0]; direction: 'left' | 'right'; tilted?: boolean }) {
    const tiltDeg = tilted
        ? direction === 'left' ? '2deg' : '-2deg'
        : direction === 'left' ? '-1.5deg' : '1.5deg';

    return (
        <motion.div
            initial={{ opacity: 0, x: direction === 'left' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: card.delay }}
            whileHover={{ rotate: 0, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            style={{ rotate: tiltDeg }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(138,41,172,0.1)] hover:border-[#8A29AC]/20 transition-all duration-300 cursor-default"
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{card.label}</span>
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${card.statusColor}`} />
                    <span className="text-[10px] font-semibold text-slate-400">{card.status}</span>
                </div>
            </div>
            <p className="text-base font-bold text-slate-900 mb-2 leading-snug">{card.title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
        </motion.div>
    );
}

export function SAPAISection() {
    return (
        <section className="relative bg-[#f8f6fb] border-b border-slate-100">

            {/* Subtle brand blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.04] blur-[80px]"
                    style={{ background: 'radial-gradient(ellipse, #8A29AC 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-[60px]"
                    style={{ background: 'radial-gradient(circle, #C010DA 0%, transparent 70%)' }} />
                {/* Arc lines */}
                <svg className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] opacity-[0.04]"
                    viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
                    {[180, 300, 420, 540, 660].map((r, i) => (
                        <ellipse key={i} cx="600" cy="500" rx={r} ry={r * 0.5} stroke="#8A29AC" strokeWidth="1" />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 pt-20 md:pt-28 pb-0 overflow-visible">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-5"
                    >
                        <span
                            className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest"
                            style={{ background: '#F7C87A', color: '#232322' }}
                        >
                            Integration at the core
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">SAP + AI</span>
                        {', '}working within your business
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto"
                    >
                        We bring AI into SAP environments so it becomes part of how work is done across teams — from planning and operations to people and finance.
                    </motion.p>
                </div>

                {/* Desktop: cards + 3D laptop */}
                <div className="hidden md:grid grid-cols-[260px_1fr_260px] lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[300px_1fr_300px] gap-6 items-center overflow-visible">
                    <div className="flex flex-col gap-5">
                        {leftCards.map((c, i) => (
                            <div key={c.title} className={i === 1 ? 'mt-6 translate-x-[30%]' : ''}>
                                <InfoCard card={c} direction="left" tilted={i === 1} />
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center overflow-visible"
                    >
                        <MacBookViewer />
                    </motion.div>

                    <div className="flex flex-col gap-5">
                        {rightCards.map((c, i) => (
                            <div key={c.title} className={i === 1 ? 'mt-6 -translate-x-[30%]' : ''}>
                                <InfoCard card={c} direction="right" tilted={i === 1} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden flex flex-col gap-4 pb-8">
                    {[...leftCards, ...rightCards].map(card => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-slate-500 font-medium">{card.label}</span>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${card.statusColor}`} />
                                    <span className="text-xs text-slate-500 font-medium">{card.status}</span>
                                </div>
                            </div>
                            <p className="text-base font-bold text-slate-900 mb-2">{card.title}</p>
                            <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                    <MacBookViewer />
                </div>
            </div>

            {/* Certified Capability panel */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-16 md:py-20">
                <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-[0.06]"
                        style={{ background: 'radial-gradient(circle, #8A29AC, transparent)' }} />

                    <div className="relative z-10 flex-1 text-center md:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"
                        >
                            Certified Capability
                        </motion.p>
                        <motion.h3
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4"
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
                            className="text-base md:text-lg text-slate-500 leading-relaxed"
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
                        ].map(item => (
                            <div key={item} className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span className="text-slate-800 font-medium text-sm">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
