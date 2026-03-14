'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { WhyAxentiaAI, TrustedBy } from '@/components/sections/WhyMastersUnion';

/* Below-fold sections — lazy loaded so they don't block initial paint */
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
            {/* Section 3: Certificates */}
            <TrustedBy />
            {/* Section 4: Our Programmes */}
            <Programs />
            {/* Section 5: Student Path */}
            <Timeline />
            {/* Section 6: Backbone of Axentia.AI — Leaders */}
            <Leaders />
            {/* Section 7: Testimonials */}
            <Testimonials />
            {/* Section 8: Community Video */}
            <CommunityVideo />
            {/* CTA */}
            <CTA />
        </main>
    );
}
