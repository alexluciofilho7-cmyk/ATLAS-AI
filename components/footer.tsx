"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative bg-[#071018] py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top CTA Section */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-[#0d2535]/80 via-[#0a1628]/80 to-[#0d1f35]/80 p-12 text-center backdrop-blur-sm lg:p-16">
          {/* Background glow */}
          <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-teal-500/20 opacity-50" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">Comece Agora</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-5xl">
              Pronto para transformar
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                seu corpo?
              </span>
            </h2>
            <p className="mb-8 text-lg text-slate-400">Comece seu teste gratuito de 7 dias agora mesmo.</p>
            <Button
              size="lg"
              className="group h-14 bg-gradient-to-r from-teal-500 to-cyan-500 px-8 text-base font-semibold text-[#0a1628] shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:opacity-90"
            >
              Começar Meu Projeto Agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 blur-sm" />
              <Image
                src="/images/whatsapp-20image-202025-12-01-20at-2015.jpeg"
                alt="Atlas AI Logo"
                width={36}
                height={36}
                className="relative rounded-lg"
              />
            </div>
            <span className="text-lg font-bold text-white">
              Atlas <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-slate-400 transition-colors hover:text-teal-400">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-slate-400 transition-colors hover:text-teal-400">
              Privacidade
            </a>
            <a href="#" className="text-sm text-slate-400 transition-colors hover:text-teal-400">
              Contato
            </a>
          </div>

          <p className="text-sm text-slate-500">© 2025 Atlas AI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
