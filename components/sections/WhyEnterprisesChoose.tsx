'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function WhyEnterprisesChoose() {
    return (
        <section className="bg-white py-20 md:py-28 border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">

                {/* ── Top: heading left, image right ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 md:mb-16">

                    {/* Left: heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    >
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A29AC] mb-5">
                            Key Differentiators
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
                            Why enterprises choose{' '}
                            <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                Axentia.AI
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 leading-relaxed pl-5 border-l-2 border-[#8A29AC]/30">
                            Built to last — AI that runs in live environments, owned by your teams, and sustained over time.
                        </p>
                    </motion.div>

                    {/* Right: image — contained, rounded */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.12 }}
                        className="relative h-[240px] md:h-[300px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/images/teamwork.png"
                            alt="Enterprise teamwork"
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                </div>

                {/* ── Bottom: 3-col differentiator grid — dark outline only ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="border border-slate-800 rounded-2xl overflow-hidden"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">

                        {/* Col 1: What sets this apart */}
                        <div className="px-8 lg:px-10 py-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A29AC] mb-6">
                                What sets this apart
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Runs in live environments',
                                    'Owned by your teams',
                                    'Used in everyday work',
                                    'Sustained over time',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A29AC] shrink-0 mt-[7px]" />
                                        <span className="text-slate-800 text-sm font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 2: Execution credibility */}
                        <div className="px-8 lg:px-10 py-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A29AC] mb-6">
                                Execution credibility
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'S/4HANA delivery across industries',
                                    'Deep SuccessFactors expertise',
                                    'Active global presence',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A29AC] shrink-0 mt-[7px]" />
                                        <span className="text-slate-800 text-sm font-medium leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Col 3: Backed by Orane */}
                        <div className="px-8 lg:px-10 py-10 flex flex-col justify-between gap-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A29AC] mb-6">
                                    Backed by
                                </p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight mb-1">Orane</p>
                                <p className="text-slate-500 text-sm">SAP Gold Partner</p>
                            </div>
                            <div className="inline-flex items-center gap-2.5 border border-slate-800 rounded-lg px-4 py-2.5 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                <span className="text-slate-800 text-xs font-semibold">SAP Gold Partner · 16+ Years</span>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
