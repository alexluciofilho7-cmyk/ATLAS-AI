"use client"

import { useState } from "use"
import {
  Calendar,
  Clock,
  Flame,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Moon,
  Zap,
  Dumbbell,
  UtensilsCrossed,
} from "lucide-react"

type TrainingProfile = {
  gender: "Masculino" | "Feminino" | "Outro"
  age: number | null
  height: number | null
  weight: number | null
  fitnessLevel: "Iniciante" | "Intermediário" | "Avançado"
  primaryGoal: "Ganho de massa muscular" | "Definição / cutting" | "Recomposição corporal" | "Performance / força"
  daysPerWeek: number
  timePerSession: 30 | 45 | 60 | 75 | 90
  trainingLocation: "Academia completa" | "Academia simples" | "Casa com poucos equipamentos"
  weakPoints: string[]
  restrictions: string[]
  otherRestrictions: string
}

type DietProfile = {
  foodPreference: "Sem restrições" | "Alta proteína" | "Low carb" | "Pescetariano" | "Vegetariano" | "Outro"
  restrictions: string[]
  mealsPerDay: 3 | 4 | 5 | 6
  hungerTime: "manhã" | "tarde" | "noite" | "madrugada"
  compulsionLevel: number
  calorieGoal: number | null
  proteinGoal: number | null
  favoriteFood: string
  compulsionTriggers: string
}

const defaultTrainingProfile: TrainingProfile = {
  gender: "Masculino",
  age: null,
  height: null,
  weight: null,
  fitnessLevel: "Intermediário",
  primaryGoal: "Ganho de massa muscular",
  daysPerWeek: 5,
  timePerSession: 60,
  trainingLocation: "Academia completa",
  weakPoints: [],
  restrictions: [],
  otherRestrictions: "",
}

const defaultDietProfile: DietProfile = {
  foodPreference: "Sem restrições",
  restrictions: [],
  mealsPerDay: 4,
  hungerTime: "noite",
  compulsionLevel: 5,
  calorieGoal: null,
  proteinGoal: null,
  favoriteFood: "",
  compulsionTriggers: "",
}

