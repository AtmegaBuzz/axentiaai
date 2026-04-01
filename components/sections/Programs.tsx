'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Play, Brain, Users, BookOpen, Target, Layers, Briefcase, MonitorPlay, Cpu, FileText, GraduationCap } from 'lucide-react';
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
            'Understand how AI works, where it creates value, and how to apply it within business workflows. Built for AI enthusiasts at every level \u2014 no technical background required to begin.',
        info: [
            { label: 'Focus', value: 'AI Concepts & Prompt Engineering', Icon: Brain },
            { label: 'For', value: 'All Levels', Icon: Users },
            { label: 'Covers', value: 'Use Case Design', Icon: Target },
            { label: 'Skills', value: 'Business AI Applications', Icon: Cpu },
            { label: 'Format', value: 'Structured Learning', Icon: MonitorPlay },
            { label: 'Prereq', value: 'None Required', Icon: BookOpen },
        ],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80',
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
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
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
        image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&h=400&fit=crop&q=80',
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
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&q=80',
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
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    },
];

const snapDirs = [
    { x: -60, y: 50, rotate: -6 },
    { x: 0, y: 70, rotate: 4 },
    { x: 60, y: 50, rotate: 6 },
    { x: -40, y: 60, rotate: -4 },
    { x: 40, y: 60, rotate: 5 },
];

function ProgramCard({ prog, index }: { prog: Program; index: number }) {
    const dir = snapDirs[index % snapDirs.length];

    return (
        <motion.div
            initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.85 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                type: 'spring',
                stiffness: 170,
                damping: 18,
                mass: 0.8,
                delay: index * 0.1,
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 22 },
            }}
            className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden h-full"
        >
            {/* Thumbnail with play button */}
            <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={prog.image}
                    alt={prog.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                {/* Centered play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-slate-900 fill-current ml-0.5" />
                    </div>
                </div>
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
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
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
                    className="mt-auto inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-5 rounded-full w-fit transition-colors duration-200"
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
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            className="font-semibold tracking-wide uppercase text-sm mb-4"
                        >
                            <span className="inline-block px-2 py-0.5 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>
                                Our Programmes
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.05 }}
                            className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3"
                        >
                            5 programs designed for every <span className="font-cursive italic text-accent-300 text-[1.1em]">stage</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                            className="text-base text-white/50 max-w-xl"
                        >
                            From first steps to enterprise deployment, a clear path for every stage of your career.
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
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:border-white/50 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={next}
                            disabled={current >= maxIdx}
                            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:border-white/50 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
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
                        className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-bold py-3 px-7 rounded-full hover:bg-slate-100 transition-colors duration-200"
                    >
                        Browse All Programs
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
