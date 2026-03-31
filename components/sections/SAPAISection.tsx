'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

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

/* ── CSS 3D Laptop ── */
function LaptopMockup() {
    return (
        <div
            className="relative flex flex-col items-center"
            style={{ perspective: '1100px', perspectiveOrigin: '50% 30%' }}
        >
            {/* Screen */}
            <div
                style={{
                    width: '340px',
                    transformOrigin: 'bottom center',
                    transform: 'rotateX(-22deg)',
                    marginBottom: '-2px',
                    borderRadius: '14px 14px 0 0',
                    background: 'linear-gradient(160deg, #1e1b2e 0%, #12101f 100%)',
                    border: '2px solid rgba(255,255,255,0.10)',
                    borderBottom: 'none',
                    boxShadow: '0 -8px 60px rgba(138,41,172,0.25), 0 0 0 1px rgba(138,41,172,0.15)',
                    padding: '10px 10px 0',
                }}
            >
                {/* Camera dot */}
                <div style={{ textAlign: 'center', marginBottom: '6px' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#334155' }} />
                </div>

                {/* Screen bezel inner */}
                <div
                    style={{
                        borderRadius: '8px 8px 0 0',
                        overflow: 'hidden',
                        background: '#0a0818',
                        height: '200px',
                    }}
                >
                    {/* Dashboard header */}
                    <div style={{ background: '#110f1e', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                                <span key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, display: 'inline-block' }} />
                            ))}
                        </div>
                        <span style={{ color: '#6366f1', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', marginLeft: '6px' }}>SAP AI · DASHBOARD</span>
                        <span style={{ marginLeft: 'auto', fontSize: '8px', color: '#334155' }}>Live ●</span>
                    </div>

                    {/* Metrics row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '10px 10px 6px' }}>
                        {[
                            { label: 'Forecasts', val: '98.2%', color: '#818cf8' },
                            { label: 'Invoices', val: '1,240', color: '#a855f7' },
                            { label: 'Uptime', val: '99.9%', color: '#10b981' },
                        ].map(m => (
                            <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '6px 8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.val}</div>
                                <div style={{ fontSize: '8px', color: '#475569', marginTop: '3px', letterSpacing: '0.04em' }}>{m.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Bar chart */}
                    <div style={{ padding: '4px 10px 0', display: 'flex', alignItems: 'flex-end', gap: '5px', height: '60px' }}>
                        {[55, 38, 70, 48, 82, 60, 74, 52, 88, 65].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 8 ? 'linear-gradient(to top, #8A29AC, #C010DA)' : 'rgba(138,41,172,0.25)', transition: 'height 0.3s' }} />
                        ))}
                    </div>

                    {/* Module tags */}
                    <div style={{ padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {['S/4HANA', 'BTP', 'Joule', 'SF'].map(tag => (
                            <span key={tag} style={{ fontSize: '8px', fontWeight: 700, color: '#818cf8', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '4px', padding: '2px 6px' }}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hinge strip */}
            <div style={{
                width: '340px',
                height: '5px',
                background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderTop: '2px solid rgba(255,255,255,0.12)',
                borderBottom: 'none',
            }} />

            {/* Base/keyboard */}
            <div
                style={{
                    width: '340px',
                    height: '130px',
                    transformOrigin: 'top center',
                    transform: 'rotateX(15deg)',
                    background: 'linear-gradient(175deg, #1a2233 0%, #0d1525 100%)',
                    borderRadius: '0 0 12px 12px',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderTop: 'none',
                    padding: '12px 16px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}
            >
                {/* Keyboard rows */}
                {[13, 12, 11, 10].map((cols, row) => (
                    <div key={row} style={{ display: 'flex', gap: '3px' }}>
                        {Array.from({ length: cols }).map((_, i) => (
                            <div key={i} style={{ flex: 1, height: '10px', borderRadius: '2px', background: 'rgba(148,163,184,0.10)', border: '1px solid rgba(255,255,255,0.05)' }} />
                        ))}
                    </div>
                ))}
                {/* Space bar row */}
                <div style={{ display: 'flex', gap: '3px', marginTop: '2px' }}>
                    <div style={{ flex: 1, height: '10px', borderRadius: '2px', background: 'rgba(148,163,184,0.07)', border: '1px solid rgba(255,255,255,0.04)' }} />
                    <div style={{ flex: 5, height: '10px', borderRadius: '2px', background: 'rgba(148,163,184,0.12)', border: '1px solid rgba(255,255,255,0.06)' }} />
                    <div style={{ flex: 1, height: '10px', borderRadius: '2px', background: 'rgba(148,163,184,0.07)', border: '1px solid rgba(255,255,255,0.04)' }} />
                </div>
                {/* Trackpad */}
                <div style={{ width: '80px', height: '20px', borderRadius: '4px', background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(255,255,255,0.05)', margin: '4px auto 0' }} />
            </div>

            {/* Surface reflection */}
            <div style={{
                width: '320px',
                height: '12px',
                marginTop: '-2px',
                background: 'linear-gradient(to bottom, rgba(138,41,172,0.15), transparent)',
                borderRadius: '0 0 8px 8px',
                filter: 'blur(4px)',
            }} />
        </div>
    );
}

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
                        <LaptopMockup />
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
                        <LaptopMockup />
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
