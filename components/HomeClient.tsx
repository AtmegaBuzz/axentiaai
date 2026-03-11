'use client';

import { useState } from 'react';
import { OpeningLoader } from '@/components/OpeningLoader';
import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { WhyAxentiaAI } from '@/components/sections/WhyMastersUnion';
import { WhyDaksha } from '@/components/sections/WhyDaksha';
import { Programs } from '@/components/sections/Programs';
import { StatementBanner } from '@/components/sections/StatementBanner';
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
                <Hero loaderDone={loaderDone} />
                <WhyAxentiaAI />
                <TrustedBy />
                <WhyDaksha />
                <Programs />
                <StatementBanner />
                <Timeline />
                <Audience />
                <Testimonials />
                <CTA />
            </main>
        </>
    );
}
