'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function CTA() {
    return (
        <section className="py-24 bg-brand-600 border-t border-brand-700">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
                        >
                            Let’s get you to the right place.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-brand-100 leading-relaxed font-medium"
                        >
                            No pressure. Just a conversation about your goals, where you are now, and whether Daksha might be the right next step.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="shrink-0 w-full md:w-auto"
                    >
                        <Button size="lg" className="w-full md:w-auto bg-white text-brand-700 hover:bg-slate-50 hover:text-brand-800 font-bold py-4 px-10 shadow-lg rounded-lg whitespace-nowrap">
                            Schedule a Consultation
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
