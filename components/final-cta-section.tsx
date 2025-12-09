"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function FinalCtaSection() {
  return (
    <section className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="500"
          height="500"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-[0.08]"
        >
          <defs>
            <linearGradient id="ctaAtlasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer orbital ring - tilted ellipse */}
          <ellipse
            cx="100"
            cy="100"
            rx="85"
            ry="35"
            stroke="url(#ctaAtlasGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            transform="rotate(30 100 100)"
            filter="url(#glow)"
          />

          {/* Middle orbital ring - tilted ellipse */}
          <ellipse
            cx="100"
            cy="100"
            rx="85"
            ry="35"
            stroke="url(#ctaAtlasGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            transform="rotate(-30 100 100)"
            filter="url(#glow)"
          />

          {/* Inner orbital ring */}
          <ellipse
            cx="100"
            cy="100"
            rx="85"
            ry="35"
            stroke="url(#ctaAtlasGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            filter="url(#glow)"
          />

          {/* Orbital glow points */}
          <circle cx="185" cy="100" r="3" fill="#06b6d4" opacity="0.8" filter="url(#glow)" />
          <circle cx="15" cy="100" r="3" fill="#06b6d4" opacity="0.8" filter="url(#glow)" />
          <circle cx="142" cy="60" r="3" fill="#3b82f6" opacity="0.8" filter="url(#glow)" />
          <circle cx="58" cy="140" r="3" fill="#3b82f6" opacity="0.8" filter="url(#glow)" />

          {/* Large "A" letter with serif structure */}
          <g stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="square" strokeLinejoin="miter">
            {/* Left leg of A with serif */}
            <path d="M 55 150 L 55 145 L 100 45 L 100 45" />
            <path d="M 50 150 L 60 150" />

            {/* Right leg of A with serif */}
            <path d="M 145 150 L 145 145 L 100 45 L 100 45" />
            <path d="M 140 150 L 150 150" />

            {/* Crossbar of A */}
            <path d="M 70 110 L 130 110" strokeWidth="7" />

            {/* Top serif */}
            <path d="M 95 45 L 105 45" strokeWidth="6" />
          </g>

          {/* Central heartbeat line inside A */}
          <path
            d="M 95 100 L 100 90 L 105 100"
            stroke="#06b6d4"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
          <Shield className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Garantia de 7 Dias</span>
        </div>

        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
          Você Pode Continuar Tentando{" "}
          <span className="bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent">Sozinho</span>
          <br />
          Ou Ter Uma{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            IA Trabalhando Por Você
          </span>
        </h2>

        <p className="mb-10 mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
          Cada dia que passa sem um protocolo inteligente é um dia de progresso perdido. Sua genética não está ficando
          melhor. Seu metabolismo não está acelerando. O momento de agir é agora.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="group relative h-14 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 px-10 text-base font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center">
              Acessar Atlas Agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400"
            >
              <path
                d="M12 2L4 6V12C4 16.5 7 20.5 12 22C17 20.5 20 16.5 20 12V6L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Garantia de 7 dias</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M19 8L21 6M21 6L19 4M21 6H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Configuração em menos de 60 segundos</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400"
            >
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 3V5M12 19V21M3 12H5M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
            <span>IA baseada em evidências</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-slate-800 pt-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>+10.000 usuários</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>98% de satisfação</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Garantia de reembolso</span>
          </div>
        </div>
      </div>
    </section>
  )
}
