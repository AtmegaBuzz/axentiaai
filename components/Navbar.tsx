'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Users, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navHeadings = ['ENTERPRISE', 'ACADEMIES', "WHO IT'S FOR", 'WHY AXENTIA.AI'];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isCommunityHovered, setIsCommunityHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300 will-change-transform ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
                    : 'bg-transparent'
                }`}
            style={{ transform: 'translateZ(0)' }}
        >
            <div className="px-[5%] flex items-center h-14 transition-all duration-300 w-full relative">
                {/* Logo — centered on mobile, left-aligned on desktop */}
                <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:flex lg:justify-start lg:items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={isScrolled ? '/brand/axentia-logo.png' : '/brand/axentia-logo-white.png'}
                            alt="AxentiaAI"
                            width={360}
                            height={96}
                            className={`${isScrolled ? 'h-6' : 'h-9'} w-auto transition-all duration-300`}
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center justify-center shrink-0">
                    {navHeadings.map((heading) => (
                        <span
                            key={heading}
                            className={`px-3 xl:px-4 py-1.5 text-xs font-semibold tracking-wider select-none whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                                isScrolled ? 'text-slate-600 hover:text-brand-600' : 'text-white/80 hover:text-white'
                            }`}
                        >
                            {heading}
                        </span>
                    ))}
                </nav>

                {/* CTA Buttons & Mobile Toggle */}
                <div className="flex-1 flex justify-end items-center gap-2">
                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-2">
                        {/* Join Community with hover Play button */}
                        <div
                            className="relative flex items-center overflow-visible h-8"
                            onMouseEnter={() => setIsCommunityHovered(true)}
                            onMouseLeave={() => setIsCommunityHovered(false)}
                        >
                            <Link
                                href="/forum"
                                target="_blank"
                                className={`inline-flex items-center justify-center gap-1.5 font-semibold h-full px-3.5 rounded-full text-xs transition-all duration-200 whitespace-nowrap ${
                                    isScrolled
                                        ? 'bg-yellow-400/15 border border-yellow-500/30 text-yellow-600 hover:bg-yellow-400/25'
                                        : 'bg-yellow-400/15 backdrop-blur-md border border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/25'
                                }`}
                            >
                                <Users className="w-3 h-3" />
                                Join Community
                            </Link>
                            <AnimatePresence>
                                {isCommunityHovered && (
                                    <motion.button
                                        type="button"
                                        aria-label="Scroll to community video"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById('community-video')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        initial={{ scale: 0, opacity: 0, x: -80 }}
                                        animate={{ scale: 1, opacity: 1, x: 0 }}
                                        exit={{ scale: 0, opacity: 0, x: -80 }}
                                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.88 }}
                                        style={{ transformOrigin: '0% 50%' }}
                                        className="ml-1.5 flex-shrink-0 flex items-center justify-center gap-1 px-3.5 h-full bg-yellow-400 text-slate-900 rounded-full hover:bg-yellow-300 shadow-lg cursor-pointer font-semibold text-xs"
                                    >
                                        <Play className="w-3 h-3 fill-current flex-shrink-0" />
                                        Play
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* AI Discovery Workshop */}
                        <Link
                            href="/programs#apply"
                            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold h-8 px-4 rounded-full shadow-md shadow-brand-600/25 text-xs transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
                        >
                            AI Discovery Workshop
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`lg:hidden p-1.5 ${isScrolled ? 'text-slate-700' : 'text-white'}`}
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
                        <div className="px-[5%] py-6 space-y-2">
                            {navHeadings.map((heading) => (
                                <div key={heading} className="p-2.5">
                                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">{heading}</span>
                                </div>
                            ))}
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
                                <Link
                                    href="/programs#apply"
                                    className="w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-brand-600/25 text-sm transition-all duration-200 inline-flex items-center justify-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    AI Discovery Workshop
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
