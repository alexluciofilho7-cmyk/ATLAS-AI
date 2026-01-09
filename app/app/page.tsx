"use client"

import { useCallback } from "react"

import { useState } from "react"
import Link from "next/link"
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
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sun,
  Coffee,
  Wine,
  Award,
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
  const [showNightDefenseModal, setShowNightDefenseModal] = useState(false)
  const [nightDefenseActive, setNightDefenseActive] = useState(false)

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

    // Get latest checkin
    const latest = checkins[checkins.length - 1]
    if (latest) {
      // Sleep impact (0-25 points)
      if (latest.sleepHours < 6) risk += 25
      else if (latest.sleepHours < 7) risk += 15
      else if (latest.sleepHours < 8) risk += 5

      // Stress impact (0-30 points)
      risk += latest.stressLevel * 6

      // Energy impact (0-25 points) - low energy = higher risk
      risk += (5 - latest.energy) * 5

      // Pain impact (0-20 points)
      if (latest.painLevel > 0) risk += latest.painLevel * 4
    }

    // Night defense reduces risk
    if (nightDefenseActive) risk -= 20

    return Math.max(0, Math.min(100, risk))
  }, [checkins, nightDefenseActive])

  const riskLevel = calculateRisk()

  const getRiskState = () => {
    if (riskLevel < 33) return { label: "Controlado", color: "text-green-400", bgColor: "bg-green-500/10" }
    if (riskLevel < 66) return { label: "Vigilância", color: "text-yellow-400", bgColor: "bg-yellow-500/10" }
    return { label: "Crítico", color: "text-red-400", bgColor: "bg-red-500/10" }
  }

  const state = getRiskState()

  // Critical window (mock for now, but can be calculated from event history)
  const criticalWindow = "20:30 - 23:00"
  const isInCriticalWindow = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMin = now.getMinutes()
    const currentTime = currentHour * 60 + currentMin
    const start = 20 * 60 + 30 // 20:30
    const end = 23 * 60 // 23:00
    return currentTime >= start && currentTime <= end
  }

  // Week risk trend (mock data)
  const weekTrend = [45, 52, 48, 60, 55, 50, riskLevel]

  // Register event
  const handleRegisterEvent = () => {
    if (!newEvent.trigger || !newEvent.category) return

    const event = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ...newEvent,
    }

    setEventLog((prev) => [event, ...prev].slice(0, 20))
    setNewEvent({
      type: "urge_controlled",
      intensity: 5,
      trigger: "",
      category: "",
      notes: "",
    })
  }

  // AI Insights (mock but structured)
  const aiInsights = [
    "Nos últimos 7 dias, 80% das crises aconteceram entre 21h e 23h, após uso prolongado de celular.",
    "Dias com sono < 6h tiveram 3x mais registros de compulsão.",
    "Seu gatilho dominante é: estresse (nota média 8/10).",
  ]

  return (
    <div className="min-h-screen">
      {/* Zone 1: Estado Atual - Top Strip */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Card 1: Risco Atual */}
          <div className="relative p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${riskLevel * 2.51} 251`}
                    className={`${state.color} transition-all duration-500`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-2xl font-bold ${state.color}`}>{Math.round(riskLevel)}</div>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-400 mb-1">Risco Agora</div>
            <div className="text-3xl font-bold mb-1">{Math.round(riskLevel)}/100</div>
            <div className="text-xs text-slate-500">Probabilidade de compulsão hoje</div>
          </div>

          {/* Card 2: Janela Crítica */}
          <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div className="text-sm font-medium text-slate-400">Janela Crítica</div>
            </div>
            <div className="text-2xl font-bold mb-2">{criticalWindow}</div>
            <div className="text-xs text-slate-500">Horário mais provável de ataque</div>
            {isInCriticalWindow() && (
              <div className="mt-2 inline-block px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-md text-xs text-red-400 font-medium">
                Agora
              </div>
            )}
          </div>

          {/* Card 3: Estado Atual */}
          <div
            className={`p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 ${state.bgColor}`}
          >
            <div className="text-sm font-medium text-slate-400 mb-2">Estado Atual</div>
            <div className={`text-2xl font-bold mb-2 ${state.color}`}>{state.label}</div>
            <div className="text-xs text-slate-500">Baseado nos últimos 3 dias de sono, estresse e recaídas</div>
          </div>

          {/* Card 4: Tendência 7 dias */}
          <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="text-sm font-medium text-slate-400 mb-3">Tendência 7 dias</div>
            <div className="flex items-end gap-1 h-12 mb-2">
              {weekTrend.map((value, i) => (
                <div key={i} className="flex-1 bg-cyan-500/30 rounded-t" style={{ height: `${value}%` }} />
              ))}
            </div>
            <div className="text-xs text-slate-500">Risco médio nos últimos 7 dias</div>
          </div>
        </div>

        {/* Crisis Mode Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowCrisisModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all hover:scale-105 flex items-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            Ativar Modo Crise (2 min)
          </button>
        </div>

        {/* High Risk Warning */}
        {riskLevel >= 66 && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <p className="text-red-200 text-sm">
              <strong>Risco elevado detectado.</strong> Recomendamos ativar o Modo Crise agora ou executar o protocolo
              de prevenção. Isso não é falta de caráter, é padrão fisiológico + hábito. Estamos ajustando o sistema, não
              te condenando.
            </p>
          </div>
        )}
      </div>

      {/* Zone 2: Blocos de Ação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Prevenir */}
        <button
          onClick={() => setShowPreventModal(true)}
          className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 text-left"
        >
          <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30 w-fit mb-4">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Prevenir agora</h3>
          <p className="text-slate-400 text-sm mb-4">Micro-ação de 90 segundos para reduzir risco imediato</p>
          <div className="flex items-center text-cyan-400 text-sm font-medium">
            Iniciar protocolo
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Card 2: Intervir */}
        <button
          onClick={() => setShowCrisisModal(true)}
          className="group p-6 bg-gradient-to-br from-red-900/20 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-red-500/30 hover:border-red-400 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20 text-left"
        >
          <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30 w-fit mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Intervir (urge acontecendo)</h3>
          <p className="text-slate-400 text-sm mb-4">
            Protocolo de emergência para interromper, substituir e registrar
          </p>
          <div className="flex items-center text-red-400 text-sm font-medium">
            Ativar Airbag
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Card 3: Recompor */}
        <button
          onClick={() => setShowRecoverModal(true)}
          className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-green-500 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 text-left"
        >
          <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30 w-fit mb-4">
            <Heart className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Recompor (pós-queda 12h)</h3>
          <p className="text-slate-400 text-sm mb-4">Protocolo de recuperação sem punição e sem culpa</p>
          <div className="flex items-center text-green-400 text-sm font-medium">
            Ver protocolo
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Zone 3: Defesa Noturna & Agenda de Risco */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Defesa Noturna */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Defesa Noturna</h3>
            </div>
            <button
              onClick={() => setNightDefenseActive(!nightDefenseActive)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                nightDefenseActive ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300"
              }`}
            >
              {nightDefenseActive ? "Ativo" : "Inativo"}
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Horário típico do primeiro gatilho</label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500">
                <option>20:00 - 21:00</option>
                <option>21:00 - 22:00</option>
                <option>22:00 - 23:00</option>
                <option>23:00 - 00:00</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Alimentos mais comuns nas crises</label>
              <input
                type="text"
                placeholder="Ex: pão, doces, salgados..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Padrão da última semana</div>
              <div className="text-sm text-slate-200">3 crises entre 21h–23h</div>
            </div>
          </div>

          <button
            onClick={() => setShowNightDefenseModal(true)}
            className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
          >
            Ajustar rotina da noite
          </button>
        </div>

        {/* Agenda de Risco */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Agenda de Risco</h3>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, i) => {
              const status = i % 3 === 0 ? "green" : i % 3 === 1 ? "yellow" : "red"
              const colors = {
                green: "bg-green-500/20 border-green-500/30 text-green-400",
                yellow: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
                red: "bg-red-500/20 border-red-500/30 text-red-400",
              }

              return (
                <div
                  key={day}
                  className={`p-3 rounded-lg border text-center transition-all hover:scale-105 ${colors[status]}`}
                >
                  <div className="text-xs font-medium mb-1">{day}</div>
                  <div className="w-2 h-2 rounded-full mx-auto" style={{ backgroundColor: "currentColor" }} />
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Sem crise
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              Urge controlado
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              Compulsão
            </div>
          </div>
        </div>
      </div>

      {/* Zone 4: Log Inteligente & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Log Inteligente */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Log Inteligente</h3>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Tipo de evento</label>
              <select
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    type: e.target.value as "urge_controlled" | "compulsion" | "light_desire",
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="urge_controlled">Vontade intensa controlada</option>
                <option value="compulsion">Compulsão</option>
                <option value="light_desire">Desejo leve</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">
                Intensidade do gatilho: {newEvent.intensity}/10
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={newEvent.intensity}
                onChange={(e) => setNewEvent({ ...newEvent, intensity: Number.parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Categoria de gatilho</label>
              <div className="flex flex-wrap gap-2">
                {["Estresse", "Tédio", "Emoção forte", "Fome real", "Ambiente"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewEvent({ ...newEvent, category: cat })}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      newEvent.category === cat
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-cyan-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">O que aconteceu antes?</label>
              <input
                type="text"
                value={newEvent.notes}
                onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                placeholder="Ex: estava sozinho, mexendo no celular..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            onClick={handleRegisterEvent}
            className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors mb-4"
          >
            Registrar evento
          </button>

          {/* Event history */}
          {eventLog.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400 mb-2">Últimos registros</div>
              {eventLog.slice(0, 5).map((event) => (
                <div key={event.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 font-medium">{event.trigger}</span>
                    <span className="text-xs text-slate-500">{event.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {event.category} • Intensidade: {event.intensity}/10
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Insights Atlas IA */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Insights Atlas IA</h3>
          </div>

          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg mb-4">
            <div className="text-xs text-cyan-400 mb-1 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Atlas IA Online – monitorando seus gatilhos em tempo real
            </div>
          </div>

          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors"
              >
                <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-200">
              <strong>Padrão Atlas detectado:</strong> Risco aumenta significativamente após 21h com uso prolongado de
              telas e baixa energia.
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Modal (reused from Compulsao2035) */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-red-500/30 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowCrisisModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Modo Crise Ativado</h2>
              <p className="text-slate-300">Protocolo em 3 fases: Interromper → Substituir → Registrar</p>
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-200">Respirar fundo (4-7-8) por 90 segundos</span>
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
              <button
                onClick={() => setShowCrisisModal(false)}
                className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Concluir protocolo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prevent Modal (placeholder) */}
      {showPreventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
            <button
              onClick={() => setShowPreventModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Protocolo de Prevenção</h2>
            <p className="text-slate-300 mb-6">Micro-ação de 90 segundos para reduzir risco imediato.</p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg">1. Beber um copo de água agora</div>
              <div className="p-3 bg-slate-800/50 rounded-lg">2. Fazer 10 respirações profundas</div>
              <div className="p-3 bg-slate-800/50 rounded-lg">3. Mudar de ambiente por 5 minutos</div>
            </div>
            <button
              onClick={() => setShowPreventModal(false)}
              className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Recover Modal (placeholder) */}
      {showRecoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30 rounded-2xl shadow-2xl p-8">
            <button
              onClick={() => setShowRecoverModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Protocolo de Recuperação</h2>
            <p className="text-slate-300 mb-6">Sem punição. Sem culpa. Apenas reconstrução.</p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <strong>1. Aceitar sem julgamento:</strong> O que aconteceu, aconteceu.
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <strong>2. Hidratar-se:</strong> 500ml de água agora.
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <strong>3. Planejar próxima refeição:</strong> Voltar ao protocolo na próxima refeição.
              </div>
            </div>
            <button
              onClick={() => setShowRecoverModal(false)}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Night Defense Modal (placeholder) */}
      {showNightDefenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
            <button
              onClick={() => setShowNightDefenseModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Ajustar Rotina da Noite</h2>
            <p className="text-slate-300 mb-6">Protocolo para reduzir risco durante a janela crítica.</p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <strong>Janela Crítica:</strong> 20:30 - 23:00
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <strong>Ações recomendadas:</strong> Eliminar telas 30min antes, preparar lanches de emergência, ter
                protocolo de substituição pronto.
              </div>
            </div>
            <button
              onClick={() => {
                setShowNightDefenseModal(false)
                setNightDefenseActive(true)
              }}
              className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl"
            >
              Ativar Defesa Noturna
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

  // Hábitos do dia
  const [sunExposure, setSunExposure] = useState(false)
  const [lastCaffeineEarly, setLastCaffeineEarly] = useState(false)
  const [screenOffEarly, setScreenOffEarly] = useState(false)
  const [lightDinner, setLightDinner] = useState(false)
  const [stressLevel, setStressLevel] = useState(3)
  const [perceivedQuality, setPerceivedQuality] = useState(7) // Changed default from 3 to 7 for better initial visual
  const [habitsSubmitted, setHabitsSubmitted] = useState(false)

  // Modo crise
  const [crisisHours, setCrisisHours] = useState("")
  const [crisisReason, setCrisisReason] = useState("")
  const [crisisEnergy, setCrisisEnergy] = useState(3)

  // Mock data for last 7 nights with better structure
  const mockNights = [
    {
      day: "Seg",
      fullDate: "Segunda, 18/12",
      hours: 6.08,
      hoursFormatted: "6h05",
      bedtime: "00:30",
      wakeup: "06:35",
      quality: 2 as const,
      qualityLabel: "Ruim" as const,
      causes: ["Tela até tarde", "Refeição pesada"],
      impact: "Essa noite reduziu seu ASRI de 82 para 74. Hoje não é dia de buscar recorde de carga.",
    },
    {
      day: "Ter",
      fullDate: "Terça, 19/12",
      hours: 7.33,
      hoursFormatted: "7h20",
      bedtime: "23:10",
      wakeup: "06:30",
      quality: 3 as const,
      qualityLabel: "Ok" as const,
      causes: ["Cafeína tarde"],
      impact: "Sono regular. Seu corpo está se recuperando, mas ainda não é ideal.",
    },
    {
      day: "Qua",
      fullDate: "Quarta, 20/12",
      hours: 8.17,
      hoursFormatted: "8h10",
      bedtime: "22:30",
      wakeup: "06:40",
      quality: 5 as const,
      qualityLabel: "Ótima" as const,
      causes: [],
      impact: "Noite ideal! Seu ASRI subiu para 86. Hoje você pode progredir com segurança.",
    },
    {
      day: "Qui",
      fullDate: "Quinta, 21/12",
      hours: 7.75,
      hoursFormatted: "7h45",
      bedtime: "23:00",
      wakeup: "06:45",
      quality: 5 as const,
      qualityLabel: "Ótima" as const,
      causes: [],
      impact: "Sono de atleta. Continue assim e seu corpo responderá com ganhos consistentes.",
    },
    {
      day: "Sex",
      fullDate: "Sexta, 22/12",
      hours: 6.5,
      hoursFormatted: "6h30",
      bedtime: "00:00",
      wakeup: "06:30",
      quality: 3 as const,
      qualityLabel: "Ok" as const,
      causes: ["Treino muito tarde"],
      impact: "Suficiente, mas não ótimo. Ajuste o horário do treino.",
    },
    {
      day: "Sáb",
      fullDate: "Sábado, 23/12",
      hours: 8.5,
      hoursFormatted: "8h30",
      bedtime: "22:00",
      wakeup: "06:30",
      quality: 5 as const,
      qualityLabel: "Ótima" as const,
      causes: [],
      impact: "Excelente recuperação de fim de semana. Pronto para a próxima semana.",
    },
    {
      day: "Dom",
      fullDate: "Domingo, 24/12",
      hours: 7.83,
      hoursFormatted: "7h50",
      bedtime: "22:40",
      wakeup: "06:30",
      quality: 5 as const,
      qualityLabel: "Ótima" as const,
      causes: [],
      impact: "Ótima preparação para a semana. Você está no caminho certo.",
    },
  ]

  // Calculate ASRI with more technical precision
  const avgSleepHours = mockNights.reduce((sum, n) => sum + n.hours, 0) / mockNights.length
  const regularityScore = 82 // Mock - based on bedtime/wakeup consistency
  const energyScore =
    currentWeekMetrics.energyLevel === "Alta" ? 90 : currentWeekMetrics.energyLevel === "Média" ? 70 : 45

  // ASRI formula: 40% sleep duration, 30% regularity, 30% energy/recovery
  const asri = Math.round((avgSleepHours / 8) * 40 + (regularityScore / 100) * 30 + (energyScore / 100) * 30)

  const asriStatus = asri >= 85 ? "Excelente" : asri >= 70 ? "Aceitável" : "Crítico"
  const asriColor = asri >= 85 ? "text-green-400" : asri >= 70 ? "text-cyan-400" : "text-red-400"
  const asriBg = asri >= 85 ? "bg-green-500/10" : asri >= 70 ? "bg-cyan-500/10" : "bg-red-500/10"
  const asriBorder = asri >= 85 ? "border-green-500/40" : asri >= 70 ? "border-cyan-500/40" : "border-red-500/40"
  const asriGlow = asri >= 85 ? "shadow-green-500/20" : asri >= 70 ? "shadow-cyan-500/20" : "shadow-red-500/20"

  // Sleep status classification
  const sleepStatus = avgSleepHours >= 7.5 ? "Ideal" : avgSleepHours >= 6.5 ? "Abaixo do ideal" : "Crítico"
  const sleepColor = avgSleepHours >= 7.5 ? "text-green-400" : avgSleepHours >= 6.5 ? "text-yellow-400" : "text-red-400"

  // Regularity classification
  const regularityLabel = regularityScore >= 80 ? "Alta" : regularityScore >= 60 ? "Média" : "Baixa"
  const regularityColor =
    regularityScore >= 80 ? "text-green-400" : regularityScore >= 60 ? "text-yellow-400" : "text-red-400"

  // Risk indicators with more precision
  const compulsionRisk = asri < 65 ? "Alto" : asri < 78 ? "Médio" : "Baixo"
  const overtrainingRisk = asri < 68 ? "Alto" : asri < 82 ? "Médio" : "Baixo"
  const testosteroneRisk = asri < 72 ? "Em risco" : "Estável"

  const getRiskColor = (risk: string) => {
    if (risk === "Baixo" || risk === "Estável") return "bg-green-500/20 text-green-400 border-green-500/30"
    if (risk === "Médio") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    return "bg-red-500/20 text-red-400 border-red-500/30"
  }

  // Impact badges for habits
  const getImpactBadge = (level: "high" | "medium" | "low") => {
    if (level === "high")
      return (
        <span className="ml-2 px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] rounded-full border border-cyan-500/30">
          Alto impacto
        </span>
      )
    if (level === "medium")
      return (
        <span className="ml-2 px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded-full border border-blue-500/30">
          Médio impacto
        </span>
      )
    return (
      <span className="ml-2 px-1.5 py-0.5 bg-gray-500/20 text-gray-400 text-[10px] rounded-full border border-gray-500/30">
        Baixo impacto
      </span>
    )
  }

  const handleRegisterHabits = () => {
    setHabitsSubmitted(true)
    setTimeout(() => setHabitsSubmitted(false), 3000)
  }

  const handleCrisisSubmit = () => {
    const hours = Number.parseFloat(crisisHours) || 3.5
    setShowCrisisModal(false)
    alert(
      `Modo Crise ativado para ${hours}h de sono e energia nível ${crisisEnergy}:\n\n• Treino: reduzir intensidade, sem PR, foco em técnica.\n• Dieta: manter proteína alta, carbo moderado.\n• Sono hoje: alvo 7h30, sem cafeína após 15h.\n\nA Atlas IA vai ajustar seu plano automaticamente.`,
    )
  }

  const selectedNight = selectedDayIndex !== null ? mockNights[selectedDayIndex] : null

  return (
    <div className="space-y-8 pb-20">
      {/* BLOCO 1: OVERVIEW TÉCNICO */}
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
            <Moon className="w-7 h-7 text-indigo-300" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-1.5 tracking-tight">Sono & Recuperação</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
              O sistema operacional que sustenta seu treino, dieta, hormônios e performance.
            </p>
          </div>
        </div>

        {/* ASRI + Mini KPIs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_3fr] gap-5">
          {/* Card ASRI - Centro de comando */}
          <div
            className={`group relative overflow-hidden rounded-3xl border-2 ${asriBorder} ${asriBg} backdrop-blur-md p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${asriGlow}`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-blue-600/5 animate-pulse" />

            {/* Circular progress indicator */}
            <div className="absolute top-6 right-6 w-20 h-20">
              <svg className="transform -rotate-90 w-20 h-20">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-slate-700/30"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(asri / 100) * 226} 226`}
                  className={asriColor}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-bold ${asriColor}`}>{asri}</span>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                Atlas Sleep & Recovery Index
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className={`text-6xl font-bold ${asriColor} tracking-tight`}>{asri}</span>
                <span className="text-3xl text-gray-600 font-light">/100</span>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs text-gray-500 font-medium">Status atual:</span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold ${asriBg} ${asriColor} border-2 ${asriBorder}`}
                >
                  {asriStatus}
                </span>
              </div>

              {/* Context message */}
              {asri >= 85 && (
                <div className="flex items-start gap-2 p-3 bg-green-500/5 border border-green-500/20 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-300 leading-relaxed">
                    Sono sustentando sua performance Atlas. Todas as métricas indicam recuperação profunda e otimização
                    hormonal.
                  </p>
                </div>
              )}
              {asri >= 70 && asri < 85 && (
                <div className="flex items-start gap-2 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-cyan-300 leading-relaxed">
                    Sono aceitável, mas há margem para otimização. Pequenos ajustes podem elevar significativamente sua
                    performance.
                  </p>
                </div>
              )}
              {asri < 70 && (
                <div className="flex items-start gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-300 leading-relaxed font-medium">
                    Alerta: sono comprometendo treino, dieta, hormônios e apetite. Ajuste agora ou aceite resultados
                    medianos.
                  </p>
                </div>
              )}

              <p className="mt-4 text-[10px] text-gray-500 leading-relaxed">
                Índice calculado a partir de: duração média, regularidade de horário, qualidade percebida e hábitos que
                afetam hormônios e recuperação muscular.
              </p>
            </div>
          </div>

          {/* 4 Mini KPIs - More technical and precise */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sono médio */}
            <div className="group bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 hover:border-cyan-500/40 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Sono médio (7d)</p>
                <Moon className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                {avgSleepHours.toFixed(1)}
                <span className="text-lg text-gray-500">h</span>
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${avgSleepHours >= 7.5 ? "bg-green-400" : avgSleepHours >= 6.5 ? "bg-yellow-400" : "bg-red-400"} animate-pulse`}
                />
                <p className={`text-xs font-medium ${sleepColor}`}>{sleepStatus}</p>
              </div>
            </div>

            {/* Regularidade */}
            <div className="group bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 hover:border-blue-500/40 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Regularidade</p>
                <Clock className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{regularityLabel}</p>
              <p className={`text-xs font-medium ${regularityColor}`}>{regularityScore}% consistência</p>
            </div>

            {/* Energia média */}
            <div className="group bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 hover:border-orange-500/40 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Energia média</p>
                <Zap className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{currentWeekMetrics.energyLevel}</p>
              <p
                className={`text-xs font-medium ${currentWeekMetrics.energyLevel === "Alta" ? "text-green-400" : currentWeekMetrics.energyLevel === "Média" ? "text-yellow-400" : "text-red-400"}`}
              >
                {currentWeekMetrics.energyLevel === "Alta"
                  ? "Excelente capacidade"
                  : currentWeekMetrics.energyLevel === "Média"
                    ? "Pode melhorar"
                    : "Atenção necessária"}
              </p>
            </div>

            {/* Riscos conectados - More technical */}
            <div className="group bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-5 hover:border-red-500/40 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Riscos conectados</p>
                <Activity className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">Compulsão</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getRiskColor(compulsionRisk)}`}
                  >
                    {compulsionRisk}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">Overtraining</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getRiskColor(overtrainingRisk)}`}
                  >
                    {overtrainingRisk}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">Testosterona</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getRiskColor(testosteroneRisk)}`}
                  >
                    {testosteroneRisk}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO 2: ÚLTIMAS NOITES + HÁBITOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Noites Recentes - Bar chart style */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-7 hover:border-cyan-500/30 transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-400" />
                Noites Recentes
              </h3>
              <p className="text-xs text-gray-500">
                Veja se seu corpo está acumulando sono de atleta ou dívida de sono.
              </p>
            </div>
          </div>

          {/* Bar chart grid */}
          <div className="grid grid-cols-7 gap-3 mb-5">
            {mockNights.map((night, idx) => {
              const heightPercent = (night.hours / 9) * 100
              const qualityColor =
                night.quality >= 4
                  ? "bg-gradient-to-t from-green-500/80 to-green-400/80 border-green-400/60 shadow-green-500/30"
                  : night.quality >= 3
                    ? "bg-gradient-to-t from-yellow-500/80 to-yellow-400/80 border-yellow-400/60 shadow-yellow-500/30"
                    : "bg-gradient-to-t from-red-500/80 to-red-400/80 border-red-400/60 shadow-red-500/30"

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className="relative group flex flex-col items-center"
                >
                  <div className="relative w-full h-32 bg-slate-900/40 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300">
                    {/* Bar */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 ${qualityColor} border-t-2 transition-all duration-500 group-hover:scale-105`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    {/* Hours label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white drop-shadow-lg z-10">
                        {night.hoursFormatted}
                      </span>
                    </div>
                  </div>
                  {/* Day label */}
                  <p className="text-[10px] text-gray-400 mt-2 font-medium group-hover:text-white transition-colors">
                    {night.day}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Selected night details */}
          {selectedNight && (
            <div className="mt-6 p-5 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl shadow-xl shadow-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white">{selectedNight.fullDate}</h4>
                <button
                  onClick={() => setSelectedDayIndex(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-slate-700/50 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
                  <p className="text-[10px] text-gray-500 mb-1 font-medium">Duração</p>
                  <p className="text-lg font-bold text-white">{selectedNight.hoursFormatted}</p>
                </div>
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
                  <p className="text-[10px] text-gray-500 mb-1 font-medium">Horário</p>
                  <p className="text-xs font-semibold text-white">
                    {selectedNight.bedtime} → {selectedNight.wakeup}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/40 mb-4">
                <span className="text-xs text-gray-400 font-medium">Qualidade</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedNight.quality >= 4 ? "bg-green-500/20 text-green-400 border-green-500/30" : selectedNight.quality >= 3 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
                >
                  {selectedNight.qualityLabel}
                </span>
              </div>

              {selectedNight.causes.length > 0 && (
                <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl mb-4">
                  <p className="text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wider">
                    Causas identificadas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNight.causes.map((cause, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-[10px] font-semibold border border-red-500/30"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] text-gray-500 mb-2 font-medium uppercase tracking-wider">
                  Impacto no sistema
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedNight.impact}</p>
              </div>
            </div>
          )}
        </div>

        {/* Hábitos de Sono - Technical form */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-7 hover:border-cyan-500/30 transition-all duration-500">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              Hábitos de Sono & Recuperação
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Cada hábito aqui altera silenciosamente seus hormônios, apetite e recuperação muscular. Marque com
              honestidade.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/40 hover:border-cyan-500/30 transition-all duration-200 group">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 font-medium">Exposição ao sol pela manhã</span>
                {getImpactBadge("high")}
              </div>
              <button
                onClick={() => setSunExposure(!sunExposure)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${sunExposure ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" : "bg-slate-700"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${sunExposure ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/40 hover:border-cyan-500/30 transition-all duration-200 group">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 font-medium">Última cafeína antes das 15h</span>
                {getImpactBadge("high")}
              </div>
              <button
                onClick={() => setLastCaffeineEarly(!lastCaffeineEarly)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${lastCaffeineEarly ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" : "bg-slate-700"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${lastCaffeineEarly ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/40 hover:border-cyan-500/30 transition-all duration-200 group">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 font-medium">Tela desligada 60 min antes</span>
                {getImpactBadge("high")}
              </div>
              <button
                onClick={() => setScreenOffEarly(!screenOffEarly)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${screenOffEarly ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" : "bg-slate-700"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${screenOffEarly ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            {/* Toggle 4 */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/40 hover:border-cyan-500/30 transition-all duration-200 group">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 font-medium">Última refeição leve</span>
                {getImpactBadge("medium")}
              </div>
              <button
                onClick={() => setLightDinner(!lightDinner)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${lightDinner ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" : "bg-slate-700"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${lightDinner ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            {/* Slider 1 - Stress */}
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300 font-medium">Nível de estresse hoje</label>
                {getImpactBadge("medium")}
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] font-medium">
                <span className="text-gray-500">Mínimo</span>
                <span className="text-orange-400 text-sm font-bold">{stressLevel}/10</span>
                <span className="text-gray-500">Máximo</span>
              </div>
            </div>

            {/* Slider 2 - Quality */}
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300 font-medium">Qualidade percebida do sono</label>
                {getImpactBadge("high")}
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={perceivedQuality}
                onChange={(e) => setPerceivedQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] font-medium">
                <span className="text-gray-500">Péssima</span>
                <span className="text-cyan-400 text-sm font-bold">{perceivedQuality}/10</span>
                <span className="text-gray-500">Excelente</span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleRegisterHabits}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {habitsSubmitted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Dados de hoje enviados para a Atlas IA
              </>
            ) : (
              "Registrar hábitos de hoje"
            )}
          </button>
        </div>
      </div>

      {/* BLOCO 3: MODOS E PROTOCOLOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modo Base */}
        <div className="group bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-md border-2 border-blue-500/40 rounded-3xl p-7 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Modo Base</h3>
              <p className="text-[10px] text-gray-400">Sono de Atleta</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-5 leading-relaxed">
            A rotina ideal para performance máxima e recuperação profunda.
          </p>

          <div className="space-y-4 mb-5">
            <div className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl">
              <span className="text-xs text-gray-400 font-medium">Dormir às:</span>
              <span className="text-xl font-bold text-blue-400">23:00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl">
              <span className="text-xs text-gray-400 font-medium">Acordar às:</span>
              <span className="text-xl font-bold text-blue-400">06:30</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl border border-green-500/30">
              <span className="text-xs text-gray-400 font-medium">Janela de sono:</span>
              <span className="text-lg font-bold text-green-400">7h30 – 8h</span>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-700/50">
            <p className="text-[10px] text-gray-500 mb-3 font-semibold uppercase tracking-wider">Regras base:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                Sem tela 60 min antes
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                Sem cafeína após 15h
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                Rotina de desaceleração (leitura, banho)
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                Quarto escuro, silencioso, fresco
              </li>
            </ul>
          </div>
        </div>

        {/* Modo Crise */}
        <div className="group bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-md border-2 border-red-500/40 rounded-3xl p-7 hover:border-red-400 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-400/30">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Modo Crise</h3>
              <p className="text-[10px] text-gray-400">Noite detonada</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            Dormiu mal ou quase não dormiu? Use este modo para reduzir dano hoje e não jogar a semana fora.
          </p>

          <button
            onClick={() => setShowCrisisModal(true)}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 hover:scale-105 flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            Dormi mal hoje, ajustar meu dia
          </button>

          <p className="mt-5 text-xs text-gray-400 leading-relaxed">
            A Atlas IA vai ajustar treino, dieta e sono para você não se sabotar.
          </p>
        </div>

        {/* Protocolos Atlas */}
        <div className="group bg-slate-800/50 backdrop-blur-md border-2 border-slate-700/60 rounded-3xl p-7 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Protocolos Atlas</h3>
              <p className="text-[10px] text-gray-400">Reprogramação</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-5 leading-relaxed">
            Escolha um protocolo para reprogramar seu sono como de atleta.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setShowProtocolModal("reset")}
              className="w-full text-left p-4 bg-slate-900/60 hover:bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 group/btn hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <p className="text-sm font-bold text-white group-hover/btn:text-cyan-400 transition-colors mb-1 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                Reset de Higiene do Sono
              </p>
              <p className="text-[10px] text-gray-400 ml-4">7 dias · Quebrar hábitos ruins</p>
            </button>

            <button
              onClick={() => setShowProtocolModal("screen")}
              className="w-full text-left p-4 bg-slate-900/60 hover:bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 group/btn hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <p className="text-sm font-bold text-white group-hover/btn:text-cyan-400 transition-colors mb-1 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                Quebra de Tela Até Tarde
              </p>
              <p className="text-[10px] text-gray-400 ml-4">14 dias · Eliminar luz azul</p>
            </button>

            <button
              onClick={() => setShowProtocolModal("athlete")}
              className="w-full text-left p-4 bg-slate-900/60 hover:bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 group/btn hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <p className="text-sm font-bold text-white group-hover/btn:text-cyan-400 transition-colors mb-1 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                Sono de Atleta Natural
              </p>
              <p className="text-[10px] text-gray-400 ml-4">21 dias · Performance máxima</p>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Modo Crise - Keep existing implementation */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-red-500/40 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-red-500/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-red-400" />
                Modo Crise Ativado
              </h3>
              <button
                onClick={() => setShowCrisisModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-3 font-medium">Quantas horas você dormiu?</label>
                <input
                  type="number"
                  step="0.5"
                  value={crisisHours}
                  onChange={(e) => setCrisisHours(e.target.value)}
                  placeholder="Ex: 3.5"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-3 font-medium">Motivo principal da noite ruim?</label>
                <select
                  value={crisisReason}
                  onChange={(e) => setCrisisReason(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="stress">Estresse</option>
                  <option value="screen">Tela até tarde</option>
                  <option value="caffeine">Cafeína</option>
                  <option value="pain">Dor</option>
                  <option value="heavy_meal">Refeição pesada</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-3 font-medium">Energia agora (1 a 5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={crisisEnergy}
                  onChange={(e) => setCrisisEnergy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Péssima</span>
                  <span className="text-red-400 font-bold text-sm">{crisisEnergy}/5</span>
                  <span>Ótima</span>
                </div>
              </div>

              <button
                onClick={handleCrisisSubmit}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 mt-6"
              >
                Ajustar meu dia agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Protocolos - Enhanced */}
      {showProtocolModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {showProtocolModal === "reset"
                  ? "Reset de Higiene do Sono (7 dias)"
                  : showProtocolModal === "screen"
                    ? "Quebra de Tela Até Tarde (14 dias)"
                    : "Protocolo 30 dias – Estilo de Vida de Atleta Natural"}
              </h3>
              <button
                onClick={() => setShowProtocolModal(null)}
                className="w-8 h-8 rounded-lg hover:bg-secondary/50 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-gray-300">
              <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <h4 className="font-bold text-cyan-400 mb-3 text-base">Objetivo</h4>
                <p className="leading-relaxed">
                  {showProtocolModal === "reset" &&
                    "Estabelecer base sólida de hábitos que favorecem a produção natural de testosterona através de sono, treino e nutrição."}
                  {showProtocolModal === "screen" &&
                    "Eliminar ou reduzir drasticamente comportamentos que sabotam a produção hormonal: álcool, privação de sono, excesso de telas."}
                  {showProtocolModal === "athlete" &&
                    "Integrar todos os pilares hormonais (sono, treino, nutrição, estresse, exposição solar) em uma rotina sustentável de longo prazo."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
                  <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Rotina da Manhã
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Acordar no mesmo horário (6h-7h)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Sol nos primeiros 30 min
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Hidratação imediata (500ml)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Café proteico em 1h
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
                  <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    Rotina da Tarde
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Última cafeína até 15h
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Treino ideal: 16h-19h
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Refeição pesada no almoço
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Sem cochilos após 16h
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
                  <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Rotina da Noite
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Jantar leve até 20h
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Telas off 60 min antes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Banho morno 30 min antes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Dormir 22h-23h
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-2xl">
                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Métrica de Sucesso
                </h4>
                <p>
                  {showProtocolModal === "reset" && "Aumentar ASRI de 55 → 75+ em 7 dias"}
                  {showProtocolModal === "screen" && "Aumentar ASRI de 60 → 80+ em 14 dias"}
                  {showProtocolModal === "athlete" && "Atingir ASRI > 85 e manter por 21 dias consecutivos"}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-700/50">
                <p className="text-xs text-gray-400 leading-relaxed">
                  <AlertCircle className="w-3 h-3 inline mr-1 text-yellow-400" />
                  No futuro, esse protocolo será integrado automaticamente com seu treino, dieta e outros módulos da
                  Atlas IA para ajustes dinâmicos baseados em dados reais.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowProtocolModal(null)}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 rounded-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all"
            >
              Entendi
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

  // State for body map
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [showRegionDetails, setShowRegionDetails] = useState<string | null>(null)

  // Check for red flags
  const hasRedFlags = traumaHistory || neurologicalSymptoms || nightPain || painIntensity >= 8

  // Pain regions
  const painRegions = [
    { id: "cervical", label: "Cervical / Pescoço", icon: "🔵" },
    { id: "shoulder", label: "Ombro", icon: "🔵" },
    { id: "thoracic", label: "Coluna Torácica", icon: "🔵" },
    { id: "lumbar", label: "Lombar", icon: "🔵" },
    { id: "hip", label: "Quadril", icon: "🔵" },
    { id: "knee", label: "Joelho", icon: "🔵" },
    { id: "ankle", label: "Tornozelo / Pé", icon: "🔵" },
    { id: "other", label: "Outro", icon: "🔵" },
  ]

  // Body map regions with recommendations
  const bodyMapRegions: Record<string, { description: string; recommendations: string[] }> = {
    cervical: {
      description:
        "Região cervical: frequentemente afetada por má postura ao trabalhar no computador ou uso excessivo de celular.",
      recommendations: [
        "Evite movimentos bruscos de rotação",
        "Faça pausas a cada 45-60 min de trabalho",
        "Mantenha tela do computador na altura dos olhos",
        "Evite dormir de bruços",
      ],
    },
    shoulder: {
      description: "Ombros: sobrecarga comum em exercícios de supino, desenvolvimento e movimentos acima da cabeça.",
      recommendations: [
        "Evite movimentos explosivos acima da cabeça",
        "Reduza carga em supino e desenvolvimento",
        "Fortaleça manguito rotador com exercícios leves",
        "Priorize amplitude de movimento antes de carga",
      ],
    },
    thoracic: {
      description: "Coluna torácica: rigidez comum por postura curvada e falta de mobilidade.",
      recommendations: [
        "Faça extensões torácicas diárias",
        "Evite ficar muito tempo sentado",
        "Inclua foam roller na rotina",
        "Trabalhe mobilidade em rotação",
      ],
    },
    lumbar: {
      description: "Região lombar: área de maior incidência de dores, geralmente por fraqueza do core e sobrecarga.",
      recommendations: [
        "Evite agachamentos pesados temporariamente",
        "Fortaleça core com exercícios isométricos",
        "Reduza exercícios com flexão de coluna sob carga",
        "Mantenha postura neutra ao levantar objetos",
      ],
    },
    hip: {
      description: "Quadril: tensão comum em quem fica muito sentado ou tem encurtamento de flexores.",
      recommendations: [
        "Alongue flexores de quadril diariamente",
        "Evite agachamentos muito profundos se houver dor",
        "Fortaleça glúteos com exercícios específicos",
        "Faça pausas para caminhar durante o dia",
      ],
    },
    knee: {
      description: "Joelhos: articulação vulnerável a sobrecarga, especialmente em corrida e agachamentos.",
      recommendations: [
        "Reduza impacto de corrida por alguns dias",
        "Evite leg press com amplitude excessiva",
        "Fortaleça quadríceps e posteriores de coxa",
        "Use gelo após atividades se houver inchaço",
      ],
    },
    ankle: {
      description: "Tornozelo e pé: frequentemente afetados por entorses, fascite plantar ou sobrecarga.",
      recommendations: [
        "Evite corrida em terreno irregular",
        "Use calçados adequados para treino",
        "Fortaleça músculos do pé com exercícios descalço",
        "Faça mobilidade de tornozelo antes de agachar",
      ],
    },
    other: {
      description: "Outras regiões: cada área tem suas particularidades e requer avaliação específica.",
      recommendations: [
        "Identifique o movimento que causa dor",
        "Evite esse movimento temporariamente",
        "Monitore se a dor melhora ou piora",
        "Procure um profissional se persistir",
      ],
    },
  }

  // Mock history data
  const painHistory = [
    { date: "05/01/2026", region: "Lombar", before: 7, after: 4, status: "melhorando" },
    { date: "28/12/2025", region: "Ombro D", before: 5, after: 3, status: "melhorando" },
    { date: "15/12/2025", region: "Joelho E", before: 6, after: 6, status: "estável" },
    { date: "01/12/2025", region: "Cervical", before: 4, after: 2, status: "melhorando" },
  ]

  // Get protocol based on selected region
  const getProtocolTitle = () => {
    if (!selectedRegion) return "Protocolo Atlas – 7 dias de recuperação"
    const region = painRegions.find((r) => r.id === selectedRegion)
    return `Protocolo Atlas – 7 dias de proteção para ${region?.label || "a região afetada"}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-green-500/20 flex items-center justify-center border border-teal-500/30">
          <Activity className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Fisioterapia & Dores – Reconstrução inteligente do seu corpo
          </h2>
          <p className="text-muted-foreground text-sm">
            Atlas IA usa seus dados, suas queixas e princípios de fisioterapia baseada em evidência para organizar sua
            recuperação — sempre lembrando que não substitui um profissional presencial.
          </p>
        </div>
      </div>

      {/* Card 1: Triagem de Dor Atual */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-teal-400" />
          Triagem de Dor Atual
        </h3>

        {/* Region selector */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-3 block">Região principal da dor</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {painRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  selectedRegion === region.id
                    ? "bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-500/20"
                    : "bg-card/50 border-border text-muted-foreground hover:border-teal-500/50 hover:bg-teal-500/10"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pain intensity slider */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Intensidade da dor: <span className="font-bold text-foreground">{painIntensity}/10</span>
            <span className="ml-2 text-xs">
              {painIntensity === 0 && "(Sem dor)"}
              {painIntensity >= 1 && painIntensity <= 3 && "(Leve)"}
              {painIntensity >= 4 && painIntensity <= 6 && "(Moderada)"}
              {painIntensity >= 7 && painIntensity <= 8 && "(Intensa)"}
              {painIntensity >= 9 && "(Muito intensa)"}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={painIntensity}
            onChange={(e) => setPainIntensity(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Pain duration */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">Tempo de dor</label>
          <div className="flex gap-2">
            {[
              { value: "days", label: "Dias" },
              { value: "weeks", label: "Semanas" },
              { value: "months", label: "Meses" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPainDuration(option.value as any)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  painDuration === option.value
                    ? "bg-teal-600 border-teal-500 text-white"
                    : "bg-card/50 border-border text-muted-foreground hover:border-teal-500/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Red flag questions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Perguntas de segurança
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setTraumaHistory(!traumaHistory)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                traumaHistory
                  ? "bg-red-500/10 border-red-500/50"
                  : "bg-card/50 border-border hover:border-yellow-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Trauma / Queda?</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    traumaHistory ? "bg-red-500 border-red-500" : "border-muted-foreground"
                  }`}
                >
                  {traumaHistory && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">A dor começou após trauma, queda ou acidente?</p>
            </div>

            <div
              onClick={() => setNightPain(!nightPain)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                nightPain ? "bg-red-500/10 border-red-500/50" : "bg-card/50 border-border hover:border-yellow-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Dor noturna?</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    nightPain ? "bg-red-500 border-red-500" : "border-muted-foreground"
                  }`}
                >
                  {nightPain && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">A dor piora à noite ou te acorda?</p>
            </div>

            <div
              onClick={() => setNeurologicalSymptoms(!neurologicalSymptoms)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                neurologicalSymptoms
                  ? "bg-red-500/10 border-red-500/50"
                  : "bg-card/50 border-border hover:border-yellow-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Sintomas neurológicos?</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    neurologicalSymptoms ? "bg-red-500 border-red-500" : "border-muted-foreground"
                  }`}
                >
                  {neurologicalSymptoms && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Formigamento, perda de força ou dormência?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Alert based on red flags */}
      {selectedRegion && (
        <div
          className={`rounded-2xl p-6 border transition-all duration-300 ${
            hasRedFlags ? "bg-red-500/10 border-red-500/30" : "bg-teal-500/10 border-teal-500/30"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                hasRedFlags ? "bg-red-500/20" : "bg-teal-500/20"
              }`}
            >
              {hasRedFlags ? (
                <AlertTriangle className="w-6 h-6 text-red-400" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-teal-400" />
              )}
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-2 ${hasRedFlags ? "text-red-300" : "text-teal-300"}`}>
                {hasRedFlags
                  ? "Atenção: Sinais que merecem avaliação presencial"
                  : "Boa notícia: Sem sinais claros de emergência"}
              </h4>
              <p className={`text-sm ${hasRedFlags ? "text-red-200/80" : "text-teal-200/80"}`}>
                {hasRedFlags
                  ? "Esses sinais indicam que você pode precisar de avaliação presencial com médico/fisioterapeuta. A Atlas IA NÃO faz diagnóstico. Use esse painel apenas como orientação geral até consultar um profissional."
                  : "Pelos seus dados, não há sinais claros de emergência. Vamos focar em organizar sua recuperação com segurança e progressão inteligente."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Card 2: Mapa de Regiões & Riscos */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Mapa de Regiões & Riscos
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Body map visualization */}
          <div className="bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Clique em uma região para ver recomendações
            </p>
            <div className="grid grid-cols-2 gap-3">
              {painRegions
                .filter((r) => r.id !== "other")
                .map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setShowRegionDetails(showRegionDetails === region.id ? null : region.id)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      showRegionDetails === region.id
                        ? "bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10"
                        : hoveredRegion === region.id
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-slate-800/50 border-slate-700/50 hover:border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full transition-all ${
                          selectedRegion === region.id ? "bg-red-400 shadow-lg shadow-red-400/50" : "bg-blue-400/50"
                        }`}
                      />
                      <span className="text-sm font-medium text-foreground">{region.label}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Region details panel */}
          <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/50">
            {showRegionDetails && bodyMapRegions[showRegionDetails] ? (
              <div className="space-y-4">
                <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  {painRegions.find((r) => r.id === showRegionDetails)?.label}
                </h4>
                <p className="text-sm text-muted-foreground">{bodyMapRegions[showRegionDetails].description}</p>
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-2">Recomendações de segurança:</h5>
                  <ul className="space-y-2">
                    {bodyMapRegions[showRegionDetails].recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-teal-300/80">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                <p>Selecione uma região no mapa para ver detalhes e recomendações</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Protocolo Inteligente da Semana */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            {getProtocolTitle()}
          </h3>
          <span className="text-xs text-muted-foreground bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Rascunho de protocolo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Objetivo da semana */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Objetivo da semana
            </h4>
            <p className="text-sm text-muted-foreground">
              Reduzir dor de {painIntensity}/10 para {Math.max(0, painIntensity - 3)}/10 e restaurar movimentos básicos
              sem piora.
            </p>
          </div>

          {/* Movimentos a evitar */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Movimentos a evitar temporariamente
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {selectedRegion === "shoulder" && (
                <>
                  <li>• Supino pesado</li>
                  <li>• Desenvolvimento militar em pé</li>
                  <li>• Movimentos acima da cabeça com carga</li>
                </>
              )}
              {selectedRegion === "lumbar" && (
                <>
                  <li>• Agachamento com barra alta</li>
                  <li>• Levantamento terra pesado</li>
                  <li>• Abdominais tradicionais</li>
                </>
              )}
              {selectedRegion === "knee" && (
                <>
                  <li>• Corrida de alta intensidade</li>
                  <li>• Leg press com amplitude excessiva</li>
                  <li>• Saltos e pliometria</li>
                </>
              )}
              {(!selectedRegion || !["shoulder", "lumbar", "knee"].includes(selectedRegion)) && (
                <>
                  <li>• Movimentos que causam dor</li>
                  <li>• Exercícios com carga alta na região</li>
                  <li>• Movimentos explosivos</li>
                </>
              )}
            </ul>
          </div>

          {/* Rotina diária sugerida */}
          <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-teal-300 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Rotina diária sugerida
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">1.</span>
                <div>
                  <span className="font-medium text-foreground">Aquecimento:</span> 5-10 min de mobilidade geral
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">2.</span>
                <div>
                  <span className="font-medium text-foreground">Mobilidade suave:</span> 2-3 exercícios focados na
                  região
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">3.</span>
                <div>
                  <span className="font-medium text-foreground">Fortalecimento leve:</span> 2-3 exercícios com baixo
                  volume
                </div>
              </div>
            </div>
          </div>

          {/* Hábitos que aceleram */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Hábitos que aceleram recuperação
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Sono de 7-9h de qualidade</li>
              <li>• Hidratação adequada (2-3L/dia)</li>
              <li>• Controlar carga semanal de treino</li>
              <li>• Pausas regulares no trabalho</li>
              <li>• Alimentação anti-inflamatória</li>
            </ul>
          </div>
        </div>

        {/* Quando parar */}
        <div className="mt-6 bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Quando PARAR e procurar ajuda presencial
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Dor piorando significativamente</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Perda de força progressiva</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Inchaço ou vermelhidão</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Febre ou sintomas sistêmicos</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Dor irradiada para membros</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Limitação funcional severa</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 italic">
          * Este é um rascunho de protocolo baseado em dados gerais. A prescrição personalizada será gerada pela Atlas
          IA após análise completa do seu perfil e histórico.
        </p>
      </div>

      {/* Card 4: Histórico de Dores & Recuperação */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          Histórico de Dores & Recuperação
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-2">Data</th>
                <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-2">Região</th>
                <th className="text-center text-xs font-semibold text-muted-foreground py-3 px-2">Dor (antes)</th>
                <th className="text-center text-xs font-semibold text-muted-foreground py-3 px-2">Dor (depois)</th>
                <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {painHistory.map((entry, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-2 text-sm text-foreground">{entry.date}</td>
                  <td className="py-3 px-2 text-sm text-foreground">{entry.region}</td>
                  <td className="py-3 px-2 text-center">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300">
                      {entry.before}/10
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.after < entry.before
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {entry.after}/10
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        entry.status === "melhorando"
                          ? "text-green-400"
                          : entry.status === "piorando"
                            ? "text-red-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {entry.status === "melhorando" && <TrendingUp className="w-3 h-3" />}
                      {entry.status === "melhorando"
                        ? "Melhorando"
                        : entry.status === "piorando"
                          ? "Piorando"
                          : "Estável"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          * Dados mockados para demonstração. O histórico real será preenchido conforme você registrar dores e
          acompanhar sua evolução.
        </p>
      </div>
    </div>
  )
}

// ========== TestosteronaView IMPLEMENTATION ==========
function TestosteronaView() {
  const { currentWeekMetrics } = useAtlasData()
  const [habitosModal, setHabitosModal] = useState(false)
  const [protocolModal, setProtocolModal] = useState<string | null>(null)

  // Estado local para check-in hormonal
  const [habitosHoje, setHabitosHoje] = useState({
    sol: false,
    treino: false,
    passos: false,
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

  let testStatus = "Subótimo"
  let testColor = "text-yellow-400"
  if (atlasTestIndex >= 75) {
    testStatus = "Excelente"
    testColor = "text-green-400"
  } else if (atlasTestIndex >= 60) {
    testStatus = "Bom"
    testColor = "text-cyan-400"
  }

  const sonoQuality =
    currentWeekMetrics.avgSleepHours >= 7 ? "Alta" : currentWeekMetrics.avgSleepHours >= 6 ? "Média" : "Baixa"
  const sonoColor =
    currentWeekMetrics.avgSleepHours >= 7
      ? "text-green-400"
      : currentWeekMetrics.avgSleepHours >= 6
        ? "text-yellow-400"
        : "text-red-400"

  const cargaSemanal =
    currentWeekMetrics.trainingsDone >= 4 ? "Alta" : currentWeekMetrics.trainingsDone >= 2 ? "Moderada" : "Leve"
  const riscoOver = currentWeekMetrics.trainingsDone > 5 && currentWeekMetrics.avgSleepHours < 7 ? "Alto" : "Baixo"

  const nivelEstresse = habitosHoje.estresse >= 4 ? "Alto" : habitosHoje.estresse >= 3 ? "Médio" : "Baixo"
  const usoAlcool = habitosHoje.alcool

  // Mock de timeline dos últimos 30 dias
  const timelineData = Array.from({ length: 30 }, (_, i) => ({
    dia: i + 1,
    score: Math.round(atlasTestIndex + (Math.random() - 0.5) * 20),
  }))

  const registrarHabitos = () => {
    setHabitosModal(true)
    setTimeout(() => setHabitosModal(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* BLOCO 1 - OVERVIEW HORMONAL */}
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Testosterona Natural</h2>
            <p className="text-muted-foreground text-sm">
              Centro de comando para hábitos, recuperação e performance hormonal – sem uso de fármacos.
            </p>
          </div>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Atlas Test Index */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-muted-foreground font-medium">Atlas Test Index</span>
            </div>
            <div className={`text-4xl font-bold ${testColor} mb-2`}>
              {atlasTestIndex}
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>
            <div className="text-sm text-muted-foreground mb-3">
              Status: <span className={testColor}>{testStatus}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Índice estimado com base nos seus hábitos de sono, treino, estresse e nutrição.
            </p>
          </div>

          {/* Sono & Recuperação */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-muted-foreground font-medium">Sono & Recuperação</span>
            </div>
            <div className={`text-lg font-bold ${sonoColor} mb-2`}>Qualidade: {sonoQuality}</div>
            <div className="text-sm text-muted-foreground">
              Horas médias:{" "}
              <span className="text-foreground font-medium">{currentWeekMetrics.avgSleepHours.toFixed(1)}h</span>
            </div>
          </div>

          {/* Treino & Carga */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-muted-foreground font-medium">Treino & Carga</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Carga semanal: <span className="text-foreground font-medium">{cargaSemanal}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Risco de overtraining:{" "}
              <span className={riscoOver === "Alto" ? "text-red-400" : "text-green-400"}>{riscoOver}</span>
            </div>
          </div>

          {/* Estresse & Estilo de vida */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)] transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-green-400" />
              <span className="text-sm text-muted-foreground font-medium">Estresse & Estilo de vida</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Nível de estresse:{" "}
              <span
                className={
                  nivelEstresse === "Alto"
                    ? "text-red-400"
                    : nivelEstresse === "Médio"
                      ? "text-yellow-400"
                      : "text-green-400"
                }
              >
                {nivelEstresse}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Uso de álcool: <span className="text-foreground font-medium">{usoAlcool}</span>
            </div>
          </div>
        </div>

        {/* Banner de segurança */}
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-200/90 leading-relaxed">
            Este painel não substitui exames laboratoriais nem acompanhamento médico. A Atlas IA organiza seus hábitos
            para favorecer a testosterona natural com base em evidências científicas.
          </p>
        </div>
      </div>

      {/* BLOCO 2 - HÁBITOS HORMONAIS DO DIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna esquerda - Check-in */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-1">Hábitos de Hoje</h3>
          <p className="text-sm text-muted-foreground mb-6">Registre seus hábitos hormonais diários</p>

          <div className="space-y-5">
            {/* Exposição ao sol */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-400" />
                Exposição ao sol pela manhã
              </label>
              <button
                onClick={() => setHabitosHoje({ ...habitosHoje, sol: !habitosHoje.sol })}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  habitosHoje.sol ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    habitosHoje.sol ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Treino de força */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-purple-400" />
                Treino de força hoje
              </label>
              <button
                onClick={() => setHabitosHoje({ ...habitosHoje, treino: !habitosHoje.treino })}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  habitosHoje.treino ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    habitosHoje.treino ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Passos */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Passou de 10.000 passos?
              </label>
              <button
                onClick={() => setHabitosHoje({ ...habitosHoje, passos: !habitosHoje.passos })}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  habitosHoje.passos ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    habitosHoje.passos ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Álcool */}
            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <Wine className="w-4 h-4 text-red-400" />
                Ingestão de álcool
              </label>
              <select
                value={habitosHoje.alcool}
                onChange={(e) => setHabitosHoje({ ...habitosHoje, alcool: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Nenhum</option>
                <option>Moderado</option>
                <option>Alto</option>
              </select>
            </div>

            {/* Sono */}
            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-blue-400" />
                Qualidade do sono (última noite)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={habitosHoje.sono}
                onChange={(e) => setHabitosHoje({ ...habitosHoje, sono: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Péssimo</span>
                <span className="font-medium text-foreground">{habitosHoje.sono}/5</span>
                <span>Excelente</span>
              </div>
            </div>

            {/* Estresse */}
            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                Nível de estresse hoje
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={habitosHoje.estresse}
                onChange={(e) => setHabitosHoje({ ...habitosHoje, estresse: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Baixo</span>
                <span className="font-medium text-foreground">{habitosHoje.estresse}/5</span>
                <span>Alto</span>
              </div>
            </div>
          </div>

          <button
            onClick={registrarHabitos}
            className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium py-3 rounded-xl hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-all duration-300"
          >
            Registrar hábitos hormonais de hoje
          </button>
        </div>

        {/* Coluna direita - Recomendação */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-1">Foco de Hoje</h3>
          <p className="text-sm text-muted-foreground mb-6">Recomendação da Atlas IA</p>

          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-xl p-5 mb-6">
            <p className="text-sm text-blue-100/90 leading-relaxed">
              {currentWeekMetrics.avgSleepHours < 7
                ? "Hoje o foco é: reduzir estímulos à noite e proteger seu sono de 23h–7h."
                : habitosHoje.estresse >= 4
                  ? "Hoje o foco é: gerenciar o estresse com técnicas de respiração e caminhada ao ar livre."
                  : "Hoje o foco é: manter a consistência dos hábitos que estão funcionando."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Moon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Ajuste de sono sugerido</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentWeekMetrics.avgSleepHours < 7
                    ? "Antecipar o horário de dormir em 30 minutos para atingir 7-8h de sono."
                    : "Manter a consistência do horário de sono atual."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Dumbbell className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Ajuste de treino</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentWeekMetrics.trainingsDone < 3
                    ? "Aumentar frequência semanal para 3-4 treinos de força."
                    : riscoOver === "Alto"
                      ? "Reduzir volume ou adicionar dia de descanso ativo."
                      : "Manter intensidade e volume atuais."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Coffee className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Ajuste de rotina</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {habitosHoje.alcool !== "Nenhum"
                    ? "Reduzir ou eliminar álcool por 14 dias para observar impacto no sono e energia."
                    : habitosHoje.estresse >= 4
                      ? "Implementar pausas de 5 minutos a cada 2h de trabalho com respiração profunda."
                      : "Manter exposição solar matinal e limitar telas após 21h."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO 3 - PROTOCOLOS & LINHA DO TEMPO */}
      <div className="space-y-6">
        {/* Linha do Tempo */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-1">Evolução do Atlas Test Index</h3>
          <p className="text-sm text-muted-foreground mb-6">Últimos 30 dias</p>

          {/* Gráfico simplificado */}
          <div className="h-48 flex items-end justify-between gap-1">
            {timelineData.map((item, i) => {
              const height = (item.score / 100) * 100
              let barColor = "bg-yellow-500/60"
              if (item.score >= 75) barColor = "bg-green-500/60"
              else if (item.score >= 60) barColor = "bg-cyan-500/60"
              else if (item.score < 50) barColor = "bg-red-500/60"

              return (
                <div
                  key={i}
                  className={`flex-1 ${barColor} rounded-t transition-all duration-300 hover:opacity-100 opacity-80 cursor-pointer group relative`}
                  style={{ height: `${height}%` }}
                  title={`Dia ${item.dia}: ${item.score}`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Dia {item.dia}: {item.score}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-4">
            <span>Dia 1</span>
            <span>Dia 15</span>
            <span>Dia 30 (Hoje)</span>
          </div>
        </div>

        {/* Protocolos */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4">Protocolos Atlas de Testosterona Natural</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Protocolo 21 dias */}
            <button
              onClick={() => setProtocolModal("21dias")}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs font-medium text-blue-400">21 DIAS</span>
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Fundamentos Hormonais</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Foco em sono, treino de força, nutrição básica e gestão de estresse.
              </p>
            </button>

            {/* Protocolo 14 dias */}
            <button
              onClick={() => setProtocolModal("14dias")}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-xs font-medium text-yellow-400">14 DIAS</span>
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Anti-Sabotagem</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cortar ou reduzir estímulos que derrubam sono e ejeção hormonal.
              </p>
            </button>

            {/* Protocolo 30 dias */}
            <button
              onClick={() => setProtocolModal("30dias")}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs font-medium text-purple-400">30 DIAS</span>
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">Estilo de Vida de Atleta Natural</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Combinação de sono consistente, treino inteligente e rotina alinhada.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de sucesso */}
      {habitosModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center animate-in zoom-in-95 fade-in duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Hábitos Registrados!</h3>
            <p className="text-sm text-muted-foreground">Suas métricas hormonais foram atualizadas.</p>
          </div>
        </div>
      )}

      {/* Modal de protocolo */}
      {protocolModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {protocolModal === "21dias"
                  ? "Protocolo 21 dias – Fundamentos Hormonais"
                  : protocolModal === "14dias"
                    ? "Protocolo 14 dias – Anti-Sabotagem"
                    : "Protocolo 30 dias – Estilo de Vida de Atleta Natural"}
              </h3>
              <button
                onClick={() => setProtocolModal(null)}
                className="w-8 h-8 rounded-lg hover:bg-secondary/50 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Objetivo */}
              <div>
                <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">Objetivo</h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {protocolModal === "21dias"
                    ? "Estabelecer base sólida de hábitos que favorecem a produção natural de testosterona através de sono, treino e nutrição."
                    : protocolModal === "14dias"
                      ? "Eliminar ou reduzir drasticamente comportamentos que sabotam a produção hormonal: álcool, privação de sono, excesso de telas."
                      : "Integrar todos os pilares hormonais (sono, treino, nutrição, estresse, exposição solar) em uma rotina sustentável de longo prazo."}
                </p>
              </div>

              {/* Regras diárias */}
              <div>
                <h4 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">Regras Diárias</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Duração</div>
                    <div className="text-lg font-bold text-foreground">7-9h</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Consistência</div>
                    <div className="text-lg font-bold text-foreground">Alta</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Prioridade</div>
                    <div className="text-lg font-bold text-foreground">Sono</div>
                  </div>
                </div>
              </div>

              {/* Métricas de sucesso */}
              <div>
                <h4 className="text-sm font-bold text-purple-400 mb-3 uppercase tracking-wider">Métricas de Sucesso</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Sono Médio</div>
                    <div className="text-lg font-bold text-foreground">7+ horas</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Energia Diária</div>
                    <div className="text-lg font-bold text-foreground">4-5/5</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Consistência de Treino</div>
                    <div className="text-lg font-bold text-foreground">85%+</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Atlas Test Index</div>
                    <div className="text-lg font-bold text-foreground">70+</div>
                  </div>
                </div>
              </div>

              {/* Alertas de segurança */}
              <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-400 mb-2">Alertas de Segurança</h4>
                    <p className="text-sm text-red-200/90 leading-relaxed">
                      Se você estiver usando ou considerar usar hormônios, converse com um médico/endócrino. A Atlas IA
                      não orienta uso de fármacos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setProtocolModal(null)}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 rounded-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== PLACEHOLDER VIEWS ==========
function AtlasIAView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Brain className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Atlas IA</h2>
          <p className="text-muted-foreground">Seu assistente de governança corporal</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Chat da Atlas IA em desenvolvimento...</p>
      </div>
    </div>
  )
}

function TreinoDietaView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Dumbbell className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Treino & Dieta</h2>
          <p className="text-muted-foreground">Configure seu plano de treino e alimentação</p>
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Módulo de Treino & Dieta em desenvolvimento...</p>
      </div>
    </div>
  )
}

// ========== MAIN PAGE COMPONENT ==========
export default function AtlasPainelPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [passportOpen, setPassportOpen] = useState(false)
  // </CHANGE>

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
        <button
          onClick={() => setPassportOpen(true)}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20"
        >
          <User className="w-4 h-4" />
          <span className="hidden md:inline">Perfil Atlas</span>
        </button>
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

      <AtlasPassaporte isOpen={passportOpen} onClose={() => setPassportOpen(false)} />
    </div>
  )
}
