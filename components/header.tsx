"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-[#0a1628]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 blur-sm" />
            <Image
              src="/images/whatsapp-20image-202025-12-01-20at-2015.jpeg"
              alt="Atlas AI Logo"
              width={32}
              height={32}
              className="relative rounded-lg"
            />
          </div>
          <span className="text-lg font-bold text-white">
            Atlas <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-300 transition-colors hover:text-teal-400">
            Início
          </Link>
          <Link href="/planos" className="text-sm font-medium text-slate-300 transition-colors hover:text-teal-400">
            Planos
          </Link>
          <a href="#features" className="text-sm font-medium text-slate-300 transition-colors hover:text-teal-400">
            Recursos
          </a>
          <a href="#faq" className="text-sm font-medium text-slate-300 transition-colors hover:text-teal-400">
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <Button className="hidden h-10 bg-gradient-to-r from-teal-500 to-cyan-500 px-6 text-sm font-semibold text-[#0a1628] shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 md:inline-flex">
          Começar Agora
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {/* Mobile menu button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300 hover:text-teal-400">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-800/50 bg-[#0a1628] md:hidden">
          <nav className="flex flex-col gap-4 p-6">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-teal-400">
              Início
            </Link>
            <Link href="/planos" className="text-sm font-medium text-slate-300 hover:text-teal-400">
              Planos
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-teal-400">
              Recursos
            </a>
            <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-[#0a1628]">Começar Agora</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
