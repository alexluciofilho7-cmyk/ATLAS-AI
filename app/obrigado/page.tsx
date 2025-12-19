import { CheckCircle2, Mail, Brain, Shield, Activity, Moon, Dumbbell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse-glow" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center glow-blue">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Ativação Confirmada</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-glow">
            Sua governança corporal começou
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-blue-200/80 mb-8">
            Pagamento confirmado. Bem-vindo ao sistema Atlas IA.
          </p>

          {/* Email notification */}
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm mb-10 max-w-md mx-auto">
            <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <p className="text-muted-foreground text-left">
              Você receberá um e-mail com as <span className="text-foreground font-medium">instruções de acesso</span>{" "}
              em instantes.
            </p>
          </div>

          {/* System explanation */}
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-foreground">Você não comprou um treino</h2>
            </div>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Você ativou um <span className="text-blue-300 font-medium">SISTEMA DE GOVERNANÇA CORPORAL</span> que
              integra e ajusta diariamente os 5 pilares da sua performance física:
            </p>

            {/* Pillars grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Dumbbell, label: "Treino", color: "text-blue-400" },
                { icon: Activity, label: "Dieta", color: "text-cyan-400" },
                { icon: Moon, label: "Sono", color: "text-indigo-400" },
                { icon: Activity, label: "Testosterona", color: "text-blue-300" },
                { icon: Shield, label: "Postura", color: "text-cyan-300" },
              ].map((pillar, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                  <span className="text-sm text-foreground font-medium">{pillar.label}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6 text-sm">
              A Atlas IA analisa seus dados e ajusta seu protocolo em tempo real. Sem achismos. Sem estagnação.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/app">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-8 py-6 text-lg rounded-xl glow-blue-sm transition-all duration-300 hover:scale-105"
            >
              Acessar Painel Atlas
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <p className="text-muted-foreground text-sm mt-4">
            O painel estará disponível assim que você receber o e-mail de acesso.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <p className="text-center text-muted-foreground text-sm">Atlas IA - O Cérebro Estratégico do Seu Corpo</p>
      </footer>
    </main>
  )
}
