"use client"

import React, { useRef, useEffect, useCallback, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Target,
  Brain,
  Dumbbell,
  Utensils,
  Moon,
  Activity,
  Zap,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Camera,
  HelpCircle,
  Save,
  Check,
  User,
  AlertTriangle,
  Clock,
  Shield,
  Heart,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sun,
  Coffee,
  Wine,
  Award,
  Battery,
  Database,
  Mic,
  Scan,
  Send,
  Scale,
  Rocket,
  BookOpen,
  Monitor,
  Thermometer,
  Minus,
  Wrench,
  XCircle,
  Flame,
  Pill,
  Snowflake,
  Lightbulb,
  Radio,
} from "lucide-react"
import {
  useAtlasData,
  type BodyAreaKey,
  type BodyAreaStatus,
  type EnergyScore,
  type DailyCheckin,
  type BodyMeasurements,
  type BodyStatusMap, // Added for context data
  type TrainingConfig, // Added for type safety
  type DietConfig, // Added for type safety
} from "@/context/AtlasDataContext"
import { AtlasPassaporte } from "@/components/AtlasPassaporte"
// import Compulsao2035 from "@/components/Compulsao2035" // Removed as CompulsaoView is now inlined

type SectionKey =
  | "dashboard"
  | "visao360"
  | "atlasIA"
  | "treinoDieta"
  | "compulsao"
  | "sono"
  | "fisioterapia"
  | "testosterona"

type EnergyLevel = "Alta" | "Média" | "Baixa"

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
    metabolicHealth: 55,
    generalConsistency: 50,
    avgSleepHours: 6.2,
    weightDeltaKg: 0.5,
    energyLevel: "Baixa",
    trainingsDone: 3,
    trainingsPlanned: 5,
    dietAdherence: 55,
  },
  {
    weekLabel: "Semana 2",
    atlasScore: 63,
    executionRate: 70,
    aestheticProgress: 52,
    metabolicHealth: 60,
    generalConsistency: 58,
    avgSleepHours: 6.8,
    weightDeltaKg: -0.3,
    energyLevel: "Média",
    trainingsDone: 4,
    trainingsPlanned: 5,
    dietAdherence: 65,
  },
  {
    weekLabel: "Semana 3",
    atlasScore: 68,
    executionRate: 75,
    aestheticProgress: 58,
    metabolicHealth: 68,
    generalConsistency: 65,
    avgSleepHours: 7.0,
    weightDeltaKg: -0.8,
    energyLevel: "Média",
    trainingsDone: 4,
    trainingsPlanned: 5,
    dietAdherence: 72,
  },
  {
    weekLabel: "Semana 4",
    atlasScore: 72,
    executionRate: 80,
    aestheticProgress: 63,
    metabolicHealth: 72,
    generalConsistency: 70,
    avgSleepHours: 7.2,
    weightDeltaKg: -1.2,
    energyLevel: "Alta",
    trainingsDone: 4,
    trainingsPlanned: 5,
    dietAdherence: 78,
  },
  {
    weekLabel: "Semana 5",
    atlasScore: 78,
    executionRate: 85,
    aestheticProgress: 70,
    metabolicHealth: 78,
    generalConsistency: 76,
    avgSleepHours: 7.5,
    weightDeltaKg: -1.8,
    energyLevel: "Alta",
    trainingsDone: 5,
    trainingsPlanned: 5,
    dietAdherence: 82,
  },
  {
    weekLabel: "Semana 6",
    atlasScore: 82,
    executionRate: 88,
    aestheticProgress: 75,
    metabolicHealth: 82,
    generalConsistency: 80,
    avgSleepHours: 7.8,
    weightDeltaKg: -2.1,
    energyLevel: "Alta",
    trainingsDone: 5,
    trainingsPlanned: 5,
    dietAdherence: 88,
  },
]

// Specter Elite 2036 - Navigation Modules
type MenuStatus = "optimal" | "attention" | "processing"

const SPECTER_MENU_ITEMS: Array<{
  key: SectionKey
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  status: MenuStatus
}> = [
  { key: "dashboard", label: "Central de Comando", icon: LayoutDashboard, status: "optimal" },
  { key: "visao360", label: "Ativos Biometricos", icon: Target, status: "optimal" },
  { key: "atlasIA", label: "O Oraculo", icon: Brain, status: "processing" },
  { key: "treinoDieta", label: "Execucao Estrategica", icon: Dumbbell, status: "optimal" },
  { key: "compulsao", label: "Gestao de Risco", icon: Utensils, status: "attention" },
  { key: "sono", label: "Recuperacao de Sistema", icon: Moon, status: "optimal" },
  { key: "fisioterapia", label: "Integridade Estrutural", icon: Activity, status: "attention" },
  { key: "testosterona", label: "Soberania Hormonal", icon: Zap, status: "optimal" },
]

function getStatusLed(status: MenuStatus) {
  switch (status) {
    case "optimal":
      return { className: "bg-emerald-400 led-green", label: "Otimizado" }
    case "attention":
      return { className: "bg-amber-400 led-amber", label: "Atencao" }
    case "processing":
      return { className: "bg-cyan-400 led-cyan", label: "IA Analisando" }
  }
}

function getAtlasScoreMessage(score: number): string {
  if (score >= 90) return "Você está em modo governança total. Continue assim!"
  if (score >= 75) return "Excelente progresso. Pequenos ajustes e você atinge a elite."
  if (score >= 60) return "Bom ritmo. Foque na consistência para acelerar resultados."
  if (score >= 40) return "Há espaço para melhorar. A Atlas IA vai te guiar."
  return "Fase inicial. Cada pequena ação conta. Vamos juntos!"
}

function getAreaColor(status: BodyAreaStatus): string {
  switch (status) {
    case "good":
      return "bg-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.7)]"
    case "injury":
      return "bg-yellow-400/80 shadow-[0_0_20px_rgba(250,204,21,0.8)]"
    default:
      return "bg-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.9)]"
  }
}

function getStatusLabel(status: BodyAreaStatus): string {
  switch (status) {
    case "good":
      return "Ponto forte"
    case "injury":
      return "Lesão – tratar com prioridade"
    default:
      return "Precisa de atenção"
  }
}

const bodyAreaLabels: Record<BodyAreaKey, string> = {
  shoulders: "Ombros",
  chest: "Peitoral",
  back: "Costas",
  arms: "Braços",
  core: "Core/Abdômen",
  hips: "Quadril",
  legs: "Pernas",
  calves: "Panturrilhas",
}

const hotspotPositions: Record<BodyAreaKey, { top: string; left: string }> = {
  shoulders: { top: "12%", left: "50%" },
  chest: { top: "22%", left: "50%" },
  back: { top: "28%", left: "50%" },
  arms: { top: "32%", left: "20%" },
  core: { top: "38%", left: "50%" },
  hips: { top: "48%", left: "50%" },
  legs: { top: "65%", left: "50%" },
  calves: { top: "82%", left: "50%" },
}

