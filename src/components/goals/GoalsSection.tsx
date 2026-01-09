import { AiIcon, CopyIcon, InfoIcon, TrashIcon, WandIcon } from '../common/icons'
import type { Goal, GoalLevelKey } from '../../types/goals'
import { LEVEL_LABELS, LEVEL_BADGES } from '../../constants/goals'

const LEVEL_PLACEHOLDERS: Record<GoalLevelKey, string> = {
  '2': 'Ex: Paciente apresentou excepcional progresso...',
  '1': 'Ex: Paciente superou a meta alcançando 10-12 vezes...',
  '0': 'Ex: Paciente atingiu a meta de 8 vezes de comunicação...',
  '-1': 'Ex: Paciente aumentou a frequência para 4-5 vezes...',
  '-2': 'Ex: Paciente não conseguiu iniciar os exercícios...',
}

type GoalsSectionProps = {
  goals: Goal[]
  isSuggestingId: string | null
  highlightGoalId: string | null
  goalsError?: string
  onGoalChange: (goalId: string, data: Partial<Goal>) => void
  onLevelChange: (goalId: string, level: GoalLevelKey, value: string) => void
  onSuggestLevels: (goalId: string) => void
  onDuplicate: (goalId: string) => void
  onDelete: (goalId: string) => void
  onAdd: () => void
}

export function GoalsSection({
  goals,
  isSuggestingId,
  highlightGoalId,
  goalsError,
  onGoalChange,
  onLevelChange,
  onSuggestLevels,
  onDuplicate,
  onDelete,
  onAdd,
}: GoalsSectionProps) {
  return (
    <div className="space-y-4 text-[#292965]">
      {goalsError && (
        <p className="text-xs font-semibold text-red-500">{goalsError}</p>
      )}
      {goals.map((goal, index) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          index={index + 1}
          canDelete={index > 0}
          isSuggesting={isSuggestingId === goal.id}
          highlight={highlightGoalId === goal.id}
          onGoalChange={onGoalChange}
          onLevelChange={onLevelChange}
          onSuggestLevels={onSuggestLevels}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
      >
        + Nova meta
      </button>
    </div>
  )
}

type GoalCardProps = {
  goal: Goal
  index: number
  canDelete: boolean
  isSuggesting: boolean
  highlight: boolean
  onGoalChange: (goalId: string, data: Partial<Goal>) => void
  onLevelChange: (goalId: string, level: GoalLevelKey, value: string) => void
  onSuggestLevels: (goalId: string) => void
  onDuplicate: (goalId: string) => void
  onDelete: (goalId: string) => void
}

function GoalCard({
  goal,
  index,
  canDelete,
  isSuggesting,
  highlight,
  onGoalChange,
  onLevelChange,
  onSuggestLevels,
  onDuplicate,
  onDelete,
}: GoalCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <p className="text-sm font-semibold text-[#292965]">Meta {index}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDuplicate(goal.id)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow"
              aria-label="Duplicar meta"
            >
              <CopyIcon className="h-4 w-4" />
            </button>
            {canDelete && (
              <button
                type="button"
                onClick={() => onDelete(goal.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:shadow"
              >
                <TrashIcon className="h-4 w-4 text-rose-600" />
                Deletar Meta
              </button>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-[#292965]">Nome</label>
          <input
            id={`goal-${goal.id}-name`}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            placeholder="Ex: Comunicação verbal na sala de aula"
            value={goal.name}
            onChange={(e) => onGoalChange(goal.id, { name: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-[#292965]">Linha base da Meta</p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-[#292965]">
            <input
              type="radio"
              name={`baseline-${goal.id}`}
              value="0"
              checked={goal.baseline === '0'}
              onChange={() => onGoalChange(goal.id, { baseline: '0' })}
              className="h-4 w-4 accent-indigo-600"
            />
            Nível 0
          </label>
          <label className="flex items-center gap-2 text-sm text-[#292965]">
            <input
              type="radio"
              name={`baseline-${goal.id}`}
              value="-1"
              checked={goal.baseline === '-1'}
              onChange={() => onGoalChange(goal.id, { baseline: '-1' })}
              className="h-4 w-4 accent-indigo-600"
            />
            Nível -1
          </label>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-indigo-100 bg-[#E9EBF8] px-4 py-3 text-sm text-slate-700">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <InfoIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-indigo-700">
              Use IA da HumanTrack para gerar sugestões SMART baseadas no título da meta
            </p>
            <p className="text-xs text-indigo-600">
              Inclua detalhes específicos como métricas, percentuais e prazos para melhores resultados
            </p>
          </div>
        </div>
        <div className="mt-3 pl-9">
          <button
            onClick={() => onSuggestLevels(goal.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-500 bg-[linear-gradient(120deg,#2dd4ff,#5df2c9,#3bb8ff,#4ef0a3,#2dd4ff)] bg-[length:400%_400%] hover:shadow-md animate-aurora ${
              isSuggesting ? 'animate-pulse' : ''
            }`}
            disabled={isSuggesting}
          >
            <WandIcon className="h-4 w-4" />
            {isSuggesting ? 'Pensando...' : 'Sugestão de níveis'}
          </button>
          {isSuggesting && (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-indigo-700">Pensando na tela...</p>
              <div className="h-2 rounded-full bg-[linear-gradient(120deg,#2dd4ff,#5df2c9,#3bb8ff,#4ef0a3,#2dd4ff)] bg-[length:400%_400%] animate-aurora" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {renderLevelGroup(goal, '0', ['0'], onLevelChange, highlight)}
        {renderLevelGroup(goal, '2', ['2', '1'], onLevelChange, highlight)}
        {renderLevelGroup(goal, '-2', ['-2', '-1'], onLevelChange, highlight)}
      </div>
    </section>
  )
}

function renderLevelGroup(
  goal: Goal,
  titleLevel: GoalLevelKey,
  orderedLevels: GoalLevelKey[],
  onLevelChange: (goalId: string, level: GoalLevelKey, value: string) => void,
  highlight?: boolean,
) {
  const title = LEVEL_LABELS[titleLevel]
  return (
    <div className="space-y-3 border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-[#292965]">{title}</p>
        {highlight && <AiIcon className="h-4 w-4 text-[#4ef0a3]" />}
      </div>
      <div className="space-y-3">
        {orderedLevels.map((level) => (
          <div key={level} className="flex flex-col gap-1">
            <p className="pl-12 text-sm font-semibold text-[#292965]">{`Meta ${level}`}</p>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border-[0.5px] border-[#7375FC] bg-slate-100 text-sm font-bold text-[#6868EE]">
                {LEVEL_BADGES[level]}
              </span>
              {highlight ? (
                <div className="relative flex-1 rounded-xl bg-[linear-gradient(120deg,#7c7cff,#2dd4ff,#4ef0a3)] p-[2px]">
                  <input
                    id={`goal-${goal.id}-level-${level}`}
                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder={placeholderForLevel(level)}
                    value={goal.levels[level]}
                    onChange={(e) => onLevelChange(goal.id, level, e.target.value)}
                  />
                  <span className="pointer-events-none absolute -top-4 -right-4">
                    <WandIcon className="h-4 w-4 text-[#7c7cff]" />
                  </span>
                </div>
              ) : (
                <input
                  id={`goal-${goal.id}-level-${level}`}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder={placeholderForLevel(level)}
                  value={goal.levels[level]}
                  onChange={(e) => onLevelChange(goal.id, level, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function placeholderForLevel(level: GoalLevelKey): string {
  return LEVEL_PLACEHOLDERS[level]
}

