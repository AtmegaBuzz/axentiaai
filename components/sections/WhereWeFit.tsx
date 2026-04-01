'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const personas = [
    {
        number: '01',
        role: 'CIO / CTO',
        description:
            'Brings AI into the flow of systems already in place, so improvements show up in how the business runs day to day.',
        points: [
            'Works with existing SAP landscape',
            'Cuts manual load across functions',
            'Speeds up decision-making',
        ],
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&q=80',
        imageAlt: 'CTO reviewing enterprise systems',
    },
    {
        number: '02',
        role: 'CHRO',
        description:
            'Shapes how teams adapt, learn, and take ownership as new ways of working begin to settle in.',
        points: [
            'AI within HR workflows',
            'Upskilling tied to actual roles',
            'Capability built internally',
        ],
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop&q=80',
        imageAlt: 'HR leader in a meeting',
    },
    {
        number: '03',
        role: 'Business\nLeaders',
        description:
            'Focuses on where work slows down or gets messy and introduces changes that make it smoother and easier to run.',
        points: [
            'Use cases tied to real problems',
            'Less friction in execution',
            'Clear movement in outcomes',
        ],
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
        imageAlt: 'Business leaders collaborating',
    },
    {
        number: '04',
        role: 'Enterprise\nL&D',
        description:
            'Extends this across teams in a structured way, aligned to how the organisation actually works.',
        points: [
            'Programs built for your setup',
            'Scales across teams',
            'Linked to business outcomes',
        ],
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
        imageAlt: 'Enterprise training session',
    },
];

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function WhereWeFit() {
    return (
        <section className="bg-slate-50 py-20 md:py-28 overflow-hidden relative">

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">

                {/* ── Header ── */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-5"
                        >
                            Enterprise
                        </motion.span>

                        <h2
                            className="font-black text-slate-900 tracking-tight leading-[0.95] mb-4"
                            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
                        >
                            Where Axentia.AI{' '}
                            <motion.span
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    display: 'inline-block',
                                    WebkitTextStroke: '1.5px #8A29AC',
                                    color: 'transparent',
                                }}
                            >
                                fits?
                            </motion.span>
                        </h2>

                        <p className="text-slate-400 text-sm leading-relaxed">
                            For enterprises and individuals ready to scale with AI
                        </p>
                    </motion.div>
                </div>

                {/* ── 4-column card grid ── */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {personas.map((p, i) => (
                        <motion.div
                            key={p.number}
                            variants={cardVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                            className={[
                                'relative flex flex-col overflow-hidden bg-white group cursor-default',
                                'transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/80',
                                i < 3 ? 'lg:border-r border-slate-200' : '',
                                i < 2 ? 'sm:border-b lg:border-b-0 border-slate-200' : '',
                                i % 2 === 0 ? 'sm:border-r lg:border-r-0 border-slate-200' : '',
                            ].join(' ')}
                        >
                            {/* Image strip */}
                            <div className="relative h-40 overflow-hidden shrink-0">
                                <Image
                                    src={p.image}
                                    alt={p.imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                                <span
                                    aria-hidden
                                    className="absolute bottom-2 right-3 font-black leading-none text-white/20 select-none pointer-events-none"
                                    style={{ fontSize: '3.5rem' }}
                                >
                                    {p.number}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 px-8 py-8 relative overflow-hidden">
                                {/* Ghosted role backdrop */}
                                <span
                                    aria-hidden
                                    className="absolute -bottom-4 -right-3 font-black leading-none select-none pointer-events-none whitespace-pre-line text-right"
                                    style={{
                                        fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                                        WebkitTextStroke: '1px rgba(138,41,172,0.06)',
                                        color: 'transparent',
                                        lineHeight: 1,
                                    }}
                                >
                                    {p.role}
                                </span>

                                {/* Number */}
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A29AC] mb-4">
                                    {p.number}
                                </p>

                                {/* Role name */}
                                <h3
                                    className="font-black text-slate-900 tracking-tight leading-tight mb-4 whitespace-pre-line"
                                    style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)' }}
                                >
                                    {p.role}
                                </h3>

                                {/* Accent line */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 32 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: 'easeOut' }}
                                    className="mb-4 shrink-0"
                                    style={{ height: '2px', background: 'linear-gradient(to right, #8A29AC, transparent)' }}
                                />

                                {/* Description */}
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {p.description}
                                </p>

                                {/* Bullets */}
                                <ul className="space-y-2.5 mt-auto">
                                    {p.points.map((pt) => (
                                        <li key={pt} className="flex items-start gap-3">
                                            <span className="w-1 h-1 rounded-full bg-[#8A29AC] shrink-0 mt-2" />
                                            <span className="text-slate-700 text-sm leading-snug">{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
