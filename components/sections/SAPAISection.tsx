'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

/* ── Dashboard canvas → data URL (client-side only) ── */
function buildDashboardSrc(): string {
    const W = 1280, H = 800;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const c = cvs.getContext('2d')!;

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
        c.beginPath();
        c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r);
        c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r);
        c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r);
        c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r);
        c.closePath();
    };

    /* Background */
    c.fillStyle = '#0a0818'; c.fillRect(0, 0, W, H);

    /* Top bar */
    c.fillStyle = '#0f0d20'; c.fillRect(0, 0, W, 54);
    ['#ef4444', '#f59e0b', '#22c55e'].forEach((col, i) => {
        c.beginPath(); c.arc(22 + i * 22, 27, 6, 0, Math.PI * 2);
        c.fillStyle = col; c.fill();
    });
    c.fillStyle = '#6366f1'; c.font = 'bold 16px monospace';
    c.fillText('SAP AI  ·  DASHBOARD', 120, 34);
    c.beginPath(); c.arc(W - 44, 27, 5, 0, Math.PI * 2);
    c.fillStyle = '#22c55e'; c.fill();
    c.fillStyle = '#64748b'; c.font = '13px monospace'; c.fillText('Live', W - 32, 32);

    /* Metric cards */
    [
        { label: 'Forecasts', value: '98.2%', color: '#818cf8' },
        { label: 'Invoices', value: '1,240', color: '#a855f7' },
        { label: 'Uptime', value: '99.9%', color: '#10b981' },
        { label: 'AI Score', value: '94/100', color: '#F7C87A' },
    ].forEach((m, i) => {
        const mx = 30 + i * 308, my = 72;
        c.fillStyle = 'rgba(255,255,255,0.04)';
        c.strokeStyle = 'rgba(255,255,255,0.07)'; c.lineWidth = 1;
        rr(mx, my, 280, 100, 12); c.fill(); c.stroke();
        c.fillStyle = m.color; c.font = 'bold 32px monospace'; c.fillText(m.value, mx + 18, my + 50);
        c.fillStyle = '#475569'; c.font = '14px monospace'; c.fillText(m.label, mx + 18, my + 78);
    });

    /* Bar chart */
    const bars = [55, 38, 72, 48, 84, 60, 76, 52, 88, 66, 74, 92];
    c.fillStyle = '#334155'; c.font = '13px monospace';
    c.fillText('Monthly AI Predictions', 30, 228);
    bars.forEach((h, i) => {
        const bh = (h / 100) * 200, bx = 30 + i * 100;
        const isLast = i === bars.length - 1;
        const g = c.createLinearGradient(0, 240 + 200 - bh, 0, 440);
        g.addColorStop(0, isLast ? '#8A29AC' : 'rgba(138,41,172,0.30)');
        g.addColorStop(1, isLast ? '#C010DA' : 'rgba(138,41,172,0.10)');
        c.fillStyle = g; rr(bx, 240 + 200 - bh, 76, bh, 6); c.fill();
    });

    /* SAP module tags */
    let tx = 30;
    ['S/4HANA', 'BTP', 'Joule', 'SuccessFactors', 'Analytics Cloud', 'PM / PS'].forEach(tag => {
        c.font = 'bold 13px monospace';
        const tw = c.measureText(tag).width + 28;
        c.fillStyle = 'rgba(99,102,241,0.14)';
        c.strokeStyle = 'rgba(99,102,241,0.30)'; c.lineWidth = 1;
        rr(tx, 472, tw, 30, 7); c.fill(); c.stroke();
        c.fillStyle = '#818cf8'; c.fillText(tag, tx + 14, 492);
        tx += tw + 12;
    });

    /* Footer branding */
    c.fillStyle = 'rgba(138,41,172,0.7)'; c.font = 'bold 20px monospace';
    c.fillText('Axentia.AI', 30, 560);
    c.fillStyle = '#334155'; c.font = '14px monospace';
    c.fillText('Enterprise AI + SAP Intelligence Platform', 170, 560);

    return cvs.toDataURL('image/png');
}

