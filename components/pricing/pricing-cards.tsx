"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Crown } from "lucide-react"
import { useState } from "react"

interface Plan {
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

const plans: Plan[] = [
  {
    name: "Básico",
    monthlyPrice: 49.9,
    annualPrice: 497,
    description: "Para começar com o fundamento",
    features: [
      "Treino personalizado com IA",
      "Dieta básica ajustada às calorias e macros",
      "Acompanhamento da Taxa de Execução",
      "Acesso à Visão 360 simplificada",
    ],
  },
  {
    name: "Performance",
    monthlyPrice: 69.9,
    annualPrice: 697,
    description: "O mais escolhido. Ideal para transformação",
    features: [
      "Tudo do plano Básico",
      "Protocolos de sono e recuperação personalizados",
      "Ajustes de treino e dieta com base no progresso",
      "Relatórios mensais mais completos na Visão 360",
      "Suporte prioritário via IA (respostas mais detalhadas)",
    ],
    highlighted: true,
    badge: "Mais Escolhido",
  },
  {
    name: "Completo",
    monthlyPrice: 99.9,
    annualPrice: 997,
    description: "Para quem quer performance de atleta",
    features: [
      "Tudo do plano Performance",
      "Módulo de testosterona natural (dentro de limites saudáveis)",
      "Módulo de fisioterapia preventiva (postura, dor, mobilidade)",
      "Módulo de compulsão alimentar e comportamento",
      "Relatório avançado para quem quer performance de atleta",
    ],
  },
]

export function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <section className="relative overflow-hidden px-6 py-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Billing toggle */}
        <div className="mb-16 flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              billingCycle === "monthly"
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/50"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              billingCycle === "annual"
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/50"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Anual
            <span className="ml-2 text-xs text-cyan-400">Economize 16%</span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                plan.highlighted ? "lg:scale-105 lg:shadow-2xl" : "hover:scale-102"
              }`}
            >
              {/* Card background and border */}
              <div
                className={`absolute inset-0 rounded-2xl ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#0d2535]/90 via-[#0a1628]/90 to-[#0d1f35]/90 border border-teal-500/40"
                    : "bg-gradient-to-br from-[#0d2535]/60 via-[#0a1628]/60 to-[#0d1f35]/60 border border-slate-800/50"
                }`}
              />

              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-teal-500/20"
                    : "bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-teal-500/10"
                }`}
              />

              <div className="relative p-8 lg:p-10">
                {/* Badge */}
                {plan.badge && (
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1">
                    <Crown className="h-4 w-4 text-teal-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">{plan.badge}</span>
                  </div>
                )}

                {/* Plan name and description */}
                <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mb-8 text-sm text-slate-400">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      R$ {billingCycle === "monthly" ? plan.monthlyPrice.toFixed(2) : plan.annualPrice.toFixed(0)}
                    </span>
                    <span className="text-slate-400">{billingCycle === "monthly" ? "/mês" : "/ano"}</span>
                  </div>
                  {billingCycle === "annual" && (
                    <p className="mt-2 text-xs text-teal-400">
                      {Math.round((plan.annualPrice / 12 / plan.monthlyPrice - 1) * 100)}% de economia
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 h-12 font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-[#0a1628] shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30"
                      : "bg-slate-800/50 text-white border border-slate-700 hover:bg-slate-800/80 hover:border-teal-500/50"
                  }`}
                >
                  Começar neste plano
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Features list */}
                <div className="space-y-4 border-t border-slate-800/50 pt-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-teal-400" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
