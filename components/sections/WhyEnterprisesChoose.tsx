'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Users, Zap, Clock, Globe2, Server, Award } from 'lucide-react';

const items = [
    { icon: Server, label: 'Runs in live environments', number: '100%', sub: 'Production-grade' },
    { icon: Users, label: 'Owned by your teams', number: '100%', sub: 'Internal ownership' },
    { icon: Zap, label: 'Used in everyday work', number: '10x', sub: 'Faster adoption' },
    { icon: Clock, label: 'Sustained over time', number: '16+', sub: 'Years of delivery' },
    { icon: Globe2, label: 'S/4HANA delivery across industries', number: '50+', sub: 'Enterprises' },
    { icon: Shield, label: 'Deep SuccessFactors expertise', number: '300+', sub: 'Consultants' },
    { icon: Award, label: 'Active global presence', number: '4', sub: 'Regions' },
];

export function WhyEnterprisesChoose() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <section ref={ref} className="relative overflow-hidden py-20 md:py-28 bg-slate-900">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Brand accent glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">

                {/* Header */}
                <div className="max-w-2xl mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-5 text-accent-300 border border-accent-300/20 bg-accent-300/8"
                    >
                        Key Differentiators
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        className="font-black text-white tracking-tight leading-[1.05] mb-5"
                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)' }}
                    >
                        Why enterprises choose{' '}
                        <span className="bg-gradient-to-r from-brand-400 to-accent-300 bg-clip-text text-transparent">
                            Axentia.AI
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-slate-400 leading-relaxed max-w-lg"
                    >
                        Built to last — AI that runs in live environments, owned by your teams, and sustained over time.
                    </motion.p>
                </div>

                {/* Differentiator grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, type: 'spring', stiffness: 120, damping: 18 }}
                                className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm p-5 md:p-6 flex flex-col hover:bg-white/[0.07] transition-colors duration-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-9 h-9 bg-brand-500/15 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-brand-400" strokeWidth={2} />
                                    </div>
                                    <span className="text-2xl font-black text-white tracking-tight">
                                        {item.number}
                                    </span>
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-accent-300 mb-2">
                                    {item.sub}
                                </span>
                                <p className="text-xs text-slate-400 leading-relaxed mt-auto">
                                    {item.label}
                                </p>
                            </motion.div>
                        );
                    })}

                    {/* CTA cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: items.length * 0.05, type: 'spring', stiffness: 120, damping: 18 }}
                        className="bg-brand-600 p-6 md:p-8 flex flex-col justify-center items-center text-center"
                    >
                        <p className="text-white font-bold text-lg mb-3">Ready to start?</p>
                        <a
                            href="/programs#apply"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-bold px-5 py-2.5 hover:bg-slate-100 transition-colors"
                        >
                            Schedule Consultation
                        </a>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
