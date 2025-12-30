"use client"

import { useState } from "react"
import {
  Brain,
  Calendar,
  Dumbbell,
  UtensilsCrossed,
  Activity,
  Moon,
  Zap,
  AlertTriangle,
  User,
  X,
  Clock,
  Flame,
  Target,
  TrendingUp,
  CheckCircle2,
  Info,
} from "lucide-react"

// Types
interface AtlasProfile {
  sexo: "Masculino" | "Feminino"
  idade: number
  altura: number
  peso: number
  objetivo: string
  tempoDisponivel: string
  restricoes: string[]
  preferenciasDieta: string[]
}

interface Exercise {
  name: string
  sets: string
  reps: string
  rir: string
  rest: string
  estimatedTime: number
  rationale: string
}

interface ExerciseBlock {
  title: string
  exercises: Exercise[]
}

interface Meal {
  name: string
  kcal: number
  protein: number
  carbs: number
  fat: number
  items: string[]
}

interface DayPlan {
  day: string
  date: string
  workoutFocus: string
  duration: number
  macros: { kcal: number; p: number; c: number; f: number }
  criticalAction: string
  workoutBlocks: ExerciseBlock[]
  meals: Meal[]
  isTrainingDay: boolean
}

interface WeeklyState {
  objective: string
  predictedDuration: number
  intensity: "Normal" | "Alta" | "Deload"
  recoveryStatus: "green" | "yellow" | "red"
  compulsionRisk: "Baixo" | "Médio" | "Alto"
  days: DayPlan[]
}

interface Adjustments {
  sleepLow: boolean
  energyLow: boolean
  painFlags: string[]
}

const mockProfile: AtlasProfile = {
  sexo: "Masculino",
  idade: 32,
  altura: 178,
  peso: 82,
  objetivo: "Hipertrofia + definição",
  tempoDisponivel: "60-75 min/dia",
  restricoes: ["Ombro direito sensível"],
  preferenciasDieta: ["Alto proteína", "Carbo à noite", "Whey protein"],
}

