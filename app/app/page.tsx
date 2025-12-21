"use client"

import { useState } from "react"
import {
  Brain,
  Dumbbell,
  Activity,
  Moon,
  Shield,
  Heart,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  Send,
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { id: "visao360", label: "Visão 360 do Corpo", icon: Target, href: "#visao360" },
  { id: "atlasia", label: "Atlas IA", icon: Brain, href: "#atlasia" },
  { id: "treino", label: "Treino & Dieta", icon: Dumbbell, href: "#modulos" },
  { id: "compulsao", label: "Compulsão & Fome", icon: Heart, href: "#modulos" },
  { id: "sono", label: "Sono & Recuperação", icon: Moon, href: "#modulos" },
  { id: "fisioterapia", label: "Fisioterapia & Dores", icon: Shield, href: "#modulos" },
  { id: "testosterona", label: "Testosterona Natural", icon: TrendingUp, href: "#modulos" },
]

const specialtyChips = [
  { label: "Treino", color: "from-blue-500 to-blue-600" },
  { label: "Dieta", color: "from-cyan-500 to-cyan-600" },
  { label: "Sono", color: "from-indigo-500 to-indigo-600" },
  { label: "Testosterona", color: "from-green-500 to-green-600" },
  { label: "Fisioterapia", color: "from-purple-500 to-purple-600" },
  { label: "Compulsão", color: "from-pink-500 to-pink-600" },
]

const moduleCards = [
  {
    icon: Dumbbell,
    label: "Treino",
    description: "Periodização inteligente que prioriza pontos fracos e evita overtraining.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "hover:border-blue-500/50",
  },
  {
    icon: Activity,
    label: "Dieta",
    description: "Nutrição flexível com trocas inteligentes e recálculo após deslizes.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
    borderColor: "hover:border-cyan-500/50",
  },
  {
    icon: Moon,
    label: "Sono",
    description: "Protocolos de higiene do sono e ajuste do treino baseado na prontidão.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
    borderColor: "hover:border-indigo-500/50",
  },
  {
    icon: TrendingUp,
    label: "Testosterona Natural",
    description: "Micronutrientes, timing e hábitos para otimizar hormônios naturalmente.",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "hover:border-green-500/50",
  },
  {
    icon: Shield,
    label: "Fisioterapia",
    description: "Correção postural, mobilidade e protocolos integrados ao treino principal.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    borderColor: "hover:border-purple-500/50",
  },
  {
    icon: Heart,
    label: "Compulsão Alimentar",
    description: "Estratégias cognitivo-comportamentais para controlar a fome emocional.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
    borderColor: "hover:border-pink-500/50",
  },
]

const metricsData = {
  execucao: { value: 82, unit: "%", label: "Treinos concluídos esta semana" },
  consistencia: { value: 19, unit: " dias", label: "Sequência atual de dias seguidos" },
  estetica: { value: 67, unit: "%", label: "Progresso do shape ideal" },
  metabolismo: {
    status: "Otimizado",
    indicators: { energia: "Alta", sono: "7.5h", peso: "-2.1kg" },
  },
}

