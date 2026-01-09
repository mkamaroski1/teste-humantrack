type Props = {
  onSave: () => void
  onCancel?: () => void
}

export function ActionsBar({ onSave, onCancel }: Props) {
  return (
    <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-end">
      <button
        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#292965] shadow-sm transition hover:border-slate-300 hover:shadow"
        onClick={onCancel}
        type="button"
      >
        Cancelar
      </button>
      <button
        onClick={onSave}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        type="button"
      >
        Salvar GAS
      </button>
    </div>
  )
}

