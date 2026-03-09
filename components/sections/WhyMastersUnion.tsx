'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

/* ── shared styles ─────────────────────────────────────────────────── */
const glass =
    'bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 flex flex-col hover:bg-white/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]';

const chipBrand =
    'bg-white/40 backdrop-blur-sm text-brand-700 text-xs font-semibold py-2 px-2 text-center rounded-lg border border-brand-200/30 truncate';

const chipAccent =
    'bg-white/40 backdrop-blur-sm text-accent-700 text-xs font-semibold py-2 px-2 text-center rounded-lg border border-accent-200/30 truncate';

/* ── background curves ─────────────────────────────────────────────── */
const curves = [
    { d: 'M-100 250 C 400 350, 1000 150, 1600 300', color: '#d946ef' },
    { d: 'M-100 550 C 500 450, 900 650, 1600 500', color: '#facc15' },
    { d: 'M-100 800 C 300 700, 1100 850, 1600 750', color: '#d946ef' },
];

/* ── fade-in wrapper ───────────────────────────────────────────────── */
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── main component ────────────────────────────────────────────────── */
export function WhyAxentiaAI() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={sectionRef}
            style={{
                backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #fae8ff 25%, #f1f5f9 50%, #fef9c3 75%, #f8fafc 100%)',
            }}
            className="relative py-20 md:py-28 overflow-hidden animate-gradient-loop"
        >
            {/* ── Background decorations ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] bg-brand-400 blur-[100px] rounded-full"
                />
                <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute top-[2%] right-[3%] w-[40%] h-[40%] bg-accent-400 blur-[90px] rounded-full"
                />
                <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-[45%] left-[35%] w-[30%] h-[30%] bg-brand-500 blur-[80px] rounded-full"
                />

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
                    {curves.map((c, i) => (
                        <path key={i} d={c.d} stroke={c.color} fill="none" strokeLinecap="round" strokeWidth={3} opacity={0.15} />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                {/* ── Header ── */}
                <div className="text-center mb-14 md:mb-20">
                    <FadeIn>
                        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">Why Choose Us</p>
                    </FadeIn>
                    <FadeIn delay={0.05}>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                            Why AxentiaAI
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            A data-backed approach to enterprise consulting education, built on 30 years of delivery experience.
                        </p>
                    </FadeIn>
                </div>

                {/* ── Bento Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-min">

                    {/* Card 1 — 500+ Consultants */}
                    <FadeIn className={`${glass} h-full`}>
                        <div className="mb-5">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">500+</h3>
                            <p className="font-semibold text-slate-800">Consultants Trained</p>
                            <p className="text-slate-400 text-sm mt-1">Across Enterprise Projects</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['SAP S/4HANA', 'FICO', 'ABAP', 'MM/SD'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Card 2 — 95% Placement */}
                    <FadeIn className={`${glass} h-full`} delay={0.05}>
                        <div className="mb-5">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">95%</h3>
                            <p className="font-semibold text-slate-800">Placement Rate</p>
                            <p className="text-slate-400 text-sm mt-1">Industry-Leading Outcomes</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['Orane', 'Accenture', 'Deloitte', 'TCS'].map(tag => (
                                <div key={tag} className={chipAccent}>{tag}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Card 3 — 10+ Countries */}
                    <FadeIn className={`${glass} h-full`} delay={0.1}>
                        <div className="mb-5">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">10+</h3>
                            <p className="font-semibold text-slate-800">Countries Served</p>
                            <p className="text-slate-400 text-sm mt-1">Global Delivery Presence</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['India', 'Canada', 'Portugal', 'Kenya'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Card 4 — 30+ Years (tall, with image) */}
                    <FadeIn className={`${glass} lg:row-span-2 overflow-hidden`} delay={0.15}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">30+</h3>
                            <p className="font-semibold text-slate-800">Years of Enterprise Experience</p>
                            <p className="text-slate-400 text-sm mt-1">From Orane Consulting Legacy</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop&q=80"
                            alt="Team collaboration"
                            className="w-full h-36 object-cover rounded-xl mb-4"
                            loading="lazy"
                        />
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['SAP', 'AI/ML', 'Data Analytics', 'ERP', 'Cloud', 'Automation'].map(tag => (
                                <div key={tag} className={`${chipBrand} flex items-center justify-center py-2.5`}>{tag}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Card 5 — CTC (with image) */}
                    <FadeIn className={`${glass} h-full overflow-hidden`} delay={0.2}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">&#8377;6-12 LPA</h3>
                            <p className="font-semibold text-slate-800">Average Starting CTC</p>
                            <p className="text-slate-400 text-sm mt-1">For Daksha Graduates</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&q=80"
                            alt="Career growth"
                            className="w-full h-24 object-cover rounded-xl mt-auto"
                            loading="lazy"
                        />
                    </FadeIn>

                    {/* Card 6 — 30+ Hiring Partners */}
                    <FadeIn className={`${glass} h-full`} delay={0.25}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">30+</h3>
                            <p className="font-semibold text-slate-800">Hiring Partners</p>
                            <p className="text-slate-400 text-sm mt-1">Leading Enterprises Trust Us</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-auto">
                            {['SAP', 'Infosys', 'Wipro', 'HCL', 'Capgemini', 'LTIMindtree', 'EY', 'PwC'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-accent-700 text-[10px] font-semibold py-1.5 px-1 text-center rounded-md border border-accent-200/30 truncate flex items-center justify-center">{tag}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Card 7 — 100+ Enterprise Projects (with image) */}
                    <FadeIn className={`${glass} h-full overflow-hidden`} delay={0.3}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">100+</h3>
                            <p className="font-semibold text-slate-800">Enterprise Projects</p>
                            <p className="text-slate-400 text-sm mt-1">Real-World Delivery</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop&q=80"
                            alt="Enterprise project delivery"
                            className="w-full h-24 object-cover rounded-xl mt-auto"
                            loading="lazy"
                        />
                    </FadeIn>

                    {/* Card 8 — Programs (full width) */}
                    <FadeIn className={`${glass} lg:col-span-4 flex-col md:flex-row items-start md:items-center gap-6 md:gap-10`} delay={0.35}>
                        <div className="shrink-0 md:w-1/4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">6</h3>
                            <p className="font-semibold text-slate-800">Industry-Aligned Programs</p>
                        </div>
                        <div className="flex-1 flex flex-wrap gap-2.5">
                            {['DCAP', 'EAP', 'SAP Consulting', 'Data & AI', 'ERP Analyst', 'Online Foundation', 'Paid Apprenticeship', 'Mentorship Track', 'Certification Prep'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-brand-700 text-sm font-medium py-2 px-4 rounded-full border border-brand-200/30 hover:bg-white/60 transition-colors">{tag}</div>
                            ))}
                        </div>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
}
