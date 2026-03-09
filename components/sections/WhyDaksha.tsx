'use client';

import { motion } from 'framer-motion';
import { Target, Link as LinkIcon, Sparkles, TrendingUp } from 'lucide-react';

const reasons = [
    {
        title: 'Built by Practicing Consultants',
        description: 'The people teaching here work on SAP projects. They know what new consultants struggle with because they manage them.',
        icon: <Target className="w-8 h-8 text-brand-600" />,
    },
    {
        title: 'Training That Reflects Real Work',
        description: 'You learn how tasks are actually handled, how to document properly, how to respond to feedback, how to work within timelines.',
        icon: <LinkIcon className="w-8 h-8 text-brand-600" />,
    },
    {
        title: 'Focus on Doing the Work Well',
        description: 'You are trained to complete tasks clearly and independently — not just to understand concepts.',
        icon: <Sparkles className="w-8 h-8 text-brand-600" />,
    },
    {
        title: 'Growth Through Responsibility',
        description: 'As you prove you can handle work, you are given more responsibility. That is how consulting careers move forward.',
        icon: <TrendingUp className="w-8 h-8 text-brand-600" />,
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
            className="bg-white py-16 md:py-24"
        >
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                        The first 2–3 years shape everything.
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                        The first few years of your career determine how confident and capable you become. Daksha is designed around those critical early years to build resilience and autonomy.
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
                                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:shadow-lg hover:bg-white transition-colors transition-shadow duration-300 group"
                            >
                                <div className="mb-6 bg-brand-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{reason.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{reason.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
