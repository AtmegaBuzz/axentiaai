'use client';

import dynamic from 'next/dynamic';
import { usePerformance } from '@/lib/usePerformance';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines'), { ssr: false });

/* ── TrustedBy / Partners section ─────────────────────────────── */

const placementPartners = [
    { name: 'SAP', domain: 'sap.com' },
    { name: 'Deloitte', domain: 'deloitte.com' },
    { name: 'Accenture', domain: 'accenture.com' },
    { name: 'TCS', domain: 'tcs.com' },
    { name: 'Infosys', domain: 'infosys.com' },
    { name: 'Wipro', domain: 'wipro.com' },
    { name: 'IBM', domain: 'ibm.com' },
    { name: 'Capgemini', domain: 'capgemini.com' },
    { name: 'HCL', domain: 'hcltech.com' },
    { name: 'Cognizant', domain: 'cognizant.com' },
    { name: 'EY', domain: 'ey.com' },
    { name: 'PwC', domain: 'pwc.com' },
    { name: 'KPMG', domain: 'kpmg.com' },
    { name: 'LTIMindtree', domain: 'ltimindtree.com' },
    { name: 'Tech Mahindra', domain: 'techmahindra.com' },
];

const certifications = [
    {
        name: 'CMMI',
        tagline: 'Capability Maturity Model Integration',
        file: '/certifications/cmmi-logo.png',
        badgeText: 'Process Excellence',
    },
    {
        name: 'NASSCOM',
        tagline: 'National Association of Software & Service Companies',
        file: '/certifications/nasscom-logo.gif',
        badgeText: 'Industry Member',
    },
    {
        name: 'ISO 9001',
        tagline: 'Quality Management System',
        file: '/certifications/ISO_9001-2015.png',
        badgeText: 'Quality Assurance',
    },
    {
        name: 'ISO 27001',
        tagline: 'Information Security Management',
        file: '/certifications/ISO-2018.svg',
        badgeText: 'Data Security',
    },
];

