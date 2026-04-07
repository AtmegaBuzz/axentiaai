'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Shield, Users, Zap, Clock, Globe2, Server, Award } from 'lucide-react';
import { ContactModal } from '@/components/ContactModal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const items = [
    { icon: Server, label: 'Runs in live environments', end: 100, suffix: '%', sub: 'Production-grade', duration: 1800 },
    { icon: Users, label: 'Owned by your teams', end: 100, suffix: '%', sub: 'Internal ownership', duration: 2200 },
    { icon: Zap, label: 'Used in everyday work', end: 10, suffix: 'x', sub: 'Faster adoption', duration: 1400 },
    { icon: Clock, label: 'Sustained over time', end: 16, suffix: '+', sub: 'Years of delivery', duration: 1600 },
    { icon: Globe2, label: 'S/4HANA delivery across industries', end: 50, suffix: '+', sub: 'Enterprises', duration: 2000 },
    { icon: Shield, label: 'Deep SuccessFactors expertise', end: 300, suffix: '+', sub: 'Consultants', duration: 2400 },
    { icon: Award, label: 'Active global presence', end: 4, suffix: '', sub: 'Regions', duration: 1200 },
];

export function WhyEnterprisesChoose() {
    const ref = useRef<HTMLDivElement>(null);
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <section ref={ref} className="relative overflow-hidden py-20 md:py-28 bg-[#f8f6fb]">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)',
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
                        className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-5 text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8"
                    >
                        Key Differentiators
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5"
                    >
                        Why enterprises choose{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent pl-[4px]">
                            Axentia.AI
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl"
                    >
                        Built to last AI that runs in live environments, owned by your teams, and sustained over time.
                    </motion.p>
                </div>

                {/* Differentiator grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, type: 'spring', stiffness: 120, damping: 18 }}
                                className="group relative rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden border border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(138,41,172,0.1)] hover:border-[#8A29AC]/20 transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                }}
                            >
                                {/* Subtle gradient shimmer on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(138,41,172,0.03) 0%, rgba(192,16,218,0.05) 50%, transparent 100%)',
                                    }}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#8A29AC]/10 to-[#C010DA]/10 border border-[#8A29AC]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                            <Icon className="w-5 h-5 text-[#8A29AC]" strokeWidth={1.8} />
                                        </div>
                                    </div>
                                    <AnimatedCounter
                                        end={item.end}
                                        suffix={item.suffix}
                                        duration={item.duration}
                                        className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none"
                                    />
                                    <div className="w-8 h-[2px] bg-gradient-to-r from-[#8A29AC] to-[#C010DA] rounded-full mt-4 mb-3" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A29AC]">
                                        {item.sub}
                                    </span>
                                    <p className="text-sm text-slate-500 leading-relaxed mt-1.5">
                                        {item.label}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* CTA cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: items.length * 0.05, type: 'spring', stiffness: 120, damping: 18 }}
                        className="rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center border border-white/20 overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #8A29AC 0%, #C010DA 100%)',
                        }}
                    >
                        <p className="text-white font-bold text-lg mb-4">Ready to start?</p>
                        <button
                            type="button"
                            onClick={() => setContactOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-bold px-6 py-3 cursor-pointer shadow-lg hover:bg-white transition-colors duration-200"
                        >
                            Schedule Consultation
                        </button>
                    </motion.div>
                </div>

            </div>
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                defaultMessage="I would like to book a consultation."
            />
        </section>
    );
}
