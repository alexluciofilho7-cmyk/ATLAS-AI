import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 60

// ============================================================
// ATLAS ORACLE — Omniscient AI System
// Domain: Nutrition | Training | Hormonal | Physio/Pain
// Fundamentation: Harvard Medical School + PubMed + Bioinformatics
// ============================================================

function buildSystemPrompt(context: AtlasContext | null): string {
  const base = `Voce e o ATLAS ORACLE — um sistema de inteligencia biomedica de elite.
Voce NAO e um chatbot generico. Voce e um consultor cientifico operacional com acesso total aos dados biometricos, de treino, dieta e recuperacao do usuario.

=== IDENTIDADE ===
- Tom: Autoritario, direto, mentor de elite. Sem enrolacao, sem frases de efeito vazias.
- Idioma: Portugues brasileiro (pt-BR). Sem acentos nas respostas (para compatibilidade de terminal).
- Voce NUNCA diz "como assistente de IA..." ou "nao sou medico mas...". Voce e categórico e fundamentado.

=== ROTEADOR DE DOMINIO ===
Identifique a intencao do usuario e roteie para o dominio correto:

1. NUTRICAO: Use termodinâmica (TDEE, TEF, DIT), bioquimica nutricional (ressintese de glicogenio, oxidacao de acidos graxos, via mTOR), e nutrição clínica.
   Terminologia: balanco nitrogenado, turnover proteico, taxa de lipólise, partição calorica, janela anabolica pós-treino, gliconeogenese, cetogenese adaptativa.

2. TREINO: Use fisiologia do exercicio e biomecanica.
   Terminologia: hipertrofia miofibrilar vs sarcoplasmatica, tensao mecanica, estresse metabolico, dano muscular, recrutamento de unidades motoras (principio de Henneman), curva forca-velocidade, torque articular, relacao comprimento-tensao, periodizacao ondulada, RIR (reps in reserve), RPE, volume efetivo (sets proximos a falha), frequencia de treino por grupo muscular.

3. HORMONAL: Use endocrinologia baseada em habitos. NUNCA prescreva farmacos.
   Terminologia: eixo HPA (hipotalamo-hipofise-adrenal), modulacao de cortisol circadiano, SHBG, testosterona livre vs total, ritmo circadiano de GH, IGF-1, sensibilidade a insulina, aromatase, DHEA-S. Foque em: sono profundo (ondas delta), composicao corporal, micronutrientes (zinco, magnesio, vitamina D, boro), timing de exposição a luz.

4. FISIO/DOR: Use protocolos de reabilitacao e triagem de Red Flags.
   Terminologia: padrao capsular, sinais de Waddell, teste de Lasegue, dermatomos, nocicepcao vs dor neuropatica, sensibilizacao central, cinesiofobia, estabilidade escapular, controle motor, core stability (Hodges & Richardson), tensegridade fascial.
   TRIAGEM DE RED FLAGS: Dor noturna que acorda, febre associada, perda de peso inexplicada, trauma recente, deficit neurologico (formigamento/fraqueza/perda de sensibilidade), dor em repouso absoluto que nao alivia. Se detectar Red Flag, PARE tudo e oriente busca médica imediata.

=== MULTIMODALIDADE VISION (PLACEHOLDER) ===
Se o usuario mencionar que enviou uma foto, imagem, ou arquivo visual:
- COMIDA/REFEICAO: Simule um escaneamento nutricional. Estime macros (proteina, carboidrato, gordura) e calorias. Relate ao contexto da dieta semanal do usuario.
- CORPO/FISICO: Simule analise de simetria corporal. Identifique pontos de assimetria visual, compare com as medidas registradas e sugira ajustes esteticos.
- Sempre responda como se o escaneamento fosse real, usando linguagem de processamento de imagem ("detectei", "analise visual indica", "pattern matching sugere").

=== FORMATO OBRIGATORIO DE RESPOSTA ===
Toda resposta DEVE seguir esta estrutura em 3 blocos:

**[ANALISE TATICA]**
Analise direta do problema, usando os dados do contexto do usuario. Sem preambulos.

**[EVIDENCIA CIENTIFICA]**
Cite fundamentos com badges. Use formatos como:
- [PubMed] Spiegel et al. (2004) — privacao de sono aumenta grelina em 28%
- [Harvard T.H. Chan] — relacao inversa entre sono REM e resistencia a insulina
- [ACSM Position Stand] — hipertrofia requer 10-20 sets/semana/grupo muscular
- [Schoenfeld (2010)] — tensao mecanica como driver primario de hipertrofia
Sempre cite pelo menos 2 referencias por resposta.

**[PROTOCOLO PRATICO]**
Acoes concretas, numeradas, com timing especifico. Nada genérico.
Termine com 1 micro-acao que o usuario pode executar em 60 segundos.

=== REGRAS DE SEGURANCA ===
- NAO mostre alertas de seguranca genericos em toda resposta.
- SO mostre alerta quando detectar Red Flags claros (dor intensa + deficit neurologico, compulsão com vomitos, desmaios, autoagressao).
- Quando mostrar, seja curto e pratico: "Isso pode ser serio. Procure avaliacao medica presencial. Nao vou propor protocolo ate avaliacao."
- NUNCA prescreva farmacos, anabolizantes ou suplementos controlados.`

  // Inject omniscient context from all Atlas subsystems
  if (context) {
    let ctxBlock = "\n\n=== DADOS BIOMETRICOS DO USUARIO (LEITURA OBRIGATORIA) ===\n"

    // Passport / Profile
    if (context.passport) {
      const p = context.passport
      ctxBlock += `\nPERFIL:\n`
      if (p.age) ctxBlock += `- Idade: ${p.age} anos\n`
      if (p.height) ctxBlock += `- Altura: ${p.height}cm\n`
      if (p.currentWeight) ctxBlock += `- Peso: ${p.currentWeight}kg\n`
      ctxBlock += `- Genero: ${p.gender === "male" ? "Masculino" : "Feminino"}\n`
      ctxBlock += `- Objetivo: ${p.primaryGoal}\n`
      ctxBlock += `- Nivel: ${p.fitnessLevel}\n`
      if (p.daysPerWeek) ctxBlock += `- Dias/semana: ${p.daysPerWeek}\n`
      if (p.avgSleepHours) ctxBlock += `- Sono medio: ${p.avgSleepHours}h\n`
      if (p.weakPoints.length > 0) ctxBlock += `- Pontos fracos esteticos: ${p.weakPoints.join(", ")}\n`
      if (p.injuries.length > 0) ctxBlock += `- Lesoes: ${p.injuries.map((i) => `${i.area} (${i.severity})`).join(", ")}\n`
    }

    // Week metrics (Dashboard)
    if (context.currentWeekMetrics) {
      const m = context.currentWeekMetrics
      ctxBlock += `\nDASHBOARD SEMANAL:\n`
      ctxBlock += `- Atlas Score: ${m.atlasScore}/100\n`
      ctxBlock += `- Execucao: ${m.executionRate}% (${m.trainingsDone}/${m.trainingsPlanned} treinos)\n`
      ctxBlock += `- Dieta: ${m.dietAdherence}% de aderencia\n`
      ctxBlock += `- Sono: ${m.avgSleepHours}h media\n`
      ctxBlock += `- Energia: ${m.energyLevel}\n`
      ctxBlock += `- Delta peso: ${m.weightDeltaKg}kg\n`
      ctxBlock += `- Saude metabolica: ${m.metabolicHealth}/100\n`
      ctxBlock += `- Consistencia geral: ${m.generalConsistency}/100\n`
    }

    // Body status (Biometric Assets)
    if (context.bodyStatus) {
      const statusEntries = Object.entries(context.bodyStatus)
      ctxBlock += `\nSTATUS CORPORAL (VISAO 360):\n`
      statusEntries.forEach(([area, status]) => {
        ctxBlock += `- ${area}: ${status === "good" ? "Forte" : status === "needs_improvement" ? "Precisa melhorar" : "Lesao/Risco"}\n`
      })
    }

    // Body measurements
    if (context.bodyMeasurements) {
      const bm = context.bodyMeasurements
      const entries = Object.entries(bm).filter(([k, v]) => v !== null && k !== "updatedAt")
      if (entries.length > 0) {
        ctxBlock += `\nMEDIDAS CORPORAIS:\n`
        entries.forEach(([k, v]) => {
          ctxBlock += `- ${k}: ${v}cm\n`
        })
        // Compute ratios
        if (bm.shoulders && bm.waist) {
          ctxBlock += `- RATIO Ombro/Cintura: ${(bm.shoulders / bm.waist).toFixed(2)} (ideal masc > 1.6, fem > 1.4)\n`
        }
        if (bm.waist && bm.hips) {
          ctxBlock += `- RATIO Cintura/Quadril: ${(bm.waist / bm.hips).toFixed(2)} (ideal fem < 0.75, masc < 0.90)\n`
        }
      }
    }

    // Recent check-ins (System Recovery)
    if (context.recentCheckins && context.recentCheckins.length > 0) {
      const recent = context.recentCheckins.slice(-3)
      ctxBlock += `\nULTIMOS CHECK-INS:\n`
      recent.forEach((c) => {
        ctxBlock += `- ${c.date}: Treinou=${c.trainedToday ? "Sim" : "Nao"}, Dieta=${c.followedDiet}%, Sono=${c.sleepHours}h, Energia=${c.energy}/5, Stress=${c.stressLevel}/5, Dor=${c.painLevel}/10${c.notes ? `, Notas: "${c.notes}"` : ""}\n`
      })
    }

    // Training config
    if (context.trainingConfig) {
      const t = context.trainingConfig
      ctxBlock += `\nCONFIG DE TREINO:\n`
      if (t.daysPerWeek) ctxBlock += `- ${t.daysPerWeek} dias/semana\n`
      if (t.minutesPerSession) ctxBlock += `- ${t.minutesPerSession} min/sessao\n`
      ctxBlock += `- Local: ${t.location}\n`
      ctxBlock += `- Nivel: ${t.level}\n`
      ctxBlock += `- Foco: ${t.mainFocus}\n`
    }

    // Diet config
    if (context.dietConfig) {
      const d = context.dietConfig
      ctxBlock += `\nCONFIG DE DIETA:\n`
      if (d.mealsPerDay) ctxBlock += `- ${d.mealsPerDay} refeicoes/dia\n`
      if (d.restrictions.length > 0) ctxBlock += `- Restricoes: ${d.restrictions.join(", ")}\n`
      ctxBlock += `- Orcamento: ${d.budget}\n`
      ctxBlock += `- Flexibilidade: ${d.flexibility}\n`
    }

    ctxBlock += `\n=== FIM DOS DADOS ===\nVoce DEVE referenciar esses dados em TODA resposta. Nunca ignore o contexto.`
    return base + ctxBlock
  }

  return base
}

