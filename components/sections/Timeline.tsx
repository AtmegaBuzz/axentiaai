'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { BookOpen, Wrench, BarChart3, Settings, Crown } from 'lucide-react'

const timelineItems = [
  { step: 1, period: 'Month 0–4', title: 'Trainee', description: 'Learn enterprise process flows, SAP basics, and structured documentation practices.', gradient: 'from-brand-300 to-brand-500', icon: BookOpen },
  { step: 2, period: 'Month 4–10', title: 'Apprentice', description: 'Work on supervised project tasks. Paid. Deliverables reviewed by senior consultants.', gradient: 'from-brand-400 to-brand-600', icon: Wrench },
  { step: 3, period: 'Year 1–2', title: 'Associate Consultant', description: 'Support UAT cycles, prepare dashboards, handle structured client communication, manage defined tasks independently.', gradient: 'from-brand-500 to-accent-400', icon: BarChart3 },
  { step: 4, period: 'Year 2–4', title: 'Consultant', description: 'Own specific process areas, manage configuration and testing cycles, coordinate across teams.', gradient: 'from-accent-400 to-brand-500', icon: Settings },
  { step: 5, period: 'Year 4+', title: 'Senior/Lead', description: 'Drive module-level decisions, guide junior consultants, manage client-facing responsibilities.', gradient: 'from-brand-600 to-brand-400', icon: Crown },
]

function TimelineItem({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={ref} className="group relative grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] gap-4 md:gap-8">
      {/* Left: time period (desktop) */}
      <div className="hidden md:flex items-start justify-end pt-1">
        <motion.div
          className="text-right"
          initial={{ opacity: 0.3 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-mono text-brand-400 tracking-wider uppercase">step-{item.step}</span>
          <p className={`text-lg font-semibold transition-colors duration-500 ${isInView ? 'text-gray-900' : 'text-gray-300'}`}>
            {item.period}
          </p>
        </motion.div>
      </div>

      {/* Center: line + dot */}
      <div className="flex flex-col items-center relative">
        <motion.div
          className="w-4 h-4 rounded-full border-2 z-10 flex-shrink-0 mt-1 transition-all duration-500"
          style={{
            borderColor: isInView ? 'var(--color-brand-500, #d946ef)' : '#d1d5db',
            backgroundColor: isInView ? 'var(--color-brand-500, #d946ef)' : 'transparent',
          }}
        />
        {index < timelineItems.length - 1 && (
          <div className="w-[2px] flex-1 bg-gray-200 min-h-[60px]" />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-12 md:pb-16">
        {/* Mobile: show period inline */}
        <motion.div
          initial={{ opacity: 0.3, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 12 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:hidden mb-1">
            <span className="text-xs font-mono text-brand-400 tracking-wider uppercase">step-{item.step}</span>
            <p className={`text-sm font-semibold transition-colors duration-500 ${isInView ? 'text-gray-900' : 'text-gray-300'}`}>
              {item.period}
            </p>
          </div>
          <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isInView ? 'text-gray-900' : 'text-gray-300'}`}>
            {item.title}
          </h3>
          <p className={`text-base leading-relaxed transition-colors duration-500 mb-4 ${isInView ? 'text-gray-600' : 'text-gray-300'}`}>
            {item.description}
          </p>
          {/* Image placeholder */}
          <motion.div
            className={`w-full max-w-sm aspect-video rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
            animate={{ opacity: isInView ? 0.9 : 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <item.icon className="w-12 h-12 text-white/60" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">Student Path</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Your Career Timeline</h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Scroll-driven progress line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gray-100">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, var(--color-brand-400, #e879f9), var(--color-brand-600, #a21caf))',
              }}
            />
          </div>

          {/* Items */}
          <div className="relative z-10">
            {timelineItems.map((item, i) => (
              <TimelineItem key={item.step} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
