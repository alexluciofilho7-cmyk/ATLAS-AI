"use client"

import { PricingHero } from "@/components/pricing/pricing-hero"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { AnnualBenefits } from "@/components/pricing/annual-benefits"
import { PricingFAQ } from "@/components/pricing/pricing-faq"
import { Footer } from "@/components/footer"

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0d1f35]">
      <PricingHero />
      <PricingCards />
      <AnnualBenefits />
      <PricingFAQ />
      <Footer />
    </main>
  )
}
