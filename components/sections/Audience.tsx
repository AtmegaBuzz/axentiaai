'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BriefcaseBusiness, MapPin, Clock, Check, X } from 'lucide-react';

const targets = [
    {
        title: 'Fresh Graduates',
        desc: 'B.Tech, B.E., BBA, B.Com, BCA, B.Sc, MCA, MBA with 0–2 years experience',
        icon: <GraduationCap className="w-8 h-8 text-brand-600" />,
        color: 'bg-brand-50 border-brand-100',
    },
    {
        title: 'Career Changers',
        desc: 'Finance, HR, Procurement, Operations, Supply Chain with 1–6 years experience',
        icon: <BriefcaseBusiness className="w-8 h-8 text-accent-600" />,
        color: 'bg-accent-50 border-accent-100',
    },
    {
        title: 'Noida-Based',
        desc: 'Able to attend full-time, in-person training at our Noida campus',
        icon: <MapPin className="w-8 h-8 text-emerald-600" />,
        color: 'bg-emerald-50 border-emerald-100',
    },
    {
        title: 'Committed',
        desc: 'Full-time for ~10 months (training + apprenticeship)',
        icon: <Clock className="w-8 h-8 text-amber-600" />,
        color: 'bg-amber-50 border-amber-100',
    },
];

const fits = [
    'See consulting as a long-term profession',
    'Want to build strong fundamentals before chasing designations',
    'Can commit full-time, in-person for 10 months',
    'Are open to structured feedback',
    'Take responsibility for your work',
];

const nonFits = [
    'Are looking for a short-term course',
    'Cannot commit full-time',
    'Prefer flexible or remote learning formats',
    'Expect progression without performance',
];

export function Audience() {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Who It's For
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8"
                    >
                        Who Is This For?
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {targets.map((target, idx) => (
                        <motion.div
                            key={target.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.1 * idx }}
                            className={`p-8 rounded-3xl border transition-all hover:shadow-xl flex flex-col items-center text-center ${target.color}`}
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                {target.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{target.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">{target.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-200">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Is This Right For You?</h3>
                        <p className="text-slate-600 text-lg">We're looking for people who think long-term. Daksha requires focus and commitment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
                            <h4 className="font-bold text-emerald-700 text-lg mb-6 flex items-center gap-2">
                                <Check className="w-6 h-6 text-emerald-500" />
                                You are likely a good fit if you:
                            </h4>
                            <ul className="space-y-4">
                                {fits.map((fit, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        </span>
                                        <span className="text-slate-700 leading-relaxed">{fit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm">
                            <h4 className="font-bold text-rose-700 text-lg mb-6 flex items-center gap-2">
                                <X className="w-6 h-6 text-rose-500" />
                                Daksha may not be suitable if you:
                            </h4>
                            <ul className="space-y-4">
                                {nonFits.map((fit, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <X className="w-4 h-4 text-rose-600" />
                                        </span>
                                        <span className="text-slate-700 leading-relaxed">{fit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
