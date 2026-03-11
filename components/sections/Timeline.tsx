'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { BookOpen, Wrench, BarChart3, Settings, Crown } from 'lucide-react'
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
    period: 'Month 0-4',
    title: 'Trainee',
    description:
      'Learn enterprise process flows, SAP basics, and structured documentation practices in an immersive classroom setting.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80',
    icon: BookOpen,
  },
  {
    step: 2,
    period: 'Month 4-10',
    title: 'Apprentice',
    description:
      'Work on supervised project tasks with pay. Deliverables reviewed by senior consultants on live engagements.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80',
    icon: Wrench,
  },
  {
    step: 3,
    period: 'Year 1-2',
    title: 'Associate Consultant',
    description:
      'Support UAT cycles, prepare dashboards, handle structured client communication, and manage defined tasks independently.',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80',
    icon: BarChart3,
  },
  {
    step: 4,
    period: 'Year 2-4',
    title: 'Consultant',
    description:
      'Own specific process areas, manage configuration and testing cycles, coordinate across cross-functional teams.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    icon: Settings,
  },
  {
    step: 5,
    period: 'Year 4+',
    title: 'Senior / Lead',
    description:
      'Drive module-level decisions, guide junior consultants, and manage client-facing responsibilities at scale.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80',
    icon: Crown,
  },
]

/*
  Layout per row (desktop):
    Even index (0, 2, 4): card LEFT  | dot CENTER | period+image RIGHT
    Odd  index (1, 3):    period+image LEFT | dot CENTER | card RIGHT
*/

function TimelineItem({
  item,
  index,
  isActive,
  dotRef,
}: {
  item: TimelineEntry
  index: number
  isActive: boolean
  dotRef: (el: HTMLDivElement | null) => void
}) {
  const Icon = item.icon
  const isEven = index % 2 === 0

  /* Shared card block */
  const card = (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group/card max-w-md ${isEven ? 'ml-auto' : 'mr-auto'
        }`}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-brand-600" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
      </div>
    </div>
  )

  /* Shared period + image block */
  const periodAndImage = (
    <div className={`max-w-md ${isEven ? 'mr-auto' : 'ml-auto'}`}>
      <div className="mb-3">
        <span
          className="text-xs font-mono tracking-wider uppercase block mb-1 transition-colors duration-500"
          style={{ color: isActive ? 'var(--color-brand-400, #D44DC8)' : '#cbd5e1' }}
        >
          Step {item.step}
        </span>
        <p
          className="text-lg font-semibold transition-colors duration-500"
          style={{ color: isActive ? '#111827' : '#d1d5db' }}
        >
          {item.period}
        </p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full aspect-[3/2] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* ── Desktop layout ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] md:gap-8 items-start pb-20">
        {/* Left column */}
        <div
          className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-6'
            }`}
        >
          {isEven ? card : periodAndImage}
        </div>

        {/* Center: dot on the line */}
        <div className="flex justify-center pt-1">
          <div
            ref={dotRef}
            className="w-5 h-5 rounded-full z-20 transition-all duration-500"
            style={{
               border: `4px solid ${isActive ? 'var(--color-brand-500, #C010DA)' : '#cbd5e1'}`,
               backgroundColor: isActive ? 'var(--color-brand-500, #C010DA)' : '#f8fafc',
               boxShadow: isActive
                 ? '0 0 0 6px rgba(192, 16, 218, 0.15), 0 0 20px rgba(192, 16, 218, 0.3)'
                 : '0 0 0 4px rgba(203, 213, 225, 0.15)',
            }}
          />
        </div>

        {/* Right column */}
        <div
          className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-6'
            }`}
        >
          {isEven ? periodAndImage : card}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden grid grid-cols-[24px_1fr] gap-4 pb-14">
        {/* Dot */}
        <div className="flex justify-center pt-1">
          <div
            ref={index === 0 ? dotRef : undefined}
            className="w-4 h-4 rounded-full z-20 transition-all duration-500"
            style={{
               border: `4px solid ${isActive ? 'var(--color-brand-500, #C010DA)' : '#cbd5e1'}`,
               backgroundColor: isActive ? 'var(--color-brand-500, #C010DA)' : '#f8fafc',
               boxShadow: isActive
                 ? '0 0 0 4px rgba(192, 16, 218, 0.15), 0 0 12px rgba(192, 16, 218, 0.3)'
                 : 'none',
            }}
          />
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'
            }`}
        >
          <span
            className="text-xs font-mono tracking-wider uppercase block mb-1 transition-colors duration-500"
            style={{ color: isActive ? 'var(--color-brand-400, #D44DC8)' : '#d1d5db' }}
          >
            Step {item.step}
          </span>
          <p
            className="text-sm font-semibold mb-3 transition-colors duration-500"
            style={{ color: isActive ? '#111827' : '#d1d5db' }}
          >
            {item.period}
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-3">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-brand-600" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-[3/2] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotEls = useRef<(HTMLDivElement | null)[]>([])
  const [dotOffsets, setDotOffsets] = useState<number[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const measureDots = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const containerHeight = containerRect.height
    if (containerHeight === 0) return

    const offsets = dotEls.current.map((dot) => {
      if (!dot) return 0
      const dotRect = dot.getBoundingClientRect()
      const dotCenter = dotRect.top + dotRect.height / 2 - containerRect.top
      return dotCenter / containerHeight
    })
    setDotOffsets(offsets)
  }, [])

  useEffect(() => {
    const timer = setTimeout(measureDots, 150)
    window.addEventListener('resize', measureDots)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measureDots)
    }
  }, [measureDots])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (dotOffsets.length === 0) return
    let newIndex = -1
    for (let i = 0; i < dotOffsets.length; i++) {
      if (latest >= dotOffsets[i]) newIndex = i
    }
    setActiveIndex(newIndex)
  })

  const setDotRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      dotEls.current[index] = el
    },
    []
  )

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 xl:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3"
          >
            Student Path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-5"
          >
            Your Career <span className="font-cursive italic text-brand-600 text-[1.1em]">Timeline</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-slate-600"
          >
            A structured progression from classroom learning to enterprise
            leadership — each stage earned through performance.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Center vertical line — background track (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-slate-200">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background:
                  'linear-gradient(to bottom, var(--color-brand-400, #D44DC8), var(--color-brand-600, #A20EBF))',
              }}
            />
          </div>

          {/* Left vertical line (mobile) */}
          <div className="md:hidden absolute left-[12px] top-0 bottom-0 w-[4px] bg-slate-200">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background:
                  'linear-gradient(to bottom, var(--color-brand-400, #D44DC8), var(--color-brand-600, #A20EBF))',
              }}
            />
          </div>

          {/* Items */}
          <div className="relative z-10">
            {timelineItems.map((item, i) => (
              <TimelineItem
                key={item.step}
                item={item}
                index={i}
                isActive={i <= activeIndex}
                dotRef={setDotRef(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
