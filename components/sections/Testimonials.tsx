'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Testimonial {
    name: string;
    program: string;
    quote: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Charu Tyagi',
        program: 'SAP SF Consultant',
        quote: 'DCAP offers the best classroom experience with experienced teachers from the SAP industry. This is exactly what I needed to enhance my skills and transition into a consulting career.',
        image: '/images/testimonials/charu-tyagi.jpeg',
    },
    {
        name: 'Anjali Kaushik',
        program: 'SAP ABAP Consultant',
        quote: 'As a CS graduate, I wanted to stand out from the crowd. Without a doubt, joining Axentia.AI was the right choice. I went from a fresher to a billable consultant in under a year.',
        image: '/images/testimonials/anjali-kaushik.jpeg',
    },
    {
        name: 'Madhav Jhawar',
        program: 'SAP MM Consultant',
        quote: 'After AI emerged, every company wants employees trained in AI. Axentia.AI has been my supportive hand. The best thing is you get paid for the projects you complete.',
        image: '/images/testimonials/madhav-jhawar.jpeg',
    },
    {
        name: 'Sakshi Patodi',
        program: 'SAP FICO & ABAP Consultant',
        quote: 'I am not only trained in FICO now, but I also have exposure to every sector in SAP. DCAP is closing the real gap in the market, it is a truly recommended program.',
        image: '/images/testimonials/sakshi-patodi.jpeg',
    },
    {
        name: 'Deeksha',
        program: 'SAP Trainee',
        quote: "Six weeks in, I'm thinking differently about enterprise problems, especially after understanding how AI fits into SAP workflows. I know I'm making real progress.",
        image: '/images/testimonials/deeksha.jpeg',
    },
];

const col1 = [...testimonials, ...testimonials];
const col2 = [...[...testimonials].reverse(), ...[...testimonials].reverse()];

function Stars() {
    return (
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

function Card({ t }: { t: Testimonial }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 shrink-0">
            <Stars />
            <p className="text-sm text-slate-600 leading-relaxed mb-5">{t.quote}</p>
            <div className="flex items-center gap-3">
                <Image
                    src={t.image}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-bold text-slate-900">{t.name}</span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="text-sm text-[#8A29AC] font-medium">{t.program}</span>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className="bg-slate-50 py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-center">

                    {/* Left: heading + stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#8A29AC] tracking-tight leading-tight mb-10 uppercase">
                            Testimonials
                        </h2>

                        <span
                            className="inline-flex items-center gap-2 bg-[#8A29AC] text-white text-sm font-bold py-3 px-6 rounded-full cursor-default"
                        >
                            View all testimonials
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </motion.div>

                    {/* Right: 2 vertical scrolling columns */}
                    <div className="relative h-[500px] md:h-[560px]">
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />

                        <div className="grid grid-cols-2 gap-4 h-full overflow-hidden">
                            <div className="relative overflow-hidden">
                                <div className="flex flex-col gap-4 animate-scroll-up">
                                    {col1.map((t, i) => (
                                        <Card key={`col1-${i}`} t={t} />
                                    ))}
                                </div>
                            </div>
                            <div className="relative overflow-hidden">
                                <div className="flex flex-col gap-4 animate-scroll-down">
                                    {col2.map((t, i) => (
                                        <Card key={`col2-${i}`} t={t} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
