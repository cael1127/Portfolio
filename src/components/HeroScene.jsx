import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';
import {
  generatePoints,
  buildConnections,
  getAccentColor,
  hasCoarsePointer,
} from '../utils/heroScene';

const POINT_COUNT = 70;
const SEED = 1;
const MAX_CONNECTION_DISTANCE = 2.2;

function ConstellationGroup({ color }) {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const interactive = useMemo(() => !hasCoarsePointer(), []);

  const points = useMemo(() => generatePoints(POINT_COUNT, SEED), []);
  const connections = useMemo(
    () => buildConnections(points, MAX_CONNECTION_DISTANCE),
    [points]
  );

  const pointPositions = useMemo(() => new Float32Array(points.flat()), [points]);
  const linePositions = useMemo(() => {
    const array = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], i) => {
      array.set([...points[a], ...points[b]], i * 6);
    });
    return array;
  }, [points, connections]);

  useEffect(() => {
    if (!interactive) return undefined;
    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [interactive]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * 0.02;
    if (interactive) {
      const targetTiltX = pointer.current.y * 0.15;
      const targetTiltZ = pointer.current.x * 0.15;
      group.rotation.x += (targetTiltX - group.rotation.x) * 0.05;
      group.rotation.z += (targetTiltZ - group.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointPositions.length / 3}
            array={pointPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.05} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
  const color = getAccentColor(theme);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ConstellationGroup color={color} />
      </Canvas>
    </div>
  );
}
