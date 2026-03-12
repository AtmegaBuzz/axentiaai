'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export function SubscribeForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmed = email.trim();

        // Client-side basic check
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmed }),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage("You're on the list! We'll keep you posted.");
            } else if (res.status === 409) {
                setStatus('duplicate');
                setMessage(data.error ?? "You're already subscribed.");
            } else {
                setStatus('error');
                setMessage(data.error ?? 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    }

    // ── Success state ─────────────────────────────────────────────
    if (status === 'success' || status === 'duplicate') {
        return (
            <div className="flex items-start gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                <span className="text-2xl mt-0.5">{status === 'success' ? '✅' : '👋'}</span>
                <div>
                    <p className="text-white font-semibold text-sm">{message}</p>
                    {status === 'success' && (
                        <p className="text-white/50 text-xs mt-1">
                            Expect updates on programs, events, and consulting insights.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email"
                    className={`flex-1 px-5 py-3 rounded-full border bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all font-medium ${
                        status === 'error'
                            ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/40'
                            : 'border-white/10 focus:border-brand-500 focus:ring-brand-500'
                    }`}
                    required
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 min-w-[130px]"
                >
                    {status === 'loading' ? (
                        <>
                            <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                            </svg>
                            Sending…
                        </>
                    ) : (
                        'Subscribe'
                    )}
                </button>
            </div>

            {/* Inline error */}
            {status === 'error' && (
                <p className="text-red-400 text-xs mt-2.5 ml-1 font-medium">{message}</p>
            )}

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                No spam, ever. By subscribing you agree to our{' '}
                <a href="#" className="underline hover:text-slate-300 transition-colors">
                    Privacy Policy
                </a>
                .
            </p>
        </form>
    );
}
