"use client"

import { Target, TrendingUp, Heart, Activity } from "lucide-react"

const metrics = [
  {
    icon: Target,
    title: "Taxa de Execução",
    value: "92%",
    description: "Acompanhe sua consistência diária e veja como pequenas ações se acumulam em grandes resultados.",
    trend: "+8% vs. semana passada",
  },
  {
    icon: TrendingUp,
    title: "Evolução Estética",
    value: "+4.2kg",
    description: "Monitore mudanças visuais reais com métricas de proporção, simetria e composição corporal.",
    trend: "Massa magra em 3 meses",
  },
  {
    icon: Heart,
    title: "Saúde Metabólica",
    value: "85/100",
    description: "Indicadores de energia, hormônios e recuperação que mostram como sua máquina interna funciona.",
    trend: "Score de vitalidade",
  },
  {
    icon: Activity,
    title: "Consistência Geral",
    value: "4.8/5",
    description: "Uma visão unificada de todos os pilares para garantir que você está no caminho certo.",
    trend: "Índice de progresso geral",
  },
]

export function Vision360Section() {
  return (
    <section className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Dashboard Integrado</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Visão <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">360°</span>{" "}
            do Seu Corpo
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Quatro métricas integradas que dão a você controle total sobre sua transformação física.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="group relative">
              {/* Glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 blur transition-all duration-500 group-hover:opacity-30" />

              <div className="relative h-full rounded-2xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/30">
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/20">
                  <metric.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-white">{metric.title}</h3>
                <p className="mb-4 text-sm text-slate-400 leading-relaxed">{metric.description}</p>

                {/* Metric */}
                <div className="border-t border-slate-700/50 pt-4">
                  <p className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                    {metric.value}
                  </p>
                  <p className="text-xs text-slate-500">{metric.trend}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
