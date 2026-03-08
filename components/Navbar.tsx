'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const megaMenuData = {
    'Why AxentiaAI': {
        items: [
            { name: 'Why AxentiaAI', href: '/about', description: 'Your partner for future-ready workforce skills' },
            { name: 'How it works', href: '/how-it-works', description: 'Identify, close, and prevent skills gaps' },
            { name: 'The Apprenticeship Levy', href: '/apprenticeship-levy', description: 'Your guide to funding workforce skills training' },
            { name: 'Case studies', href: '/case-studies', description: 'Explore success stories from our programs' },
        ],
        featured: {
            label: "NEWS",
            title: "AxentiaAI Launches New AI Campus",
            description: "Discover our state-of-the-art learning environment",
            href: "/about"
        }
    },
    'Programs': {
        items: [
            { name: 'SAP Consulting Apprenticeship', href: '/programs/sap-consulting', description: 'Enterprise SAP consulting career track' },
            { name: 'Data & AI for Enterprise', href: '/programs/data-ai-enterprise', description: 'Deep learning and AI for business impact' },
            { name: 'ERP Business Analyst Track', href: '/programs/erp-analyst', description: 'End-to-end business process analysis' },
            { name: 'Program Overview', href: '/programs', description: 'Explore our full range of programs' },
            { name: 'Curriculum', href: '/programs/curriculum', description: 'Detailed course structure and modules' },
            { name: 'Tools Taught', href: '/programs/tools', description: 'Industry-standard tools and platforms' },
            { name: 'Mentors', href: '/programs/mentors', description: 'Learn from experienced industry professionals' },
            { name: 'Outcomes', href: '/programs/outcomes', description: 'Real results from our latest cohorts' },
        ],
        featured: {
            label: "GUIDE",
            title: "From Learner to AI Professional",
            description: "Download our career transformation playbook",
            href: "/programs"
        }
    },
    'Student Life': {
        items: [
            { name: 'Campus Experience', href: '/student-life/campus', description: 'Discover our learning environment' },
            { name: 'Community', href: '/student-life/community', description: 'Connect with fellow learners' },
            { name: 'Events & Workshops', href: '/student-life/events', description: 'Hands-on sessions and networking' },
            { name: 'Student Stories', href: '/student-life/stories', description: 'Real experiences from our students' },
        ],
        featured: {
            label: "SPOTLIGHT",
            title: "A Day in the Life at AxentiaAI",
            description: "See what it's like to learn with us",
            href: "/student-life"
        }
    },
    'Faculty': {
        items: [
            { name: 'Our Instructors', href: '/faculty/instructors', description: 'Industry experts and thought leaders' },
            { name: 'Advisory Board', href: '/faculty/advisory', description: 'Guiding our academic excellence' },
            { name: 'Research', href: '/faculty/research', description: 'Cutting-edge AI and tech research' },
            { name: 'Guest Speakers', href: '/faculty/speakers', description: 'Learn from global industry leaders' },
        ],
        featured: {
            label: "FEATURE",
            title: "Meet Our World-Class Faculty",
            description: "Experts from leading tech companies",
            href: "/faculty"
        }
    },
    'Enterprises': {
        items: [
            { name: 'Hire Enterprise-Ready Talent', href: '/enterprises/hiring', description: 'Access our skilled talent pipeline' },
            { name: 'Corporate Partnerships', href: '/enterprises/partnerships', description: 'Strategic collaboration opportunities' },
            { name: 'Talent Pipeline Model', href: '/enterprises/talent-pipeline', description: 'End-to-end workforce development' },
            { name: 'Custom Enterprise Training', href: '/enterprises/training', description: 'Tailored programs for your needs' },
            { name: 'Case Studies', href: '/enterprises/case-studies', description: 'See how companies measure impact' },
            { name: 'Enterprise Partners', href: '/enterprises/partners', description: 'Our corporate partner network' },
            { name: 'Enterprise Contact Form', href: '/enterprises/contact', description: 'Get in touch with our team' },
        ],
        featured: {
            label: "REPORT",
            title: "Enterprise AI Training ROI Report 2026",
            description: "See how companies measure training impact",
            href: "/enterprises"
        }
    }
};

function MegaMenuDropdown({ menuKey, isOpen, onMouseEnter, onMouseLeave }: { menuKey: string; isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void }) {
    const menuData = megaMenuData[menuKey as keyof typeof megaMenuData];
    if (!menuData) return null;

    const createHeading = (text: string) => {
        if (text === 'Why AxentiaAI') {
            return (<>Why <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">AxentiaAI</span></>);
        }
        if (text === 'Programs') {
            return (<>Our <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Programs</span></>);
        }
        if (text === 'Student Life') {
            return (<><span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Student</span> Life</>);
        }
        if (text === 'Faculty') {
            return (<>Our <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Faculty</span></>);
        }
        if (text === 'Enterprises') {
            return (<>For <span className="bg-brand-600/10 px-2 py-1 rounded-md text-brand-600 font-bold">Enterprises</span></>);
        }
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
                        style={{ top: '64px' }}
                        onMouseEnter={onMouseLeave}
                    />
                    
                    {/* Dropdown panel */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed top-16 left-0 right-0 w-screen z-50 overflow-hidden"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <div className="bg-white border-b border-slate-200 shadow-xl">
                            <div className="container mx-auto px-4 md:px-8 py-10">
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
                                                {/* Image placeholder */}
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
        window.addEventListener('scroll', handleScroll);
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled || openDropdown
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="AxentiaAI" width={360} height={96} className="h-24 w-auto" priority />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(item.name)}
                            onMouseLeave={() => handleMouseLeave()}
                        >
                            <button
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 ease-out cursor-default ${
                                    openDropdown === item.name
                                        ? 'text-brand-600'
                                        : ((isScrolled || openDropdown) ? 'text-slate-700 hover:text-brand-600' : 'text-white/90 hover:text-white')
                                }`}
                            >
                                {item.name}
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    ))}
                </nav>
                
                {/* Full-width dropdowns positioned relative to viewport */}
                {menuItems.map((item) => (
                    <MegaMenuDropdown 
                        key={`dropdown-${item.name}`}
                        menuKey={item.name} 
                        isOpen={openDropdown === item.name}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={() => handleMouseLeave()}
                    />
                ))}

                {/* CTA Buttons */}
                <div className="hidden xl:flex items-center">
                    <Link href="/contact" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-brand-600/25 text-sm transition-all duration-200 inline-flex items-center gap-2">
                        Contact Us
                        <ArrowRight className="w-4 h-4" />
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="xl:hidden overflow-hidden bg-white border-b border-slate-200 shadow-xl"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-5">
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
                            <div className="pt-4 border-t border-slate-200">
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
