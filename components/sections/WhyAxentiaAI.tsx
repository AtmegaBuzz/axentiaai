'use client';

import dynamic from 'next/dynamic';
import { usePerformance } from '@/lib/usePerformance';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines'), { ssr: false });
const Globe = dynamic(() => import('@/components/ui/Globe').then(m => ({ default: m.Globe })), { ssr: false });

const partnerLogos = [
    { src: '/partners/orane-logo.png',     alt: 'Orane',        width: 120, height: 40 },
    { src: '/partners/aws-logo.png',       alt: 'AWS',          width: 80,  height: 40 },
    { src: '/partners/microsoft-logo.png', alt: 'Microsoft',    width: 140, height: 40 },
    { src: '/partners/odoo-logo.png',      alt: 'Odoo',         width: 100, height: 40 },
    { src: '/partners/sap-logo.png',       alt: 'SAP',          width: 80,  height: 40 },
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

const regionTags = ['India', 'Middle East', 'Africa', 'South East Asia'];

export function TrustedBy() {
    return null;
}

/* ── main component ────────────────────────────────────────────────── */
export function WhyAxentiaAI() {
    const { tier } = usePerformance();
    const isLowEnd = tier === 'low';

    const stats = [
        { end: 50,  suffix: '+', label: 'Enterprises served globally', sub: 'Across SAP, AI/ML & ERP verticals' },
        { end: 300, suffix: '+', label: 'Certified professionals', sub: 'Trained & deployed worldwide' },
    ];

    return (
        <section
            id="why-axentiaai"
            className="relative overflow-hidden animate-gradient-loop"
            style={{
                backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #faf5ff 25%, #f1f5f9 50%, #fef8ec 75%, #f8fafc 100%)',
            }}
        >
            {/* FloatingLines WebGL background — skipped on low-end devices */}
            {!isLowEnd && (
                <div className="absolute inset-0 z-0 opacity-60 overflow-hidden">
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

            {/* ── Content ── */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-14 md:pt-20 pb-32 md:pb-44">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left: badge + heading + glass cards */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                        >
                            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[#8A29AC]/25 bg-[#8A29AC]/8 text-[#8A29AC] text-[10px] font-bold uppercase tracking-widest mb-5">
                                Trusted By
                            </span>
                            <h2
                                className="font-black text-slate-900 tracking-tight leading-[1.08] mb-4"
                                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
                            >
                                The AI-enforced{' '}
                                <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                    legacy
                                </span>{' '}
                                of Orane.
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed mb-5 pl-4 border-l-2 border-[#8A29AC]/30 max-w-md">
                                Building on over a decade and a half of global enterprise delivery excellence, we prepare our talent for the highest standards of the industry.
                            </p>
                        </motion.div>

                        {/* Transparent glass cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 + i * 0.1 }}
                                    whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                                    className="bg-white/25 backdrop-blur-xl border border-white/40 rounded-none p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-white/35 transition-all duration-300"
                                >
                                    <AnimatedCounter
                                        end={stat.end}
                                        suffix={stat.suffix}
                                        duration={1600}
                                        className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight tabular-nums"
                                    />
                                    <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Certification badges */}
                        <div className="flex flex-wrap items-start gap-4 md:gap-5 mt-6">
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={cert.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 + i * 0.06, type: 'spring', stiffness: 120, damping: 16 }}
                                    className="relative flex flex-col items-center w-[80px] md:w-[95px]"
                                >
                                    <div
                                        className="w-full bg-white border border-slate-200 shadow-sm flex flex-col items-center px-2 pt-2.5 pb-5"
                                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
                                    >
                                        <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 text-center leading-tight">
                                            {cert.name}
                                        </span>
                                        <Image
                                            src={cert.file}
                                            alt={cert.name}
                                            width={44}
                                            height={36}
                                            className="h-7 md:h-8 w-auto object-contain"
                                            unoptimized={cert.file.endsWith('.gif') || cert.file.endsWith('.svg')}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: spinning Globe + region tags */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <div className="relative h-[220px] md:h-[270px] lg:h-[290px]">
                            <Globe className="opacity-90" />
                        </div>

                        {/* Region tags */}
                        <div className="flex flex-wrap justify-center gap-2 mt-16">
                            {regionTags.map((name, i) => (
                                <motion.span
                                    key={name}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 120, damping: 16 }}
                                    className="bg-white/25 backdrop-blur-sm text-[10px] font-bold text-slate-600 px-2.5 py-1 rounded-md border border-white/40 shadow-sm"
                                >
                                    {name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>


        </section>
    );
}

export function StandardsSection() {
    return (
        <section className="py-12 md:py-16 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 lg:gap-14 items-stretch">

                    {/* Left: 2x2 certification cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ type: 'spring', stiffness: 140, damping: 18, delay: i * 0.08 }}
                                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                                className="group relative bg-white border border-slate-200 rounded-none p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                            >
                                <div className="relative w-full h-14 mb-3 flex items-center justify-center">
                                    <Image
                                        src={cert.file}
                                        alt={cert.name}
                                        width={100}
                                        height={60}
                                        className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                        unoptimized={cert.file.endsWith('.gif') || cert.file.endsWith('.svg')}
                                    />
                                </div>
                                <h4 className="text-base font-bold text-slate-900 mb-1 tracking-tight">{cert.name}</h4>
                                <p className="text-[10px] text-slate-500 leading-snug mb-3 font-medium">{cert.tagline}</p>
                                <span className="mt-auto inline-flex items-center gap-1.5 bg-slate-900 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                                    {cert.badgeText}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: text + stats filler */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                        className="flex flex-col h-full"
                    >
                        <div className="inline-flex items-center gap-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg mb-5 w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-400/30" />
                            Certified &amp; Recognised
                        </div>
                        <h3
                            className="font-black text-slate-900 tracking-tight leading-[1.05] mb-4 whitespace-nowrap"
                            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.75rem)' }}
                        >
                            Standards We Are Held To
                        </h3>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed pl-5 border-l-2 border-[#8A29AC]/30 mb-8">
                            Every certification reflects a commitment to quality, security, and professional standards
                            across our organisation and programs.
                        </p>

                        {/* Stat highlights to fill remaining height */}
                        <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                            <div>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">4</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">Active Certifications</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">100%</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">Compliance Score</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">Global</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">Standards Recognised</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
