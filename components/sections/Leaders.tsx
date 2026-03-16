'use client';

import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const leaders = [
    {
        name: 'Manuj Gupta',
        role: 'Founder & CEO',
        company: 'Axentia AI | Orane Consulting',
        bio: '25+ years of SAP enterprise delivery. Built one of India\'s leading SAP practices from the ground up.',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
        linkedin: 'https://www.linkedin.com/in/manuj-gupta',
        color: 'from-brand-500 to-brand-700',
    },
    {
        name: 'Priya Sharma',
        role: 'Head of Academics',
        company: 'Axentia AI',
        bio: 'Former SAP Practice Lead. Designs the curriculum that bridges classroom theory with real project delivery.',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80',
        linkedin: '#',
        color: 'from-rose-500 to-pink-600',
    },
    {
        name: 'Rajesh Kumar',
        role: 'Director of Operations',
        company: 'Axentia AI',
        bio: 'Scaled consulting operations across 10+ countries. Oversees apprenticeship placements and partner relations.',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80',
        linkedin: '#',
        color: 'from-blue-500 to-indigo-600',
    },
    {
        name: 'Anita Verma',
        role: 'Head of Placements',
        company: 'Axentia AI',
        bio: 'Built talent pipelines for Fortune 500 companies. Drives the 95% placement record across cohorts.',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&q=80',
        linkedin: '#',
        color: 'from-amber-500 to-orange-600',
    },
];

const snapDirs = [
    { x: -80, y: 40, rotate: -8 },
    { x: 0, y: -60, rotate: 6 },
    { x: 80, y: 40, rotate: -6 },
    { x: 0, y: 60, rotate: 8 },
];

export function Leaders() {
    return (
        <section className="py-16 md:py-28 relative overflow-hidden bg-white border-t border-slate-100">
            {/* Background dots */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
                    <pattern id="leaderDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1.5" fill="#8929AC" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#leaderDots)" />
                </svg>
            </div>

            {/* Glow blobs */}
            <div className="absolute top-20 left-[10%] w-80 h-80 bg-brand-400/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-accent-400/6 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                    >
                        <span className="inline-block px-2 py-0.5 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>
                            Leadership
                        </span>
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
                    >
                        Backbone of <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">Axentia.AI</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-lg text-slate-500 max-w-xl mx-auto"
                    >
                        Industry veterans building the next generation for AI Era
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leaders.map((leader, index) => {
                        const dir = snapDirs[index % snapDirs.length];
                        return (
                            <motion.div
                                key={leader.name}
                                initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.85 }}
                                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 18,
                                    mass: 0.8,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                                }}
                                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Photo */}
                                <div className="relative h-64 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={leader.photo}
                                        alt={leader.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-base font-bold text-slate-900 leading-snug">{leader.name}</h3>
                                        <a
                                            href={leader.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 shrink-0 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Linkedin className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                    <p className="text-xs font-semibold text-brand-600 mb-0.5">{leader.role}</p>
                                    <p className="text-xs text-slate-400 mb-3">{leader.company}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{leader.bio}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
