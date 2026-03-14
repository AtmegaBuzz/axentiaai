'use client';

const enterpriseLogos = [
    { name: 'SAP',           url: 'https://logo.clearbit.com/sap.com' },
    { name: 'Deloitte',      url: 'https://logo.clearbit.com/deloitte.com' },
    { name: 'Accenture',     url: 'https://logo.clearbit.com/accenture.com' },
    { name: 'TCS',           url: 'https://logo.clearbit.com/tcs.com' },
    { name: 'Infosys',       url: 'https://logo.clearbit.com/infosys.com' },
    { name: 'Wipro',         url: 'https://logo.clearbit.com/wipro.com' },
    { name: 'IBM',           url: 'https://logo.clearbit.com/ibm.com' },
    { name: 'Capgemini',     url: 'https://logo.clearbit.com/capgemini.com' },
    { name: 'HCL',           url: 'https://logo.clearbit.com/hcltech.com' },
    { name: 'Cognizant',     url: 'https://logo.clearbit.com/cognizant.com' },
    { name: 'EY',            url: 'https://logo.clearbit.com/ey.com' },
    { name: 'PwC',           url: 'https://logo.clearbit.com/pwc.com' },
    { name: 'KPMG',          url: 'https://logo.clearbit.com/kpmg.com' },
    { name: 'LTIMindtree',   url: 'https://logo.clearbit.com/ltimindtree.com' },
    { name: 'Tech Mahindra', url: 'https://logo.clearbit.com/techmahindra.com' },
];

export function ReliedOnBy() {
    const logos = [...enterpriseLogos, ...enterpriseLogos, ...enterpriseLogos];

    return (
        <section className="hidden md:block py-12 bg-slate-50 border-y border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                    Our graduates work at
                </p>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee items-center">
                    {logos.map((logo, idx) => (
                        <div key={idx} className="mx-10 flex items-center justify-center flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.url}
                                alt={logo.name}
                                width={100}
                                height={40}
                                className="h-8 w-auto object-contain grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
