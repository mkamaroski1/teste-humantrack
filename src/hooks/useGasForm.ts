import { useState, useCallback } from 'react'
import type { GasForm } from '../types/gas'
import type { ValidationErrors } from '../types/validation'

const INITIAL_FORM_STATE: GasForm = {
  name: '',
  startDate: '',
  endDate: '',
  problems: '',
  objectives: '',
  patient: '',
  phone: '',
}

export function useGasForm() {
  const [form, setForm] = useState<GasForm>(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const updateField = useCallback(<K extends keyof GasForm>(key: K, value: GasForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE)
    setErrors({})
  }, [])

  /**
   * Limpa erros com imutabilidade garantida
   * 
   * CRÍTICO: Não mutamos o objeto diretamente (delete)
   * Criamos um novo objeto apenas com os campos que queremos manter
   */
  const clearErrors = useCallback((fields?: (keyof ValidationErrors)[]) => {
    if (!fields) {
      setErrors({})
      return
    }
    setErrors((prev) => {
      // Imutável: cria novo objeto filtrando campos a remover
      const newErrors: ValidationErrors = {}
      Object.keys(prev).forEach((key) => {
        const typedKey = key as keyof ValidationErrors
        if (!fields.includes(typedKey)) {
          newErrors[typedKey] = prev[typedKey]
        }
      })
      return newErrors
    })
  }, [])

  return {
    form,
    errors,
    updateField,
    setErrors,
    clearErrors,
    resetForm,
  }
}
