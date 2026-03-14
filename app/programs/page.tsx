'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  MapPin,
  Zap,
  CheckCircle2,
  Award,
  BookOpen,
  Users,
  Briefcase,
  Star,
  TrendingUp,
  Globe,
  AlertTriangle,
  ChevronDown,
  Plus,
  Minus,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Target,
  Shield,
  Brain,
  MessageSquare,
  FileText,
  Settings,
  Play,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   FADE-IN HELPER
   ═══════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════
   TAB TYPES
   ═══════════════════════════════════════════════════════════════ */

type ProgramTab = 'dcap' | 'eap' | 'online' | 'compare';

/* ═══════════════════════════════════════════════════════════════
   SECTION 1: HERO — with program tabs
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({ activeTab, setActiveTab }: { activeTab: ProgramTab; setActiveTab: (t: ProgramTab) => void }) {
  const tabs: { id: ProgramTab; label: string }[] = [
    { id: 'dcap', label: 'DCAP' },
    { id: 'eap', label: 'EAP' },
    { id: 'online', label: 'Online' },
    { id: 'compare', label: 'Compare All' },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Graduation video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/graduation-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/graduation-celebration.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-500/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-400/15 rounded-full blur-[100px] z-0" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        <FadeIn>
          <p className="text-brand-300 font-semibold uppercase tracking-[0.2em] text-sm mb-5">Programs</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Choose your{' '}
            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">path</span>.
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-xl text-indigo-200/80 max-w-2xl leading-relaxed mb-10">
            Three programs, one goal: build enterprise-ready consultants. Pick the track that fits where you are.
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: DCAP — Full detail
   ═══════════════════════════════════════════════════════════════ */

