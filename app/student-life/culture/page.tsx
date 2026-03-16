'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const cultureImages = [
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&q=80', alt: 'Festival celebration', label: 'Diwali Celebration' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&q=80', alt: 'Team celebration', label: 'Cohort Graduation' },
  { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop&q=80', alt: 'Office party', label: 'Team Milestones' },
];

const classroomImages = [
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=340&fit=crop&q=80', alt: 'Peer discussion', label: 'Peer Discussions' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=340&fit=crop&q=80', alt: 'Problem solving', label: 'Problem-Solving Sessions' },
  { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=340&fit=crop&q=80', alt: 'Idea sharing', label: 'Idea Sharing & Mentoring' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=340&fit=crop&q=80', alt: 'Teamwork', label: 'Teamwork in Project Sims' },
];

export default function CulturePage() {
  return (
    <main className="flex flex-col min-h-screen pt-16">

      {/* ── HERO QUOTE ── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=800&fit=crop&q=80"
            alt="Culture at Axentia.AI"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-300 font-semibold uppercase tracking-[0.2em] text-sm mb-6"
          >
            Culture & Activities
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight"
          >
            "At Axentia.AI, we believe in the power of exposure to{' '}
            <span className="font-[family-name:var(--font-playfair)] italic text-accent-300">
              diverse cultures
            </span>"
          </motion.blockquote>
        </div>
      </section>

      {/* ── RUNNING NUMBERS ── */}
      <section className="py-14 md:py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 4, suffix: '+', label: 'Countries Represented' },
              { end: 200, suffix: '+', label: 'Students Enrolled' },
              { end: 95, suffix: '%', label: 'Placement Success' },
              { end: 10, suffix: '+', label: 'Months Career Journey' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.07}>
                <motion.p
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-600 mb-2"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.08 }}
                >
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </motion.p>
                <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVERSITY QUOTE ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 xl:px-12 text-center max-w-3xl">
          <FadeIn>
            <div className="text-5xl text-brand-200 font-serif leading-none mb-2">&ldquo;</div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">
              Students from{' '}
              <span className="text-brand-600 font-[family-name:var(--font-playfair)] italic text-[1.1em]">all across the country</span>{' '}
              come together at Axentia.AI, creating a diverse and global learning environment.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CAMPUS LIFE TEXT ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-4">Life at Axentia.AI</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-6 text-left">
                Beyond Mastering AI{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">& Enterprise Systems</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Life at Axentia.AI isn&apos;t only about mastering AI and enterprise systems. It&apos;s also about learning alongside people who are building similar career paths. Students collaborate on projects, share ideas, support each other through challenges, and celebrate milestones together.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {cultureImages.slice(0, 2).map((img) => (
                  <div key={img.label} className="rounded-2xl overflow-hidden shadow-md relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-xs font-semibold px-3 py-2">{img.label}</div>
                  </div>
                ))}
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-md relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cultureImages[2].src} alt={cultureImages[2].alt} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-xs font-semibold px-3 py-2">{cultureImages[2].label}</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Celebrating Moments Together */}
          <div className="mb-20">
            <FadeIn className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Celebrating Moments{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Together</span>
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cultureImages.map((img, i) => (
                <FadeIn key={img.label} delay={i * 0.08}>
                  <div className="rounded-2xl overflow-hidden shadow-lg relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-semibold">{img.label}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Learning Beyond the Classroom */}
          <div>
            <FadeIn className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Learning Beyond the{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Classroom</span>
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {classroomImages.map((img, i) => (
                <FadeIn key={img.label} delay={i * 0.08}>
                  <div className="rounded-2xl overflow-hidden shadow-md relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="p-4 bg-white border-t border-slate-100">
                      <p className="text-sm font-semibold text-slate-800">{img.label}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
