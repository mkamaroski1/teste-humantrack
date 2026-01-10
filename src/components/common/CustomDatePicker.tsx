import { useState, useRef, useEffect } from 'react'
import { CalendarIcon } from './icons'

type CustomDatePickerProps = {
  value: string
  onChange: (value: string) => void
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(value || '')
  const [inputValue, setInputValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date()
  const [viewMonth, setViewMonth] = useState(currentDate.getMonth())
  const [viewYear, setViewYear] = useState(currentDate.getFullYear())

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

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate()
  }

  function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay()
  }

  function formatDateDisplay(dateStr: string) {
    if (!dateStr) return ''
    const date = new Date(dateStr + 'T00:00:00')
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  function formatDateInput(value: string): string {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 8 dígitos (DDMMAAAA)
    const limited = numbers.slice(0, 8)
    
    // Aplica a máscara DD/MM/AAAA
    if (limited.length <= 2) {
      return limited
    } else if (limited.length <= 4) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`
    } else {
      return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`
    }
  }

  function parseInputToISO(input: string): string | null {
    // Espera formato DD/MM/AAAA
    const parts = input.split('/')
    if (parts.length !== 3) return null
    
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const year = parseInt(parts[2], 10)
    
    // Validação básica
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null
    if (day < 1 || day > 31) return null
    if (month < 0 || month > 11) return null
    if (year < 1900 || year > 2100) return null
    
    const date = new Date(year, month, day)
    if (date.getDate() !== day || date.getMonth() !== month) return null
    
    return date.toISOString().split('T')[0]
  }

  // Sincroniza inputValue com selectedDate
  useEffect(() => {
    if (selectedDate) {
      setInputValue(formatDateDisplay(selectedDate))
    } else {
      setInputValue('')
    }
  }, [selectedDate])

  function handleDateSelect(day: number) {
    const date = new Date(viewYear, viewMonth, day)
    const formatted = date.toISOString().split('T')[0]
    setSelectedDate(formatted)
    onChange(formatted)
    setIsOpen(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatDateInput(e.target.value)
    setInputValue(formatted)
  }

  function handleInputBlur() {
    // Tenta converter a data digitada quando o usuário sai do campo
    if (inputValue.length === 10) {
      const isoDate = parseInputToISO(inputValue)
      if (isoDate) {
        setSelectedDate(isoDate)
        onChange(isoDate)
        // Atualiza a visualização do calendário
        const date = new Date(isoDate + 'T00:00:00')
        setViewMonth(date.getMonth())
        setViewYear(date.getFullYear())
      } else {
        // Data inválida - volta para o valor anterior
        if (selectedDate) {
          setInputValue(formatDateDisplay(selectedDate))
        } else {
          setInputValue('')
        }
      }
    } else if (inputValue.length === 0) {
      // Limpa a data
      setSelectedDate('')
      onChange('')
    } else {
      // Entrada incompleta - volta para o valor anterior
      if (selectedDate) {
        setInputValue(formatDateDisplay(selectedDate))
      } else {
        setInputValue('')
      }
    }
  }

  function previousMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(viewMonth, viewYear)
  const firstDayOfMonth = getFirstDayOfMonth(viewMonth, viewYear)
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-9" />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = selectedDate && new Date(selectedDate + 'T00:00:00').getDate() === day &&
      new Date(selectedDate + 'T00:00:00').getMonth() === viewMonth &&
      new Date(selectedDate + 'T00:00:00').getFullYear() === viewYear
    
    days.push(
      <button
        key={day}
        type="button"
        onClick={() => handleDateSelect(day)}
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition ${
          isSelected
            ? 'bg-primary-light font-semibold text-white'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        {day}
      </button>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 shadow-sm transition ${
          isOpen
            ? 'border-indigo-400 ring-2 ring-indigo-100'
            : 'border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'
        }`}
      >
        <CalendarIcon />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder="Ex: 21/12/2025"
          className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          maxLength={10}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 text-slate-400 transition hover:text-slate-600"
        >
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 min-w-[280px]">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={previousMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-sm font-semibold text-slate-900">
              {monthNames[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {dayNames.map((dayName, index) => (
              <div key={index} className="mb-1 text-xs font-medium text-slate-500">
                {dayName}
              </div>
            ))}
            {days}
          </div>
        </div>
      )}
    </div>
  )
}
