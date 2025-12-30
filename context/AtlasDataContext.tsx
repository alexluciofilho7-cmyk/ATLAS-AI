"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Gender = "male" | "female"

export type BodyAreaKey = "shoulders" | "chest" | "back" | "arms" | "core" | "hips" | "legs" | "calves"

export type BodyAreaStatus = "good" | "needs_improvement" | "injury"

export type BodyStatusMap = Record<BodyAreaKey, BodyAreaStatus>

export type PrimaryGoal = "muscle_gain" | "fat_loss" | "recomp" | "performance" | "pain_management"

export type FitnessLevel = "beginner" | "intermediate" | "advanced"

export type Equipment = "full_gym" | "home_basic" | "limited"

export type InjuryRestriction = {
  area: string
  severity: "mild" | "moderate" | "severe"
}

export type WeakPoint =
  | "upper_chest"
  | "lateral_delts"
  | "traps"
  | "posture"
  | "calves"
  | "glutes"
  | "hamstrings"
  | "core"

export type AtlasPassport = {
  // Dados base
  age: number | null
  height: number | null // cm
  currentWeight: number | null // kg
  gender: Gender
  primaryGoal: PrimaryGoal
  fitnessLevel: FitnessLevel

  // Disponibilidade
  timePerDay: number | null // minutes
  daysPerWeek: number | null
  equipment: Equipment

  // Restrições
  injuries: InjuryRestriction[]

  // Preferências de dieta
  mealsPerDay: number | null
  foodRestrictions: string[]
  budget: "low" | "medium" | "high"

  // Rotina
  workSchedule: string // ex: "9h-18h"
  trainingTime: string // ex: "19h-20h"
  avgSleepHours: number | null

  // Pontos fracos estéticos
  weakPoints: WeakPoint[]

  // Meta timestamp
  updatedAt?: string
}

const defaultPassport: AtlasPassport = {
  age: null,
  height: null,
  currentWeight: null,
  gender: "male",
  primaryGoal: "muscle_gain",
  fitnessLevel: "intermediate",
  timePerDay: null,
  daysPerWeek: null,
  equipment: "full_gym",
  injuries: [],
  mealsPerDay: null,
  foodRestrictions: [],
  budget: "medium",
  workSchedule: "",
  trainingTime: "",
  avgSleepHours: null,
  weakPoints: [],
}

export type BodyMeasurements = {
  shoulders: number | null
  chest: number | null
  waist: number | null
  hips: number | null
  rightArm: number | null
  leftArm: number | null
  rightThigh: number | null
  leftThigh: number | null
  rightCalf: number | null
  leftCalf: number | null
  neck: number | null
  updatedAt?: string
}

export type EnergyScore = 1 | 2 | 3 | 4 | 5

export type DailyCheckin = {
  id: string
  date: string
  trainedToday: boolean
  restDay: boolean
  followedDiet: number
  sleepHours: number
  energy: EnergyScore
  stressLevel: EnergyScore
  painLevel: number
  notes?: string
}

export type ProgressPhotos = {
  front?: string
  side?: string
  back?: string
}

export type EnergyLevel = "Alta" | "Média" | "Baixa"

