'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export const ease = [0.16, 1, 0.3, 1] as const;

/* ─── ShinyText ─── */
export function ShinyText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(100deg, #F7C87A 0%, #F7C87A 40%, #ffffff 50%, #F7C87A 60%, #F7C87A 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
            {children}
        </motion.span>
    );
}

/* ─── GoldGradientText — static gold gradient (for light bg) ─── */
export function GoldGradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <span
            className={`font-[family-name:var(--font-playfair)] italic font-normal pl-[8px] ${className}`}
            style={{
                background: 'linear-gradient(to right, #F7C87A 0%, #F3B15F 50%, #E89B3A 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
        >
            {children}
        </span>
    );
}

/* ─── TypewriterText ─── */
export function TypewriterText({
    text,
    delay = 0.6,
    speed = 22,
}: {
    text: string;
    delay?: number;
    speed?: number;
}) {
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay * 1000);
        return () => clearTimeout(t);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayed.length >= text.length) return;
        const t = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(t);
    }, [started, displayed, text, speed]);

    return (
        <span>
            {displayed}
            {displayed.length < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[2px] h-[1em] bg-slate-400 ml-0.5 align-middle"
                />
            )}
        </span>
    );
}

/* ─── SolutionHero — dark B2B editorial. Nav stays visible. ─── */
export function SolutionHero({
    eyebrow,
    headingLead,
    headingAccent,
    subtext,
    ctaText,
    ctaHref,
    secondaryCtaText,
    secondaryCtaHref,
    image,
}: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    subtext: string;
    ctaText: string;
    ctaHref: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    image: string;
}) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-[#0a1628] text-white">
            {/* Base gradient wash */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(162,14,191,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(247,200,122,0.08), transparent 60%)',
                }}
            />
            {/* Engraved grid */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                }}
            />
            {/* Top rule */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            {/* Bottom edge fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0a1628]/70 to-[#0a1628] pointer-events-none" />

            <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Text column — home Hero styling */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="lg:col-span-6 flex flex-col items-start"
                >
                    {/* Eyebrow pill — matches home */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {eyebrow}
                        </span>
                    </motion.div>

                    {/* Heading — matches home font-black, leading 0.95, same gold gradient */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1] whitespace-normal"
                        style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.25rem)' }}
                    >
                        <span className="text-white">{headingLead}</span>
                        <br />
                        <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent whitespace-nowrap">
                            {headingAccent}
                        </span>
                    </motion.h1>

                    {/* Subtext — matches home sizing */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-xl leading-relaxed"
                    >
                        {subtext}
                    </motion.p>

                    {/* Divider — matches home */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                        className="h-px bg-gradient-to-r from-white/25 to-transparent max-w-md mt-8 mb-8 w-full origin-left"
                    />

                    {/* CTAs — matches home: white pill + ghost pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3 mb-12"
                    >
                        <a
                            href={ctaHref}
                            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors duration-200 rounded-full"
                        >
                            {ctaText}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        {secondaryCtaText && (
                            <a
                                href={secondaryCtaHref || '#'}
                                className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                            >
                                {secondaryCtaText}
                            </a>
                        )}
                    </motion.div>

                </motion.div>

                {/* Image column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.18, ease }}
                    className="lg:col-span-6 relative"
                >
                    {/* Corner frame marks */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-[#F7C87A]/50 pointer-events-none" />
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r border-[#F7C87A]/50 pointer-events-none" />

                    {/* Subtle glow */}
                    <div className="absolute -inset-10 bg-gradient-to-tr from-brand-600/20 via-transparent to-[#F7C87A]/10 blur-3xl pointer-events-none" />

                    {/* Image frame */}
                    <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
                        <motion.div
                            style={{ y: imgY, scale: imgScale }}
                            className="relative h-[460px] md:h-[540px] lg:h-[580px] will-change-transform"
                        >
                            <Image
                                src={image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {/* Tonal treatment — desaturate + cool cast */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/40 via-[#0a1628]/10 to-brand-900/30 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />
                        </motion.div>

                        {/* Caption plate */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="block w-6 h-px bg-[#F7C87A]" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#F7C87A]">
                                        {eyebrow}
                                    </span>
                                </div>
                                <span className="font-[family-name:var(--font-playfair)] italic text-sm text-white/50">
                                    Axentia · {new Date().getFullYear()}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── CountUp — rAF-driven number counter, respects prefix/suffix, pads leading zeros ─── */
function CountUp({
    value,
    start,
    duration = 1600,
}: {
    value: string;
    start: boolean;
    duration?: number;
}) {
    // Parse: leading non-digit prefix + number + trailing text
    const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return <>{value}</>;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const isFloat = numStr.includes('.');
    const decimals = isFloat ? numStr.split('.')[1].length : 0;
    // Preserve leading zeros only if integer and starts with 0 and length > 1 (e.g. "04")
    const padLen = !isFloat && numStr.startsWith('0') && numStr.length > 1 ? numStr.length : 0;

    const [display, setDisplay] = useState<number>(0);

    useEffect(() => {
        if (!start) return;
        const startTime = performance.now();
        let raf = 0;
        const tick = (now: number) => {
            const t = Math.min(1, (now - startTime) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(target * eased);
            if (t < 1) raf = requestAnimationFrame(tick);
            else setDisplay(target);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration]);

    const formatted = isFloat
        ? display.toFixed(decimals)
        : padLen
            ? Math.round(display).toString().padStart(padLen, '0')
            : Math.round(display).toString();

    return (
        <>
            {prefix}
            {formatted}
            {suffix}
        </>
    );
}

/* ─── StatsRow — 3 oversized italic numbers with count-up ─── */
export function StatsRow({ items }: { items: { value: string; title: string; desc: string }[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section ref={ref} className="bg-slate-100/50 py-20 md:py-24 border-y border-slate-200/60">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 25 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1, ease }}
                            className="flex flex-col"
                        >
                            <span className="font-[family-name:var(--font-playfair)] text-6xl italic font-medium text-brand-600 mb-4 leading-none tabular-nums">
                                <CountUp value={item.value} start={isInView} duration={1600 + i * 150} />
                            </span>
                            <h3 className="font-bold text-xl mb-2 text-slate-900">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── DarkFeatureBand — dark bg with side image + copy ─── */
export function DarkFeatureBand({
    image,
    imageLeft = true,
    heading,
    headingAccent,
    description,
    points,
}: {
    image: string;
    imageLeft?: boolean;
    heading: string;
    headingAccent: string;
    description: string;
    points: { icon: React.ReactNode; title: string; desc: string }[];
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <section ref={ref} className="bg-[#213145] py-24 md:py-32 text-white">
            <div
                className={`max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
                    imageLeft ? '' : 'md:[direction:rtl]'
                }`}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={isInView ? { opacity: 0.85, scale: 1 } : {}}
                    transition={{ duration: 0.9, ease }}
                    className="md:[direction:ltr]"
                >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                            src={image}
                            alt=""
                            fill
                            className="object-cover mix-blend-luminosity"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                    className="md:[direction:ltr]"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
                        {heading}{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300 text-[1.1em]">
                            {headingAccent}
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-300 mb-10 leading-relaxed">{description}</p>
                    <div className="space-y-6">
                        {points.map((p) => (
                            <div key={p.title} className="flex items-start gap-4">
                                <span className="text-accent-300 mt-1 shrink-0">{p.icon}</span>
                                <div>
                                    <h4 className="font-bold mb-1 text-white">{p.title}</h4>
                                    <p className="text-sm text-slate-400">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── Solution Form — split layout: image left (full height) + form right ─── */
export function SolutionForm({
    heading,
    headingAccent,
    subtext,
    objectives,
    defaultObjective,
    image = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
    imageCaption,
}: {
    heading: string;
    headingAccent?: string;
    subtext: string;
    objectives: string[];
    defaultObjective?: string;
    image?: string;
    imageCaption?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [objective, setObjective] = useState(defaultObjective || '');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const name = [firstName, lastName].filter(Boolean).join(' ').trim();
            const res = await fetch('/api/enterprise-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    company: 'n/a',
                    message: `Objective: ${objective || 'Not specified'}`,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Something went wrong.');
            setStatus('success');
            setFirstName('');
            setLastName('');
            setEmail('');
            setObjective(defaultObjective || '');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    return (
        <section id="request" ref={ref} className="py-24 md:py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_80px_-30px_rgba(11,28,48,0.2)]">
                    {/* Image column — full height */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                        className="relative min-h-[320px] lg:min-h-[640px]"
                    >
                        <Image
                            src={image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 45vw"
                        />
                        {/* Dark tonal overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/75 via-[#0a1628]/50 to-brand-900/60" />
                        {/* Top content */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between text-white">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="block w-8 h-px bg-accent-300" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-300">
                                        Senior architects
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl leading-[1.2] text-white mb-4 max-w-md">
                                    {imageCaption ||
                                        'Every briefing starts with a real conversation — not a form letter.'}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-white/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Response within one business day
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="p-8 md:p-12 lg:p-14"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3"
                        >
                            {heading}
                            {headingAccent && (
                                <>
                                    {' '}
                                    <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                                        {headingAccent}
                                    </span>
                                </>
                            )}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-slate-600 text-sm md:text-base mb-10"
                        >
                            {subtext}
                        </motion.p>

                        <form onSubmit={onSubmit} className="space-y-7" noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField label="First Name">
                                    <input
                                        required
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Jane"
                                        className={underlineInput}
                                    />
                                </FormField>
                                <FormField label="Last Name">
                                    <input
                                        required
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                        className={underlineInput}
                                    />
                                </FormField>
                            </div>
                            <FormField label="Corporate Email">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="jane@enterprise.com"
                                    className={underlineInput}
                                />
                            </FormField>
                            <FormField label="Primary Objective">
                                <select
                                    required
                                    value={objective}
                                    onChange={(e) => setObjective(e.target.value)}
                                    className={`${underlineInput} text-slate-700`}
                                >
                                    <option value="">Select an objective…</option>
                                    {objectives.map((o) => (
                                        <option key={o}>{o}</option>
                                    ))}
                                </select>
                            </FormField>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-lg font-bold text-base transition-colors disabled:opacity-60 shadow-lg shadow-brand-600/25 inline-flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? 'Submitting…' : 'Submit Request'}
                                </button>
                                <div className="flex items-center justify-center gap-4 mt-4">
                                    <a
                                        href="https://wa.me/919999999999"
                                        target="_blank"
                                        rel="noopener"
                                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition font-medium"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Or chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                            {status === 'success' && (
                                <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg text-sm">
                                    <div className="flex items-center gap-2 text-brand-700 font-semibold">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Thanks — our team will be in touch within one business day.
                                    </div>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                    {errorMsg}
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const underlineInput =
    'w-full bg-slate-50 border-0 border-b-2 border-slate-200 focus:border-brand-600 focus:ring-0 px-4 py-3 transition-colors outline-none text-slate-900';

function FormField({
    label,
    children,
    className = '',
}: {
    label: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="block text-sm font-semibold tracking-wide text-slate-900 mb-2">{label}</label>
            {children}
        </div>
    );
}
