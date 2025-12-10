"use client"

import { Brain, Target, Fingerprint } from "lucide-react"

const pillars = [
  {
    icon: Brain,
    title: "Inteligência Artificial Avançada",
    description:
      "A Atlas usa modelos de IA treinados com milhares de protocolos de elite para criar planos que se adaptam ao seu corpo, não a uma planilha genérica.",
  },
  {
    icon: Target,
    title: "Método Baseado em Evidências",
    description:
      "Cada recomendação é fundamentada em ciência: fisiologia do exercício, cronobiologia, endocrinologia e nutrição esportiva de alto nível.",
  },
  {
    icon: Fingerprint,
    title: "Personalização Real",
    description:
      "Não existe 'tamanho único'. A Atlas considera sua rotina, preferências, limitações e objetivos para criar um protocolo 100% seu.",
  },
]

export function WhatIsAtlasSection() {
  return (
    <section className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">O Que É</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            A Atlas IA é o Cérebro Estratégico{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              do Seu Corpo
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Uma plataforma de performance e estética natural que integra treino, dieta, sono, testosterona, postura e
            controle de compulsão alimentar em um único sistema inteligente.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Furion-style gradient background with glass effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-blue-950/80 backdrop-blur-xl" />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-3xl border border-blue-400/20 group-hover:border-blue-400/40 transition-colors duration-300" />

              {/* Hover glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-400/0 via-blue-500/0 to-blue-600/0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

              {/* Soft inner glow at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent" />

              <div className="relative p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50">
                  <pillar.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="text-slate-300 leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
