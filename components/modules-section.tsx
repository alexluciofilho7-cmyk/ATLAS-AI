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
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: DietIcon,
    title: "Dieta Para Estética",
    description:
      "Nutrição flexível que considera sua vida social. Trocas inteligentes, ciclo de carboidratos automático e recálculo após deslizes.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: SleepIcon,
    title: "Sono e Recuperação",
    description:
      "Monitoramento da qualidade do sono, protocolos de higiene do sono e ajuste do treino baseado na sua prontidão diária.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: TestosteroneIcon,
    title: "Testosterona Natural",
    description:
      "Estratégias baseadas em ciência para otimizar seus hormônios naturalmente. Micronutrientes, timing e hábitos que fazem diferença.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: PostureIcon,
    title: "Postura, Dor & Fisioterapia",
    description:
      "Correção postural, mobilidade e prevenção de lesões. Protocolos de fisioterapia integrados ao seu treino principal.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: CompulsionIcon,
    title: "Compulsão Alimentar",
    description:
      "Estratégias cognitivo-comportamentais para controlar a fome emocional. Recalibração do protocolo sem culpa após deslizes.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: VisionIcon,
    title: "Visão 360°",
    description:
      "Dashboard completo com medidas, fotos de progresso, consistência e indicadores de saúde metabólica. Tudo em um lugar.",
    color: "from-blue-600 to-blue-500",
    shadowColor: "shadow-blue-500/20",
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
              className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/30 p-6 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:bg-slate-900/50 ${index === 6 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 blur transition-all duration-500 group-hover:opacity-20" />

              <div className="relative">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${module.color} shadow-lg ${module.shadowColor}`}
                >
                  <module.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">{module.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
