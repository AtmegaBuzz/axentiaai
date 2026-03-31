'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { WhyAxentiaAI, StandardsSection } from '@/components/sections/WhyAxentiaAI';

/* Below-fold sections — lazy loaded so they don't block initial paint */
const SAPAISection    = dynamic(() => import('@/components/sections/SAPAISection').then(m => ({ default: m.SAPAISection })), { ssr: true });
const IndustryUseCases = dynamic(() => import('@/components/sections/IndustryUseCases').then(m => ({ default: m.IndustryUseCases })), { ssr: true });
const Offerings       = dynamic(() => import('@/components/sections/Offerings').then(m => ({ default: m.Offerings })), { ssr: true });
const Programs        = dynamic(() => import('@/components/sections/Programs').then(m => ({ default: m.Programs })), { ssr: true });
const Timeline        = dynamic(() => import('@/components/sections/Timeline').then(m => ({ default: m.Timeline })), { ssr: true });
const Leaders         = dynamic(() => import('@/components/sections/Leaders').then(m => ({ default: m.Leaders })), { ssr: true });
const Testimonials    = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });
const CommunityVideo  = dynamic(() => import('@/components/sections/CommunityVideo').then(m => ({ default: m.CommunityVideo })), { ssr: true });
const CTA             = dynamic(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })), { ssr: true });

export function HomeClient() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* Section 1: Hero */}
            <Hero />
            {/* Section 2: The Axentia Approach */}
            <WhyAxentiaAI />
            {/* Section 3: Standards / Certifications */}
            <StandardsSection />
            {/* Section 4: HOW WE HELP YOU SUCCEED — Enterprise AI offerings */}
            <Offerings />
            {/* Section 5: SAP + AI */}
            <SAPAISection />
            {/* Section 6: Our Programmes (DCAP / EAP / Online) */}
            <Programs />
            {/* Section 7: Industry Use Cases */}
            <IndustryUseCases />
            {/* Section 8: Student Path */}
            <Timeline />
            {/* Section 9: Leadership */}
            <Leaders />
            {/* Section 10: Testimonials */}
            <Testimonials />
            {/* Section 11: Community Video */}
            <CommunityVideo />
            {/* CTA */}
            <CTA />
        </main>
    );
}
