import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhyAxentiaAI } from "@/components/sections/WhyMastersUnion";
import { WhyDaksha } from "@/components/sections/WhyDaksha";
import { Programs } from "@/components/sections/Programs";
import { EnterprisePartnerships } from "@/components/sections/EnterprisePartnerships";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Timeline } from "@/components/sections/Timeline";
import { Audience } from "@/components/sections/Audience";
import Testimonials from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <Hero />
            <TrustedBy />
            <WhyAxentiaAI />
            <WhyDaksha />
            <Programs />
            <EnterprisePartnerships />
            <HowItWorks />
            <Timeline />
            <Audience />
            <Testimonials />
            <CTA />
        </main>
    );
}
