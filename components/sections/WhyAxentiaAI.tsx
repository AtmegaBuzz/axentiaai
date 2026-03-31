'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

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

export function TrustedBy() {
    return null;
}




/* ── main component ────────────────────────────────────────────────── */
export function WhyAxentiaAI() {
    const stats = [
        { end: 50,  suffix: '+', label: 'Enterprises served globally' },
        { end: 300, suffix: '+', label: 'Certified professionals' },
        { end: 16,  suffix: '+', label: 'Years of delivery excellence' },
    ];

    return (
        <section id="why-axentiaai" className="relative bg-white border-b border-slate-100 overflow-hidden">

            {/* Ghosted decorative number */}
            <div
                className="pointer-events-none select-none absolute -top-4 -left-4 font-black leading-none text-slate-900 opacity-[0.03]"
                style={{ fontSize: 'clamp(120px, 18vw, 260px)' }}
                aria-hidden="true"
            >
                16+
            </div>

            {/* ── Top zone: editorial 2-col ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 pt-20 md:pt-28 pb-16 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-24 items-start">

                    {/* Left: badge + heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8A29AC]/25 bg-[#8A29AC]/8 text-[#8A29AC] text-xs font-bold uppercase tracking-widest mb-8">
                            Trusted By
                        </span>
                        <h2
                            className="font-black text-slate-900 tracking-tight leading-[1.05]"
                            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
                        >
                            The AI-enforced{' '}
                            <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                legacy
                            </span>
                            <br />
                            of Orane.
                        </h2>
                    </motion.div>

                    {/* Right: description + stacked stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.12 }}
                        className="lg:pt-14"
                    >
                        <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-10 pl-5 border-l-2 border-[#8A29AC]/30">
                            Building on over a decade and a half of global enterprise delivery excellence, we prepare our talent for the highest standards of the industry.
                        </p>
                        <div className="flex flex-col">
                            {stats.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className={`flex items-baseline gap-5 py-5 ${i < stats.length - 1 ? 'border-b border-slate-100' : ''}`}
                                >
                                    <AnimatedCounter
                                        end={stat.end}
                                        suffix={stat.suffix}
                                        duration={1600}
                                        className="text-3xl font-black text-slate-900 tracking-tight tabular-nums w-20 shrink-0"
                                    />
                                    <span className="text-sm text-slate-500 leading-snug">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* ── Bottom zone: full-bleed logo strip ── */}
            <div className="border-t border-slate-200">
                {/* Label row */}
                <div className="container mx-auto px-4 md:px-8 xl:px-12">
                    <div className="flex items-center gap-4 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 shrink-0">
                            Partners &amp; Integrations
                        </span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>
                </div>
                {/* Logo row — full width */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-slate-200"
                >
                    {partnerLogos.map((logo, i) => (
                        <div
                            key={logo.alt}
                            className={`group flex items-center justify-center h-24 hover:bg-slate-50 transition-colors duration-200 ${i < partnerLogos.length - 1 ? 'border-r border-slate-200' : ''}`}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="max-h-8 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}

export function StandardsSection() {
    return (
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                {/* Header */}
                <div className="mb-14 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-3 rounded-full shadow-lg mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-400/30" />
                        Certified &amp; Recognised
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.06 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4"
                    >
                        Standards We Are Held To
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-sm md:text-base max-w-lg mx-auto italic leading-relaxed"
                    >
                        Every certification reflects a commitment to quality, security, and professional standards
                        across our organisation and programs.
                    </motion.p>
                </div>

                {/* 4-card certifications grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ type: 'spring', stiffness: 140, damping: 18, delay: i * 0.1 }}
                            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                            className="group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative w-full h-20 mb-5 flex items-center justify-center">
                                <Image
                                    src={cert.file}
                                    alt={cert.name}
                                    width={120}
                                    height={80}
                                    className="max-h-16 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                                    unoptimized={cert.file.endsWith('.gif') || cert.file.endsWith('.svg')}
                                />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{cert.name}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed mb-5 font-medium">{cert.tagline}</p>
                            <span className="mt-auto inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                {cert.badgeText}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