/* ── Info cards data ── */
const cards = [
    {
        label: 'SAP Integration',
        status: 'Native',
        statusColor: 'bg-blue-500',
        title: 'Deep inside SAP',
        desc: 'S/4HANA · Joule · BTP · SuccessFactors',
    },
    {
        label: 'In Practice',
        status: 'Live',
        statusColor: 'bg-emerald-500',
        title: 'Woven into daily work',
        desc: 'AI shapes decisions as they happen, drawing on existing data and processes.',
    },
    {
        label: 'Capabilities',
        status: 'Enterprise',
        statusColor: 'bg-brand-700',
        title: 'Real operational AI',
        desc: 'Demand forecasting, invoice processing, HR copilot, maintenance planning.',
    },
    {
        label: 'Track Record',
        status: 'Global',
        statusColor: 'bg-amber-500',
        title: '50+ Enterprises',
        desc: '16+ years of SAP delivery. 300+ certified professionals across industries.',
    },
];

function InfoCard({ card }: { card: typeof cards[number] }) {
    return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{card.label}</span>
                <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${card.statusColor}`} />
                    <span className="text-xs text-slate-500 font-medium">{card.status}</span>
                </div>
            </div>
            <p className="text-base font-bold text-slate-900 mb-1.5 leading-snug">{card.title}</p>
            <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
        </div>
    );
}

export function SAPAISection() {
    const [dashboardSrc, setDashboardSrc] = useState('');
    const trapRef = useRef<HTMLDivElement>(null);

    /* scrollYProgress: 0 → 1 across the 500 vh scroll budget */
    const { scrollYProgress } = useScroll({
        target: trapRef,
        offset: ['start start', 'end end'],
    });

    // ── ANIMATION ZONES ──
    // Scroll budget is 400 vh — each phase gets generous room.

    // Blobs only — never wraps the 3D content (opacity breaks preserve-3d)
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.04, 0.88, 0.97], [0, 1, 1, 0]);

    // Header: fades in fast, holds, fades out near end
    const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0]);
    const headerY       = useTransform(scrollYProgress, [0, 0.10], [28, 0]);

    // Y tilt: sweeps in from the left (-35°), slight overshoot to the right (+14°),
    //         then settles at a shallow angle (+4°) so depth remains visible.
    const tiltY = useTransform(
        scrollYProgress,
        [0,    0.12,  0.32,  0.55,  0.85],
        [-35,  -20,   14,    4,     4],
    );

    // X tilt: starts slightly tilted away (top-back), eases to a gentle forward lean.
    const tiltX = useTransform(
        scrollYProgress,
        [0,   0.20,  0.50,  0.85],
        [8,   4,     -5,    -3],
    );

    // Laptop drifts up from below on entry, subtly recedes at exit
    const laptopY     = useTransform(scrollYProgress, [0, 0.14, 0.86, 0.96], [64, 0, 0, -28]);
    const laptopScale = useTransform(scrollYProgress, [0, 0.10, 0.86, 0.96], [0.86, 1, 1, 0.93]);

    // Screen fades in as the laptop swings toward the viewer (screen always at least
    // partly visible, so no need to wait for a full spin to complete)
    const dashOpacity = useTransform(scrollYProgress, [0.08, 0.32], [0, 1]);

    // Cards slide in after screen is fully revealed — staggered per card
    const leftCardsX   = useTransform(scrollYProgress, [0.38, 0.62], [-52, 0]);
    const rightCardsX  = useTransform(scrollYProgress, [0.38, 0.62], [52, 0]);
    // Upper cards drift in from above, lower cards from below
    const upperCardsY  = useTransform(scrollYProgress, [0.38, 0.60], [-18, 0]);
    const lowerCardsY  = useTransform(scrollYProgress, [0.42, 0.64], [18, 0]);

    useEffect(() => {
        setDashboardSrc(buildDashboardSrc());
    }, []);

    return (
        // 400 vh scroll budget — desktop scroll trap lives here
        <div ref={trapRef} className="relative lg:h-[400vh] bg-slate-50">

            {/* ══ DESKTOP sticky pane (hidden on mobile) ══ */}
            <section className="sticky top-0 h-screen w-full hidden lg:flex flex-col border-b border-slate-100 overflow-hidden">

                {/* Brand blobs */}
                <motion.div
                    style={{ opacity: sectionOpacity }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div
                        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.04] blur-[80px]"
                        style={{ background: 'radial-gradient(ellipse, #8A29AC 0%, transparent 70%)' }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-[60px]"
                        style={{ background: 'radial-gradient(circle, #C010DA 0%, transparent 70%)' }}
                    />
                </motion.div>

                {/* Section header — fades in then slides up */}
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="relative z-10 text-center pt-20 pb-4 px-8 shrink-0"
                >
                    <span
                        className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: '#F7C87A', color: '#232322' }}
                    >
                        Integration at the core
                    </span>
                    <h2 className="text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                            SAP + AI
                        </span>
                        {', '}
                        <span className="font-cursive italic text-brand-600">working within your business</span>
                    </h2>
                </motion.div>

                {/* MacBook + floating cards around it */}
                <div className="relative z-10 flex-1 flex items-center justify-center pb-8 min-h-0">
                    {/* Positioning context — cards are absolute inside here */}
                    <div className="relative" style={{ perspective: "1400px" }}>

                        {/* ── MacBook ── */}
                        <motion.div style={{
                            y: laptopY,
                            scale: laptopScale,
                            rotateY: tiltY,
                            rotateX: tiltX,
                            transformStyle: "preserve-3d",
                        }}>
                            <MacbookScroll
                                src={dashboardSrc}
                                showGradient={false}
                                lidAlwaysOpen
                                screenOpacity={dashOpacity}
                            />
                        </motion.div>

                        {/* ── Upper-left card ── */}
                        <motion.div
                            style={{ x: leftCardsX, y: upperCardsY, top: '2rem', right: 'calc(100% + 1.25rem)' }}
                            className="absolute z-20 w-64"
                        >
                            <InfoCard card={cards[0]} />
                        </motion.div>

                        {/* ── Lower-left card ── */}
                        <motion.div
                            style={{ x: leftCardsX, y: lowerCardsY, bottom: '5rem', right: 'calc(100% + 1.25rem)' }}
                            className="absolute z-20 w-64"
                        >
                            <InfoCard card={cards[1]} />
                        </motion.div>

                        {/* ── Upper-right card ── */}
                        <motion.div
                            style={{ x: rightCardsX, y: upperCardsY, top: '2rem', left: 'calc(100% + 1.25rem)' }}
                            className="absolute z-20 w-64"
                        >
                            <InfoCard card={cards[2]} />
                        </motion.div>

                        {/* ── Lower-right card ── */}
                        <motion.div
                            style={{ x: rightCardsX, y: lowerCardsY, bottom: '5rem', left: 'calc(100% + 1.25rem)' }}
                            className="absolute z-20 w-64"
                        >
                            <InfoCard card={cards[3]} />
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ══ MOBILE layout — static, no scroll trap ══ */}
            <div className="lg:hidden w-full px-4 pt-14 pb-20 bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <span
                        className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: '#F7C87A', color: '#232322' }}
                    >
                        Integration at the core
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                            SAP + AI
                        </span>
                        {', '}
                        <span className="font-cursive italic text-brand-600">working within your business</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Static dashboard preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-[#0a0818]"
                    >
                        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0f0d20]">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            <span className="ml-3 text-[10px] font-mono text-slate-400">SAP AI · DASHBOARD</span>
                        </div>
                        {dashboardSrc && (
                            <img src={dashboardSrc} alt="SAP AI Dashboard" className="w-full h-auto" />
                        )}
                    </motion.div>

                    {/* 2×2 card grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {cards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 * i }}
                                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-slate-500 font-medium">{card.label}</span>
                                    <div className="flex items-center gap-1">
                                        <span className={`w-1.5 h-1.5 rounded-full ${card.statusColor}`} />
                                        <span className="text-[10px] text-slate-500 font-medium">{card.status}</span>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-slate-900 mb-1 leading-snug">{card.title}</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
