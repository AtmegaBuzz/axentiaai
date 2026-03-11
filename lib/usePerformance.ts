'use client';

import { useState, useEffect } from 'react';

/**
 * Detects device performance tier and user motion preferences.
 *
 * Tier detection:
 *  - 'low': <=4 cores OR <=4GB RAM OR prefers-reduced-motion OR mobile with low specs
 *  - 'high': everything else
 *
 * Usage:
 *   const { tier, reducedMotion } = usePerformance();
 *   if (tier === 'low') skip heavy animations / WebGL
 */

export type PerformanceTier = 'low' | 'high';

interface PerformanceInfo {
  tier: PerformanceTier;
  reducedMotion: boolean;
}

/** Synchronous check (runs once, cached) */
function detectTier(): PerformanceInfo {
  if (typeof window === 'undefined') {
    return { tier: 'high', reducedMotion: false };
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navigator hints
  const nav = navigator as Navigator & {
    hardwareConcurrency?: number;
    deviceMemory?: number;
    connection?: { effectiveType?: string; saveData?: boolean };
  };

  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8; // Chrome-only, defaults high
  const connection = nav.connection;
  const saveData = connection?.saveData ?? false;
  const slowNetwork = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';

  // Mobile detection (rough)
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);

  let isLow = false;

  if (reducedMotion) isLow = true;
  if (saveData) isLow = true;
  if (slowNetwork) isLow = true;
  if (cores <= 4) isLow = true;
  if (memory <= 4) isLow = true;
  if (isMobile && cores <= 6) isLow = true;

  return { tier: isLow ? 'low' : 'high', reducedMotion };
}

// Module-level cache so we only detect once
let cached: PerformanceInfo | null = null;

export function getPerformanceTier(): PerformanceInfo {
  if (!cached) cached = detectTier();
  return cached;
}

export function usePerformance(): PerformanceInfo {
  const [info, setInfo] = useState<PerformanceInfo>(() => getPerformanceTier());

  useEffect(() => {
    // Listen for reduced-motion changes
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => {
      cached = null; // bust cache
      setInfo(detectTier());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return info;
}
