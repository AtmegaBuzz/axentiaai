'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Target, GraduationCap, Zap, Share2, Users } from 'lucide-react';
import Image from 'next/image';
import {
    SolutionHero,
    StatsRow,
    DarkFeatureBand,
    SolutionForm,
    ease,
} from '@/components/solutions/shared';

const pillars = [
    {
        icon: Target,
        letter: 'A',
        title: 'Advisory — Strategy & Decisions',
        desc: 'Pre-investment clarity. AI Strategy Sprint, operating model review, and use case discovery.',
        bullets: ['AI Strategy Sprint', 'Operating model & governance', 'Use case prioritisation'],
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80',
    },
    {
        icon: GraduationCap,
        letter: 'C',
        title: 'Capability — Programmes & People',
        desc: 'Leadership fluency to managerial depth. Live-facilitated, calibrated to your real work.',
        bullets: ['Leadership Workshop · AI for Managers', 'ECAP accelerator for next-gen consultants', 'GCC and enterprise rollouts'],
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    },
    {
        icon: Zap,
        letter: 'E',
        title: 'Execution — Applied Workflows',
        desc: 'Practical deployments across document, procurement, customer and SAP-centric workflows.',
        bullets: ['Procurement & vendor intelligence', 'Document & policy workflows', 'SAP-adjacent assistants'],
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    },
    {
        icon: Share2,
        letter: '∞',
        title: 'The Integrated Loop',
        desc: 'Most enterprises need more than one. The pillars compound — advisory into capability into execution.',
        bullets: ['Shared artifacts between pillars', 'Single engagement lead', 'Continuous measurement'],
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    },
];