export default function AtlasDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  const handleMenuClick = (itemId: string, href: string) => {
    setActiveItem(itemId)
    setSidebarOpen(false)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-72 
          bg-card/95 backdrop-blur-xl border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground block">
                Atlas <span className="text-blue-400">IA</span>
              </span>
              <span className="text-xs text-muted-foreground">Painel de Governança</span>
            </div>
          </Link>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-6 right-4 lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id, item.href)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                transition-all duration-200 ease-out group relative
                ${
                  activeItem === item.id
                    ? "bg-blue-500/20 text-blue-300 shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }
              `}
            >
              <div
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
                  transition-all duration-200
                  ${
                    activeItem === item.id
                      ? "bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      : "bg-transparent group-hover:bg-blue-400/50 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                  }
                `}
              />
              <item.icon className={`w-5 h-5 transition-colors ${activeItem === item.id ? "text-blue-400" : ""}`} />
              <span className="font-medium">{item.label}</span>
              <ChevronRight
                className={`
                  w-4 h-4 ml-auto transition-all duration-200
                  ${activeItem === item.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"}
                `}
              />
            </button>
          ))}
        </nav>

        {/* User Block */}
        <div className="p-4 border-t border-border">
          <div className="bg-secondary/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Usuário Atlas</p>
                <p className="text-xs text-muted-foreground truncate">usuario@email.com</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>

            {/* Welcome text */}
            <div className="flex-1 text-center lg:text-left lg:ml-0">
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Bem-vindo ao seu <span className="text-blue-400">Painel Atlas IA</span>
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                O cérebro que governa seu corpo
              </p>
            </div>

            {/* Placeholder for future actions */}
            <div className="w-10 lg:hidden" />
          </div>
        </header>

        {/* Content Area */}
        <div className="px-4 md:px-8 py-8">
          <section id="dashboard" className="mb-10">
            <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent border border-blue-500/20 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">O cérebro que governa seu corpo.</h2>
              <p className="text-muted-foreground max-w-2xl">
                Aqui você acompanha a governança dos 6 pilares: <span className="text-blue-300">Treino</span>,{" "}
                <span className="text-cyan-300">Dieta</span>, <span className="text-indigo-300">Sono</span>,{" "}
                <span className="text-green-300">Testosterona Natural</span>,{" "}
                <span className="text-purple-300">Fisioterapia/Recuperação</span> e{" "}
                <span className="text-pink-300">Compulsão Alimentar</span>.
              </p>
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            <section id="visao360" className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Visão 360 do Corpo</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Execução Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Execução</p>
                      <p className="text-2xl font-bold text-blue-300">
                        {metricsData.execucao.value}
                        {metricsData.execucao.unit}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${metricsData.execucao.value}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metricsData.execucao.label}</p>
                </div>

                {/* Consistência Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Consistência</p>
                      <p className="text-2xl font-bold text-cyan-300">
                        {metricsData.consistencia.value}
                        {metricsData.consistencia.unit}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: "63%" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metricsData.consistencia.label}</p>
                </div>

                {/* Estética Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estética</p>
                      <p className="text-2xl font-bold text-indigo-300">
                        {metricsData.estetica.value}
                        {metricsData.estetica.unit}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${metricsData.estetica.value}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metricsData.estetica.label}</p>
                </div>

                {/* Metabolismo Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Metabolismo</p>
                      <p className="text-2xl font-bold text-green-300">{metricsData.metabolismo.status}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-secondary/50 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">Energia</p>
                      <p className="text-xs font-semibold text-foreground">
                        {metricsData.metabolismo.indicators.energia}
                      </p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">Sono</p>
                      <p className="text-xs font-semibold text-foreground">{metricsData.metabolismo.indicators.sono}</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground">Peso</p>
                      <p className="text-xs font-semibold text-foreground">{metricsData.metabolismo.indicators.peso}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="atlasia" className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Atlas IA - Assistente Inteligente</h2>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-[calc(100%-60px)]">
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Sistema de Governança Corporal</h3>
                    <p className="text-sm text-muted-foreground">
                      IA especializada em evidências científicas (Harvard / PubMed)
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {specialtyChips.map((chip) => (
                    <button
                      key={chip.label}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-full 
                        bg-gradient-to-r ${chip.color} text-white
                        transition-all duration-200 ease-out
                        hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
                        focus:outline-none focus:ring-2 focus:ring-blue-400/50
                      `}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Chat Area */}
                <div className="bg-secondary/20 rounded-xl p-4 mb-4 min-h-[180px] flex flex-col border border-border/50">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center max-w-sm">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <MessageSquare className="w-8 h-8 text-blue-400" />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Pergunte qualquer coisa sobre seu corpo, treino, dieta, sono, hormônios ou compulsão alimentar.
                        Em breve a Atlas IA responde aqui com base em evidências científicas (Harvard / PubMed).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pergunte qualquer coisa sobre seu corpo, treino, dieta, sono, hormônios ou compulsão alimentar..."
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </section>
          </div>

          <section id="modulos">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Módulos de Governança</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {moduleCards.map((module, index) => (
                <div
                  key={index}
                  className={`
                    group bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 
                    cursor-pointer transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:scale-[1.02] 
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]
                    ${module.borderColor}
                    focus-visible:-translate-y-1 focus-visible:scale-[1.02] 
                    focus-visible:shadow-[0_0_30px_rgba(59,130,246,0.2)] 
                    focus-visible:outline-none
                  `}
                  tabIndex={0}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <module.icon className={`w-6 h-6 ${module.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-300 transition-colors">
                    {module.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                  >
                    Ver módulo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="py-6 px-4 border-t border-border mt-12">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Atlas IA - O Cérebro Estratégico do Seu Corpo</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Isso não é um treino. É um sistema que governa sua vida física.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
