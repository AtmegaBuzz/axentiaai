'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
    { value: 500, suffix: '+', label: 'Consultants Trained' },
    { value: 30, suffix: '+', label: 'Years Experience' },
    { value: 10, suffix: '+', label: 'Countries' },
    { value: 100, suffix: '+', label: 'Enterprise Projects' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 2000;
                    const start = Date.now();
                    const tick = () => {
                        const elapsed = Date.now() - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setDisplay(Math.floor(eased * value));
                        if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <div ref={ref} className="text-6xl md:text-7xl font-black text-brand-500 tracking-tight">
            {display}{suffix}
        </div>
    );
}

export function Stats() {
    return (
        <section className="py-24 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="text-center"
                        >
                            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            <p className="text-slate-600 font-medium mt-3 text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
