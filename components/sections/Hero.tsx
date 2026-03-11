'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play, Download } from 'lucide-react';

const companies = [
    { name: 'SAP',          domain: 'sap.com' },
    { name: 'Deloitte',     domain: 'deloitte.com' },
    { name: 'Accenture',    domain: 'accenture.com' },
    { name: 'TCS',          domain: 'tcs.com' },
    { name: 'Infosys',      domain: 'infosys.com' },
    { name: 'Wipro',        domain: 'wipro.com' },
    { name: 'IBM',          domain: 'ibm.com' },
    { name: 'Capgemini',    domain: 'capgemini.com' },
    { name: 'HCL',          domain: 'hcltech.com' },
    { name: 'Cognizant',    domain: 'cognizant.com' },
    { name: 'EY',           domain: 'ey.com' },
    { name: 'PwC',          domain: 'pwc.com' },
    { name: 'KPMG',         domain: 'kpmg.com' },
    { name: 'LTIMindtree',  domain: 'ltimindtree.com' },
    { name: 'Tech Mahindra',domain: 'techmahindra.com' },
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
                    className="w-full h-full object-cover"
                >
                    <source src="/hero_video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* Hero Content — visible immediately */}
            <div className="relative z-10 flex-1 flex items-center">
                <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
                    <div className="max-w-5xl">
                        <h1 id="hero-heading" className="text-left">
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight">
                                Learn AI
                            </div>
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight mt-2">
                                by{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                                    Doing
                                </span>
                            </div>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg md:text-xl text-white/70 font-medium mt-6 max-w-xl"
                        >
                            Enterprise consulting education built on 30 years of real delivery experience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 mt-10"
                        >
                            <Button
                                size="lg"
                                className="bg-white hover:bg-white/90 text-slate-900 font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="primary"
                            >
                                <Play className="w-5 h-5" />
                                Watch Intro Video
                            </Button>
                            <Button
                                size="lg"
                                className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="secondary"
                            >
                                <Download className="w-5 h-5" />
                                Download Brochure
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scrolling logos */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10 pb-10 overflow-hidden"
            >
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee-reverse will-change-transform items-center">
                    {[...companies, ...companies, ...companies].map((company, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center justify-center mx-10 h-8 opacity-40 hover:opacity-80 transition-opacity duration-300"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://logo.clearbit.com/${company.domain}`}
                                alt={company.name}
                                className="h-6 w-auto max-w-[100px] object-contain"
                                style={{ filter: 'brightness(0) invert(1)' }}
                                loading="lazy"
                                onLoad={(e) => {
                                    const el = e.currentTarget.nextElementSibling as HTMLElement | null;
                                    if (el) el.style.display = 'none';
                                }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                                {company.name}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
