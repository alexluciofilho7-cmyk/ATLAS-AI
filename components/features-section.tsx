"use client"

import { Dumbbell, Utensils, Moon, Zap, ChevronRight, Cpu } from "lucide-react"

const features = [
  {
    icon: Dumbbell,
    title: "Treino Inteligente",
    subtitle: "Estética e Proporção",
    description: "Periodização que prioriza pontos fracos e evita volumes desnecessários.",
    benefits: ["Foco em proporção estética", "Progressão de carga segura", "Treinos otimizados para você"],
  },
  {
    icon: Utensils,
    title: "Nutrição Estratégica",
    subtitle: "Flexibilidade Real",
    description: "Uma dieta que considera sua vida social e preferências alimentares.",
    benefits: ["Trocas inteligentes de alimentos", "Ciclo de carboidratos automático", "Coma o que gosta sem culpa"],
  },
  {
    icon: Moon,
    title: "Sono e Recuperação",
    subtitle: "O Músculo Cresce no Descanso",
    description: "Monitoramento da qualidade do sono para resultados máximos.",
    benefits: ["Pontuação de prontidão diária", "Higiene do sono personalizada", "Redução do cortisol"],
  },
  {
    icon: Zap,
    title: "Saúde Hormonal",
    subtitle: "Otimização Natural",
    description: "Acompanhamento de sinais vitais da sua máquina interna.",
    benefits: ["Monitoramento de testosterona", "Estratégias metabólicas", "Relatórios para seu médico"],
  },
]

export function FeaturesSection() {
  return (
    <section className="relative bg-[#071018] py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-3xl" />
        {/* Tech lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L100 50 M50 0 L50 100" stroke="#14b8a6" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="2" fill="#14b8a6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
            <Cpu className="h-4 w-4 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Funcionalidades</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            O que a Atlas AI
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              faz por você
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Não é mágica. É processamento de dados e ciência aplicada ao seu corpo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#0d1f35]/80 to-[#0a1628]/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30"
            >
              {/* Corner decoration */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/5 blur-2xl transition-all duration-500 group-hover:bg-teal-500/10" />

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 opacity-0 transition-all duration-500 group-hover:from-teal-500/10 group-hover:via-cyan-500/5 group-hover:to-teal-500/10 group-hover:opacity-100" />

              <div className="relative">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-xl bg-teal-500/20 blur-lg opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
                        <feature.icon className="h-7 w-7 text-[#0a1628]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      <p className="text-sm font-medium text-teal-400">{feature.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-400" />
                </div>

                {/* Description */}
                <p className="mb-6 text-slate-400">{feature.description}</p>

                {/* Benefits */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 ring-1 ring-teal-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(20,184,166,0.8)]" />
                      </div>
                      <span className="text-sm text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Index number */}
                <div className="absolute bottom-4 right-4 text-6xl font-bold text-slate-800/20">0{index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
