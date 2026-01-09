import { useState, useCallback } from 'react'
import type { Goal } from '../types/goals'
import { 
  LEVEL_SUGGESTIONS_BASELINE_0, 
  LEVEL_SUGGESTIONS_BASELINE_MINUS_1,
  AI_SIMULATION_DELAY, 
  HIGHLIGHT_DURATION 
} from '../constants/goals'
import { focusElement } from '../utils/focus'

type SuggestionState = {
  isSuggestingMeta: boolean
  suggestingGoalId: string | null
  metaHighlight: boolean
  goalHighlightId: string | null
}

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
    onUpdateFormName: (name: string) => void,
  ) => {
    setState((prev) => ({ ...prev, isSuggestingMeta: true }))

    setTimeout(() => {
      const suggestedName = 'Comunicação verbal na sala de aula'

      if (firstGoalId) {
        onUpdateGoal(firstGoalId, { name: suggestedName })
      }
      onUpdateFormName(suggestedName)

      setState((prev) => ({ ...prev, isSuggestingMeta: false, metaHighlight: true }))
      setTimeout(() => {
        setState((prev) => ({ ...prev, metaHighlight: false }))
      }, HIGHLIGHT_DURATION)

      if (firstGoalId) {
        focusElement(`goal-${firstGoalId}-name`, { behavior: 'smooth', block: 'center' })
      }
    }, AI_SIMULATION_DELAY)
  }, [])

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

      onUpdateGoal(goalId, { levels: { ...suggestions } })

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