export type AtlasWeekMetrics = {
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

export type TrainingConfig = {
  daysPerWeek: number | null
  trainingDays: string[]
  minutesPerSession: number | null
  location: "gym" | "home" | "both"
  level: FitnessLevel
  equipment: string[]
  mainFocus: "muscle_gain" | "fat_loss" | "maintenance" | "performance"
  updatedAt?: string
}

export type DietConfig = {
  mealsPerDay: number | null
  mealTimes: string[]
  restrictions: string[]
  dislikedFoods: string
  budget: "low" | "medium" | "high"
  flexibility: "rigid" | "moderate" | "flexible"
  updatedAt?: string
}

const defaultTrainingConfig: TrainingConfig = {
  daysPerWeek: null,
  trainingDays: [],
  minutesPerSession: null,
  location: "gym",
  level: "intermediate",
  equipment: [],
  mainFocus: "muscle_gain",
}

const defaultDietConfig: DietConfig = {
  mealsPerDay: null,
  mealTimes: [],
  restrictions: [],
  dislikedFoods: "",
  budget: "medium",
  flexibility: "moderate",
}

function computeMetricsFromCheckins(checkins: DailyCheckin[], existingMetrics: AtlasWeekMetrics): AtlasWeekMetrics {
  const last7 = checkins
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)

  if (last7.length === 0) {
    return existingMetrics
  }

  const trainingsPlanned = last7.length
  const trainingsDone = last7.filter((c) => c.trainedToday).length
  const executionRate = (trainingsDone / trainingsPlanned) * 100

  const avgDiet = last7.reduce((sum, c) => sum + c.followedDiet, 0) / last7.length
  const avgSleep = last7.reduce((sum, c) => sum + c.sleepHours, 0) / last7.length
  const avgEnergy = last7.reduce((sum, c) => sum + c.energy, 0) / last7.length
  const avgStress = last7.reduce((sum, c) => sum + c.stressLevel, 0) / last7.length

  const atlasScore = 0.4 * executionRate + 0.25 * avgDiet + 0.2 * (avgSleep * 10) + 0.15 * (avgEnergy * 20)

  const metabolicHealth = (avgSleep * 10 + avgDiet + (5 - avgStress) * 15) / 3

  let energyLevel: EnergyLevel = "Baixa"
  if (avgEnergy >= 4) energyLevel = "Alta"
  else if (avgEnergy >= 3) energyLevel = "Média"

  return {
    weekLabel: "Semana atual",
    atlasScore: Math.round(Math.min(100, Math.max(0, atlasScore))),
    executionRate: Math.round(executionRate),
    aestheticProgress: Math.round(avgDiet * 0.8),
    metabolicHealth: Math.round(Math.min(100, Math.max(0, metabolicHealth))),
    generalConsistency: Math.round((executionRate + avgDiet) / 2),
    avgSleepHours: Math.round(avgSleep * 10) / 10,
    weightDeltaKg: existingMetrics.weightDeltaKg,
    energyLevel,
    trainingsDone,
    trainingsPlanned,
    dietAdherence: Math.round(avgDiet),
  }
}

function computeBodyStatus(measurements: BodyMeasurements, gender: Gender): BodyStatusMap {
  const status: BodyStatusMap = {
    shoulders: "needs_improvement",
    chest: "needs_improvement",
    back: "needs_improvement",
    arms: "needs_improvement",
    core: "needs_improvement",
    hips: "needs_improvement",
    legs: "needs_improvement",
    calves: "needs_improvement",
  }

  if (measurements.shoulders && measurements.waist) {
    const ratio = measurements.shoulders / measurements.waist
    if (gender === "male") {
      status.shoulders = ratio > 1.4 ? "good" : "needs_improvement"
    } else {
      status.shoulders = ratio > 1.3 ? "good" : "needs_improvement"
    }
  }

  if (measurements.chest) {
    status.chest = measurements.chest > 90 ? "good" : "needs_improvement"
  }

  if (measurements.waist) {
    const threshold = gender === "male" ? 90 : 80
    status.core = measurements.waist < threshold ? "good" : "needs_improvement"
  }

  if (measurements.rightArm && measurements.leftArm) {
    const avg = (measurements.rightArm + measurements.leftArm) / 2
    status.arms = avg > 35 ? "good" : "needs_improvement"
  }

  if (measurements.hips) {
    status.hips = "good"
  }

  if (measurements.rightThigh && measurements.leftThigh) {
    const avg = (measurements.rightThigh + measurements.leftThigh) / 2
    status.legs = avg > 55 ? "good" : "needs_improvement"
  }

  if (measurements.rightCalf && measurements.leftCalf) {
    const avg = (measurements.rightCalf + measurements.leftCalf) / 2
    status.calves = avg > 36 ? "good" : "needs_improvement"
  }

  return status
}

type AtlasDataContextType = {
  passport: AtlasPassport
  updatePassport: (updates: Partial<AtlasPassport>) => void
  gender: Gender
  setGender: (g: Gender) => void
  bodyMeasurements: BodyMeasurements
  setBodyMeasurements: (m: BodyMeasurements) => void
  bodyStatus: BodyStatusMap
  checkins: DailyCheckin[]
  registerCheckin: (c: DailyCheckin) => void
  currentWeekMetrics: AtlasWeekMetrics
  photos: ProgressPhotos
  setPhotos: (p: ProgressPhotos) => void
  saveMeasurements: (m: BodyMeasurements) => void
  trainingConfig: TrainingConfig
  updateTrainingConfig: (updates: Partial<TrainingConfig>) => void
  dietConfig: DietConfig
  updateDietConfig: (updates: Partial<DietConfig>) => void
  // </CHANGE>
  toast: { message: string; visible: boolean }
  showToast: (message: string) => void
}

