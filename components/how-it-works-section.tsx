"use client"

import { ClipboardCheck, RefreshCw, ArrowRight } from "lucide-react"

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Left hemisphere */}
      <path d="M9.5 2C7 2 5 4 5 6.5c0 1 .3 1.9.8 2.7C4.7 9.8 4 10.9 4 12.2c0 1.5.8 2.8 2 3.5-.5.7-.8 1.5-.8 2.3 0 2.2 1.8 4 4 4h.5" />

      {/* Right hemisphere */}
      <path d="M14.5 2c2.5 0 4.5 2 4.5 4.5c0 1-.3 1.9-.8 2.7.9.6 1.6 1.7 1.6 3 0 1.5-.8 2.8-2 3.5.5.7.8 1.5.8 2.3 0 2.2-1.8 4-4 4H13.5" />

      {/* Center connection and neural pathways */}
      <path d="M9.5 22c.8-.5 1.5-1.3 1.5-2.5V8c0-1-.5-2-1.5-2.5" />
      <path d="M14.5 22c-.8-.5-1.5-1.3-1.5-2.5V8c0-1 .5-2 1.5-2.5" />

      {/* Neural circuit details - subtle tech touch */}
      <circle cx="8" cy="9" r="0.5" opacity="0.6" />
      <circle cx="16" cy="9" r="0.5" opacity="0.6" />
      <circle cx="8" cy="15" r="0.5" opacity="0.6" />
      <circle cx="16" cy="15" r="0.5" opacity="0.6" />
    </svg>
  )
}

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Diagnóstico Rápido",
    description:
      "Responda um questionário inteligente sobre seu corpo, rotina, objetivos e histórico. A IA analisa tudo em segundos para entender seu ponto de partida.",
    highlight: "5 minutos",
  },
  {
    number: "02",
    icon: BrainIcon, // Replaced Cpu icon with custom BrainIcon
    title: "Protocolo Inteligente",
    description:
      "A Atlas gera seu protocolo personalizado: treino, dieta, estratégias de sono e otimização hormonal natural. Tudo integrado e ajustado para você.",
    highlight: "100% personalizado",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Ajustes Contínuos",
    description:
      "A cada dia a IA analisa seu progresso, sinais de fadiga e resultados. Se algo não está funcionando, o protocolo é recalibrado automaticamente.",
    highlight: "Adaptação em tempo real",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">Como Funciona</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Do Caos ao Controle em{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">3 Passos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Simples de começar, poderoso de usar. A complexidade fica com a IA.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent lg:block" />

          <div className="grid gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col items-center gap-8 lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? "lg:text-right" : ""}`}>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 mb-4 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  >
                    <span className="text-xs font-bold text-blue-400">{step.highlight}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-md">{step.description}</p>
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full bg-blue-500/30 blur-2xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl shadow-blue-500/50">
                    {step.icon && <step.icon className="h-10 w-10 text-white" />}
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-blue-400 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/30">
                    {step.number}
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#planos"
            className="group inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
          >
            Começar meu diagnóstico agora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
