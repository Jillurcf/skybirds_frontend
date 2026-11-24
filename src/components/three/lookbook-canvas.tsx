'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  DoubleSide,
  LinearFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  type Camera,
  type Group
} from 'three';
import { getHeroPointer, getRecommendedDpr, type HeroQuality } from '@/lib/webgl';
import { cn } from '@/lib/utils';

interface LookbookPointer {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  strength: number;
  targetStrength: number;
  pulse: number;
}

interface CardConfig {
  position: [number, number, number];
  rotation: [number, number, number];
  height: number;
  speed: number;
  depth: number;
}

const HIGH_CARDS: CardConfig[] = [
  { position: [1.45, 0.45, 0.35], rotation: [-0.06, -0.16, 0.04], height: 1.75, speed: 0.9, depth: 0 },
  { position: [2.7, -0.3, -0.35], rotation: [0.04, -0.3, -0.08], height: 1.45, speed: 0.7, depth: 1 },
  { position: [0.5, -0.85, -0.55], rotation: [0.1, 0.12, 0.1], height: 1.3, speed: 0.55, depth: 2 },
  { position: [0.95, 1.05, -1.25], rotation: [-0.08, 0.08, -0.05], height: 1.05, speed: 0.45, depth: 3 }
];

const LOW_CARDS: CardConfig[] = [
  { position: [0.75, 0.3, 0.2], rotation: [-0.04, -0.12, 0.03], height: 1.4, speed: 0.8, depth: 0 },
  { position: [1.65, -0.5, -0.3], rotation: [0.05, -0.22, -0.06], height: 1.15, speed: 0.6, depth: 1 },
  { position: [0.1, -0.85, -0.8], rotation: [0.08, 0.1, 0.08], height: 0.95, speed: 0.45, depth: 2 }
];

function useLookbookTextures(imageKey: string) {
  const sources = useMemo(() => imageKey.split('|').filter(Boolean), [imageKey]);
  const [textures, setTextures] = useState<Texture[]>([]);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    let active = true;
    const loaded: Texture[] = [];
    const loader = new TextureLoader();

    Promise.all(
      sources.map(
        (source) =>
          new Promise<Texture>((resolve, reject) => {
            loader.load(
              source,
              (texture) => {
                loaded.push(texture);
                resolve(texture);
              },
              undefined,
              reject
            );
          })
      )
    )
      .then((result) => {
        if (!active) {
          result.forEach((texture) => texture.dispose());
          return;
        }

        result.forEach((texture) => {
          texture.colorSpace = SRGBColorSpace;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.needsUpdate = true;
        });
        setTextures(result);
        invalidate();
      })
      .catch(() => {
        if (active) setTextures([]);
      });

    return () => {
      active = false;
      loaded.forEach((texture) => texture.dispose());
    };
  }, [sources, invalidate]);

  return textures;
}

function PointerDriver({ getPointer }: { getPointer: () => LookbookPointer }) {
  useFrame((_, delta) => {
    const state = getPointer();
    const blend = Math.min(delta * 4.5, 1);

    state.x += (state.targetX - state.x) * blend;
    state.y += (state.targetY - state.y) * blend;
    state.strength += (state.targetStrength - state.strength) * blend;
    state.pulse = Math.max(0, state.pulse - delta * 1.1);
  });

  return null;
}

