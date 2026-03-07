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
            { name: 'Our Mission', href: '/about', description: 'Transforming careers through AI education' },
            { name: 'Industry Partners', href: '/partners', description: 'Leading companies we collaborate with' },
            { name: 'Success Stories', href: '/success', description: 'Real outcomes from our programs' },
            { name: 'Campus Life', href: '/campus', description: 'Experience our learning environment' },
            { name: 'Faculty Excellence', href: '/faculty', description: 'World-class instructors and mentors' },
            { name: 'Innovation Labs', href: '/labs', description: 'Cutting-edge research and development' },
        ],
        featured: {
            label: "NEWS",
            title: "AxentiaAI Launches New AI Campus",
            description: "Discover our state-of-the-art learning environment",
            href: "/about"
        }
    },
    'Academics': {
        items: [
            { name: 'AI & Machine Learning', href: '/programs/ai-ml', description: 'Deep learning and neural networks' },
            { name: 'SAP Certification', href: '/programs/sap', description: 'Enterprise SAP consulting track' },
            { name: 'Data Science', href: '/programs/data-science', description: 'Analytics and business intelligence' },
            { name: 'Full Stack Development', href: '/programs/fullstack', description: 'End-to-end web development' },
            { name: 'Cloud Computing', href: '/programs/cloud', description: 'AWS, Azure, and GCP mastery' },
            { name: 'Cybersecurity', href: '/programs/security', description: 'Enterprise security and compliance' },
        ],
        featured: {
            label: "GUIDE",
            title: "From Learner to AI Professional",
            description: "Download our career transformation playbook",
            href: "/programs"
        }
    },
    'Enterprises': {
        items: [
            { name: 'Corporate Training', href: '/enterprises/training', description: 'Upskill your workforce' },
            { name: 'Hiring Partners', href: '/enterprises/hiring', description: 'Access our talent pipeline' },
            { name: 'Custom Programs', href: '/enterprises/custom', description: 'Tailored curriculum for your needs' },
            { name: 'ROI Calculator', href: '/enterprises/roi', description: 'Measure training impact' },
            { name: 'Consulting Services', href: '/enterprises/consulting', description: 'Strategic AI implementation guidance' },
            { name: 'Partnership Program', href: '/enterprises/partnership', description: 'Long-term collaboration opportunities' },
        ],
        featured: {
            label: "REPORT",
            title: "Enterprise AI Training ROI Report 2026",
            description: "See how companies measure training impact",
            href: "/enterprises"
        }
    },
    'Outcomes': {
        items: [
            { name: 'Placement Stats', href: '/outcomes/placements', description: '95% placement rate within 6 months' },
            { name: 'Alumni Network', href: '/outcomes/alumni', description: 'Connect with 5000+ graduates' },
            { name: 'Career Paths', href: '/outcomes/careers', description: 'Track your growth trajectory' },
            { name: 'Salary Reports', href: '/outcomes/salaries', description: 'Average 40% salary increase' },
            { name: 'Success Stories', href: '/outcomes/stories', description: 'Inspiring graduate journeys' },
            { name: 'Industry Recognition', href: '/outcomes/recognition', description: 'Awards and achievements' },
        ],
        featured: {
            label: "SPOTLIGHT",
            title: "Graduate Success: 95% Placement Rate",
            description: "Real outcomes from our latest cohort",
            href: "/outcomes"
        }
    }
};

