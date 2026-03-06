'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 flex flex-col items-start gap-8">
                <div className="max-w-4xl flex flex-col items-start text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 mb-6 text-sm font-semibold text-slate-800 uppercase tracking-widest border border-slate-300"
                    >
                        Daksha Career Accelerator
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-[-0.04em] leading-[1.05] mb-8"
                    >
                        Where Enterprise <br className="hidden md:block" />
                        <span className="text-brand-500">
                            Consultants Are Built
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-2xl text-slate-700 mb-10 max-w-2xl leading-snug font-medium"
                    >
                        Most graduates understand concepts, but enterprise projects demand something more. Daksha trains you to handle real tasks, meet deadlines, document clearly, and work effectively within team expectations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 px-8 shadow-md rounded-lg">
                            Start Your Journey
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold py-4 px-8 border-slate-300 hover:bg-slate-100 rounded-lg text-slate-800" onClick={() => {
                            document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Explore Programs
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
