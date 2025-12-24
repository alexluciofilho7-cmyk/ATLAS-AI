"use client"

import { useState } from "react"
import Link from "next/link"
import React from "react" // Import React for useRef
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
  Send,
  User,
  ImageIcon,
  CheckCircle,
  TrendingUp,
  ChevronDown,
} from "lucide-react"
import {
  useAtlasData,
  type BodyAreaKey,
  type BodyAreaStatus,
  type EnergyScore,
  type DailyCheckin,
  type BodyMeasurements,
  type BodyStatusMap, // Added for context data
} from "@/context/AtlasDataContext"

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

const menuItems = [
  { key: "dashboard" as SectionKey, label: "Dashboard", icon: LayoutDashboard },
  { key: "visao360" as SectionKey, label: "Visão 360 do Corpo", icon: Target },
  { key: "atlasIA" as SectionKey, label: "Atlas IA", icon: Brain },
  { key: "treinoDieta" as SectionKey, label: "Treino & Dieta", icon: Dumbbell },
  { key: "compulsao" as SectionKey, label: "Compulsão Alimentar", icon: Utensils },
  { key: "sono" as SectionKey, label: "Sono & Recuperação", icon: Moon },
  { key: "fisioterapia" as SectionKey, label: "Fisioterapia", icon: Activity },
  { key: "testosterona" as SectionKey, label: "Testosterona Natural", icon: Zap },
]

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

  const currentWeek = mockWeeks[weekIndex]
  const canGoPrev = weekIndex > 0
  const canGoNext = weekIndex < mockWeeks.length - 1

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (currentWeek.atlasScore / 100) * circumference

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Bem-vindo ao Painel Atlas IA</h2>
        <p className="text-muted-foreground">
          Aqui você governa os 6 pilares da sua performance: Treino, Dieta, Sono, Testosterona, Compulsão Alimentar e
          Fisioterapia.
        </p>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => canGoPrev && setWeekIndex(weekIndex - 1)}
          disabled={!canGoPrev}
          className="p-2 rounded-lg bg-card/50 border border-border hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-semibold text-foreground">{currentWeek.weekLabel}</span>
        <button
          onClick={() => canGoNext && setWeekIndex(weekIndex + 1)}
          disabled={!canGoNext}
          className="p-2 rounded-lg bg-card/50 border border-border hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Atlas Score card */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-secondary"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{currentWeek.atlasScore}</span>
              <span className="text-xs text-muted-foreground">Atlas Score</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground mb-2">Sua Governança Corporal</h3>
            <p className="text-muted-foreground">{getAtlasScoreMessage(currentWeek.atlasScore)}</p>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Execução", value: currentWeek.executionRate, unit: "%", color: "blue" },
          { label: "Estética", value: currentWeek.aestheticProgress, unit: "%", color: "indigo" },
          { label: "Metabólica", value: currentWeek.metabolicHealth, unit: "%", color: "green" },
          { label: "Consistência", value: currentWeek.generalConsistency, unit: "%", color: "cyan" },
          { label: "Energia", value: currentWeek.energyLevel, unit: "", color: "purple" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-blue-500/30 transition-all"
          >
            <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-foreground">
              {metric.value}
              {metric.unit}
            </p>
          </div>
        ))}
      </div>

      {/* Briefing card */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Briefing do Dia</h3>
        </div>
        <p className="text-muted-foreground">
          Com base nos seus últimos 7 dias: você completou {currentWeek.trainingsDone} de {currentWeek.trainingsPlanned}{" "}
          treinos, manteve {currentWeek.dietAdherence}% de aderência à dieta e dormiu em média{" "}
          {currentWeek.avgSleepHours}h por noite.
          {currentWeek.atlasScore >= 75
            ? " Continue assim para consolidar seus ganhos!"
            : " Foque em aumentar a consistência para acelerar seus resultados."}
        </p>
      </div>

      {/* Summary button */}
      <button
        onClick={() => setShowSummary(!showSummary)}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <FileText className="w-5 h-5" />
        {showSummary ? "Ocultar Resumo" : "Gerar Resumo da Semana"}
      </button>

      {showSummary && (
        <div className="bg-card/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 animate-in fade-in duration-300">
          <h4 className="text-lg font-semibold text-foreground mb-4">Resumo Completo - {currentWeek.weekLabel}</h4>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Atlas Score: {currentWeek.atlasScore}/100 - {getAtlasScoreMessage(currentWeek.atlasScore)}
            </p>
            <p>
              Treinos: {currentWeek.trainingsDone}/{currentWeek.trainingsPlanned} ({currentWeek.executionRate}% de
              execução)
            </p>
            <p>Dieta: {currentWeek.dietAdherence}% de aderência</p>
            <p>Sono: média de {currentWeek.avgSleepHours}h/noite</p>
            <p>Energia: {currentWeek.energyLevel}</p>
            <p>
              Variação de peso: {currentWeek.weightDeltaKg > 0 ? "+" : ""}
              {currentWeek.weightDeltaKg}kg
            </p>
          </div>
        </div>
      )}

      {/* Evolution chart */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Evolução do Atlas Score</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {mockWeeks.map((week, idx) => (
            <button
              key={week.weekLabel}
              onClick={() => setWeekIndex(idx)}
              className={`flex-1 rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                idx === weekIndex ? "bg-gradient-to-t from-blue-600 to-cyan-400" : "bg-secondary"
              }`}
              style={{ height: `${week.atlasScore}%` }}
              title={`${week.weekLabel}: ${week.atlasScore}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
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
    // Reset form
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Target className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Visão 360 do Corpo</h2>
          <p className="text-muted-foreground">
            Aqui a Atlas IA enxerga seu corpo como um projeto de engenharia: medidas, pontos fortes, falhas e histórico
            diário.
          </p>
        </div>
      </div>

      {/* Gender selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setGender("male")}
          className={`px-4 py-2 rounded-lg border transition-all ${
            gender === "male"
              ? "bg-blue-600 border-blue-500 text-white"
              : "bg-card/50 border-border text-muted-foreground hover:border-blue-500/50"
          }`}
        >
          Masculino
        </button>
        <button
          onClick={() => setGender("female")}
          className={`px-4 py-2 rounded-lg border transition-all ${
            gender === "female"
              ? "bg-blue-600 border-blue-500 text-white"
              : "bg-card/50 border-border text-muted-foreground hover:border-blue-500/50"
          }`}
        >
          Feminino
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hologram card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Mapa Corporal</h3>
          <div className="relative w-full h-96 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden">
            {/* Hologram background */}
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-60"
              style={{
                backgroundImage: `url('/--gender------male-----male-body-silhouette-hologr.jpg')`,
              }}
            />

            {/* Hotspots */}
            {(Object.keys(bodyStatus) as BodyAreaKey[]).map((area) => (
              <div
                key={area}
                className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${getAreaColor(bodyStatus[area])} ${
                  hoveredArea === area ? "scale-150" : ""
                }`}
                style={{
                  top: hotspotPositions[area].top,
                  left: hotspotPositions[area].left,
                }}
                onMouseEnter={() => setHoveredArea(area)}
                onMouseLeave={() => setHoveredArea(null)}
              />
            ))}

            {/* Tooltip */}
            {hoveredArea && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-sm">
                <p className="font-semibold text-foreground">{bodyAreaLabels[hoveredArea]}</p>
                <p className="text-muted-foreground">{getStatusLabel(bodyStatus[hoveredArea])}</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-muted-foreground">Ponto forte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Precisa atenção</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="text-muted-foreground">Lesão</span>
            </div>
          </div>
        </div>

        {/* Measurements form */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Medidas Corporais</h3>
            <button
              onClick={() => setShowMeasureGuide(true)}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              Como medir?
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
            {[
              { key: "shoulders", label: "Ombros" },
              { key: "chest", label: "Peitoral" },
              { key: "waist", label: "Cintura" },
              { key: "hips", label: "Quadril" },
              { key: "rightArm", label: "Braço direito" },
              { key: "leftArm", label: "Braço esquerdo" },
              { key: "rightThigh", label: "Coxa direita" },
              { key: "leftThigh", label: "Coxa esquerda" },
              { key: "rightCalf", label: "Panturrilha D" },
              { key: "leftCalf", label: "Panturrilha E" },
              { key: "neck", label: "Pescoço" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    value={measurements[field.key as keyof BodyMeasurements] || ""}
                    onChange={(e) =>
                      setMeasurements({
                        ...measurements,
                        [field.key]: e.target.value ? Number.parseFloat(e.target.value) : null,
                      })
                    }
                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-xs text-muted-foreground">cm</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveMeasurements}
            className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar medidas
          </button>
        </div>
      </div>

      {/* Check-in card */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Check-in do Dia</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Training */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Treino</label>
            <div className="flex gap-2">
              <button
                onClick={() => setCheckinForm({ ...checkinForm, trainedToday: true, restDay: false })}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${
                  checkinForm.trainedToday
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-card/50 border-border text-muted-foreground"
                }`}
              >
                Treinei
              </button>
              <button
                onClick={() => setCheckinForm({ ...checkinForm, trainedToday: false, restDay: true })}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${
                  checkinForm.restDay
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-card/50 border-border text-muted-foreground"
                }`}
              >
                Descanso
              </button>
            </div>
          </div>

          {/* Diet */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Aderência à Dieta: {checkinForm.followedDiet}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={checkinForm.followedDiet}
              onChange={(e) => setCheckinForm({ ...checkinForm, followedDiet: Number.parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Sleep */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Horas de sono</label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="12"
              value={checkinForm.sleepHours}
              onChange={(e) => setCheckinForm({ ...checkinForm, sleepHours: Number.parseFloat(e.target.value) })}
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Energy */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Energia do dia</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setCheckinForm({ ...checkinForm, energy: n as EnergyScore })}
                  className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                    checkinForm.energy === n
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-card/50 border-border text-muted-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Stress */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Nível de estresse</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setCheckinForm({ ...checkinForm, stressLevel: n as EnergyScore })}
                  className={`flex-1 py-2 rounded-lg border text-sm transition-all ${
                    checkinForm.stressLevel === n
                      ? "bg-orange-600 border-orange-500 text-white"
                      : "bg-card/50 border-border text-muted-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Pain */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Nível de dor: {checkinForm.painLevel}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={checkinForm.painLevel}
              onChange={(e) => setCheckinForm({ ...checkinForm, painLevel: Number.parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label className="text-sm text-muted-foreground mb-2 block">Anotações (opcional)</label>
          <textarea
            value={checkinForm.notes}
            onChange={(e) => setCheckinForm({ ...checkinForm, notes: e.target.value })}
            placeholder="Como foi seu dia?"
            className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 h-20 resize-none"
          />
        </div>

        <button
          onClick={handleCheckinSubmit}
          className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Registrar check-in
        </button>
      </div>

      {/* Progress photos */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <Camera className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Fotos de Progresso</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {(["front", "side", "back"] as const).map((type) => (
            <div key={type} className="relative">
              <label
                className={`block aspect-[3/4] rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                  photos[type] ? "border-blue-500" : "border-border hover:border-blue-500/50"
                }`}
              >
                {photos[type] ? (
                  <img src={photos[type] || "/placeholder.svg"} alt={type} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Camera className="w-8 h-8 mb-2" />
                    <span className="text-xs capitalize">
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
            </div>
          ))}
        </div>
      </div>

      {/* Measure guide modal */}
      {showMeasureGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowMeasureGuide(false)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Como medir corretamente</h3>
              <button
                onClick={() => setShowMeasureGuide(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Ombros:</strong> Fita passando pela parte mais larga, de deltóide a
                deltóide.
              </li>
              <li>
                <strong className="text-foreground">Peitoral:</strong> Na linha do mamilo, fita nivelada.
              </li>
              <li>
                <strong className="text-foreground">Cintura:</strong> Ponto mais fino acima do quadril (umbigo).
              </li>
              <li>
                <strong className="text-foreground">Quadril:</strong> Ponto mais largo do glúteo.
              </li>
              <li>
                <strong className="text-foreground">Braços:</strong> Parte mais larga com contração leve.
              </li>
              <li>
                <strong className="text-foreground">Coxa:</strong> Parte mais larga, logo abaixo do glúteo.
              </li>
              <li>
                <strong className="text-foreground">Panturrilha:</strong> Parte mais larga em contração leve.
              </li>
              <li>
                <strong className="text-foreground">Pescoço:</strong> Logo abaixo do pomo de Adão.
              </li>
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

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  response?: AtlasResponse
  imagePreview?: string
}

type AtlasContextData = {
  currentWeekMetrics: AtlasWeekMetrics
  recentCheckins: DailyCheckin[]
  bodyStatus: BodyStatusMap
  bodyMeasurements: BodyMeasurements
}

function simulateAtlasIAResponse(
  userMessage: string,
  context: AtlasContextData,
  messageType?: AtlasMessageType,
): AtlasResponse {
  const { currentWeekMetrics, recentCheckins, bodyStatus, bodyMeasurements } = context

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

**Contexto da semana:**
- Atlas Score: ${currentWeekMetrics.atlasScore}/100
- Execução: ${currentWeekMetrics.executionRate}% (${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned} treinos)
- Dieta: ${currentWeekMetrics.dietAdherence}% de aderência
- Sono: ${currentWeekMetrics.avgSleepHours}h média
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

// ========== OTHER VIEWS (unchanged) ==========
function AtlasIAView() {
  const atlasData = useAtlasData()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [expandedScience, setExpandedScience] = useState<Set<string>>(new Set())
  const [showImageUpload, setShowImageUpload] = useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Initialize with demo messages on mount
  React.useEffect(() => {
    const demoMessages: ChatMessage[] = [
      {
        id: "demo-1",
        role: "user",
        content: "Toda noite eu destruo a geladeira. Como resolver isso?",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "demo-2",
        role: "assistant",
        content: "",
        timestamp: new Date(Date.now() - 290000),
        response: simulateAtlasIAResponse(
          "Toda noite eu destruo a geladeira",
          {
            currentWeekMetrics: atlasData.currentWeekMetrics,
            recentCheckins: atlasData.checkins,
            bodyStatus: atlasData.bodyStatus,
            bodyMeasurements: atlasData.bodyMeasurements,
          },
          "compulsion",
        ),
      },
      {
        id: "demo-3",
        role: "user",
        content: "Posso comer carboidrato à noite?",
        timestamp: new Date(Date.now() - 180000),
      },
      {
        id: "demo-4",
        role: "assistant",
        content: "",
        timestamp: new Date(Date.now() - 170000),
        response: simulateAtlasIAResponse(
          "Posso comer carboidrato à noite?",
          {
            currentWeekMetrics: atlasData.currentWeekMetrics,
            recentCheckins: atlasData.checkins,
            bodyStatus: atlasData.bodyStatus,
            bodyMeasurements: atlasData.bodyMeasurements,
          },
          "nutrition",
        ),
      },
    ]
    setMessages(demoMessages)
  }, []) // Only run once on mount

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    const context: AtlasContextData = {
      currentWeekMetrics: atlasData.currentWeekMetrics,
      recentCheckins: atlasData.checkins,
      bodyStatus: atlasData.bodyStatus,
      bodyMeasurements: atlasData.bodyMeasurements,
    }

    const response = simulateAtlasIAResponse(inputValue, context)

    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      response,
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInputValue("")
  }

  const handleShortcut = (prompt: string) => {
    setInputValue(prompt)
    setTimeout(() => handleSend(), 100)
  }

  const toggleScience = (messageId: string) => {
    setExpandedScience((prev) => {
      const next = new Set(prev)
      if (next.has(messageId)) {
        next.delete(messageId)
      } else {
        next.add(messageId)
      }
      return next
    })
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Atlas IA – Governança Corporal</h2>
              <p className="text-sm text-muted-foreground">
                Um cérebro que lê seus dados e devolve decisões práticas, em tempo real, baseado em evidência científica
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400">
            <Activity className="w-3 h-3" />
            Baseado em estudos (PubMed / Harvard) – sem substituir médico
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-4 overflow-y-auto min-h-96 max-h-[600px]">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
                  {msg.role === "user" ? (
                    <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm">
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ) : msg.response ? (
                    <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 space-y-4">
                      {/* Core Text */}
                      <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                        {msg.response.coreText}
                      </div>

                      {/* Protocol Card */}
                      {msg.response.protocol && (
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-blue-400 flex-1">{msg.response.protocol.title}</h4>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-md whitespace-nowrap">
                              {msg.response.protocol.durationDays} dias
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-semibold text-blue-300 uppercase mb-1">Objetivo</p>
                              <p className="text-sm text-foreground">{msg.response.protocol.goal}</p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-blue-300 uppercase mb-1">Regras Diárias</p>
                              <ul className="space-y-1">
                                {msg.response.protocol.dailyRules.map((rule, i) => (
                                  <li key={i} className="text-sm text-foreground flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-blue-300 uppercase mb-1">Checklist Diário</p>
                              <ul className="space-y-1">
                                {msg.response.protocol.dailyChecklist.map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                    <Target className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-blue-300 uppercase mb-1">Métricas de Sucesso</p>
                              <ul className="space-y-1">
                                {msg.response.protocol.successMetrics.map((metric, i) => (
                                  <li key={i} className="text-sm text-foreground flex gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span>{metric}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {msg.response.protocol.safetyNotes.length > 0 && (
                              <div className="pt-2 border-t border-blue-500/20">
                                <p className="text-xs font-semibold text-orange-400 uppercase mb-1">
                                  ⚠️ Alertas de Segurança
                                </p>
                                <ul className="space-y-1">
                                  {msg.response.protocol.safetyNotes.map((note, i) => (
                                    <li key={i} className="text-xs text-orange-300/90">
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {msg.response.actionButtons && msg.response.actionButtons.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {msg.response.actionButtons.map((btn, i) => (
                            <button
                              key={i}
                              onClick={() => handleShortcut(btn.action)}
                              className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-sm font-medium rounded-lg transition-colors"
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Science Note */}
                      {msg.response.scienceNote && (
                        <div className="border-t border-border pt-3">
                          <button
                            onClick={() => toggleScience(msg.id)}
                            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                            {expandedScience.has(msg.id) ? "Ocultar" : "Ver"} explicação científica
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${expandedScience.has(msg.id) ? "rotate-180" : ""}`}
                            />
                          </button>
                          {expandedScience.has(msg.id) && (
                            <div className="mt-3 p-3 bg-secondary/50 rounded-lg text-sm text-muted-foreground leading-relaxed">
                              {msg.response.scienceNote}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-4 flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Digite sua mensagem ou use um atalho ao lado..."
              className="w-full px-4 py-3 pr-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 resize-none"
              rows={2}
            />
            <button
              onClick={() => setShowImageUpload(!showImageUpload)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-blue-400 transition-colors"
              title="Anexar imagem (em breve)"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar - Context + Shortcuts */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Current Context Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Contexto Atual
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Atlas Score</span>
              <span className="font-semibold text-foreground">{atlasData.currentWeekMetrics.atlasScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Execução</span>
              <span className="font-semibold text-foreground">{atlasData.currentWeekMetrics.executionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sono médio</span>
              <span className="font-semibold text-foreground">{atlasData.currentWeekMetrics.avgSleepHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dieta</span>
              <span className="font-semibold text-foreground">{atlasData.currentWeekMetrics.dietAdherence}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Energia</span>
              <span className="font-semibold text-foreground">{atlasData.currentWeekMetrics.energyLevel}</span>
            </div>
          </div>
        </div>

        {/* Shortcuts Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Atalhos Atlas IA
          </h3>
          <div className="space-y-2">
            <button
              onClick={() =>
                handleShortcut(
                  "Recalcule minha dieta de hoje considerando meu Atlas Score atual, meus check-ins dos últimos 3 dias e meu objetivo de perder gordura sem perder massa magra",
                )
              }
              className="w-full px-4 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-left text-sm text-blue-300 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="font-medium mb-1">Recalcular dieta de HOJE</div>
              <div className="text-xs text-blue-400/70">Baseado nos seus dados atuais</div>
            </button>

            <button
              onClick={() => handleShortcut("Quero rever uma dor específica que estou sentindo")}
              className="w-full px-4 py-3 bg-orange-600/10 hover:bg-orange-600/20 border border-orange-500/30 text-left text-sm text-orange-300 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="font-medium mb-1">Rever dor específica</div>
              <div className="text-xs text-orange-400/70">Triagem + protocolo de gestão</div>
            </button>

            <button
              onClick={() => handleShortcut("Crie um protocolo de 7 dias focado em reset metabólico")}
              className="w-full px-4 py-3 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-left text-sm text-emerald-300 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="font-medium mb-1">Protocolo 7 dias – Reset</div>
              <div className="text-xs text-emerald-400/70">Metabolismo + energia</div>
            </button>

            <button
              onClick={() =>
                handleShortcut("Crie um protocolo de 14 dias focado em eliminar compulsão alimentar noturna")
              }
              className="w-full px-4 py-3 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-left text-sm text-purple-300 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="font-medium mb-1">Protocolo 14 dias – Anti-compulsão</div>
              <div className="text-xs text-purple-400/70">Fisiologia + timing</div>
            </button>

            <button
              onClick={() =>
                handleShortcut(
                  "Faça uma revisão completa da minha semana baseada no meu Atlas Score, me mostrando vitórias, sabotagens e ações para próxima semana",
                )
              }
              className="w-full px-4 py-3 bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/30 text-left text-sm text-cyan-300 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="font-medium mb-1">Rever semana Atlas Score</div>
              <div className="text-xs text-cyan-400/70">Análise completa + próximos passos</div>
            </button>
          </div>
        </div>

        {/* Body Status Quick View */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-green-400" />
            Status Corporal
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(atlasData.bodyStatus).map(([area, status]) => (
              <div key={area} className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    status === "good" ? "bg-green-400" : status === "needs_improvement" ? "bg-yellow-400" : "bg-red-400"
                  }`}
                />
                <span className="text-muted-foreground capitalize">{area}</span>
              </div>
            ))}
          </div>
        </div>
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
          <p className="text-muted-foreground">Protocolos integrados de exercício e nutrição</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo do módulo em desenvolvimento...</p>
      </div>
    </div>
  )
}

function CompulsaoView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Utensils className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Compulsão Alimentar</h2>
          <p className="text-muted-foreground">Estratégias cognitivo-comportamentais para controle</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo do módulo em desenvolvimento...</p>
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
          <p className="text-muted-foreground">Protocolos de higiene do sono e recuperação</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo do módulo em desenvolvimento...</p>
      </div>
    </div>
  )
}

function FisioterapiaView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
          <Activity className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Fisioterapia</h2>
          <p className="text-muted-foreground">Correção postural e prevenção de lesões</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo do módulo em desenvolvimento...</p>
      </div>
    </div>
  )
}

function TestosteronaView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Testosterona Natural</h2>
          <p className="text-muted-foreground">Estratégias para otimização hormonal natural</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Conteúdo do módulo em desenvolvimento...</p>
      </div>
    </div>
  )
}

// ========== MAIN PAGE COMPONENT ==========
export default function AtlasPainelPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-40 flex items-center px-4 md:px-6">
        <button className="md:hidden mr-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-foreground">Atlas IA</span>
        </Link>
        <div className="ml-auto text-sm text-muted-foreground">Bem-vindo ao seu painel</div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card/50 backdrop-blur-md border-r border-border z-30 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.key
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pt-16 md:pl-64">
        <div className="p-6 md:p-8 max-w-6xl">{renderContent()}</div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
