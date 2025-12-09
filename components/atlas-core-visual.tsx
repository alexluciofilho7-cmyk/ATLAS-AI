"use client"

import { useEffect, useRef } from "react"

export function AtlasCoreVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
    }> = []

    let animationFrame: number

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const centerX = w / 2
      const centerY = h / 2.2 // Slightly higher for visual balance

      // Clear with subtle trail
      ctx.fillStyle = "rgba(3, 7, 18, 0.05)"
      ctx.fillRect(0, 0, w, h)

      const time = Date.now() / 1000
      const pulseScale = 1 + Math.sin(time * 1.5) * 0.12

      const haloRadius = 200 * pulseScale
      const haloGradient = ctx.createRadialGradient(centerX, centerY - 30, 0, centerX, centerY, haloRadius)
      haloGradient.addColorStop(0, "rgba(165, 242, 254, 0.08)")
      haloGradient.addColorStop(0.6, "rgba(59, 130, 246, 0.04)")
      haloGradient.addColorStop(1, "rgba(6, 182, 212, 0)")
      ctx.fillStyle = haloGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, haloRadius, 0, Math.PI * 2)
      ctx.fill()

      const ringColors = [
        { color: "rgba(59, 130, 246, 0.15)", radiusMult: 1.2 },
        { color: "rgba(59, 130, 246, 0.1)", radiusMult: 1.5 },
        { color: "rgba(6, 182, 212, 0.08)", radiusMult: 1.8 },
      ]

      for (const ring of ringColors) {
        const radius = 100 * pulseScale * ring.radiusMult
        ctx.strokeStyle = ring.color
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      const coreRadius = 75 * pulseScale
      const coreGradient = ctx.createRadialGradient(centerX - 15, centerY - 15, 0, centerX, centerY, coreRadius)
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
      coreGradient.addColorStop(0.3, "rgba(191, 219, 254, 0.6)")
      coreGradient.addColorStop(0.7, "rgba(59, 130, 246, 0.4)")
      coreGradient.addColorStop(1, "rgba(6, 182, 212, 0.1)")
      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2)
      ctx.fill()

      const innerCoreGradient = ctx.createRadialGradient(
        centerX - 10,
        centerY - 10,
        0,
        centerX,
        centerY,
        coreRadius * 0.4,
      )
      innerCoreGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      innerCoreGradient.addColorStop(1, "rgba(191, 219, 254, 0.2)")
      ctx.fillStyle = innerCoreGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreRadius * 0.4, 0, Math.PI * 2)
      ctx.fill()

      const waveCount = 4
      for (let i = 0; i < waveCount; i++) {
        const wavePhase = (time * 1.2 + i * 0.4) % (Math.PI * 2)
        const waveRadius = 130 + Math.sin(wavePhase) * 25
        const waveAlpha = 0.15 - i * 0.04
        ctx.strokeStyle = `rgba(59, 130, 246, ${waveAlpha})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (particles.length < 15) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.3 + Math.random() * 0.4
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 1.5,
        })
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx * 0.8
        p.y += p.vy * 0.8
        p.life -= 0.015
        p.vy += 0.02 // gentle pull back to center

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Particle glow
        const particleGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        particleGradient.addColorStop(0, `rgba(191, 219, 254, ${p.life * 0.6})`)
        particleGradient.addColorStop(1, `rgba(59, 130, 246, ${p.life * 0.2})`)
        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
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
