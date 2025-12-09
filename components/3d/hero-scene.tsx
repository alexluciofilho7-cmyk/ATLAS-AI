"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Stars, Trail } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import type * as THREE from "three"

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesCount = 60

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  const particles = useMemo(() => {
    const points = []
    for (let i = 0; i < particlesCount; i++) {
      const t = (i / particlesCount) * Math.PI * 4
      const x1 = Math.cos(t) * 1.5
      const z1 = Math.sin(t) * 1.5
      const y1 = (i / particlesCount) * 6 - 3

      const x2 = Math.cos(t + Math.PI) * 1.5
      const z2 = Math.sin(t + Math.PI) * 1.5
      const y2 = (i / particlesCount) * 6 - 3

      points.push({ x: x1, y: y1, z: z1, strand: 1 })
      points.push({ x: x2, y: y2, z: z2, strand: 2 })
    }
    return points
  }, [])

  return (
    <group ref={groupRef} position={[4, 0, -2]}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={p.strand === 1 ? "#14b8a6" : "#06b6d4"}
            emissive={p.strand === 1 ? "#14b8a6" : "#06b6d4"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {/* Connecting lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const t = (i / 15) * Math.PI * 4
        const x1 = Math.cos(t) * 1.5
        const z1 = Math.sin(t) * 1.5
        const y = (i / 15) * 6 - 3
        const x2 = Math.cos(t + Math.PI) * 1.5
        const z2 = Math.sin(t + Math.PI) * 1.5

        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([x1, y, z1, x2, y, z2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#14b8a6" opacity={0.3} transparent />
          </line>
        )
      })}
    </group>
  )
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 1, -1]}>
          <MeshDistortMaterial
            color="#14b8a6"
            emissive="#14b8a6"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
        <Sphere args={[0.3, 32, 32]} position={[-4, -1, 1]}>
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={3}
          />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere args={[0.2, 32, 32]} position={[3, 2, 0]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={0.5}
            speed={4}
          />
        </Sphere>
      </Float>
    </>
  )
}

function OrbitingParticle({
  radius,
  speed,
  offset,
  color,
}: { radius: number; speed: number; offset: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.z = Math.sin(t) * radius
      ref.current.position.y = Math.sin(t * 2) * 0.5
    }
  })

  return (
    <Trail width={0.5} length={8} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    </Trail>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const ref = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#14b8a6" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GlowingRings() {
  const ringRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.2
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={ringRef} position={[0, 0, -3]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.4} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />
      <DNAHelix />
      <FloatingOrbs />
      <GlowingRings />

      <OrbitingParticle radius={2.5} speed={0.8} offset={0} color="#14b8a6" />
      <OrbitingParticle radius={2.8} speed={0.6} offset={Math.PI} color="#06b6d4" />
      <OrbitingParticle radius={3.2} speed={0.4} offset={Math.PI / 2} color="#0ea5e9" />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0a1628", 5, 30]} />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
