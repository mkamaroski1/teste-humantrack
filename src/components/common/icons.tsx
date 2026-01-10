// Importa os ícones SVG baixados
import userIconSvg from '../../assets/icons/user.svg'
import infoIconSvg from '../../assets/icons/info.svg'
import wandIconSvg from '../../assets/icons/wand.svg'
import copyIconSvg from '../../assets/icons/copy.svg'

type IconProps = {
  className?: string
}

// Ícones usando os SVGs baixados
export function UserIcon({ className }: IconProps) {
  return <img src={userIconSvg} alt="" className={className ?? 'h-4 w-4'} />
}

export function InfoIcon({ className }: IconProps) {
  return <img src={infoIconSvg} alt="" className={className ?? 'h-4 w-4'} />
}

export function WandIcon({ className }: IconProps) {
  return <img src={wandIconSvg} alt="" className={className ?? 'h-4 w-4'} />
}

export function CopyIcon({ className }: IconProps) {
  return <img src={copyIconSvg} alt="" className={className ?? 'h-4 w-4'} />
}

// Ícones inline (que não têm versão baixada)
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? 'h-5 w-5 text-slate-500'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16M9 3v4M15 3v4" strokeLinecap="round" />
    </svg>
  )
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? 'h-4 w-4 text-rose-600'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  )
}

export function AiIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? 'h-6 w-6 text-primary'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4.5" y="5.5" width="12" height="13" rx="2.5" />
      <path d="M7.5 15.5 10 8.5l2.5 7" />
      <path d="M8.4 13.2h3.2" />
      <path d="M14.5 10v4.5" />
      <path d="M16.5 7.5 17.7 6" />
      <path d="M19.5 8 17.7 6" />
      <path d="M18 5 17.7 6" />
    </svg>
  )
}

