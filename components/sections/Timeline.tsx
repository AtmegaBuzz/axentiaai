'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineData = [
  {
    year: '2018',
    title: 'The Beginning',
    description:
      'Founded with a vision to bridge the gap between education and enterprise careers. What started as a dream in a small office became the seed of something transformative.',
    gradient: 'from-purple-600 to-indigo-800',
    hasImage: true,
  },
  {
    year: '2019',
    title: 'First Cohort',
    description:
      'Launched the first SAP training cohort with 25 students — and achieved a 100% placement rate. The model was validated, and the mission was clear.',
    gradient: 'from-indigo-600 to-blue-800',
    hasImage: false,
    quote: {
      text: '"Every single student from our first batch found their dream role. That moment changed everything for us."',
      author: 'Founding Team',
    },
  },
  {
    year: '2020',
    title: 'Going Digital',
    description:
      'Pivoted to fully online training during the pandemic, reaching students across India. Adversity became our catalyst — we went from one city to the entire country overnight.',
    gradient: 'from-blue-600 to-cyan-800',
    hasImage: true,
  },
  {
    year: '2021',
    title: 'Enterprise Partnerships',
    description:
      'Partnered with Orane Consulting and leading SAP implementation firms. Our graduates were no longer just trained — they were industry-endorsed.',
    gradient: 'from-cyan-600 to-teal-800',
    hasImage: false,
  },
  {
    year: '2022',
    title: 'AI Integration',
    description:
      'Introduced AI-powered learning paths and personalized career coaching. Every learner got a unique trajectory tailored to their strengths and market demand.',
    gradient: 'from-teal-600 to-emerald-800',
    hasImage: true,
    quote: {
      text: '"AI didn\'t replace the human touch — it amplified it. Our mentors could finally focus on what mattered most."',
      author: 'Head of Product',
    },
  },
  {
    year: '2023',
    title: '500+ Careers Launched',
    description:
      'Milestone of 500+ successful career transitions into enterprise tech. From freshers to mid-career professionals, our community became a launchpad for transformation.',
    gradient: 'from-emerald-600 to-green-800',
    hasImage: false,
  },
  {
    year: '2024',
    title: 'AxentiaAI Rebrand',
    description:
      'Rebranded as AxentiaAI, expanding beyond SAP into full AI & Data career acceleration. A new chapter — same mission, bigger ambition.',
    gradient: 'from-violet-600 to-purple-900',
    hasImage: true,
  },
]

function TimelineItem({
  item,
  index,
  totalItems,
}: {
  item: (typeof timelineData)[0]
  index: number
  totalItems: number
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'center center'],
  })
  const dotScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dotOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.3, 0.6, 1])

  return (
    <motion.div
      ref={itemRef}
      className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: Year — hidden on mobile, shown on md+ */}
      <div className="hidden md:flex items-start justify-end pr-10 pt-1">
        <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          {item.year}
        </span>
      </div>

      {/* Center: Line + Dot — hidden on mobile */}
      <div className="hidden md:flex flex-col items-center relative">
        {/* Dot */}
        <motion.div
          className="relative z-10 mt-1.5"
          style={{ scale: dotScale, opacity: dotOpacity }}
        >
          <div className="w-5 h-5 rounded-full border-2 border-purple-400 bg-purple-500/30 backdrop-blur-sm shadow-[0_0_16px_rgba(168,85,247,0.5)]" />
          <div className="absolute inset-0.5 rounded-full bg-purple-400/60" />
        </motion.div>
        {/* Connector line segment */}
        {index < totalItems - 1 && (
          <div className="w-px flex-1 bg-white/[0.07]" />
        )}
      </div>

      {/* Right: Content */}
      <div className="pl-8 md:pl-10 pb-16 md:pb-24 relative">
        {/* Mobile: line + dot on left */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 flex flex-col items-center">
          <motion.div
            className="relative z-10 mt-1.5 shrink-0"
            style={{ scale: dotScale, opacity: dotOpacity }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-purple-400 bg-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
            <div className="absolute inset-0.5 rounded-full bg-purple-400/60" />
          </motion.div>
          {index < totalItems - 1 && (
            <div className="w-px flex-1 bg-white/[0.07]" />
          )}
        </div>

        {/* Mobile year */}
        <span className="md:hidden text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2 block">
          {item.year}
        </span>

        <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
          {item.title}
        </h3>
        <p className="text-white/60 leading-relaxed max-w-lg mb-5">
          {item.description}
        </p>

        {item.hasImage && (
          <div
            className={`w-full max-w-md aspect-video rounded-2xl bg-gradient-to-br ${item.gradient} opacity-80 mb-5 shadow-lg`}
          />
        )}

        {item.quote && (
          <blockquote className="border-l-2 border-purple-500/50 pl-4 max-w-md">
            <p className="text-white/50 italic text-sm leading-relaxed">
              {item.quote.text}
            </p>
            <cite className="text-purple-400/70 text-xs mt-1 block not-italic">
              — {item.quote.author}
            </cite>
          </blockquote>
        )}
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative bg-[#0a0118] py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[128px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">
            Our Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            The AxentiaAI Story
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Desktop progress line — center column */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-white/[0.07]" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-500 origin-top"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Mobile progress line — left edge */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-white/[0.07]" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-500 origin-top"
              style={{ height: progressHeight }}
            />
          </div>

          {timelineData.map((item, i) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={i}
              totalItems={timelineData.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
