'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   INLINE SVG ICONS
   ═══════════════════════════════════════════════════════════════ */

function ConsultingIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
}
function GlobeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>);
}
function TargetIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>);
}
function HeartIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);
}
function LightbulbIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>);
}
function ShieldIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>);
}
function BuildingIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></svg>);
}
function BrainIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 1.5-.5 2.5-1.5 3.5L12 14l-3.5-3.5C7.5 9.5 7 8.5 7 7a5 5 0 0 1 5-5z" /><path d="M12 14v8" /><path d="M8 18h8" /><circle cx="12" cy="7" r="1" fill="currentColor" /></svg>);
}
function SAPIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="3" /><path d="M7 8h10M7 12h6M7 16h8" /><circle cx="18" cy="14" r="2" fill="currentColor" opacity="0.3" /></svg>);
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED DECORATIVE WIDGETS
   ═══════════════════════════════════════════════════════════════ */

/* Spinning ring with orbiting dots */
function OrbitRing({ className = '', size = 120, color = '#8929AC' }: { className?: string; size?: number; color?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <motion.svg viewBox="0 0 120 120" fill="none" className="w-full h-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}>
        <circle cx="60" cy="60" r="50" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="8 6" />
        <circle cx="60" cy="60" r="35" stroke={color} strokeWidth="0.5" opacity="0.2" />
        <circle cx="60" cy="10" r="4" fill={color} opacity="0.6" />
        <circle cx="110" cy="60" r="3" fill={color} opacity="0.4" />
        <circle cx="60" cy="110" r="2.5" fill={color} opacity="0.5" />
      </motion.svg>
    </div>
  );
}

/* Counter-rotating concentric rings */
function SpinningGear({ className = '', size = 80 }: { className?: string; size?: number }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>
          <circle cx="40" cy="40" r="30" stroke="#C010DA" strokeWidth="1" opacity="0.25" strokeDasharray="4 8" />
        </motion.g>
        <motion.g animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}>
          <circle cx="40" cy="40" r="20" stroke="#F3B15F" strokeWidth="1" opacity="0.2" strokeDasharray="3 6" />
        </motion.g>
        <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}>
          <circle cx="40" cy="40" r="10" stroke="#C010DA" strokeWidth="0.75" opacity="0.3" strokeDasharray="2 4" />
        </motion.g>
        <circle cx="40" cy="40" r="2" fill="#8929AC" opacity="0.4" />
      </svg>
    </div>
  );
}

