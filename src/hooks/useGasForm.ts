import { useState, useCallback } from 'react'
import type { GasForm } from '../types/gas'
import type { ValidationErrors } from '../utils/validation'

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

  const clearErrors = useCallback((fields?: (keyof ValidationErrors)[]) => {
    if (!fields) {
      setErrors({})
      return
    }
    setErrors((prev) => {
      const newErrors = { ...prev }
      fields.forEach((field) => delete newErrors[field])
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
