"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Gender = "male" | "female"

export type BodyAreaKey = "shoulders" | "chest" | "back" | "arms" | "core" | "hips" | "legs" | "calves"

export type BodyAreaStatus = "good" | "needs_improvement" | "injury"

export type BodyStatusMap = Record<BodyAreaKey, BodyAreaStatus>

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

const defaultMeasurements: BodyMeasurements = {
  shoulders: null,
  chest: null,
  waist: null,
  hips: null,
  rightArm: null,
  leftArm: null,
  rightThigh: null,
  leftThigh: null,
  rightCalf: null,
  leftCalf: null,
  neck: null,
}

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
  atlasScore: 72,
  executionRate: 82,
  aestheticProgress: 67,
  metabolicHealth: 78,
  generalConsistency: 75,
  avgSleepHours: 7.5,
  weightDeltaKg: -2.1,
  energyLevel: "Alta",
  trainingsDone: 4,
  trainingsPlanned: 5,
  dietAdherence: 85,
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
  const status: BodyStatusMap = { ...defaultBodyStatus }

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
  toast: { message: string; visible: boolean }
  showToast: (message: string) => void
}

const AtlasDataContext = createContext<AtlasDataContextType | null>(null)

export function AtlasDataProvider({ children }: { children: ReactNode }) {
  const [gender, setGender] = useState<Gender>("male")
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements>(defaultMeasurements)
  const [bodyStatus, setBodyStatus] = useState<BodyStatusMap>(defaultBodyStatus)
  const [checkins, setCheckins] = useState<DailyCheckin[]>([])
  const [currentWeekMetrics, setCurrentWeekMetrics] = useState<AtlasWeekMetrics>(defaultMetrics)
  const [photos, setPhotos] = useState<ProgressPhotos>({})
  const [toast, setToast] = useState({ message: "", visible: false })

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast({ message: "", visible: false }), 3000)
  }, [])

  const saveMeasurements = useCallback(
    (measurements: BodyMeasurements) => {
      const updated = { ...measurements, updatedAt: new Date().toISOString() }
      setBodyMeasurements(updated)
      const newStatus = computeBodyStatus(updated, gender)
      setBodyStatus(newStatus)
      showToast("Medidas salvas. O Dashboard foi atualizado.")
    },
    [gender, showToast],
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

  return (
    <AtlasDataContext.Provider
      value={{
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
