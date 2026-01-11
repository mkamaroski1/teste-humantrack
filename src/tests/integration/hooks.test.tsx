import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGasForm } from '../../hooks/useGasForm'
import { useGoals } from '../../hooks/useGoals'

describe('Hooks - Integration Tests', () => {
  describe('useGasForm', () => {
    it('deve atualizar campo do formulário', () => {
      const { result } = renderHook(() => useGasForm())

      act(() => {
        result.current.updateField('name', 'Nova GAS')
      })

      expect(result.current.form.name).toBe('Nova GAS')
    })

    it('deve definir e limpar erros', () => {
      const { result } = renderHook(() => useGasForm())

      act(() => {
        result.current.setErrors({ name: 'Campo obrigatório' })
      })

      expect(result.current.errors.name).toBe('Campo obrigatório')

      act(() => {
        result.current.clearErrors(['name'])
      })

      expect(result.current.errors.name).toBeUndefined()
    })

    it('deve resetar formulário completo', () => {
      const { result } = renderHook(() => useGasForm())

      act(() => {
        result.current.updateField('name', 'Test')
        result.current.updateField('patient', 'John')
        result.current.setErrors({ name: 'Error' })
      })

      expect(result.current.form.name).toBe('Test')
      expect(result.current.form.patient).toBe('John')
      expect(result.current.errors.name).toBe('Error')

      act(() => {
        result.current.resetForm()
      })

      expect(result.current.form.name).toBe('')
      expect(result.current.form.patient).toBe('')
      expect(result.current.errors).toEqual({})
    })
  })

  describe('useGoals', () => {
    it('deve iniciar com uma meta vazia', () => {
      const { result } = renderHook(() => useGoals())

      expect(result.current.goals).toHaveLength(1)
      expect(result.current.goals[0].name).toBe('')
    })

    it('deve adicionar nova meta', () => {
      const { result } = renderHook(() => useGoals())

      act(() => {
        result.current.addGoal()
      })

      expect(result.current.goals).toHaveLength(2)
    })

    it('deve atualizar meta existente', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.updateGoal(goalId, { name: 'Meta Atualizada' })
      })

      expect(result.current.goals[0].name).toBe('Meta Atualizada')
    })

    it('deve atualizar nível de meta', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.updateGoalLevel(goalId, '2', 'Nível 2 preenchido')
      })

      expect(result.current.goals[0].levels['2']).toBe('Nível 2 preenchido')
    })

    it('deve remover meta quando há mais de uma', () => {
      const { result } = renderHook(() => useGoals())

      act(() => {
        result.current.addGoal()
      })

      expect(result.current.goals).toHaveLength(2)

      const secondGoalId = result.current.goals[1].id

      act(() => {
        result.current.removeGoal(secondGoalId)
      })

      expect(result.current.goals).toHaveLength(1)
    })

    it('não deve remover meta quando há apenas uma', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.removeGoal(goalId)
      })

      expect(result.current.goals).toHaveLength(1)
    })

    it('deve duplicar meta com todos os dados', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.updateGoal(goalId, { 
          name: 'Meta Original',
          baseline: '-1',
        })
        result.current.updateGoalLevel(goalId, '2', 'Nivel +2 teste')
      })

      act(() => {
        result.current.cloneGoal(goalId)
      })

      expect(result.current.goals).toHaveLength(2)
      expect(result.current.goals[1].name).toBe('Meta Original')
      expect(result.current.goals[1].baseline).toBe('-1')
      expect(result.current.goals[1].levels['2']).toBe('Nivel +2 teste')
    })

    it('deve garantir que meta duplicada seja independente (deep clone)', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.updateGoal(goalId, { 
          name: 'Meta Original',
          baseline: '-1',
        })
        result.current.updateGoalLevel(goalId, '2', 'Nivel Original')
        result.current.updateGoalLevel(goalId, '1', 'Nivel 1 Original')
      })

      act(() => {
        result.current.cloneGoal(goalId)
      })

      const originalGoal = result.current.goals[0]
      const clonedGoal = result.current.goals[1]

      // Verifica que são objetos diferentes (não compartilham referência)
      expect(originalGoal).not.toBe(clonedGoal)
      expect(originalGoal.id).not.toBe(clonedGoal.id)

      // Modifica a meta original
      act(() => {
        result.current.updateGoal(originalGoal.id, { name: 'Meta Original Modificada' })
        result.current.updateGoalLevel(originalGoal.id, '2', 'Nivel Modificado')
        result.current.updateGoalLevel(originalGoal.id, '1', 'Nivel 1 Modificado')
      })

      // Verifica que a cópia NÃO foi afetada (independência garantida por deep clone)
      expect(clonedGoal.name).toBe('Meta Original')
      expect(result.current.goals[1].levels['2']).toBe('Nivel Original')
      expect(result.current.goals[1].levels['1']).toBe('Nivel 1 Original')

      // Modifica a cópia
      act(() => {
        result.current.updateGoal(clonedGoal.id, { name: 'Meta Copia Modificada' })
        result.current.updateGoalLevel(clonedGoal.id, '2', 'Nivel Copia Modificado')
      })

      // Verifica que a original NÃO foi afetada
      expect(result.current.goals[0].name).toBe('Meta Original Modificada')
      expect(result.current.goals[0].levels['2']).toBe('Nivel Modificado')
    })

    it('deve garantir que objetos aninhados (levels) sejam independentes após duplicação', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.updateGoalLevel(goalId, '2', 'Nivel +2')
        result.current.updateGoalLevel(goalId, '1', 'Nivel +1')
        result.current.updateGoalLevel(goalId, '0', 'Nivel 0')
      })

      act(() => {
        result.current.cloneGoal(goalId)
      })

      const originalLevels = result.current.goals[0].levels
      const clonedLevels = result.current.goals[1].levels

      // Verifica que levels são objetos diferentes (deep clone de objetos aninhados)
      expect(originalLevels).not.toBe(clonedLevels)

      // Modifica levels da original
      act(() => {
        result.current.updateGoalLevel(result.current.goals[0].id, '2', 'Nivel Modificado')
      })

      // Verifica que levels da cópia NÃO foram afetados
      expect(clonedLevels['2']).toBe('Nivel +2')
      expect(result.current.goals[1].levels['2']).toBe('Nivel +2')
    })

    it('deve garantir que updateGoal cria nova referência (não muta original)', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id
      const goalBefore = result.current.goals[0]

      act(() => {
        result.current.updateGoal(goalId, { name: 'Meta Atualizada' })
      })

      const goalAfter = result.current.goals[0]

      // Verifica que é uma nova referência (imutabilidade)
      expect(goalBefore).not.toBe(goalAfter)
      expect(goalAfter.name).toBe('Meta Atualizada')
    })

    it('deve garantir que updateGoalLevel cria nova referência para levels (deep clone)', () => {
      const { result } = renderHook(() => useGoals())

      const goalId = result.current.goals[0].id

      act(() => {
        result.current.updateGoalLevel(goalId, '2', 'Nivel Inicial')
      })

      const levelsBefore = result.current.goals[0].levels

      act(() => {
        result.current.updateGoalLevel(goalId, '1', 'Novo Nivel')
      })

      const levelsAfter = result.current.goals[0].levels

      // Verifica que levels é uma nova referência (deep clone garante imutabilidade)
      expect(levelsBefore).not.toBe(levelsAfter)
      expect(levelsAfter['2']).toBe('Nivel Inicial')
      expect(levelsAfter['1']).toBe('Novo Nivel')
    })

    it('deve resetar para uma meta vazia', () => {
      const { result } = renderHook(() => useGoals())

      act(() => {
        result.current.addGoal()
        result.current.addGoal()
        result.current.updateGoal(result.current.goals[0].id, { name: 'Meta 1' })
      })

      expect(result.current.goals).toHaveLength(3)

      act(() => {
        result.current.resetGoals()
      })

      expect(result.current.goals).toHaveLength(1)
      expect(result.current.goals[0].name).toBe('')
    })
  })

  describe('Integração useGasForm + useGoals', () => {
    it('deve gerenciar formulário e metas simultaneamente', () => {
      const formHook = renderHook(() => useGasForm())
      const goalsHook = renderHook(() => useGoals())

      // Atualiza formulário
      act(() => {
        formHook.result.current.updateField('name', 'GAS Completa')
        formHook.result.current.updateField('patient', 'John Doe')
      })

      // Atualiza meta
      act(() => {
        goalsHook.result.current.updateGoal(
          goalsHook.result.current.goals[0].id,
          { name: 'Meta Principal' }
        )
      })

      expect(formHook.result.current.form.name).toBe('GAS Completa')
      expect(goalsHook.result.current.goals[0].name).toBe('Meta Principal')
    })
  })
})
