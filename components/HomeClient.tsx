'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
// import { WhyAxentiaAI } from '@/components/sections/WhyAxentiaAI';

/* Below-fold sections — lazy loaded so they don't block initial paint */
// const SAPAISection    = dynamic(() => import('@/components/sections/SAPAISection').then(m => ({ default: m.SAPAISection })), { ssr: true });
const IndustryUseCases = dynamic(() => import('@/components/sections/IndustryUseCases').then(m => ({ default: m.IndustryUseCases })), { ssr: true });
const Offerings       = dynamic(() => import('@/components/sections/Offerings').then(m => ({ default: m.Offerings })), { ssr: true });
// const Programs        = dynamic(() => import('@/components/sections/Programs').then(m => ({ default: m.Programs })), { ssr: true });
const HowItWorks            = dynamic(() => import('@/components/sections/Timeline').then(m => ({ default: m.HowItWorks })), { ssr: true });
// const WhyEnterprisesChoose  = dynamic(() => import('@/components/sections/WhyEnterprisesChoose').then(m => ({ default: m.WhyEnterprisesChoose })), { ssr: true });
const WhyAIStalls     = dynamic(() => import('@/components/sections/WhyAIStalls').then(m => ({ default: m.WhyAIStalls })), { ssr: true });
// const Testimonials    = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });
const WhereWeFit      = dynamic(() => import('@/components/sections/WhereWeFit').then(m => ({ default: m.WhereWeFit })), { ssr: true });
const CTA             = dynamic(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })), { ssr: true });

export function HomeClient() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* 1. Hero — From AI ambition to practical enterprise execution */}
            <Hero />

            {/* 2. Three streams — Choose your starting point (Sprint · Corporates · ECAP) */}
            <Offerings />

            {/* 3. Why AI efforts stall — 2-col Problem vs Axentia approach */}
            <WhyAIStalls />

            {/* Enterprise Heritage — commented out */}
            {/* <WhyAxentiaAI /> */}

            {/* 4. Use Cases preview — 6 practical starting points */}
            <IndustryUseCases />

            {/* 5. How we work — 4 steps (Diagnose · Design · Deploy · Scale) */}
            <HowItWorks />

            {/* 6. Industries — Where Axentia is most relevant */}
            <WhereWeFit />

            {/* 7. Final CTA band */}
            <CTA />

            {/* ──────────────────────────────────────────────────────────
                Commented out — not in reference index.html
                ────────────────────────────────────────────────────────── */}
            {/* <SAPAISection /> */}
            {/* <WhyEnterprisesChoose /> */}
            {/* <Programs /> */}
            {/* <Testimonials /> */}
        </main>
    );
}
