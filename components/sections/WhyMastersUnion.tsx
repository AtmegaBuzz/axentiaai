'use client';

import dynamic from 'next/dynamic';

const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines'), { ssr: false });

/* ── shared styles ─────────────────────────────────────────────────── */
const glass =
    'bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 flex flex-col hover:bg-white/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]';

const chipBrand =
    'bg-white/40 backdrop-blur-sm text-brand-700 text-xs font-semibold py-2 px-2 text-center rounded-lg border border-brand-200/30 truncate';

const chipAccent =
    'bg-white/40 backdrop-blur-sm text-accent-700 text-xs font-semibold py-2 px-2 text-center rounded-lg border border-accent-200/30 truncate';

/* ── main component ────────────────────────────────────────────────── */
export function WhyAxentiaAI() {
    return (
        <section
            id="why-axentiaai"
            style={{
                backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #ede5ff 25%, #f1f5f9 50%, #fef9c3 75%, #f8fafc 100%)',
            }}
            className="relative py-20 md:py-28 overflow-hidden animate-gradient-loop"
        >
            {/* ── FloatingLines WebGL background with mouse interaction ── */}
            <div className="absolute inset-0 z-0 opacity-60">
                <FloatingLines
                    linesGradient={['#8b47f0', '#a876ff', '#facc15', '#fbbf24', '#7630d9', '#561C9C']}
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[4, 5, 3]}
                    lineDistance={[4, 5, 4]}
                    bendRadius={5}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                    parallaxStrength={0.15}
                    animationSpeed={0.8}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 pointer-events-none">
                {/* ── Header ── */}
                <div className="text-center mb-14 md:mb-20">
                    <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
                        Why Choose Us
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Why <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">AxentiaAI</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        A data-backed approach to enterprise consulting education, built on 30 years of delivery experience.
                    </p>
                </div>

                {/* ── Bento Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-min pointer-events-auto">

                    {/* Card 1 — 500+ Consultants */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-5">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">500+</h3>
                            <p className="font-semibold text-slate-800">Consultants Trained</p>
                            <p className="text-slate-400 text-sm mt-1">Across Enterprise Projects</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['SAP S/4HANA', 'FICO', 'ABAP', 'MM/SD'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 2 — 95% Placement */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-5">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">95%</h3>
                            <p className="font-semibold text-slate-800">Placement Rate</p>
                            <p className="text-slate-400 text-sm mt-1">Industry-Leading Outcomes</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['Orane', 'Accenture', 'Deloitte', 'TCS'].map(tag => (
                                <div key={tag} className={chipAccent}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3 — 10+ Countries */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-5">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">10+</h3>
                            <p className="font-semibold text-slate-800">Countries Served</p>
                            <p className="text-slate-400 text-sm mt-1">Global Delivery Presence</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['India', 'Canada', 'Portugal', 'Kenya'].map(tag => (
                                <div key={tag} className={chipBrand}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 4 — 30+ Years (tall, with image) */}
                    <div className={`${glass} lg:row-span-2 overflow-hidden`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">30+</h3>
                            <p className="font-semibold text-slate-800">Years of Enterprise Experience</p>
                            <p className="text-slate-400 text-sm mt-1">From Orane Consulting Legacy</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop&q=80"
                            alt="Team collaboration"
                            className="w-full h-36 object-cover rounded-xl mb-4"
                            loading="lazy"
                        />
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                            {['SAP', 'AI/ML', 'Data Analytics', 'ERP', 'Cloud', 'Automation'].map(tag => (
                                <div key={tag} className={`${chipBrand} flex items-center justify-center py-2.5`}>{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 5 — CTC (with image) */}
                    <div className={`${glass} h-full overflow-hidden`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">&#8377;6-12 LPA</h3>
                            <p className="font-semibold text-slate-800">Average Starting CTC</p>
                            <p className="text-slate-400 text-sm mt-1">For Daksha Graduates</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&q=80"
                            alt="Career growth"
                            className="w-full h-24 object-cover rounded-xl mt-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Card 6 — 30+ Hiring Partners */}
                    <div className={`${glass} h-full`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">30+</h3>
                            <p className="font-semibold text-slate-800">Hiring Partners</p>
                            <p className="text-slate-400 text-sm mt-1">Leading Enterprises Trust Us</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-auto">
                            {['SAP', 'Infosys', 'Wipro', 'HCL', 'Capgemini', 'LTIMindtree', 'EY', 'PwC'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-accent-700 text-[10px] font-semibold py-1.5 px-1 text-center rounded-md border border-accent-200/30 truncate flex items-center justify-center">{tag}</div>
                            ))}
                        </div>
                    </div>

                    {/* Card 7 — 100+ Enterprise Projects (with image) */}
                    <div className={`${glass} h-full overflow-hidden`}>
                        <div className="mb-4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">100+</h3>
                            <p className="font-semibold text-slate-800">Enterprise Projects</p>
                            <p className="text-slate-400 text-sm mt-1">Real-World Delivery</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop&q=80"
                            alt="Enterprise project delivery"
                            className="w-full h-24 object-cover rounded-xl mt-auto"
                            loading="lazy"
                        />
                    </div>

                    {/* Card 8 — Programs (full width) */}
                    <div className={`${glass} lg:col-span-4 flex-col md:flex-row items-start md:items-center gap-6 md:gap-10`}>
                        <div className="shrink-0 md:w-1/4">
                            <h3 className="text-4xl font-black text-slate-900 mb-1">6</h3>
                            <p className="font-semibold text-slate-800">Industry-Aligned Programs</p>
                        </div>
                        <div className="flex-1 flex flex-wrap gap-2.5">
                            {['DCAP', 'EAP', 'SAP Consulting', 'Data & AI', 'ERP Analyst', 'Online Foundation', 'Paid Apprenticeship', 'Mentorship Track', 'Certification Prep'].map(tag => (
                                <div key={tag} className="bg-white/40 backdrop-blur-sm text-brand-700 text-sm font-medium py-2 px-4 rounded-full border border-brand-200/30 hover:bg-white/60 transition-colors">{tag}</div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
