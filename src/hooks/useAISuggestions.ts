import { useState, useCallback } from 'react'
import type { Goal } from '../types/goals'
import type { SuggestionState } from '../types/ai'
import { 
  LEVEL_SUGGESTIONS_BASELINE_0, 
  LEVEL_SUGGESTIONS_BASELINE_MINUS_1,
  AI_SIMULATION_DELAY, 
  HIGHLIGHT_DURATION 
} from '../constants/goals'
import { focusElement } from '../utils/focus'
import { deepClone } from '../utils/clone'

export function useAISuggestions() {
  const [state, setState] = useState<SuggestionState>({
    isSuggestingMeta: false,
    suggestingGoalId: null,
    metaHighlight: false,
    goalHighlightId: null,
  })

  const isThinking = state.isSuggestingMeta || Boolean(state.suggestingGoalId)

  const suggestMeta = useCallback((
    firstGoalId: string | undefined,
    onUpdateGoal: (goalId: string, data: Partial<Goal>) => void,
  ) => {
    setState((prev) => ({ ...prev, isSuggestingMeta: true }))

    setTimeout(() => {
      // Simula resposta de LLM/API
      const suggestedName = 'Comunicação verbal na sala de aula'

      if (firstGoalId) {
        onUpdateGoal(firstGoalId, { name: suggestedName })
      }

      setState((prev) => ({ ...prev, isSuggestingMeta: false, metaHighlight: true }))
      setTimeout(() => {
        setState((prev) => ({ ...prev, metaHighlight: false }))
      }, HIGHLIGHT_DURATION)

      if (firstGoalId) {
        focusElement(`goal-${firstGoalId}-name`, { behavior: 'smooth', block: 'center' })
      }
    }, AI_SIMULATION_DELAY)
  }, [])

  /**
   * Sugere níveis usando IA (simulado)
   * 
   * CRÍTICO: Em produção real, 'suggestions' viria de uma API (fetch/axios)
   * Deep clone garante que dados da API não compartilhem referências com state
   * Exemplo real:
   * 
   * const response = await fetch('/api/suggest-levels', {
   *   method: 'POST',
   *   body: JSON.stringify({ goalName, baseline, problems, objectives })
   * })
   * const suggestions = await response.json()
   * onUpdateGoal(goalId, { levels: deepClone(suggestions.levels) })
   */
  const suggestLevels = useCallback((
    goalId: string,
    goalBaseline: '0' | '-1',
    onUpdateGoal: (goalId: string, data: Partial<Goal>) => void,
  ) => {
    setState((prev) => ({ ...prev, suggestingGoalId: goalId }))

    setTimeout(() => {
      // Escolhe as sugestões baseado na baseline selecionada
      const suggestions = goalBaseline === '-1' 
        ? LEVEL_SUGGESTIONS_BASELINE_MINUS_1 
        : LEVEL_SUGGESTIONS_BASELINE_0

      // Deep clone dos dados "vindos da API" para garantir imutabilidade
      onUpdateGoal(goalId, { levels: deepClone(suggestions) })

      setState((prev) => ({ ...prev, suggestingGoalId: null, goalHighlightId: goalId }))
      setTimeout(() => {
        setState((prev) => ({ ...prev, goalHighlightId: null }))
      }, HIGHLIGHT_DURATION)
    }, AI_SIMULATION_DELAY)
  }, [])

  return {
    isThinking,
    isSuggestingMeta: state.isSuggestingMeta,
    suggestingGoalId: state.suggestingGoalId,
    metaHighlight: state.metaHighlight,
    goalHighlightId: state.goalHighlightId,
    suggestMeta,
    suggestLevels,
  }
}
