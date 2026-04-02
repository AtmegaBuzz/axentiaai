'use client';

import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight } from 'lucide-react';

const leaders = [
    {
        name: 'Manuj Gupta',
        role: 'Senior Advisor & Mentor',
        company: 'Axentia AI | Orane Consulting',
        photo: '/images/team/manoj-gupta.jpeg',
        linkedin: 'https://www.linkedin.com/in/manuj123/',
    },
    {
        name: 'Arun Rajput',
        role: 'VP - Business Growth & Alliance',
        company: 'Axentia AI',
        photo: '/images/team/arun-rajput.png',
        linkedin: 'https://in.linkedin.com/in/arun-rajput-65a3925',
    },
    {
        name: 'Gauri Gupta',
        role: 'Director',
        company: 'Axentia AI',
        photo: '/images/team/gauri-gupta.jpeg',
        linkedin: 'https://in.linkedin.com/in/gauri-gupta-6768b21b5',
    },
    {
        name: 'Nadeem Farooq',
        role: 'Senior Manager - Business Growth & Alliance',
        company: 'Axentia AI',
        photo: '/images/team/nadeem.jpeg',
        linkedin: 'https://in.linkedin.com/in/nadeem-farooq-62598270',
    },
    {
        name: 'Devlina Sarkar',
        role: 'Brand & Communication Manager',
        company: 'Axentia AI',
        photo: '/images/team/devlina-sarkar.jpeg',
        linkedin: 'https://www.linkedin.com/in/devlina-sarkar-081401229/',
    },
    {
        name: 'Neha Sharma',
        role: 'Senior Manager',
        company: 'Axentia AI',
        photo: '/images/team/neha-sharma.png',
        linkedin: 'https://www.linkedin.com/in/neha-sharma-71a4baa7/',
    },
];

export function Leaders() {
    return (
        <section className="relative overflow-hidden bg-slate-900">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
                    <defs>
                        <pattern id="leaderGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#leaderGrid)" />
                </svg>
            </div>

            {/* Brand accent glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-20 md:py-28">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-18">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-4"
                        >
                            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/20 bg-accent-300/8">
                                Leadership
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4"
                        >
                            Backbone of{' '}
                            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                                Axentia.AI
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-base md:text-lg text-white/50 max-w-xl leading-relaxed"
                        >
                            Industry veterans building the next generation for AI Era
                        </motion.p>
                    </div>

                    {/* Team count badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="flex items-center gap-4 shrink-0"
                    >
                        <div className="text-right">
                            <p className="text-2xl font-black text-white tracking-tight">3</p>
                            <p className="text-[10px] font-medium text-white/35 uppercase tracking-wider">Leaders</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-right">
                            <p className="text-2xl font-black text-white tracking-tight">16+</p>
                            <p className="text-[10px] font-medium text-white/35 uppercase tracking-wider">Years Experience</p>
                        </div>
                    </motion.div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
                    {leaders.map((leader, index) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group relative bg-slate-900 hover:bg-slate-800/80 transition-colors duration-300"
                        >
                            {/* Photo with overlay */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={leader.photo}
                                    alt={leader.name}
                                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                />
                                {/* Gradient overlay for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                                {/* LinkedIn icon — top right, always visible */}
                                <a
                                    href={leader.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/60 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-200"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>

                                {/* Name + role overlay at bottom of photo */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <h3 className="text-base font-bold text-white leading-snug tracking-tight">
                                            {leader.name}
                                        </h3>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-accent-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                    </div>
                                    <p className="text-[11px] font-semibold text-brand-300 uppercase tracking-wider mb-0.5">
                                        {leader.role}
                                    </p>
                                    <p className="text-[10px] text-white/35 font-medium">
                                        {leader.company}
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
