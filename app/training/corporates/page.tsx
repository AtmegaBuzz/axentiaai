'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Crown, Users } from 'lucide-react';
import { TrainingHero, FinalCTA } from '@/components/training/shared';

const programmes = [
    {
        tag: 'C-Suite · VPs · Senior leaders',
        accent: 'brand',
        Icon: Crown,
        title: 'AI Leadership Workshop',
        desc: 'A focused half-day session to build strategic AI clarity. Where to prioritise, how to lead adoption, what risks to govern, and how to move without handing over the agenda to technology teams. Business-first. Outcome-oriented. Facilitated, not presented.',
        format: 'Half-day · In-person or virtual · 6–15 participants',
        cta: 'Explore this workshop',
        href: '/training/leadership-workshop',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
    },
    {
        tag: 'Mid-management · Team leads · Functional professionals',
        accent: 'emerald',
        Icon: Users,
        title: 'AI for Managers & Teams',
        desc: 'A modular applied fluency programme for managers and teams who need to use AI in their day-to-day work. Prompting, tools, workflow integration, and responsible use — practical from session one.',
        format: '5-module series · Standalone or full programme · 10–25 participants',
        cta: 'Explore this programme',
        href: '/training/managers',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
    },
];

export default function CorporatesPage() {
    return (
        <main className="bg-slate-50">
            <TrainingHero
                eyebrow="Corporate AI Training"
                headingLead="AI training for corporate teams"
                headingAccent="Leadership & management programmes"
                subtext="Practical AI fluency for the people who lead and manage enterprise work. Two distinct programmes. One outcome: an organisation that uses AI with confidence, not confusion."
                ctaText="Book a corporate workshop"
                ctaHref="#programmes"
                secondaryCtaText="WhatsApp us"
                secondaryCtaHref="https://wa.me/919999999999?text=I%20want%20to%20book%20a%20corporate%20AI%20workshop"
                image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2400&q=80"
            />

            {/* Programmes split */}
            <section id="programmes" className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <div className="text-center mb-14">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                        >
                            <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                                Choose your programme
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto"
                        >
                            AI is now a leadership conversation. We deliver{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                both sides of it
                            </span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {programmes.map((p, i) => (
                            <motion.article
                                key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                style={{
                                    borderTopWidth: '3px',
                                    borderTopColor: p.accent === 'brand' ? '#A20EBF' : '#10b981',
                                }}
                            >
                                <div className="relative h-44 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/55 via-transparent to-transparent" />
                                </div>
                                <div className="p-7 md:p-8 flex flex-col flex-1">
                                    <span
                                        className={`self-start inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] rounded-full mb-4 ${
                                            p.accent === 'brand'
                                                ? 'bg-brand-600/10 text-brand-600 border border-brand-600/20'
                                                : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                                        }`}
                                    >
                                        <p.Icon className="w-3.5 h-3.5" strokeWidth={2} />
                                        {p.tag}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{p.desc}</p>
                                    <div className="pt-5 border-t border-slate-100 mb-5">
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                                            Format
                                        </div>
                                        <div className="text-sm text-slate-700">{p.format}</div>
                                    </div>
                                    <a
                                        href={p.href}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:gap-3 transition-all"
                                    >
                                        {p.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Direct-sell band */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 md:mt-20 rounded-2xl bg-gradient-to-br from-brand-50 via-white to-slate-50 border border-brand-200/40 p-10 md:p-14 text-center"
                    >
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8 mb-5">
                            Direct-sell · 50 organisations in 180 days
                        </span>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                            Straightforward corporate{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                booking
                            </span>
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Available as standalone bookings or as part of a structured organisation-wide AI
                            capability rollout. Corporate pricing available for multiple cohorts or annual programmes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                            <a
                                href="/training/academy"
                                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-7 text-sm transition-colors rounded-full shadow-lg shadow-brand-600/25"
                            >
                                Book a corporate workshop
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="https://wa.me/919999999999?text=I%20want%20to%20book%20a%20corporate%20AI%20workshop"
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 font-semibold py-3 px-7 text-sm transition-colors rounded-full"
                            >
                                <MessageCircle className="w-4 h-4 text-emerald-500" />
                                WhatsApp us now
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FinalCTA
                heading="Not sure which fits"
                headingAccent="first"
                subtext="Tell us your team size and role profile — we'll recommend the right starting point."
                primaryText="Book an AI Strategy Sprint"
                primaryHref="/solutions/ai-strategy-sprint"
                secondaryText="WhatsApp us"
                secondaryHref="https://wa.me/919999999999?text=I%20need%20help%20choosing%20the%20right%20Axentia%20AI%20programme"
            />
        </main>
    );
}
