import type { GasForm } from '../../types/gas'

type Props = {
  form: GasForm
  onChange: <K extends keyof GasForm>(key: K, value: GasForm[K]) => void
  patientError?: string
  phoneError?: string
}

function formatPhoneNumber(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '')
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)
  
  // Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (limited.length <= 2) {
    return limited
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
  } else if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`
  }
}

export function PatientCard({ form, onChange, patientError, phoneError }: Props) {
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value)
    onChange('phone', formatted)
  }
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[2fr_1.2fr]">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#292965]">Paciente</label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 ${
              patientError ? 'border-red-400' : 'border-slate-200'
            }`}
          >
            <select
              id="patient-select"
              className={`w-full bg-transparent text-sm outline-none ${
                form.patient === '' ? 'text-slate-400' : 'text-slate-900'
              }`}
              value={form.patient}
              onChange={(e) => onChange('patient', e.target.value)}
            >
              <option value="" disabled className="text-slate-400">
                Ex: Bruce Wayne
              </option>
              <option value="bruce" className="text-slate-900">Bruce Wayne</option>
              <option value="diana" className="text-slate-900">Diana Prince</option>
              <option value="gustavo" className="text-slate-900">Gustavo</option>
            </select>
          </div>
          {patientError && <p className="text-xs font-semibold text-red-500">{patientError}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#292965]">Telefone</label>
          <div
            className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 ${
              phoneError ? 'border-red-400' : 'border-slate-200'
            }`}
          >
            <input
              type="tel"
              id="patient-phone"
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
              placeholder="Ex: (21) 97143-7438"
              value={form.phone}
              onChange={handlePhoneChange}
            />
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M4 15.5 6.5 13l2 2L14 9M9 5h6a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-2.5M4 5h1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {phoneError && <p className="text-xs font-semibold text-red-500">{phoneError}</p>}
        </div>
      </div>
    </section>
  )
}

