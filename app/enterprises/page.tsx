'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { Users, Briefcase, Building2, ArrowRight, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const valuePropCards = [
    {
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&q=80',
        title: 'Pre-trained, Deployment-Ready Talent',
        desc: 'Our graduates arrive with 10 months of hands-on SAP training and apprenticeship experience, not just classroom theory.',
    },
    {
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80',
        title: 'AI-Era Consulting Capability',
        desc: 'Every program integrates AI tools and thinking into the SAP consulting process, so graduates are prepared for what enterprises actually need.',
    },
    {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&q=80',
        title: 'Backed by 25+ Years of Delivery',
        desc: 'Axentia.AI is built on Orane Consulting\'s enterprise SAP legacy, giving us unique credibility and curriculum depth.',
    },
    {
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&q=80',
        title: 'Placement-First by Design',
        desc: 'Our model is structured around outcomes. Every cohort is prepared specifically for enterprise deployment, not generic employability.',
    },
];

const whatWeBring = [
    { icon: <Users className="w-6 h-6" />, text: 'A continuous stream of SAP-trained, AI-ready consultants' },
    { icon: <Cpu className="w-6 h-6" />, text: 'Technology integration across SAP S/4HANA, FICO, MM, SD, ABAP' },
    { icon: <Building2 className="w-6 h-6" />, text: 'Workforce capability aligned to your project delivery model' },
    { icon: <Layers className="w-6 h-6" />, text: 'Talent pipelines designed to scale with your enterprise needs' },
];

const partnershipModels = [
    {
        title: 'Talent Pipeline',
        badge: 'Most Popular',
        desc: 'Access a continuous pipeline of Axentia.AI graduates who are deployment-ready from day one. Work with us to pre-select candidates, define your requirements, and build a reliable inflow of SAP consulting talent.',
        benefits: ['Direct access to graduating cohorts', 'Pre-screening based on your criteria', 'Candidates prepared for your tech stack', 'Ongoing pipeline management'],
    },
    {
        title: 'Apprenticeship Collaborations',
        badge: 'High Impact',
        desc: 'Co-host paid apprenticeship projects from our active cohorts. Apprentices work under your supervision on live or shadow projects — giving you low-cost capacity while they build real experience.',
        benefits: ['6-month paid apprenticeship placements', 'Structured work allocation framework', 'Mentorship from your delivery team', 'First-right-of-offer for graduation hire'],
    },
    {
        title: 'Capability Development',
        badge: 'Enterprise',
        desc: 'Work with Axentia.AI to design and deliver tailored upskilling programs for your existing SAP workforce. Leverage our curriculum depth and Orane\'s delivery expertise to close capability gaps fast.',
        benefits: ['Custom curriculum co-design', 'Delivered by senior SAP practitioners', 'Blended online + workshop formats', 'Progress tracking and outcome reporting'],
    },
];

const impactStats = [
    { end: 100, suffix: '+', label: 'Careers launched through our programs' },
    { end: 95, suffix: '%', label: 'Placement success rate' },
    { end: 4, suffix: '+', label: 'Countries where graduates are working' },
    { end: 30, suffix: '+', label: 'Enterprise hiring partners' },
];

