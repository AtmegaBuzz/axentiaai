'use client';

import { motion } from 'framer-motion';

export function StatementBanner() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto rounded-3xl p-10 md:p-14 lg:p-16 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #faf5ff 0%, #fce8f5 35%, #fef8ec 70%, #fef8ec 100%)',
                        maxWidth: '90%',
                    }}
                >
                    {/* Subtle border overlay */}
                    <div className="absolute inset-0 rounded-3xl border border-purple-100 pointer-events-none" />

                    {/* Decorative glow blobs */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(192,16,218,0.12)' }} />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(243,177,95,0.15)' }} />

                    <div className="relative z-10 grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start">

                        {/* Left — accent line + stat */}
                        <div className="flex flex-col gap-3 md:pt-1">
                            <div className="w-10 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #8929AC, #F3B15F)' }} />
                            <p className="text-6xl md:text-7xl font-black leading-none tracking-tighter text-slate-900">
                                2–3
                            </p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                years that define you
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block absolute left-[168px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent" />

                        {/* Right — statement copy */}
                        <div className="md:pl-8">
                            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-4">
                                The first few years of your career determine how confident and capable you become.
                            </p>
                            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                Axentia.AI is designed around those critical early years — to build the resilience, judgment, and autonomy that no short course can give you.
                            </p>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
