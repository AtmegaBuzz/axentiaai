'use client';

import { useRef, useEffect, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Screen texture: "AI is the future with Axentia.AI" ── */
function buildScreenTexture(): THREE.CanvasTexture {
    const W = 1024, H = 640;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const c = cvs.getContext('2d')!;

    /* Dark background — no grid, no patterns */
    c.fillStyle = '#0a0818';
    c.fillRect(0, 0, W, H);

    /* Purple glow behind text */
    const grad = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 320);
    grad.addColorStop(0, 'rgba(138,41,172,0.15)');
    grad.addColorStop(1, 'transparent');
    c.fillStyle = grad;
    c.fillRect(0, 0, W, H);

    /* Centered headline */
    c.textAlign = 'center';
    c.textBaseline = 'middle';

    c.fillStyle = '#ffffff';
    c.font = 'bold 64px system-ui, -apple-system, sans-serif';
    c.fillText('AI is the future', W / 2, H / 2 - 50);

    c.fillStyle = '#C010DA';
    c.font = 'bold 56px system-ui, -apple-system, sans-serif';
    c.fillText('with Axentia.AI', W / 2, H / 2 + 30);

    c.fillStyle = 'rgba(255,255,255,0.25)';
    c.font = '20px system-ui, -apple-system, sans-serif';
    c.fillText('Enterprise AI + SAP Intelligence Platform', W / 2, H / 2 + 100);

    const tex = new THREE.CanvasTexture(cvs);
    tex.flipY = false;           // match glTF UV convention
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

/* ── All-in-one scene: loads model, drives rotation + screen swap ── */
function MacBookInner({ scrollRef }: { scrollRef: React.RefObject<number> }) {
    const groupRef      = useRef<THREE.Group>(null);
    const sceneRef      = useRef<THREE.Group | null>(null);
    const lidRef        = useRef<THREE.Mesh | null>(null);
    const origMatRef    = useRef<THREE.Material | null>(null);
    const screenMatRef  = useRef<THREE.Material | null>(null);
    const screenActive  = useRef(false);
    const [ready, setReady] = useState(false);

    /* Load GLB once */
    useEffect(() => {
        let cancelled = false;

        import('three/examples/jsm/loaders/GLTFLoader.js')
            .then(({ GLTFLoader }) => {
                new GLTFLoader().load(
                    '/3dmodels/macbook.glb',
                    (gltf) => {
                        if (cancelled) return;
                        const scene = gltf.scene;

                        /* Auto-center */
                        const box = new THREE.Box3().setFromObject(scene);
                        const center = new THREE.Vector3();
                        box.getCenter(center);
                        scene.position.sub(center);

                        /* Auto-scale */
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        scene.scale.setScalar(2.8 / Math.max(size.x, size.y, size.z));

                        /* Find lid mesh (index 0 = tall Y-extent), stash materials */
                        const meshes: THREE.Mesh[] = [];
                        scene.traverse(o => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });

                        if (meshes[0]) {
                            lidRef.current = meshes[0];
                            origMatRef.current = meshes[0].material as THREE.Material;

                            const tex = buildScreenTexture();
                            screenMatRef.current = new THREE.MeshStandardMaterial({
                                map: tex,
                                roughness: 0.15,
                                metalness: 0,
                                emissive: new THREE.Color('#0a0818'),
                                emissiveIntensity: 0.8,
                            });
                        }

                        sceneRef.current = scene;
                        setReady(true);
                    },
                    undefined,
                    (err) => console.error('[MacBookViewer] GLB load failed:', err)
                );
            })
            .catch(err => console.error('[MacBookViewer] GLTFLoader import failed:', err));

        return () => { cancelled = true; };
    }, []);

    /* Scroll-driven rotation + screen text swap */
    useFrame(() => {
        if (!groupRef.current) return;
        const progress = scrollRef.current ?? 0;

        /* Rotate from π (back) → 0 (front) */
        const targetY = Math.PI * (1 - progress);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, targetY, 0.08
        );

        /* Swap lid material: show screen text only when nearly face-on */
        const lid = lidRef.current;
        if (!lid || !screenMatRef.current || !origMatRef.current) return;

        if (progress > 0.92 && !screenActive.current) {
            lid.material = screenMatRef.current;
            screenActive.current = true;
        } else if (progress <= 0.85 && screenActive.current) {
            lid.material = origMatRef.current;
            screenActive.current = false;
        }
    });

    if (!ready || !sceneRef.current) return null;
    return (
        <group ref={groupRef}>
            <primitive object={sceneRef.current} />
        </group>
    );
}

/* ── Error boundary ── */
class ErrBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
    state = { err: false };
    static getDerivedStateFromError() { return { err: true }; }
    render() { return this.state.err ? null : this.props.children; }
}

/* ── Exported wrapper ── */
export function MacBookViewer() {
    const wrapRef   = useRef<HTMLDivElement>(null);
    const scrollRef = useRef(0);
    const [hidden, setHidden] = useState(false);

    /* Scroll progress: 0 → 1 as section enters → centres in viewport */
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            // progress = 0 when element top enters bottom of viewport
            // progress = 1 when element top reaches 70% from top (well above center)
            const raw = 1 - rect.top / (vh * 0.85);
            scrollRef.current = Math.max(0, Math.min(1, raw));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
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
                    <MacBookInner scrollRef={scrollRef} />
                </Canvas>
            </ErrBoundary>
        </div>
    );
}
