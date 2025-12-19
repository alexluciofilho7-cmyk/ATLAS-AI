"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap } from "lucide-react"
import { useState } from "react"

interface PricingSectionProps {
  onOpenModal: () => void
}

const plans = [
  {
    name: "Básico",
    subtitle: "O Essencial",
    monthlyPrice: "59",
    monthlyCents: "90",
    annualPrice: "599",
    annualCents: "00",
    period: "/mês",
    description: "Para quem está começando sua jornada de transformação.",
    features: [
      "Módulo de Treino Inteligente (IA)",
      "Módulo de Nutrição & Macros",
      "Chat com a Atlas (básico)",
      "Base de conhecimento científica",
      "Suporte por email",
    ],
    highlighted: false,
  },
  {
    name: "Performance",
    subtitle: "O Mais Popular",
    monthlyPrice: "89",
    monthlyCents: "90",
    annualPrice: "899",
    annualCents: "00",
    period: "/mês",
    description: "Para praticantes sérios que buscam resultados acelerados.",
    features: [
      "Tudo do Plano Básico",
      "Módulo de Sono & Recuperação",
      "Análise de Prontidão Diária",
      "Módulo Testosterona Natural",
      "Monitoramento de overtraining",
      "Recálculo automático pós-deslize",
      "Suporte prioritário",
    ],
    highlighted: true,
    badge: "Mais Escolhido",
  },
  {
    name: "Elite",
    subtitle: "O Completo",
    monthlyPrice: "119",
    monthlyCents: "90",
    annualPrice: "1.199",
    annualCents: "00",
    period: "/mês",
    description: "Para quem quer domínio total sobre corpo e mente.",
    features: [
      "Tudo do Plano Performance",
      "Módulo Correção Postural & Fisio",
      "Módulo Gestão de Compulsão",
      "Dashboard Visão 360°",
      "Relatórios exportáveis de saúde e performance (PDF)",
      "Análise mensal avançada por IA",
      "Acesso antecipado a novos recursos",
    ],
    highlighted: false,
  },
]

export function PricingSection({ onOpenModal }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  return (
    <section id="planos" className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <p className="text-sm text-slate-500">O valor do Atlas 7D (R$ 9,90) vira crédito no seu primeiro mês.</p>
        </div>

        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Planos</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Escolha o Nível de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Transformação
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Todos os planos incluem o Atlas 7D. Ative em menos de 60 segundos.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-slate-900/50 p-1 backdrop-blur-sm">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  billingPeriod === "monthly" ? "text-white" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {billingPeriod === "monthly" && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25" />
                )}
                <span className="relative">Mensal</span>
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  billingPeriod === "annual" ? "text-white" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {billingPeriod === "annual" && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25" />
                )}
                <span className="relative">Anual</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl ${plan.highlighted ? "z-10 lg:scale-105" : ""}`}>
              {/* Glow effect for highlighted plan */}
              {plan.highlighted && (
                <>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-50 blur-lg" />
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-75" />
                </>
              )}

              <div
                className={`relative h-full rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-transparent bg-gradient-to-b from-slate-900 to-[#030712]"
                    : "border-slate-800/50 bg-slate-900/30 backdrop-blur-sm"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/25">
                      <Sparkles className="h-3.5 w-3.5" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <p className="mb-1 text-sm font-medium text-blue-400">{plan.subtitle}</p>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-sm text-slate-400">R$</span>
                    <span className="text-5xl font-bold text-white">
                      {billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-xl font-bold text-white">
                      ,{billingPeriod === "monthly" ? plan.monthlyCents : plan.annualCents}
                    </span>
                    <span className="ml-1 text-slate-400">{billingPeriod === "monthly" ? "/mês" : "/ano"}</span>
                  </div>
                  {billingPeriod === "annual" && (
                    <div className="mt-2">
                      <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                        2 meses grátis
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.highlighted
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-blue-500/20 text-blue-400"
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
                  onClick={onOpenModal}
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:opacity-90"
                      : "border border-slate-700 bg-transparent text-white hover:bg-white/5"
                  }`}
                  size="lg"
                >
                  Ativar Atlas 7D
                </Button>

                {/* Decorative line */}
                {plan.highlighted && (
                  <div className="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <p className="mt-12 text-center text-sm text-slate-500">
          Garantia de 7 dias. Se não gostar, devolvemos 100% do seu investimento. Sem perguntas.
        </p>
      </div>
    </section>
  )
}
