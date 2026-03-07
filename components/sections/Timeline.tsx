'use client';

import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Users, Building2, Award } from 'lucide-react';

const steps = [
    { icon: <BookOpen className="w-6 h-6" />, title: 'Foundation', desc: 'Core enterprise processes, SAP fundamentals, documentation and communication skills.' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Apprenticeship', desc: 'Supervised work on real enterprise projects with increasing responsibility.' },
    { icon: <Users className="w-6 h-6" />, title: 'Mentorship', desc: 'One-on-one guidance from senior consultants with 10+ years experience.' },
    { icon: <Building2 className="w-6 h-6" />, title: 'Enterprise Exposure', desc: 'Direct client interaction, cross-module work, and industry-specific scenarios.' },
    { icon: <Award className="w-6 h-6" />, title: 'Certification', desc: 'Industry-recognized certification and deployment readiness assessment.' },
];

export function Timeline() {
    return (
        <section className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        The Journey
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                    >
                        From foundation to certification
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 -translate-x-1/2" />

                    <div className="space-y-16">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.1 * idx }}
                                className={`relative flex items-start gap-8 ${
                                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* Center dot */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-4 border-brand-500 rounded-full flex items-center justify-center text-brand-600 z-10 shadow-lg">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className={`ml-24 md:ml-0 md:w-[42%] bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow ${
                                    idx % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto'
                                }`}>
                                    <div className="inline-block px-3 py-1 bg-brand-50 text-brand-600 font-bold text-xs uppercase tracking-wider rounded-lg mb-3">
                                        Step {idx + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                    <div className="mt-4 w-full h-32 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                                        Image / Video Placeholder
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
