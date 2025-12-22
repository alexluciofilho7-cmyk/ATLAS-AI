"use client"

import { useState } from "react"
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
  MessageSquare,
  Send,
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Flame,
  Apple,
  BedDouble,
  Sparkles,
  Leaf,
  ChevronLeft,
  BarChart3,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type EnergyLevel = "Baixa" | "Média" | "Alta"

type AtlasWeekMetrics = {
  weekLabel: string
  atlasScore: number
  executionRate: number
  aestheticProgress: number
  metabolicHealth: number
  generalConsistency: number
  avgSleepHours: number
  weightDeltaKg: number
  energyLevel: EnergyLevel
  trainingsDone: number
  trainingsPlanned: number
  dietAdherence: number
}

const mockWeeks: AtlasWeekMetrics[] = [
  {
    weekLabel: "Semana 1",
    atlasScore: 58,
    executionRate: 60,
    aestheticProgress: 45,
    metabolicHealth: 62,
    generalConsistency: 55,
    avgSleepHours: 6.2,
    weightDeltaKg: 0.5,
    energyLevel: "Baixa",
    trainingsDone: 3,
    trainingsPlanned: 5,
    dietAdherence: 52,
  },
  {
    weekLabel: "Semana 2",
    atlasScore: 65,
    executionRate: 70,
    aestheticProgress: 50,
    metabolicHealth: 68,
    generalConsistency: 62,
    avgSleepHours: 6.8,
    weightDeltaKg: -0.3,
    energyLevel: "Média",
    trainingsDone: 4,
    trainingsPlanned: 5,
    dietAdherence: 65,
  },
  {
    weekLabel: "Semana 3",
    atlasScore: 72,
    executionRate: 80,
    aestheticProgress: 58,
    metabolicHealth: 75,
    generalConsistency: 70,
    avgSleepHours: 7.2,
    weightDeltaKg: -0.4,
    energyLevel: "Média",
    trainingsDone: 4,
    trainingsPlanned: 5,
    dietAdherence: 78,
  },
  {
    weekLabel: "Semana 4",
    atlasScore: 78,
    executionRate: 85,
    aestheticProgress: 65,
    metabolicHealth: 80,
    generalConsistency: 76,
    avgSleepHours: 7.5,
    weightDeltaKg: -0.6,
    energyLevel: "Alta",
    trainingsDone: 5,
    trainingsPlanned: 5,
    dietAdherence: 82,
  },
  {
    weekLabel: "Semana 5",
    atlasScore: 82,
    executionRate: 90,
    aestheticProgress: 70,
    metabolicHealth: 84,
    generalConsistency: 80,
    avgSleepHours: 7.8,
    weightDeltaKg: -0.5,
    energyLevel: "Alta",
    trainingsDone: 5,
    trainingsPlanned: 5,
    dietAdherence: 88,
  },
  {
    weekLabel: "Semana 6",
    atlasScore: 88,
    executionRate: 95,
    aestheticProgress: 75,
    metabolicHealth: 88,
    generalConsistency: 85,
    avgSleepHours: 8.0,
    weightDeltaKg: -0.3,
    energyLevel: "Alta",
    trainingsDone: 5,
    trainingsPlanned: 5,
    dietAdherence: 92,
  },
]

function getAtlasScoreMessage(score: number): string {
  if (score >= 85) return "Nível atleta. Seu corpo está sob comando – mantenha o ritmo."
  if (score >= 60) return "Meio atleta, meio amador. Você está indo bem, mas ainda deixa resultados na mesa."
  return "Você treina, mas ainda vive como amador. Ou muda o jogo, ou vai continuar estagnado."
}

