"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative bg-[#020408] py-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative flex items-center justify-center">
          {/* Glow rings */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-2xl"
            style={{ width: "120px", height: "120px" }}
          />
          <div
            className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"
            style={{ width: "100px", height: "100px" }}
          />

          {/* Brand seal circle */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500/60 bg-gradient-to-br from-blue-950 to-blue-900 shadow-2xl shadow-blue-500/30">
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border border-blue-400/40" />
            {/* Central "A" */}
            <span className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">
              A
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-16 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 blur-sm" />
              <Image
                src="/images/whatsapp-20image-202025-12-01-20at-2015.jpeg"
                alt="Atlas AI Logo"
                width={36}
                height={36}
                className="relative rounded-lg"
              />
            </div>
            <span className="text-lg font-bold text-white">
              Atlas <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">IA</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-slate-400 transition-colors hover:text-blue-400">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-slate-400 transition-colors hover:text-blue-400">
              Privacidade
            </a>
            <a href="#" className="text-sm text-slate-400 transition-colors hover:text-blue-400">
              Contato
            </a>
          </div>

          <p className="text-sm text-slate-500">© 2025 Atlas IA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
