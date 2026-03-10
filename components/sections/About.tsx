'use client';

import { motion } from 'framer-motion';

export function About() {
    return (
        <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left / Images & Profile */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="relative p-10 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300">
                            <div className="flex gap-6 items-center">
                                <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden shrink-0">
                                    <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 font-medium">Image</div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Manuj Gupta</h3>
                                    <p className="text-brand-600 font-medium">Founder & CEO, Orane Consulting</p>
                                    <p className="text-slate-500 text-sm">Founder, Axentia AI</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col justify-center text-center hover:bg-brand-100 transition-colors">
                                <span className="text-3xl font-bold text-brand-700 block mb-1">30+</span>
                                <span className="text-sm text-brand-600 font-medium">Years</span>
                            </div>
                            <div className="p-6 bg-accent-50 rounded-2xl border border-accent-100 flex flex-col justify-center text-center hover:bg-accent-100 transition-colors">
                                <span className="text-3xl font-bold text-accent-700 block mb-1">500+</span>
                                <span className="text-sm text-accent-600 font-medium">Consultants</span>
                            </div>
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col justify-center text-center hover:bg-amber-100 transition-colors">
                                <span className="text-3xl font-bold text-amber-600 block mb-1">10+</span>
                                <span className="text-sm text-amber-600 font-medium">Countries</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right / Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-2 text-brand-600 font-semibold tracking-wide uppercase text-sm">
                            <span className="w-8 h-px bg-brand-600"></span>
                            Our Legacy
                        </div>

                        <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-snug">
                            “In enterprise consulting, readiness shows in the details — how you document, how you communicate, how you handle responsibility inside a team.”
                        </blockquote>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            Manuj Gupta founded Orane Consulting in 2009. The firm has grown into a 500+ consultant SAP practice with delivery presence across India, Canada, Portugal, and Kenya.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            As the organisation scaled, one insight remained consistent: structured exposure to real project expectations makes the difference in early careers. Daksha extends the same delivery standards we follow inside Orane into a focused training and apprenticeship pathway.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
