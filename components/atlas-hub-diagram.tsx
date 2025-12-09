"use client"

import { Dumbbell, Utensils, Moon, Zap, Bone, Brain } from "lucide-react"

export function AtlasHubDiagram() {
  const modules = [
    { icon: Dumbbell, label: "Treino" },
    { icon: Utensils, label: "Dieta" },
    { icon: Moon, label: "Sono" },
    { icon: Zap, label: "Testosterona" },
    { icon: Bone, label: "Postura" },
    { icon: Brain, label: "Compulsão" },
  ]

  return (
    <div className="relative h-80 w-full max-w-2xl mx-auto">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320">
        {modules.map((_, index) => {
          const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2
          const x = 200 + Math.cos(angle) * 140
          const y = 160 + Math.sin(angle) * 120

          return (
            <g key={`line-${index}`}>
              {/* Animated line */}
              <line
                x1="200"
                y1="160"
                x2={x}
                y2={y}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                opacity="0.6"
                className="animate-pulse-subtle"
              />
              {/* Glow effect */}
              <line x1="200" y1="160" x2={x} y2={y} stroke="rgba(59, 130, 246, 0.2)" strokeWidth="6" opacity="0.3" />
            </g>
          )
        })}

        {/* Gradients */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.4)" />
          </linearGradient>
        </defs>

        {/* Central nucleus */}
        <circle cx="200" cy="160" r="35" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />
        <circle cx="200" cy="160" r="30" fill="rgba(59, 130, 246, 0.15)" />
        <circle cx="200" cy="160" r="25" fill="rgba(6, 182, 212, 0.1)" />

        {/* Central "A" */}
        <text
          x="200"
          y="170"
          textAnchor="middle"
          fontSize="32"
          fontWeight="bold"
          fill="rgba(59, 130, 246, 0.9)"
          className="font-sans"
        >
          A
        </text>

        {/* Module icons/indicators */}
        {modules.map((module, index) => {
          const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2
          const x = 200 + Math.cos(angle) * 140
          const y = 160 + Math.sin(angle) * 120

          return (
            <g key={`module-${index}`}>
              <circle
                cx={x}
                cy={y}
                r="18"
                fill="rgba(59, 130, 246, 0.2)"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="1.5"
              />
              <circle cx={x} cy={y} r="15" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" opacity="0.5" />
            </g>
          )
        })}
      </svg>

      {/* Module labels positioned around the hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        {modules.map((module, index) => {
          const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(angle) * 160
          const y = Math.sin(angle) * 140
          const Icon = module.icon

          return (
            <div
              key={`label-${index}`}
              className="absolute flex flex-col items-center gap-2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/30 border border-blue-500/50">
                <Icon className="h-5 w-5 text-blue-300" />
              </div>
              <span className="text-xs text-slate-300 font-medium">{module.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
