import { useState } from 'react'
import { Header } from './components/layout/Header'
import { InfoCard } from './components/info/InfoCard'
import { GasFormSection } from './components/gas/GasFormSection'
import { PatientCard } from './components/patient/PatientCard'
import { ActionsBar } from './components/common/ActionsBar'
import { RemindersSection } from './components/reminders/RemindersSection'
import { GoalsSection } from './components/goals/GoalsSection'
import { LoadingModal } from './components/common/LoadingModal'
import { SuccessModal } from './components/common/SuccessModal'
import { useGasForm } from './hooks/useGasForm'
import { useGoals } from './hooks/useGoals'
import { useAISuggestions } from './hooks/useAISuggestions'
import { validateGasForm, validateGoalSuggestion } from './utils/validation'
import { focusElement } from './utils/focus'

function App() {
  const { form, errors, updateField, setErrors, clearErrors, resetForm } = useGasForm()
  const { goals, updateGoal, updateGoalLevel, addGoal, removeGoal, cloneGoal, resetGoals } = useGoals()
  const {
    isThinking,
    isSuggestingMeta,
    suggestingGoalId,
    metaHighlight,
    goalHighlightId,
    suggestMeta,
    suggestLevels,
  } = useAISuggestions()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  function handleSuggestMeta() {
    const validation = validateGoalSuggestion(form)

    if (Object.keys(validation.errors).length > 0) {
      setErrors(validation.errors)
      if (validation.focusTarget) {
        focusElement(validation.focusTarget)
      }
      return
    }

    clearErrors(['problems', 'objectives'])
    const firstGoalId = goals[0]?.id
    suggestMeta(firstGoalId, updateGoal, (name) => updateField('name', name))
  }

  function handleSuggestLevels(goalId: string) {
    const goal = goals.find((g) => g.id === goalId)

    if (!goal || !goal.name.trim()) {
      setErrors({ goals: 'Informe o nome da meta antes de sugerir níveis.' })
      focusElement(`goal-${goalId}-name`)
      return
    }

    suggestLevels(goalId, goal.baseline, updateGoal)
  }

  function handleSave() {
    const validation = validateGasForm(form, goals)

    if (Object.keys(validation.errors).length > 0) {
      setErrors(validation.errors)
      if (validation.focusTarget) {
        focusElement(validation.focusTarget)
      }
      return
    }

    setShowSuccessModal(true)
    resetForm()
    resetGoals()
  }

  return (
    <div className="min-h-screen bg-slate-50 text-primary">
      <LoadingModal isOpen={isThinking} />
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

      <Header />

      <main className="mx-auto max-w-6xl space-y-6 px-5 pt-2 pb-8">
        <div className="pb-2">
          <h1 className="text-2xl font-semibold text-primary">Configurar nova GAS</h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px,1fr]">
          <InfoCard
            title="Detalhes da GAS"
            description="Defina o contexto clínico da GAS. Essas informações ajudam a organizar o acompanhamento e melhoram as sugestões da IA."
          />
          <GasFormSection
            form={form}
            onChange={updateField}
            onSuggestMeta={handleSuggestMeta}
            isSuggesting={isSuggestingMeta}
            isHighlighted={metaHighlight}
            nameError={errors.name}
            problemsError={errors.problems}
            objectivesError={errors.objectives}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px,1fr]">
          <InfoCard
            title="Detalhes do paciente"
            description="Associe a GAS a um paciente. O telefone é usado para envio das submissões via WhatsApp."
          />
          <PatientCard
            form={form}
            onChange={updateField}
            patientError={errors.patient}
            phoneError={errors.phone}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px,1fr]">
          <InfoCard
            title="Lembretes"
            description="Configure a recorrência e os dias de disparo. O paciente receberá as submissões automaticamente nos horários definidos."
          />
          <RemindersSection />
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px,1fr]">
          <InfoCard
            title="Metas"
            description="Crie metas com escala completa (-2 a +2). Quanto mais específico for o texto de cada nível, mais fácil será interpretar a evolução."
          >
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 px-3.5 py-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 10V8M8 5.5h.01" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-indigo-700">Nível base da meta</p>
                  <p className="text-xs leading-relaxed text-indigo-600">
                    Você pode usar o <span className="font-semibold">Nível 0</span> ou o{' '}
                    <span className="font-semibold">Nível -1</span> como linha base, de acordo com o
                    contexto do paciente
                  </p>
                </div>
              </div>
            </div>
          </InfoCard>
          <GoalsSection
            goals={goals}
            isSuggestingId={suggestingGoalId}
            highlightGoalId={goalHighlightId}
            goalsError={errors.goals}
            onGoalChange={updateGoal}
            onLevelChange={updateGoalLevel}
            onSuggestLevels={handleSuggestLevels}
            onDuplicate={cloneGoal}
            onDelete={removeGoal}
            onAdd={addGoal}
          />
        </div>

        <div className="flex justify-end">
          <ActionsBar onSave={handleSave} />
        </div>
      </main>
    </div>
  )
}

export default App
