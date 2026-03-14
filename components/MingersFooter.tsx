import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { SubscribeForm } from '@/components/SubscribeForm';

const footerLinks = {
    Company: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Faculty', href: '/faculty' },
        { name: 'Enterprises', href: '/enterprises' },
        { name: 'Community Forum', href: '/forum' },
    ],
    Programs: [
        { name: 'DCAP, Career Accelerator', href: '/programs?tab=dcap' },
        { name: 'EAP, Enterprise Acceleration', href: '/programs?tab=eap' },
        { name: 'Online Foundation', href: '/programs?tab=online' },
        { name: 'Compare Programs', href: '/programs?tab=compare' },
        { name: 'Apply Now', href: '/programs#apply' },
    ],
    'Student Life': [
        { name: 'Student Life', href: '/student-life' },
        { name: 'Learning Journey', href: '/student-life/learning-journey' },
        { name: 'Culture & Activities', href: '/student-life/culture' },
        { name: 'Alumni Network', href: '/student-life#alumni' },
    ],
};

const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/daksha-career-accelerator-edu/' },
    { icon: Youtube, href: 'https://www.youtube.com/@DakshaCareerAccelerator' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61583290772359' },
    { icon: Instagram, href: 'https://www.instagram.com/daksha_edu/' },
];

export function MingersFooter() {
    return (
        <footer className="font-sans relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a0845 0%, #3b1068 40%, #4a1580 70%, #2a0845 100%)' }}>
            {/* Ambient glow */}
            <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(192,16,218,0.12) 0%, transparent 70%)' }} />

            {/* ── JOIN COMMUNITY BANNER ── */}
            <div className="relative z-10 border-b border-white/10">
                <div className="container mx-auto px-4 md:px-8 xl:px-12 py-6 md:py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-300 mb-1 md:mb-4">Community</p>
                        <h2 className="text-lg md:text-5xl font-bold text-white mb-3 md:mb-5 leading-tight">
                            Join the Axentia.AI{' '}
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                                Community
                            </span>
                        </h2>
                        <p className="hidden md:block text-base md:text-xl text-white/60 mb-6 md:mb-10 leading-relaxed">
                            Connect with SAP consultants, enterprise professionals, and students building careers for the AI era.
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                            <Link
                                href="/student-life"
                                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-4 md:px-8 py-2 md:py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all duration-200 text-xs md:text-base"
                            >
                                Join the Community
                                <span className="text-brand-600">&rarr;</span>
                            </Link>
                            <Link
                                href="/forum"
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-white/20 transition-all text-xs md:text-base"
                            >
                                Community Forum
                            </Link>
                        </div>
                        <p className="text-white/70 text-[10px] md:text-sm mt-2 md:mt-8">
                            200+ students &bull; 4+ countries &bull; Placement-first community
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-12 py-4 md:py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">

                    {/* Link columns — hidden on mobile (links are in navbar) */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="hidden md:block">
                            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">{title}</h4>
                            <ul className="space-y-3 md:space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-slate-400 hover:text-brand-400 font-medium transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Subscribe column */}
                    <div className="lg:col-span-2 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <h4 className="font-bold text-base md:text-2xl mb-2 md:mb-3 text-white">Stay Updated</h4>
                        <p className="hidden md:block text-slate-400 font-medium mb-4 md:mb-6 text-sm md:text-base">
                            Get the latest on programs, events, and enterprise consulting insights.
                        </p>
                        <SubscribeForm />
                    </div>

                </div>
            </div>

            {/* ── CONTACT ROW ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-4 md:pb-8 relative z-10">
                <div className="border-t border-white/10 pt-4 md:pt-8">
                    <div className="flex flex-wrap gap-3 md:gap-8 text-xs md:text-sm text-slate-400">
                        <a href="tel:+919355181110" className="flex items-center gap-2 hover:text-brand-400 transition-colors font-medium">
                            <Phone className="w-4 h-4 text-brand-500" /> +91-9355181110
                        </a>
                        <a href="mailto:sap-apprentice@axentia.ai" className="flex items-center gap-2 hover:text-brand-400 transition-colors font-medium">
                            <Mail className="w-4 h-4 text-brand-500" /> sap-apprentice@axentia.ai
                        </a>
                        <div className="flex items-center gap-2 font-medium">
                            <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                            1st Floor, Plot No. 01A, Sector-73, Noida - 201301
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-6 md:pb-12 relative z-10">

                {/* Logo & Socials */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-8 gap-4 md:gap-6">
                    <Link href="/" className="flex items-center">
                        <Image src="/brand/axentia-logo-white.png" alt="Axentia.AI" width={320} height={96} className="h-6 md:h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-3 md:gap-4">
                        {socials.map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-700/30 hover:text-brand-400 hover:border-brand-700/40 transition-colors"
                            >
                                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-3 md:mb-6" />

                {/* Legal & Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-slate-500">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                        <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <span className="text-white/10">|</span>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
                        <span className="text-white/10">|</span>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
                    </div>
                    <p>
                        &copy; 2026 AxentiaAI. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
