'use client';

import dynamic from 'next/dynamic';
import { usePerformance } from '@/lib/usePerformance';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Globe2, Shield, Award, Users } from 'lucide-react';

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

const stats = [
    { end: 50,  suffix: '+', label: 'Enterprises', icon: Globe2 },
    { end: 300, suffix: '+', label: 'Consultants', icon: Users },
    { end: 16,  suffix: '+', label: 'Years', icon: Shield },
    { end: 4,   suffix: '',  label: 'Regions', icon: Award },
];

export function TrustedBy() {
    return null;
}

/* ── main component ────────────────────────────────────────────────── */
export function WhyAxentiaAI() {
    const { tier } = usePerformance();
    const isLowEnd = tier === 'low';

    return (
        <section
            id="why-axentiaai"
            className="relative overflow-hidden -mt-[100vh] rounded-t-[2rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]"
            style={{
                background: '#0f172a',
                position: 'relative',
                zIndex: 10,
            }}
        >
            {/* Subtle grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Brand accent glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* ── Content ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-20 md:py-28">

                {/* Top: Tag + Heading + Description */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                    >
                        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-5 text-accent-300 border border-accent-300/20 bg-accent-300/8">
                            Enterprise Heritage
                        </span>
                        <h2
                            className="font-bold text-white tracking-tight leading-[1.1] mb-5"
                            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
                        >
                            The AI-enforced legacy of{' '}
                            <span className="text-[#00A3E5]">Orane Consulting</span>
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                            Building on over a decade and a half of global enterprise delivery excellence, we prepare our talent for the highest standards of the industry.
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.06 }}
                                    className="bg-white/[0.04] border border-white/[0.08] p-5 flex flex-col"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 bg-brand-500/15 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-brand-400" strokeWidth={2} />
                                        </div>
                                        <AnimatedCounter
                                            end={stat.end}
                                            suffix={stat.suffix}
                                            duration={1600}
                                            className="text-2xl font-black text-white tracking-tight tabular-nums"
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Middle: Globe + Region tags */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-full aspect-square max-w-[420px]">
                            <Globe className="opacity-90" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {regionTags.map((name, i) => (
                                <motion.span
                                    key={name}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.06 }}
                                    className="bg-white/[0.06] text-[11px] font-bold text-slate-300 px-3 py-1.5 border border-white/[0.08]"
                                >
                                    {name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications grid */}
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 block">
                            Certified &amp; Recognised
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={cert.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 + i * 0.06 }}
                                    className="bg-white/[0.04] border border-white/[0.08] p-5 flex flex-col items-center text-center hover:bg-white/[0.07] transition-colors"
                                >
                                    <div className="h-10 flex items-center justify-center mb-3">
                                        <Image
                                            src={cert.file}
                                            alt={cert.name}
                                            width={60}
                                            height={40}
                                            className="h-8 w-auto object-contain brightness-0 invert opacity-70"
                                            unoptimized={cert.file.endsWith('.gif') || cert.file.endsWith('.svg')}
                                        />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-1">{cert.name}</h4>
                                    <p className="text-[10px] text-slate-500 leading-snug">{cert.tagline}</p>
                                    <span className="mt-3 inline-block text-[8px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/20 bg-accent-300/8 px-2 py-0.5">
                                        {cert.badgeText}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: Partner logos strip */}
                <div className="border-t border-white/[0.08] pt-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6 text-center">
                        Trusted Partners
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                        {partnerLogos.map((logo) => (
                            <Image
                                key={logo.alt}
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="h-7 md:h-8 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-70 transition-opacity"
                            />
                        ))}
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
