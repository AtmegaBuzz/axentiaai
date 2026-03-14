'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Globe, Award } from 'lucide-react';
import Link from 'next/link';
import Testimonials from '@/components/sections/Testimonials';

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

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80', alt: 'Students collaborating' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80', alt: 'Classroom learning' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80', alt: 'Team discussion' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80', alt: 'Project work' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80', alt: 'Enterprise consulting' },
];

const placementCompanies = [
  { name: 'SAP', domain: 'sap.com' },
  { name: 'Orane', domain: 'orane.com' },
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'TCS', domain: 'tcs.com' },
  { name: 'Infosys', domain: 'infosys.com' },
  { name: 'Wipro', domain: 'wipro.com' },
];

export default function StudentLifePage() {
  return (
    <main className="flex flex-col min-h-screen pt-16">

      {/* ── SECTION 1: Hero — Learning Starts to Feel Real ── */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #fef8ec 50%, #f8fafc 100%)' }} />
        <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
          <FadeIn className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-500">Student Life</span>
          </FadeIn>
          <FadeIn delay={0.08} className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              This Is Where Learning{' '}
              <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Starts to Feel Real</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-slate-500 text-lg">
              Where concepts meet reality, and students discover what consulting actually feels like.
            </p>
          </FadeIn>

          {/* Photo gallery */}
          <FadeIn delay={0.16}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-16">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className={`rounded-2xl overflow-hidden shadow-md ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="w-full h-40 md:h-52 object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Descriptive text */}
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 text-center">
                Most programs teach concepts, but at Axentia.AI, you start applying them almost immediately. Student life here isn't about sitting through lectures all day. It's about building the habits, thinking, and confidence needed to work in real consulting environments.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-r from-brand-50 to-accent-50 border border-brand-100 rounded-2xl p-8 text-center">
                <p className="text-2xl font-bold text-slate-900 leading-relaxed">
                  You learn SAP.<br />
                  You use AI.<br />
                  <span className="text-brand-600 font-[family-name:var(--font-playfair)] italic text-[1.1em]">
                    And most importantly, you practice solving problems the way consultants actually do.
                  </span>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 95% Placement Rate ── */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #58179B 0%, #8929AC 40%, #C010DA 100%)' }}>
        {/* Grid decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 600">
          {Array.from({ length: 12 }).map((_, i) => <line key={`v${i}`} x1={i * 130} y1="0" x2={i * 130} y2="600" stroke="white" strokeWidth="1" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 120} x2="1440" y2={i * 120} stroke="white" strokeWidth="1" />)}
        </svg>

        <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 text-center">
          <FadeIn>
            <div className="mb-4">
              <motion.span
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                95%
              </motion.span>
            </div>
            <p className="text-2xl font-semibold text-white/90 mb-3">Placement Success Rate</p>
            <p className="text-white/60 max-w-lg mx-auto mb-12">Our graduates join leading enterprise organisations across India and globally.</p>
          </FadeIn>

          {/* Placement company logos */}
          <FadeIn delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Our Placement Alliances</p>
            <div className="flex flex-wrap justify-center gap-4">
              {placementCompanies.map((company) => (
                <div key={company.name} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://logo.clearbit.com/${company.domain}`}
                    alt={company.name}
                    className="h-5 w-auto max-w-[50px] object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="text-sm font-semibold text-white">{company.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 3: Alumni Network ── */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-brand-50/60 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500 block mb-3">Community</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
                Axentia.AI{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Alumni Network</span>
              </h2>
              <p className="text-base md:text-xl text-slate-500">A Growing Community of Consultants</p>
            </FadeIn>
          </div>

          {/* Globe visualization placeholder + stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <FadeIn>
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-gradient-to-br from-brand-50 to-accent-50 border border-brand-100/50 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-48 h-48 text-brand-200/60" strokeWidth={0.5} />
                </div>
                {/* Alumni pins */}
                {[
                  { top: '20%', left: '55%', label: 'India' },
                  { top: '15%', left: '35%', label: 'Canada' },
                  { top: '35%', left: '48%', label: 'Portugal' },
                  { top: '55%', left: '60%', label: 'Kenya' },
                ].map((pin) => (
                  <motion.div
                    key={pin.label}
                    className="absolute"
                    style={{ top: pin.top, left: pin.left }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, ease: 'easeInOut' }}
                  >
                    <div className="w-3 h-3 rounded-full bg-brand-500 shadow-[0_0_12px_rgba(192,16,218,0.6)]" />
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-brand-600 whitespace-nowrap">{pin.label}</span>
                  </motion.div>
                ))}
                <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Alumni in</p>
                  <p className="text-2xl font-black text-slate-900">4+ Countries</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                  The AxentiaAI community begins in the classroom and continues throughout your career.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our alumni go on to work with top SAP practices globally. They stay connected, support each other, and give back to the next generation of consultants.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Alumni Placed', value: '100+' },
                    { label: 'Countries', value: '4+' },
                    { label: 'Avg. First CTC', value: '₹6-12L' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                      <p className="text-2xl font-black text-brand-600">{stat.value}</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/forum"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Users className="w-5 h-5" />
                  Join the Alumni Community
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Testimonials ── */}
      <Testimonials />

    </main>
  );
}
