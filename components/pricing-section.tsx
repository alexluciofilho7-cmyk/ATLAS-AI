"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap } from "lucide-react"

const plans = [
  {
    name: "Básico",
    subtitle: "O Essencial",
    price: "49,90",
    period: "/mês",
    description: "Para quem está começando sua jornada.",
    features: [
      "Módulo de Treino Inteligente (IA)",
      "Módulo de Nutrição & Macros",
      "Chat com o Atlas (Básico)",
      "Base de conhecimento científica",
    ],
    highlighted: false,
  },
  {
    name: "Performance",
    subtitle: "O Equilibrado",
    price: "69,90",
    period: "/mês",
    description: "Para praticantes sérios que buscam resultados.",
    features: [
      "Tudo do Plano Básico",
      "Módulo de Sono & Recuperação",
      "Análise de Prontidão Diária",
      "Monitoramento de overtraining",
      "Otimização de disposição e foco",
    ],
    highlighted: true,
    badge: "Mais Escolhido",
  },
  {
    name: "Completo",
    subtitle: "A Elite",
    price: "99,90",
    period: "/mês",
    description: "Para biohackers que buscam o máximo.",
    features: [
      "Tudo do Plano Performance",
      "Módulo Saúde Hormonal & Metabólica",
      "Módulo Correção Postural & Fisio",
      "Módulo Gestão de Compulsão",
      "Visão 360° da sua saúde",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section className="relative bg-[#0a1628] py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-3xl" />
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Planos</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Escolha o nível de
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              inteligência
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Todos os planos incluem 7 dias de teste grátis e garantia de reembolso.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${plan.highlighted ? "z-10 scale-105 lg:scale-110" : ""}`}
            >
              {/* Glow effect for highlighted plan */}
              {plan.highlighted && (
                <>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 opacity-50 blur-lg" />
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-75" />
                </>
              )}

              <div
                className={`relative h-full rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-transparent bg-gradient-to-b from-[#0d2535] to-[#0a1628]"
                    : "border-slate-800/50 bg-[#0d1f35]/50 backdrop-blur-sm"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1.5 text-xs font-semibold text-[#0a1628] shadow-lg shadow-teal-500/25">
                      <Sparkles className="h-3.5 w-3.5" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <p className="mb-1 text-sm font-medium text-teal-400">{plan.subtitle}</p>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">R$ {plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.highlighted
                            ? "bg-teal-500 text-[#0a1628] shadow-lg shadow-teal-500/30"
                            : "bg-teal-500/20 text-teal-400"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-[#0a1628] shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:opacity-90"
                      : "border border-slate-700 bg-transparent text-white hover:bg-white/5"
                  }`}
                  size="lg"
                >
                  Começar Agora
                </Button>

                {/* Decorative elements */}
                {plan.highlighted && (
                  <div className="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
