'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight, Users, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactModal } from './ContactModal';

const megaMenuData = {
    'Solutions': {
        items: [
            { name: 'AI Strategy Sprint', href: '/solutions/ai-strategy-sprint', description: 'Fast-track workshop to define your AI roadmap' },
            { name: 'Solutions Overview', href: '/solutions', description: 'Full view of our AI transformation offerings' },
            { name: 'Use Cases', href: '/solutions/use-cases', description: 'Real-world AI deployments across industries' },
        ],
        featured: {
            label: "FLAGSHIP",
            title: "AI Strategy Sprint",
            description: "Align leadership, identify high-ROI use cases, ship a 90-day plan.",
            href: "/solutions/ai-strategy-sprint"
        }
    },
    'Training': {
        items: [
            { name: 'AI for Corporates', href: '/training/corporates', description: 'Org-wide AI fluency programs for enterprises' },
            { name: 'Leadership Workshop', href: '/training/leadership-workshop', description: 'Executive AI workshops for decision-makers' },
            { name: 'AI for Managers', href: '/training/managers', description: 'Practical AI skills for middle management' },
            { name: 'Academy', href: '/training/academy', description: 'Structured learning tracks for teams and individuals' },
        ],
        featured: {
            label: "POPULAR",
            title: "AI for Corporates",
            description: "Scalable training paths built for large teams, with outcome tracking.",
            href: "/training/corporates"
        }
    },
};

type MenuKey = keyof typeof megaMenuData;

