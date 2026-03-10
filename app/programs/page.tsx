'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, BookOpen, Briefcase, Users, Building2, Award, ArrowRight } from 'lucide-react';

const programs = [
    {
        id: 'sap',
        title: 'SAP Consulting Apprenticeship',
        duration: '10 months',
        fee: 'Contact for details',
        overview: 'End-to-end SAP consulting training from fundamentals to client delivery.',
        curriculum: ['SAP S/4HANA Core Modules (MM, FICO, SD)', 'Enterprise Process Flows', 'Configuration & Testing', 'Documentation & Communication', 'Client Interaction Skills'],
        tools: ['SAP S/4HANA', 'SAP Fiori', 'SAP BTP', 'JIRA', 'Confluence'],
        outcomes: ['Associate Consultant role', 'SAP certification readiness', 'Enterprise project experience'],
    },
    {
        id: 'ai',
        title: 'Data & AI for Enterprise',
        duration: '4 months',
        fee: 'Contact for details',
        overview: 'AI and data analytics applied to enterprise business processes and ERP systems.',
        curriculum: ['Enterprise Data Architecture', 'AI/ML for Business Processes', 'Predictive Analytics', 'SAP BTP & AI Integration', 'Data Visualization'],
        tools: ['Python', 'SAP BTP', 'Power BI', 'TensorFlow', 'SQL'],
        outcomes: ['Data Analyst / AI Consultant role', 'Enterprise AI project portfolio', 'Industry certification'],
    },
    {
        id: 'erp',
        title: 'ERP Business Analyst Track',
        duration: '5 months',
        fee: 'Contact for details',
        overview: 'Business analysis skills for ERP implementations and digital transformation projects.',
        curriculum: ['Requirements Gathering & Analysis', 'Process Mapping & Documentation', 'Gap Analysis & Solution Design', 'UAT Planning & Execution', 'Stakeholder Management'],
        tools: ['Visio', 'JIRA', 'Confluence', 'SAP', 'Excel Advanced'],
        outcomes: ['Business Analyst role', 'ERP implementation experience', 'Professional certification'],
    },
];

const steps = [
    { icon: <BookOpen className="w-6 h-6" />, title: 'Foundation', desc: 'Core skills and knowledge building' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Apprenticeship', desc: 'Supervised project work' },
    { icon: <Users className="w-6 h-6" />, title: 'Mentorship', desc: 'Senior consultant guidance' },
    { icon: <Building2 className="w-6 h-6" />, title: 'Enterprise Exposure', desc: 'Real client projects' },
    { icon: <Award className="w-6 h-6" />, title: 'Certification', desc: 'Industry recognition' },
];

const whoShouldApply = [
    'Fresh graduates (B.Tech, BBA, B.Com, BCA, MCA, MBA)',
    'Career changers from Finance, HR, Operations',
    'Professionals with 0-6 years experience seeking consulting careers',
    'Anyone committed to 4-10 months of full-time, in-person training',
];

export default function ProgramsPage() {
    return (
        <>
            <main className="pt-24">
                {/* Header */}
                <section className="py-24 bg-gradient-to-br from-slate-900 to-brand-950">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">Our Programs</motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-300 max-w-2xl">Industry-aligned training designed to make you enterprise-ready from day one.</motion.p>
                    </div>
                </section>

                {/* Program Cards */}
                {programs.map((prog, idx) => (
                    <section key={prog.id} id={prog.id} className={`py-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-200`}>
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="max-w-5xl mx-auto">
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">{prog.title}</h2>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <span className="px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-semibold">Duration: {prog.duration}</span>
                                        <span className="px-4 py-1.5 bg-accent-50 text-accent-700 rounded-full text-sm font-semibold">Fee: {prog.fee}</span>
                                    </div>
                                    <p className="text-lg text-slate-600 mb-12">{prog.overview}</p>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                        <h3 className="font-bold text-slate-900 mb-4">Curriculum</h3>
                                        <ul className="space-y-3">
                                            {prog.curriculum.map((item, i) => (
                                                <li key={i} className="flex gap-3 items-start">
                                                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                                                    <span className="text-sm text-slate-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                        <h3 className="font-bold text-slate-900 mb-4">Tools & Technologies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {prog.tools.map((tool, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">{tool}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                        <h3 className="font-bold text-slate-900 mb-4">Outcomes</h3>
                                        <ul className="space-y-3">
                                            {prog.outcomes.map((item, i) => (
                                                <li key={i} className="flex gap-3 items-start">
                                                    <Award className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                                                    <span className="text-sm text-slate-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* How It Works */}
                <section className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-16">How It Works</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            {steps.map((step, idx) => (
                                <div key={step.title} className="flex items-center gap-3">
                                    <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-6 text-center min-w-[150px]">
                                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-600">{step.icon}</div>
                                        <p className="font-bold text-slate-900">{step.title}</p>
                                        <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                                    </div>
                                    {idx < steps.length - 1 && <ArrowRight className="w-5 h-5 text-brand-300 hidden md:block" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who Should Apply */}
                <section className="py-24 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">Who Should Apply</h2>
                        <ul className="space-y-4">
                            {whoShouldApply.map((item, i) => (
                                <li key={i} className="flex gap-4 items-center bg-white p-6 rounded-2xl border border-slate-200">
                                    <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
                                    <span className="text-lg text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Apply CTA */}
                <section className="py-24 bg-brand-600">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">Ready to start your consulting career?</h2>
                        <p className="text-xl text-brand-100 mb-10 max-w-xl mx-auto">Apply now and take the first step toward becoming an enterprise-ready consultant.</p>
                        <Button size="lg" className="bg-white text-brand-700 hover:bg-slate-100 font-bold shadow-lg">Apply Now</Button>
                    </div>
                </section>
            </main>
        </>
    );
}
