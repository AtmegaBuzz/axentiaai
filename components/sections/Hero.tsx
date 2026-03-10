'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play, Download } from 'lucide-react';

export function Hero() {
    return (
        <section className="sticky top-0 z-10 relative min-h-screen flex flex-col overflow-hidden bg-white will-change-transform" style={{ transform: 'translateZ(0)' }}>
            {/* Background Video — GPU-accelerated */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                >
                    <source src="/hero_video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center">
                <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
                    <div className="max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-left"
                        >
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight">
                                Learn AI
                            </div>
                            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight mt-2">
                                by{' '}
                                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                                    Doing
                                </span>
                            </div>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mt-12"
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
        </section>
    );
}
