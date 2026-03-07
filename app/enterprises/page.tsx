'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Users, Briefcase, GraduationCap, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const benefits = [
    { icon: <Users className="w-7 h-7 text-brand-500" />, title: 'Hire Enterprise-Ready Talent', desc: 'Access consultants trained on real enterprise processes, not just theory.' },
    { icon: <Briefcase className="w-7 h-7 text-brand-500" />, title: 'Corporate Partnerships', desc: 'Co-design training programs aligned with your technology stack and delivery needs.' },
    { icon: <GraduationCap className="w-7 h-7 text-brand-500" />, title: 'Talent Pipeline Model', desc: 'Build a continuous pipeline of deployment-ready consultants for your projects.' },
    { icon: <Building2 className="w-7 h-7 text-brand-500" />, title: 'Custom Enterprise Training', desc: 'Tailored upskilling programs for your existing workforce on SAP, AI, and ERP.' },
];

const caseStudies = [
    { title: 'Global SAP Rollout', client: 'Fortune 500 Manufacturing', result: '40+ consultants deployed across 3 regions in 6 months.' },
    { title: 'ERP Migration Support', client: 'Leading FMCG Company', result: 'Reduced ramp-up time by 60% with pre-trained consultants.' },
    { title: 'AI Integration Project', client: 'Financial Services Firm', result: 'Delivered AI-powered analytics for enterprise reporting.' },
];

export default function EnterprisesPage() {
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

    return (
        <>
            <Navbar />
            <main className="pt-24">
                <section className="py-24 bg-gradient-to-br from-slate-900 to-brand-950">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">For Enterprises</motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-300 max-w-2xl">Hire enterprise-ready consultants, build talent pipelines, and accelerate your digital transformation.</motion.p>
                    </div>
                </section>

                {/* Benefits */}
                <section id="partnerships" className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-16">How We Partner With Enterprises</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((b, idx) => (
                                <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all group">
                                    <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{b.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Talent Pipeline */}
                <section className="py-24 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">Talent Pipeline Model</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            {['Identify Needs', 'Train Talent', 'Apprenticeship', 'Deploy'].map((step, idx) => (
                                <div key={step} className="flex items-center gap-3">
                                    <div className="bg-white border-2 border-brand-200 rounded-2xl px-6 py-4 text-center">
                                        <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-2 text-brand-600 font-bold">{idx + 1}</div>
                                        <p className="font-bold text-slate-900 text-sm">{step}</p>
                                    </div>
                                    {idx < 3 && <ArrowRight className="w-5 h-5 text-brand-300 hidden md:block" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Studies */}
                <section id="case-studies" className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-16">Case Studies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {caseStudies.map((cs, idx) => (
                                <motion.div key={cs.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{cs.title}</h3>
                                    <p className="text-brand-600 text-sm font-medium mb-4">{cs.client}</p>
                                    <p className="text-slate-600 text-sm">{cs.result}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section id="training" className="py-24 bg-slate-50">
                    <div className="container mx-auto px-4 md:px-6 max-w-2xl">
                        <h2 className="text-4xl font-bold text-slate-900 tracking-tight text-center mb-12">Get in Touch</h2>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <div className="space-y-6">
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Name</label><input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Email</label><input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Company</label><input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Message</label><textarea className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 h-32" placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
                                <Button variant="primary" className="w-full">Submit Inquiry</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
