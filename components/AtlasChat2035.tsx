"use client"

import { useState, useRef, useEffect } from "react"
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  Target,
  AlertCircle,
  X,
  Play,
  Calendar,
  Activity,
} from "lucide-react"

// ========== TYPES ==========
type RiskLevel = "low" | "medium" | "high"

type AtlasContext = {
  module: "compulsao" | "treino" | "sono" | "fisioterapia" | "testosterona" | "geral"
  execution: number
  sleepHours: number
  energy: "Baixa" | "Média" | "Alta"
  compulsionStatus: "sob controle" | "atenção" | "crise"
  riskLevel: RiskLevel
  lastTriggerTime?: string
  pattern?: string
}

type QuickQuestion = {
  id: string
  text: string
  category: string
}

type ActionItem = {
  id: string
  text: string
  done: boolean
}

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  confidence?: number
  answeredQuestions?: string[]
}

type AtlasResponse = {
  quickDiagnosis: string
  blockingFactor: string
  plan24h: string
  weekPlan: string
  whyItWorks?: string
  safetyAlert?: string
  quickQuestions?: QuickQuestion[]
  actions?: ActionItem[]
}

// ========== HELPER COMPONENTS ==========

function ResponseStack({ response, confidence }: { response: AtlasResponse; confidence: number }) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    why: false,
    week: true,
  })

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-3">
      {/* Confidence Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 border border-cyan-400/40 rounded-full">
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300">Precisão {confidence}%</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-400/40 rounded-full">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-bold text-blue-300">Baseado no seu padrão</span>
        </div>
      </div>

      {/* Quick Diagnosis */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl p-4">
        <h4 className="text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Diagnóstico rápido:
        </h4>
        <p className="text-sm leading-relaxed text-blue-100/90">{response.quickDiagnosis}</p>
      </div>

      {/* Blocking Factor */}
      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-xl p-4">
        <h4 className="text-sm font-bold text-orange-300 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />O que está te travando de verdade:
        </h4>
        <p className="text-sm leading-relaxed text-blue-100/90">{response.blockingFactor}</p>
      </div>

      {/* Quick Questions Chips */}
      {response.quickQuestions && response.quickQuestions.length > 0 && (
        <div className="bg-slate-800/60 border border-blue-400/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-blue-300 mb-3">Perguntas rápidas (20s):</h4>
          <div className="flex flex-wrap gap-2">
            {response.quickQuestions.map((q) => (
              <button
                key={q.id}
                className="px-3 py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 rounded-lg text-xs text-blue-100 transition-all hover:scale-105"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Plan NOW (2 min) - Collapsible Checklist */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Plano AGORA (2 minutos):
          </h4>
          <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white transition-all">
            Começar
          </button>
        </div>
        <p className="text-sm leading-relaxed text-blue-100/90 whitespace-pre-line">{response.plan24h}</p>
      </div>

      {/* 24h Timeline */}
      <div className="bg-slate-800/60 border border-blue-400/30 rounded-xl p-4">
        <h4 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Próximas 24h:
        </h4>
        <div className="space-y-2">
          <TimelineStep time="Agora" text="Executar plano de 2 minutos acima" />
          <TimelineStep time="4h depois" text="Check-in rápido: como está a energia?" />
          <TimelineStep time="Antes de dormir" text="Registrar vitória do dia no painel" />
        </div>
      </div>

      {/* 7 Day Plan - Collapsible */}
      <div className="bg-slate-800/60 border border-purple-400/30 rounded-xl p-4">
        <button onClick={() => toggleSection("week")} className="w-full flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
            <Calendar className="w-4 h-4" />7 dias (anti-recaída):
          </h4>
          {expandedSections.week ? (
            <ChevronUp className="w-4 h-4 text-purple-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-purple-300" />
          )}
        </button>
        {expandedSections.week && (
          <p className="text-sm leading-relaxed text-blue-100/90 whitespace-pre-line">{response.weekPlan}</p>
        )}
      </div>

      {/* Why it works - Collapsed by default */}
      {response.whyItWorks && (
        <div className="bg-slate-800/60 border border-slate-600/30 rounded-xl p-4">
          <button onClick={() => toggleSection("why")} className="w-full flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Por que isso funciona?
            </h4>
            {expandedSections.why ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
          {expandedSections.why && (
            <p className="text-xs leading-relaxed text-slate-300 mt-3 whitespace-pre-line">{response.whyItWorks}</p>
          )}
        </div>
      )}
    </div>
  )
}

function TimelineStep({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-16 flex-shrink-0 text-xs font-bold text-cyan-400">{time}</div>
      <div className="flex-1 text-sm text-blue-100/80">{text}</div>
    </div>
  )
}

function CrisisProtocolModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [breathingTimer, setBreathingTimer] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [checklist, setChecklist] = useState([
    { id: "1", text: "Beber 500ml de água agora", done: false },
    { id: "2", text: "Fazer 5 respirações profundas", done: false },
    { id: "3", text: "Comer proteína + vegetal (não carboidrato isolado)", done: false },
  ])
  const [triggerLog, setTriggerLog] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && breathingTimer > 0) {
      interval = setInterval(() => {
        setBreathingTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, breathingTimer])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Modo Crise Ativado
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breathing Timer */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-cyan-400/40 rounded-xl p-4 mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-300 mb-2">{breathingTimer}s</div>
            <p className="text-xs text-blue-200 mb-3">Inspire 4s, segure 4s, expire 4s</p>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-bold text-white transition-all"
            >
              {isTimerRunning ? "Pausar" : "Começar"}
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-slate-300 mb-2">Protocolo de 3 passos:</h4>
          <div className="space-y-2">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setChecklist((prev) => prev.map((i) => (i.id === item.id ? { ...i, done: !i.done } : i)))
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  item.done
                    ? "bg-emerald-500/20 border-emerald-400/40"
                    : "bg-slate-800/60 border-slate-600/40 hover:border-blue-400/40"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.done ? "bg-emerald-500 border-emerald-400" : "border-slate-500"
                  }`}
                >
                  {item.done && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${item.done ? "text-emerald-300" : "text-slate-300"}`}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trigger Log */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-400 block mb-2">Log do gatilho (1 linha):</label>
          <input
            type="text"
            value={triggerLog}
            onChange={(e) => setTriggerLog(e.target.value)}
            placeholder="Ex: Estresse no trabalho às 18h"
            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/40 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-400/60"
          />
        </div>

        {/* Victory Button */}
        <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg">
          Vitória mínima registrada
        </button>
      </div>
    </div>
  )
}

function CareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-blue-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-blue-300 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Cuidados e Segurança
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            A Atlas IA é uma ferramenta de governança corporal, mas não substitui atendimento médico ou fisioterápico
            presencial.
          </p>
          <p className="font-semibold text-yellow-300">Procure ajuda profissional se você apresentar:</p>
          <ul className="space-y-1 text-xs text-slate-400 ml-4">
            <li>• Dor intensa que não melhora com repouso</li>
            <li>• Perda de peso rápida e não intencional</li>
            <li>• Compulsão alimentar frequente e descontrolada</li>
            <li>• Insônia persistente (mais de 2 semanas)</li>
            <li>• Alterações hormonais confirmadas em exames</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white transition-all"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}

function ActionBar() {
  const actions = [
    { label: "Analisar meu dia", icon: Activity },
    { label: "Protocolo 7 dias", icon: Calendar },
    { label: "Revisar minha semana", icon: TrendingUp },
    { label: "Registrar gatilho", icon: AlertCircle },
    { label: "Criar plano de refeições seguro", icon: Target },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, idx) => {
        const Icon = action.icon
        return (
          <button
            key={idx}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 hover:from-blue-600/50 hover:to-cyan-600/50 border border-blue-400/40 rounded-lg text-xs font-bold text-blue-100 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Icon className="w-3.5 h-3.5" />
            {action.label}
          </button>
        )
      })}
    </div>
  )
}

