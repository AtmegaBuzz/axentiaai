'use client';

import dynamic from 'next/dynamic';
import { usePerformance } from '@/lib/usePerformance';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines'), { ssr: false });

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
    const { tier } = usePerformance();
    const isLowEnd = tier === 'low';
    // Prevent hydration mismatch: only render WebGL after client mount
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <section
            id="why-axentiaai"
            className="relative overflow-hidden bg-white py-20 md:py-28"
        >
            {/* Subtle gradient blob */}
            <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #8A29AC 0%, transparent 70%)' }} />
            <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #C010DA 0%, transparent 70%)' }} />

            {/* ── FloatingLines WebGL background — client-only to avoid hydration mismatch ── */}
            {mounted && !isLowEnd && (
                <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
                    <FloatingLines
                        linesGradient={['#C010DA', '#E473BA', '#F3B15F', '#F7C87A', '#8929AC', '#58179B']}
                        enabledWaves={['top', 'middle', 'bottom']}
                        lineCount={[3, 4, 2]}
                        lineDistance={[5, 6, 5]}
                        bendRadius={5}
                        bendStrength={-0.4}
                        interactive={false}
                        parallax={true}
                        parallaxStrength={0.1}
                        animationSpeed={0.6}
                    />
                </div>
            )}

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

                    {/* ── Left: Text ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="flex-1 max-w-xl"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8A29AC]/25 bg-[#8A29AC]/8 text-[#8A29AC] text-xs font-bold uppercase tracking-widest mb-6">
                            Trusted By
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                            The AI-enforced{' '}
                            <span className="bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                legacy
                            </span>{' '}
                            of Orane.
                        </h2>

                        <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8">
                            Building on over a decade and a half of global enterprise delivery excellence, we prepare our talent for the highest standards of the industry.
                        </p>

                        {/* Stats pills */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { value: '50+', label: 'Enterprises' },
                                { value: '300+', label: 'Certified Professionals' },
                                { value: '16+', label: 'Years of Delivery' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 shadow-sm"
                                >
                                    <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500 leading-snug">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: Logo Grid (bordered cells) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                        className="flex-1 w-full"
                    >
                        <h3 className="text-lg font-medium text-slate-600 text-center mb-6">Trusted by world&apos;s leading companies</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-max mx-auto -mt-px -ml-px">
                            {partnerLogos.map((logo) => (
                                <div
                                    key={logo.alt}
                                    className="hover:bg-slate-50 flex items-center justify-center h-16 w-44 sm:w-48 sm:h-20 border border-slate-200 -mt-px -ml-px transition-colors duration-200"
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={logo.width}
                                        height={logo.height}
                                        className="max-h-8 w-auto object-contain"
                                    />
                                </div>
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
