import { cn } from '@/lib/utils'
import { useSokoban } from '@/hooks/useSokoban'

const DIFFICULTY_COLOR: Record<string, string> = {
  'Fácil': 'text-emerald-400',
  'Medio': 'text-amber-400',
  'Difícil': 'text-orange-400',
  'Experto': 'text-red-400',
}

export function LevelSelector() {
  const { levels, currentLevelIndex, selectLevel } = useSokoban()

  return (
    <div className="space-y-2">
      <p className="sokoban-label">Seleccionar Nivel</p>
      <div className="grid grid-cols-4 gap-2">
        {levels.map((level, i) => (
          <button
            key={level.id}
            onClick={() => selectLevel(i)}
            className={cn(
              'sokoban-level-btn flex flex-col items-center gap-1 rounded-lg border p-2 text-xs font-medium transition-all',
              currentLevelIndex === i ? 'sokoban-level-btn-active' : 'sokoban-level-btn-inactive'
            )}
          >
            <span className="font-heading text-sm font-bold">{level.id}</span>
            <span className={cn('text-[10px]', DIFFICULTY_COLOR[level.difficulty])}>{level.difficulty}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
