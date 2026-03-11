import { GraduationCap, BriefcaseBusiness, MapPin, Clock, CheckCircle2, XCircle } from 'lucide-react';

const fits = [
    'See consulting as a long-term profession',
    'Want to build strong fundamentals before chasing designations',
    'Can commit full-time, in-person for 10 months',
    'Are open to structured feedback',
    'Take responsibility for your work',
];

const nonFits = [
    'Are looking for a short-term course',
    'Cannot commit full-time',
    'Prefer flexible or remote learning formats',
    'Expect progression without performance',
];

export function Audience() {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">

                {/* ── WHO IS THIS FOR (BENTO BOX) ── */}
                <div className="mb-24">
                    <div className="max-w-3xl mb-12">
                        <div className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
                            Who It&apos;s For
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Designed for the <span className="font-cursive italic text-brand-600 text-[1.1em]">Dedicated</span>
                        </h2>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                        {/* Tile 1: Fresh Graduates (Tall) */}
                        <div className="md:col-span-1 md:row-span-2 relative rounded-3xl overflow-hidden bg-brand-600 text-white p-8 flex flex-col justify-between shadow-lg group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                    <GraduationCap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Fresh Graduates</h3>
                                <p className="text-white/80 leading-relaxed font-medium">
                                    B.Tech, B.E., BBA, B.Com, BCA, B.Sc, MCA, MBA with 0–2 years experience looking to jumpstart an enterprise career.
                                </p>
                            </div>
                        </div>

                        {/* Tile 2: Career Changers (Wide) */}
                        <div className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-8 flex flex-col justify-center border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-6 relative z-10">
                                <div className="w-14 h-14 shrink-0 bg-accent-50 rounded-2xl border border-accent-100 flex items-center justify-center shadow-sm">
                                    <BriefcaseBusiness className="w-7 h-7 text-accent-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Career Changers</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Professionals in Finance, HR, Procurement, Operations, or Supply Chain with 1–6 years of experience, ready to pivot into high-impact SAP consulting roles.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tile 3: Noida-Based (Square) */}
                        <div className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-8 flex flex-col justify-center border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center mb-5 shadow-sm">
                                    <MapPin className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Campus Based</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Able to attend full-time, in-person training at our Noida campus facility.
                                </p>
                            </div>
                        </div>

                        {/* Tile 4: Committed (Square) */}
                        <div className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-8 flex flex-col justify-center border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-center mb-5 shadow-sm">
                                    <Clock className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Committed</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Available full-time for ~10 months (training + live project apprenticeship).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── IS THIS RIGHT FOR YOU ── */}
                <div className="relative bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200 shadow-xl shadow-slate-200/40">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-slate-50/80 to-transparent pointer-events-none rounded-r-3xl" />

                    <div className="relative z-10">
                        <div className="max-w-2xl mb-14">
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                                Is This Right For <span className="font-cursive italic text-brand-600 text-[1.1em]">You?</span>
                            </h3>
                            <p className="text-slate-600 text-lg">
                                We&apos;re looking for individuals who think long-term. Daksha requires immense focus and commitment to transform your career foundation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 relative">
                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent -translate-x-1/2" />

                            {/* Good Fit */}
                            <div>
                                <h4 className="font-bold text-emerald-700 text-xl mb-8 flex items-center gap-3">
                                    <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-100" />
                                    You are a great fit if you:
                                </h4>
                                <ul className="space-y-6">
                                    {fits.map((fit, i) => (
                                        <li key={i} className="flex gap-4 items-start group">
                                            <span className="shrink-0 mt-1 relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                            <span className="text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{fit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bad Fit */}
                            <div>
                                <h4 className="font-bold text-rose-700 text-xl mb-8 flex items-center gap-3">
                                    <XCircle className="w-7 h-7 text-rose-500 fill-rose-100" />
                                    Daksha may not fit if you:
                                </h4>
                                <ul className="space-y-6">
                                    {nonFits.map((fit, i) => (
                                        <li key={i} className="flex gap-4 items-start group">
                                            <span className="shrink-0 mt-1 relative w-2 h-2 bg-rose-400 rotate-45 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                                            <span className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">{fit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
