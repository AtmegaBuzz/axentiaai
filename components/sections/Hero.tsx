'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ContactModal } from '@/components/ContactModal';

const ease = [0.16, 1, 0.3, 1] as const;

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, [breakpoint]);
    return isMobile;
}

export function Hero() {
    const ref = useRef<HTMLElement>(null);
    const [contactOpen, setContactOpen] = useState(false);
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);
    const bgScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '-12%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.85], isMobile ? [1, 1] : [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen overflow-hidden bg-black text-white flex items-center"
        >
            {/* Video background with parallax */}
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/videos/hero-poster.jpg"
                    className="w-full h-full object-cover opacity-50"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </motion.div>
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative max-w-screen-2xl mx-auto w-full px-6 md:px-12 pt-36 md:pt-40 pb-24"
            >
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Applied AI for Enterprise
                        </span>
                    </motion.div>

                    <motion.h1
                        id="hero-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[0.95]"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                    >
                        <span className="text-white">From AI ambition to </span>
                        <span className="font-[family-name:var(--font-playfair)] px-[10px] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                            practical
                        </span>
                        <span className="text-white"> enterprise execution</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-xl leading-relaxed"
                    >
                        Most enterprises don&apos;t have an AI awareness problem. They have a prioritisation problem — too many ideas, too little execution clarity, and no clear link between AI activity and business outcomes.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                        className="h-px bg-gradient-to-r from-white/25 to-transparent max-w-md mt-8 mb-8 origin-left"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3"
                    >
                        <a
                            href="/solutions/ai-strategy-sprint"
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200 rounded-full"
                        >
                            Book an AI Strategy Sprint
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/solutions"
                            className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                        >
                            Explore solutions
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </section>
    );
}
