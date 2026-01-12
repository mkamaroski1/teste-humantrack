import { useState } from 'react'
import { CustomSelect } from '../common/CustomSelect'
import { deepClone } from '../../utils/clone'

type DaySchedule = {
  key: string
  label: string
  enabled: boolean
  time: string
  // Em produção, poderia ter:
  // notifications?: { whatsapp: boolean; email: boolean; sms: boolean }
  // history?: DayScheduleChange[]
}

const INITIAL_DAYS: DaySchedule[] = [
  { key: 'monday', label: 'Segunda-feira', enabled: true, time: '12:00' },
  { key: 'tuesday', label: 'Terça-feira', enabled: false, time: '12:00' },
  { key: 'wednesday', label: 'Quarta-feira', enabled: false, time: '12:00' },
  { key: 'thursday', label: 'Quinta-feira', enabled: false, time: '12:00' },
  { key: 'friday', label: 'Sexta-feira', enabled: false, time: '12:00' },
  { key: 'saturday', label: 'Sábado', enabled: false, time: '12:00' },
  { key: 'sunday', label: 'Domingo', enabled: false, time: '12:00' },
]

const RECURRENCE_OPTIONS = [
  { value: '', label: 'Ex: Semanalmente' },
  { value: 'daily', label: 'Diariamente' },
  { value: 'weekly', label: 'Semanalmente' },
  { value: 'monthly', label: 'Mensalmente' },
]

export function RemindersSection() {
  const [recurrence, setRecurrence] = useState('')
  const [days, setDays] = useState<DaySchedule[]>(INITIAL_DAYS)

  /**
   * CRÍTICO: Deep clone garante imutabilidade total
   * Em produção, DaySchedule poderia ter objetos aninhados (notifications, history)
   */
  function toggleDay(key: string) {
    setDays((prev) =>
      prev.map((day) => {
        if (day.key !== key) return day
        const cloned = deepClone(day)
        cloned.enabled = !cloned.enabled
        return cloned
      })
    )
  }

  function updateTime(key: string, value: string) {
    setDays((prev) =>
      prev.map((day) => {
        if (day.key !== key) return day
        const cloned = deepClone(day)
        cloned.time = value
        return cloned
      })
    )
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-primary">
      <div className="grid gap-4 md:grid-cols-[1.1fr,1fr]">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary">Recorrência da submissão</label>
          <CustomSelect
            value={recurrence}
            onChange={setRecurrence}
            options={RECURRENCE_OPTIONS}
            placeholder="Ex: Semanalmente"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-primary">Dias de disparo</p>
          {days.map((day) => (
            <div key={day.key} className="flex items-center text-sm text-primary">
              <Switch checked={day.enabled} onToggle={() => toggleDay(day.key)} />
              <span className="ml-3 min-w-[120px] font-semibold">{day.label}</span>
              <input
                type="time"
                value={day.time}
                disabled={!day.enabled}
                onChange={(e) => updateTime(day.key, e.target.value)}
                className={`ml-4 w-16 rounded-lg border px-2.5 py-1.5 text-sm shadow-sm outline-none transition ${
                  day.enabled
                    ? 'border-indigo-300 bg-white text-primary focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                    : 'border-slate-200 bg-slate-50 text-slate-400 disabled:cursor-not-allowed'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Switch({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-5 w-9 rounded-full transition-all duration-300 ease-in-out ${
        checked ? 'bg-primary-light shadow-inner' : 'bg-slate-300'
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          checked ? 'left-4 scale-100' : 'left-0.5 scale-95'
        }`}
      />
    </button>
  )
}

