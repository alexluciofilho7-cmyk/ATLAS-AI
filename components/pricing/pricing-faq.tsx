"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Posso trocar de plano depois?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, pagaremos apenas a diferença proporcional. Se fizer downgrade, o novo preço valerá a partir do próximo período de cobrança.",
  },
  {
    question: "Tem garantia?",
    answer:
      "Oferecemos 7 dias de teste completamente grátis. Se em 7 dias você não gostar, basta cancelar sem nenhuma justificativa ou cobrança. Após isso, você tem direito ao reembolso dentro dos primeiros 30 dias se solicitar via suporte.",
  },
  {
    question: "O que acontece se eu cancelar?",
    answer:
      "Você pode cancelar sua assinatura a qualquer momento. Continuará tendo acesso até o final do período pago. Se pagar anualmente e cancelar antes do fim do ano, terá direito ao reembolso proporcional dos meses não utilizados.",
  },
  {
    question: "Posso começar no Básico e ir subindo?",
    answer:
      "Claro! Recomendamos começar no plano Performance porque ele oferece a melhor relação custo-benefício com suporte IA completo. Mas você pode começar onde se sentir confortável e fazer upgrade quando quiser.",
  },
  {
    question: "O plano anual é cobrado à vista?",
    answer:
      "Sim! O plano anual é cobrado em uma única parcela no início. Para planos mensais, a cobrança é recorrente todo mês. Você pode escolher entre cartão de crédito, boleto ou PIX.",
  },
]

export function PricingFAQ() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Dúvidas Frequentes</h2>
          <p className="text-lg text-slate-400">Tudo que você precisa saber sobre os planos</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="rounded-xl border border-slate-800/50 bg-gradient-to-r from-[#0d2535]/50 via-[#0a1628]/50 to-[#0d1f35]/50 px-6 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#0d2535]/80 data-[state=open]:via-[#0a1628]/80 data-[state=open]:to-[#0d1f35]/80"
            >
              <AccordionTrigger className="py-4 text-left font-semibold text-white hover:text-teal-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-slate-300">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
