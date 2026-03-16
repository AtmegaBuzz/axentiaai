import { BookOpen, Briefcase, Zap, Layers, Cpu, Wrench, MessageSquare, Check } from 'lucide-react';

const phases = [
    {
        title: 'Foundation',
        desc: 'You build understanding of enterprise processes, SAP basics, documentation practices, and professional communication. This phase prepares you for structured project tasks.',
        meta: '4 Months · In-Person',
        icon: <BookOpen className="w-5 h-5 text-brand-600" />,
    },
    {
        title: 'Apprenticeship',
        desc: 'You work on real assignments such as configuration support, testing, and documentation. Responsibility increases as your confidence grows.',
        meta: '6–8 months · Supervised Project Work',
        icon: <Briefcase className="w-5 h-5 text-brand-600" />,
    },
    {
        title: 'Acceleration',
        desc: 'Participants who demonstrate strong performance move into deeper responsibilities — cross-module exposure, industry-specific scenarios, and presales participation.',
        meta: 'Merit-based · EAP track',
        icon: <Zap className="w-5 h-5 text-brand-600" />,
    },
];

const curriculum = [
    {
        title: 'Enterprise Processes',
        icon: <Layers className="w-5 h-5 text-brand-500" />,
        items: ['Procure-to-Pay (P2P)', 'Order-to-Cash (O2C)', 'Record-to-Report (R2R)', 'Hire-to-Retire (H2R)'],
    },
    {
        title: 'SAP Modules',
        icon: <Cpu className="w-5 h-5 text-brand-500" />,
        items: ['FICO (Finance)', 'ABAP (Development)', 'S/4HANA Overview', 'MM (Materials)', 'SD (Sales)'],
    },
    {
        title: 'Practical Skills',
        icon: <Wrench className="w-5 h-5 text-brand-500" />,
        items: ['System navigation', 'Basic configuration', 'Test case execution', 'Issue logging and documentation'],
    },
    {
        title: 'Professional Skills',
        icon: <MessageSquare className="w-5 h-5 text-brand-500" />,
        items: ['Clear written communication', 'Structured documentation', 'Participating in meetings', 'Responding to feedback'],
    },
];

export function HowItWorks() {
    return (
        <section className="py-16 md:py-24 bg-slate-50 relative border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                        Learn. Apply. Accelerate.
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Axentia.AI follows a clear progression. You begin with structured learning and move into supervised project work seamlessly.
                    </p>
                </div>

                {/* Phases */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {phases.map((phase) => (
                        <div
                            key={phase.title}
                            className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow relative flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                                    {phase.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow">{phase.desc}</p>

                            <div className="mt-auto text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 py-2 px-3 rounded-lg inline-block w-fit">
                                {phase.meta}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Curriculum */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative">
                    <div className="mb-12 max-w-2xl">
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">What You&apos;ll Learn</h3>
                        <p className="text-slate-600 text-lg">During the foundation phase, your week is divided between process understanding, SAP practice, and professional skill-building.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {curriculum.map((group) => (
                            <div key={group.title} className="flex flex-col">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    {group.icon}
                                    <h4 className="font-bold text-slate-900">{group.title}</h4>
                                </div>
                                <ul className="space-y-4">
                                    {group.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-600 text-sm leading-relaxed font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
