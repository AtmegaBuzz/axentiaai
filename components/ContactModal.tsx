'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setStatus('idle');
        setErrorMsg('');
    };

    const handleClose = () => {
        onClose();
        // Reset after animation completes
        setTimeout(resetForm, 300);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Something went wrong.');
                setStatus('error');
                return;
            }

            setStatus('success');
        } catch {
            setErrorMsg('Network error. Please try again.');
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 px-6 py-5">
                            <h2 className="text-xl font-bold text-white">Get in Touch</h2>
                            <p className="text-sm text-white/70 mt-0.5">We&apos;d love to hear from you</p>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5">
                            {status === 'success' ? (
                                <motion.div
                                    className="flex flex-col items-center justify-center py-8 text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                        <CheckCircle className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">Message Received!</h3>
                                    <p className="text-sm text-slate-500 mt-1 max-w-xs">
                                        Thank you for reaching out. We will get back to you shortly.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="mt-6 px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Email <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@company.com"
                                                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-600 mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-600 mb-1.5">
                                            Message <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            required
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tell us about your inquiry..."
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Error */}
                                    {status === 'error' && (
                                        <motion.div
                                            className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-3.5 py-2.5"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {errorMsg}
                                        </motion.div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full shadow-md shadow-brand-600/25 transition-all cursor-pointer"
                                    >
                                        {status === 'loading' ? (
                                            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Send className="w-3.5 h-3.5" />
                                        )}
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
