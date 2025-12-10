"use client"

import { CheckCircle, BookOpen, Shield, FlaskConical } from "lucide-react"

const proofs = [
  {
    icon: BookOpen,
    title: "Baseado em 500+ Estudos Científicos",
    description:
      "Cada protocolo é fundamentado em pesquisas peer-reviewed de universidades como Harvard, Stanford e instituições de elite em fisiologia do exercício.",
  },
  {
    icon: FlaskConical,
    title: "Fisiologia, Não Achismo",
    description:
      "A Atlas não inventa. Ela aplica princípios de sobrecarga progressiva, periodização ondulada, cronobiologia e bioquímica hormonal comprovados.",
  },
  {
    icon: Shield,
    title: "Método Testado em Milhares",
    description:
      "Mais de 10.000 usuários já usaram a Atlas para transformar seus corpos. Taxa de sucesso de 94% em quem segue o protocolo por 90 dias.",
  },
]

const dataPoints = [
  { label: "Aumento médio de massa magra", value: "+4.2kg", period: "em 12 semanas" },
  { label: "Melhora na qualidade do sono", value: "+38%", period: "após 30 dias" },
  { label: "Redução de gordura corporal", value: "-6.8%", period: "em 90 dias" },
  { label: "Aumento de testosterona livre", value: "+22%", period: "naturalmente" },
]

export function ProofSection() {
  return (
    <section className="relative bg-[#050a14] py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">Prova Lógica</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Ciência Aplicada,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Resultados Reais
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Não prometemos milagres. Prometemos um sistema que funciona quando você segue.
          </p>
        </div>

        {/* Proof Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {proofs.map((proof) => (
            <div
              key={proof.title}
              className="group rounded-2xl border border-slate-800/50 bg-slate-900/30 p-8 transition-all duration-500 hover:border-blue-500/30 hover:bg-slate-900/50"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                <proof.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{proof.title}</h3>
              <p className="text-slate-400 leading-relaxed">{proof.description}</p>
            </div>
          ))}
        </div>

        {/* Data Points */}
        <div className="mt-20">
          <h3 className="mb-10 text-center text-2xl font-semibold text-white">Resultados Médios dos Usuários Atlas</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {dataPoints.map((point) => (
              <div
                key={point.label}
                className="group relative rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-blue-950/80 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative flex items-start gap-4">
                  {/* Check icon with enhanced styling */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/20 transition-all duration-300 group-hover:bg-green-500/20 group-hover:ring-green-500/40">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <div className="mb-3 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {point.value}
                    </div>
                    <p className="text-base font-medium text-white leading-snug mb-1">{point.label}</p>
                    <p className="text-sm text-blue-400/80 italic">{point.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
