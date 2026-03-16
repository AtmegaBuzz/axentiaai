'use client';

import { motion } from 'framer-motion';

export function WhyChooseUs() {
    return (
        <section
            id="why-choose-us"
            className="py-16 md:py-24 relative overflow-hidden bg-white"
        >
            {/* Decorative accent stripe at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 via-accent-300 to-brand-400" />

            {/* Subtle warm glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(243,177,95,0.08) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(192,16,218,0.04) 0%, transparent 70%)' }} />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Text */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-4"
                        >
                            Why Choose Us
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight"
                        >
                            Why{' '}
                            <span className="font-cursive italic text-brand-600 text-[1.1em]">Choose US</span>
                            ?
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.14 }}
                            className="space-y-5 text-lg text-slate-600 leading-relaxed"
                        >
                            <p>
                                Many professionals learn SAP, but struggle when they enter real projects.
                            </p>
                            <p className="text-xl font-semibold text-slate-900">
                                Axentia.AI bridges that gap.
                            </p>
                            <p>
                                We prepare SAP consultants for the AI era, ready to contribute from day one.
                            </p>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-3 gap-4 mt-10"
                        >
                            {[
                                { value: '25+', label: 'Years Experience', sub: 'SAP Project Delivery' },
                                { value: '95%', label: 'Placement Rate', sub: 'Industry-Leading' },
                                { value: '500+', label: 'Consultants', sub: 'Trained & Deployed' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-2xl sm:text-3xl font-black text-brand-600">{stat.value}</p>
                                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">{stat.label}</p>
                                    <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">{stat.sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: 2 photos — hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative hidden lg:block"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop&q=80"
                                        alt="SAP consulting classroom"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&q=80"
                                        alt="Enterprise consulting team"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&q=80"
                                        alt="AI era consulting"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                                <span className="text-brand-600 font-black text-sm">AI</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">AI-Era Ready</p>
                                <p className="text-xs text-slate-400">Day 1 contribution</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
