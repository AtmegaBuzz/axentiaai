'use client';

import { motion } from 'framer-motion';

const companies = [
    'Orane Consulting', 'SAP', 'Deloitte', 'Accenture', 'TCS', 'Infosys', 'Wipro', 'HCL',
];

export function TrustedBy() {
    return (
        <section className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-8">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest"
                >
                    Trusted by leading enterprises
                </motion.p>
            </div>
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...companies, ...companies].map((company, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center justify-center mx-8 px-8 py-4 bg-white rounded-xl border border-slate-200 shadow-sm min-w-[180px]"
                        >
                            <span className="text-lg font-bold text-slate-400">{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
