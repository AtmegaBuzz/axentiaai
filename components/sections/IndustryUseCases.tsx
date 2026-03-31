'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, BarChart3, FileText, ScanLine, Activity, Users } from 'lucide-react';

const industries = ['All', 'Manufacturing', 'Retail & FMCG', 'Energy & Utilities', 'Banking & Services', 'HR'];

const useCases = [
    {
        industry: 'Manufacturing',
        modules: 'SAP PM · BTP · IoT',
        title: 'Predictive Maintenance',
        description: 'Anticipate equipment failures using sensor data and maintenance history, helping reduce unplanned downtime and improve asset reliability.',
        icon: Settings,
    },
    {
        industry: 'Retail & FMCG',
        modules: 'SAP IBP · Analytics Cloud',
        title: 'Demand Forecasting',
        description: 'Improve planning accuracy across supply chains, reducing stock imbalances and enabling more responsive inventory decisions.',
        icon: BarChart3,
    },
    {
        industry: 'Banking & Services',
        modules: 'SAP FI · BTP · Document AI',
        title: 'Invoice & Document Processing',
        description: 'Automate document handling across finance workflows, including extraction, validation, approvals, and exception handling.',
        icon: FileText,
    },
    {
        industry: 'Manufacturing',
        modules: 'SAP QM · Vision AI · BTP',
        title: 'Quality Control (Vision-Based)',
        description: 'Detect defects in real time on production lines, improving consistency and reducing manual inspection effort.',
        icon: ScanLine,
    },
    {
        industry: 'Energy & Utilities',
        modules: 'SAP PM · IS-Utilities · IoT',
        title: 'Asset Performance Optimisation',
        description: 'Monitor asset health and plan maintenance more effectively using operational and sensor data across distributed systems.',
        icon: Activity,
    },
    {
        industry: 'HR',
        modules: 'SuccessFactors · SAP Joule',
        title: 'HR Copilot',
        description: 'Support HR teams with policy queries, approvals, and talent insights within existing workflows.',
        icon: Users,
    },
];

export function IndustryUseCases() {
    const [active, setActive] = useState('All');
    const filtered = active === 'All' ? useCases : useCases.filter(u => u.industry === active);

    return (
        <section
            className="relative py-20 md:py-32 overflow-hidden border-b border-slate-100"
            style={{
                backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #faf5ff 30%, #f1f5f9 60%, #f8fafc 100%)',
            }}
        >
            {/* Ambient blobs matching site language */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#8A29AC]/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-blue-400/10 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">

                {/* ── Header ── */}
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-5"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8A29AC]/20 bg-[#8A29AC]/6 text-[#8A29AC] text-xs font-bold uppercase tracking-widest">
                            Industry Use Cases
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5"
                    >
                        Where AI creates{' '}
                        <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            measurable impact
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-base md:text-lg text-slate-500 leading-relaxed"
                    >
                        Every use case runs inside your existing SAP environment — shaping how work is carried out across operations, finance, supply chains, and workforce management.
                    </motion.p>
                </div>

                {/* ── Industry filter tabs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 }}
                    className="flex flex-wrap justify-center gap-2 mb-14"
                >
                    {industries.map((ind) => (
                        <button
                            key={ind}
                            onClick={() => setActive(ind)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                                active === ind
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                    : 'bg-white/70 backdrop-blur-sm text-slate-500 border-slate-200/80 hover:border-slate-400 hover:text-slate-700'
                            }`}
                        >
                            {ind}
                        </button>
                    ))}
                </motion.div>

                {/* ── Cards grid ── */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((uc, i) => {
                            const Icon = uc.icon;
                            return (
                                <motion.div
                                    key={uc.title}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                                    transition={{ type: 'spring', stiffness: 140, damping: 18, delay: i * 0.07 }}
                                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                                    className="group relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:bg-white transition-all duration-300 overflow-hidden"
                                >
                                    {/* Hover shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r from-[#8A29AC]/50 via-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br from-[#8A29AC]/10 to-blue-600/10 text-[#8A29AC] border border-[#8A29AC]/15 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap items-center gap-2 mb-4 relative z-10">
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white">
                                            {uc.industry}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">{uc.modules}</span>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-tight relative z-10 group-hover:text-[#8A29AC] transition-colors duration-300">
                                        {uc.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed font-medium relative z-10">
                                        {uc.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
