'use client';

const companies = [
    'Orane Consulting', 'SAP', 'Deloitte', 'Accenture', 'TCS', 'Infosys', 'Wipro', 'HCL',
    'Capgemini', 'Cognizant', 'Tech Mahindra', 'IBM', 'EY', 'KPMG', 'PwC', 'LTIMindtree',
];

export function TrustedBy() {
    return (
        <section className="pb-10 bg-white overflow-hidden">
            {/* Label row */}
            <div className="container mx-auto px-4 md:px-8 mb-5">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        500+ consultants trained across
                    </span>
                    <div className="flex-1 h-px bg-slate-100" />
                </div>
            </div>

            {/* Marquee */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee will-change-transform">
                    {[...companies, ...companies, ...companies].map((company, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center justify-center mx-8 h-8 opacity-30 hover:opacity-70 transition-opacity duration-200"
                        >
                            <span className="text-sm font-semibold text-slate-700 whitespace-nowrap tracking-wide uppercase">{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
