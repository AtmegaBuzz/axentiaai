'use client';

import { useRef, useEffect, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Clean screen texture: "AI is the future with Axentia.AI" ── */
function buildScreenTexture(): THREE.CanvasTexture {
    const W = 1024, H = 640;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const c = cvs.getContext('2d')!;

    /* Dark background */
    c.fillStyle = '#0a0818';
    c.fillRect(0, 0, W, H);

    /* Subtle grid lines for depth */
    c.strokeStyle = 'rgba(138,41,172,0.06)';
    c.lineWidth = 1;
    for (let y = 0; y < H; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    for (let x = 0; x < W; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }

    /* Centered headline */
    c.textAlign = 'center';
    c.textBaseline = 'middle';

    /* "AI is the future" */
    c.fillStyle = '#ffffff';
    c.font = 'bold 64px system-ui, -apple-system, sans-serif';
    c.fillText('AI is the future', W / 2, H / 2 - 50);

    /* "with Axentia.AI" — brand purple */
    c.fillStyle = '#C010DA';
    c.font = 'bold 56px system-ui, -apple-system, sans-serif';
    c.fillText('with Axentia.AI', W / 2, H / 2 + 30);

    /* Subtle tagline */
    c.fillStyle = 'rgba(255,255,255,0.25)';
    c.font = '20px system-ui, -apple-system, sans-serif';
    c.fillText('Enterprise AI + SAP Intelligence Platform', W / 2, H / 2 + 100);

    /* Purple glow behind text */
    const grad = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 350);
    grad.addColorStop(0, 'rgba(138,41,172,0.12)');
    grad.addColorStop(1, 'transparent');
    c.fillStyle = grad;
    c.fillRect(0, 0, W, H);

    return new THREE.CanvasTexture(cvs);
}

/* ── 3D scene: scroll-driven rotation ── */
function MacBookScene({
    gltfScene,
    scrollRef,
}: {
    gltfScene: THREE.Group;
    scrollRef: React.RefObject<number>;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;

        const progress = scrollRef.current ?? 0;

        // Rotate from Math.PI (back facing) → 0 (screen facing camera)
        const targetY = Math.PI * (1 - progress);

        // Smooth interpolation for nice easing
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetY,
            0.08
        );
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
    render() { return this.state.err ? null : this.props.children; }
}

/* ── Exported viewer ── */
export function MacBookViewer() {
    const wrapRef   = useRef<HTMLDivElement>(null);
    const scrollRef = useRef(0);
    const [gltfScene, setGltfScene] = useState<THREE.Group | null>(null);
    const [hidden, setHidden]       = useState(false);

    /* Track scroll progress: 0 = section below fold, 1 = section centered */
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            // center of the element relative to viewport center
            const mid = rect.top + rect.height / 2;
            // 0 when element center is at bottom of viewport, 1 when at center
            const raw = 1 - (mid - vh / 2) / (vh / 2);
            scrollRef.current = Math.max(0, Math.min(1, raw));
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Load GLB */
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

                        /* Auto-center */
                        const box = new THREE.Box3().setFromObject(scene);
                        const center = new THREE.Vector3();
                        box.getCenter(center);
                        scene.position.sub(center);

                        /* Auto-scale to ~2.8 world units */
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        const scale = 2.8 / Math.max(size.x, size.y, size.z);
                        scene.scale.setScalar(scale);

                        /* Apply screen texture to lid mesh (index 0 = tall Y) */
                        const meshes: THREE.Mesh[] = [];
                        scene.traverse(obj => {
                            if ((obj as THREE.Mesh).isMesh) meshes.push(obj as THREE.Mesh);
                        });
                        if (meshes[0]) {
                            const tex = buildScreenTexture();
                            meshes[0].material = new THREE.MeshStandardMaterial({
                                map: tex,
                                roughness: 0.15,
                                metalness: 0,
                                emissive: new THREE.Color('#0a0818'),
                                emissiveIntensity: 0.8,
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

    if (hidden) return <div style={{ height: 520 }} />;

    return (
        <div ref={wrapRef} style={{ width: '100%', height: 520, overflow: 'visible' }}>
            <ErrBoundary>
                <Canvas
                    frameloop="always"
                    camera={{ position: [0, 0.3, 4.5], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{ alpha: true, antialias: true, powerPreference: 'default', stencil: false }}
                    style={{ background: 'transparent', overflow: 'visible' }}
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
                    <pointLight position={[0, 4, 3]} intensity={1.5} color="#8A29AC" />

                    {gltfScene && (
                        <MacBookScene gltfScene={gltfScene} scrollRef={scrollRef} />
                    )}
                </Canvas>
            </ErrBoundary>
        </div>
    );
}