// ========== MAIN COMPONENT ==========
export default function AtlasChat2035() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCrisisModal, setShowCrisisModal] = useState(false)
  const [showCareModal, setShowCareModal] = useState(false)
  const [confidence, setConfidence] = useState(72)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulated Atlas Context
  const atlasContext: AtlasContext = {
    module: "compulsao",
    execution: 82,
    sleepHours: 7,
    energy: "Média",
    compulsionStatus: "atenção",
    riskLevel: "medium",
    lastTriggerTime: "21:43",
    pattern: "noite",
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response with structured format
    setTimeout(() => {
      const mockResponse: AtlasResponse = {
        quickDiagnosis:
          "Você está em um padrão de compulsão noturna. Seu sono está ok (7h), mas a energia média indica que algo está desregulado durante o dia. Provavelmente você está comendo muito pouco ou muito espaçado.",
        blockingFactor:
          "O principal travamento é fome física não atendida durante o dia. Você chega à noite com déficit calórico e o corpo busca energia rápida. Não é falta de disciplina. É fome real.",
        plan24h:
          "Amanhã, adicione 1 refeição extra às 16h: proteína + carboidrato + gordura. Pode ser ovo com pão integral e abacate. Jantar às 20h no máximo. Se der fome às 22h, coma iogurte grego com frutas vermelhas.",
        weekPlan:
          "Próximos 7 dias: estabelecer 5 refeições fixas (café, lanche 10h, almoço, lanche 16h, jantar). Nada de pular refeições. Se tiver compulsão, anote horário + contexto no painel. Objetivo: zerar compulsão em 7 dias.",
        whyItWorks:
          "Compulsão noturna geralmente é fome física mal gerenciada. Quando você come a cada 3-4h durante o dia, o corpo não entra em modo fome extrema à noite. Proteína + carboidrato + gordura estabilizam glicemia e saciedade.",
        quickQuestions: [
          { id: "q1", text: "Acontece mais à noite", category: "timing" },
          { id: "q2", text: "Depois de estresse", category: "trigger" },
          { id: "q3", text: "Fico muitas horas sem comer", category: "pattern" },
        ],
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: JSON.stringify(mockResponse),
        timestamp: new Date(),
        confidence: 78,
      }

      setMessages((prev) => [...prev, assistantMsg])
      setConfidence(78)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0e1a 0%, #0f1419 50%, #0a0d14 100%)",
      }}
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.15) 2px, rgba(59, 130, 246, 0.15) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.15) 2px, rgba(59, 130, 246, 0.15) 4px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* Header with Status Strip */}
        <div className="mb-6">
          <div
            className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-5 shadow-2xl"
            style={{
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.15)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                  style={{
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">Atlas IA – Chat 2035</h1>
                  <p className="text-xs text-blue-200/60">Governança Corporal Inteligente</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-300 font-semibold">Online</span>
              </div>
            </div>

            {/* Status Strip */}
            <div className="flex items-center gap-4 text-xs border-t border-blue-500/10 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Execução:</span>
                <span className="text-emerald-400 font-bold">{atlasContext.execution}%</span>
              </div>
              <span className="text-blue-500/30">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Sono:</span>
                <span className="text-blue-300 font-bold">{atlasContext.sleepHours}h</span>
              </div>
              <span className="text-blue-500/30">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Energia:</span>
                <span className="text-blue-300 font-bold">{atlasContext.energy}</span>
              </div>
              <span className="text-blue-500/30">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Compulsão:</span>
                <span
                  className={`font-bold ${
                    atlasContext.compulsionStatus === "sob controle"
                      ? "text-emerald-400"
                      : atlasContext.compulsionStatus === "atenção"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {atlasContext.compulsionStatus}
                </span>
              </div>
              {atlasContext.riskLevel === "high" && (
                <>
                  <span className="text-blue-500/30">|</span>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/20 border border-red-400/40 rounded">
                    <AlertCircle className="w-3 h-3 text-red-400" />
                    <span className="text-red-300 font-bold">Risco alto</span>
                  </div>
                </>
              )}
            </div>

            {/* Crisis Mode Button (only show if compulsion status is not "sob controle") */}
            {atlasContext.compulsionStatus !== "sob controle" && (
              <div className="mt-3 pt-3 border-t border-orange-500/20">
                <button
                  onClick={() => setShowCrisisModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg text-sm font-bold text-white transition-all shadow-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Ativar Modo Crise (2 min)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div
          className="bg-slate-900/40 backdrop-blur-2xl border border-blue-500/20 rounded-3xl shadow-2xl overflow-hidden"
          style={{
            boxShadow: "0 0 50px rgba(59, 130, 246, 0.2)",
          }}
        >
          <div className="p-6 h-[500px] overflow-y-auto">
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center py-16">
                  <div
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center"
                    style={{
                      boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <Brain className="w-10 h-10 text-blue-400" />
                  </div>
                  <p className="text-blue-200/60 text-sm">Faça sua primeira pergunta ou use uma ação rápida abaixo</p>
                </div>
              )}

              {messages.map((msg) => {
                if (msg.role === "user") {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div
                        className="max-w-[75%] bg-gradient-to-br from-blue-600 to-blue-500 text-white px-5 py-3 rounded-2xl rounded-tr-md shadow-xl"
                        style={{
                          boxShadow: "0 8px 30px rgba(59, 130, 246, 0.35)",
                        }}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  )
                }

                // Parse assistant response
                let response: AtlasResponse
                try {
                  response = JSON.parse(msg.content)
                } catch {
                  return (
                    <div key={msg.id} className="flex justify-start">
                      <div className="max-w-[80%] bg-slate-800/70 border border-blue-500/30 rounded-2xl p-5">
                        <p className="text-sm text-blue-100/90">{msg.content}</p>
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={msg.id} className="flex justify-start">
                    <div className="max-w-[90%] bg-slate-800/70 border border-blue-500/30 rounded-2xl p-5">
                      <ResponseStack response={response} confidence={msg.confidence || confidence} />
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/70 border border-blue-500/30 rounded-2xl px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </div>
                      <span className="text-xs text-blue-300">Analisando seus dados...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-6 py-4 bg-slate-900/50 border-t border-blue-500/20">
            <ActionBar />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gradient-to-b from-slate-900/60 to-slate-900/80 border-t border-blue-500/30">
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 bg-slate-800/70 border border-slate-600/50 rounded-xl text-sm text-blue-50 placeholder:text-slate-400 focus:outline-none focus:border-blue-500/60 resize-none"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 shadow-xl"
                style={{
                  boxShadow: "0 8px 30px rgba(59, 130, 246, 0.5)",
                }}
              >
                Enviar
              </button>
            </div>
          </div>

          {/* Care Button (bottom right) */}
          <button
            onClick={() => setShowCareModal(true)}
            className="absolute bottom-6 right-6 w-10 h-10 bg-blue-600/80 hover:bg-blue-500 backdrop-blur-sm border border-blue-400/40 rounded-full flex items-center justify-center shadow-lg transition-all"
            title="Cuidados e segurança"
          >
            <Shield className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <CrisisProtocolModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
      <CareModal isOpen={showCareModal} onClose={() => setShowCareModal(false)} />
    </div>
  )
}
