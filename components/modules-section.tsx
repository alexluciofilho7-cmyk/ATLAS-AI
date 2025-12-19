"use client"
import {
  TrainingIcon,
  DietIcon,
  SleepIcon,
  TestosteroneIcon,
  PostureIcon,
  CompulsionIcon,
  VisionIcon,
} from "./module-icons"

const modules = [
  {
    icon: TrainingIcon,
    title: "Treino Inteligente",
    description:
      "Periodização que prioriza pontos fracos, evita overtraining e foca em proporção estética. Progressão de carga calculada pela IA.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
  {
    icon: DietIcon,
    title: "Dieta Para Estética",
    description:
      "Nutrição flexível que considera sua vida social. Trocas inteligentes, ciclo de carboidratos automático e recálculo após deslizes.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
  {
    icon: SleepIcon,
    title: "Sono e Recuperação",
    description:
      "Monitoramento da qualidade do sono, protocolos de higiene do sono e ajuste do treino baseado na sua prontidão diária.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
  {
    icon: TestosteroneIcon,
    title: "Testosterona Natural",
    description:
      "Estratégias baseadas em ciência para otimizar seus hormônios naturalmente. Micronutrientes, timing e hábitos que fazem diferença.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
  {
    icon: PostureIcon,
    title: "Postura, Dor & Fisioterapia",
    description:
      "Correção postural, mobilidade e prevenção de lesões. Protocolos de fisioterapia integrados ao seu treino principal.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
  {
    icon: CompulsionIcon,
    title: "Compulsão Alimentar",
    description:
      "Estratégias cognitivo-comportamentais para controlar a fome emocional. Recalibração do protocolo sem culpa após deslizes.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
  {
    icon: VisionIcon,
    title: "Visão 360°",
    description:
      "Dashboard completo com medidas, fotos de progresso, consistência e indicadores de saúde metabólica. Tudo em um lugar.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/50",
  },
]

export function ModulesSection() {
  return (
    <section id="modulos" className="relative bg-[#050a14] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">Módulos</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            7 Sistemas Integrados Para{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Resultados Completos
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Cada pilar da sua transformação coberto por um módulo especializado da Atlas IA.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 ${index === 6 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Furion-style gradient background with glass effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-blue-950/80 backdrop-blur-xl" />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-3xl border border-blue-400/20 group-hover:border-blue-400/40 transition-colors duration-300" />

              {/* Hover glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-400/0 via-blue-500/0 to-blue-600/0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

              {/* Soft inner glow at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent" />

              <div className="relative p-6">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} shadow-lg ${module.shadowColor}`}
                >
                  <module.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">{module.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
