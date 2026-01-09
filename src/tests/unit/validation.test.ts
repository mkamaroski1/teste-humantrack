import { describe, it, expect } from 'vitest'
import { validateGasForm, validateGoalSuggestion } from '../../utils/validation'
import type { GasForm } from '../../types/gas'
import type { Goal } from '../../types/goals'

describe('Validation Utils - Unit Tests', () => {
  describe('validateGasForm', () => {
    const createMockForm = (overrides?: Partial<GasForm>): GasForm => ({
      name: '',
      startDate: '',
      endDate: '',
      problems: '',
      objectives: '',
      patient: '',
      phone: '',
      ...overrides,
    })

    const createMockGoal = (overrides?: Partial<Goal>): Goal => ({
      id: 'goal-1',
      name: '',
      baseline: '0',
      levels: { '2': '', '1': '', '0': '', '-1': '', '-2': '' },
      ...overrides,
    })

    it('deve retornar erro quando name está vazio', () => {
      const form = createMockForm({ patient: 'John', phone: '1234567890' })
      const goals = [
        createMockGoal({
          name: 'Meta 1',
          levels: { '2': 'a', '1': 'b', '0': 'c', '-1': 'd', '-2': 'e' },
        }),
      ]

      const result = validateGasForm(form, goals)

      expect(result.errors.name).toBe('Informe o nome da GAS.')
      expect(result.focusTarget).toBe('gas-name')
    })

    it('deve retornar erro quando patient está vazio', () => {
      const form = createMockForm({ name: 'GAS Test', phone: '1234567890' })
      const goals = [
        createMockGoal({
          name: 'Meta 1',
          levels: { '2': 'a', '1': 'b', '0': 'c', '-1': 'd', '-2': 'e' },
        }),
      ]

      const result = validateGasForm(form, goals)

      expect(result.errors.patient).toBe('Selecione o paciente.')
      expect(result.focusTarget).toBe('patient-select')
    })

    it('deve retornar erro quando phone está vazio', () => {
      const form = createMockForm({ name: 'GAS Test', patient: 'John' })
      const goals = [
        createMockGoal({
          name: 'Meta 1',
          levels: { '2': 'a', '1': 'b', '0': 'c', '-1': 'd', '-2': 'e' },
        }),
      ]

      const result = validateGasForm(form, goals)

      expect(result.errors.phone).toBe('Informe o telefone.')
      expect(result.focusTarget).toBe('patient-phone')
    })

    it('deve retornar erro quando goals está vazio', () => {
      const form = createMockForm({
        name: 'GAS Test',
        patient: 'John',
        phone: '1234567890',
      })
      const goals: Goal[] = []

      const result = validateGasForm(form, goals)

      expect(result.errors.goals).toBe('Preencha todos os campos da meta (nome e níveis).')
      expect(result.focusTarget).toBeNull()
    })

    it('deve retornar erro quando goal não tem name', () => {
      const form = createMockForm({
        name: 'GAS Test',
        patient: 'John',
        phone: '1234567890',
      })
      const goals = [
        createMockGoal({
          name: '',
          levels: { '2': 'a', '1': 'b', '0': 'c', '-1': 'd', '-2': 'e' },
        }),
      ]

      const result = validateGasForm(form, goals)

      expect(result.errors.goals).toBe('Preencha todos os campos da meta (nome e níveis).')
      expect(result.focusTarget).toBe('goal-goal-1-name')
    })

    it('deve retornar erro quando goal tem level vazio', () => {
      const form = createMockForm({
        name: 'GAS Test',
        patient: 'John',
        phone: '1234567890',
      })
      const goals = [
        createMockGoal({
          name: 'Meta 1',
          levels: { '2': 'a', '1': '', '0': 'c', '-1': 'd', '-2': 'e' },
        }),
      ]

      const result = validateGasForm(form, goals)

      expect(result.errors.goals).toBe('Preencha todos os campos da meta (nome e níveis).')
      expect(result.focusTarget).toBe('goal-goal-1-level-1')
    })

    it('deve passar validação quando tudo está preenchido', () => {
      const form = createMockForm({
        name: 'GAS Test',
        patient: 'John',
        phone: '1234567890',
      })
      const goals = [
        createMockGoal({
          name: 'Meta 1',
          levels: { '2': 'a', '1': 'b', '0': 'c', '-1': 'd', '-2': 'e' },
        }),
      ]

      const result = validateGasForm(form, goals)

      expect(result.errors).toEqual({})
      expect(result.focusTarget).toBeNull()
    })
  })

  describe('validateGoalSuggestion', () => {
    const createMockForm = (overrides?: Partial<GasForm>): GasForm => ({
      name: '',
      startDate: '',
      endDate: '',
      problems: '',
      objectives: '',
      patient: '',
      phone: '',
      ...overrides,
    })

    it('deve retornar erro quando problems está vazio', () => {
      const form = createMockForm({ objectives: 'Test objectives' })

      const result = validateGoalSuggestion(form)

      expect(result.errors.problems).toBe('Preencha o campo Problemas.')
      expect(result.focusTarget).toBe('gas-problems')
    })

    it('deve retornar erro quando objectives está vazio', () => {
      const form = createMockForm({ problems: 'Test problems' })

      const result = validateGoalSuggestion(form)

      expect(result.errors.objectives).toBe('Preencha o campo Objetivos.')
      expect(result.focusTarget).toBe('gas-objectives')
    })

    it('deve retornar ambos erros quando problems e objectives estão vazios', () => {
      const form = createMockForm()

      const result = validateGoalSuggestion(form)

      expect(result.errors.problems).toBe('Preencha o campo Problemas.')
      expect(result.errors.objectives).toBe('Preencha o campo Objetivos.')
      expect(result.focusTarget).toBe('gas-problems')
    })

    it('deve passar validação quando ambos estão preenchidos', () => {
      const form = createMockForm({
        problems: 'Test problems',
        objectives: 'Test objectives',
      })

      const result = validateGoalSuggestion(form)

      expect(result.errors).toEqual({})
      expect(result.focusTarget).toBeNull()
    })
  })
})
