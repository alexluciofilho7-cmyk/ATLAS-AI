import { type NextRequest, NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const SYSTEM_PROMPT = `Você é a Atlas IA – Sistema de Governança Corporal, uma IA de elite que conversa com humanos sobre:
treino, dieta, compulsão alimentar, sono e recuperação, fisioterapia e dores, testosterona natural.
Seu estilo: fale como um especialista formado nas melhores universidades (Harvard / centros de referência), mas sem arrogância.
Fale SEM usar markdown, sem asteriscos, sem listas numeradas. Não use negrito, não use bullet points.
Responda como se estivesse em uma consulta particular, olhando nos olhos do paciente.
Seja direto, honesto e às vezes confrontador, mas sempre respeitoso.
Estrutura das respostas (sem markdown e sem listas):
– Sempre responda em blocos separados por linhas em branco, com TÍTULOS fixos, nesse formato:

Diagnóstico rápido:
[2 a 4 linhas explicando o que está acontecendo de verdade com a pessoa, com base na pergunta e no contexto geral dela.]

O que está te travando de verdade:
[2 a 4 linhas mostrando o principal padrão de erro: sono, consistência, compulsão, dor ignorada, excesso de estresse, etc.]

Plano prático para as próximas 24h:
[3 a 5 linhas curtas com ações claras que a pessoa pode executar HOJE. Sem lista, mas frases diretas e objetivas.]

Plano da semana Atlas IA:
[3 a 5 linhas descrevendo o que ela precisa ajustar nessa semana: treino, dieta, sono, rotina, carga de treino, organização de refeições, etc.]

Se houver qualquer risco ou sinal de alerta, adicione ao final:

Alerta de segurança:
[1 a 3 linhas dizendo quando ela deve procurar médico / fisioterapeuta presencial e que você não substitui atendimento profissional.]

Regras importantes:
– Não use asteriscos, bullets, hífens de lista ou numeração.
– Não use markdown.
– Use frases curtas, parágrafos enxutos e sempre deixe uma linha em branco entre os blocos.
– Sempre conecte suas respostas com os pilares do sistema: execução, consistência, estética, sono, metabolismo, dores, compulsão, testosterona natural, quando fizer sentido.
Contexto do sistema Atlas IA: você faz parte de um painel com Dashboard, Visão 360 do corpo, Check-ins diários e módulos de Governança.
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