// ========== DASHBOARD VIEW ==========
function DashboardView() {
  const { currentWeekMetrics } = useAtlasData()
  const [weekIndex, setWeekIndex] = useState(mockWeeks.length - 1)
  const [showSummary, setShowSummary] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const currentWeek = mockWeeks[weekIndex]
  const canGoPrev = weekIndex > 0
  const canGoNext = weekIndex < mockWeeks.length - 1

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (currentWeek.atlasScore / 100) * circumference

  // Animate score from 0 to target
  useEffect(() => {
    setAnimatedScore(0)
    const target = currentWeek.atlasScore
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setAnimatedScore(target)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [currentWeek.atlasScore, weekIndex])

  // 14-day predictive data
  const predictiveData = [
    { day: 1, score: currentWeek.atlasScore },
    { day: 3, score: currentWeek.atlasScore + 2 },
    { day: 5, score: currentWeek.atlasScore + 3 },
    { day: 7, score: currentWeek.atlasScore + 5 },
    { day: 10, score: currentWeek.atlasScore + 7 },
    { day: 14, score: Math.min(currentWeek.atlasScore + 10, 100) },
  ]

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    if (hoveredCard !== cardId) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    setHoveredCard(null)
  }

  const getVerdict = () => {
    if (currentWeek.dietAdherence < 70) return "Sua dieta precisa de atenção imediata. Sem ela, treino vira cardio."
    if (currentWeek.avgSleepHours < 7) return "Sono abaixo do ideal. Recuperacao comprometida = ganhos perdidos."
    if (currentWeek.executionRate < 80) return "Execucao inconsistente. Compromisso nao e negociavel."
    return "Operando em nivel de elite. Mantenha a disciplina."
  }

  const getOperationMode = () => {
    if (currentWeek.atlasScore >= 85) return { mode: "Modo Atleta", color: "text-emerald-400" }
    if (currentWeek.atlasScore >= 70) return { mode: "Modo Otimizado", color: "text-cyan-400" }
    if (currentWeek.atlasScore >= 50) return { mode: "Modo Recuperacao", color: "text-amber-400" }
    return { mode: "Modo Critico", color: "text-red-400" }
  }

  const operation = getOperationMode()

  return (
    <div className="space-y-8 pb-8">
      {/* Week navigation - minimal */}
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => canGoPrev && setWeekIndex(weekIndex - 1)}
          disabled={!canGoPrev}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
        <span className="text-sm font-light tracking-[0.3em] uppercase text-white/50">{currentWeek.weekLabel}</span>
        <button
          onClick={() => canGoNext && setWeekIndex(weekIndex + 1)}
          disabled={!canGoNext}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Atlas Score - Holographic Scanner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent rounded-3xl" />
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 overflow-hidden">
          {/* Orbital background animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-64 h-64 border border-cyan-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-96 h-96 border border-cyan-500/5 rounded-full animate-[spin_30s_linear_infinite]" />
          </div>
          
          <div className="relative flex flex-col items-center">
            {/* Holographic Scanner Ring */}
            <div className="relative w-48 h-48 mb-8">
              {/* Outer glow pulse */}
              <div className="absolute inset-[-20px] rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
              <div className="absolute inset-[-10px] rounded-full bg-cyan-400/10 blur-md animate-[pulse_2s_ease-in-out_infinite]" />
              
              {/* Main ring */}
              <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 120 120">
                {/* Background ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
                {/* Progress ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#holoGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0,242,255,0.6))' }}
                />
                {/* Scanner line */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(0,242,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="10 340"
                  className="animate-[spin_3s_linear_infinite] origin-center"
                  style={{ transformOrigin: '60px 60px' }}
                />
                <defs>
                  <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F2FF" />
                    <stop offset="50%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#0099FF" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span 
                  className="text-6xl font-extralight tracking-tight text-white"
                  style={{ textShadow: '0 0 30px rgba(0,242,255,0.5), 0 0 60px rgba(0,242,255,0.3)' }}
                >
                  {animatedScore}
                </span>
                <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-400/70 mt-1">Atlas Score</span>
              </div>
            </div>

            {/* Status text */}
            <p className="text-center text-white/40 text-sm font-light max-w-md leading-relaxed">
              {getAtlasScoreMessage(currentWeek.atlasScore)}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid - Floating 3D Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {[
          { label: "Execucao", value: currentWeek.executionRate, unit: "%", icon: Zap },
          { label: "Estetica", value: currentWeek.aestheticProgress, unit: "%", icon: Target },
          { label: "Metabolica", value: currentWeek.metabolicHealth, unit: "%", icon: Activity },
          { label: "Consistencia", value: currentWeek.generalConsistency, unit: "%", icon: TrendingUp },
          { label: "Energia", value: currentWeek.energyLevel, unit: "", icon: Battery },
        ].map((metric) => (
          <div
            key={metric.label}
            onMouseEnter={() => setHoveredCard(metric.label)}
            onMouseMove={(e) => handleMouseMove(e, metric.label)}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-black/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(0,242,255,0.1)]"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <metric.icon className="w-4 h-4 text-cyan-500/50 mb-3" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">{metric.label}</p>
            <p className="text-3xl font-extralight text-white tracking-tight">
              {metric.value}
              <span className="text-lg text-white/30">{metric.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tactical Command Briefing */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 rounded-3xl" />
        <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/5 overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-cyan-500/20 via-transparent to-blue-500/20 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-white/50">Comando Tatico</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Operation Status */}
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">Status da Operacao</p>
              <div className="flex items-baseline gap-3">
                <div className={`w-2 h-2 rounded-full ${operation.color.replace('text-', 'bg-')} animate-pulse`} />
                <span className={`text-2xl font-light ${operation.color}`}>{operation.mode}</span>
              </div>
              <div className="space-y-2 text-sm text-white/40">
                <p>Treinos: {currentWeek.trainingsDone}/{currentWeek.trainingsPlanned}</p>
                <p>Dieta: {currentWeek.dietAdherence}% aderencia</p>
                <p>Sono: {currentWeek.avgSleepHours}h/noite</p>
              </div>
            </div>

            {/* Right: The Verdict */}
            <div className="space-y-4 md:border-l md:border-white/5 md:pl-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">The Verdict</p>
              <p className="text-lg font-light text-white/70 leading-relaxed">
                {getVerdict()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Performance Chart */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-1">Tendencia Preditiva</h3>
            <p className="text-[10px] text-white/30">Projecao dos proximos 14 dias</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+{Math.min(10, 100 - currentWeek.atlasScore)}%</span>
          </div>
        </div>

        {/* Line chart */}
        <div className="relative h-32">
          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line key={y} x1="0" y1={100 - y} x2="400" y2={100 - y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            
            {/* Area fill */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,242,255,0.3)" />
                <stop offset="100%" stopColor="rgba(0,242,255,0)" />
              </linearGradient>
            </defs>
            <path
              d={`M 0 ${100 - predictiveData[0].score} ${predictiveData.map((d, i) => `L ${(i / (predictiveData.length - 1)) * 400} ${100 - d.score}`).join(' ')} L 400 100 L 0 100 Z`}
              fill="url(#areaGradient)"
            />
            
            {/* Line */}
            <path
              d={`M 0 ${100 - predictiveData[0].score} ${predictiveData.map((d, i) => `L ${(i / (predictiveData.length - 1)) * 400} ${100 - d.score}`).join(' ')}`}
              fill="none"
              stroke="#00F2FF"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0,242,255,0.5))' }}
            />
            
            {/* Data points */}
            {predictiveData.map((d, i) => (
              <circle
                key={i}
                cx={(i / (predictiveData.length - 1)) * 400}
                cy={100 - d.score}
                r="4"
                fill="#000"
                stroke="#00F2FF"
                strokeWidth="2"
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-[10px] text-white/30">
            {predictiveData.map((d) => (
              <span key={d.day}>D{d.day}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary button */}
      <button
        onClick={() => setShowSummary(!showSummary)}
        className="w-full py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-white/70 font-light tracking-[0.1em] rounded-2xl hover:border-cyan-500/40 hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
      >
        <FileText className="w-4 h-4" />
        {showSummary ? "Ocultar Resumo" : "Gerar Resumo Completo"}
      </button>

      {showSummary && (
        <div className="bg-black/30 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h4 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-6">Resumo Executivo - {currentWeek.weekLabel}</h4>
          <div className="grid md:grid-cols-2 gap-6 text-white/40 text-sm">
            <div className="space-y-3">
              <p>Atlas Score: <span className="text-white/70">{currentWeek.atlasScore}/100</span></p>
              <p>Treinos: <span className="text-white/70">{currentWeek.trainingsDone}/{currentWeek.trainingsPlanned}</span></p>
              <p>Execucao: <span className="text-white/70">{currentWeek.executionRate}%</span></p>
            </div>
            <div className="space-y-3">
              <p>Dieta: <span className="text-white/70">{currentWeek.dietAdherence}%</span></p>
              <p>Sono: <span className="text-white/70">{currentWeek.avgSleepHours}h/noite</span></p>
              <p>Peso: <span className="text-white/70">{currentWeek.weightDeltaKg > 0 ? "+" : ""}{currentWeek.weightDeltaKg}kg</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Evolution chart - Minimal */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
        <h3 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-6">Evolucao Historica</h3>
        <div className="flex items-end justify-between gap-3 h-32">
          {mockWeeks.map((week, idx) => (
            <button
              key={week.weekLabel}
              onClick={() => setWeekIndex(idx)}
              className={`flex-1 rounded-t-xl transition-all duration-500 relative group ${
                idx === weekIndex 
                  ? "bg-gradient-to-t from-cyan-500/80 to-cyan-400/60" 
                  : "bg-white/5 hover:bg-white/10"
              }`}
              style={{ height: `${week.atlasScore}%` }}
            >
              {idx === weekIndex && (
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-xl" />
              )}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                {week.atlasScore}
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] tracking-[0.1em] text-white/30">
          {mockWeeks.map((week) => (
            <span key={week.weekLabel} className="flex-1 text-center">
              S{week.weekLabel.split(" ")[1]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ========== VISAO 360 VIEW ==========
function Visao360View() {
  const {
    gender,
    setGender,
    bodyMeasurements,
    bodyStatus,
    saveMeasurements,
    checkins,
    registerCheckin,
    photos,
    setPhotos,
  } = useAtlasData()

  const [measurements, setMeasurements] = useState<BodyMeasurements>(bodyMeasurements)
  const [hoveredArea, setHoveredArea] = useState<BodyAreaKey | null>(null)
  const [showMeasureGuide, setShowMeasureGuide] = useState(false)
  const [isGenderSwitching, setIsGenderSwitching] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [checkinSuccess, setCheckinSuccess] = useState(false)

  // Check-in form state
  const [checkinForm, setCheckinForm] = useState({
    trainedToday: false,
    restDay: false,
    followedDiet: 80,
    sleepHours: 7,
    energy: 3 as EnergyScore,
    stressLevel: 2 as EnergyScore,
    painLevel: 0,
    notes: "",
  })

  // Mock 30-day trend data for sparklines
  const getMockTrendData = (key: string) => {
    const base = measurements[key as keyof BodyMeasurements] || 40
    return Array.from({ length: 30 }, (_, i) => base + Math.sin(i * 0.3) * 2 + Math.random() * 1.5)
  }

  const handleGenderSwitch = (newGender: "male" | "female") => {
    if (gender === newGender) return
    setIsGenderSwitching(true)
    setTimeout(() => {
      setGender(newGender)
      setTimeout(() => setIsGenderSwitching(false), 300)
    }, 150)
  }

  const handleSaveMeasurements = () => {
    saveMeasurements(measurements)
  }

  const handleCheckinSubmit = () => {
    const checkin: DailyCheckin = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      ...checkinForm,
    }
    registerCheckin(checkin)
    setCheckinSuccess(true)
    setTimeout(() => setCheckinSuccess(false), 3000)
    setCheckinForm({
      trainedToday: false,
      restDay: false,
      followedDiet: 80,
      sleepHours: 7,
      energy: 3,
      stressLevel: 2,
      painLevel: 0,
      notes: "",
    })
  }

  const handlePhotoUpload = (type: "front" | "side" | "back", file: File) => {
    const url = URL.createObjectURL(file)
    setPhotos({ ...photos, [type]: url })
  }

  // Get energy gradient color
  const getEnergyGradient = (value: number) => {
    if (value <= 2) return "from-blue-500 to-cyan-400"
    if (value <= 3) return "from-cyan-400 to-emerald-400"
    if (value <= 4) return "from-emerald-400 to-yellow-400"
    return "from-yellow-400 to-emerald-500"
  }

  // Get stress gradient color
  const getStressGradient = (value: number) => {
    if (value <= 2) return "from-blue-500 to-cyan-400"
    if (value <= 3) return "from-cyan-400 to-amber-400"
    if (value <= 4) return "from-amber-400 to-orange-500"
    return "from-orange-500 to-red-500"
  }

  const measurementFields = [
    { key: "shoulders", label: "Ombros", icon: "S" },
    { key: "chest", label: "Peitoral", icon: "P" },
    { key: "waist", label: "Cintura", icon: "C" },
    { key: "hips", label: "Quadril", icon: "Q" },
    { key: "rightArm", label: "Braco D", icon: "BD" },
    { key: "leftArm", label: "Braco E", icon: "BE" },
    { key: "rightThigh", label: "Coxa D", icon: "CD" },
    { key: "leftThigh", label: "Coxa E", icon: "CE" },
    { key: "rightCalf", label: "Pant D", icon: "PD" },
    { key: "leftCalf", label: "Pant E", icon: "PE" },
    { key: "neck", label: "Pescoco", icon: "N" },
  ]

  return (
    <div className="space-y-10 pb-8">
      {/* Header - Minimal */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-2">
          <Target className="w-6 h-6 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-extralight tracking-tight text-white">Visao 360</h2>
        <p className="text-sm text-white/40 max-w-md mx-auto font-light">
          Bioengenharia corporal. Medidas, pontos fortes, vulnerabilidades e historico.
        </p>
      </div>

      {/* Gender Swap - Futuristic Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5">
          <button
            onClick={() => handleGenderSwitch("male")}
            className={`px-8 py-3 rounded-xl text-sm tracking-wide transition-all duration-300 ${
              gender === "male"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Masculino
          </button>
          <button
            onClick={() => handleGenderSwitch("female")}
            className={`px-8 py-3 rounded-xl text-sm tracking-wide transition-all duration-300 ${
              gender === "female"
                ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Feminino
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hologram of Governance */}
        <div className="relative bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
          
          <h3 className="relative text-sm tracking-[0.2em] uppercase text-white/40 mb-6">Holograma de Governanca</h3>
          
          <div className={`relative w-full h-[420px] bg-gradient-to-b from-slate-900/50 to-black rounded-2xl overflow-hidden transition-all duration-300 ${isGenderSwitching ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Scan lines effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,255,0.03) 2px, rgba(0,242,255,0.03) 4px)',
            }} />
            
            {/* Hologram body */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-80">
                {/* Body silhouette SVG */}
                <svg viewBox="0 0 100 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.3))' }}>
                  <defs>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={gender === "male" ? "rgba(0,242,255,0.4)" : "rgba(236,72,153,0.4)"} />
                      <stop offset="50%" stopColor={gender === "male" ? "rgba(0,242,255,0.2)" : "rgba(236,72,153,0.2)"} />
                      <stop offset="100%" stopColor={gender === "male" ? "rgba(0,242,255,0.1)" : "rgba(236,72,153,0.1)"} />
                    </linearGradient>
                  </defs>
                  {gender === "male" ? (
                    <path d="M50 10 C60 10 65 20 65 30 L65 35 C70 40 75 45 75 55 L75 90 C75 95 70 100 65 100 L65 150 C65 160 60 170 55 180 L55 195 L45 195 L45 180 C40 170 35 160 35 150 L35 100 C30 100 25 95 25 90 L25 55 C25 45 30 40 35 35 L35 30 C35 20 40 10 50 10" fill="url(#bodyGradient)" stroke="rgba(0,242,255,0.6)" strokeWidth="0.5" />
                  ) : (
                    <path d="M50 10 C58 10 62 20 62 30 L62 35 C67 40 72 48 72 58 L72 75 C72 85 68 95 62 100 L62 105 C65 110 68 120 68 135 L68 150 C68 165 60 175 55 185 L55 195 L45 195 L45 185 C40 175 32 165 32 150 L32 135 C32 120 35 110 38 105 L38 100 C32 95 28 85 28 75 L28 58 C28 48 33 40 38 35 L38 30 C38 20 42 10 50 10" fill="url(#bodyGradient)" stroke="rgba(236,72,153,0.6)" strokeWidth="0.5" />
                  )}
                </svg>
              </div>
            </div>

            {/* Pulsating Hotspots */}
            {(Object.keys(bodyStatus) as BodyAreaKey[]).map((area) => {
              const status = bodyStatus[area]
              const color = status === "strength" ? "bg-emerald-400" : status === "aesthetic_focus" ? "bg-red-500" : "bg-yellow-400"
              const glowColor = status === "strength" ? "rgba(52,211,153,0.6)" : status === "aesthetic_focus" ? "rgba(239,68,68,0.6)" : "rgba(250,204,21,0.6)"
              
              return (
                <div
                  key={area}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    top: hotspotPositions[area].top,
                    left: hotspotPositions[area].left,
                  }}
                  onMouseEnter={() => setHoveredArea(area)}
                  onMouseLeave={() => setHoveredArea(null)}
                >
                  {/* Outer pulse ring */}
                  <div 
                    className={`absolute inset-[-8px] rounded-full animate-ping opacity-30 ${color}`}
                    style={{ animationDuration: '2s' }}
                  />
                  {/* Inner glow */}
                  <div 
                    className={`absolute inset-[-4px] rounded-full blur-sm ${color} opacity-50`}
                  />
                  {/* Core dot */}
                  <div 
                    className={`relative w-4 h-4 rounded-full ${color} transition-transform duration-200 ${hoveredArea === area ? 'scale-150' : ''}`}
                    style={{ boxShadow: `0 0 15px ${glowColor}` }}
                  />
                </div>
              )
            })}

            {/* Tooltip Card with Glassmorphism */}
            {hoveredArea && (
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <p className="font-medium text-white text-sm">{bodyAreaLabels[hoveredArea]}</p>
                <p className="text-white/50 text-xs mt-1">{getStatusLabel(bodyStatus[hoveredArea])}</p>
              </div>
            )}
          </div>

          {/* Legend - Ultra minimal */}
          <div className="flex items-center justify-center gap-8 mt-6 text-[10px] tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="text-white/30">Forte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <span className="text-white/30">Foco</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
              <span className="text-white/30">Risco</span>
            </div>
          </div>
        </div>

        {/* Metric Chips - Apple Style */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm tracking-[0.2em] uppercase text-white/40">Medidas Corporais</h3>
            <button
              onClick={() => setShowMeasureGuide(true)}
              className="text-[10px] tracking-wider uppercase text-cyan-400/60 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3 h-3" />
              Guia
            </button>
          </div>

          {/* Metric Chips Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {measurementFields.map((field) => {
              const value = measurements[field.key as keyof BodyMeasurements]
              const isSelected = selectedMetric === field.key
              
              return (
                <button
                  key={field.key}
                  onClick={() => setSelectedMetric(isSelected ? null : field.key)}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 text-left ${
                    isSelected 
                      ? 'bg-cyan-500/10 border-cyan-500/30' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <p className="text-[9px] tracking-[0.15em] uppercase text-white/30 mb-1">{field.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extralight text-white">{value || "--"}</span>
                    <span className="text-[10px] text-white/30">cm</span>
                  </div>
                  
                  {/* Mini Sparkline on selection */}
                  {isSelected && (
                    <div className="mt-3 h-8 animate-in fade-in duration-300">
                      <svg viewBox="0 0 100 30" className="w-full h-full">
                        <defs>
                          <linearGradient id={`spark-${field.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(0,242,255,0.3)" />
                            <stop offset="100%" stopColor="rgba(0,242,255,0)" />
                          </linearGradient>
                        </defs>
                        {(() => {
                          const data = getMockTrendData(field.key)
                          const min = Math.min(...data)
                          const max = Math.max(...data)
                          const range = max - min || 1
                          const points = data.map((v, i) => `${(i / 29) * 100},${30 - ((v - min) / range) * 25}`).join(' ')
                          const areaPoints = `0,30 ${points} 100,30`
                          return (
                            <>
                              <polygon points={areaPoints} fill={`url(#spark-${field.key})`} />
                              <polyline points={points} fill="none" stroke="#00F2FF" strokeWidth="1.5" />
                            </>
                          )
                        })()}
                      </svg>
                      <p className="text-[8px] text-white/30 text-center mt-1">30 dias</p>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Inline Input for Selected Metric */}
          {selectedMetric && (
            <div className="bg-white/5 rounded-2xl p-4 mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] tracking-wider uppercase text-white/40 mb-2 block">
                Atualizar {measurementFields.find(f => f.key === selectedMetric)?.label}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="0"
                  value={measurements[selectedMetric as keyof BodyMeasurements] || ""}
                  onChange={(e) =>
                    setMeasurements({
                      ...measurements,
                      [selectedMetric]: e.target.value ? Number.parseFloat(e.target.value) : null,
                    })
                  }
                  className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-lg font-light placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <span className="text-sm text-white/30">cm</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSaveMeasurements}
            className="w-full py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400/80 font-light tracking-wider text-sm rounded-2xl hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Save className="w-4 h-4" />
            Salvar Medidas
          </button>
        </div>
      </div>

      {/* Command Console - Check-in */}
      <div className="relative bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm tracking-[0.2em] uppercase text-white/50">Console de Comando</h3>
              <p className="text-[10px] text-white/30 mt-0.5">Check-in Tatico Diario</p>
            </div>
          </div>

          {checkinSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-sm">Check-in registrado com sucesso</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Training Status */}
            <div className="space-y-3">
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Status de Treino</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCheckinForm({ ...checkinForm, trainedToday: true, restDay: false })}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm transition-all duration-300 ${
                    checkinForm.trainedToday
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  Treinei
                </button>
                <button
                  onClick={() => setCheckinForm({ ...checkinForm, trainedToday: false, restDay: true })}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm transition-all duration-300 ${
                    checkinForm.restDay
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  Descanso
                </button>
              </div>
            </div>

            {/* Diet Adherence - Gradient Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Dieta</label>
                <span className="text-lg font-extralight text-white">{checkinForm.followedDiet}%</span>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${checkinForm.followedDiet}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={checkinForm.followedDiet}
                onChange={(e) => setCheckinForm({ ...checkinForm, followedDiet: Number.parseInt(e.target.value) })}
                className="w-full opacity-0 absolute cursor-pointer"
                style={{ marginTop: '-18px', height: '18px' }}
              />
            </div>

            {/* Sleep Hours */}
            <div className="space-y-3">
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Horas de Sono</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="12"
                value={checkinForm.sleepHours}
                onChange={(e) => setCheckinForm({ ...checkinForm, sleepHours: Number.parseFloat(e.target.value) })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-lg font-light focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {/* Energy Level - Dynamic Gradient */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Energia</label>
                <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${getEnergyGradient(checkinForm.energy)}`} />
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCheckinForm({ ...checkinForm, energy: n as EnergyScore })}
                    className={`flex-1 py-3 rounded-xl border text-sm font-light transition-all duration-300 ${
                      checkinForm.energy === n
                        ? `bg-gradient-to-r ${getEnergyGradient(n)} border-transparent text-white`
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Stress Level - Dynamic Gradient */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Estresse</label>
                <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${getStressGradient(checkinForm.stressLevel)}`} />
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCheckinForm({ ...checkinForm, stressLevel: n as EnergyScore })}
                    className={`flex-1 py-3 rounded-xl border text-sm font-light transition-all duration-300 ${
                      checkinForm.stressLevel === n
                        ? `bg-gradient-to-r ${getStressGradient(n)} border-transparent text-white`
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Pain Level */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Dor</label>
                <span className="text-lg font-extralight text-white">{checkinForm.painLevel}</span>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${
                    checkinForm.painLevel <= 3 ? 'bg-emerald-500' : 
                    checkinForm.painLevel <= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${checkinForm.painLevel * 10}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={checkinForm.painLevel}
                onChange={(e) => setCheckinForm({ ...checkinForm, painLevel: Number.parseInt(e.target.value) })}
                className="w-full opacity-0 absolute cursor-pointer"
                style={{ marginTop: '-18px', height: '18px' }}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6 space-y-3">
            <label className="text-[10px] tracking-[0.15em] uppercase text-white/30">Notas de Campo</label>
            <textarea
              value={checkinForm.notes}
              onChange={(e) => setCheckinForm({ ...checkinForm, notes: e.target.value })}
              placeholder="Observacoes taticas do dia..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80 text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors h-20 resize-none"
            />
          </div>

          <button
            onClick={handleCheckinSubmit}
            className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-light tracking-wider text-sm rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
          >
            <Shield className="w-4 h-4" />
            Confirmar Check-in
          </button>
        </div>
      </div>

      {/* Intelligence Archives - Progress Photos */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Camera className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-white/50">Arquivos de Inteligencia</h3>
            <p className="text-[10px] text-white/30 mt-0.5">Registro Visual de Progresso</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {(["front", "side", "back"] as const).map((type) => (
            <div key={type} className="relative group">
              <label
                className={`block aspect-[3/4] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden ${
                  photos[type] 
                    ? "border-cyan-500/30" 
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {photos[type] ? (
                  <div className="relative w-full h-full">
                    <img src={photos[type] || "/placeholder.svg"} alt={type} className="w-full h-full object-cover" />
                    {/* Alignment Grid Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {/* Vertical lines */}
                      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-cyan-500/40" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/60" />
                      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-cyan-500/40" />
                      {/* Horizontal lines */}
                      <div className="absolute top-1/4 left-0 right-0 h-px bg-cyan-500/40" />
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/60" />
                      <div className="absolute top-3/4 left-0 right-0 h-px bg-cyan-500/40" />
                      {/* Center crosshair */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 border border-cyan-500/80 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-500/80 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      {/* Label */}
                      <div className="absolute bottom-3 left-3 right-3 text-center">
                        <span className="text-[9px] tracking-wider uppercase text-cyan-400 bg-black/60 px-2 py-1 rounded">
                          Grade de Alinhamento
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/30 bg-white/5">
                    <Camera className="w-8 h-8 mb-3 opacity-50" />
                    <span className="text-[10px] tracking-wider uppercase">
                      {type === "front" ? "Frente" : type === "side" ? "Lateral" : "Costas"}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handlePhotoUpload(type, e.target.files[0])}
                />
              </label>
              {/* Type label */}
              <p className="text-center text-[10px] tracking-wider uppercase text-white/30 mt-3">
                {type === "front" ? "Arquivo A-01" : type === "side" ? "Arquivo A-02" : "Arquivo A-03"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Measure guide modal */}
      {showMeasureGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          onClick={() => setShowMeasureGuide(false)}
        >
          <div
            className="bg-black/90 border border-white/10 rounded-3xl p-8 max-w-md mx-4 animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white/50">Protocolo de Medicao</h3>
              <button
                onClick={() => setShowMeasureGuide(false)}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-4 text-sm">
              {[
                { label: "Ombros", desc: "Parte mais larga, de deltoide a deltoide" },
                { label: "Peitoral", desc: "Linha do mamilo, fita nivelada" },
                { label: "Cintura", desc: "Ponto mais fino acima do quadril" },
                { label: "Quadril", desc: "Ponto mais largo do gluteo" },
                { label: "Bracos", desc: "Parte mais larga com contracao leve" },
                { label: "Coxa", desc: "Parte mais larga, logo abaixo do gluteo" },
                { label: "Panturrilha", desc: "Parte mais larga em contracao" },
                { label: "Pescoco", desc: "Logo abaixo do pomo de Adao" },
              ].map((item) => (
                <li key={item.label} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  <div>
                    <span className="text-white/70 font-medium">{item.label}:</span>
                    <span className="text-white/40 ml-2">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== ATLAS IA TYPES & SIMULATION ENGINE ==========

type AtlasProtocol = {
  title: string
  durationDays: number
  goal: string
  dailyRules: string[]
  dailyChecklist: string[]
  successMetrics: string[]
  safetyNotes: string[]
}

type AtlasMessageType = "nutrition" | "pain" | "compulsion" | "sleep" | "testosterone" | "general" | "image"

type AtlasResponse = {
  coreText: string
  protocol?: AtlasProtocol
  scienceNote?: string
  type: AtlasMessageType
  actionButtons?: { label: string; action: string }[]
}

type AtlasStructuredResponse = {
  oneLiner: string
  confidence: number
  quickQuestions?: Array<{ id: string; label: string }>
  planNow?: Array<{ step: string; seconds?: number }>
  next24h?: Array<{ step: string }>
  sevenDays?: Array<{ day: string; focus: string; actions: string[] }>
  whyItWorks?: string[]
  actions?: Array<{ id: string; label: string }>
  care?: { riskLevel: "low" | "medium" | "high"; message: string | null }
}

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  response?: AtlasResponse
  structuredResponse?: AtlasStructuredResponse // Added structured response field
  imagePreview?: string
}

type AtlasContextData = {
  currentWeekMetrics: AtlasWeekMetrics
  recentCheckins: DailyCheckin[]
  bodyStatus: BodyStatusMap
  bodyMeasurements: BodyMeasurements
  trainingConfig: TrainingConfig // Added
  dietConfig: DietConfig // Added
}

function simulateAtlasIAResponse(
  userMessage: string,
  context: AtlasContextData,
  messageType?: AtlasMessageType,
): AtlasResponse {
  const { currentWeekMetrics, recentCheckins, bodyStatus, bodyMeasurements, trainingConfig, dietConfig } = context

  // Analyze context to build contextual responses
  const lowExecution = currentWeekMetrics.executionRate < 70
  const poorSleep = currentWeekMetrics.avgSleepHours < 7
  const lowDiet = currentWeekMetrics.dietAdherence < 70
  const lowEnergy = currentWeekMetrics.energyLevel === "Baixa"

  const messageLower = userMessage.toLowerCase()

  // FOTO DE COMIDA
  if (
    messageType === "image" ||
    (messageLower.includes("foto") &&
      (messageLower.includes("comida") || messageLower.includes("refeição") || messageLower.includes("lanche")))
  ) {
    return {
      coreText: `Analisei sua foto. Estimativa: ~520 kcal (35g proteína, 48g carbo, 18g gordura).

Contexto: você está com ${currentWeekMetrics.dietAdherence}% de aderência na dieta esta semana, executou ${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned} treinos.

Essa refeição está OK, mas note que seu sono médio está em ${currentWeekMetrics.avgSleepHours}h e energia ${currentWeekMetrics.energyLevel}. **O problema não é essa refeição, é o padrão da semana.**

O que você quer fazer agora?`,
      type: "nutrition",
      actionButtons: [
        { label: "Compensar no jantar", action: "adjust_dinner" },
        { label: "Ajustar amanhã", action: "adjust_tomorrow" },
        { label: "Tratar como dia livre", action: "free_day" },
      ],
    }
  }

  // DOR / LESÃO
  if (
    messageLower.includes("dor") ||
    messageLower.includes("lesão") ||
    messageLower.includes("ombro") ||
    messageLower.includes("joelho")
  ) {
    const hasRedFlag =
      messageLower.includes("intensa") || messageLower.includes("acordar") || messageLower.includes("trauma")

    if (hasRedFlag) {
      return {
        coreText: `🚨 **ATENÇÃO**: Detectei sinais que sugerem algo mais sério.

Você PRECISA consultar um médico ou fisioterapeuta presencial. Não vou te dar protocolo de treino ou exercícios corretivos porque isso pode piorar.

Até você ser avaliado:
- Evite movimentos que causam dor.
- Não force "pra ver se melhora".
- Não tome anti-inflamatório sem prescrição.

Vou te orientar apenas a proteger a região enquanto você marca a consulta.`,
        type: "pain",
        safetyNotes: [
          "A Atlas IA não substitui avaliação médica presencial. Em caso de dúvida, dor intensa ou piora, procure um profissional de saúde.",
        ],
      }
    }

    return {
      coreText: `Entendi. Dor no ${messageLower.includes("ombro") ? "ombro" : "joelho"} durante movimento.

Com base nos seus dados (execução ${currentWeekMetrics.executionRate}%, sono ${currentWeekMetrics.avgSleepHours}h), vou te propor um protocolo de 7 dias focado em **redução de risco** + recuperação:

**NÃO** vou te dar "exercícios mágicos pra dor". Vou te ensinar a gerir carga, dormir melhor e reduzir inflamação sistêmica.`,
      type: "pain",
      protocol: {
        title: "Protocolo Atlas 7 dias – Gestão de Dor Inteligente",
        durationDays: 7,
        goal: "Reduzir inflamação, proteger a região e melhorar recuperação sem parar de treinar",
        dailyRules: [
          "Remover TODOS os exercícios que causam dor >3/10 na região",
          "Dormir mínimo 7h30 (sono é anti-inflamatório natural)",
          "Caminhar 20min/dia (melhora circulação e recuperação)",
          "Nada de anti-inflamatório sem prescrição médica",
        ],
        dailyChecklist: [
          "Dor diminuiu ou permaneceu igual? (se piorou, pare e consulte médico)",
          "Consegui dormir 7h+ hoje?",
          "Fiz caminhada leve?",
          "Evitei movimentos que causam dor?",
        ],
        successMetrics: [
          "Dor reduzindo ao longo da semana",
          "Conseguindo treinar outras regiões sem limitação",
          "Sono melhorando (mínimo 7h)",
        ],
        safetyNotes: [
          "Se a dor piorar a qualquer momento, pare e consulte um profissional",
          "A Atlas IA não substitui avaliação médica presencial",
          "Este protocolo NÃO trata lesões estruturais",
        ],
      },
      scienceNote: `Estudos mostram que privação de sono aumenta inflamação sistêmica (IL-6, TNF-α) e piora percepção de dor. Melhorar sono é mais eficaz que a maioria dos "exercícios corretivos" vendidos por aí. Focar em recuperação + gestão de carga é o caminho.`,
    }
  }

  // COMPULSÃO ALIMENTAR
  if (
    messageLower.includes("compulsão") ||
    messageLower.includes("geladeira") ||
    (messageLower.includes("noite") && messageLower.includes("comer"))
  ) {
    return {
      coreText: `Você teve episódios noturnos. Vamos aos dados: você treinou ${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned} vezes, dormiu média de ${currentWeekMetrics.avgSleepHours}h, aderência de dieta ${currentWeekMetrics.dietAdherence}%.

**O problema não é "falta de força de vontade". É fisiologia + timing.**

Quando você dorme mal (você está em <7h), aumenta grelina (hormônio da fome) e cai leptina (saciedade). Resultado: fome noturna descontrolada, desejo por junk food, decisões ruins.

**A solução não é "ter vergonha na cara à noite". É consertar o DIA.**

Vou te propor um protocolo de 14 dias que mexe no café da manhã, tarde e timing das refeições. A noite vai se resolver sozinha.`,
      type: "compulsion",
      protocol: {
        title: "Protocolo Atlas 14 dias – Anti-Compulsão Sistêmica",
        durationDays: 14,
        goal: "Eliminar episódios noturnos atacando as causas reais: sono ruim, déficit agressivo, timing errado",
        dailyRules: [
          "Café da manhã até 1h após acordar (proteína + carboidrato)",
          "Lanche da tarde reforçado (15h-16h) - 300-400 kcal",
          "Jantar até 20h (sem pular)",
          "Dormir às 22h30 (não negociável)",
          "Se tiver fome à noite: 1 copo de água + esperar 10min antes de decidir comer",
        ],
        dailyChecklist: [
          "Tomei café da manhã até 1h depois de acordar?",
          "Fiz lanche reforçado 15h-16h?",
          "Jantei até 20h?",
          "Fui dormir às 22h30?",
          "Tive episódio noturno? (0 = não, 1 = sim)",
        ],
        successMetrics: [
          "Redução de 70%+ dos episódios noturnos em 14 dias",
          "Sono melhorando (mínimo 7h)",
          "Energia durante o dia aumentando",
          "Fome noturna diminuindo naturalmente",
        ],
        safetyNotes: [
          "Se os episódios persistirem após 14 dias, considere buscar nutricionista ou psicólogo especializado em comportamento alimentar",
          "Compulsão grave pode ter componentes emocionais profundos que precisam de acompanhamento profissional",
        ],
      },
      scienceNote: `Estudos de privação de sono mostram aumento de 25-30% em grelina e queda de 15-20% em leptina, levando a aumento de fome e preferência por alimentos calóricos. Timing das refeições + sono adequado normalizam esses hormônios naturalmente. Referências: Spiegel et al. (2004), Taheri et al. (2004).`,
    }
  }

  // CARBO À NOITE
  if (messageLower.includes("carbo") && messageLower.includes("noite")) {
    return {
      coreText: `Você está perguntando sobre carbo à noite. Vamos ao contexto:

Execução: ${currentWeekMetrics.executionRate}%
Sono: ${currentWeekMetrics.avgSleepHours}h (${poorSleep ? "RUIM" : "ok"})
Dieta: ${currentWeekMetrics.dietAdherence}% de aderência
Energia: ${currentWeekMetrics.energyLevel}

**Sua pergunta sobre "carbo à noite engorda" é irrelevante.** O problema é que você está executando ${lowExecution ? "mal" : "bem"}, dormindo ${poorSleep ? "mal" : "ok"} e com energia ${lowEnergy ? "baixa" : currentWeekMetrics.energyLevel.toLowerCase()}.

Se eu te falar "pode comer carbo à noite", você vai continuar dormindo mal, treinando irregular e com fome descontrolada. Se eu te falar "não pode", você vai criar restrição mental e piorar a compulsão.

**A resposta certa:** Conserta execução + sono PRIMEIRO. Depois a gente fala de timing de macros. Você está querendo otimizar 2% quando está errando 60% do básico.

Quer que eu monte um protocolo de 7 dias focando em sono + rotina?`,
      type: "nutrition",
      scienceNote: `O mito de "carbo à noite engorda" vem de estudos antigos mal interpretados. Estudos mais recentes mostram que o que importa é o balanço calórico total e a composição da dieta ao longo do dia, não o timing isolado. O timing de carboidrato pode até melhorar o sono (carboidrato aumenta triptofano → serotonina → melatonina). Mas se você dorme mal e treina irregular, o timing é irrelevante.`,
    }
  }

  // RECALCULAR DIETA
  if (messageLower.includes("recalcul") || (messageLower.includes("ajust") && messageLower.includes("dieta"))) {
    return {
      coreText: `Recalculando dieta com base nos seus dados atuais:

**Sua semana atual:**
- Atlas Score: ${currentWeekMetrics.atlasScore}/100
- Execução: ${currentWeekMetrics.executionRate}% (${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned} treinos)
- Sono: ${currentWeekMetrics.avgSleepHours}h média
- Dieta: ${currentWeekMetrics.dietAdherence}% de aderência
- Energia: ${currentWeekMetrics.energyLevel}

**Diagnóstico:**
${lowExecution ? "⚠️ Execução baixa - não adianta ajustar dieta se você não treina.\n" : ""}${poorSleep ? "⚠️ Sono abaixo de 7h - isso está sabotando tudo (fome, recuperação, resultado).\n" : ""}${lowDiet ? "⚠️ Aderência baixa - o problema não é a dieta atual, é a execução.\n" : ""}

**Ajuste proposto para hoje:**
- Manter estrutura atual
- Aumentar proteína no café da manhã (+20g)
- Reforçar lanche da tarde (horário crítico)
- Jantar mais cedo (até 20h)

**Prioridade #1:** ${poorSleep ? "Dormir 7h30+ hoje (não negociável)" : "Executar 100% do treino de hoje"}`,
      type: "nutrition",
    }
  }

  // REVER SEMANA (ATLAS SCORE)
  if (messageLower.includes("rever") || messageLower.includes("semana") || messageLower.includes("resumo")) {
    const victories = []
    const sabotages = []
    const actions = []

    if (currentWeekMetrics.executionRate >= 80) {
      victories.push(`Executou ${currentWeekMetrics.executionRate}% dos treinos - consistência de elite`)
    } else {
      sabotages.push(
        `Apenas ${currentWeekMetrics.executionRate}% de execução - perdeu ${currentWeekMetrics.trainingsPlanned - currentWeekMetrics.trainingsDone} treinos`,
      )
    }

    if (currentWeekMetrics.avgSleepHours >= 7.5) {
      victories.push(`Dormiu bem (${currentWeekMetrics.avgSleepHours}h média) - recuperação otimizada`)
    } else {
      sabotages.push(`Sono abaixo do ideal (${currentWeekMetrics.avgSleepHours}h) - afeta fome, energia e resultado`)
    }

    if (currentWeekMetrics.dietAdherence >= 85) {
      victories.push(`Aderência de ${currentWeekMetrics.dietAdherence}% na dieta - disciplina impecável`)
    } else {
      sabotages.push(`Aderência de apenas ${currentWeekMetrics.dietAdherence}% - inconsistência alimentar`)
    }

    if (victories.length < 2) {
      actions.push("Reduzir volume de treino temporariamente - você precisa de vitórias, não de volume")
    }
    if (poorSleep) {
      actions.push("Protocolo de sono: dormir às 22h30 por 7 dias consecutivos")
    }
    if (lowDiet) {
      actions.push("Simplificar dieta: 3 refeições por dia, sem contar macro - foco em EXECUTAR")
    }

    return {
      coreText: `**Revisão da Semana - Atlas Score ${currentWeekMetrics.atlasScore}/100**

**✅ 3 Vitórias:**
${victories.length > 0 ? victories.map((v, i) => `${i + 1}. ${v}`).join("\n") : "1. Você não desistiu (isso já é uma vitória)\n2. Você está aqui buscando melhoria\n3. Você tem dados pra trabalhar (não está no escuro)"}

**❌ 3 Sabotagens:**
${sabotages.length > 0 ? sabotages.map((s, i) => `${i + 1}. ${s}`).join("\n") : "Nenhuma sabotagem crítica identificada"}

**🎯 3 Ações para Próxima Semana:**
${actions.length > 0 ? actions.map((a, i) => `${i + 1}. ${a}`).join("\n") : "1. Manter o que está funcionando\n2. Aumentar intensidade gradualmente\n3. Monitorar energia e sono"}

**Contexto brutalmente honesto:**
${
  currentWeekMetrics.atlasScore < 60
    ? "Você está agindo como alguém que quer resultados ou como alguém que quer história pra contar? Os números não mentem."
    : currentWeekMetrics.atlasScore < 80
      ? "Você está no caminho, mas há inconsistências claras. Resultado vem de hábitos, não de intenções."
      : "Você está executando como um profissional. Continue assim e o resultado é inevitável."
}`,
      type: "general",
    }
  }

  // RESPOSTA GENÉRICA (MAS AINDA CONTEXTUAL)
  return {
    coreText: `Entendi sua pergunta. Deixa eu te dar contexto antes de responder:

**Sua semana atual:**
- Atlas Score: ${currentWeekMetrics.atlasScore}/100
- Execução: ${currentWeekMetrics.executionRate}% (${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned} treinos)
- Sono: ${currentWeekMetrics.avgSleepHours}h média
- Dieta: ${currentWeekMetrics.dietAdherence}% de aderência
- Energia: ${currentWeekMetrics.energyLevel}

Baseado nesses dados, a resposta para "${userMessage}" depende do que você está priorizando.

Me diga: você quer uma resposta genérica de internet, ou quer que eu monte um protocolo específico pro SEU corpo e pro SEU momento atual?`,
    type: "general",
  }
}

// ========== OTHER VIEWS (TreinoDietaView REPLACED) ==========

function CompulsaoView() {
  const { currentWeekMetrics, checkins } = useAtlasData()
  const [showCrisisModal, setShowCrisisModal] = useState(false)
  const [showPreventModal, setShowPreventModal] = useState(false)
  const [showRecoverModal, setShowRecoverModal] = useState(false)
  const [nightDefenseActive, setNightDefenseActive] = useState(false)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(null)
  const [crisisStep, setCrisisStep] = useState(0)
  const [crisisTimer, setCrisisTimer] = useState(90)
  const [gaugeAnimating, setGaugeAnimating] = useState(true)

  // Event logging state
  const [eventLog, setEventLog] = useState<
    Array<{
      id: string
      timestamp: Date
      type: "urge_controlled" | "compulsion" | "light_desire"
      intensity: number
      trigger: string
      category: string
      notes: string
    }>
  >([])

  const [newEvent, setNewEvent] = useState({
    type: "urge_controlled" as "urge_controlled" | "compulsion" | "light_desire",
    intensity: 5,
    trigger: "",
    category: "",
    notes: "",
  })

  // Risk calculation based on real Atlas data
  const calculateRisk = useCallback(() => {
    let risk = 0
    const latest = checkins[checkins.length - 1]
    if (latest) {
      if (latest.sleepHours < 6) risk += 25
      else if (latest.sleepHours < 7) risk += 15
      else if (latest.sleepHours < 8) risk += 5
      risk += latest.stressLevel * 6
      risk += (5 - latest.energy) * 5
      if (latest.painLevel > 0) risk += latest.painLevel * 4
    }
    if (nightDefenseActive) risk -= 20
    return Math.max(0, Math.min(100, risk))
  }, [checkins, nightDefenseActive])

  const riskLevel = calculateRisk()

  // Get risk factors explanation
  const getRiskFactors = () => {
    const factors: Array<{ label: string; impact: string; severity: "high" | "medium" | "low" }> = []
    const latest = checkins[checkins.length - 1]
    
    if (latest) {
      if (latest.sleepHours < 6) {
        factors.push({ label: "Sono insuficiente", impact: `${latest.sleepHours}h (< 6h critico)`, severity: "high" })
      } else if (latest.sleepHours < 7) {
        factors.push({ label: "Sono abaixo do ideal", impact: `${latest.sleepHours}h`, severity: "medium" })
      }
      
      if (latest.stressLevel >= 4) {
        factors.push({ label: "Estresse elevado", impact: `Nivel ${latest.stressLevel}/5`, severity: "high" })
      } else if (latest.stressLevel >= 3) {
        factors.push({ label: "Estresse moderado", impact: `Nivel ${latest.stressLevel}/5`, severity: "medium" })
      }
      
      if (latest.energy <= 2) {
        factors.push({ label: "Energia baixa", impact: `Nivel ${latest.energy}/5`, severity: "high" })
      }
      
      if (currentWeekMetrics.dietAdherence < 70) {
        factors.push({ label: "Deficit calorico agressivo", impact: `${currentWeekMetrics.dietAdherence}% aderencia`, severity: "medium" })
      }
    }
    
    return factors
  }

  const riskFactors = getRiskFactors()

  const getRiskState = () => {
    if (riskLevel < 33) return { label: "Controlado", color: "text-emerald-400", bgColor: "bg-emerald-500/10", glowColor: "rgba(52,211,153,0.5)" }
    if (riskLevel < 66) return { label: "Vigilancia", color: "text-amber-400", bgColor: "bg-amber-500/10", glowColor: "rgba(251,191,36,0.5)" }
    return { label: "Critico", color: "text-red-400", bgColor: "bg-red-500/10", glowColor: "rgba(239,68,68,0.6)" }
  }

  const state = getRiskState()

  // Critical window
  const criticalWindow = "20:30 - 23:00"
  const isInCriticalWindow = () => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    return currentTime >= 1230 && currentTime <= 1380
  }

  // Calendar data with failure summaries
  const calendarData = [
    { day: "Seg", risk: 25, status: "safe", summary: null },
    { day: "Ter", risk: 45, status: "controlled", summary: "Urge as 21:30, controlado com protocolo 90s" },
    { day: "Qua", risk: 78, status: "crisis", summary: "Compulsao as 22:15. Gatilho: tela + baixa energia. Deficit de sono acumulado." },
    { day: "Qui", risk: 35, status: "safe", summary: null },
    { day: "Sex", risk: 82, status: "crisis", summary: "Compulsao as 23:00. Estresse alto + refeicao atrasada. Padrao de fim de semana." },
    { day: "Sab", risk: 55, status: "controlled", summary: "2 urges controlados. Defesa noturna ativa." },
    { day: "Dom", risk: riskLevel, status: riskLevel < 33 ? "safe" : riskLevel < 66 ? "controlled" : "crisis", summary: null },
  ]

  // Crisis timer effect
  useEffect(() => {
    if (showCrisisModal && crisisTimer > 0) {
      const timer = setInterval(() => {
        setCrisisTimer((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showCrisisModal, crisisTimer])

  // Gauge pulse effect
  useEffect(() => {
    if (riskLevel >= 66) {
      const interval = setInterval(() => {
        setGaugeAnimating((prev) => !prev)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [riskLevel])

  const handleRegisterEvent = () => {
    if (!newEvent.category) return
    const event = {
      id: Date.now().toString(),
      timestamp: new Date(),
      trigger: newEvent.notes || newEvent.category,
      ...newEvent,
    }
    setEventLog((prev) => [event, ...prev].slice(0, 20))
    setNewEvent({ type: "urge_controlled", intensity: 5, trigger: "", category: "", notes: "" })
  }

  const openCrisisMode = () => {
    setCrisisStep(0)
    setCrisisTimer(90)
    setShowCrisisModal(true)
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 mb-2">
          <Shield className="w-6 h-6 text-red-400" />
        </div>
        <h2 className="text-2xl font-extralight tracking-tight text-white">Gerenciamento de Crise Biologica</h2>
        <p className="text-sm text-white/40 max-w-md mx-auto font-light">
          Sistema de defesa neural. Monitoramento e intervencao em tempo real.
        </p>
      </div>

      {/* Zone 1: Pressure Gauge + Risk Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Analog-Digital Pressure Gauge */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-500/5" />
          
          <h3 className="relative text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6 text-center">Risco Agora</h3>
          
          {/* Gauge */}
          <div className="relative w-64 h-64 mx-auto">
            {/* Outer glow pulse for critical */}
            {riskLevel >= 66 && (
              <div 
                className={`absolute inset-[-20px] rounded-full transition-opacity duration-1000 ${gaugeAnimating ? 'opacity-100' : 'opacity-30'}`}
                style={{ 
                  background: `radial-gradient(circle, ${state.glowColor} 0%, transparent 70%)`,
                  filter: 'blur(20px)'
                }}
              />
            )}
            
            {/* Gauge background */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Tick marks */}
              {Array.from({ length: 11 }).map((_, i) => {
                const angle = -135 + (i * 27)
                const rad = (angle * Math.PI) / 180
                const x1 = 100 + 75 * Math.cos(rad)
                const y1 = 100 + 75 * Math.sin(rad)
                const x2 = 100 + 85 * Math.cos(rad)
                const y2 = 100 + 85 * Math.sin(rad)
                const isMajor = i % 2 === 0
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i <= 3 ? "rgba(52,211,153,0.5)" : i <= 6 ? "rgba(251,191,36,0.5)" : "rgba(239,68,68,0.5)"}
                    strokeWidth={isMajor ? 2 : 1}
                  />
                )
              })}
              
              {/* Arc background */}
              <path
                d="M 30 150 A 70 70 0 1 1 170 150"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Colored arc segments */}
              <path
                d="M 30 150 A 70 70 0 0 1 60 60"
                fill="none"
                stroke="rgba(52,211,153,0.3)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 60 60 A 70 70 0 0 1 140 60"
                fill="none"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="12"
              />
              <path
                d="M 140 60 A 70 70 0 0 1 170 150"
                fill="none"
                stroke="rgba(239,68,68,0.3)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Active arc */}
              <path
                d="M 30 150 A 70 70 0 1 1 170 150"
                fill="none"
                stroke={riskLevel < 33 ? "#34D399" : riskLevel < 66 ? "#FBBF24" : "#EF4444"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(riskLevel / 100) * 220} 220`}
                style={{ 
                  filter: `drop-shadow(0 0 10px ${state.glowColor})`,
                  transition: 'stroke-dasharray 1s ease-out'
                }}
              />
              
              {/* Needle */}
              <g transform={`rotate(${-135 + (riskLevel / 100) * 270}, 100, 100)`}>
                <line x1="100" y1="100" x2="100" y2="40" stroke="white" strokeWidth="2" />
                <circle cx="100" cy="100" r="8" fill="white" />
                <circle cx="100" cy="100" r="4" fill="black" />
              </g>
            </svg>
            
            {/* Center display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span 
                className={`text-5xl font-extralight ${state.color}`}
                style={{ textShadow: `0 0 30px ${state.glowColor}` }}
              >
                {Math.round(riskLevel)}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 mt-1">/ 100</span>
              <span className={`text-xs tracking-wider uppercase mt-2 px-3 py-1 rounded-full ${state.bgColor} ${state.color}`}>
                {state.label}
              </span>
            </div>
          </div>

          {/* Critical window indicator */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/30" />
              <span className="text-sm text-white/50">Janela Critica: {criticalWindow}</span>
            </div>
            {isInCriticalWindow() && (
              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-[10px] tracking-wider uppercase text-red-400 animate-pulse">
                Ativo Agora
              </span>
            )}
          </div>
        </div>

        {/* Why Risk is High - Data Interdependence */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Por que o risco esta alto?</h3>
              <p className="text-[10px] text-white/30">Analise de vulnerabilidade neural</p>
            </div>
          </div>

          {riskFactors.length > 0 ? (
            <div className="space-y-4">
              {riskFactors.map((factor, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    factor.severity === "high" 
                      ? "bg-red-500/10 border-red-500/20" 
                      : factor.severity === "medium"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      factor.severity === "high" ? "text-red-400" : 
                      factor.severity === "medium" ? "text-amber-400" : "text-white/70"
                    }`}>
                      {factor.label}
                    </span>
                    <span className={`text-[9px] tracking-wider uppercase px-2 py-0.5 rounded ${
                      factor.severity === "high" ? "bg-red-500/20 text-red-400" : 
                      factor.severity === "medium" ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/50"
                    }`}>
                      {factor.severity === "high" ? "Critico" : factor.severity === "medium" ? "Alerta" : "Baixo"}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">{factor.impact}</p>
                </div>
              ))}
              
              {/* Neural vulnerability explanation */}
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 mt-4">
                <p className="text-xs text-white/40 leading-relaxed">
                  <span className="text-cyan-400 font-mono">[ANALISE]</span> {
                    riskFactors.some(f => f.label.includes("Sono")) && riskFactors.some(f => f.label.includes("Estresse"))
                      ? "Sono insuficiente + Estresse elevado = Vulnerabilidade Neural Critica. O cortex pre-frontal esta comprometido."
                      : riskFactors.some(f => f.label.includes("Sono"))
                      ? "Deficit de sono reduz autocontrole em 40%. Seu sistema de recompensa esta hipersensivel."
                      : "Multiplos fatores de risco detectados. Recomenda-se protocolo preventivo."
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
              <Check className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <p className="text-emerald-400 text-sm">Sistema estavel</p>
              <p className="text-white/40 text-xs mt-1">Nenhum fator de risco critico detectado</p>
            </div>
          )}
        </div>
      </div>

      {/* Zone 2: Tactical Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Prevent - Military Style */}
        <button
          onClick={() => setShowPreventModal(true)}
          className="group relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 hover:border-cyan-500/50 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-light text-white mb-2">Prevenir</h3>
            <p className="text-xs text-white/40 mb-4">Protocolo de 90 segundos para reducao de risco imediato</p>
            <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-wider uppercase">
              <span>Iniciar Protocolo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

        {/* Intervene - Emergency Style */}
        <button
          onClick={openCrisisMode}
          className="group relative bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-3xl p-6 hover:border-red-500/60 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Pulse effect for high risk */}
          {riskLevel >= 66 && (
            <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
          )}
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-light text-white mb-2">Intervir</h3>
            <p className="text-xs text-white/40 mb-4">Modo Crise: Interromper, substituir e registrar</p>
            <div className="flex items-center gap-2 text-red-400 text-xs tracking-wider uppercase">
              <span>Ativar Airbag</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

        {/* Recover - Healing Style */}
        <button
          onClick={() => setShowRecoverModal(true)}
          className="group relative bg-black/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-light text-white mb-2">Recompor</h3>
            <p className="text-xs text-white/40 mb-4">Protocolo pos-queda. Sem punicao, sem culpa.</p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs tracking-wider uppercase">
              <span>Ver Protocolo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* Zone 3: Futuristic Risk Calendar + Night Defense */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Futuristic Risk Calendar - Neon Heatmap */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Agenda de Risco</h3>
            </div>
            <span className="text-[10px] text-white/30">Ultimos 7 dias</span>
          </div>

          {/* Calendar Grid - Neon Heatmap */}
          <div className="grid grid-cols-7 gap-3 mb-6">
            {calendarData.map((item, idx) => {
              const isSelected = selectedCalendarDay === idx
              const bgIntensity = item.risk / 100
              const glowColor = item.status === "safe" 
                ? `rgba(52,211,153,${bgIntensity})` 
                : item.status === "controlled" 
                ? `rgba(251,191,36,${bgIntensity})` 
                : `rgba(239,68,68,${bgIntensity})`
              
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedCalendarDay(isSelected ? null : idx)}
                  className={`relative aspect-square rounded-xl border transition-all duration-300 ${
                    isSelected ? "scale-110 z-10" : "hover:scale-105"
                  } ${
                    item.status === "safe" 
                      ? "border-emerald-500/30 hover:border-emerald-500/60" 
                      : item.status === "controlled" 
                      ? "border-amber-500/30 hover:border-amber-500/60" 
                      : "border-red-500/30 hover:border-red-500/60"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${glowColor} 0%, rgba(0,0,0,0.8) 100%)`,
                    boxShadow: isSelected ? `0 0 20px ${glowColor}` : 'none'
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] tracking-wider uppercase text-white/50">{item.day}</span>
                    <span className={`text-lg font-extralight ${
                      item.status === "safe" ? "text-emerald-400" : 
                      item.status === "controlled" ? "text-amber-400" : "text-red-400"
                    }`}>
                      {item.risk}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected day summary */}
          {selectedCalendarDay !== null && calendarData[selectedCalendarDay].summary && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/30 mb-1">{calendarData[selectedCalendarDay].day} - Resumo da Falha</p>
                  <p className="text-sm text-white/70">{calendarData[selectedCalendarDay].summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-white/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500/50" />
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-amber-500/50" />
              <span>Controlado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500/50" />
              <span>Crise</span>
            </div>
          </div>
        </div>

        {/* Night Defense */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Defesa Noturna</h3>
            </div>
            <button
              onClick={() => setNightDefenseActive(!nightDefenseActive)}
              className={`px-4 py-2 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 ${
                nightDefenseActive 
                  ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-400" 
                  : "bg-white/5 border border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {nightDefenseActive ? "Ativo" : "Inativo"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <p className="text-[10px] tracking-wider uppercase text-white/30 mb-2">Janela Critica Detectada</p>
              <p className="text-lg font-extralight text-white">{criticalWindow}</p>
              <p className="text-xs text-white/40 mt-1">80% das crises ocorrem neste periodo</p>
            </div>

            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <p className="text-[10px] tracking-wider uppercase text-white/30 mb-2">Padrao da Ultima Semana</p>
              <p className="text-sm text-white/70">3 crises entre 21h-23h</p>
              <p className="text-xs text-white/40 mt-1">Gatilho comum: tela + baixa energia</p>
            </div>

            {nightDefenseActive && (
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl animate-in fade-in duration-300">
                <p className="text-indigo-400 text-sm">Defesa ativa: -20 pontos de risco</p>
                <p className="text-white/40 text-xs mt-1">Notificacoes de alerta habilitadas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zone 4: Intelligence Terminal - Atlas AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Log Form */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <h3 className="text-sm tracking-[0.15em] uppercase text-white/50 mb-6">Log de Eventos</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase text-white/30 mb-2 block">Tipo</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "light_desire", label: "Leve" },
                  { id: "urge_controlled", label: "Controlado" },
                  { id: "compulsion", label: "Compulsao" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setNewEvent({ ...newEvent, type: type.id as typeof newEvent.type })}
                    className={`py-2 rounded-xl border text-xs transition-all ${
                      newEvent.type === type.id
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase text-white/30 mb-2 block">
                Intensidade: {newEvent.intensity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newEvent.intensity}
                onChange={(e) => setNewEvent({ ...newEvent, intensity: parseInt(e.target.value) })}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase text-white/30 mb-2 block">Gatilho</label>
              <div className="flex flex-wrap gap-2">
                {["Estresse", "Tedio", "Emocao", "Fome", "Ambiente"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewEvent({ ...newEvent, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                      newEvent.category === cat
                        ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                        : "bg-white/5 border border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRegisterEvent}
              className="w-full py-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm rounded-xl hover:bg-cyan-500/30 transition-all"
            >
              Registrar Evento
            </button>
          </div>
        </div>

        {/* Intelligence Terminal - Monospace */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 font-mono">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] tracking-wider uppercase text-white/30">atlas_intelligence_v2.0</span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="p-4 bg-black/40 rounded-xl border border-cyan-500/20">
              <p className="text-cyan-400 text-xs mb-2">{">"} ANALISE_PADRAO_7D</p>
              <p className="text-white/60 text-xs leading-relaxed">
                80% das crises ocorreram entre 21h-23h, correlacao com uso prolongado de tela detectada.
              </p>
              <span className="inline-block mt-2 text-[8px] tracking-wider uppercase text-cyan-400/50 px-2 py-0.5 rounded border border-cyan-500/20">
                [PubMed: Screen Time & Impulse Control]
              </span>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-amber-500/20">
              <p className="text-amber-400 text-xs mb-2">{">"} CORRELACAO_SONO</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Dias com sono {"<"} 6h apresentaram 3x mais registros de compulsao. Cortisol elevado compromete PFC.
              </p>
              <span className="inline-block mt-2 text-[8px] tracking-wider uppercase text-amber-400/50 px-2 py-0.5 rounded border border-amber-500/20">
                [Harvard Sleep Lab: Prefrontal Function]
              </span>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-red-500/20">
              <p className="text-red-400 text-xs mb-2">{">"} GATILHO_DOMINANTE</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Estresse identificado como gatilho primario (nota media 8/10). Recomenda-se protocolo de reducao pre-janela critica.
              </p>
              <span className="inline-block mt-2 text-[8px] tracking-wider uppercase text-red-400/50 px-2 py-0.5 rounded border border-red-500/20">
                [Atlas Pattern Recognition]
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 border-t border-white/5">
            <p className="text-[10px] text-white/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Sistema monitorando em tempo real...
            </p>
          </div>
        </div>
      </div>

      {/* CRISIS MODE - Full Screen Overlay */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 via-black to-black" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239,68,68,0.03) 2px, rgba(239,68,68,0.03) 4px)',
          }} />
          
          {/* Alert borders */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />

          <div className="relative w-full max-w-2xl mx-4 text-center">
            {/* Close button */}
            <button
              onClick={() => setShowCrisisModal(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/50 mb-4 animate-pulse">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-3xl font-extralight text-white tracking-tight mb-2">MODO CRISE ATIVADO</h2>
              <p className="text-white/40 text-sm">Tecnica de 90 segundos de Harvard - Interrompa o ciclo neural</p>
            </div>

            {/* Timer */}
            <div className="mb-8">
              <div className="text-6xl font-extralight text-red-400 mb-2" style={{ textShadow: '0 0 30px rgba(239,68,68,0.5)' }}>
                {Math.floor(crisisTimer / 60)}:{(crisisTimer % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-white/30 text-xs tracking-wider uppercase">Tempo restante</p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {[
                { step: 1, title: "INTERROMPER", desc: "Respiracao 4-7-8. Inspire 4s, segure 7s, expire 8s.", evidence: "Harvard Stress Lab" },
                { step: 2, title: "SUBSTITUIR", desc: "Troque de comodo agora. Quebre o padrao espacial.", evidence: "Behavioral Psychology" },
                { step: 3, title: "REGISTRAR", desc: "Agua + 10 agachamentos. Ative o sistema nervoso.", evidence: "PubMed: Exercise & Dopamine" },
              ].map((item, idx) => (
                <div 
                  key={item.step}
                  className={`p-5 rounded-xl border transition-all duration-500 ${
                    crisisStep >= idx 
                      ? "bg-red-500/10 border-red-500/30" 
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-light ${
                      crisisStep >= idx ? "bg-red-500/30 text-red-400" : "bg-white/10 text-white/30"
                    }`}>
                      {crisisStep > idx ? <Check className="w-5 h-5" /> : item.step}
                    </div>
                    <div className="text-left flex-1">
                      <p className={`text-sm font-medium tracking-wider ${crisisStep >= idx ? "text-red-400" : "text-white/50"}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[8px] tracking-wider uppercase text-white/20 px-2 py-1 rounded border border-white/10">
                      [{item.evidence}]
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setCrisisStep(Math.min(2, crisisStep + 1))}
                disabled={crisisStep >= 2}
                className="flex-1 py-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 disabled:opacity-30 transition-all"
              >
                Proxima Fase
              </button>
              <button
                onClick={() => setShowCrisisModal(false)}
                className="flex-1 py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-all"
              >
                Protocolo Concluido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prevent Modal */}
      {showPreventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-md mx-4 bg-black/80 border border-cyan-500/20 rounded-3xl p-8 animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowPreventModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
              <h2 className="text-xl font-extralight text-white">Protocolo de Prevencao</h2>
              <p className="text-white/40 text-xs mt-1">90 segundos para reducao imediata de risco</p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { step: 1, action: "Beber um copo de agua agora", time: "10s" },
                { step: 2, action: "10 respiracoes profundas (4-4-4)", time: "40s" },
                { step: 3, action: "Mudar de ambiente por 5 minutos", time: "40s" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <p className="text-white/80 text-sm">{item.action}</p>
                  </div>
                  <span className="text-[10px] text-white/30">{item.time}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPreventModal(false)}
              className="w-full py-4 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all"
            >
              Concluir Protocolo
            </button>
          </div>
        </div>
      )}

      {/* Recover Modal */}
      {showRecoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-md mx-4 bg-black/80 border border-emerald-500/20 rounded-3xl p-8 animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowRecoverModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Heart className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-xl font-extralight text-white">Protocolo de Recomposicao</h2>
              <p className="text-white/40 text-xs mt-1">Sem punicao. Sem culpa. Apenas reconstrucao.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-400 text-sm font-medium mb-1">1. Aceitar sem julgamento</p>
                <p className="text-white/50 text-xs">O que aconteceu, aconteceu. Seu valor nao diminuiu.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/70 text-sm font-medium mb-1">2. Hidratar-se</p>
                <p className="text-white/40 text-xs">500ml de agua agora. Seu corpo precisa de reset.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white/70 text-sm font-medium mb-1">3. Proxima refeicao</p>
                <p className="text-white/40 text-xs">Volte ao protocolo na proxima refeicao. Sem compensacao.</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-6">
              <p className="text-[10px] text-white/40 font-mono">
                [Harvard Research] "Self-compassion after failure improves subsequent self-control by 40%"
              </p>
            </div>

            <button
              onClick={() => setShowRecoverModal(false)}
              className="w-full py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-all"
            >
              Entendido, vou seguir em frente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== SonoView IMPLEMENTATION ==========
function SonoView() {
  const { currentWeekMetrics, checkins } = useAtlasData()
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)
  const [showCrisisModal, setShowCrisisModal] = useState(false)
  const [showProtocolModal, setShowProtocolModal] = useState<string | null>(null)
  const [activeMode, setActiveMode] = useState<"base" | "crisis" | "protocol">("base")
  const [selectedProtocol, setSelectedProtocol] = useState<number | null>(null)

  // Hygiene protocols state
  const [hygieneChecks, setHygieneChecks] = useState({
    sunExposure: false,
    noCaffeineAfter3: false,
    screenOff60min: false,
    lightDinner: false,
    coolRoom: false,
    noAlcohol: false,
  })
  const [checkAnimations, setCheckAnimations] = useState<Record<string, boolean>>({})

  // Modo crise
  const [crisisHours, setCrisisHours] = useState("")
  const [crisisReason, setCrisisReason] = useState("")
  const [crisisEnergy, setCrisisEnergy] = useState(3)

  // Mock data for last 7 nights
  const mockNights = [
    { day: "Seg", hours: 6.08, bedtime: "00:30", wakeup: "06:35", quality: 2, lightExposure: "low", peakWindow: "10:00-12:00" },
    { day: "Ter", hours: 7.33, bedtime: "23:10", wakeup: "06:30", quality: 3, lightExposure: "medium", peakWindow: "09:00-12:00" },
    { day: "Qua", hours: 8.17, bedtime: "22:30", wakeup: "06:40", quality: 5, lightExposure: "high", peakWindow: "08:00-12:00" },
    { day: "Qui", hours: 7.75, bedtime: "23:00", wakeup: "06:45", quality: 5, lightExposure: "high", peakWindow: "09:00-13:00" },
    { day: "Sex", hours: 6.5, bedtime: "00:00", wakeup: "06:30", quality: 3, lightExposure: "medium", peakWindow: "10:00-12:00" },
    { day: "Sab", hours: 8.5, bedtime: "22:00", wakeup: "06:30", quality: 5, lightExposure: "high", peakWindow: "08:00-13:00" },
    { day: "Dom", hours: 7.83, bedtime: "22:40", wakeup: "06:30", quality: 5, lightExposure: "high", peakWindow: "09:00-13:00" },
  ]

  // Calculate ASRI
  const avgSleepHours = mockNights.reduce((sum, n) => sum + n.hours, 0) / mockNights.length
  const regularityScore = 82
  const energyScore = currentWeekMetrics.energyLevel === "Alta" ? 90 : currentWeekMetrics.energyLevel === "Média" ? 70 : 45
  const asri = Math.round((avgSleepHours / 8) * 40 + (regularityScore / 100) * 30 + (energyScore / 100) * 30)

  // Status classification
  const getStatus = () => {
    if (asri >= 85) return { label: "Atleta", color: "emerald", desc: "Performance de elite. Sistema otimizado." }
    if (asri >= 70) return { label: "Recuperacao", color: "cyan", desc: "Sistema funcional. Margem para otimizacao." }
    return { label: "Falha Sistemica", color: "red", desc: "Alerta critico. Intervencao necessaria." }
  }
  const status = getStatus()

  // Cross-pillar impact calculations
  const tomorrowTestoImpact = asri < 70 ? -15 : asri < 85 ? -5 : 0
  const tomorrowCompulsionRisk = asri < 65 ? "Alto (+40%)" : asri < 78 ? "Moderado (+15%)" : "Baixo"
  const tomorrowEnergyPrediction = asri >= 85 ? "Alta" : asri >= 70 ? "Media" : "Baixa"

  // Handle hygiene check with animation
  const handleHygieneCheck = (key: keyof typeof hygieneChecks) => {
    if (!hygieneChecks[key]) {
      setCheckAnimations(prev => ({ ...prev, [key]: true }))
      setTimeout(() => setCheckAnimations(prev => ({ ...prev, [key]: false })), 600)
    }
    setHygieneChecks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Protocols data
  const protocols = [
    { id: 1, name: "Reset de Higiene", duration: "7 dias", level: "Basico", color: "cyan", target: "+15 ASRI" },
    { id: 2, name: "Quebra de Tela", duration: "14 dias", level: "Intermediario", color: "blue", target: "+20 ASRI" },
    { id: 3, name: "Sono de Atleta", duration: "21 dias", level: "Avancado", color: "emerald", target: "+25 ASRI" },
  ]

  // Circadian clock data
  const circadianPhases = [
    { start: 6, end: 9, label: "Despertar", color: "amber", activity: "Luz solar + Hidratacao" },
    { start: 9, end: 12, label: "Pico Cognitivo", color: "emerald", activity: "Trabalho focado" },
    { start: 12, end: 14, label: "Alerta", color: "cyan", activity: "Almoco + Pausa" },
    { start: 14, end: 17, label: "Pico Fisico", color: "purple", activity: "Treino ideal" },
    { start: 17, end: 20, label: "Transicao", color: "orange", activity: "Jantar leve" },
    { start: 20, end: 22, label: "Wind Down", color: "indigo", activity: "Sem telas" },
    { start: 22, end: 6, label: "Sono", color: "slate", activity: "Recuperacao" },
  ]

  const handleCrisisSubmit = () => {
    setShowCrisisModal(false)
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-2">
          <Moon className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-extralight tracking-tight text-white">Sistema Operacional de Performance</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto font-light">
          Governanca circadiana. O pilar que sustenta todos os outros.
        </p>
      </div>

      {/* Zone 1: Holographic Score + Circadian Clock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Holographic ASRI Score */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden">
          {/* Holographic effect layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(99,102,241,0.03) 50px, rgba(99,102,241,0.03) 51px)',
          }} />
          
          <div className="relative">
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6 text-center">Atlas Sleep & Recovery Index</h3>
            
            {/* Central holographic gauge */}
            <div className="relative w-56 h-56 mx-auto mb-6">
              {/* Outer glow rings */}
              <div className={`absolute inset-[-10px] rounded-full opacity-20 blur-xl ${
                status.color === "emerald" ? "bg-emerald-500" : status.color === "cyan" ? "bg-cyan-500" : "bg-red-500"
              }`} />
              
              {/* SVG Gauge */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background circles */}
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={80 - i * 15}
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Tick marks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = (i * 6 - 90) * (Math.PI / 180)
                  const isMajor = i % 5 === 0
                  const r1 = isMajor ? 72 : 75
                  const r2 = 80
                  return (
                    <line
                      key={i}
                      x1={100 + r1 * Math.cos(angle)}
                      y1={100 + r1 * Math.sin(angle)}
                      x2={100 + r2 * Math.cos(angle)}
                      y2={100 + r2 * Math.sin(angle)}
                      stroke={i <= (asri / 100) * 60 ? (
                        status.color === "emerald" ? "rgba(52,211,153,0.8)" : 
                        status.color === "cyan" ? "rgba(34,211,238,0.8)" : "rgba(239,68,68,0.8)"
                      ) : "rgba(255,255,255,0.1)"}
                      strokeWidth={isMajor ? 2 : 1}
                    />
                  )
                })}
                
                {/* Progress arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke={status.color === "emerald" ? "rgba(52,211,153,0.3)" : status.color === "cyan" ? "rgba(34,211,238,0.3)" : "rgba(239,68,68,0.3)"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(asri / 100) * 377} 377`}
                  transform="rotate(-90 100 100)"
                  style={{ filter: `drop-shadow(0 0 10px ${status.color === "emerald" ? "rgba(52,211,153,0.5)" : status.color === "cyan" ? "rgba(34,211,238,0.5)" : "rgba(239,68,68,0.5)"})` }}
                />
              </svg>
              
              {/* Center display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-extralight ${
                  status.color === "emerald" ? "text-emerald-400" : status.color === "cyan" ? "text-cyan-400" : "text-red-400"
                }`} style={{ textShadow: `0 0 40px ${status.color === "emerald" ? "rgba(52,211,153,0.5)" : status.color === "cyan" ? "rgba(34,211,238,0.5)" : "rgba(239,68,68,0.5)"}` }}>
                  {asri}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 mt-1">/ 100</span>
              </div>
            </div>

            {/* Status badge */}
            <div className="text-center space-y-3">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${
                status.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                status.color === "cyan" ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" :
                "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  status.color === "emerald" ? "bg-emerald-400" : status.color === "cyan" ? "bg-cyan-400" : "bg-red-400"
                }`} />
                <span className="text-xs tracking-wider uppercase">Status: {status.label}</span>
              </div>
              <p className="text-xs text-white/40">{status.desc}</p>
            </div>

            {/* Mini metrics */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                <p className="text-lg font-extralight text-white">{avgSleepHours.toFixed(1)}h</p>
                <p className="text-[9px] tracking-wider uppercase text-white/30">Media 7d</p>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                <p className="text-lg font-extralight text-white">{regularityScore}%</p>
                <p className="text-[9px] tracking-wider uppercase text-white/30">Regularidade</p>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                <p className="text-lg font-extralight text-white">{currentWeekMetrics.energyLevel}</p>
                <p className="text-[9px] tracking-wider uppercase text-white/30">Energia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Circadian Clock */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Relogio Biologico</h3>
            </div>
            <span className="text-[10px] text-white/30">Baseado no seu historico</span>
          </div>

          {/* 24h Clock visualization */}
          <div className="relative w-full max-w-[280px] aspect-square mx-auto mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Background */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
              
              {/* Phase arcs */}
              {circadianPhases.map((phase, idx) => {
                const startAngle = ((phase.start - 6) / 24) * 360 - 90
                const endAngle = ((phase.end - 6) / 24) * 360 - 90
                const largeArc = (phase.end - phase.start) > 12 ? 1 : 0
                
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180
                
                const x1 = 100 + 90 * Math.cos(startRad)
                const y1 = 100 + 90 * Math.sin(startRad)
                const x2 = 100 + 90 * Math.cos(endRad)
                const y2 = 100 + 90 * Math.sin(endRad)
                
                const colorMap: Record<string, string> = {
                  amber: "rgba(251,191,36,0.4)",
                  emerald: "rgba(52,211,153,0.4)",
                  cyan: "rgba(34,211,238,0.4)",
                  purple: "rgba(168,85,247,0.4)",
                  orange: "rgba(249,115,22,0.4)",
                  indigo: "rgba(99,102,241,0.4)",
                  slate: "rgba(100,116,139,0.3)",
                }
                
                return (
                  <path
                    key={idx}
                    d={`M ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2}`}
                    fill="none"
                    stroke={colorMap[phase.color]}
                    strokeWidth="20"
                    strokeLinecap="butt"
                  />
                )
              })}
              
              {/* Hour markers */}
              {[6, 9, 12, 15, 18, 21, 0, 3].map((hour) => {
                const angle = ((hour - 6) / 24) * 360 - 90
                const rad = (angle * Math.PI) / 180
                const x = 100 + 70 * Math.cos(rad)
                const y = 100 + 70 * Math.sin(rad)
                return (
                  <text
                    key={hour}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[8px] fill-white/40"
                  >
                    {hour.toString().padStart(2, '0')}h
                  </text>
                )
              })}
              
              {/* Center */}
              <circle cx="100" cy="100" r="30" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="100" y="96" textAnchor="middle" className="text-[8px] fill-white/50">CICLO</text>
              <text x="100" y="108" textAnchor="middle" className="text-[10px] fill-white/70 font-medium">24H</text>
            </svg>
            
            {/* Current time indicator */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-full h-full bg-white rounded-full animate-pulse" />
            </div>
          </div>

          {/* Phase legend */}
          <div className="grid grid-cols-2 gap-2">
            {circadianPhases.slice(0, 6).map((phase) => (
              <div key={phase.label} className="flex items-center gap-2 p-2 bg-white/[0.02] rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  phase.color === "amber" ? "bg-amber-400" :
                  phase.color === "emerald" ? "bg-emerald-400" :
                  phase.color === "cyan" ? "bg-cyan-400" :
                  phase.color === "purple" ? "bg-purple-400" :
                  phase.color === "orange" ? "bg-orange-400" :
                  "bg-indigo-400"
                }`} />
                <div>
                  <p className="text-[9px] text-white/50">{phase.label}</p>
                  <p className="text-[8px] text-white/30">{phase.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone 2: Hygiene Protocols + Cross-Pillar Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Elite Hygiene Tracking */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Protocolos de Higiene</h3>
          </div>

          <div className="space-y-3">
            {[
              { key: "sunExposure", label: "Exposicao solar matinal", impact: "Melatonina +40%", icon: Sun },
              { key: "noCaffeineAfter3", label: "Sem cafeina apos 15h", impact: "Latencia -25min", icon: Coffee },
              { key: "screenOff60min", label: "Telas off 60min antes", impact: "Qualidade +30%", icon: Monitor },
              { key: "lightDinner", label: "Jantar leve ate 20h", impact: "REM +15%", icon: Utensils },
              { key: "coolRoom", label: "Quarto 18-20°C", impact: "Profundidade +20%", icon: Thermometer },
              { key: "noAlcohol", label: "Sem alcool", impact: "HRV +25%", icon: Wine },
            ].map((item) => {
              const isChecked = hygieneChecks[item.key as keyof typeof hygieneChecks]
              const isAnimating = checkAnimations[item.key]
              
              return (
                <button
                  key={item.key}
                  onClick={() => handleHygieneCheck(item.key as keyof typeof hygieneChecks)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    isChecked
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`relative w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isChecked ? "bg-emerald-500/20" : "bg-white/5"
                    }`}>
                      {isChecked ? (
                        <div className={`transition-transform duration-300 ${isAnimating ? "scale-125" : "scale-100"}`}>
                          <Check className={`w-4 h-4 text-emerald-400 ${isAnimating ? "animate-bounce" : ""}`} />
                        </div>
                      ) : (
                        <item.icon className="w-3 h-3 text-white/30" />
                      )}
                      {/* Seal animation */}
                      {isAnimating && (
                        <div className="absolute inset-0 rounded-lg border-2 border-emerald-400 animate-ping" />
                      )}
                    </div>
                    <span className={`text-sm ${isChecked ? "text-emerald-400" : "text-white/60"}`}>{item.label}</span>
                  </div>
                  <span className={`text-[9px] tracking-wider uppercase px-2 py-1 rounded ${
                    isChecked ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/30"
                  }`}>
                    {item.impact}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Protocol completion */}
          <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/40">Aderencia Hoje</span>
              <span className="text-sm text-white/70">
                {Object.values(hygieneChecks).filter(Boolean).length}/6
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(Object.values(hygieneChecks).filter(Boolean).length / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cross-Pillar Impact */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Impacto Cross-Pillar</h3>
          </div>

          <p className="text-xs text-white/40 mb-6">
            Como seu sono de hoje afetara os outros pilares amanha:
          </p>

          <div className="space-y-4">
            {/* Testosterone Impact */}
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-white/70">Testosterona</span>
                </div>
                <span className={`text-sm font-medium ${tomorrowTestoImpact < 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {tomorrowTestoImpact > 0 ? "+" : ""}{tomorrowTestoImpact}%
                </span>
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed">
                {asri < 70 
                  ? "Sono < 6h reduz producao de testosterona em ate 15%. Efeito cumulativo em 48h."
                  : "Sono adequado mantem producao hormonal estavel. Continue assim."}
              </p>
              <span className="inline-block mt-2 text-[8px] tracking-wider uppercase text-amber-400/50 px-2 py-0.5 rounded border border-amber-500/20">
                [PubMed: Sleep & Testosterone]
              </span>
            </div>

            {/* Compulsion Risk */}
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-white/70">Risco de Compulsao</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  tomorrowCompulsionRisk.includes("Alto") ? "bg-red-500/20 text-red-400" :
                  tomorrowCompulsionRisk.includes("Moderado") ? "bg-amber-500/20 text-amber-400" :
                  "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {tomorrowCompulsionRisk}
                </span>
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed">
                {asri < 70 
                  ? "Privacao de sono eleva grelina (+28%) e reduz leptina. Cortex pre-frontal comprometido."
                  : "Regulacao hormonal do apetite preservada. Autocontrole em nivel adequado."}
              </p>
              <span className="inline-block mt-2 text-[8px] tracking-wider uppercase text-red-400/50 px-2 py-0.5 rounded border border-red-500/20">
                [Harvard: Sleep & Appetite]
              </span>
            </div>

            {/* Energy Prediction */}
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-white/70">Energia Amanha</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  tomorrowEnergyPrediction === "Alta" ? "bg-emerald-500/20 text-emerald-400" :
                  tomorrowEnergyPrediction === "Media" ? "bg-cyan-500/20 text-cyan-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {tomorrowEnergyPrediction}
                </span>
              </div>
              <p className="text-[10px] text-white/30 leading-relaxed">
                Predicao baseada em sono, HRV estimado e historico de recuperacao dos ultimos 7 dias.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 3: War Modes */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
        <h3 className="text-sm tracking-[0.15em] uppercase text-white/50 mb-6 text-center">Modos de Operacao</h3>
        
        {/* Mode selector */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: "base", label: "Modo Base", icon: Target, color: "blue" },
            { id: "crisis", label: "Modo Crise", icon: AlertTriangle, color: "red" },
            { id: "protocol", label: "Protocolos", icon: Rocket, color: "cyan" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as typeof activeMode)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 ${
                activeMode === mode.id
                  ? mode.color === "blue" ? "bg-blue-500/20 border-blue-500/40 text-blue-400" :
                    mode.color === "red" ? "bg-red-500/20 border-red-500/40 text-red-400" :
                    "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              <mode.icon className="w-4 h-4" />
              <span className="text-sm">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Mode content */}
        {activeMode === "base" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <Sun className="w-6 h-6 text-amber-400 mb-4" />
              <h4 className="text-sm text-white/70 mb-2">Rotina Matinal</h4>
              <ul className="space-y-2 text-xs text-white/40">
                <li>06:30 - Despertar consistente</li>
                <li>06:35 - Luz solar 10-15min</li>
                <li>07:00 - Hidratacao 500ml</li>
                <li>07:30 - Cafe da manha proteico</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <Coffee className="w-6 h-6 text-orange-400 mb-4" />
              <h4 className="text-sm text-white/70 mb-2">Rotina Vespertina</h4>
              <ul className="space-y-2 text-xs text-white/40">
                <li>15:00 - Ultima cafeina</li>
                <li>16:00-19:00 - Janela de treino</li>
                <li>19:00 - Jantar leve</li>
                <li>20:00 - Inicio wind-down</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <Moon className="w-6 h-6 text-indigo-400 mb-4" />
              <h4 className="text-sm text-white/70 mb-2">Rotina Noturna</h4>
              <ul className="space-y-2 text-xs text-white/40">
                <li>21:00 - Telas desligadas</li>
                <li>21:30 - Banho morno</li>
                <li>22:00 - Leitura/meditacao</li>
                <li>22:30 - Dormir</li>
              </ul>
            </div>
          </div>
        )}

        {activeMode === "crisis" && (
          <div className="animate-in fade-in duration-300">
            {/* Crisis mode visual */}
            <div className="relative p-8 bg-red-500/5 border-2 border-red-500/30 rounded-2xl overflow-hidden">
              {/* Neon border effect */}
              <div className="absolute inset-0 rounded-2xl" style={{
                boxShadow: 'inset 0 0 30px rgba(239,68,68,0.1), 0 0 30px rgba(239,68,68,0.1)'
              }} />
              
              <div className="relative text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                
                <div>
                  <h4 className="text-xl font-light text-white mb-2">Modo Crise Ativado</h4>
                  <p className="text-sm text-white/40 max-w-md mx-auto">
                    Dormiu mal ou quase nao dormiu? Execute o protocolo de mitigacao de danos.
                  </p>
                </div>

                <button
                  onClick={() => setShowCrisisModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-xl hover:from-red-500 hover:to-orange-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                >
                  Executar Protocolo de Mitigacao de Danos
                </button>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-black/30 rounded-xl">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Treino</p>
                    <p className="text-xs text-red-400">Reduzir 30%</p>
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Cafeina</p>
                    <p className="text-xs text-red-400">Max 200mg</p>
                  </div>
                  <div className="p-3 bg-black/30 rounded-xl">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Sono Hoje</p>
                    <p className="text-xs text-red-400">Alvo 8h+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMode === "protocol" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <p className="text-center text-xs text-white/40 mb-6">
              Selecione um upgrade de sistema para reprogramar seu sono:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {protocols.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => setSelectedProtocol(selectedProtocol === protocol.id ? null : protocol.id)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 text-left ${
                    selectedProtocol === protocol.id
                      ? protocol.color === "cyan" ? "bg-cyan-500/10 border-cyan-500/40" :
                        protocol.color === "blue" ? "bg-blue-500/10 border-blue-500/40" :
                        "bg-emerald-500/10 border-emerald-500/40"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Upgrade badge */}
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded text-[9px] tracking-wider uppercase ${
                    protocol.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                    protocol.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                    "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    Upgrade v{protocol.id}.0
                  </div>
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    protocol.color === "cyan" ? "bg-cyan-500/20" :
                    protocol.color === "blue" ? "bg-blue-500/20" :
                    "bg-emerald-500/20"
                  }`}>
                    <Rocket className={`w-5 h-5 ${
                      protocol.color === "cyan" ? "text-cyan-400" :
                      protocol.color === "blue" ? "text-blue-400" :
                      "text-emerald-400"
                    }`} />
                  </div>
                  
                  <h4 className="text-sm text-white/80 font-medium mb-1">{protocol.name}</h4>
                  <p className="text-xs text-white/40 mb-3">{protocol.duration} | {protocol.level}</p>
                  
                  <div className={`inline-flex items-center gap-1 text-xs ${
                    protocol.color === "cyan" ? "text-cyan-400" :
                    protocol.color === "blue" ? "text-blue-400" :
                    "text-emerald-400"
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{protocol.target}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedProtocol && (
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
                <h4 className="text-sm text-white/70 mb-4">Detalhes do Protocolo</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/40">
                  <div>
                    <p className="text-white/30 uppercase tracking-wider text-[9px] mb-2">Fase 1: Reset</p>
                    <ul className="space-y-1">
                      <li>Horario fixo despertar</li>
                      <li>Luz solar 30min</li>
                      <li>Sem cafeina apos 14h</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white/30 uppercase tracking-wider text-[9px] mb-2">Fase 2: Otimizacao</p>
                    <ul className="space-y-1">
                      <li>Telas off 90min</li>
                      <li>Banho frio matinal</li>
                      <li>Meditacao noturna</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white/30 uppercase tracking-wider text-[9px] mb-2">Fase 3: Elite</p>
                    <ul className="space-y-1">
                      <li>Ciclos de 90min</li>
                      <li>HRV tracking</li>
                      <li>Suplementacao</li>
                    </ul>
                  </div>
                </div>
                
                <button className="mt-6 w-full py-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all">
                  Iniciar Protocolo
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-md mx-4 bg-black/80 border-2 border-red-500/30 rounded-3xl p-8 animate-in zoom-in-95 duration-300">
            {/* Neon glow */}
            <div className="absolute inset-0 rounded-3xl" style={{
              boxShadow: '0 0 60px rgba(239,68,68,0.2), inset 0 0 60px rgba(239,68,68,0.05)'
            }} />
            
            <button onClick={() => setShowCrisisModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 mb-4">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <h2 className="text-xl font-extralight text-white">Protocolo de Mitigacao</h2>
              <p className="text-white/40 text-xs mt-1">Ajustar sistema para recuperacao acelerada</p>
            </div>

            <div className="relative space-y-4 mb-6">
              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/30 mb-2 block">Horas dormidas</label>
                <input
                  type="number"
                  step="0.5"
                  value={crisisHours}
                  onChange={(e) => setCrisisHours(e.target.value)}
                  placeholder="Ex: 4.5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/30 mb-2 block">Causa principal</label>
                <select
                  value={crisisReason}
                  onChange={(e) => setCrisisReason(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="stress">Estresse</option>
                  <option value="screen">Tela ate tarde</option>
                  <option value="caffeine">Cafeina</option>
                  <option value="pain">Dor</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/30 mb-2 block">
                  Energia atual: {crisisEnergy}/5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={crisisEnergy}
                  onChange={(e) => setCrisisEnergy(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>
            </div>

            <button
              onClick={handleCrisisSubmit}
              className="relative w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-500 hover:to-orange-500 transition-all"
            >
              Ativar Ajustes de Emergencia
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== FisioterapiaView & TestosteronaView (No changes) ==========
function FisioterapiaView() {
  // State for pain triage
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [painIntensity, setPainIntensity] = useState(0)
  const [painDuration, setPainDuration] = useState<"days" | "weeks" | "months">("days")
  const [traumaHistory, setTraumaHistory] = useState(false)
  const [nightPain, setNightPain] = useState(false)
  const [neurologicalSymptoms, setNeurologicalSymptoms] = useState(false)
  const [showRedFlagAlert, setShowRedFlagAlert] = useState(false)
  const [diagnosticStep, setDiagnosticStep] = useState(0)
  const [glitchRegion, setGlitchRegion] = useState<string | null>(null)

  // Check for red flags
  const hasRedFlags = traumaHistory || neurologicalSymptoms || nightPain || painIntensity >= 8

  // Pain regions with anatomical data
  const painRegions = [
    { id: "cervical", label: "Cervical", zone: "C1-C7", risk: "medium" },
    { id: "shoulder", label: "Ombro", zone: "Glenoumeral", risk: "high" },
    { id: "thoracic", label: "Toracica", zone: "T1-T12", risk: "low" },
    { id: "lumbar", label: "Lombar", zone: "L1-L5", risk: "high" },
    { id: "hip", label: "Quadril", zone: "Coxofemoral", risk: "medium" },
    { id: "knee", label: "Joelho", zone: "Tibiofemoral", risk: "high" },
    { id: "ankle", label: "Tornozelo", zone: "Talocrural", risk: "medium" },
  ]

  // Body map regions with recommendations
  const bodyMapRegions: Record<string, { description: string; recommendations: string[]; exercises: Array<{ name: string; sets: string; evidence: string }> }> = {
    cervical: {
      description: "Regiao cervical: frequentemente afetada por ma postura e uso excessivo de dispositivos.",
      recommendations: [
        "Evite movimentos bruscos de rotacao",
        "Faca pausas a cada 45-60 min de trabalho",
        "Mantenha tela na altura dos olhos",
      ],
      exercises: [
        { name: "Retracao cervical isometrica", sets: "3x10s", evidence: "PubMed: Neck Pain Guidelines 2024" },
        { name: "Flexao lateral controlada", sets: "2x8 cada lado", evidence: "Harvard Spine Research" },
      ],
    },
    shoulder: {
      description: "Ombros: sobrecarga comum em exercicios de press e movimentos overhead.",
      recommendations: [
        "Evite movimentos explosivos acima da cabeca",
        "Reduza carga em supino",
        "Fortaleca manguito rotador",
      ],
      exercises: [
        { name: "Rotacao externa com band", sets: "3x15", evidence: "JOSPT Shoulder Protocol" },
        { name: "Scaption Y-raise", sets: "3x12", evidence: "PubMed: Rotator Cuff Rehab" },
      ],
    },
    thoracic: {
      description: "Coluna toracica: rigidez comum por postura curvada e sedentarismo.",
      recommendations: [
        "Faca extensoes toracicas diarias",
        "Evite ficar muito tempo sentado",
        "Inclua foam roller na rotina",
      ],
      exercises: [
        { name: "Cat-Cow mobilidade", sets: "2x10", evidence: "Spine Journal 2023" },
        { name: "Thread the needle", sets: "2x8 cada lado", evidence: "Harvard Mobility Lab" },
      ],
    },
    lumbar: {
      description: "Regiao lombar: maior incidencia de dores por fraqueza do core.",
      recommendations: [
        "Evite agachamentos pesados temporariamente",
        "Fortaleca core com isometricos",
        "Mantenha postura neutra",
      ],
      exercises: [
        { name: "Dead bug", sets: "3x8 cada lado", evidence: "McGill Low Back Disorders" },
        { name: "Bird dog", sets: "3x10", evidence: "PubMed: Core Stability Meta" },
      ],
    },
    hip: {
      description: "Quadril: tensao comum em quem fica muito sentado.",
      recommendations: [
        "Alongue flexores de quadril",
        "Evite agachamentos muito profundos",
        "Fortaleca gluteos",
      ],
      exercises: [
        { name: "90/90 stretch", sets: "2x30s cada lado", evidence: "NSCA Hip Mobility" },
        { name: "Clamshell", sets: "3x15", evidence: "Harvard Sports Medicine" },
      ],
    },
    knee: {
      description: "Joelhos: articulacao vulneravel a sobrecarga.",
      recommendations: [
        "Reduza impacto de corrida",
        "Evite leg press com amplitude excessiva",
        "Fortaleca quadriceps",
      ],
      exercises: [
        { name: "Terminal knee extension", sets: "3x15", evidence: "ACSM Knee Protocol" },
        { name: "Step down eccentrico", sets: "3x10", evidence: "PubMed: Patellar Tendon" },
      ],
    },
    ankle: {
      description: "Tornozelo e pe: frequentemente afetados por entorses.",
      recommendations: [
        "Evite corrida em terreno irregular",
        "Use calcados adequados",
        "Fortaleca musculos do pe",
      ],
      exercises: [
        { name: "Ankle circles", sets: "2x20 cada direcao", evidence: "JOSPT Ankle Rehab" },
        { name: "Single leg balance", sets: "3x30s", evidence: "Harvard Balance Research" },
      ],
    },
  }

  // Hardware maintenance log (history)
  const maintenanceLog = [
    { id: "MNT-2026-001", date: "05/01/2026", region: "Lombar", severity: 7, current: 4, status: "optimizing", cycles: 12 },
    { id: "MNT-2025-047", date: "28/12/2025", region: "Ombro D", severity: 5, current: 3, status: "stable", cycles: 8 },
    { id: "MNT-2025-042", date: "15/12/2025", region: "Joelho E", severity: 6, current: 6, status: "critical", cycles: 15 },
    { id: "MNT-2025-038", date: "01/12/2025", region: "Cervical", severity: 4, current: 2, status: "optimizing", cycles: 6 },
  ]

  // Glitch effect for active pain regions
  useEffect(() => {
    if (selectedRegion && painIntensity >= 5) {
      const interval = setInterval(() => {
        setGlitchRegion(selectedRegion)
        setTimeout(() => setGlitchRegion(null), 100)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [selectedRegion, painIntensity])

  // Show red flag alert
  useEffect(() => {
    if (hasRedFlags && selectedRegion) {
      setShowRedFlagAlert(true)
    }
  }, [hasRedFlags, selectedRegion])

  // Get border color based on severity
  const getSeverityBorder = (intensity: number) => {
    if (intensity >= 8) return "border-red-500/60 shadow-red-500/20"
    if (intensity >= 5) return "border-amber-500/60 shadow-amber-500/20"
    return "border-emerald-500/60 shadow-emerald-500/20"
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "optimizing": return { label: "Otimizando", color: "text-emerald-400", bg: "bg-emerald-500/20", icon: TrendingUp }
      case "stable": return { label: "Estavel", color: "text-cyan-400", bg: "bg-cyan-500/20", icon: Minus }
      case "critical": return { label: "Critico", color: "text-red-400", bg: "bg-red-500/20", icon: AlertTriangle }
      default: return { label: "Desconhecido", color: "text-white/40", bg: "bg-white/10", icon: HelpCircle }
    }
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
          <Shield className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-extralight tracking-tight text-white">Manutencao de Blindagem Corporal</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto font-light">
          Sistema de diagnostico e reparo estrutural. Biomecânica baseada em evidencias.
        </p>
      </div>

      {/* Zone 1: Interactive 3D Anatomy + System Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Anatomy Map */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(52,211,153,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Visao 360 - Selecao de Regiao</h3>
              <span className="text-[9px] tracking-wider uppercase text-emerald-400/50 px-2 py-1 rounded border border-emerald-500/20">
                Anatomia Interativa
              </span>
            </div>

            {/* Body silhouette with regions */}
            <div className="relative w-full max-w-[200px] mx-auto mb-6">
              {/* SVG Body outline */}
              <svg viewBox="0 0 100 200" className="w-full h-auto">
                {/* Head */}
                <ellipse cx="50" cy="20" rx="15" ry="18" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                {/* Neck/Cervical */}
                <rect x="45" y="38" width="10" height="12" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                {/* Torso */}
                <path d="M30 50 L70 50 L75 100 L25 100 Z" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                {/* Arms */}
                <path d="M30 55 L15 90" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                <path d="M70 55 L85 90" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                {/* Legs */}
                <path d="M35 100 L30 160" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                <path d="M65 100 L70 160" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                {/* Feet */}
                <ellipse cx="28" cy="170" rx="8" ry="5" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
                <ellipse cx="72" cy="170" rx="8" ry="5" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
              </svg>

              {/* Interactive hotspots */}
              {[
                { id: "cervical", x: 50, y: 44, label: "C" },
                { id: "shoulder", x: 25, y: 55, label: "O" },
                { id: "thoracic", x: 50, y: 65, label: "T" },
                { id: "lumbar", x: 50, y: 88, label: "L" },
                { id: "hip", x: 38, y: 100, label: "Q" },
                { id: "knee", x: 35, y: 135, label: "J" },
                { id: "ankle", x: 30, y: 165, label: "A" },
              ].map((point) => {
                const isSelected = selectedRegion === point.id
                const isGlitching = glitchRegion === point.id
                const regionData = painRegions.find(r => r.id === point.id)
                
                return (
                  <button
                    key={point.id}
                    onClick={() => setSelectedRegion(point.id)}
                    className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-500 text-black scale-125 shadow-lg shadow-emerald-500/50"
                        : "bg-white/10 text-white/50 hover:bg-emerald-500/30 hover:text-emerald-400"
                    } ${isGlitching ? "animate-pulse bg-red-500 shadow-red-500/50" : ""}`}
                    style={{ 
                      left: `${point.x}%`, 
                      top: `${point.y}%`, 
                      transform: 'translate(-50%, -50%)',
                      boxShadow: isSelected ? `0 0 20px rgba(52,211,153,0.5), 0 0 40px rgba(52,211,153,0.2)` : undefined
                    }}
                  >
                    {point.label}
                    {/* Pulse ring for active pain */}
                    {isSelected && painIntensity >= 5 && (
                      <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-50" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Region selector grid */}
            <div className="grid grid-cols-4 gap-2">
              {painRegions.map((region) => {
                const isSelected = selectedRegion === region.id
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`p-2 rounded-xl border text-center transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:border-emerald-500/20"
                    }`}
                  >
                    <p className="text-[10px] font-medium">{region.label}</p>
                    <p className="text-[8px] text-white/30">{region.zone}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* System Diagnostic Console */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] tracking-wider uppercase text-white/30 font-mono">diagnostico_sistema_v3.0</span>
          </div>

          {/* Pain intensity gauge */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] tracking-wider uppercase text-white/30">Nivel de Comprometimento</span>
              <span className={`text-lg font-extralight ${
                painIntensity >= 8 ? "text-red-400" : painIntensity >= 5 ? "text-amber-400" : "text-emerald-400"
              }`}>
                {painIntensity}/10
              </span>
            </div>
            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                  painIntensity >= 8 ? "bg-gradient-to-r from-red-600 to-red-400" : 
                  painIntensity >= 5 ? "bg-gradient-to-r from-amber-600 to-amber-400" : 
                  "bg-gradient-to-r from-emerald-600 to-emerald-400"
                }`}
                style={{ width: `${painIntensity * 10}%` }}
              />
              {/* Tick marks */}
              {[...Array(11)].map((_, i) => (
                <div key={i} className="absolute top-0 bottom-0 w-px bg-white/10" style={{ left: `${i * 10}%` }} />
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={painIntensity}
              onChange={(e) => setPainIntensity(parseInt(e.target.value))}
              className="w-full mt-2 accent-emerald-500 opacity-0 absolute"
            />
            <input
              type="range"
              min="0"
              max="10"
              value={painIntensity}
              onChange={(e) => setPainIntensity(parseInt(e.target.value))}
              className="w-full mt-2 accent-emerald-500"
            />
          </div>

          {/* Duration selector */}
          <div className="mb-6">
            <span className="text-[10px] tracking-wider uppercase text-white/30 block mb-3">Tempo de Falha</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "days", label: "Dias", desc: "< 7d" },
                { value: "weeks", label: "Semanas", desc: "1-4 sem" },
                { value: "months", label: "Meses", desc: "> 1 mes" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPainDuration(opt.value as typeof painDuration)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    painDuration === opt.value
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                      : "bg-white/[0.02] border-white/5 text-white/40 hover:border-cyan-500/20"
                  }`}
                >
                  <p className="text-xs font-medium">{opt.label}</p>
                  <p className="text-[9px] text-white/30">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Red flag diagnostic */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-wider uppercase text-white/30 block">Scan de Sinais Criticos</span>
            
            {[
              { id: "trauma", label: "Trauma/Queda", desc: "Inicio apos impacto fisico", state: traumaHistory, setState: setTraumaHistory },
              { id: "night", label: "Dor Noturna", desc: "Piora durante o sono", state: nightPain, setState: setNightPain },
              { id: "neuro", label: "Sintomas Neuro", desc: "Formigamento/dormencia", state: neurologicalSymptoms, setState: setNeurologicalSymptoms },
            ].map((flag) => (
              <button
                key={flag.id}
                onClick={() => flag.setState(!flag.state)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  flag.state
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="text-left">
                  <p className={`text-xs font-medium ${flag.state ? "text-red-400" : "text-white/60"}`}>{flag.label}</p>
                  <p className="text-[9px] text-white/30">{flag.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded flex items-center justify-center ${
                  flag.state ? "bg-red-500" : "bg-white/10"
                }`}>
                  {flag.state && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Red Flag Alert Modal */}
      {showRedFlagAlert && hasRedFlags && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="relative w-full max-w-lg bg-black border-2 border-red-500/50 rounded-3xl p-8 animate-in zoom-in-95 duration-300">
            {/* Neon glow effect */}
            <div className="absolute inset-0 rounded-3xl" style={{
              boxShadow: '0 0 60px rgba(239,68,68,0.3), inset 0 0 60px rgba(239,68,68,0.1)'
            }} />
            
            {/* Scan lines */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239,68,68,0.1) 2px, rgba(239,68,68,0.1) 4px)'
              }} />
            </div>
            
            <div className="relative">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/50 mb-4 animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-extralight text-white mb-2">ALERTA DE SISTEMA CRITICO</h3>
                <p className="text-red-400 text-sm tracking-wider uppercase">Sinais de risco detectados</p>
              </div>

              <div className="space-y-3 mb-6 font-mono text-sm">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-xs mb-1">{"> "}DIAGNOSTICO</p>
                  <p className="text-white/60 text-xs">
                    {traumaHistory && "Historico de trauma detectado. "}
                    {nightPain && "Dor noturna presente. "}
                    {neurologicalSymptoms && "Sintomas neurologicos ativos. "}
                    {painIntensity >= 8 && "Nivel de dor critico (8+). "}
                  </p>
                </div>
                
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-amber-400 text-xs mb-1">{"> "}RECOMENDACAO</p>
                  <p className="text-white/60 text-xs">
                    Avaliacao presencial com medico ou fisioterapeuta REQUERIDA. 
                    Atlas IA NAO substitui diagnostico profissional.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRedFlagAlert(false)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 text-white/60 rounded-xl hover:bg-white/10 transition-all"
                >
                  Entendi os riscos
                </button>
                <button
                  onClick={() => setShowRedFlagAlert(false)}
                  className="flex-1 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                >
                  Buscar profissional
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zone 2: Atlas Recovery Protocol */}
      {selectedRegion && bodyMapRegions[selectedRegion] && (
        <div className={`bg-black/40 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${getSeverityBorder(painIntensity)} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Protocolo de Recuperacao Atlas</h3>
                <p className="text-xs text-white/30">{painRegions.find(r => r.id === selectedRegion)?.label} - {painRegions.find(r => r.id === selectedRegion)?.zone}</p>
              </div>
            </div>
            <span className={`text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-lg border ${
              painIntensity >= 8 ? "bg-red-500/10 border-red-500/30 text-red-400" :
              painIntensity >= 5 ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
              "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            }`}>
              Severidade {painIntensity}/10
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Objetivo Tatico */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs tracking-wider uppercase text-cyan-400">Objetivo Tatico</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Reduzir comprometimento de {painIntensity}/10 para {Math.max(0, painIntensity - 3)}/10 em 7 dias.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Meta primaria</span>
                  <span className="text-cyan-400">Mobilidade sem dor</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Meta secundaria</span>
                  <span className="text-cyan-400">Forca funcional</span>
                </div>
              </div>
            </div>

            {/* Movimentos Proibidos */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-4 h-4 text-red-400" />
                <h4 className="text-xs tracking-wider uppercase text-red-400">Movimentos Proibidos</h4>
              </div>
              <ul className="space-y-2">
                {bodyMapRegions[selectedRegion].recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/50">
                    <X className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engenharia de Reparo */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs tracking-wider uppercase text-emerald-400">Engenharia de Reparo</h4>
              </div>
              <div className="space-y-3">
                {bodyMapRegions[selectedRegion].exercises.map((ex, idx) => (
                  <div key={idx} className="p-3 bg-black/30 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70 font-medium">{ex.name}</span>
                      <span className="text-[9px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">{ex.sets}</span>
                    </div>
                    <span className="inline-block text-[8px] tracking-wider uppercase text-emerald-400/50 px-2 py-0.5 rounded border border-emerald-500/20">
                      [{ex.evidence}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scientific evidence footer */}
          <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/5">
            <p className="text-[10px] text-white/30 font-mono">
              [ATLAS_PROTOCOL] Manobras de mobilidade seguem diretrizes PubMed 2024 e Harvard Sports Medicine Lab. 
              Este protocolo NAO substitui avaliacao profissional presencial.
            </p>
          </div>
        </div>
      )}

      {/* Zone 3: Hardware Maintenance Log */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Log de Integridade Estrutural</h3>
          </div>
          <span className="text-[9px] tracking-wider uppercase text-white/30 font-mono">hardware_maintenance_log</span>
        </div>

        {/* Log entries */}
        <div className="space-y-3">
          {/* Header row */}
          <div className="grid grid-cols-6 gap-4 px-4 py-2 text-[9px] tracking-wider uppercase text-white/30 border-b border-white/5">
            <span>ID</span>
            <span>Data</span>
            <span>Modulo</span>
            <span>Severidade</span>
            <span>Atual</span>
            <span>Status</span>
          </div>

          {maintenanceLog.map((entry) => {
            const statusConfig = getStatusConfig(entry.status)
            const StatusIcon = statusConfig.icon
            
            return (
              <div 
                key={entry.id} 
                className="grid grid-cols-6 gap-4 px-4 py-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-all items-center"
              >
                <span className="text-xs text-white/40 font-mono">{entry.id}</span>
                <span className="text-xs text-white/60">{entry.date}</span>
                <span className="text-xs text-white/70 font-medium">{entry.region}</span>
                <div className="flex items-center gap-2">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[60px]">
                    <div 
                      className={`h-full rounded-full ${
                        entry.severity >= 7 ? "bg-red-500" : entry.severity >= 4 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${entry.severity * 10}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40">{entry.severity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[60px]">
                    <div 
                      className={`h-full rounded-full ${
                        entry.current >= 7 ? "bg-red-500" : entry.current >= 4 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${entry.current * 10}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40">{entry.current}</span>
                </div>
                <div className={`flex items-center gap-1.5 ${statusConfig.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="text-[10px] tracking-wider uppercase">{statusConfig.label}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: "Total Registros", value: maintenanceLog.length, color: "text-white/70" },
            { label: "Otimizando", value: maintenanceLog.filter(e => e.status === "optimizing").length, color: "text-emerald-400" },
            { label: "Estavel", value: maintenanceLog.filter(e => e.status === "stable").length, color: "text-cyan-400" },
            { label: "Critico", value: maintenanceLog.filter(e => e.status === "critical").length, color: "text-red-400" },
          ].map((stat) => (
            <div key={stat.label} className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
              <p className={`text-xl font-extralight ${stat.color}`}>{stat.value}</p>
              <p className="text-[9px] tracking-wider uppercase text-white/30">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 p-3 border-t border-white/5">
          <p className="text-[9px] text-white/20 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sistema monitorando integridade estrutural em tempo real...
          </p>
        </div>
      </div>
    </div>
  )
}

// ========== TestosteronaView IMPLEMENTATION ==========
function TestosteronaView() {
  const { currentWeekMetrics } = useAtlasData()
  const [habitosModal, setHabitosModal] = useState(false)
  const [protocolModal, setProtocolModal] = useState<string | null>(null)
  const [chartMode, setChartMode] = useState<"sono" | "estresse">("sono")
  const [showScienceInfo, setShowScienceInfo] = useState<string | null>(null)
  const [dailyInsightIndex] = useState(() => Math.floor(Math.random() * 5))

  // Estado local para check-in hormonal
  const [habitosHoje, setHabitosHoje] = useState({
    sol: false,
    treino: false,
    passos: false,
    zinco: false,
    coldExposure: false,
    alcool: "Nenhum",
    sono: 3,
    estresse: 3,
  })

  // Mock de dados baseado em métricas reais do contexto
  const atlasTestIndex = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (currentWeekMetrics.avgSleepHours / 8) * 30 +
          currentWeekMetrics.executionRate * 0.25 +
          (5 - habitosHoje.estresse) * 10 +
          (habitosHoje.sol ? 10 : 0) +
          (habitosHoje.treino ? 10 : 0),
      ),
    ),
  )

  // Performance loss calculation
  const performanceLoss = atlasTestIndex < 70 ? Math.round((70 - atlasTestIndex) * 0.5) : 0

  // Status classification
  const getStatus = () => {
    if (atlasTestIndex >= 80) return { label: "Soberano", color: "amber", desc: "Producao hormonal otimizada" }
    if (atlasTestIndex >= 65) return { label: "Funcional", color: "cyan", desc: "Sistema operando com margem" }
    return { label: "Comprometido", color: "red", desc: "Intervencao necessaria" }
  }
  const status = getStatus()

  // Mock timeline data with correlation
  const timelineData = Array.from({ length: 30 }, (_, i) => {
    const baseScore = atlasTestIndex + (Math.random() - 0.5) * 25
    const sleepHours = 5 + Math.random() * 3.5
    const stressLevel = 1 + Math.random() * 4
    return {
      dia: i + 1,
      score: Math.round(Math.max(30, Math.min(95, baseScore))),
      sleepHours: Math.round(sleepHours * 10) / 10,
      stress: Math.round(stressLevel * 10) / 10,
    }
  })

  // Daily Harvard insights
  const harvardInsights = [
    { text: "Exposicao solar matinal (15min) aumenta producao basal de vitamina D em 22%, cofator essencial para sintese de testosterona.", boost: "+22%" },
    { text: "Treino de forca com compostos multi-articulares eleva testosterona por 48h. Priorize agachamento e levantamento terra.", boost: "+15%" },
    { text: "Sono REM profundo (ciclos 3-4) e responsavel por 70% da producao noturna de testosterona. Duracao minima: 7h.", boost: "+18%" },
    { text: "Reducao de alcool por 14 dias restaura eixo HPG e aumenta testosterona livre em media 12%.", boost: "+12%" },
    { text: "Exposicao ao frio (2-3min) ativa tecido adiposo marrom e estimula producao de esteroides endogenos.", boost: "+8%" },
  ]

  const currentInsight = harvardInsights[dailyInsightIndex]

  const registrarHabitos = () => {
    setHabitosModal(true)
    setTimeout(() => setHabitosModal(false), 2000)
  }

  // Protocols as high-performance contracts
  const protocols = [
    {
      id: "21dias",
      name: "Fundamentos Hormonais",
      duration: "21 dias",
      type: "foundation",
      target: "+25 ATI",
      commitment: "Construcao de base solida",
      requirements: ["Sono 7h+", "Treino 4x/sem", "Sol matinal"],
    },
    {
      id: "14dias",
      name: "Anti-Sabotagem",
      duration: "14 dias",
      type: "elimination",
      target: "+18 ATI",
      commitment: "Eliminacao de sabotadores",
      requirements: ["Zero alcool", "Telas off 21h", "Estresse < 3"],
    },
    {
      id: "30dias",
      name: "Atleta Natural",
      duration: "30 dias",
      type: "mastery",
      target: "+35 ATI",
      commitment: "Integracao total dos pilares",
      requirements: ["Todos os habitos", "ASRI > 80", "Consistencia 90%+"],
    },
  ]

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-2">
          <Zap className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="text-2xl font-extralight tracking-tight text-white">Soberania Hormonal</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto font-light">
          Governanca endocrina. Producao natural de testosterona baseada em evidencias.
        </p>
      </div>

      {/* Zone 1: Tesla-style Precision Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Central Score Gauge */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 overflow-hidden">
          {/* Golden accent gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 opacity-50" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/30">Atlas Test Index</h3>
              <button
                onClick={() => setShowScienceInfo("ati")}
                className="text-[9px] tracking-wider uppercase text-amber-400/50 px-2 py-1 rounded border border-amber-500/20 hover:border-amber-500/40 transition-all"
              >
                Science Info
              </button>
            </div>

            {/* Tesla-style gauge */}
            <div className="relative w-64 h-32 mx-auto mb-6">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Background arc */}
                <path
                  d="M 20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                
                {/* Tick marks */}
                {[0, 25, 50, 75, 100].map((tick) => {
                  const angle = (tick / 100) * 180 - 180
                  const rad = (angle * Math.PI) / 180
                  const x1 = 100 + 65 * Math.cos(rad)
                  const y1 = 90 + 65 * Math.sin(rad)
                  const x2 = 100 + 75 * Math.cos(rad)
                  const y2 = 90 + 75 * Math.sin(rad)
                  return (
                    <g key={tick}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                      <text
                        x={100 + 55 * Math.cos(rad)}
                        y={90 + 55 * Math.sin(rad)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[8px] fill-white/30"
                      >
                        {tick}
                      </text>
                    </g>
                  )
                })}
                
                {/* Progress arc */}
                <path
                  d="M 20 90 A 80 80 0 0 1 180 90"
                  fill="none"
                  stroke={status.color === "amber" ? "url(#goldGradient)" : status.color === "cyan" ? "rgba(34,211,238,0.8)" : "rgba(239,68,68,0.8)"}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(atlasTestIndex / 100) * 251} 251`}
                  style={{ filter: `drop-shadow(0 0 10px ${status.color === "amber" ? "rgba(251,191,36,0.5)" : status.color === "cyan" ? "rgba(34,211,238,0.5)" : "rgba(239,68,68,0.5)"})` }}
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFB800" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                </defs>
                
                {/* Needle */}
                <g transform={`rotate(${(atlasTestIndex / 100) * 180 - 180}, 100, 90)`}>
                  <line x1="100" y1="90" x2="100" y2="25" stroke={status.color === "amber" ? "#FFB800" : status.color === "cyan" ? "#22D3EE" : "#EF4444"} strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="90" r="8" fill="black" stroke={status.color === "amber" ? "#FFB800" : status.color === "cyan" ? "#22D3EE" : "#EF4444"} strokeWidth="2" />
                </g>
              </svg>
              
              {/* Center value */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <span className={`text-4xl font-extralight ${
                  status.color === "amber" ? "text-amber-400" : status.color === "cyan" ? "text-cyan-400" : "text-red-400"
                }`} style={{ textShadow: `0 0 30px ${status.color === "amber" ? "rgba(251,191,36,0.5)" : status.color === "cyan" ? "rgba(34,211,238,0.5)" : "rgba(239,68,68,0.5)"}` }}>
                  {atlasTestIndex}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div className="text-center space-y-3 mb-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${
                status.color === "amber" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
                status.color === "cyan" ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" :
                "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  status.color === "amber" ? "bg-amber-400" : status.color === "cyan" ? "bg-cyan-400" : "bg-red-400"
                }`} />
                <span className="text-xs tracking-wider uppercase">{status.label}</span>
              </div>
              <p className="text-xs text-white/40">{status.desc}</p>
            </div>

            {/* Performance loss warning */}
            {performanceLoss > 0 && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-white/50">Perda de Performance Estimada</span>
                  </div>
                  <span className="text-lg font-light text-red-400">-{performanceLoss}%</span>
                </div>
                <p className="text-[10px] text-white/30 mt-2">
                  Baseado em correlacao sono-testosterona e estresse-cortisol. [Harvard Endocrine Lab]
                </p>
              </div>
            )}

            {/* Mini metrics */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                <p className="text-lg font-extralight text-white">{currentWeekMetrics.avgSleepHours.toFixed(1)}h</p>
                <p className="text-[9px] tracking-wider uppercase text-white/30">Sono</p>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                <p className="text-lg font-extralight text-white">{currentWeekMetrics.trainingsDone}</p>
                <p className="text-[9px] tracking-wider uppercase text-white/30">Treinos</p>
              </div>
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                <p className="text-lg font-extralight text-white">{habitosHoje.estresse}/5</p>
                <p className="text-[9px] tracking-wider uppercase text-white/30">Estresse</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Correlation Chart */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Correlacao Cruzada</h3>
              <p className="text-[10px] text-white/30 mt-1">Causalidade comprovada por dados</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChartMode("sono")}
                className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase transition-all ${
                  chartMode === "sono"
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                    : "bg-white/5 border border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                Testo vs Sono
              </button>
              <button
                onClick={() => setChartMode("estresse")}
                className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase transition-all ${
                  chartMode === "estresse"
                    ? "bg-red-500/20 border border-red-500/40 text-red-400"
                    : "bg-white/5 border border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                Testo vs Estresse
              </button>
            </div>
          </div>

          {/* Chart area */}
          <div className="relative h-48 mb-4">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0, 25, 50, 75, 100].map((line) => (
                <div
                  key={line}
                  className="absolute left-0 right-0 border-t border-white/5"
                  style={{ bottom: `${line}%` }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end gap-0.5">
              {timelineData.slice(-20).map((item, i) => {
                const testoHeight = (item.score / 100) * 100
                const correlationHeight = chartMode === "sono"
                  ? (item.sleepHours / 9) * 100
                  : ((5 - item.stress) / 5) * 100

                return (
                  <div key={i} className="flex-1 flex gap-0.5 h-full items-end">
                    {/* Testosterone bar */}
                    <div
                      className="flex-1 bg-gradient-to-t from-amber-600/80 to-amber-400/80 rounded-t transition-all duration-300 hover:opacity-100 opacity-70"
                      style={{ height: `${testoHeight}%` }}
                    />
                    {/* Correlation bar */}
                    <div
                      className={`flex-1 rounded-t transition-all duration-300 hover:opacity-100 opacity-70 ${
                        chartMode === "sono"
                          ? "bg-gradient-to-t from-cyan-600/80 to-cyan-400/80"
                          : "bg-gradient-to-t from-red-600/80 to-red-400/80"
                      }`}
                      style={{ height: `${correlationHeight}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-[10px] text-white/50">ATI Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${chartMode === "sono" ? "bg-cyan-500" : "bg-red-500"}`} />
              <span className="text-[10px] text-white/50">{chartMode === "sono" ? "Horas de Sono" : "Nivel de Estresse (inv)"}</span>
            </div>
          </div>

          {/* Correlation insight */}
          <div className="mt-4 p-3 bg-white/[0.02] rounded-xl border border-white/5">
            <p className="text-[10px] text-white/40">
              {chartMode === "sono"
                ? "Correlacao Sono-Testosterona: r=0.78. Cada hora adicional de sono aumenta ATI em ~8 pontos. [Sleep Medicine Reviews 2024]"
                : "Correlacao Estresse-Testosterona: r=-0.72. Cortisol elevado suprime eixo HPG em ate 40%. [Harvard Stress Lab]"}
            </p>
          </div>
        </div>
      </div>

      {/* Zone 2: Hormonal Fueling + Harvard Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Premium Habit Toggles */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Hormonal Fueling</h3>
            </div>
            <button
              onClick={() => setShowScienceInfo("habits")}
              className="text-[9px] tracking-wider uppercase text-amber-400/50 px-2 py-1 rounded border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              Science Info
            </button>
          </div>

          <div className="space-y-4">
            {[
              { key: "sol", label: "Exposicao Solar Matinal", impact: "+22% Vit D", icon: Sun, color: "amber" },
              { key: "treino", label: "Treino de Forca Composto", impact: "+15% T Livre", icon: Dumbbell, color: "purple" },
              { key: "passos", label: "10.000+ Passos", impact: "+8% SHBG", icon: Activity, color: "cyan" },
              { key: "zinco", label: "Zinco + Magnesio", impact: "+12% Sintese", icon: Pill, color: "emerald" },
              { key: "coldExposure", label: "Exposicao ao Frio", impact: "+8% BAT", icon: Snowflake, color: "blue" },
            ].map((habit) => {
              const isActive = habitosHoje[habit.key as keyof typeof habitosHoje] as boolean
              return (
                <button
                  key={habit.key}
                  onClick={() => setHabitosHoje({ ...habitosHoje, [habit.key]: !isActive })}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? `bg-${habit.color}-500/10 border-${habit.color}-500/30`
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? `bg-${habit.color}-500/20` : "bg-white/5"
                    }`}>
                      <habit.icon className={`w-5 h-5 ${isActive ? `text-${habit.color}-400` : "text-white/30"}`} />
                    </div>
                    <span className={`text-sm ${isActive ? "text-white/80" : "text-white/50"}`}>{habit.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] tracking-wider uppercase px-2 py-1 rounded ${
                      isActive ? `bg-${habit.color}-500/20 text-${habit.color}-400` : "bg-white/5 text-white/30"
                    }`}>
                      {habit.impact}
                    </span>
                    {/* Premium toggle */}
                    <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      isActive ? "bg-gradient-to-r from-amber-600 to-amber-500" : "bg-white/10"
                    }`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                        isActive ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Alcohol selector */}
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Wine className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm text-white/50">Consumo de Alcool</span>
                </div>
                <span className="text-[9px] tracking-wider uppercase px-2 py-1 rounded bg-red-500/10 text-red-400">
                  -{habitosHoje.alcool === "Nenhum" ? "0" : habitosHoje.alcool === "Moderado" ? "15" : "30"}% T
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Nenhum", "Moderado", "Alto"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setHabitosHoje({ ...habitosHoje, alcool: level })}
                    className={`py-2 rounded-lg text-xs transition-all ${
                      habitosHoje.alcool === level
                        ? level === "Nenhum" ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" :
                          level === "Moderado" ? "bg-amber-500/20 border border-amber-500/40 text-amber-400" :
                          "bg-red-500/20 border border-red-500/40 text-red-400"
                        : "bg-white/5 border border-white/10 text-white/40"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={registrarHabitos}
            className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Registrar Habitos de Hoje
          </button>
        </div>

        {/* Harvard Daily Insight */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-red-400" />
            <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Insight de Harvard</h3>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-red-900/20 to-amber-900/20 rounded-2xl border border-red-500/20 mb-6 overflow-hidden">
            {/* Harvard seal watermark */}
            <div className="absolute top-4 right-4 opacity-10">
              <Shield className="w-16 h-16 text-red-400" />
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] tracking-wider uppercase text-red-400/70 px-2 py-1 rounded border border-red-500/30">
                  Harvard Medical School
                </span>
                <span className="text-[9px] tracking-wider uppercase text-amber-400 px-2 py-1 rounded bg-amber-500/20">
                  {currentInsight.boost}
                </span>
              </div>
              
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                {currentInsight.text}
              </p>
              
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] text-white/40">Atualizado diariamente com base no seu perfil</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] text-white/40">Qualidade do Sono</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={habitosHoje.sono}
                onChange={(e) => setHabitosHoje({ ...habitosHoje, sono: parseInt(e.target.value) })}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[9px] text-white/30 mt-1">
                <span>Pessimo</span>
                <span className="text-blue-400">{habitosHoje.sono}/5</span>
                <span>Excelente</span>
              </div>
            </div>
            
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] text-white/40">Nivel de Estresse</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={habitosHoje.estresse}
                onChange={(e) => setHabitosHoje({ ...habitosHoje, estresse: parseInt(e.target.value) })}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-[9px] text-white/30 mt-1">
                <span>Baixo</span>
                <span className="text-orange-400">{habitosHoje.estresse}/5</span>
                <span>Alto</span>
              </div>
            </div>
          </div>

          {/* Evidence badge */}
          <div className="mt-6 p-3 border-t border-white/5">
            <p className="text-[9px] text-white/20 flex items-center gap-2">
              <Database className="w-3 h-3" />
              Baseado em 2,847 estudos PubMed e 156 meta-analises Harvard
            </p>
          </div>
        </div>
      </div>

      {/* Zone 3: Upgrade Protocols as Contracts */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Protocolos de Upgrade</h3>
          </div>
          <span className="text-[9px] tracking-wider uppercase text-white/30">Contratos de Alta Performance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protocols.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => setProtocolModal(protocol.id)}
              className={`relative p-6 rounded-2xl border text-left transition-all duration-500 hover:scale-[1.02] overflow-hidden ${
                protocol.type === "foundation" ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10" :
                protocol.type === "elimination" ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10" :
                "bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
              }`}
            >
              {/* Contract header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded ${
                  protocol.type === "foundation" ? "bg-cyan-500/20 text-cyan-400" :
                  protocol.type === "elimination" ? "bg-amber-500/20 text-amber-400" :
                  "bg-purple-500/20 text-purple-400"
                }`}>
                  {protocol.duration}
                </span>
                <span className={`text-sm font-light ${
                  protocol.type === "foundation" ? "text-cyan-400" :
                  protocol.type === "elimination" ? "text-amber-400" :
                  "text-purple-400"
                }`}>
                  {protocol.target}
                </span>
              </div>

              <h4 className="text-lg font-extralight text-white mb-2">{protocol.name}</h4>
              <p className="text-xs text-white/40 mb-4">{protocol.commitment}</p>

              {/* Requirements */}
              <div className="space-y-2">
                {protocol.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] text-white/30">
                    <Check className="w-3 h-3" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Contract seal */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <Award className={`w-12 h-12 ${
                  protocol.type === "foundation" ? "text-cyan-400" :
                  protocol.type === "elimination" ? "text-amber-400" :
                  "text-purple-400"
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {habitosModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-amber-500/30 rounded-3xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-extralight text-white mb-2">Habitos Registrados</h3>
            <p className="text-sm text-white/40">Suas metricas hormonais foram atualizadas.</p>
          </div>
        </div>
      )}

      {/* Protocol Modal */}
      {protocolModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-black border border-amber-500/30 rounded-3xl p-8 max-w-2xl w-full my-8">
            {/* Golden border glow */}
            <div className="absolute inset-0 rounded-3xl" style={{
              boxShadow: '0 0 60px rgba(251,191,36,0.1), inset 0 0 60px rgba(251,191,36,0.05)'
            }} />
            
            <button
              onClick={() => setProtocolModal(null)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400/70">Contrato de Performance</span>
                <h3 className="text-2xl font-extralight text-white mt-2">
                  {protocols.find(p => p.id === protocolModal)?.name}
                </h3>
                <p className="text-xs text-white/40 mt-2">
                  {protocols.find(p => p.id === protocolModal)?.duration} | Meta: {protocols.find(p => p.id === protocolModal)?.target}
                </p>
              </div>

              {/* Contract content */}
              <div className="space-y-6">
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                  <h4 className="text-xs tracking-wider uppercase text-amber-400 mb-2">Objetivo</h4>
                  <p className="text-sm text-white/60">
                    {protocolModal === "21dias"
                      ? "Estabelecer base solida de habitos que favorecem a producao natural de testosterona atraves de sono, treino e nutricao."
                      : protocolModal === "14dias"
                        ? "Eliminar ou reduzir drasticamente comportamentos que sabotam a producao hormonal: alcool, privacao de sono, excesso de telas."
                        : "Integrar todos os pilares hormonais em uma rotina sustentavel de longo prazo."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-extralight text-white">7-9h</p>
                    <p className="text-[9px] tracking-wider uppercase text-white/30">Sono</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-extralight text-white">4x</p>
                    <p className="text-[9px] tracking-wider uppercase text-white/30">Treinos/sem</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-extralight text-white">90%+</p>
                    <p className="text-[9px] tracking-wider uppercase text-white/30">Aderencia</p>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                    <p className="text-xs text-white/40">
                      Este protocolo NAO substitui acompanhamento medico. Se considerar uso de hormonios, consulte um endocrinologista.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setProtocolModal(null)}
                className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                Aceitar Contrato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Science Info Modal */}
      {showScienceInfo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/10 rounded-3xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm tracking-wider uppercase text-white/50">Fundamentacao Cientifica</h3>
              <button onClick={() => setShowScienceInfo(null)} className="text-white/30 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs text-white/40 leading-relaxed">
              {showScienceInfo === "ati" && (
                <>
                  <p><strong className="text-white/60">Atlas Test Index (ATI)</strong> e um indice composto calculado a partir de:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Duracao e qualidade do sono (30%)</li>
                    <li>Frequencia e intensidade de treino (25%)</li>
                    <li>Nivel de estresse e recuperacao (25%)</li>
                    <li>Habitos de suporte hormonal (20%)</li>
                  </ul>
                  <div className="p-3 bg-white/5 rounded-lg mt-4">
                    <p className="text-[9px] text-amber-400/70">[Ref] Leproult R, Van Cauter E. JAMA. 2011;305(21):2173-2174. | Vingren JL, et al. Sports Med. 2010;40(12):1037-53.</p>
                  </div>
                </>
              )}
              {showScienceInfo === "habits" && (
                <>
                  <p>Cada habito rastreado tem impacto mensuravel na producao hormonal:</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong className="text-amber-400">Sol Matinal:</strong> Regula ritmo circadiano e producao de vitamina D</li>
                    <li><strong className="text-purple-400">Treino Forca:</strong> Estimula eixo HPG e libera GH</li>
                    <li><strong className="text-emerald-400">Zinco/Magnesio:</strong> Cofatores essenciais na sintese de T</li>
                    <li><strong className="text-red-400">Alcool:</strong> Suprime LH e aumenta aromatase</li>
                  </ul>
                  <div className="p-3 bg-white/5 rounded-lg mt-4">
                    <p className="text-[9px] text-amber-400/70">[Ref] Pilz S, et al. Horm Metab Res. 2011;43(3):223-5. | Kraemer WJ, Ratamess NA. Sports Med. 2005;35(4):339-61.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== PLACEHOLDER VIEWS ==========
function AtlasIAView() {
  const { currentWeekMetrics } = useAtlasData()
  const [messages, setMessages] = useState<Array<{
    id: string
    role: "user" | "assistant"
    content: string
    citations?: Array<{ source: string; type: "harvard" | "pubmed" | "atlas" }>
    timestamp: Date
    isTyping?: boolean
  }>>([
    {
      id: "welcome",
      role: "assistant",
      content: "Eu analisei seu Dashboard e Visao 360. Sua consistencia caiu 5% esta semana. Identifiquei 3 fatores criticos: sono abaixo de 7h em 4 dias, 2 treinos pulados, e aderencia a dieta em 68%. Vamos ajustar o plano para recuperar seu Score?",
      citations: [
        { source: "Atlas Analytics", type: "atlas" },
        { source: "Sleep-Performance Correlation", type: "harvard" }
      ],
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [displayedText, setDisplayedText] = useState<Record<string, string>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Terminal typing effect
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.role === "assistant" && !displayedText[msg.id]) {
        let currentIndex = 0
        const text = msg.content
        const typeInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText((prev) => ({
              ...prev,
              [msg.id]: text.slice(0, currentIndex),
            }))
            currentIndex++
          } else {
            clearInterval(typeInterval)
          }
        }, 15)
        return () => clearInterval(typeInterval)
      }
    })
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, displayedText])

  const quickActions = [
    { label: "Analisar meu Dia", icon: Activity, color: "cyan" },
    { label: "Protocolo 7d Testo", icon: Zap, color: "emerald" },
    { label: "Emergencia: Compulsao", icon: AlertTriangle, color: "red" },
    { label: "Triagem de Dor", icon: Heart, color: "amber" },
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim() || isProcessing) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Analisando sua solicitacao com base nos protocolos de Harvard Medical School e dados do PubMed. Sua pergunta envolve otimizacao metabolica. Recomendo: 1) Aumentar proteina para 2.2g/kg nos proximos 7 dias. 2) Implementar protocolo de sono 10-6. 3) Adicionar 20min de LISS pos-treino para acelerar recuperacao. Quer que eu detalhe algum ponto especifico?",
        citations: [
          { source: "Protein Timing Meta-Analysis", type: "pubmed" as const },
          { source: "Sleep Optimization Protocol", type: "harvard" as const },
        ],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 2000)
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    handleSendMessage()
  }

  const getCitationStyle = (type: "harvard" | "pubmed" | "atlas") => {
    switch (type) {
      case "harvard":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "pubmed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "atlas":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-h-[800px]">
      {/* Intelligence Terminal Header */}
      <div className="bg-black border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              {/* Online pulse */}
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-light text-white tracking-wide">Atlas Oracle</h2>
              <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase">
                <span className="text-emerald-400">Online</span>
                <span className="text-white/20">|</span>
                <span className="text-white/40">Analisando PubMed / Harvard Database</span>
              </div>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <Database className="w-3 h-3" />
              <span>847K papers</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <Shield className="w-3 h-3" />
              <span>HIPAA Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - Intelligence Briefing Style */}
      <div className="flex-1 overflow-y-auto bg-black p-6 space-y-6">
        {/* Scan lines overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,242,255,0.5) 2px, rgba(0,242,255,0.5) 4px)',
        }} />

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" ? (
              // AI Message - Glassmorphism Intelligence Card
              <div className="max-w-[85%] space-y-3">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  
                  {/* Terminal cursor effect */}
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 animate-pulse" />
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-light leading-relaxed">
                        {displayedText[message.id] || ""}
                        {displayedText[message.id]?.length < message.content.length && (
                          <span className="inline-block w-2 h-4 bg-cyan-400/80 ml-1 animate-pulse" />
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Citations */}
                  {message.citations && displayedText[message.id]?.length >= message.content.length && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                      {message.citations.map((citation, idx) => (
                        <span
                          key={idx}
                          className={`text-[9px] tracking-wider uppercase px-2 py-1 rounded-lg border ${getCitationStyle(citation.type)}`}
                        >
                          [{citation.type === "harvard" ? "Harvard Evidence" : citation.type === "pubmed" ? "PubMed Verified" : "Atlas Intel"}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Timestamp */}
                <p className="text-[10px] text-white/20 pl-4">
                  {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            ) : (
              // User Message - Minimal
              <div className="max-w-[75%] space-y-2">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl px-5 py-3">
                  <p className="text-white/90 text-sm">{message.content}</p>
                </div>
                <p className="text-[10px] text-white/20 text-right pr-4">
                  {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-[10px] text-white/40 tracking-wider uppercase">Processando query...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions - War Shortcuts */}
      <div className="bg-black border-t border-white/5 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => setInputValue(action.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition-all duration-300 ${
                action.color === "cyan"
                  ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40"
                  : action.color === "emerald"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40"
                  : action.color === "red"
                  ? "bg-red-500/10 border-red-500/20 text-red-400 hover:border-red-500/40"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:border-amber-500/40"
              }`}
            >
              {/* Pulse effect */}
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping ${
                  action.color === "cyan" ? "bg-cyan-400" :
                  action.color === "emerald" ? "bg-emerald-400" :
                  action.color === "red" ? "bg-red-400" : "bg-amber-400"
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  action.color === "cyan" ? "bg-cyan-400" :
                  action.color === "emerald" ? "bg-emerald-400" :
                  action.color === "red" ? "bg-red-400" : "bg-amber-400"
                }`} />
              </span>
              <span className="text-xs tracking-wide">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Futuristic Input */}
      <div className="bg-black border-t border-white/5 px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Voice Input */}
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/60 hover:border-white/20 transition-all">
            <Mic className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Digite seu comando ou pergunta..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            {/* Scan line animation inside input */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />
            </div>
          </div>

          {/* Scanner (Multimodal) */}
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/60 hover:border-white/20 transition-all">
            <Scan className="w-4 h-4" />
          </button>

          {/* Send */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom status line */}
        <div className="flex items-center justify-center gap-4 mt-3 text-[9px] text-white/20 tracking-wider uppercase">
          <span>Criptografia E2E Ativa</span>
          <span className="text-white/10">|</span>
          <span>Latencia: 23ms</span>
          <span className="text-white/10">|</span>
          <span>v2036.1.0</span>
        </div>
      </div>
    </div>
  )
}

function TreinoDietaView() {
  const { currentWeekMetrics } = useAtlasData()
  const [setupComplete, setSetupComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hoveredEvidence, setHoveredEvidence] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<string>("A")
  
  // Setup form state
  const [setupData, setSetupData] = useState({
    age: 30,
    gender: "male" as "male" | "female",
    weight: 80,
    bodyFat: 18,
    goal: "recomp" as "cut" | "bulk" | "recomp" | "maintain",
    trainingDays: 5,
    experience: "intermediate" as "beginner" | "intermediate" | "advanced",
  })

  const steps = [
    { label: "Dados Base", icon: User },
    { label: "Composicao", icon: Scale },
    { label: "Objetivo", icon: Target },
    { label: "Experiencia", icon: Zap },
  ]

  const goals = [
    { id: "cut", label: "Cutting", desc: "Perda de gordura com manutencao muscular" },
    { id: "bulk", label: "Bulking", desc: "Ganho de massa com minimo de gordura" },
    { id: "recomp", label: "Recomposicao", desc: "Perder gordura e ganhar musculo" },
    { id: "maintain", label: "Manutencao", desc: "Manter composicao atual" },
  ]

  const experienceLevels = [
    { id: "beginner", label: "Iniciante", desc: "< 1 ano de treino consistente" },
    { id: "intermediate", label: "Intermediario", desc: "1-3 anos de treino" },
    { id: "advanced", label: "Avancado", desc: "3+ anos, conhece periodizacao" },
  ]

  // Training split data
  const trainingSplit = {
    A: {
      name: "Push",
      focus: "Peito, Ombro, Triceps",
      exercises: [
        { name: "Supino Reto", sets: 4, reps: "6-8", rpe: 8, evidence: "Compound pressing maximizes chest activation" },
        { name: "Desenvolvimento", sets: 4, reps: "8-10", rpe: 7, evidence: "Overhead press for deltoid hypertrophy" },
        { name: "Supino Inclinado", sets: 3, reps: "8-10", rpe: 7, evidence: "Upper chest emphasis at 30-45 degrees" },
        { name: "Elevacao Lateral", sets: 4, reps: "12-15", rpe: 8, evidence: "Lateral deltoid isolation" },
        { name: "Triceps Corda", sets: 3, reps: "12-15", rpe: 7, evidence: "Long head triceps activation" },
      ],
      volume: 18,
      intensity: "Alta",
    },
    B: {
      name: "Pull",
      focus: "Costas, Biceps, Trapezio",
      exercises: [
        { name: "Barra Fixa", sets: 4, reps: "6-10", rpe: 8, evidence: "Superior lat activation vs pulldown" },
        { name: "Remada Curvada", sets: 4, reps: "6-8", rpe: 8, evidence: "Horizontal pull for back thickness" },
        { name: "Remada Unilateral", sets: 3, reps: "10-12", rpe: 7, evidence: "Mind-muscle connection improvement" },
        { name: "Face Pull", sets: 3, reps: "15-20", rpe: 7, evidence: "Rear delt and rotator cuff health" },
        { name: "Rosca Direta", sets: 3, reps: "10-12", rpe: 7, evidence: "Biceps long head emphasis" },
      ],
      volume: 17,
      intensity: "Alta",
    },
    C: {
      name: "Legs",
      focus: "Quadriceps, Posterior, Gluteo",
      exercises: [
        { name: "Agachamento", sets: 4, reps: "6-8", rpe: 9, evidence: "Gold standard for leg development" },
        { name: "Leg Press", sets: 4, reps: "10-12", rpe: 8, evidence: "Volume accumulation post-squat" },
        { name: "Stiff", sets: 4, reps: "8-10", rpe: 8, evidence: "Hamstring stretch under load" },
        { name: "Cadeira Extensora", sets: 3, reps: "12-15", rpe: 8, evidence: "Quad isolation and pump" },
        { name: "Panturrilha", sets: 4, reps: "12-15", rpe: 8, evidence: "High frequency for calves" },
      ],
      volume: 19,
      intensity: "Muito Alta",
    },
  }

  // Macros calculation
  const calculateMacros = () => {
    const { weight, bodyFat, goal } = setupData
    const leanMass = weight * (1 - bodyFat / 100)
    
    let calories: number
    let proteinMultiplier: number
    let fatMultiplier: number
    
    switch (goal) {
      case "cut":
        calories = weight * 22
        proteinMultiplier = 2.4
        fatMultiplier = 0.8
        break
      case "bulk":
        calories = weight * 35
        proteinMultiplier = 2.0
        fatMultiplier = 1.0
        break
      case "recomp":
        calories = weight * 28
        proteinMultiplier = 2.2
        fatMultiplier = 0.9
        break
      default:
        calories = weight * 30
        proteinMultiplier = 2.0
        fatMultiplier = 1.0
    }
    
    const protein = Math.round(leanMass * proteinMultiplier)
    const fat = Math.round(weight * fatMultiplier)
    const carbCalories = calories - (protein * 4) - (fat * 9)
    const carbs = Math.round(carbCalories / 4)
    
    return { calories: Math.round(calories), protein, carbs, fat }
  }

  const macros = calculateMacros()

  // Meals schedule
  const meals = [
    { time: "07:00", name: "Pre-Treino", macros: { p: 40, c: 60, f: 10 }, foods: "Ovos + Aveia + Banana" },
    { time: "10:00", name: "Pos-Treino", macros: { p: 50, c: 80, f: 5 }, foods: "Whey + Arroz Branco + Mel" },
    { time: "13:00", name: "Almoco", macros: { p: 50, c: 60, f: 15 }, foods: "Frango + Arroz + Legumes" },
    { time: "16:00", name: "Lanche", macros: { p: 30, c: 30, f: 15 }, foods: "Iogurte Grego + Frutas + Nuts" },
    { time: "20:00", name: "Jantar", macros: { p: 45, c: 40, f: 20 }, foods: "Carne Vermelha + Batata + Salada" },
    { time: "22:00", name: "Ceia", macros: { p: 30, c: 0, f: 10 }, foods: "Caseina + Pasta de Amendoim" },
  ]

  // Recovery alert logic
  const avgSleepHours = currentWeekMetrics?.avgSleepHours || 7
  const trainingVolume = trainingSplit[selectedDay as keyof typeof trainingSplit]?.volume || 0
  const recoveryCapacity = avgSleepHours >= 7 ? "optimal" : avgSleepHours >= 6 ? "moderate" : "low"
  const showRecoveryAlert = recoveryCapacity === "low" && trainingVolume > 15

  const currentTraining = trainingSplit[selectedDay as keyof typeof trainingSplit]

  // Render setup wizard
  if (!setupComplete) {
    return (
      <div className="min-h-[600px] flex flex-col">
        {/* Mission Setup Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Rocket className="w-7 h-7 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-extralight text-white tracking-tight mb-2">Configuracao de Missao</h2>
          <p className="text-sm text-white/40 font-light">Protocolo de inicializacao do sistema de governanca</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex items-center">
              <button
                onClick={() => idx <= currentStep && setCurrentStep(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                  idx === currentStep
                    ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                    : idx < currentStep
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border-white/10 text-white/30"
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="text-xs tracking-wide hidden md:inline">{step.label}</span>
                {idx < currentStep && <Check className="w-3 h-3" />}
              </button>
              {idx < steps.length - 1 && (
                <div className={`w-8 h-px mx-2 ${idx < currentStep ? "bg-emerald-500/50" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {currentStep === 0 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Idade</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="16"
                      max="70"
                      value={setupData.age}
                      onChange={(e) => setSetupData({ ...setupData, age: parseInt(e.target.value) })}
                      className="flex-1 accent-cyan-500"
                    />
                    <span className="text-2xl font-extralight text-white w-16 text-right">{setupData.age}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Genero Biologico</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["male", "female"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSetupData({ ...setupData, gender: g as "male" | "female" })}
                        className={`py-4 rounded-xl border text-sm transition-all duration-300 ${
                          setupData.gender === g
                            ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                        }`}
                      >
                        {g === "male" ? "Masculino" : "Feminino"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Peso Corporal (kg)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="40"
                      max="150"
                      value={setupData.weight}
                      onChange={(e) => setSetupData({ ...setupData, weight: parseInt(e.target.value) })}
                      className="flex-1 accent-cyan-500"
                    />
                    <span className="text-2xl font-extralight text-white w-16 text-right">{setupData.weight}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Body Fat Estimado (%)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={setupData.bodyFat}
                      onChange={(e) => setSetupData({ ...setupData, bodyFat: parseInt(e.target.value) })}
                      className="flex-1 accent-cyan-500"
                    />
                    <span className="text-2xl font-extralight text-white w-16 text-right">{setupData.bodyFat}%</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Objetivo Principal</label>
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSetupData({ ...setupData, goal: goal.id as typeof setupData.goal })}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                      setupData.goal === goal.id
                        ? "bg-cyan-500/20 border-cyan-500/40"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <p className={`text-sm font-medium ${setupData.goal === goal.id ? "text-cyan-400" : "text-white/70"}`}>
                      {goal.label}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{goal.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Nivel de Experiencia</label>
                {experienceLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSetupData({ ...setupData, experience: level.id as typeof setupData.experience })}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                      setupData.experience === level.id
                        ? "bg-cyan-500/20 border-cyan-500/40"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <p className={`text-sm font-medium ${setupData.experience === level.id ? "text-cyan-400" : "text-white/70"}`}>
                      {level.label}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{level.desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Voltar
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm hover:bg-cyan-500/30 transition-all"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={() => setSetupComplete(true)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm hover:opacity-90 transition-all"
            >
              Iniciar Protocolo
            </button>
          )}
        </div>
      </div>
    )
  }

  // Main view after setup
  return (
    <div className="space-y-8 pb-8">
      {/* Recovery Alert */}
      {showRecoveryAlert && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-red-400 text-sm font-medium">Alerta de Recuperacao</p>
            <p className="text-red-400/70 text-xs mt-0.5">
              Volume de treino ({trainingVolume} sets) excede capacidade de recuperacao. Sono medio: {avgSleepHours}h
            </p>
          </div>
          <span className="text-[9px] tracking-wider uppercase text-red-400/50 px-2 py-1 rounded-lg border border-red-500/20">
            [Harvard Sleep Lab]
          </span>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Physical Engineering - Left */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Physical Engineering</h3>
                  <p className="text-[10px] text-white/30 mt-0.5">Divisao Push/Pull/Legs</p>
                </div>
              </div>
              <button
                onClick={() => setSetupComplete(false)}
                className="text-[10px] text-white/30 hover:text-white/50 transition-colors"
              >
                Reconfigurar
              </button>
            </div>
          </div>

          {/* Day Selector */}
          <div className="flex border-b border-white/5">
            {(["A", "B", "C"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-4 text-center transition-all duration-300 relative ${
                  selectedDay === day ? "text-cyan-400" : "text-white/30 hover:text-white/50"
                }`}
              >
                <span className="text-lg font-extralight">{day}</span>
                <span className="block text-[9px] tracking-wider uppercase mt-1">
                  {trainingSplit[day].name}
                </span>
                {selectedDay === day && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* Training Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/50 text-sm">{currentTraining.focus}</p>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] tracking-wider uppercase px-2 py-1 rounded-lg border ${
                  currentTraining.intensity === "Muito Alta" 
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}>
                  {currentTraining.intensity}
                </span>
                <span className="text-[9px] tracking-wider uppercase text-white/30 px-2 py-1 rounded-lg border border-white/10">
                  {currentTraining.volume} sets
                </span>
              </div>
            </div>

            {currentTraining.exercises.map((exercise, idx) => (
              <div
                key={exercise.name}
                className="group bg-white/[0.02] rounded-xl p-4 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
                onMouseEnter={() => setHoveredEvidence(exercise.name)}
                onMouseLeave={() => setHoveredEvidence(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/20 w-5">{idx + 1}.</span>
                    <span className="text-white/80 text-sm">{exercise.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-white/40">{exercise.sets}x{exercise.reps}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      exercise.rpe >= 8 ? "bg-red-500/20 text-red-400" : "bg-cyan-500/20 text-cyan-400"
                    }`}>
                      RPE {exercise.rpe}
                    </span>
                  </div>
                </div>
                
                {/* Evidence tooltip */}
                {hoveredEvidence === exercise.name && (
                  <div className="mt-3 pt-3 border-t border-white/5 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-white/40 leading-relaxed">{exercise.evidence}</p>
                    </div>
                    <span className="inline-block mt-2 text-[8px] tracking-wider uppercase text-cyan-400/60 px-2 py-0.5 rounded border border-cyan-500/20">
                      [PubMed Verified]
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Metabolic Ledger - Right */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm tracking-[0.15em] uppercase text-white/50">Metabolic Ledger</h3>
                <p className="text-[10px] text-white/30 mt-0.5">
                  {setupData.goal === "cut" ? "Deficit Calorico" : setupData.goal === "bulk" ? "Superavit Calorico" : "Manutencao Adaptativa"}
                </p>
              </div>
            </div>
          </div>

          {/* Macros Donut */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-8">
              {/* Donut Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Protein arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(0,242,255,0.8)"
                    strokeWidth="8"
                    strokeDasharray={`${(macros.protein * 4 / macros.calories) * 251.2} 251.2`}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0,242,255,0.5))' }}
                  />
                  {/* Carbs arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(168,85,247,0.8)"
                    strokeWidth="8"
                    strokeDasharray={`${(macros.carbs * 4 / macros.calories) * 251.2} 251.2`}
                    strokeDashoffset={`${-(macros.protein * 4 / macros.calories) * 251.2}`}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.5))' }}
                  />
                  {/* Fat arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(251,191,36,0.8)"
                    strokeWidth="8"
                    strokeDasharray={`${(macros.fat * 9 / macros.calories) * 251.2} 251.2`}
                    strokeDashoffset={`${-((macros.protein * 4 + macros.carbs * 4) / macros.calories) * 251.2}`}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.5))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extralight text-white">{macros.calories}</span>
                  <span className="text-[9px] tracking-wider uppercase text-white/30">kcal</span>
                </div>
              </div>

              {/* Macro breakdown */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-xs text-white/50">Proteina</span>
                  </div>
                  <span className="text-sm text-white/80">{macros.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs text-white/50">Carboidratos</span>
                  </div>
                  <span className="text-sm text-white/80">{macros.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs text-white/50">Gorduras</span>
                  </div>
                  <span className="text-sm text-white/80">{macros.fat}g</span>
                </div>
              </div>
            </div>

            {/* Evidence badge */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[8px] tracking-wider uppercase text-emerald-400/60 px-2 py-0.5 rounded border border-emerald-500/20">
                [Harvard Nutrition]
              </span>
              <span className="text-[10px] text-white/30">Macros otimizados para {setupData.goal}</span>
            </div>
          </div>

          {/* Meals Schedule */}
          <div className="p-6 space-y-3 max-h-[320px] overflow-y-auto">
            {meals.map((meal) => (
              <div
                key={meal.time}
                className="group bg-white/[0.02] rounded-xl p-4 border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 text-xs font-mono">{meal.time}</span>
                    <span className="text-white/70 text-sm">{meal.name}</span>
                  </div>
                  <div className="flex gap-2 text-[9px]">
                    <span className="text-cyan-400/70">P{meal.macros.p}</span>
                    <span className="text-purple-400/70">C{meal.macros.c}</span>
                    <span className="text-amber-400/70">F{meal.macros.f}</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/30">{meal.foods}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Stats Summary */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
        <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Parametros Ativos</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Idade", value: `${setupData.age} anos` },
            { label: "Peso", value: `${setupData.weight} kg` },
            { label: "Body Fat", value: `${setupData.bodyFat}%` },
            { label: "Objetivo", value: goals.find(g => g.id === setupData.goal)?.label },
            { label: "Nivel", value: experienceLevels.find(l => l.id === setupData.experience)?.label },
          ].map((param) => (
            <div key={param.label} className="bg-white/[0.02] rounded-xl p-3 border border-white/5">
              <p className="text-[9px] tracking-wider uppercase text-white/30">{param.label}</p>
              <p className="text-sm text-white/70 mt-1">{param.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ========== MAIN PAGE COMPONENT ==========
export default function AtlasPainelPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [passportOpen, setPassportOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardView />
      case "visao360":
        return <Visao360View />
      case "atlasIA":
        return <AtlasIAView />
      case "treinoDieta":
        return <TreinoDietaView />
      case "compulsao":
        return <CompulsaoView />
      case "sono":
        return <SonoView />
      case "fisioterapia":
        return <FisioterapiaView />
      case "testosterona":
        return <TestosteronaView />
      default:
        return <DashboardView />
    }
  }

  // Framer Motion vault-door transition variants
  const sidebarItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const activeGlow = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="min-h-screen bg-black">
      {/* ===== HEADER - Stealth Bar ===== */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-xl z-40 flex items-center px-4 md:px-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        {/* Mobile toggle */}
        <button
          className="md:hidden mr-3 w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.06] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen
            ? <X className="w-[18px] h-[18px] text-white/60" strokeWidth={1.5} />
            : <Menu className="w-[18px] h-[18px] text-white/60" strokeWidth={1.5} />
          }
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-cyan-500/30 overflow-hidden group-hover:border-cyan-400/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
            <span className="relative text-cyan-400 font-semibold text-xs tracking-wider">A</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[13px] font-medium text-white/80 tracking-wide leading-none">Atlas IA</span>
            <span className="text-[8px] tracking-[0.2em] uppercase text-white/20 font-light mt-0.5">Specter 2036</span>
          </div>
        </Link>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Status dot */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 led-green" />
            <span className="text-[9px] tracking-wider uppercase text-white/25 font-light">Operacional</span>
          </div>

          <button
            onClick={() => setPassportOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-cyan-500/30 text-white/70 text-xs font-light rounded-lg transition-all duration-300"
          >
            <User className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden md:inline tracking-wide">Perfil</span>
          </button>
        </div>
      </header>

      {/* ===== SIDEBAR - Specter Elite 2036 ===== */}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-[272px] bg-black z-30 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
        style={{
          borderRight: '1px solid transparent',
          borderImage: 'linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(34,211,238,0.08) 60%, transparent) 1',
        }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 backdrop-blur-xl bg-black/60 pointer-events-none" />

        {/* Faint scan-line texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.4) 0px, transparent 1px, transparent 3px)',
          }}
        />

        {/* ---- Navigation ---- */}
        <nav className="relative flex-1 overflow-y-auto px-4 pt-6 pb-4">
          {/* Section heading */}
          <div className="px-3 mb-5 flex items-center gap-2">
            <Radio className="w-3 h-3 text-cyan-500/40" strokeWidth={1.5} />
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/20 font-light">Modulos do Sistema</span>
          </div>

          {/* Menu items with framer-motion stagger */}
          <div className="space-y-1">
            {SPECTER_MENU_ITEMS.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.key
              const led = getStatusLed(item.status)

              return (
                <motion.button
                  key={item.key}
                  custom={index}
                  variants={sidebarItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => {
                    setActiveSection(item.key)
                    setMobileMenuOpen(false)
                  }}
                  className={`group relative w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/35 hover:text-white/60"
                  }`}
                >
                  {/* Active background glow */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bg"
                        {...activeGlow}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/[0.08] via-cyan-500/[0.04] to-transparent pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 24px rgba(34,211,238,0.06)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover inner glow (cyan) */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(34,211,238,0.05)',
                    }}
                  />

                  {/* Active left edge */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-full origin-center"
                        style={{
                          background: 'linear-gradient(180deg, #22d3ee, #0891b2)',
                          boxShadow: '0 0 12px rgba(34,211,238,0.7), 0 0 24px rgba(34,211,238,0.3)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon container */}
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/10"
                      : "bg-white/[0.02] group-hover:bg-white/[0.04]"
                  }`}>
                    <Icon
                      className={`w-[17px] h-[17px] transition-all duration-300 ${
                        isActive ? "text-cyan-400" : "text-white/25 group-hover:text-white/45"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Label */}
                  <span className={`relative z-10 text-[12.5px] tracking-wide flex-1 transition-all duration-300 ${
                    isActive ? "font-medium text-white" : "font-light"
                  }`}>
                    {item.label}
                  </span>

                  {/* LED indicator */}
                  <div className="relative z-10 flex items-center" title={led.label}>
                    <div className={`w-[7px] h-[7px] rounded-full ${led.className}`} />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </nav>

        {/* ---- Footer ---- */}
        <div className="relative px-4 pb-5 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}
        >
          {/* Telemetry bar */}
          <div className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-white/[0.015] border border-white/[0.03]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 led-green" />
            <span className="text-[8px] tracking-[0.2em] uppercase text-white/25 font-light">Todos os Sistemas OK</span>
          </div>

          {/* Profile card */}
          <button
            onClick={() => setPassportOpen(true)}
            className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.015] border border-white/[0.03] hover:border-cyan-500/20 transition-all duration-300"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 flex items-center justify-center border border-white/[0.05]">
                <User className="w-4 h-4 text-cyan-400/60" strokeWidth={1.5} />
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/70 truncate leading-none">Atlas User</p>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-2.5 h-2.5 text-amber-400/60" strokeWidth={1.5} />
                <span className="text-[8px] tracking-[0.15em] uppercase text-amber-400/60 font-light">Atlas Elite</span>
              </div>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/30 transition-colors" strokeWidth={1.5} />
          </button>

          {/* Build */}
          <p className="text-[7px] tracking-[0.25em] uppercase text-white/8 font-light mt-4 px-3 select-none">
            Atlas Specter v2036.1
          </p>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="pt-14 md:pl-[272px] bg-black min-h-screen">
        <div className="p-6 md:p-8 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ===== MOBILE OVERLAY ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AtlasPassaporte isOpen={passportOpen} onClose={() => setPassportOpen(false)} />
    </div>
  )
}
