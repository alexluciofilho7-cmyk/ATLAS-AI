"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function FinalCtaSection() {
  return (
    <section className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
          <Shield className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Garantia de 7 Dias</span>
        </div>

        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
          Você Pode Continuar Tentando{" "}
          <span className="bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent">Sozinho</span>
          <br />
          Ou Ter Uma{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            IA Trabalhando Por Você
          </span>
        </h2>

        <p className="mb-10 mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
          Cada dia que passa sem um protocolo inteligente é um dia de progresso perdido. Sua genética não está ficando
          melhor. Seu metabolismo não está acelerando. O momento de agir é agora.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="group relative h-14 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 px-10 text-base font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center">
              Começar Meu Projeto Agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>

        <p className="mt-6 text-sm text-slate-500">7 dias grátis. Sem cartão de crédito. Cancele quando quiser.</p>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-slate-800 pt-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>+10.000 usuários</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>98% de satisfação</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Garantia de reembolso</span>
          </div>
        </div>
      </div>
    </section>
  )
}
