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
            {/* Section 1: Hero */}
            <Hero />
            {/* Section 2: The Axentia Approach */}
            <WhyAxentiaAI />
            {/* Section 4: HOW WE HELP YOU SUCCEED — Enterprise AI offerings */}
            <Offerings />
            {/* Section 5: SAP + AI */}
            <SAPAISection />
            {/* Section 6: Our Programmes (DCAP / EAP / Online) */}
            <Programs />
            {/* Section 7: How It Works */}
            <HowItWorks />
            {/* Section 8: Industry Use Cases */}
            <IndustryUseCases />
            {/* Section 9: Why Enterprises Choose Axentia.AI */}
            <WhyEnterprisesChoose />
            {/* Section 9: Leadership */}
            <Leaders />
            {/* Section 10: Testimonials */}
            <Testimonials />
            {/* Section 11: Where Axentia.AI fits */}
            <WhereWeFit />
            {/* CTA */}
            <CTA />
        </main>
    );
}
