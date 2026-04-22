'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrainingHero, FinalCTA, ease } from '@/components/training/shared';

const programmes = [
    {
        tag: 'C-Suite · VPs',
        meta: 'Half-day · 6–15 participants',
        title: 'AI Leadership Workshop',
        desc: 'Strategic AI clarity for senior executives. Half-day facilitated session. Business-first — a decision session, not a briefing.',
        href: '/training/leadership-workshop',
        accent: 'brand',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
    {
        tag: 'Managers · Teams',
        meta: '5 modules · 4–6 weeks',
        title: 'AI for Managers & Teams',
        desc: 'Applied AI fluency for mid-management. Prompting, tools, workflow integration, and responsible use. Modular or full-programme delivery.',
        href: '/training/managers',
        accent: 'emerald',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    },
    {
        tag: 'Students · Professionals',
        meta: '14 months · 30 seats',
        title: 'ECAP',
        desc: 'Highly selective SAP Techno-Functional AI Consultant programme. Paid internship from Month 10. July 2026 batch.',
        href: '/ecap',
        accent: 'amber',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    },
    {
        tag: 'GCCs · GSIs',
        meta: '6 months · Cohort',
        title: 'GCC AI Upskilling',
        desc: 'Structured AI capability for GCC middle layers. Role-aligned. Foundations through to domain application. October 2026 cohort pipeline open.',
        href: '/enterprises',
        accent: 'teal',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    },
    {
        tag: 'Any team',
        meta: 'Scoped by discovery',
        title: 'Custom Enterprise Programmes',
        desc: 'Bespoke capability programmes designed around your role taxonomy, tools, and context. Scoped through an initial discovery engagement.',
        href: '/solutions/ai-strategy-sprint',
        accent: 'slate',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
];

const tagTextClass = (a: string) => {
    switch (a) {
        case 'brand':
            return 'text-brand-600 border-brand-600/20';
        case 'emerald':
            return 'text-emerald-700 border-emerald-500/20';
        case 'amber':
            return 'text-amber-700 border-accent-300/40';
        case 'teal':
            return 'text-teal-700 border-teal-500/20';
        default:
            return 'text-slate-700 border-slate-200';
    }
};

export default function AcademyPage() {
    return (
        <main className="bg-slate-50">
            <TrainingHero
                eyebrow="Enterprise AI Academy"
                headingLead="Build AI capability"
                headingAccent="Where work actually happens"
                subtext="Structured programmes for corporate teams, individual professionals, and enterprise application users. Every programme is tied to business context, role relevance, and practical use."
                ctaText="Request a recommendation"
                ctaHref="#programmes"
                secondaryCtaText="WhatsApp us"
                secondaryCtaHref="https://wa.me/919999999999?text=I%20need%20help%20choosing%20the%20right%20Axentia%20AI%20programme"
                image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2400&q=80"
            />

            {/* Programme directory */}
            <section id="programmes" className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12 max-w-6xl">
                    <div className="text-center mb-14">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                        >
                            <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                                Programme directory
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight"
                        >
                            Every programme tied to{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                business context
                            </span>
                        </motion.h2>
                    </div>

                    <div className="space-y-5">
                        {programmes.map((p, i) => (
                            <motion.article
                                key={p.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] md:items-center">
                                    <div className="relative h-40 md:h-full md:min-h-[180px] overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/15 to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                                            <span
                                                className={`self-start inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] rounded-full border bg-white/95 backdrop-blur ${tagTextClass(p.accent)}`}
                                            >
                                                {p.tag}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-6 md:px-8 py-6 md:py-7">
                                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                                            {p.meta}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mb-2">
                                            {p.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                                    </div>

                                    <div className="px-6 md:pr-8 pb-6 md:pb-0 md:self-center">
                                        <a
                                            href={p.href}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-600 transition-colors whitespace-nowrap px-5 py-2.5 border border-slate-200 rounded-full hover:border-brand-600"
                                        >
                                            Explore
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                </div>
            </section>

            <FinalCTA
                heading="Start where it matters"
                headingAccent="most"
                subtext="Tell us your team size, role profile, and what you're trying to build — we'll recommend the right starting point. An AI Strategy Sprint maps priorities first; capability programmes follow from the decision, not before it."
                primaryText="Request a recommendation"
                primaryHref="/solutions/ai-strategy-sprint"
                secondaryText="WhatsApp us"
                secondaryHref="https://wa.me/919999999999?text=I%20need%20help%20choosing%20the%20right%20Axentia%20AI%20programme"
            />
        </main>
    );
}
