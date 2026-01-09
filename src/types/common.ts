export type ChangeHandler<T> = <K extends keyof T>(key: K, value: T[K]) => void

export type FormErrors<T extends string> = Partial<Record<T, string>>