function getDailyBriefing(week: AtlasWeekMetrics): string {
  const messages: string[] = []

  if (week.executionRate < 60) {
    messages.push(
      "Sua execução de treino está abaixo do mínimo. Se continuar assim, você só vai manter o corpo, não evoluir.",
    )
  } else if (week.executionRate < 85) {
    messages.push("Sua execução de treino é boa, mas ainda tem espaço para subir um nível e buscar padrão de atleta.")
  } else {
    messages.push("Execução de treino em padrão de atleta. Mantenha o foco e proteja esse hábito.")
  }

  if (week.dietAdherence < 70) {
    messages.push("Sua dieta está frouxa. Não adianta treinar como atleta e comer como amador.")
  } else {
    messages.push("Sua aderência à dieta está consistente. Pequenos ajustes vão refinar ainda mais seu físico.")
  }

  if (week.avgSleepHours < 7) {
    messages.push("Seu sono está curto. Isso está travando sua recuperação, testosterona e estética.")
  } else {
    messages.push("Seu sono está em uma boa faixa. Continue blindando esse horário.")
  }

  if (week.weightDeltaKg < 0) {
    messages.push(
      `Você perdeu ${Math.abs(week.weightDeltaKg).toFixed(1)}kg essa semana. Cuidado para não sacrificar massa magra.`,
    )
  } else if (week.weightDeltaKg > 0.3) {
    messages.push(`Você ganhou ${week.weightDeltaKg.toFixed(1)}kg essa semana. Monitore se isso é músculo ou gordura.`)
  }

  return messages.join(" ")
}

function getWeeklySummary(week: AtlasWeekMetrics): string {
  return `Nesta semana (${week.weekLabel}), seu Atlas Score foi de ${week.atlasScore}/100. Você executou ${week.executionRate}% dos treinos planejados (${week.trainingsDone} de ${week.trainingsPlanned}), manteve ${week.dietAdherence}% de aderência à dieta e dormiu em média ${week.avgSleepHours.toFixed(1)}h por noite. Sua consistência geral ficou em ${week.generalConsistency}% e o score de saúde metabólica em ${week.metabolicHealth}%.`
}

function getScoreColor(score: number): string {
  if (score >= 85) return "text-green-400"
  if (score >= 60) return "text-yellow-400"
  return "text-red-400"
}

function getScoreGradient(score: number): string {
  if (score >= 85) return "from-green-500 to-cyan-400"
  if (score >= 60) return "from-yellow-500 to-orange-400"
  return "from-red-500 to-orange-400"
}

type SectionType =
  | "dashboard"
  | "visao360"
  | "atlasia"
  | "treinoDieta"
  | "compulsao"
  | "sono"
  | "fisioterapia"
  | "testosterona"

const menuItems: { id: SectionType; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "visao360", label: "Visão 360 do Corpo", icon: Target },
  { id: "atlasia", label: "Atlas IA", icon: Brain },
  { id: "treinoDieta", label: "Treino & Dieta", icon: Dumbbell },
  { id: "compulsao", label: "Compulsão & Fome", icon: Heart },
  { id: "sono", label: "Sono & Recuperação", icon: Moon },
  { id: "fisioterapia", label: "Fisioterapia & Dores", icon: Shield },
  { id: "testosterona", label: "Testosterona Natural", icon: TrendingUp },
]

const specialtyChips = [
  { label: "Treino", color: "from-blue-500 to-blue-600" },
  { label: "Dieta", color: "from-cyan-500 to-cyan-600" },
  { label: "Sono", color: "from-indigo-500 to-indigo-600" },
  { label: "Testosterona", color: "from-green-500 to-green-600" },
  { label: "Fisioterapia", color: "from-purple-500 to-purple-600" },
  { label: "Compulsão", color: "from-pink-500 to-pink-600" },
]

const metricsData = {
  execucao: { value: 82, unit: "%", label: "Treinos concluídos esta semana" },
  consistencia: { value: 19, unit: " dias", label: "Sequência atual de dias seguidos" },
  estetica: { value: 67, unit: "%", label: "Progresso do shape ideal" },
  metabolismo: {
    status: "Otimizado",
    indicators: { energia: "Alta", sono: "7.5h", peso: "-2.1kg" },
  },
}

