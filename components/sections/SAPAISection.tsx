'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
    () => import('@lottiefiles/dotlottie-react').then((m) => ({ default: m.DotLottieReact })),
    { ssr: false }
);

/* ── Lottie illustration: AI Brain Board ── */
function IntegrationIllustration() {
    return (
        <div className="relative w-full max-w-[420px] mx-auto aspect-square flex items-center justify-center">
            <DotLottieReact
                src="/Ai-brain-board.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

/* ── Card data ── */
const allCards = [
    {
        label: 'SAP Integration',
        title: 'Deep inside SAP',
        desc: 'S/4HANA · Joule · BTP · SuccessFactors · Analytics Cloud · PM / PS',
    },
    {
        label: 'Capabilities',
        title: 'Real operational AI',
        desc: 'Demand forecasting, invoice processing, HR copilot, maintenance planning, workflow execution.',
    },
    {
        label: 'In Practice',
        title: 'Woven into daily work',
        desc: 'AI shapes decisions as they happen, drawing on existing data and processes inside your systems.',
    },
    {
        label: 'Track Record',
        title: '50+ Enterprises',
        desc: 'SAP delivery + AI Delivery. 300+ certified professionals across industries.',
    },
];

export function SAPAISection() {
    return (
        <section className="relative bg-[#f8f6fb] border-b border-slate-100 overflow-hidden">

            {/* Subtle brand blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.04] blur-[80px]"
                    style={{ background: 'radial-gradient(ellipse, #8A29AC 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-[60px]"
                    style={{ background: 'radial-gradient(circle, #C010DA 0%, transparent 70%)' }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-20 md:py-28">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
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
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">SAP + AI</span>
                        {' '}working within your business
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto"
                    >
                        We bring AI into SAP environments so it becomes part of how work is done across teams from planning and operations to people and finance.
                    </motion.p>
                </div>

                {/* Center: Animated illustration + surrounding cards */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center max-w-5xl mx-auto">

                    {/* Left cards */}
                    <div className="flex flex-col gap-5 order-2 lg:order-1">
                        {allCards.slice(0, 2).map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                                className="bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-[#8A29AC]/15 transition-all duration-300"
                            >
                                <div className="mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{card.label}</span>
                                </div>
                                <p className="text-base font-bold text-slate-900 mb-2 leading-snug">{card.title}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="order-1 lg:order-2 flex items-center justify-center"
                    >
                        <IntegrationIllustration />
                    </motion.div>

                    {/* Right cards */}
                    <div className="flex flex-col gap-5 order-3">
                        {allCards.slice(2).map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                                className="bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-[#8A29AC]/15 transition-all duration-300"
                            >
                                <div className="mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{card.label}</span>
                                </div>
                                <p className="text-base font-bold text-slate-900 mb-2 leading-snug">{card.title}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
