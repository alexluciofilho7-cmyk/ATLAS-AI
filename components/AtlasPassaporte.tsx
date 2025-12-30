"use client"

import { useState } from "react"
import { X, User, UtensilsCrossed, Clock, TrendingUp } from "lucide-react"
import {
  useAtlasData,
  type PrimaryGoal,
  type FitnessLevel,
  type Equipment,
  type WeakPoint,
  type InjuryRestriction,
} from "@/context/AtlasDataContext"

type AtlasPassaporteProps = {
  isOpen: boolean
  onClose: () => void
}

export function AtlasPassaporte({ isOpen, onClose }: AtlasPassaporteProps) {
  const { passport, updatePassport } = useAtlasData()
  const [localPassport, setLocalPassport] = useState(passport)
  const [activeTab, setActiveTab] = useState<"base" | "schedule" | "diet" | "weak">("base")

  if (!isOpen) return null

  const handleSave = () => {
    updatePassport(localPassport)
    onClose()
  }

  const toggleWeakPoint = (point: WeakPoint) => {
    const current = localPassport.weakPoints || []
    const updated = current.includes(point) ? current.filter((p) => p !== point) : [...current, point]
    setLocalPassport({ ...localPassport, weakPoints: updated })
  }

  const addInjury = () => {
    const area = prompt("Qual região? (ex: joelho direito, lombar, ombro)")
    if (!area) return
    const newInjury: InjuryRestriction = { area, severity: "mild" }
    setLocalPassport({
      ...localPassport,
      injuries: [...localPassport.injuries, newInjury],
    })
  }

  const removeInjury = (index: number) => {
    setLocalPassport({
      ...localPassport,
      injuries: localPassport.injuries.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-blue-500/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Atlas Passaporte</h2>
              <p className="text-sm text-cyan-400">Perfil Global do Sistema</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4 border-b border-slate-700">
          {[
            { key: "base" as const, label: "Dados Base", icon: User },
            { key: "schedule" as const, label: "Rotina", icon: Clock },
            { key: "diet" as const, label: "Dieta", icon: UtensilsCrossed },
            { key: "weak" as const, label: "Fraquezas", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-6">
          {activeTab === "base" && (
            <>
              {/* Básicos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Idade</label>
                  <input
                    type="number"
                    value={localPassport.age || ""}
                    onChange={(e) => setLocalPassport({ ...localPassport, age: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    value={localPassport.height || ""}
                    onChange={(e) => setLocalPassport({ ...localPassport, height: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 178"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    value={localPassport.currentWeight || ""}
                    onChange={(e) => setLocalPassport({ ...localPassport, currentWeight: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 85"
                  />
                </div>
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sexo</label>
                <div className="flex gap-3">
                  {[
                    { value: "male", label: "Masculino" },
                    { value: "female", label: "Feminino" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setLocalPassport({ ...localPassport, gender: opt.value as "male" | "female" })}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                        localPassport.gender === opt.value
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meta primária */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Meta Primária</label>
                <select
                  value={localPassport.primaryGoal}
                  onChange={(e) => setLocalPassport({ ...localPassport, primaryGoal: e.target.value as PrimaryGoal })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="muscle_gain">Ganhar massa muscular</option>
                  <option value="fat_loss">Perder gordura</option>
                  <option value="recomp">Recomposição corporal</option>
                  <option value="performance">Performance</option>
                  <option value="pain_management">Lidar com dor</option>
                </select>
              </div>

              {/* Nível */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nível de Treino</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "beginner", label: "Iniciante" },
                    { value: "intermediate", label: "Intermediário" },
                    { value: "advanced", label: "Avançado" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setLocalPassport({ ...localPassport, fitnessLevel: opt.value as FitnessLevel })}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        localPassport.fitnessLevel === opt.value
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disponibilidade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tempo por dia (min)</label>
                  <input
                    type="number"
                    value={localPassport.timePerDay || ""}
                    onChange={(e) => setLocalPassport({ ...localPassport, timePerDay: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Dias por semana</label>
                  <input
                    type="number"
                    value={localPassport.daysPerWeek || ""}
                    onChange={(e) => setLocalPassport({ ...localPassport, daysPerWeek: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 5"
                  />
                </div>
              </div>

              {/* Equipamento */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Equipamento Disponível</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "full_gym", label: "Academia Completa" },
                    { value: "home_basic", label: "Casa (básico)" },
                    { value: "limited", label: "Limitado" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setLocalPassport({ ...localPassport, equipment: opt.value as Equipment })}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        localPassport.equipment === opt.value
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lesões */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Lesões / Restrições</label>
                <div className="space-y-2 mb-3">
                  {localPassport.injuries.map((injury, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-lg">
                      <span className="text-slate-300">{injury.area}</span>
                      <button onClick={() => removeInjury(idx)} className="text-red-400 hover:text-red-300 text-sm">
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addInjury}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-cyan-400 hover:bg-slate-700 transition-colors"
                >
                  + Adicionar lesão
                </button>
              </div>
            </>
          )}

          {activeTab === "schedule" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Horário de trabalho</label>
                  <input
                    type="text"
                    value={localPassport.workSchedule}
                    onChange={(e) => setLocalPassport({ ...localPassport, workSchedule: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 9h-18h"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Horário de treino</label>
                  <input
                    type="text"
                    value={localPassport.trainingTime}
                    onChange={(e) => setLocalPassport({ ...localPassport, trainingTime: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 19h-20h"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sono médio (horas)</label>
                <input
                  type="number"
                  step="0.5"
                  value={localPassport.avgSleepHours || ""}
                  onChange={(e) => setLocalPassport({ ...localPassport, avgSleepHours: Number(e.target.value) })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="Ex: 7.5"
                />
              </div>
            </>
          )}

          {activeTab === "diet" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Refeições por dia</label>
                  <input
                    type="number"
                    value={localPassport.mealsPerDay || ""}
                    onChange={(e) => setLocalPassport({ ...localPassport, mealsPerDay: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    placeholder="Ex: 4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Orçamento</label>
                  <select
                    value={localPassport.budget}
                    onChange={(e) =>
                      setLocalPassport({ ...localPassport, budget: e.target.value as "low" | "medium" | "high" })
                    }
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="low">Baixo</option>
                    <option value="medium">Médio</option>
                    <option value="high">Alto</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Alimentos que não come (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={localPassport.foodRestrictions.join(", ")}
                  onChange={(e) =>
                    setLocalPassport({
                      ...localPassport,
                      foodRestrictions: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="Ex: leite, glúten, camarão"
                />
              </div>
            </>
          )}

          {activeTab === "weak" && (
            <>
              <p className="text-sm text-slate-400 mb-4">
                Selecione os pontos fracos estéticos que você quer priorizar:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: "upper_chest" as WeakPoint, label: "Peitoral Clavicular" },
                  { value: "lateral_delts" as WeakPoint, label: "Deltóide Lateral" },
                  { value: "traps" as WeakPoint, label: "Trapézio" },
                  { value: "posture" as WeakPoint, label: "Postura" },
                  { value: "calves" as WeakPoint, label: "Panturrilhas" },
                  { value: "glutes" as WeakPoint, label: "Glúteos" },
                  { value: "hamstrings" as WeakPoint, label: "Posteriores de Coxa" },
                  { value: "core" as WeakPoint, label: "Core/Abdômen" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleWeakPoint(opt.value)}
                    className={`px-4 py-2 rounded-lg border transition-all text-sm ${
                      localPassport.weakPoints.includes(opt.value)
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/90 backdrop-blur-md border-t border-blue-500/30 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/30"
          >
            Salvar Passaporte
          </button>
        </div>
      </div>
    </div>
  )
}
