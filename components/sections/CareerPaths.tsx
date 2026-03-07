'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stages = [
    { role: 'Trainee', time: '0–4 months', color: 'bg-brand-100 text-brand-700 border-brand-200' },
    { role: 'Apprentice', time: '4–10 months', color: 'bg-brand-200 text-brand-800 border-brand-300' },
    { role: 'Associate', time: 'Year 1–2', color: 'bg-brand-300 text-brand-900 border-brand-400' },
    { role: 'Consultant', time: 'Year 2–4', color: 'bg-brand-500 text-white border-brand-600' },
    { role: 'Senior / Lead', time: 'Year 4+', color: 'bg-brand-700 text-white border-brand-800' },
];

export function CareerPaths() {
    return (
        <section className="py-24 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Career Progression
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                    >
                        Your journey from Day 1 to Leadership
                    </motion.h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
                    {stages.map((stage, idx) => (
                        <motion.div
                            key={stage.role}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="flex items-center gap-2"
                        >
                            <div className={`px-6 py-4 rounded-2xl border-2 text-center min-w-[140px] ${stage.color}`}>
                                <p className="font-bold text-lg">{stage.role}</p>
                                <p className="text-xs opacity-80 mt-1">{stage.time}</p>
                            </div>
                            {idx < stages.length - 1 && (
                                <ArrowRight className="w-5 h-5 text-brand-300 hidden md:block" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
