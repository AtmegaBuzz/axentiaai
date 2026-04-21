'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    ShoppingBag,
    FileText,
    Network,
    LineChart,
    HeartHandshake,
    Database,
    Bot,
    ScanText,
    Workflow,
    ShieldCheck,
    Flag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import {
    SolutionHero,
    StatsRow,
    DarkFeatureBand,
    SolutionForm,
    ease,
} from '@/components/solutions/shared';

type UseCase = {
    id: string;
    icon: LucideIcon;
    family: 'Procurement' | 'Documents' | 'Knowledge' | 'SAP & Ops' | 'Customer' | 'Analytics';
    title: string;
    desc: string;
    bullets: string[];
    image: string;
};

const useCases: UseCase[] = [
    {
        id: 'vendor',
        icon: ShoppingBag,
        family: 'Procurement',
        title: 'Procurement & Vendor Intelligence',
        desc: 'Supplier research, RFP comparison, clause-level contract review with playbook deviations flagged.',
        bullets: ['Structured vendor profiles', 'Bidder side-by-sides', 'Playbook deviation flags'],
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'documents',
        icon: FileText,
        family: 'Documents',
        title: 'Document & Policy Workflows',
        desc: 'Grounded policy assistants, compliance Q&A, and batch summarisation for diligence and regulatory work.',
        bullets: ['Cited policy Q&A', 'Batch summarisation', 'Clause extraction'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'knowledge',
        icon: Network,
        family: 'Knowledge',
        title: 'Enterprise Knowledge',
        desc: 'Internal assistants that sit above wikis, SharePoint and Confluence — verified, not hallucinated.',
        bullets: ['Grounded on your content', 'Access-aware responses', 'Citation first'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'sap-ops',
        icon: LineChart,
        family: 'SAP & Ops',
        title: 'SAP & Enterprise Ops',
        desc: 'Analytics copilots, exception narratives, and service desk triage over S/4HANA and BTP.',
        bullets: ['Finance analytics copilots', 'Exception explanations', 'Ticket triage & routing'],
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'customer',
        icon: HeartHandshake,
        family: 'Customer',
        title: 'Customer Service Copilots',
        desc: 'Agent-side assistants that resolve faster, escalate cleaner, and write summaries automatically.',
        bullets: ['Reply drafting', 'Conversation summarisation', 'Knowledge surfacing'],
        image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'data',
        icon: Database,
        family: 'Analytics',
        title: 'Data & Pipeline Intelligence',
        desc: 'Data quality checks, anomaly detection, and pipeline observability with explanations attached.',
        bullets: ['Anomaly detection', 'Schema drift alerts', 'Lineage explanations'],
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'hr-bot',
        icon: Bot,
        family: 'Knowledge',
        title: 'HR Self-Service Assistant',
        desc: 'Policy-grounded assistant for leave, benefits, and payroll questions. Routes complex cases.',
        bullets: ['Policy citations', 'Multi-language support', 'Case escalation'],
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'ocr',
        icon: ScanText,
        family: 'Documents',
        title: 'Invoice & Form Intake',
        desc: 'High-accuracy capture from scans, PDFs, and emails, posted directly into ERP fields.',
        bullets: ['Multi-format intake', 'Field-level confidence', 'ERP write-back'],
        image: 'https://images.unsplash.com/photo-1554224154-26032cdc0c5f?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 'flow',
        icon: Workflow,
        family: 'SAP & Ops',
        title: 'Approval & Routing Engine',
        desc: 'Reads attached context, applies rules, and routes for the right approver — with audit trail.',
        bullets: ['Rules + LLM reasoning', 'Conditional routing', 'Full audit trail'],
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    },
];

const families: Array<UseCase['family'] | 'All'> = [
    'All',
    'Procurement',
    'Documents',
    'Knowledge',
    'SAP & Ops',
    'Customer',
    'Analytics',
];

function UseCaseGrid() {
    const [filter, setFilter] = useState<UseCase['family'] | 'All'>('All');
    const filtered = filter === 'All' ? useCases : useCases.filter((u) => u.family === filter);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                <div className="mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6"
                    >
                        Workflow Families We Ship
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-2"
                    >
                        {families.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all border ${
                                    filter === f
                                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filtered.map((u, i) => (
                        <TiltUseCaseCard key={u.id} useCase={u} delay={i * 0.05} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function TiltUseCaseCard({ useCase, delay }: { useCase: UseCase; delay: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
    const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({ rotateX: (y - 0.5) * -10, rotateY: (x - 0.5) * 10, scale: 1.02 });
        setShine({ x: x * 100, y: y * 100, opacity: 0.18 });
    };
    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
        setShine({ x: 50, y: 50, opacity: 0 });
    };

    const Icon = useCase.icon;

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay, ease }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, scale: tilt.scale }}
            style={{ perspective: 800, transformStyle: 'preserve-3d' }}
            className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
        >
            <div className="relative h-44 overflow-hidden">
                <Image src={useCase.image} alt="" fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/70 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-600">
                    {useCase.family}
                </div>
            </div>
            <div className="p-7">
                <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center mb-4 text-brand-600">
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-slate-900 tracking-tight">{useCase.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{useCase.desc}</p>
                <ul className="space-y-1.5">
                    {useCase.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-slate-500">
                            <span className="w-1 h-1 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                            {b}
                        </li>
                    ))}
                </ul>
            </div>
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                animate={{ opacity: shine.opacity }}
                transition={{ duration: 0.2 }}
                style={{
                    background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(162,14,191,0.4) 0%, transparent 60%)`,
                }}
            />
        </motion.div>
    );
}

/* Decision framework strip */
function DecisionFramework() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const decisions = [
        { label: 'Audit', desc: 'Analyse current state. No build. Output is a directional brief.' },
        { label: 'Accelerate', desc: 'Augment existing systems. Faster, cleaner, no rip-and-replace.' },
        { label: 'Replace', desc: 'Rebuild the workflow with AI at the centre. New rails.' },
    ];
    return (
        <section ref={ref} className="py-24 md:py-32 bg-slate-100/60">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-block rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-white mb-5"
                    >
                        Decision Framework
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
                    >
                        Every workflow gets one of{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-brand-600">
                            three calls.
                        </span>
                    </motion.h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {decisions.map((d, i) => (
                        <motion.div
                            key={d.label}
                            initial={{ opacity: 0, y: 25 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="text-[11px] font-bold tracking-widest uppercase text-brand-600 mb-3">
                                Decision {String(i + 1).padStart(2, '0')}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">{d.label}</h3>
                            <p className="text-slate-600 leading-relaxed">{d.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function UseCasesPage() {
    return (
        <main className="bg-slate-50">
            <SolutionHero
                eyebrow="Applied AI Workflows"
                headingLead="Where AI earns its"
                headingAccent="place in real work."
                subtext="Twelve workflows we actively design for. Each is a practical starting point — audit, accelerate, or replace. Grounded in your existing systems and governance."
                ctaText="Prioritise with a Sprint"
                ctaHref="/solutions/ai-strategy-sprint"
                secondaryCtaText="Talk to us"
                secondaryCtaHref="#request"
                image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
            />
            <StatsRow
                items={[
                    { value: '12', title: 'Workflow Families', desc: 'Procurement, documents, knowledge, SAP ops, customer ops — with production-grade patterns.' },
                    { value: '06', title: 'Weeks to First Value', desc: 'Most engagements deliver their first shipped artifact inside six working weeks.' },
                    { value: '01', title: 'Decision Framework', desc: 'Audit, accelerate, or replace. Every workflow receives an explicit recommendation.' },
                ]}
            />
            <UseCaseGrid />
            <DecisionFramework />
            <DarkFeatureBand
                image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80"
                heading="These are starting points."
                headingAccent="Your workflows lead."
                description="Every engagement begins with a workflow audit on your side. We never ship a generic template — the patterns above are scaffolding for a calibrated build on your real data and rules."
                points={[
                    {
                        icon: <ShieldCheck className="w-5 h-5" />,
                        title: 'Governance-first',
                        desc: 'Access, data residency and audit are first-class concerns, not retrofits.',
                    },
                    {
                        icon: <Flag className="w-5 h-5" />,
                        title: 'Quick wins by design',
                        desc: 'We sequence work so the first shipped artifact lands inside six weeks.',
                    },
                ]}
            />
            <SolutionForm
                heading="Discuss your"
                headingAccent="workflow"
                subtext="Tell us briefly about the workflow you want to accelerate — we'll respond within one business day."
                objectives={[
                    'Procurement & Vendor',
                    'Document & Policy Workflows',
                    'Enterprise Knowledge',
                    'SAP & Enterprise Ops',
                    'Customer Service Copilots',
                    'Data & Pipeline Intelligence',
                    'AI Strategy Sprint',
                ]}
            />
        </main>
    );
}
