"use client"

import { AtlasHubDiagram } from "@/components/atlas-hub-diagram"

export function AtlasHubSection() {
  return (
    <section className="relative bg-[#050a14] py-32 lg:py-48 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 lg:mb-24 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">Sistema Integrado</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
            O Núcleo da{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Atlas IA</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Seis pilares conectados em um sistema único. Cada módulo se comunica com os outros para criar sinergia total
            na sua transformação.
          </p>
        </div>

        {/* Hub Diagram */}
        <div className="flex justify-center">
          <AtlasHubDiagram />
        </div>
      </div>
    </section>
  )
}