const mockWeeklyState: WeeklyState = {
  objective: "Peito clavicular + deltoide lateral",
  predictedDuration: 68,
  intensity: "Alta",
  recoveryStatus: "yellow",
  compulsionRisk: "Baixo",
  days: [
    {
      day: "Seg",
      date: "30/12",
      workoutFocus: "Peito Superior + Ombro Lateral",
      duration: 70,
      macros: { kcal: 2400, p: 180, c: 240, f: 70 },
      criticalAction: "10 min caminhada pós-jantar",
      isTrainingDay: true,
      workoutBlocks: [
        {
          title: "Priority Aesthetics",
          exercises: [
            {
              name: "Supino inclinado halter",
              sets: "4",
              reps: "8-10",
              rir: "2-3",
              rest: "2min",
              estimatedTime: 12,
              rationale: "Peito clavicular é prioridade semanal",
            },
            {
              name: "Elevação lateral cabo unilateral",
              sets: "3",
              reps: "12-15",
              rir: "2",
              rest: "90s",
              estimatedTime: 10,
              rationale: "Deltoide lateral crescimento direto",
            },
          ],
        },
        {
          title: "Main Lifts",
          exercises: [
            {
              name: "Supino reto barra",
              sets: "3",
              reps: "6-8",
              rir: "2",
              rest: "2-3min",
              estimatedTime: 14,
              rationale: "Volume total peito",
            },
            {
              name: "Desenvolvimento Arnold",
              sets: "3",
              reps: "10-12",
              rir: "2-3",
              rest: "2min",
              estimatedTime: 12,
              rationale: "Ombro completo sem stress articular",
            },
          ],
        },
        {
          title: "Accessories",
          exercises: [
            {
              name: "Crucifixo inclinado",
              sets: "3",
              reps: "12-15",
              rir: "1-2",
              rest: "90s",
              estimatedTime: 9,
              rationale: "Isolamento peitoral superior",
            },
            {
              name: "Tríceps corda",
              sets: "3",
              reps: "12-15",
              rir: "2",
              rest: "60s",
              estimatedTime: 8,
              rationale: "Tríceps sinérgico push day",
            },
          ],
        },
        {
          title: "Posture Fix",
          exercises: [
            {
              name: "Face pull",
              sets: "2",
              reps: "15-20",
              rir: "3",
              rest: "60s",
              estimatedTime: 5,
              rationale: "Saúde ombro + prevenir lesão",
            },
          ],
        },
      ],
      meals: [
        {
          name: "Café da manhã",
          kcal: 480,
          protein: 35,
          carbs: 45,
          fat: 15,
          items: ["4 ovos mexidos", "Pão integral (60g)", "Whey 30g", "Café"],
        },
        {
          name: "Almoço",
          kcal: 720,
          protein: 55,
          carbs: 75,
          fat: 18,
          items: ["Frango grelhado 200g", "Arroz integral 150g", "Feijão 100g", "Salada verde"],
        },
        {
          name: "Pré-treino",
          kcal: 240,
          protein: 25,
          carbs: 30,
          fat: 3,
          items: ["Whey 30g", "Banana 1 un", "Aveia 20g"],
        },
        {
          name: "Pós-treino",
          kcal: 360,
          protein: 30,
          carbs: 45,
          fat: 6,
          items: ["Whey 40g", "Maltodextrina 40g", "Creatina 5g"],
        },
        {
          name: "Jantar",
          kcal: 600,
          protein: 35,
          carbs: 45,
          fat: 28,
          items: ["Salmão 150g", "Batata doce 200g", "Brócolis", "Azeite 10ml"],
        },
      ],
    },
    {
      day: "Ter",
      date: "31/12",
      workoutFocus: "Costas + Bíceps",
      duration: 72,
      macros: { kcal: 2400, p: 180, c: 240, f: 70 },
      criticalAction: "Dormir 22h (véspera de Ano Novo)",
      isTrainingDay: true,
      workoutBlocks: [],
      meals: [],
    },
    {
      day: "Qua",
      date: "01/01",
      workoutFocus: "Descanso Ativo",
      duration: 0,
      macros: { kcal: 2000, p: 160, c: 180, f: 70 },
      criticalAction: "Caminhada 30 min manhã",
      isTrainingDay: false,
      workoutBlocks: [],
      meals: [],
    },
    {
      day: "Qui",
      date: "02/01",
      workoutFocus: "Pernas Completo",
      duration: 75,
      macros: { kcal: 2500, p: 180, c: 260, f: 75 },
      criticalAction: "Medir circunferência coxa",
      isTrainingDay: true,
      workoutBlocks: [],
      meals: [],
    },
    {
      day: "Sex",
      date: "03/01",
      workoutFocus: "Peito Médio + Tríceps",
      duration: 65,
      macros: { kcal: 2400, p: 180, c: 240, f: 70 },
      criticalAction: "Foto progresso peito",
      isTrainingDay: true,
      workoutBlocks: [],
      meals: [],
    },
    {
      day: "Sáb",
      date: "04/01",
      workoutFocus: "Ombro + Trap",
      duration: 68,
      macros: { kcal: 2400, p: 180, c: 240, f: 70 },
      criticalAction: "Verificar dor ombro direito",
      isTrainingDay: true,
      workoutBlocks: [],
      meals: [],
    },
    {
      day: "Dom",
      date: "05/01",
      workoutFocus: "Descanso Total",
      duration: 0,
      macros: { kcal: 2000, p: 160, c: 180, f: 70 },
      criticalAction: "Planejamento semana 2",
      isTrainingDay: false,
      workoutBlocks: [],
      meals: [],
    },
  ],
}

