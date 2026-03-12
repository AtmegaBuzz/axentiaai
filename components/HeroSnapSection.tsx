'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { WhyAxentiaAI } from '@/components/sections/WhyMastersUnion';

export function HeroSnapSection() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [heroHidden, setHeroHidden] = useState(false);

    // Refs so wheel handler always reads latest values without stale closures
    const downCountRef       = useRef(0);
    const postSnapCountRef   = useRef(0);
    const isTransitioningRef = useRef(false);
    const snappedRef         = useRef(false);
    const heroHiddenRef      = useRef(false);
    const approachRef        = useRef<HTMLDivElement>(null);

    const setHeroHiddenSync = useCallback((val: boolean) => {
        heroHiddenRef.current = val;
        setHeroHidden(val);
    }, []);

    /* ── Snap animation ─────────────────────────────────────────── */
    const doSnap = useCallback(() => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        document.body.style.overflow = 'hidden';
        setShowOverlay(true);
    }, []);

    const onSnapComplete = useCallback(() => {
        // Jump scroll to the approach section's natural position
        window.scrollTo({ top: window.innerHeight, behavior: 'instant' });
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.style.overflow = '';
                setShowOverlay(false);
                isTransitioningRef.current = false;
                downCountRef.current = 0;
                snappedRef.current = true;
            });
        });
    }, []);

    /* ── Wheel handler ──────────────────────────────────────────── */
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Block all wheel input while snap animation is running
            if (isTransitioningRef.current) {
                e.preventDefault();
                return;
            }

            const scrollY = window.scrollY;

            // Phase 1 — At top of page, count 3 down-scrolls then snap
            if (!snappedRef.current && scrollY < window.innerHeight * 0.05) {
                if (e.deltaY > 0) {
                    e.preventDefault();
                    downCountRef.current += 1;
                    if (downCountRef.current >= 3) doSnap();
                } else {
                    downCountRef.current = Math.max(0, downCountRef.current - 1);
                }
                return;
            }

            // Phase 2 — After snap, 2 more down-scrolls → hide hero (stops video/WebGL)
            if (
                snappedRef.current &&
                !heroHiddenRef.current &&
                scrollY >= window.innerHeight * 0.85
            ) {
                if (e.deltaY > 0) {
                    postSnapCountRef.current += 1;
                    if (postSnapCountRef.current >= 2) {
                        setHeroHiddenSync(true);
                        postSnapCountRef.current = 0;
                    }
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [doSnap, setHeroHiddenSync]);

    /* ── IntersectionObserver — restore hero before user reaches it ── */
    useEffect(() => {
        // When the approach section scrolls back into view (user going up),
        // restore hero display so it's ready when they scroll further up.
        if (!approachRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && heroHiddenRef.current) {
                    setHeroHiddenSync(false);
                }
            },
            { threshold: 0.05 }
        );

        observer.observe(approachRef.current);
        return () => observer.disconnect();
    }, [setHeroHiddenSync]);

    return (
        <>
            {/*
              Hero wrapper — always holds 100vh of document space so the approach
              section stays at the 100vh offset in the document flow.
              The inner content is display:none after snap + 2 scrolls,
              which stops the video and WebGL from consuming GPU.
            */}
            <div style={{ height: '100vh', position: 'relative', flexShrink: 0 }}>
                <div
                    style={{
                        display: heroHidden ? 'none' : 'block',
                        position: 'absolute',
                        inset: 0,
                    }}
                >
                    <Hero />
                </div>
            </div>

            {/*
              Approach — normal flow at 100vh offset.
              No sticky/fixed so the rest of the page scrolls naturally below it.
              The approach section itself scrolls in/out like any other section.
            */}
            <div ref={approachRef}>
                <WhyAxentiaAI />
            </div>

            {/*
              Snap overlay — only alive for the 0.45s animation.
              Slides up from bottom, then we jump scroll + remove it.
            */}
            {showOverlay && (
                <motion.div
                    initial={{ y: '100vh' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onAnimationComplete={onSnapComplete}
                    className="fixed inset-0 z-[100] overflow-hidden"
                >
                    <WhyAxentiaAI />
                </motion.div>
            )}
        </>
    );
}
