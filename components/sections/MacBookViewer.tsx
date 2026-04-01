'use client';

import { useRef, useEffect, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Screen texture ── */
function buildScreenTexture(): THREE.CanvasTexture {
    const W = 1024, H = 640;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const c = cvs.getContext('2d')!;

    c.fillStyle = '#0a0818';
    c.fillRect(0, 0, W, H);

    const grad = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 320);
    grad.addColorStop(0, 'rgba(138,41,172,0.15)');
    grad.addColorStop(1, 'transparent');
    c.fillStyle = grad;
    c.fillRect(0, 0, W, H);

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
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

/* ── Scene ── */
function MacBookInner({ scrollRef }: { scrollRef: React.RefObject<number> }) {
    const groupRef     = useRef<THREE.Group>(null);
    const sceneRef     = useRef<THREE.Group | null>(null);
    const screenRef    = useRef<THREE.Mesh | null>(null);
    const screenActive = useRef(false);
    const [ready, setReady] = useState(false);
    const { camera } = useThree();

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
                        const scaleFactor = 2.8 / Math.max(size.x, size.y, size.z);
                        scene.scale.setScalar(scaleFactor);

                        /* Find lid mesh (index 0 = tall Y) and compute its screen area */
                        const meshes: THREE.Mesh[] = [];
                        scene.traverse(o => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });

                        if (meshes[0]) {
                            /* Recompute after scale */
                            scene.updateMatrixWorld(true);
                            const lidBox = new THREE.Box3().setFromObject(meshes[0]);
                            const lidCenter = new THREE.Vector3();
                            const lidSize = new THREE.Vector3();
                            lidBox.getCenter(lidCenter);
                            lidBox.getSize(lidSize);

                            /* Screen plane: 70% of lid, on its front face (+Z) */
                            const tex = buildScreenTexture();
                            const screenMat = new THREE.MeshBasicMaterial({
                                map: tex,
                                transparent: true,
                                opacity: 1,
                                depthWrite: false,
                            });
                            const screenGeo = new THREE.PlaneGeometry(
                                lidSize.x * 0.7,
                                lidSize.y * 0.7
                            );
                            const screenMesh = new THREE.Mesh(screenGeo, screenMat);
                            /* Try front face first; if wrong face, flip to min.z */
                            screenMesh.position.set(
                                lidCenter.x,
                                lidCenter.y,
                                lidBox.min.z - 0.02
                            );
                            screenMesh.rotation.y = Math.PI; /* face toward camera */
                            screenMesh.visible = false;
                            scene.add(screenMesh);
                            screenRef.current = screenMesh;
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

    useFrame(() => {
        if (!groupRef.current) return;
        const raw = scrollRef.current ?? 0;

        const spinProgress = Math.min(raw / 0.3, 1);
        const zoomProgress = Math.max(0, (raw - 0.25) / 0.75);

        /* Rotation: 90° → 0° */
        const targetY = (Math.PI / 2) * (1 - spinProgress);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, targetY, 0.15
        );

        /* Zoom */
        const targetZ = THREE.MathUtils.lerp(9, 7, zoomProgress);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);

        /* Show screen plane only when facing user */
        const screen = screenRef.current;
        if (!screen) return;
        if (spinProgress > 0.95 && !screenActive.current) {
            screen.visible = true;
            screenActive.current = true;
        } else if (spinProgress <= 0.85 && screenActive.current) {
            screen.visible = false;
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

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const mid = rect.top + rect.height / 2;
            const raw = (vh - mid) / (vh * 0.3);
            scrollRef.current = Math.max(0, Math.min(1, raw));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (hidden) return <div style={{ height: 800 }} />;

    return (
        <div
            ref={wrapRef}
            style={{ width: '100%', height: 800, overflow: 'visible', position: 'relative', zIndex: 10 }}
        >
            <ErrBoundary>
                <Canvas
                    frameloop="always"
                    camera={{ position: [0, 0.3, 9], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{ alpha: true, antialias: true, powerPreference: 'default', stencil: false }}
                    style={{ background: 'transparent', overflow: 'visible', position: 'absolute', inset: 0 }}
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