export default function TreinoDieta2035() {
  const [weeklyState] = useState<WeeklyState>(mockWeeklyState)
  const [profile] = useState<AtlasProfile>(mockProfile)
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<"treino" | "dieta" | "ajustes">("treino")
  const [showProfile, setShowProfile] = useState(false)
  const [adjustments, setAdjustments] = useState<Adjustments>({
    sleepLow: false,
    energyLow: false,
    painFlags: [],
  })
  const [planAdapted, setPlanAdapted] = useState(false)

  const currentDay = weeklyState.days[selectedDay]

  const handleAdjustmentChange = (key: keyof Adjustments, value: any) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }))
    setPlanAdapted(true)
    setTimeout(() => setPlanAdapted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-sm">Atlas IA</div>
            <div className="text-xs text-cyan-400">Governança Corporal</div>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { icon: Activity, label: "Visão 360", active: false },
            { icon: Dumbbell, label: "Treino & Dieta", active: true },
            { icon: UtensilsCrossed, label: "Compulsão Alimentar", active: false },
            { icon: Moon, label: "Sono & Recuperação", active: false },
            { icon: Activity, label: "Fisioterapia", active: false },
            { icon: TrendingUp, label: "Testosterona Natural", active: false },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                  : "hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? "text-cyan-400" : "text-slate-400"}`} />
              <span className={`text-sm ${item.active ? "text-white font-medium" : "text-slate-400"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Status Strip */}
        <div className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300">Execução:</span>
              <span className="font-bold text-emerald-400">87%</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Sono:</span>
              <span className="font-bold text-blue-400">7.2h</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Energia:</span>
              <span className="font-bold text-yellow-400">Média</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300">Risco recaída:</span>
              <span className="font-bold text-emerald-400">Baixo</span>
            </div>
          </div>

          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">Perfil Atlas</span>
          </button>
        </div>

        {/* Mission Control Header */}
        <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/80 to-slate-900/40">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-cyan-400 mb-1">Missão da Semana</div>
              <h1 className="text-2xl font-bold mb-2">{weeklyState.objective}</h1>
            </div>
            {planAdapted && (
              <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-xs font-medium text-cyan-300 animate-pulse">
                Plano adaptado automaticamente
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Duração prevista:</span>
              <span className="font-bold text-white">{weeklyState.predictedDuration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-slate-400">Intensidade:</span>
              <span className={`font-bold ${weeklyState.intensity === "Alta" ? "text-orange-400" : "text-white"}`}>
                {weeklyState.intensity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-400">Recuperação:</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  weeklyState.recoveryStatus === "green"
                    ? "bg-emerald-400"
                    : weeklyState.recoveryStatus === "yellow"
                      ? "bg-yellow-400"
                      : "bg-red-400"
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-400">Risco compulsão:</span>
              <span className="font-bold text-cyan-400">{weeklyState.compulsionRisk}</span>
            </div>
          </div>
        </div>

        {/* Weekly Calendar Grid */}
        <div className="p-6 bg-slate-950/50">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold">Semana Atlas</h2>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weeklyState.days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedDay === idx
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/60 shadow-lg shadow-cyan-500/30"
                    : "bg-slate-900/60 border-slate-700/50 hover:border-cyan-500/30"
                }`}
              >
                <div className="text-xs font-bold text-cyan-400 mb-1">{day.day}</div>
                <div className="text-xs text-slate-400 mb-3">{day.date}</div>

                <div className="text-xs font-medium mb-2 line-clamp-2 min-h-[2rem]">{day.workoutFocus}</div>

                {day.isTrainingDay && (
                  <div className="flex items-center gap-1 mb-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{day.duration}min</span>
                  </div>
                )}

                <div className="text-xs text-cyan-400 mb-2">{day.macros.kcal} kcal</div>

                <div className="text-xs text-slate-400 mb-3 line-clamp-2 min-h-[2rem]">{day.criticalAction}</div>

                {day.isTrainingDay && (
                  <div className="space-y-1">
                    <button className="w-full text-xs py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors">
                      Iniciar Treino
                    </button>
                    <button className="w-full text-xs py-1.5 rounded bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors">
                      Ver Dieta
                    </button>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Day Details Panel */}
        <div className="flex-1 p-6">
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">
                  {currentDay.day} - {currentDay.workoutFocus}
                </h2>
                <p className="text-sm text-slate-400">{currentDay.date}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("treino")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "treino"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Treino
                </button>
                <button
                  onClick={() => setActiveTab("dieta")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "dieta"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Dieta
                </button>
                <button
                  onClick={() => setActiveTab("ajustes")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "ajustes"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Ajustes
                </button>
              </div>
            </div>

            {/* Treino Tab */}
            {activeTab === "treino" && currentDay.workoutBlocks.length > 0 && (
              <div className="space-y-6">
                {currentDay.workoutBlocks.map((block, idx) => (
                  <div key={idx} className="border border-slate-700/50 rounded-lg p-4 bg-slate-950/50">
                    <h3 className="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wider">{block.title}</h3>
                    <div className="space-y-3">
                      {block.exercises.map((ex, exIdx) => (
                        <div key={exIdx} className="flex items-start justify-between p-3 bg-slate-900/50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium mb-1">{ex.name}</div>
                            <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                              <span>
                                {ex.sets} séries × {ex.reps} reps
                              </span>
                              <span>RIR {ex.rir}</span>
                              <span>Descanso {ex.rest}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {ex.estimatedTime} min
                              </span>
                            </div>
                            <div className="flex items-start gap-1 text-xs text-cyan-400/80">
                              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{ex.rationale}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div className="text-sm text-slate-400">
                    Duração prevista: <span className="text-white font-medium">{currentDay.duration} min</span>
                  </div>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                    Registrar Execução
                  </button>
                </div>
              </div>
            )}

            {activeTab === "treino" && currentDay.workoutBlocks.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Dia de descanso - sem treino programado</p>
              </div>
            )}

            {/* Dieta Tab */}
            {activeTab === "dieta" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Total Diário</div>
                    <div className="text-2xl font-bold text-cyan-400">{currentDay.macros.kcal} kcal</div>
                  </div>
                  <div className="h-8 w-px bg-slate-700" />
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Proteína</div>
                    <div className="text-lg font-bold">{currentDay.macros.p}g</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Carboidrato</div>
                    <div className="text-lg font-bold">{currentDay.macros.c}g</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Gordura</div>
                    <div className="text-lg font-bold">{currentDay.macros.f}g</div>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        currentDay.isTrainingDay
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                          : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      {currentDay.isTrainingDay ? "Dia de Treino" : "Dia de Descanso"}
                    </div>
                  </div>
                </div>

                {currentDay.meals.length > 0 && (
                  <div className="space-y-3">
                    {currentDay.meals.map((meal, idx) => (
                      <div key={idx} className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-medium">{meal.name}</div>
                          <div className="text-sm text-cyan-400">{meal.kcal} kcal</div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                          <span>P: {meal.protein}g</span>
                          <span>C: {meal.carbs}g</span>
                          <span>G: {meal.fat}g</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {meal.items.map((item, itemIdx) => (
                            <span key={itemIdx} className="px-2 py-1 bg-slate-900/50 rounded text-xs text-slate-300">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-sm font-medium transition-colors">
                    Template Econômico
                  </button>
                  <button className="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-sm font-medium transition-colors">
                    Template Médio
                  </button>
                  <button className="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-sm font-medium transition-colors">
                    Template Premium
                  </button>
                </div>

                <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                  Gerar Lista de Compras
                </button>
              </div>
            )}

            {/* Ajustes Tab */}
            {activeTab === "ajustes" && (
              <div className="space-y-6">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Target className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-cyan-300 mb-1">Adaptação Inteligente</div>
                      <p className="text-xs text-slate-400">
                        Use os controles abaixo para informar como está seu estado atual. A Atlas IA vai ajustar
                        automaticamente volume, intensidade e distribuição de macros.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                    <div>
                      <div className="font-medium mb-1">Sono baixo hoje</div>
                      <div className="text-xs text-slate-400">Menos de 6h ou sono fragmentado</div>
                    </div>
                    <button
                      onClick={() => handleAdjustmentChange("sleepLow", !adjustments.sleepLow)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        adjustments.sleepLow ? "bg-cyan-500" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          adjustments.sleepLow ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                    <div>
                      <div className="font-medium mb-1">Energia baixa</div>
                      <div className="text-xs text-slate-400">Cansaço mental ou físico elevado</div>
                    </div>
                    <button
                      onClick={() => handleAdjustmentChange("energyLow", !adjustments.energyLow)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        adjustments.energyLow ? "bg-cyan-500" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          adjustments.energyLow ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                    <div className="font-medium mb-3">Flags de dor ou desconforto</div>
                    <div className="space-y-2">
                      {["Ombro direito", "Lombar", "Joelho esquerdo", "Punho"].map((area) => (
                        <label key={area} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={adjustments.painFlags.includes(area)}
                            onChange={(e) => {
                              const newFlags = e.target.checked
                                ? [...adjustments.painFlags, area]
                                : adjustments.painFlags.filter((f) => f !== area)
                              handleAdjustmentChange("painFlags", newFlags)
                            }}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                          />
                          <span className="text-slate-300">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {(adjustments.sleepLow || adjustments.energyLow || adjustments.painFlags.length > 0) && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-yellow-300 mb-1">Ajustes aplicados</div>
                        <ul className="text-xs text-slate-400 space-y-1">
                          {adjustments.sleepLow && <li>• Volume reduzido em 20%, foco em compostos principais</li>}
                          {adjustments.energyLow && <li>• Intensidade ajustada para manutenção (RPE max 7)</li>}
                          {adjustments.painFlags.length > 0 && (
                            <li>• Exercícios com impacto em {adjustments.painFlags.join(", ")} foram substituídos</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Drawer */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="w-[480px] h-full bg-slate-900 border-l border-cyan-500/20 shadow-2xl p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Perfil Atlas</h2>
                <p className="text-sm text-slate-400">Passaporte de Governança</p>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-1">Sexo</div>
                <div className="font-medium">{profile.sexo}</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Idade</div>
                  <div className="font-medium">{profile.idade} anos</div>
                </div>
                <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Altura</div>
                  <div className="font-medium">{profile.altura} cm</div>
                </div>
                <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Peso</div>
                  <div className="font-medium">{profile.peso} kg</div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-1">Objetivo</div>
                <div className="font-medium">{profile.objetivo}</div>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-1">Tempo Disponível</div>
                <div className="font-medium">{profile.tempoDisponivel}</div>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-2">Restrições</div>
                <div className="flex flex-wrap gap-2">
                  {profile.restricoes.map((r, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-300"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-2">Preferências Dieta</div>
                <div className="flex flex-wrap gap-2">
                  {profile.preferenciasDieta.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-xs text-cyan-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Editar Perfil
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
