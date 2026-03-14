'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe, Award, Briefcase, Linkedin } from 'lucide-react';

const stats = [
    { value: '95%', label: 'Placement Rate' },
    { value: '500+', label: 'Alumni Working' },
    { value: '₹6-12L', label: 'Average Starting CTC' },
    { value: '30+', label: 'Hiring Partners' },
];

const roles = [
    'SAP Consultant', 'ABAP Developer', 'SAP FICO Analyst', 'SAP MM Consultant',
    'Business Analyst', 'Data Analyst', 'ERP Consultant', 'Solution Architect',
];

const journeys = [
    { name: 'Charu T.', from: 'HR Professional', to: 'SAP SF Consultant', time: '10 months' },
    { name: 'Anjali K.', from: 'CS Graduate', to: 'SAP ABAP Consultant', time: '8 months' },
    { name: 'Madhav J.', from: 'Fresh Graduate', to: 'SAP MM Consultant', time: '12 months' },
    { name: 'Sakshi P.', from: 'BCA Graduate', to: 'SAP ABAP Consultant', time: '10 months' },
];

const projects = [
    'SAP S/4HANA Implementation for Manufacturing Client',
    'ERP Migration for FMCG Enterprise',
    'Finance Module Configuration for Banking Client',
    'Supply Chain Optimization Dashboard',
    'HR Process Automation with SAP SuccessFactors',
    'Cross-Module Integration Testing',
];

export default function OutcomesPage() {
    return (
        <>
            <main className="pt-24">
                <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-brand-950">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">Outcomes</motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base md:text-xl text-slate-300 max-w-2xl">Real results from real consultants. Here&apos;s what our alumni achieve.</motion.p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 md:py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                            {stats.map((s, idx) => (
                                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="text-center">
                                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-500 mb-3">{s.value}</div>
                                    <p className="text-slate-600 font-medium text-lg">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Alumni Roles */}
                <section className="py-24 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">Alumni Roles</h2>
                        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                            {roles.map((role) => (
                                <span key={role} className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-brand-300 hover:text-brand-600 transition-colors">{role}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Student Journeys */}
                <section className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight text-center mb-16">Student Journeys</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {journeys.map((j, idx) => (
                                <motion.div key={j.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
                                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-brand-700">{j.name.charAt(0)}</div>
                                    <h3 className="font-bold text-slate-900 mb-2">{j.name}</h3>
                                    <p className="text-sm text-slate-500 mb-1">{j.from} →</p>
                                    <p className="text-brand-600 font-semibold mb-2">{j.to}</p>
                                    <p className="text-xs text-slate-400">in {j.time}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* LinkedIn Success */}
                <section className="py-24 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <Linkedin className="w-12 h-12 text-brand-500 mx-auto mb-6" />
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">LinkedIn Success Stories</h2>
                        <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">Our alumni regularly share their career transformations on LinkedIn. Follow #DakshaAlumni to see their stories.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 h-48 flex items-center justify-center text-slate-400">LinkedIn Post Placeholder {i}</div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industry Projects */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">Industry Project Showcase</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {projects.map((p) => (
                                <div key={p} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-start gap-3">
                                    <Briefcase className="w-5 h-5 text-brand-500 shrink-0 mt-1" />
                                    <span className="text-slate-700 font-medium">{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
