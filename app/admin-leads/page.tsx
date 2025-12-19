"use client"

import { getLeads } from "@/app/actions/submit-lead"
import { Download, Mail, Phone, User, Calendar } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminLeadsPage() {
  const leads = await getLeads()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Leads capturados - Atlas IA</h1>
            <p className="text-slate-400">
              Total de leads: <span className="font-semibold text-cyan-400">{leads.length}</span>
            </p>
          </div>

          <button
            onClick={() => {
              const dataStr = JSON.stringify(leads, null, 2)
              const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
              const exportFileDefaultName = `atlas-leads-${new Date().toISOString().split("T")[0]}.json`
              const linkElement = document.createElement("a")
              linkElement.setAttribute("href", dataUri)
              linkElement.setAttribute("download", exportFileDefaultName)
              linkElement.click()
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 transition-colors"
          >
            <Download className="h-5 w-5" />
            Exportar JSON
          </button>
        </div>

        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <p className="text-slate-400">Nenhum lead capturado ainda.</p>
            </div>
          ) : (
            leads.map((lead, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-500/10 p-2">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Nome</p>
                      <p className="text-white font-medium">{lead.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-cyan-500/10 p-2">
                      <Mail className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">E-mail</p>
                      <p className="text-white font-medium break-all">{lead.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-green-500/10 p-2">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">WhatsApp</p>
                      <p className="text-white font-medium">
                        {lead.countryCode} {lead.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-purple-500/10 p-2">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Data/Hora</p>
                      <p className="text-white font-medium">{new Date(lead.timestamp).toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