/* Horizontal scroll pillars — home Timeline pattern */
function PillarsHorizontalScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);
    const trackWidth = useTransform(scrollYProgress, [0, 0.95], ['0%', '100%']);

    return (
        <div ref={containerRef} style={{ height: '200vh' }}>
            <section className="sticky top-0 h-screen bg-white overflow-hidden flex flex-col">
                <div className="pt-20 pb-6 px-6 md:px-12 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-50 mb-4">
                            The Three Pillars
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight max-w-3xl">
                            Three pillars.{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal text-brand-600">
                                One integrated engagement.
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Track progress */}
                <div className="px-6 md:px-12 xl:px-20 mb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="h-px bg-slate-200 relative overflow-hidden">
                            <motion.div
                                style={{ width: trackWidth }}
                                className="absolute left-0 top-0 h-full bg-brand-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Horizontal cards */}
                <div className="flex-1 flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-12 xl:pl-20 will-change-transform">
                        {pillars.map((p, i) => (
                            <motion.article
                                key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-20%' }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className="shrink-0 w-[360px] md:w-[440px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <Image src={p.image} alt="" fill className="object-cover" sizes="440px" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/60 to-transparent" />
                                    <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center font-[family-name:var(--font-playfair)] italic font-bold text-brand-600 text-lg">
                                        {p.letter}
                                    </span>
                                </div>
                                <div className="p-7">
                                    <div className="w-10 h-10 bg-brand-600/10 rounded-full flex items-center justify-center mb-4 text-brand-600">
                                        <p.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-3 text-slate-900 tracking-tight">{p.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{p.desc}</p>
                                    <ul className="space-y-2">
                                        {p.bullets.map((b) => (
                                            <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                                                <span className="w-1 h-1 rounded-full bg-brand-600 mt-2 shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>

                <div className="pb-12 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Scroll to explore
                    </p>
                </div>
            </section>
        </div>
    );
}

/* Integrated loop — perfect circular diagram + stage descriptions */
function IntegratedLoop() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stages = [
        {
            step: '01',
            label: 'Advisory',
            feedsInto: 'Capability',
            desc: 'Decision documents and operating-model artifacts become the briefing material for the next cohort.',
        },
        {
            step: '02',
            label: 'Capability',
            feedsInto: 'Execution',
            desc: 'Trained cohorts become the embedded champions who keep pilots honest and owned internally.',
        },
        {
            step: '03',
            label: 'Execution',
            feedsInto: 'Advisory',
            desc: 'Shipped workflows surface the next wave of decisions — the loop closes back to strategic review.',
        },
    ];

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left: copy + stage list */}
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            The Compounding Loop
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
                    >
                        Advisory informs capability.{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            Capability carries execution.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="text-sm md:text-base text-slate-500 leading-relaxed max-w-lg mb-10"
                    >
                        Every engagement is designed to feed the next. Artifacts from advisory become training material
                        for capability. Capability cohorts become champions inside execution pilots.
                    </motion.p>

                    {/* Stage list */}
                    <div className="space-y-6 border-l border-slate-200 pl-6 max-w-lg">
                        {stages.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                                className="relative"
                            >
                                <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-brand-600 ring-4 ring-brand-600/10" />
                                <div className="flex items-baseline gap-2 mb-1.5">
                                    <span className="font-[family-name:var(--font-playfair)] italic text-sm text-brand-600">
                                        {s.step}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 tracking-tight">
                                        {s.label}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        → {s.feedsInto}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: perfect circular loop */}
                <div className="lg:col-span-7 flex items-center justify-center">
                    <CircularLoop stages={stages} isInView={isInView} />
                </div>
            </div>
        </section>
    );
}

function CircularLoop({
    stages,
    isInView,
}: {
    stages: { step: string; label: string }[];
    isInView: boolean;
}) {
    // SVG geometry
    const VB = 600;
    const CX = 300;
    const CY = 300;
    const R = 200;
    const NODE_R = 56;
    // Angular offset at each node endpoint so arrow doesn't collide with circle
    const gapDeg = (NODE_R / R) * (180 / Math.PI); // ~16°

    const polar = (angleDeg: number) => {
        const rad = (angleDeg * Math.PI) / 180;
        return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
    };

    // Node angles: Advisory top (-90°), Capability bottom-right (30°), Execution bottom-left (150°)
    const nodeAngles = [-90, 30, 150];
    const nodes = stages.map((s, i) => ({
        ...s,
        angle: nodeAngles[i],
        ...polar(nodeAngles[i]),
    }));

    const arcs = nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        // Go clockwise from n → next with gap on both sides
        const startA = n.angle + gapDeg;
        const endA = next.angle - gapDeg;
        const s = polar(startA);
        const e = polar(endA);
        // Determine large-arc flag (should be 0 here since sweep is ~90°) and sweep-flag=1 (clockwise in SVG)
        return { d: `M ${s.x} ${s.y} A ${R} ${R} 0 0 1 ${e.x} ${e.y}` };
    });

    return (
        <div className="relative w-full max-w-[520px] aspect-square mx-auto">
            <svg
                viewBox={`0 0 ${VB} ${VB}`}
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full"
            >
                <defs>
                    <marker
                        id="loop-arrow"
                        viewBox="0 0 10 10"
                        refX="7"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto"
                    >
                        <path d="M0 0 L9 5 L0 10 Z" fill="#A20EBF" />
                    </marker>
                    <linearGradient id="loop-line" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8A29AC" />
                        <stop offset="100%" stopColor="#C010DA" />
                    </linearGradient>
                </defs>

                {/* Background main circle (visual guide, very subtle) */}
                <circle
                    cx={CX}
                    cy={CY}
                    r={R}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                />
                {/* Inner soft ring */}
                <circle cx={CX} cy={CY} r={R * 0.55} fill="none" stroke="#F1F5F9" strokeWidth="1" />

                {/* Arrow arcs */}
                {arcs.map((a, i) => (
                    <motion.path
                        key={`arc-${i}`}
                        d={a.d}
                        fill="none"
                        stroke="url(#loop-line)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        markerEnd="url(#loop-arrow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 + i * 0.2, ease }}
                    />
                ))}

                {/* Center label */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <text
                        x={CX}
                        y={CY - 8}
                        textAnchor="middle"
                        fontSize="36"
                        fill="#A20EBF"
                        fontWeight="300"
                    >
                        ↻
                    </text>
                    <text
                        x={CX}
                        y={CY + 20}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#64748B"
                        fontWeight="700"
                        letterSpacing="3"
                    >
                        COMPOUNDING
                    </text>
                    <text
                        x={CX}
                        y={CY + 42}
                        textAnchor="middle"
                        fontSize="13"
                        fill="#94A3B8"
                        fontStyle="italic"
                        fontFamily="Playfair Display, serif"
                    >
                        outcome on outcome
                    </text>
                </motion.g>

                {/* Nodes rendered inside SVG via foreignObject for exact coordinate alignment */}
                {nodes.map((n, i) => (
                    <motion.foreignObject
                        key={n.label}
                        x={n.x - NODE_R}
                        y={n.y - NODE_R}
                        width={NODE_R * 2}
                        height={NODE_R * 2}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
                        style={{ transformOrigin: `${n.x}px ${n.y}px`, overflow: 'visible' }}
                    >
                        <div
                            {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}
                            className="w-full h-full rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-900/10 flex flex-col items-center justify-center hover:border-brand-400 hover:shadow-brand-600/15 transition-all"
                        >
                            <span className="font-[family-name:var(--font-playfair)] italic text-xs text-brand-600 leading-none mb-1">
                                {n.step}
                            </span>
                            <span className="text-sm font-bold text-slate-900 tracking-tight">
                                {n.label}
                            </span>
                        </div>
                    </motion.foreignObject>
                ))}
            </svg>
        </div>
    );
}

export default function SolutionsPage() {
    return (
        <main className="bg-slate-50">
            <SolutionHero
                eyebrow="Three Commercial Pillars"
                headingLead="Applied AI for the"
                headingAccent="Operating Enterprise."
                subtext="Three pillars working together — strategic advisory, capability programmes, and execution-ready workflows. Engage one. Engage all three."
                ctaText="Start with a Sprint"
                ctaHref="/solutions/ai-strategy-sprint"
                secondaryCtaText="View use cases"
                secondaryCtaHref="/solutions/use-cases"
                image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80"
            />
            <StatsRow
                items={[
                    { value: 'A.', title: 'Advisory', desc: 'Sprints and roadmaps that turn AI discussion into investable decisions.' },
                    { value: 'C.', title: 'Capability', desc: 'Programmes calibrated to leadership, managers, specialists and accelerators.' },
                    { value: 'E.', title: 'Execution', desc: 'Workflow engagements that ship — documents, procurement, SAP, customer ops.' },
                ]}
            />
            <PillarsHorizontalScroll />
            <IntegratedLoop />
            <DarkFeatureBand
                image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
                heading="Built for enterprises that"
                headingAccent="mean it"
                description="Our clients are beyond the pilot phase. They need decisions, capability, and shipped workflows — not another deck or a vendor demo. This is what we optimise for."
                points={[
                    {
                        icon: <span className="w-5 h-5 flex items-center justify-center">◆</span>,
                        title: 'Decisions over discovery',
                        desc: 'Every engagement produces a decision document, not a study.',
                    },
                    {
                        icon: <Users className="w-5 h-5" />,
                        title: 'Capability over dependency',
                        desc: 'We measure success by what your team can do without us.',
                    },
                ]}
            />
            <SolutionForm
                heading="Start a"
                headingAccent="conversation"
                subtext="Tell us what you're exploring. A brief introductory call is usually the fastest first step."
                objectives={[
                    'AI Strategy Sprint',
                    'Capability Programme',
                    'Workflow Execution',
                    'LLM Integration Strategy',
                    'Data Architecture Overhaul',
                    'Predictive Analytics Implementation',
                ]}
            />
        </main>
    );
}
