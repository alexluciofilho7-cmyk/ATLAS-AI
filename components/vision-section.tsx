"use client"

import { Activity, TrendingUp, Heart, Target } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Taxa de Execução",
    description: "Acompanhe sua consistência diária e veja como pequenas ações se acumulam em grandes resultados.",
    metric: "92%",
    metricLabel: "média de adesão",
  },
  {
    icon: TrendingUp,
    title: "Evolução Estética",
    description: "Monitore mudanças visuais reais com métricas de proporção e simetria corporal.",
    metric: "+12kg",
    metricLabel: "massa magra em 6 meses",
  },
  {
    icon: Heart,
    title: "Saúde Metabólica",
    description: "Indicadores de energia, sono e recuperação que mostram como sua máquina interna está funcionando.",
    metric: "85pts",
    metricLabel: "score de vitalidade",
  },
  {
    icon: Activity,
    title: "Consistência Geral",
    description: "Uma visão unificada de todos os pilares para garantir que você está no caminho certo.",
    metric: "4.8/5",
    metricLabel: "índice de progresso",
  },
]

export function VisionSection() {
  return (
    <section className="relative bg-[#0a1628] py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-3xl" />
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
              Monitoramento Completo
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Visão <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">360°</span>{" "}
            do Seu Corpo
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Quatro pilares integrados que dão a você controle total sobre sua transformação física.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="group relative">
              {/* Glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 blur transition-all duration-500 group-hover:opacity-30" />

              <div className="relative h-full rounded-2xl border border-slate-800/50 bg-[#0d1f35]/80 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-teal-500/30 group-hover:bg-[#0d2535]/80">
                {/* Number */}
                <div className="absolute right-4 top-4 text-6xl font-bold text-slate-800/30 transition-colors group-hover:text-teal-500/10">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute -inset-2 rounded-xl bg-teal-500/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
                    <pillar.icon className="h-7 w-7 text-[#0a1628]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">{pillar.description}</p>

                {/* Metric */}
                <div className="mt-auto border-t border-slate-700/50 pt-5">
                  <p className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                    {pillar.metric}
                  </p>
                  <p className="text-xs text-slate-500">{pillar.metricLabel}</p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden rounded-br-2xl">
                  <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/2 translate-y-1/2 rounded-full border border-teal-500/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
