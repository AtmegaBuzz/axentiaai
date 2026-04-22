'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2, Plus, Minus } from 'lucide-react';

export const ease = [0.16, 1, 0.3, 1] as const;

/* Detect mobile viewport */
export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, [breakpoint]);
    return isMobile;
}

/* ─── TrainingHero — dark full-bleed image, GCC feel ─── */
export function TrainingHero({
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
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '15%']);
    const bgScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '-12%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.85], isMobile ? [1, 1] : [1, 0]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen overflow-hidden bg-black text-white flex items-center"
        >
            <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </motion.div>
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative max-w-screen-2xl mx-auto w-full px-6 md:px-12 pt-36 md:pt-40 pb-24"
            >
                <div className="max-w-3xl">
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

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        className="font-black tracking-tight leading-[1.04]"
                        style={{ fontSize: 'clamp(2rem, 4.6vw, 3.75rem)' }}
                    >
                        <span className="block md:whitespace-nowrap text-white">{headingLead}</span>
                        <span className="block mt-2">
                            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                                {headingAccent}
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-sm md:text-base text-white/65 max-w-2xl leading-relaxed"
                    >
                        {subtext}
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
                        className="h-px bg-gradient-to-r from-white/25 to-transparent max-w-md mt-8 mb-8 origin-left"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row flex-wrap gap-3"
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
                                target={secondaryCtaHref?.startsWith('http') ? '_blank' : undefined}
                                rel={secondaryCtaHref?.startsWith('http') ? 'noopener' : undefined}
                                className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors duration-200 rounded-full"
                            >
                                {secondaryCtaText}
                            </a>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

/* ─── FAQ accordion item ─── */
export function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-200">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 text-left"
            >
                <span className="text-base md:text-lg font-semibold text-slate-900 pr-6">{q}</span>
                <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-colors ${
                        open ? 'bg-brand-600 text-white border-brand-600' : 'text-slate-500'
                    }`}
                >
                    {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
            >
                <p className="pb-5 text-slate-600 leading-relaxed text-sm md:text-base">{a}</p>
            </motion.div>
        </div>
    );
}

/* ─── FAQ section wrapper ─── */
export function FAQSection({
    heading,
    headingAccent,
    faqs,
}: {
    heading: string;
    headingAccent: string;
    faqs: { q: string; a: string }[];
}) {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-8 xl:px-12 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-10 text-center">
                    {heading}{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                        {headingAccent}
                    </span>
                </h2>
                <div className="border-t border-slate-200">
                    {faqs.map((faq) => (
                        <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── Final CTA band — dark, matches /solutions bottom ─── */
export function FinalCTA({
    heading,
    headingAccent,
    subtext,
    primaryText,
    primaryHref,
    secondaryText,
    secondaryHref,
}: {
    heading: string;
    headingAccent: string;
    subtext: string;
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    secondaryHref: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <section ref={ref} className="relative overflow-hidden bg-[#0a1628] text-white py-20 md:py-28">
            <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-brand-600/25 blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-accent-300/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-5 max-w-3xl mx-auto"
                >
                    {heading}{' '}
                    <span className="font-[family-name:var(--font-playfair)] italic font-normal text-accent-300 text-[1.1em]">
                        {headingAccent}
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {subtext}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
                >
                    <a
                        href={primaryHref}
                        className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-7 text-sm hover:bg-slate-100 transition-colors rounded-full"
                    >
                        {primaryText}
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href={secondaryHref}
                        target={secondaryHref.startsWith('http') ? '_blank' : undefined}
                        rel={secondaryHref.startsWith('http') ? 'noopener' : undefined}
                        className="inline-flex items-center justify-center gap-2 bg-white/0 border border-white/20 text-white font-semibold py-3 px-7 text-sm hover:bg-white/5 transition-colors rounded-full"
                    >
                        {secondaryHref.startsWith('http') && <MessageCircle className="w-4 h-4" />}
                        {secondaryText}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── Simple enquiry form — split full-height ─── */
const inputCls =
    'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition';

export function TrainingForm({
    heading,
    headingAccent,
    eyebrow,
    subtext,
    image,
    imageCaption,
    extraSelect,
    programmeLabel = 'Training enquiry',
}: {
    heading: string;
    headingAccent: string;
    eyebrow: string;
    subtext: string;
    image: string;
    imageCaption?: string;
    extraSelect?: { label: string; options: string[] };
    programmeLabel?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [extra, setExtra] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const composed = [
                `Programme: ${programmeLabel}`,
                teamSize && `Team size: ${teamSize}`,
                extra && extraSelect && `${extraSelect.label}: ${extra}`,
                message && `\n${message}`,
            ]
                .filter(Boolean)
                .join('\n');
            const res = await fetch('/api/enterprise-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, company, message: composed }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Something went wrong.');
            setStatus('success');
            setName('');
            setCompany('');
            setEmail('');
            setTeamSize('');
            setExtra('');
            setMessage('');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    return (
        <section
            id="enquire"
            ref={ref}
            className="relative lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 flex items-center px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-24"
            >
                <div className="w-full max-w-xl mx-auto lg:mx-0">
                    <div className="mb-4">
                        <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8A29AC] border border-[#8A29AC]/20 bg-[#8A29AC]/8">
                            {eyebrow}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                        {heading}{' '}
                        <span className="font-[family-name:var(--font-playfair)] italic font-normal bg-gradient-to-r from-[#8A29AC] to-[#C010DA] bg-clip-text text-transparent">
                            {headingAccent}
                        </span>
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base mb-10">{subtext}</p>

                    <form onSubmit={onSubmit} className="space-y-5" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label="Full name" required>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Company" required>
                                <input
                                    required
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Organisation"
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                        <Field label="Work email" required>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Team size">
                            <select
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value)}
                                className={`${inputCls} text-slate-700`}
                            >
                                <option value="">Select range</option>
                                <option>6–15</option>
                                <option>16–25</option>
                                <option>26–50</option>
                                <option>51–100</option>
                                <option>100+</option>
                            </select>
                        </Field>
                        {extraSelect && (
                            <Field label={extraSelect.label}>
                                <select
                                    value={extra}
                                    onChange={(e) => setExtra(e.target.value)}
                                    className={`${inputCls} text-slate-700`}
                                >
                                    <option value="">Select</option>
                                    {extraSelect.options.map((o) => (
                                        <option key={o}>{o}</option>
                                    ))}
                                </select>
                            </Field>
                        )}
                        <Field label="Message">
                            <textarea
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Any context or questions…"
                                className={`${inputCls} resize-none`}
                            />
                        </Field>
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white py-4 rounded-lg font-bold text-base transition-colors shadow-lg shadow-brand-600/25 inline-flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? 'Sending…' : 'Request a programme outline'}
                                {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
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
                                    Thanks — we&apos;ll respond within one business day.
                                </div>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                {errorMsg}
                            </div>
                        )}
                    </form>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative min-h-[320px] lg:min-h-screen"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/65 via-[#0a1628]/40 to-brand-900/55" />
                {imageCaption && (
                    <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-end text-white">
                        <p className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-white max-w-lg">
                            {imageCaption}
                        </p>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold tracking-wide text-slate-700 mb-2">
                {label} {required && <span className="text-brand-600">*</span>}
            </label>
            {children}
        </div>
    );
}
