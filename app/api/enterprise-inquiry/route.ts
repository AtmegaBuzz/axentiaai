import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const name: string = (body?.name ?? '').trim();
        const email: string = (body?.email ?? '').trim().toLowerCase();
        const company: string = (body?.company ?? '').trim();
        const message: string = (body?.message ?? '').trim();

        if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
        if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        if (!company) return NextResponse.json({ error: 'Company is required.' }, { status: 400 });
        if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });

        const { error } = await supabase
            .from('enterprise_inquiries')
            .insert({ name, email, company, message });

        if (error) {
            console.error('[enterprise-inquiry] Supabase error:', error);
            return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[enterprise-inquiry] Unexpected error:', err);
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
}
