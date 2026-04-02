'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Search, Rocket, GraduationCap, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TimelineEntry {
  step: number
  period: string
  title: string
  description: string
  image: string
  icon: LucideIcon
  highlights: string[]
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
    highlights: ['Process mapping', 'Pain-point analysis', 'Prioritised roadmap'],
  },
  {
    step: 2,
    period: '4–8 weeks',
    title: 'Pilot & Implementation',
    description:
      'We take the highest-value use cases and put them into motion inside your existing systems using your data, processes, and teams.',
    image: '/images/new_images/personas/business-leaders/professionals-meeting.jpg',
    icon: Rocket,
    highlights: ['Live integration', 'Real data validation', 'Measurable outcomes'],
  },
  {
    step: 3,
    period: '3–6 months',
    title: 'Capability Build',
    description:
      'Your teams learn by doing. They engage directly with what has been built, take ownership of it, and start to adapt it.',
    image: '/images/new_images/personas/working-professionals/woman-laptop-checkered.jpg',
    icon: GraduationCap,
    highlights: ['Hands-on training', 'Knowledge transfer', 'Team enablement'],
  },
  {
    step: 4,
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 0.95], [0, 100])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(
      timelineItems.length - 1,
      Math.floor(latest * timelineItems.length)
    )
    setActiveStep(step)
  })

  return (
    <div ref={sectionRef} style={{ height: '350vh' }}>
      <section className="sticky top-0 h-screen bg-white overflow-hidden">
        <div className="h-full flex flex-col">

          {/* ── Top bar: header + horizontal stepper ── */}
          <div className="pt-12 md:pt-16 pb-6 md:pb-8 px-4 md:px-8 xl:px-12">
            <div className="container mx-auto max-w-6xl">
              {/* Header */}
              <div className="text-center mb-8 md:mb-10">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 bg-slate-50 mb-4">
                  How It Works
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                  From first conversation to{' '}
                  <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                    operating at scale
                  </span>
                </h2>
              </div>

              {/* ── Horizontal stepper ── */}
              <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                {/* Background track */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-slate-200" />
                {/* Animated fill */}
                <motion.div
                  className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-brand-600 to-brand-500"
                  style={{
                    width: `${(activeStep / (timelineItems.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />

                {timelineItems.map((item, i) => {
                  const Icon = item.icon
                  const isActive = i <= activeStep
                  const isCurrent = i === activeStep

                  return (
                    <div key={item.step} className="relative z-10 flex flex-col items-center">
                      {/* Node */}
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.15 : 1,
                          backgroundColor: isActive ? '#C010DA' : '#fff',
                          borderColor: isActive ? '#C010DA' : '#e2e8f0',
                        }}
                        transition={{ duration: 0.4 }}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2"
                        style={{ borderRadius: 0 }}
                      >
                        <Icon
                          className="w-4 h-4 md:w-5 md:h-5"
                          style={{ color: isActive ? '#fff' : '#94a3b8' }}
                          strokeWidth={2}
                        />
                      </motion.div>
                      {/* Label below node */}
                      <div className="mt-2 text-center">
                        <span
                          className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest block transition-colors duration-300"
                          style={{ color: isActive ? '#C010DA' : '#94a3b8' }}
                        >
                          Step {item.step}
                        </span>
                        <span className="hidden md:block text-[10px] text-slate-400 font-medium mt-0.5">
                          {item.period}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Main content area ── */}
          <div className="flex-1 px-4 md:px-8 xl:px-12 pb-8 overflow-hidden">
            <div className="container mx-auto max-w-6xl h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full"
                >
                  {(() => {
                    const item = timelineItems[activeStep]
                    const Icon = item.icon
                    const isEven = activeStep % 2 === 0

                    return (
                      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 h-full items-center ${isEven ? '' : 'md:[direction:rtl]'}`}>
                        {/* Image side */}
                        <div className={`relative h-48 md:h-full overflow-hidden ${isEven ? '' : 'md:[direction:ltr]'}`}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          {/* Step badge on image */}
                          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                            <Icon className="w-3.5 h-3.5 text-brand-500" strokeWidth={2.5} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                              Step {item.step}
                            </span>
                          </div>
                          {/* Period badge */}
                          <div className="absolute bottom-4 left-4 bg-brand-500 px-4 py-1.5">
                            <span className="text-xs font-bold text-white tracking-wide">
                              {item.period}
                            </span>
                          </div>
                        </div>

                        {/* Content side */}
                        <div className={`flex flex-col justify-center py-2 md:py-8 ${isEven ? '' : 'md:[direction:ltr]'}`}>
                          {/* Large step number */}
                          <span className="text-6xl md:text-8xl font-black text-slate-100 leading-none mb-2 select-none">
                            0{item.step}
                          </span>
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 max-w-md">
                            {item.description}
                          </p>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2">
                            {item.highlights.map((h) => (
                              <span
                                key={h}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-brand-200 bg-brand-50 text-brand-700"
                              >
                                <span className="w-1.5 h-1.5 bg-brand-500" />
                                {h}
                              </span>
                            ))}
                          </div>

                          {/* Progress indicator */}
                          <div className="mt-8 flex items-center gap-3">
                            {timelineItems.map((_, i) => (
                              <div
                                key={i}
                                className="h-1 transition-all duration-500"
                                style={{
                                  width: i === activeStep ? '40px' : '12px',
                                  backgroundColor: i === activeStep ? '#C010DA' : i < activeStep ? '#C010DA' : '#e2e8f0',
                                  opacity: i <= activeStep ? 1 : 0.4,
                                }}
                              />
                            ))}
                            <span className="ml-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                              {activeStep + 1}/{timelineItems.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
