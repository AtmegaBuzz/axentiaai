'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';
import Link from 'next/link';

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

const phases = [
  {
    num: 1,
    name: 'Foundations',
    color: 'from-brand-500 to-brand-700',
    lightBg: 'bg-brand-50',
    border: 'border-brand-200',
    accent: 'text-brand-600',
    description:
      'Students start by understanding how real businesses work. They learn the basics of AI, enterprise systems, and how companies actually use technology to run operations. This stage builds the foundation for thinking and solving problems like a consultant.',
    image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?w=600&h=400&fit=crop&q=80',
    tags: ['Enterprise Systems', 'AI Basics', 'Business Context'],
  },
  {
    num: 2,
    name: 'Practice',
    color: 'from-purple-500 to-purple-700',
    lightBg: 'bg-purple-50',
    border: 'border-purple-200',
    accent: 'text-purple-600',
    description:
      'Learning quickly turns into action. Students begin applying what they learn through exercises, documentation, and AI-assisted research. This is where concepts start turning into real skills.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80',
    tags: ['Hands-on Exercises', 'Documentation', 'AI Research'],
  },
  {
    num: 3,
    name: 'Industry Context',
    color: 'from-indigo-500 to-indigo-700',
    lightBg: 'bg-indigo-50',
    border: 'border-indigo-200',
    accent: 'text-indigo-600',
    description:
      'Students explore how industries like retail and supply chains actually operate. They see how enterprise systems, data, and AI support real business decisions. This helps them connect technology with real-world problems.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
    tags: ['Retail', 'Supply Chain', 'Industry AI'],
  },
  {
    num: 4,
    name: 'Project Experience',
    color: 'from-teal-500 to-teal-700',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200',
    accent: 'text-teal-600',
    description:
      'Students work on simulated consulting projects in small teams. They analyze problems, prepare structured deliverables, and present solutions. This phase builds confidence in working on real business challenges.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
    tags: ['Simulated Projects', 'Teamwork', 'Deliverables'],
  },
  {
    num: 5,
    name: 'Career Readiness',
    color: 'from-accent-500 to-accent-600',
    lightBg: 'bg-accent-50',
    border: 'border-accent-200',
    accent: 'text-accent-600',
    description:
      'The final stage focuses on preparing students for professional environments. They refine communication, structured thinking, and AI-powered productivity. By the end, students are ready to step into enterprise roles with confidence.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80',
    tags: ['Communication', 'AI Productivity', 'Enterprise Ready'],
  },
];

export default function LearningJourneyPage() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=900&fit=crop&q=80"
            alt="Learning Journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(88,23,155,0.7) 0%, rgba(0,0,0,0.4) 60%)' }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10 py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-300 font-semibold uppercase tracking-[0.2em] text-sm mb-5"
          >
            Learning Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight mb-6 max-w-3xl"
          >
            Preparing Students for the{' '}
            <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              AI Era
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/75 max-w-2xl leading-relaxed mb-10"
          >
            AxentiaAI helps students move from AI awareness to enterprise readiness through structured career pathways.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Explore Pathways <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#discuss"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Discuss a Student Program
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PHASES ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-500 mb-3 block">The Journey</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                Five Phases of{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-brand-600">Development</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                A structured learning journey designed to take you from curious beginner to enterprise-ready consultant.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <FadeIn key={phase.num} delay={index * 0.05}>
                <div className={`group relative grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border ${phase.border} shadow-sm hover:shadow-xl transition-shadow duration-300`}>
                  {/* Image side */}
                  <div className={`relative h-56 md:h-auto overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={phase.image}
                      alt={phase.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-40`} />
                    {/* Phase number */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-6xl font-black text-white/25 leading-none">{String(phase.num).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`${phase.lightBg} p-8 md:p-10 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className={`inline-flex items-center gap-2 mb-4`}>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{phase.num}</span>
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${phase.accent}`}>Phase {phase.num}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{phase.name}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.tags.map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-xs font-semibold border ${phase.border} ${phase.lightBg} ${phase.accent}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="discuss" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8 xl:px-12 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
              Explore programs or book a conversation to find the right path for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5"
              >
                Explore Pathways <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs#apply"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-300 text-slate-700 font-semibold px-8 py-4 rounded-full transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Discuss a Student Program
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
