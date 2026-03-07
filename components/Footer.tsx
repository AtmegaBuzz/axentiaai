import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
    Company: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Leadership', href: '/about#team' },
        { name: 'Careers', href: '#' },
    ],
    Programs: [
        { name: 'SAP Consulting', href: '/programs#sap' },
        { name: 'Data & AI', href: '/programs#ai' },
        { name: 'ERP Analyst', href: '/programs#erp' },
        { name: 'All Programs', href: '/programs' },
    ],
    Enterprise: [
        { name: 'Hire Talent', href: '/enterprises' },
        { name: 'Partnerships', href: '/enterprises#partnerships' },
        { name: 'Custom Training', href: '/enterprises#training' },
        { name: 'Case Studies', href: '/enterprises#case-studies' },
    ],
    Resources: [
        { name: 'Outcomes', href: '/outcomes' },
        { name: 'Forum', href: '/forum' },
        { name: 'Blog', href: '#' },
        { name: 'FAQ', href: '#faq' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Link href="/" className="flex items-center mb-2">
                            <Image src="/logo.png" alt="Axentia.AI" width={160} height={40} className="h-10 w-auto brightness-110" />
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Division of Axentia.AI Private Limited<br />
                            Under Aegis of Orane Consulting Pvt. Ltd.<br />
                            Enabling the Next Generation of Digital Professionals
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                            <SocialIcon href="https://www.linkedin.com/company/daksha-career-accelerator-edu/" icon={<Linkedin className="w-4 h-4" />} />
                            <SocialIcon href="https://www.youtube.com/@DakshaCareerAccelerator" icon={<Youtube className="w-4 h-4" />} />
                            <SocialIcon href="https://www.facebook.com/profile.php?id=61583290772359" icon={<Facebook className="w-4 h-4" />} />
                            <SocialIcon href="https://www.instagram.com/daksha_edu/" icon={<Instagram className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact row */}
                <div className="border-t border-slate-800 pt-8 mb-8">
                    <div className="flex flex-wrap gap-8 text-sm">
                        <a href="tel:+919355181110" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                            <Phone className="w-4 h-4 text-brand-400" /> +91-9355181110
                        </a>
                        <a href="mailto:info@axentiaai.in" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                            <Mail className="w-4 h-4 text-brand-400" /> Info@axentiaai.in
                        </a>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                            1st Floor, Plot No. 01A, Sector-73, Noida - 201301
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>Copyright 2026 AxentiaAI. All Rights Reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <span className="text-slate-700">|</span>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Terms and Conditions</Link>
                        <span className="text-slate-700">|</span>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all">
            {icon}
        </a>
    );
}
