'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Rocket, TrendingUp, Globe, Settings, Brain, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Program {
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
    desc: string;
    meta: string;
    gradient: string;
    icon: LucideIcon;
    image: string;
}

const programs: Program[] = [
    {
        title: 'DCAP',
        subtitle: 'Daksha Career Accelerator Program',
        badge: 'Most Popular',
        badgeColor: 'bg-white/90 text-brand-700',
        desc: 'A 10-month structured pathway with 4 months classroom learning and a paid apprenticeship.',
        meta: '10 months · Classroom + Apprenticeship',
        gradient: 'from-brand-500 to-purple-600',
        icon: Rocket,
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    },
    {
        title: 'EAP',
        subtitle: 'Enterprise Acceleration Program',
        badge: 'Advanced',
        badgeColor: 'bg-white/90 text-indigo-700',
        desc: 'For DCAP completers ready to tackle cross-module integration and industry scenarios.',
        meta: 'Performance-based selection',
        gradient: 'from-purple-600 to-indigo-700',
        icon: TrendingUp,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    },
    {
        title: 'Online Program',
        subtitle: 'Online Foundation',
        badge: 'Upcoming',
        badgeColor: 'bg-white/90 text-teal-700',
        desc: 'Begin with the basics — SAP fundamentals and enterprise process understanding.',
        meta: 'Self-paced · Online',
        gradient: 'from-teal-500 to-cyan-500',
        icon: Globe,
        image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&h=400&fit=crop&q=80',
    },
    {
        title: 'SAP Consulting',
        subtitle: 'SAP Consulting Apprenticeship',
        badge: 'New',
        badgeColor: 'bg-white/90 text-brand-700',
        desc: 'Hands-on SAP consulting with real enterprise clients from implementation to go-live.',
        meta: '6 months · Hands-on',
        gradient: 'from-brand-600 to-brand-800',
        icon: Settings,
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
    },
    {
        title: 'Data & AI',
        subtitle: 'Data & AI for Enterprise',
        badge: 'New',
        badgeColor: 'bg-white/90 text-amber-700',
        desc: 'AI/ML and data analytics applied to enterprise systems and business processes.',
        meta: '4 months · Intensive',
        gradient: 'from-amber-400 to-orange-500',
        icon: Brain,
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop&q=80',
    },
    {
        title: 'ERP Analyst',
        subtitle: 'ERP Business Analyst Track',
        badge: 'New',
        badgeColor: 'bg-white/90 text-slate-700',
        desc: 'Business analysis for ERP — requirements gathering, process mapping, and solution design.',
        meta: '5 months · Program',
        gradient: 'from-slate-500 to-brand-600',
        icon: BarChart3,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80',
    },
];

/* Snap-in directions: each card enters from a unique angle */
const snapDirs = [
    { x: -60, y: 50, rotate: -6 },
    { x: 0, y: 70, rotate: 4 },
    { x: 60, y: 50, rotate: 6 },
    { x: -50, y: -40, rotate: -5 },
    { x: 0, y: -60, rotate: 3 },
    { x: 50, y: -40, rotate: 5 },
];

function ProgramCard({ prog, index }: { prog: Program; index: number }) {
    const Icon = prog.icon;
    const dir = snapDirs[index % snapDirs.length];

    return (
        <motion.div
            initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                type: 'spring',
                stiffness: 170,
                damping: 18,
                mass: 0.8,
                delay: index * 0.08,
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 22 },
            }}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
        >
            {/* Image area */}
            <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={prog.image}
                    alt={prog.subtitle}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                <Icon className="absolute bottom-5 right-5 w-12 h-12 text-white/40" strokeWidth={1.5} />
                {/* Badge snaps in with rotation */}
                <motion.span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm ${prog.badgeColor}`}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.3 + index * 0.08 }}
                >
                    {prog.badge}
                </motion.span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{prog.title}</h3>
                <p className="text-sm font-semibold text-slate-900 mb-3">{prog.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">{prog.desc}</p>
                <p className="text-xs text-slate-400 font-medium mb-4">{prog.meta}</p>
                <button
                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group/link"
                >
                    Enroll Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                </button>
            </div>
        </motion.div>
    );
}

export function Programs() {
    return (
        <section id="programs" className="relative py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Programs
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.05 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6"
                    >
                        Choose your <span className="font-cursive italic text-brand-600 text-[1.1em]">path</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                        className="text-lg text-slate-600"
                    >
                        Six programs designed for different stages of your consulting career.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((prog, i) => (
                        <ProgramCard key={prog.title} prog={prog} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
