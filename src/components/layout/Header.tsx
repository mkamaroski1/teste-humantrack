import { useState } from 'react'
import userIcon from '../../assets/icons/user.svg'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#F7F7FA]">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 py-3 sm:py-4 md:py-5 lg:py-6 text-[#292965]">
        <div className="flex items-center justify-between">
          {/* Logo / Breadcrumb - Responsivo */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className="cursor-pointer transition hover:text-indigo-600">Home</span>
            <span className="text-[#292965]/60">/</span>
            <span className="cursor-pointer transition hover:text-indigo-600">GAS</span>
            <span className="text-[#292965]/60">/</span>
            <span className="font-semibold truncate max-w-[100px] sm:max-w-none">Nova GAS</span>
          </nav>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <label className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-[#292965] shadow-inner cursor-pointer">
              <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-indigo-500">
                <span className="absolute left-1 h-2.5 w-2.5 rounded-full bg-white transition-transform" />
              </div>
              <span className="whitespace-nowrap">Dados do paciente</span>
            </label>

            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#292965] shadow-sm transition hover:border-slate-300 hover:shadow">
              <img src={userIcon} alt="" className="h-4 w-4" />
              <span className="whitespace-nowrap">Minha conta</span>
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#292965] hover:bg-slate-200 transition"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 space-y-3">
            <label className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-[#292965] shadow-inner cursor-pointer">
              <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-indigo-500">
                <span className="absolute left-1 h-2.5 w-2.5 rounded-full bg-white transition-transform" />
              </div>
              <span>Dados do paciente</span>
            </label>

            <button className="w-full inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-[#292965] shadow-sm transition hover:border-slate-300 hover:shadow">
              <img src={userIcon} alt="" className="h-4 w-4" />
              <span>Minha conta</span>
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 text-slate-500 ml-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

