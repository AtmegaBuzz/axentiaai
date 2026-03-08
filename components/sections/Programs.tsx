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
    },
];

function ProgramCard({ prog, idx }: { prog: Program; idx: number }) {
    const Icon = prog.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.08 * idx, duration: 0.5 }}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
        >
            {/* Gradient image area */}
            <div className={`relative h-52 bg-gradient-to-br ${prog.gradient} overflow-hidden`}>
                {/* Abstract decorative shapes */}
                <div className="absolute inset-0 opacity-[0.12]">
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[6px] border-white" />
                    <div className="absolute bottom-4 left-6 w-20 h-20 rounded-full border-[4px] border-white" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-[3px] border-white" />
                </div>
                {/* Icon */}
                <Icon className="absolute bottom-5 right-5 w-12 h-12 text-white/20" strokeWidth={1.5} />
                {/* Badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${prog.badgeColor}`}>
                    {prog.badge}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{prog.title}</h3>
                <p className="text-sm font-semibold text-brand-600 mb-3">{prog.subtitle}</p>
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
        <section id="programs" className="py-16 md:py-24 bg-slate-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4">Programs</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Choose your path.</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-slate-600">Six programs designed for different stages of your consulting career.</motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((prog, idx) => (
                        <ProgramCard key={prog.title} prog={prog} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
