import { ArrowDown } from 'lucide-react';

const steps = [
    {
        time: 'Month 0–4',
        role: 'Trainee',
        desc: 'Learn enterprise process flows, SAP basics, and structured documentation practices.',
    },
    {
        time: 'Month 4–10',
        role: 'Apprentice',
        desc: 'Work on supervised project tasks. Paid. Deliverables reviewed by senior consultants.',
    },
    {
        time: 'Year 1–2',
        role: 'Associate Consultant',
        desc: 'Support UAT cycles, prepare dashboards, handle structured client communication, manage defined tasks independently.',
    },
    {
        time: 'Year 2–4',
        role: 'Consultant',
        desc: 'Own specific process areas, manage configuration and testing cycles, coordinate across teams.',
    },
    {
        time: 'Year 4+',
        role: 'Senior/Lead',
        desc: 'Drive module-level decisions, guide junior consultants, manage client-facing responsibilities.',
    },
];

export function Journey() {
    return (
        <section className="py-16 md:py-24 bg-slate-50 relative border-t border-slate-200">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="text-center mb-20">
                    <div
                        className="flex items-center justify-center gap-2 text-brand-600 font-semibold tracking-wide uppercase text-sm mb-4"
                    >
                        Your Path
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                    >
                        A typical progression after entering Daksha
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-brand-200 transform -translate-x-1/2 rounded-full hidden md:block" />

                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <div
                                key={step.role}
                                className={`flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Visual Connector / Center node */}
                                <div className="hidden md:flex flex-col items-center justify-center w-12 h-12 bg-white border-4 border-brand-500 rounded-full z-10 shrink-0 shadow-lg absolute left-1/2 transform -translate-x-1/2">
                                    <ArrowDown className="w-5 h-5 text-brand-500" />
                                </div>

                                {/* Content Box */}
                                <div className={`w-full md:w-[45%] bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow relative ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                                    }`}>
                                    <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 font-bold text-xs uppercase tracking-wider rounded-lg mb-4">
                                        {step.time}
                                    </span>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.role}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
