'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const megaMenuData = {
    'Why AxentiaAI': {
        items: [
            { name: 'About Axentia.AI', href: '/about', description: 'Our story, mission, and the team behind the platform' },
            { name: 'Our Programs', href: '/programs', description: 'Three programs built for every stage of your career' },
            { name: 'Student Life', href: '/student-life', description: 'Community, culture, and learning beyond the classroom' },
            { name: 'Enterprises', href: '/enterprises', description: 'Build capability pipelines with Axentia.AI' },
        ],
        featured: {
            label: "OUR EDGE",
            title: "25+ Years of SAP Enterprise Delivery",
            description: "Built on Orane Consulting's legacy, real projects, real mentors, real outcomes.",
            href: "/about"
        }
    },
    'Programs': {
        items: [
            { name: 'DCAP, Career Accelerator', href: '/programs?tab=dcap', description: '10-month foundation training + paid apprenticeship' },
            { name: 'EAP, Enterprise Acceleration', href: '/programs?tab=eap', description: 'Advanced programme for DCAP graduates' },
            { name: 'Online Foundation', href: '/programs?tab=online', description: 'Self-paced SAP fundamentals (Upcoming)' },
            { name: 'Compare Programs', href: '/programs?tab=compare', description: 'Side-by-side comparison of all programs' },
            { name: 'Application Process', href: '/programs#apply', description: 'How to apply for DCAP in 4 steps' },
        ],
        featured: {
            label: "FLAGSHIP",
            title: "DCAP, Our Flagship Program",
            description: "4 months classroom + 6 months paid apprenticeship. This is how consultants are built.",
            href: "/programs?tab=dcap"
        }
    },
    'Student Life': {
        items: [
            { name: 'Student Life', href: '/student-life', description: 'Learning starts to feel real here' },
            { name: 'Learning Journey', href: '/student-life/learning-journey', description: 'Five phases from awareness to enterprise readiness' },
            { name: 'Culture & Activities', href: '/student-life/culture', description: 'Community, celebrations, and learning beyond the classroom' },
            { name: 'Join the Community', href: '/student-life#alumni', description: 'Connect with alumni and fellow students' },
        ],
        featured: {
            label: "SPOTLIGHT",
            title: "95% Placement Success Rate",
            description: "Our graduates join SAP practices across India and globally.",
            href: "/student-life"
        }
    },
    'Faculty': {
        items: [
            { name: 'Meet the Faculty', href: '/faculty', description: 'Program directors, domain experts, and industry mentors' },
            { name: 'Student Life', href: '/student-life', description: 'Learning starts to feel real here' },
            { name: 'Learning Journey', href: '/student-life/learning-journey', description: 'Five phases from awareness to enterprise readiness' },
            { name: 'Culture & Activities', href: '/student-life/culture', description: 'Community, celebrations, and learning beyond the classroom' },
        ],
        featured: {
            label: "FACULTY",
            title: "Learn From People Who Have Built Enterprise Systems",
            description: "Our faculty bring decades of real SAP delivery experience into every session.",
            href: "/faculty"
        }
    },
    'Enterprises': {
        items: [
            { name: 'For Enterprises', href: '/enterprises', description: 'Build capability pipelines with Axentia.AI' },
            { name: 'Talent Pipeline', href: '/enterprises#talent-pipeline', description: 'End-to-end workforce development model' },
            { name: 'Partnership Models', href: '/enterprises#partnerships', description: 'Apprenticeship collaborations and capability development' },
            { name: 'Work With Us', href: '/enterprises#contact', description: 'Start a conversation with our enterprise team' },
        ],
        featured: {
            label: "FOR BUSINESS",
            title: "Building Capability Together",
            description: "From talent pipelines to apprenticeship collaborations — partner with us to build your SAP workforce.",
            href: "/enterprises"
        }
    }
};

