'use client';

import { useState } from 'react';
import { OpeningLoader } from '@/components/OpeningLoader';
import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { WhyAxentiaAI } from '@/components/sections/WhyMastersUnion';
import { WhyDaksha } from '@/components/sections/WhyDaksha';
import { Programs } from '@/components/sections/Programs';
import { EnterprisePartnerships } from '@/components/sections/EnterprisePartnerships';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Timeline } from '@/components/sections/Timeline';
import { Audience } from '@/components/sections/Audience';
import Testimonials from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';

export function HomeClient() {
    const [loaderDone, setLoaderDone] = useState(false);

    return (
        <>
            <OpeningLoader onComplete={() => setLoaderDone(true)} />
            <main className="flex min-h-screen flex-col">
                {/* Hero is sticky — stays behind while WhyAxentiaAI scrolls over it */}
                <Hero loaderDone={loaderDone} />
                {/* Everything after Hero sits above its sticky layer */}
                <div className="relative z-20">
                    <WhyAxentiaAI />
                    <TrustedBy />
                    <WhyDaksha />
                    <Programs />
                    <EnterprisePartnerships />
                    <HowItWorks />
                    <Timeline />
                    <Audience />
                    <Testimonials />
                    <CTA />
                </div>
            </main>
        </>
    );
}
