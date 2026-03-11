'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { WhyAxentiaAI } from '@/components/sections/WhyMastersUnion';

/* Below-fold sections — lazy loaded so they don't block initial paint */
const WhyDaksha = dynamic(() => import('@/components/sections/WhyDaksha').then(m => ({ default: m.WhyDaksha })), { ssr: true });
const StatementBanner = dynamic(() => import('@/components/sections/StatementBanner').then(m => ({ default: m.StatementBanner })), { ssr: true });
const Programs = dynamic(() => import('@/components/sections/Programs').then(m => ({ default: m.Programs })), { ssr: true });
const Timeline = dynamic(() => import('@/components/sections/Timeline').then(m => ({ default: m.Timeline })), { ssr: true });
const Audience = dynamic(() => import('@/components/sections/Audience').then(m => ({ default: m.Audience })), { ssr: true });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });
const CTA = dynamic(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })), { ssr: true });

export function HomeClient() {
    return (
        <main className="flex min-h-screen flex-col">
            <Hero />
            <WhyAxentiaAI />
            <WhyDaksha />
            <StatementBanner />
            <Programs />
            <Timeline />
            <Audience />
            <Testimonials />
            <CTA />
        </main>
    );
}
