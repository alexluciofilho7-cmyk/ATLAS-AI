"use server"

export interface LeadData {
  name: string
  email: string
  countryCode: string
  phone: string
  timestamp: string
}

export async function submitLead(data: LeadData) {
  try {
    if (!data.name || !data.email || !data.phone) {
      return { success: false, error: "Todos os campos são obrigatórios." }
    }

    console.log("[Atlas IA Lead] New lead submitted:", {
      name: data.name,
      email: data.email,
      phone: `${data.countryCode} ${data.phone}`,
      timestamp: data.timestamp,
    })

    // Example integrations:
    // - Save to database: await db.leads.create({ data })
    // - Send to CRM API: await fetch('your-crm-api', { method: 'POST', body: JSON.stringify(data) })
    // - Send to email: await sendEmail({ to: 'leads@atlas.com', subject: 'New Lead', body: JSON.stringify(data) })

    // For now, we'll just log it. Add your preferred storage method here.

    return { success: true }
  } catch (error) {
    console.error("[Atlas IA Lead] Error submitting lead:", error)
    return { success: false, error: "Erro ao processar. Tente novamente." }
  }
}
