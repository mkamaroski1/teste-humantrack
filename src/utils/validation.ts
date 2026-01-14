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

/**
 * Verifica se uma meta está completamente vazia (sem nome e sem níveis preenchidos)
 */
function isGoalEmpty(goal: Goal): boolean {
  const hasName = goal.name.trim().length > 0
  const hasAnyLevel = Object.values(goal.levels).some((level) => level.trim().length > 0)
  return !hasName && !hasAnyLevel
}

/**
 * Verifica se uma meta está completa (tem nome e todos os níveis preenchidos)
 */
function isGoalComplete(goal: Goal): boolean {
  const hasName = goal.name.trim().length > 0
  const allLevelsFilled = Object.values(goal.levels).every((level) => level.trim().length > 0)
  return hasName && allLevelsFilled
}

function validateGoals(goals: Goal[]): boolean {
  // A primeira meta (index 0) é sempre obrigatória e deve estar completa
  const firstGoal = goals[0]
  if (!firstGoal || !isGoalComplete(firstGoal)) {
    return true // Retorna true = inválido
  }

  // Metas adicionais (index > 0) podem ser descartadas se estiverem vazias
  const additionalGoals = goals.slice(1)
  const filledAdditionalGoals = additionalGoals.filter((goal) => !isGoalEmpty(goal))

  // Se há metas adicionais com conteúdo, todas devem estar completas
  if (filledAdditionalGoals.length > 0) {
    return filledAdditionalGoals.some((goal) => !isGoalComplete(goal))
  }

  // Se não há metas adicionais ou todas estão vazias, é válido
  return false // Retorna false = válido
}

function findFirstInvalidGoalFocusTarget(goals: Goal[]): string | null {
  // Primeira meta (index 0) é sempre obrigatória
  const firstGoal = goals[0]
  if (firstGoal && !isGoalComplete(firstGoal)) {
    if (!firstGoal.name.trim()) {
      return `goal-${firstGoal.id}-name`
    }

    const missingLevel = (Object.entries(firstGoal.levels) as [GoalLevelKey, string][])
      .find(([, value]) => !value.trim())

    if (missingLevel) {
      return `goal-${firstGoal.id}-level-${missingLevel[0]}`
    }
  }

  // Metas adicionais: filtra vazias e encontra primeira incompleta
  const additionalGoals = goals.slice(1)
  const filledAdditionalGoals = additionalGoals.filter((goal) => !isGoalEmpty(goal))

  const firstInvalidAdditional = filledAdditionalGoals.find((goal) => !isGoalComplete(goal))

  if (!firstInvalidAdditional) return null

  if (!firstInvalidAdditional.name.trim()) {
    return `goal-${firstInvalidAdditional.id}-name`
  }

  const missingLevel = (Object.entries(firstInvalidAdditional.levels) as [GoalLevelKey, string][])
    .find(([, value]) => !value.trim())

  return missingLevel ? `goal-${firstInvalidAdditional.id}-level-${missingLevel[0]}` : null
}
