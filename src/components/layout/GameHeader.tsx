import { useTheme } from '@/components/theme-provider'
import { Moon, Sun } from 'lucide-react'
import { useSokoban } from '@/hooks/useSokoban'
import { ALGORITHM_INFO } from '@/lib/runner'

function PixelCrate() {
  return (
    <svg viewBox="0 0 20 20" className="h-8 w-8 shrink-0">
      <rect x="0" y="0" width="20" height="20" rx="2" fill="#b45309" />
      <rect x="1" y="1" width="18" height="18" rx="1" fill="#d97706" />
      <rect x="9" y="1" width="2" height="18" fill="#92400e" opacity="0.7" />
      <rect x="1" y="9" width="18" height="2" fill="#92400e" opacity="0.7" />
      <rect x="1" y="1" width="18" height="2" fill="white" opacity="0.15" />
    </svg>
  )
}

export function GameHeader() {
  const { theme, setTheme } = useTheme()
  const { levels, currentLevelIndex, selectedAlgorithm } = useSokoban()
  const currentLevel = levels[currentLevelIndex]
  const algInfo = ALGORITHM_INFO[selectedAlgorithm]

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header className="sokoban-header sticky top-0 z-10 border-b px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PixelCrate />
          <div>
            <h1 className="font-heading text-xl font-black tracking-wider text-white sm:text-2xl">
              SOKOBAN
            </h1>
            <p className="text-[11px] text-slate-400">
              {currentLevel.name} · <span style={{ color: algInfo.color }}>{algInfo.label}</span>
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="sokoban-icon-btn rounded-lg p-2 transition-all"
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  )
}
