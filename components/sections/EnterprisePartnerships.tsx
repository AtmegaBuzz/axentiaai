'use client';

import { motion } from 'framer-motion';
import { Handshake, Users, TrendingUp, Award } from 'lucide-react';

const benefits = [
    { icon: <Handshake className="w-7 h-7 text-brand-500" />, title: 'Co-Designed Curriculum', desc: 'Programs built with enterprise partners to match real project needs.' },
    { icon: <Users className="w-7 h-7 text-brand-500" />, title: 'Talent Pipeline', desc: 'Direct access to trained, deployment-ready consultants.' },
    { icon: <TrendingUp className="w-7 h-7 text-brand-500" />, title: 'Reduced Ramp-Up', desc: 'Consultants arrive with hands-on project experience from day one.' },
    { icon: <Award className="w-7 h-7 text-brand-500" />, title: 'Quality Assurance', desc: 'Performance-tracked apprenticeship ensures consistent quality.' },
];

export function EnterprisePartnerships() {
    return (
        <section id="enterprises" className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Enterprise Partnerships
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6"
                    >
                        Powering enterprise talent together
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((b, idx) => (
                        <motion.div
                            key={b.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {b.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
