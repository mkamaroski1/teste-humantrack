import type { GasForm } from '../types/gas'
import type { Goal, GoalLevelKey } from '../types/goals'
import type { ValidationErrors, ValidationResult } from '../types/validation'

export function validateGasForm(form: GasForm, goals: Goal[]): ValidationResult {
  const errors: ValidationErrors = {}
  let focusTarget: string | null = null

  const missingName = !form.name.trim()
  const missingPatient = !form.patient.trim()
  const missingPhone = !form.phone.trim()
  const goalsInvalid = validateGoals(goals)

  if (missingName) {
    errors.name = 'Informe o nome da GAS.'
    focusTarget = 'gas-name'
  }
  if (missingPatient) {
    errors.patient = 'Selecione o paciente.'
    if (!focusTarget) {
      focusTarget = 'patient-select'
    }
  }
  if (missingPhone) {
    errors.phone = 'Informe o telefone.'
    if (!focusTarget) {
      focusTarget = 'patient-phone'
    }
  }
  if (goalsInvalid) {
    errors.goals = 'Preencha todos os campos da meta (nome e níveis).'
    if (!focusTarget) {
      focusTarget = findFirstInvalidGoalFocusTarget(goals)
    }
  }

  return { errors, focusTarget }
}

export function validateGoalSuggestion(form: GasForm): ValidationResult {
  const errors: ValidationErrors = {}
  const hasProblems = !!form.problems.trim()
  const hasObjectives = !!form.objectives.trim()

  if (!hasProblems) {
    errors.problems = 'Preencha o campo Problemas.'
  }
  if (!hasObjectives) {
    errors.objectives = 'Preencha o campo Objetivos.'
  }

  const focusTarget = !hasProblems ? 'gas-problems' : 'gas-objectives'

  return { errors, focusTarget: Object.keys(errors).length > 0 ? focusTarget : null }
}

function validateGoals(goals: Goal[]): boolean {
  return (
    goals.length === 0 ||
    goals.some(
      (goal) =>
        !goal.name.trim() || Object.values(goal.levels).some((level) => !level.trim()),
    )
  )
}

function findFirstInvalidGoalFocusTarget(goals: Goal[]): string | null {
  const firstInvalidGoal = goals.find(
    (goal) =>
      !goal.name.trim() || Object.values(goal.levels).some((level) => !level.trim()),
  )

  if (!firstInvalidGoal) return null

  if (!firstInvalidGoal.name.trim()) {
    return `goal-${firstInvalidGoal.id}-name`
  }

  const missingLevel = (Object.entries(firstInvalidGoal.levels) as [GoalLevelKey, string][])
    .find(([, value]) => !value.trim())

  return missingLevel ? `goal-${firstInvalidGoal.id}-level-${missingLevel[0]}` : null
}
