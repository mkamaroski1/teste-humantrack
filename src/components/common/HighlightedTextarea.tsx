import { WandIcon } from './icons'

type Props = {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  rows?: number
  isHighlighted?: boolean
  hasError?: boolean
}

export function HighlightedTextarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 3,
  isHighlighted = false,
  hasError = false,
}: Props) {
  const textareaClasses = `w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 ${
    hasError ? 'border-red-400' : isHighlighted ? 'border-transparent' : 'border-slate-200'
  }`

  if (isHighlighted) {
    return (
      <div className="relative rounded-xl bg-[linear-gradient(120deg,#7c7cff,#2dd4ff,#4ef0a3)] p-[2px]">
        <textarea
          id={id}
          rows={rows}
          className={textareaClasses}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="pointer-events-none absolute -top-4 -right-4">
          <WandIcon className="h-4 w-4 text-primary-purple" />
        </span>
      </div>
    )
  }

  return (
    <textarea
      id={id}
      rows={rows}
      className={textareaClasses}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
