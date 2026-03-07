'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Play, Download } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Video Background / Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
                {/* Gradient orbs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 pt-32 pb-20">
                <div className="max-w-4xl flex flex-col items-start text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8 text-sm font-semibold text-brand-300 uppercase tracking-widest"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                        Enterprise Consulting &bull; SAP &bull; AI
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-[-0.04em] leading-[1.05] mb-8"
                    >
                        Build the Future of{' '}
                        <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                            Enterprise Consulting
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium"
                    >
                        Industry-aligned training in SAP, AI, and enterprise technology.
                        From apprenticeship to real-world delivery — become the consultant enterprises need.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 px-8 shadow-lg shadow-brand-500/25 rounded-lg gap-2">
                            <Play className="w-5 h-5" />
                            Apply Now
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold py-4 px-8 border-white/20 hover:bg-white/10 rounded-lg text-white gap-2">
                            <Download className="w-5 h-5" />
                            Download Brochure
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
