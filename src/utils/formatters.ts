/**
 * Formata um número de telefone brasileiro no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 * @param value - String com o número de telefone (pode conter caracteres não numéricos)
 * @returns String formatada com máscara de telefone
 */
export function formatPhone(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '')

  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)

  // Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (limited.length <= 2) {
    return limited
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
  } else if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`
  }
}
