// Custom SVG icons for Atlas IA modules with biomedical-tech aesthetic

export function TrainingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Tech barbell with load indicators */}
      <rect x="3" y="10" width="18" height="2" fill="currentColor" />
      <rect x="2" y="8" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="20" y="8" width="2" height="6" rx="1" fill="currentColor" />
      <circle cx="6" cy="9" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="9" r="1.5" fill="currentColor" opacity="0.7" />
      <line x1="6" y1="13" x2="6" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="13" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="13" x2="18" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function DietIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Macro grid nutrition plate */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M12 3 A9 9 0 0 1 20.1 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20.1 18 A9 9 0 0 1 12 21" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M3.9 18 A9 9 0 0 1 3.9 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function SleepIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Sleep cycle moon with orbital ring */}
      <path
        d="M19.5 10c0 5.247-4.254 9.5-9.5 9.5-4.87 0-8.931-3.67-9.447-8.387"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.6" />
      <path d="M16 6 Q17 7 16.5 8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d="M8 6 Q7 7 7.5 8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  )
}

export function TestosteroneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Biomedical energy with shield */}
      <path
        d="M8 2L12 4L16 2V8C16 14 12 18 12 18C12 18 8 14 8 8V2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10 10 L12 13 L14 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

export function PostureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Spine with alignment guides */}
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <line x1="12" y1="5.5" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="7" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="9.5" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="14.5" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="17" r="1" fill="currentColor" opacity="0.6" />
      <line x1="8" y1="12" x2="10.5" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="13.5" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

export function CompulsionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Brain circuit with control */}
      <path
        d="M6 8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6" />
      <line x1="8" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="14" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="8" x2="12" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="14" x2="12" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M8 6 L6 8 M16 6 L18 8 M16 18 L18 16 M8 18 L6 16" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

export function VisionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      {/* Radar scanner dashboard */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      <path
        d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M6 6 L8.5 8.5 M17.5 15.5 L15.5 17.5 M17.5 6 L15.5 8.5 M6 17.5 L8.5 15.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
}
