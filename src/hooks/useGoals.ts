import { useState, useCallback } from 'react'
import type { Goal, GoalLevelKey } from '../types/goals'
import { createEmptyGoal, duplicateGoal } from '../utils/goal-factory'
import { cloneWithOverride, deepClone } from '../utils/clone'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([createEmptyGoal(1)])

  /**
   * Atualiza uma meta com deep clone para garantir imutabilidade
   * 
   * CRÍTICO: Se 'data' contém objetos aninhados (ex: metadata, history),
   * precisamos garantir que não compartilhem referências com o state anterior
   */
  const updateGoal = useCallback((goalId: string, data: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? cloneWithOverride(goal, data) : goal
      )
    )
  }, [])

  /**
   * Atualiza um nível específico com deep clone dos levels
   * 
   * CRÍTICO: Em produção, levels pode ser Record<string, ComplexObject>
   * Deep clone garante imutabilidade total
   */
  const updateGoalLevel = useCallback((goalId: string, level: GoalLevelKey, value: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal
        
        const clonedLevels = deepClone(goal.levels)
        clonedLevels[level] = value
        
        return { ...goal, levels: clonedLevels }
      })
    )
  }, [])

  const addGoal = useCallback(() => {
    setGoals((prev) => [...prev, createEmptyGoal(prev.length + 1)])
  }, [])

  const removeGoal = useCallback((goalId: string) => {
    setGoals((prev) => (prev.length > 1 ? prev.filter((g) => g.id !== goalId) : prev))
  }, [])

  const cloneGoal = useCallback((goalId: string) => {
    setGoals((prev) => {
      const goal = prev.find((g) => g.id === goalId)
      if (!goal) return prev
      const newGoal = duplicateGoal(goal, createEmptyGoal(prev.length + 1).id)
      return [...prev, newGoal]
    })
  }, [])

  const resetGoals = useCallback(() => {
    setGoals([createEmptyGoal(1)])
  }, [])

  return {
    goals,
    setGoals,
    updateGoal,
    updateGoalLevel,
    addGoal,
    removeGoal,
    cloneGoal,
    resetGoals,
  }
}
