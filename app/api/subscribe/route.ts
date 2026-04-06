import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email: string = (body?.email ?? '').trim().toLowerCase();

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }
        if (!EMAIL_RE.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        }

        const existing = await prisma.subscriber.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json(
                { error: "You're already subscribed! We'll keep you posted." },
                { status: 409 }
            );
        }

        await prisma.subscriber.create({
            data: { email, source: 'footer' },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[subscribe] Error:', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
