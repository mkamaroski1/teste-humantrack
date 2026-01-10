import { useState, useRef, useEffect } from 'react'

type Option = {
  value: string
  label: string
}

type CustomSelectProps = {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  error?: boolean
}

export function CustomSelect({ value, onChange, options, placeholder, error }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)
  const displayText = selectedOption?.label || placeholder || 'Selecione...'
  const isPlaceholder = !selectedOption

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  function handleSelect(optionValue: string) {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2.5 text-left text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-100 ${
          error
            ? 'border-red-400 focus:border-red-400'
            : isOpen
              ? 'border-indigo-400 ring-2 ring-indigo-100'
              : 'border-slate-200 hover:border-slate-300'
        } ${isPlaceholder ? 'text-slate-400' : 'text-slate-900'}`}
      >
        <span className="truncate">{displayText}</span>
        <svg
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                disabled={option.value === ''}
                className={`block w-full px-4 py-2.5 text-left text-sm transition ${
                  option.value === value
                    ? 'bg-indigo-50 font-medium text-indigo-700'
                    : option.value === ''
                      ? 'cursor-default text-slate-400'
                      : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
