'use client';

import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
    { name: 'Charu Tyagi', role: 'SAP SF Consultant — Orane Consulting', quote: 'From HR roles to SAP consulting — Daksha helped me restart my career with confidence and real project skills.' },
    { name: 'Anjali Kaushik', role: 'SAP ABAP Consultant — Orane Consulting', quote: 'As a CS grad, I wanted a career with impact. Daksha made me industry-ready and fast-tracked my entry into SAP consulting.' },
    { name: 'Madhav Jhawar', role: 'SAP MM Consultant — Orane Consulting', quote: 'From learning fundamentals to optimizing business operations — Daksha helped me transform curiosity into consulting skills.' },
    { name: 'Sakshi Patodi', role: 'SAP ABAP Consultant — Orane Consulting', quote: 'Daksha didn\'t just teach me ABAP — it turned me into a professional who can build real solutions for enterprise clients.' },
];

export function Testimonials() {
    const [current, setCurrent] = useState(0);
    const visibleCount = 2;

    const next = () => setCurrent((c) => (c + 1) % testimonials.length);
    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
        visible.push(testimonials[(current + i) % testimonials.length]);
    }

    return (
        <section className="py-24 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="flex items-end justify-between mb-16">
                    <div className="max-w-3xl">
                        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">What Our Learners Say</motion.h2>
                        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 max-w-2xl">We measure our success by the success of our consultants in the field.</motion.p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <button onClick={prev} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-300 transition-colors"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                        <button onClick={next} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-300 transition-colors"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visible.map((t, idx) => (
                        <motion.div
                            key={`${t.name}-${current}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl flex flex-col"
                        >
                            <Quote className="w-8 h-8 text-brand-300 mb-6" />
                            <p className="text-xl text-slate-800 leading-relaxed font-medium mb-8 flex-grow">"{t.quote}"</p>
                            <div className="flex items-center gap-4 border-t border-slate-200 pt-6 mt-auto">
                                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center font-bold text-brand-700">{t.name.charAt(0)}</div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex md:hidden justify-center gap-2 mt-8">
                    <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={next} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center"><ChevronRight className="w-5 h-5" /></button>
                </div>
            </div>
        </section>
    );
}
