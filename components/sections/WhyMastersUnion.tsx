'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

/* ── shared styles ─────────────────────────────────────────────────── */
const glass =
    'bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 flex flex-col hover:bg-white/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]';

const chipBrand =
    'bg-white/40 backdrop-blur-sm text-brand-700 text-xs font-semibold py-2 px-1 text-center rounded-lg border border-brand-200/30 truncate';

const chipAccent =
    'bg-white/40 backdrop-blur-sm text-accent-700 text-xs font-semibold py-2 px-1 text-center rounded-lg border border-accent-200/30 truncate';

/* ── 3 curves, evenly spaced vertically across the 900-unit viewBox ── */
interface CurveDef {
    d: string;
    color: 'brand' | 'accent';
    startAt: number;
    peakAt: number;
}

const curves: CurveDef[] = [
    { d: 'M-100 250 C 400 350, 1000 150, 1600 300', color: 'brand', startAt: 0.1, peakAt: 0.5 },
    { d: 'M-100 550 C 500 450, 900 650, 1600 500', color: 'accent', startAt: 0.2, peakAt: 0.6 },
    { d: 'M-100 800 C 300 700, 1100 850, 1600 750', color: 'brand', startAt: 0.3, peakAt: 0.8 },
];

// Static curve spanning full width
function AnimatedCurve({
    curve,
}: {
    curve: CurveDef;
}) {
    const mainColor = curve.color === 'brand' ? '#d946ef' : '#facc15';

    return (
        <path
            d={curve.d}
            stroke={mainColor}
            fill="none"
            strokeLinecap="round"
            strokeWidth={3}
            opacity={0.15}
        />
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
            className="relative py-20 overflow-hidden animate-gradient-loop"
        >
            {/* ── Decorative Background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Colour glows looping */}
                <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[10%] -left-[5%] w-[50%] h-[50%] bg-brand-400 blur-[100px] rounded-full"
                />
                <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[2%] right-[3%] w-[40%] h-[40%] bg-accent-400 blur-[90px] rounded-full"
                />
                <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[45%] left-[35%] w-[30%] h-[30%] bg-brand-500 blur-[80px] rounded-full"
                />

                {/* 3 static curves */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
                    {curves.map((curve, i) => (
                        <AnimatedCurve key={i} curve={curve} />
                    ))}
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
                    >
                        Why AxentiaAI
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg"
                    >
                        A data-backed approach to enterprise consulting education.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-min">

                    <div className={`${glass} h-full`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">500+</h3>
                            <p className="font-semibold text-slate-800">Consultants Trained</p>
                            <p className="text-slate-500 text-sm">Across Enterprise Projects</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['SAP S/4HANA', 'FICO', 'ABAP', 'MM/SD'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className={`${glass} h-full`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">95%</h3>
                            <p className="font-semibold text-slate-800">Placement Rate</p>
                            <p className="text-slate-500 text-sm">Industry-Leading Outcomes</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['Orane', 'Accenture', 'Deloitte', 'TCS'].map(tag => (
                                <div key={tag} className={chipAccent}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className={`${glass} h-full`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">10+</h3>
                            <p className="font-semibold text-slate-800">Countries Served</p>
                            <p className="text-slate-500 text-sm">Global Delivery Presence</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['India', 'Canada', 'Portugal', 'Kenya'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className={`${glass} lg:row-span-2`}>
                        <div className="mb-6">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">30+</h3>
                            <p className="font-semibold text-slate-800">Years of Enterprise Experience</p>
                            <p className="text-slate-500 text-sm">From Orane Consulting Legacy</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            {['SAP', 'AI/ML', 'Data Analytics', 'ERP', 'Cloud', 'Automation'].map(tag => (
                                <div key={tag} className={`${chipBrand} flex items-center justify-center h-16 py-3 px-2`}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className={`${glass} justify-center h-full`}>
                        <div>
                            <h3 className="text-4xl font-black text-slate-900 mb-1">&#8377;6-12 LPA</h3>
                            <p className="font-semibold text-slate-800">Average Starting CTC</p>
                            <p className="text-slate-500 text-sm">For Daksha Graduates</p>
                        </div>
                    </div>

                    <div className={`${glass} h-full`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">30+</h3>
                            <p className="font-semibold text-slate-800">Hiring Partners</p>
                            <p className="text-slate-500 text-sm">Leading Enterprises Trust Us</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-auto">
                            {['SAP', 'Infosys', 'Wipro', 'HCL', 'Capgemini', 'LTIMindtree', 'EY', 'PwC'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-accent-700 text-[10px] font-semibold py-1.5 px-1 text-center rounded-md border border-accent-200/30 truncate flex items-center justify-center">{tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className={`${glass} h-full`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">100+</h3>
                            <p className="font-semibold text-slate-800">Enterprise Projects</p>
                            <p className="text-slate-500 text-sm">Real-World Delivery Experience</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                            {['S/4HANA Rollout', 'ERP Migration', 'AI Analytics', 'Process Automation', 'Cloud Integration'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-brand-700 text-xs font-semibold py-1.5 px-3 rounded-lg border border-brand-200/30 flex items-center justify-center">{tag}</div>
                            ))}
                        </div>
                    </div>

                    <div className={`${glass} lg:col-span-4 flex-col md:flex-row items-start md:items-center gap-6 md:gap-10`}>
                        <div className="shrink-0 md:w-1/4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">6</h3>
                            <p className="font-semibold text-slate-800">Industry-Aligned Programs</p>
                        </div>
                        <div className="flex-1 flex flex-wrap gap-3">
                            {['DCAP', 'EAP', 'SAP Consulting', 'Data & AI', 'ERP Analyst', 'Online Foundation', 'Paid Apprenticeship', 'Mentorship Track', 'Certification Prep'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-brand-700 text-sm font-medium py-2 px-4 rounded-full border border-brand-200/30">{tag}</div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