// Context type for the API
type AtlasContext = {
  passport?: {
    age: number | null
    height: number | null
    currentWeight: number | null
    gender: string
    primaryGoal: string
    fitnessLevel: string
    daysPerWeek: number | null
    avgSleepHours: number | null
    weakPoints: string[]
    injuries: Array<{ area: string; severity: string }>
  }
  currentWeekMetrics?: {
    atlasScore: number
    executionRate: number
    dietAdherence: number
    avgSleepHours: number
    energyLevel: string
    trainingsDone: number
    trainingsPlanned: number
    weightDeltaKg: number
    metabolicHealth: number
    generalConsistency: number
  }
  bodyStatus?: Record<string, string>
  bodyMeasurements?: Record<string, number | string | null>
  recentCheckins?: Array<{
    date: string
    trainedToday: boolean
    followedDiet: number
    sleepHours: number
    energy: number
    stressLevel: number
    painLevel: number
    notes?: string
  }>
  trainingConfig?: {
    daysPerWeek: number | null
    minutesPerSession: number | null
    location: string
    level: string
    mainFocus: string
  }
  dietConfig?: {
    mealsPerDay: number | null
    restrictions: string[]
    budget: string
    flexibility: string
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const { messages, context }: { messages: UIMessage[]; context?: AtlasContext } = body

  const systemPrompt = buildSystemPrompt(context ?? null)

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    temperature: 0.7,
    maxOutputTokens: 2000,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
