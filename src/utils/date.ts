/**
 * Retorna o número de dias em um determinado mês/ano
 */
export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Retorna o dia da semana do primeiro dia do mês (0 = Domingo, 6 = Sábado)
 */
export function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay()
}

/**
 * Formata uma data ISO (YYYY-MM-DD) para exibição (DD/MM/YYYY)
 */
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T00:00:00')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Formata input de data com máscara DD/MM/AAAA
 */
export function formatDateInput(value: string): string {
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

/**
 * Converte input DD/MM/AAAA para formato ISO (YYYY-MM-DD)
 * @returns String ISO ou null se inválido
 */
export function parseInputToISO(input: string): string | null {
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

/**
 * Valida se uma data é válida
 */
export function isValidDate(day: number, month: number, year: number): boolean {
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false
  if (day < 1 || day > 31) return false
  if (month < 0 || month > 11) return false
  if (year < 1900 || year > 2100) return false

  const date = new Date(year, month, day)
  return date.getDate() === day && date.getMonth() === month
}
