'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Brain, Users, BookOpen, Target, Layers, Briefcase, MonitorPlay, Cpu, FileText, GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface InfoItem {
    label: string;
    value: string;
    Icon: React.ComponentType<{ className?: string }>;
}

interface Program {
    id: string;
    title: string;
    titleAccent: string;
    description: string;
    info: InfoItem[];
    image: string;
}

const programs: Program[] = [
    {
        id: 'ai-foundation',
        title: 'AI Foundation',
        titleAccent: 'Academy',
        description:
            'Understand how AI works, where it creates value, and how to apply it within business workflows. Built for AI enthusiasts at every level, no technical background required to begin.',
        info: [
            { label: 'Focus', value: 'AI Concepts & Prompt Engineering', Icon: Brain },
            { label: 'For', value: 'All Levels', Icon: Users },
            { label: 'Covers', value: 'Use Case Design', Icon: Target },
            { label: 'Skills', value: 'Business AI Applications', Icon: Cpu },
            { label: 'Format', value: 'Structured Learning', Icon: MonitorPlay },
            { label: 'Prereq', value: 'None Required', Icon: BookOpen },
        ],
        image: '/images/new_images/programs/ai-foundation/professional-working-laptop.jpg',
    },
    {
        id: 'sap-sf',
        title: 'SAP SuccessFactors',
        titleAccent: 'Academy',
        description:
            'Builds end-to-end understanding of Employee Central, Time, Benefits, Recruiting, and Onboarding, with exposure to how these modules operate within enterprise environments.',
        info: [
            { label: 'Core', value: 'Employee Central', Icon: Users },
            { label: 'Modules', value: 'Time & Benefits', Icon: Layers },
            { label: 'Talent', value: 'Recruiting & Onboarding', Icon: GraduationCap },
            { label: 'Focus', value: 'Enterprise HR', Icon: Briefcase },
            { label: 'Approach', value: 'Hands-on Practice', Icon: Target },
            { label: 'Format', value: 'Instructor-led', Icon: MonitorPlay },
        ],
        image: '/images/new_images/programs/sap-successfactors/team-meeting-indian.jpg',
    },
    {
        id: 'retail-fmcg',
        title: 'Retail & FMCG',
        titleAccent: 'Industry Academy',
        description:
            'Master demand planning, store operations, and supply chain workflows from the inside, along with how decisions get made in Retail and FMCG environments.',
        info: [
            { label: 'Planning', value: 'Demand Forecasting', Icon: Target },
            { label: 'Operations', value: 'Store Management', Icon: Layers },
            { label: 'Supply Chain', value: 'End-to-end Workflows', Icon: FileText },
            { label: 'Industry', value: 'Retail & FMCG', Icon: Briefcase },
            { label: 'Decisions', value: 'Real-world Scenarios', Icon: Brain },
            { label: 'Format', value: 'Applied Learning', Icon: MonitorPlay },
        ],
        image: '/images/new_images/programs/retail-fmcg/modern-retail-store.jpg',
    },
    {
        id: 'energy-utilities',
        title: 'Energy & Utilities',
        titleAccent: 'Industry Academy',
        description:
            'Develop applied expertise in asset management and IS-Utilities with a focus on operational data, maintenance decisions, and how the sector runs.',
        info: [
            { label: 'Focus', value: 'Asset Management', Icon: Layers },
            { label: 'Module', value: 'IS-Utilities', Icon: Cpu },
            { label: 'Data', value: 'Operational Analytics', Icon: Brain },
            { label: 'Skills', value: 'Maintenance Planning', Icon: Target },
            { label: 'Industry', value: 'Energy Sector', Icon: Briefcase },
            { label: 'Format', value: 'Applied Learning', Icon: MonitorPlay },
        ],
        image: '/images/new_images/programs/energy-utilities/wind-turbines.jpg',
    },
    {
        id: 'workforce-accelerator',
        title: 'SAP Workforce',
        titleAccent: 'Accelerator',
        description:
            'The fastest path from qualification to enterprise deployment. Participants work within live Axentia.AI delivery teams on real projects, building the experience that enterprise clients actually hire for.',
        info: [
            { label: 'Format', value: 'Apprenticeship-led', Icon: Briefcase },
            { label: 'Projects', value: 'Live Delivery', Icon: Target },
            { label: 'Team', value: 'Axentia.AI Squads', Icon: Users },
            { label: 'Path', value: 'Fastest to Deploy', Icon: GraduationCap },
            { label: 'Experience', value: 'Client-ready', Icon: Layers },
            { label: 'Outcome', value: 'Enterprise Hiring', Icon: FileText },
        ],
        image: '/images/new_images/programs/sap-workforce/team-collaboration-laptops.jpg',
    },
];

function ProgramCard({ prog, index }: { prog: Program; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden h-full"
        >
            {/* Thumbnail — no play button */}
            <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={prog.image}
                    alt={prog.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 text-left">
                    {prog.title} {prog.titleAccent}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{prog.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {prog.info.map(({ label, value, Icon }) => (
                        <div key={label} className="flex items-start gap-3">
                            <div className="w-9 h-9 bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 leading-tight">{label}</p>
                                <p className="text-xs text-slate-400 leading-tight mt-0.5">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Link
                    href={`/programs?tab=${prog.id}`}
                    className="mt-auto inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-5 w-fit transition-colors duration-200"
                >
                    Explore Program
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}

export function Programs() {
    const [current, setCurrent] = useState(0);
    const maxIdx = programs.length - 1;
    const wheelAccum = useRef(0);

    const prev = () => setCurrent(i => Math.max(0, i - 1));
    const next = () => setCurrent(i => Math.min(maxIdx, i + 1));

    const onWheel = useCallback((e: React.WheelEvent) => {
        const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
        if (dx === 0) return;
        e.preventDefault();
        wheelAccum.current += dx;
        const threshold = 80;
        if (wheelAccum.current > threshold) { next(); wheelAccum.current = 0; }
        else if (wheelAccum.current < -threshold) { prev(); wheelAccum.current = 0; }
    }, []);

    return (
        <section id="programs" className="relative py-10 md:py-14 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/programs-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/65" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                        >
                            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/20 bg-accent-300/8">
                                Our Programmes
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3"
                        >
                            Certified capability trained for real outcomes
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-sm text-white/50 max-w-xl"
                        >
                            Every academy is built around how decisions actually get made, how workflows actually run, and how delivery actually happens inside organisations. You learn by doing the real thing.
                        </motion.p>
                    </div>

                    {/* Nav + counter */}
                    <div className="flex items-center gap-4 shrink-0">
                        <span className="text-sm font-medium text-white/40 tabular-nums">
                            {String(current + 1).padStart(2, '0')} / {String(programs.length).padStart(2, '0')}
                        </span>
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className="flex items-center justify-center w-10 h-10 border border-white/20 text-white hover:border-white/50 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={next}
                            disabled={current >= maxIdx}
                            className="flex items-center justify-center w-10 h-10 border border-white/20 text-white hover:border-white/50 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Carousel */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className="overflow-hidden relative z-10" onWheel={onWheel}>
                <motion.div
                    className="flex gap-6"
                    animate={{ x: `calc(-${current} * (440px + 24px))` }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
                    style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))', paddingRight: '20vw' }}
                >
                    {programs.map((prog, i) => (
                        <div key={prog.id} className="shrink-0 w-[380px] md:w-[440px]">
                            <ProgramCard prog={prog} index={i} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Browse All button */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-8"
                >
                    <Link
                        href="/programs"
                        className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-bold py-3 px-7 hover:bg-slate-100 transition-colors duration-200"
                    >
                        Browse All Programs
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
