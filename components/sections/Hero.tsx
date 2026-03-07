'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play, Download } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
    const partnerLogos = [
        { name: 'Microsoft', logo: '/partners/microsoft.svg' },
        { name: 'SAP', logo: '/partners/sap.svg' },
        { name: 'AWS', logo: '/partners/aws.svg' },
        { name: 'Google Cloud', logo: '/partners/google.svg' },
        { name: 'Accenture', logo: '/partners/accenture.svg' },
        { name: 'Deloitte', logo: '/partners/deloitte.svg' },
    ];

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Background (placeholder for video/image) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900">
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
                    
                    {/* Gradient Orbs for Visual Interest */}
                    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-accent-400/15 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-500/10 rounded-full blur-3xl animate-pulse" />
                </div>
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center">
                <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
                    <div className="max-w-5xl">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                            <span className="text-sm font-semibold text-white/90 tracking-wide">
                                Experiential AI Education
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-left"
                        >
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight">
                                Learn AI
                            </div>
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mt-2">
                                by{' '}
                                <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                                    Doing
                                </span>
                            </div>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl text-white/80 mt-8 mb-12 max-w-3xl leading-relaxed font-medium text-left"
                        >
                            Master artificial intelligence through hands-on projects, real-world applications, 
                            and industry mentorship. Build tomorrow's solutions today.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mb-16"
                        >
                            <Button 
                                size="lg" 
                                className="bg-white/95 backdrop-blur-md border border-white/20 text-slate-900 hover:bg-white font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="secondary"
                            >
                                <Play className="w-5 h-5" />
                                Watch Intro Video
                            </Button>
                            <Button 
                                size="lg" 
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="outline"
                            >
                                <Download className="w-5 h-5" />
                                Download Brochure
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Partner/Accreditation Logos */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative z-10 pb-8"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                        <div className="text-center mb-6">
                            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                                Trusted by Industry Leaders
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                            {partnerLogos.map((partner, index) => (
                                <motion.div
                                    key={partner.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                                    className="flex items-center justify-center h-12 w-24 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300"
                                >
                                    <span className="text-white/80 text-sm font-semibold">
                                        {partner.name}
                                    </span>
                                    {/* Placeholder for actual logos */}
                                    {/* <Image 
                                        src={partner.logo} 
                                        alt={partner.name}
                                        width={80}
                                        height={32}
                                        className="opacity-80 hover:opacity-100 transition-opacity filter brightness-0 invert"
                                    /> */}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}