'use client';

import { useRef, useEffect, useMemo, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/* ── Draw SAP/AI dashboard onto a canvas → Three.js texture ── */
function buildScreenTexture(): THREE.CanvasTexture {
    const W = 1024, H = 640;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const c = cvs.getContext('2d')!;

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r);
        c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r);
        c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r);
        c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r);
        c.closePath();
    };

    // BG
    c.fillStyle = '#0a0818'; c.fillRect(0, 0, W, H);

    // Header
    c.fillStyle = '#0f0d20'; c.fillRect(0, 0, W, 54);
    c.fillStyle = '#1e1b35'; c.fillRect(0, 53, W, 1);
    ['#ef4444', '#f59e0b', '#22c55e'].forEach((col, i) => {
        c.beginPath(); c.arc(22 + i * 22, 27, 6, 0, Math.PI * 2);
        c.fillStyle = col; c.fill();
    });
    c.fillStyle = '#6366f1'; c.font = 'bold 15px monospace';
    c.fillText('SAP AI  ·  DASHBOARD', 100, 33);
    c.beginPath(); c.arc(W - 36, 27, 5, 0, Math.PI * 2);
    c.fillStyle = '#22c55e'; c.fill();
    c.fillStyle = '#64748b'; c.font = '13px monospace';
    c.fillText('Live', W - 26, 32);

    // Metric tiles
    const metrics = [
        { label: 'Forecasts', value: '98.2%', color: '#818cf8' },
        { label: 'Invoices', value: '1,240', color: '#a855f7' },
        { label: 'Uptime', value: '99.9%', color: '#10b981' },
        { label: 'AI Score', value: '94/100', color: '#F7C87A' },
    ];
    metrics.forEach((m, i) => {
        const mx = 30 + i * 247, my = 72, mw = 222, mh = 90;
        c.fillStyle = 'rgba(255,255,255,0.04)'; c.strokeStyle = 'rgba(255,255,255,0.07)'; c.lineWidth = 1;
        rr(mx, my, mw, mh, 10); c.fill(); c.stroke();
        c.fillStyle = m.color; c.font = 'bold 28px monospace';
        c.fillText(m.value, mx + 14, my + 42);
        c.fillStyle = '#475569'; c.font = '13px monospace';
        c.fillText(m.label, mx + 14, my + 68);
    });

    // Bar chart
    const bars = [55, 38, 72, 48, 84, 60, 76, 52, 88, 66, 74, 92];
    const bw = 58, bg = 22, cx0 = 30, cy0 = 220, ch = 160;
    c.fillStyle = '#334155'; c.font = '12px monospace';
    c.fillText('Monthly AI Predictions', cx0, cy0 - 10);
    bars.forEach((h, i) => {
        const bh = (h / 100) * ch;
        const bx = cx0 + i * (bw + bg);
        if (i === bars.length - 1) {
            const g = c.createLinearGradient(0, cy0 + ch - bh, 0, cy0 + ch);
            g.addColorStop(0, '#8A29AC'); g.addColorStop(1, '#C010DA');
            c.fillStyle = g;
        } else {
            c.fillStyle = 'rgba(138,41,172,0.28)';
        }
        rr(bx, cy0 + ch - bh, bw, bh, 5); c.fill();
    });

    // Module tags
    const tags = ['S/4HANA', 'BTP', 'Joule', 'SuccessFactors', 'Analytics Cloud'];
    let tx = 30;
    tags.forEach(tag => {
        c.font = 'bold 12px monospace';
        const tw = c.measureText(tag).width + 24;
        c.fillStyle = 'rgba(99,102,241,0.14)'; c.strokeStyle = 'rgba(99,102,241,0.28)'; c.lineWidth = 1;
        rr(tx, 418, tw, 28, 6); c.fill(); c.stroke();
        c.fillStyle = '#818cf8'; c.fillText(tag, tx + 12, 437);
        tx += tw + 10;
    });

    // Brand footer
    c.fillStyle = 'rgba(138,41,172,0.5)'; c.font = 'bold 18px monospace';
    c.fillText('Axentia.AI', 30, 530);
    c.fillStyle = '#334155'; c.font = '13px monospace';
    c.fillText('Enterprise AI + SAP Intelligence Platform', 150, 530);

    return new THREE.CanvasTexture(cvs);
}

