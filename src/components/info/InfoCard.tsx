import type { ReactNode } from 'react'

type InfoCardProps = {
  title: string
  description: string | ReactNode
  children?: ReactNode
}

export function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-primary">{title}</h2>
        <p className="text-sm leading-relaxed text-primary">{description}</p>
      </div>
      {children}
    </div>
  )
}

