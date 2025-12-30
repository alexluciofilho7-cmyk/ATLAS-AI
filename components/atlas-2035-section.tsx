"use client"

import type React from "react"

import { useState } from "react"
import { Brain, Shield, Activity, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react"

export default function Atlas2035Section() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a0e1a] via-[#0d1424] to-[#0a0e1a] py-24 px-6">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Title + Subtitle + Claims */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                O que seria Atlas IA 2035, na prática
                <span className="block text-cyan-400">(3 apostas grandes)</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Três ideias que parecem 'ninguém pensou', mas são inevitáveis — e executáveis agora.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-lg">
                  Atlas não é chat. É um agente operacional que previne falha antes de acontecer.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-lg">
                  O produto que você está pagando hoje parece caro demais pelo que entrega amanhã.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Holographic Brain */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative h-full rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl p-8 flex items-center justify-center">
                <HolographicBrain />
              </div>
            </div>
          </div>
        </div>

        {/* Principle Strip */}
        <div className="flex flex-wrap gap-4 justify-center mb-20">
          <PrincipleChip>Menos motivação. Mais sistema.</PrincipleChip>
          <PrincipleChip>Prever recaída antes de acontecer.</PrincipleChip>
          <PrincipleChip>Confiança: evidência + governança.</PrincipleChip>
        </div>

        {/* Three Pillars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <AirbagPillar />
          <IntegrityScorePillar />
          <AgentCopilotPillar />
        </div>

        {/* Trust & Governance Panel */}
        <div className="mb-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Em 2035, saúde com IA será guerra de credibilidade.</h3>
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Trilha de evidência e limites claros</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Rastreabilidade: por que a Atlas recomendou isso?</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Categorias de risco e protocolos seguros</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <EvidencePill>PubMed-ready</EvidencePill>
            <EvidencePill>Audit Trail</EvidencePill>
            <EvidencePill>Risk Flags</EvidencePill>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl text-white font-semibold mb-2">
                Quer ver a Atlas prevendo sua recaída antes dela acontecer?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105">
                Ver Demo do Modo Crise
              </button>
              <button className="px-6 py-3 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all">
                Entender o Score de Integridade
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center lg:text-left mt-4">Sem motivação. Só sistema.</p>
        </div>
      </div>
    </section>
  )
}

// Helper Components

function HolographicBrain() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse">
        <defs>
          <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="60" fill="none" stroke="url(#brain-gradient)" strokeWidth="2" opacity="0.3" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="url(#brain-gradient)" strokeWidth="2" opacity="0.5" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="url(#brain-gradient)" strokeWidth="2" opacity="0.7" />
        <Brain className="absolute inset-0 m-auto w-20 h-20 text-cyan-400" />
      </svg>
    </div>
  )
}

function PrincipleChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-3 rounded-full border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm text-cyan-400 font-medium hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
      {children}
    </div>
  )
}

function EvidencePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
      {children}
    </div>
  )
}

// Pillar Components