/* ── Inner scene: loads model + drives spin ── */
function MacBookScene({ isInViewRef }: { isInViewRef: React.MutableRefObject<boolean> }) {
    const { scene } = useGLTF('/3dmodels/macbook.glb');
    const groupRef = useRef<THREE.Group>(null);
    const velRef = useRef(0.014);
    const { invalidate } = useThree();

    const screenTex = useMemo(() => buildScreenTexture(), []);

    /* Apply canvas texture to lid mesh (index 0 = taller Y-extent mesh) */
    useEffect(() => {
        const meshes: THREE.Mesh[] = [];
        scene.traverse(obj => {
            if ((obj as THREE.Mesh).isMesh) meshes.push(obj as THREE.Mesh);
        });
        const lid = meshes[0];
        if (lid) {
            lid.material = new THREE.MeshStandardMaterial({
                map: screenTex,
                roughness: 0.15,
                metalness: 0.1,
                emissive: new THREE.Color('#1a0f3c'),
                emissiveIntensity: 0.4,
            });
        }
        return () => { screenTex.dispose(); };
    }, [scene, screenTex]);

    /* Spin: fast while scrolling in, near-stop when section is visible */
    useFrame(() => {
        if (!groupRef.current) return;
        const inView = isInViewRef.current;
        const targetVel = inView ? 0.0008 : 0.014;
        velRef.current = THREE.MathUtils.lerp(velRef.current, targetVel, inView ? 0.04 : 0.06);
        groupRef.current.rotation.y += velRef.current;

        // Only ask for next frame while actually moving
        if (velRef.current > 0.0005) invalidate();
    });

    return (
        <group ref={groupRef} position={[0, -0.65, 0]} scale={0.065}>
            <primitive object={scene} />
        </group>
    );
}

/* ── Simple error boundary so a context crash doesn't kill the page ── */
class CanvasErrorBoundary extends Component<{ children: ReactNode }, { crashed: boolean }> {
    state = { crashed: false };
    static getDerivedStateFromError() { return { crashed: true }; }
    render() {
        if (this.state.crashed) return null;
        return this.props.children;
    }
}

/* ── Exported viewer wrapper ── */
export function MacBookViewer() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const isInViewRef = useRef(false);
    const [contextLost, setContextLost] = useState(false);

    /* Intersection observer: section in/out of view */
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                isInViewRef.current = entry.intersectionRatio >= 0.5;
            },
            { threshold: [0, 0.3, 0.5, 0.8] }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={wrapRef} style={{ width: '100%', height: '460px' }}>
            {!contextLost && (
                <CanvasErrorBoundary>
                    <Canvas
                        frameloop="demand"
                        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
                        dpr={[1, 1.5]}
                        gl={{
                            alpha: true,
                            antialias: true,
                            powerPreference: 'default',
                            depth: true,
                            stencil: false,
                            preserveDrawingBuffer: false,
                        }}
                        style={{ background: 'transparent' }}
                        onCreated={({ gl }) => {
                            const canvas = gl.domElement;

                            const onLost = (e: Event) => {
                                e.preventDefault();
                                setContextLost(true);
                                // Try to restore after short delay
                                setTimeout(() => setContextLost(false), 1500);
                            };
                            const onRestored = () => setContextLost(false);

                            canvas.addEventListener('webglcontextlost', onLost);
                            canvas.addEventListener('webglcontextrestored', onRestored);
                        }}
                    >
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow={false} />
                        <directionalLight position={[-3, 2, -2]} intensity={0.5} />
                        <pointLight position={[-4, 3, 2]} intensity={1.2} color="#8A29AC" />
                        <MacBookScene isInViewRef={isInViewRef} />
                    </Canvas>
                </CanvasErrorBoundary>
            )}
        </div>
    );
}

useGLTF.preload('/3dmodels/macbook.glb');
