'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const offerings = [
    {
        id: 'transformation',
        number: '01',
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
        image: '/images/new_images/offerings/enterprise-ai-transformation.jpg',
    },
    {
        id: 'capability',
        number: '02',
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
        image: '/images/ai-technology-human-interaction.jpg',
    },
    {
        id: 'academies',
        number: '03',
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
        image: '/images/talent-academy.jpg',
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
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600 leading-snug">{item}</span>
                        </li>
                    ))}
                </ul>
                <Link
                    href={`/programs?tab=${offering.id}`}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-5 py-2.5 hover:bg-slate-800 transition-colors duration-200 group"
                >
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
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
                        className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-[#8A29AC]/20 bg-[#8A29AC]/8 text-[#8A29AC]"
                    >
                        HOW WE HELP YOU SUCCEED
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.06 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6 max-w-none mx-auto"
                >
                    Bringing transformation, capability, and talent into{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">alignment</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className="text-sm md:text-base text-slate-500 leading-relaxed max-w-4xl mx-auto"
                >
                    Be it enterprise AI transformation, internal capability building, or structured talent development — Axentia.AI brings them together under one unified approach. Each part of our model strengthens the others, creating momentum that holds beyond the engagement.
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
