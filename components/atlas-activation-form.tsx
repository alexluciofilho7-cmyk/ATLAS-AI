"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { useState } from "react"

export function AtlasActivationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+55",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integration point - Submit to API or redirect to checkout
    console.log("[v0] Form submitted:", formData)
  }

  return (
    <section id="formulario-atlas" className="relative bg-[#030712] py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        {/* Subtle tech pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        {/* Form card */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 opacity-75 blur-xl" />

          {/* Card */}
          <div className="relative rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-blue-950/80 p-8 backdrop-blur-xl lg:p-12">
            {/* Header */}
            <div className="mb-8 text-center">
              <h3 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
                Preencha seus dados para ativar a Atlas IA
              </h3>
              <p className="text-sm text-slate-400 lg:text-base">
                Em menos de 60 segundos você conecta sua rotina à IA que governa sua evolução física.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome Completo */}
              <div>
                <label htmlFor="nome" className="mb-2 block text-sm font-medium text-slate-300">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex.: Alex Lúcio Filho"
                  className="w-full rounded-2xl border border-slate-700/50 bg-slate-800/50 px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                  Seu melhor e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex.: voce@email.com"
                  className="w-full rounded-2xl border border-slate-700/50 bg-slate-800/50 px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-slate-300">
                  Seu WhatsApp
                </label>
                <div className="flex gap-3">
                  {/* Country selector */}
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="w-32 rounded-2xl border border-slate-700/50 bg-slate-800/50 px-4 py-3.5 text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all appearance-none cursor-pointer"
                  >
                    <option value="+55">BR +55</option>
                    <option value="+1">US +1</option>
                    <option value="+351">PT +351</option>
                    <option value="+54">AR +54</option>
                  </select>

                  {/* Phone input */}
                  <input
                    type="tel"
                    id="whatsapp"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-0123"
                    className="flex-1 rounded-2xl border border-slate-700/50 bg-slate-800/50 px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all"
                  />
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:opacity-90 transition-all py-6 text-base font-semibold rounded-2xl mt-6"
                size="lg"
              >
                <span className="flex flex-col items-center gap-1">
                  <span>Continuar para ativar a Atlas 7D</span>
                  <span className="text-xs font-normal opacity-80">
                    R$ 9,90 pelos primeiros 7 dias. Depois você escolhe o plano ideal.
                  </span>
                </span>
              </Button>

              {/* Security note */}
              <p className="mt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Shield className="h-3.5 w-3.5" />
                Seus dados são 100% protegidos. Nada de spam, nada de pegadinha.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
