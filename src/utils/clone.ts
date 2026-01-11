/**
 * Realiza deep clone de objetos complexos
 * Usa structuredClone nativo quando disponível, fallback para JSON
 * 
 * IMPORTANTE: Em produção com dados de API/LLM, deep clone é essencial para:
 * - Evitar compartilhamento de referências entre objetos
 * - Garantir imutabilidade total do state
 * - Prevenir bugs sutis de mutação acidental
 * - Permitir histórico/undo sem corrupção de dados
 */
export function deepClone<T>(obj: T): T {
  // Usa structuredClone nativo (mais rápido e suporta Date, Map, Set, etc)
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj)
  }

  // Fallback para JSON (funciona para objetos simples)
  // Limitações: perde métodos, undefined, Symbol, Function
  // Mas para dados de API/LLM (JSON puro), funciona perfeitamente
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Clona um objeto e permite override de propriedades específicas
 * Garante que propriedades aninhadas sejam deep cloned
 */
export function cloneWithOverride<T extends object>(obj: T, overrides: Partial<T>): T {
  const cloned = deepClone(obj)
  
  // Aplica overrides também com deep clone para garantir imutabilidade total
  Object.keys(overrides).forEach((key) => {
    const typedKey = key as keyof T
    const value = overrides[typedKey]
    
    if (value !== undefined) {
      // Se o valor é um objeto, faz deep clone dele também
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        cloned[typedKey] = deepClone(value) as T[keyof T]
      } else {
        cloned[typedKey] = value as T[keyof T]
      }
    }
  })
  
  return cloned
}
