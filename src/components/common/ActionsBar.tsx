type Props = {
  onSave: () => void
  onCancel?: () => void
}

export function ActionsBar({ onSave, onCancel }: Props) {
  return (
    <div className="flex flex-row items-center justify-end gap-3">
      <button
        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#71717A] shadow-sm transition hover:border-slate-300 hover:shadow"
        onClick={onCancel}
        type="button"
      >
        Cancelar
      </button>
      <button
        onClick={onSave}
        className="rounded-lg bg-gradient-to-r from-[#6868EE] to-[#5451CF] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        type="button"
      >
        Salvar
      </button>
    </div>
  )
}

