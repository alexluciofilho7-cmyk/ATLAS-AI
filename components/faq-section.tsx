import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "O Atlas monta treino para casa ou só academia?",
    answer:
      "O sistema adapta para ambos. No cadastro, você informa quais equipamentos tem (ou se não tem nenhum) e a IA cria o treino mais eficiente possível com o que está disponível.",
  },
  {
    question: "Sou iniciante total, consigo usar?",
    answer:
      "Sim. O onboarding do app nivela sua experiência. Se você nunca treinou, o Atlas começa com uma fase de base e aprendizado motor para evitar lesões.",
  },
  {
    question: "É um robô ou tem um humano por trás?",
    answer:
      "É uma Inteligência Artificial avançada, treinada com conhecimento de treinadores de elite e nutricionistas. Ela está disponível 24/7 com a precisão da máquina e linguagem natural.",
  },
  {
    question: "Como funciona o cancelamento?",
    answer:
      "Sem burocracia. Você pode cancelar sua assinatura direto pelo painel do usuário a qualquer momento. Sem ligações, sem letras miúdas.",
  },
  {
    question: "O que acontece se eu não gostar?",
    answer:
      "Você tem 7 dias de garantia incondicional. Se achar que o Atlas não é para você, devolvemos 100% do seu investimento.",
  },
]

export function FaqSection() {
  return (
    <section className="relative bg-[#0a1628] py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-400">FAQ</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">Dúvidas Frequentes</h2>
          <p className="text-lg text-slate-400">Tudo que você precisa saber antes de começar.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-slate-800 bg-[#0d1f35]/50 px-6 backdrop-blur-sm data-[state=open]:border-teal-500/30"
            >
              <AccordionTrigger className="py-5 text-left font-semibold text-white hover:text-teal-400 hover:no-underline [&[data-state=open]]:text-teal-400">
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
