'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Clock, CalendarDays, GraduationCap, MonitorPlay, Briefcase, Layers, BookOpen, Brain, Target, Users, Cpu, FileText } from 'lucide-react';
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
        id: 'dcap',
        title: 'Daksha Career',
        titleAccent: 'Accelerator',
        description:
            'Turn graduates into enterprise-ready SAP consultants through classroom learning and paid apprenticeship.',
        info: [
            { label: 'Format', value: 'Classroom + Apprenticeship', Icon: MonitorPlay },
            { label: 'Eligibility', value: 'Fresh Graduates', Icon: GraduationCap },
            { label: 'Duration', value: '10 Months', Icon: Clock },
            { label: 'Apprenticeship', value: '6 Months Paid', Icon: Briefcase },
            { label: 'Modules', value: 'MM, FICO, SD', Icon: Layers },
            { label: 'Processes', value: 'P2P, O2C, R2R, H2R', Icon: Target },
        ],
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    },
    {
        id: 'eap',
        title: 'Enterprise',
        titleAccent: 'Accelerator',
        description:
            'Deepen consulting capabilities with complex enterprise scenarios and larger SAP project responsibilities.',
        info: [
            { label: 'Format', value: 'Advanced Cohort', Icon: MonitorPlay },
            { label: 'Eligibility', value: 'DCAP Graduates', Icon: GraduationCap },
            { label: 'Selection', value: 'Performance-based', Icon: Target },
            { label: 'Focus', value: 'Cross-module Integration', Icon: Layers },
            { label: 'Skills', value: 'Presales & Estimation', Icon: FileText },
            { label: 'AI/ML', value: 'Enterprise AI Use Cases', Icon: Brain },
        ],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    },
    {
        id: 'online',
        title: 'Online',
        titleAccent: 'Foundation',
        description:
            'Self-paced introduction to SAP fundamentals and enterprise processes for aspiring consultants.',
        info: [
            { label: 'Format', value: 'Self-paced Online', Icon: MonitorPlay },
            { label: 'Eligibility', value: 'Anyone', Icon: Users },
            { label: 'Duration', value: 'Flexible', Icon: Clock },
            { label: 'Covers', value: 'SAP Fundamentals', Icon: BookOpen },
            { label: 'Processes', value: 'Enterprise Workflows', Icon: Layers },
            { label: 'Access', value: 'Always Open', Icon: CalendarDays },
        ],
        image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&h=400&fit=crop&q=80',
    },
];

const snapDirs = [
    { x: -60, y: 50, rotate: -6 },
    { x: 0, y: 70, rotate: 4 },
    { x: 60, y: 50, rotate: 6 },
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
            className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
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
                {/* Heading */}
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2 text-left">
                    {prog.title} {prog.titleAccent}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{prog.description}</p>

                {/* Info grid */}
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

                {/* CTA */}
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
    return (
        <section id="programs" className="relative py-16 md:py-24 overflow-hidden">
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
                <div className="text-center mx-auto mb-16">
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
                        className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
                    >
                        3 programs designed for every <span className="font-cursive italic text-accent-300 text-[1.1em]">stage</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                        className="text-lg text-white/70 italic"
                    >
                        From first steps to senior consulting, a clear path for every stage of your enterprise career.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((prog, i) => (
                        <ProgramCard key={prog.id} prog={prog} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
