'use client';

import { useRef, useEffect, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── SAP/AI dashboard canvas texture ── */
function buildScreenTexture(): THREE.CanvasTexture {
    const W = 1024, H = 640;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const c = cvs.getContext('2d')!;

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
        c.beginPath();
        c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r);
        c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r);
        c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r);
        c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r);
        c.closePath();
    };

    c.fillStyle = '#0a0818'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#0f0d20'; c.fillRect(0, 0, W, 54);
    ['#ef4444', '#f59e0b', '#22c55e'].forEach((col, i) => {
        c.beginPath(); c.arc(22 + i * 22, 27, 6, 0, Math.PI * 2);
        c.fillStyle = col; c.fill();
    });
    c.fillStyle = '#6366f1'; c.font = 'bold 15px monospace';
    c.fillText('SAP AI  ·  DASHBOARD', 110, 33);
    c.beginPath(); c.arc(W - 36, 27, 5, 0, Math.PI * 2);
    c.fillStyle = '#22c55e'; c.fill();
    c.fillStyle = '#64748b'; c.font = '13px monospace'; c.fillText('Live', W - 26, 32);

    [
        { label: 'Forecasts', value: '98.2%',  color: '#818cf8' },
        { label: 'Invoices',  value: '1,240',  color: '#a855f7' },
        { label: 'Uptime',    value: '99.9%',  color: '#10b981' },
        { label: 'AI Score',  value: '94/100', color: '#F7C87A' },
    ].forEach((m, i) => {
        const mx = 30 + i * 247, my = 72;
        c.fillStyle = 'rgba(255,255,255,0.04)'; c.strokeStyle = 'rgba(255,255,255,0.07)'; c.lineWidth = 1;
        rr(mx, my, 222, 90, 10); c.fill(); c.stroke();
        c.fillStyle = m.color; c.font = 'bold 28px monospace'; c.fillText(m.value, mx + 14, my + 42);
        c.fillStyle = '#475569'; c.font = '13px monospace'; c.fillText(m.label, mx + 14, my + 68);
    });

    const bars = [55, 38, 72, 48, 84, 60, 76, 52, 88, 66, 74, 92];
    c.fillStyle = '#334155'; c.font = '12px monospace'; c.fillText('Monthly AI Predictions', 30, 208);
    bars.forEach((h, i) => {
        const bh = (h / 100) * 160, bx = 30 + i * 80;
        const isLast = i === bars.length - 1;
        const g = c.createLinearGradient(0, 220 + 160 - bh, 0, 380);
        g.addColorStop(0, isLast ? '#8A29AC' : 'rgba(138,41,172,0.28)');
        g.addColorStop(1, isLast ? '#C010DA' : 'rgba(138,41,172,0.10)');
        c.fillStyle = g; rr(bx, 220 + 160 - bh, 60, bh, 5); c.fill();
    });

    let tx = 30;
    ['S/4HANA', 'BTP', 'Joule', 'SuccessFactors', 'Analytics Cloud'].forEach(tag => {
        c.font = 'bold 12px monospace';
        const tw = c.measureText(tag).width + 24;
        c.fillStyle = 'rgba(99,102,241,0.14)'; c.strokeStyle = 'rgba(99,102,241,0.28)'; c.lineWidth = 1;
        rr(tx, 418, tw, 28, 6); c.fill(); c.stroke();
        c.fillStyle = '#818cf8'; c.fillText(tag, tx + 12, 437); tx += tw + 10;
    });

    c.fillStyle = 'rgba(138,41,172,0.6)'; c.font = 'bold 18px monospace'; c.fillText('Axentia.AI', 30, 530);
    c.fillStyle = '#334155'; c.font = '13px monospace';
    c.fillText('Enterprise AI + SAP Intelligence Platform', 150, 530);

    return new THREE.CanvasTexture(cvs);
}

