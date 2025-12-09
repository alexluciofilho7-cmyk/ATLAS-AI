"use client"

export function PricingHero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
          Escolha o plano que combina
          <br />
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            com seu compromisso
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-slate-300">
          Todos os planos usam a mesma inteligência Atlas AI. O que muda é o quanto você quer ser cobrado e acompanhado.
        </p>
      </div>
    </section>
  )
}
