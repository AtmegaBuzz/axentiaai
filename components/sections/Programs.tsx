'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Program {
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
    subhead: string;
    duration: string;
    description: string;
    bullets: { emoji: string; text: string }[];
    gradient: string;
    image: string;
}

const programs: Program[] = [
    {
        id: 'dcap',
        title: 'DCAP',
        subtitle: 'Daksha Career Accelerator Program',
        badge: 'Flagship',
        badgeColor: 'bg-white/90 text-brand-700',
        subhead: 'Our flagship program.',
        duration: '10 Months · Classroom + Paid Apprenticeship',
        description:
            'A 10-month pathway designed to turn graduates into enterprise-ready SAP consultants. 4 months learning, 6 months paid apprenticeship.',
        bullets: [
            { emoji: '🏢', text: 'Learn how SAP supports real business' },
            { emoji: '🔄', text: 'Enterprise process flows (P2P, O2C, R2R, H2R)' },
            { emoji: '⚙️', text: 'SAP S/4HANA core modules (MM, FICO, SD)' },
            { emoji: '💼', text: '6 months paid apprenticeship' },
        ],
        gradient: 'from-brand-500 to-purple-600',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    },
    {
        id: 'eap',
        title: 'EAP',
        subtitle: 'Enterprise Acceleration Program',
        badge: 'Advanced',
        badgeColor: 'bg-white/90 text-indigo-700',
        subhead: 'Our Advanced Programme.',
        duration: 'Performance-based selection',
        description:
            'For DCAP graduates ready to move beyond basics and work on complex enterprise scenarios. This program deepens your consulting capabilities and prepares you for larger responsibilities within SAP project teams.',
        bullets: [
            { emoji: '🔗', text: 'Cross-module integration across SAP processes' },
            { emoji: '📊', text: 'Presales support and effort estimation' },
            { emoji: '🤖', text: 'AI use cases within enterprise environments' },
            { emoji: '🎯', text: 'Managing larger responsibilities within project teams' },
        ],
        gradient: 'from-purple-600 to-indigo-700',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    },
    {
        id: 'online',
        title: 'Online Foundation',
        subtitle: 'Start with the Basics',
        badge: 'Upcoming',
        badgeColor: 'bg-white/90 text-teal-700',
        subhead: 'A self-paced introduction.',
        duration: 'Self-paced · Online',
        description:
            'A self-paced introduction to SAP fundamentals and enterprise processes for those exploring a career in enterprise consulting.',
        bullets: [
            { emoji: '📚', text: 'SAP fundamentals and core concepts' },
            { emoji: '🏭', text: 'How enterprise business processes work' },
            { emoji: '📋', text: 'Structured introductory learning modules' },
            { emoji: '🔑', text: 'The basics needed to understand SAP consulting environments' },
        ],
        gradient: 'from-teal-500 to-cyan-500',
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
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Badge */}
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
                <div className="mb-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">{prog.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-0.5">{prog.title}</h3>
                <p className="text-sm font-semibold text-slate-600 mb-1">{prog.subtitle}</p>
                <p className="text-xs text-brand-600 font-medium italic mb-3">{prog.subhead}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{prog.description}</p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-5 flex-grow">
                    {prog.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-base leading-none mt-0.5">{b.emoji}</span>
                            <span>{b.text}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Buttons */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
                    <Link
                        href={`/programs?tab=${prog.id}`}
                        className="flex-1 text-center text-sm font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 hover:border-brand-400 py-2.5 px-4 rounded-xl transition-all duration-200"
                    >
                        Explore More
                    </Link>
                    <Link
                        href={`/programs?tab=${prog.id}#apply`}
                        className="flex-1 text-center inline-flex items-center justify-center gap-1.5 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white py-2.5 px-4 rounded-xl transition-all duration-200"
                    >
                        Enroll Now
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function Programs() {
    return (
        <section id="programs" className="relative py-16 md:py-24 overflow-hidden">
            {/* Background video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/videos/graduation-poster.jpg"
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/graduation-celebration.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/65" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
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
                        Six programs designed for every{' '}
                        <span className="font-cursive italic text-accent-300 text-[1.1em]">stage.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                        className="text-lg text-white/70"
                    >
                        Six programs are designed for different stages of an enterprise consulting career.
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
