'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play, Download, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const partnerLogos = [
    { src: '/orane-logo.png',     alt: 'Orane',     width: 120, height: 40 },
    { src: '/aws-logo.png',       alt: 'AWS',        width: 80,  height: 40 },
    { src: '/microsoft-logo.png', alt: 'Microsoft',  width: 140, height: 40 },
    { src: '/oddo_logo.png',      alt: 'Odoo',       width: 100, height: 40 },
    { src: '/sap-logo.png',       alt: 'SAP',        width: 80,  height: 40 },
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/hero_poster.jpg"
                    className="w-full h-full object-cover"
                >
                    <source src="/hero_video2_opt.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center">
                <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                    <div className="max-w-5xl">
                        <motion.h1
                            id="hero-heading"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="text-left"
                        >
                            <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[100px] font-black text-white leading-[0.9] tracking-tight">
                                Enable SAP
                            </div>
                            <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[100px] font-black leading-[0.9] tracking-tight mt-2">
                                <span className="text-white">for the</span>{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-yellow-300 to-accent-400 bg-clip-text text-transparent">
                                    AI Era
                                </span>
                            </div>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
                        >
                            Enterprise consulting education built on 25+ years of real SAP project delivery experience.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            className="mt-2 text-sm text-white/50"
                        >
                            Built on the consulting legacy of{' '}
                            <span className="text-yellow-300 font-semibold">Orane</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-white hover:bg-white/90 text-slate-900 font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="primary"
                            >
                                <Play className="w-5 h-5" />
                                Watch Intro Video
                            </Button>
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="secondary"
                            >
                                <Download className="w-5 h-5" />
                                Download Brochure
                            </Button>
                            <Link
                                href="/student-life"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-yellow-400/15 backdrop-blur-md border border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/25 font-semibold py-4 px-8 rounded-full shadow-xl transition-all duration-200"
                            >
                                <Users className="w-5 h-5" />
                                Join Community
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Partner Logos — scrolling marquee */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10 pb-10 overflow-hidden"
            >

                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />
                <div className="flex w-max animate-marquee items-center">
                    {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, idx) => (
                        <div key={idx} className="mx-14 flex items-center">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="h-7 w-auto object-contain"
                                style={{ filter: 'brightness(0) invert(1)', opacity: 0.35 }}
                                priority
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
