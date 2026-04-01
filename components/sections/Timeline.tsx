'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Search, Rocket, GraduationCap, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TimelineEntry {
  step: number
  period: string
  title: string
  description: string
  image: string
  icon: LucideIcon
}

const timelineItems: TimelineEntry[] = [
  {
    step: 1,
    period: '2–3 days',
    title: 'Discovery Workshop',
    description:
      'We sit with your team to map how work actually moves today, identify where time, effort, and decisions get stuck, and arrive at a clear, practical starting point.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80',
    icon: Search,
  },
  {
    step: 2,
    period: '4–8 weeks',
    title: 'Pilot & Implementation',
    description:
      'We take the highest-value use cases and put them into motion inside your existing systems using your data, processes, and teams.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
    icon: Rocket,
  },
  {
    step: 3,
    period: '3–6 months',
    title: 'Capability Build',
    description:
      'Your teams learn by doing. They engage directly with what has been built, take ownership of it, and start to adapt it.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
    icon: GraduationCap,
  },
  {
    step: 4,
    period: 'Ongoing',
    title: 'Scale with Execution Capacity',
    description:
      'AI-led ways of working extend across teams and geographies, carried by people already trained in how to use and sustain them.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80',
    icon: TrendingUp,
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const [activeStep, setActiveStep] = useState(-1)

  /* Map vertical scroll to horizontal card movement */
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])
  /* Track line progress */
  const trackWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /* Light up dots as the line reaches them */
  const dotThresholds = timelineItems.map((_, i) => i / (timelineItems.length - 1))
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let newActive = -1
    for (let i = 0; i < dotThresholds.length; i++) {
      if (latest >= dotThresholds[i] - 0.02) newActive = i
    }
    setActiveStep(newActive)
  })

  return (
    /* Tall outer wrapper — the extra height is what the user scrolls through.
       The visible content is pinned with sticky so it feels like the page
       "pauses" while the cards scroll horizontally. */
    <div ref={sectionRef} style={{ height: '300vh' }}>
      <section className="sticky top-0 h-screen bg-slate-50 overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">

          {/* Header */}
          <div className="mb-10 md:mb-14">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest mb-3"
            >
              <span className="inline-block px-2 py-0.5 rounded-md" style={{ background: '#F7C87A', color: '#232322' }}>
                How It Works
              </span>
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug"
            >
              From first conversation to{' '}
              <span className="font-cursive italic text-brand-600 text-[1.05em]">operating at scale</span>
            </motion.h2>
          </div>

          {/* Horizontal track line */}
          <div className="relative mb-8">
            {/* Dots row */}
            <div className="relative flex justify-between">
              {timelineItems.map((item, i) => {
                const Icon = item.icon
                const isActive = i <= activeStep
                return (
                  <div key={item.step} className="flex flex-col items-center gap-2 z-10">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        border: `3px solid ${isActive ? 'var(--color-brand-500, #C010DA)' : '#e2e8f0'}`,
                        backgroundColor: isActive ? 'var(--color-brand-500, #C010DA)' : '#fff',
                        boxShadow: isActive
                          ? '0 0 0 5px rgba(192, 16, 218, 0.15), 0 0 16px rgba(192, 16, 218, 0.3)'
                          : '0 1px 3px rgba(0,0,0,0.06)',
                      }}
                    >
                      <Icon className="w-4 h-4 transition-colors duration-500" style={{ color: isActive ? '#fff' : '#94a3b8' }} strokeWidth={2} />
                    </div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-500"
                      style={{ color: isActive ? 'var(--color-brand-500, #C010DA)' : '#94a3b8' }}
                    >
                      Step {item.step}
                    </span>
                  </div>
                )
              })}
            </div>
            {/* Lines — positioned to cross through the center of the dots (18px = half of 36px dot) */}
            <div className="absolute left-0 right-0 top-[18px] -translate-y-1/2 h-[3px] bg-slate-200" />
            <motion.div
              className="absolute left-0 top-[18px] -translate-y-1/2 h-[3px]"
              style={{
                width: trackWidth,
                background: 'linear-gradient(to right, var(--color-brand-400, #D44DC8), var(--color-brand-600, #A20EBF))',
              }}
            />
          </div>

          {/* Scroll-driven horizontal cards */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              style={{ x }}
            >
              {timelineItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.step} className="flex-shrink-0 w-[320px] md:w-[380px] flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 text-xs font-mono tracking-wider uppercase text-white/80">
                        {item.period}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-brand-600" strokeWidth={2} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed pl-11">{item.description}</p>
                  </div>
                )
              })}
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  )
}
