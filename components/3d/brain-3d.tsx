"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { useRef, Suspense, useMemo } from "react"
import type * as THREE from "three"

// Stylized brain geometry using merged spheres for a clean, tech look
function BrainMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Slow continuous rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  // Brain structure using positioned spheres for a stylized look
  const brainParts = useMemo(
    () => [
      // Left hemisphere
      { position: [-0.4, 0.2, 0], scale: [0.8, 0.9, 0.7] },
      { position: [-0.5, -0.1, 0.1], scale: [0.6, 0.6, 0.5] },
      { position: [-0.3, 0.5, -0.1], scale: [0.5, 0.4, 0.4] },
      { position: [-0.6, 0.3, -0.2], scale: [0.4, 0.5, 0.4] },
      // Right hemisphere
      { position: [0.4, 0.2, 0], scale: [0.8, 0.9, 0.7] },
      { position: [0.5, -0.1, 0.1], scale: [0.6, 0.6, 0.5] },
      { position: [0.3, 0.5, -0.1], scale: [0.5, 0.4, 0.4] },
      { position: [0.6, 0.3, -0.2], scale: [0.4, 0.5, 0.4] },
      // Frontal connection
      { position: [0, 0.3, 0.3], scale: [0.5, 0.5, 0.4] },
      // Brain stem
      { position: [0, -0.5, -0.2], scale: [0.3, 0.4, 0.3] },
    ],
    [],
  )

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.8}>
        {/* Main brain structure with glass-like material */}
        {brainParts.map((part, i) => (
          <mesh
            key={i}
            position={part.position as [number, number, number]}
            scale={part.scale as [number, number, number]}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              chromaticAberration={0.1}
              anisotropy={0.3}
              distortion={0.2}
              distortionScale={0.2}
              temporalDistortion={0.1}
              iridescence={1}
              iridescenceIOR={1}
              iridescenceThicknessRange={[0, 1400]}
              color="#14b8a6"
              transmission={0.95}
              roughness={0.1}
              ior={1.5}
            />
          </mesh>
        ))}

        {/* Neural network lines */}
        <NeuralConnections />

        {/* Outer glow wireframe */}
        <mesh scale={1.3}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#14b8a6" wireframe transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  )
}

// Animated neural connection points
function NeuralConnections() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(150 * 3)
    for (let i = 0; i < 150; i++) {
      // Distribute points in brain-shaped volume
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.6 + Math.random() * 0.4

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.7
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={150} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Orbiting energy rings
function EnergyRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.25
      ring2Ref.current.rotation.x = Math.PI / 3
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#14b8a6" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, -10, 5]} intensity={0.5} color="#0ea5e9" />
      <Environment preset="night" />

      <BrainMesh />
      <EnergyRings />
    </>
  )
}

export function Brain3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
