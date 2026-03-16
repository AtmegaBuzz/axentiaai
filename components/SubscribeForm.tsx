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
                setMessage('Subscribed!');
            } else if (res.status === 409) {
                setStatus('duplicate');
                setMessage("Already subscribed.");
            } else {
                setStatus('error');
                setMessage(data.error ?? 'Something went wrong. Try again.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    }

    const isSuccess = status === 'success' || status === 'duplicate';

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
                            : isSuccess
                            ? 'border-emerald-500/40'
                            : 'border-white/10 focus:border-brand-500 focus:ring-brand-500'
                    }`}
                    disabled={status === 'loading' || isSuccess}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || isSuccess}
                    className={`px-8 py-3 rounded-full font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2 min-w-[130px] disabled:cursor-not-allowed ${
                        isSuccess
                            ? 'bg-emerald-500 text-white opacity-100'
                            : 'bg-brand-600 hover:bg-brand-700 text-white disabled:opacity-60'
                    }`}
                >
                    {status === 'loading' ? (
                        <>
                            <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                            </svg>
                            Sending…
                        </>
                    ) : isSuccess ? (
                        <>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {message}
                        </>
                    ) : (
                        'Subscribe'
                    )}
                </button>
            </div>

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
