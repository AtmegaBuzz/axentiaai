'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Persona {
    role: string;
    description: string;
    points: string[];
    image: string;
    imageAlt: string;
}

const enterprisePersonas: Persona[] = [
    {
        role: 'CIO / CTO',
        description:
            'Brings AI into the flow of systems already in place, so improvements show up in how the business runs day to day.',
        points: ['Works with existing SAP landscape', 'Cuts manual load across functions', 'Speeds up decision-making'],
        image: '/images/cio-cto.jpg',
        imageAlt: 'CTO reviewing enterprise systems',
    },
    {
        role: 'CHRO',
        description:
            'Shapes how teams adapt, learn, and take ownership as new ways of working begin to settle in.',
        points: ['AI within HR workflows', 'Upskilling tied to actual roles', 'Capability built internally'],
        image: '/images/chro.webp',
        imageAlt: 'HR leader in a meeting',
    },
    {
        role: 'Business Leaders',
        description:
            'Focuses on where work slows down or gets messy and introduces changes that make it smoother and easier to run.',
        points: ['Use cases tied to real problems', 'Less friction in execution', 'Clear movement in outcomes'],
        image: '/images/Business-Leaders.jpg',
        imageAlt: 'Business leaders collaborating',
    },
    {
        role: 'Enterprise L&D',
        description:
            'Extends this across teams in a structured way, aligned to how the organisation actually works.',
        points: ['Programs built for your setup', 'Scales across teams', 'Linked to business outcomes'],
        image: '/images/new_images/personas/enterprise-ld/group-projector-training.jpg',
        imageAlt: 'Enterprise training session',
    },
];

const talentPersonas: Persona[] = [
    {
        role: 'Students & Early Career',
        description:
            'The gap between certification and employability is where most programmes fail. Axentia.AI closes it. You learn inside real enterprise contexts, develop the SAP and AI skills enterprises actually hire for, and enter the job market through a network that is already placing people.',
        points: ['Exposure to real use cases', 'Tracks across SAP and AI', 'Entry into live environments'],
        image: '/images/new_images/personas/students/community-technology-concept.jpg',
        imageAlt: 'Students learning together',
    },
    {
        role: 'Working Professionals',
        description:
            'Build on what they already know and move into roles that sit closer to enterprise systems and workflows.',
        points: ['Flexible progression paths', 'Industry-aligned tracks', 'Hands-on project exposure'],
        image: '/images/new_images/personas/working-professionals/woman-laptop-checkered.jpg',
        imageAlt: 'Professional at work',
    },
];

const tabs = [
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'talent', label: 'Talent' },
] as const;

function PersonaCard({ p, index }: { p: Persona; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col overflow-hidden bg-white border border-slate-200"
        >
            {/* Image */}
            <div className="relative h-40 overflow-hidden shrink-0">
                <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-6 py-6">
                <h3 className="font-bold text-slate-900 tracking-tight leading-tight mb-3 text-lg">
                    {p.role}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {p.description}
                </p>
                <ul className="space-y-2 mt-auto">
                    {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-[#8A29AC] shrink-0 mt-2" />
                            <span className="text-slate-700 text-sm leading-snug">{pt}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export function WhereWeFit() {
    const [activeTab, setActiveTab] = useState<'enterprise' | 'talent'>('enterprise');
    const personas = activeTab === 'enterprise' ? enterprisePersonas : talentPersonas;

    return (
        <section className="bg-white py-20 md:py-28 overflow-hidden relative border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">

                {/* Header row: tabs left, heading right */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-18">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Tab buttons */}
                        <div className="flex items-center gap-0 mb-6 border border-slate-200 w-fit">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'bg-slate-900 text-white'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <h2
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4"
                        >
                            Where Axentia.AI{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">fits?</span>
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-md">
                            For enterprises and individuals ready to scale with AI
                        </p>
                    </motion.div>
                </div>

                {/* Cards grid — switches based on tab */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`grid grid-cols-1 sm:grid-cols-2 ${activeTab === 'enterprise' ? 'lg:grid-cols-4' : 'lg:grid-cols-2 max-w-4xl'} gap-4`}
                    >
                        {personas.map((p, i) => (
                            <PersonaCard key={p.role} p={p} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}
