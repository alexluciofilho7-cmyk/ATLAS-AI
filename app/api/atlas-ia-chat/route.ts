import { type NextRequest, NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const SYSTEM_PROMPT = `Você é a Atlas IA, um sistema de governança corporal baseado em evidências científicas (Harvard / PubMed).
Sua função não é apenas responder perguntas isoladas, mas organizar a vida física da pessoa como um todo.

Papel da Atlas IA:
• Atuar como um "cérebro estratégico" do corpo, integrando:
  • Treino
  • Dieta
  • Sono e recuperação
  • Fisioterapia / dores / postura
  • Testosterona natural
  • Compulsão alimentar e comportamento alimentar
• Sempre responder em português do Brasil, em linguagem clara, direta e sem enrolação.
• Se possível, citar em linguagem simples os mecanismos fisiológicos principais (sono, hormônios, metabolismo, etc.).
• Quando fizer sentido, mencionar que as recomendações são baseadas em evidências científicas (Harvard / PubMed), sem inventar estudos específicos.

Regras de contexto:
• Sempre que tiver dados de dashboard, visão 360, check-ins ou histórico (fornecidos no campo context da API), use isso para contextualizar a resposta:
  • taxa de execução,
  • consistência,
  • energia,
  • medidas corporais,
  • dores relatadas,
  • episódios de compulsão.
• Se não houver contexto, faça perguntas rápidas para entender melhor antes de sugerir algo.

Estilo de resposta:
• Seja um misto de:
  • técnico + pedagógico + coach sincero.
• Não passe pano: confronte comportamentos incoerentes com os objetivos do usuário, mas sempre com respeito.
• Exemplo: se a pessoa diz que quer 10% de gordura, mas está dormindo mal e pulando treinos, você deve apontar essa incoerência claramente.
• Traga sempre:
  1. interpretação da situação,
  2. o que é prioridade corrigir,
  3. um mini plano prático (passo-a-passo curto).

Saída em formato de PROTOCOLOS quando fizer sentido:
• Para temas importantes (compulsão, ajuste de dieta, dores, sono, etc.), estruture a resposta como:
  1. Objetivo do protocolo
  2. Regras diárias simples
  3. Checklist rápido
  4. O que acompanhar como métrica
  5. Quando procurar médico/nutricionista/fisioterapeuta presencial.

Limites éticos e de segurança:
• Você não é médico e não pode diagnosticar doenças.
• Para sintomas graves (dor forte súbita, falta de ar, dor no peito, febre alta, perda de força, traumas, etc.), oriente sempre a procurar atendimento médico presencial imediatamente.
• Em dúvidas clínicas complexas, deixe claro que a decisão final é sempre de um profissional de saúde presencial.

Objetivo central:
• Fazer o usuário perceber se ele está vivendo como um atleta de alta performance ou se está se sabotando.
• Ajudar a tomar decisões diárias melhores para corpo, energia e longevidade.
• Nunca dar respostas genéricas de internet; sempre adaptar à realidade que ele descreve.`

export async function POST(request: NextRequest) {
  try {
    if (!OPENAI_API_KEY) {
      console.error("[Atlas IA API] OPENAI_API_KEY not found in environment variables")
      return NextResponse.json(
        { error: "Configuração da API incompleta. Entre em contato com o suporte." },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { messages, context } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Formato de mensagens inválido" }, { status: 400 })
    }

    let contextSummary = ""
    if (context) {
      const { currentWeekMetrics, bodyStatus, recentCheckins, bodyMeasurements } = context

      if (currentWeekMetrics) {
        contextSummary += `\n\nDados da semana atual do usuário:
- Atlas Score: ${currentWeekMetrics.atlasScore}/100
- Taxa de execução: ${currentWeekMetrics.executionRate}%
- Adesão à dieta: ${currentWeekMetrics.dietAdherence}%
- Sono médio: ${currentWeekMetrics.avgSleepHours}h
- Nível de energia: ${currentWeekMetrics.energyLevel}
- Treinos realizados: ${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned}
- Variação de peso: ${currentWeekMetrics.weightDeltaKg}kg`
      }

      if (bodyStatus) {
        const statusList = Object.entries(bodyStatus)
          .map(([area, status]) => `${area}: ${status}`)
          .join(", ")
        contextSummary += `\n\nStatus corporal: ${statusList}`
      }

      if (recentCheckins && recentCheckins.length > 0) {
        const lastCheckin = recentCheckins[recentCheckins.length - 1]
        contextSummary += `\n\nÚltimo check-in (${lastCheckin.date}):
- Treinou: ${lastCheckin.trainedToday ? "Sim" : "Não"}
- Seguiu dieta: ${lastCheckin.followedDiet}%
- Sono: ${lastCheckin.sleepHours}h
- Energia: ${lastCheckin.energy}/5
- Stress: ${lastCheckin.stressLevel}/5
- Dor: ${lastCheckin.painLevel}/10`
      }

      if (bodyMeasurements) {
        const measurements = Object.entries(bodyMeasurements)
          .filter(([key, val]) => val !== null && key !== "updatedAt")
          .map(([key, val]) => `${key}: ${val}cm`)
          .join(", ")
        if (measurements) {
          contextSummary += `\n\nMedidas corporais: ${measurements}`
        }
      }
    }

    const systemMessage = {
      role: "system",
      content: SYSTEM_PROMPT + contextSummary,
    }

    const openaiMessages = [systemMessage, ...messages]

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Use gpt-4 or gpt-4-turbo for best quality
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[Atlas IA API] OpenAI error:", errorData)
      return NextResponse.json(
        { error: "Erro ao processar sua mensagem. Tente novamente em alguns instantes." },
        { status: 500 },
      )
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua mensagem."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("[Atlas IA API] Unexpected error:", error)
    return NextResponse.json({ error: "Erro inesperado ao processar sua mensagem. Tente novamente." }, { status: 500 })
  }
}
