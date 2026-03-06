import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Linkedin, Rocket } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Info */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">
                                Daksha <span className="text-brand-400 font-medium">by Axentia AI</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Division of Axentia.AI Private Limited<br />
                            Under Aegis of Orane Consulting Pvt. Ltd.<br />
                            Enabling the Next Generation of Digital Professionals
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-semibold text-lg">Contact Us</h4>
                        <div className="flex flex-col gap-3 text-sm">
                            <a href="tel:+919355181110" className="flex items-center gap-3 hover:text-brand-400 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-400">
                                    <Phone className="w-4 h-4" />
                                </div>
                                +91-9355181110
                            </a>
                            <a href="mailto:info@axentiaai.in" className="flex items-center gap-3 hover:text-brand-400 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                Info@axentiaai.in
                            </a>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="leading-snug">
                                    1st Floor, Plot No. 01A,<br />
                                    Sector-73, Noida - 201301
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-semibold text-lg">Follow Us On:</h4>
                        <div className="flex items-center gap-3">
                            <SocialIcon href="https://www.linkedin.com/company/daksha-career-accelerator-edu/" icon={<Linkedin className="w-5 h-5" />} />
                            <SocialIcon href="https://www.youtube.com/@DakshaCareerAccelerator" icon={<Youtube className="w-5 h-5" />} />
                            <SocialIcon href="https://www.facebook.com/profile.php?id=61583290772359" icon={<Facebook className="w-5 h-5" />} />
                            <SocialIcon href="https://www.instagram.com/daksha_edu/" icon={<Instagram className="w-5 h-5" />} />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>Copyright 2026 Dakshaskills. All Rights Reserved.</p>
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

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all hover:scale-110"
        >
            {icon}
        </a>
    );
}
