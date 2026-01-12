type IconProps = {
  className?: string
}

// Ícones inline
export function UserIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? 'h-4 w-4 text-[#71717A]'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.6667 14V12.6667C12.6667 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7073 10 10 10H6.00001C5.29277 10 4.61449 10.281 4.11439 10.781C3.61429 11.2811 3.33334 11.9594 3.33334 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47277 7.33333 8.00001 7.33333C6.52725 7.33333 5.33334 6.13943 5.33334 4.66667C5.33334 3.19391 6.52725 2 8.00001 2C9.47277 2 10.6667 3.19391 10.6667 4.66667Z" />
    </svg>
  )
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? 'h-4 w-4 text-indigo-600'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M8 10.6666V7.99998" />
      <path d="M8 5.33331H8.00667" />
    </svg>
  )
}

export function WandIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? 'h-4 w-4 text-[#5451CF]'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9.33333 4.66665L11.3333 6.66665M3.33333 3.99998V6.66665M12.6667 9.33331V12M6.66667 1.33331V2.66665M4.66667 5.33331H2M14 10.6666H11.3333M7.33333 1.99998H6M14.4265 2.42668L13.5732 1.57334C13.4982 1.49755 13.4089 1.43739 13.3105 1.39633C13.2121 1.35527 13.1065 1.33413 12.9999 1.33413C12.8932 1.33413 12.7877 1.35527 12.6893 1.39633C12.5908 1.43739 12.5015 1.49755 12.4265 1.57334L1.5732 12.4267C1.49741 12.5017 1.43725 12.591 1.39619 12.6894C1.35513 12.7878 1.33398 12.8934 1.33398 13C1.33398 13.1066 1.35513 13.2122 1.39619 13.3106C1.43725 13.409 1.49741 13.4983 1.5732 13.5733L2.42653 14.4267C2.50108 14.5033 2.59022 14.5642 2.6887 14.6057C2.78717 14.6473 2.89298 14.6687 2.99987 14.6687C3.10676 14.6687 3.21256 14.6473 3.31104 14.6057C3.40951 14.5642 3.49865 14.5033 3.5732 14.4267L14.4265 3.57334C14.5031 3.4988 14.564 3.40965 14.6056 3.31118C14.6472 3.21271 14.6686 3.1069 14.6686 3.00001C14.6686 2.89312 14.6472 2.78731 14.6056 2.68884C14.564 2.59037 14.5031 2.50122 14.4265 2.42668Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? 'h-4 w-4 text-[#71717A]'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.66665 10.6667C1.93331 10.6667 1.33331 10.0667 1.33331 9.33333V2.66666C1.33331 1.93333 1.93331 1.33333 2.66665 1.33333H9.33331C10.0666 1.33333 10.6666 1.93333 10.6666 2.66666M6.66665 5.33333H13.3333C14.0697 5.33333 14.6666 5.93028 14.6666 6.66666V13.3333C14.6666 14.0697 14.0697 14.6667 13.3333 14.6667H6.66665C5.93027 14.6667 5.33331 14.0697 5.33331 13.3333V6.66666C5.33331 5.93028 5.93027 5.33333 6.66665 5.33333Z" />
    </svg>
  )
}

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
