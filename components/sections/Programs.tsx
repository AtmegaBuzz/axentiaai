'use client';

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
        gradient: 'from-brand-500/80 to-purple-600/80',
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
        gradient: 'from-purple-600/80 to-indigo-700/80',
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
        gradient: 'from-teal-500/80 to-cyan-500/80',
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
        gradient: 'from-brand-600/80 to-brand-800/80',
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
        gradient: 'from-amber-400/80 to-orange-500/80',
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
        gradient: 'from-slate-500/80 to-brand-600/80',
        icon: BarChart3,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80',
    },
];

function ProgramCard({ prog }: { prog: Program }) {
    const Icon = prog.icon;
    return (
        <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            {/* Image area with gradient overlay */}
            <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={prog.image}
                    alt={prog.subtitle}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${prog.gradient}`} />
                {/* Icon */}
                <Icon className="absolute bottom-5 right-5 w-12 h-12 text-white/25" strokeWidth={1.5} />
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
        </div>
    );
}

export function Programs() {
    return (
        <section id="programs" className="py-16 md:py-24 bg-slate-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4">Programs</div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Choose your path.</h2>
                    <p className="text-lg text-slate-600">Six programs designed for different stages of your consulting career.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((prog) => (
                        <ProgramCard key={prog.title} prog={prog} />
                    ))}
                </div>
            </div>
        </section>
    );
}
