import { useState } from 'react'

type DaySchedule = {
  key: string
  label: string
  enabled: boolean
  time: string
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

export function RemindersSection() {
  const [recurrence, setRecurrence] = useState('')
  const [days, setDays] = useState<DaySchedule[]>(INITIAL_DAYS)

  function toggleDay(key: string) {
    setDays((prev) =>
      prev.map((day) => (day.key === key ? { ...day, enabled: !day.enabled } : day)),
    )
  }

  function updateTime(key: string, value: string) {
    setDays((prev) =>
      prev.map((day) => (day.key === key ? { ...day, time: value } : day)),
    )
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-primary">
      <div className="grid gap-4 md:grid-cols-[1.1fr,1fr]">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary">Recorrência da submissão</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
            <select
              className={`w-full bg-transparent text-sm outline-none ${
                recurrence ? 'text-slate-900' : 'text-slate-400'
              }`}
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
            >
              <option value="" disabled>
                Ex: Semanalmente
              </option>
              <option value="daily">Diariamente</option>
              <option value="weekly">Semanalmente</option>
              <option value="monthly">Mensalmente</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-primary">Dias de disparo</p>
          {days.map((day) => (
            <div key={day.key} className="flex items-center justify-between gap-3 text-sm text-primary">
              <div className="flex items-center gap-3">
                <Switch checked={day.enabled} onToggle={() => toggleDay(day.key)} />
                <span className="min-w-[120px]">{day.label}</span>
              </div>
              <input
                type="time"
                value={day.time}
                disabled={!day.enabled}
                onChange={(e) => updateTime(day.key, e.target.value)}
                className={`w-16 rounded-lg border px-2.5 py-1.5 text-sm shadow-sm outline-none transition ${
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
      className={`relative h-6 w-11 rounded-full border transition ${
        checked ? 'border-indigo-200 bg-primary-light' : 'border-slate-200 bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}

