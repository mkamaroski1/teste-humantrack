type Props = {
  isOpen: boolean
  message?: string
  onClose: () => void
}

export function SuccessModal({ isOpen, message = 'GAS salva com sucesso.', onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white px-6 py-6 shadow-xl border border-indigo-100 text-center">
        <p className="text-base font-semibold text-primary">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          OK
        </button>
      </div>
    </div>
  )
}
