'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Industry {
    name: string;
    description: string;
    image: string;
    imageAlt: string;
}

const industries: Industry[] = [
    {
        name: 'Retail & CPG',
        description:
            'Document flow, knowledge support, supply chain interpretation, reporting acceleration.',
        image: '/images/where-axentiaai-fits/business-leaders.jpg',
        imageAlt: 'Retail and CPG industry',
    },
    {
        name: 'BFSI',
        description:
            'Compliance automation, document intelligence, operational decision support, HR enablement.',
        image: '/images/where-axentiaai-fits/cto.jpg',
        imageAlt: 'Banking and financial services',
    },
    {
        name: 'GCCs & GSIs',
        description:
            'AI upskilling cohorts, T-shaped talent development, domain grey hair building programmes.',
        image: '/images/where-axentiaai-fits/enterprise-l-d.jpg',
        imageAlt: 'Global capability centres',
    },
    {
        name: 'Professional Services',
        description:
            'Knowledge assistants, enablement workflows, team-level AI capability building.',
        image: '/images/where-axentiaai-fits/chro.jpg',
        imageAlt: 'Professional services',
    },
];

const ease = [0.22, 1, 0.36, 1] as const;

function IndustryCard({ ind, index }: { ind: Industry; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease }}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative h-44 overflow-hidden">
                <Image
                    src={ind.image}
                    alt={ind.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/10 to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">{ind.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{ind.description}</p>
            </div>
        </motion.div>
    );
}

export function WhereWeFit() {
    return (
        <section className="bg-white py-20 md:py-28 overflow-hidden relative border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                <div className="max-w-3xl mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            Where Axentia is most relevant
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4"
                    >
                        Where Axentia.AI{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent pr-[4px]">
                            fits?
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="text-xs md:text-sm text-slate-500 leading-relaxed"
                    >
                        Axentia is not built for every industry equally. We focus where enterprise process complexity,
                        AI displacement pressure, and workflow density create the most compressible value.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {industries.map((ind, i) => (
                        <IndustryCard key={ind.name} ind={ind} index={i} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-center mt-10 md:mt-14"
                >
                    <a
                        href="/enterprises"
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-7 text-sm transition-colors rounded-full"
                    >
                        See industry detail
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
