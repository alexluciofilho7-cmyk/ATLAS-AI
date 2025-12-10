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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhatIsAtlasSection />
      <WhyMostFailSection />
      <HowItWorksSection />
      <AtlasHubSection />
      <ModulesSection />
      <Vision360Section />
      <ProofSection />
      <Atlas7DTransition />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  )
}
