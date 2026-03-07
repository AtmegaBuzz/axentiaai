'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play, Download } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-white via-slate-50 to-gray-100">
            {/* Background Video with Light Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                    {/* Fallback gradient if video fails to load */}
                </video>
                
                {/* Light overlay for better text readability */}
                <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center">
                <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
                    <div className="max-w-5xl">
                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-left"
                        >
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-slate-900 leading-[0.9] tracking-tight">
                                Learn AI
                            </div>
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mt-2">
                                by{' '}
                                <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                                    Doing
                                </span>
                            </div>
                        </motion.h1>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mt-12"
                        >
                            <Button 
                                size="lg" 
                                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="primary"
                            >
                                <Play className="w-5 h-5" />
                                Watch Intro Video
                            </Button>
                            <Button 
                                size="lg" 
                                className="bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:bg-white font-semibold py-4 px-8 rounded-full shadow-xl gap-3"
                                variant="secondary"
                            >
                                <Download className="w-5 h-5" />
                                Download Brochure
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}