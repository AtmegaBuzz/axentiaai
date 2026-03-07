'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Target, Brain, BookOpen, GraduationCap, Cloud, Shield, Users, Award, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const megaMenuData = {
    'Why AxentiaAI': {
        categories: [
            {
                title: 'About Us',
                items: [
                    { name: 'Our Mission', href: '/about', icon: Target, description: 'Transforming careers through AI education' },
                    { name: 'Industry Partners', href: '/partners', icon: Users, description: 'Leading companies we collaborate with' },
                    { name: 'Success Stories', href: '/success', icon: Award, description: 'Real outcomes from our programs' },
                    { name: 'Campus Life', href: '/campus', icon: GraduationCap, description: 'Experience our learning environment' },
                ]
            }
        ]
    },
    'Academics': {
        categories: [
            {
                title: 'Core Programs',
                items: [
                    { name: 'AI & Machine Learning', href: '/programs/ai-ml', icon: Brain, description: 'Deep learning and neural networks' },
                    { name: 'SAP Certification', href: '/programs/sap', icon: Award, description: 'Enterprise SAP consulting track' },
                    { name: 'Data Science', href: '/programs/data-science', icon: TrendingUp, description: 'Analytics and business intelligence' },
                    { name: 'Full Stack Development', href: '/programs/fullstack', icon: BookOpen, description: 'End-to-end web development' },
                ]
            },
            {
                title: 'Specialized Tracks',
                items: [
                    { name: 'Cloud Computing', href: '/programs/cloud', icon: Cloud, description: 'AWS, Azure, and GCP mastery' },
                    { name: 'Cybersecurity', href: '/programs/security', icon: Shield, description: 'Enterprise security and compliance' },
                ]
            }
        ]
    },
    'Enterprises': {
        categories: [
            {
                title: 'Solutions',
                items: [
                    { name: 'Corporate Training', href: '/enterprises/training', icon: GraduationCap, description: 'Upskill your workforce' },
                    { name: 'Hiring Partners', href: '/enterprises/hiring', icon: Users, description: 'Access our talent pipeline' },
                    { name: 'Custom Programs', href: '/enterprises/custom', icon: Target, description: 'Tailored curriculum for your needs' },
                    { name: 'ROI Calculator', href: '/enterprises/roi', icon: DollarSign, description: 'Measure training impact' },
                ]
            }
        ]
    },
    'Outcomes': {
        categories: [
            {
                title: 'Results',
                items: [
                    { name: 'Placement Stats', href: '/outcomes/placements', icon: TrendingUp, description: '95% placement rate within 6 months' },
                    { name: 'Alumni Network', href: '/outcomes/alumni', icon: Users, description: 'Connect with 5000+ graduates' },
                    { name: 'Career Paths', href: '/outcomes/careers', icon: Target, description: 'Track your growth trajectory' },
                    { name: 'Salary Reports', href: '/outcomes/salaries', icon: DollarSign, description: 'Average 40% salary increase' },
                ]
            }
        ]
    }
};

function MegaMenuDropdown({ menuKey, isOpen }: { menuKey: string; isOpen: boolean }) {
    const menuData = megaMenuData[menuKey as keyof typeof megaMenuData];
    
    if (!menuData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.225, ease: 'easeOut' }}
                    className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl z-50"
                >
                    <div className="container mx-auto px-4 md:px-6 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {menuData.categories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                                        {category.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {category.items.map((item) => {
                                            const IconComponent = item.icon;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                                                        <IconComponent className="w-5 h-5 text-brand-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
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
                                            {megaMenuData[item.name as keyof typeof megaMenuData]?.categories.map((category, catIndex) => (
                                                <div key={catIndex} className="space-y-2">
                                                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-4">
                                                        {category.title}
                                                    </h4>
                                                    {category.items.map((subItem) => {
                                                        const IconComponent = subItem.icon;
                                                        return (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="flex items-center gap-3 p-3 ml-4 rounded-lg hover:bg-slate-50"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                <IconComponent className="w-4 h-4 text-brand-600" />
                                                                <span className="text-sm font-medium text-slate-700">
                                                                    {subItem.name}
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
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