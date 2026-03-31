'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { WhyAxentiaAI, StandardsSection } from '@/components/sections/WhyMastersUnion';

/* Below-fold sections — lazy loaded so they don't block initial paint */
const SAPAISection = dynamic(() => import('@/components/sections/SAPAISection').then(m => ({ default: m.SAPAISection })), { ssr: true });
const IndustryUseCases = dynamic(() => import('@/components/sections/IndustryUseCases').then(m => ({ default: m.IndustryUseCases })), { ssr: true });
const Programs = dynamic(() => import('@/components/sections/Programs').then(m => ({ default: m.Programs })), { ssr: true });
const Timeline = dynamic(() => import('@/components/sections/Timeline').then(m => ({ default: m.Timeline })), { ssr: true });
const Leaders = dynamic(() => import('@/components/sections/Leaders').then(m => ({ default: m.Leaders })), { ssr: true });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });
const CommunityVideo = dynamic(() => import('@/components/sections/CommunityVideo').then(m => ({ default: m.CommunityVideo })), { ssr: true });
const CTA = dynamic(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })), { ssr: true });

export function HomeClient() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* Section 1: Hero */}
            <Hero />
            {/* Section 2: The Axentia Approach */}
            <WhyAxentiaAI />
            {/* Section 3: Standards / Certifications */}
            <StandardsSection />
            {/* Section 4: SAP + AI */}
            <SAPAISection />
            {/* Section 4: Industry Use Cases */}
            <IndustryUseCases />
            {/* Section 5: Our Programmes */}
            <Programs />
            {/* Section 6: Student Path */}
            <Timeline />
            {/* Section 7: Leadership */}
            <Leaders />
            {/* Section 8: Testimonials */}
            <Testimonials />
            {/* Section 9: Community Video */}
            <CommunityVideo />
            {/* CTA */}
            <CTA />
        </main>
    );
}
