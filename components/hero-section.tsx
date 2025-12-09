"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { AtlasCoreVisual } from "@/components/atlas-core-visual"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030712]">
      <AtlasCoreVisual />

      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        {/* Navigation */}
        <nav className="mb-16 flex items-center justify-between lg:mb-24">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50 blur-sm" />
              <Image
                src="/images/whatsapp-20image-202025-12-01-20at-2015.jpeg"
                alt="Atlas AI Logo"
                width={44}
                height={44}
                className="relative rounded-xl"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Atlas <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">IA</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#modulos" className="text-sm text-slate-400 transition-colors hover:text-white">
              Módulos
            </a>
            <a href="#como-funciona" className="text-sm text-slate-400 transition-colors hover:text-white">
              Como Funciona
            </a>
            <a href="#planos" className="text-sm text-slate-400 transition-colors hover:text-white">
              Planos
            </a>
            <a href="#faq" className="text-sm text-slate-400 transition-colors hover:text-white">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden text-slate-300 hover:bg-white/5 hover:text-white sm:flex">
              Entrar
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-90 font-semibold shadow-lg shadow-blue-500/25">
              Começar Agora
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2.5 backdrop-blur-sm">
            <svg
              className="h-4 w-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 18H3L12 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10" />
            </svg>
            <span className="text-sm font-medium tracking-wide text-blue-300">ATLAS CORE • IA DE EVIDÊNCIA</span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Substitua o caos por uma{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              IA que governa
            </span>{" "}
            sua evolução física.
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 lg:text-xl">
            Treino, dieta, sono, testosterona natural e postura integrados em um só comando. A Atlas IA cruza seus
            dados, corrige rota diariamente e aplica protocolos inspirados pelas evidências mais sólidas da ciência
            (PubMed/Harvard) — como se você tivesse uma equipe de elite no bolso, sem achismo e sem enrolação.
          </p>

          {/* CTA Buttons */}
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group relative h-14 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 px-8 text-base font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center">
                Acessar Atlas Agora
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

          {/* Trust indicators */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="text-sm text-slate-400">Garantia de 7 dias</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <span className="text-sm text-slate-400">Configuração em menos de 60 segundos</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span className="text-sm text-slate-400">Baseado em evidências científicas</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 border-t border-slate-800 pt-8 lg:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-white lg:text-4xl">10.000+</p>
              <p className="text-sm text-slate-500">Usuários ativos</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-800 lg:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white lg:text-4xl">4.9/5</p>
              <p className="text-sm text-slate-500">Avaliação média</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-800 lg:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white lg:text-4xl">98%</p>
              <p className="text-sm text-slate-500">Taxa de satisfação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent z-[1]" />
    </section>
  )
}