function LookbookCard({
  texture,
  config,
  index,
  quality,
  getPointer
}: {
  texture: Texture;
  config: CardConfig;
  index: number;
  quality: Exclude<HeroQuality, 'poster'>;
  getPointer: () => LookbookPointer;
}) {
  const groupRef = useRef<Group>(null);
  const aspect = useMemo(() => {
    const source = texture.image as { width?: number; height?: number } | undefined;
    return source?.width && source?.height ? source.width / source.height : 0.8;
  }, [texture]);
  const width = config.height * aspect;

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const state = getPointer();
    const time = clock.elapsedTime;
    const blend = Math.min(delta * 2.4, 1);
    const drift = Math.sin(time * config.speed + index * 1.7) * 0.06;
    const parallaxX = state.x * (0.14 + config.depth * 0.04) * state.strength;
    const parallaxY = state.y * (0.1 + config.depth * 0.03) * state.strength;
    const targetZ = config.position[2] + state.pulse * (0.12 - config.depth * 0.02);

    group.position.x += (config.position[0] + parallaxX - group.position.x) * blend;
    group.position.y += (config.position[1] + drift + parallaxY - group.position.y) * blend;
    group.position.z += (targetZ - group.position.z) * blend;
    group.rotation.x = config.rotation[0] - state.y * 0.12 * state.strength + Math.sin(time * 0.3 + index) * 0.015;
    group.rotation.y = config.rotation[1] + state.x * 0.18 * state.strength;
    group.rotation.z = config.rotation[2] + state.pulse * 0.03 * (index % 2 === 0 ? 1 : -1);
    group.scale.setScalar(1 + state.pulse * 0.035);
  });

  return (
    <group ref={groupRef} position={config.position} rotation={config.rotation}>
      <mesh position={[0, 0, -0.012]} scale={[width + 0.035, config.height + 0.035, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#D9C6BB" transparent opacity={0.75} depthWrite={false} side={DoubleSide} />
      </mesh>
      <mesh scale={[width, config.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={quality === 'high' ? 0.96 : 0.9}
          depthWrite={false}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function CameraRig({
  quality,
  getPointer
}: {
  quality: Exclude<HeroQuality, 'poster'>;
  getPointer: () => LookbookPointer;
}) {
  const cameraRef = useRef<Camera | null>(null);

  useFrame(({ camera, clock }, delta) => {
    const activeCamera = cameraRef.current ?? camera;
    cameraRef.current = activeCamera;

    const state = getPointer();
    const amount = quality === 'high' ? 0.38 : 0.18;
    const blend = Math.min(delta * 2.2, 1);
    const targetX = state.x * amount * (0.45 + state.strength * 0.55);
    const targetY = 0.05 + state.y * amount * 0.5 + Math.sin(clock.elapsedTime * 0.1) * 0.04;
    const targetZ = 6 - state.strength * 0.25;

    activeCamera.position.x += (targetX - activeCamera.position.x) * blend;
    activeCamera.position.y += (targetY - activeCamera.position.y) * blend;
    activeCamera.position.z += (targetZ - activeCamera.position.z) * blend;
    activeCamera.lookAt(0.6, 0, 0);
  });

  return null;
}

function LookbookScene({
  quality,
  imageKey,
  getPointer
}: {
  quality: Exclude<HeroQuality, 'poster'>;
  imageKey: string;
  getPointer: () => LookbookPointer;
}) {
  const textures = useLookbookTextures(imageKey);
  const cards = quality === 'high' ? HIGH_CARDS : LOW_CARDS;

  return (
    <>
      <PointerDriver getPointer={getPointer} />
      <fog attach="fog" args={['#242323', 9, 17]} />
      <CameraRig quality={quality} getPointer={getPointer} />
      {textures.slice(0, cards.length).map((texture, index) => (
        <LookbookCard
          key={`${imageKey}-${index}`}
          texture={texture}
          config={cards[index]}
          index={index}
          quality={quality}
          getPointer={getPointer}
        />
      ))}
    </>
  );
}

interface LookbookCanvasProps {
  images?: string[];
  quality?: Exclude<HeroQuality, 'poster'>;
  reducedMotion?: boolean;
  onContextLost?: () => void;
  className?: string;
}

export default function LookbookCanvas({
  images = [],
  quality = 'high',
  reducedMotion = false,
  onContextLost,
  className
}: LookbookCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const imageKey = images.join('|');
  const pointerRef = useRef<LookbookPointer>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    strength: 0,
    targetStrength: 0,
    pulse: 0
  });
  const getPointer = useCallback(() => pointerRef.current, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onContextLost) return;

    const handleContextLost = (event: Event) => {
      if (!(event.target instanceof HTMLCanvasElement)) return;
      event.preventDefault();
      onContextLost();
    };

    container.addEventListener('webglcontextlost', handleContextLost, true);
    return () => container.removeEventListener('webglcontextlost', handleContextLost, true);
  }, [onContextLost]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const handleMove = (event: PointerEvent) => {
      const point = getHeroPointer(event.clientX, event.clientY, container.getBoundingClientRect());
      const state = pointerRef.current;

      if (!point.inside) {
        state.targetStrength = 0;
        return;
      }

      state.targetX = point.x;
      state.targetY = point.y;
      state.targetStrength = 1;
    };

    const handleDown = (event: PointerEvent) => {
      const point = getHeroPointer(event.clientX, event.clientY, container.getBoundingClientRect());
      if (!point.inside) return;
      pointerRef.current.pulse = 1;
    };

    const handleLeave = () => {
      const state = pointerRef.current;
      state.targetStrength = 0;
      state.targetX = 0;
      state.targetY = 0;
      state.pulse = 0;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('blur', handleLeave);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('blur', handleLeave);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [reducedMotion]);

  const active = inView && pageVisible && !reducedMotion;

  return (
    <div ref={containerRef} className={cn('h-full w-full', className)} aria-hidden="true">
      <Canvas
        frameloop={reducedMotion ? 'demand' : active ? 'always' : 'never'}
        dpr={getRecommendedDpr()}
        camera={{ position: [0, 0.05, 6], fov: 42 }}
        gl={{ alpha: true, antialias: quality === 'high', powerPreference: 'high-performance' }}
      >
        <LookbookScene quality={quality} imageKey={imageKey} getPointer={getPointer} />
      </Canvas>
    </div>
  );
}