function AirbagPillar() {
  const [riskOn, setRiskOn] = useState(false)
  const [protocolState, setProtocolState] = useState<"idle" | "loading" | "complete">("idle")

  const startProtocol = () => {
    setProtocolState("loading")
    setTimeout(() => setProtocolState("complete"), 2000)
  }

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-6 hover:border-cyan-400/50 transition-all">
      <div className="mb-4">
        <Shield className="w-10 h-10 text-cyan-400 mb-3" />
        <h3 className="text-2xl font-bold text-white mb-2">Modo Crise (Anti-Compulsão)</h3>
        <p className="text-cyan-400 font-medium mb-4">o airbag do seu comportamento</p>
        <p className="text-gray-400 text-sm italic mb-6">
          "Quando o padrão de recaída começa, a Atlas interrompe o ciclo em minutos."
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Como funciona</h4>
        <Step>Detecta risco (sono ruim, estresse alto, fome emocional, padrão noturno)</Step>
        <Step>Ativa protocolo de 2 minutos (respiração + ação física simples)</Step>
        <Step>Reduz fricção (checklist pronto + mensagem automática)</Step>
        <Step>Substitui a ação (lanche pré-definido + micro caminhada)</Step>
        <Step>Fecha com vitória mínima + replanejamento do dia</Step>
      </div>

      <div className="space-y-2 mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">O que muda</h4>
        <Outcome>Menos decisões no pior momento do dia</Outcome>
        <Outcome>Queda real no número de recaídas</Outcome>
        <Outcome>Consistência mesmo quando você está fraco</Outcome>
      </div>

      {/* Microdemo */}
      <div className="rounded-xl bg-slate-950/50 border border-cyan-500/20 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Sinais de risco</span>
          <button
            onClick={() => setRiskOn(!riskOn)}
            className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
              riskOn ? "bg-red-500 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            {riskOn ? "ON" : "OFF"}
          </button>
        </div>

        {riskOn && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-400" />
                <span>21:43 risco detectado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-yellow-400" />
                <span>21:45 protocolo ativado</span>
              </div>
              {protocolState === "complete" && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-400" />
                  <span>21:52 vitória mínima</span>
                </div>
              )}
            </div>

            <button
              onClick={startProtocol}
              disabled={protocolState !== "idle"}
              className="w-full px-4 py-2 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {protocolState === "loading"
                ? "Executando..."
                : protocolState === "complete"
                  ? "✓ Concluído"
                  : "Start Protocol"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function IntegrityScorePillar() {
  const [showExplanation, setShowExplanation] = useState(false)
  const [score] = useState(72)

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-6 hover:border-cyan-400/50 transition-all">
      <div className="mb-4">
        <Activity className="w-10 h-10 text-cyan-400 mb-3" />
        <h3 className="text-2xl font-bold text-white mb-2">Score de Integridade</h3>
        <p className="text-cyan-400 font-medium mb-4">execução real, não motivação</p>
        <p className="text-gray-400 text-sm italic mb-6">
          "A Atlas mede sua integridade em tempo real e te confronta com clareza."
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Como funciona</h4>
        <Step>Coleta sinais: sono, treino, dieta, estresse, decisões sob pressão</Step>
        <Step>Calcula Score diário + semanal (com transparência do porquê)</Step>
        <Step>Mostra 'pontos de quebra': onde você se sabota</Step>
        <Step>Sugere micro-ajustes com maior ROI</Step>
        <Step>Recompõe identidade: "você é o cara que cumpre"</Step>
      </div>

      <div className="space-y-2 mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">O que muda</h4>
        <Outcome>Menos autoengano, mais direção</Outcome>
        <Outcome>Rotina sustentável</Outcome>
        <Outcome>Evolução estética com consistência</Outcome>
      </div>

      {/* Microdemo */}
      <div className="rounded-xl bg-slate-950/50 border border-cyan-500/20 p-4 space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="url(#score-gradient)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="score-gradient">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{score}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Sono</span>
            <div className="flex-1 mx-2 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500" style={{ width: "85%" }} />
            </div>
            <span className="text-cyan-400 font-semibold">85</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Treino</span>
            <div className="flex-1 mx-2 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500" style={{ width: "70%" }} />
            </div>
            <span className="text-cyan-400 font-semibold">70</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Decisões</span>
            <div className="flex-1 mx-2 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500" style={{ width: "62%" }} />
            </div>
            <span className="text-cyan-400 font-semibold">62</span>
          </div>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full px-4 py-2 border border-cyan-500 text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 transition-all"
        >
          {showExplanation ? "Esconder" : "Explain my score"}
        </button>

        {showExplanation && (
          <div className="space-y-2 text-xs text-gray-400 animate-in fade-in duration-300">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>Decisões à noite comprometem execução</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Sono consistente sustentando base</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>Falta 1 treino por semana no objetivo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AgentCopilotPillar() {
  const [dayMode, setDayMode] = useState<"normal" | "estressado" | "pouco-sono">("normal")

  const agentMessages = {
    normal: "Plano mantido. Treino superior, 2100 kcal, 180g proteína.",
    estressado: "Detectei estresse alto. Reduzindo volume 30%, priorizando mobilidade.",
    "pouco-sono": "Sono abaixo de 6h. Modo proteção ativado: caminhada leve + maintenance.",
  }

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-6 hover:border-cyan-400/50 transition-all">
      <div className="mb-4">
        <Sparkles className="w-10 h-10 text-cyan-400 mb-3" />
        <h3 className="text-2xl font-bold text-white mb-2">Copiloto de Rotina (Agente)</h3>
        <p className="text-cyan-400 font-medium mb-4">a Atlas opera o seu dia</p>
        <p className="text-gray-400 text-sm italic mb-6">
          "Você não abre o app. O agente ajusta treino, dieta e agenda com base nos dados."
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Como funciona</h4>
        <Step>Ajusta macros/treino conforme seu dia (energia, tempo, recuperação)</Step>
        <Step>Gera lista de compras e cardápio automático</Step>
        <Step>Organiza semana e horários (menos caos)</Step>
        <Step>Puxa o freio em risco (sono baixo/estresse alto) e muda o plano</Step>
        <Step>Aprende com seu histórico e melhora com o tempo</Step>
      </div>

      <div className="space-y-2 mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">O que muda</h4>
        <Outcome>Menos fricção, mais execução</Outcome>
        <Outcome>Plano inteligente que se adapta</Outcome>
        <Outcome>Resultados sem depender de "força de vontade"</Outcome>
      </div>

      {/* Microdemo */}
      <div className="rounded-xl bg-slate-950/50 border border-cyan-500/20 p-4 space-y-4">
        <div>
          <span className="text-sm text-gray-400 block mb-2">Day Mode</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setDayMode("normal")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                dayMode === "normal" ? "bg-cyan-500 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setDayMode("estressado")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                dayMode === "estressado" ? "bg-yellow-500 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              }`}
            >
              Estressado
            </button>
            <button
              onClick={() => setDayMode("pouco-sono")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                dayMode === "pouco-sono" ? "bg-red-500 text-white" : "bg-slate-800 text-gray-400 hover:bg-slate-700"
              }`}
            >
              Pouco Sono
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-slate-900/50 border border-cyan-500/20 p-3 animate-in fade-in duration-300">
          <div className="flex items-start gap-2 mb-2">
            <Brain className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-cyan-400 font-semibold">Atlas Agent</span>
          </div>
          <p className="text-xs text-gray-300">{agentMessages[dayMode]}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded bg-slate-900/50 p-2 text-center">
            <div className="text-gray-500 mb-1">Treino</div>
            <div className="text-cyan-400 font-semibold">
              {dayMode === "normal" ? "Superior" : dayMode === "estressado" ? "Reduzido" : "Leve"}
            </div>
          </div>
          <div className="rounded bg-slate-900/50 p-2 text-center">
            <div className="text-gray-500 mb-1">Macros</div>
            <div className="text-cyan-400 font-semibold">
              {dayMode === "normal" ? "2100" : dayMode === "estressado" ? "2000" : "1900"}
            </div>
          </div>
          <div className="rounded bg-slate-900/50 p-2 text-center">
            <div className="text-gray-500 mb-1">Modo</div>
            <div className="text-cyan-400 font-semibold">{dayMode === "normal" ? "Attack" : "Protect"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-400">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
      <span>{children}</span>
    </div>
  )
}

function Outcome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-300">
      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}
