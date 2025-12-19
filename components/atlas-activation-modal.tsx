"use client"

import type React from "react"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Shield, X } from "lucide-react"
import { useState, useEffect } from "react"
import { submitLead } from "@/app/actions/submit-lead"

interface AtlasActivationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AtlasActivationModal({ isOpen, onClose }: AtlasActivationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+55",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    onClose()
    // Reset form after modal closes
    setTimeout(() => {
      setFormData({ name: "", email: "", countryCode: "+55", phone: "" })
      setError(null)
    }, 300)
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, handleClose])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      // Validate fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        setError("Por favor, preencha todos os campos.")
        return
      }

      setIsSubmitting(true)

      try {
        const result = await submitLead({
          name: formData.name,
          email: formData.email,
          countryCode: formData.countryCode,
          phone: formData.phone,
          timestamp: new Date().toISOString(),
        })

        if (!result.success) {
          setError(result.error || "Erro ao enviar. Tente novamente.")
          setIsSubmitting(false)
          return
        }

        window.location.href = "https://pay.kiwify.com.br/7t3JoKg"

        // Note: No code runs after this line since the page redirects
      } catch (err) {
        console.error("[Atlas 7D] Form submission error:", err)
        setError("Erro inesperado. Tente novamente.")
        setIsSubmitting(false)
      }
    },
    [formData],
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 opacity-75 blur-xl" />

        {/* Modal card */}
        <div className="relative rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-blue-950/95 p-8 backdrop-blur-xl">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>

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

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:opacity-90 transition-all py-6 text-base font-semibold rounded-2xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              Continuar para ativar a Atlas 7D
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
  )
}
