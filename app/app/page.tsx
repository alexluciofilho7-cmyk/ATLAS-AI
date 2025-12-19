import {
  Brain,
  Dumbbell,
  Activity,
  Moon,
  Shield,
  Heart,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AtlasDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header fixo */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center glow-blue-sm">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Atlas <span className="text-blue-400">IA</span>
            </span>
          </Link>

          {/* Welcome text */}
          <p className="hidden md:block text-sm text-muted-foreground">
            Bem-vindo ao seu <span className="text-blue-300 font-medium">Painel Atlas IA</span> - o cérebro que governa
            seu corpo.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 md:px-8 py-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Coluna Esquerda - Visão 360 do Corpo */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Visão 360 do Corpo</h2>
            </div>

            {/* Dashboard Atlas Core Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-foreground">Dashboard Atlas Core</h3>
              </div>

              {/* Indicadores */}
              <div className="space-y-6">
                {/* Execução */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-muted-foreground">Execução</span>
                    </div>
                    <span className="text-lg font-bold text-blue-300">82%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: "82%" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Treinos concluídos esta semana</p>
                </div>

                {/* Consistência */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-muted-foreground">Consistência</span>
                    </div>
                    <span className="text-lg font-bold text-cyan-300">19 dias</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                      style={{ width: "63%" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Sequência atual de dias seguidos</p>
                </div>

                {/* Estética */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm text-muted-foreground">Estética</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-300">67%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Progresso do shape ideal</p>
                </div>

                {/* Metabolismo */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-muted-foreground">Metabolismo</span>
                    </div>
                    <span className="text-lg font-bold text-green-300">Otimizado</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="bg-secondary/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Energia</p>
                      <p className="text-sm font-semibold text-foreground">Alta</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Sono</p>
                      <p className="text-sm font-semibold text-foreground">7.5h</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Peso</p>
                      <p className="text-sm font-semibold text-foreground">-2.1kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coluna Direita - Atlas IA Assistente */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center glow-blue-sm">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Atlas IA - Assistente Inteligente</h2>
            </div>

            {/* IA Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-[calc(100%-60px)]">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-foreground">Sistema de Governança Corporal</h3>
              </div>

              {/* Especialidades */}
              <p className="text-sm text-muted-foreground mb-4">
                IA especializada e treinada em evidências científicas (Harvard / PubMed) para:
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Treino", "Dieta", "Sono", "Testosterona", "Fisioterapia", "Compulsão"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Chat Area */}
              <div className="bg-secondary/30 rounded-xl p-4 mb-4 min-h-[200px] flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Pergunte qualquer coisa sobre seu corpo, treino, dieta, sono ou hormônios. A Atlas IA responde com
                      base em evidências científicas (Harvard / PubMed).
                    </p>
                  </div>
                </div>
              </div>

              {/* Input desativado */}
              <div className="relative">
                <input
                  type="text"
                  disabled
                  placeholder="Em breve você poderá conversar com a Atlas IA aqui."
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 pr-12 text-sm text-muted-foreground placeholder:text-muted-foreground/50 cursor-not-allowed"
                />
                <Button
                  size="icon"
                  disabled
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500/50 hover:bg-blue-500/50 cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Grade de Atalhos */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Módulos de Governança</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Dumbbell,
                label: "Treino",
                description: "Periodização inteligente que prioriza pontos fracos e evita overtraining.",
                color: "text-blue-400",
                bgColor: "bg-blue-500/20",
              },
              {
                icon: Activity,
                label: "Dieta",
                description: "Nutrição flexível com trocas inteligentes e recálculo após deslizes.",
                color: "text-cyan-400",
                bgColor: "bg-cyan-500/20",
              },
              {
                icon: Moon,
                label: "Sono",
                description: "Protocolos de higiene do sono e ajuste do treino baseado na prontidão.",
                color: "text-indigo-400",
                bgColor: "bg-indigo-500/20",
              },
              {
                icon: TrendingUp,
                label: "Testosterona Natural",
                description: "Micronutrientes, timing e hábitos para otimizar hormônios naturalmente.",
                color: "text-green-400",
                bgColor: "bg-green-500/20",
              },
              {
                icon: Shield,
                label: "Fisioterapia",
                description: "Correção postural, mobilidade e protocolos integrados ao treino principal.",
                color: "text-purple-400",
                bgColor: "bg-purple-500/20",
              },
              {
                icon: Heart,
                label: "Compulsão Alimentar",
                description: "Estratégias cognitivo-comportamentais para controlar a fome emocional.",
                color: "text-pink-400",
                bgColor: "bg-pink-500/20",
              },
            ].map((module, index) => (
              <div
                key={index}
                className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] focus-visible:-translate-y-0.5 focus-visible:scale-[1.03] focus-visible:shadow-[0_0_25px_rgba(59,130,246,0.3)] focus-visible:outline-none"
                tabIndex={0}
              >
                <div className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center mb-4`}>
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{module.label}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border mt-12">
        <div className="container">
          <p className="text-center text-muted-foreground text-sm">Atlas IA - O Cérebro Estratégico do Seu Corpo</p>
        </div>
      </footer>
    </main>
  )
}
