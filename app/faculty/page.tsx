'use client';

import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ecosystemCards = [
    {
        icon: <BookOpen className="w-7 h-7 text-brand-500" />,
        title: 'Program Directors',
        description: 'Senior SAP practitioners who design and oversee the curriculum, ensuring every module reflects real enterprise delivery standards.',
    },
    {
        icon: <Briefcase className="w-7 h-7 text-brand-500" />,
        title: 'Domain Experts',
        description: 'Specialists in SAP MM, FICO, SD, ABAP, and cross-module integration who have led enterprise rollouts across Fortune 500 companies.',
    },
    {
        icon: <Users className="w-7 h-7 text-brand-500" />,
        title: 'Industry Mentors',
        description: 'Practicing consultants from leading firms who provide guidance, code reviews, and career direction during the apprenticeship phase.',
    },
    {
        icon: <Star className="w-7 h-7 text-brand-500" />,
        title: 'Learning Facilitators',
        description: 'Dedicated coaches who track learner progress, run workshops, and bridge the gap between classroom theory and project application.',
    },
];

const leadershipTeam = [
    {
        name: 'To Be Announced',
        role: 'Founder & Director',
        bio: 'With decades of experience leading enterprise SAP implementations across global markets, our founder brings the vision and depth that shapes every program at Axentia.AI.',
        initial: 'A',
    },
    {
        name: 'To Be Announced',
        role: 'Head of Academics',
        bio: 'Responsible for curriculum design and pedagogical excellence, ensuring our programs stay aligned with the evolving demands of the enterprise consulting industry.',
        initial: 'B',
    },
    {
        name: 'To Be Announced',
        role: 'Director of Enterprise Relations',
        bio: 'Builds and maintains our network of hiring partners, apprenticeship hosts, and enterprise collaborators across India and globally.',
        initial: 'C',
    },
    {
        name: 'To Be Announced',
        role: 'Head of Placement',
        bio: 'Leads our placement-first approach — from resume building and mock interviews to direct introductions with enterprise hiring teams.',
        initial: 'D',
    },
];

export default function FacultyPage() {
    return (
        <main className="pt-24">
            {/* Hero */}
            <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e0735 0%, #2a0845 50%, #1a0630 100%)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(192,16,218,0.12) 0%, transparent 60%)' }} />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-semibold mb-6">
                            Faculty & Mentors
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                            Learn From People Who Have{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                                Built Enterprise Systems
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-8">
                            Our faculty aren&apos;t academics. They are practitioners — people who have spent years on the floor of enterprise SAP projects, managing complexity, leading teams, and delivering outcomes at scale.
                        </p>
                        <Link
                            href="/programs"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all duration-200"
                        >
                            Explore Programs
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Faculty Ecosystem */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-semibold uppercase tracking-widest mb-3"
                        >
                            <span className="inline-block px-2 py-0.5 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>
                                The Faculty Ecosystem
                            </span>
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4"
                        >
                            Four roles, one mission
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600"
                        >
                            Every learner is supported by a structured network of experts at each stage of their journey.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ecosystemCards.map((card, idx) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 120, damping: 20 }}
                                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{card.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4"
                        >
                            The leadership team
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="text-lg text-slate-600"
                        >
                            Industry veterans building the next generation of consultants for the AI era.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {leadershipTeam.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 120, damping: 20 }}
                                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-md transition-all"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                                    {member.initial}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                                    <p className="text-brand-600 text-sm font-semibold mb-4">{member.role}</p>
                                    <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* More Than Teachers */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-semibold mb-6">
                            More Than Teachers
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                            We don&apos;t just teach SAP.{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">
                                We build consultants.
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-10">
                            Our faculty understand that a consultant is more than someone who knows the software. They are communicators, problem-solvers, and delivery partners. Every session is designed to build that broader capability — not just technical skill.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/programs"
                                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-brand-600/25 transition-all duration-200"
                            >
                                Explore Programs
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/student-life"
                                className="inline-flex items-center gap-2 border-2 border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-600 font-semibold px-8 py-4 rounded-full transition-all duration-200"
                            >
                                Student Life
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
