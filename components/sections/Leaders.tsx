'use client';

import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const people = [
    // Row 1 — Leaders
    {
        name: 'Manuj Gupta',
        role: 'Senior Advisor, Industry Expert',
        company: 'Founder & CEO, Orane Consulting',
        photo: '/images/team/manoj-gupta.jpeg',
        linkedin: 'https://www.linkedin.com/in/manuj123/',
    },
    {
        name: 'Aditya Shankar',
        role: 'Chief Product and Technology Officer',
        company: 'Axentia AI',
        photo: '/images/team/Aditya-Shankar.jpeg',
        linkedin: 'https://www.linkedin.com/in/aditya-shanker-iiml',
    },
    {
        name: 'Dr. Naresh Pathak',
        role: 'Adviser & Wellness Coach',
        company: 'Axentia AI',
        photo: '/images/team/Naresh-Pathak.jpg',
        linkedin: 'https://www.linkedin.com/in/nkp74/',
    },
    // Row 2
    {
        name: 'Arun Rajput',
        role: 'VP - Business Growth & Alliance',
        company: 'Axentia AI',
        photo: '/images/team/arun-rajput.jpeg',
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
        name: 'Rohit',
        role: 'Program Manager',
        company: 'Axentia AI',
        photo: '/images/team/rohit.jpeg',
        linkedin: 'https://www.linkedin.com/in/rohit-aggarwal92/',
    },
    // Row 3
    {
        name: 'Nadeem Farooq',
        role: 'Senior Manager - Business Growth & Alliance',
        company: 'Axentia AI',
        photo: '/images/team/nadeem.jpg',
        linkedin: 'https://in.linkedin.com/in/nadeem-farooq-62598270',
    },
    {
        name: 'Neha Sharma',
        role: 'Senior Associate',
        company: 'Axentia AI',
        photo: '/images/team/neha-sharma.jpeg',
        linkedin: 'https://www.linkedin.com/in/neha-sharma-71a4baa7/',
    },
    {
        name: 'Devlina Sarkar',
        role: 'Brand & Communication Manager',
        company: 'Axentia AI',
        photo: '/images/team/devlina-sarkar.jpg',
        linkedin: 'https://www.linkedin.com/in/devlina-sarkar-081401229/',
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
                <div className="mb-14 md:mb-18">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/20 bg-accent-300/8">
                            Our Team
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
                        <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            Axentia.AI
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xs md:text-sm text-white/50 max-w-xl leading-relaxed"
                    >
                        Industry veterans building the next generation for AI Era
                    </motion.p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {people.map((person, index) => (
                        <motion.div
                            key={person.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="group relative rounded-2xl bg-slate-900 hover:bg-slate-800/80 transition-colors duration-300 overflow-hidden"
                        >
                            {/* Photo with overlay */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={person.photo}
                                    alt={person.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Gradient overlay for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                                {/* LinkedIn icon — top right, only if link exists */}
                                {person.linkedin && (
                                    <a
                                        href={person.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 text-white/60 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-200"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}

                                {/* Name + role overlay at bottom of photo */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <h3 className="text-base font-bold text-white leading-snug tracking-tight">
                                            {person.name}
                                        </h3>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-accent-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                    </div>
                                    <p className="text-[11px] font-semibold text-brand-300 uppercase tracking-wider mb-0.5">
                                        {person.role}
                                    </p>
                                    <p className="text-[10px] text-white/35 font-medium">
                                        {person.company}
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