function MegaMenuDropdown({ menuKey, isOpen, onMouseEnter, onMouseLeave }: { menuKey: string; isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void }) {
    const menuData = megaMenuData[menuKey as keyof typeof megaMenuData];
    if (!menuData) return null;

    const createHeading = (text: string) => {
        if (text === 'Why AxentiaAI') return (<>Why <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">AxentiaAI</span></>);
        if (text === 'Programs') return (<>Our <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Programs</span></>);
        if (text === 'Student Life') return (<><span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Student</span> Life</>);
        if (text === 'Faculty') return (<>Our <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Faculty</span></>);
        if (text === 'Enterprises') return (<>For <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Enterprises</span></>);
        return text;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-black/40 z-40"
                        style={{ top: '64px', willChange: 'opacity', transform: 'translateZ(0)' }}
                        onMouseEnter={onMouseLeave}
                    />

                    {/* Dropdown panel */}
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top', willChange: 'transform, opacity' }}
                        className="fixed top-16 left-0 right-0 w-screen z-50 overflow-hidden"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <div className="bg-white border-b border-slate-200 shadow-xl">
                            <div className="px-[5%] py-10">
                                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                                    {/* Left: heading + links grid */}
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

                                    {/* Right: featured card */}
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

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const menuItems = [
        { name: 'Why AxentiaAI' },
        { name: 'Programs' },
        { name: 'Student Life' },
        { name: 'Faculty' },
        { name: 'Enterprises' },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300 will-change-transform ${
                isScrolled || openDropdown
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
                    : 'bg-transparent'
            }`}
            style={{ transform: 'translateZ(0)' }}
        >
            <div className="px-[5%] flex items-center justify-between h-16">
                <Link href="/" className="flex items-center">
                    <Image
                        src={(isScrolled || openDropdown) ? '/brand/axentia-logo.png' : '/brand/axentia-logo-white.png'}
                        alt="AxentiaAI"
                        width={360}
                        height={96}
                        className="h-7 w-auto transition-opacity duration-300"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(item.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 ease-out cursor-default ${
                                    openDropdown === item.name
                                        ? 'text-brand-600'
                                        : (isScrolled || openDropdown) ? 'text-slate-700 hover:text-brand-600' : 'text-white/90 hover:text-white'
                                }`}
                            >
                                {item.name}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    ))}
                    <Link
                        href="/forum"
                        className={`px-4 py-2 text-sm font-medium transition-all duration-200 ease-out ${
                            (isScrolled || openDropdown) ? 'text-slate-700 hover:text-brand-600' : 'text-white/90 hover:text-white'
                        }`}
                    >
                        Forum
                    </Link>
                </nav>

                {/* Full-width dropdowns positioned relative to viewport */}
                {menuItems.map((item) => (
                    <MegaMenuDropdown
                        key={`dropdown-${item.name}`}
                        menuKey={item.name}
                        isOpen={openDropdown === item.name}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}

                {/* CTA Button */}
                <div className="hidden xl:flex items-center">
                    <Link href="/contact" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold pl-6 pr-2 py-2 rounded-full shadow-lg shadow-brand-600/25 text-sm transition-all duration-200 inline-flex items-center gap-3">
                        Contact Us
                        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                            <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                        </span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`xl:hidden p-2 ${isScrolled ? 'text-slate-700' : 'text-white'}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="xl:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
                    >
                        <div className="px-[5%] py-6 space-y-5">
                            {menuItems.map((item) => (
                                <div key={item.name}>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider">
                                            {item.name}
                                        </h3>
                                        {megaMenuData[item.name as keyof typeof megaMenuData]?.items.map((subItem) => (
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
                            ))}
                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <Link
                                    href="/forum"
                                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">Community Forum</span>
                                        <p className="text-xs text-slate-400">Join discussions with fellow consultants</p>
                                    </div>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-brand-600/25 text-sm transition-all duration-200 inline-flex items-center justify-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
