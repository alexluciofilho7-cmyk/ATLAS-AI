"use client"

import { HeroSection } from "@/components/hero-section"
import { WhatIsAtlasSection } from "@/components/what-is-atlas-section"
import { WhyMostFailSection } from "@/components/why-most-fail-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AtlasHubSection } from "@/components/atlas-hub-section"
import { ModulesSection } from "@/components/modules-section"
import { Vision360Section } from "@/components/vision-360-section"
import { ProofSection } from "@/components/proof-section"
import { Atlas7DTransition } from "@/components/atlas-7d-transition"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { TransformationProofSection } from "@/components/transformation-proof-section"
import { FemaleTransformationSection } from "@/components/female-transformation-section"
import { AtlasActivationModal } from "@/components/atlas-activation-modal"
import { useState } from "react"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <TransformationProofSection onOpenModal={() => setIsModalOpen(true)} />
      <FemaleTransformationSection onOpenModal={() => setIsModalOpen(true)} />
      <WhatIsAtlasSection />
      <WhyMostFailSection />
      <HowItWorksSection />
      <AtlasHubSection />
      <ModulesSection />
      <Vision360Section />
      <ProofSection />
      <Atlas7DTransition />
      <PricingSection onOpenModal={() => setIsModalOpen(true)} />
      <FaqSection />
      <FinalCtaSection onOpenModal={() => setIsModalOpen(true)} />
      <Footer />

      <AtlasActivationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
