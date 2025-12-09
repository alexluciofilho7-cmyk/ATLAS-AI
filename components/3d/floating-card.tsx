"use client"

import type React from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { Html, RoundedBox } from "@react-three/drei"
import { useRef, Suspense } from "react"
import type * as THREE from "three"

function Card3D({
  children,
  position = [0, 0, 0],
}: { children: React.ReactNode; position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <RoundedBox args={[4, 2.5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#0d1f35" metalness={0.5} roughness={0.3} transparent opacity={0.9} />
      </RoundedBox>
      <Html transform occlude position={[0, 0, 0.06]} className="pointer-events-none">
        <div className="w-[320px] p-4 text-white">{children}</div>
      </Html>
    </mesh>
  )
}

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#14b8a6" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />

      <Card3D position={[0, 0, 0]}>{children}</Card3D>
    </>
  )
}

export function FloatingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Scene>{children}</Scene>
        </Suspense>
      </Canvas>
    </div>
  )
}
