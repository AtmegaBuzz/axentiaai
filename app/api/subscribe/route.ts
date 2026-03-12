import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email: string = (body?.email ?? '').trim().toLowerCase();

        // ── Validate ─────────────────────────────────────────────
        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }
        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        }

        // ── Insert into Supabase ──────────────────────────────────
        const { error } = await supabase
            .from('subscribers')
            .insert({ email, source: 'footer' });

        if (error) {
            // Unique constraint violation → already subscribed
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: "You're already subscribed! We'll keep you posted." },
                    { status: 409 }
                );
            }
            console.error('[subscribe] Supabase error:', error);
            return NextResponse.json(
                { error: 'Something went wrong. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[subscribe] Unexpected error:', err);
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
}
