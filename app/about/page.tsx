'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Users, Award, Lightbulb, Globe } from 'lucide-react';

const team = [
    { name: 'Manuj Gupta', role: 'Founder & CEO', desc: '30+ years in enterprise consulting. Founded Orane Consulting in 2009.' },
    { name: 'Priya Sharma', role: 'Head of Academics', desc: 'Former SAP Practice Lead with 15+ years of delivery experience.' },
    { name: 'Rajesh Kumar', role: 'Director of Operations', desc: 'Scaled consulting operations across 10+ countries.' },
    { name: 'Anita Verma', role: 'Head of Placements', desc: 'Built talent pipelines for Fortune 500 companies.' },
];

const advisors = [
    { name: 'Dr. Suresh Patel', role: 'Academic Advisor', org: 'IIT Delhi' },
    { name: 'Kavita Mehta', role: 'Industry Advisor', org: 'Former SAP VP' },
    { name: 'Arun Joshi', role: 'Technology Advisor', org: 'AI Research Lead' },
];

const values = [
    { icon: <Target className="w-7 h-7 text-brand-500" />, title: 'Practice Over Theory', desc: 'We believe consulting is learned by doing, not just studying.' },
    { icon: <Heart className="w-7 h-7 text-brand-500" />, title: 'Commitment to Growth', desc: 'Every person who enters Daksha deserves structured, honest mentorship.' },
    { icon: <Lightbulb className="w-7 h-7 text-brand-500" />, title: 'Innovation in Education', desc: 'We bring enterprise-grade practices into the learning environment.' },
    { icon: <Globe className="w-7 h-7 text-brand-500" />, title: 'Global Perspective', desc: 'Our consultants work across India, Canada, Portugal, Kenya and beyond.' },
];

export default function AboutPage() {
    return (
        <>
            <main className="pt-24">
                {/* Our Story */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4">Our Story</motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8">
                                Built by consultants,<br /><span className="text-brand-500">for consultants.</span>
                            </motion.h1>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-lg text-slate-600 space-y-6">
                                <p>AxentiaAI was born from a simple observation: the gap between academic knowledge and enterprise readiness is where most early careers stall.</p>
                                <p>Manuj Gupta founded Orane Consulting in 2009. Over 15 years, the firm grew into a 500+ consultant SAP practice with delivery presence across India, Canada, Portugal, and Kenya. Through this journey, one insight remained constant — structured exposure to real project expectations makes all the difference.</p>
                                <p>Daksha extends the same delivery standards followed inside Orane into a focused training and apprenticeship pathway. We don&apos;t teach theory in isolation — we prepare consultants for the realities of enterprise project delivery.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Mission & Philosophy */}
                <section id="mission" className="py-24 bg-slate-50 border-y border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Our Mission & Philosophy</h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">To bridge the gap between academic learning and enterprise readiness through structured, mentorship-driven apprenticeship programs.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((v, idx) => (
                                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all group">
                                    <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{v.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                <section id="team" className="py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Leadership Team</h2>
                            <p className="text-lg text-slate-600">The people behind the mission.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((person, idx) => (
                                <motion.div key={person.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-brand-700">{person.name.charAt(0)}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                                    <p className="text-brand-600 font-medium text-sm mb-3">{person.role}</p>
                                    <p className="text-slate-500 text-sm">{person.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Advisory Board */}
                <section className="py-24 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Advisory Board</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {advisors.map((a, idx) => (
                                <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
                                    <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent-700">{a.name.charAt(0)}</div>
                                    <h3 className="text-lg font-bold text-slate-900">{a.name}</h3>
                                    <p className="text-brand-600 text-sm font-medium">{a.role}</p>
                                    <p className="text-slate-500 text-xs mt-1">{a.org}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
