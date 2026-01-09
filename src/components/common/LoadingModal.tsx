type Props = {
  isOpen: boolean
  message?: string
}

export function LoadingModal({ isOpen, message = 'Gerando sugestão...' }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 px-6 py-5 shadow-lg border border-indigo-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-emerald-400" />
        <p className="text-sm font-semibold text-[#292965]">{message}</p>
      </div>
    </div>
  )
}
