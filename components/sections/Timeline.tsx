'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const timelineData = [
  {
    year: '2018',
    title: 'The Beginning',
    description:
      'Founded with a vision to bridge the gap between education and enterprise careers. What started as a dream in a small office became the seed of something transformative.',
    gradient: 'from-brand-400 to-brand-600',
    hasImage: true,
  },
  {
    year: '2019',
    title: 'First Cohort',
    description:
      'Launched the first SAP training cohort with 25 students — and achieved a 100% placement rate. The model was validated, and the mission was clear.',
    gradient: 'from-brand-500 to-brand-700',
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
    gradient: 'from-brand-400 to-accent-500',
    hasImage: true,
  },
  {
    year: '2021',
    title: 'Enterprise Partnerships',
    description:
      'Partnered with Orane Consulting and leading SAP implementation firms. Our graduates were no longer just trained — they were industry-endorsed.',
    gradient: 'from-brand-500 to-brand-800',
    hasImage: false,
  },
  {
    year: '2022',
    title: 'AI Integration',
    description:
      'Introduced AI-powered learning paths and personalized career coaching. Every learner got a unique trajectory tailored to their strengths and market demand.',
    gradient: 'from-accent-400 to-brand-500',
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
      'Milestone of 500+ successful career transitions into enterprise tech. From freshers to mid-career professionals, our community became a launchpad.',
    gradient: 'from-brand-600 to-brand-400',
    hasImage: false,
  },
  {
    year: '2024',
    title: 'AxentiaAI Rebrand',
    description:
      'Rebranded as AxentiaAI, expanding beyond SAP into full AI & Data career acceleration. A new chapter — same mission, bigger ambition.',
    gradient: 'from-brand-500 to-accent-400',
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
  const isInView = useInView(itemRef, { once: false, margin: '-40% 0px -40% 0px' })

  return (
    <div
      ref={itemRef}
      className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_80px_1fr] gap-4 md:gap-0"
    >
      {/* Left: Year */}
      <div className="hidden md:flex items-start justify-end pr-10 pt-1">
        <motion.span
          className="text-4xl font-bold transition-all duration-700"
          animate={{
            color: isInView ? 'var(--color-brand-600)' : '#d1d5db',
            opacity: isInView ? 1 : 0.4,
          }}
        >
          {item.year}
        </motion.span>
      </div>

      {/* Center: Line + Dot */}
      <div className="hidden md:flex flex-col items-center relative">
        <motion.div
          className="relative z-10 mt-1.5 w-5 h-5 rounded-full border-2 transition-all duration-500"
          animate={{
            borderColor: isInView ? 'var(--color-brand-500)' : '#d1d5db',
            backgroundColor: isInView ? 'var(--color-brand-500)' : 'transparent',
            scale: isInView ? 1 : 0.7,
            boxShadow: isInView ? '0 0 16px rgba(168,85,247,0.4)' : '0 0 0px transparent',
          }}
        />
        {index < totalItems - 1 && (
          <div className="w-px flex-1 bg-gray-200" />
        )}
      </div>

      {/* Right: Content */}
      <motion.div
        className="pl-8 md:pl-10 pb-16 md:pb-24 relative"
        animate={{
          opacity: isInView ? 1 : 0.3,
          y: isInView ? 0 : 20,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Mobile: line + dot on left */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 flex flex-col items-center">
          <motion.div
            className="relative z-10 mt-1.5 shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-500"
            animate={{
              borderColor: isInView ? 'var(--color-brand-500)' : '#d1d5db',
              backgroundColor: isInView ? 'var(--color-brand-500)' : 'transparent',
              scale: isInView ? 1 : 0.7,
            }}
          />
          {index < totalItems - 1 && (
            <div className="w-px flex-1 bg-gray-200" />
          )}
        </div>

        {/* Mobile year */}
        <motion.span
          className="md:hidden text-2xl font-bold mb-2 block transition-colors duration-700"
          animate={{
            color: isInView ? 'var(--color-brand-600)' : '#d1d5db',
          }}
        >
          {item.year}
        </motion.span>

        <h3
          className="text-xl md:text-2xl font-semibold mb-3 transition-colors duration-500"
          style={{ color: isInView ? '#111827' : '#9ca3af' }}
        >
          {item.title}
        </h3>
        <p
          className="leading-relaxed max-w-lg mb-5 transition-colors duration-500"
          style={{ color: isInView ? '#4b5563' : '#d1d5db' }}
        >
          {item.description}
        </p>

        {item.hasImage && (
          <motion.div
            className={`w-full max-w-md aspect-video rounded-2xl bg-gradient-to-br ${item.gradient} mb-5 shadow-lg`}
            animate={{ opacity: isInView ? 0.9 : 0.2 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {item.quote && (
          <motion.blockquote
            className="border-l-2 pl-4 max-w-md"
            animate={{
              borderColor: isInView ? 'var(--color-brand-400)' : '#e5e7eb',
              opacity: isInView ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 italic text-sm leading-relaxed">
              {item.quote.text}
            </p>
            <cite className="text-brand-400 text-xs mt-1 block not-italic">
              — {item.quote.author}
            </cite>
          </motion.blockquote>
        )}
      </motion.div>
    </div>
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
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-500 text-sm font-medium tracking-widest uppercase mb-3">
            Our Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            The AxentiaAI Story
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Desktop progress line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gray-200" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600 origin-top"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Mobile progress line */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gray-200" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600 origin-top"
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
