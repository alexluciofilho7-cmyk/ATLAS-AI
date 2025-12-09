// Custom SVG icons for Atlas IA modules with biomedical-tech aesthetic

export function TrainingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Periodização estilizada com marcações de carga - barra de progressão com intelligence */}
      <rect x="4" y="10" width="16" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Marcações de carga progressiva */}
      <circle cx="6" cy="11.5" r="2" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="11.5" r="2.5" fill="currentColor" opacity="0.9" />
      <circle cx="18" cy="11.5" r="3" fill="currentColor" opacity="1" />

      {/* Setas de progressão */}
      <path d="M6 8 L6 6 M12 7.5 L12 5 M18 7 L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Base de apoio */}
      <line x1="2" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

export function DietIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Prato circular dividido em 3 segmentos de macros - precisão alimentar */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Divisão em 3 macros principais */}
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 12 A9 9 0 0 1 3 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M3 12 A9 9 0 0 1 18 5" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Centro de balanceamento */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.7" />

      {/* Marcas de precisão */}
      <circle cx="12" cy="4.5" r="0.8" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="12" r="0.8" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="19.5" r="0.8" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function SleepIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Lua com anel orbital e ondas de ciclo - qualidade do sono */}
      <path
        d="M18 10c1.5 2 2.5 4.5 2.5 7.5 0 5.2-4.3 9.5-9.5 9.5-3 0-5.5-1-7.5-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Anel orbital ao redor da lua */}
      <circle cx="12" cy="12.5" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />

      {/* Ponto focal da lua */}
      <circle cx="13" cy="11" r="2" fill="currentColor" opacity="0.8" />

      {/* Ondas de ciclo de sono */}
      <path d="M6 16 Q7 15 8 16 T10 16" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M5 18.5 Q6.5 17 8 18.5 T11 18.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Halo sutil */}
      <circle cx="12" cy="12.5" r="5.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
    </svg>
  )
}

export function TestosteroneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Onda elétrica dentro de hexágono biomédico */}
      <path d="M12 2 L18 6 L18 14 L12 18 L6 14 L6 6 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Raio de energia dentro */}
      <path
        d="M11 7 L13 10 L11 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Núcleo energético */}
      <circle cx="12" cy="10" r="1.2" fill="currentColor" opacity="0.8" />

      {/* Aura de energia */}
      <circle cx="12" cy="10" r="4.5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
    </svg>
  )
}

export function PostureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Coluna estilizada com linhas de alinhamento - biomecânica */}
      {/* Cabeça */}
      <circle cx="12" cy="3" r="1.8" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Coluna vertebral */}
      <line x1="12" y1="4.8" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />

      {/* Vértebras */}
      <circle cx="12" cy="7" r="0.9" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="13" r="1.1" fill="currentColor" opacity="0.9" />
      <circle cx="12" cy="16" r="0.9" fill="currentColor" opacity="0.8" />

      {/* Linhas de alinhamento biomecânico */}
      <line x1="8" y1="13" x2="10.5" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="13.5" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Eixo de postura */}
      <line x1="6" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  )
}

export function CompulsionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Cérebro com circuito regulador - controle comportamental */}
      {/* Forma geral do cérebro estilizado */}
      <path d="M7 12 C7 9 8 6 12 5 C16 6 17 9 17 12" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Lobos */}
      <circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8" />
      <circle cx="15" cy="10" r="1.8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8" />

      {/* Núcleo central (pré-frontal) - controle */}
      <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.7" />

      {/* Circuito regulador em volta */}
      <circle cx="12" cy="10" r="5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" fill="none" />

      {/* Conexões neurais sutis */}
      <path d="M9 10 L12 10 M15 10 L12 10" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M12 5.5 L12 8 M12 12 L12 14.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export function VisionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Scanner radar com camadas e marcações de medição - dashboard 360° */}
      {/* Anéis concêntricos do radar */}
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.6" fill="none" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />

      {/* Centro do scanner */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />

      {/* Marcas de medição (cardeais) */}
      <line x1="12" y1="0.5" x2="12" y2="2.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <line x1="12" y1="21.5" x2="12" y2="23.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <line x1="0.5" y1="12" x2="2.5" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <line x1="21.5" y1="12" x2="23.5" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.7" />

      {/* Pontos diagonais */}
      <line x1="3" y1="3" x2="4.5" y2="4.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="20" x2="21.5" y2="21.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="21" y1="3" x2="20" y2="4.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="3" y1="21" x2="4.5" y2="19.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}
