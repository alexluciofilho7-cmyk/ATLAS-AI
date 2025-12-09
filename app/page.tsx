import { HeroSection } from "@/components/hero-section"
import { VisionSection } from "@/components/vision-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { ProofSection } from "@/components/proof-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <VisionSection />
      <FeaturesSection />
      <PricingSection />
      <ProofSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
