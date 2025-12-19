"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Shield, X } from "lucide-react"
import { submitLead } from "@/app/actions/submit-lead"

interface AtlasActivationModalProps {
  isOpen: boolean
  onClose: () => void
}

const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/7t3JoKg"

export function AtlasActivationModal(props: AtlasActivationModalProps) {
  const { isOpen, onClose } = props
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [countryCode, setCountryCode] = React.useState("+55")
  const [phone, setPhone] = React.useState("")
  const [error, setError] = React.useState("")

  const resetForm = () => {
    setName("")
    setEmail("")
    setCountryCode("+55")
    setPhone("")
    setError("")
  }

  const handleClose = () => {
    onClose()
    setTimeout(resetForm, 300)
  }

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    try {
      submitLead({
        name: name,
        email: email,
        countryCode: countryCode,
        phone: phone,
        timestamp: new Date().toISOString(),
      }).catch((err) => {
        console.error("[Atlas 7D] Error saving lead:", err)
      })

      window.location.assign(KIWIFY_CHECKOUT_URL)
    } catch (err) {
      console.error("[Atlas 7D] Form submission error:", err)
      setError("Erro inesperado. Tente novamente.")
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 opacity-75 blur-xl" />

        <div className="relative rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-blue-950/95 p-8 backdrop-blur-xl">
          <button
            onClick={handleClose}
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-8 text-center">
            <h3 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
              Preencha seus dados para ativar a Atlas IA
            </h3>
            <p className="text-sm text-slate-400 lg:text-base">
              Em menos de 60 segundos você conecta sua rotina à IA que governa sua evolução física.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-medium text-slate-300">
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Alex Lúcio Filho"
                className="w-full rounded-2xl border border-slate-700/50 bg-slate-800/50 px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                Seu melhor e-mail
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex.: voce@email.com"
                className="w-full rounded-2xl border border-slate-700/50 bg-slate-800/50 px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-slate-300">
                Seu WhatsApp
              </label>
              <div className="flex gap-3">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-32 rounded-2xl border border-slate-700/50 bg-slate-800/50 px-4 py-3.5 text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all appearance-none cursor-pointer"
                >
                  <option value="+55">BR +55</option>
                  <option value="+1">US +1</option>
                  <option value="+351">PT +351</option>
                  <option value="+54">AR +54</option>
                </select>

                <input
                  type="tel"
                  id="whatsapp"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:opacity-90 transition-all py-6 text-base font-semibold rounded-2xl mt-6"
              size="lg"
            >
              Continuar para ativar a Atlas 7D
            </Button>

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
