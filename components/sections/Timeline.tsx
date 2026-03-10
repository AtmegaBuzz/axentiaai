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

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const Icon = item.icon
  const isEven = index % 2 === 0

  const card = (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-md ${
        isEven ? 'ml-auto' : 'mr-auto'
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

  const periodAndImage = (
    <div className={`max-w-md ${isEven ? 'mr-auto' : 'ml-auto'}`}>
      <div className="mb-3">
        <span className="text-xs font-mono tracking-wider uppercase block mb-1 text-brand-400">
          Step {item.step}
        </span>
        <p className="text-lg font-semibold text-slate-900">{item.period}</p>
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
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] md:gap-8 items-start pb-20">
        <div>{isEven ? card : periodAndImage}</div>
        <div className="flex justify-center pt-1">
          <div
            className="w-5 h-5 rounded-full z-20 border-[3px] border-brand-500 bg-brand-500"
            style={{
              boxShadow: '0 0 0 6px rgba(217, 70, 239, 0.15), 0 0 20px rgba(217, 70, 239, 0.3)',
            }}
          />
        </div>
        <div>{isEven ? periodAndImage : card}</div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden grid grid-cols-[24px_1fr] gap-4 pb-14">
        <div className="flex justify-center pt-1">
          <div
            className="w-4 h-4 rounded-full z-20 border-[3px] border-brand-500 bg-brand-500"
            style={{
              boxShadow: '0 0 0 4px rgba(217, 70, 239, 0.15), 0 0 12px rgba(217, 70, 239, 0.3)',
            }}
          />
        </div>
        <div>
          <span className="text-xs font-mono tracking-wider uppercase block mb-1 text-brand-400">
            Step {item.step}
          </span>
          <p className="text-sm font-semibold mb-3 text-slate-900">{item.period}</p>
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
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 xl:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-3">
            Student Path
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            Your Career Timeline
          </h2>
          <p className="text-lg text-slate-600">
            A structured progression from classroom learning to enterprise
            leadership — each stage earned through performance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-400 to-brand-600" />

          {/* Left vertical line (mobile) */}
          <div className="md:hidden absolute left-[12px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-400 to-brand-600" />

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
