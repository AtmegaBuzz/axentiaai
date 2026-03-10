'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningLoaderProps {
    onComplete: () => void;
}

const scattered = [
    { x: -30, y: -28, rotate: -15, scale: 0.5 },
    { x: 35, y: 15, rotate: 20, scale: 0.45 },
    { x: -18, y: 30, rotate: -10, scale: 0.6 },
    { x: 28, y: -22, rotate: 14, scale: 0.5 },
];

export function OpeningLoader({ onComplete }: OpeningLoaderProps) {
    const [phase, setPhase] = useState<'scatter' | 'assemble' | 'move'>('scatter');
    const [visible, setVisible] = useState(true);
    const [heroCoords, setHeroCoords] = useState<{ top: number; left: number } | null>(null);

    const finish = useCallback(() => {
        setVisible(false);
        document.body.style.overflow = '';
        onComplete();
    }, [onComplete]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const measure = () => {
            const h1 = document.getElementById('hero-heading');
            if (h1) {
                const rect = h1.getBoundingClientRect();
                setHeroCoords({
                    top: rect.top,
                    left: rect.left,
                });
            }
        };
        // Small delay to allow layout to settle before measuring
        setTimeout(measure, 50);
        window.addEventListener('resize', measure);

        const t0 = setTimeout(() => setPhase('assemble'), 500);
        const t1 = setTimeout(() => setPhase('move'), 1800);
        const t2 = setTimeout(finish, 2800);

        return () => {
            window.removeEventListener('resize', measure);
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
            document.body.style.overflow = '';
        };
    }, [finish]);

    const isMoving = phase === 'move';
    const isAssembled = phase === 'assemble' || isMoving;

    const renderWord = (word: { text: string; accent?: boolean }, index: number) => {
        const s = scattered[index];
        return (
            <motion.span
                key={word.text}
                initial={{
                    opacity: 0,
                    x: `${s.x}vw`,
                    y: `${s.y}vh`,
                    rotate: s.rotate,
                    scale: s.scale,
                }}
                animate={{
                    opacity: 1,
                    x: isAssembled ? 0 : `${s.x}vw`,
                    y: isAssembled ? 0 : `${s.y}vh`,
                    rotate: isAssembled ? 0 : s.rotate,
                    scale: isAssembled ? 1 : s.scale,
                }}
                transition={
                    isAssembled
                        ? {
                            type: 'spring',
                            stiffness: 120,
                            damping: 14,
                            mass: 1,
                            delay: isMoving ? 0 : index * 0.08,
                        }
                        : {
                            duration: 0.3,
                            delay: index * 0.06,
                        }
                }
                className={
                    word.accent
                        ? "font-[family-name:var(--font-playfair)] italic bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent"
                        : ""
                }
                style={{ display: 'inline-block' }}
            >
                {word.text}
            </motion.span>
        );
    };

    const textBlock = (
        <div className="text-left w-max">
            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight">
                {renderWord({ text: 'Learn' }, 0)}{' '}
                {renderWord({ text: 'AI' }, 1)}
            </div>
            <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight mt-2">
                {renderWord({ text: 'by' }, 2)}{' '}
                {renderWord({ text: 'Doing', accent: true }, 3)}
            </div>
        </div>
    );

    // We animate from the center of the screen to the absolute target coordinates.
    // We use a fixed positioned container to handle this precisely.
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="opening-loader"
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0 }}
                >
                    {/* The dark overlay that fades out to reveal the video behind it */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        animate={{ opacity: isMoving ? 0 : 0.8 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    />

                    {/* The text container mapping from Center to Hero coordinate */}
                    <motion.div
                        className="absolute"
                        initial={{
                            top: '50%',
                            left: '50%',
                            x: '-50%',
                            y: '-50%',
                            scale: 1.2,
                            opacity: 0
                        }}
                        animate={
                            isMoving && heroCoords
                                ? {
                                    top: heroCoords.top,
                                    left: heroCoords.left,
                                    x: '0%',
                                    y: '0%',
                                    scale: 1,
                                    opacity: 1
                                }
                                : {
                                    top: '50%',
                                    left: '50%',
                                    x: '-50%',
                                    y: '-50%',
                                    scale: 1.1,
                                    opacity: 1
                                }
                        }
                        transition={
                            isMoving
                                ? { type: 'spring', stiffness: 50, damping: 14, mass: 1 }
                                : { opacity: { duration: 0.6 }, scale: { duration: 1.5, ease: 'easeOut' } }
                        }
                    >
                        {textBlock}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
