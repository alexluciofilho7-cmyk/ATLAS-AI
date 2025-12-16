"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { AtlasCoreVisual } from "@/components/atlas-core-visual"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030712]">
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
          <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group relative h-14 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 px-8 text-base font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center">
                Ativar Atlas 7D
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

          {/* Trust indicators - Atlas 7D Entry Point */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-sm text-slate-400">R$ 9,90 por 7 dias</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
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
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
              </svg>
              <span className="text-sm text-slate-400">IA baseada em evidências</span>
            </div>
          </div>

          <div className="relative w-full max-w-4xl mb-16">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[20%] w-[160%] h-[160%] pointer-events-none overflow-hidden">
              <AtlasCoreVisual />
            </div>

            {/* Video player container */}
            <div className="relative z-10 overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
              {/* 16:9 aspect ratio container */}
              <div className="relative aspect-video">
                {/* Video background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-blue-950/60" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    <Play className="relative h-8 w-8 fill-white text-white translate-x-0.5" />
                  </button>
                </div>

                {/* Video label */}
                <div className="absolute bottom-6 left-6">
                  <span className="inline-block rounded-lg bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm border border-slate-700/50">
                    Vídeo de Apresentação da Atlas IA
                  </span>
                </div>
              </div>
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
