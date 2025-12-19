"use server"

import { promises as fs } from "fs"
import path from "path"

export interface LeadData {
  name: string
  email: string
  countryCode: string
  phone: string
  timestamp: string
}

async function saveLeadToFile(data: LeadData) {
  try {
    const leadsDir = path.join(process.cwd(), "data")
    const leadsFile = path.join(leadsDir, "leads.json")

    try {
      await fs.access(leadsDir)
    } catch {
      await fs.mkdir(leadsDir, { recursive: true })
    }

    let leads: LeadData[] = []
    try {
      const fileContent = await fs.readFile(leadsFile, "utf-8")
      leads = JSON.parse(fileContent)
    } catch {
      leads = []
    }

    leads.push(data)
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2))

    return true
  } catch (error) {
    console.error("[Atlas IA] Error saving lead to file:", error)
    return false
  }
}

async function sendEmailNotification(data: LeadData) {
  try {
    // Using a free email API service (Resend, SendGrid, etc.)
    // For production, add your API key to environment variables
    const emailBody = `
      Nova captura de lead - Atlas IA Ativação 7D
      
      Nome: ${data.name}
      E-mail: ${data.email}
      WhatsApp: ${data.countryCode} ${data.phone}
      Data/Hora: ${new Date(data.timestamp).toLocaleString("pt-BR")}
      
      ---
      Este lead foi capturado através do formulário de ativação da Atlas IA.
    `

    console.log("[Atlas IA] Email notification would be sent:", emailBody)

    // TODO: Add your email service here
    // Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'Atlas IA <noreply@atlasia.com>',
    //     to: ['seu-email@exemplo.com'],
    //     subject: 'Novo lead – Atlas IA Ativação 7D',
    //     text: emailBody
    //   })
    // })

    return true
  } catch (error) {
    console.error("[Atlas IA] Error sending email:", error)
    return false
  }
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

    const savedToFile = await saveLeadToFile(data)
    const emailSent = await sendEmailNotification(data)

    if (!savedToFile) {
      console.error("[Atlas IA] Failed to save lead to file")
    }

    if (!emailSent) {
      console.error("[Atlas IA] Failed to send email notification")
    }

    return { success: true }
  } catch (error) {
    console.error("[Atlas IA Lead] Error submitting lead:", error)
    return { success: false, error: "Erro ao processar. Tente novamente." }
  }
}

export async function getLeads(): Promise<LeadData[]> {
  try {
    const leadsFile = path.join(process.cwd(), "data", "leads.json")
    const fileContent = await fs.readFile(leadsFile, "utf-8")
    return JSON.parse(fileContent)
  } catch {
    return []
  }
}
