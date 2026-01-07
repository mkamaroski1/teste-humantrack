import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center space-y-10">
        <div className="flex items-center justify-center gap-10">
          <a
            href="https://vite.dev"
            target="_blank"
            className="transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_18px_40px_rgba(100,108,255,0.45)]"
          >
            <img
              src={viteLogo}
              alt="Vite logo"
              className="h-20 w-20 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_18px_40px_rgba(97,218,251,0.45)]"
          >
            <img
              src={reactLogo}
              alt="React logo"
              className="h-20 w-20 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
          </a>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Vite + React</h1>
          <p className="text-lg text-slate-300">
            Agora usando apenas utilitários do Tailwind CSS — sem classes personalizadas.
          </p>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
          <button
            onClick={() => setCount((value) => value + 1)}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 active:scale-[0.99]"
          >
            count is {count}
          </button>

          <p className="text-sm text-slate-300">
            Edite <code className="font-mono text-slate-100">src/App.tsx</code> e salve para testar o HMR.
          </p>
        </div>

        <p className="text-sm text-slate-400">
          Clique nos logos para saber mais sobre cada tecnologia.
        </p>
      </div>
    </div>
  )
}

export default App