function DCAPSection() {
  return (
    <div>
      {/* DCAP Header */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Most Popular</span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                DCAP, Daksha Career Accelerator Program
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl">
                Our flagship program. A 10-month pathway designed to turn graduates into enterprise-ready SAP consultants. 4 months classroom learning followed by 6 months paid apprenticeship on real projects.
              </p>
            </FadeIn>

            {/* Meta badges */}
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <Clock className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-semibold text-slate-700">10-12 months total</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-semibold text-slate-700">Noida, In-person</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <Zap className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-semibold text-slate-700">Full-time commitment</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:-translate-y-0.5 transition-all"
              >
                Apply for DCAP <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-4">Program Highlights</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                '✅ Learn how SAP supports real business',
                '✅ Enterprise process flows (P2P, O2C, R2R, H2R)',
                '✅ SAP S/4HANA core modules (MM, FICO, SD)',
                '✅ 6 months paid apprenticeship',
                '✅ Real project work, practitioner-reviewed',
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DCAP Curriculum */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">DCAP Curriculum</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                What you&apos;ll learn.
              </h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-slate-600 mb-12 max-w-2xl">
                4 months of structured learning, building from business basics to hands-on SAP configuration.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Briefcase className="w-6 h-6" />,
                  title: 'Business Processes',
                  period: 'Weeks 1-3',
                  items: ['Procure-to-Pay (P2P)', 'Order-to-Cash (O2C)', 'Record-to-Report (R2R)', 'Hire-to-Retire (H2R)'],
                },
                {
                  icon: <Settings className="w-6 h-6" />,
                  title: 'SAP Foundations',
                  period: 'Weeks 4-8',
                  items: ['S/4HANA architecture', 'Navigation & UI', 'Master data concepts', 'Integration basics'],
                },
                {
                  icon: <Brain className="w-6 h-6" />,
                  title: 'Module Deep-Dive',
                  period: 'Weeks 9-14',
                  items: ['MM — Materials Management', 'FICO — Finance & Controlling', 'SD — Sales & Distribution', 'Configuration exercises'],
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: 'Consulting Skills',
                  period: 'Throughout',
                  items: ['Documentation standards', 'Client communication', 'Meeting discipline', 'Professional judgement'],
                },
              ].map((block, i) => (
                <FadeIn key={block.title} delay={i * 0.08}>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-4 text-brand-600">
                      {block.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{block.title}</h4>
                    <p className="text-xs text-brand-600 font-semibold mb-4">{block.period}</p>
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                        <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DCAP Journey */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">DCAP Journey</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-12">
                From trainee to consultant.
              </h3>
            </FadeIn>

            <div className="space-y-0">
              {[
                {
                  step: '1',
                  title: 'Foundation Training',
                  meta: 'Months 1-4 \u00B7 Full-time \u00B7 Classroom',
                  desc: 'Business processes, SAP modules, configuration practice, consulting fundamentals. Daily learning with hands-on exercises.',
                  color: 'border-brand-500',
                  bg: 'bg-brand-50',
                },
                {
                  step: '2',
                  title: 'Paid Apprenticeship',
                  meta: 'Months 5-12 \u00B7 Paid \u00B7 Real Projects',
                  desc: 'Join actual project teams. Configuration, testing, documentation on live work. Practitioner review and feedback. Paid monthly stipend.',
                  color: 'border-indigo-500',
                  bg: 'bg-indigo-50',
                },
                {
                  step: '3',
                  title: 'Deployment',
                  meta: 'Post-completion',
                  desc: 'Ready consultants join delivery teams at Orane and partner firms. Continue growing through real engagements.',
                  color: 'border-accent-500',
                  bg: 'bg-accent-50',
                },
              ].map((phase, i) => (
                <FadeIn key={phase.step} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-8">
                    {/* Timeline line + dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full ${phase.bg} border-2 ${phase.color} flex items-center justify-center text-sm font-bold text-slate-700 shrink-0`}>
                        {phase.step}
                      </div>
                      {i < 2 && <div className="w-px h-full bg-slate-200 min-h-[40px]" />}
                    </div>
                    <div className={`pb-10 ${i === 2 ? 'pb-0' : ''}`}>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{phase.title}</h4>
                      <p className="text-sm text-brand-600 font-medium mb-3">{phase.meta}</p>
                      <p className="text-slate-600 leading-relaxed max-w-xl">{phase.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: EAP — Elite Acceleration Program
   ═══════════════════════════════════════════════════════════════ */

function EAPSection() {
  return (
    <div>
      {/* EAP Header */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Merit-Based</span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                EAP, Elite Acceleration Program
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl">
                For high performers who&apos;ve proven themselves. Cross-module depth, industry solutioning, presales exposure. Not everyone gets invited — that&apos;s the point.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-slate-700">By invitation only</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-slate-700">Noida + Project sites</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold text-slate-700">Accelerated track</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
              >
                Express Interest <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What EAP Covers */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4">What EAP Covers</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                '🔗 Cross-module integration across SAP processes',
                '📊 Presales support and effort estimation',
                '🤖 AI use cases within enterprise environments',
                '🎯 Managing larger responsibilities within project teams',
                '🚀 Leadership & ownership development',
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">Selection Criteria</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                How do you qualify?
              </h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-slate-600 mb-12 max-w-2xl">
                EAP isn&apos;t applied for, it&apos;s earned. Here&apos;s what we look for.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  title: 'Consistent Performance',
                  desc: 'Strong delivery during DCAP and apprenticeship. Meeting deadlines, quality documentation, no repeated mistakes.',
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Ownership Mindset',
                  desc: 'Taking responsibility beyond assigned tasks. Anticipating problems. Helping teammates. Thinking like a consultant.',
                },
                {
                  icon: <Brain className="w-6 h-6" />,
                  title: 'Learning Velocity',
                  desc: 'Quick to pick up new concepts. Asking smart questions. Applying feedback without being told twice.',
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Team Credibility',
                  desc: 'Respected by peers and practitioners. Someone managers want on their project. Trusted with client interactions.',
                },
              ].map((criteria, i) => (
                <FadeIn key={criteria.title} delay={i * 0.08}>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 h-full">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
                      {criteria.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{criteria.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{criteria.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4: ONLINE PROGRAM
   ═══════════════════════════════════════════════════════════════ */

function OnlineSection() {
  return (
    <div>
      {/* Online Header */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Self-Paced</span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                Online Program
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl">
                Test the waters before committing. Learn SAP fundamentals at your own pace. A pathway to DCAP for those who want to explore first.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl">
                Start with the Basics. A self-paced introduction to SAP fundamentals and enterprise processes for those exploring a career in enterprise consulting.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-700">Fully remote</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-semibold text-slate-700">Self-paced</span>
                </div>
                <div className="flex items-center gap-2.5 bg-teal-50 border border-teal-200 rounded-xl px-5 py-3">
                  <span className="text-sm font-semibold text-teal-700">🔜 Upcoming</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-teal-600/25 hover:bg-teal-700 hover:-translate-y-0.5 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-4">What&apos;s Included</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                '📚 SAP fundamentals and core concepts',
                '🏭 How enterprise business processes work',
                '📋 Structured introductory learning modules',
                '🔑 The basics needed to understand SAP consulting environments',
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">Important Note</p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                What Online doesn&apos;t include.
              </h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-slate-600 mb-12 max-w-2xl">
                Be clear about what you&apos;re getting. Online is for exploration — the real transformation happens in DCAP.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <AlertTriangle className="w-6 h-6" />,
                  title: 'No Apprenticeship',
                  desc: "You won't get paid project experience. That's only available through DCAP.",
                },
                {
                  icon: <AlertTriangle className="w-6 h-6" />,
                  title: 'No Deployment',
                  desc: "Online doesn't lead directly to deployment. It's a pathway to DCAP, not a replacement.",
                },
                {
                  icon: <AlertTriangle className="w-6 h-6" />,
                  title: 'No Practitioner Review',
                  desc: "Self-paced means self-directed. You won't get the feedback loop that makes DCAP transformative.",
                },
                {
                  icon: <ArrowRight className="w-6 h-6" />,
                  title: 'DCAP Pathway',
                  desc: 'Strong Online performance can strengthen your DCAP application if you decide to commit.',
                },
              ].map((note, i) => (
                <FadeIn key={note.title} delay={i * 0.08}>
                  <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-7 h-full">
                    <div className="w-12 h-12 rounded-xl bg-amber-100/50 border border-amber-200/50 flex items-center justify-center mb-4 text-amber-600">
                      {note.icon}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{note.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{note.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5: COMPARE PROGRAMS TABLE
   ═══════════════════════════════════════════════════════════════ */

function CompareSection() {
  const features = [
    { name: 'Duration', dcap: '10-12 months', eap: 'Ongoing (post-DCAP)', online: 'Self-paced' },
    { name: 'Format', dcap: 'In-person, Noida', eap: 'In-person + Projects', online: 'Fully remote' },
    { name: 'Commitment', dcap: 'Full-time', eap: 'Full-time', online: 'Flexible' },
    { name: 'Foundation Training', dcap: true, dcapNote: '4 months', eap: false, eapNote: '—', online: true, onlineNote: 'Basics only' },
    { name: 'Paid Apprenticeship', dcap: true, dcapNote: '6-8 months', eap: true, eapNote: 'Continued', online: false, onlineNote: '' },
    { name: 'Real Project Work', dcap: true, eap: true, eapNote: 'Advanced', online: false },
    { name: 'Practitioner Review', dcap: true, eap: true, online: false },
    { name: 'Deployment to Partners', dcap: true, eap: true, eapNote: 'Accelerated', online: false },
    { name: 'Entry', dcap: 'Application', eap: 'Invitation only', online: 'Open enrollment' },
    { name: 'Best For', dcap: 'Career starters, career changers', eap: 'High performers', online: 'Explorers' },
  ];

  const renderCell = (val: string | boolean | undefined, note?: string) => {
    if (typeof val === 'boolean') {
      return (
        <div className="flex items-center gap-1.5">
          {val ? (
            <CheckCircle2 className="w-5 h-5 text-brand-500" />
          ) : (
            <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">&times;</span>
          )}
          {note && <span className="text-xs text-slate-500">{note}</span>}
        </div>
      );
    }
    return <span className="text-sm text-slate-700">{val}</span>;
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">Compare Programs</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Side-by-side.
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl">
              Not sure which program fits? Here&apos;s everything in one view.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 pr-4 text-sm font-bold text-slate-500 uppercase tracking-wider w-[200px]">Feature</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-brand-600 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-500" />
                        DCAP
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-indigo-600 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        EAP
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-teal-600 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-500" />
                        Online
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={f.name} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-4 pr-4 text-sm font-semibold text-slate-900">{f.name}</td>
                      <td className="py-4 px-4">
                        {renderCell(
                          typeof f.dcap === 'string' ? f.dcap : f.dcap,
                          'dcapNote' in f ? (f as Record<string, unknown>).dcapNote as string : undefined
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {renderCell(
                          typeof f.eap === 'string' ? f.eap : f.eap,
                          'eapNote' in f ? (f as Record<string, unknown>).eapNote as string : undefined
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {renderCell(
                          typeof f.online === 'string' ? f.online : f.online,
                          'onlineNote' in f ? (f as Record<string, unknown>).onlineNote as string : undefined
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6: APPLICATION PROCESS
   ═══════════════════════════════════════════════════════════════ */

function ApplicationSection() {
  const steps = [
    {
      num: '01',
      title: 'Inquiry',
      desc: "Fill out the form. Tell us about yourself and why you're interested.",
    },
    {
      num: '02',
      title: 'Conversation',
      desc: "We'll schedule a call to understand your goals and answer questions.",
    },
    {
      num: '03',
      title: 'Assessment',
      desc: 'A simple evaluation to understand your baseline and learning approach.',
    },
    {
      num: '04',
      title: 'Enrollment',
      desc: "If we're both a fit, you'll receive an offer to join the next cohort.",
    },
  ];

  return (
    <section id="apply" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">Application Process</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              How to apply for DCAP.
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-600 mb-14 max-w-2xl">
              We&apos;re looking for fit and commitment, not just qualifications.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="relative bg-white border border-slate-200 rounded-2xl p-7 h-full">
                  <p className="text-4xl font-bold text-brand-100 mb-4">{step.num}</p>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="w-5 h-5 text-brand-300" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7: IMPACT — Stats
   ═══════════════════════════════════════════════════════════════ */

function ImpactSection() {
  const stats = [
    { value: '100+', label: 'Careers Launched', sub: 'Through Daksha programs' },
    { value: '95%', label: 'Placement Rate', sub: 'Within 3 months of completion' },
    { value: '500+', label: 'Active Consultants', sub: 'At Orane Consulting' },
    { value: '30+', label: 'Years Experience', sub: 'Enterprise delivery legacy' },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #58179B 0%, #8929AC 30%, #C010DA 60%, #E473BA 100%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-400/20 rounded-full blur-[150px]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 400">
        {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 120} y1="0" x2={i * 120} y2="400" stroke="white" strokeWidth="1" />)}
        {Array.from({ length: 5 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2="1440" y2={i * 100} stroke="white" strokeWidth="1" />)}
      </svg>

      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300 mb-3">Impact</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">The Numbers Speak</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">{s.value}</p>
              <p className="text-lg font-semibold text-white/90 mb-1">{s.label}</p>
              <p className="text-sm text-white/50">{s.sub}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8: FACULTY MEMBERS
   ═══════════════════════════════════════════════════════════════ */

const faculty = [
  {
    name: 'Manuj Gupta',
    role: 'Founder & Lead Mentor',
    specialization: 'SAP Strategy & Enterprise Delivery',
    bio: '30+ years of enterprise consulting experience. Built Orane Consulting into a 500+ consultant SAP practice across 4 countries.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80',
    linkedin: 'https://www.linkedin.com/in/manuj-gupta',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Academics',
    specialization: 'SAP MM & FICO',
    bio: 'Former SAP Practice Lead with 15+ years of delivery experience across Fortune 500 implementations.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Senior Faculty',
    specialization: 'SAP SD & Enterprise Integration',
    bio: 'Scaled consulting operations across 10+ countries with deep expertise in Sales & Distribution.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
  },
  {
    name: 'Anita Verma',
    role: 'Head of Placements',
    specialization: 'Career Strategy & Industry Connect',
    bio: 'Built talent pipelines for Fortune 500 companies. Expert in enterprise consulting career pathways.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
  },
  {
    name: 'Vikram Singh',
    role: 'AI & Technology Faculty',
    specialization: 'AI/ML & SAP BTP',
    bio: 'AI/ML architect building next-gen enterprise solutions. Leads the Data & AI curriculum.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
  },
  {
    name: 'Meera Patel',
    role: 'Head of Curriculum',
    specialization: 'Process Design & Documentation',
    bio: 'Designed enterprise-grade training for 1000+ professionals across SAP modules.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80',
    linkedin: '#',
  },
];

function FacultySection() {
  return (
    <section id="faculty" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">Faculty</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              The People Behind the{' '}
              <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Program</span>
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Industry veterans who&apos;ve delivered on real enterprise projects, now mentoring the next generation.
            </p>
          </FadeIn>

          {/* Featured: Manuj Gupta */}
          <FadeIn delay={0.1}>
            <div className="mb-12 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr]">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-900" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={faculty[0].photo}
                    alt={faculty[0].name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-800/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">{faculty[0].name}</h4>
                    <p className="text-brand-200 text-sm font-medium">{faculty[0].role}</p>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1 rounded-lg">Orane Consulting</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">Axentia AI</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg">Daksha</span>
                  </div>
                  <p className="text-xs text-brand-600 font-semibold uppercase tracking-wider mb-2">{faculty[0].specialization}</p>
                  <p className="text-slate-600 leading-relaxed mb-6">{faculty[0].bio}</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { n: '30+', l: 'Years Experience' },
                      { n: '500+', l: 'Consultants Led' },
                      { n: '10+', l: 'Countries' },
                    ].map((s) => (
                      <div key={s.l} className="text-center bg-white rounded-xl p-3 border border-slate-100">
                        <p className="text-xl font-bold text-slate-900">{s.n}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={faculty[0].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#004182] transition-all w-fit"
                  >
                    <Linkedin className="w-4 h-4" /> Connect
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Faculty grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.slice(1).map((member, i) => (
              <FadeIn key={member.name} delay={(i + 1) * 0.06}>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 right-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0A66C2] hover:bg-white transition-colors shadow-lg"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-slate-900 mb-0.5 group-hover:text-brand-600 transition-colors">{member.name}</h4>
                    <p className="text-brand-600 text-sm font-medium mb-1">{member.role}</p>
                    <p className="text-xs text-slate-400 font-medium mb-3">{member.specialization}</p>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{member.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9: GRADUATION CEREMONY & PHOTOS
   ═══════════════════════════════════════════════════════════════ */

const ceremonyImages = [
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&q=80', alt: 'Graduation ceremony' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80', alt: 'Classroom learning' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80', alt: 'Mentorship session' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&q=80', alt: 'Project presentation' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80', alt: 'Workshop in progress' },
  { src: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop&q=80', alt: 'Certificate distribution' },
  { src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop&q=80', alt: 'Campus life' },
];

function CeremonySection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">Life at Daksha</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Inside the{' '}
              <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Experience</span>
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
              A first-hand look at how our cohorts learn, collaborate, and graduate into consulting careers.
            </p>
          </FadeIn>

          {/* Video embed */}
          <FadeIn delay={0.1}>
            <div className="relative max-w-4xl mx-auto mb-14 rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-video bg-slate-900">
              <iframe
                src="https://www.youtube.com/embed/tTpmml4ndWM"
                title="Daksha Career Accelerator"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </FadeIn>

          {/* Photo grid — symmetrical layout
              Desktop (lg): 4-column grid with explicit placement
              Row 1: [wide 2-col] [square] [square]
              Row 2: [square] [square] [wide 2-col]
              Tablet (sm): 2-column simple grid
              Mobile: single column
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px]">
            {/* Image 1 — wide, spans 2 cols on desktop */}
            <FadeIn delay={0.04} className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[0].src} alt={ceremonyImages[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[0].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 2 — single cell */}
            <FadeIn delay={0.08}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[1].src} alt={ceremonyImages[1].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[1].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 3 — single cell */}
            <FadeIn delay={0.12}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[2].src} alt={ceremonyImages[2].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[2].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 4 — single cell */}
            <FadeIn delay={0.16}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[3].src} alt={ceremonyImages[3].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[3].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 5 — single cell */}
            <FadeIn delay={0.20}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[4].src} alt={ceremonyImages[4].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[4].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 6 — wide, spans 2 cols on desktop (mirrors row 1) */}
            <FadeIn delay={0.24} className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[5].src} alt={ceremonyImages[5].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[5].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 7 — single cell */}
            <FadeIn delay={0.28}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[6].src} alt={ceremonyImages[6].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[6].alt}</p>
                </div>
              </div>
            </FadeIn>

            {/* Image 8 — single cell */}
            <FadeIn delay={0.32}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 group h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ceremonyImages[7].src} alt={ceremonyImages[7].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-medium">{ceremonyImages[7].alt}</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Axentia Logo watermark */}
          <FadeIn delay={0.3} className="flex justify-center mt-10">
            <Image src="/brand/axentia-logo.png" alt="Axentia AI" width={120} height={40} className="opacity-30" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10: FAQ
   ═══════════════════════════════════════════════════════════════ */

const faqs = [
  {
    q: 'Do I need prior SAP experience?',
    a: 'No. DCAP is designed for beginners. We start from business process fundamentals and build up systematically. What matters is your commitment to learning and your willingness to put in the work.',
  },
  {
    q: "What's the investment for DCAP?",
    a: 'Contact us for current fee details. DCAP includes 4 months of intensive training and 6-8 months of paid apprenticeship. The apprenticeship phase includes a monthly stipend.',
  },
  {
    q: 'Is placement guaranteed?',
    a: "We don't guarantee placement, we prepare you for it. Graduates who complete the full program and meet performance standards are deployed to Orane Consulting and partner firms. Our track record speaks for itself.",
  },
  {
    q: 'When does the next batch start?',
    a: 'We run multiple batches throughout the year. Contact us through the inquiry form for the next available start date.',
  },
  {
    q: 'Can I switch from Online to DCAP?',
    a: 'Yes. Strong performance in the Online program can strengthen your DCAP application. The Online program is designed as a pathway for those who want to explore before committing to the full program.',
  },
  {
    q: 'What if I can\'t relocate to Noida?',
    a: 'DCAP requires full-time, in-person attendance in Noida. This is non-negotiable because the learning methodology depends on daily interaction, mentorship, and supervised practice. If relocation isn\'t possible, the Online program may be a starting point.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-3">FAQ</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-12">
              Common questions.
            </h3>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 0.04}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-200 transition-colors">
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <span className={`font-bold text-base md:text-lg transition-colors pr-4 ${openIndex === idx ? 'text-brand-600' : 'text-slate-900'}`}>
                      {faq.q}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-slate-500'}`}>
                      {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-slate-600 leading-relaxed text-sm border-t border-slate-100 mt-1 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11: CTA
   ═══════════════════════════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #8929AC 0%, #C010DA 50%, #E473BA 100%)' }} />
          <div className="absolute -right-8 -bottom-16 font-[family-name:var(--font-playfair)] italic text-[16rem] md:text-[22rem] font-bold text-white/[0.05] leading-none select-none pointer-events-none">D</div>
          <div className="absolute top-12 right-20 w-40 h-40 border border-white/10 rounded-full" />
          <div className="absolute top-24 right-12 w-56 h-56 border border-white/5 rounded-full" />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight max-w-2xl">
                Ready to start your{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-accent-300">journey</span>?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
                The first step is a conversation. No pressure, just clarity about whether this is right for you.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#apply"
                  className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-4 rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/enterprises"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  Enterprise Partnerships <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════ */

function ProgramsPageInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ProgramTab>('dcap');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['dcap', 'eap', 'online', 'compare'].includes(tab)) {
      setActiveTab(tab as ProgramTab);
    }
  }, [searchParams]);

  return (
    <main className="pt-0">
      <HeroSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'dcap' && (
          <motion.div key="dcap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <DCAPSection />
          </motion.div>
        )}
        {activeTab === 'eap' && (
          <motion.div key="eap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <EAPSection />
          </motion.div>
        )}
        {activeTab === 'online' && (
          <motion.div key="online" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <OnlineSection />
          </motion.div>
        )}
        {activeTab === 'compare' && (
          <motion.div key="compare" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <CompareSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always visible sections */}
      <ApplicationSection />
      <ImpactSection />
      <FacultySection />
      <CeremonySection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={null}>
      <ProgramsPageInner />
    </Suspense>
  );
}
