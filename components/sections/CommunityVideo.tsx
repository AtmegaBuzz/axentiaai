'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Link from 'next/link';

export function CommunityVideo() {
    return (
        <section
            id="community-video"
            className="relative py-24 overflow-hidden"
        >
            {/* Blurred first-frame background */}
            <div
                className="absolute inset-[-40px]"
                style={{
                    backgroundImage: 'url(/videos/join-community-poster.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(24px) brightness(0.65) saturate(1.3)',
                }}
            />
            {/* Dark overlay to keep it subtle */}
            <div className="absolute inset-0 bg-black/25" />

            <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <video
                        controls
                        playsInline
                        preload="metadata"
                        poster="/videos/join-community-poster.jpg"
                        className="w-full rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.7)]"
                    >
                        <source src="/videos/join_community.mp4" type="video/mp4" />
                    </video>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <p className="text-white/60 text-sm font-medium tracking-wide">
                        200+ students &bull; 4+ countries &bull; Placement-first community
                    </p>
                    <Link
                        href="/forum"
                        className="inline-flex items-center justify-center gap-3 bg-yellow-400/15 backdrop-blur-md border border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/25 font-semibold py-4 px-8 rounded-full shadow-xl transition-all duration-200"
                    >
                        <Users className="w-5 h-5" />
                        Join Community
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
