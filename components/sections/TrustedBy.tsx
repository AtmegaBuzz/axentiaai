'use client';

import { motion } from 'framer-motion';

const companies = [
    'Orane Consulting', 'SAP', 'Deloitte', 'Accenture', 'TCS', 'Infosys', 'Wipro', 'HCL',
    'Capgemini', 'Cognizant', 'Tech Mahindra', 'IBM', 'EY', 'KPMG', 'PwC', 'LTIMindtree',
];

export function TrustedBy() {
    return (
        <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
            {/* Ramp-style headline */}
            <div className="container mx-auto px-4 md:px-8 mb-8">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-base md:text-lg text-slate-500 font-medium"
                >
                    500+ consultants trained across leading enterprises worldwide.
                </motion.p>
            </div>

            {/* Scrolling logo marquee */}
            <div className="relative">
                {/* Edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee">
                    {[...companies, ...companies, ...companies].map((company, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center justify-center mx-6 h-10 px-2 opacity-40 hover:opacity-100 transition-opacity duration-200"
                        >
                            <span className="text-lg font-bold text-slate-800 whitespace-nowrap tracking-tight">{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
