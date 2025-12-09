"use client"

import { TrendingUp, Clock, Target } from "lucide-react"

export function AnnualBenefits() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute right-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30">
              <TrendingUp className="h-7 w-7 text-teal-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Transformação Real</h3>
            <p className="text-slate-400">
              Seu corpo muda de verdade apenas após 12 semanas. O plano anual é para quem quer virar atleta da própria
              vida.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30">
              <Clock className="h-7 w-7 text-teal-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Horizonte Mínimo</h3>
            <p className="text-slate-400">
              12 meses é o tempo mínimo para que a inteligência aprenha seus padrões e otimize seus resultados.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30">
              <Target className="h-7 w-7 text-teal-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Economia Inteligente</h3>
            <p className="text-slate-400">
              Economize 16% no plano anual. Quanto mais comprometido, melhores os resultados e a economia.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-teal-500/10 p-8 text-center backdrop-blur-sm">
          <p className="text-lg text-slate-300">
            <span className="font-bold text-teal-400">Fato científico:</span> Estudos demonstram que o compromisso com
            programas de transformação corporal tem maior sucesso quando há continuidade de pelo menos 12 meses.
          </p>
        </div>
      </div>
    </section>
  )
}
