'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        q: 'How do careers progress after Daksha?',
        a: 'After completing the foundation and apprenticeship, participants typically move into Associate Consultant roles within Axentia or partner delivery environments. Growth depends on performance. As responsibility increases, roles expand from task support to process ownership and eventually to client-facing leadership.',
    },
    {
        q: 'Can I do this part-time or remotely?',
        a: 'No. The foundation phase is full-time and in person in Noida. The apprenticeship also requires consistent availability. The structure depends on daily engagement and supervision.',
    },
    {
        q: 'What if I\u2019m not selected for EAP?',
        a: 'EAP is performance-based. If not selected, you continue progressing through standard consulting roles based on your demonstrated capability. EAP is an acceleration track, not the only path forward.',
    },
    {
        q: 'What\u2019s the selection process?',
        a: 'The process includes an application review, assessment, and structured interview. We evaluate basic aptitude, communication clarity, and long-term intent toward consulting. Final selection is based on readiness and commitment.',
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 md:py-24 bg-brand-50 relative border-t border-brand-100">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <div
                        className="flex items-center justify-center gap-2 text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Questions
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                    >
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-brand-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <button
                                className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            >
                                <span className={`font-bold text-lg md:text-xl transition-colors ${openIndex === idx ? 'text-brand-600' : 'text-slate-900'}`}>{faq.q}</span>
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
