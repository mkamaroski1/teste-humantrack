import { useState, useCallback } from 'react'
import type { Goal, GoalLevelKey } from '../types/goals'
import { createEmptyGoal, duplicateGoal } from '../utils/goal-factory'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([createEmptyGoal(1)])

  const updateGoal = useCallback((goalId: string, data: Partial<Goal>) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, ...data } : goal)))
  }, [])

  const updateGoalLevel = useCallback((goalId: string, level: GoalLevelKey, value: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, levels: { ...goal.levels, [level]: value } } : goal,
      ),
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
