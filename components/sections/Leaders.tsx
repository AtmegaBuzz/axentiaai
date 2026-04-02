'use client';

import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const leaders = [
    {
        name: 'Manuj Gupta',
        role: 'Senior Advisor & Mentor',
        company: 'Axentia AI | Orane Consulting',
        bio: 'Seasoned enterprise leader guiding strategic direction and mentoring the next generation of AI and SAP professionals.',
        photo: '/images/team/manoj-gupta.jpeg',
        linkedin: 'https://www.linkedin.com/in/manuj123/',
    },
    {
        name: 'Arun Rajput',
        role: 'VP - Business Growth & Alliance',
        company: 'Axentia AI',
        bio: 'Drives enterprise partnerships and business expansion, building alliances that accelerate AI adoption across industries.',
        photo: '/images/team/arun-rajput.png',
        linkedin: 'https://in.linkedin.com/in/arun-rajput-65a3925',
    },
    {
        name: 'Dr. Naresh Pathak',
        role: 'Advisor',
        company: 'Axentia AI',
        bio: 'Brings deep academic and industry expertise to shape the strategic vision and quality standards of the organisation.',
        photo: '/images/team/Naresh-Kumar.jpg',
        linkedin: 'https://in.linkedin.com/in/nkp74',
    },
    {
        name: 'Gauri Gupta',
        role: 'Director - Operations',
        company: 'Axentia AI',
        bio: 'Oversees day-to-day operations ensuring delivery excellence, process efficiency, and seamless programme execution.',
        photo: '/images/team/gauri-gupta.jpeg',
        linkedin: 'https://in.linkedin.com/in/gauri-gupta-6768b21b5',
    },
    {
        name: 'Devlina Sarkar',
        role: 'Brand & Communication Manager',
        company: 'Axentia AI',
        bio: 'Shapes the brand narrative and communication strategy, connecting the Axentia.AI story with enterprises and talent alike.',
        photo: '/images/team/devlina-sarkar.jpeg',
        linkedin: 'https://www.linkedin.com/in/devlina-sarkar-081401229/',
    },
    {
        name: 'Nadeem Farooq',
        role: 'Senior Manager - Business Growth & Alliance',
        company: 'Axentia AI',
        bio: 'Leads enterprise outreach and alliance development, strengthening the bridge between Axentia.AI and global partners.',
        photo: '/images/team/nadeem.jpeg',
        linkedin: 'https://in.linkedin.com/in/nadeem-farooq-62598270',
    },
];

const snapDirs = [
    { x: -80, y: 40, rotate: -8 },
    { x: 0, y: -60, rotate: 6 },
    { x: 80, y: 40, rotate: -6 },
    { x: -40, y: 60, rotate: 8 },
    { x: 40, y: -40, rotate: -5 },
    { x: 0, y: 50, rotate: 7 },
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
                <div className="mb-16 md:mb-20">
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
                        className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4"
                    >
                        Backbone of <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">Axentia.AI</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.14 }}
                        className="text-lg text-slate-500 max-w-xl"
                    >
                        Industry veterans building the next generation for AI Era
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    delay: index * 0.08,
                                }}
                                whileHover={{
                                    y: -8,
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
