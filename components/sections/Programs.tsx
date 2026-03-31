'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Offering {
    id: string;
    tag: string;
    title: string;
    titleAccent: string;
    description: string;
    includes: string[];
    image: string;
}

const offerings: Offering[] = [
    {
        id: 'transformation',
        tag: 'Enterprise · Project-based',
        title: 'Enterprise AI',
        titleAccent: 'Transformation',
        description:
            'We design, build, and deploy AI within your SAP and enterprise workflows — taking ideas into active use across the business.',
        includes: [
            'AI pilots aligned to real business use cases',
            'Demand forecasting, invoice automation, HR copilots',
            'Predictive maintenance using SAP PM data',
            'Integration with S/4HANA, BTP, and Joule',
            'Seamless progression from pilot to wider adoption',
        ],
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    },
    {
        id: 'capability',
        tag: 'Enterprise · Company-specific',
        title: 'Enterprise AI',
        titleAccent: 'Capability',
        description:
            'We develop the capability within your organisation to lead, operate, and expand AI initiatives with clarity and ownership.',
        includes: [
            'AI-enabled teams across business and IT',
            'Identification and development of internal use cases',
            'Governance and ways of working for AI adoption',
            'Enablement across SuccessFactors and Analytics Cloud',
            'Training tailored to your organisation',
        ],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    },
    {
        id: 'academies',
        tag: 'Public · Open Enrollment',
        title: 'Talent',
        titleAccent: 'Academies',
        description:
            'We prepare individuals and enterprise teams through structured programs across AI, SAP, and industry tracks.',
        includes: [
            'AI Foundation Academy',
            'SAP SuccessFactors Academy',
            'Retail & FMCG Industry Academy',
            'Energy & Utilities Industry Academy',
            'SAP Workforce Accelerator',
        ],
        image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&h=400&fit=crop&q=80',
    },
];

const snapDirs = [
    { x: -60, y: 50, rotate: -6 },
    { x: 0, y: 70, rotate: 4 },
    { x: 60, y: 50, rotate: 6 },
];

function OfferingCard({ offering, index }: { offering: Offering; index: number }) {
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
            className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
        >
            {/* Thumbnail with play button */}
            <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={offering.image}
                    alt={offering.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-slate-900 fill-current ml-0.5" />
                    </div>
                </div>
                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-slate-600 px-2.5 py-1 rounded-full">
                        {offering.tag}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6">
                {/* Heading */}
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2 text-left">
                    {offering.title}{' '}
                    <span className="text-accent-500">{offering.titleAccent}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{offering.description}</p>

                {/* Includes */}
                <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Includes</p>
                    <ul className="space-y-2">
                        {offering.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-left">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-xs text-slate-600 leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <Link
                    href={`/programs?tab=${offering.id}`}
                    className="mt-auto inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-5 rounded-full w-fit transition-colors duration-200"
                >
                    Learn More
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}

export function Programs() {
    return (
        <section id="what-we-deliver" className="relative py-16 md:py-24 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/programs-bg.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/65" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="mb-16 max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        <span className="inline-block px-3 py-1 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>
                            HOW WE HELP YOU SUCCEED
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.05 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
                    >
                        Bringing transformation, capability, and talent into{' '}
                        <span className="font-cursive italic text-accent-300 text-[1.1em]">alignment</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                        className="relative max-w-2xl mx-auto mt-2"
                    >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-5">
                            <p className="text-base md:text-lg text-white/70 leading-relaxed">
                                Be it AI transformation, internal capability, or talent development, Axentia.AI solves them all together. Each part of our model strengthens the others, creating momentum that holds beyond the engagement.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offerings.map((offering, i) => (
                        <OfferingCard key={offering.id} offering={offering} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