export default function TreinoDietaRefactored() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [configTab, setConfigTab] = useState<"treino" | "dieta">("treino")
  const [trainingProfile, setTrainingProfile] = useState<TrainingProfile>(defaultTrainingProfile)
  const [dietProfile, setDietProfile] = useState<DietProfile>(defaultDietProfile)

  // Mock data for weekly calendar
  const weeklyDays = [
    {
      day: "Seg",
      date: "12/30",
      workoutFocus: "Peito superior + Tríceps",
      duration: 60,
      macros: { kcal: 2800, protein: 180, carbs: 320, fat: 80 },
      criticalAction: "Comer carboidrato 1h antes",
      isTrainingDay: true,
    },
    {
      day: "Ter",
      date: "12/31",
      workoutFocus: "Costas + Bíceps",
      duration: 65,
      macros: { kcal: 2750, protein: 175, carbs: 310, fat: 85 },
      criticalAction: "Suplementar creatina",
      isTrainingDay: true,
    },
    {
      day: "Qua",
      date: "01/01",
      workoutFocus: "Pernas completo",
      duration: 70,
      macros: { kcal: 3000, protein: 190, carbs: 360, fat: 90 },
      criticalAction: "Dormir 8h+",
      isTrainingDay: true,
    },
    {
      day: "Qui",
      date: "01/02",
      workoutFocus: "Ombros + Abdômen",
      duration: 55,
      macros: { kcal: 2700, protein: 170, carbs: 300, fat: 85 },
      criticalAction: "Treino leve - recuperação",
      isTrainingDay: true,
    },
    {
      day: "Sex",
      date: "01/03",
      workoutFocus: "Peito inferior + Tríceps",
      duration: 60,
      macros: { kcal: 2800, protein: 180, carbs: 320, fat: 80 },
      criticalAction: "Alta intensidade",
      isTrainingDay: true,
    },
    {
      day: "Sáb",
      date: "01/04",
      workoutFocus: "Descanso ativo",
      duration: 0,
      macros: { kcal: 2400, protein: 150, carbs: 250, fat: 80 },
      criticalAction: "Caminhada 30min",
      isTrainingDay: false,
    },
    {
      day: "Dom",
      date: "01/05",
      workoutFocus: "Descanso total",
      duration: 0,
      macros: { kcal: 2400, protein: 150, carbs: 250, fat: 80 },
      criticalAction: "Meal prep da semana",
      isTrainingDay: false,
    },
  ]

  const handleSaveTraining = () => {
    console.log("[v0] Salvando perfil de treino:", trainingProfile)
    alert("Perfil de Treino salvo com sucesso!")
  }

  const handleSaveDiet = () => {
    console.log("[v0] Salvando perfil de dieta:", dietProfile)
    alert("Perfil de Dieta salvo com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
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
      </div>

      {/* Mission Control Header */}
      <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/80 to-slate-900/40">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-cyan-400 mb-1">Missão da Semana</div>
            <h1 className="text-2xl font-bold mb-2">Peito clavicular + Deltoide lateral</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Duração prevista:</span>
            <span className="font-bold text-white">62 min</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-400">Intensidade:</span>
            <span className="font-bold text-orange-400">Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-400">Recuperação:</span>
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">Risco compulsão:</span>
            <span className="font-bold text-cyan-400">Baixo</span>
          </div>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="p-6 bg-slate-950/50">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold">Semana Atlas</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {weeklyDays.map((day, idx) => (
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

      <div className="p-6">
        <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6">Configuração de Treino & Dieta</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-700/50">
            <button
              onClick={() => setConfigTab("treino")}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                configTab === "treino"
                  ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-b-2 border-cyan-400 text-white font-medium"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              Treino
            </button>
            <button
              onClick={() => setConfigTab("dieta")}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                configTab === "dieta"
                  ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-b-2 border-cyan-400 text-white font-medium"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              Dieta
            </button>
          </div>

          {/* Training Tab Content */}
          {configTab === "treino" && (
            <div className="space-y-8">
              {/* Seção A - Perfil Básico */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Perfil Básico</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Sexo</label>
                    <select
                      value={trainingProfile.gender}
                      onChange={(e) =>
                        setTrainingProfile({ ...trainingProfile, gender: e.target.value as TrainingProfile["gender"] })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Idade</label>
                    <input
                      type="number"
                      value={trainingProfile.age || ""}
                      onChange={(e) => setTrainingProfile({ ...trainingProfile, age: Number(e.target.value) || null })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: 28"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Altura (cm)</label>
                    <input
                      type="number"
                      value={trainingProfile.height || ""}
                      onChange={(e) =>
                        setTrainingProfile({ ...trainingProfile, height: Number(e.target.value) || null })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: 175"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Peso atual (kg)</label>
                    <input
                      type="number"
                      value={trainingProfile.weight || ""}
                      onChange={(e) =>
                        setTrainingProfile({ ...trainingProfile, weight: Number(e.target.value) || null })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: 78"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Nível de treino</label>
                    <select
                      value={trainingProfile.fitnessLevel}
                      onChange={(e) =>
                        setTrainingProfile({
                          ...trainingProfile,
                          fitnessLevel: e.target.value as TrainingProfile["fitnessLevel"],
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Objetivo principal</label>
                    <select
                      value={trainingProfile.primaryGoal}
                      onChange={(e) =>
                        setTrainingProfile({
                          ...trainingProfile,
                          primaryGoal: e.target.value as TrainingProfile["primaryGoal"],
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Ganho de massa muscular">Ganho de massa muscular</option>
                      <option value="Definição / cutting">Definição / cutting</option>
                      <option value="Recomposição corporal">Recomposição corporal</option>
                      <option value="Performance / força">Performance / força</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seção B - Estrutura de treino */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Estrutura de Treino</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Dias de treino por semana</label>
                    <input
                      type="range"
                      min="3"
                      max="6"
                      value={trainingProfile.daysPerWeek}
                      onChange={(e) => setTrainingProfile({ ...trainingProfile, daysPerWeek: Number(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-center text-cyan-400 font-bold mt-1">{trainingProfile.daysPerWeek} dias</div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Tempo disponível por sessão</label>
                    <select
                      value={trainingProfile.timePerSession}
                      onChange={(e) =>
                        setTrainingProfile({
                          ...trainingProfile,
                          timePerSession: Number(e.target.value) as TrainingProfile["timePerSession"],
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value={30}>30 minutos</option>
                      <option value={45}>45 minutos</option>
                      <option value={60}>60 minutos</option>
                      <option value={75}>75 minutos</option>
                      <option value={90}>90 minutos</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-300 mb-2">Local de treino</label>
                    <select
                      value={trainingProfile.trainingLocation}
                      onChange={(e) =>
                        setTrainingProfile({
                          ...trainingProfile,
                          trainingLocation: e.target.value as TrainingProfile["trainingLocation"],
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Academia completa">Academia completa</option>
                      <option value="Academia simples">Academia simples</option>
                      <option value="Casa com poucos equipamentos">Casa com poucos equipamentos</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-300 mb-2">Pontos fracos prioritários</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Peito clavicular",
                        "Costas",
                        "Deltoide lateral",
                        "Posterior de ombro",
                        "Trapézio",
                        "Pernas",
                        "Abdômen",
                        "Outro",
                      ].map((point) => (
                        <label key={point} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={trainingProfile.weakPoints.includes(point)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTrainingProfile({
                                  ...trainingProfile,
                                  weakPoints: [...trainingProfile.weakPoints, point],
                                })
                              } else {
                                setTrainingProfile({
                                  ...trainingProfile,
                                  weakPoints: trainingProfile.weakPoints.filter((p) => p !== point),
                                })
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 checked:bg-cyan-500"
                          />
                          <span className="text-sm text-slate-300">{point}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-300 mb-2">Restrições ou dores</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                      {["Ombro", "Joelho", "Coluna", "Cotovelo", "Nenhuma"].map((restriction) => (
                        <label key={restriction} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={trainingProfile.restrictions.includes(restriction)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTrainingProfile({
                                  ...trainingProfile,
                                  restrictions: [...trainingProfile.restrictions, restriction],
                                })
                              } else {
                                setTrainingProfile({
                                  ...trainingProfile,
                                  restrictions: trainingProfile.restrictions.filter((r) => r !== restriction),
                                })
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 checked:bg-cyan-500"
                          />
                          <span className="text-sm text-slate-300">{restriction}</span>
                        </label>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={trainingProfile.otherRestrictions}
                      onChange={(e) => setTrainingProfile({ ...trainingProfile, otherRestrictions: e.target.value })}
                      placeholder="Outras restrições (opcional)"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Seção C - Resumo do plano de treino */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Resumo Atlas – Treino da Semana</h3>
                <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
                  <p className="text-slate-300">
                    Treino {trainingProfile.daysPerWeek}x/semana focado em{" "}
                    <span className="text-cyan-400 font-semibold">{trainingProfile.primaryGoal.toLowerCase()}</span>{" "}
                    {trainingProfile.weakPoints.length > 0 && (
                      <>
                        com prioridade em{" "}
                        <span className="text-cyan-400 font-semibold">{trainingProfile.weakPoints.join(", ")}</span>
                      </>
                    )}{" "}
                    e duração média de{" "}
                    <span className="text-cyan-400 font-semibold">{trainingProfile.timePerSession} minutos</span>.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveTraining}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30"
              >
                Salvar perfil de Treino
              </button>
            </div>
          )}

          {/* Diet Tab Content */}
          {configTab === "dieta" && (
            <div className="space-y-8">
              {/* Seção A - Perfil alimentar */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Perfil Alimentar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Preferência alimentar</label>
                    <select
                      value={dietProfile.foodPreference}
                      onChange={(e) =>
                        setDietProfile({
                          ...dietProfile,
                          foodPreference: e.target.value as DietProfile["foodPreference"],
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Sem restrições">Sem restrições</option>
                      <option value="Alta proteína">Alta proteína</option>
                      <option value="Low carb">Low carb</option>
                      <option value="Pescetariano">Pescetariano</option>
                      <option value="Vegetariano">Vegetariano</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Restrições</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Intolerância à lactose", "Glúten", "Alergias", "Nenhuma"].map((restriction) => (
                        <label key={restriction} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dietProfile.restrictions.includes(restriction)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setDietProfile({
                                  ...dietProfile,
                                  restrictions: [...dietProfile.restrictions, restriction],
                                })
                              } else {
                                setDietProfile({
                                  ...dietProfile,
                                  restrictions: dietProfile.restrictions.filter((r) => r !== restriction),
                                })
                              }
                            }}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 checked:bg-cyan-500"
                          />
                          <span className="text-sm text-slate-300">{restriction}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Quantas refeições principais por dia</label>
                    <select
                      value={dietProfile.mealsPerDay}
                      onChange={(e) =>
                        setDietProfile({
                          ...dietProfile,
                          mealsPerDay: Number(e.target.value) as DietProfile["mealsPerDay"],
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value={3}>3 refeições</option>
                      <option value={4}>4 refeições</option>
                      <option value={5}>5 refeições</option>
                      <option value={6}>6 refeições</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Horário em que sente mais fome</label>
                    <select
                      value={dietProfile.hungerTime}
                      onChange={(e) =>
                        setDietProfile({ ...dietProfile, hungerTime: e.target.value as DietProfile["hungerTime"] })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="manhã">Manhã</option>
                      <option value="tarde">Tarde</option>
                      <option value="noite">Noite</option>
                      <option value="madrugada">Madrugada</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-300 mb-2">
                      Nível atual de compulsão / fome emocional (0-10)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={dietProfile.compulsionLevel}
                      onChange={(e) => setDietProfile({ ...dietProfile, compulsionLevel: Number(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-center text-cyan-400 font-bold mt-1">{dietProfile.compulsionLevel}/10</div>
                  </div>
                </div>
              </div>

              {/* Seção B - Metas de dieta */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Metas de Dieta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Meta calórica diária (opcional)</label>
                    <input
                      type="number"
                      value={dietProfile.calorieGoal || ""}
                      onChange={(e) => setDietProfile({ ...dietProfile, calorieGoal: Number(e.target.value) || null })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: 2500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Meta de proteína (g/dia, opcional)</label>
                    <input
                      type="number"
                      value={dietProfile.proteinGoal || ""}
                      onChange={(e) => setDietProfile({ ...dietProfile, proteinGoal: Number(e.target.value) || null })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: 180"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Preferências fortes (alimentos que gosta muito)
                    </label>
                    <input
                      type="text"
                      value={dietProfile.favoriteFood}
                      onChange={(e) => setDietProfile({ ...dietProfile, favoriteFood: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: Frango, batata-doce, chocolate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Alimentos que normalmente disparam compulsão
                    </label>
                    <input
                      type="text"
                      value={dietProfile.compulsionTriggers}
                      onChange={(e) => setDietProfile({ ...dietProfile, compulsionTriggers: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      placeholder="Ex: Doces, pizza, sorvete"
                    />
                  </div>
                </div>
              </div>

              {/* Seção C - Resumo do plano de dieta */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">Resumo Atlas – Dieta Base</h3>
                <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
                  <p className="text-slate-300">
                    Dieta com foco em{" "}
                    <span className="text-cyan-400 font-semibold">{dietProfile.foodPreference.toLowerCase()}</span>,{" "}
                    <span className="text-cyan-400 font-semibold">{dietProfile.mealsPerDay} refeições por dia</span>
                    {dietProfile.calorieGoal && (
                      <>
                        , meta aproximada de{" "}
                        <span className="text-cyan-400 font-semibold">{dietProfile.calorieGoal} kcal</span>
                      </>
                    )}{" "}
                    e foco em controle de compulsão{" "}
                    <span className="text-cyan-400 font-semibold">
                      {dietProfile.hungerTime === "noite" || dietProfile.hungerTime === "madrugada"
                        ? "noturna"
                        : "diurna"}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveDiet}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30"
              >
                Salvar perfil de Dieta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
