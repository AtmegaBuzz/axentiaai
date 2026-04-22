'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TrainingHero, FAQSection, TrainingForm, ease } from '@/components/training/shared';

const stats = [
    { value: '½', label: 'Day — focused, not diluted' },
    { value: '6–15', label: 'Participants per session' },
    { value: '5', label: 'Facilitated session modules' },
    { value: '1', label: 'Actionable 90-day plan output' },
];

const modules = [
    {
        num: '1',
        title: 'The AI landscape — what is real, what is hype',
        meta: '45 min',
        desc: 'Leaders understand the state of AI in enterprise settings — what is delivering results, what is not, and what is genuinely relevant to their industry and function.',
    },
    {
        num: '2',
        title: 'Where AI creates value in your organisation',
        meta: '60 min',
        desc: 'A facilitated mapping of AI opportunity areas tied to your actual workflows — not generic use cases drawn from a standard presentation.',
    },
    {
        num: '3',
        title: 'Priority framework — where to start',
        meta: '45 min',
        desc: 'A structured method for selecting the two or three AI priorities that deserve focus now, and filtering out everything else.',
    },
    {
        num: '4',
        title: 'Risk, governance & responsible adoption',
        meta: '30 min',
        desc: 'Data risk, vendor dependency, workforce implications, and change readiness — framed as leadership decisions, not compliance checklists.',
    },
    {
        num: '5',
        title: 'The 90-day action plan',
        meta: '30 min',
        desc: 'A practical next-step roadmap with ownership, sequence, and success signals. Participants leave with a document, not a deck.',
    },
];

const whoAttends = [
    'CEOs and founders setting the AI direction for their organisation.',
    'CFOs who need to evaluate AI investment cases with rigour.',
    'COOs leading the operational transformation agenda.',
    'CHROs managing workforce capability and adoption responses.',
    'VPs and senior functional heads owning AI deployment in their domain.',
];

const delivery = [
    { mode: 'In-person', detail: 'At your office or neutral venue' },
    { mode: 'Virtual', detail: 'Facilitated online for distributed teams' },
    { mode: 'Series', detail: '2–3 sessions across consecutive weeks' },
];

const faqs = [
    {
        q: 'Do participants need an AI background?',
        a: 'No. The workshop is designed for business leaders. No prior AI knowledge is required. Technical depth is available as an optional add-on.',
    },
    {
        q: 'Can it be customised for our industry?',
        a: 'Yes. A pre-session briefing call is included. We review your industry context, existing AI activity, and key workflows before the session so facilitation is specific, not generic.',
    },
    {
        q: 'What is the group size?',
        a: '6 to 15 participants per session. Smaller groups allow deeper facilitation and more specific outputs. Multiple cohorts can be run in sequence for larger organisations.',
    },
    {
        q: 'Can this be run as a series?',
        a: 'Yes. Two or three sessions across consecutive weeks for organisations wanting deeper engagement or broader leadership coverage.',
    },
];

function StatsRow() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section ref={ref} className="w-full bg-slate-50/40 border-b border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-x-0 md:divide-y-0 md:divide-x divide-slate-200">
                {stats.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.1, ease }}
                        className="flex flex-col items-center justify-center text-center px-6 py-10 md:py-14 hover:bg-white transition-colors"
                    >
                        <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl italic font-medium text-brand-600 mb-3 leading-none">
                            {item.value}
                        </span>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-[200px]">
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function ModulesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <section ref={ref} className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16 items-start">
                    {/* Modules */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                        >
                            <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                                Session structure
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5"
                        >
                            This is not a{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                technology briefing
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-sm md:text-base text-slate-600 leading-relaxed mb-10 max-w-2xl"
                        >
                            The AI Leadership Workshop is a business decision session. Participants leave with a
                            structured view of where AI creates value in their organisation, a prioritised set of
                            starting points, and a clear picture of what responsible adoption looks like for their
                            context.
                        </motion.p>

                        <div className="space-y-4">
                            {modules.map((m, i) => (
                                <motion.div
                                    key={m.num}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
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
                    </div>

                    {/* Sidebar: Who attends + Delivery */}
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="rounded-2xl border border-slate-200 p-7 bg-slate-50/40"
                        >
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">Who attends</h3>
                            <ul className="space-y-3">
                                {whoAttends.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="rounded-2xl border border-slate-200 p-7 bg-white"
                        >
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
                                Delivery options
                            </h3>
                            <div className="divide-y divide-slate-100">
                                {delivery.map((d) => (
                                    <div
                                        key={d.mode}
                                        className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                                    >
                                        <span className="text-sm font-semibold text-slate-900">{d.mode}</span>
                                        <span className="text-xs text-slate-500 text-right">{d.detail}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function LeadershipWorkshopPage() {
    return (
        <main className="bg-slate-50">
            <TrainingHero
                eyebrow="AI Leadership Workshop"
                headingLead="Strategic AI clarity for"
                headingAccent="C-suite and senior executives"
                subtext="A half-day session designed for senior leaders who need to make confident decisions about AI — not absorb technical briefings. Business-first. Outcome-oriented. Facilitated, not presented."
                ctaText="Request a workshop"
                ctaHref="#enquire"
                secondaryCtaText="WhatsApp us"
                secondaryCtaHref="https://wa.me/919999999999?text=I%20want%20to%20book%20an%20AI%20Leadership%20Workshop"
                image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=80"
            />

            <StatsRow />
            <ModulesSection />

            <TrainingForm
                eyebrow="Request a session"
                heading="Book an AI"
                headingAccent="Leadership Workshop"
                subtext="Tell us a bit about your leadership team and we'll tailor facilitation to your context."
                image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
                imageCaption="A decision session, not a briefing."
                programmeLabel="AI Leadership Workshop"
                extraSelect={{
                    label: 'Delivery preference',
                    options: ['In-person', 'Virtual', 'Series (2–3 sessions)'],
                }}
            />

            <FAQSection heading="Frequently asked" headingAccent="questions" faqs={faqs} />
        </main>
    );
}
