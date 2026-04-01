import Link from 'next/link';
import { Linkedin, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const footerNav = {
    ENTERPRISE: [
        { name: 'AI Transformation', href: '/programs?tab=transformation' },
        { name: 'AI Capability Development', href: '/programs?tab=capability' },
        { name: 'SAP + AI Integration', href: '/#sap-ai' },
        { name: 'Industry Use Cases', href: '/#industry-use-cases' },
        { name: 'How It Works', href: '/#how-it-works' },
    ],
    ACADEMIES: [
        { name: 'AI Foundation', href: '/programs?tab=academies' },
        { name: 'SAP SuccessFactors', href: '/programs?tab=academies' },
        { name: 'Retail & FMCG', href: '/programs?tab=academies' },
        { name: 'Energy & Utilities', href: '/programs?tab=academies' },
        { name: 'SAP Workforce', href: '/programs?tab=academies' },
    ],
    COMPANY: [
        { name: 'About Axentia', href: '/about' },
        { name: 'Strategic Partners', href: '/about#partners' },
        { name: 'Leadership', href: '/faculty' },
        { name: 'Insights', href: '/forum' },
        { name: 'Contact Us', href: 'mailto:info@axentiaai.com' },
    ],
};

const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/daksha-career-accelerator-edu/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/axentiaai', label: 'X' },
];

export function Footer() {
    return (
        <footer className="font-sans">

            {/* ── Dark footer ── */}
            <div className="bg-[#111118] relative overflow-hidden">
                {/* Subtle ambient glow */}
                <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(138,41,172,0.15) 0%, transparent 70%)' }} />

                {/* ── Main columns ── */}
                <div className="container mx-auto px-4 md:px-8 xl:px-12 pt-14 pb-10 md:pt-16 md:pb-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

                        {/* Col 1: Logo + description + socials */}
                        <div className="md:col-span-1">
                            {/* Logo lockup */}
                            <Link href="/" className="inline-flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-[#8A29AC] flex items-center justify-center shrink-0">
                                    <span className="text-white font-extrabold text-base leading-none">A</span>
                                </div>
                                <span className="text-white font-bold text-lg tracking-tight">
                                    Axentia<span className="text-[#8A29AC]">.AI</span>
                                </span>
                            </Link>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-[220px]">
                                Enterprise AI Transformation, Capability Development, and Talent Academies. In strategic partnership with Orane Consulting.
                            </p>

                            {/* Socials */}
                            <div className="flex items-center gap-3">
                                {socials.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#8A29AC]/20 hover:text-[#C078E8] hover:border-[#8A29AC]/30 transition-all duration-200"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Cols 2-4: Nav columns */}
                        {Object.entries(footerNav).map(([title, links]) => (
                            <div key={title}>
                                <h4 className="text-white font-bold text-xs uppercase tracking-[0.18em] mb-5">{title}</h4>
                                <ul className="space-y-3.5">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-slate-400 hover:text-white text-sm transition-colors duration-200 font-normal"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
                    <div className="h-px bg-white/8" />
                </div>

                {/* ── Contact row ── */}
                <div className="container mx-auto px-4 md:px-8 xl:px-12 py-5 relative z-10">
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-500">
                        <a href="tel:+9217665361" className="flex items-center gap-1.5 hover:text-slate-300 transition-colors font-medium">
                            <Phone className="w-3.5 h-3.5 text-[#8A29AC]" /> +91-9217665361
                        </a>
                        <a href="mailto:info@axentiaai.com" className="flex items-center gap-1.5 hover:text-slate-300 transition-colors font-medium">
                            <Mail className="w-3.5 h-3.5 text-[#8A29AC]" /> info@axentiaai.com
                        </a>
                        <div className="flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#8A29AC] shrink-0" />
                            1st Floor, IDEMIA Building, Plot No 1-A, Sector 73, Noida, UP 201316
                        </div>
                    </div>
                </div>

            </div>

        </footer>
    );
}