function DashboardView() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(mockWeeks.length - 1)
  const [weeklySummary, setWeeklySummary] = useState<string | null>(null)

  const currentWeek = mockWeeks[currentWeekIndex]
  const scoreMessage = getAtlasScoreMessage(currentWeek.atlasScore)
  const dailyBriefing = getDailyBriefing(currentWeek)

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
      setWeeklySummary(null)
    }
  }

  const handleNextWeek = () => {
    if (currentWeekIndex < mockWeeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
      setWeeklySummary(null)
    }
  }

  const handleGenerateSummary = () => {
    setWeeklySummary(getWeeklySummary(currentWeek))
  }

  return (
    <div className="space-y-8">
      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
        <button
          onClick={handlePreviousWeek}
          disabled={currentWeekIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Anterior</span>
        </button>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{currentWeek.weekLabel}</p>
          <p className="text-sm text-muted-foreground">
            Semana {currentWeekIndex + 1} de {mockWeeks.length}
          </p>
        </div>
        <button
          onClick={handleNextWeek}
          disabled={currentWeekIndex === mockWeeks.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Atlas Score Card - Main */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-blue-950/60 border border-blue-500/30 rounded-3xl p-6 md:p-8 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-secondary/50"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${currentWeek.atlasScore * 2.64} 264`}
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    stopColor={
                      currentWeek.atlasScore >= 85 ? "#22c55e" : currentWeek.atlasScore >= 60 ? "#eab308" : "#ef4444"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      currentWeek.atlasScore >= 85 ? "#06b6d4" : currentWeek.atlasScore >= 60 ? "#f97316" : "#f97316"
                    }
                  />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(currentWeek.atlasScore)}`}>
                {currentWeek.atlasScore}
              </span>
              <span className="text-muted-foreground text-sm">/100</span>
            </div>
          </div>

          {/* Score Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Atlas Score desta semana</h2>
            <p className="text-lg text-blue-300 font-medium mb-4">Você é Atleta ou Está se Enganando?</p>
            <div
              className={`p-4 rounded-xl border ${currentWeek.atlasScore >= 85 ? "bg-green-500/10 border-green-500/30" : currentWeek.atlasScore >= 60 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-red-500/10 border-red-500/30"}`}
            >
              <p className={`text-lg font-medium ${getScoreColor(currentWeek.atlasScore)}`}>{scoreMessage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Taxa de Execução */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-sm text-muted-foreground">Taxa de Execução</p>
          </div>
          <p className="text-3xl font-bold text-blue-300 mb-2">{currentWeek.executionRate}%</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${currentWeek.executionRate}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Treinos: {currentWeek.trainingsDone}/{currentWeek.trainingsPlanned}
          </p>
        </div>

        {/* Evolução Estética */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm text-muted-foreground">Evolução Estética</p>
          </div>
          <p className="text-3xl font-bold text-indigo-300 mb-2">{currentWeek.aestheticProgress}%</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${currentWeek.aestheticProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Progresso do shape ideal</p>
        </div>

        {/* Saúde Metabólica */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-muted-foreground">Saúde Metabólica</p>
          </div>
          <p className="text-3xl font-bold text-green-300 mb-2">{currentWeek.metabolicHealth}%</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${currentWeek.metabolicHealth}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Sono: {currentWeek.avgSleepHours.toFixed(1)}h | Δ {currentWeek.weightDeltaKg > 0 ? "+" : ""}
            {currentWeek.weightDeltaKg.toFixed(1)}kg
          </p>
        </div>

        {/* Consistência Geral */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-sm text-muted-foreground">Consistência Geral</p>
          </div>
          <p className="text-3xl font-bold text-cyan-300 mb-2">{currentWeek.generalConsistency}%</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${currentWeek.generalConsistency}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Aderência dieta: {currentWeek.dietAdherence}%</p>
        </div>

        {/* Energia & Sono */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-yellow-500/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">Energia & Sono</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Zap
              className={`w-5 h-5 ${currentWeek.energyLevel === "Alta" ? "text-green-400" : currentWeek.energyLevel === "Média" ? "text-yellow-400" : "text-red-400"}`}
            />
            <p
              className={`text-2xl font-bold ${currentWeek.energyLevel === "Alta" ? "text-green-300" : currentWeek.energyLevel === "Média" ? "text-yellow-300" : "text-red-300"}`}
            >
              {currentWeek.energyLevel}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-400" />
            <p className="text-sm text-muted-foreground">{currentWeek.avgSleepHours.toFixed(1)}h / noite</p>
          </div>
        </div>
      </div>

      {/* Daily Briefing Card */}
      <div className="bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-blue-950/40 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Briefing do Dia – Atlas IA</h3>
            <p className="text-sm text-muted-foreground">Hoje a verdade nua e crua sobre sua semana é:</p>
          </div>
        </div>
        <div className="bg-secondary/20 rounded-xl p-5 border border-border/50">
          <p className="text-muted-foreground leading-relaxed">{dailyBriefing}</p>
        </div>
      </div>

      {/* Weekly Summary Button and Result */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Resumo da Semana</h3>
          </div>
          <Button
            onClick={handleGenerateSummary}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 rounded-xl shadow-lg shadow-cyan-500/25"
          >
            Gerar Resumo
          </Button>
        </div>
        {weeklySummary && (
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-5 mt-4">
            <p className="text-foreground leading-relaxed">{weeklySummary}</p>
          </div>
        )}
      </div>

      {/* Evolution Chart */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Evolução do Atlas Score</h3>
            <p className="text-sm text-muted-foreground">Acompanhe sua progressão semana a semana</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-48 px-4">
          {mockWeeks.map((week, index) => (
            <button
              key={week.weekLabel}
              onClick={() => {
                setCurrentWeekIndex(index)
                setWeeklySummary(null)
              }}
              className={`flex flex-col items-center flex-1 group cursor-pointer transition-all duration-200 ${index === currentWeekIndex ? "scale-105" : "hover:scale-102"}`}
            >
              <div
                className={`w-full max-w-12 rounded-t-lg transition-all duration-500 ${
                  index === currentWeekIndex
                    ? `bg-gradient-to-t ${getScoreGradient(week.atlasScore)} shadow-lg shadow-blue-500/30`
                    : "bg-gradient-to-t from-slate-600 to-slate-500 group-hover:from-blue-600 group-hover:to-cyan-500"
                }`}
                style={{ height: `${week.atlasScore * 1.6}px` }}
              />
              <span
                className={`mt-2 text-xs ${index === currentWeekIndex ? "text-blue-300 font-semibold" : "text-muted-foreground"}`}
              >
                S{index + 1}
              </span>
              <span
                className={`text-xs ${index === currentWeekIndex ? "text-foreground font-bold" : "text-muted-foreground"}`}
              >
                {week.atlasScore}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Visao360View() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Target className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Visão 360 do Corpo</h2>
          <p className="text-muted-foreground">Acompanhe todas as métricas da sua governança corporal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Execução Detalhada */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Execução Semanal</p>
              <p className="text-3xl font-bold text-blue-300">{metricsData.execucao.value}%</p>
            </div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${metricsData.execucao.value}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{metricsData.execucao.label}</p>
          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meta semanal</span>
              <span className="text-foreground">5 treinos</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Concluídos</span>
              <span className="text-blue-300">4 treinos</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Próximo treino</span>
              <span className="text-foreground">Hoje, 18h</span>
            </div>
          </div>
        </div>

        {/* Consistência Detalhada */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Consistência</p>
              <p className="text-3xl font-bold text-cyan-300">{metricsData.consistencia.value} dias</p>
            </div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" style={{ width: "63%" }} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{metricsData.consistencia.label}</p>
          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recorde pessoal</span>
              <span className="text-foreground">30 dias</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Média mensal</span>
              <span className="text-cyan-300">85%</span>
            </div>
          </div>
        </div>

        {/* Estética Detalhada */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progresso Estético</p>
              <p className="text-3xl font-bold text-indigo-300">{metricsData.estetica.value}%</p>
            </div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
              style={{ width: `${metricsData.estetica.value}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{metricsData.estetica.label}</p>
          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Peso atual</span>
              <span className="text-foreground">78.5 kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meta</span>
              <span className="text-indigo-300">75 kg / 12% BF</span>
            </div>
          </div>
        </div>

        {/* Metabolismo Detalhado */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Metabolismo</p>
              <p className="text-3xl font-bold text-green-300">{metricsData.metabolismo.status}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Energia</p>
              <p className="text-sm font-semibold text-foreground">{metricsData.metabolismo.indicators.energia}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Sono</p>
              <p className="text-sm font-semibold text-foreground">{metricsData.metabolismo.indicators.sono}</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Peso</p>
              <p className="text-sm font-semibold text-green-300">{metricsData.metabolismo.indicators.peso}</p>
            </div>
          </div>
          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">TMB estimada</span>
              <span className="text-foreground">1,850 kcal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GET estimado</span>
              <span className="text-green-300">2,590 kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AtlasIAView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Atlas IA - Assistente Inteligente</h2>
          <p className="text-muted-foreground">Seu cérebro estratégico baseado em evidências científicas</p>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">Sistema de Governança Corporal</h3>
            <p className="text-muted-foreground">
              IA especializada em evidências científicas de Harvard e PubMed para otimizar seu treino, dieta, sono,
              testosterona natural, fisioterapia e controle de compulsão alimentar.
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Especialidades da Atlas IA:</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {specialtyChips.map((chip) => (
            <button
              key={chip.label}
              className={`
                px-4 py-2 text-sm font-medium rounded-full
                bg-gradient-to-r ${chip.color} text-white
                transition-all duration-200 ease-out
                hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
                focus:outline-none focus:ring-2 focus:ring-blue-400/50
              `}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="bg-secondary/20 rounded-xl p-6 mb-4 min-h-[250px] flex flex-col border border-border/50">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <MessageSquare className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Chat com a Atlas IA</h3>
              <p className="text-muted-foreground text-sm">
                Em breve você poderá perguntar qualquer coisa sobre seu corpo, treino, dieta, sono, hormônios ou
                compulsão alimentar. A Atlas IA responderá com base em evidências científicas de Harvard e PubMed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Digite sua pergunta para a Atlas IA..."
            className="flex-1 bg-secondary/30 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            disabled
          />
          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 rounded-xl shadow-lg shadow-blue-500/25"
            disabled
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Em breve disponível</p>
      </div>
    </div>
  )
}

function TreinoDietaView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Dumbbell className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Treino & Dieta</h2>
          <p className="text-muted-foreground">Governança do seu estímulo e combustível</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treino Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Treino Inteligente</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            A Atlas IA cuida da periodização, evita overtraining e prioriza pontos fracos para maximizar seus
            resultados.
          </p>
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Treinos esta semana</p>
                <p className="text-xs text-muted-foreground">4 de 5 concluídos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Target className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Foco da fase</p>
                <p className="text-xs text-muted-foreground">Hipertrofia - Semana 3/8</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Flame className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Prioridade de músculos</p>
                <p className="text-xs text-muted-foreground">Costas, Posteriores de coxa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dieta Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Apple className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Dieta Flexível</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Nutrição flexível com trocas inteligentes, ajustes pós-deslize e foco em performance + estética.
          </p>
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Activity className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Macros diários</p>
                <p className="text-xs text-muted-foreground">2,400 kcal | 180P | 280C | 70G</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Clock className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Refeições planejadas</p>
                <p className="text-xs text-muted-foreground">5 refeições / dia</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Ajustes automáticos</p>
                <p className="text-xs text-muted-foreground">Recálculo pós-deslize ativado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompulsaoView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Compulsão & Fome Emocional</h2>
          <p className="text-muted-foreground">Controlando gatilhos e recalibrando sem culpa</p>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all duration-300">
        <p className="text-muted-foreground mb-6">
          A Atlas IA atua com estratégias cognitivo-comportamentais para identificar gatilhos emocionais, criar planos
          de emergência pós-binge e recalibrar o protocolo sem culpa após deslizes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plano de Crise */}
          <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-pink-400" />
              <h3 className="text-lg font-semibold text-foreground">Plano de Crise</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-pink-400">1</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Identificar o gatilho emocional (estresse, ansiedade, tédio)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-pink-400">2</span>
                </div>
                <p className="text-sm text-muted-foreground">Técnica de respiração 4-7-8 por 2 minutos</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-pink-400">3</span>
                </div>
                <p className="text-sm text-muted-foreground">Substituição inteligente com alimento de baixo impacto</p>
              </div>
            </div>
          </div>

          {/* Recalibração */}
          <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-foreground">Pós-Deslize</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground">Sem culpa: deslizes fazem parte do processo</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground">Recálculo automático dos macros da semana</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground">Retorno imediato ao protocolo no dia seguinte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SonoView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Moon className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sono & Recuperação</h2>
          <p className="text-muted-foreground">Carregando a bateria do corpo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métricas de Sono */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <h3 className="text-lg font-semibold text-foreground mb-4">Suas Métricas de Sono</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/30 rounded-xl p-4 text-center">
              <BedDouble className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-indigo-300">7.5h</p>
              <p className="text-xs text-muted-foreground">Média semanal</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4 text-center">
              <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-cyan-300">82%</p>
              <p className="text-xs text-muted-foreground">Qualidade</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-300">23:00</p>
              <p className="text-xs text-muted-foreground">Horário alvo</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            O sono impacta diretamente sua testosterona, recuperação muscular e performance cognitiva. Dormir menos de
            6h pode reduzir testosterona em até 15%.
          </p>
        </div>

        {/* Recomendações */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <h3 className="text-lg font-semibold text-foreground mb-4">Higiene do Sono</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-foreground">Evitar telas 1h antes de dormir</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-foreground">Manter quarto entre 18-20°C</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-foreground">Última refeição 2-3h antes de deitar</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-foreground">Magnésio e ZMA antes de dormir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FisioterapiaView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Shield className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Fisioterapia & Dores</h2>
          <p className="text-muted-foreground">Correção postural e prevenção de lesões</p>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-300">
        <p className="text-muted-foreground mb-6">
          A Atlas IA integra protocolos de fisioterapia ao seu treino principal, focando em correção de ombros, coluna e
          quadril, além de mobilidade e prevenção de lesões.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">Ombros</h4>
            <p className="text-sm text-muted-foreground">Correção de protração e fortalecimento de manguito rotador</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">Coluna</h4>
            <p className="text-sm text-muted-foreground">Mobilidade torácica e estabilização lombar</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">Quadril</h4>
            <p className="text-sm text-muted-foreground">Alongamento de flexores e ativação de glúteos</p>
          </div>
        </div>

        <div className="bg-secondary/20 rounded-xl p-5 border border-border/50">
          <h4 className="font-semibold text-foreground mb-3">Protocolos Personalizados</h4>
          <p className="text-sm text-muted-foreground">
            Em breve a Atlas IA irá gerar protocolos de mobilidade e correção postural personalizados baseados nas suas
            avaliações e histórico de dores.
          </p>
        </div>
      </div>
    </div>
  )
}

function TestosteronaView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Testosterona Natural</h2>
          <p className="text-muted-foreground">Otimizando hormônios de forma natural</p>
        </div>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300">
        <p className="text-muted-foreground mb-6">
          A Atlas IA otimiza sua testosterona natural através de hábitos, rotina, treino, sono, alimentação e
          micronutrientes estratégicos que favorecem a produção hormonal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Fatores */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground mb-3">Fatores Otimizados</h4>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Leaf className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Micronutrientes</p>
                <p className="text-xs text-muted-foreground">Zinco, Magnésio, Vitamina D3, Boro</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Moon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Sono de qualidade</p>
                <p className="text-xs text-muted-foreground">7-9h por noite, ritmo circadiano</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Dumbbell className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Treino de força</p>
                <p className="text-xs text-muted-foreground">Compostos, alta intensidade</p>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground mb-3">Métricas Futuras</h4>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Activity className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Consistência de sono</p>
                <p className="text-xs text-muted-foreground">85% nos últimos 30 dias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Dumbbell className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Treinos de força</p>
                <p className="text-xs text-muted-foreground">4x por semana</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Gordura corporal</p>
                <p className="text-xs text-muted-foreground">Mantendo entre 12-18%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color,
  progress,
}: {
  icon: typeof Dumbbell
  label: string
  value: string
  sublabel: string
  color: "blue" | "cyan" | "indigo" | "green"
  progress?: number
}) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-500/20",
      text: "text-blue-400",
      value: "text-blue-300",
      gradient: "from-blue-500 to-cyan-400",
      hover: "hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    },
    cyan: {
      bg: "bg-cyan-500/20",
      text: "text-cyan-400",
      value: "text-cyan-300",
      gradient: "from-cyan-500 to-blue-400",
      hover: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    },
    indigo: {
      bg: "bg-indigo-500/20",
      text: "text-indigo-400",
      value: "text-indigo-300",
      gradient: "from-indigo-500 to-purple-400",
      hover: "hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    },
    green: {
      bg: "bg-green-500/20",
      text: "text-green-400",
      value: "text-green-300",
      gradient: "from-green-500 to-cyan-400",
      hover: "hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
    },
  }

  const c = colorClasses[color]

  return (
    <div
      className={`bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 transition-all duration-300 ${c.hover}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`text-xl font-bold ${c.value}`}>{value}</p>
        </div>
      </div>
      {progress !== undefined && (
        <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
          <div
            className={`h-full bg-gradient-to-r ${c.gradient} rounded-full transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground">{sublabel}</p>
    </div>
  )
}

export default function AtlasDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionType>("dashboard")

  const handleMenuClick = (itemId: SectionType) => {
    setActiveSection(itemId)
    setSidebarOpen(false)
  }

  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return { title: "Dashboard", subtitle: "Visão geral da sua governança" }
      case "visao360":
        return { title: "Visão 360 do Corpo", subtitle: "Todas as suas métricas em detalhes" }
      case "atlasia":
        return { title: "Atlas IA", subtitle: "Seu assistente inteligente" }
      case "treinoDieta":
        return { title: "Treino & Dieta", subtitle: "Governança do estímulo e combustível" }
      case "compulsao":
        return { title: "Compulsão & Fome", subtitle: "Controlando gatilhos emocionais" }
      case "sono":
        return { title: "Sono & Recuperação", subtitle: "Carregando a bateria do corpo" }
      case "fisioterapia":
        return { title: "Fisioterapia & Dores", subtitle: "Correção postural e prevenção" }
      case "testosterona":
        return { title: "Testosterona Natural", subtitle: "Otimizando hormônios naturalmente" }
      default:
        return { title: "Painel Atlas IA", subtitle: "O cérebro que governa seu corpo" }
    }
  }

  const pageTitle = getPageTitle()

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-72
          bg-card/95 backdrop-blur-xl border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground block">
                Atlas <span className="text-blue-400">IA</span>
              </span>
              <span className="text-xs text-muted-foreground">Painel de Governança</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-6 right-4 lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                transition-all duration-200 ease-out group relative
                ${
                  activeSection === item.id
                    ? "bg-blue-500/20 text-blue-300 shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }
              `}
            >
              <div
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
                  transition-all duration-200
                  ${
                    activeSection === item.id
                      ? "bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      : "bg-transparent group-hover:bg-blue-400/50 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                  }
                `}
              />
              <item.icon className={`w-5 h-5 transition-colors ${activeSection === item.id ? "text-blue-400" : ""}`} />
              <span className="font-medium">{item.label}</span>
              <ChevronRight
                className={`
                  w-4 h-4 ml-auto transition-all duration-200
                  ${activeSection === item.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"}
                `}
              />
            </button>
          ))}
        </nav>

        {/* User Block */}
        <div className="p-4 border-t border-border">
          <div className="bg-secondary/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Usuário Atlas</p>
                <p className="text-xs text-muted-foreground truncate">usuario@email.com</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>

            <div className="flex-1 text-center lg:text-left lg:ml-0">
              <h1 className="text-lg md:text-xl font-bold text-foreground">{pageTitle.title}</h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{pageTitle.subtitle}</p>
            </div>

            <div className="w-10 lg:hidden" />
          </div>
        </header>

        {/* Content Area - Renders based on activeSection */}
        <div className="px-4 md:px-8 py-8">
          {activeSection === "dashboard" && <DashboardView />}
          {activeSection === "visao360" && <Visao360View />}
          {activeSection === "atlasia" && <AtlasIAView />}
          {activeSection === "treinoDieta" && <TreinoDietaView />}
          {activeSection === "compulsao" && <CompulsaoView />}
          {activeSection === "sono" && <SonoView />}
          {activeSection === "fisioterapia" && <FisioterapiaView />}
          {activeSection === "testosterona" && <TestosteronaView />}
        </div>
      </main>
    </div>
  )
}