function MegaMenuDropdown({ menuKey, isOpen }: { menuKey: string; isOpen: boolean }) {
    const menuData = megaMenuData[menuKey as keyof typeof megaMenuData];
    
    if (!menuData) return null;

    // Create the heading with highlighted brand word
    const createHeading = (text: string) => {
        if (text === 'Why AxentiaAI') {
            return (
                <>
                    Why <span className="bg-[#c026d3]/10 px-2 py-1 rounded-md text-[#c026d3] font-bold">AxentiaAI</span>
                </>
            );
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
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-black/40 z-40"
                    />
                    
                    {/* Dropdown container with height animation */}
                    <motion.div
                        initial={{ gridTemplateRows: "0fr" }}
                        animate={{ gridTemplateRows: "1fr" }}
                        exit={{ gridTemplateRows: "0fr" }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        className="absolute top-full left-0 w-full z-50 grid"
                    >
                        <div className="overflow-hidden">
                            <div className="bg-white border-b border-slate-200 shadow-xl">
                                <div className="container mx-auto px-4 md:px-6 py-12">
                                    {/* 2-column grid layout */}
                                    <div className="grid grid-cols-[2fr_1fr] gap-12">
                                        {/* Left column */}
                                        <div className="space-y-8">
                                            {/* Heading */}
                                            <h2 className="text-3xl font-bold text-slate-900">
                                                {createHeading(menuKey)}
                                            </h2>
                                            
                                            {/* 2-column grid of links */}
                                            <div className="grid grid-cols-2 gap-6">
                                                {menuData.items.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="group block space-y-2 p-4 rounded-lg hover:bg-slate-50 transition-all duration-300"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-base font-medium text-slate-900 group-hover:text-[#c026d3] group-hover:underline transition-all duration-300">
                                                                {item.name}
                                                            </h3>
                                                            <ArrowRight className="w-4 h-4 text-[#c026d3] opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300" />
                                                        </div>
                                                        <p className="text-sm text-slate-500 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Right column - Featured content */}
                                        <div className="border-l border-slate-200 pl-12">
                                            <Link
                                                href={menuData.featured.href}
                                                className="group block p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300"
                                            >
                                                {/* Featured image placeholder */}
                                                <div className="w-full h-32 bg-gradient-to-br from-[#c026d3]/20 to-[#c026d3]/10 rounded-lg mb-4 flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-[#c026d3]/20 rounded-lg flex items-center justify-center">
                                                        <div className="w-6 h-6 bg-[#c026d3] rounded"></div>
                                                    </div>
                                                </div>
                                                
                                                {/* Featured content */}
                                                <div className="space-y-2">
                                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                        {menuData.featured.label}
                                                    </div>
                                                    <h3 className="text-lg font-medium text-slate-900 group-hover:underline transition-all duration-300">
                                                        {menuData.featured.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 leading-relaxed">
                                                        {menuData.featured.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
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
        { name: 'Why AxentiaAI', hasDropdown: true },
        { name: 'Academics', hasDropdown: true },
        { name: 'Enterprises', hasDropdown: true },
        { name: 'Outcomes', hasDropdown: true },
        { name: 'Forum', href: '/forum', hasDropdown: false },
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
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image 
                        src="/logo.png" 
                        alt="AxentiaAI" 
                        width={160} 
                        height={40} 
                        className="h-10 w-auto" 
                        priority 
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden xl:flex items-center">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                            onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                        >
                            {item.hasDropdown ? (
                                <button
                                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-225 ease-out ${
                                        isScrolled
                                            ? 'text-slate-700 hover:text-brand-600'
                                            : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-225 ease-out ${
                                        isScrolled
                                            ? 'text-slate-700 hover:text-brand-600'
                                            : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            )}
                            
                            {item.hasDropdown && (
                                <MegaMenuDropdown menuKey={item.name} isOpen={openDropdown === item.name} />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Side Buttons */}
                <div className="hidden xl:flex items-center gap-3">
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className={`transition-all duration-225 ease-out ${
                            isScrolled
                                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                    >
                        Sign In
                    </Button>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/25"
                    >
                        Apply Now
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`xl:hidden p-2 transition-colors duration-225 ease-out ${
                        isScrolled ? 'text-slate-700' : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.225, ease: 'easeOut' }}
                        className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-6">
                            {menuItems.map((item) => (
                                <div key={item.name}>
                                    {item.hasDropdown ? (
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider">
                                                {item.name}
                                            </h3>
                                            {megaMenuData[item.name as keyof typeof megaMenuData]?.items.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block p-3 ml-4 rounded-lg hover:bg-slate-50"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <div className="text-sm font-medium text-slate-700">
                                                        {subItem.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-1">
                                                        {subItem.description}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            className="block text-base font-medium text-slate-700 py-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            
                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <Button 
                                    variant="secondary" 
                                    className="w-full" 
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Button>
                                <Button 
                                    variant="primary" 
                                    className="w-full bg-brand-600 hover:bg-brand-700" 
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Apply Now
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}