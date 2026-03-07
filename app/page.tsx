import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhyDaksha } from "@/components/sections/WhyDaksha";
import { Programs } from "@/components/sections/Programs";
import { EnterprisePartnerships } from "@/components/sections/EnterprisePartnerships";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Timeline } from "@/components/sections/Timeline";
import { Journey } from "@/components/sections/Journey";
import { Audience } from "@/components/sections/Audience";
import { Testimonials } from "@/components/sections/Testimonials";
import { JoinCommunity } from "@/components/sections/JoinCommunity";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col">
                <Hero />
                <Stats />
                <TrustedBy />
                <WhyDaksha />
                <Programs />
                <EnterprisePartnerships />
                <HowItWorks />
                <Timeline />
                <Journey />
                <Audience />
                <Testimonials />
                <JoinCommunity />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </>
    );
}