function MegaMenuDropdown({ menuKey, isOpen, onMouseEnter, onMouseLeave }: { menuKey: MenuKey; isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void }) {
    const menuData = megaMenuData[menuKey];
    if (!menuData) return null;

    const createHeading = (text: string) => {
        if (text === 'Solutions') return (<>Our <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Solutions</span></>);
        if (text === 'Training') return (<>AI <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Training</span></>);
        return text;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-black/40 z-40"
                        style={{ top: '56px', willChange: 'opacity', transform: 'translateZ(0)' }}
                        onMouseEnter={onMouseLeave}
                    />

                    <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top', willChange: 'transform, opacity' }}
                        className="fixed top-14 left-0 right-0 w-screen z-50 overflow-hidden"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <div className="bg-white border-b border-slate-200 shadow-xl">
                            <div className="px-[5%] py-10">
                                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                                    <div className="space-y-6">
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                            className="text-2xl font-bold text-slate-900"
                                        >
                                            {createHeading(menuKey)}
                                        </motion.h2>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                            {menuData.items.map((item, i) => (
                                                <motion.div
                                                    key={item.name}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="group flex items-center justify-between py-3 border-b border-transparent hover:border-slate-200 transition-all duration-300"
                                                    >
                                                        <div>
                                                            <h3 className="text-[15px] font-medium text-slate-900 group-hover:text-brand-600 group-hover:underline underline-offset-2 transition-colors duration-300">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors duration-300 mt-0.5">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-brand-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 ml-3" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25, duration: 0.35 }}
                                        className="border-l border-slate-200 pl-10 hidden lg:block"
                                    >
                                        <Link href={menuData.featured.href} className="group block">
                                            <div className="rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-300">
                                                <div className="w-full aspect-[16/9] bg-gradient-to-br from-brand-600/20 via-brand-500/10 to-accent-400/20 flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center">
                                                        <div className="w-5 h-5 bg-brand-600 rounded-md" />
                                                    </div>
                                                </div>
                                                <div className="p-5 space-y-2">
                                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                                        {menuData.featured.label}
                                                    </span>
                                                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-600 group-hover:underline underline-offset-2 transition-colors duration-300">
                                                        {menuData.featured.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 leading-relaxed">
                                                        {menuData.featured.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

type NavItem = { name: string; href?: string; hasDropdown?: boolean };

const menuItems: NavItem[] = [
    { name: 'Solutions', hasDropdown: true },
    { name: 'Training', hasDropdown: true },
    { name: 'ECAP', href: '/ecap' },
    { name: 'GCC & Enterprise', href: '/enterprises' },
    { name: 'About', href: '/about' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (name: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenDropdown(name);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    const lightBg = isScrolled || !!openDropdown;

    return (<>
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300 will-change-transform ${lightBg
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
                    : 'bg-transparent'
                }`}
            style={{ transform: 'translateZ(0)' }}
        >
            <div className="px-[5%] flex items-center h-14 transition-all duration-300 w-full relative">
                {/* Logo */}
                <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:flex lg:justify-start lg:items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={lightBg ? '/brand/axentia-logo.png' : '/brand/axentia-logo-white.png'}
                            alt="AxentiaAI"
                            width={360}
                            height={96}
                            className={`${lightBg ? 'h-6' : 'h-9'} w-auto transition-all duration-300`}
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center justify-center shrink-0">
                    {menuItems.map((item) => {
                        const isActive = openDropdown === item.name;
                        const baseCls = `flex items-center gap-1 px-3 xl:px-4 py-1.5 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200 ease-out ${
                            isActive
                                ? 'text-brand-600'
                                : lightBg ? 'text-slate-700 hover:text-brand-600' : 'text-white/90 hover:text-white'
                        }`;

                        if (item.hasDropdown) {
                            return (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button type="button" className={`${baseCls} cursor-default`}>
                                        {item.name}
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <Link key={item.name} href={item.href!} className={baseCls}>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Full-width dropdowns */}
                {(Object.keys(megaMenuData) as MenuKey[]).map((key) => (
                    <MegaMenuDropdown
                        key={`dropdown-${key}`}
                        menuKey={key}
                        isOpen={openDropdown === key}
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}

                {/* CTA Buttons & Mobile Toggle */}
                <div className="flex-1 flex justify-end items-center gap-2">
                    <div className="hidden lg:flex items-center gap-2">
                        <Link
                            href="/forum"
                            target="_blank"
                            className={`inline-flex items-center justify-center gap-1.5 font-semibold h-8 px-3.5 rounded-full text-xs transition-all duration-200 whitespace-nowrap ${
                                lightBg
                                    ? 'bg-yellow-400/15 border border-yellow-500/30 text-yellow-600 hover:bg-yellow-400/25'
                                    : 'bg-yellow-400/15 backdrop-blur-md border border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/25'
                            }`}
                        >
                            <Users className="w-3 h-3" />
                            Join Community
                        </Link>

                        <button
                            type="button"
                            onClick={() => setContactOpen(true)}
                            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold h-8 px-4 rounded-full shadow-md shadow-brand-600/25 text-xs transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap gap-1.5 cursor-pointer"
                        >
                            <MessageCircle className="w-3 h-3" />
                            Contact Us
                        </button>
                    </div>

                    <button
                        className={`lg:hidden p-1.5 ${lightBg ? 'text-slate-700' : 'text-white'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
                    >
                        <div className="px-[5%] py-6 space-y-5">
                            {menuItems.map((item) => {
                                if (item.hasDropdown) {
                                    return (
                                        <div key={item.name}>
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider">
                                                    {item.name}
                                                </h3>
                                                {megaMenuData[item.name as MenuKey]?.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center gap-3 p-2.5 ml-2 rounded-lg hover:bg-slate-50"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                                                        <div>
                                                            <span className="text-sm font-medium text-slate-700">{subItem.name}</span>
                                                            <p className="text-xs text-slate-400">{subItem.description}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={item.name} className="p-2.5">
                                        <Link
                                            href={item.href!}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-sm font-bold text-slate-700 uppercase tracking-wider hover:text-brand-600 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                );
                            })}
                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <Link
                                    href="/forum"
                                    target="_blank"
                                    className="w-full text-center bg-yellow-400/15 border border-yellow-500/30 text-yellow-600 hover:bg-yellow-400/25 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 inline-flex items-center justify-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Users className="w-4 h-4" />
                                    Join Community
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
                                    className="w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-brand-600/25 text-sm transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>

        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
    );
}
