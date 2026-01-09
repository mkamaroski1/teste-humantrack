import type { Goal } from '../types/goals'

export function createEmptyGoal(index: number): Goal {
  return {
    id: `goal-${Date.now()}-${index}`,
    name: '',
    baseline: '0',
    levels: { '2': '', '1': '', '0': '', '-1': '', '-2': '' },
  }
}

export function duplicateGoal(goal: Goal, newId: string): Goal {
  return {
    ...goal,
    id: newId,
    name: `${goal.name} (cópia)`,
  }
}
