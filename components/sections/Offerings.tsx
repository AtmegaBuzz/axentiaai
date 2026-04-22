'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const offerings = [
    {
        id: 'advisory',
        number: '01',
        tag: 'Enterprise Advisory',
        title: 'AI Strategy',
        titleAccent: 'Sprint',
        description:
            'A structured engagement to identify priority AI opportunities, assess readiness, and build a 90-day execution roadmap. For leadership teams that want clarity before investing widely.',
        includes: [
            'Priority use cases ranked by value and feasibility',
            'Readiness gap view — data, capability, governance',
            'Risk & governance framed for leadership decisions',
            '90-day execution roadmap with named ownership',
            'For: CEO · CIO · CFO · COO · Transformation leads',
        ],
        image: '/images/offerings/enterprise-ai-transformation.jpg',
    },
    {
        id: 'corporates',
        number: '02',
        tag: 'Corporate Training',
        title: 'AI for',
        titleAccent: 'Corporates',
        description:
            'Practical AI programmes for the people who lead and manage enterprise work. A leadership intensive for C-suite and a practical fluency series for mid-management — delivered at your premises.',
        includes: [
            'AI Leadership Workshop — half-day, C-suite',
            'AI for Managers — 5-module applied fluency series',
            'Standalone modules or full programme delivery',
            'In-person, virtual, or series formats',
            'For: CHRO · L&D Heads · VPs · Senior managers',
        ],
        image: '/images/offerings/ai-technology-human-interaction.jpg',
    },
    {
        id: 'ecap',
        number: '03',
        tag: 'Career Programme',
        title: 'ECAP',
        titleAccent: 'Programme',
        description:
            'A highly selective 14-month SAP Techno-Functional AI Consultant programme. 30 seats per batch. Paid internship on live enterprise projects. July 2026 batch open now.',
        includes: [
            '14-month structured journey across two phases',
            'SAP core + Python + applied AI foundations',
            'Paid internship on Orane live projects (Month 10)',
            'Pre-validated consultants with placement pipeline',
            'For: Final-year students · MBA aspirants · Early professionals',
        ],
        image: '/images/offerings/talent-academy.jpg',
    },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    return (
        <div ref={ref} className="relative w-full h-full overflow-hidden min-h-[55vw] md:min-h-0">
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                // eslint-disable-next-line @next/next/no-img-element
                className="absolute inset-0 w-full h-[115%] object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A29AC]/10 to-transparent" />
        </div>
    );
}

function OfferingRow({ offering, index }: { offering: typeof offerings[0]; index: number }) {
    const imageRight = index % 2 !== 0;

    const ContentPanel = (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col justify-between p-10 md:p-14 lg:p-20 min-h-[70vh] md:min-h-0 ${imageRight ? 'border-r border-slate-200' : ''}`}
        >
            <div>
                <div className="mb-6">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] bg-[#8A29AC]/8 border border-[#8A29AC]/20 rounded-full px-3 py-1 mb-4">
                        {offering.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight whitespace-nowrap">
                        {offering.title}{' '}
                            <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                {offering.titleAccent}
                            </span>
                        </h3>
                </div>
            </div>
            <div>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                    {offering.description}
                </p>
                <ul className="space-y-2.5 mb-10">
                    {offering.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#A20EBF] shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600 leading-snug">{item}</span>
                        </li>
                    ))}
                </ul>
                <span
                    className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-5 py-2.5 cursor-default rounded-full"
                >
                    Learn More
                    <ArrowUpRight className="w-4 h-4" />
                </span>
            </div>
        </motion.div>
    );

    const ImagePanel = (
        <div className="relative overflow-hidden min-h-[55vw] md:min-h-0">
            <ParallaxImage src={offering.image} alt={`${offering.title} ${offering.titleAccent}`} />
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200 last:border-b-0">
            {imageRight ? ContentPanel : ImagePanel}
            {imageRight ? ImagePanel : ContentPanel}
        </div>
    );
}

export function Offerings() {
    return (
        <section id="what-we-deliver" className="relative bg-white overflow-hidden">
            {/* Section header */}
            <div className="border-b border-slate-200 px-10 md:px-14 lg:px-20 py-20 md:py-24 w-full text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-5"
                >
                    <span
                        className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-[#8A29AC]/20 bg-[#8A29AC]/8 text-[#8A29AC]"
                    >
                        Three ways Axentia AI works with you
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.06 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6 max-w-none mx-auto"
                >
                    Choose your{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">starting point</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-4xl mx-auto"
                >
                    Strategic advisory, capability programmes, and a career pipeline — engage one, or engage all three. Every engagement ends with a clear next step, not a deck.
                </motion.p>
            </div>

            {/* Offering rows */}
            <div>
                {offerings.map((offering, i) => (
                    <OfferingRow key={offering.id} offering={offering} index={i} />
                ))}
            </div>
        </section>
    );
}
