'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * AnimatedCounter — a reusable component that counts from 0 to `end` when scrolled into view.
 * Uses IntersectionObserver + requestAnimationFrame for smooth animation.
 *
 * @param end      The target number to count to
 * @param suffix   Appended after the number (e.g. "+", "%")
 * @param prefix   Prepended before the number (e.g. "₹")
 * @param duration Animation duration in ms (default 2000)
 * @param className Optional className for the wrapping span
 */
export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * end);
            setDisplay(`${prefix}${current}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
