"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Float, Environment } from "@react-three/drei"
import { useRef, Suspense } from "react"
import type * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#14b8a6"
          emissive="#0a1628"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  )
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#14b8a6" wireframe transparent opacity={0.3} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#14b8a6" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
      <Environment preset="night" />

      <AnimatedSphere />
      <WireframeSphere />
    </>
  )
}

export function TechSphere() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
