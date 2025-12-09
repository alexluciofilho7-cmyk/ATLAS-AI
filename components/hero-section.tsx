"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"

const HeroScene = dynamic(() => import("@/components/3d/hero-scene").then((mod) => ({ default: mod.HeroScene })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a1628]" />,
})

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
      <HeroScene />

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/50 z-[1]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        {/* Navigation */}
        <nav className="mb-16 flex items-center justify-between lg:mb-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-50 blur-sm" />
              <Image
                src="/images/whatsapp-20image-202025-12-01-20at-2015.jpeg"
                alt="Atlas AI Logo"
                width={48}
                height={48}
                className="relative rounded-xl"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Atlas <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-slate-300 hover:bg-white/5 hover:text-white">
              Entrar
            </Button>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-[#0a1628] hover:opacity-90 font-semibold shadow-lg shadow-teal-500/25">
              Começar Grátis
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl pt-8 lg:pt-16">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-300">Inteligência Artificial de Alta Performance</span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white lg:text-7xl">
              <span className="block">O Cérebro</span>
              <span className="block">Estratégico</span>
              <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(20,184,166,0.5)]">
                do Seu Corpo.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400 lg:text-xl">
              Pare de adivinhar. Tenha um plano de{" "}
              <span className="font-medium text-white">treino, dieta, sono e hormônios</span> ajustado diariamente por
              uma IA que entende sua biologia.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group relative h-14 overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 px-8 text-base font-semibold text-[#0a1628] transition-all hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center">
                  Começar Meu Projeto Agora
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 border-slate-700/50 bg-white/5 px-8 text-base text-slate-300 backdrop-blur-sm hover:bg-white/10 hover:text-white hover:border-slate-600"
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Como Funciona
              </Button>
            </div>

            {/* Trust text */}
            <p className="text-sm text-slate-500">Teste grátis por 7 dias. Sem cartão de crédito.</p>

            {/* Stats */}
            <div className="mt-12 flex items-center gap-8 border-t border-slate-800 pt-8">
              <div>
                <p className="text-3xl font-bold text-white">10k+</p>
                <p className="text-sm text-slate-500">Usuários ativos</p>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div>
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-sm text-slate-500">Avaliação média</p>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-sm text-slate-500">Satisfação</p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal-500/30 via-cyan-500/20 to-teal-500/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0d1f35]/90 p-2 shadow-2xl backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 px-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-xs text-slate-500">Atlas AI Dashboard</span>
                </div>
                <div className="overflow-hidden rounded-xl bg-[#0a1628]/80 p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {/* Stats Cards */}
                    <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-transparent p-4">
                      <p className="text-xs text-slate-500 mb-1">Taxa de Execução</p>
                      <p className="text-2xl font-bold text-teal-400">92%</p>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700">
                        <div className="h-1.5 w-[92%] rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-4">
                      <p className="text-xs text-slate-500 mb-1">Massa Magra</p>
                      <p className="text-2xl font-bold text-cyan-400">+4.2kg</p>
                      <p className="mt-2 text-xs text-green-400">+12% este mês</p>
                    </div>
                    <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-4">
                      <p className="text-xs text-slate-500 mb-1">Score de Prontidão</p>
                      <p className="text-2xl font-bold text-white">
                        85<span className="text-sm text-slate-500">/100</span>
                      </p>
                      <p className="mt-2 text-xs text-teal-400">Ótimo para treinar</p>
                    </div>
                  </div>
                  {/* AI Message */}
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-teal-500/20 bg-teal-500/5 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30">
                      <span className="text-xs font-bold text-[#0a1628]">AI</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-teal-400">Atlas:</span> Sua qualidade de sono melhorou 23%
                        esta semana. Aumentei o volume do treino de hoje.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent z-[1]" />
    </section>
  )
}
