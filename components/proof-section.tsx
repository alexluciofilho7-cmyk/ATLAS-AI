"use client"

import { Quote, Star, Shield, BookOpen, Award } from "lucide-react"

const testimonials = [
  {
    quote:
      "Treino há 5 anos, mas só com o Atlas entendi que meu volume de ombro estava ridículo. O app ajustou e em 3 meses evoluí mais que no último ano.",
    author: "Lucas M.",
    role: "Usuário há 8 meses",
    rating: 5,
    avatar: "LM",
  },
  {
    quote:
      "A função de recalcular a dieta salvou minha vida. Eu tinha compulsão quando errava uma refeição. O Atlas me mostrou que um erro não mata o progresso.",
    author: "Rafael T.",
    role: "Usuário há 6 meses",
    rating: 5,
    avatar: "RT",
  },
  {
    quote:
      "Trabalho 12 horas por dia e não tinha tempo para calcular macros. O Atlas faz tudo automaticamente. Ganhei 5kg de massa magra em 4 meses.",
    author: "Bruno S.",
    role: "Usuário há 4 meses",
    rating: 5,
    avatar: "BS",
  },
]

const sources = [
  { name: "PubMed", description: "500+ estudos", icon: BookOpen },
  { name: "Harvard Health", description: "Diretrizes clínicas", icon: Shield },
  { name: "ACSM", description: "Protocolos de treino", icon: Award },
]

export function ProofSection() {
  return (
    <section className="relative bg-[#071018] py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
            <Shield className="h-4 w-4 text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Prova Social</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Método validado
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">na prática</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Baseado em princípios científicos de Harvard, PubMed e as melhores práticas de fisiologia do mundo.
          </p>
        </div>

        {/* Scientific Sources */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          {sources.map((source) => (
            <div
              key={source.name}
              className="group flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/30 px-6 py-3 backdrop-blur-sm transition-all hover:border-teal-500/30 hover:bg-teal-500/5"
            >
              <source.icon className="h-5 w-5 text-teal-400" />
              <div>
                <span className="font-semibold text-white">{source.name}</span>
                <span className="mx-2 text-slate-600">•</span>
                <span className="text-sm text-slate-400">{source.description}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-[#0d1f35]/80 to-[#0a1628]/80 p-6 backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30"
            >
              {/* Glow effect */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/5 blur-2xl transition-all group-hover:bg-teal-500/10" />

              {/* Quote icon */}
              <Quote className="mb-4 h-10 w-10 text-teal-500/20" />

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-teal-400 text-teal-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-slate-300 leading-relaxed">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-slate-700/50 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-bold text-[#0a1628]">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
