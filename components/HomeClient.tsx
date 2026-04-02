'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { WhyAxentiaAI } from '@/components/sections/WhyAxentiaAI';

/* Below-fold sections — lazy loaded so they don't block initial paint */
const SAPAISection    = dynamic(() => import('@/components/sections/SAPAISection').then(m => ({ default: m.SAPAISection })), { ssr: true });
const IndustryUseCases = dynamic(() => import('@/components/sections/IndustryUseCases').then(m => ({ default: m.IndustryUseCases })), { ssr: true });
const Offerings       = dynamic(() => import('@/components/sections/Offerings').then(m => ({ default: m.Offerings })), { ssr: true });
const Programs        = dynamic(() => import('@/components/sections/Programs').then(m => ({ default: m.Programs })), { ssr: true });
const HowItWorks            = dynamic(() => import('@/components/sections/Timeline').then(m => ({ default: m.HowItWorks })), { ssr: true });
const WhyEnterprisesChoose  = dynamic(() => import('@/components/sections/WhyEnterprisesChoose').then(m => ({ default: m.WhyEnterprisesChoose })), { ssr: true });
const Leaders         = dynamic(() => import('@/components/sections/Leaders').then(m => ({ default: m.Leaders })), { ssr: true });
const Testimonials    = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });
const WhereWeFit      = dynamic(() => import('@/components/sections/WhereWeFit').then(m => ({ default: m.WhereWeFit })), { ssr: true });
const CTA             = dynamic(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })), { ssr: true });

export function HomeClient() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* 1. Hero — Establish authority & primary CTA */}
            <Hero />
            {/* 2. Trust & Credentials — Build confidence immediately */}
            <WhyAxentiaAI />
            {/* 3. Core Offerings — What we do (problem → solution) */}
            <Offerings />
            {/* 4. SAP + AI — Technical differentiation */}
            <SAPAISection />
            {/* 5. How It Works — Clear transformation journey */}
            <HowItWorks />
            {/* 6. Industry Use Cases — Prove results with real scenarios */}
            <IndustryUseCases />
            {/* 7. Why Enterprises Choose Us — Quantified differentiators */}
            <WhyEnterprisesChoose />
            {/* 8. Who We Serve — Persona segmentation */}
            <WhereWeFit />
            {/* 9. Programs — Training & development detail */}
            <Programs />
            {/* 10. Leadership — Team credibility */}
            <Leaders />
            {/* 11. Testimonials — Social proof */}
            <Testimonials />
            {/* 12. CTA — Final conversion push */}
            <CTA />
        </main>
    );
}
