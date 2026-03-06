import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyDaksha } from "@/components/sections/WhyDaksha";
import { Programs } from "@/components/sections/Programs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Journey } from "@/components/sections/Journey";
import { Audience } from "@/components/sections/Audience";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <WhyDaksha />
        <Programs />
        <HowItWorks />
        <Journey />
        <Audience />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
