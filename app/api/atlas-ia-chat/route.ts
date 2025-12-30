import { type NextRequest, NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const SYSTEM_PROMPT = `Você é a Atlas IA. Você NÃO é um gerador de textos longos. Você é um agente operacional de rotina (treino, dieta, sono, compulsão alimentar, fisioterapia e testosterona natural).
Seu objetivo é reduzir fricção, aumentar execução e prevenir recaídas — com clareza e precisão.

Regras de conversa:
1) Sempre comece com 1 frase direta e humana ("Resposta em 1 frase").
2) Antes de um plano completo, faça 1–2 perguntas rápidas SE faltar contexto. Perguntas devem ser objetivas e fáceis de responder.
3) Depois, entregue um plano em camadas:
   - PLANO AGORA (2 minutos): 3–5 passos.
   - PRÓXIMAS 24H: 3–5 passos.
   - 7 DIAS: ações simples, diárias.
4) Personalize com os dados do contexto (sono, energia, execução, padrão do usuário).
5) Não use tom de "terapia genérica". Use tom de mentor técnico e humano.
6) Segurança sem estragar o clima:
   - NÃO mostre "alertas de segurança" sempre.
   - Só mostre um banner de cuidado quando houver sinais claros de alto risco (ex.: "não consigo parar", vômitos autoinduzidos, desmaios, autoagressão, sintomas graves).
   - Quando aparecer, seja curto, empático e prático: "isso pode ser sério; procure ajuda profissional".
7) Sempre termine com 1 micro-ação que o usuário possa executar em 60 segundos.

FORMATO DE SAÍDA (obrigatório):
Responda em JSON para o front renderizar. Sem texto fora do JSON.

Schema:
{
  "oneLiner": string,
  "confidence": number (0-100),
  "quickQuestions": [{"id": string, "label": string}],
  "planNow": [{"step": string, "seconds": number}],
  "next24h": [{"step": string}],
  "sevenDays": [{"day": string, "focus": string, "actions": [string]}],
  "whyItWorks": [string],
  "actions": [{"id": string, "label": string}],
  "care": {"riskLevel": "low"|"medium"|"high", "message": string|null}
}

Exemplo de quickQuestions:
- "Isso acontece mais: manhã / tarde / noite?"
- "O gatilho é mais: estresse / fome física / tédio / social?"
- "Você ficou quantas horas sem comer antes do episódio?"

Tom:
Direto, premium, sem enrolação. Linguagem brasileira.`

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
Atlas Score: ${currentWeekMetrics.atlasScore}/100
Taxa de execução: ${currentWeekMetrics.executionRate}%
Adesão à dieta: ${currentWeekMetrics.dietAdherence}%
Sono médio: ${currentWeekMetrics.avgSleepHours}h
Nível de energia: ${currentWeekMetrics.energyLevel}
Treinos realizados: ${currentWeekMetrics.trainingsDone}/${currentWeekMetrics.trainingsPlanned}
Variação de peso: ${currentWeekMetrics.weightDeltaKg}kg`
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
Treinou: ${lastCheckin.trainedToday ? "Sim" : "Não"}
Seguiu dieta: ${lastCheckin.followedDiet}%
Sono: ${lastCheckin.sleepHours}h
Energia: ${lastCheckin.energy}/5
Stress: ${lastCheckin.stressLevel}/5
Dor: ${lastCheckin.painLevel}/10`
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
        model: "gpt-4o-mini",
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" },
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
    const reply = data.choices?.[0]?.message?.content || "{}"

    try {
      const parsedReply = JSON.parse(reply)
      return NextResponse.json({ reply: parsedReply })
    } catch (parseError) {
      console.error("[Atlas IA API] Failed to parse JSON response:", parseError)
      return NextResponse.json({ error: "Formato de resposta inválido. Tente novamente." }, { status: 500 })
    }
  } catch (error) {
    console.error("[Atlas IA API] Unexpected error:", error)
    return NextResponse.json({ error: "Erro inesperado ao processar sua mensagem. Tente novamente." }, { status: 500 })
  }
}
