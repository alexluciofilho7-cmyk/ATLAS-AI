import { CheckCircle2, Settings, TrendingUp, Shield, Activity, Brain } from "lucide-react"
import Link from "next/link"

export default function AtlasOnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
      {/* Hero de Boas-Vindas */}
      <section className="relative px-4 pt-20 pb-16 overflow-hidden">
        {/* Background glow effect */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Success badge */}
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 backdrop-blur-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Ativação Confirmada</span>
          </div>

          {/* Main title */}
          <h1 className="mb-6 text-balance bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Parabéns, você acabou de colocar seu corpo sob comando da Atlas IA.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-3xl text-pretty text-lg leading-relaxed text-slate-300 md:text-xl">
            Sua Ativação 7D já está confirmada. Agora vamos configurar seu protocolo inicial para treino, dieta, sono,
            testosterona natural e postura, tudo no mesmo sistema inteligente.
          </p>
        </div>
      </section>

      {/* Seção "O que vai acontecer agora" */}
      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Section title */}
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">O que vai acontecer agora</h2>
            <p className="text-lg text-slate-400">Próximos passos (leva menos de 3 minutos)</p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-xl font-bold text-blue-400">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-white">Confira seu e-mail</h3>
                  <p className="text-pretty leading-relaxed text-slate-300">
                    Enviamos uma mensagem com o assunto{" "}
                    <strong className="text-blue-400">"Bem-vindo à Atlas IA – Ativação 7D"</strong> para o e-mail usado
                    na compra. Guarde esse e-mail, ele é sua chave de acesso.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-xl font-bold text-blue-400">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-white">Iniciar configuração</h3>
                  <p className="text-pretty leading-relaxed text-slate-300">
                    Clique no botão abaixo para iniciar sua configuração inicial com a Atlas IA.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-xl font-bold text-blue-400">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-white">Protocolo liberado</h3>
                  <p className="text-pretty leading-relaxed text-slate-300">
                    Após a configuração, você recebe seu plano inicial de treino, dieta, sono e testosterona natural
                    para testar a Atlas IA nesses 7 dias.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <Link
              href="https://atlas-ia.com/configuracao-inicial"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Settings className="h-6 w-6" />
              <span>Iniciar Configuração da Atlas IA</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Reforço da Proposta Atlas IA */}
      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Section title */}
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              O que a Atlas IA faz por você nesses 7 dias
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 - Governança do corpo */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Governança do corpo</h3>
              <p className="text-pretty leading-relaxed text-slate-300">
                A Atlas IA cruza treino, dieta, sono, testosterona e postura em um único sistema, para você parar de
                viver apagando incêndio com o próprio corpo.
              </p>
            </div>

            {/* Card 2 - Ajustes diários */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Ajustes diários</h3>
              <p className="text-pretty leading-relaxed text-slate-300">
                O sistema revisa seus dados e sugere ajustes sem você precisar ficar montando planilhas ou dietas na
                mão.
              </p>
            </div>

            {/* Card 3 - Teste de 7 dias */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/40 p-8 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Teste de 7 dias sem achismo</h3>
              <p className="text-pretty leading-relaxed text-slate-300">
                Você vai sentir na prática como é ter um cérebro estratégico cuidando da sua evolução física todos os
                dias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco de Garantia / Segurança */}
      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-800/50 bg-slate-900/50 p-8 text-center backdrop-blur-xl">
            <Shield className="mx-auto mb-4 h-10 w-10 text-blue-400" />
            <p className="text-pretty leading-relaxed text-slate-400">
              Se em 7 dias você sentir que a Atlas IA não melhorou sua clareza, disciplina e controle sobre treino,
              dieta e rotina, você pode cancelar sem compromisso.
            </p>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  )
}
