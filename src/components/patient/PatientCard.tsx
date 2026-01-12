import { CustomSelect } from '../common/CustomSelect'
import { WandIcon } from '../common/icons'
import type { GasForm } from '../../types/gas'
import { formatPhone } from '../../utils/formatters'

type Props = {
  form: GasForm
  onChange: <K extends keyof GasForm>(key: K, value: GasForm[K]) => void
  patientError?: string
  phoneError?: string
}

const PATIENT_OPTIONS = [
  { value: '', label: 'Ex: Bruce Wayne' },
  { value: 'bruce', label: 'Bruce Wayne' },
  { value: 'diana', label: 'Diana Prince' },
  { value: 'gustavo', label: 'Gustavo' },
]

export function PatientCard({ form, onChange, patientError, phoneError }: Props) {
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value)
    onChange('phone', formatted)
  }
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Paciente</label>
          <CustomSelect
            id="patient-select"
            value={form.patient}
            onChange={(value) => onChange('patient', value)}
            options={PATIENT_OPTIONS}
            placeholder="Ex: Bruce Wayne"
            error={!!patientError}
          />
          {patientError && <p className="text-xs font-semibold text-red-500">{patientError}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Telefone</label>
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
            <WandIcon className="h-4 w-4 text-slate-500" />
          </div>
          {phoneError && <p className="text-xs font-semibold text-red-500">{phoneError}</p>}
        </div>
      </div>
    </section>
  )
}

