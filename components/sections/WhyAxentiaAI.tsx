'use client';

import dynamic from 'next/dynamic';
import { usePerformance } from '@/lib/usePerformance';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const Globe = dynamic(() => import('@/components/ui/Globe').then(m => ({ default: m.Globe })), { ssr: false });

const certifications = [
    { name: 'CMMI', file: '/certifications/cmmi-logo.png' },
    { name: 'NASSCOM', file: '/certifications/nasscom-logo.gif' },
    { name: 'ISO 9001', file: '/certifications/ISO_9001-2015.png' },
    { name: 'ISO 27001', file: '/certifications/ISO-2018.svg' },
];

const regionTags = ['India', 'Middle East', 'Africa', 'South East Asia'];

const stats = [
    { end: 50, suffix: '+', label: 'Enterprises Served' },
    { end: 300, suffix: '+', label: 'Consultants Deployed' },
    { end: 16, suffix: '+', label: 'Years of Excellence' },
    { end: 4, suffix: '', label: 'Global Regions' },
];

export function TrustedBy() {
    return null;
}

export function WhyAxentiaAI() {
    const { tier } = usePerformance();

    return (
        <section
            id="why-axentiaai"
            className="relative overflow-hidden -mt-[100vh] rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]"
            style={{ background: '#f8fafc', position: 'relative', zIndex: 10 }}
        >
            {/* Subtle grid bg */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-14 md:py-20">
                {/* ── Row 1: Header left + Stats right ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-10 md:mb-14">
                    <div>
                        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            Enterprise Heritage
                        </span>
                        <h2
                            className="font-bold text-slate-900 tracking-tight leading-[1.1]"
                            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)' }}
                        >
                            The AI-enforced legacy of{' '}
                            <span className="text-[#00A3E5]">Orane Consulting</span>
                        </h2>
                    </div>

                    {/* Inline stats strip */}
                    <div className="flex gap-6 md:gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <AnimatedCounter
                                    end={stat.end}
                                    suffix={stat.suffix}
                                    duration={1600}
                                    className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight tabular-nums"
                                />
                                <p className="text-[10px] text-slate-400 font-medium mt-0.5 whitespace-nowrap">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Row 2: Globe + Regions | Certifications ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-center">
                    {/* Globe compact */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
                            <Globe className="opacity-85" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                            {regionTags.map((name) => (
                                <span
                                    key={name}
                                    className="bg-white text-[10px] font-bold text-slate-500 px-2.5 py-1 border border-slate-200"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Certifications — horizontal cards */}
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                            Certified &amp; Recognised
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {certifications.map((cert) => (
                                <div
                                    key={cert.name}
                                    className="bg-white border border-slate-200 px-4 py-4 flex flex-col items-center text-center hover:border-slate-300 hover:shadow-sm transition-all"
                                >
                                    <div className="h-10 flex items-center justify-center mb-2">
                                        <Image
                                            src={cert.file}
                                            alt={cert.name}
                                            width={50}
                                            height={34}
                                            className="h-8 w-auto object-contain"
                                            unoptimized={cert.file.endsWith('.gif') || cert.file.endsWith('.svg')}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{cert.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
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
                                className="group relative bg-white border border-slate-200 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
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
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: text + stats */}
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
