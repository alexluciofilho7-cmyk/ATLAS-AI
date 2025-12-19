import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bem-vindo à Atlas IA - Ativação 7D Confirmada",
  description:
    "Sua ativação foi confirmada. Configure seu protocolo inicial para treino, dieta, sono e testosterona natural.",
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
