'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Rocket, GraduationCap, TrendingUp } from 'lucide-react'
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
    period: '2–3 days',
    title: 'Discovery Workshop',
    description:
      'We sit with your team to map how work actually moves today, identify where time, effort, and decisions get stuck, and arrive at a clear, practical starting point.',
    image: '/images/new_images/hero/team-working-together-1.jpg',
    icon: Search,
    highlights: ['Process mapping', 'Pain-point analysis', 'Prioritised roadmap'],
  },
  {
    period: '4–8 weeks',
    title: 'Pilot & Implementation',
    description:
      'We take the highest-value use cases and put them into motion inside your existing systems using your data, processes, and teams.',
    image: '/images/new_images/personas/business-leaders/professionals-meeting.jpg',
    icon: Rocket,
    highlights: ['Live integration', 'Real data validation', 'Measurable outcomes'],
  },
  {
    period: '3–6 months',
    title: 'Capability Build',
    description:
      'Your teams learn by doing. They engage directly with what has been built, take ownership of it, and start to adapt it.',
    image: '/images/new_images/personas/working-professionals/woman-laptop-checkered.jpg',
    icon: GraduationCap,
    highlights: ['Hands-on training', 'Knowledge transfer', 'Team enablement'],
  },
  {
    period: 'Ongoing',
    title: 'Scale with Execution Capacity',
    description:
      'AI-led ways of working extend across teams and geographies, carried by people already trained in how to use and sustain them.',
    image: '/images/new_images/hero/modern-office-collaboration.jpg',
    icon: TrendingUp,
    highlights: ['Cross-team rollout', 'Continuous optimisation', 'Sustainable growth'],
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical scroll → horizontal translateX
  // 4 cards, each ~420px + gap. We want to scroll from 0 to roughly -(totalWidth - viewport)
  // Using percentage of the scrollable container width
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  // Track line grows with scroll
  const trackWidth = useTransform(scrollYProgress, [0, 0.95], ['0%', '100%'])

  return (
    <div ref={containerRef} style={{ height: '250vh' }}>
      <section className="sticky top-0 h-screen bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-16 md:pt-20 pb-6 px-6 md:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-50 mb-3">
              How It Works
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
              From first conversation to{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                operating at scale
              </span>
            </h2>
          </div>
        </div>

        {/* Horizontal track line */}
        <div className="px-6 md:px-12 xl:px-20 mb-6">
          <div className="max-w-7xl mx-auto relative">
            <div className="h-[2px] bg-slate-100 w-full" />
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-brand-600 to-brand-400"
              style={{ width: trackWidth }}
            />
            {/* Dots on the track */}
            {timelineItems.map((_, i) => {
              const pos = `${(i / (timelineItems.length - 1)) * 100}%`
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-white"
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
        <div className="flex-1 overflow-hidden px-6 md:px-12 xl:px-20 pb-10">
          <motion.div
            className="flex gap-6 h-full"
            style={{ x }}
          >
            {timelineItems.map((item, i) => {
              const Icon = item.icon

              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85vw] md:w-[42vw] lg:w-[30vw] h-full flex flex-col bg-slate-50 border border-slate-100 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-[45%] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Period badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-brand-500" strokeWidth={2.5} />
                      <span className="text-[11px] font-bold text-slate-700 tracking-wide">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold border border-brand-200 bg-white text-brand-700"
                        >
                          <span className="w-1 h-1 bg-brand-500 flex-shrink-0" />
                          {h}
                        </span>
                      ))}
                    </div>
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
