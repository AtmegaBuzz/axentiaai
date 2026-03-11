import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = {
    Company: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Leadership', href: '/about#team' },
        { name: 'Outcomes', href: '/outcomes' },
        { name: 'Contact Us', href: '#cta' },
    ],
    Programs: [
        { name: 'SAP Consulting', href: '/programs#sap' },
        { name: 'Data & AI', href: '/programs#ai' },
        { name: 'ERP Analyst', href: '/programs#erp' },
        { name: 'All Programs', href: '/programs' },
        { name: 'How It Works', href: '/#how-it-works' },
    ],
    Enterprise: [
        { name: 'Hire Talent', href: '/enterprises' },
        { name: 'Partnerships', href: '/enterprises#partnerships' },
        { name: 'Custom Training', href: '/enterprises#training' },
        { name: 'Case Studies', href: '/enterprises#case-studies' },
        { name: 'Talent Pipeline', href: '/enterprises#pipeline' },
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
        <footer className="font-sans relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0118 0%, #130228 40%, #1a0333 70%, #0d011f 100%)' }}>
            {/* Ambient glow */}
            <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(164,20,231,0.12) 0%, transparent 70%)' }} />

            {/* ── FOOTER LINKS GRID ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-bold text-lg mb-6 text-white">{title}</h4>
                            <ul className="space-y-4">
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
                    <div className="lg:col-span-2 p-8 rounded-3xl border border-white/10 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <h4 className="font-bold text-2xl mb-3 text-white">Stay Updated</h4>
                        <p className="text-slate-400 font-medium mb-6">
                            Get the latest on programs, events, and enterprise consulting insights.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                            By subscribing, you agree to our <Link href="#" className="underline hover:text-slate-300">Privacy Policy.</Link>
                        </p>
                    </div>

                </div>
            </div>

            {/* ── CONTACT ROW ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-8 relative z-10">
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-wrap gap-8 text-sm text-slate-400">
                        <a href="tel:+919355181110" className="flex items-center gap-2 hover:text-brand-400 transition-colors font-medium">
                            <Phone className="w-4 h-4 text-brand-500" /> +91-9355181110
                        </a>
                        <a href="mailto:info@axentiaai.in" className="flex items-center gap-2 hover:text-brand-400 transition-colors font-medium">
                            <Mail className="w-4 h-4 text-brand-500" /> Info@axentiaai.in
                        </a>
                        <div className="flex items-center gap-2 font-medium">
                            <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                            1st Floor, Plot No. 01A, Sector-73, Noida - 201301
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-12 relative z-10">

                {/* Logo & Socials */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
                    <Link href="/" className="flex items-center">
                        <Image src="/Axentia-logo-white.png" alt="Axentia.AI" width={320} height={96} className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        {socials.map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-700/30 hover:text-brand-400 hover:border-brand-700/40 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Legal & Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
                    <div className="flex flex-wrap items-center justify-center gap-4">
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
