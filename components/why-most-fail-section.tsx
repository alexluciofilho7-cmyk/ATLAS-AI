"use client"

import { X, AlertTriangle } from "lucide-react"

const reasons = [
  {
    title: "Seguem protocolos genéricos",
    description: "Copiam dietas e treinos da internet que foram feitos para corpos completamente diferentes do seu.",
  },
  {
    title: "Ignoram a individualidade biológica",
    description:
      "Seu metabolismo, hormônios e capacidade de recuperação são únicos. Ignorar isso é receita para estagnação.",
  },
  {
    title: "Não ajustam com base em dados reais",
    description:
      "Ficam semanas no mesmo protocolo mesmo quando o corpo para de responder. Sem adaptação, sem resultado.",
  },
  {
    title: "Tratam pilares isolados",
    description: "Focam só no treino e esquecem que sono ruim, estresse alto e dieta mal feita sabotam todo o esforço.",
  },
  {
    title: "Não têm sistema de accountability",
    description: "Sem métricas claras e acompanhamento, qualquer deslize vira desculpa para abandonar o plano inteiro.",
  },
]

export function WhyMostFailSection() {
  return (
    <section className="relative bg-[#050a14] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">A Verdade Dura</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Por Que a Maioria{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Falha em Ter Resultados
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Você não está falhando por falta de esforço. Está falhando por falta de estratégia.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-xl border border-slate-800/50 bg-slate-900/30 p-6 transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/20">
                <X className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">{reason.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