/* Rotating cross/plus */
function RotatingCross({ className = '', color = '#8929AC' }: { className?: string; color?: string }) {
  return (
    <motion.div className={`pointer-events-none ${className}`} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="1.5" opacity="0.4" />
        <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.5" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

/* Floating diamond */
function FloatingDiamond({ className = '', color = '#8929AC' }: { className?: string; color?: string }) {
  return (
    <motion.div className={`pointer-events-none ${className}`} animate={{ y: [-8, 8, -8], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5" opacity="0.35" transform="rotate(45 10 10)" />
      </svg>
    </motion.div>
  );
}

/* ── Flowing animated line (horizontal, draws on scroll) ── */
function FlowingLine({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 1200 60" fill="none" className="w-full h-full" preserveAspectRatio="none">
        <motion.path
          d="M0,30 Q150,5 300,30 T600,30 T900,30 T1200,30"
          stroke="url(#flowGrad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8929AC" stopOpacity="0" />
            <stop offset="20%" stopColor="#8929AC" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#F3B15F" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#8929AC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8929AC" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1: HERO — Pinned full-viewport with scroll-fade + images
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const imgY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);
  const imgRotate = useTransform(scrollYProgress, [0, 0.6], [0, -5]);

  return (
    <section ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #58179B 0%, #8929AC 40%, #C010DA 100%)' }} />
        {/* SVG curves */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <path d="M0,300 Q360,100 720,300 T1440,300" stroke="url(#hg1)" strokeWidth="2" fill="none" />
          <path d="M0,500 Q360,300 720,500 T1440,500" stroke="url(#hg2)" strokeWidth="1.5" fill="none" />
          <path d="M0,700 Q360,500 720,700 T1440,700" stroke="url(#hg1)" strokeWidth="1" fill="none" />
          <defs>
            <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C010DA" /><stop offset="100%" stopColor="#F3B15F" /></linearGradient>
            <linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#F3B15F" /><stop offset="100%" stopColor="#C010DA" /></linearGradient>
          </defs>
        </svg>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-400/15 rounded-full blur-[100px]" />

        {/* Rotating widgets */}
        <OrbitRing className="absolute top-20 right-[15%] hidden lg:block" size={140} color="#C010DA" />
        <SpinningGear className="absolute bottom-32 left-[10%] hidden lg:block" size={90} />
        <RotatingCross className="absolute top-[40%] right-[8%] w-8 h-8 hidden md:block" color="#F3B15F" />
        <FloatingDiamond className="absolute bottom-[20%] right-[25%] w-6 h-6 hidden md:block" color="#C010DA" />

        {/* Floating filler images */}
        <motion.div style={{ y: imgY, rotate: imgRotate }} className="absolute top-[12%] right-[8%] hidden xl:block">
          <div className="w-48 h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl rotate-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=280&fit=crop&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 0.6], [0, 40]) }} className="absolute bottom-[18%] right-[12%] hidden xl:block">
          <div className="w-36 h-24 rounded-xl overflow-hidden border-2 border-white/10 shadow-xl -rotate-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop&q=80" alt="Office work" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ opacity, y, scale }} className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl">
            <FadeIn>
              <Image src="/brand/axentia-logo-white.png" alt="Axentia AI" width={180} height={50} className="h-6 w-auto mb-8" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-brand-300 font-semibold uppercase tracking-[0.2em] text-sm mb-5">Our Story</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8">
                The Story of{' '}
                <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">Axentia.AI</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-indigo-200/80 max-w-3xl leading-relaxed mb-10">
                Building the capability infrastructure required for the AI era — one enterprise consultant at a time.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Link href="/programs" className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full shadow-lg shadow-white/20 hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Start Your Journey <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/programs" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all">
                  Explore Programs
                </Link>
              </div>
            </FadeIn>
          </div>
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <span className="text-xs font-medium uppercase tracking-wider text-white/30">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown className="w-5 h-5 text-white/30" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: LEGACY — Founder quote + stats + image + widgets
   ═══════════════════════════════════════════════════════════════ */

function LegacySection() {
  return (
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      {/* Moving line */}
      <FlowingLine className="absolute top-12 left-0 right-0 h-16 opacity-60" />
      {/* Rotating widgets */}
      <SpinningGear className="absolute top-16 right-16 hidden lg:block" size={70} />
      <RotatingCross className="absolute bottom-20 left-12 w-6 h-6 hidden md:block" />
      <FloatingDiamond className="absolute top-[60%] right-8 w-5 h-5" color="#eab308" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div>
            <FadeIn><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 mb-4">Our Legacy</p></FadeIn>
            <FadeIn delay={0.05}>
              <div className="relative mb-8">
                <svg className="absolute -top-3 -left-3 w-12 h-12 text-brand-100" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium pl-6 border-l-4 border-brand-300">
                  In enterprise consulting, readiness shows in the details — how you document, how you communicate, how you handle responsibility inside a team.{' '}
                  <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Axentia AI</span>{' '}
                  was created to build that preparation deliberately — for the AI era.
                </blockquote>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-brand-500/30">M</div>
                <div>
                  <p className="text-lg font-bold text-slate-900">Manuj Gupta</p>
                  <p className="text-sm text-slate-500">Founder & CEO, Orane Consulting</p>
                  <p className="text-sm text-brand-600 font-medium">Founder, Axentia AI</p>
                </div>
                <a href="https://www.linkedin.com/in/manuj-gupta" target="_blank" rel="noopener noreferrer" className="ml-auto w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:bg-[#004182] transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-slate-600 leading-relaxed mb-8">
                Manuj Gupta founded Orane Consulting in 2009. The firm has grown into a 500+ consultant SAP practice with delivery presence across India, Canada, Portugal, and Kenya. Daksha extends those same delivery standards into a focused training and apprenticeship pathway.
              </p>
            </FadeIn>
            {/* Filler image strip */}
            <FadeIn delay={0.2}>
              <div className="flex gap-3">
                <div className="w-28 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=240&h=160&fit=crop&q=80" alt="SAP consulting" className="w-full h-full object-cover" />
                </div>
                <div className="w-28 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=240&h=160&fit=crop&q=80" alt="Team meeting" className="w-full h-full object-cover" />
                </div>
                <div className="w-28 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm hidden sm:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=240&h=160&fit=crop&q=80" alt="Enterprise tech" className="w-full h-full object-cover" />
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.1}>
            <div className="relative">
              {/* Large filler image behind stats */}
              <div className="absolute -top-8 -right-6 w-[calc(100%+24px)] h-[calc(100%+40px)] rounded-3xl overflow-hidden opacity-[0.08]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop&q=60" alt="Enterprise building" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4 relative">
                {[
                  { value: '30+', label: 'Years', sub: 'Enterprise Experience', icon: <ShieldIcon className="w-5 h-5" /> },
                  { value: '500+', label: 'Consultants', sub: 'At Orane Consulting', icon: <ConsultingIcon className="w-5 h-5" /> },
                  { value: '10+', label: 'Countries', sub: 'Global Delivery', icon: <GlobeIcon className="w-5 h-5" /> },
                  { value: '2009', label: 'Founded', sub: 'Orane Consulting', icon: <BuildingIcon className="w-5 h-5" /> },
                ].map((s) => (
                  <div key={s.label} className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-brand-200 transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center mb-3 text-brand-600 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <p className="text-3xl font-bold text-slate-900 mb-0.5">{s.value}</p>
                    <p className="text-sm font-semibold text-slate-700">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.sub}</p>
                  </div>
                ))}
              </div>
              {/* Orbit ring behind stats */}
              <OrbitRing className="absolute -bottom-10 -left-10 hidden lg:block" size={100} color="#8929AC" />
            </div>
          </FadeIn>
        </div>
      </div>
      {/* Bottom flowing line */}
      <FlowingLine className="absolute bottom-4 left-0 right-0 h-12 opacity-40" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: JOURNEY — Horizontal scroll + images in cards
   ═══════════════════════════════════════════════════════════════ */

const milestones = [
  { year: '2009', title: 'Orane Founded', desc: 'SAP enterprise delivery begins in India.', icon: <BuildingIcon className="w-5 h-5" />, hl: false, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=160&fit=crop&q=80' },
  { year: '2012', title: 'Canada Expansion', desc: 'First international operations.', icon: <GlobeIcon className="w-5 h-5" />, hl: false, img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=300&h=160&fit=crop&q=80' },
  { year: '2016', title: '200+ Consultants', desc: 'Scaled across SAP modules.', icon: <ConsultingIcon className="w-5 h-5" />, hl: false, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=160&fit=crop&q=80' },
  { year: '2019', title: '4 Countries', desc: 'Portugal and Kenya added.', icon: <GlobeIcon className="w-5 h-5" />, hl: false, img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=300&h=160&fit=crop&q=80' },
  { year: '2022', title: '500+ Consultants', desc: 'Talent pipeline need emerges.', icon: <ConsultingIcon className="w-5 h-5" />, hl: false, img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=160&fit=crop&q=80' },
  { year: '2023', title: 'Daksha Launches', desc: '10-month career accelerator.', icon: <TargetIcon className="w-5 h-5" />, hl: true, img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=160&fit=crop&q=80' },
  { year: '2024', title: '100+ Careers', desc: 'First cohort joins delivery teams.', icon: <ConsultingIcon className="w-5 h-5" />, hl: false, img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=160&fit=crop&q=80' },
  { year: '2025', title: 'Axentia AI', desc: 'Unified ecosystem established.', icon: <BrainIcon className="w-5 h-5" />, hl: true, img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=160&fit=crop&q=80' },
];

function JourneySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-60%']);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-brand-50/20 to-slate-50">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <path d="M-100,450 Q360,200 720,450 T1540,450" stroke="#8929AC" strokeWidth="3" fill="none" />
          <path d="M-100,350 Q500,600 1000,350 T1540,350" stroke="#eab308" strokeWidth="2" fill="none" />
        </svg>
        {/* Rotating widgets */}
        <OrbitRing className="absolute top-8 right-8 hidden lg:block" size={100} color="#8929AC" />
        <FloatingDiamond className="absolute bottom-16 right-20 w-7 h-7 hidden md:block" />
        <SpinningGear className="absolute bottom-8 left-8 hidden lg:block" size={60} />

        <div className="h-full flex flex-col justify-center px-6 md:px-12 xl:px-20">
          <div className="mb-10 md:mb-14">
            <FadeIn><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">Our Journey</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                From a Single Insight to a{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Global Ecosystem</span>
              </h2>
            </FadeIn>
          </div>

          <div className="relative">
            <div className="absolute top-[28px] left-0 right-0 h-[3px] bg-slate-200 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full origin-left" style={{ width: lineWidth, background: 'linear-gradient(to right, var(--color-brand-400), var(--color-brand-600))' }} />
            </div>

            <motion.div style={{ x }} className="flex gap-6 md:gap-8 pt-0 will-change-transform">
              {milestones.map((m) => (
                <div key={m.year} className="flex-shrink-0 w-[280px] md:w-[320px]">
                  <div className="flex justify-start mb-4 pl-1">
                    <div className={`w-4 h-4 rounded-full border-[3px] ${m.hl ? 'border-brand-500 bg-brand-500 shadow-[0_0_0_4px_rgba(217,70,239,0.2)]' : 'border-brand-400 bg-brand-400'}`} />
                  </div>
                  <p className={`text-2xl md:text-3xl font-bold mb-2 ${m.hl ? 'text-brand-600' : 'text-slate-900'}`}>{m.year}</p>
                  <div className={`${m.hl ? 'bg-brand-50 border-brand-200' : 'bg-white border-slate-200'} border rounded-2xl overflow-hidden`}>
                    {/* Card image */}
                    <div className="h-28 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.img} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${m.hl ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>{m.icon}</div>
                        <p className="text-sm font-bold text-slate-900">{m.title}</p>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4: BY THE NUMBERS — with rotating widgets + moving lines
   ═══════════════════════════════════════════════════════════════ */

function NumbersSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 40%'] });
  const counterProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const stats = [
    { end: 100, suffix: '+', label: 'Careers Launched', sub: 'Through Axentia' },
    { end: 10, suffix: '+', label: 'Months Training', sub: 'Structured pathway' },
    { end: 500, suffix: '+', label: 'Consultants', sub: 'Active at Orane' },
    { end: 25, suffix: '+', label: 'Years Legacy', sub: 'SAP Delivery' },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #58179B 0%, #8929AC 30%, #C010DA 60%, #E473BA 100%)' }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 600">
        {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 120} y1="0" x2={i * 120} y2="600" stroke="white" strokeWidth="1" />)}
        {Array.from({ length: 7 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2="1440" y2={i * 100} stroke="white" strokeWidth="1" />)}
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-400/20 rounded-full blur-[150px]" />

      {/* Moving lines */}
      <div className="absolute top-8 left-0 right-0 h-16 pointer-events-none">
        <svg viewBox="0 0 1200 50" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <motion.path d="M0,25 Q200,5 400,25 T800,25 T1200,25" stroke="white" strokeWidth="1" opacity="0.1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
        </svg>
      </div>
      <div className="absolute bottom-8 left-0 right-0 h-16 pointer-events-none">
        <svg viewBox="0 0 1200 50" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <motion.path d="M0,25 Q300,45 600,25 T1200,25" stroke="white" strokeWidth="1" opacity="0.08" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.3 }} />
        </svg>
      </div>

      {/* Rotating widgets */}
      <OrbitRing className="absolute top-12 left-12 hidden lg:block" size={120} color="#C010DA" />
      <OrbitRing className="absolute bottom-12 right-12 hidden lg:block" size={90} color="#F3B15F" />
      <RotatingCross className="absolute top-1/2 right-[5%] w-10 h-10 hidden md:block" color="rgba(255,255,255,0.15)" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300 mb-3">In the Last Year</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">The Numbers Speak</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="text-center">
              <motion.p className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                <CounterDisplay progress={counterProgress} end={s.end} suffix={s.suffix} />
              </motion.p>
              <p className="text-lg font-semibold text-white/90 mb-1">{s.label}</p>
              <p className="text-sm text-white/50">{s.sub}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterDisplay({ progress, end, suffix }: { progress: ReturnType<typeof useTransform<number, number>>; end: number; suffix: string }) {
  const display = useTransform(progress, [0, 1], [0, end]);
  const rounded = useTransform(display, (v: number) => {
    const eased = 1 - Math.pow(1 - Math.min(v / end, 1), 3);
    return `${Math.floor(eased * end)}${suffix}`;
  });
  return <motion.span>{rounded}</motion.span>;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5: VALUES — Glassmorphic cards + floating widgets + images
   ═══════════════════════════════════════════════════════════════ */

const valuesData = [
  { icon: <TargetIcon className="w-6 h-6" />, title: 'Capability, Not AI Hype', desc: 'We believe the world does not need more surface-level AI content. It needs people who understand how technology integrates with real business systems.' },
  { icon: <HeartIcon className="w-6 h-6" />, title: 'Enterprise Relevance', desc: 'Learning should not happen in isolation from the environments where it will be applied. Everything we build is designed with enterprise workflows in mind.' },
  { icon: <LightbulbIcon className="w-6 h-6" />, title: 'Pathways, Not Programs', desc: 'Careers are not built through isolated courses. They are built through structured journeys that move from awareness to capability to real-world application.' },
  { icon: <GlobeIcon className="w-6 h-6" />, title: 'Ecosystems, Not Silos', desc: 'Transformation happens when enterprises, institutions, technology partners, and talent ecosystems move together.' },
  { icon: <ShieldIcon className="w-6 h-6" />, title: 'Practical Transformation', desc: 'Real change happens through capability, systems understanding, and workforce readiness, not technology theater.' },
  { icon: <SAPIcon className="w-6 h-6" />, title: 'Enterprise-Ready', desc: 'Prepared for SAP project delivery realities from day one — not in 12-18 months.' },
];

function ValuesSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 animate-gradient-loop" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 25%, #fef8ec 50%, #faf5ff 75%, #e9d0ff 100%)' }} />
      <div className="absolute top-16 left-16 w-64 h-64 bg-brand-400/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-16 right-16 w-56 h-56 bg-accent-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 800">
        <path d="M0,250 C360,150 720,350 1440,250" stroke="#8929AC" strokeWidth="1.5" fill="none" />
        <path d="M0,550 C360,450 720,650 1440,550" stroke="#eab308" strokeWidth="1" fill="none" />
      </svg>

      {/* Widgets */}
      <SpinningGear className="absolute top-12 right-20 hidden lg:block" size={80} />
      <OrbitRing className="absolute bottom-20 left-12 hidden lg:block" size={100} color="#eab308" />
      <FloatingDiamond className="absolute top-[30%] left-8 w-6 h-6 hidden md:block" />
      <RotatingCross className="absolute bottom-[25%] right-12 w-7 h-7 hidden md:block" color="#8929AC" />

      {/* Floating filler images */}
      <motion.div className="absolute top-16 left-[60%] hidden xl:block" animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
        <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/40 shadow-lg rotate-3 opacity-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=140&fit=crop&q=60" alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>
      <motion.div className="absolute bottom-20 right-[55%] hidden xl:block" animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
        <div className="w-20 h-14 rounded-lg overflow-hidden border border-white/40 shadow-lg -rotate-2 opacity-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=200&h=140&fit=crop&q=60" alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        <div className="text-center mb-14">
          <FadeIn><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 mb-3">What We Stand For</p></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              What Axentia{' '}<span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Stands For</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}><p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">Five principles that define how we build capability at the intersection of enterprise AI and workforce development.</p></FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {valuesData.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.06}>
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-7 hover:bg-white/50 transition-all duration-300 group shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.7)]">
                <div className="w-12 h-12 rounded-xl bg-brand-50/80 border border-brand-200/30 flex items-center justify-center mb-5 text-brand-600 group-hover:scale-110 transition-transform">{v.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      {/* Flowing line between values and next section */}
      <FlowingLine className="absolute -bottom-2 left-0 right-0 h-16 opacity-50" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6: ECOSYSTEM — Daksha + Axentia + Orane + images
   ═══════════════════════════════════════════════════════════════ */

const ecosystem = [
  { name: 'Daksha', tag: 'Training & Apprenticeship', info: 'DCAP, EAP, Online', desc: '10-month pathways combining classroom learning with supervised apprenticeship.', icon: <TargetIcon className="w-7 h-7" />, grad: 'from-brand-500 to-brand-700', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop&q=80' },
  { name: 'Axentia AI', tag: 'Enterprise AI & Automation', info: 'Data, AI, Automation', desc: 'AI-powered solutions for enterprise consulting and digital transformation.', icon: <BrainIcon className="w-7 h-7" />, grad: 'from-indigo-500 to-indigo-700', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&q=80' },
  { name: 'Orane Consulting', tag: 'SAP Enterprise Delivery', info: '500+ consultants, 4 countries', desc: '15+ year SAP practice — India, Canada, Portugal, Kenya.', icon: <BuildingIcon className="w-7 h-7" />, grad: 'from-accent-500 to-accent-700', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop&q=80' },
];

function EcosystemSection() {
  return (
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-50/40 rounded-full blur-[120px]" />
      <RotatingCross className="absolute top-20 left-16 w-8 h-8 hidden lg:block" />
      <SpinningGear className="absolute bottom-20 right-16 hidden lg:block" size={70} />

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        <div className="text-center mb-14">
          <FadeIn><p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">The Ecosystem</p></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Be Part of Something <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Bigger</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}><p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">We build the capability infrastructure required for the AI era. Our mission is simple: Turn AI potential into real capability.</p></FadeIn>
        </div>

        <div className="hidden lg:block relative h-12 mb-6 max-w-3xl mx-auto">
          <svg className="w-full h-full" viewBox="0 0 600 48" preserveAspectRatio="xMidYMid meet">
            <line x1="100" y1="24" x2="290" y2="24" stroke="#8929AC" strokeWidth="2" />
            <circle cx="300" cy="24" r="4" fill="#8929AC" />
            <line x1="310" y1="24" x2="500" y2="24" stroke="#6366f1" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ecosystem.map((e, i) => (
            <FadeIn key={e.name} delay={i * 0.1}>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all group h-full flex flex-col">
                {/* Card image */}
                <div className="h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.img} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${e.grad} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform -mt-12 relative z-10 border-4 border-white`}>{e.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{e.name}</h3>
                  <p className="text-brand-600 font-medium text-sm mb-3">{e.tag}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{e.desc}</p>
                  <div className="bg-white border border-slate-100 rounded-xl px-4 py-2.5"><p className="text-xs text-slate-500 font-medium">{e.info}</p></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7: TEAM — Crazy snap animations + team photos
   ═══════════════════════════════════════════════════════════════ */

const teamMembers = [
  {
    name: 'Priya Sharma',
    role: 'Head of Academics',
    company: 'Daksha',
    desc: 'Former SAP Practice Lead with 15+ years of delivery experience.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
    color: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Director of Operations',
    company: 'Axentia AI',
    desc: 'Scaled consulting operations across 10+ countries.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Anita Verma',
    role: 'Head of Placements',
    company: 'Daksha',
    desc: 'Built talent pipelines for Fortune 500 companies.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Vikram Singh',
    role: 'CTO',
    company: 'Axentia AI',
    desc: 'AI/ML architect building next-gen enterprise solutions.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Meera Patel',
    role: 'Head of Curriculum',
    company: 'Daksha',
    desc: 'Designed enterprise-grade training for 1000+ professionals.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Arjun Nair',
    role: 'VP of Partnerships',
    company: 'Orane Consulting',
    desc: 'Forged strategic alliances with top-tier SAP partners globally.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
    color: 'from-cyan-500 to-blue-600',
  },
];

/* Interactive tilt card wrapper */
function TiltCard({ children, className = '', index }: { children: React.ReactNode; className?: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Staggered snap-in: each card enters from a different direction with elastic spring */
  const directions = [
    { x: -120, y: 80, rotate: -15, scale: 0.3 },   // from bottom-left, rotated
    { x: 0, y: -150, rotate: 10, scale: 0.2 },      // from top, tilted
    { x: 120, y: 80, rotate: 15, scale: 0.3 },      // from bottom-right, rotated
    { x: -100, y: -100, rotate: -20, scale: 0.1 },   // from top-left, heavy rotate
    { x: 100, y: 100, rotate: 25, scale: 0.2 },      // from bottom-right, heavy rotate
    { x: 0, y: 150, rotate: -10, scale: 0.3 },       // from bottom, tilted
  ];
  const dir = directions[index % directions.length];

  return (
    <motion.div
      ref={cardRef}
      className={`${className}`}
      style={{ perspective: 800 }}
      initial={{
        opacity: 0,
        x: dir.x,
        y: dir.y,
        rotate: dir.rotate,
        scale: dir.scale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
        mass: 0.8,
        delay: index * 0.12,
      }}
      whileHover={{
        y: -12,
        rotateY: 8,
        rotateX: -4,
        scale: 1.04,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
    >
      {children}
    </motion.div>
  );
}

function TeamSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden border-y border-slate-200" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #faf5ff 40%, #faf5ff 70%, #fafafa 100%)' }}>
      {/* Animated dot grid background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <pattern id="teamDotPat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.5" fill="#8929AC" /></pattern>
          <rect width="100%" height="100%" fill="url(#teamDotPat)" />
        </svg>
      </motion.div>

      {/* Gradient blobs */}
      <div className="absolute top-20 left-[10%] w-80 h-80 bg-brand-400/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-accent-400/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Widgets */}
      <OrbitRing className="absolute top-12 right-16 hidden lg:block" size={110} color="#8929AC" />
      <OrbitRing className="absolute bottom-24 left-12 hidden lg:block" size={80} color="#eab308" />
      <SpinningGear className="absolute top-[40%] left-8 hidden xl:block" size={60} />
      <FloatingDiamond className="absolute bottom-16 right-[20%] w-7 h-7 hidden md:block" />
      <RotatingCross className="absolute top-32 left-[30%] w-6 h-6 hidden lg:block" color="#8929AC" />
      <FlowingLine className="absolute top-4 left-0 right-0 h-12 opacity-30" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        {/* Section header with dramatic entrance */}
        <div className="text-center mb-20">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500 mb-4"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Leadership
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-5"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
          >
            The People Behind the{' '}
            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Mission</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-500 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Industry veterans building the next generation of enterprise consultants.
          </motion.p>
        </div>

        {/* ── Manuj Gupta — Hero featured card ── */}
        <motion.div
          className="mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.6, rotateX: 25 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 1 }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="relative bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_20px_80px_rgba(124,58,237,0.12)] overflow-hidden group"
            whileHover={{ y: -6, boxShadow: '0 30px 100px rgba(124,58,237,0.18)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr]">
              {/* Photo side */}
              <div className="relative h-72 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-900" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop&q=80"
                  alt="Manuj Gupta"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-80 group-hover:mix-blend-normal transition-all duration-700"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-800/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 md:to-white/20" />

                {/* Animated orbit ring on photo */}
                <motion.div
                  className="absolute top-6 right-6 w-20 h-20 border border-white/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                />
                <motion.div
                  className="absolute top-10 right-10 w-12 h-12 border border-white/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                />

                {/* Name overlay on photo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 20 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Manuj Gupta</h3>
                    <p className="text-brand-200 text-sm font-medium">Founder & CEO</p>
                  </motion.div>
                </div>
              </div>

              {/* Info side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 20 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1 rounded-lg">Orane Consulting</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">Axentia AI</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg">Daksha</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    30+ years in enterprise consulting. Founded Orane Consulting in 2009, growing it into a 500+ consultant SAP practice across India, Canada, Portugal, and Kenya. Now building Axentia AI and the Daksha Career Accelerator.
                  </p>

                  {/* Animated stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { n: '30+', l: 'Years Experience' },
                      { n: '500+', l: 'Consultants Led' },
                      { n: '10+', l: 'Countries' },
                    ].map((s, si) => (
                      <motion.div
                        key={s.l}
                        className="text-center bg-gradient-to-br from-slate-50 to-brand-50/30 rounded-xl p-3 border border-slate-100"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + si * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                      >
                        <p className="text-xl font-bold text-slate-900">{s.n}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{s.l}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.linkedin.com/in/manuj-gupta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#004182] transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20"
                    >
                      <Linkedin className="w-4 h-4" /> Connect
                    </a>
                    <div className="flex gap-2">
                      {['https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=70&fit=crop&q=60', 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=100&h=70&fit=crop&q=60'].map((src, i) => (
                        <motion.div
                          key={i}
                          className="w-16 h-11 rounded-lg overflow-hidden border border-slate-100 shadow-sm"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Team grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, i) => (
            <div key={member.name}>
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(124,58,237,0.15)] transition-shadow duration-500 group h-full flex flex-col">
                {/* Photo with overlay */}
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Company badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${member.color} px-3 py-1 rounded-full shadow-lg`}>
                      {member.company}
                    </span>
                  </div>

                  {/* LinkedIn icon that slides up on hover */}
                  <div className="absolute bottom-3 right-3 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0A66C2] hover:bg-white transition-colors shadow-lg"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Name overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-xs leading-relaxed">{member.desc}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-0.5 group-hover:text-brand-600 transition-colors">{member.name}</h3>
                  <p className="text-brand-600 text-sm font-medium mb-1">{member.role}</p>
                  <p className="text-slate-400 text-xs">{member.company}</p>

                  {/* Animated decorative line */}
                  <motion.div
                    className="mt-auto pt-4"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <div className={`h-0.5 rounded-full bg-gradient-to-r ${member.color} opacity-30`} />
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom flowing line */}
      <FlowingLine className="absolute -bottom-2 left-0 right-0 h-16 opacity-40" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8: CTA — with rotating widgets
   ═══════════════════════════════════════════════════════════════ */

function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 40%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 32]);

  return (
    <section ref={ref} className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <motion.div style={{ scale, borderRadius }} className="relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #8929AC 0%, #C010DA 50%, #E473BA 100%)' }} />
          <div className="absolute -right-8 -bottom-16 font-[family-name:var(--font-playfair)] italic text-[16rem] md:text-[22rem] font-bold text-white/[0.05] leading-none select-none pointer-events-none">D</div>
          <div className="absolute top-12 right-20 w-40 h-40 border border-white/10 rounded-full" />
          <div className="absolute top-24 right-12 w-56 h-56 border border-white/5 rounded-full" />
          {/* Widgets */}
          <OrbitRing className="absolute bottom-8 right-8 hidden md:block" size={100} color="rgba(255,255,255,0.15)" />
          <SpinningGear className="absolute top-8 left-[60%] hidden lg:block" size={60} />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight max-w-2xl">
                Start a{' '}<span className="font-[family-name:var(--font-playfair)] italic text-accent-300">Conversation</span>.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
                Whether you are exploring enterprise transformation programs, workforce development initiatives, institutional partnerships, or industry alliances — Axentia is built for capability. If you are building the future of AI adoption, enterprise transformation, or talent ecosystems, we would welcome the conversation.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4">
                <Link href="/programs" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-4 rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Start Your Journey <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/enterprises" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all">
                  Enterprise Partnerships <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <main className="pt-0">
      <HeroSection />
      <LegacySection />
      <JourneySection />
      <NumbersSection />
      <ValuesSection />
      <EcosystemSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}
