'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Rocket, GraduationCap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'

interface TimelineEntry {
  period: string
  title: string
  description: string
  image: string
  icon: LucideIcon
  highlights: string[]
}

const timelineItems: TimelineEntry[] = [
  {
    period: 'Step 01',
    title: 'Diagnose',
    description:
      'Identify where AI creates real business value and surface the two or three priorities worth acting on first.',
    image: '/images/how-it-works/discovery-workshop.jpg',
    icon: Search,
    highlights: ['Workflow mapping', 'Opportunity ranking', 'Readiness gap view'],
  },
  {
    period: 'Step 02',
    title: 'Design',
    description:
      'Build the business case, map the workflow, and create a structured execution roadmap with clear ownership.',
    image: '/images/how-it-works/pilot-implementation.jpg',
    icon: Rocket,
    highlights: ['Business case', 'Execution roadmap', 'Named ownership'],
  },
  {
    period: 'Step 03',
    title: 'Deploy',
    description:
      'Launch focused pilots and workflow accelerators. Build capability alongside execution so adoption is embedded.',
    image: '/images/how-it-works/capability-build.jpg',
    icon: GraduationCap,
    highlights: ['Focused pilots', 'Workflow accelerators', 'Embedded adoption'],
  },
  {
    period: 'Step 04',
    title: 'Scale',
    description:
      'Measure outcomes, expand what works, and build the internal capability to sustain AI adoption without dependency.',
    image: '/images/how-it-works/scale-with-execution-capacity.jpg',
    icon: TrendingUp,
    highlights: ['Outcome measurement', 'Cross-team rollout', 'Internal capability'],
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical scroll → horizontal translateX
  // 4 cards + gaps + container padding; shift enough to bring last card flush to right
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])

  // Track line grows with scroll
  const trackWidth = useTransform(scrollYProgress, [0, 0.95], ['0%', '100%'])

  return (
    <div ref={containerRef} style={{ height: '160vh' }}>
      <section className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Background image + dark overlay — matches Programs section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/programs/programs-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-16 md:pt-20 pb-6 px-6 md:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-300 border border-accent-300/20 bg-accent-300/8 mb-3">
              How we work
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              From diagnosis to{' '}
              <span className="font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-[#F7C87A] via-[#F3B15F] to-[#E89B3A] bg-clip-text text-transparent">
                deployed outcome
              </span>
            </h2>
            <p className="text-xs md:text-sm text-white/55 leading-relaxed mt-3 max-w-2xl">
              Four steps. Clear ownership. No ambiguity about what happens next.
            </p>
          </div>
        </div>

        {/* Horizontal track line */}
        <div className="relative z-10 px-6 md:px-12 xl:px-20 mb-6">
          <div className="max-w-7xl mx-auto relative">
            <div className="h-[2px] bg-white/10 w-full" />
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 to-brand-300"
              style={{ width: trackWidth }}
            />
            {timelineItems.map((_, i) => {
              const pos = `${(i / (timelineItems.length - 1)) * 100}%`
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/80"
                  style={{
                    left: pos,
                    marginLeft: '-6px',
                    backgroundColor: '#C010DA',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Scrolling cards area */}
        <div className="relative z-10 flex-1 overflow-hidden px-6 md:px-12 xl:px-20 pb-10">
          <motion.div
            className="flex gap-6 items-stretch"
            style={{ x }}
          >
            {timelineItems.map((item, i) => {
              const Icon = item.icon

              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85vw] md:w-[42vw] lg:w-[30vw] flex flex-col rounded-2xl bg-white shadow-sm overflow-hidden group"
                >
                  <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 42vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 backdrop-blur-sm px-3 py-1 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-brand-500" strokeWidth={2.5} />
                      <span className="text-[11px] font-bold text-slate-700 tracking-wide">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
