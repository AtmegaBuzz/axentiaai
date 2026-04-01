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
        ],
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=900&fit=crop&q=80',
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
            'Training tailored to your organisation',
        ],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop&q=80',
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
        ],
        image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&h=900&fit=crop&q=80',
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
                <Link href={`/programs?tab=${offering.id}`} className="inline-flex items-center gap-2 group">
                    <span className="text-sm font-bold text-slate-900 border-b-2 border-[#8A29AC] pb-0.5 group-hover:text-[#8A29AC] transition-colors duration-200">
                        Learn More
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#8A29AC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
                        className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest"
                        style={{ background: '#F7C87A', color: '#232322' }}
                    >
                        HOW WE HELP YOU SUCCEED
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.06 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6 max-w-none mx-auto whitespace-nowrap"
                >
                    Bringing transformation, capability, and talent into{' '}
                    <span className="font-cursive italic text-[#8A29AC] text-[1.05em]">alignment</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto"
                >
                    Be it AI transformation, internal capability, or talent development, Axentia.AI solves them all together. Each part of our model strengthens the others.
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
