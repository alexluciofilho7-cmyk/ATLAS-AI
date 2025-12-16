"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function TransformationProofSection() {
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
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Transformações que parecem ficção científica,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              mas são governadas por IA.
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            A Atlas IA assume o controle do protocolo diário e leva seu corpo do "modo aleatório" ao "modo Atlas" em
            poucas semanas.
          </p>
        </div>

        {/* Main Transformation Image */}
        <div className="mb-12 relative group">
          {/* Blue glow effect around image */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 shadow-2xl shadow-blue-500/20">
            <Image
              src="/images/whatsapp-20image-202025-12-16-20at-2013.jpeg"
              alt="Transformação corporal guiada por IA - Antes, análise e depois"
              width={1600}
              height={600}
              className="w-full h-auto"
              priority
            />
            {/* Tech overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Two Cards Below - Furion Style */}
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
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
                História real de um corpo em modo Atlas
              </p>

              <p className="mb-6 text-slate-200 leading-relaxed text-lg">
                "Antes da Atlas, ele treinava e comia 'mais ou menos', sem saber se estava realmente evoluindo. Com a IA
                governando treino, dieta, sono e hábitos, o corpo deixou de ser um projeto solto e virou um sistema. Em
                poucas semanas, o espelho começou a responder ao protocolo, não ao acaso."
              </p>

              <p className="text-sm text-slate-400 italic">
                Exemplo de transformação guiada por protocolo inteligente (não é promessa individual de resultado).
              </p>
            </div>
          </div>

          {/* Right Card - Metrics Dashboard */}
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
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-blue-400">
                Métricas típicas observadas com o Protocolo Atlas
              </p>

              {/* Metrics Grid */}
              <div className="space-y-5 mb-6">
                {[
                  {
                    value: "+4,2kg",
                    label: "de massa magra",
                    period: "em 12 semanas",
                    color: "from-green-400 to-emerald-400",
                  },
                  {
                    value: "-6,8%",
                    label: "de gordura corporal",
                    period: "em 90 dias",
                    color: "from-cyan-400 to-blue-400",
                  },
                  {
                    value: "+38%",
                    label: "de melhora na qualidade do sono",
                    period: "em 30 dias",
                    color: "from-blue-400 to-indigo-400",
                  },
                  {
                    value: "+22%",
                    label: "de aumento de testosterona livre",
                    period: "naturalmente",
                    color: "from-orange-400 to-amber-400",
                  },
                ].map((metric, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                        >
                          {metric.value}
                        </span>
                        <span className="text-sm text-slate-300">{metric.label}</span>
                      </div>
                      <p className="text-xs text-slate-500">{metric.period}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 italic">
                Dados médios de usuários Atlas em acompanhamento contínuo. Resultados variam de acordo com cada pessoa.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
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
            Teste a governança do seu corpo por 7 dias e veja seus próprios números começarem a mudar.
          </p>
        </div>
      </div>
    </section>
  )
}