export default function EnterprisesPage() {
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const res = await fetch('/api/enterprise-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', company: '', message: '' });
            } else {
                setStatus('error');
                setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please try again.');
        }
    }

    return (
        <>
            <main>
                {/* Hero */}
                <section className="relative pt-40 pb-24 md:pt-48 md:pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e0735 0%, #2a0845 50%, #1a0630 100%)' }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(192,16,218,0.12) 0%, transparent 60%)' }} />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                            <span className="inline-block px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-semibold mb-6">
                                For Enterprises
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight text-left">
                                Building Capability{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                                    Together
                                </span>
                            </h1>
                            <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-8">
                                Whether you need deployment-ready SAP consultants, apprenticeship collaborations, or capability development programs, Axentia.AI builds the talent infrastructure your enterprise needs.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#contact" className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all duration-200">
                                    Work With Axentia.AI
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="#partnerships" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all">
                                    See Partnership Models
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Why Enterprises Work With Axentia.AI */}
                <section className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-widest mb-3">
                                <span className="inline-block px-2 py-0.5 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>Why Us</span>
                            </motion.p>
                            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                                Why Enterprises Work With Axentia.AI
                            </motion.h2>
                            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl text-slate-600 text-center">
                                We don&apos;t just supply candidates. We build enterprise-ready consultants from the ground up.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {valuePropCards.map((card, idx) => (
                                <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all group">
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 text-left">{card.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed text-left">{card.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Bring to the Ecosystem */}
                <section className="py-20 bg-gradient-to-br from-brand-900 to-brand-700">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-6">
                                    What We Bring to the Ecosystem
                                </h2>
                                <p className="text-base md:text-xl text-brand-100 leading-relaxed mb-8">
                                    Axentia.AI sits at the intersection of talent development, enterprise delivery, and AI-era capability building. When you partner with us, you get access to the entire ecosystem.
                                </p>
                                <ul className="space-y-4">
                                    {whatWeBring.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">{item.icon}</div>
                                            <p className="text-white/80 leading-relaxed">{item.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-10">
                                    <h3 className="text-2xl font-bold text-white mb-6">A Shared Ecosystem</h3>
                                    <p className="text-white/70 leading-relaxed mb-6">
                                        Our enterprise partners aren&apos;t just hiring from us — they&apos;re shaping what the next generation of consultants looks like. From apprenticeship hosting to curriculum input, every collaboration makes the ecosystem stronger.
                                    </p>
                                    <p className="text-white/70 leading-relaxed">
                                        Enterprises that work with Axentia.AI gain influence over the talent pipeline that serves them — not just access to it.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Partnership Models */}
                <section id="partnerships" className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                                Partnership Models
                            </motion.h2>
                            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-xl text-slate-600 text-center">
                                Three ways to work with Axentia.AI, choose the model that fits your enterprise needs.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {partnershipModels.map((model, idx) => (
                                <motion.div key={model.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 120, damping: 20 }} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-slate-900">{model.title}</h3>
                                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-brand-100 text-brand-700 whitespace-nowrap ml-2">{model.badge}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{model.desc}</p>
                                    <ul className="space-y-2 mt-auto">
                                        {model.benefits.map((b) => (
                                            <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                                                <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Talent Pipeline Model — Steps */}
                <section id="talent-pipeline" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">How the Talent Pipeline Works</h2>
                            <p className="text-lg text-slate-600">From training intake to deployment, a structured, transparent model.</p>
                        </motion.div>

                        {/* Desktop: horizontal steps with connecting line */}
                        <div className="hidden md:block relative">
                            {/* Connecting line */}
                            <div className="absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

                            <div className="grid grid-cols-4 gap-8 relative">
                                {[
                                    { step: '01', title: 'Identify Needs', desc: 'Tell us your requirements, module expertise, batch size, timeline.' },
                                    { step: '02', title: 'Train Talent', desc: 'We enroll and train candidates matched to your requirements.' },
                                    { step: '03', title: 'Apprenticeship', desc: 'Candidates complete paid apprenticeship, on real or shadow projects.' },
                                    { step: '04', title: 'Deploy', desc: 'Deployment-ready consultants join your team, credentialled and experienced.' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={item.step}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        {/* Step circle */}
                                        <div className="relative z-10 w-24 h-24 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                                            <span className="text-2xl font-black text-brand-600">{item.step}</span>
                                        </div>
                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile: vertical timeline */}
                        <div className="md:hidden space-y-0">
                            {[
                                { step: '01', title: 'Identify Needs', desc: 'Tell us your requirements, module expertise, batch size, timeline.' },
                                { step: '02', title: 'Train Talent', desc: 'We enroll and train candidates matched to your requirements.' },
                                { step: '03', title: 'Apprenticeship', desc: 'Candidates complete paid apprenticeship — on real or shadow projects.' },
                                { step: '04', title: 'Deploy', desc: 'Deployment-ready consultants join your team, credentialled and experienced.' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-5"
                                >
                                    {/* Timeline */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center shrink-0 shadow-sm">
                                            <span className="text-sm font-black text-brand-600">{item.step}</span>
                                        </div>
                                        {idx < 3 && <div className="w-0.5 flex-1 bg-brand-200 min-h-[32px]" />}
                                    </div>
                                    {/* Content */}
                                    <div className="pb-8">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Impact of Collaboration */}
                <section className="py-24 bg-white border-b border-slate-200">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">The Impact of Collaboration</h2>
                            <p className="text-lg text-slate-600">Numbers that reflect what happens when enterprises and Axentia.AI build together.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {impactStats.map((stat, idx) => (
                                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="text-center">
                                    <p className="text-3xl md:text-4xl font-black text-brand-600 mb-2"><AnimatedCounter end={stat.end} suffix={stat.suffix} /></p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section id="contact" className="py-24 bg-slate-50">
                    <div className="container mx-auto px-4 md:px-6 max-w-2xl">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Work With Axentia.AI</h2>
                            <p className="text-lg text-slate-600">Tell us about your enterprise needs and we&apos;ll set up a conversation with our team.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            {status === 'success' ? (
                                <div className="py-10 text-center">
                                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Inquiry Received!</h3>
                                    <p className="text-slate-500 text-sm">Thanks for reaching out. Our team will be in touch within 1–2 business days.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                        <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={status === 'loading'} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                        <input type="email" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={status === 'loading'} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                                        <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Your company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} disabled={status === 'loading'} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                        <textarea required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 h-32 resize-none" placeholder="What are you looking for?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={status === 'loading'} />
                                    </div>
                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                                    )}
                                    <Button variant="primary" className="w-full" disabled={status === 'loading'}>
                                        {status === 'loading' ? 'Submitting…' : 'Submit Inquiry'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
