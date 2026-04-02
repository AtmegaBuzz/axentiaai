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
    image: '/images/new_images/hero/team-working-together-1.jpg',
    icon: Search,
  },
  {
    step: 2,
    period: '4–8 weeks',
    title: 'Pilot & Implementation',
    description:
      'We take the highest-value use cases and put them into motion inside your existing systems using your data, processes, and teams.',
    image: '/images/new_images/personas/business-leaders/professionals-meeting.jpg',
    icon: Rocket,
  },
  {
    step: 3,
    period: '3–6 months',
    title: 'Capability Build',
    description:
      'Your teams learn by doing. They engage directly with what has been built, take ownership of it, and start to adapt it.',
    image: '/images/new_images/personas/working-professionals/woman-laptop-checkered.jpg',
    icon: GraduationCap,
  },
  {
    step: 4,
    period: 'Ongoing',
    title: 'Scale with Execution Capacity',
    description:
      'AI-led ways of working extend across teams and geographies, carried by people already trained in how to use and sustain them.',
    image: '/images/new_images/hero/modern-office-collaboration.jpg',
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

  /* Track vertical line progress */
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /* Light up steps as the line reaches them */
  const dotThresholds = timelineItems.map((_, i) => i / (timelineItems.length - 1))
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let newActive = -1
    for (let i = 0; i < dotThresholds.length; i++) {
      if (latest >= dotThresholds[i] - 0.02) newActive = i
    }
    setActiveStep(newActive)
  })

  return (
    <div ref={sectionRef} style={{ height: '300vh' }}>
      <section className="sticky top-0 h-screen bg-white overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">

          {/* Header */}
          <div className="mb-12 md:mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 border border-slate-200 bg-slate-50 mb-4"
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug"
            >
              From first conversation to{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">operating at scale</span>
            </motion.h2>
          </div>

          {/* Timeline grid: 4 columns with vertical line in center */}
          <div className="relative grid grid-cols-4 gap-0">

            {/* Vertical center line (spans all rows) */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-slate-200 hidden md:block" />
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-gradient-to-b from-brand-500 to-brand-400 hidden md:block"
              style={{ height: lineHeight }}
            />

            {/* Step cards — each occupies 1 of 4 columns */}
            {timelineItems.map((item, i) => {
              const Icon = item.icon
              const isActive = i <= activeStep

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative flex flex-col"
                >
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center transition-all duration-500"
                      style={{
                        border: `2px solid ${isActive ? 'var(--color-brand-500, #C010DA)' : '#e2e8f0'}`,
                        backgroundColor: isActive ? 'var(--color-brand-500, #C010DA)' : '#fff',
                      }}
                    >
                      <Icon
                        className="w-4 h-4 transition-colors duration-500"
                        style={{ color: isActive ? '#fff' : '#94a3b8' }}
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest block transition-colors duration-500"
                        style={{ color: isActive ? 'var(--color-brand-500, #C010DA)' : '#94a3b8' }}
                      >
                        Step {item.step}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 tracking-wide">{item.period}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-32 overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed pr-3">{item.description}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>
    </div>
  )
}
