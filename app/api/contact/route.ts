import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactConfirmation } from '@/lib/mail';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const name: string = (body?.name ?? '').trim();
        const email: string = (body?.email ?? '').trim().toLowerCase();
        const phone: string = (body?.phone ?? '').trim();
        const message: string = (body?.message ?? '').trim();

        if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
        if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });

        await prisma.contactInquiry.create({
            data: { name, email, phone: phone || null, message },
        });

        // Send confirmation email in parallel (fire-and-forget, don't block response)
        sendContactConfirmation({ to: email, name }).catch(() => {});

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[contact] Error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
