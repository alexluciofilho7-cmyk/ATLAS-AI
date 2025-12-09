"use client"

import { useEffect, useRef } from "react"

export function AtlasCoreVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Particle system for Atlas Core
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }> = []

    // Animation loop
    let animationFrame: number

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const centerX = w / 2
      const centerY = h / 2

      // Clear canvas
      ctx.fillStyle = "rgba(3, 7, 18, 0.1)"
      ctx.fillRect(0, 0, w, h)

      // Draw Atlas Core nucleus - pulsing blue sphere
      const time = Date.now() / 1000
      const pulseScale = 1 + Math.sin(time * 2) * 0.1

      // Outer glow rings
      for (let i = 3; i > 0; i--) {
        const radius = 80 * pulseScale * (i / 3)
        const alpha = 0.15 / i
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Core nucleus
      const coreRadius = 60 * pulseScale
      const gradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 0, centerX, centerY, coreRadius)
      gradient.addColorStop(0, "rgba(147, 197, 253, 0.6)")
      gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.4)")
      gradient.addColorStop(1, "rgba(6, 182, 212, 0.1)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw energy waves
      const waveCount = 3
      for (let i = 0; i < waveCount; i++) {
        const wavePhase = (time + i * 0.5) % (Math.PI * 2)
        const waveRadius = 120 + Math.sin(wavePhase) * 20
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - i * 0.06})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Generate particles from core
      if (particles.length < 20) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.5 + Math.random() * 0.5
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        })
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        p.vy += 0.05 // gravity pulling back to center

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.fillStyle = `rgba(59, 130, 246, ${p.life * 0.4})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ mixBlendMode: "screen" }} />
}
