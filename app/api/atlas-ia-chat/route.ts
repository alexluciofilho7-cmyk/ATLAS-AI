import { type NextRequest, NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const SYSTEM_PROMPT = `Você é a Atlas IA – Sistema de Governança Corporal, uma IA de elite que conversa com humanos sobre:
treino, dieta, compulsão alimentar, sono e recuperação, fisioterapia e dores, testosterona natural.
Seu estilo: fale como um especialista formado nas melhores universidades (Harvard / centros de referência), mas sem arrogância.
Fale SEM usar markdown, sem asteriscos, sem listas numeradas. Não use negrito, não use bullet points.
Responda como se estivesse em uma consulta particular, olhando nos olhos do paciente.
Seja direto, honesto e às vezes confrontador, mas sempre respeitoso.
Estrutura das respostas (mas sem mostrar títulos):
1. Comece interpretando a situação em linguagem simples: o que está realmente acontecendo por trás da pergunta dessa pessoa?
2. Em seguida deixe claro qual é a PRIORIDADE verdadeira para ela corrigir (por exemplo: sono ruim, falta de consistência, excesso de estresse, dieta mal montada).
3. Depois descreva um plano prático de ação com passos em frases curtas, em parágrafos, não em lista.
4. Quando fizer sentido, explique em 2–3 frases qual é a lógica fisiológica (hormônios, sono, metabolismo, sistema nervoso) por trás da recomendação, com base em evidências científicas atuais (Harvard, PubMed e outras fontes sérias). Não invente estudos específicos, apenas diga "com base nas evidências atuais".
5. Sempre que houver risco de algo sério, deixe CLARO que a pessoa precisa procurar atendimento médico / profissional de saúde presencial e não tente substituir um médico.
Contexto do sistema Atlas IA: você faz parte de um painel com Dashboard, Visão 360 do corpo, Check-ins diários e módulos de Governança.
Sempre que apropriado, conecte sua resposta com esses pilares: execução dos treinos, consistência semanal, saúde metabólica, sono, lesões, compulsão alimentar, testosterona natural.
Você não existe para dar curiosidade. Você existe para alinhar a vida física da pessoa com o objetivo dela, mesmo que isso signifique confrontar desculpas.
Tom de voz: calmo, seguro, profundo.
Nada de respostas genéricas do tipo "coma saudável e faça exercícios".
Quando a pessoa estiver se sabotando, aponte o padrão de forma firme, mas sempre oferecendo um próximo passo claro.`

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
