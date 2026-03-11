'use client';

import { motion } from 'framer-motion';
import { Target, Link as LinkIcon, Sparkles, TrendingUp } from 'lucide-react';

const reasons = [
    {
        title: 'Built by Practicing Consultants',
        description: 'The people teaching here work on SAP projects. They know what new consultants struggle with because they manage them.',
        icon: <Target className="w-8 h-8 text-brand-400" />,
    },
    {
        title: 'Training That Reflects Real Work',
        description: 'You learn how tasks are actually handled, how to document properly, how to respond to feedback, how to work within timelines.',
        icon: <LinkIcon className="w-8 h-8 text-brand-400" />,
    },
    {
        title: 'Focus on Doing the Work Well',
        description: 'You are trained to complete tasks clearly and independently — not just to understand concepts.',
        icon: <Sparkles className="w-8 h-8 text-brand-400" />,
    },
    {
        title: 'Growth Through Responsibility',
        description: 'As you prove you can handle work, you are given more responsibility. That is how consulting careers move forward.',
        icon: <TrendingUp className="w-8 h-8 text-brand-400" />,
    },
];

/* Cards 0,2 slide from left; Cards 1,3 slide from right */
const slideDirections = [
    { x: -120 },
    { x: 120 },
    { x: -120 },
    { x: 120 },
];

export function WhyDaksha() {
    return (
        <section
            id="why-daksha"
            className="py-16 md:py-24 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0118 0%, #130228 50%, #0d011f 100%)' }}
        >
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(164,20,231,0.08) 0%, transparent 70%)' }} />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                <div className="max-w-3xl mb-14">
                    <p className="text-sm font-semibold uppercase tracking-widest text-brand-400 mb-3">Why Daksha Works</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Built by consultants,{' '}
                        <span className="font-cursive italic text-brand-400 text-[1.1em]">for careers.</span>
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                        We train you the way enterprise teams actually work — not how textbooks describe it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((reason, i) => {
                        const dir = slideDirections[i];
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, x: dir.x }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 160,
                                    damping: 22,
                                    delay: i * 0.08,
                                }}
                                className="p-8 rounded-2xl border border-white/10 hover:border-brand-700/50 transition-all duration-300 group"
                                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
                            >
                                <div className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: 'rgba(164,20,231,0.15)', border: '1px solid rgba(164,20,231,0.25)' }}>
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 leading-snug">{reason.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{reason.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
