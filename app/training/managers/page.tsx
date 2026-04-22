'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrainingHero, FAQSection, TrainingForm, ease } from '@/components/training/shared';

const modules = [
    {
        num: '1',
        title: 'AI fundamentals for business',
        meta: '90 minutes',
        desc: 'What AI can and cannot do. Where it creates real productivity gains. Common misconceptions that lead to failed deployments. Business framing, not technical architecture.',
    },
    {
        num: '2',
        title: 'Prompting with intent',
        meta: 'Half-day',
        desc: "How to structure prompts for business tasks. Getting consistent, usable outputs. Avoiding common errors. Hands-on exercises using real work scenarios from your team's context.",
    },
    {
        num: '3',
        title: 'AI tools for your function',
        meta: 'Half-day',
        desc: 'Practical use cases for finance, HR, operations, and marketing. Tool selection and evaluation criteria. Applied exercises using representative work from your team.',
    },
    {
        num: '4',
        title: 'Workflow integration',
        meta: 'Full day',
        desc: 'Mapping AI into existing team processes. Identifying automation opportunities. Change and adoption basics — how to introduce AI without creating resistance or dependency.',
    },
    {
        num: '5',
        title: 'Responsible AI use',
        meta: '90 minutes',
        desc: "Data handling, output bias, vendor assessment, and governance fundamentals. Practical do's and don'ts for teams using AI in business contexts.",
    },
];

const formats = [
    {
        name: 'Standalone',
        desc: 'Select specific modules. No commitment to the full programme.',
    },
    {
        name: 'Full cohort',
        desc: 'All five modules across 4–6 weeks. Best for durable capability.',
    },
    {
        name: 'Custom build',
        desc: 'Modules designed around your tools, workflows, and domain context.',
    },
];

const faqs = [
    {
        q: 'How many people can join?',
        a: 'Sessions are optimised for 10–25 participants. Larger cohorts can be split or run in parallel.',
    },
    {
        q: 'Can this be tailored to our industry?',
        a: 'Yes. Each module includes an industry context layer. Retail, BFSI, professional services, and manufacturing variants available.',
    },
    {
        q: 'How is this different from the Leadership Workshop?',
        a: 'The Leadership Workshop is strategic — a half-day for senior leaders focused on AI prioritisation. The Managers programme is skills-building — practical use, prompting, and workflow integration over multiple sessions.',
    },
];

function ModulesAndFormats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <section ref={ref} className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                        5-module programme
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-12"
                >
                    Programme{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        modules
                    </span>
                </motion.h2>

                <div className="space-y-4 mb-16">
                    {modules.map((m, i) => (
                        <motion.div
                            key={m.num}
                            initial={{ opacity: 0, x: -12 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                            className="group border border-slate-200 rounded-xl p-5 md:p-6 bg-white hover:border-brand-200 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-start gap-4 mb-2">
                                <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-600/10 text-brand-600 flex items-center justify-center font-[family-name:var(--font-playfair)] italic text-lg font-medium">
                                    {m.num}
                                </div>
                                <div className="flex-1 flex items-baseline justify-between gap-4">
                                    <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                                        {m.title}
                                    </h3>
                                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                        {m.meta}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed pl-[52px]">{m.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Delivery formats */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mb-6"
                >
                    Delivery formats
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formats.map((f, i) => (
                        <motion.div
                            key={f.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                            className="rounded-xl border border-brand-200/40 bg-brand-50/40 p-6"
                        >
                            <h4 className="text-sm font-bold text-brand-600 uppercase tracking-[0.18em] mb-2">
                                {f.name}
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function ManagersPage() {
    return (
        <main className="bg-slate-50">
            <TrainingHero
                eyebrow="AI for Managers & Teams"
                headingLead="Applied AI fluency for"
                headingAccent="Managers and functional teams"
                subtext="Help your managers and teams use AI with confidence, not confusion. A modular programme that builds practical skills — prompting, tools, workflow integration, and responsible use — from the first session."
                ctaText="Request a programme outline"
                ctaHref="#enquire"
                secondaryCtaText="WhatsApp us"
                secondaryCtaHref="https://wa.me/919999999999?text=I%20want%20to%20enquire%20about%20AI%20for%20Managers%20programme"
                image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2400&q=80"
            />

            <ModulesAndFormats />

            <TrainingForm
                eyebrow="Enquire about this programme"
                heading="Applied fluency"
                headingAccent="for your teams"
                subtext="Tell us about your team size and we'll share a tailored programme outline within one business day."
                image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80"
                imageCaption="Practical from session one — not theory."
                programmeLabel="AI for Managers & Teams"
                extraSelect={{
                    label: 'Modules interested in',
                    options: [
                        'Standalone modules',
                        'Full programme (all 5)',
                        'Custom build',
                    ],
                }}
            />

            <FAQSection heading="Frequently asked" headingAccent="questions" faqs={faqs} />
        </main>
    );
}
