import { InfoIcon, WandIcon } from '../common/icons'
import { HighlightedTextarea } from '../common/HighlightedTextarea'
import { CustomDatePicker } from '../common/CustomDatePicker'
import type { GasForm } from '../../types/gas'

type Props = {
  form: GasForm
  onChange: <K extends keyof GasForm>(key: K, value: GasForm[K]) => void
  onSuggestMeta: () => void
  isSuggesting: boolean
  nameError?: string
  problemsError?: string
  objectivesError?: string
}

export function GasFormSection({
  form,
  onChange,
  onSuggestMeta,
  isSuggesting,
  nameError,
  problemsError,
  objectivesError,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Nome da GAS</label>
          <input
            id="gas-name"
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 ${
              nameError ? 'border-red-400' : 'border-slate-200'
            }`}
            placeholder="Ex: GAS - Mobilidade (Gustavo)"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
          {nameError && <p className="text-xs font-semibold text-red-500">{nameError}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Data de início</label>
            <CustomDatePicker
              value={form.startDate}
              onChange={(value) => onChange('startDate', value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Data final</label>
            <CustomDatePicker
              value={form.endDate}
              onChange={(value) => onChange('endDate', value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Problemas</label>
          <HighlightedTextarea
            id="gas-problems"
            value={form.problems}
            onChange={(value) => onChange('problems', value)}
            placeholder="Descreva o principal problema funcional..."
            rows={3}
            isHighlighted={false}
            hasError={!!problemsError}
          />
          {problemsError && <p className="text-xs font-semibold text-red-500">{problemsError}</p>}
          <p className="text-xs text-primary">
            Uma descrição detalhada ajuda a IA a configurar metas com base no seu objetivo.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Objetivos</label>
          <HighlightedTextarea
            id="gas-objectives"
            value={form.objectives}
            onChange={(value) => onChange('objectives', value)}
            placeholder="Descreva o resultado esperado..."
            rows={3}
            isHighlighted={false}
            hasError={!!objectivesError}
          />
          {objectivesError && <p className="text-xs font-semibold text-red-500">{objectivesError}</p>}
          <p className="text-xs text-primary">
            Uma descrição detalhada ajuda a IA a configurar metas com base no seu objetivo.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-surface-indigo px-4 py-3 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <InfoIcon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-indigo-700">
                IA da HumanTrack gera sugestao de nome para meta
              </p>
              <p className="text-xs text-indigo-600">
                Preencha "Problemas" e "Objetivos" e clique no botao. A IA vai ler e sugerir um nome para sua primeira meta.
              </p>
            </div>
          </div>
          <div className="mt-3 pl-9">
            <button
              onClick={onSuggestMeta}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-500 bg-[linear-gradient(120deg,#2dd4ff,#5df2c9,#3bb8ff,#4ef0a3,#2dd4ff)] bg-[length:400%_400%] hover:shadow-md animate-aurora ${
                isSuggesting ? 'animate-pulse' : ''
              }`}
              disabled={isSuggesting}
            >
              <WandIcon className="h-4 w-4" />
              {isSuggesting ? 'Pensando...' : 'Sugestão de meta'}
            </button>
            {isSuggesting && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium text-indigo-700">Pensando na tela...</p>
                <div className="h-2 rounded-full bg-[linear-gradient(120deg,#2dd4ff,#5df2c9,#3bb8ff,#4ef0a3,#2dd4ff)] bg-[length:400%_400%] animate-aurora" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