/* ── 3D scene component ── */
function MacBookScene({
    gltfScene,
    isInViewRef,
}: {
    gltfScene: THREE.Group;
    isInViewRef: React.RefObject<boolean>;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const velRef   = useRef(0.014);

    useFrame(() => {
        if (!groupRef.current) return;
        const inView = isInViewRef.current ?? false;
        velRef.current = THREE.MathUtils.lerp(
            velRef.current,
            inView ? 0.0008 : 0.014,
            inView ? 0.04 : 0.06
        );
        groupRef.current.rotation.y += velRef.current;
    });

    return (
        <group ref={groupRef}>
            <primitive object={gltfScene} />
        </group>
    );
}

/* ── Error boundary ── */
class ErrBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
    state = { err: false };
    static getDerivedStateFromError() { return { err: true }; }
    render() {
        if (this.state.err) return null;
        return this.props.children;
    }
}

/* ── Exported wrapper ── */
export function MacBookViewer() {
    const wrapRef     = useRef<HTMLDivElement>(null);
    const isInViewRef = useRef(false);
    const [gltfScene, setGltfScene] = useState<THREE.Group | null>(null);
    const [hidden, setHidden]       = useState(false);

    /* Scroll-based spin control */
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { isInViewRef.current = e.intersectionRatio >= 0.5; },
            { threshold: [0, 0.3, 0.5, 0.8] }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    /* Load GLB via callback — no useLoader / Suspense / exotic import paths */
    useEffect(() => {
        let cancelled = false;

        import('three/examples/jsm/loaders/GLTFLoader.js')
            .then(({ GLTFLoader }) => {
                const loader = new GLTFLoader();
                loader.load(
                    '/3dmodels/macbook.glb',
                    (gltf) => {
                        if (cancelled) return;

                        const scene = gltf.scene;

                        /* Auto-center model */
                        const box    = new THREE.Box3().setFromObject(scene);
                        const center = new THREE.Vector3();
                        box.getCenter(center);
                        scene.position.sub(center);

                        /* Scale to fit nicely in view */
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        const maxDim  = Math.max(size.x, size.y, size.z);
                        const scale   = 2.5 / maxDim;   // fit in a ~2.5 world-unit box
                        scene.scale.setScalar(scale);

                        /* Apply screen texture to lid mesh */
                        const meshes: THREE.Mesh[] = [];
                        scene.traverse(obj => {
                            if ((obj as THREE.Mesh).isMesh) meshes.push(obj as THREE.Mesh);
                        });
                        const tex = buildScreenTexture();
                        const lid = meshes[0];   // lid = larger Y-extent mesh
                        if (lid) {
                            lid.material = new THREE.MeshStandardMaterial({
                                map: tex,
                                roughness: 0.2,
                                metalness: 0.0,
                                emissive: new THREE.Color('#0a0818'),
                                emissiveIntensity: 0.6,
                            });
                        }

                        setGltfScene(scene);
                    },
                    undefined,
                    (err) => console.error('[MacBookViewer] GLB load failed:', err)
                );
            })
            .catch(err => console.error('[MacBookViewer] GLTFLoader import failed:', err));

        return () => { cancelled = true; };
    }, []);

    if (hidden) return <div style={{ height: 480 }} />;

    return (
        <div ref={wrapRef} style={{ width: '100%', height: 480 }}>
            <ErrBoundary>
                <Canvas
                    frameloop="always"
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: 'default',
                        stencil: false,
                    }}
                    style={{ background: 'transparent' }}
                    onCreated={({ gl }) => {
                        gl.domElement.addEventListener('webglcontextlost', (e) => {
                            e.preventDefault();
                            setHidden(true);
                            setTimeout(() => setHidden(false), 2500);
                        });
                    }}
                >
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 8, 5]}   intensity={2.5} />
                    <directionalLight position={[-4, 2, -3]} intensity={1.0} />
                    <pointLight position={[0, 4, 3]} intensity={2.0} color="#8A29AC" />

                    {gltfScene && (
                        <MacBookScene
                            gltfScene={gltfScene}
                            isInViewRef={isInViewRef}
                        />
                    )}
                </Canvas>
            </ErrBoundary>
        </div>
    );
}