export function TrustedBy() {
    return (
        <section className="py-16 md:py-24 bg-white border-b border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">

                {/* ── Certifications ── */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Certified &amp; Recognised
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
                    >
                        Standards We Are Held To
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-sm mt-2 max-w-lg mx-auto italic"
                    >
                        Every certification reflects a commitment to quality, security, and professional standards
                        across our organisation and programs.
                    </motion.p>
                </div>

                {/* 4-card certifications grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 30, scale: 0.93 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.08 }}
                            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                            className="group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden"
                        >
                            {/* Logo */}
                            <div className="relative w-full h-20 mb-5 flex items-center justify-center">
                                <Image
                                    src={cert.file}
                                    alt={cert.name}
                                    width={120}
                                    height={80}
                                    className="max-h-16 w-auto object-contain"
                                    unoptimized={cert.file.endsWith('.gif') || cert.file.endsWith('.svg')}
                                />
                            </div>

                            {/* Name */}
                            <h4 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{cert.name}</h4>

                            {/* Tagline */}
                            <p className="text-[11px] text-slate-500 leading-snug mb-4 font-medium">{cert.tagline}</p>

                            {/* Badge */}
                            <span className="mt-auto inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                {cert.badgeText}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}




/* ── shared styles ─────────────────────────────────────────────────── */
const glass =
    'bg-white/30 backdrop-blur-md border border-white/40 rounded-xl p-4 flex flex-col hover:bg-white/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]';

const chipBrand =
    'bg-white/40 backdrop-blur-sm text-brand-700 text-[10px] font-semibold py-1.5 px-1.5 text-center rounded-md border border-brand-200/30 truncate';

const chipAccent =
    'bg-white/40 backdrop-blur-sm text-accent-700 text-[10px] font-semibold py-1.5 px-1.5 text-center rounded-md border border-accent-200/30 truncate';

/* ── main component ────────────────────────────────────────────────── */
export function WhyAxentiaAI() {
    const { tier } = usePerformance();
    const isLowEnd = tier === 'low';

    return (
        <section
            id="why-axentiaai"
            style={{
                backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #faf5ff 25%, #f1f5f9 50%, #fef8ec 75%, #f8fafc 100%)',
            }}
            className="relative animate-gradient-loop flex flex-col justify-center py-16 md:py-0 md:h-screen overflow-hidden"
        >
            {/* ── FloatingLines WebGL background — skipped on low-end devices ── */}
            {!isLowEnd && (
                <div className="absolute inset-0 z-0 opacity-60">
                    <FloatingLines
                        linesGradient={['#C010DA', '#E473BA', '#F3B15F', '#F7C87A', '#8929AC', '#58179B']}
                        enabledWaves={['top', 'middle', 'bottom']}
                        lineCount={[4, 5, 3]}
                        lineDistance={[4, 5, 4]}
                        bendRadius={5}
                        bendStrength={-0.5}
                        interactive={true}
                        parallax={true}
                        parallaxStrength={0.15}
                        animationSpeed={0.8}
                    />
                </div>
            )}

            <div className="w-full mx-auto px-3 md:px-4 lg:px-6 relative z-10">
                {/* ── Header ── */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
                        The Axentia{' '}
                        <span
                            className="inline-block px-3 py-1 rounded-md font-bold"
                            style={{ background: '#F7C87A', color: '#232322' }}
                        >
                            Approach
                        </span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto italic">
                        Explore the numbers behind our story
                    </p>
                </div>

                {/* ── Bento Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-min">

                    {/* Card 1 — 100+ Careers */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">100+</h3>
                            <p className="text-sm font-semibold text-slate-800">Careers Launched</p>
                            <p className="text-slate-400 text-xs mt-0">Across Enterprise Projects</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mt-auto">
                            {['SAP S/4HANA', 'FICO', 'ABAP', 'MM/SD'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 2 — 95% Placement */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">95%</h3>
                            <p className="text-sm font-semibold text-slate-800">Placement Success</p>
                            <p className="text-slate-400 text-xs mt-0">Consultants Deployed</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mt-auto">
                            {['Orane', 'Accenture', 'Deloitte', 'TCS'].map(tag => (
                                <div key={tag} className={chipAccent}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3 — 4+ Countries */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">4+</h3>
                            <p className="text-sm font-semibold text-slate-800">Countries Served</p>
                            <p className="text-slate-400 text-xs mt-0">Global Delivery Presence</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mt-auto">
                            {['India', 'Canada', 'Portugal', 'Kenya'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 4 — 25+ Years (tall, with image first) */}
                    <div className={`${glass} lg:row-span-2 overflow-hidden`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop&q=80"
                            alt="Team collaboration"
                            className="w-full h-28 object-cover rounded-lg mb-2"
                            loading="lazy"
                        />
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">25+</h3>
                            <p className="text-sm font-semibold text-slate-800">Years of Experience</p>
                            <p className="text-slate-400 text-xs mt-0">Built on the legacy of Orane Consulting</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mt-auto">
                            {['SAP', 'AI/ML', 'Data Analytics', 'ERP', 'Cloud', 'Automation'].map(tag => (
                                <div key={tag} className={`${chipBrand} flex items-center justify-center`}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 5 — CTC (with image) */}
                    <div className={`${glass} h-full overflow-hidden`}>
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">&#8377;6-12 LPA</h3>
                            <p className="text-sm font-semibold text-slate-800">Average Starting CTC</p>
                            <p className="text-slate-400 text-xs mt-0">For Daksha Graduates</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&q=80"
                            alt="Career growth"
                            className="w-full h-16 object-cover rounded-lg mt-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Card 6 — 30+ Hiring Partners */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">30+</h3>
                            <p className="text-sm font-semibold text-slate-800">Hiring Partners</p>
                            <p className="text-slate-400 text-xs mt-0">Leading Enterprises Trust Us</p>
                        </div>
                        <div className="grid grid-cols-4 gap-1 mt-auto">
                            {['SAP', 'Infosys', 'Wipro', 'HCL', 'Capgemini', 'LTIMindtree', 'EY', 'PwC'].map(tag => (
                                <div key={tag} className={`${chipAccent} flex items-center justify-center`}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 7 — 100+ Enterprise Projects (with image) */}
                    <div className={`${glass} h-full overflow-hidden`}>
                        <div className="mb-2">
                            <h3 className="text-3xl font-black text-slate-900 mb-0">100+</h3>
                            <p className="text-sm font-semibold text-slate-800">Enterprise Projects</p>
                            <p className="text-slate-400 text-xs mt-0">Real-World Delivery</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop&q=80"
                            alt="Enterprise project delivery"
                            className="w-full h-16 object-cover rounded-lg mt-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Card 8 — Programs (full width) */}
                    <div className="lg:col-span-4 bg-gradient-to-r from-brand-50/60 to-accent-50/60 backdrop-blur-md border border-white/40 rounded-xl p-5 hover:from-brand-50/80 hover:to-accent-50/80 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl font-black text-slate-900 leading-none">6</span>
                            <span className="text-sm font-bold text-slate-800 tracking-tight">Industry-Aligned Programs</span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                            {['DCAP', 'EAP', 'SAP Consulting', 'Data & AI', 'ERP Analyst', 'Online Foundation', 'Paid Apprenticeship', 'Mentorship Track', 'Certification Prep'].map(tag => (
                                <div key={tag} className="whitespace-nowrap bg-white/60 backdrop-blur-sm text-brand-700 text-[11px] font-semibold py-2 px-3 rounded-lg border border-brand-200/30 hover:bg-white/80 hover:border-brand-300/40 transition-all duration-200 text-center shadow-sm">{tag}</div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
