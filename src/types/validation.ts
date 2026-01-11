export type ValidationErrors = {
  name?: string
  patient?: string
  phone?: string
  goals?: string
  problems?: string
  objectives?: string
}

export type ValidationResult = {
  errors: ValidationErrors
  focusTarget: string | null
}
