"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Play,
  X,
  ChevronRight,
  Activity,
  Moon,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Types
interface CompulsionEvent {
  id: string
  timestamp: Date
  trigger: string
  intensity: number
  outcome: "victory" | "relapse" | "intervention"
  notes?: string
}

interface AtlasCompulsionContext {
  sleepHours: number
  energy: number
  stress: number
  lastMealHoursAgo: number
  painFlag: boolean
  riskLevel: number
  criticalWindow: [string, string]
  compulsionHistory: CompulsionEvent[]
}

// Helper Components
function RiskGauge({ level, className = "" }: { level: number; className?: string }) {
  const getColor = () => {
    if (level < 33) return "text-green-400"
    if (level < 66) return "text-yellow-400"
    return "text-red-400"
  }

  const getLabel = () => {
    if (level < 33) return "Baixo"
    if (level < 66) return "Médio"
    return "Alto"
  }

  return (
    <div className={`relative ${className}`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="8" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${level * 2.51} 251`}
          className={`${getColor()} transition-all duration-500`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-3xl font-bold ${getColor()}`}>{Math.round(level)}</div>
        <div className="text-xs text-slate-400">{getLabel()}</div>
      </div>
    </div>
  )
}

function CrisisModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<"interrupt" | "replace" | "victory">("interrupt")
  const [breathTimer, setBreathTimer] = useState(90)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [trigger, setTrigger] = useState("")

  useEffect(() => {
    if (phase === "interrupt" && breathTimer > 0) {
      const timer = setInterval(() => setBreathTimer((t) => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [phase, breathTimer])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Modo Crise Ativado</h2>
              <p className="text-sm text-slate-400">Protocolo em 3 fases</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1 rounded ${phase === "interrupt" ? "bg-cyan-400" : "bg-cyan-400/30"}`} />
            <div
              className={`flex-1 h-1 rounded ${phase === "replace" ? "bg-cyan-400" : phase === "victory" ? "bg-cyan-400/30" : "bg-slate-700"}`}
            />
            <div className={`flex-1 h-1 rounded ${phase === "victory" ? "bg-cyan-400" : "bg-slate-700"}`} />
          </div>

          {/* Phase A: Interrupt */}
          {phase === "interrupt" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-cyan-400 mb-2">{breathTimer}s</div>
                <p className="text-slate-300 mb-6">Respiração guiada em andamento</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-200">Respirar fundo (4-7-8)</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-200">Trocar de cômodo agora</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-200">Água + 10 agachamentos</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setPhase("replace")
                  setBreathTimer(60)
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Continuar para substituição
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Phase B: Replace */}
          {phase === "replace" && (
            <div className="space-y-6">
              <p className="text-slate-300 mb-4">Escolha seu plano de emergência (60s):</p>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedPlan("A")}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === "A"
                      ? "bg-cyan-500/20 border-cyan-400"
                      : "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="font-semibold text-white mb-1">Plano A: Fome Física</div>
                  <div className="text-sm text-slate-400">Refeição segura + proteína</div>
                </button>

                <button
                  onClick={() => setSelectedPlan("B")}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === "B"
                      ? "bg-cyan-500/20 border-cyan-400"
                      : "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="font-semibold text-white mb-1">Plano B: Emocional</div>
                  <div className="text-sm text-slate-400">Lanche + caminhada 10min</div>
                </button>

                <button
                  onClick={() => setSelectedPlan("C")}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === "C"
                      ? "bg-cyan-500/20 border-cyan-400"
                      : "bg-slate-800/50 border-slate-700 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="font-semibold text-white mb-1">Plano C: Noite/Social</div>
                  <div className="text-sm text-slate-400">Rotina defesa noturna</div>
                </button>
              </div>

              <Button
                onClick={() => setPhase("victory")}
                disabled={!selectedPlan}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-50"
              >
                Executar plano
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Phase C: Victory */}
          {phase === "victory" && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-green-500/20 rounded-full border border-green-500/30 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Vitória Mínima Executada</h3>
                <p className="text-slate-400">Registre o gatilho para aprendizado:</p>
              </div>

              <input
                type="text"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="Ex: estresse, tédio, ansiedade..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />

              <div className="flex gap-2 flex-wrap">
                {["Estresse", "Tédio", "Ansiedade", "Fome", "Social"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrigger(t)}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 hover:border-cyan-500 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => {
                  onClose()
                  setPhase("interrupt")
                  setBreathTimer(90)
                  setSelectedPlan("")
                  setTrigger("")
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Concluir protocolo
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-2xl shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Cuidados Importantes</h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm">
            <p>
              O Atlas IA é uma ferramenta de apoio à governança corporal. Se você está enfrentando compulsão alimentar
              recorrente, também recomendamos acompanhamento profissional.
            </p>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-200">
                <strong>Quando procurar ajuda:</strong> Se as recaídas são diárias, se há vômito autoinduzido, ou se
                você sente que está perdendo o controle completo.
              </p>
            </div>

            <p>O sistema te guia em 3 minutos durante crises, mas não substitui tratamento quando necessário.</p>
          </div>

          <Button onClick={onClose} className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white">
            Entendi
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function Compulsao2035() {
  const [context, setContext] = useState<AtlasCompulsionContext>({
    sleepHours: 6,
    energy: 5,
    stress: 7,
    lastMealHoursAgo: 5,
    painFlag: false,
    riskLevel: 55,
    criticalWindow: ["20:30", "23:00"],
    compulsionHistory: [],
  })

  const [showCrisisModal, setShowCrisisModal] = useState(false)
  const [showCareModal, setShowCareModal] = useState(false)
  const [nightDefenseActive, setNightDefenseActive] = useState(false)
  const [newEvent, setNewEvent] = useState({ trigger: "", intensity: 5, notes: "" })

  // Calculate risk based on context
  useEffect(() => {
    let risk = 0

    // Sleep impact
    if (context.sleepHours < 6) risk += 20
    else if (context.sleepHours < 7) risk += 10

    // Stress impact
    risk += context.stress * 5

    // Energy impact (low energy = higher risk)
    risk += (10 - context.energy) * 3

    // Meal timing
    if (context.lastMealHoursAgo > 6) risk += 15
    else if (context.lastMealHoursAgo > 4) risk += 8

    // Pain flag
    if (context.painFlag) risk += 10

    // Night defense reduces risk
    if (nightDefenseActive) risk -= 15

    risk = Math.max(0, Math.min(100, risk))

    setContext((prev) => ({ ...prev, riskLevel: risk }))
  }, [
    context.sleepHours,
    context.energy,
    context.stress,
    context.lastMealHoursAgo,
    context.painFlag,
    nightDefenseActive,
  ])

  const getStateLabel = () => {
    if (context.riskLevel < 33) return { label: "Sob controle", color: "text-green-400" }
    if (context.riskLevel < 66) return { label: "Instável", color: "text-yellow-400" }
    return { label: "Crítico", color: "text-red-400" }
  }

  const state = getStateLabel()

  const addEvent = () => {
    if (!newEvent.trigger) return

    const event: CompulsionEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      trigger: newEvent.trigger,
      intensity: newEvent.intensity,
      outcome: "victory",
      notes: newEvent.notes,
    }

    setContext((prev) => ({
      ...prev,
      compulsionHistory: [event, ...prev.compulsionHistory].slice(0, 10),
    }))

    setNewEvent({ trigger: "", intensity: 5, notes: "" })
  }

  const detectPattern = () => {
    if (context.lastMealHoursAgo > 6 && context.stress > 6 && context.sleepHours < 7) {
      return "Padrão Atlas detectado: jejum longo + noite + estresse"
    }
    if (context.energy < 5 && context.sleepHours < 6) {
      return "Padrão: baixa energia + sono inadequado"
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="relative">
        {/* Control Header */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Compulsão Alimentar</h1>
                <p className="text-slate-400">Sistema de prevenção e intervenção</p>
              </div>

              <button
                onClick={() => setShowCareModal(true)}
                className="p-2 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors"
              >
                <Shield className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Mission Control Strip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700">
                <div className="absolute top-4 right-4">
                  <RiskGauge level={context.riskLevel} className="w-16 h-16" />
                </div>
                <div className="text-sm text-slate-400 mb-1">Risco Agora</div>
                <div className="text-2xl font-bold">{Math.round(context.riskLevel)}/100</div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <div className="text-sm text-slate-400">Janela Crítica</div>
                </div>
                <div className="text-xl font-bold">
                  {context.criticalWindow[0]} - {context.criticalWindow[1]}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">Estado Atual</div>
                <div className={`text-xl font-bold ${state.color}`}>{state.label}</div>
              </div>

              <Button
                onClick={() => setShowCrisisModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold h-full"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Ativar Modo Crise (2 min)
              </Button>
            </div>

            {/* High Risk Warning */}
            {context.riskLevel >= 66 && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-200 text-sm">
                  <strong>Risco elevado detectado.</strong> Recomendo ativar Modo Crise agora ou executar protocolo de
                  prevenção.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Three Main Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all hover:scale-[1.02] text-left">
              <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30 w-fit mb-4">
                <Play className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prevenir agora</h3>
              <p className="text-slate-400 text-sm mb-4">Micro-ação de 90 segundos para reduzir risco imediato</p>
              <div className="flex items-center text-cyan-400 text-sm font-medium">
                Iniciar protocolo
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setShowCrisisModal(true)}
              className="group p-6 bg-gradient-to-br from-red-900/20 to-slate-900/50 rounded-2xl border border-red-500/30 hover:border-red-400 transition-all hover:scale-[1.02] text-left"
            >
              <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30 w-fit mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Intervir (urge acontecendo)</h3>
              <p className="text-slate-400 text-sm mb-4">Modo Crise: interromper, substituir e registrar</p>
              <div className="flex items-center text-red-400 text-sm font-medium">
                Ativar Airbag
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all hover:scale-[1.02] text-left">
              <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30 w-fit mb-4">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recompor (pós-queda 12h)</h3>
              <p className="text-slate-400 text-sm mb-4">Protocolo de recuperação sem punição</p>
              <div className="flex items-center text-green-400 text-sm font-medium">
                Ver protocolo
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Night Defense */}
            <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Moon className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-bold">Defesa Noturna</h3>
                </div>
                <button
                  onClick={() => setNightDefenseActive(!nightDefenseActive)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    nightDefenseActive ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {nightDefenseActive ? "ON" : "OFF"}
                </button>
              </div>

              {nightDefenseActive && (
                <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-cyan-300 text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Plano ajustado automaticamente: +proteína, +fibra</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-slate-400">Horário jantar</div>
                  <div className="text-white font-medium">19:00 (fixo)</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-slate-400">Lanche anti-recaída</div>
                  <div className="text-white font-medium">21:00 - Iogurte + fruta</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-slate-400">Trava de gatilhos</div>
                  <div className="text-white font-medium">Remover delivery apps</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-slate-400">Ritual desligamento</div>
                  <div className="text-white font-medium">22:30 - Fechar cozinha</div>
                </div>
              </div>
            </div>

            {/* Event Log */}
            <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Log Inteligente</h3>
              </div>

              {detectPattern() && (
                <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="text-amber-300 text-sm font-medium">{detectPattern()}</div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={newEvent.trigger}
                  onChange={(e) => setNewEvent({ ...newEvent, trigger: e.target.value })}
                  placeholder="Gatilho (ex: estresse, tédio)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />

                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Intensidade:</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={newEvent.intensity}
                    onChange={(e) => setNewEvent({ ...newEvent, intensity: Number.parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-white font-medium w-8">{newEvent.intensity}</span>
                </div>

                <Button
                  onClick={addEvent}
                  disabled={!newEvent.trigger}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Registrar evento
                </Button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {context.compulsionHistory.map((event) => (
                  <div key={event.id} className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">{event.trigger}</span>
                      <span className="text-xs text-slate-500">
                        {event.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={event.intensity * 10} className="flex-1 h-1" />
                      <span className="text-xs text-slate-400">{event.intensity}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
      <CareModal isOpen={showCareModal} onClose={() => setShowCareModal(false)} />
    </div>
  )
}
