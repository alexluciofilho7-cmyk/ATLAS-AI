"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface FemaleTransformationSectionProps {
  onOpenModal: () => void
}

export function FemaleTransformationSection({ onOpenModal }: FemaleTransformationSectionProps) {
  return (
    <section className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-left lg:text-left">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Como uma mulher comum recuperou o controle do corpo com a Atlas IA.
          </h2>
          <p className="max-w-3xl text-lg text-slate-400">
            Sem dieta maluca, sem treinar todo dia. Com um sistema que governa treino, dieta, sono e hábitos por ela.
          </p>
        </div>

        {/* Two Cards - Furion Style Layout */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Left Card - Narrative Testimonial */}
          <div className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            {/* Furion-style gradient background with glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-blue-950/80 backdrop-blur-xl" />

            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl border border-blue-400/20 group-hover:border-blue-400/40 transition-colors duration-300" />

            {/* Hover glow effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-400/0 via-blue-500/0 to-blue-600/0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

            {/* Soft inner glow at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent" />

            <div className="relative p-8">
              {/* Profile section */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-0.5">
                  <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">M</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Marina</p>
                  <p className="text-sm text-slate-400">@exemplo_usuaria_atlas</p>
                </div>
              </div>

              {/* Testimonial text */}
              <p className="mb-6 text-slate-200 leading-relaxed text-base">
                "Eu vivia num ciclo de começar e parar. Dieta de segunda, jacada no fim de semana, culpa e recomeço
                infinito. Com a Atlas IA, meu corpo saiu do modo aleatório. A IA organizou treino, comida, sono e até os
                dias em que eu sabia que ia sair da rotina. Em algumas semanas minhas roupas começaram a folgar, minha
                barriga desinchou e, pela primeira vez, eu senti que não era mais refém da compulsão, mas dona do meu
                corpo."
              </p>

              {/* Disclaimer */}
              <p className="text-xs text-slate-400 italic border-t border-slate-700/50 pt-4">
                Exemplo de transformação guiada por protocolo inteligente. Resultados podem variar de pessoa para
                pessoa.
              </p>
            </div>
          </div>

          {/* Right Card - Female Transformation Image */}
          <div className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
            {/* Furion-style gradient background with glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-blue-950/80 backdrop-blur-xl" />

            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl border border-blue-400/20 group-hover:border-blue-400/40 transition-colors duration-300" />

            {/* Hover glow effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-400/0 via-blue-500/0 to-blue-600/0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

            <div className="relative p-4 lg:p-6 h-full flex flex-col">
              {/* Image container with blue glow */}
              <div className="relative flex-1 group/img">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-2xl opacity-75 group-hover/img:opacity-100 transition-opacity duration-500" />

                <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30">
                  <Image
                    src="/images/whatsapp-20image-202025-12-16-20at-2014.jpeg"
                    alt="Transformação corporal feminina guiada por IA - Antes, análise e depois"
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {/* Tech overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Caption */}
              <p className="mt-4 text-xs text-slate-400 italic text-center">
                Visual ilustrativo de como a Atlas IA mapeia o corpo para guiar treino, dieta, postura e composição
                física.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={onOpenModal}
            size="lg"
            className="group relative h-14 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 px-10 text-base font-semibold text-white transition-all hover:scale-[1.02] shadow-xl shadow-blue-500/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center">
              Ativar Atlas 7D
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          <p className="mt-4 text-sm text-slate-400">
            Teste por 7 dias como é ter um sistema governando seu corpo em vez de depender só de motivação.
          </p>
        </div>
      </div>
    </section>
  )
}
