"use client"

import { useCallback } from "react"

import { useState } from "react"
import {
  LayoutDashboard,
  Target,
  Brain,
  Dumbbell,
  Utensils,
  Moon,
  Activity,
  Zap,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Camera,
  HelpCircle,
  Save,
  Check,
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
  XCircle,
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
- Não tome anti-inflamatório sem prescrição médica.

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

  const [eventForm, setEventForm] = useState({
    trigger: "",
    intensity: 5,
    didEat: "no" as "no" | "light" | "heavy",
    context: "",
  })
  const [eventRegistered, setEventRegistered] = useState(false)
  // </CHANGE>

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
    // Night defense reduces risk
    if (nightDefenseActive) risk -= 20

    return Math.max(0, Math.min(100, risk))
  }, [checkins, nightDefenseActive])

  const riskLevel = calculateRisk()

  const getRiskState = () => {
    if (riskLevel < 33) return { label: "Baixo", color: "text-green-400", bgColor: "bg-green-500/10" }
    if (riskLevel < 66) return { label: "Moderado", color: "text-yellow-400", bgColor: "bg-yellow-500/10" }
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

  const handleRegisterEvent = () => {
    if (!eventForm.trigger) return
    setEventRegistered(true)
    setTimeout(() => {
      setEventRegistered(false)
      setEventForm({
        trigger: "",
        intensity: 5,
        didEat: "no",
        context: "",
      })
    }, 3000)
  }
  // </CHANGE>

  // AI Insights (mock but structured)
  const aiInsights = [
    "Nos últimos 7 dias, 80% das crises aconteceram entre 21h e 23h, após uso prolongado de celular.",
    "Dias com sono < 6h tiveram 3x mais registros de compulsão.",
    "Seu gatilho dominante é: estresse (nota média 8/10).",
  ]

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* 1) CABEÇALHO - Atlas Craving Index */}
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Compulsão Alimentar</h1>
          <p className="text-slate-400">Centro de comando para crises, janelas críticas e recomeços inteligentes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Atlas Craving Index */}
          <div className="relative p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-medium text-slate-400 mb-1">Atlas Craving Index</div>
                <div className="text-4xl font-bold mb-2">
                  {Math.round(riskLevel)}
                  <span className="text-xl text-slate-500">/100</span>
                </div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${state.bgColor} ${state.color}`}
                >
                  {state.label}
                </div>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700/30"
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
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Sono hoje</span>
                <span className="text-slate-200">{checkins[checkins.length - 1]?.sleepHours || 7}h</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Estresse</span>
                <span className="text-slate-200">{checkins[checkins.length - 1]?.stressLevel || 3}/5</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Déficit acumulado</span>
                <span className="text-slate-200">-450 kcal</span>
              </div>
            </div>
          </div>

          {/* Card 2: Janela Crítica de Hoje */}
          <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div className="text-sm font-medium text-slate-400">Janela Crítica de Hoje</div>
            </div>
            <div className="text-3xl font-bold text-white mb-3">{criticalWindow}</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Período do dia em que você tem maior chance de se sabotar.
            </p>
          </div>

          {/* Card 3: Estado Atual + Botão Crise */}
          <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="text-sm font-medium text-slate-400 mb-2">Estado Atual</div>
              <div className={`text-2xl font-bold mb-4 ${state.color}`}>{state.label}</div>
            </div>
            <button
              onClick={() => setShowCrisisModal(true)}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              Ativar Modo Crise (2 min)
            </button>
          </div>
        </div>
      </div>

      {/* 2) LINHA DO TEMPO DO DIA & NOITES RECENTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline do Dia */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Timeline do Dia
          </h3>

          <div className="relative">
            <div className="flex items-center justify-between mb-2 text-xs text-slate-500">
              <span>6h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h</span>
            </div>

            <div className="relative h-12 bg-slate-800/50 rounded-full overflow-hidden">
              {/* Morning - Green */}
              <div className="absolute left-0 top-0 h-full w-1/4 bg-green-500/30" />
              {/* Afternoon - Green */}
              <div className="absolute left-1/4 top-0 h-full w-1/4 bg-green-500/30" />
              {/* Evening - Yellow (pre-risk) */}
              <div className="absolute left-1/2 top-0 h-full w-1/6 bg-yellow-500/30" />
              {/* Night - Red (critical window) */}
              <div className="absolute left-2/3 top-0 h-full w-1/3 bg-red-500/30" />

              {/* Meal markers */}
              <div
                className="absolute left-[12.5%] top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                title="Café"
              />
              <div
                className="absolute left-[37.5%] top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                title="Almoço"
              />
              <div
                className="absolute left-[58%] top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-slate-900"
                title="Lanche"
              />
              <div
                className="absolute left-[75%] top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-slate-900"
                title="Jantar"
              />
              <div
                className="absolute left-[87%] top-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full border-2 border-slate-900 animate-pulse"
                title="Zona de Risco"
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/50 rounded" />
                <span className="text-slate-400">Períodos OK</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500/50 rounded" />
                <span className="text-slate-400">Pré-Risco</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500/50 rounded" />
                <span className="text-slate-400">Crítico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Noites Recentes */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Noites Recentes (7 dias)
          </h3>

          <div className="grid grid-cols-7 gap-2">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, i) => {
              const status = i % 3 === 0 ? "ok" : i % 3 === 1 ? "alert" : "crisis"
              const config = {
                ok: {
                  icon: CheckCircle2,
                  color: "text-green-400",
                  bg: "bg-green-500/10",
                  border: "border-green-500/30",
                },
                alert: {
                  icon: AlertCircle,
                  color: "text-yellow-400",
                  bg: "bg-yellow-500/10",
                  border: "border-yellow-500/30",
                },
                crisis: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
              }[status]
              const Icon = config.icon

              return (
                <div
                  key={day}
                  className={`p-3 rounded-xl border ${config.bg} ${config.border} text-center hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div className="text-[10px] font-medium text-slate-400 mb-2">{day}</div>
                  <Icon className={`w-5 h-5 ${config.color} mx-auto mb-1`} />
                  <div className="text-[9px] text-slate-500">
                    {status === "ok" ? "Sem compulsão" : status === "alert" ? "22:30" : "21:15"}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3) PROTOCOLOS ATLAS - 3 MODOS DE AÇÃO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Prevenir Agora */}
        <button
          onClick={() => setShowPreventModal(true)}
          className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 text-left"
        >
          <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30 w-fit mb-4">
            <Shield className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Prevenir Agora</h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Micro-ação de 90 segundos para reduzir o risco imediato.
          </p>
          <ul className="space-y-2 mb-4 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Respiração curta guiada (30s)</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Anotar fome de 0 a 10</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Beber água / chá sem calorias</span>
            </li>
          </ul>
          <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
            Iniciar protocolo
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Card 2: Intervir (Crise Acontecendo) */}
        <button
          onClick={() => setShowCrisisModal(true)}
          className="group p-6 bg-gradient-to-br from-red-900/20 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-red-500/30 hover:border-red-400 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20 text-left"
        >
          <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30 w-fit mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Intervir (Crise Acontecendo)</h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">Quando você já está em frente à geladeira.</p>
          <ul className="space-y-2 mb-4 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Passo 1 – Pausa de 60s</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Passo 2 – Troca inteligente</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>Passo 3 – Registrar gatilho</span>
            </li>
          </ul>
          <div className="flex items-center text-red-400 text-sm font-medium group-hover:gap-2 transition-all">
            Ativar Airbag
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Card 3: Recompor (Pós-Queda 12h) */}
        <button
          onClick={() => setShowRecoverModal(true)}
          className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-green-500 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 text-left"
        >
          <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30 w-fit mb-4">
            <Heart className="w-7 h-7 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Recompor (Pós-Queda 12h)</h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Como levantar sem transformar uma noite ruim em semana perdida.
          </p>
          <ul className="space-y-2 mb-4 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Ajuste leve na dieta (sem punição)</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Reforço de proteína e vegetais</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Foco em sono e hidratação</span>
            </li>
          </ul>
          <div className="flex items-center text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
            Ver protocolo completo
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* 4) LOG INTELIGENTE DE GATILHOS & EMOÇÕES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna 1: Registro Rápido */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Log Inteligente – Gatilhos & Emoções
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Gatilho principal de hoje</label>
              <select
                value={eventForm.trigger}
                onChange={(e) => setEventForm({ ...eventForm, trigger: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="">Selecione...</option>
                <option value="stress">Estresse</option>
                <option value="boredom">Tédio</option>
                <option value="anxiety">Ansiedade</option>
                <option value="hunger">Fome real</option>
                <option value="social">Ambiente social</option>
                <option value="sleep">Sono ruim</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Intensidade da vontade de comer: {eventForm.intensity}/10
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={eventForm.intensity}
                onChange={(e) => setEventForm({ ...eventForm, intensity: Number(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Você comeu fora do plano?</label>
              <div className="flex gap-2">
                {[
                  { value: "no", label: "Não" },
                  { value: "light", label: "Sim, leve" },
                  { value: "heavy", label: "Sim, pesado" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setEventForm({ ...eventForm, didEat: opt.value as "no" | "light" | "heavy" })}
                    className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      eventForm.didEat === opt.value
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-cyan-500"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">O que estava acontecendo na hora?</label>
              <textarea
                value={eventForm.context}
                onChange={(e) => setEventForm({ ...eventForm, context: e.target.value })}
                placeholder="Ex: estava sozinho, mexendo no celular..."
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleRegisterEvent}
              disabled={!eventForm.trigger}
              className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              Registrar evento
            </button>

            {eventRegistered && (
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                <p className="text-sm text-cyan-200">
                  <strong>Evento registrado.</strong> Em breve a Atlas IA vai cruzar esses gatilhos com seu sono, treino
                  e dieta.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna 2: Padrões da Semana */}
        <div className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Padrões da Semana
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">Gatilho mais frequente</div>
                  <div className="text-sm text-slate-400">Estresse no fim da tarde</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">Janelas com maior risco</div>
                  <div className="text-sm text-slate-400">20h–23h (3 de 5 dias)</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-green-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">Dias com mais controle</div>
                  <div className="text-sm text-slate-400">Terça e Quinta (sono {">"} 7h)</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-200 mb-1">Atlas IA detectou</div>
                  <div className="text-sm text-blue-300 leading-relaxed">
                    Compulsões aumentam 3x nos dias com sono {"<"} 6h. Considere priorizar recuperação.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-red-500/30 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCrisisModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Protocolo de Crise Ativado</h2>
                  <p className="text-slate-400">Em 3 fases: Interromper → Substituir → Registrar</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <span className="text-red-400 font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2">Pausa de 60 segundos</h4>
                      <p className="text-sm text-slate-400">
                        Respire fundo (4-7-8). Saia do cômodo. Beba um copo de água.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <span className="text-orange-400 font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2">Troca inteligente</h4>
                      <p className="text-sm text-slate-400 mb-2">
                        Se não conseguir parar, escolha a opção menos prejudicial:
                      </p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Fruta + iogurte proteico</li>
                        <li>• Ovos mexidos com pão integral</li>
                        <li>• Shake de proteína com banana</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <span className="text-yellow-400 font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2">Registrar gatilho e emoção</h4>
                      <p className="text-sm text-slate-400">
                        Anote rapidamente o que aconteceu. A Atlas IA vai aprender o seu padrão.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCrisisModal(false)}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Concluir protocolo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prevent Modal */}
      {showPreventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowPreventModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Protocolo de Prevenção</h2>
                  <p className="text-sm text-slate-400">90 segundos para baixar o risco</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { num: 1, text: "Beber um copo grande de água agora" },
                  { num: 2, text: "10 respirações profundas (4-7-8)" },
                  { num: 3, text: "Mudar de ambiente por 5 minutos" },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">{step.num}</span>
                    </div>
                    <p className="text-slate-200">{step.text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowPreventModal(false)}
                className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recover Modal */}
      {showRecoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/30 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowRecoverModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Heart className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Protocolo de Recuperação</h2>
                  <p className="text-sm text-slate-400">Sem punição. Sem culpa. Só reconstrução.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Aceitar sem julgamento", desc: "O que aconteceu, aconteceu. Não existe perfeição." },
                  { title: "Hidratar-se bem", desc: "500ml de água agora. Ajuda a reduzir desconforto." },
                  { title: "Próxima refeição no plano", desc: "Volte ao protocolo normal na próxima refeição." },
                ].map((step, i) => (
                  <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="font-bold text-white mb-1">
                      {i + 1}. {step.title}
                    </div>
                    <div className="text-sm text-slate-400">{step.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-200">
                  <strong>Lembre-se:</strong> Uma noite ruim não destrói semanas de progresso. O que importa é voltar ao
                  plano o quanto antes.
                </p>
              </div>

              <button
                onClick={() => setShowRecoverModal(false)}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== SONOVIEW IMPLEMENTATION ==========
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
      `Modo Crise ativado para ${hours}h de sono e energia nível ${crisisEnergy}:\n\n• Treino: reduzir intensidade, sem PR, foco em técnica.\n• Dieta: manter proteína alta, carbo moderado.\n• Sono hoje: alvo 7h30, sem cafeína após 15h.\n\nA Atlas IA ajustará seu plano automaticamente.`,
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
            className={`group relative overflow-hidden rounded-3xl border-2 ${asriBg} backdrop-blur-md p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${asriGlow}`}
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
                  className={`px-4 py-1.5 rounded-full text-xs font-bold ${asriBg} ${asriColor} border-2 ${asriGlow}`}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/40 rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-cyan-500/20">
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
                      Evitar cafeína após 15h
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Snack de proteína às 16h
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Treino de força 17h-18h
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Refeição pós-treino rica em carbo
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
                  <h4 className="font-bold text-indigo-400 mb-3 flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Rotina Noturna
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Desligar telas 1h antes de dormir
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Jantar leve e cedo (até 20h)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Leitura ou meditação
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      Quarto escuro e fresco
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Protocolo Detalhado
                </h4>
                <p className="leading-relaxed">
                  Cada protocolo inclui uma lista diária de tarefas, métricas de acompanhamento e "dicas de ouro" da
                  Atlas IA. Aderência é chave.
                </p>
              </div>

              <button
                onClick={() => setShowProtocolModal(null)}
                className="mt-6 w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02]"
              >
                Começar Protocolo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardView
