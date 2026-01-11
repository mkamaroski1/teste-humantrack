import type { Goal } from '../types/goals'
import { deepClone } from './clone'

export function createEmptyGoal(index: number): Goal {
  return {
    id: `goal-${Date.now()}-${index}`,
    name: '',
    baseline: '0',
    levels: { '2': '', '1': '', '0': '', '-1': '', '-2': '' },
  }
}

/**
 * Duplica uma meta com deep clone para garantir imutabilidade
 * 
 * CRÍTICO: Em produção com dados de API/LLM, a meta pode conter:
 * - metadata: { suggestedBy, confidence, timestamps[] }
 * - history: GoalVersion[]
 * - attachments: File[]
 * 
 * Deep clone garante que a duplicação não compartilhe referências
 */
export function duplicateGoal(goal: Goal, newId: string): Goal {
  const cloned = deepClone(goal)
  cloned.id = newId
  return cloned
}
