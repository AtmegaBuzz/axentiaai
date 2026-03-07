'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

const programs = [
    {
        title: 'DCAP',
        subtitle: 'Daksha Career Accelerator Program',
        badge: 'Most Popular',
        badgeColor: 'bg-brand-100 text-brand-700',
        type: 'Basic',
        desc: 'A 10-month structured pathway.',
        timeline: ['4 months full-time classroom learning in Noida', '6–8 months paid apprenticeship'],
        learnList: ['Enterprise process flows (P2P, O2C, R2R, H2R)', 'SAP S/4HANA core modules (MM, FICO, SD)', 'Basic configuration and testing', 'Clear documentation practices'],
        meta: '4 months classroom + apprenticeship',
        activeHighlight: true,
    },
    {
        title: 'EAP',
        subtitle: 'Enterprise Acceleration Program',
        badge: 'Advanced',
        badgeColor: 'bg-slate-100 text-slate-700',
        type: 'Professional',
        desc: 'For participants who complete DCAP.',
        timeline: [],
        learnList: ['Cross-module integration', 'Industry-specific scenarios', 'Presales and estimation support', 'AI use cases within enterprise projects'],
        meta: 'Selection is based on performance during DCAP.',
        activeHighlight: false,
    },
    {
        title: 'Online Program',
        subtitle: 'Online Foundation',
        badge: 'Upcoming',
        badgeColor: 'bg-accent-100 text-accent-700',
        type: 'Explore',
        desc: 'For those who want to begin with the basics',
        timeline: [],
        learnList: ['SAP fundamentals', 'Enterprise process understanding', 'Introductory structured modules'],
        meta: 'No apprenticeship included',
        activeHighlight: false,
    },
    {
        title: 'SAP Consulting',
        subtitle: 'SAP Consulting Apprenticeship',
        badge: 'New',
        badgeColor: 'bg-brand-100 text-brand-700',
        type: 'Apprenticeship',
        desc: 'Hands-on SAP consulting with enterprise clients.',
        timeline: [],
        learnList: ['End-to-end SAP implementation', 'Client communication', 'Configuration & testing', 'Go-live support'],
        meta: '6 months hands-on',
        activeHighlight: false,
    },
    {
        title: 'Data & AI',
        subtitle: 'Data & AI for Enterprise',
        badge: 'New',
        badgeColor: 'bg-accent-100 text-accent-700',
        type: 'Specialized',
        desc: 'AI and data analytics for enterprise systems.',
        timeline: [],
        learnList: ['Enterprise data architecture', 'AI/ML for business processes', 'Predictive analytics', 'SAP BTP & AI integration'],
        meta: '4 months intensive',
        activeHighlight: false,
    },
    {
        title: 'ERP Analyst',
        subtitle: 'ERP Business Analyst Track',
        badge: 'New',
        badgeColor: 'bg-brand-100 text-brand-700',
        type: 'Analyst',
        desc: 'Business analysis for ERP implementations.',
        timeline: [],
        learnList: ['Requirements gathering', 'Process mapping', 'Gap analysis', 'Solution design documentation'],
        meta: '5 months program',
        activeHighlight: false,
    },
];

export function Programs() {
    return (
        <section id="programs" className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4">Programs</motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Choose your path.</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-slate-600">Six programs designed for different stages of your consulting career.</motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {programs.map((prog, idx) => (
                        <motion.div
                            key={prog.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.05 * idx }}
                            className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col h-full ${prog.activeHighlight ? 'border-brand-500 shadow-xl z-10' : 'border-slate-200 shadow-sm hover:border-brand-200'}`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${prog.badgeColor}`}>{prog.badge}</span>
                                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{prog.type}</span>
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{prog.title}</h3>
                            <p className="text-brand-600 font-semibold mb-4">{prog.subtitle}</p>
                            <p className="text-slate-600 text-sm mb-6 pb-6 border-b border-slate-100">{prog.desc}</p>
                            {prog.timeline.length > 0 && (
                                <div className="mb-6 space-y-2">
                                    {prog.timeline.map((item, i) => (
                                        <p key={i} className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg">{item}</p>
                                    ))}
                                </div>
                            )}
                            <div className="mb-8 flex-grow">
                                <h4 className="text-sm font-bold text-slate-900 mb-4">{prog.timeline.length > 0 ? 'You learn:' : 'You work on:'}</h4>
                                <ul className="space-y-3">
                                    {prog.learnList.map((item, i) => (
                                        <li key={i} className="flex flex-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 shrink-0 ${prog.activeHighlight ? 'text-brand-500' : 'text-slate-400'}`} />
                                            <span className="text-sm text-slate-600 leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-xs font-medium text-slate-500 max-w-[50%]">{prog.meta}</p>
                                <Button variant={prog.activeHighlight ? 'primary' : 'outline'} size="sm" className="gap-2"
                                    onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Enroll Now <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
