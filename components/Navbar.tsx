'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    {
        name: 'Why AxentiaAI',
        dropdown: [
            { name: 'Why AxentiaAI', href: '#why' },
            { name: 'Our Mission', href: '/about' },
            { name: 'Case Studies', href: '/enterprises#case-studies' },
        ],
    },
    {
        name: 'Academics',
        dropdown: [
            { name: 'SAP Consulting Apprenticeship', href: '/programs#sap' },
            { name: 'Data & AI for Enterprise', href: '/programs#ai' },
            { name: 'ERP Business Analyst Track', href: '/programs#erp' },
            { name: 'All Programs', href: '/programs' },
        ],
    },
    { name: 'Enterprises', href: '/enterprises' },
    { name: 'Outcomes', href: '/outcomes' },
];

function DropdownMenu({ items, isOpen }: { items: { name: string; href: string }[]; isOpen: boolean }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50"
                >
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
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
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <Image src="/logo.png" alt="Axentia.AI" width={160} height={40} className="h-10 w-auto" priority />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.dropdown ? (
                                <button
                                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                                        isScrolled
                                            ? 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {item.name}
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg block ${
                                        isScrolled
                                            ? 'text-slate-600 hover:text-brand-600 hover:bg-brand-50'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            )}
                            {item.dropdown && (
                                <DropdownMenu items={item.dropdown} isOpen={openDropdown === item.name} />
                            )}
                        </div>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Button variant="primary" size="sm" className="bg-brand-600 hover:bg-brand-700 text-white">
                        Apply Now
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden p-2 ${isScrolled ? 'text-slate-600' : 'text-white'}`}
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
                        className="absolute top-full left-0 w-full bg-white border-t border-slate-200 p-4 flex flex-col gap-2 md:hidden shadow-xl"
                    >
                        {navItems.map((item) => (
                            <div key={item.name}>
                                {item.dropdown ? (
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 pt-3">{item.name}</p>
                                        {item.dropdown.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block text-sm font-medium text-slate-700 p-2 px-3 hover:bg-brand-50 rounded-lg"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className="block text-base font-medium text-slate-700 p-2 hover:bg-brand-50 rounded-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Button variant="primary" className="w-full mt-2" onClick={() => setMobileMenuOpen(false)}>
                            Apply Now
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