const AtlasDataContext = createContext<AtlasDataContextType | null>(null)

const defaultBodyStatus: BodyStatusMap = {
  shoulders: "needs_improvement",
  chest: "needs_improvement",
  back: "needs_improvement",
  arms: "needs_improvement",
  core: "needs_improvement",
  hips: "needs_improvement",
  legs: "needs_improvement",
  calves: "needs_improvement",
}

const defaultMetrics: AtlasWeekMetrics = {
  weekLabel: "Semana atual",
  atlasScore: 0,
  executionRate: 0,
  aestheticProgress: 0,
  metabolicHealth: 0,
  generalConsistency: 0,
  avgSleepHours: 0,
  weightDeltaKg: 0,
  energyLevel: "Baixa",
  trainingsDone: 0,
  trainingsPlanned: 0,
  dietAdherence: 0,
}

export function AtlasDataProvider({ children }: { children: ReactNode }) {
  const [passport, setPassport] = useState<AtlasPassport>(defaultPassport)
  const [gender, setGender] = useState<Gender>("male")
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements>(
    defaultPassport.currentWeight ? { ...defaultPassport, updatedAt: new Date().toISOString() } : defaultPassport,
  )
  const [bodyStatus, setBodyStatus] = useState<BodyStatusMap>(defaultBodyStatus)
  const [checkins, setCheckins] = useState<DailyCheckin[]>([])
  const [currentWeekMetrics, setCurrentWeekMetrics] = useState<AtlasWeekMetrics>(defaultMetrics)
  const [photos, setPhotos] = useState<ProgressPhotos>({})
  const [trainingConfig, setTrainingConfig] = useState<TrainingConfig>(defaultTrainingConfig)
  const [dietConfig, setDietConfig] = useState<DietConfig>(defaultDietConfig)
  // </CHANGE>
  const [toast, setToast] = useState({ message: "", visible: false })

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast({ message: "", visible: false }), 3000)
  }, [])

  const updatePassport = useCallback(
    (updates: Partial<AtlasPassport>) => {
      setPassport((prev) => ({
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      }))
      showToast("Perfil Atlas atualizado com sucesso.")
    },
    [showToast],
  )

  const saveMeasurements = useCallback(
    (measurements: BodyMeasurements) => {
      const updated = { ...measurements, updatedAt: new Date().toISOString() }
      setBodyMeasurements(updated)
      const newStatus = computeBodyStatus(updated, passport.gender)
      setBodyStatus(newStatus)
      showToast("Medidas salvas. O Dashboard foi atualizado.")
    },
    [passport.gender, showToast],
  )

  const registerCheckin = useCallback(
    (checkin: DailyCheckin) => {
      setCheckins((prev) => {
        const updated = [...prev.filter((c) => c.date !== checkin.date), checkin]
        const limited = updated.slice(-30)
        const metrics = computeMetricsFromCheckins(limited, currentWeekMetrics)
        setCurrentWeekMetrics(metrics)
        return limited
      })
      showToast("Check-in registrado. O Dashboard foi atualizado.")
    },
    [currentWeekMetrics, showToast],
  )

  const updateTrainingConfig = useCallback(
    (updates: Partial<TrainingConfig>) => {
      setTrainingConfig((prev) => ({
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      }))
      showToast("Configuração de treino atualizada.")
    },
    [showToast],
  )

  const updateDietConfig = useCallback(
    (updates: Partial<DietConfig>) => {
      setDietConfig((prev) => ({
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      }))
      showToast("Configuração de dieta atualizada.")
    },
    [showToast],
  )
  // </CHANGE>

  return (
    <AtlasDataContext.Provider
      value={{
        passport,
        updatePassport,
        gender,
        setGender,
        bodyMeasurements,
        setBodyMeasurements,
        bodyStatus,
        checkins,
        registerCheckin,
        currentWeekMetrics,
        photos,
        setPhotos,
        saveMeasurements,
        trainingConfig,
        updateTrainingConfig,
        dietConfig,
        updateDietConfig,
        // </CHANGE>
        toast,
        showToast,
      }}
    >
      {children}
      {/* Toast notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {toast.message}
        </div>
      )}
    </AtlasDataContext.Provider>
  )
}

export function useAtlasData() {
  const context = useContext(AtlasDataContext)
  if (!context) {
    throw new Error("useAtlasData must be used within AtlasDataProvider")
  }
  return context
}
