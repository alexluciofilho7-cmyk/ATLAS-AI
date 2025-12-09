"use client"

export function AtlasHubDiagram() {
  const modules = [
    { label: "Treino" },
    { label: "Dieta" },
    { label: "Sono" },
    { label: "Testosterona" },
    { label: "Postura" },
    { label: "Compulsão" },
  ]

  return (
    <div className="relative h-[32rem] lg:h-[42rem] w-full max-w-5xl mx-auto">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
        {/* Define all gradients and filters */}
        <defs>
          {/* Main energy line gradient: blue to ice cyan */}
          <linearGradient id="energyLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.9)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.7)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.5)" />
          </linearGradient>

          {/* Glow filter for atlas core */}
          <filter id="atlasCoreShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/* Radial glow for energy nodes */}
          <radialGradient id="energyNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>

          {/* Core halo gradient */}
          <radialGradient id="coreHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.4)" />
            <stop offset="70%" stopColor="rgba(34, 211, 238, 0.2)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </radialGradient>
        </defs>

        {/* Background grid effect */}
        <defs>
          <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#techGrid)" />

        {/* Connection lines with energy effect */}
        {modules.map((_, index) => {
          const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2
          const radius = 160
          const x = 250 + Math.cos(angle) * radius
          const y = 200 + Math.sin(angle) * radius

          // Calculate intermediate points for energy nodes
          const mid1X = 250 + Math.cos(angle) * (radius * 0.33)
          const mid1Y = 200 + Math.sin(angle) * (radius * 0.33)
          const mid2X = 250 + Math.cos(angle) * (radius * 0.66)
          const mid2Y = 200 + Math.sin(angle) * (radius * 0.66)

          return (
            <g key={`connection-${index}`}>
              {/* Outer glow for line */}
              <line
                x1="250"
                y1="200"
                x2={x}
                y2={y}
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="8"
                opacity="0.4"
                className="animate-pulse-line"
              />

              {/* Main energy line with gradient */}
              <line
                x1="250"
                y1="200"
                x2={x}
                y2={y}
                stroke="url(#energyLineGradient)"
                strokeWidth="2.5"
                className="animate-pulse-line"
                filter="url(#atlasCoreShadow)"
              />

              {/* Energy nodes at intermediate points */}
              {/* Node 1 - First third */}
              <circle cx={mid1X} cy={mid1Y} r="3.5" fill="rgba(96, 165, 250, 0.8)" className="animate-pulse-node" />
              <circle cx={mid1X} cy={mid1Y} r="6" fill="url(#energyNodeGlow)" opacity="0.6" />

              {/* Node 2 - Second third */}
              <circle cx={mid2X} cy={mid2Y} r="3.5" fill="rgba(34, 211, 238, 0.7)" className="animate-pulse-node" />
              <circle cx={mid2X} cy={mid2Y} r="6" fill="url(#energyNodeGlow)" opacity="0.5" />
            </g>
          )
        })}

        {/* ATLAS CORE - Premium nucleus */}
        {/* Outer halo rings */}
        <circle cx="250" cy="200" r="55" fill="url(#coreHalo)" className="animate-pulse-halo-outer" />
        <circle
          cx="250"
          cy="200"
          r="50"
          fill="none"
          stroke="rgba(96, 165, 250, 0.3)"
          strokeWidth="1"
          className="animate-rotate-slow-10"
        />
        <circle cx="250" cy="200" r="45" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" opacity="0.7" />

        {/* Core glow layers */}
        <circle cx="250" cy="200" r="38" fill="rgba(59, 130, 246, 0.12)" filter="url(#atlasCoreShadow)" />
        <circle cx="250" cy="200" r="35" fill="rgba(96, 165, 250, 0.08)" />

        {/* Inner core with dual gradient */}
        <circle cx="250" cy="200" r="32" fill="rgba(59, 130, 246, 0.25)" />
        <circle cx="250" cy="200" r="28" fill="rgba(34, 211, 238, 0.15)" />

        {/* Micro particles effect - small circles around core */}
        {[...Array(12)].map((_, i) => {
          const particleAngle = (i / 12) * Math.PI * 2
          const particleRadius = 42
          const particleX = 250 + Math.cos(particleAngle) * particleRadius
          const particleY = 200 + Math.sin(particleAngle) * particleRadius
          return (
            <circle
              key={`particle-${i}`}
              cx={particleX}
              cy={particleY}
              r="1.2"
              fill="rgba(96, 165, 250, 0.6)"
              className="animate-pulse-particle"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          )
        })}

        {/* Central "A" with text glow */}
        <text
          x="250"
          y="210"
          textAnchor="middle"
          fontSize="48"
          fontWeight="800"
          fill="rgba(96, 165, 250, 0.95)"
          className="font-sans"
          letterSpacing="-1"
        >
          A
        </text>

        {/* "ATLAS" subtitle below core */}
        <text
          x="250"
          y="235"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          fill="rgba(34, 211, 238, 0.7)"
          letterSpacing="2"
          className="font-sans"
        >
          CORE
        </text>

        {/* Module icons - Custom tech minimal design */}
        {modules.map((module, index) => {
          const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2
          const radius = 160
          const x = 250 + Math.cos(angle) * radius
          const y = 200 + Math.sin(angle) * radius

          return (
            <g key={`module-icon-${index}`}>
              {/* Icon background circle with glow */}
              <circle
                cx={x}
                cy={y}
                r="24"
                fill="rgba(59, 130, 246, 0.08)"
                stroke="rgba(96, 165, 250, 0.4)"
                strokeWidth="1.5"
                className="animate-pulse-icon-bg"
              />
              <circle
                cx={x}
                cy={y}
                r="28"
                fill="none"
                stroke="rgba(34, 211, 238, 0.15)"
                strokeWidth="0.5"
                opacity="0.5"
              />

              {/* Custom icon SVGs - Minimal tech aesthetic */}
              {index === 0 && (
                /* Treino: Technical force symbol with progression lines */
                <g transform={`translate(${x}, ${y})`}>
                  <path
                    d="M -6 -4 L -6 4 M 6 -4 L 6 4 M -8 0 L 8 0 M -4 -6 L -4 6 M 4 -6 L 4 6"
                    stroke="rgba(96, 165, 250, 0.9)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {index === 1 && (
                /* Dieta: Macro biometry hexagon */
                <g transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="7" fill="none" stroke="rgba(96, 165, 250, 0.9)" strokeWidth="1" />
                  <circle cx="-3.5" cy="0" r="2" fill="rgba(96, 165, 250, 0.7)" />
                  <circle cx="3.5" cy="0" r="2" fill="rgba(96, 165, 250, 0.7)" />
                  <circle cx="0" cy="-3.5" r="2" fill="rgba(96, 165, 250, 0.7)" />
                </g>
              )}

              {index === 2 && (
                /* Sono: Sleep cycles with orbit/waves */
                <g transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(96, 165, 250, 0.9)" strokeWidth="1" />
                  <path
                    d="M -4 2 Q -2 0 0 2 Q 2 4 4 2"
                    stroke="rgba(96, 165, 250, 0.8)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {index === 3 && (
                /* Testosterona: Biomedical energy seal/hexagon */
                <g transform={`translate(${x}, ${y})`}>
                  <path
                    d="M 0 -7 L 6 -3.5 L 6 3.5 L 0 7 L -6 3.5 L -6 -3.5 Z"
                    fill="none"
                    stroke="rgba(96, 165, 250, 0.9)"
                    strokeWidth="1"
                  />
                  <circle cx="0" cy="0" r="3" fill="rgba(96, 165, 250, 0.5)" />
                </g>
              )}

              {index === 4 && (
                /* Postura: Spine with biomechanical alignment */
                <g transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="-4" r="2" fill="rgba(96, 165, 250, 0.8)" />
                  <line x1="0" y1="-2" x2="0" y2="4" stroke="rgba(96, 165, 250, 0.9)" strokeWidth="1" />
                  <line x1="-3" y1="-1" x2="3" y2="-1" stroke="rgba(96, 165, 250, 0.7)" strokeWidth="0.8" />
                  <line x1="-3" y1="1" x2="3" y2="1" stroke="rgba(96, 165, 250, 0.7)" strokeWidth="0.8" />
                  <line x1="-3" y1="3" x2="3" y2="3" stroke="rgba(96, 165, 250, 0.7)" strokeWidth="0.8" />
                </g>
              )}

              {index === 5 && (
                /* Compulsão: Neural control circuit aesthetic */
                <g transform={`translate(${x}, ${y})`}>
                  <rect
                    x="-5"
                    y="-5"
                    width="10"
                    height="10"
                    fill="none"
                    stroke="rgba(96, 165, 250, 0.9)"
                    strokeWidth="1"
                  />
                  <circle cx="-3" cy="-3" r="1.5" fill="rgba(96, 165, 250, 0.8)" />
                  <circle cx="3" cy="-3" r="1.5" fill="rgba(96, 165, 250, 0.8)" />
                  <circle cx="0" cy="3" r="1.5" fill="rgba(96, 165, 250, 0.8)" />
                  <line x1="-2.5" y1="-3" x2="2.5" y2="-3" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="0.5" />
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {/* Module labels positioned around the hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        {modules.map((module, index) => {
          const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2
          const labelRadius = 185
          const x = Math.cos(angle) * labelRadius
          const y = Math.sin(angle) * labelRadius

          return (
            <div
              key={`label-${index}`}
              className="absolute flex flex-col items-center gap-1.5"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <span className="text-base font-semibold text-blue-200 tracking-wide">{module.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
