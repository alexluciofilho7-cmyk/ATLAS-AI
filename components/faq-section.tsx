import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "A Atlas IA funciona para iniciantes ou só para quem já treina?",
    answer:
      "Funciona para ambos. No onboarding, você informa seu nível de experiência. Para iniciantes, a Atlas começa com uma fase de base e aprendizado motor. Para avançados, ela otimiza o que você já faz com ajustes baseados em dados.",
  },
  {
    question: "Preciso de equipamentos de academia ou funciona em casa?",
    answer:
      "O sistema adapta para ambos. Você informa quais equipamentos tem (ou se não tem nenhum) e a IA cria o treino mais eficiente possível com o que está disponível.",
  },
  {
    question: "A Atlas substitui um personal trainer ou nutricionista?",
    answer:
      "A Atlas é um sistema de suporte inteligente, não um substituto de profissionais. Ela potencializa seus resultados com personalização e ajustes contínuos. Se você tem condições médicas específicas, sempre consulte um profissional.",
  },
  {
    question: "É uma IA de verdade ou um chatbot genérico?",
    answer:
      "É uma IA avançada, treinada especificamente com conhecimento de treinadores de elite, nutricionistas esportivos e fisiologistas. Ela está disponível 24/7 com a precisão da máquina e linguagem natural.",
  },
  {
    question: "O que acontece se eu errar uma refeição ou faltar um treino?",
    answer:
      "Nada. A Atlas recalcula seu protocolo automaticamente. Um deslize não mata seu progresso. O sistema adapta as próximas refeições/treinos para compensar e manter você no caminho certo.",
  },
  {
    question: "Como funciona o módulo de testosterona natural?",
    answer:
      "O módulo trabalha com estratégias comprovadas por ciência: otimização de micronutrientes (zinco, magnésio, vitamina D), timing de alimentação, qualidade do sono e redução de estresse. Tudo natural, sem substâncias.",
  },
  {
    question: "Posso usar a Atlas junto com o acompanhamento de um médico?",
    answer:
      "Sim, e recomendamos. A Atlas gera relatórios que você pode compartilhar com seu médico ou nutricionista. O sistema é um complemento ao acompanhamento profissional, não um substituto.",
  },
  {
    question: "E se eu não gostar? Tem garantia?",
    answer:
      "Sim. Você tem 7 dias de teste gratuito e depois mais 7 dias de garantia incondicional. Se achar que a Atlas não é para você, devolvemos 100% do seu investimento. Sem burocracia, sem letras miúdas.",
  },
  {
    question: "Como funciona o cancelamento?",
    answer:
      "Sem burocracia. Você pode cancelar sua assinatura direto pelo painel do usuário a qualquer momento. Sem ligações, sem emails de retenção, sem letras miúdas. Cancelou, acabou.",
  },
  {
    question: "A Atlas funciona para mulheres também?",
    answer:
      "A Atlas foi otimizada para homens que buscam estética e performance natural. Estamos desenvolvendo uma versão específica para mulheres com considerações hormonais e objetivos diferentes. Em breve.",
  },
  {
    question: "Preciso de equipamentos ou apps adicionais?",
    answer:
      "Não. A Atlas funciona 100% no navegador ou app. Se você tiver um smartwatch ou dispositivo de sono, pode integrá-lo para dados mais precisos, mas não é obrigatório.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Depende do seu ponto de partida e consistência. Usuários que seguem o protocolo por 90 dias reportam em média +4kg de massa magra e -6% de gordura corporal. Primeiras mudanças visíveis geralmente em 4-6 semanas.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative bg-[#050a14] py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
            <HelpCircle className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">FAQ</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">Dúvidas Frequentes</h2>
          <p className="text-lg text-slate-400">Tudo que você precisa saber antes de começar sua transformação.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-slate-800/50 bg-slate-900/30 px-6 backdrop-blur-sm data-[state=open]:border-blue-500/30"
            >
              <AccordionTrigger className="py-5 text-left font-semibold text-white hover:text-blue-400 hover:no-underline [&[data-state=open]]:text-blue-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-slate-400 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
